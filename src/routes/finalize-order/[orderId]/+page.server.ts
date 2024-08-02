import { WEBAPP_URL } from "$env/static/private";
import { prisma } from "$lib/utils/prisma.js";
import { fail, redirect } from "@sveltejs/kit";
import { randomBytes } from "crypto";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const addPaymentSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z
    .string()
    .regex(
      new RegExp(/(251\d{10})|(\d{10})|(\d{9})|((?<!0)\d{9})/),
      "Wrong phone Number Format"
    ),
});
// .refine(
//   (val) => /(251\d{10})|(\d{10})|(\d{9})|((?<!0)\d{9})/.test(val),
//   "Wrong Phone Number Format"
// ),
export type addPaymentType = z.infer<typeof addPaymentSchema>;

export const load = async (event) => {
  const session =
    (await event.locals.getSession()) as EnhancedSessionType | null;
  if (!event.params.orderId) {
    throw new Error("Order Id not found!");
  }

  const orderDetail = await prisma.order.findFirst({
    where: {
      id: Number(event.params.orderId),
    },
    include: {
      Sender: {
        include: {
          User: true,
        },
      },
      Receiver: {
        include: {
          User: true,
        },
      },
    },
  });
  const addPaymentForm = superValidate(
    {
      email: session?.userData.email || "",
      phoneNumber: session?.userData.phoneNumber || "",
      firstName: session?.userData.userName || "",
      lastName: session?.userData.userName || "",
    } satisfies addPaymentType,
    addPaymentSchema
  );
  console.log(orderDetail);

  let verifyPayment;
  const verifyPaymentResponse = await fetch(
    `https://api.chapa.co/v1/transaction/verify/${orderDetail?.paymentRef}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer CHASECK_TEST-XnClzXRLcCLdg7cpBpuVMhPPgeTd7xNo",
        "Content-Type": "application/json",
      },
    }
  );
  await verifyPaymentResponse.json().then((res) => {
    console.log(res);
    verifyPayment = res.data;
  });

  // @ts-ignore
  if (verifyPayment && verifyPayment.status === "success") {
    const updateOrder = await prisma.order.update({
      where: {
        id: Number(event.params.orderId),
      },
      data: {
        paymentStatus: true,
      },
    });
    throw redirect(302, `/order-detail/${orderDetail?.id}`);
  } else {
  }

  return { orderDetail, addPaymentForm };
};

export let actions = {
  paymentUrl: async (event) => {
    const addPaymentForm = await superValidate(event.request, addPaymentSchema);

    if (addPaymentForm.errors.phoneNumber) {
      return fail(500, { addPaymentForm, errorMessage: addPaymentForm.errors });
    }

    const regex = /(^0)|(\d+)/g;

    const validPhoneNumber = addPaymentForm.data.phoneNumber.replace(
      regex,
      (match) => {
        if (match[0] === "0") return "";
        return "251" + match;
      }
    );
    let checkoutUrl;
    const orderDetail = await prisma.order.findFirst({
      where: {
        id: Number(event.params.orderId),
      },
      include: {
        Sender: {
          include: {
            User: true,
          },
        },
        Receiver: {
          include: {
            User: true,
          },
        },
      },
    });

    try {
      const tx_ref = randomBytes(10).toString("hex");
      const checkoutUrlRequest = await fetch(
        "https://api.chapa.co/v1/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization:
              "Bearer CHASECK_TEST-XnClzXRLcCLdg7cpBpuVMhPPgeTd7xNo",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: "100",
            currency: "ETB",
            email: addPaymentForm.data.email,
            first_name: addPaymentForm.data.firstName,
            last_name: addPaymentForm.data.lastName,
            phone_number: validPhoneNumber,
            tx_ref: tx_ref,
            callback_url: WEBAPP_URL,
            return_url: WEBAPP_URL,
            "customization[title]":
              orderDetail?.Sender.User.userName +
              "Paying for Order: " +
              orderDetail?.id,
            "customization[description]":
              "Package sent to: " + orderDetail?.Receiver?.User.userName ||
              orderDetail?.receiverName,
          }),
        }
      );

      await checkoutUrlRequest.json().then((res) => {
        checkoutUrl = res.data;
      });

      const updateOrder = await prisma.order.update({
        where: {
          id: Number(event.params.orderId),
        },
        data: {
          paymentRef: tx_ref,
          paymentMethod: "CHAPA",
          paymentDate: new Date(),
          paymentAmount: 100,
        },
      });
    } catch (error) {
      console.log(error as Error);
    }

    return { checkoutUrl, addPaymentForm };
  },
};
