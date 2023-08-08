import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session =
    (await event.locals.getSession()) as EnhancedSessionType | null;
  console.log({ type: session?.customerData.customerType });
  if (!session?.customerData.customerType) {
    throw redirect(302, "/customer-information");
  }
  return;
};
