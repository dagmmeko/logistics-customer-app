<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import Nprogress from "$lib/components/nprogress.svelte";
  import "../app.postcss";
  import { SvelteToast } from "@zerodevx/svelte-toast";

  export let data;
</script>

{#if data.session === null}
  <slot />
{:else}
  <Header />
  <slot />
{/if}
<slot />
<SvelteToast />
<Nprogress />
