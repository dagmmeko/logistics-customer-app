import { c as create_ssr_component, k as createEventDispatcher, s as setContext, o as onDestroy, t as getContext, a as add_attribute } from "./ssr.js";
import { w as writable } from "./index2.js";
const contextKey = {};
class EventQueue {
  constructor() {
    this.queue = writable([]);
    this.unsubscribe = null;
    this.started = false;
  }
  send(command, params = []) {
    if (!command) {
      return;
    }
    this.queue.update((q) => [...q, [command, params]]);
  }
  start(map) {
    this.unsubscribe = this.queue.subscribe((queue) => {
      while (queue.length) {
        const [command, params] = queue.shift();
        map[command].apply(map, params);
      }
    });
    this.started = true;
  }
  stop() {
    if (!this.started) {
      return;
    }
    this.unsubscribe();
    this.queue = writable([]);
    this.started = false;
  }
}
const Map_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "div.svelte-1kuj9kb{width:100%;height:100%}",
  map: null
};
const Map = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { map = null } = $$props;
  let { version = "v2.12.0" } = $$props;
  let { center = [0, 0] } = $$props;
  let { zoom = 9 } = $$props;
  let { zoomRate = 1 } = $$props;
  let { wheelZoomRate = 1 } = $$props;
  let { options = {} } = $$props;
  let { accessToken } = $$props;
  let { customStylesheetUrl = false } = $$props;
  let { style = "mapbox://styles/mapbox/streets-v11" } = $$props;
  createEventDispatcher();
  setContext(contextKey, {
    getMap: () => map,
    getMapbox: () => mapbox
  });
  let container;
  let mapbox;
  Object.assign(
    {
      accessToken,
      container,
      style,
      center,
      zoom,
      zoomRate,
      wheelZoomRate,
      version,
      customStylesheetUrl,
      map
    },
    options
  );
  const queue = new EventQueue();
  onDestroy(() => {
    queue.stop();
    map = void 0;
  });
  function fitBounds(bbox, data = {}) {
    queue.send("fitBounds", [bbox, data]);
  }
  function flyTo(destination, data = {}) {
    queue.send("flyTo", [destination, data]);
  }
  function resize() {
    queue.send("resize");
  }
  function setCenter(coords, data = {}) {
    queue.send("setCenter", [coords, data]);
  }
  function setZoom(value, data = {}) {
    queue.send("setZoom", [value, data]);
  }
  function addControl(control, position = "top-right") {
    queue.send("addControl", [control, position]);
  }
  function getMap() {
    return map;
  }
  function getMapbox() {
    return mapbox;
  }
  if ($$props.map === void 0 && $$bindings.map && map !== void 0)
    $$bindings.map(map);
  if ($$props.version === void 0 && $$bindings.version && version !== void 0)
    $$bindings.version(version);
  if ($$props.center === void 0 && $$bindings.center && center !== void 0)
    $$bindings.center(center);
  if ($$props.zoom === void 0 && $$bindings.zoom && zoom !== void 0)
    $$bindings.zoom(zoom);
  if ($$props.zoomRate === void 0 && $$bindings.zoomRate && zoomRate !== void 0)
    $$bindings.zoomRate(zoomRate);
  if ($$props.wheelZoomRate === void 0 && $$bindings.wheelZoomRate && wheelZoomRate !== void 0)
    $$bindings.wheelZoomRate(wheelZoomRate);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.accessToken === void 0 && $$bindings.accessToken && accessToken !== void 0)
    $$bindings.accessToken(accessToken);
  if ($$props.customStylesheetUrl === void 0 && $$bindings.customStylesheetUrl && customStylesheetUrl !== void 0)
    $$bindings.customStylesheetUrl(customStylesheetUrl);
  if ($$props.style === void 0 && $$bindings.style && style !== void 0)
    $$bindings.style(style);
  if ($$props.fitBounds === void 0 && $$bindings.fitBounds && fitBounds !== void 0)
    $$bindings.fitBounds(fitBounds);
  if ($$props.flyTo === void 0 && $$bindings.flyTo && flyTo !== void 0)
    $$bindings.flyTo(flyTo);
  if ($$props.resize === void 0 && $$bindings.resize && resize !== void 0)
    $$bindings.resize(resize);
  if ($$props.setCenter === void 0 && $$bindings.setCenter && setCenter !== void 0)
    $$bindings.setCenter(setCenter);
  if ($$props.setZoom === void 0 && $$bindings.setZoom && setZoom !== void 0)
    $$bindings.setZoom(setZoom);
  if ($$props.addControl === void 0 && $$bindings.addControl && addControl !== void 0)
    $$bindings.addControl(addControl);
  if ($$props.getMap === void 0 && $$bindings.getMap && getMap !== void 0)
    $$bindings.getMap(getMap);
  if ($$props.getMapbox === void 0 && $$bindings.getMapbox && getMapbox !== void 0)
    $$bindings.getMapbox(getMapbox);
  $$result.css.add(css$1);
  zoom && setZoom(zoom);
  return `<div class="svelte-1kuj9kb">${map ? `${slots.default ? slots.default({}) : ``}` : ``} </div>`;
});
const Geocoder_svelte_svelte_type_style_lang = "";
const GeolocateControl_svelte_svelte_type_style_lang = "";
const css = {
  code: "div.svelte-1pfu5h6{display:none}",
  map: null
};
const GeolocateControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();
  let { position = "top-left" } = $$props;
  let { options = {} } = $$props;
  let dispatcher;
  const geolocate = new mapbox.GeolocateControl(options);
  map.addControl(geolocate, position);
  function trigger() {
    geolocate.trigger();
  }
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  if ($$props.trigger === void 0 && $$bindings.trigger && trigger !== void 0)
    $$bindings.trigger(trigger);
  $$result.css.add(css);
  return `<div class="svelte-1pfu5h6"${add_attribute("this", dispatcher, 0)}></div>`;
});
const NavigationControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();
  let { position = "top-right" } = $$props;
  let { options = {} } = $$props;
  const nav = new mapbox.NavigationControl(options);
  map.addControl(nav, position);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  return ``;
});
const ScaleControl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const { getMap, getMapbox } = getContext(contextKey);
  const map = getMap();
  const mapbox = getMapbox();
  let { position = "bottom-right" } = $$props;
  let { options = {} } = $$props;
  const optionsWithDefaults = Object.assign({ maxWidth: 80, unit: "metric" }, options);
  const scale = new mapbox.ScaleControl(optionsWithDefaults);
  map.addControl(scale, position);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  return ``;
});
const controls = {
  GeolocateControl,
  NavigationControl,
  ScaleControl
};
const PUBLIC_MAPBOX_TOKEN = "pk.eyJ1IjoiYnJvb2tiZHQiLCJhIjoiY2xqZDFndmlhMDA3YzNlbHNhMjI5anU4OSJ9.ylIJdkwj6ayDy7ue9PnFfA";
export {
  Map as M,
  PUBLIC_MAPBOX_TOKEN as P,
  controls as c
};
