;
// Asigna un nombre y version al cache
const CACHE_NAME = 'v1_cache_trainer',
urlsToCache = [
    './',
    './css/bootstrap.css',
    './style.css',
    './js/vue.js',
    './js/app.js'
]

// Durante instalacion almacena en cache los activos estaticos
self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
            .then(() => self.skipWaiting())
        })
        .catch( err => console.log('Error al registra el cache', err))
    )
})

// Cuando se activa busca los recursos para que funcione sin conexion
self.addEventListener( 'activate', e=> {
    const cacheWhitelist = [ CACHE_NAME ]

    e.waitUntil(
        caches.keys()
        .then(cachesNames => {
            cachesNames.map(cacheName => {
                // Elimina lo que ya no se necesite en el cache
                if ( cacheWhitelist.indexOf(cacheName) === -1){
                    return chaches.delete(cacheName)
                }
            })
        })
        //
    )
})

// Recupera los recurso del navegador y actualiza archivos del cache 246
self.addEventListener( 'fetch', e=> {

})