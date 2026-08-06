// Service Worker — membuat aplikasi bisa di-install ke home screen & bekerja offline
const CACHE = 'geojson-tools-v2';
const TILE_HOSTS = /(tile\.openstreetmap\.org|basemaps\.cartocdn\.com|arcgisonline\.com)/;
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './bsre-data.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const isTile = TILE_HOSTS.test(url.hostname);
  e.respondWith(
    caches.match(e.request).then(cached => {
      // tile di-fetch dengan mode cors -> respons ASLI (ukuran akurat, bukan opaque ~7MB)
      const doFetch = isTile ? fetch(e.request.url, { mode: 'cors' }) : fetch(e.request);
      const network = doFetch.then(res => {
        if (res && (res.ok || res.type === 'opaque')) {
          caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        }
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
