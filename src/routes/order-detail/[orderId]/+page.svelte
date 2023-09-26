<script lang="ts">
  import dayjs from "dayjs";
  import ReceiverInfo from "../../create-order/receiver-info.svelte";
  import SenderInfo from "../../create-order/sender-info.svelte";
  import PackageTypeComponent from "../../create-order/package-type.svelte";

  import type { PackageType } from "@prisma/client";
  import PendingPage from "./pending-page.svelte";

  export let data;
  export let form;

  $: console.log({ l: data });
  let componentsOrder = 4;

  let senderInfo: {
    userName: string;
    phoneNumber: string;
    pickUpTime: Date | null;
    pickUpLocation: string;
    mapLocation: string;
  } = {
    userName: data.orderDetail?.Sender.User.userName ?? "",
    phoneNumber: data.orderDetail?.Sender.User.phoneNumber ?? "",
    pickUpTime: dayjs(data.orderDetail?.pickUpTime).toDate() ?? "",
    pickUpLocation: data.orderDetail?.pickUpPhysicalLocation ?? "",
    mapLocation: data.orderDetail?.pickUpMapLocation ?? "",
  };

  let receiversInfo: {
    userName: string | null;
    phoneNumber: string | null;
    dropOffTime: Date | null;
    dropOffLocation: string | null;
    dropOffMapLocation: string | null;
    inCity: string | null;
    receiverEmail: string | null;
  } = {
    userName: !data.orderDetail?.receiverName
      ? data.orderDetail?.Receiver?.User.userName ?? ""
      : "",
    phoneNumber: !data.orderDetail?.receiverPhoneNumber
      ? data.orderDetail?.Receiver?.User.phoneNumber ?? ""
      : "",
    dropOffTime: dayjs(data.orderDetail?.dropOffTime).toDate() ?? "",
    dropOffLocation: data.orderDetail?.dropOffPhysicalLocation ?? "",
    dropOffMapLocation: data.orderDetail?.dropOffMapLocation ?? "",
    inCity: "1",
    receiverEmail: !data.orderDetail?.receiverEmail
      ? data.orderDetail?.Receiver?.User.email ?? ""
      : "",
  };

  let packageTemp: PackageType | null = data.orderDetail?.packageType ?? null;
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
        ? 'bg-complementary'
        : 'bg-tableHeaderBg'}  rounded-full text-white h-8 w-full flex justify-center items-center"
    >
      4
    </button>
    <div class="border-t-4 border-dotted w-full h-0 mx-2 self-center" />

    <button
      class="{componentsOrder >= 5
        ? 'bg-secondary'
        : 'bg-tableHeaderBg'}  rounded-full text-gray7 h-8 w-full flex justify-center items-center"
    >
      5
    </button>
  </div>
  <div class="w-full h-[1px] mt-4 bg-gray7" />

  <SenderInfo
    disableInput={true}
    showMap={componentsOrder === 1}
    class={componentsOrder === 1 ? "" : "hidden"}
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
  <ReceiverInfo
    disableInput={true}
    bind:receiversInfo
    showMap={componentsOrder === 2}
    class={componentsOrder === 2 ? "" : "hidden"}
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
  <PackageTypeComponent
    disableInput={true}
    bind:packageType={packageTemp}
    class={componentsOrder === 3 ? "" : "hidden"}
  />
  <PendingPage class={componentsOrder === 4 ? "" : "hidden"} />
</div>
