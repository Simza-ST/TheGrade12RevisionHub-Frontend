import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { jwtDecode } from 'jwt-decode'; // Changed to named import
import Sidebar from './Sidebar';
import LoadingSpinner from './LoadingSpinner';
import NotificationHeader from './NotificationHeader';
import NotificationControls from './NotificationControls';
import NotificationStats from './NotificationStats';
import NotificationList from './NotificationList';
import './Notification.css';

const Notifications = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [user, setUser] = useState(null);

    // Get userId from JWT token
    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;
        try {
            const decoded = jwtDecode(token); // Uses named export
            return decoded.sub || decoded.userId; // Adjust based on your token's payload
        } catch (e) {
            console.error('Invalid token:', e);
            return null;
        }
    };

    const userId = getUserIdFromToken();

    // Redirect to login if no userId
    useEffect(() => {
        if (!userId) {
            setError('Please log in to view notifications.');
            navigate('/login');
        }
    }, [userId, navigate]);

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!userId) return;

            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:8080/api/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        id: data.id,
                        name: `${data.firstName} ${data.lastName}`,
                        title: data.role, // Changed from role to align with User entity
                        profilePicture: data.profilePicture || null,
                    });
                } else {
                    setError('Failed to fetch user details.');
                    navigate('/login');
                }
            } catch (error) {
                setError('Error fetching user details.');
                console.error('Error fetching user details:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [userId, navigate]);

    // WebSocket setup
    useEffect(() => {
        if (!userId) return;

        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = () => {
            console.log('Connected to WebSocket for userId:', userId);
            stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
                const data = JSON.parse(message.body);
                if (data.message && data.type === 'INFO') {
                    // Handle deletion events
                    if (data.message === 'All notifications cleared') {
                        setNotifications([]);
                    } else if (data.message === 'Notification deleted') {
                        setNotifications((prev) => prev.filter((n) => n.id !== data.id)); // Assumes id in message
                    }
                } else {
                    // Handle new or updated notifications
                    setNotifications((prev) => {
                        const exists = prev.find((n) => n.id === data.id);
                        if (exists) {
                            return prev.map((n) => (n.id === data.id ? { ...n, ...data } : n));
                        }
                        return [
                            ...prev,
                            { ...data, type: data.type?.toLowerCase() || 'info', read: data.isRead || false },
                        ];
                    });
                }
            });
        };

        stompClient.onStompError = (frame) => {
            console.error('WebSocket error:', frame);
            setError('WebSocket connection failed');
        };

        stompClient.activate();

        return () => {
            stompClient.deactivate();
            console.log('Disconnected from WebSocket');
        };
    }, [userId, setNotifications]);

    // Fetch initial notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!userId) return;

            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('jwt_token');
                const response = await fetch(`http://localhost:8080/api/notifications/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched Notifications:', data);
                    const normalizedData = data.map((notification) => ({
                        ...notification,
                        type: notification.type?.toLowerCase() || 'info',
                        read: notification.isRead || false,
                    }));
                    setNotifications(normalizedData);
                } else {
                    setError(`Failed to fetch notifications: ${response.status} ${response.statusText}`);
                }
            } catch (error) {
                setError(`Error fetching notifications: ${error.message}`);
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [userId, setNotifications]);

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        navigate('/login');
    };

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('jwt_token');
            const response = await fetch(`http://localhost:8080/api/notifications/${id}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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
            const token = localStorage.getItem('jwt_token');
            const response = await fetch(`http://localhost:8080/api/notifications/read/all/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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
            const token = localStorage.getItem('jwt_token');
            const response = await fetch(`http://localhost:8080/api/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
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
                const token = localStorage.getItem('jwt_token');
                const response = await fetch(`http://localhost:8080/api/notifications/all/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
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
        : notifications.filter((n) => n.type.toLowerCase() === filterType);

    if (loading || !user) {
        return <LoadingSpinner />;
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
                <NotificationHeader
                    user={user}
                    unreadNotifications={unreadNotifications}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
                <div className={`bg-teal-${darkMode ? '900' : '800'} bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl`}>
                    <NotificationControls
                        filterType={filterType}
                        setFilterType={setFilterType}
                        markAllAsRead={markAllAsRead}
                        deleteAllNotifications={deleteAllNotifications}
                        unreadNotifications={unreadNotifications}
                        totalNotifications={totalNotifications}
                    />
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    <NotificationStats
                        totalNotifications={totalNotifications}
                        unreadNotifications={unreadNotifications}
                        readNotifications={readNotifications}
                    />
                    <NotificationList
                        filteredNotifications={filteredNotifications}
                        markAsRead={markAsRead}
                        deleteNotification={deleteNotification}
                    />
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
            createdAt: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            type: PropTypes.string,
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default Notifications;