// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

const firebaseConfig = {
    apiKey: "AIzaSyAYGFnYEXMrcDvICWHLcpSqeVYMfVilfc4",
    authDomain: "pathshala-9a06d.firebaseapp.com",
    databaseURL: "https://pathshala-9a06d.firebaseio.com",
    projectId: "pathshala-9a06d",
    storageBucket: "pathshala-9a06d.appspot.com",
    messagingSenderId: "1079147185431",
    appId: "1:1079147185431:web:defd50ffb1567becf5a352"
};
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
self.addEventListener('notificationclose', function(event) {
  const dismissedNotification = event.notification;
  console.log(dismissedNotification);
  const promiseChain = notificationCloseAnalytics();
  event.waitUntil(promiseChain);
});