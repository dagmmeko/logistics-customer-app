<script lang="ts">
  import type { PackageType } from "@prisma/client";

  let className = "";
  export { className as class };
  export let packageType: PackageType | null;
  export let disableInput = false;
</script>

<div class="{className} mt-4">
  <label>
    <div class="label">Package Type</div>
    <select
      disabled={disableInput}
      bind:value={packageType}
      class="input max-w-sm"
      name="packageType"
    >
      <option selected disabled>Not selected</option>
      <option value="PARCEL"> Parcel </option>
      <option value="PALLET"> Pallet </option>
      <option value="CONTAINER"> Container </option>
    </select>
  </label>
</div>
