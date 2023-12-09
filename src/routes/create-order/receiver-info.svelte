<script lang="ts">
  import { enhance } from "$app/forms";
  import ArrowRight from "$lib/assets/icons/arrow-right.svg.svelte";
  import Add from "$lib/assets/shared/add.svg.svelte";
  import Search from "$lib/assets/shared/search.svg.svelte";
  import GoogleMaps from "$lib/components/google-maps.svelte";
  import { controls } from "@beyonk/svelte-mapbox";
  import { createEventDispatcher } from "svelte";
  import type { ActionData } from "./$types";
  let dateInput: any;

  let className = "";
  let lat2: number = 9.01;
  let lng2: number = 38.74;

  export { className as class };
  const dispatch = createEventDispatcher();
  const { GeolocateControl } = controls;
  let center = [0, 0];
  let zoom = 7;
  let radio: number;
  export let form: ActionData | undefined = undefined;

  export let receiversInfo: {
    id: Number;
    userName: string | null;
    phoneNumber: string | null;
    dropOffTime: Date | null;
    dropOffLocation: string | null;
    dropOffMapLocation: string | null;
    inCity: string | null;
    receiverEmail: string | null;
  } = {
    id: 0,
    userName: null,
    phoneNumber: null,
    dropOffTime: null,
    dropOffLocation: null,
    dropOffMapLocation: null,
    inCity: null,
    receiverEmail: null,
  };

  let searchResultVisible: boolean = false;
  export let disableInput = false;

  // $: console.log({ receiversInfo });
</script>

<div class="{className}  grid gap-4 mt-4 mb-8">
  {#if !disableInput}
    <form
      method="post"
      action="?/searchCustomer"
      use:enhance={({ formElement }) => {
        const query = formElement.searchCustomer.value;
        return async ({ update }) => {
          await update();
          formElement.searchCustomer.value = query;
          searchResultVisible = true;
        };
      }}
      on:submit|stopPropagation={() => {}}
    >
      <label
        class="border-[1px] border-grayInput rounded-lg h-12 px-4 flex items-center justify-start"
      >
        <Search class="w-4 h-4 mr-4" />
        <input
          class="w-full focus:outline-none focus:shadow-outline"
          placeholder="Search Customer"
          name="searchCustomer"
          type="search"
        />
      </label>
    </form>
  {/if}
  {#if form?.customerFound && searchResultVisible}
    {#each form?.customerFound as customer}
      <button
        class="my-2"
        type="button"
        on:click|preventDefault={() => {
          receiversInfo = {
            id: customer.id,
            userName: customer.User.userName ?? null,
            phoneNumber: customer.User.phoneNumber ?? null,
            dropOffLocation: customer.physicalAddress ?? null,
            dropOffMapLocation: customer.mapAddress ?? null,
            dropOffTime: null,
            inCity: receiversInfo.inCity || "",
            receiverEmail: customer.User.email ?? null,
          };
          searchResultVisible = false;
        }}
      >
        <div
          class="w-full shadow-xl border-2 -mt-5 bg-white border-tableHeaderBg rounded-xl px-4 py-2"
        >
          <span class="flex font-bold text-sm text-secondary mb-1">
            Select this user
          </span>
          <span class="flex text-xs"
            ><p class="font-semibold pr-2">Name</p>
            {customer.User.userName}</span
          >
          <span class="flex text-xs">
            <p class="font-semibold pr-2">Email</p>
            {customer.User.email}
          </span>
        </div>
      </button>
    {/each}
  {/if}
  <label>
    <div class="label">
      Receiver's Name <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.userName}
      class="input max-w-md"
      type="text"
      name="receiverUsername"
    />
  </label>
  <label>
    <div class="label">
      Receiver's Phone Number <span
        class="text-lg font-semibold text-complementary">*</span
      >
    </div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.phoneNumber}
      class="input max-w-md"
      type="text"
      name="receiverPhoneNumber"
    />
  </label>
  <label>
    <div class="label">
      Receiver's Email <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.receiverEmail}
      class="input max-w-md"
      type="text"
      name="receiverEmail"
    />
  </label>
  <div>
    <div class="label mb-2">
      Delivery Type <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <div class="flex items-center justify-between">
      <label class="flex items-center">
        <input
          disabled={disableInput}
          value={0}
          type="radio"
          bind:group={radio}
          class="mr-2 h-4 w-4"
          name="inCity"
        />Deliver In city
      </label>
      <label class="flex items-center">
        <input
          disabled={disableInput}
          value={1}
          type="radio"
          bind:group={radio}
          class="mr-2 h-4 w-4"
          name="inCity"
        />Deliver Outside city
      </label>
    </div>
  </div>

  <div class="w-full h-[1px] bg-gray7" />

  <label>
    <div class="label">
      Drop off date <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.dropOffTime}
      bind:this={dateInput}
      on:click={() => {
        dateInput && dateInput.showPicker();
      }}
      class="input max-w-md"
      type="date"
      min={new Date().toISOString().split("T")[0]}
      name="dropOffTime"
    />
  </label>

  <label>
    <div class="label">
      Drop off Location <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.dropOffLocation}
      class="input max-w-md"
      type="text"
      name="dropOffLocation"
    />
  </label>

  <div class="bg-tableHeaderBg p-3 rounded-md">
    <div class="h-fit flex-1">
      {#if lat2 && lng2}
        <GoogleMaps bind:lat={lat2} bind:lng={lng2} />
      {/if}
    </div>
  </div>
  <label>
    <div class="label">
      Map Address <span class="text-lg font-semibold text-complementary">*</span
      >
    </div>
    <input
      disabled={disableInput}
      value={`${lat2},${lng2}`}
      class="input max-w-md"
      type="text"
      name="dropOffMapAddress"
    />
  </label>
  <div class="flex gap-10 mt-4 max-w-md">
    <button
      on:click|preventDefault={() => dispatch("back")}
      class="bg-secondary flex gap-3 px-12 justify-center items-center rounded-xl h-12 text-white"
    >
      <Add /> Back
    </button>
    <button
      on:click|preventDefault={() => dispatch("next")}
      class="bg-[#B29603] flex gap-3 px-12 justify-center items-center rounded-xl h-12 text-white"
    >
      Next <ArrowRight />
    </button>
  </div>
</div>
