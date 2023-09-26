<script lang="ts">
  import dayjs from "dayjs";

  export let data;

  $: console.log({ data });
</script>

<div class="mx-6 mt-8 mb-16">
  <div>
    <p class="text-2xl font-semibold">
      Order id: <span class="text-secondary"> {data.orderDetail.id} </span>
    </p>
  </div>
  <div class="h-32 w-full bg-blue-100 my-4">QR</div>

  {#if data.orderDetail.orderStatus !== "COMPLETED"}
    <div class="h-32 w-full bg-green-100">Map Track</div>
    <div>Milestones</div>
  {/if}

  <div class="bg-tableHeaderBg p-4 my-4 rounded-md shadow-md">
    <span class="font-semibold text-lg">From</span>
    <div class="text-primary font-light">
      {data.orderDetail?.Sender.User.userName}
    </div>
    <div class="font-light mt-1">{data.orderDetail?.Sender.User.email}</div>
    <div class="font-light mt-1">
      {data.orderDetail?.Sender.User.phoneNumber}
    </div>
  </div>
  <div class="bg-tableHeaderBg p-4 my-4 rounded-md shadow-md">
    <span class="font-semibold text-lg">To</span>
    <div class="text-primary font-light">
      {data.orderDetail?.receiverName
        ? data.orderDetail?.receiverName
        : data.orderDetail.Receiver?.User.userName || ""}
    </div>
    <div class="font-light mt-1">
      {data.orderDetail?.receiverEmail
        ? data.orderDetail?.receiverEmail
        : data.orderDetail.Receiver?.User.email || ""}
    </div>
    <div class="font-light mt-1">
      {data.orderDetail?.receiverPhoneNumber
        ? data.orderDetail?.receiverPhoneNumber
        : data.orderDetail.Receiver?.User.phoneNumber || ""}
    </div>
  </div>

  <div class="bg-tableHeaderBg p-4 my-4 rounded-md shadow-md">
    <span class="font-semibold text-lg">Order Detail</span>
    <span
      class="text-sm font-medium text-white mt-1 ml-6 border-secondary border-[1px] bg-secondary/60 px-2 py-1 rounded-md"
      >{data.orderDetail?.orderStatus}
    </span>
    <div class="mt-4">
      <div class="font-medium text-base">Pick Up</div>
      <div class="h-32 w-full bg-green-100">
        {data.orderDetail.pickUpMapLocation}
      </div>
      <div class="mt-2">
        Location :{data.orderDetail.pickUpPhysicalLocation}
      </div>
      <div class="mt-2">
        Time: {dayjs(data.orderDetail.pickUpTime).format("hh:mm a, DD,MMM/YY ")}
      </div>
      <div class="font-medium text-base mt-4">Drop Off</div>
      <div class="h-32 w-full bg-green-100">
        {data.orderDetail.dropOffMapLocation}
      </div>
      <div class="mt-2">
        Location: {data.orderDetail.dropOffPhysicalLocation}
      </div>
      <div class="mt-2">
        Time: {dayjs(data.orderDetail.dropOffTime).format("DD MMM YY")}
      </div>
    </div>
  </div>
</div>
