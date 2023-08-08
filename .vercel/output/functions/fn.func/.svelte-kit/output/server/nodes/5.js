import * as server from '../entries/pages/auth/signup-error/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/signup-error/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/signup-error/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.83d2a5c0.js","_app/immutable/chunks/scheduler.fab10f6a.js","_app/immutable/chunks/index.e45abffd.js"];
export const stylesheets = [];
export const fonts = [];
