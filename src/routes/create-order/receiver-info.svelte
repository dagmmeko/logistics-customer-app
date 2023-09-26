<script lang="ts">
  import { Map, controls } from "@beyonk/svelte-mapbox";
  import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";
  import Add from "$lib/assets/shared/add.svg.svelte";
  import ArrowRight from "$lib/assets/icons/arrow-right.svg.svelte";
  import { createEventDispatcher } from "svelte";
  import Search from "$lib/assets/shared/search.svg.svelte";
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  let className = "";
  export { className as class };
  const dispatch = createEventDispatcher();
  const { GeolocateControl } = controls;
  let center = [0, 0];
  let zoom = 7;
  let radio = 0;
  export let showMap: boolean;
  export let form: ActionData | undefined = undefined;

  export let receiversInfo: {
    userName: string | null;
    phoneNumber: string | null;
    dropOffTime: Date | null;
    dropOffLocation: string | null;
    dropOffMapLocation: string | null;
    inCity: string | null;
    receiverEmail: string | null;
  } = {
    userName: form?.customerFound?.User.userName ?? null,
    phoneNumber: form?.customerFound?.User.phoneNumber ?? null,
    dropOffLocation: form?.customerFound?.physicalAddress ?? null,
    dropOffMapLocation: form?.customerFound?.mapAddress ?? null,
    dropOffTime: null,
    inCity: null,
    receiverEmail: form?.customerFound?.User.email ?? null,
  };

  let searchResultVisible: boolean = false;
  export let disableInput = false;

  // $: console.log({ receiversInfo });
</script>

<div class="{className} grid gap-4 mt-4 mb-8">
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
    <button
      type="button"
      on:click|preventDefault={() => {
        receiversInfo = {
          userName: form?.customerFound?.User.userName ?? null,
          phoneNumber: form?.customerFound?.User.phoneNumber ?? null,
          dropOffLocation: form?.customerFound?.physicalAddress ?? null,
          dropOffMapLocation: form?.customerFound?.mapAddress ?? null,
          dropOffTime: null,
          inCity: receiversInfo.inCity || "",
          receiverEmail: form?.customerFound?.User.email ?? null,
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
          {form?.customerFound.User.userName}</span
        >
        <span class="flex text-xs">
          <p class="font-semibold pr-2">Email</p>
          {form?.customerFound.User.email}
        </span>
      </div>
    </button>
  {/if}
  <label>
    <div class="label">Receiver's Name</div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.userName}
      class="input max-w-sm"
      type="text"
      name="receiverUsername"
    />
  </label>
  <label>
    <div class="label">Receiver's Phone Number</div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.phoneNumber}
      class="input max-w-sm"
      type="text"
      name="receiverPhoneNumber"
    />
  </label>
  <label>
    <div class="label">Receiver's Email</div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.receiverEmail}
      class="input max-w-sm"
      type="text"
      name="receiverEmail"
    />
  </label>
  <div class="flex justify-between">
    <label>
      <input
        disabled={disableInput}
        value={1}
        type="radio"
        bind:group={radio}
        class="mr-2"
        name="inCity"
      />Deliver In city
    </label>
    <label>
      <input
        disabled={disableInput}
        value={1}
        type="radio"
        bind:group={radio}
        class="mr-2"
        name="inCity"
      />Deliver Outside city
    </label>
  </div>

  <div class="w-full h-[1px] bg-gray7" />

  <label>
    <div class="label">Drop off date</div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.dropOffTime}
      class="input max-w-sm"
      type="date"
      min={new Date().toISOString().split("T")[0]}
      name="dropOffTime"
    />
  </label>

  <label>
    <div class="label">Drop off Location</div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.dropOffLocation}
      class="input max-w-sm"
      type="text"
      name="dropOffLocation"
    />
  </label>

  <div class="h-56 flex-1">
    {#if showMap}
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
    {/if}
  </div>
  <label>
    <div class="label">Map Address</div>
    <input
      disabled={disableInput}
      bind:value={receiversInfo.dropOffMapLocation}
      class="input max-w-sm"
      type="text"
      name="dropOffMapAddress"
    />
  </label>
  <div class="flex justify-between mt-4 max-w-sm">
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
