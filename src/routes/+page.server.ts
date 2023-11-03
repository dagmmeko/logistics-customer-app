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
      OR: [
        {
          senderCustomerId: session.customerData.id,
        },
        {
          receiverCustomerId: session.customerData.id,
        },
      ],
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

  return { myOrders };
};

export let actions = {
  searchOrder: async (event) => {
    const data = await event.request.formData();
    const query = data.get("orderId");

    const orderFound = await prisma.order.findFirst({
      where: { id: Number(query), deletedAt: null },
    });

    return { orderFound };
  },
};
