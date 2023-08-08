<script lang="ts">
  import { page } from "$app/stores";
  import FinishOrder from "./finish-order.svelte";
  import PackageType from "./package-type.svelte";
  import Payment from "./payment.svelte";
  import ReceiverInfo from "./receiver-info.svelte";
  import SenderInfo from "./sender-info.svelte";

  let componentsOrder = 1;
  let senderInfo: {
    userName: string;
    phoneNumber: string;
    pickUpTime: Date | null;
    pickUpLocation: string;
    mapLocation: string;
  } = {
    userName: $page.data.session?.userData.userName || "",
    phoneNumber: $page.data.session?.userData.phoneNumber || "",
    pickUpTime: null,
    pickUpLocation: $page.data.session?.customerData.physicalAddress || "",
    mapLocation: $page.data.session?.customerData.mapAddress || "",
  };
</script>

<div class="mx-6 mt-6 max-w-sm">
  <p class="font-bold mb-4">Create Order</p>
  <div class="flex items-stretch justify-between">
    <button
      on:click={() => (componentsOrder = 1)}
      class="{componentsOrder >= 1
        ? 'bg-secondary'
        : 'bg-tableHeaderBg'} rounded-full text-gray7 h-8 w-full flex justify-center items-center"
    >
      1
    </button>
    <div class="border-t-4 border-dotted w-full h-0 mx-2 self-center" />
    <button
      on:click={() => (componentsOrder = 2)}
      class="{componentsOrder >= 2
        ? 'bg-secondary'
        : 'bg-tableHeaderBg'}  rounded-full text-gray7 h-8 w-full flex justify-center items-center"
    >
      2
    </button>
    <div class="border-t-4 border-dotted w-full h-0 mx-2 self-center" />

    <button
      on:click={() => (componentsOrder = 3)}
      class="{componentsOrder >= 3
        ? 'bg-secondary'
        : 'bg-tableHeaderBg'}  rounded-full text-gray7 h-8 w-full flex justify-center items-center"
    >
      3
    </button>
    <div class="border-t-4 border-dotted w-full mx-2 h-0 self-center" />

    <button
      on:click={() => (componentsOrder = 4)}
      class="{componentsOrder >= 4
        ? 'bg-secondary'
        : 'bg-tableHeaderBg'}  rounded-full text-gray7 h-8 w-full flex justify-center items-center"
    >
      4
    </button>
    <div class="border-t-4 border-dotted w-full h-0 mx-2 self-center" />

    <button
      on:click={() => (componentsOrder = 5)}
      class="{componentsOrder >= 5
        ? 'bg-secondary'
        : 'bg-tableHeaderBg'}  rounded-full text-gray7 h-8 w-full flex justify-center items-center"
    >
      5
    </button>
  </div>
  <div class="w-full h-[1px] mt-4 bg-gray7" />

  <form method="post" action="?/createOrder">
    {#if componentsOrder === 1}
      <SenderInfo
        bind:senderInfo
        on:back={() => {
          if (componentsOrder > 1) {
            componentsOrder -= 1;
          }
        }}
        on:next={() => {
          if (componentsOrder >= 1) {
            componentsOrder += 1;
          }
        }}
      />
    {:else if componentsOrder === 2}
      <ReceiverInfo
        on:back={() => {
          if (componentsOrder > 1) {
            componentsOrder -= 1;
          }
        }}
        on:next={() => {
          if (componentsOrder >= 1) {
            componentsOrder += 1;
          }
        }}
      />
    {:else if componentsOrder === 3}
      <PackageType />
      <button type="submit"> Submit order </button>
    {:else if componentsOrder === 4}
      <Payment />
    {:else if componentsOrder === 5}
      <FinishOrder />
    {/if}
  </form>
</div>
