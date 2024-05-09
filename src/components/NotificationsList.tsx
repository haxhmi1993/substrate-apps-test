// NotificationsList.tsx

import React, { useEffect, useState } from "react";
import { notificationsCollection } from "../firebase";
import {
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

const NotificationsList: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch initial data
        const initialQuerySnapshot = await getDocs(notificationsCollection);
        const initialNotifications = initialQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(initialNotifications);

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(
          notificationsCollection,
          (querySnapshot) => {
            const updatedNotifications = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotifications(updatedNotifications);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);

  const markAsRead = async (id: string) => {
    const notificationRef = doc(notificationsCollection, id);

    try {
      // Fetch the document data
      const notificationSnapshot = await getDoc(notificationRef);

      if (notificationSnapshot.exists()) {
        // Document exists, update it
        await updateDoc(notificationRef, { read: true });
        console.log("Notification updated successfully");
      } else {
        console.log("Notification does not exist");
      }
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.message}
            {!notification.read && (
              <button onClick={() => markAsRead(notification.id)}>
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsList;
