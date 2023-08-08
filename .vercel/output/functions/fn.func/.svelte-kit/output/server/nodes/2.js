import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.cdc0ab08.js","_app/immutable/chunks/scheduler.fab10f6a.js","_app/immutable/chunks/index.e45abffd.js","_app/immutable/chunks/search.svg.ad61be97.js","_app/immutable/chunks/image.svg.1c03fd4f.js"];
export const stylesheets = [];
export const fonts = [];
