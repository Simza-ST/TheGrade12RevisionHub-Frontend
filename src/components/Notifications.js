import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const Notifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockNotifications = [
            { id: 1, message: 'New quiz available in Mathematics', date: '2025-05-20' },
            { id: 2, message: 'Assignment due in Physics', date: '2025-05-21' },
        ];

        setTimeout(() => {
            try {
                setNotifications(mockNotifications);
            } catch (error) {
                console.error('Error setting mock notifications:', error);
            }
        }, 1000); // Simulate API delay
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="p-8 w-full transition-all duration-300 ml-64 sm:ml-64 lg:ml-64 xl:ml-64">
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