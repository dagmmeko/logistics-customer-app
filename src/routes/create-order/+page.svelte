<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";
  import { toast } from "@zerodevx/svelte-toast";
  import type { PackageType } from "@prisma/client";
  import PackageTypeComponent from "./package-type.svelte";
  import ReceiverInfo from "./receiver-info.svelte";
  import SenderInfo from "./sender-info.svelte";
  import { goto } from "$app/navigation";

  export let form;

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
  let receiversInfo: {
    userName: string;
    phoneNumber: string;
    dropOffTime: Date | null;
    dropOffLocation: string;
    dropOffMapLocation: string;
    inCity: string;
    receiverEmail: string;
  };
  let packageTemp: PackageType;

  $: form?.newOrder ? toast.push("Order Created") : null;
  $: form?.newOrder ? goto("/") : null;
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

  <form
    method="post"
    action="?/createOrder"
    use:enhance={({ formData, formElement, cancel }) => {
      if (
        formElement.userName.value === "" ||
        formElement.phoneNumber.value === "" ||
        formElement.pickUpTime.value === "" ||
        formElement.pickUpLocation.value === "" ||
        formElement.mapAddress.value === "" ||
        formElement.receiverUsername.value === "" ||
        formElement.receiverPhoneNumber.value === "" ||
        formElement.inCity.value === "" ||
        formElement.dropOffTime.value === "" ||
        formElement.dropOffLocation.value === "" ||
        formElement.dropOffMapAddress.value === ""
      ) {
        toast.push("Please fill out all the required fields");
        cancel();
        return;
      }

      if (!form?.customerFound) {
        return;
      }
      formData.set("receiverId", form.customerFound.id.toString());
      return;
    }}
  >
    <SenderInfo
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
      bind:form
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
      bind:packageType={packageTemp}
      class={componentsOrder === 3 ? "" : "hidden"}
    />
    <button
      class="{componentsOrder === 3
        ? ''
        : 'hidden'} bg-secondary flex mt-12 justify-center items-center rounded-xl h-12 max-w-sm w-full text-white"
      type="submit"
    >
      Submit order
    </button>
  </form>
</div>
