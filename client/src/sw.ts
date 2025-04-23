// Cast `self` to correct ServiceWorker type
const sw: ServiceWorkerGlobalScope = self as any

sw.addEventListener('install', () => {
  console.log('[SW] Installed')
  sw.skipWaiting()
})

sw.addEventListener('activate', () => {
  console.log('[SW] Activated')
  sw.clients.claim()
})

sw.addEventListener('fetch', () => {
  // Currently just passing through
})
