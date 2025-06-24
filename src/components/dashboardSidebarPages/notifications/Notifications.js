import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';
import LoadingSpinner from './LoadingSpinner';
import NotificationControls from './NotificationControls';
import NotificationStats from './NotificationStats';
import NotificationList from './NotificationList';
import './Notification.css';

const Notifications = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');

    // Set theme attribute for light/dark mode
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);


    // WebSocket setup
    useEffect(() => {
        const socket = new SockJS('http://localhost:6262/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            onConnect: () => {
                console.log('Connected to WebSocket');
                client.subscribe(`/topic/notifications`, (message) => {
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

        client.activate();

        return () => {
            client.deactivate();
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
        : filterType === 'read'
            ? notifications.filter((n) => n.read)
            : filterType === 'unread'
                ? notifications.filter((n) => !n.read)
                : notifications.filter((n) => n.type.toLowerCase() === filterType);

    if (loading || !user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
                <style>
                    {`
                        * {
                            transition: none !important;
                            animation: none !important;
                            opacity: 1 !important;
                        }
                        .full {
                            width: 100%;
                            min-height: 100vh;
                            position: relative;
                            z-index: 10;
                        }
                        .bg-[var(--bg-primary)] {
                            background-color: var(--bg-primary, ${darkMode ? '#111827' : '#f4f4f4'});
                        }
                        .bg-[var(--bg-secondary)] {
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        }
                        .bg-[var(--bg-tertiary)] {
                            background-color: var(--bg-tertiary, ${darkMode ? '#374151' : '#e5e7eb'});
                        }
                        .bg-[var(--accent-primary)] {
                            background-color: var(--accent-primary, #007bff);
                        }
                        .bg-[var(--accent-secondary)] {
                            background-color: var(--accent-secondary, #dc3545);
                        }
                        .text-[var(--text-primary)] {
                            color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        }
                        .text-[var(--text-secondary)] {
                            color: var(--text-secondary, ${darkMode ? '#d1d5db' : '#666666'});
                        }
                        .text-white {
                            color: #ffffff;
                        }
                        .hover\\:bg-[var(--hover-tertiary)]:hover {
                            background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
                        }
                        .hover\\:bg-[var(--hover-primary)]:hover {
                            background-color: var(--hover-primary, #0056b3);
                        }
                        .hover\\:text-[var(--hover-secondary)]:hover {
                            color: var(--hover-secondary, ${darkMode ? '#f87171' : '#b91c1c'});
                        }
                        .flex {
                            display: flex;
                        }
                        .min-h-screen {
                            min-height: 100vh;
                        }
                        .min-w-0 {
                            min-width: 0;
                        }
                        .justify-center {
                            justify-content: center;
                        }
                        .justify-between {
                            justify-content: space-between;
                        }
                        .items-center {
                            align-items: center;
                        }
                        .flex-1 {
                            flex: 1;
                        }
                        .gap-4 {
                            gap: 16px;
                        }
                        .p-6 {
                            padding: 24px;
                        }
                        .sm\\:p-8 {
                            padding: 32px;
                        }
                        .rounded-2xl {
                            border-radius: 16px;
                        }
                        .rounded-lg {
                            border-radius: 8px;
                        }
                        .rounded-md {
                            border-radius: 6px;
                        }
                        .mb-4 {
                            margin-bottom: 16px;
                        }
                        .mb-6 {
                            margin-bottom: 24px;
                        }
                        .mt-1 {
                            margin-top: 4px;
                        }
                        .mt-4 {
                            margin-top: 16px;
                        }
                        .shadow-[var(--shadow)] {
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .text-3xl {
                            font-size: 1.875rem;
                            line-height: 2.25rem;
                        }
                        .text-xl {
                            font-size: 1.25rem;
                            line-height: 1.75rem;
                        }
                        .text-lg {
                            font-size: 1.125rem;
                            line-height: 1.75rem;
                        }
                        .text-sm {
                            font-size: 0.875rem;
                            line-height: 1.25rem;
                        }
                        .text-xs {
                            font-size: 0.75rem;
                            line-height: 1rem;
                        }
                        .font-bold {
                            font-weight: 700;
                        }
                        .font-semibold {
                            font-weight: 600;
                        }
                        .font-medium {
                            font-weight: 500;
                        }
                        .form-label {
                            color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                            font-weight: 600;
                            margin-bottom: 8px;
                            display: block;
                        }
                        .form-input {
                            width: 100%;
                            padding: 8px;
                            border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                            border-radius: 4px;
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                            color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                            font-size: 0.875rem;
                            line-height: 1.25rem;
                        }
                        .form-input:focus {
                            border-color: var(--accent-primary, #007bff);
                            outline: none;
                        }
                        .btn-primary {
                            background-color: var(--accent-primary, #007bff);
                            color: #ffffff;
                            padding: 8px 16px;
                            border-radius: 4px;
                            border: none;
                            cursor: pointer;
                        }
                        .btn-primary:hover {
                            background-color: var(--hover-primary, #0056b3);
                        }
                        .grid {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: 16px;
                        }
                        .sm\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .-top-2 {
                            top: -8px;
                        }
                        .-right-2 {
                            right: -8px;
                        }
                        .h-5 {
                            height: 20px;
                        }
                        .w-5 {
                            width: 20px;
                        }
                        .notification-section {
                            background: ${darkMode
                        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                            border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                            padding: 32px;
                            border-radius: 16px;
                        }
                        .ml-16 {
                            margin-left: 64px;
                        }
                        .ml-64 {
                            margin-left: 256px;
                        }
                        @media (min-width: 640px) {
                            .sm\\:grid-cols-3 {
                                grid-template-columns: repeat(3, 1fr);
                            }
                            .sm\\:p-8 {
                                padding: 32px;
                            }
                        }
                        .underline {
                            text-decoration: underline;
                        }
                    `}
                </style>
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    darkMode={darkMode}
                />
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Notifications"
                        userMessage="Stay updated"
                    />
                    <main
                        className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'sm:ml-16' : 'sm:ml-64'}`}
                    >
                        <div className="notification-section">
                            <NotificationControls
                                filterType={filterType}
                                setFilterType={setFilterType}
                                markAllAsRead={markAllAsRead}
                                deleteAllNotifications={deleteAllNotifications}
                                unreadNotifications={unreadNotifications}
                                totalNotifications={totalNotifications}
                            />
                            {error && <p className="text-lg text-[var(--accent-secondary)] mb-4">{error}</p>}
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
                    </main>
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
            createdAt: PropTypes.string,
            read: PropTypes.bool.isRequired,
            type: PropTypes.string,
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default Notifications;