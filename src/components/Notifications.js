import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"; // Adjust path as needed

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/notifications', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setNotifications(data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
        fetchNotifications();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Notifications</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Your Notifications</h2>
                    <ul className="space-y-2">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className="p-2 bg-gray-100 rounded flex justify-between"
                                >
                                    <span>{notification.message}</span>
                                    <span className="text-sm text-gray-500">
                                        {notification.date}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No notifications available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notifications;