import { prisma } from "$lib/utils/prisma.js";
import type { PackageType } from "@prisma/client";
import { fail } from "@sveltejs/kit";

export const load = async () => {
  return {};
};
export const actions = {
  createOrder: async (event) => {
    const data = await event.request.formData();
    const pickUpTime = data.get("pickUpTime");
    const pickUpLocation = data.get("pickUpLocation");
    const mapAddress = data.get("mapAddress");
    const receiverUsername = data.get("receiverUsername");
    const receiverPhoneNumber = data.get("receiverPhoneNumber");
    const receiverEmail = data.get("receiverEmail");
    const inCity = data.get("inCity");
    const dropOffTime = data.get("dropOffTime");
    const dropOffLocation = data.get("dropOffLocation");
    const dropOffMapAddress = data.get("dropOffMapAddress");
    const packageType = data.get("packageType");
    const receiverId = data.get("receiverId");

    if (
      typeof pickUpTime !== "string" ||
      typeof pickUpLocation !== "string" ||
      typeof mapAddress !== "string" ||
      typeof dropOffTime !== "string" ||
      typeof dropOffLocation !== "string" ||
      typeof inCity !== "string" ||
      typeof receiverPhoneNumber !== "string" ||
      typeof receiverUsername !== "string" ||
      typeof packageType !== "string" ||
      typeof dropOffMapAddress !== "string" ||
      typeof receiverEmail !== "string"
    ) {
      return;
    }

    const session =
      (await event.locals.getSession()) as EnhancedSessionType | null;

    console.log({ mapAddress });
    // try {
    //   const newOrder = await prisma.order.create({
    //     data: {
    //       senderCustomerId: Number(session?.customerData.id),
    //       dropOffPhysicalLocation: dropOffLocation,
    //       dropOffMapLocation: dropOffMapAddress,
    //       orderStatus: "UNCLAIMED",
    //       packageType: packageType as PackageType,
    //       paymentStatus: false,
    //       pickUpMapLocation: mapAddress,
    //       pickUpPhysicalLocation: pickUpLocation,
    //       dropOffTime: new Date(dropOffTime),
    //       pickUpTime: new Date(pickUpTime),
    //       receiverCustomerId: receiverId ? Number(receiverId) : null,
    //       receiverEmail: receiverId ? null : receiverUsername,
    //       receiverPhoneNumber: receiverId ? null : receiverPhoneNumber,
    //       receiverName: receiverId ? null : receiverUsername,
    //     },
    //   });
    //   return { newOrder };
    // } catch (error) {
    //   console.log(error as Error);
    //   throw fail(500, { errorMessage: "Cant make order!" });
    // }
  },
  searchCustomer: async (event) => {
    const data = await event.request.formData();
    const query = data.get("customerType");
    const session =
      (await event.locals.getSession()) as EnhancedSessionType | null;

    const customerFound = await prisma.customer.findFirst({
      where: {
        id: {
          not: session?.customerData.id,
        },
        OR: [
          {
            User: {
              email: {
                contains: query?.toString(),
              },
              isEmployee: false,
            },
          },
          {
            User: {
              phoneNumber: {
                contains: query?.toString(),
              },
              isEmployee: false,
            },
          },
          {
            User: {
              userName: {
                contains: query?.toString(),
              },
              isEmployee: false,
            },
          },
        ],
      },
      include: {
        User: true,
      },
    });

    return { customerFound };
  },
};
