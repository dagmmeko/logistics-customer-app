const a = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), m = [
  a + "/_app/immutable/entry/app.551a74c2.js",
  a + "/_app/immutable/assets/0.b0b8c63f.css",
  a + "/_app/immutable/nodes/0.33098ce0.js",
  a + "/_app/immutable/nodes/1.1e6afb91.js",
  a + "/_app/immutable/nodes/2.cdc0ab08.js",
  a + "/_app/immutable/nodes/3.beaacaed.js",
  a + "/_app/immutable/nodes/4.495da862.js",
  a + "/_app/immutable/nodes/5.83d2a5c0.js",
  a + "/_app/immutable/nodes/6.bfc6dc7e.js",
  a + "/_app/immutable/nodes/7.388bc8ad.js",
  a + "/_app/immutable/assets/SvelteToast.126e14af.css",
  a + "/_app/immutable/chunks/SvelteToast.svelte_svelte_type_style_lang.01e0b804.js",
  a + "/_app/immutable/chunks/arrow-right.svg.a908a917.js",
  a + "/_app/immutable/chunks/client.fa25e513.js",
  a + "/_app/immutable/chunks/image.svg.1c03fd4f.js",
  a + "/_app/immutable/chunks/index.9135b488.js",
  a + "/_app/immutable/chunks/index.e45abffd.js",
  a + "/_app/immutable/chunks/parse.7d180a0f.js",
  a + "/_app/immutable/chunks/public.3b10d949.js",
  a + "/_app/immutable/assets/public.c7454b14.css",
  a + "/_app/immutable/chunks/scheduler.fab10f6a.js",
  a + "/_app/immutable/chunks/search.svg.ad61be97.js",
  a + "/_app/immutable/chunks/singletons.00f95ab0.js",
  a + "/_app/immutable/chunks/spread.8a54911c.js",
  a + "/_app/immutable/chunks/stores.51e838d1.js",
  a + "/_app/immutable/entry/start.8b9744b2.js"
], l = [
  a + "/favicon.png",
  a + "/logo.png",
  a + "/manifest.json"
], b = "1691478136641", p = self, i = `cache-${b}`, u = [
  ...m,
  // the app itself
  ...l
  // everything in static
];
p.addEventListener("install", (e) => {
  async function s() {
    await (await caches.open(i)).addAll(u);
  }
  e.waitUntil(s());
});
p.addEventListener("activate", (e) => {
  async function s() {
    for (const t of await caches.keys())
      t !== i && await caches.delete(t);
  }
  e.waitUntil(s());
});
p.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET")
    return;
  async function s() {
    const t = new URL(e.request.url), c = await caches.open(i);
    if (u.includes(t.pathname))
      return c.match(e.request);
    try {
      const n = await fetch(e.request);
      return n.status === 200 && c.put(e.request, n.clone()), n;
    } catch {
      return c.match(e.request);
    }
  }
  e.respondWith(s());
});
