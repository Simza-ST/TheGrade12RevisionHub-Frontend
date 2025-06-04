import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Sidebar from './Sidebar';

const Chatroom = ({ isCollapsed = true, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [chatMode, setChatMode] = useState('group');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [stompClient, setStompClient] = useState(null);

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('jwt');
                if (!token) throw new Error('No JWT token found');
                const response = await fetch('http://localhost:6262/api/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        id: Number(data.id),
                        email: data.email,
                        name: `${data.firstName} ${data.lastName}`,
                        title: data.role,
                        profilePicture: data.profilePicture ? `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(data.profilePicture)))}` : null,
                    });
                } else {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }
            } catch (error) {
                console.error('Fetch user error:', error);
                setError(`Failed to fetch user: ${error.message}`);
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        fetchUserDetails();
    }, [navigate]);

    // Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch('http://localhost:6262/api/chat/users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsers(data.map(u => ({
                        ...u,
                        id: Number(u.id),
                    })));
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('Fetch users error:', error);
                setError('Failed to fetch users');
            }
        };
        if (user) fetchUsers();
    }, [user]);

    // Fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const token = localStorage.getItem('jwt');
                const url = chatMode === 'group'
                    ? 'http://localhost:6262/api/chat/group'
                    : `http://localhost:6262/api/chat/private/${selectedUserId}`;
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data.map(msg => ({
                        ...msg,
                        senderId: Number(msg.senderId),
                        recipientId: msg.recipientId ? Number(msg.recipientId) : null,
                        timestamp: formatDate(msg.createdAt),
                    })));
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error('Fetch messages error:', error);
                setError('Failed to fetch messages');
            } finally {
                setLoading(false);
            }
        };
        if (chatMode === 'group' || (chatMode === 'private' && selectedUserId)) {
            fetchMessages();
        }
    }, [user, chatMode, selectedUserId]);

    // Date formatting
    const formatDate = (dateString) => {
        if (!dateString || typeof dateString !== 'string') {
            return 'Unknown Date';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true,
        });
    };

    // WebSocket setup
    useEffect(() => {
        if (!user) return;
        const socket = new SockJS('http://localhost:6262/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            onConnect: () => {
                console.log('WebSocket connected for user:', user.email);
                setStompClient(client);
                client.subscribe('/topic/group', (message) => {
                    console.log('Received group message:', message.body);
                    if (chatMode === 'group') {
                        const data = JSON.parse(message.body);
                        setMessages((prev) => [
                            ...prev,
                            {
                                ...data,
                                senderId: Number(data.senderId),
                                recipientId: data.recipientId ? Number(data.recipientId) : null,
                                timestamp: formatDate(data.createdAt),
                            },
                        ]);
                    }
                });
                client.subscribe(`/user/${user.email}/queue/message`, (message) => {
                    console.log('Received private message:', message.body);
                    if (chatMode === 'private') {
                        const data = JSON.parse(message.body);
                        if (
                            (data.senderId === user.id && data.recipientId === Number(selectedUserId)) ||
                            (data.senderId === Number(selectedUserId) && data.recipientId === user.id)
                        ) {
                            setMessages((prev) => [
                                ...prev,
                                {
                                    ...data,
                                    senderId: Number(data.senderId),
                                    recipientId: data.recipientId ? Number(data.recipientId) : null,
                                    timestamp: formatDate(data.createdAt),
                                },
                            ]);
                        }
                    }
                });
            },
            onStompError: (frame) => {
                console.error('WebSocket error:', frame);
                setError('WebSocket connection failed: ' + (frame.body || frame));
            },
            onWebSocketClose: () => {
                console.log('WebSocket closed');
                setStompClient(null);
            },
        });
        client.activate();
        return () => {
            client.deactivate();
            console.log('WebSocket disconnected');
        };
    }, [user, chatMode, selectedUserId]);

    const handleSendMessage = () => {
        console.log('handleSendMessage called', { newMessage, user, stompClient, chatMode, selectedUserId });
        if (!newMessage.trim()) {
            console.warn('Empty message');
            return;
        }
        if (!user) {
            console.error('No user');
            setError('User not authenticated');
            return;
        }
        if (!stompClient || !stompClient.connected) {
            console.error('No active WebSocket connection');
            setError('No WebSocket connection');
            return;
        }
        if (chatMode === 'private' && !selectedUserId) {
            console.error('No recipient selected for private chat');
            setError('Select a user for private chat');
            return;
        }
        const message = {
            senderId: Number(user.id),
            recipientId: chatMode === 'private' ? Number(selectedUserId) : null,
            content: newMessage,
            type: chatMode === 'group' ? 'GROUP' : 'PRIVATE',
            createdAt: new Date().toISOString(),
        };
        try {
            console.log('Sending message:', message);
            stompClient.publish({
                destination: chatMode === 'group' ? '/app/chat/group' : '/app/chat/private',
                body: JSON.stringify(message),
            });
            setNewMessage('');
        } catch (error) {
            console.error('Send message error:', error);
            setError('Failed to send message: ' + error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading || !user) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

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
                        <h1 className="text-3xl font-bold">Chatroom</h1>
                        <p className="text-sm mt-1 text-gray-300">Connect with peers, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label={`View notifications (${notificationCount} unread)`}
                        >
                            🔔
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
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
                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={() => {
                                setChatMode('group');
                                setSelectedUserId(null);
                                setMessages([]);
                            }}
                            className={`px-4 py-2 rounded-lg ${
                                chatMode === 'group' ? 'bg-teal-600' : 'bg-gray-600'
                            } text-white`}
                        >
                            Group Chat
                        </button>
                        <select
                            value={selectedUserId || ''}
                            onChange={(e) => {
                                setChatMode('private');
                                setSelectedUserId(Number(e.target.value));
                                setMessages([]);
                            }}
                            className="p-2 rounded-lg bg-teal-700 text-white"
                            disabled={users.length === 0}
                        >
                            <option value="" disabled>
                                Select a user
                            </option>
                            {users.map((u) => (
                                <option key={u.id} value={u.id}>
                                    {u.firstName} {u.lastName}
                                </option>
                            ))}
                        </select>
                    </div>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    <h2 className="text-xl font-semibold mb-4 text-white">
                        {chatMode === 'group' ? 'Study Group Chat' : `Chat with ${users.find(u => u.id === selectedUserId)?.firstName || 'User'}`}
                    </h2>
                    <div className="max-h-96 overflow-y-auto mb-4">
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-2 border-b border-gray-600 ${
                                        message.senderId === user.id ? 'bg-teal-700' : 'bg-gray-700'
                                    }`}
                                >
                                    <span className="font-medium text-white">
                                        {users.find(u => u.id === message.senderId)?.firstName || message.senderId}:
                                    </span>
                                    <span className="text-gray-300"> {message.content}</span>
                                    <span className="text-sm text-gray-400 block">{message.timestamp}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300">No messages yet.</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
                            aria-label="Type a message"
                            disabled={chatMode === 'private' && !selectedUserId}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                            aria-label="Send message"
                            disabled={chatMode === 'private' && !selectedUserId}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chatroom.propTypes = {
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
        })
    ).isRequired,
};

export default Chatroom;