import React, { createContext, useContext, useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import "./Notification.css"

// Create a Context for Notifications
const NotificationContext = createContext();

// Provider Component
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    // Initialize WebSocket connection
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            client.subscribe('/topic/notifications', (notification) => {
                showNotification(JSON.parse(notification.body));
            });
        });

        setStompClient(client);

        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, []);

    const addNotification = (message, type = 'info') => {
        setNotifications((prev) => [...prev, { message, type }]);
        // Automatically remove notification after 5 seconds
        setTimeout(() => {
            setNotifications((prev) => prev.slice(1));
        }, 5000);
    };

    const showNotification = (notification) => {
        const { message, type } = notification;
        addNotification(message, type);
    };

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <NotificationDisplay notifications={notifications} />
        </NotificationContext.Provider>
    );
};

// Custom hook to use notifications
export const useNotification = () => {
    return useContext(NotificationContext);
};

// Notification Display Component
const NotificationDisplay = ({ notifications }) => {
    return (
        <div className="notification-container">
            {notifications.map((notification, index) => (
                <div key={index} className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            ))}
        </div>
    );
};