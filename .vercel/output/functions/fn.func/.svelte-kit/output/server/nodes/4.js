import * as server from '../entries/pages/auth/signup/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/signup/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/signup/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.495da862.js","_app/immutable/chunks/scheduler.fab10f6a.js","_app/immutable/chunks/index.e45abffd.js","_app/immutable/chunks/client.fa25e513.js"];
export const stylesheets = [];
export const fonts = [];
