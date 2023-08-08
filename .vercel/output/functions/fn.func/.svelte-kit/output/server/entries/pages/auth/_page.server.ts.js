import { R as RESEND_API, J as JWTSECRET, W as WEBAPP_URL } from "../../../chunks/private.js";
import { p as prisma } from "../../../chunks/prisma.js";
import { Resend } from "resend";
import { r as redirect, f as fail } from "../../../chunks/index.js";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { s as superValidate, a as setError } from "../../../chunks/superValidate.js";
import { z } from "zod";
const resend = new Resend(RESEND_API);
async function sendMail(to, subject, message) {
  try {
    const data = await resend.emails.send({
      from: "logistics@behulum.com",
      to,
      subject,
      html: message
    });
    if (data) {
      return true;
    }
  } catch (error) {
    console.error({ error });
    throw new Error("Email not sent", error);
  }
}
const sendEmailSchema = z.object({
  email: z.string().email()
});
const load = async (event) => {
  const sendEmailForm = await superValidate(sendEmailSchema);
  const { session } = await event.parent();
  if (session?.user?.email)
    throw redirect(303, "/");
  return {
    sendEmailForm
  };
};
const actions = {
  sendEmail: async ({ request }) => {
    const sendEmailForm = await superValidate(request, sendEmailSchema);
    if (!sendEmailForm.valid) {
      return fail(400, { sendEmailForm });
    }
    try {
      const uuidPassword = randomBytes(48).toString("hex");
      const encryptedPassword = await bcrypt.hash(uuidPassword, 10);
      const user = await prisma.user.update({
        where: {
          email: sendEmailForm.data.email
        },
        data: {
          jwtPassword: encryptedPassword
        }
      });
      const jwtToken = jwt.sign(
        { userEmail: user.email, password: uuidPassword },
        JWTSECRET,
        {
          expiresIn: "1h"
        }
      );
      const emailSent = await sendMail(
        sendEmailForm.data.email,
        "Sign in Link from Logistics Application",
        `${WEBAPP_URL}/auth/signup?token=${jwtToken}`
      );
      if (!emailSent) {
        return setError(sendEmailForm, "", "Email could not be sent");
      }
      return {
        sendEmailForm,
        emailSent
      };
    } catch (e) {
      console.error({ e });
      return setError(sendEmailForm, "", "Could not send email");
    }
  }
};
export {
  actions,
  load
};
