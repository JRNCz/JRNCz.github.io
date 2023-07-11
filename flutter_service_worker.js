'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "cf372d5eb01aa3dfecc5f383e4469291",
"assets/assets/anonymous.png": "55d7dc610a289612cd2b49654bf0e1ea",
"assets/assets/barrier.png": "eea670d3dac376384688fc54c776bca3",
"assets/assets/bus-stop.png": "75141ca2e208ac6f11dc1758a7fefcb8",
"assets/assets/bus.png": "41f1588afec2dbc2e111e1e2ec309eda",
"assets/assets/busstopgreen.png": "920801ab0e10351eb3f74a759acfe4b3",
"assets/assets/busstopyellow.png": "9680bd3e93a8233f183986650eb3d176",
"assets/assets/car-park.png": "7ab507edffea97aa636b0633a4e6fe21",
"assets/assets/chosen.png": "1d649d611fe1922f807f424578661ced",
"assets/assets/cleaning.png": "49468f8eb83e773a1b759f7ce97c6c94",
"assets/assets/clock.png": "138a4b0790daceb044bf73ed8f443fd3",
"assets/assets/comment.png": "d08ce29e58d5fa42d1fad6aad4e8ac16",
"assets/assets/crowd.png": "2878b13cab0e6418150959f1a2243775",
"assets/assets/desktop.ini": "5aa4b1ca454c199bfe5e9de6e46b5800",
"assets/assets/general.png": "3c496ee5cadd13d2cb6c58b4579aadd7",
"assets/assets/hands.png": "ea026add0ea4ece450871582376c1155",
"assets/assets/import.png": "0c43203ecd2f7422bbfea81d9f73fbdf",
"assets/assets/inesc.png": "2d371cd64dc8f7ced3aa53563ab69cbc",
"assets/assets/infrastructure.png": "71a83d2b887894db9608f9a1b2648f6e",
"assets/assets/ist.png": "48137acaf00d48428c7bd8725911f25e",
"assets/assets/lamp.png": "22f17ec338c963f8c938eca573f024f2",
"assets/assets/lock.png": "9539efe6c3fda1d8c2ba00352294b1c8",
"assets/assets/log-in.png": "18698c15e7974016687842543fcdb1bc",
"assets/assets/luggage.png": "9dcb67ed049cf6553086b7d5ce250464",
"assets/assets/maintenance.png": "ebbc0f8062a59959814d24b45970745f",
"assets/assets/mobility-station.png": "25bdbf00fecb0f32856139f3219b091d",
"assets/assets/mypointlogo.png": "bae6281452600c767b3255816adfdb25",
"assets/assets/photo-camera.png": "81a7d6b1542bf4593c1eee21884262dd",
"assets/assets/protection.png": "b46e9a07d6538d1cc9eb7ecc38ef05cd",
"assets/assets/qos.png": "29c2aae2777618778197d80910b0c3f4",
"assets/assets/road.png": "16ba6d247dab586398044d76b31039b2",
"assets/assets/signage.png": "37f7d6858d373d912f184538638588ba",
"assets/assets/sofa.png": "dcdce4c638b95557e5916c7971c1560e",
"assets/assets/store.png": "74db0209245ca04276ac597b63faaf1d",
"assets/assets/support.png": "c2112ba7b25919bea590097e5c5ebb70",
"assets/dotenv": "c55b8e2eb998ecfa7eff2f1b1407fcf6",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "86c14684544e496ec374ee8edd1c5972",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "ad83d7d762c7466963b7f9ccc98542d0",
"/": "ad83d7d762c7466963b7f9ccc98542d0",
"main.dart.js": "b50951f1cf23d3ea539414fed8c8a646",
"manifest.json": "0f017dd1dd2a771aac6378faed18c338",
"version.json": "94d31139d4baed6d75660505b75c3b72"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
