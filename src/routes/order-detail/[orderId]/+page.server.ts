import { prisma } from "$lib/utils/prisma.js";
import { error, redirect } from "@sveltejs/kit";

export const load = async (event) => {
  if (!event.params.orderId) {
    throw new Error("Order Id not found!");
  }

  console.log({ e: event.params.orderId });
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

  if (orderDetail?.orderStatus === "UNCLAIMED" || !orderDetail?.paymentStatus) {
    throw redirect(302, `/finalize-order/${orderDetail?.id}`);
  }

  return { orderDetail };
};
