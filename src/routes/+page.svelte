<script lang="ts">
  import { enhance } from "$app/forms";
  import Add from "$lib/assets/shared/add.svg.svelte";
  import CustomerSupport from "$lib/assets/shared/customer-support.svg.svelte";
  import Image from "$lib/assets/shared/image.svg.svelte";
  import Search from "$lib/assets/shared/search.svg.svelte";
  import dayJs from "dayjs";
  import { clickOutside } from "$lib/utils/click-outside.js";
  import { toast } from "@zerodevx/svelte-toast";

  export let data;
  export let form;

  let searchDisplay = false;

  $: form?.orderFound ? (searchDisplay = true) : (searchDisplay = false);
</script>

<div class=" w-full grid items-center justify-center">
  <div class="mx-4 max-w-sm">
    <form
      method="post"
      action="?/searchOrder"
      use:enhance={({ formElement }) => {
        const query = formElement.orderId.value;
        console.log({ qu: formElement.orderId.value });

        return async ({ update }) => {
          await update();
          console.log({ qu: formElement.orderId.value });
          formElement.orderId.value = query;
        };
      }}
    >
      <label
        class="border-[1px] border-grayInput rounded-lg h-12 mt-4 px-4 flex items-center justify-start"
      >
        <Search class="w-4 h-4 mr-4" />
        <input
          class="w-full focus:outline-none focus:shadow-outline"
          placeholder="Search Order"
          name="orderId"
          type="number"
          on:change={(e) => {
            if (e.currentTarget.value !== "") {
              e.currentTarget.form?.requestSubmit();
            }
          }}
        />
      </label>
    </form>
    {#if form?.orderFound}
      <a href="/order-detail/{form.orderFound.id}">
        <div
          use:clickOutside={() => (searchDisplay = false)}
          class="bg-tableHeaderBg p-2 shadow-md rounded-md mt-2 {searchDisplay
            ? ''
            : 'hidden'}"
        >
          OrderId: {form.orderFound.id}
          Status: {form.orderFound.orderStatus}
        </div>
      </a>
    {/if}
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
    <div class="flex justify-between mb-">
      <p class="text-xl font-normal">Order History</p>
      <p class="text-sm font-light underline">See all</p>
    </div>
    {#each data.myOrders as order}
      <a href="/order-detail/{order.id}">
        <div
          class=" {order.receiverCustomerId === data.session?.customerData.id
            ? 'bg-secondary/30'
            : 'bg-white'} px-4 py-4 flex items-center shadow-md gap-2 my-4 rounded-md"
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
                : dayJs().diff(order.createdAt, "hours") + " hours ago"}
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>
