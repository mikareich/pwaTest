const cacheName = "v1";
const filesToCache = [
    "index.html",
    "about.html",
    "/styles/styles.css",
    "/src/app.js",
    "/"
]

// Call install event
self.addEventListener("install", e => {
    console.log("Service Worker: installed");
})

// Call activate event

self.addEventListener("activate", e => {
    console.log("Service Worker: activated");
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    // remove old cache
                    if(cache !== cacheName){
                        console.log("Service Worker: Clearing old cachen");
                        return caches.delete(cache)
                    }
                })
            )
        })
    )

})

// Call Fetch event

self.addEventListener("fetch", e => {
    console.log("Service Worker: fetching");
    e.respondWith(
        fetch(e.request).then(res => {
            // Make Copy of response
            var resClone = res.clone();
            caches.open(cacheName).then(cache => {
                // Add response to the cache
                cache.put(e.request, resClone)
            })
            return res
        }).catch(err => {
            caches.match(e.request).then(res => res)
        })
    )
})
