import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [groupSearchQuery, setGroupSearchQuery] = useState('');
    const [privateSearchQuery, setPrivateSearchQuery] = useState('');
    const [createGroupSearchQuery, setCreateGroupSearchQuery] = useState('');
    const [groupName, setGroupName] = useState('');
    const [selectedMemberIds, setSelectedMemberIds] = useState([]);
    const [chatMode, setChatMode] = useState('group');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [stompClient, setStompClient] = useState(null);
    const stompClientRef = useRef(null);
    const [editGroupId, setEditGroupId] = useState(null);
    const [editGroupName, setEditGroupName] = useState('');

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

    // Fetch users
    const fetchUsers = useCallback(async (query = '', type = 'private') => {
        try {
            const token = localStorage.getItem('jwt');
            const url = query.trim()
                ? `http://localhost:6262/api/chat/users/search?query=${encodeURIComponent(query)}`
                : 'http://localhost:6262/api/chat/users';
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                const userList = data.map(u => ({
                    ...u,
                    id: Number(u.id),
                }));
                setUsers(userList);
                console.log(`Fetched users for ${type}:`, userList);
            } else {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Fetch users error:', error);
            setError('Failed to fetch users: ' + error.message);
        }
    }, []);

    // Debounced search
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (user) {
                fetchUsers(groupSearchQuery, 'group');
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [groupSearchQuery, user, fetchUsers]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (user) {
                fetchUsers(privateSearchQuery, 'private');
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [privateSearchQuery, user, fetchUsers]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (user) {
                fetchUsers(createGroupSearchQuery, 'createGroup');
            }
        }, 300);
        return () => clearTimeout(delayDebounceFn);
    }, [createGroupSearchQuery, user, fetchUsers]);

    // Fetch groups
    useEffect(() => {
        const fetchGroups = async () => {
            if (!user) return;
            try {
                const token = localStorage.getItem('jwt');
                const response = await fetch('http://localhost:6262/api/chat/groups', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched groups:', data);
                    setGroups(data.map(g => ({
                        ...g,
                        id: Number(g.id),
                        creatorId: Number(g.creatorId),
                    })));
                } else {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }
            } catch (error) {
                console.error('Fetch groups error:', error);
                setError('Failed to fetch groups: ' + error.message);
            }
        };
        fetchGroups();
    }, [user]);

    // Fetch messages
    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const token = localStorage.getItem('jwt');
                let url;
                if (chatMode === 'group') {
                    url = selectedGroupId
                        ? `http://localhost:6262/api/chat/group/${selectedGroupId}${groupSearchQuery && selectedUserId ? `?senderId=${selectedUserId}` : ''}`
                        : `http://localhost:6262/api/chat/group${groupSearchQuery && selectedUserId ? `?senderId=${selectedUserId}` : ''}`;
                } else if (chatMode === 'private' && selectedUserId) {
                    url = `http://localhost:6262/api/chat/private/${selectedUserId}`;
                } else {
                    setMessages([]);
                    return;
                }
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
                        groupId: msg.groupId ? Number(msg.groupId) : null,
                        timestamp: formatDate(msg.createdAt),
                    })));
                } else {
                    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
                }
            } catch (error) {
                console.error('Fetch messages error:', error);
                setError('Failed to fetch messages: ' + error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [user, chatMode, selectedUserId, selectedGroupId, groupSearchQuery]);

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
        if (!user || stompClientRef.current) return;

        const socket = new SockJS('http://localhost:6262/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            onConnect: () => {
                console.log('WebSocket connected for user:', user.email);
                stompClientRef.current = client;
                setStompClient(client);

                client.subscribe('/topic/group', (message) => {
                    console.log('Received group message:', message.body);
                    if (chatMode === 'group' && !selectedGroupId) {
                        const data = JSON.parse(message.body);
                        if (!groupSearchQuery || data.senderId === selectedUserId) {
                            setMessages((prev) => [
                                ...prev,
                                {
                                    ...data,
                                    senderId: Number(data.senderId),
                                    recipientId: data.recipientId ? Number(data.recipientId) : null,
                                    groupId: data.groupId ? Number(data.groupId) : null,
                                    timestamp: formatDate(data.createdAt),
                                },
                            ]);
                        }
                    }
                });

                groups.forEach(group => {
                    client.subscribe(`/topic/group/${group.id}`, (message) => {
                        console.log(`Received group message for group ${group.id}:`, message.body);
                        if (chatMode === 'group' && selectedGroupId === group.id) {
                            const data = JSON.parse(message.body);
                            if (!groupSearchQuery || data.senderId === selectedUserId) {
                                setMessages((prev) => [
                                    ...prev,
                                    {
                                        ...data,
                                        senderId: Number(data.senderId),
                                        recipientId: data.recipientId ? Number(data.recipientId) : null,
                                        groupId: data.groupId ? Number(data.groupId) : null,
                                        timestamp: formatDate(data.createdAt),
                                    },
                                ]);
                            }
                        }
                    });
                });

                client.subscribe(`/user/${user.email}/queue/message`, (message) => {
                    console.log('Received private message:', message.body);
                    if (chatMode === 'private' && selectedUserId) {
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
                                    groupId: data.groupId ? Number(data.groupId) : null,
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
                stompClientRef.current = null;
                setStompClient(null);
            },
        });

        client.activate();

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.deactivate();
                console.log('WebSocket disconnected');
                stompClientRef.current = null;
            }
        };
    }, [user, groups, chatMode, selectedUserId, selectedGroupId, groupSearchQuery]);

    const handleSendMessage = () => {
        console.log('handleSendMessage called', { newMessage, user, stompClient, chatMode, selectedUserId, selectedGroupId });
        if (!newMessage.trim()) {
            console.warn('Empty message');
            setError('Message cannot be empty');
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
            groupId: chatMode === 'group' && selectedGroupId ? Number(selectedGroupId) : null,
            content: newMessage,
            type: chatMode === 'private' ? 'PRIVATE' : 'GROUP',
            createdAt: new Date().toISOString(),
        };
        try {
            console.log('Sending message:', message);
            stompClient.publish({
                destination: chatMode === 'private' ? '/app/chat/private' : selectedGroupId ? `/app/chat/group/${selectedGroupId}` : '/app/chat/group',
                body: JSON.stringify(message),
            });
            setMessages((prev) => [
                ...prev,
                {
                    ...message,
                    senderId: Number(message.senderId),
                    recipientId: message.recipientId ? Number(message.recipientId) : null,
                    groupId: message.groupId ? Number(message.groupId) : null,
                    timestamp: formatDate(message.createdAt),
                },
            ]);
            setNewMessage('');
        } catch (error) {
            console.error('Send message error:', error);
            setError('Failed to send message: ' + error.message);
        }
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            setError('Group name is required');
            return;
        }
        if (selectedMemberIds.length === 0) {
            setError('At least one member is required');
            return;
        }
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/chat/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: groupName,
                    memberIds: selectedMemberIds,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setGroups([...groups, { id: Number(data.id), name: data.name, creatorId: Number(user.id) }]);
                setGroupName('');
                setSelectedMemberIds([]);
                setCreateGroupSearchQuery('');
                setSelectedGroupId(Number(data.id));
                setError(null);
            } else {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Create group error:', error);
            setError('Failed to create group: ' + error.message);
        }
    };

    const handleEditGroup = async () => {
        if (!editGroupName.trim()) {
            setError('Group name is required');
            return;
        }
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/chat/group/${editGroupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editGroupName }),
            });
            if (response.ok) {
                const data = await response.json();
                setGroups(groups.map(g => g.id === editGroupId ? { ...g, name: data.name } : g));
                setEditGroupId(null);
                setEditGroupName('');
                setError(null);
            } else {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Edit group error:', error);
            setError('Failed to edit group: ' + error.message);
        }
    };

    const handleDeleteGroup = async (groupId) => {
        if (!window.confirm('Are you sure you want to delete this group?')) return;
        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/chat/group/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setGroups(groups.filter(g => g.id !== groupId));
                if (selectedGroupId === groupId) {
                    setSelectedGroupId(null);
                    setMessages([]);
                }
                setError(null);
            } else {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Delete group error:', error);
            setError('Failed to delete group: ' + error.message);
        }
    };

    const toggleMember = (userId) => {
        setSelectedMemberIds(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    useEffect(() => {
        console.log('selectedUserId updated:', selectedUserId);
    }, [selectedUserId]);

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
                                setGroupSearchQuery('');
                                setPrivateSearchQuery('');
                                setMessages([]);
                            }}
                            className={`px-4 py-2 rounded-lg ${chatMode === 'group' ? 'bg-teal-600' : 'bg-gray-600'} text-white`}
                        >
                            Group Chats
                        </button>
                        <button
                            onClick={() => {
                                setChatMode('private');
                                setSelectedUserId(null);
                                setGroupSearchQuery('');
                                setPrivateSearchQuery('');
                                setMessages([]);
                            }}
                            className={`px-4 py-2 rounded-lg ${chatMode === 'private' ? 'bg-teal-600' : 'bg-gray-600'} text-white`}
                        >
                            Private Chat
                        </button>
                        <button
                            onClick={() => {
                                setChatMode('createGroup');
                                setSelectedUserId(null);
                                setGroupSearchQuery('');
                                setPrivateSearchQuery('');
                                setCreateGroupSearchQuery('');
                                setMessages([]);
                            }}
                            className={`px-4 py-2 rounded-lg ${chatMode === 'createGroup' ? 'bg-teal-600' : 'bg-gray-600'} text-white`}
                        >
                            Create Group
                        </button>
                    </div>
                    {error && <p className="text-red-400 mb-4">{error}</p>}
                    {chatMode === 'group' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-white">Group Chats</h2>
                            <div className="flex flex-col gap-2 mb-4">
                                <input
                                    type="text"
                                    value={groupSearchQuery}
                                    onChange={(e) => {
                                        setGroupSearchQuery(e.target.value);
                                        setSelectedUserId(null);
                                    }}
                                    placeholder="Search users..."
                                    className="p-2 rounded-lg bg-teal-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400 w-full sm:w-64"
                                    aria-label="Search users"
                                />
                                {groupSearchQuery && (
                                    <select
                                        value={selectedUserId || ''}
                                        onChange={(e) => setSelectedUserId(Number(e.target.value))}
                                        className="p-2 rounded-lg bg-teal-700 text-white w-full sm:w-64"
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
                                )}
                            </div>
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
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                                    aria-label="Send message"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                    {chatMode === 'private' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-white">Private Chat</h2>
                            <div className="flex flex-col gap-2 mb-4">
                                <input
                                    type="text"
                                    value={privateSearchQuery}
                                    onChange={(e) => setPrivateSearchQuery(e.target.value)}
                                    placeholder="Search users..."
                                    className="p-2 rounded-lg bg-teal-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400 w-full sm:w-64"
                                    aria-label="Search users"
                                />
                                <select
                                    value={selectedUserId || ''}
                                    onChange={(e) => {
                                        const userId = e.target.value ? Number(e.target.value) : null;
                                        setSelectedUserId(userId);
                                        setMessages([]);
                                        console.log('Selected user ID:', userId);
                                    }}
                                    className="p-2 rounded-lg bg-teal-700 text-white w-full sm:w-64"
                                    disabled={users.length === 0}
                                >
                                    <option value="">Select a user</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.firstName} {u.lastName}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                    disabled={!selectedUserId}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                                    aria-label="Send message"
                                    disabled={!selectedUserId}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                    {chatMode === 'createGroup' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-white">Manage Groups</h2>
                            <div className="flex flex-col gap-2 mb-4">
                                <select
                                    value={selectedGroupId || ''}
                                    onChange={(e) => {
                                        setSelectedGroupId(Number(e.target.value) || null);
                                        setMessages([]);
                                    }}
                                    className="p-2 rounded-lg bg-teal-700 text-white w-full sm:w-64"
                                    disabled={groups.length === 0}
                                >
                                    <option value="">All Groups</option>
                                    {groups.map((g) => (
                                        <option key={g.id} value={g.id}>
                                            {g.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="max-h-48 overflow-y-auto mt-2">
                                    {groups.map((g) => (
                                        <div key={g.id} className="flex items-center justify-between p-2 bg-teal-800 rounded-lg mb-2">
                                            <span className="text-white">{g.name}</span>
                                            {user && g.creatorId === user.id && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditGroupId(g.id);
                                                            setEditGroupName(g.name);
                                                        }}
                                                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                        aria-label={`Edit group ${g.name}`}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteGroup(g.id)}
                                                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                        aria-label={`Delete group ${g.name}`}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">Create New Group</h3>
                            <div className="flex flex-col gap-2 mb-4">
                                <input
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="Enter group name..."
                                    className="p-2 rounded-lg bg-teal-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400 w-full sm:w-64"
                                    aria-label="Group name"
                                />
                                <input
                                    type="text"
                                    value={createGroupSearchQuery}
                                    onChange={(e) => setCreateGroupSearchQuery(e.target.value)}
                                    placeholder="Search users..."
                                    className="p-2 rounded-lg bg-teal-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal-400 w-full sm:w-64"
                                    aria-label="Search users"
                                />
                                {createGroupSearchQuery && (
                                    <div className="max-h-48 overflow-y-auto">
                                        {users.map((u) => (
                                            <div
                                                key={u.id}
                                                className="flex items-center p-2 border-b border-gray-600"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMemberIds.includes(u.id)}
                                                    onChange={() => toggleMember(u.id)}
                                                    className="mr-4"
                                                    aria-label={`Select ${u.firstName} ${u.lastName}`}
                                                />
                                                <span className="text-white">{u.firstName} {u.lastName}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={handleCreateGroup}
                                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                                aria-label="Create group"
                            >
                                Create Group
                            </button>
                        </div>
                    )}
                    {editGroupId && (
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
                            <div className="bg-teal-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4 text-white">Edit Group Name</h2>
                                <input
                                    type="text"
                                    value={editGroupName}
                                    onChange={(e) => setEditGroupName(e.target.value)}
                                    placeholder="Enter new group name..."
                                    className="w-full p-2 mb-2 rounded-lg bg-teal-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-400"
                                    aria-label="Edit group name"
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        onClick={() => {
                                            setEditGroupId(null);
                                            setEditGroupName('');
                                        }}
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                        aria-label="Cancel edit"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleEditGroup}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                        aria-label="Save group"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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
            content: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default Chatroom;