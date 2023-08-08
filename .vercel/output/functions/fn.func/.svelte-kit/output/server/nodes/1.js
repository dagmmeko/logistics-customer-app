

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1e6afb91.js","_app/immutable/chunks/scheduler.fab10f6a.js","_app/immutable/chunks/index.e45abffd.js","_app/immutable/chunks/stores.51e838d1.js","_app/immutable/chunks/singletons.00f95ab0.js"];
export const stylesheets = [];
export const fonts = [];
