/* Library Stock Verification: offline support */
const VERSION = 'lsv-1.0.0';  // change this whenever index.html changes, so devices pick up the update
const SHELL = ['./index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'];
const LIBS = [
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js',
  'https://cdn.jsdelivr.net/npm/@zxing/library@0.21.3/umd/index.min.js'
];
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600;8..60,700&display=swap';
const CROSS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    try { await c.put('./', await fetch('./')); } catch (e) { }
    await Promise.all(LIBS.map(async u => {
      try { const r = await fetch(u, { mode: 'cors' }); if (r.ok) await c.put(u, r); } catch (e) { }
    }));
    try {
      const r = await fetch(FONT_CSS, { mode: 'cors' });
      if (r.ok) {
        const css = await r.clone().text(); await c.put(FONT_CSS, r);
        const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/g)].map(m => m[1]);
        await Promise.all(urls.map(async u => { try { const f = await fetch(u); if (f.ok) await c.put(u, f); } catch (e) { } }));
      }
    } catch (e) { }
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('message', e => { if (e.data === 'skip-waiting') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' && url.origin === location.origin) {
    event.respondWith((async () => (await caches.match('./index.html')) || fetch(req))());
    return;
  }
  if (url.origin === location.origin || CROSS.includes(url.hostname)) {
    event.respondWith((async () => {
      const hit = await caches.match(req, { ignoreSearch: url.origin === location.origin });
      if (hit) return hit;
      try {
        const res = await fetch(req);
        if (res && res.ok) { const c = await caches.open(VERSION); c.put(req, res.clone()); }
        return res;
      } catch (e) { return hit || Response.error(); }
    })());
  }
});
