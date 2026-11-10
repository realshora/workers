// خدمة التخزين المؤقت: التطبيق يفتح فورًا ويشتغل من غير نت، ويتحدث في الخلفية
const CACHE = 'twh-workers-v3';
const FILES = ['./','./index.html','./style.css','./app.js','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./art.svg','./logo-emblem.png',
  './vendor/xlsx.mini.min.js','./vendor/html-to-image.js',
  './fonts/tajawal-arabic-500-normal.woff2','./fonts/tajawal-arabic-700-normal.woff2','./fonts/tajawal-arabic-800-normal.woff2',
  './fonts/tajawal-latin-500-normal.woff2','./fonts/tajawal-latin-700-normal.woff2','./fonts/tajawal-latin-800-normal.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(async u => { try { const r = await fetch(u, { cache: 'reload' }); if (r.ok) await c.put(u, r); } catch (_) {} })))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: true });
    const refresh = fetch(req).then(async r => { if (r && r.ok) await cache.put(req, r.clone()); return r; }).catch(() => null);
    if (cached) { e.waitUntil(refresh); return cached; }
    return (await refresh) || (await cache.match('./index.html')) || Response.error();
  })());
});
