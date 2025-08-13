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
                    :not(.sidebar-wrapper, .hamburger, .dashboard-content, .header, .header h1) {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                    }
                    .sidebar-wrapper,
                    .hamburger,
                    .dashboard-content,
                    .header,
                    .header h1 {
                        transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, margin-left 0.3s ease-in-out, padding-left 0.3s ease-in-out;
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
                    .text-red-500 {
                        color: #ef4444;
                    }
                    .text-red-600 {
                        color: #dc2626;
                    }
                    .hover\\:bg-[var(--hover-tertiary)]:hover {
                        background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
                    }
                    .hover\\:bg-[var(--hover-primary)]:hover {
                        background-color: var(--hover-primary, #0056b3);
                    }
                    .hover\\:bg-red-300:hover {
                        background-color: #fca5a5;
                    }
                    .flex {
                        display: flex;
                    }
                    .flex-col {
                        flex-direction: column;
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
                        gap: clamp(4px, 1vw, 8px);
                    }
                    .gap-4 {
                        gap: clamp(8px, 2vw, 16px);
                    }
                    .p-2 {
                        padding: clamp(4px, 1vw, 8px);
                    }
                    .p-3 {
                        padding: clamp(6px, 1.5vw, 12px);
                    }
                    .p-4 {
                        padding: clamp(8px, 2vw, 16px);
                    }
                    .sm\\:p-6 {
                        padding: clamp(12px, 3vw, 24px);
                    }
                    .sm\\:p-8 {
                        padding: clamp(16px, 4vw, 32px);
                    }
                    .rounded-lg {
                        border-radius: clamp(4px, 1vw, 8px);
                    }
                    .rounded-md {
                        border-radius: clamp(3px, 0.8vw, 6px);
                    }
                    .mb-2 {
                        margin-bottom: clamp(4px, 1vw, 8px);
                    }
                    .mb-4 {
                        margin-bottom: clamp(8px, 2vw, 16px);
                    }
                    .mb-6 {
                        margin-bottom: clamp(12px, 3vw, 24px);
                    }
                    .mt-1 {
                        margin-top: clamp(2px, 0.5vw, 4px);
                    }
                    .mt-2 {
                        margin-top: clamp(4px, 1vw, 8px);
                    }
                    .mt-4 {
                        margin-top: clamp(8px, 2vw, 16px);
                    }
                    .shadow-[var(--shadow)] {
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .text-xl {
                        font-size: clamp(1.125rem, 3.5vw, 1.25rem);
                    }
                    .text-lg {
                        font-size: clamp(1rem, 3vw, 1.125rem);
                    }
                    .text-base {
                        font-size: clamp(0.875rem, 2.5vw, 1rem);
                    }
                    .text-sm {
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                    }
                    .text-xs {
                        font-size: clamp(0.625rem, 1.8vw, 0.75rem);
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
                        color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
                        font-weight: 600;
                        margin-bottom: clamp(6px, 1.5vw, 8px);
                        display: block;
                    }
                    .form-input {
                        width: 100%;
                        padding: clamp(6px, 1.5vw, 8px);
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        border-radius: clamp(3px, 0.8vw, 4px);
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                    }
                    .form-input:focus {
                        border-color: var(--accent-primary, #007bff);
                        outline: none;
                    }
                    .btn-primary {
                        background-color: var(--accent-primary, #007bff);
                        color: #ffffff;
                        padding: clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px);
                        border-radius: clamp(3px, 0.8vw, 4px);
                        border: none;
                        cursor: pointer;
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                        min-height: 36px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .btn-primary:hover {
                        background-color: var(--hover-primary, #0056b3);
                    }
                    .disabled\\:opacity-50:disabled {
                        opacity: 0.5;
                    }
                    .disabled\\:cursor-not-allowed:disabled {
                        cursor: not-allowed;
                    }
                    .grid {
                        display: grid;
                        gap: clamp(8px, 2vw, 16px);
                    }
                    .sm\\:grid-cols-3 {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    .h-4 {
                        height: clamp(12px, 3vw, 16px);
                    }
                    .w-4 {
                        width: clamp(12px, 3vw, 16px);
                    }
                    .min-w-[36px] {
                        min-width: clamp(28px, 7vw, 36px);
                    }
                    .min-h-[36px] {
                        min-height: clamp(28px, 7vw, 36px);
                    }
                    .min-w-[40px] {
                        min-width: clamp(32px, 8vw, 40px);
                    }
                    .min-h-[40px] {
                        min-height: clamp(32px, 8vw, 40px);
                    }
                    .min-w-[60px] {
                        min-width: clamp(48px, 12vw, 60px);
                    }
                    .max-h-[50vh] {
                        max-height: 50vh;
                    }
                    .max-h-48 {
                        max-height: clamp(160px, 40vw, 192px);
                    }
                    .overflow-y-auto {
                        overflow-y: auto;
                    }
                    .truncate {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .max-w-[150px] {
                        max-width: clamp(120px, 30vw, 150px);
                    }
                    .border-b {
                        border-bottom-width: 1px;
                    }
                    .border-[var(--border-color)] {
                        border-color: var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                    }
                    .chat-section {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        padding: clamp(16px, 4vw, 32px);
                        border-radius: clamp(8px, 2vw, 16px);
                    }
                    .animate-spin {
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
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
                        background-color: var(--border-color, ${darkMode ? '#4b5563' : '#e5e7eb'});
                        border-radius: 3px;
                    }
                    .dashboard-content::-webkit-scrollbar-track {
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                    }
                    .underline {
                        text-decoration: underline;
                    }
                    .list-disc {
                        list-style-type: disc;
                    }
                    .list-inside {
                        list-style-position: inside;
                    }
                    .space-y-1 > * + * {
                        margin-top: clamp(3px, 0.8vw, 4px);
                    }
                    @media (max-width: 639px) {
                        .header h1 {
                            padding-left: clamp(48px, 12vw, 56px);
                        }
                        .sidebar-open .header h1 {
                            padding-left: clamp(208px, 50vw, 216px);
                        }
                        .sidebar-open .dashboard-content {
                            margin-left: clamp(192px, 48vw, 198px);
                        }
                        .hamburger {
                            display: block;
                        }
                        .sidebar-wrapper {
                            display: ${showSidebar ? 'block' : 'none'};
                        }
                        .hamburger {
                            left: ${showSidebar ? 'clamp(192px, 48vw, 198px)' : 'clamp(12px, 3vw, 16px)'};
                        }
                        .ml-16, .ml-64 {
                            margin-left: 0;
                        }
                        .p-4, .sm\\:p-6, .sm\\:p-8 {
                            padding: clamp(8px, 2vw, 10px);
                        }
                        .text-xl {
                            font-size: clamp(0.875rem, 2.5vw, 1rem);
                        }
                        .text-lg {
                            font-size: clamp(0.75rem, 2vw, 0.875rem);
                        }
                        .text-base {
                            font-size: clamp(0.75rem, 2vw, 0.875rem);
                        }
                        .text-sm {
                            font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                        }
                        .text-xs {
                            font-size: clamp(0.5rem, 1.5vw, 0.625rem);
                        }
                        .btn-primary {
                            font-size: clamp(0.7rem, 1.8vw, 0.8rem);
                            min-height: 36px;
                        }
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .sm\\:grid-cols-3 {
                            grid-template-columns: 1fr;
                        }
                        .flex flex-col sm\\:flex-row {
                            flex-direction: column;
                        }
                        .max-h-[50vh] {
                            max-height: 40vh;
                        }
                        .max-h-48 {
                            max-height: 160px;
                        }
                    }
                    @media (min-width: 640px) and (max-width: 767px) {
                        .grid {
                            grid-template-columns: repeat(1, 1fr);
                        }
                        .sm\\:grid-cols-3 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .hamburger {
                            display: none;
                        }
                        .sidebar-wrapper {
                            display: block;
                        }
                        .p-4, .sm\\:p-6 {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .sm\\:p-8 {
                            padding: clamp(16px, 4vw, 20px);
                        }
                        .flex flex-col sm\\:flex-row {
                            flex-direction: row;
                        }
                    }
                    @media (min-width: 768px) and (max-width: 1023px) {
                        .grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .sm\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .p-4, .sm\\:p-6 {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .sm\\:p-8 {
                            padding: clamp(16px, 4vw, 20px);
                        }
                    }
                    @media (min-width: 1024px) and (max-width: 1279px) {
                        .grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .sm\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }
                    @media (min-width: 1280px) {
                        .grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .sm\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .p-4, .sm\\:p-6 {
                            padding: clamp(16px, 3.5vw, 20px);
                        }
                        .sm\\:p-8 {
                            padding: clamp(20px, 4vw, 24px);
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
                            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                                <button
                                    onClick={() => {
                                        setChatMode('group');
                                        setSelectedUserId(null);
                                        setPrivateSearchQuery('');
                                        setMessages([]);
                                    }}
                                    className={`px-3 py-2 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] ${chatMode === 'group' ? 'bg-[var(--accent-primary)] text-white' : ''}`}
                                >
                                    Group Chats
                                </button>
                                <button
                                    onClick={() => {
                                        setChatMode('private');
                                        setSelectedGroupId(null);
                                        setPrivateSearchQuery('');
                                        setMessages([]);
                                    }}
                                    className={`px-3 py-2 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] ${chatMode === 'private' ? 'bg-[var(--accent-primary)] text-white' : ''}`}
                                >
                                    Private Chat
                                </button>
                                <button
                                    onClick={() => {
                                        setChatMode('createGroup');
                                        setSelectedGroupId(null);
                                        setPrivateSearchQuery('');
                                        setCreateGroupSearchQuery('');
                                        setMessages([]);
                                    }}
                                    className={`px-3 py-2 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] ${chatMode === 'createGroup' ? 'bg-[var(--accent-primary)] text-white' : ''}`}
                                >
                                    Manage Groups
                                </button>
                            </div>

                            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

                            {chatMode === 'group' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Group Chats:</h2>
                                    <div className="flex flex-col gap-2 mb-4">
                                        <select
                                            value={selectedGroupId || ''}
                                            onChange={(e) => {
                                                setSelectedGroupId(Number(e.target.value) || null);
                                                setMessages([]);
                                            }}
                                            className="form-input w-full text-base"
                                            disabled={groups.length === 0}
                                        >
                                            <option value="">Main Group Chat</option>
                                            {groups.map((g) => (
                                                <option key={g.id} value={g.id}>
                                                    {g.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="max-h-[50vh] overflow-y-auto mb-4">
                                        {messages.length > 0 ? (
                                            messages.map((msg) => (
                                                <div
                                                    key={msg.id || msg.tempId}
                                                    className={`p-2 my-2 border-b border-[var(--border-color)] ${msg.senderId === user.id ? 'bg-[var(--bg-tertiary)]' : 'bg-[var(--bg-secondary)]'} rounded-lg`}
                                                >
                                                    <span className="font-medium text-base text-[var(--text-primary)]">
                                                        {getSenderName(msg.senderId)}:
                                                    </span>
                                                    <span className="text-base text-[var(--text-secondary)]"> {msg.content}</span>
                                                    <p className="text-xs text-[var(--text-secondary)] mt-1">{msg.timestamp}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-[var(--text-secondary)]">No messages found.</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
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
                                            className="px-3 py-2 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] flex items-center justify-center min-w-[40px] min-h-[40px]"
                                            aria-label="Send message"
                                        >
                                            <FiSend className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {chatMode === 'private' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Private Chat:</h2>
                                    <div className="flex flex-col gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={privateSearchQuery}
                                            onChange={(e) => setPrivateSearchQuery(e.target.value)}
                                            placeholder="Search users..."
                                            className="form-input w-full text-base"
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
                                            className="form-input w-full text-base"
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
                                    <div className="max-h-[50vh] overflow-y-auto mb-4">
                                        {messages.length > 0 ? (
                                            messages.map((msg) => (
                                                <div
                                                    key={msg.id || msg.tempId}
                                                    className={`p-2 my-2 border-b border-[var(--border-color)] ${msg.senderId === user.id ? 'bg-[var(--bg-tertiary)]' : 'bg-[var(--bg-secondary)]'} rounded-lg`}
                                                >
                                                    <span className="font-medium text-base text-[var(--text-primary)]">
                                                        {getSenderName(msg.senderId)}:
                                                    </span>
                                                    <span className="text-base text-[var(--text-secondary)]"> {msg.content}</span>
                                                    <p className="text-xs text-[var(--text-secondary)] mt-1">{msg.timestamp}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-[var(--text-secondary)]">No messages yet.</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
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
                                            className="px-3 py-2 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] flex items-center justify-center min-w-[40px] min-h-[40px] disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!selectedUserId}
                                            aria-label="Send message"
                                        >
                                            <FiSend className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {chatMode === 'createGroup' && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-2 text-[var(--text-primary)]">Manage Groups:</h2>
                                    <div className="flex flex-col">
                                        <div className="max-h-48 overflow-y-auto mt-2">
                                            {groups.map((g) => (
                                                <div key={g.id} className="flex items-center justify-between p-2 bg-[var(--bg-tertiary)] rounded-lg mb-2">
                                                    <span className="text-base text-[var(--text-primary)] truncate max-w-[150px]">
                                                        {g.name}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditGroupId(g.id);
                                                                setEditGroupName(g.name);
                                                                fetchGroupUsers(g.id);
                                                            }}
                                                            className="px-2 py-1 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] flex items-center justify-center min-w-[60px] min-h-[36px]"
                                                            aria-label={`View users in group ${g.name}`}
                                                        >
                                                            {user && g.creatorId === user.id ? (
                                                                <FiUser className="w-4 h-4" />
                                                            ) : (
                                                                <FiEye className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                        {user && g.creatorId === user.id && (
                                                            <button
                                                                onClick={() => openDeleteModal(g.id)}
                                                                className="px-2 py-1 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-red-300 flex items-center justify-center min-w-[36px] min-h-[36px]"
                                                                aria-label={`Delete group ${g.name}`}
                                                            >
                                                                <FiTrash2 className="w-4 h-4 text-red-600" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)] mt-4">Create New Group</h3>
                                    <div className="flex flex-col gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                            placeholder="Enter group name..."
                                            className="form-input w-full text-base"
                                            aria-label="Group name"
                                        />
                                        <input
                                            type="text"
                                            value={createGroupSearchQuery}
                                            onChange={(e) => setCreateGroupSearchQuery(e.target.value)}
                                            placeholder="Click SpaceBar to search..."
                                            className="form-input w-full text-base"
                                            aria-label="Search users"
                                        />
                                        {createGroupSearchQuery && (
                                            <div className="max-h-48 overflow-y-auto">
                                                {users.map((u) => (
                                                    <div key={u.id} className="flex items-center p-2 border-b border-[var(--border-color)]">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedMemberIds.includes(u.id)}
                                                            onChange={() => toggleMember(u.id)}
                                                            className="mr-4"
                                                            aria-label={`Select ${u.firstName} ${u.lastName}`}
                                                        />
                                                        <span className="text-base text-[var(--text-primary)]">
                                                            {u.firstName} {u.lastName}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={handleCreateGroup}
                                        className="px-3 py-2 bg-[var(--bg-tertiary)] text-base text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
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