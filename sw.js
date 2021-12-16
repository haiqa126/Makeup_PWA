
console.log("I am automatically installing the sw.js file mow ");


self.importScripts('data/items.js');



//Files to cache
var cacheName='Makeup-store';
var appShellFiles=[
'./',
'data/items.js',
'index.html',
'app.js',
'style.css',
'favicon.ico',
'resources/material-design-lite/material.min.js.map',
'resources/material-design-lite/material.red-indigo.min.css'
];

//loading images s
var itemsImages =[];

for(var i=0; i<items.length; i++){
   itemsImages.push('data/img/'+items[i].slug +'.jpg');

}
var contentToCache=appShellFiles.concat(itemsImages);

//Installing Service Worker 
self.addEventListener('install',function(e){
console.log('[Service Worker] Install');
e.waitUntil(
caches.open(cacheName).then(function(cache){
console.log('[Service Worker] Caching all: app shell and content');
return cache.addAll(contentToCache);
})
);
});

//Fetching content using Service Worker
self.addEventListener( 'fetch', function (e) {
   e.respondWith(
   caches.match(e.request).then(function (r) {
   console.log('[Service Worker] Fetching resource:'+ e.request.url);
   console.log("did the fetching step");
   return r || fetch(e.request).then( function (response){
   return caches.open(cacheName).then(function (cache){
      console.log('[Service Worker] Caching new resource:'+e.request.url);
      cache.put(e.request, response.clone());
      return response;
   });
   });
 })
   );
   });



// Activating Service Worker
self.addEventListener('activate',(e) => {
   e.waitUntil(
   caches.keys().then ((keyList) => {
      console.log("did the activation step")
   return Promise.all(keyList.map((key)=> {
   if(cacheName.indexOf (key) ===-1) {
   return caches.delete (key);
   }
   }));
   })
   );
   });









