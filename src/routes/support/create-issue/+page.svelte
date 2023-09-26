<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";

  export let data;

  const { form, enhance, errors, constraints } = superForm(data.addTicketForm);
</script>

<div class="mx-6 my-10">
  <p class="text-2xl font-light mb-6">Report Issue Form</p>
  <form method="post" action="?/createTicket" use:enhance class=" grid gap-6">
    <label>
      <div class="label">
        Title <span class="text-red-700 text-xs">*required</span>
      </div>
      <input
        class="input max-w-sm"
        type="text"
        name="title"
        bind:value={$form.title}
        {...$constraints.title}
      />
    </label>
    <label>
      <div class="label">
        Description <span class="text-red-700 text-xs">*required</span>
      </div>
      <textarea
        class="textarea max-w-sm h-36"
        name="description"
        bind:value={$form.description}
        {...$constraints.description}
      />
    </label>
    <button
      class="bg-secondary flex justify-center items-center rounded-xl h-12 max-w-sm w-full text-white"
      type="submit"
    >
      Submit Issue
    </button>
  </form>
</div>
