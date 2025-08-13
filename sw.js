// Service Worker for 浪漫表白工具
const CACHE_NAME = 'romantic-confession-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/heart-animation.html',
    '/love-cards.html',
    '/love-game.html',
    '/photo-gallery.html',
    '/music-player.html',
    '/settings.html',
    '/styles/main.css',
    '/styles/heart-animation.css',
    '/styles/love-cards.css',
    '/styles/love-game.css',
    '/styles/photo-gallery.css',
    '/scripts/main.js',
    '/scripts/heart-animation.js',
    '/scripts/love-cards.js',
    '/scripts/love-game.js',
    '/scripts/photo-gallery.js',
    '/manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 安装事件
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('缓存已打开');
                return cache.addAll(urlsToCache);
            })
    );
});

// 激活事件
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('删除旧缓存:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 获取事件
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // 如果缓存中有请求的资源，返回缓存的版本
                if (response) {
                    return response;
                }
                
                // 否则从网络获取资源
                return fetch(event.request).then(function(response) {
                    // 检查是否是有效的响应
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // 克隆响应
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(function() {
                    // 如果网络请求失败，尝试返回离线页面或默认内容
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// 消息事件处理
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// 通知点击事件
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});

// 后台同步事件
self.addEventListener('sync', function(event) {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // 这里可以处理后台同步任务
    return Promise.resolve();
} 