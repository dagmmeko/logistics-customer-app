import { p as prisma } from "../../../chunks/prisma.js";
import { e as error } from "../../../chunks/index.js";
import { s as superValidate } from "../../../chunks/superValidate.js";
import { z } from "zod";
const customerInformationSchema = z.object({
  userName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  customerType: z.enum(["RESIDENTIAL", "COMMERCIAL"]).optional(),
  premium: z.boolean().optional(),
  physicalAddress: z.string().optional(),
  mapAddress: z.string().optional()
});
const load = async (event) => {
  const session = await event.locals.getSession();
  const data = await prisma.user.findFirst({
    where: {
      id: session?.userData.id
    },
    include: {
      Customer: true
    }
  });
  if (!data) {
    throw error(500, "user not found");
  }
  const customerInformationForm = await superValidate(
    {
      userName: data.userName ?? void 0,
      email: data.email,
      phoneNumber: data.phoneNumber ?? void 0,
      customerType: data.Customer?.customerType ?? void 0,
      premium: data.Customer?.premium ?? void 0,
      mapAddress: data.Customer?.mapAddress ?? void 0,
      physicalAddress: data.Customer?.physicalAddress ?? void 0
    },
    customerInformationSchema
  );
  return {
    customerInformationForm
  };
};
let actions = {
  updateCustomer: async (event) => {
    const session = await event.locals.getSession();
    const customerInformationForm = await superValidate(
      event.request,
      customerInformationSchema
    );
    const updatedCustomer = await prisma.user.update({
      where: { id: session?.userData.id },
      data: {
        userName: customerInformationForm.data.userName,
        phoneNumber: customerInformationForm.data.phoneNumber,
        Customer: {
          update: {
            customerType: customerInformationForm.data.customerType,
            premium: customerInformationForm.data.premium,
            mapAddress: customerInformationForm.data.mapAddress,
            physicalAddress: customerInformationForm.data.physicalAddress
          }
        }
      }
    });
    console.log({ updatedCustomer });
    return { customerInformationForm };
  }
};
export {
  actions,
  load
};
