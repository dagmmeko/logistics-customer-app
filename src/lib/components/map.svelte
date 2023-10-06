<script lang="ts">
  import { Map, Geocoder, Marker, controls } from "@beyonk/svelte-mapbox";

  const { NavigationControl, ScaleControl } = controls;

  export let center = [38.8, 9];
  export let zoom = 10;

  $: lng = center[0];
  $: lat = center[1];

  let mapComponent: any;
  $: mapComponent?.flyTo?.({ center: [lng, lat] });
</script>

<div class=" w-full h-full">
  <Map
    accessToken="pk.eyJ1IjoiYnJvb2tiZHQiLCJhIjoiY2xqZDFndmlhMDA3YzNlbHNhMjI5anU4OSJ9.ylIJdkwj6ayDy7ue9PnFfA"
    {center}
    bind:zoom
    bind:this={mapComponent}
    on:recentre={(e) => {
      // @ts-ignore
      center = [e.detail.center.lng, e.detail.center.lat];
    }}
    on:drag={(e) => {
      // @ts-ignore
      center = [e.detail.center.lng, e.detail.center.lat];
    }}
  >
    <Marker {lat} {lng} />
    <NavigationControl />
    <ScaleControl />
  </Map>
</div>

<style>
  :global(.mapboxgl-map) {
    height: 200px;
    width: 200px;
  }
</style>
