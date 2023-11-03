<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import type { ActionData } from "./$types";
  import { page } from "$app/stores";
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";

  export let form: ActionData;
  export let data: PageData;
  let className = "";
  export { className as class };
  $: if (form?.checkoutUrl) {
    // @ts-ignores
    location.href = form.checkoutUrl.checkout_url;
  }

  const {
    form: addPaymentForm,
    enhance,
    constraints,
    errors,
  } = superForm(data.addPaymentForm);

  $: form?.errorMessage ? toast.push("Wrong Phone Number Format") : null;
</script>

<div class={className}>
  <form use:enhance method="post" action="?/paymentUrl" class=" my-6">
    <p class="mb-2 text-lg">Please Enter Your Payment Information</p>
    <p class="mb-4 text-sm font-bold text-red-800">
      Make sure the payment detail is correct.
    </p>
    <div class="grid gap-6">
      <label>
        <div class="label">Email</div>
        <input
          class="input max-w-sm"
          type="email"
          name="email"
          value={$addPaymentForm.email}
          {...$constraints.email}
        />
      </label>

      <label>
        <div class="label">First Name</div>
        <input
          class="input max-w-sm"
          type="text"
          name="firstName"
          value={$addPaymentForm.firstName}
          {...$constraints.firstName}
        />
      </label>

      <label>
        <div class="label">Last Name</div>
        <input
          class="input max-w-sm"
          type="text"
          name="lastName"
          value={$addPaymentForm.lastName}
          {...$constraints.lastName}
        />
      </label>

      <label>
        <div class="label">phoneNumber</div>
        <input
          class="input max-w-sm"
          type="number"
          name="phoneNumber"
          value={$addPaymentForm.phoneNumber}
          {...$constraints.phoneNumber}
        />
      </label>

      <button
        class="{className}bg-secondary flex mt-4 justify-center items-center rounded-xl h-12 max-w-sm w-full text-white"
      >
        Continue to Payment
      </button>
    </div>
  </form>
</div>
