<script lang="ts">
  import dayjs from "dayjs";
  import ReceiverInfo from "../../create-order/receiver-info.svelte";
  import SenderInfo from "../../create-order/sender-info.svelte";
  import PackageTypeComponent from "../../create-order/package-type.svelte";
  import Payment from "./payment.svelte";

  import type { PackageType } from "@prisma/client";

  export let data;
  export let form;

  let componentsOrder = 4;

  let senderInfo: {
    userName: string;
    phoneNumber: string;
    pickUpTime: string;
    pickUpLocation: string;
    mapLocation: string;
  } = {
    userName: data.orderDetail?.Sender.User.userName ?? "",
    phoneNumber: data.orderDetail?.Sender.User.phoneNumber ?? "",
    pickUpTime:
      dayjs(data.orderDetail?.pickUpTime).toISOString().substr(0, 10) ?? "",
    pickUpLocation: data.orderDetail?.pickUpPhysicalLocation ?? "",
    mapLocation: data.orderDetail?.pickUpMapLocation ?? "",
  };

  let receiversInfo: {
    id: Number;
    userName: string | null;
    phoneNumber: string | null;
    dropOffTime: string | null;
    dropOffLocation: string | null;
    dropOffMapLocation: string | null;
    inCity: string | null;
    receiverEmail: string | null;
  } = {
    id: data.orderDetail?.Receiver?.id ?? 0,
    userName:
      data.orderDetail?.Receiver?.User.userName ??
      data.orderDetail?.receiverName ??
      "",
    phoneNumber:
      data.orderDetail?.Receiver?.User.phoneNumber ??
      data.orderDetail?.receiverPhoneNumber ??
      "",
    dropOffTime:
      dayjs(data.orderDetail?.dropOffTime).toISOString().substr(0, 10) ?? "",
    dropOffLocation: data.orderDetail?.dropOffPhysicalLocation ?? "",
    dropOffMapLocation: data.orderDetail?.dropOffMapLocation ?? "",
    inCity: "1",
    receiverEmail:
      data.orderDetail?.Receiver?.User.email ??
      data.orderDetail?.receiverEmail ??
      "",
  };

  $: console.log({ data: data.orderDetail });
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
        ? 'bg-secondary'
        : 'bg-tableHeaderBg'}  rounded-full text-gray7 h-8 w-full flex justify-center items-center"
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

  {#if data.orderDetail?.orderStatus === "CLAIMED" && !data.orderDetail?.paymentStatus}
    <Payment
      bind:data
      bind:form
      class={componentsOrder === 4 ? "" : "hidden"}
    />
  {:else}
    <p class=" text-2xl font-light text-center mt-10">
      Please wait while your order is being processed. <br /> <br /> Your order
      id is : {data.orderDetail?.id}
    </p>
  {/if}
</div>
