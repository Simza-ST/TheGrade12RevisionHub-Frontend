import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const Notifications = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    // Fetch notifications from API
    useEffect(() => {
        const fetchNotifications = async () => {
            console.log('Loading started');
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    setError('No authentication token found. Please log in.');
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                } else {
                    const headers = {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    };
                    const response = await fetch('/api/notifications', { headers });
                    await new Promise((resolve) => setTimeout(resolve, 2000));
                    if (response.ok) {
                        const data = await response.json();
                        console.log('Fetched Notifications:', data);
                        const normalizedData = data.map((notification) => ({
                            ...notification,
                            type: notification.type || 'info',
                        }));
                        setNotifications(normalizedData);
                    } else {
                        setError(`Failed to fetch notifications: ${response.status} ${response.statusText}`);
                    }
                }
            } catch (error) {
                setError(`Error fetching notifications: ${error.message}`);
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
                console.log('Loading ended');
            }
        };
        fetchNotifications();
    }, [setNotifications]);

    useEffect(() => {
        console.log('Current Notifications State:', notifications);
    }, [notifications]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('No authentication token found');
                return;
            }
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
                setNotifications(notifications.map((n) =>
                    n.id === id ? { ...n, read: true } : n
                ));
            } else {
                setError('Failed to mark notification as read');
            }
        } catch (error) {
            setError('Error marking notification as read');
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('No authentication token found');
                return;
            }
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
                setNotifications(notifications.map((n) => ({ ...n, read: true })));
            } else {
                setError('Failed to mark all notifications as read');
            }
        } catch (error) {
            setError('Error marking all notifications as read');
            console.error('Error marking all notifications as read:', error);
        }
    };

    const deleteNotification = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('No authentication token found');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`/api/notifications/${id}`, {
                method: 'DELETE',
                headers,
            });
            if (response.ok) {
                setNotifications(notifications.filter((n) => n.id !== id));
            } else {
                setError('Failed to delete notification');
            }
        } catch (error) {
            setError('Error deleting notification');
            console.error('Error deleting notification:', error);
        }
    };

    const deleteAllNotifications = async () => {
        if (window.confirm('Are you sure you want to delete all notifications?')) {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    setError('No authentication token found');
                    return;
                }
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
                } else {
                    setError('Failed to delete all notifications');
                }
            } catch (error) {
                setError('Error deleting all notifications');
                console.error('Error deleting all notifications:', error);
            }
        }
    };

    const totalNotifications = notifications.length;
    const unreadNotifications = notifications.filter((n) => !n.read).length;
    const readNotifications = notifications.filter((n) => n.read).length;
    const filteredNotifications = filterType === 'all'
        ? notifications
        : notifications.filter((n) => n.type === filterType);

    if (loading) {
        return (
            <>
                <style>
                    {`
                        .custom-spin {
                            animation: custom-spin 1s linear infinite;
                            border-radius: 50%;
                            height: 3rem;
                            width: 3rem;
                            border-top: 2px solid #2dd4bf;
                            border-bottom: 2px solid #2dd4bf;
                        }
                        @keyframes custom-spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
                <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                    <div className="custom-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
                </div>
            </>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={darkMode}
            />
            <div
                className={`
                    flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
                    ${isCollapsed ? 'ml-16' : 'ml-64'}
                `}
            >
                <div className="bg-gradient-to-r from-teal-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Notifications</h1>
                        <p className="text-sm mt-1 text-gray-300">Stay updated, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label={`View notifications (${unreadNotifications} unread)`}
                        >
                            🔔
                            {unreadNotifications > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {unreadNotifications}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className={`bg-teal-${darkMode ? '900' : '800'} bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Your Notifications</h2>
                        <div className="flex items-center gap-4">
                            <select
                                className="border rounded-lg px-2 py-1 text-sm text-white bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
                                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
                                style={{ boxShadow: '2px 6px 15px rgba(0, 0, 200, 0.4)' }}
                                disabled={unreadNotifications === 0}
                            >
                                Mark All as Read
                            </button>
                            <button
                                onClick={deleteAllNotifications}
                                className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition transform hover:-translate-y-1"
                                style={{ boxShadow: '2px 6px 15px rgba(250, 0, 20, 0.4)' }}
                                disabled={totalNotifications === 0}
                            >
                                Delete All
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <p className="bg-red-100 text-red-800 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition">
                            Total Notifications: {totalNotifications}
                        </p>
                        <p className="bg-blue-100 text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-200 transition">
                            Unread Notifications: {unreadNotifications}
                        </p>
                        <p className="bg-green-100 text-green-800 font-medium py-2 px-4 rounded-lg hover:bg-green-200 transition">
                            Read Notifications: {readNotifications}
                        </p>
                    </div>
                    <ul className="space-y-2">
                        {filteredNotifications.length > 0 ? (
                            filteredNotifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    className={`p-2 rounded flex justify-between items-center ${
                                        notification.read ? 'bg-teal-700' : 'bg-teal-600'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-sm font-medium ${
                                                notification.type === 'info'
                                                    ? 'text-blue-400'
                                                    : notification.type === 'warning'
                                                        ? 'text-yellow-400'
                                                        : notification.type === 'error'
                                                            ? 'text-red-400'
                                                            : 'text-gray-400'
                                            }`}
                                        >
                                            [{notification.type ? notification.type.toUpperCase() : 'UNKNOWN'}]
                                        </span>
                                        <span className="text-white">{notification.message}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-300">
                                            {new Date(notification.date).toLocaleString()}
                                        </span>
                                        {!notification.read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-sm text-teal-400 hover:underline"
                                                aria-label={`Mark notification ${notification.message} as read`}
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="text-sm text-red-400 hover:underline"
                                            aria-label={`Delete notification ${notification.message}`}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-300">No notifications available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

Notifications.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            type: PropTypes.oneOf(['info', 'warning', 'error', undefined]),
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default Notifications;