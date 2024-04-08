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
        <div class="text-gray7">Ticket ID: {ticket.id}</div>
        <div class="flex items-center justify-between gap-4 mt-2">
          <span class=" text-xl font-medium"> {ticket.title}</span>
          <span class="text-[10px] font-medium text-black/60 mt-1">
            {ticket.ticketStatus}
          </span>
        </div>
        <div class="flex gap-10 mt-2">
          {#if ticket.AssignedTo !== null}
            <div class="flex items-center">
              <p>Assigned To</p>
              <p class="text-sm ml-1">
                {ticket.AssignedTo?.User.userName}
              </p>
            </div>
          {/if}
          {#if ticket.dueDate}
            <div class="flex items-center">
              <p>Due Date:</p>
              <p class="text-sm ml-1">
                {dayjs(ticket.dueDate).format("DD MM YY")}
              </p>
            </div>
          {/if}
        </div>

        <div class="">
          <p class="font-semibold text-orderCardText">Description</p>

          <p class=" line-clamp-3">{ticket.description}</p>
        </div>
        {#if ticket.resolution !== null}
          <div class="mt-2">
            <p class="font-semibold text-orderCardText">Solution</p>

            <p>{ticket.resolution}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
