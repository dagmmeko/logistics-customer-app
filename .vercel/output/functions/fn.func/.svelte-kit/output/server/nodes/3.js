import * as server from '../entries/pages/auth/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.beaacaed.js","_app/immutable/chunks/scheduler.fab10f6a.js","_app/immutable/chunks/index.e45abffd.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/stores.51e838d1.js","_app/immutable/chunks/singletons.00f95ab0.js","_app/immutable/chunks/arrow-right.svg.a908a917.js","_app/immutable/chunks/client.fa25e513.js","_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.01e0b804.js","_app/immutable/chunks/index.9135b488.js","_app/immutable/chunks/parse.7d180a0f.js"];
export const stylesheets = ["_app/immutable/assets/SvelteToast.126e14af.css"];
export const fonts = [];
