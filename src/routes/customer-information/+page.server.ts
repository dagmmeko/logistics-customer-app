import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const customerInformationSchema = z.object({
  customerType: z.enum(["COMMERCIAL", "RESIDENTIAL"]),
  premium: z.boolean().optional(),
  physicalAddress: z.string(),
  mapAddress: z.string(),
});

export const load = async (event) => {
  const customerInformationForm = superValidate(customerInformationSchema);
  return {
    customerInformationForm,
  };
};
