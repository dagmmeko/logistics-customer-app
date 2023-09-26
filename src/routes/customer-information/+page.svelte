<script lang="ts">
  import { page } from "$app/stores";
  import { Map, controls, Marker } from "@beyonk/svelte-mapbox";
  import Image from "$lib/assets/shared/image.svg.svelte";
  import { superForm } from "sveltekit-superforms/client";
  import { CustomerType } from "@prisma/client";
  import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";
  import { goto } from "$app/navigation";
  import Employee from "$lib/assets/shared/employee.svg.svelte";
  import { enhance } from "$app/forms";

  export let data;
  export let form;

  const { GeolocateControl } = controls;

  const {
    form: customerInformationForm,
    enhance: customerInformationEnhance,
    allErrors,
    constraints,
  } = superForm(data.customerInformationForm);

  let edit = true;

  let center = [0, 0];
  let zoom = 7;

  // Split the mapLocation string into its lat and lng components
  let [mapLat, mapLng] = $customerInformationForm.mapAddress?.split(",") || [];

  // If both lat and lng are present, update the center variable
  if (mapLat && mapLng) {
    center = [Number(mapLng.trim()), Number(mapLat.trim())];
  }

  $: form?.updatedCustomer ? goto("/") : null;
</script>

<div class="p-12 grid justify-items-center">
  <form
    method="post"
    action="?/uploadProfilePicture"
    enctype="multipart/form-data"
    use:enhance={({ formData }) => {
      if (!data.session) {
        return;
      }
      formData.set(
        "profileKey",
        `customerProfilePicture/${data.session.customerData.id}`
      );
    }}
  >
    <label>
      <input
        class="hidden"
        type="file"
        name="profilePicture"
        accept="image/*"
        on:change={(e) => {
          e.currentTarget.form?.requestSubmit();
        }}
      />
      {#if data.imgUrl}
        <img
          alt="dp"
          src={data.imgUrl}
          class="shadow-xl rounded-full mb-4 h-48 w-48 object-cover"
        />
      {:else}
        <Image class="mb-4 h-24 w-24" />
      {/if}
    </label>
    <!-- <button type="submit"> submit </button> -->
  </form>

  {#if !data.customerInformationForm.data.premium}
    <button
      class="px-6 h-10 border-[1px] border-secondary text-xs font-semibold text-secondary rounded-xl justify-self-center"
    >
      Upgrade to Premium</button
    >
  {/if}
  <form
    class="grid gap-6 mt-4"
    method="post"
    action="?/updateCustomer"
    use:customerInformationEnhance
  >
    <label>
      <div class="label">User Name</div>
      <input
        class="input w-72 max-w-sm"
        type="text"
        name="userName"
        bind:value={$customerInformationForm.userName}
        {...$constraints.userName}
      />
    </label>
    <label>
      <div class="label">Email</div>
      <input
        class="input max-w-sm"
        type="text"
        name="email"
        bind:value={$customerInformationForm.email}
        {...$constraints.email}
      />
    </label>
    <label>
      <div class="label">Phone Number</div>
      <input
        class="input max-w-sm"
        type="text"
        name="phoneNumber"
        bind:value={$customerInformationForm.phoneNumber}
        {...$constraints.phoneNumber}
      />
    </label>
    <label>
      <div class="label">Physical Address</div>
      <input
        class="input max-w-sm"
        type="text"
        name="physicalAddress"
        bind:value={$customerInformationForm.physicalAddress}
        {...$constraints.physicalAddress}
      />
    </label>
    <label>
      <div class="label">Customer Type</div>
      <select
        bind:value={$customerInformationForm.customerType}
        class="input max-w-sm"
        name="customerType"
        on:change={() => (edit = false)}
      >
        <option selected disabled>Not selected</option>
        <option value={CustomerType.COMMERCIAL}> Commercial </option>
        <option value={CustomerType.RESIDENTIAL}> Residential </option>
      </select>
    </label>

    <div class="h-56 flex-1">
      <Map
        accessToken={PUBLIC_MAPBOX_TOKEN}
        bind:center
        bind:zoom
        on:recentre={async (e) => {
          center = [
            // @ts-ignore
            e.detail.center.lat,
            // @ts-ignore
            e.detail.center.lng,
          ];
        }}
      >
        <GeolocateControl />
      </Map>
    </div>
    <label>
      <div class="label">Map Address</div>
      <input
        class="input max-w-sm"
        type="text"
        name="mapAddress"
        bind:value={$customerInformationForm.mapAddress}
        {...$constraints.mapAddress}
      />
    </label>
    <button
      class="bg-secondary flex mt-12 justify-center items-center rounded-xl h-12 max-w-sm text-white"
    >
      Submit
    </button>
  </form>
</div>
