import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const createOrderSchema = z.object({
  senderCustomerId: z.number().int(),
  receiverCustomerId: z.number().int().optional(),
  receiverName: z.string().optional(),
  receiverPhoneNumber: z.string().optional(),
  receiverEmail: z.string().optional(),
  dropOffTime: z.date().optional(),
  pickUpTime: z.date().optional(),
  dropOffPhysicalLocation: z.string(),
  dropOffMapLocation: z.string(),
  pickUpPhysicalLocation: z.string(),
  pickUpMapLocation: z.string(),
  packageType: z.enum(["PARCEL", "PALLET", "CONTAINER"]).optional(),
  paymentStatus: z.boolean(),
  orderStatus: z.enum(["UNCLAIMED", "CLAIMED"]).optional(),
});

export type CreateOrderSchema = typeof createOrderSchema;
export type createOrderType = z.infer<typeof createOrderSchema>;

export const load = async (event) => {
  const session =
    (await event.locals.getSession()) as EnhancedSessionType | null;
  const createOrderForm = await superValidate(
    {
      senderCustomerId: session?.customerData.id ?? -1,
      dropOffPhysicalLocation: "",
      dropOffMapLocation: "",
      pickUpPhysicalLocation: session?.customerData.physicalAddress ?? "",
      pickUpMapLocation: session?.customerData.mapAddress ?? "",
      paymentStatus: false,
    } satisfies createOrderType,
    createOrderSchema
  );
  return { createOrderForm };
};
export const actions = {
  createOrder: async (event) => {
    const data = await event.request.formData();
    const name = data.get("pickUpTime");
    const rtime = data.get("pickUpLocation");

    console.log({ name, rtime });

    return {};
  },
};
