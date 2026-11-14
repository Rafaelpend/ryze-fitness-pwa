// RYZE 69a9bbb06af8 – generated after vite build
const CACHE = "ryze-offline-69a9bbb06af8";
const ASSETS = [
  "./",
  "./apple-touch-icon.png",
  "./assets/index-Cz9SdoUr.css",
  "./assets/index-Dur-NqxW.js",
  "./favicon-32.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./index.html",
  "./manifest.webmanifest",
  "./ryze-icon-1024.png"
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('ryze-offline-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh.ok) {
          const cache = await caches.open(CACHE);
          await cache.put('./', fresh.clone());
        }
        return fresh;
      } catch {
        const cache = await caches.open(CACHE);
        return (await cache.match('./')) || (await cache.match('./index.html')) || Response.error();
      }
    })());
  } else {
    e.respondWith((async () => {
      const cached = await caches.match(req);
      if (cached) return cached;
      return fetch(req);
    })());
  }
});
