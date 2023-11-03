<script lang="ts">
  import Home from "$lib/assets/shared/home.svg.svelte";
  import Image from "$lib/assets/shared/image.svg.svelte";
  import Notification from "$lib/assets/shared/notification.svg.svelte";
  import ProfileIcon from "$lib/assets/shared/profile-icon.svg.svelte";
  import ProfileThin from "$lib/assets/shared/profile-thin.svg.svelte";
  import { clickOutside } from "$lib/utils/click-outside";

  let modalVisible: boolean = false;
</script>

<header
  use:clickOutside={() => (modalVisible = false)}
  class="flex w-full justify-between h-16 bg-primary p-4"
>
  <button
    on:click={() => {
      modalVisible = !modalVisible;
    }}
  >
    <Image class="h-8" />
  </button>

  <div><Notification /></div>
</header>

{#if modalVisible}
  <div class=" bg-white shadow-md left-0 z-50 w-full top-16 p-4 grid gap-2">
    <a href="/" class="flex gap-2"> <Home /> Home</a>
    <a href="/customer-information" class="flex gap-2">
      <ProfileThin /> Edit profile</a
    >
  </div>
{/if}
