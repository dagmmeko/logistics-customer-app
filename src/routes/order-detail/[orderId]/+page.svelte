<script lang="ts">
  import GoogleMaps from "$lib/components/google-maps.svelte";
  import Map from "$lib/components/map.svelte";
  import dayjs from "dayjs";
  import Barcode from "svelte-barcode";

  export let data;
  let [mapLat, mapLng] = data.orderDetail?.pickUpMapLocation.split(",") || [];
  let [destinationLat, destinationLng] =
    data.orderDetail?.dropOffMapLocation.split(",") || [];
  $: console.log(destinationLat, destinationLng, mapLat, mapLng);
</script>

<div class=" mt-8 mb-16 grid justify-center">
  <div class="flex justify-center">
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
    <div class="bg-tableHeaderBg max-w-sm w-96 p-4 my-4 rounded-md shadow-md">
      <p>Milestones</p>
      {#if data.orderDetail}
        {#each data.orderDetail.orderMilestone as milestone}
          <div class="grid">
            <label>
              <input
                disabled
                checked={milestone.isCompleted}
                type="checkbox"
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
      <GoogleMaps
        display={true}
        destinationLat={Number(destinationLat)}
        destinationLng={Number(destinationLng)}
        lng={Number(mapLng)}
        lat={Number(mapLat)}
      />
      <div class="font-semibold w-full text-lg mt-4">Pick Up</div>

      <div class="mt-2">
        <span class="font-semibold">Location:</span>{data.orderDetail
          ?.pickUpPhysicalLocation}
      </div>
      <div class="mt-2">
        <span class="font-semibold">Time:</span>
        {dayjs(data.orderDetail?.pickUpTime).format("MMM DD/YY ")}
      </div>
      <div class="font-semibold text-lg mt-4">Drop Off</div>

      <div class="mt-2">
        <span class="font-semibold">Location:</span>
        {data.orderDetail?.dropOffPhysicalLocation}
      </div>
      <div class="mt-2">
        <span class="font-semibold"> Time:</span>
        {dayjs(data.orderDetail?.dropOffTime).format("MMM DD/YY")}
      </div>
    </div>
  </div>
</div>
