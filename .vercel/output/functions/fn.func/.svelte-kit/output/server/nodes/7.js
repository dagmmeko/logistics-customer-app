import * as server from '../entries/pages/customer-information/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/customer-information/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/customer-information/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.388bc8ad.js","_app/immutable/chunks/scheduler.fab10f6a.js","_app/immutable/chunks/index.e45abffd.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/singletons.00f95ab0.js","_app/immutable/chunks/public.3b10d949.js","_app/immutable/chunks/image.svg.1c03fd4f.js","_app/immutable/chunks/index.9135b488.js","_app/immutable/chunks/stores.51e838d1.js","_app/immutable/chunks/parse.7d180a0f.js"];
export const stylesheets = ["_app/immutable/assets/public.c7454b14.css"];
export const fonts = [];
