import { prisma } from "$lib/utils/prisma.js";
import { randomBytes } from "crypto";
import { z } from "zod";

const addPaymentSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  // phoneNumber:
});

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

export let actions = {
  paymentUrl: async (event) => {
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
            email: "abebech_bekele@gmail.com",
            first_name: "Bilen",
            last_name: "Gizachew",
            phone_number: "0912345678",
            tx_ref: randomBytes(12).toString("hex"),
            callback_url: "http://localhost:5173/",
            return_url: "http://localhost:5173/",
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
    } catch (error) {
      console.log("HERE", error as Error);
    }
    console.log({ checkoutUrl });

    return { checkoutUrl };
  },
};
