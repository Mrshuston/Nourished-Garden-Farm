self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
// Keep authenticated pages and program access network-only so account data is never shared by a cache.
