const CACHE_NAME = 'excursao-v1';
const ASSETS = [
  './',
  './index.html',
  './passengeiro.html', 
  './app.js',
  './manifest.json',
  'https://flaticon.com'
];

// Instala o Service Worker e guarda os arquivos no cache do celular
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercepta as requisições: tenta o cache primeiro, se não tiver, busca na rede
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
