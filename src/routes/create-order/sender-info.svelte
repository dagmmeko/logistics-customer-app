<script lang="ts">
  import type { Writable } from "svelte/store";

  import { Map, controls } from "@beyonk/svelte-mapbox";
  import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";
  import Add from "$lib/assets/shared/add.svg.svelte";
  import ArrowRight from "$lib/assets/icons/arrow-right.svg.svelte";
  import { createEventDispatcher } from "svelte";
  import type { SuperValidated } from "sveltekit-superforms";
  import type { CreateOrderSchema } from "./+page.server";
  const dispatch = createEventDispatcher();

  const { GeolocateControl } = controls;
  let center = [0, 0];
  let zoom = 7;

  export let senderInfo: {
    userName: string;
    phoneNumber: string;
    pickUpTime: Date | null;
    pickUpLocation: string;
    mapLocation: string;
  };
</script>

<div class="grid gap-4 mt-4 mb-8">
  <label>
    <div class="label">Sender's Name</div>
    <input
      disabled
      bind:value={senderInfo.userName}
      class="input max-w-sm"
      type="text"
      name="userName"
    />
  </label>

  <label>
    <div class="label">Sender's Phone Number</div>
    <input
      disabled
      bind:value={senderInfo.phoneNumber}
      class="input max-w-sm"
      type="text"
      name="phoneNumber"
    />
  </label>

  <label>
    <div class="label">Pick up time</div>
    <input
      bind:value={senderInfo.pickUpTime}
      class="input max-w-sm"
      type="datetime-local"
      name="pickUpTime"
    />
  </label>
  <label>
    <div class="label">Pick up location</div>
    <input
      bind:value={senderInfo.pickUpLocation}
      class="input max-w-sm"
      type="text"
      name="pickUpLocation"
    />
  </label>

  <div class="bg-tableHeaderBg p-3 rounded-md">
    <div class="h-56 flex-1">
      <Map
        accessToken={PUBLIC_MAPBOX_TOKEN}
        bind:center
        bind:zoom
        on:recenter={async (e) => {
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
        bind:value={senderInfo.mapLocation}
        class="input max-w-sm"
        type="text"
        name="mapAddress"
      />
    </label>
  </div>

  <div class="flex justify-between mt-4 max-w-sm">
    <button
      type="button"
      on:click|preventDefault={() => dispatch("back")}
      class="bg-secondary flex gap-3 px-12 justify-center items-center rounded-xl h-12 text-white"
    >
      <Add /> Back
    </button>
    <button
      type="button"
      on:click|preventDefault={() => dispatch("next")}
      class="bg-[#B29603] flex gap-3 px-12 justify-center items-center rounded-xl h-12 text-white"
    >
      Next <ArrowRight />
    </button>
  </div>
</div>
