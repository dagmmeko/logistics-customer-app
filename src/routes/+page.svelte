<script lang="ts">
  import { enhance } from "$app/forms";
  import Add from "$lib/assets/shared/add.svg.svelte";
  import CustomerSupport from "$lib/assets/shared/customer-support.svg.svelte";
  import Image from "$lib/assets/shared/image.svg.svelte";
  import Search from "$lib/assets/shared/search.svg.svelte";
  import dayJs from "dayjs";
  import { clickOutside } from "$lib/utils/click-outside.js";
  import { toast } from "@zerodevx/svelte-toast";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  export let data;
  export let form;

  let searchDisplay = false;

  $: form?.orderFound ? (searchDisplay = true) : (searchDisplay = false);
  let displayedComponent: "incoming" | "outgoing" = "outgoing";
</script>

<div class=" w-full grid items-center justify-center">
  <div class="mx-4 max-w-sm">
    <label
      class="border-[1px] border-grayInput rounded-lg h-12 mt-4 px-4 flex items-center justify-start"
    >
      <Search class="w-4 h-4 mr-4" />
      <input
        class="w-full focus:outline-none focus:shadow-outline"
        placeholder="Search Order"
        name="orderId"
        type="number"
        on:change={async (e) => {
          const newSearchParams = new URLSearchParams($page.url.search);
          newSearchParams.set("searchOrder", e.currentTarget.value);
          await goto(`?${newSearchParams.toString()}`);
        }}
      />
    </label>

    <div class="flex gap-6 mt-4">
      <a href="/create-order">
        <div
          class="bg-secondary flex gap-3 px-12 justify-center items-center rounded-xl h-12 max-w-sm text-white"
        >
          <Add /> Order
        </div>
      </a>
      <button
        on:click={() => {
          toast.push("Coming soon");
        }}
        class="bg-[#B29603] flex gap-3 px-12 justify-center items-center rounded-xl h-12 max-w-sm text-white"
      >
        <Add /> Price
      </button>
    </div>
    <a href="/support">
      <div
        class="bg-black mt-4 flex gap-3 px-12 w-full justify-center items-center rounded-xl h-12 text-white"
      >
        <CustomerSupport /> Customer Support
      </div>
    </a>
  </div>

  <div class="mx-4 max-w-sm mt-6">
    <div class="flex w-full rounded-md shadow-sm bg-primary/20 p-2 mb-6">
      <button class="w-full" on:click={() => (displayedComponent = "outgoing")}>
        <p
          class="py-2 px-3 rounded-md {displayedComponent === 'outgoing'
            ? 'bg-white'
            : ''} "
        >
          Outgoing
        </p>
      </button>
      <button class="w-full" on:click={() => (displayedComponent = "incoming")}
        ><p
          class="p-2 px-3 rounded-md {displayedComponent === 'incoming'
            ? 'bg-white'
            : ''}"
        >
          Incoming
        </p>
      </button>
    </div>
    <div class="flex justify-between mb-">
      <p class="text-xl font-normal">Order History</p>
    </div>
    {#if displayedComponent === "outgoing"}
      {#each data.myOrders as order}
        {#if order.senderCustomerId === data.session?.customerData.id}
          <a href="/order-detail/{order.id}">
            <div
              class=" bg-tableHeaderBg/50 px-4 py-4 shadow-md gap-2 my-4 rounded-md"
            >
              <!-- <Image class="mr-2" /> -->

              <div>
                <div class="flex gap-4 mb-2">
                  <p class="text-orderCardText font-bold text-base">
                    Order Id: {order.id}
                  </p>

                  <p
                    class="bg-[#F3F3F3] py-1 px-3 text-xs rounded-md font-semibold text-orderCardText"
                  >
                    {order.orderStatus.toLowerCase()}
                  </p>
                </div>
                <div class="font-medium mb-1">
                  <span class="font-bold">From:</span>
                  {order.Sender.User.userName}
                  <span class="text-sm font-light italic">
                    {`(${order.pickUpPhysicalLocation})`}
                  </span>
                </div>
                <div class="font-medium mb-1">
                  <span class="font-bold">To:</span>
                  {order.receiverName
                    ? order.receiverName
                    : order.Receiver?.User.userName}

                  <span class="text-sm font-light italic">
                    {`(${order.dropOffPhysicalLocation})`}
                  </span>
                </div>
                <div class="font-semibold text-xs rounded-md text-gray7">
                  {dayJs().diff(order.createdAt, "minute") < 120
                    ? dayJs().diff(order.createdAt, "minute") + " minutes ago"
                    : dayJs().diff(order.createdAt, "hours") < 24
                    ? dayJs().diff(order.createdAt, "hours") + " hours ago"
                    : dayJs().diff(order.createdAt, "days") + " days ago"}
                </div>
              </div>
            </div>
          </a>
        {/if}
      {/each}
    {:else if displayedComponent === "incoming"}
      <p class="text-sm font-light">Package Coming to you</p>
      {#each data.myOrders as order}
        {#if order.receiverCustomerId === data.session?.customerData.id}
          <a href="/order-detail/{order.id}">
            <div
              class="bg-tableHeaderBg/50 px-4 py-4 shadow-md gap-2 my-4 rounded-md"
            >
              <!-- <Image class="mr-2" /> -->

              <div>
                <div class="flex gap-4 mb-2">
                  <p class="text-orderCardText font-bold text-base">
                    Order Id: {order.id}
                  </p>

                  <p
                    class="bg-[#F3F3F3] py-1 px-3 text-xs rounded-md font-semibold text-orderCardText"
                  >
                    {order.orderStatus.toLowerCase()}
                  </p>
                </div>
                <div class="font-medium mb-1">
                  <span class="font-bold">From:</span>
                  {order.Sender.User.userName}
                  <span class="text-sm font-light italic">
                    {`(${order.pickUpPhysicalLocation})`}
                  </span>
                </div>
                <div class="font-medium mb-1">
                  <span class="font-bold">To:</span>
                  {order.receiverName
                    ? order.receiverName
                    : order.Receiver?.User.userName}

                  <span class="text-sm font-light italic">
                    {`(${order.dropOffPhysicalLocation})`}
                  </span>
                </div>
                <div class="font-semibold text-xs rounded-md text-gray7">
                  {dayJs().diff(order.createdAt, "minute") < 120
                    ? dayJs().diff(order.createdAt, "minute") + " minutes ago"
                    : dayJs().diff(order.createdAt, "hours") < 24
                    ? dayJs().diff(order.createdAt, "hours") + " hours ago"
                    : dayJs().diff(order.createdAt, "days") + " days ago"}
                </div>
              </div>
            </div>
          </a>
        {/if}
      {/each}
    {:else}
      <p>Something went wrong</p>
    {/if}
  </div>
</div>
