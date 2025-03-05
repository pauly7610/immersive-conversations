const CACHE_NAME = 'language-learning-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/main.*.css',
  '/static/js/main.*.js',
  '/static/js/bundle.js',
  '/static/js/vendors~main.chunk.js',
  '/static/js/main.chunk.js',
  // Add other assets you want to cache
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use a more flexible approach to cache files
      return cache.addAll(
        urlsToCache.filter(url => !url.includes('*'))
      ).then(() => {
        // For wildcard URLs, fetch them individually
        return Promise.all(
          urlsToCache
            .filter(url => url.includes('*'))
            .map(pattern => {
              const basePattern = pattern.replace(/\*\.[^.]+$/, '');
              return fetch('/')
                .then(response => response.text())
                .then(html => {
                  const matches = html.match(new RegExp(`${basePattern}[^"']+`, 'g'));
                  if (matches && matches.length > 0) {
                    return Promise.all(
                      matches.map(url => cache.add(url).catch(err => console.warn(`Failed to cache ${url}:`, err)))
                    );
                  }
                  return Promise.resolve();
                });
            })
        );
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 