import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDdFLd1k8ujwAa6AU_jUmuuXQdeID4SS0",
  authDomain: "react-notifications-fcbb3.firebaseapp.com",
  projectId: "react-notifications-fcbb3",
  storageBucket: "react-notifications-fcbb3.appspot.com",
  messagingSenderId: "584465065161",
  appId: "1:584465065161:web:c5b2b90e8daba23bd95918",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const messaging = getMessaging(app);
const notificationsCollection = collection(firestore, "notifications");

const getNotificationToken = async () => {
  try {
    const currentToken = await getToken(messaging);
    if (currentToken) {
      return currentToken;
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
  }
};

onMessage(messaging, (payload) => {
  console.log("Foreground Message:", payload);
  alert(`Notification received ${JSON.stringify(payload)}`)
});

export { messaging, firestore, getNotificationToken, notificationsCollection };
