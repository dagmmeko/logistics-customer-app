import { prisma } from "$lib/utils/prisma.js";
import { sendMail } from "$lib/utils/send-email.server.js";
import type { PackageType } from "@prisma/client";
import { fail } from "@sveltejs/kit";
import * as turf from "@turf/turf";

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
      !mapAddress ||
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
      return fail(400, { errorMessage: "Invalid data" });
    }

    let inbound = false;

    const session =
      (await event.locals.getSession()) as EnhancedSessionType | null;

    const warehouses = await prisma.warehouse.findMany({
      where: {
        warehouseStatus: "ACTIVE",
      },
      include: {
        region: true,
      },
    });

    let orderMilestones: {
      description: string;
      coordinate?: string;
      warehouseId?: number;
    }[] = [];

    if (inCity === "0") {
      inbound = true;
      orderMilestones = [
        {
          description: `Pick up from Sender - ${pickUpLocation}`,
          coordinate: mapAddress,
        },
        {
          description: `Take to drop off - ${dropOffLocation}`,
          coordinate: dropOffMapAddress,
        },
        { description: "Deliver Item" },
      ];
    } else {
      const orderLocation = mapAddress.split(",");
      const receiverLocation = dropOffMapAddress.split(",");

      const receiverPoint = turf.point([
        Number(receiverLocation[0]),
        Number(receiverLocation[1]),
      ]);
      const senderPoint = turf.point([
        Number(orderLocation[0]),
        Number(orderLocation[1]),
      ]);

      const warehousePoints = turf.featureCollection([
        ...warehouses.map((warehouse) => {
          const warehouseLocation = warehouse.mapLocation.split(",");

          return turf.point([
            Number(warehouseLocation[0]),
            Number(warehouseLocation[1]),
          ]);
        }),
      ]);

      const nearestToReceiver = turf.nearestPoint(
        receiverPoint,
        warehousePoints
      );

      const nearestToSender = turf.nearestPoint(senderPoint, warehousePoints);

      const nearToReceiverWarehouse = warehouses.find((w) => {
        return (
          `${Number(w.mapLocation.split(",")[0])}, ${Number(
            w.mapLocation.split(",")[1]
          )}` ===
          `${nearestToReceiver.geometry.coordinates[0]}, ${nearestToReceiver.geometry.coordinates[1]}`
        );
      });

      const nearToSenderWarehouse = warehouses.find(
        (w) =>
          w.mapLocation ===
          `${nearestToSender.geometry.coordinates[0]},${nearestToSender.geometry.coordinates[1]}`
      );

      console.log(warehousePoints, nearToSenderWarehouse, nearestToSender);

      orderMilestones = [
        {
          description: `Pick up from Sender - ${pickUpLocation}`,
          coordinate: mapAddress,
        },
        {
          description: "Take to " + nearToSenderWarehouse?.name + " warehouse",
          coordinate: nearToSenderWarehouse?.mapLocation,
          warehouseId: nearToSenderWarehouse?.id,
        },
        {
          description:
            "Take from " +
            nearToSenderWarehouse?.name +
            " to " +
            nearToReceiverWarehouse?.name +
            " warehouse",
          coordinate: nearToReceiverWarehouse?.mapLocation,
          warehouseId: nearToReceiverWarehouse?.id,
        },
        {
          description: `Take to drop off - ${dropOffLocation}`,
          coordinate: dropOffMapAddress,
        },
        { description: "Deliver Item" },
      ];
    }

    console.log(orderMilestones);

    try {
      const newOrder = await prisma.order.create({
        data: {
          senderCustomerId: Number(session?.customerData.id),
          dropOffPhysicalLocation: dropOffLocation,
          dropOffMapLocation: dropOffMapAddress,
          orderStatus: "UNCLAIMED",
          packageType: packageType as PackageType,
          paymentStatus: false,
          pickUpMapLocation: mapAddress,
          pickUpPhysicalLocation: pickUpLocation,
          dropOffTime: new Date(dropOffTime),
          pickUpTime: new Date(pickUpTime),
          receiverCustomerId: receiverId ? Number(receiverId) : null,
          receiverEmail: receiverId ? null : receiverEmail,
          receiverPhoneNumber: receiverId ? null : receiverPhoneNumber,
          receiverName: receiverId ? null : receiverUsername,
          isInCity: inbound,
          orderMilestone: {
            createMany: {
              data: [
                ...orderMilestones?.map((milestone) => {
                  return {
                    description: milestone.description,
                    coordinates: milestone.coordinate,
                    warehouseId: milestone.warehouseId || null,
                  };
                }),
              ],
            },
          },
        },
      });

      if (!newOrder.receiverCustomerId) {
        const emailSentToReceiver = await sendMail(
          newOrder.receiverEmail ?? "",
          "Order coming to you has been created.",
          `An order with id ${newOrder.id} from ${session?.userData.userName}, (${session?.userData.phoneNumber}) is coming to ${newOrder.dropOffPhysicalLocation} from ${newOrder.pickUpPhysicalLocation}`
        );
      } else {
        const user = await prisma.customer.findFirst({
          where: {
            id: newOrder.receiverCustomerId,
          },
          include: {
            User: true,
          },
        });
        const emailSentToReceiver = await sendMail(
          user?.User.email ?? "",
          "Order coming to you has been created.",
          `An order with id ${newOrder.id} from ${session?.userData.userName}, (${session?.userData.phoneNumber}) is coming to ${newOrder.dropOffPhysicalLocation} from ${newOrder.pickUpPhysicalLocation}`
        );
      }

      return { newOrder };
    } catch (error) {
      console.log(error as Error);
      throw fail(500, { errorMessage: "Cant make order!" });
    }
  },
  searchCustomer: async (event) => {
    const data = await event.request.formData();
    const query = data.get("searchCustomer");
    const session =
      (await event.locals.getSession()) as EnhancedSessionType | null;

    const customerFound = await prisma.customer.findMany({
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
