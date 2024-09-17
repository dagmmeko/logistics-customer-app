<script lang="ts">
  import dayjs from "dayjs";
  import { superForm } from "sveltekit-superforms/client";
  import { toast } from "@zerodevx/svelte-toast";

  export let data;
  export let form;

  const {
    form: addTicketCommentForm,
    enhance: addTicketCommentFormEnhance,
    constraints: addTicketCommentFormConstraints,
    allErrors: addTicketCommentFormErrors,
  } = superForm(data.addTicketCommentForm);

  $: form?.createComment ? toast.push("Comment Added") : null;
</script>

<div class="mx-6 my-4">
  <div class="bg-gray-500">
    <h1 class="text-2xl">
      Ticket <span class="font-bold">{data.ticketDetail?.id}</span> Detail
    </h1>

    <div class="flex items-center justify-between gap-4 mt-2">
      <span class=" text-xl text-orderCardText font-semibold">
        {data.ticketDetail?.title}</span
      >
      <span class="text-[10px] font-medium border-2 p-4 text-black/60 mt-1">
        {data.ticketDetail?.ticketStatus}
      </span>
    </div>
    <div class="flex gap-10 mt-2">
      {#if data.ticketDetail?.ticketStatus !== "COMPLETED" && data.ticketDetail?.AssignedTo !== null}
        <div class="flex items-center">
          <p class="text-xs text-gray7">Assigned To</p>
          <p class="text-xs text-secondary font-medium ml-1">
            {data.ticketDetail?.AssignedTo?.User.userName}
          </p>
        </div>
      {/if}
      {#if data.ticketDetail?.ticketStatus !== "COMPLETED" && data.ticketDetail?.dueDate}
        <div class="flex items-center">
          <p class="text-xs text-gray7">Due Date:</p>
          <p class="text-xs text-secondary font-medium ml-1">
            {dayjs(data.ticketDetail?.dueDate).format("DD MM YY")}
          </p>
        </div>
      {/if}
    </div>
    <div class="mt-2">
      <p class="font-medium">Description</p>

      <p class=" text-sm font-normal line-clamp-3">
        {data.ticketDetail?.description || "No Description"}
      </p>
    </div>
    {#if data.ticketDetail?.resolution !== null}
      <div class="mt-2">
        <p class="font-semibold text-orderCardText">Solution</p>

        <p>{data.ticketDetail?.resolution}</p>
      </div>
    {/if}
  </div>
  {#if data.ticketDetail?.resolution !== null}
  <div>
    <div class="text-2xl">Comments</div>
    <div>
      {#each data.ticketDetail?.Comments as comment}
        <p>{comment.text} - by - {comment.User.userName} </p>
      {/each}
    </div>
    <form method="post" action="?/addComment" use:addTicketCommentFormEnhance>
      <label>
        <div class="label">Comment</div>
        <textarea
          class="textarea h-36"
          bind:value={$addTicketCommentForm.text}
          name="text"
        />
      </label>
      <button
        class="bg-secondary flex justify-center items-center rounded-xl h-12 max-w-sm w-full text-white"
        type="submit"
      >
        Submit Comment
      </button>
    </form>
  </div>
  {:else}
    waiting for solution 
  {/if}
</div>
