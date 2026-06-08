// Cafe a Dois - Service Worker v1
const CACHE_NAME = 'cafe-a-dois-v1';
const NOTIF_HOUR = 8; // 8h da manha

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
  scheduleNotification();
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('/cafe-a-dois/'));
});

function scheduleNotification() {
  const now = new Date();
  const target = new Date();
  target.setHours(NOTIF_HOUR, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const delay = target.getTime() - now.getTime();
  setTimeout(() => {
    showDailyNotif();
    setInterval(showDailyNotif, 24 * 60 * 60 * 1000);
  }, delay);
}

function showDailyNotif() {
  const messages = [
    'Seu desafio de hoje esta esperando! Cafe a Dois',
    'Ja fizeram o desafio de hoje? Cafe a Dois',
    'Um novo dia, um novo ato de amor. Cafe a Dois',
    'Hora do cafe a dois! Seu desafio diario chegou.',
    'Pequenos gestos, grande amor. Veja o desafio de hoje!'
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  self.registration.showNotification('Cafe a Dois', {
    body: msg,
    icon: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hot%20beverage/3D/hot_beverage_3d.png',
    badge: 'https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Hot%20beverage/3D/hot_beverage_3d.png',
    vibrate: [200, 100, 200],
    tag: 'cafe-a-dois-daily',
    requireInteraction: false,
    actions: [
      {action: 'open', title: 'Ver desafio'},
      {action: 'close', title: 'Fechar'}
    ]
  });
}
