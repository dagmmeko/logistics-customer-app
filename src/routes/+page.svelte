<script lang="ts">
  import Add from "$lib/assets/shared/add.svg.svelte";
  import CustomerSupport from "$lib/assets/shared/customer-support.svg.svelte";
  import Image from "$lib/assets/shared/image.svg.svelte";
  import Search from "$lib/assets/shared/search.svg.svelte";
  import dayJs from "dayjs";

  export let data;
</script>

<div class="mx-4 max-w-sm">
  <label
    class="border-[1px] border-grayInput rounded-lg h-12 mt-4 px-4 flex items-center justify-start"
  >
    <Search class="w-4 h-4 mr-4" />
    <input
      class="w-full focus:outline-none focus:shadow-outline"
      placeholder="Search Order"
      name="searchTickets"
      type="search"
      on:input={(e) => {
        // if (e.currentTarget.value === "") {
        //   e.currentTarget.form?.submit();
        // }
      }}
    />
  </label>
  <div class="flex justify-between mt-4">
    <a href="/create-order">
      <div
        class="bg-secondary flex gap-3 px-12 justify-center items-center rounded-xl h-12 max-w-sm text-white"
      >
        <Add /> Order
      </div>
    </a>
    <button
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
    <p>Order History</p>
    <p>See all</p>
  </div>
  {#each data.myOrders as order}
    <a href="/order-detail/{order.id}">
      <div class=" bg-[#ECECEC] px-4 py-4 flex items-center gap-2 mt-4">
        <Image class="mr-2" />
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
          <div class="font-light mb-1">
            <span class="font-bold">From:</span>
            {order.Sender.User.userName}
          </div>
          <div class="font-light mb-1">
            <span class="font-bold">To:</span>
            {order.receiverName
              ? order.receiverName
              : order.Receiver?.User.userName}
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
