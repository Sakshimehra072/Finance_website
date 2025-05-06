// sw.js - Service Worker File

const CACHE_NAME = 'Pixie';
const ASSETS_TO_CACHE = [
    '/index.html',
    '/about.html',
    '/contact.html',
    '/one-page.html',
   
    '/vendor/bootstrap/css/bootstrap.min.css',
    '/vendor/bootstrap/css/bootstrap.css',
    '/vendor/bootstrap/css/bootstrap.css.map',
    '/vendor/bootstrap/css/bootstrap.min.css.map',
  ];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});