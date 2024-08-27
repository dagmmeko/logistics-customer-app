<script lang="ts">
  import type { PackageType } from "@prisma/client";
  import type { ActionData } from "./$types";
  import { toast } from "@zerodevx/svelte-toast";
  import { goto } from "$app/navigation";

  export let form: ActionData | undefined = undefined;

  let className = "";
  export { className as class };
  export let packageType: PackageType | null;
  export let disableInput = false;
  $: form?.newOrder ? (toast.push("Order Created"), goto("/")) : null;
</script>

<div class="{className} w-96 px-3 mt-4">
  <label>
    <div class="label">Package Type</div>
    <select
      disabled={disableInput}
      bind:value={packageType}
      class="input max-w-md"
      name="packageType"
    >
      <option selected disabled>Not selected</option>
      <option value="PARCEL"> Parcel </option>
      <option value="PALLET"> Pallet </option>
      <option value="CONTAINER"> Container </option>
    </select>
  </label>
</div>
