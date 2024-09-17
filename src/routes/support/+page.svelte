<script lang="ts">
  import Add from "$lib/assets/shared/add.svg.svelte";
  import dayjs from "dayjs";

  export let data;
</script>

<div class="mx-6 my-4">
  <div class="p-4 mb-4">
    <h1 class="text-2xl font-semibold">Support</h1>
    <p class="text-gray7 mt-2">
      Welcome to the support page. Here you can create a new issue or view
      existing issues.
    </p>
    <!-- contacts -->
    <div class="flex gap-4 mt-4">
      <div>
        <p class="text-gray7">Contact:</p>
        <p
          class="text-black
          font-semibold
          ml-1
          first-letter:uppercase
          text-sm
          mt-2
        "
        >
          log@mail.com, superadmin@mail.com
        </p>
        <p
          class="text-black
          font-semibold
          ml-1
          first-letter:uppercase
          text-sm
          mt-2
        "
        >
          +251 912 456 789, +251 912 456 789
        </p>
      </div>
    </div>
  </div>
  <a href="/support/create-issue">
    <div
      class="bg-secondary flex gap-3 px-12 justify-center items-center rounded-xl h-12 max-w-sm text-white"
    >
      <Add /> Create an Issue
    </div>
  </a>
  <div class="my-4">
    {#each data.tickets as ticket}
      <a
        href="/support/{ticket.id}"
        class="bg-tableHeaderBg/50 shadow-sm w-auto rounded-md p-4 my-2 grid"
      >
        <div class="text-gray7 text-xs">Ticket ID: {ticket.id}</div>
        <div class="flex items-center justify-between gap-4 mt-2">
          <span class=" text-xl text-orderCardText font-semibold">
            {ticket.title}</span
          >
          <span class="text-[10px] font-medium text-black/60 mt-1">
            {ticket.ticketStatus}
          </span>
        </div>
        <div class="flex gap-10 mt-2">
          {#if ticket.ticketStatus !== "COMPLETED" && ticket.AssignedTo !== null}
            <div class="flex items-center">
              <p class="text-xs text-gray7">Assigned To</p>
              <p class="text-xs text-secondary font-medium ml-1">
                {ticket.AssignedTo?.User.userName}
              </p>
            </div>
          {/if}
          {#if ticket.ticketStatus !== "COMPLETED" && ticket.dueDate}
            <div class="flex items-center">
              <p class="text-xs text-gray7">Due Date:</p>
              <p class="text-xs text-secondary font-medium ml-1">
                {dayjs(ticket.dueDate).format("DD MM YY")}
              </p>
            </div>
          {/if}
        </div>

        <div class="mt-2">
          <p class="font-medium">Description</p>

          <p class=" text-sm font-normal line-clamp-3">
            {ticket.description || "No Description"}
          </p>
        </div>
        {#if ticket.resolution !== null}
          <div class="mt-2">
            <p class="font-semibold text-orderCardText">Solution</p>

            <p>{ticket.resolution}</p>
          </div>
        {/if}
      </a>
    {/each}
  </div>
</div>
