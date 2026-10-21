const CACHE = "pint-v39";
const ASSETS = ["./", "./index.html", "./manifest.json", "./logo-quadrat.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  const url = new URL(req.url);

  // Seite selbst: immer aus dem Netz, nur offline aus dem Cache
  if (req.mode === "navigate" || req.destination === "document") {
    e.respondWith(
      fetch(req, { cache: "no-store" })
        .then(r => {
          const kopie = r.clone();
          caches.open(CACHE).then(c => c.put("./index.html", kopie));
          return r;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Kartenkacheln: Netz zuerst, offline aus dem Cache
  if (url.hostname.includes("tile.openstreetmap.org")) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  // Alles andere: Cache zuerst
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});

self.addEventListener("message", e => { if (e.data === "skipWaiting") self.skipWaiting(); });
