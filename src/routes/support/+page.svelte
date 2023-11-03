<script lang="ts">
  import Add from "$lib/assets/shared/add.svg.svelte";
  import dayjs from "dayjs";

  export let data;
</script>

<div class="mx-6 my-4">
  <a href="/support/create-issue">
    <div
      class="bg-secondary flex gap-3 px-12 justify-center items-center rounded-xl h-12 max-w-sm text-white"
    >
      <Add /> Create an Issue
    </div>
  </a>
  <div class="my-4">
    {#each data.tickets as ticket}
      <div
        class="bg-tableHeaderBg/50 shadow-sm w-auto rounded-md p-4 my-2 grid"
      >
        <div class="flex items-center justify-between gap-4">
          <span class=" text-xl font-medium"> {ticket.title}</span>
          <span class="text-[10px] font-medium text-black/60 mt-1">
            {ticket.ticketStatus}
          </span>
        </div>

        <p class="text-sm mt-1">
          {ticket.ticketStatus !== "UNASSIGNED"
            ? "Assigned to: " + ticket.AssignedTo?.User.userName
            : ""}
        </p>
        <p class="text-sm mt-1">
          {ticket.ticketStatus !== "UNASSIGNED"
            ? "Due Date: " + dayjs(ticket.dueDate).format("DD MM YY")
            : ""}
        </p>
        <p class="mt-1 line-clamp-3">{ticket.description}</p>
      </div>
    {/each}
  </div>
</div>
