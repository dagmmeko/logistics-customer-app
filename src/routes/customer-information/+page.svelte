<script lang="ts">
  import { page } from "$app/stores";
  import ProfileIcon from "$lib/assets/shared/profile-icon.svg.svelte";
  import { superForm } from "sveltekit-superforms/client";
  export let data;
  const { form, enhance, allErrors, constraints } = superForm(
    data.customerInformationForm
  );
</script>

<div class="p-12">
  <ProfileIcon />
  <form class="grid gap-6">
    <label>
      <div class="label">Physical Address</div>
      <input
        class="input max-w-sm"
        type="text"
        name="physicalAddress"
        bind:value={$form.physicalAddress}
        {...$constraints.physicalAddress}
      />
    </label>
    <label>
      <div class="label">Customer Type</div>
      <input
        class="input max-w-sm"
        type="text"
        name="customerType"
        bind:value={$form.customerType}
        {...$constraints.customerType}
      />
    </label>
    <label>
      <div class="label">Map Address</div>
      <input
        class="input max-w-sm"
        type="text"
        name="mapAddress"
        bind:value={$form.mapAddress}
        {...$constraints.mapAddress}
      />
    </label>
  </form>
</div>
