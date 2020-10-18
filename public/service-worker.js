const FILES_TO_CACHE = [
  "/",
  '/index.html',
  '/assets/css/styles.css',
  '/dist/manifest.json',
  '/dist/index.bundle.js',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js@2.8.0',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

const STATIC_CACHE = "static-cache-v2";
const RUNTIME_CACHE = "runtime-cache";

self.addEventListener('install', event => {
  console.log("Service Worker: Installed!");
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        cache.addAll(FILES_TO_CACHE)
        console.log("Service Worker: Files Cached");
      })
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
  console.log("Service Worker: Activated");
  const currentCaches = [STATIC_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        // return array of cache names that are old to delete
        console.log("present cache: " + cacheNames)
        return cacheNames.filter(
          cacheName => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map(
            (cacheToDelete) => {
              console.log("Service Worker: clearing" + cacheToDelete);
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// self.addEventListener('fetch', (event) => {
//   if (event.request.url.startsWith(self.location.origin)) {
//     event.respondWith(
//       caches.match(event.request).then((cachedResponse) => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         return caches.open(RUNTIME_CACHE).then((cache) => {
//           return fetch(event.request).then((response) => {
//             return cache.put(event.request, response.clone()).then(() => {
//               return response;
//             });
//           });
//         });
//       })
//     );
//   }
// });



self.addEventListener("fetch", event => {
  console.log("Service Worker: Fetching");
  // non GET requests are not cached and requests to other origins are not cached
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin)
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // handle runtime GET requests for data from /api routes
  if (event.request.url.includes("/api/transaction")) {
    // make network request and fallback to cache if network request fails (offline)
    event.respondWith(
      caches
      .open(RUNTIME_CACHE)
      .then(cache => {
        return fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => caches.match(event.request));
      })
    );
    return;
  }

  // use cache first for all other requests for performance
  event.respondWith(
    caches.match(event.request)
    .then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // request is not in cache. make network request and cache the response
      return caches.open(RUNTIME_CACHE)
      .then(cache => {
        return fetch(event.request)
        .then(response => {
          return cache.put(event.request, response.clone())
          .then(() => {
            return response;
          });
        });
      });
    })
  );
});