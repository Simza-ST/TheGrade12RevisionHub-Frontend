import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar";

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [filterType, setFilterType] = useState('all');//filter state
    const [loading, setLoading] = useState(false);//loading state
    const [error, setError] = useState(null); //error state


    //fetch notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
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
                }else{
                    setError('Failed to fetch notifications');
                }
            } catch (error) {
                setError('Error fetching notifications');
                console.error('Error fetching notifications:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    //Calculate notification counts
    const totalNotifications = notifications.length;
    const unreadNotifications = notifications.filter(n => !n.read).length;
    const readNotifications = notifications.filter(n => n.read).length;

    //filter notifications by type
    const filteredNotifications = filterType ==='all' ? notifications : notifications.filter(n => n.type === filterType);

    // Mark a single notification as read
    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`/api/notifications/${id}/read`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ read: true }),
            });
            if (response.ok) {
                setNotifications(notifications.map(n =>
                    n.id === id ? { ...n, read: true } : n
                ));
            }
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

// Mark all notifications as read
    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch('/api/notifications/read-all', {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ read: true }),
            });
            if (response.ok) {
                setNotifications(notifications.map(n => ({ ...n, read: true })));
            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };
    //Delete a single notification
    const deleteNotification = async (id) => {
        try{
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`/api/notifications/${id}`,{
                method:'DELETE',
                headers,
            });
            if(response.ok){
                setNotifications(notifications.filter(n => n.id !==id));
            }
        }catch(error){
            console.log('Error deleting notification:', error);
        }
    };

    // Delete all notifications
    const deleteAllNotifications = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch('/api/notifications', {
                method: 'DELETE',
                headers,
            });
            if (response.ok) {
                setNotifications([]);
            }
        } catch (error) {
            console.error('Error deleting all notifications:', error);
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Notifications</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Your Notifications</h2>
                        <div className="flex items-center gap-4">
                            <select
                                className="border rounded-lg px-2 py-1 text-sm"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="info">Info</option>
                                <option value="warning">Warning</option>
                                <option value="error">Error</option>
                            </select>
                            <button
                                onClick={markAllAsRead}
                                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                                disabled={unreadNotifications === 0}
                            >
                                Mark All as Read
                            </button>
                            <button
                                onClick={deleteAllNotifications}
                                className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                                disabled={totalNotifications === 0}
                            >
                                Delete All
                            </button>
                        </div>
                    </div>

                    {/*Notification summary*/}
                    <div className = "grid grid-cols-1 sm:grid-cols3 gap-4 mb-6" >
                        <p className = "bg-red-100 text-red-800 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition">
                            Total Notifications: {totalNotifications}
                        </p>
                        <p className = "bg-blue-100 text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-200 transition">
                            Unread Notifications: {unreadNotifications}
                        </p>
                        <p className = "bg-green-100 text-green-800 font-medium py-2 px-4 rounded-lg hover:bg-green-200 transition">
                            Read Notifications: {readNotifications}
                        </p>
                    </div>



                    {/*Notification list*/}
                    {/* Notification List */}
                    {loading ? (
                        <p className="text-gray-600">Loading notifications...</p>
                    ) : error ? (
                        <p className="text-red-600">{error}</p>
                    ) : filteredNotifications.length > 0 ? (
                        <ul className="space-y-2">
                            {filteredNotifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className={`p-2 rounded-lg flex justify-between items-center ${
                                        notification.read ? 'bg-gray-100' : 'bg-blue-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                    <span
                        className={`text-sm font-medium ${
                            notification.type === 'info'
                                ? 'text-blue-600'
                                : notification.type === 'warning'
                                    ? 'text-yellow-600'
                                    : 'text-red-600'
                        }`}
                    >
                      [{notification.type.toUpperCase()}]
                    </span>
                                        <span className={notification.read ? 'text-gray-600' : 'text-blue-800 font-medium'}>
                      {notification.message}
                    </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {new Date(notification.date).toLocaleString()}
                    </span>
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-sm text-blue-600 hover:underline"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="text-sm text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No notifications available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;