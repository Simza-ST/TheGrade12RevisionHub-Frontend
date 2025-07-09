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


const Notifications = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [user, setUser] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false); // Hidden by default on mobile

    // Sync isCollapsed with showSidebar on mobile
    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

    // Set theme attribute for light/dark mode
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const token = window.sessionStorage.getItem('jwt');
                if (!token) throw new Error('No JWT token found');
                const response = await fetch('http://localhost:6262/api/user/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }
                const data = await response.json();
                setUser({
                    id: data.id,
                    name: `${data.firstName} ${data.lastName}`,
                    title: data.role,
                    profilePicture: data.profilePicture || null,
                });
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
        let stompClient = null;
        const connect = () => {
            const socket = new SockJS('http://localhost:6262/ws');
            stompClient = new Client({
                webSocketFactory: () => socket,
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                connectHeaders: {
                    Authorization: `Bearer ${window.sessionStorage.getItem('jwt')}`,
                },
                onConnect: () => {
                    console.log('Connected to WebSocket');
                    if (user) {
                        stompClient.subscribe(`/topic/notifications/${user.id}`, (message) => {
                            const data = JSON.parse(message.body);
                            console.log('WebSocket message:', data);
                            if (data.message && data.type === 'INFO') {
                                if (data.message === 'All notifications cleared') {
                                    setNotifications([]);
                                } else if (data.message === 'Notification deleted') {
                                    setNotifications((prev) => prev.filter((n) => n.id !== Number(data.id)));
                                } else if (data.message === 'All notifications marked as read') {
                                    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
                                }
                            } else if (data.id && data.isRead !== undefined) {
                                setNotifications((prev) =>
                                    prev.map((n) => (n.id === Number(data.id) ? { ...n, read: data.isRead } : n))
                                );
                            } else if (data.id) {
                                setNotifications((prev) => {
                                    const exists = prev.find((n) => n.id === Number(data.id));
                                    if (exists) {
                                        return prev.map((n) =>
                                            n.id === Number(data.id) ? { ...n, ...data, read: data.isRead || n.read } : n
                                        );
                                    }
                                    return [...prev, { ...data, type: data.type?.toLowerCase() || 'info', read: data.isRead || false }];
                                });
                            }
                        });
                    }
                },
                onStompError: (frame) => {
                    console.error('WebSocket error:', frame);
                    setError('WebSocket connection failed');
                    setTimeout(connect, 5000);
                },
            });
            stompClient.activate();
        };
        connect();
        return () => {
            if (stompClient) stompClient.deactivate();
            console.log('Disconnected from WebSocket');
        };
    }, [setNotifications, user]);

// Fetch initial notifications
    useEffect(() => {
        window.sessionStorage.removeItem('notifications'); // Clear stale data on mount
        const fetchNotifications = async () => {
            if (!user) return;
            setLoading(true);
            setError(null);
            try {
                const token = window.sessionStorage.getItem('jwt');
                const response = await fetch(`http://localhost:6262/api/user/notifications/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }
                const data = await response.json();
                console.log('FULL API Response:', data);
                console.log('Fetched Notifications:', data);
                const savedNotifications = window.sessionStorage.getItem('notifications')
                    ? JSON.parse(window.sessionStorage.getItem('notifications'))
                    : [];
                console.log("Saved notifications from sessionStorage:", savedNotifications);
                const normalizedData = data.map((notification) => {
                    const saved = savedNotifications.find((n) => n.id === notification.id);
                    const readValue = notification.hasOwnProperty('read') ? notification.read : (saved?.read || false); // Check 'read' instead of 'isRead'
                    console.log(`Normalizing ID ${notification.id}: saved.read=${saved?.read}, api.read=${notification.read}, result.read=${readValue}`);
                    return {
                        id: notification.id,
                        message: notification.message,
                        createdAt: notification.createdAt,
                        read: readValue,
                        type: notification.type?.toLowerCase() || 'info',
                    };
                });
                setNotifications(normalizedData);
            } catch (error) {
                setError(`Error fetching notifications: ${error.message}`);
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [user]);

    useEffect(() => {
        if (notifications.length > 0 && notifications.every(n => n.id && n.read !== undefined)) {
            window.sessionStorage.setItem('notifications', JSON.stringify(notifications));
            console.log('Saved to sessionStorage:', notifications);
        }
    }, [notifications]);

    const handleLogout = () => {
        window.sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const markAsRead = async (id) => {
        try {
            const token = window.sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/notifications/${id}/read`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to mark notification as read: ${response.status} ${await response.text()}`);
            }
            setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
        } catch (error) {
            setError('Error marking notification as read');
            console.error('Error marking notification as read:', error);
            try {
                const token = window.sessionStorage.getItem('jwt');
                const response = await fetch(`http://localhost:6262/api/user/notifications/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const normalizedData = data.map((notification) => ({
                        id: notification.id,
                        message: notification.message,
                        createdAt: notification.createdAt,
                        read: notification.read || false, // Use 'read' to match API
                        type: notification.type?.toLowerCase() || 'info',
                    }));
                    setNotifications(normalizedData);
                }
            } catch (fetchError) {
                setError('Error refetching notifications');
                console.error('Refetch error:', fetchError);
            }
        }
    };

    const markAllAsRead = async () => {
        try {
            const token = window.sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/notifications/read/all/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to mark all notifications as read: ${response.status} ${await response.text()}`);
            }
            setNotifications(notifications.map((n) => ({ ...n, read: true })));
        } catch (error) {
            setError('Error marking all notifications as read');
            console.error('Error marking all notifications as read:', error);
            try {
                const token = window.sessionStorage.getItem('jwt');
                const response = await fetch(`http://localhost:6262/api/user/notifications/${user.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const normalizedData = data.map((notification) => ({
                        id: notification.id,
                        message: notification.message,
                        createdAt: notification.createdAt,
                        read: notification.read || false, // Use 'read' to match API
                        type: notification.type?.toLowerCase() || 'info',
                    }));
                    setNotifications(normalizedData);
                }
            } catch (fetchError) {
                setError('Error refetching notifications');
                console.error('Refetch error:', fetchError);
            }
        }
    };

    const deleteNotification = async (id) => {
        try {
            const token = window.sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/notifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete notification');
            }
            setNotifications(notifications.filter((n) => n.id !== id));
        } catch (error) {
            setError('Error deleting notification');
            console.error('Error deleting notification:', error);
        }
    };

    const deleteAllNotifications = async () => {

        try {
            const token = window.sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/notifications/all/${user.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete all notifications');
            }
            setNotifications([]);
        } catch (error) {
            setError('Error deleting all notifications');
            console.error('Error deleting all notifications:', error);
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
                : notifications.filter((n) => n.type === filterType);

    if (loading || !user) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)] relative">
                <style>{`
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
                    .flex-nowrap {
                        flex-wrap: nowrap;
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
                    .gap-2 {
                        gap: 8px;
                    }
                    .gap-4 {
                        gap: 16px;
                    }
                    .p-4 {
                        padding: 16px;
                    }
                    .p-6 {
                        padding: 24px;
                    }
                    .sm\\:p-6 {
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
                    .mb-2 {
                        margin-bottom: 8px;
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
                    .text-base {
                        font-size: 1rem;
                        line-height: 1.5rem;
                    }
                    .text-sm {
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                    }
                    .text-xs {
                        font-size: 0.75rem;
                        line-height: 1rem;
                    }
                    .md\\:text-4xl {
                        font-size: 2.25rem;
                        line-height: 2.5rem;
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
                        font-size: 0.875rem;
                    }
                    .form-input {
                        width: 100%;
                        padding: 8px;
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        border-radius: 4px;
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        font-size: 0.875rem;
                        min-height: 40px;
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
                        font-size: 0.875rem;
                        min-height: 40px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .btn-primary:hover {
                        background-color: var(--hover-primary, #0056b3);
                    }
                    .grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 8px;
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
                    .h-10 {
                        height: 2.5rem;
                    }
                    .notification-section {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        padding: 16px;
                        border-radius: 16px;
                    }
                    .notification-list {
                        max-height: 50vh;
                        overflow-y: auto;
                        padding-right: 8px;
                    }
                    .notification-list::-webkit-scrollbar {
                        width: 6px;
                    }
                    .notification-list::-webkit-scrollbar-thumb {
                        background-color: var(--border-color, ${darkMode ? '#4b5563' : '#e5e7eb'});
                        border-radius: 3px;
                    }
                    .notification-list::-webkit-scrollbar-track {
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                    }
                    .hamburger {
                        display: none;
                        cursor: pointer;
                        background: none;
                        border: none;
                        padding: 8px;
                        position: fixed;
                        top: 16px;
                        left: 16px;
                        z-index: 50;
                        transition: left 0.3s ease-in-out;
                    }
                    .sidebar-wrapper {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        z-index: 40;
                        transition: transform 0.3s ease-in-out;
                    }
                    .sidebar-hidden {
                        transform: translateX(-100%);
                    }
                    @media (max-width: 639px) {
                        .hamburger {
                            display: block;
                        }
                        .sidebar-wrapper {
                            display: ${showSidebar ? 'block' : 'none'};
                        }
                        .hamburger {
                            left: ${showSidebar ? '198px' : '16px'};
                        }
                        .ml-16, .ml-64 {
                            margin-left: 0;
                        }
                        .notification-section {
                            padding: 12px;
                        }
                        .form-input, .btn-primary {
                            font-size: 0.75rem;
                            padding: 6px 12px;
                            min-height: 36px;
                        }
                        .text-base {
                            font-size: 0.875rem;
                        }
                        .text-sm {
                            font-size: 0.75rem;
                        }
                        .p-6 {
                            padding: 16px;
                        }
                        .sm\\:p-6 {
                            padding: 16px;
                        }
                        .sm\\:p-8 {
                            padding: 16px;
                        }
                        .notification-header-actions {
                            flex-wrap: nowrap;
                            gap: 8px;
                        }
                        .notification-header-actions > * {
                            padding: 1px 4px;
                            height: 2rem;
                        }
                        h1 {
                            font-size: 1.25rem !important;
                            line-height: 1.75rem !important;
                        }
                    }
                    @media (min-width: 640px) {
                        .grid {
                            grid-template-columns: repeat(3, 1fr);
                            gap: 12px;
                        }
                        .notification-section {
                            padding: 24px;
                        }
                        .hamburger {
                            display: none;
                        }
                        .sidebar-wrapper {
                            display: block;
                        }
                        .notification-header-actions {
                            gap: 20px;
                        }
                        .notification-header-actions > * {
                            padding: 4px 16px;
                            height: 2.5rem;
                        }
                        h1 {
                            font-size: 1.875rem !important;
                            line-height: 2.25rem !important;
                        }
                    }
                    @media (min-width: 768px) {
                        .notification-section {
                            padding: 32px;
                        }
                        h1 {
                            font-size: 2.25rem !important;
                            line-height: 2.5rem !important;
                        }
                    }
                    .notification-header-actions {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                `}</style>
                <button className="hamburger" onClick={() => {
                    setShowSidebar(!showSidebar);
                    if (!showSidebar) setIsCollapsed(false);
                }}>
                    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className={`sidebar-wrapper ${!showSidebar ? 'sidebar-hidden' : ''}`}>
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        darkMode={darkMode}
                        disableHamburger={showSidebar && window.innerWidth <= 639}
                    />
                </div>
                <div className={`flex-1 min-w-0 p-4 sm:p-6 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <NotificationHeader
                        user={user}
                        unreadNotifications={unreadNotifications}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                    <div className="notification-section mt-4">
                        <NotificationControls
                            filterType={filterType}
                            setFilterType={setFilterType}
                            markAllAsRead={markAllAsRead}
                            deleteAllNotifications={deleteAllNotifications}
                            unreadNotifications={unreadNotifications}
                            totalNotifications={totalNotifications}
                        />
                        {error && (
                            <p className="text-sm text-[var(--accent-secondary)] mb-4">{error}</p>
                        )}
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