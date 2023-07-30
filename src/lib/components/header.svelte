<script lang="ts">
  let modalVisible: boolean = false;
</script>

<header class="flex w-full justify-between h-16 bg-primary p-4">
  <button on:click={() => (modalVisible = true)}>dp</button>
  <div>bell</div>

  <!-- {#if modalVisible}
    <div
      class="bg-black/70 fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center"
    >
      hello
    </div>
  {/if} -->
</header>
