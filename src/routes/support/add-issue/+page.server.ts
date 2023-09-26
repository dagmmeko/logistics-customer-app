import { prisma } from "$lib/utils/prisma.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { z } from "zod";

const addTicketSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const load = async (event) => {
  const addTicketForm = await superValidate(addTicketSchema);

  return { addTicketForm };
};

export const actions = {
  createTicket: async (event) => {
    const session =
      (await event.locals.getSession()) as EnhancedSessionType | null;

    const addTicketForm = await superValidate(event.request, addTicketSchema);

    try {
      const addedTicket = await prisma.ticket.create({
        data: {
          title: addTicketForm.data.title,
          description: addTicketForm.data.description,
          ticketStatus: "UNASSIGNED",
          customerId: Number(session?.customerData.id),
        },
      });
      return { addTicketForm, addedTicket };
    } catch (error) {
      console.log(error as Error);
      return fail(500, { errorMessage: "Could not create a Ticket." });
    }
  },
};
