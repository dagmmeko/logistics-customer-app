<script lang="ts">
  import { Loader } from "@googlemaps/js-api-loader";
  import { browser } from "$app/environment";
  import { PUBLIC_GOOGLE_MAPS_API } from "$env/static/public";
  export let lat: number;
  export let lng: number;
  export let destinationLat: number = 0;
  export let destinationLng: number = 0;
  export let display: boolean = false;
  $: if (browser) {
    const loader = new Loader({
      apiKey: PUBLIC_GOOGLE_MAPS_API,
      version: "weekly",
    });

    console.log({ destinationLat, destinationLng });
    loader.importLibrary("places").then(async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      const map = new Map(document.getElementById("map") as HTMLElement, {
        center: { lat: lat, lng: lng },
        minZoom: 1,
        zoom: 10,
        mapTypeId: "roadmap",
        disableDefaultUI: true,
      });
      const marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map,
      });

      if (display) {
        const marker2 = new google.maps.Marker({
          position: { lat: destinationLat, lng: destinationLng },
          map,
        });

        // Create a new bounds object
        const bounds = new google.maps.LatLngBounds();

        // Extend the bounds to include the positions of both markers
        bounds.extend(marker.getPosition() as google.maps.LatLng);
        bounds.extend(marker2.getPosition() as google.maps.LatLng);

        // Adjust the map's viewport to fit the bounds
        map.fitBounds(bounds);
      } else {
        map.addListener("click", (e: any) => {
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          markers = [];
          // map.setCenter(e.latLng as google.maps.LatLng);
          marker.setPosition(e.latLng);
          lat = e.latLng.lat();
          lng = e.latLng.lng();
        });
      }

      const input = document.getElementById("pac-input") as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);

      //   map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
      });

      let markers: google.maps.Marker[] = [];

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places?.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places?.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    });
  }
</script>

<div id="map" class="w-full h-72" />
<input
  id="pac-input"
  class="w-full control p-3 text-sm mt-4 rounded"
  type="text"
  placeholder="Bole, Merkato, ...."
/>
