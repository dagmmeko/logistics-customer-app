<script lang="ts">
  import { toast } from "@zerodevx/svelte-toast";
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData;
  let className = "";
  export { className as class };
  $: if (form?.checkoutUrl) {
    // console.log({ f: form.checkoutUrl });
    // @ts-ignores
    location.href = form.checkoutUrl.checkout_url;
  }
</script>

{#if form}
  <div class={className}>{form.checkoutUrl}</div>
{/if}

<form use:enhance method="post" action="?/paymentUrl" class="grid gap-4">
  <label>
    <div class="label">Email</div>
    <input class="input w-72 max-w-sm" type="email" name="email" />
  </label>

  <label>
    <div class="label">First Name</div>
    <input class="input w-72 max-w-sm" type="text" name="firstName" />
  </label>

  <label>
    <div class="label">Last Name</div>
    <input class="input w-72 max-w-sm" type="text" name="lastName" />
  </label>

  <label>
    <div class="label">phoneNumber</div>
    <input class="input w-72 max-w-sm" type="text" name="lastName" />
  </label>

  <button
    class="{className}bg-secondary flex mt-12 justify-center items-center rounded-xl h-12 max-w-sm w-full text-white"
  >
    Continue to Payment
  </button>
</form>
