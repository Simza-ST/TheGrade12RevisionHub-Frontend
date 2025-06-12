import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Sidebar from '../../common/Sidebar';
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

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch('http://localhost:6262/api/users/me', {
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
                        title: data.role,
                        profilePicture: data.profilePicture || null,
                    });
                } else {
                    setError(`Failed to fetch user details: ${response.status} ${response.statusText}`);
                    console.error('User details response:', await response.text());
                    navigate('/login');
                }
            } catch (error) {
                setError(`Error fetching user details: ${error.message}`);
                console.error('Error fetching user details:', error);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [navigate]);

    // WebSocket setup
    useEffect(() => {
        const socket = new SockJS('http://localhost:6262/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.subscribe(`/topic/notifications`, (message) => {
                    const data = JSON.parse(message.body);
                    if (data.message && data.type === 'INFO') {
                        if (data.message === 'All notifications cleared') {
                            setNotifications([]);
                        } else if (data.message === 'Notification deleted') {
                            setNotifications((prev) => prev.filter((n) => n.id !== data.id));
                        }
                    } else {
                        setNotifications((prev) => {
                            const exists = prev.find((n) => n.id === data.id);
                            if (exists) {
                                return prev.map((n) =>
                                    n.id === data.id ? { ...n, ...data, read: data.isRead !== undefined ? data.isRead : n.read } : n
                                );
                            }
                            return [
                                ...prev,
                                { ...data, type: data.type?.toLowerCase() || 'info', read: data.isRead || false },
                            ];
                        });
                    }
                });
            },
            onStompError: (frame) => {
                console.error('WebSocket error:', frame);
                setError('WebSocket connection failed');
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
            console.log('Disconnected from WebSocket');
        };
    }, [setNotifications]);

    // Fetch initial notifications
    useEffect(() => {
        const fetchNotifications = async () => {
            if (!user) return;
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch(`http://localhost:6262/api/notifications/${user.id}`, {
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
                    console.error('Notifications response:', await response.text());
                }
            } catch (error) {
                setError(`Error fetching notifications: ${error.message}`);
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [user, setNotifications]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const markAsRead = async (id) => {
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/notifications/${id}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
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
            const response = await fetch(`http://localhost:6262/api/notifications/read/all/${user.id}`, {
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
            const token = localStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/notifications/${id}`, {
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
                const token = localStorage.getItem('jwt');
                const response = await fetch(`http://localhost:6262/api/notifications/all/${user.id}`, {
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