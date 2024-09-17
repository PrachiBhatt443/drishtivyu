'use client'
import { useEffect, useState } from "react";
import io from "socket.io-client";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:5000");

    // Check if socket connects successfully
    socket.on('connect', () => {
      console.log("Connected to WebSocket server");
    });

    socket.on('disconnect', () => {
      console.log("Disconnected from WebSocket server");
    });

    // Listen for notifications from the server
    socket.on("new_notification", (notification) => {
      console.log("Notification received:", notification); // Debugging print
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        notification.message,  // Ensure 'message' field exists in notification
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Real-time Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
