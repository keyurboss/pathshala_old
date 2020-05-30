// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js"
);

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
  appId: "1:1079147185431:web:defd50ffb1567becf5a352",
};
firebase.initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
async function notificationCloseAnalytics(event, details) {
  if(typeof details === 'string'){
    details = JSON.parse(details);
  }
  Object.keys(details).forEach((key)=>{
    if(typeof details[key] === 'object'){
      details[key] = JSON.stringify(details[key]);
    }
    // details.index = value;
  });
  let aa = await caches.open("analytics");
  let url;
  if (location.protocol === "https:") {
    url = "https://server.rpsoftech.xyz:3030";
  } else {
    url = "http://localhost:3030";
  }
  await aa.add(
    url + "/tojson/" + event + "?" + new URLSearchParams(details).toString()
  );
  return true;
}
self.addEventListener("notificationclose", function (event) {
  const dismissedNotification = event.notification;
  // console.log(dismissedNotification);
  // console.log(event);
  const promiseChain = notificationCloseAnalytics(
    "notificationclose",
    JSON.stringify(event.notification.data)
  );
  event.waitUntil(promiseChain);
});
