// التطبيق بيجيب آخر نسخة من النت الأول، ولو مفيش نت بيشتغل من النسخة المحفوظة
const CACHE = 'twh-workers-v8';
const FILES = ['./','./index.html','./style.css','./app.js','./data.js','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./art.svg','./logo-emblem.png',
  './xlsx.mini.min.js','./html-to-image.js',
  './tajawal-arabic-500-normal.woff2','./tajawal-arabic-700-normal.woff2','./tajawal-arabic-800-normal.woff2',
  './tajawal-latin-500-normal.woff2','./tajawal-latin-700-normal.woff2','./tajawal-latin-800-normal.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(async u => { try { const r = await fetch(u, { cache: 'reload' }); if (r.ok) await c.put(u, r); } catch (_) {} })))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const net = fetch(req, { cache: 'no-cache' }).then(r => { if (r && r.ok) cache.put(req, r.clone()); return r; });
    const slow = new Promise(res => setTimeout(() => res(null), 4000));
    try { const r = await Promise.race([net, slow]); if (r) return r; } catch (_) {}
    const c = await cache.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await cache.match('./index.html') : null);
    if (c) return c;
    try { return await net; } catch (_) { return Response.error(); }
  })());
});
