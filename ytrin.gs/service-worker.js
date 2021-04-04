const cacheVersion = 'v20200216';
const cacheName = 'ytrings-' + cacheVersion;

const cacheAssets = [
  '/',
  '/assets/css/ytrings.min.css',
  '/assets/webfonts/noto-serif-v8-latin-400.woff2',
  '/assets/webfonts/noto-serif-v8-latin-400italic.woff2',
  '/assets/webfonts/noto-serif-v8-latin-700.woff2',
  '/assets/images/quote-open.svg',
  '/assets/images/quote-close.svg'
];
const cacheAssetsExtras = [
];

const stashInCache = (request, response) => {
  return caches.open(cacheName)
    .then((cache) => cache.put(request, response));
};

const shouldBeIgnored = (url) => {
  for (let i = 0, il = cacheIgnore.length; i < il; i++) {
    if (url.indexOf(cacheIgnore[i]) !== -1) {
      return true;
    }
  }

  return false;
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        // These items won't block the installation of the Service Worker
        cache.addAll(cacheAssetsExtras);
        // These items must be cached for the Service Worker to complete installation
        return cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(keys
          .filter((key) => !cacheName.includes(key))
          .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Ignore non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Ignore some specific requests
  if (shouldBeIgnored(request.url)) {
    return;
  }

  if (request.headers.get('Accept').includes('text/html')) {
    // For HTML requests, try the network first, fall back to the cache
    event.respondWith(
      fetch(request)
        .then((responseFromFetch) => {
          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          const responseToCache = responseFromFetch.clone();

          event.waitUntil(
            stashInCache(request, responseToCache)
          );

          return responseFromFetch;
        }).catch((error) => {
          console.log('error', error);
          // CACHE or FALLBACK
          return caches.match(request)
            .then((responseFromCache) => responseFromCache);
        })
    );
  } else {
    // For non-HTML requests, look in the cache first, fall back to the network
    event.respondWith(
      caches.match(request)
      .then((responseFromCache) => {
        // Cache hit - return response
        if (responseFromCache) {
          return responseFromCache;
        }

        // If there isn't a cached response grab from network
        return fetch(request)
        .then((responseFromFetch) => {
          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          const responseToCache = responseFromFetch.clone();

          event.waitUntil(
            stashInCache(request, responseToCache)
          );

          return responseFromFetch;
        });
      })
    );
  }
});
