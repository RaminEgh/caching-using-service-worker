const CACHE_NAME = 'api-cache-v1'
const API_URL = 'https://jsonplaceholder.typicode.com/photos'
const getTimestamp = new Date().getTime()

// Install event
self.addEventListener('install', () => {
   self.skipWaiting() // Force the new service worker to activate immediately
})

// Activate event (clean up old caches)
self.addEventListener('activate', (event) => {
   event.waitUntil(
      caches.keys().then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cache) => {
               if (cache !== CACHE_NAME) {
                  console.log('Service Worker: Clearing Old Cache')
                  return caches.delete(cache)
               }
            })
         )
      })
   )
})

self.addEventListener('fetch', (event) => {
   const requestUrl = new URL(event.request.url)
   console.log(requestUrl.pathname)
   if (requestUrl.href.startsWith(API_URL)) {
      event.respondWith(
         caches.match(event.request).then((cachedResponse) => {
            console.log(getTimestamp)
            // If there's a cached response, return it
            if (cachedResponse) {
               console.log('Returning cached data for:', event.request.url)
               return cachedResponse
            }

            // Otherwise, fetch from the network
            return fetch(event.request)
               .then((networkResponse) => {
                  // If the response is OK, cache it
                  if (networkResponse.ok) {
                     return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone())
                        return networkResponse
                     })
                  }
                  return networkResponse
               })
               .catch(() => {
                  // If the fetch fails (e.g., offline), return cached data if available
                  return caches.match(event.request).then((offlineCache) => {
                     if (offlineCache) {
                        return offlineCache // Return cached data when offline
                     } else {
                        return new Response('Network error and no cached data available.')
                     }
                  })
               })
         })
      )
   }
})
