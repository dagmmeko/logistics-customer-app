<script lang="ts">
  import Map from "$lib/components/map.svelte";
  import dayjs from "dayjs";
  import Barcode from "svelte-barcode";

  export let data;

  let radio: number;
</script>

<div class=" mt-8 mb-16 grid justify-center">
  <div>
    <Barcode
      value={data.orderDetail?.id}
      elementTag={"canvas"}
      options={{
        format: "CODE128",
        width: 4,
        height: 100,
        text: "Order ",
        textAlign: "center",
        textPosition: "bottom",
        textMargin: 2,
        fontSize: 20,
        background: "#ffffff",
        lineColor: "#000000",
      }}
    />
  </div>

  {#if data.orderDetail?.orderStatus !== "COMPLETED"}
    <div class="h-56 w-[352px] flex-1">
      <div class="h-56 flex-1">
        <Map center={[38, 9]} zoom={10} />
      </div>
    </div>

    <div class="bg-tableHeaderBg p-4 my-4 rounded-md shadow-md">
      <p>Milestones</p>
      {#if data.orderDetail}
        {#each data.orderDetail.orderMilestone as milestone}
          <div class="grid">
            <label>
              <input
                disabled
                value={milestone.isCompleted}
                type="radio"
                bind:group={radio}
                class="mr-2"
                name="milestones"
              />{milestone.description}
            </label>
          </div>
        {/each}
      {/if}
    </div>
  {/if}

  <div class="bg-tableHeaderBg p-4 my-4 rounded-md shadow-md">
    <span class="font-semibold text-lg">To</span>
    <div class="text-primary font-light">
      {data.orderDetail?.receiverName
        ? data.orderDetail?.receiverName
        : data.orderDetail?.Receiver?.User.userName || ""}
    </div>
    <div class="font-light mt-1">
      {data.orderDetail?.receiverEmail
        ? data.orderDetail?.receiverEmail
        : data.orderDetail?.Receiver?.User.email || ""}
    </div>
    <div class="font-light mt-1">
      {data.orderDetail?.receiverPhoneNumber
        ? data.orderDetail?.receiverPhoneNumber
        : data.orderDetail?.Receiver?.User.phoneNumber || ""}
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
        {data.orderDetail?.pickUpMapLocation}
      </div>
      <div class="mt-2">
        Location :{data.orderDetail?.pickUpPhysicalLocation}
      </div>
      <div class="mt-2">
        Time: {dayjs(data.orderDetail?.pickUpTime).format(
          "hh:mm a, DD,MMM/YY "
        )}
      </div>
      <div class="font-medium text-base mt-4">Drop Off</div>
      <div class="h-32 w-full bg-green-100">
        {data.orderDetail?.dropOffMapLocation}
      </div>
      <div class="mt-2">
        Location: {data.orderDetail?.dropOffPhysicalLocation}
      </div>
      <div class="mt-2">
        Time: {dayjs(data.orderDetail?.dropOffTime).format("DD MMM YY")}
      </div>
    </div>
  </div>
</div>
