import { r as redirect } from "../../chunks/index.js";
const load = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.customerData.customerType) {
    throw redirect(302, "/customer-information");
  }
  return;
};
export {
  load
};
