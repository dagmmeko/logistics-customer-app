<script lang="ts">
  import Image from "$lib/assets/shared/image.svg.svelte";
  import Notification from "$lib/assets/shared/notification.svg.svelte";

  let modalVisible: boolean = false;
</script>

<header class="flex w-full justify-between h-16 bg-primary p-4">
  <button on:click={() => (modalVisible = true)}><Image class="h-8" /></button>
  <div><Notification /></div>

  <!-- {#if modalVisible}
    <div
      class="bg-black/70 fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center"
    >
      hello
    </div>
  {/if} -->
</header>
