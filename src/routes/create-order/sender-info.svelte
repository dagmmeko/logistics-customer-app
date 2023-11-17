<script lang="ts">
  import { PUBLIC_MAPBOX_TOKEN } from "$env/static/public";
  import Add from "$lib/assets/shared/add.svg.svelte";
  import ArrowRight from "$lib/assets/icons/arrow-right.svg.svelte";
  import { createEventDispatcher } from "svelte";
  import Map from "$lib/components/map.svelte";
  import { browser } from "$app/environment";
  import { clickOutside } from "$lib/utils/click-outside";
  import GoogleMaps from "$lib/components/google-maps.svelte";
  let lat: number;
  let lng: number;

  let dateInput: any;
  if (browser) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          lat = position.coords.latitude;
          lng = position.coords.longitude;
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
    }
  }

  // $: console.log({ lat, lng });

  const dispatch = createEventDispatcher();
  let className = "";
  export { className as class };

  export let senderInfo: {
    userName: string;
    phoneNumber: string;
    pickUpTime: Date | null;
    pickUpLocation: string;
    mapLocation: string;
  };

  export let disableInput = false;
</script>

<div class="{className} grid gap-4 mt-4 mb-8">
  <label>
    <div class="label">
      Sender's Name <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <input
      readonly={true}
      bind:value={senderInfo.userName}
      class="input max-w-md"
      type="text"
      name="userName"
    />
  </label>

  <label>
    <div class="label">
      Sender's Phone Number <span
        class="text-lg font-semibold text-complementary">*</span
      >
    </div>
    <input
      readonly={true}
      bind:value={senderInfo.phoneNumber}
      class="input max-w-md"
      type="text"
      name="phoneNumber"
    />
  </label>

  <label>
    <div class="label">
      Pick up time <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <input
      disabled={disableInput}
      bind:value={senderInfo.pickUpTime}
      class="input max-w-md"
      type="date"
      bind:this={dateInput}
      on:click={() => {
        dateInput && dateInput.showPicker();
      }}
      min={new Date().toISOString().split("T")[0]}
      name="pickUpTime"
    />
  </label>
  <label>
    <div class="label">
      Pick up location <span class="text-lg font-semibold text-complementary"
        >*</span
      >
    </div>
    <input
      disabled={disableInput}
      bind:value={senderInfo.pickUpLocation}
      class="input max-w-md"
      type="text"
      name="pickUpLocation"
    />
  </label>

  <div class="bg-tableHeaderBg p-3 rounded-md">
    <div class="h-fit flex-1">
      {#if lat && lng}
        <GoogleMaps bind:lat bind:lng />
        <input
          value={`${lng},${lat}`}
          class="input max-w-md"
          type="text"
          name="mapAddress"
        />
      {/if}
    </div>
  </div>

  <div class="flex gap-10 mt-4 max-w-md">
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
