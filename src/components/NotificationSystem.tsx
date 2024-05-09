import React from "react";
import { getNotificationToken, notificationsCollection } from "../firebase";
import { addDoc } from "firebase/firestore";

const NotificationSystem: React.FC = () => {
  const sendNotification = async (message: string) => {
    try {
      await Promise.all([
        addDoc(notificationsCollection, {
          message,
          read: false,
        }),
        sendPushNotification(message),
      ]);
      console.log("Data added and notification sent!");
    } catch (error) {
      console.log("Error in writing data to db", error);
    }
  };

  const sendPushNotification = async (message: string) => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getNotificationToken();
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: 'key=AAAAiBTVJMk:APA91bF2wzkmEmL-Oh_3TKej_1UvYqX1hIhkgIlLNbfuh33OcJk4dCboaopyCOR79yV8fPEawsWg4h4qq_7dy9kWn3dxycCBvMrA7NH2EwO4M5WFheO1jdQkbukPmN6mGBkjxXLx420v'
        },
        body: JSON.stringify({
          to: token,
          notification: {
            title: message,
            body: message,
          },
        }),
      });
      const data = await response.json();
      console.log("Push notification sent:", data);
    } else {
      console.log("Notification permission denied.");
    }
  };

  return (
    <div>
      <button onClick={() => sendNotification("Notification 1")}>
        Send Notification 1
      </button>
      <button onClick={() => sendNotification("Notification 2")}>
        Send Notification 2
      </button>
      <button onClick={() => sendNotification("Notification 3")}>
        Send Notification 3
      </button>
    </div>
  );
};

export default NotificationSystem;
