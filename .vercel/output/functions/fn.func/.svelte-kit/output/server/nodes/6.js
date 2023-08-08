import * as server from '../entries/pages/create-order/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/create-order/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/create-order/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.bfc6dc7e.js","_app/immutable/chunks/scheduler.fab10f6a.js","_app/immutable/chunks/index.e45abffd.js","_app/immutable/chunks/stores.51e838d1.js","_app/immutable/chunks/singletons.00f95ab0.js","_app/immutable/chunks/public.3b10d949.js","_app/immutable/chunks/search.svg.ad61be97.js","_app/immutable/chunks/arrow-right.svg.a908a917.js"];
export const stylesheets = ["_app/immutable/assets/public.c7454b14.css"];
export const fonts = [];
