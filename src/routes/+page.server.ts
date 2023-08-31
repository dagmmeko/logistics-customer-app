import { prisma } from "$lib/utils/prisma.js";
import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
  const session =
    (await event.locals.getSession()) as EnhancedSessionType | null;

  if (!session?.customerData.customerType) {
    throw redirect(302, "/customer-information");
  }

  const myOrders = await prisma.order.findMany({
    where: {
      senderCustomerId: session.customerData.id,
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

  console.log({ myOrders });

  return { myOrders };
};
