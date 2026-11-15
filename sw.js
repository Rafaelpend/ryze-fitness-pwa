// RYZE 125e370a62da – generated after vite build
const CACHE = "ryze-offline-125e370a62da";
const ASSETS = [
  "./",
  "./apple-touch-icon.png",
  "./assets/index-Bd4goVBS.js",
  "./assets/index-C6ValNII.css",
  "./favicon-32.png",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./index.html",
  "./manifest.webmanifest",
  "./ryze-icon-1024.png",
  "./sfx/neon/finish.wav",
  "./sfx/neon/ready.wav",
  "./sfx/neon/rest.wav",
  "./sfx/neon/set.wav",
  "./sfx/neon/time.wav",
  "./sfx/prism/finish.wav",
  "./sfx/prism/ready.wav",
  "./sfx/prism/rest.wav",
  "./sfx/prism/set.wav",
  "./sfx/prism/time.wav",
  "./sfx/titan/finish.wav",
  "./sfx/titan/ready.wav",
  "./sfx/titan/rest.wav",
  "./sfx/titan/set.wav",
  "./sfx/titan/time.wav",
  "./sfx/velocity/finish.wav",
  "./sfx/velocity/ready.wav",
  "./sfx/velocity/rest.wav",
  "./sfx/velocity/set.wav",
  "./sfx/velocity/time.wav"
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
// System push notifications: iOS decides the actual notification sound.
self.addEventListener('push', event => {
  event.waitUntil((async () => {
    let data = {};
    try { data = event.data ? event.data.json() : {}; } catch { /* no payload */ }
    const title = typeof data.title === 'string' ? data.title : 'RYZE';
    const body = typeof data.body === 'string' ? data.body : 'Dein Timer ist fertig!';
    const icon = new URL('./icon-192.png', self.registration.scope).href;
    await self.registration.showNotification(title, {
      body, icon, badge: icon, tag:'ryze-timer',
      data:{ target: new URL('./?ryzePush=1', self.registration.scope).href },
    });
  })());
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil((async () => {
    const destination = event.notification.data?.target || new URL('./?ryzePush=1', self.registration.scope).href;
    const windows = await self.clients.matchAll({ type:'window',includeUncontrolled:true });
    for (const client of windows) {
      if (client.url.startsWith(self.registration.scope)) {
        await client.focus();
        client.postMessage({ type:'RYZE_PUSH_OPEN' });
        return;
      }
    }
    if (self.clients.openWindow) await self.clients.openWindow(destination);
  })());
});
