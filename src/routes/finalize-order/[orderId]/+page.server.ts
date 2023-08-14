import { prisma } from "$lib/utils/prisma.js";

export const load = async (event) => {
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

  return { orderDetail };
};
