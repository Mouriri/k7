const CACHE_NAME = 'k7-vtc-pwa-v2';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/aeroports.html',
  '/parcs-attractions.html',
  '/excursions.html',
  '/mise-a-disposition.html',
  '/politique-confidentialite.html',
  '/en/index.html',
  '/es/index.html',
  '/de/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/assets/logo.png',
  '/assets/hero_bg.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/icon-maskable-192.png',
  '/assets/icon-maskable-512.png',
  '/assets/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('PWA Pre-cache partial warning:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Skip analytics and external third-party widgets
  if (
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('trustindex.io')
  ) {
    return;
  }

  // Network-first strategy for HTML navigation pages (always fresh rates/promos, offline fallback)
  if (request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return networkResponse;
        })
        .catch(() => {
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // Stale-while-revalidate for static assets (CSS, JS, images, fonts)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});
