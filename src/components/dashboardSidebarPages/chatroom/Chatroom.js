import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Sidebar from '../../common/Sidebar';
import { v4 as uuidv4 } from 'uuid';
import { FiEye, FiSend, FiTrash2, FiUser } from 'react-icons/fi';
import GroupUsersModal from './GroupUsersModal';
import ConfirmationModal from './ConfirmationModal';
import Header from "../../common/Header";

const Chatroom = ({ user, isCollapsed = true, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
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
    const [groupUsers, setGroupUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupToDelete, setGroupToDelete] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

    const isAdmin = (groupId) => {
        const group = groups.find((g) => g.id === groupId);
        return group && user && group.creatorId === user.id;
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target) && !e.target.closest('.hamburger')) {
                setShowSidebar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSidebar]);

    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

    const fetchUsers = useCallback(
        async (query = '', type = 'private') => {
            try {
                const token = sessionStorage.getItem('jwt');
                const url = query.trim()
                    ? `http://localhost:6262/api/user/chat/users/search?query=${encodeURIComponent(query)}`
                    : 'http://localhost:6262/api/user/chat/users';
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    const userList = data.map((u) => ({
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
        },
        []
    );

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

    useEffect(() => {
        const fetchGroups = async () => {
            if (!user) return;
            try {
                const token = sessionStorage.getItem('jwt');
                const response = await fetch('http://localhost:6262/api/user/chat/groups', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched groups:', data);
                    setGroups(
                        data.map((g) => ({
                            ...g,
                            id: Number(g.id),
                            creatorId: Number(g.creatorId),
                        }))
                    );
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

    const fetchGroupUsers = async (groupId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${groupId}/users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                const group = groups.find((g) => g.id === groupId);
                setGroupUsers(
                    data.map((u) => ({
                        ...u,
                        id: Number(u.id),
                        isAdmin: group && Number(u.id) === group.creatorId,
                    }))
                );
            } else {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Fetch group users error:', error);
            setError('Failed to fetch group users: ' + error.message);
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const token = sessionStorage.getItem('jwt');
                let url;
                if (chatMode === 'group') {
                    url = selectedGroupId
                        ? `http://localhost:6262/api/user/chat/group/${selectedGroupId}`
                        : `http://localhost:6262/api/user/chat/group`;
                } else if (chatMode === 'private' && selectedUserId) {
                    url = `http://localhost:6262/api/user/chat/private/${selectedUserId}`;
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
                    setMessages(
                        data
                            .map((msg) => ({
                                ...msg,
                                senderId: Number(msg.senderId),
                                recipientId: msg.recipientId ? Number(msg.recipientId) : null,
                                groupId: msg.groupId ? Number(msg.groupId) : null,
                                timestamp: formatDate(msg.createdAt),
                            }))
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    );
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
    }, [user, chatMode, selectedUserId, selectedGroupId]);

    const formatDate = (dateString, timeZone = 'Africa/Johannesburg') => {
        if (!dateString || typeof dateString !== 'string') {
            console.warn('Invalid date string:', dateString);
            return 'Unknown Date';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.warn('Invalid date:', dateString);
            return 'Invalid Date';
        }
        const formatted = date.toLocaleString('en-US', {
            timeZone,
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        console.log(`Raw: ${dateString}, UTC: ${date.toISOString()}, Formatted: ${formatted} (TimeZone: ${timeZone})`);
        return formatted;
    };

    const updateMessagesWithServerResponse = useCallback((data) => {
        setMessages((prev) => {
            const existingIndex = prev.findIndex(
                (msg) => msg.tempId && msg.content === data.content && msg.senderId === Number(data.senderId)
            );
            if (existingIndex !== -1) {
                const updatedMessages = [...prev];
                updatedMessages[existingIndex] = {
                    ...data,
                    senderId: Number(data.senderId),
                    recipientId: data.recipientId ? Number(data.recipientId) : null,
                    groupId: data.groupId ? Number(data.groupId) : null,
                    timestamp: formatDate(data.createdAt),
                    id: data.id || uuidv4(),
                };
                return updatedMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (!prev.some((msg) => msg.id === data.id)) {
                return [
                    ...prev,
                    {
                        ...data,
                        senderId: Number(data.senderId),
                        recipientId: data.recipientId ? Number(data.recipientId) : null,
                        groupId: data.groupId ? Number(data.groupId) : null,
                        timestamp: formatDate(data.createdAt),
                        id: data.id || uuidv4(),
                    },
                ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
            return prev.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        });
    }, []);

    const updateGroupUsersWithServerResponse = useCallback((data) => {
        setGroupUsers(
            data.users.map((u) => ({
                ...u,
                id: Number(u.id),
            }))
        );
    }, []);

    useEffect(() => {
        if (!user || stompClientRef.current) return;
        const socket = new SockJS('http://localhost:6262/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            connectHeaders: {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
            },
            onConnect: () => {
                console.log('WebSocket connected for user:', user.email);
                stompClientRef.current = client;
                setStompClient(client);
                client.subscribe('/topic/group', (message) => {
                    console.log('Received group message:', message.body);
                    if (chatMode === 'group' && !selectedGroupId) {
                        const data = JSON.parse(message.body);
                        updateMessagesWithServerResponse(data);
                    }
                });
                groups.forEach(group => {
                    client.subscribe(`/topic/group/${group.id}`, (message) => {
                        console.log(`Received group message for group ${group.id}:`, message.body);
                        if (chatMode === 'group' && selectedGroupId === group.id) {
                            const data = JSON.parse(message.body);
                            updateMessagesWithServerResponse(data);
                        }
                    });
                    client.subscribe(`/topic/group/${group.id}/users`, (message) => {
                        console.log(`Received group users update for group ${group.id}:`, message.body);
                        if (editGroupId === group.id) {
                            const data = JSON.parse(message.body);
                            updateGroupUsersWithServerResponse(data);
                        }
                    });
                });
                client.subscribe(`/user/${user.id}/queue/message`, (message) => {
                    console.log('Received private message:', message.body);
                    if (chatMode === 'private' && selectedUserId) {
                        const data = JSON.parse(message.body);
                        if (
                            (data.senderId === user.id && data.recipientId === Number(selectedUserId)) ||
                            (data.senderId === Number(selectedUserId) && data.recipientId === user.id)
                        ) {
                            updateMessagesWithServerResponse(data);
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
                client.deactivate();
                console.log('WebSocket disconnected');
                stompClientRef.current = null;
            }
        };
    }, [
        user,
        groups,
        chatMode,
        selectedUserId,
        selectedGroupId,
        editGroupId,
        updateMessagesWithServerResponse,
        updateGroupUsersWithServerResponse,
    ]);

    const handleAddUser = async (userId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${editGroupId}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId: Number(userId) }),
            });
            if (response.ok) {
                const userToAdd = users.find((u) => u.id === Number(userId));
                if (userToAdd) {
                    const group = groups.find((g) => g.id === editGroupId);
                    setGroupUsers([...groupUsers, {
                        ...userToAdd,
                        isAdmin: group && Number(userToAdd.id) === group.creatorId,
                    }]);
                }
                setError(null);
                if (stompClient && stompClient.connected) {
                    stompClient.publish({
                        destination: `/app/group/${editGroupId}/users`,
                        body: JSON.stringify({ users: [...groupUsers, userToAdd] }),
                    });
                }
            } else {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Add user error:', error);
            setError('Failed to add user: ' + error.message);
        }
    };

    const handleRemoveUser = async (userId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${editGroupId}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setGroupUsers(groupUsers.filter((u) => u.id !== userId));
                setError(null);
                if (stompClient && stompClient.connected) {
                    stompClient.publish({
                        destination: `/app/group/${editGroupId}/users`,
                        body: JSON.stringify({ users: groupUsers.filter((u) => u.id !== userId) }),
                    });
                }
            } else {
                throw new Error(`HTTP ${response.status}: ${await response.text()}`);
            }
        } catch (error) {
            console.error('Remove user error:', error);
            setError('Failed to remove user: ' + error.message);
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim()) {
            setError('Message cannot be empty');
            return;
        }
        if (!user) {
            setError('User not authenticated');
            return;
        }
        if (!stompClient || !stompClient.connected) {
            setError('No WebSocket connection');
            return;
        }
        if (chatMode === 'private' && !selectedUserId) {
            setError('Select a user for private chat');
            return;
        }
        const tempId = uuidv4();
        const message = {
            senderId: Number(user.id),
            recipientId: chatMode === 'private' ? Number(selectedUserId) : null,
            groupId: chatMode === 'group' && selectedGroupId ? Number(selectedGroupId) : null,
            content: newMessage,
            type: chatMode === 'private' ? 'PRIVATE' : 'GROUP',
            createdAt: new Date().toISOString(),
            tempId,
        };
        try {
            stompClient.publish({
                destination:
                    chatMode === 'private' ? '/app/chat/private' : selectedGroupId ? `/app/chat/group/${selectedGroupId}` : '/app/chat/group',
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
                    id: tempId,
                },
            ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
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
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/user/chat/group', {
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
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${editGroupId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ name: editGroupName }),
            });
            if (response.ok) {
                const data = await response.json();
                setGroups(groups.map((g) => (g.id === editGroupId ? { ...g, name: data.name } : g)));
                setEditGroupId(null);
                setEditGroupName('');
                setGroupUsers([]);
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
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/user/chat/group/${groupId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                setGroups(groups.filter((g) => g.id !== groupId));
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

    const openDeleteModal = (groupId) => {
        setGroupToDelete(groupId);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (groupToDelete) {
            await handleDeleteGroup(groupToDelete);
            setIsModalOpen(false);
            setGroupToDelete(null);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setGroupToDelete(null);
    };

    const toggleMember = (userId) => {
        setSelectedMemberIds((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const getSenderName = (senderId) => {
        if (senderId === user.id) return 'You';
        const sender = users.find((u) => u.id === senderId);
        return sender ? `${sender.firstName} ${sender.lastName}` : `User ${senderId}`;
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading || !user) {
        return (
            <div className="full">
                <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)] relative">
                <style>{`
                    :root {
                        --bg-primary: ${darkMode ? '#111827' : '#f4f4f4'};
                        --bg-secondary: ${darkMode ? '#1f2937' : '#ffffff'};
                        --bg-tertiary: ${darkMode ? '#374151' : '#f3f4f6'};
                        --text-primary: ${darkMode ? '#f3f4f6' : '#1f2937'};
                        --text-secondary: ${darkMode ? '#d1d5db' : '#6b7280'};
                        --accent-primary: #4FD1C5;
                        --accent-secondary: #ef4444;
                        --hover-primary: #3CB7AB;
                        --hover-tertiary: ${darkMode ? '#4b5563' : '#e5e7eb'};
                        --border-color: ${darkMode ? '#4b5563' : '#e5e7eb'};
                        --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
                    }

                    .full {
                        width: 100%;
                        min-height: 100vh;
                        position: relative;
                        z-index: 10;
                    }

                    .chat-section {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                        border-radius: 12px;
                        box-shadow: var(--shadow);
                        padding: 24px;
                        height: calc(100vh - 80px);
                        display: flex;
                        flex-direction: column;
                    }

                    .message-container {
                        flex: 1;
                        overflow-y: auto;
                        padding: 16px;
                        border-radius: 8px;
                        background-color: var(--bg-secondary);
                        margin-bottom: 16px;
                    }

                    .message-container::-webkit-scrollbar {
                        width: 6px;
                    }

                    .message-container::-webkit-scrollbar-thumb {
                        background-color: var(--border-color);
                        border-radius: 3px;
                    }

                    .message-container::-webkit-scrollbar-track {
                        background-color: var(--bg-secondary);
                    }

                    .message {
                        margin-bottom: 12px;
                        padding: 12px 16px;
                        border-radius: 12px;
                        max-width: 75%;
                        word-break: break-word;
                        animation: fadeIn 0.3s ease-in;
                    }

                    .message.sent {
                        background-color: var(--accent-primary);
                        color: white;
                        margin-left: auto;
                    }

                    .message.received {
                        background-color: var(--bg-tertiary);
                        color: var(--text-primary);
                    }

                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .form-input {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid var(--border-color);
                        border-radius: 8px;
                        background-color: var(--bg-secondary);
                        color: var(--text-primary);
                        font-size: 0.875rem;
                        transition: border-color 0.2s ease, box-shadow 0.2s ease;
                    }

                    .form-input:focus {
                        border-color: var(--accent-primary);
                        box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.1);
                        outline: none;
                    }

                    .btn-primary {
                        background-color: var(--accent-primary);
                        color: white;
                        padding: 10px 16px;
                        border-radius: 8px;
                        border: none;
                        cursor: pointer;
                        font-size: 0.875rem;
                        font-weight: 500;
                        transition: background-color 0.2s ease;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .btn-primary:hover {
                        background-color: var(--hover-primary);
                    }

                    .btn-secondary {
                        background-color: var(--bg-tertiary);
                        color: var(--text-primary);
                        padding: 10px 16px;
                        border-radius: 8px;
                        border: none;
                        cursor: pointer;
                        font-size: 0.875rem;
                        font-weight: 500;
                        transition: background-color 0.2s ease;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .btn-secondary:hover {
                        background-color: var(--hover-tertiary);
                    }

                    .hamburger {
                        display: none;
                        cursor: pointer;
                        background: none;
                        border: none;
                        padding: clamp(6px, 1.5vw, 8px);
                        position: fixed;
                        top: clamp(12px, 3vw, 16px);
                        left: clamp(12px, 3vw, 16px);
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

                    .dashboard-content {
                        max-height: 80vh;
                        overflow-y: auto;
                        padding-right: clamp(6px, 1.5vw, 8px);
                    }

                    .dashboard-content::-webkit-scrollbar {
                        width: 6px;
                    }

                    .dashboard-content::-webkit-scrollbar-thumb {
                        background-color: var(--border-color);
                        border-radius: 3px;
                    }

                    .dashboard-content::-webkit-scrollbar-track {
                        background-color: var(--bg-secondary);
                    }

                    @media (max-width: 639px) {
                        .hamburger {
                            display: block;
                            left: ${showSidebar ? 'clamp(192px, 48vw, 198px)' : 'clamp(12px, 3vw, 16px)'};
                        }

                        .sidebar-wrapper {
                            display: ${showSidebar ? 'block' : 'none'};
                        }

                        .chat-section {
                            padding: 16px;
                            height: calc(100vh - 64px);
                        }

                        .message {
                            max-width: 85%;
                        }

                        .header h1 {
                            padding-left: clamp(48px, 12vw, 56px);
                        }

                        .sidebar-open .header h1 {
                            padding-left: clamp(208px, 50vw, 216px);
                        }

                        .sidebar-open .dashboard-content {
                            margin-left: clamp(192px, 48vw, 198px);
                        }

                        .ml-16, .ml-64 {
                            margin-left: 0;
                        }
                    }

                    @media (min-width: 640px) {
                        .hamburger {
                            display: none;
                        }

                        .sidebar-wrapper {
                            display: block;
                        }
                    }
                `}</style>

                <button
                    className="hamburger"
                    onClick={() => {
                        setShowSidebar(!showSidebar);
                        if (!showSidebar) setIsCollapsed(false);
                    }}
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>

                <div ref={sidebarRef} className={`sidebar-wrapper ${!showSidebar ? 'sidebar-hidden' : ''}`}>
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        darkMode={darkMode}
                        disableHamburger={showSidebar && window.innerWidth <= 639}
                    />
                </div>

                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Chatroom"
                        userMessage="Connect with peers"
                        className="header"
                    />
                    <div className={`flex-1 min-w-0 p-4 sm:p-6 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content ${showSidebar ? 'sidebar-open' : ''}`}>
                        <div className="chat-section">
                            <div className="flex items-center gap-3 mb-6">
                                {['group', 'private', 'createGroup'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => {
                                            setChatMode(mode);
                                            if (mode === 'group') setSelectedUserId(null);
                                            if (mode === 'private') setSelectedGroupId(null);
                                            setPrivateSearchQuery('');
                                            setCreateGroupSearchQuery('');
                                            setMessages([]);
                                        }}
                                        className={`px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                                            chatMode === mode
                                                ? 'bg-[var(--accent-primary)] text-white'
                                                : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--hover-tertiary)]'
                                        }`}
                                    >
                                        {mode === 'group' && 'Group Chats'}
                                        {mode === 'private' && 'Private Chat'}
                                        {mode === 'createGroup' && 'Manage Groups'}
                                    </button>
                                ))}
                            </div>

                            {error && (
                                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {chatMode === 'group' && (
                                <div className="flex flex-col flex-1">
                                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Group Chats</h2>
                                    <select
                                        value={selectedGroupId || ''}
                                        onChange={(e) => {
                                            setSelectedGroupId(Number(e.target.value) || null);
                                            setMessages([]);
                                        }}
                                        className="form-input mb-4"
                                        disabled={groups.length === 0}
                                    >
                                        <option value="">Main Group Chat</option>
                                        {groups.map((g) => (
                                            <option key={g.id} value={g.id}>
                                                {g.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="message-container">
                                        {messages.length > 0 ? (
                                            messages.map((msg) => (
                                                <div
                                                    key={msg.id || msg.tempId}
                                                    className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}
                                                >
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="font-semibold text-sm">
                                                            {getSenderName(msg.senderId)}:
                                                        </span>
                                                        <span className="text-sm">{msg.content}</span>
                                                    </div>
                                                    <p className="text-xs text-[var(--text-secondary)] mt-1">{msg.timestamp}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-[var(--text-secondary)] text-center">No messages found.</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 mt-4">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="form-input flex-1"
                                            aria-label="Message input"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="btn-primary min-w-[44px] min-h-[44px]"
                                            aria-label="Send message"
                                        >
                                            <FiSend className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {chatMode === 'private' && (
                                <div className="flex flex-col flex-1">
                                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Private Chat</h2>
                                    <div className="flex flex-col gap-3 mb-4">
                                        <input
                                            type="text"
                                            value={privateSearchQuery}
                                            onChange={(e) => setPrivateSearchQuery(e.target.value)}
                                            placeholder="Search users..."
                                            className="form-input"
                                            aria-label="Search users"
                                        />
                                        <select
                                            value={selectedUserId || ''}
                                            onChange={(e) => {
                                                const userId = e.target.value ? Number(e.target.value) : null;
                                                setSelectedUserId(userId);
                                                setMessages([]);
                                                console.log('Selected user:', userId);
                                            }}
                                            className="form-input"
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
                                    <div className="message-container">
                                        {messages.length > 0 ? (
                                            messages.map((msg) => (
                                                <div
                                                    key={msg.id || msg.tempId}
                                                    className={`message ${msg.senderId === user.id ? 'sent' : 'received'}`}
                                                >
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="font-semibold text-sm">
                                                            {getSenderName(msg.senderId)}:
                                                        </span>
                                                        <span className="text-sm">{msg.content}</span>
                                                    </div>
                                                    <p className="text-xs text-[var(--text-secondary)] mt-1">{msg.timestamp}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-[var(--text-secondary)] text-center">No messages yet.</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 mt-4">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="form-input flex-1"
                                            aria-label="Type a message"
                                            disabled={!selectedUserId}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="btn-primary min-w-[44px] min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!selectedUserId}
                                            aria-label="Send message"
                                        >
                                            <FiSend className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {chatMode === 'createGroup' && (
                                <div className="flex flex-col flex-1">
                                    <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Manage Groups</h2>
                                    <div className="max-h-[300px] overflow-y-auto mb-4">
                                        {groups.map((g) => (
                                            <div key={g.id} className="flex items-center justify-between p-3 bg-[var(--bg-tertiary)] rounded-lg mb-2">
                                                <span className="text-sm font-medium text-[var(--text-primary)] truncate max-w-[200px]">
                                                    {g.name}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditGroupId(g.id);
                                                            setEditGroupName(g.name);
                                                            fetchGroupUsers(g.id);
                                                        }}
                                                        className="btn-secondary min-w-[40px] min-h-[40px]"
                                                        aria-label={`View users in group ${g.name}`}
                                                    >
                                                        {user && g.creatorId === user.id ? (
                                                            <FiUser className="w-5 h-5" />
                                                        ) : (
                                                            <FiEye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                    {user && g.creatorId === user.id && (
                                                        <button
                                                            onClick={() => openDeleteModal(g.id)}
                                                            className="btn-secondary min-w-[40px] min-h-[40px] hover:bg-red-500 hover:text-white"
                                                            aria-label={`Delete group ${g.name}`}
                                                        >
                                                            <FiTrash2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Create New Group</h3>
                                    <div className="flex flex-col gap-3 mb-4">
                                        <input
                                            type="text"
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                            placeholder="Enter group name..."
                                            className="form-input"
                                            aria-label="Group name"
                                        />
                                        <input
                                            type="text"
                                            value={createGroupSearchQuery}
                                            onChange={(e) => setCreateGroupSearchQuery(e.target.value)}
                                            placeholder="Search users..."
                                            className="form-input"
                                            aria-label="Search users"
                                        />
                                        {createGroupSearchQuery && (
                                            <div className="max-h-[200px] overflow-y-auto">
                                                {users.map((u) => (
                                                    <div key={u.id} className="flex items-center p-2 border-b border-[var(--border-color)]">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedMemberIds.includes(u.id)}
                                                            onChange={() => toggleMember(u.id)}
                                                            className="mr-3 h-4 w-4"
                                                            aria-label={`Select ${u.firstName} ${u.lastName}`}
                                                        />
                                                        <span className="text-sm text-[var(--text-primary)]">
                                                            {u.firstName} {u.lastName}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleCreateGroup}
                                        className="btn-primary w-full sm:w-auto"
                                        aria-label="Create group"
                                    >
                                        Create Group
                                    </button>
                                </div>
                            )}

                            {editGroupId && (
                                <GroupUsersModal
                                    editGroupId={editGroupId}
                                    editGroupName={editGroupName}
                                    setEditGroupName={setEditGroupName}
                                    setEditGroupId={setEditGroupId}
                                    handleEditGroup={handleEditGroup}
                                    groupUsers={groupUsers}
                                    handleRemoveUser={handleRemoveUser}
                                    availableUsers={users}
                                    handleAddUser={handleAddUser}
                                    isAdmin={isAdmin(editGroupId)}
                                    currentUserId={user.id}
                                />
                            )}

                            <ConfirmationModal
                                isOpen={isModalOpen}
                                onClose={closeModal}
                                onConfirm={confirmDelete}
                                title="Confirm Group Deletion"
                                message="Are you sure you want to delete this group? This action cannot be undone."
                            />
                        </div>
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
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default Chatroom;