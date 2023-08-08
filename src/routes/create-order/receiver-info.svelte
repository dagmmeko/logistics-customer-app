<script>
  import { Map, controls } from "@beyonk/svelte-mapbox";
  import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";
  import Add from "$lib/assets/shared/add.svg.svelte";
  import ArrowRight from "$lib/assets/icons/arrow-right.svg.svelte";
  import { createEventDispatcher } from "svelte";
  import Search from "$lib/assets/shared/search.svg.svelte";
  const dispatch = createEventDispatcher();
  const { GeolocateControl } = controls;
  let center = [0, 0];
  let zoom = 7;
</script>

<div class="grid gap-4 mt-4 mb-8">
  <label
    class="border-[1px] border-grayInput rounded-lg h-12 mt-4 px-4 flex items-center justify-start"
  >
    <Search class="w-4 h-4 mr-4" />
    <input
      class="w-full focus:outline-none focus:shadow-outline"
      placeholder="Search Customer"
      name="searchTickets"
      type="search"
      on:input={(e) => {
        // if (e.currentTarget.value === "") {
        //   e.currentTarget.form?.submit();
        // }
      }}
    />
  </label>
  <label>
    <div class="label">Receiver's Name</div>
    <input class="input max-w-sm" type="text" name="userName" />
  </label>
  <label>
    <div class="label">Receiver's Phone Number</div>
    <input class="input max-w-sm" type="text" name="phoneNumber" />
  </label>
  <div class="flex justify-between">
    <label>
      <input type="checkbox" class="mr-2" />Deliver In city
    </label>
    <label>
      <input type="checkbox" class="mr-2" />Deliver Outside city
    </label>
  </div>

  <div class="w-full h-[1px] bg-gray7" />

  <label>
    <div class="label">Drop off time</div>
    <input class="input max-w-sm" type="datetime-local" name="dropOffTime" />
  </label>

  <label>
    <div class="label">Drop off Location</div>
    <input class="input max-w-sm" type="text" name="dropOffLocation" />
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
    <input class="input max-w-sm" type="text" name="mapAddress" />
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
