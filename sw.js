// Roda da Sorte: recebe o aviso de vez e mostra a notificação
self.addEventListener(`install`, e => self.skipWaiting());
self.addEventListener(`activate`, e => e.waitUntil(self.clients.claim()));
self.addEventListener(`push`, e => {
e.waitUntil((async () => {
let name = String();
try{
const c = await caches.open(`rr-info`);
const r = await c.match(`info`);
if(r) name = (await r.json()).name || String();
}catch(err){}
const title = name ? `🎡 Sua vez, ${name}!` : `🎡 Sua vez!`;
await self.registration.showNotification(title, {
body: `O tempo já está contando. Toque para jogar.`,
icon: `icon.png`,
badge: `icon.png`,
tag: `vez`,
renotify: true
});
})());
});
self.addEventListener(`notificationclick`, e => {
e.notification.close();
e.waitUntil((async () => {
const all = await self.clients.matchAll({ type: `window`, includeUncontrolled: true });
if(all.length) return all[0].focus();
return self.clients.openWindow(`./`);
})());
});
