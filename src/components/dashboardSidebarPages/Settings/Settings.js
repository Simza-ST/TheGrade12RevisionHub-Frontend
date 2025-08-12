import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';
import ConfirmationModal from './ConfirmationModal';
import { PencilIcon, TrashIcon, PlusIcon, InformationCircleIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import ProfileTab from "./ProfileTab";

const Settings = ({ user, setUser, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications, onActivity, activities, setActivities }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
        chatNotifications: true,
        mentionNotifications: true,
        notificationSound: true,
        fontSize: 'medium',
        language: 'en',
        profileVisibility: 'public',
        dataSharing: false,
    });
    const [twoFactor, setTwoFactor] = useState({
        enabled: false,
        qrCode: null,
        code: '',
    });
    const [sessions, setSessions] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
    const [sessionToRevoke, setSessionToRevoke] = useState(null);
    const fileInputRef = useRef(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        document.documentElement.style.fontSize = settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px';
    }, [darkMode, settings.fontSize]);

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

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('jwt');
                if (!token) throw new Error('No JWT token found');

                const settingsResponse = await fetch('http://localhost:6262/api/users/settings', {
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'GET',
                });
                let userSettings = {};
                if (settingsResponse.ok) {
                    userSettings = await settingsResponse.json();
                } else {
                    console.warn(`Settings fetch failed: ${await settingsResponse.text()}`);
                    userSettings = {
                        emailNotifications: true,
                        pushNotifications: false,
                        chatNotifications: true,
                        mentionNotifications: true,
                        notificationSound: true,
                        fontSize: 'medium',
                        language: 'en',
                        profileVisibility: 'public',
                        dataSharing: false,
                        theme: darkMode ? 'dark' : 'light',
                    };
                }

                let sessionsData = [];
                try {
                    const sessionsResponse = await fetch('http://localhost:6262/api/users/sessions', {
                        headers: { 'Authorization': `Bearer ${token}` },
                        method: 'GET',
                    });
                    if (sessionsResponse.ok) {
                        sessionsData = await sessionsResponse.json();
                    } else {
                        console.warn(`Sessions fetch failed: ${await settingsResponse.text()}`);
                    }
                } catch (err) {
                    console.warn(`Sessions endpoint unavailable: ${err.message}`);
                }

                setSettings({
                    emailNotifications: userSettings.emailNotifications ?? true,
                    pushNotifications: userSettings.pushNotifications ?? false,
                    chatNotifications: userSettings.chatNotifications ?? true,
                    mentionNotifications: userSettings.mentionNotifications ?? true,
                    notificationSound: userSettings.notificationSound ?? true,
                    fontSize: userSettings.fontSize || 'medium',
                    language: userSettings.language || 'en',
                    profileVisibility: userSettings.profileVisibility || 'public',
                    dataSharing: userSettings.dataSharing ?? false,
                });
                setTwoFactor({ enabled: userSettings.twoFactorEnabled ?? false });
                setSessions(sessionsData.map(s => ({
                    id: s.id,
                    device: s.device || 'Unknown Device',
                    lastActive: s.lastActive || new Date().toISOString(),
                })));
                setDarkMode(userSettings.theme === 'dark');
            } catch (err) {
                setError(`Failed to load settings: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [darkMode, setDarkMode]);

    const validatePassword = () => {
        if (!password.currentPassword) return 'Current password is required';
        if (password.newPassword.length < 8 || !/[A-Z]/.test(password.newPassword) || !/[0-9]/.test(password.newPassword))
            return 'New password must be 8+ characters with uppercase and numbers';
        if (password.newPassword !== password.confirmPassword) return 'Passwords do not match';
        return null;
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
    };

    const handleSettingChange = (key, value) => {
        if (key === 'theme') {
            setDarkMode(value === 'dark');
        } else {
            setSettings((prev) => ({ ...prev, [key]: value }));
            if (key === 'fontSize') {
                document.documentElement.style.fontSize = value === 'small' ? '14px' : value === 'large' ? '18px' : '16px';
            }
        }
    };

    const handleSaveSettings = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/users/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ ...settings, theme: darkMode ? 'dark' : 'light' }),
            });
            if (!response.ok) throw new Error(await response.text());

            setSuccess('Settings saved successfully');
            onActivity('Updated notification settings');
            setError(null);
        } catch (err) {
            setError(`Failed to save settings: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        const validationError = validatePassword();
        if (validationError) return setError(validationError);
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/users/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    currentPassword: password.currentPassword,
                    newPassword: password.newPassword,
                }),
            });
            if (!response.ok) throw new Error(await response.text());
            setSuccess('Password changed successfully');
            setError(null);
            setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
            onActivity('Changed password');
        } catch (err) {
            setError(`Failed to change password: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSetup2FA = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/users/2fa/setup', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(await response.text());
            const { qrCode } = await response.json();
            setTwoFactor({ ...twoFactor, qrCode });
            setSuccess('Scan the QR code with your authenticator app');
            setError(null);
        } catch (err) {
            setError(`Failed to setup 2FA: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleVerify2FA = async () => {
        if (!twoFactor.code.match(/^\d{6}$/)) return setError('Enter a valid 6-digit code');
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/users/2fa/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ code: twoFactor.code }),
            });
            if (!response.ok) throw new Error(await response.text());
            setTwoFactor({ enabled: true, qrCode: null, code: '' });
            setSuccess('2FA enabled successfully');
            setError(null);
        } catch (err) {
            setError(`Failed to verify 2FA: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRevokeSession = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch(`http://localhost:6262/api/users/sessions/${sessionToRevoke}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(await response.text());
            setSessions(sessions.filter(s => s.id !== sessionToRevoke));
            setSuccess('Session revoked successfully');
            setError(null);
        } catch (err) {
            setError(`Failed to revoke session: ${err.message}`);
        } finally {
            setLoading(false);
            setIsRevokeModalOpen(false);
            setSessionToRevoke(null);
        }
    };

    const handleClearNotifications = () => {
        setNotifications([]);
        setSuccess('Notifications cleared');
        setError(null);
    };

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/users/me', {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(await response.text());
            sessionStorage.removeItem('jwt');
            navigate('/login');
        } catch (err) {
            setError(`Failed to delete account: ${err.message}`);
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false);
        }
    };

    const handleDataExport = async () => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await fetch('http://localhost:6262/api/users/data/export', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) throw new Error(await response.text());
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `user-data-${new Date().toISOString()}.zip`;
            a.click();
            window.URL.revokeObjectURL(url);
            setSuccess('Data export initiated');
            setError(null);
        } catch (err) {
            setError(`Failed to export data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
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
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    .bg-[var(--bg-primary)] {
                        background-color: var(--bg-primary, ${darkMode ? '#0f172a' : '#ffffff'});
                    }
                    .bg-[var(--bg-secondary)] {
                        background-color: var(--bg-secondary, ${darkMode ? '#1e293b' : '#ffffff'});
                    }
                    .bg-[var(--bg-tertiary)] {
                        background-color: var(--bg-tertiary, ${darkMode ? '#334155' : '#f1f5f9'});
                    }
                    .bg-[var(--accent-primary)] {
                        background-color: var(--accent-primary, #3b82f6);
                    }
                    .bg-[var(--accent-secondary)] {
                        background-color: var(--accent-secondary, #ef4444);
                    }
                    .bg-red-100 {
                        background-color: rgba(239, 68, 68, 0.1);
                    }
                    .bg-green-100 {
                        background-color: rgba(134, 239, 172, 0.1);
                    }
                    .text-[var(--text-primary)] {
                        color: var(--text-primary, ${darkMode ? '#e2e8f0' : '#1f2937'});
                    }
                    .text-[var(--text-secondary)] {
                        color: var(--text-secondary, ${darkMode ? '#94a3b8' : '#6b7280'});
                    }
                    .text-red-800 {
                        color: #b91c1c;
                    }
                    .text-green-800 {
                        color: #15803d;
                    }
                    .border-[var(--border)] {
                        border-color: var(--border, ${darkMode ? '#475569' : '#e5e7eb'});
                    }
                    .hover\\:bg-blue-600:hover {
                        background-color: #2563eb;
                    }
                    .hover\\:bg-red-600:hover {
                        background-color: #dc2626;
                    }
                    .hover\\:bg-gray-100:hover {
                        background-color: var(--hover-gray, ${darkMode ? '#4b5563' : '#f3f4f6'});
                    }
                    .flex {
                        display: flex;
                    }
                    .min-h-screen {
                        min-height: 100vh;
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
                    .gap-6 {
                        gap: clamp(12px, 3vw, 24px);
                    }
                    .p-4 {
                        padding: clamp(8px, 2vw, 16px);
                    }
                    .p-6 {
                        padding: clamp(12px, 3vw, 24px);
                    }
                    .sm\\:p-8 {
                        padding: clamp(16px, 4vw, 32px);
                    }
                    .rounded-xl {
                        border-radius: clamp(8px, 2vw, 12px);
                    }
                    .rounded-lg {
                        border-radius: clamp(4px, 1vw, 8px);
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
                    .mt-4 {
                        margin-top: clamp(8px, 2vw, 16px);
                    }
                    .shadow-xl {
                        box-shadow: 0 clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px) rgba(0,0,0,0.1);
                    }
                    .text-2xl {
                        font-size: clamp(1.25rem, 3.5vw, 1.5rem);
                    }
                    .text-xl {
                        font-size: clamp(1rem, 3vw, 1.25rem);
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
                    .form-input, select {
                        width: 100%;
                        padding: clamp(6px, 1.5vw, 10px) clamp(8px, 2vw, 14px);
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                        border: 1px solid var(--border);
                        border-radius: clamp(4px, 1vw, 6px);
                        background-color: var(--bg-secondary);
                        color: var(--text-primary);
                        transition: border-color 0.2s ease;
                    }
                    .form-input:focus, select:focus {
                        border-color: var(--accent-primary);
                        outline: none;
                        box-shadow: 0 0 0 clamp(2px, 0.5vw, 3px) rgba(59, 130, 246, 0.1);
                    }
                    .btn-primary {
                        background-color: var(--accent-primary);
                        color: white;
                        padding: clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px);
                        border-radius: clamp(4px, 1vw, 6px);
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-secondary {
                        background-color: var(--bg-tertiary);
                        color: var(--text-primary);
                        padding: clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px);
                        border-radius: clamp(4px, 1vw, 6px);
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-danger {
                        background-color: var(--accent-secondary);
                        color: white;
                        padding: clamp(6px, 1.5vw, 10px) clamp(12px, 3vw, 20px);
                        border-radius: clamp(4px, 1vw, 6px);
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                        font-weight: 500;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-primary:hover {
                        background-color: #2563eb;
                    }
                    .btn-secondary:hover {
                        background-color: var(--hover-gray);
                    }
                    .btn-danger:hover {
                        background-color: #dc2626;
                    }
                    .tabs {
                        display: flex;
                        border-bottom: 2px solid var(--border);
                        margin-bottom: clamp(16px, 4vw, 24px);
                        overflow-x: auto;
                        flex-wrap: wrap;
                    }
                    .tab {
                        padding: clamp(8px, 2vw, 12px) clamp(16px, 4vw, 24px);
                        font-size: clamp(0.875rem, 2.5vw, 1rem);
                        font-weight: 500;
                        color: var(--text-secondary);
                        cursor: pointer;
                        border-bottom: 2px solid transparent;
                        transition: all 0.2s ease;
                        white-space: nowrap;
                    }
                    .tab.active {
                        color: var(--text-primary);
                        border-bottom-color: var(--accent-primary);
                        font-weight: 600;
                    }
                    .tab:hover:not(.active) {
                        color: var(--text-primary);
                        background-color: var(--hover-gray);
                    }
                    .tooltip {
                        position: relative;
                        display: inline-flex;
                        align-items: center;
                    }
                    .tooltip:hover .tooltip-text {
                        visibility: visible;
                        opacity: 1;
                    }
                    .tooltip-text {
                        visibility: hidden;
                        opacity: 0;
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        background-color: var(--bg-gray-900, #1f2937);
                        color: white;
                        padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
                        border-radius: clamp(4px, 1vw, 6px);
                        font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                        white-space: nowrap;
                        z-index: 10;
                        transition: opacity 0.2s ease;
                        margin-bottom: clamp(4px, 1vw, 8px);
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
                    .w-4 {
                        width: clamp(12px, 3vw, 16px);
                    }
                    .h-4 {
                        height: clamp(12px, 3vw, 16px);
                    }
                    .w-40 {
                        width: clamp(120px, 30vw, 160px);
                    }
                    .h-40 {
                        height: clamp(120px, 30vw, 160px);
                    }
                    .w-32 {
                        width: clamp(96px, 24vw, 128px);
                    }
                    .space-y-4 > * + * {
                        margin-top: clamp(8px, 2vw, 16px);
                    }
                    .space-y-6 > * + * {
                        margin-top: clamp(12px, 3vw, 24px);
                    }
                    .grid {
                        display: grid;
                        gap: clamp(12px, 3vw, 24px);
                    }
                    .grid-cols-1 {
                        grid-template-columns: 1fr;
                    }
                    .md\\:grid-cols-2 {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .animate-spin {
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
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
                        .p-6, .sm\\:p-8 {
                            padding: clamp(8px, 2vw, 12px);
                        }
                        .text-2xl {
                            font-size: clamp(1rem, 3vw, 1.25rem);
                        }
                        .text-xl {
                            font-size: clamp(0.875rem, 2.5vw, 1rem);
                        }
                        .text-base {
                            font-size: clamp(0.75rem, 2vw, 0.875rem);
                        }
                        .text-sm {
                            font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                        }
                        .btn-primary, .btn-secondary, .btn-danger {
                            padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
                            font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                            min-height: 32px;
                        }
                        .tabs {
                            gap: 4px;
                        }
                        .tab {
                            padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
                            font-size: clamp(0.75rem, 2vw, 0.875rem);
                        }
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .md\\:grid-cols-2 {
                            grid-template-columns: 1fr;
                        }
                    }
                    @media (min-width: 640px) and (max-width: 767px) {
                        .hamburger {
                            display: none;
                        }
                        .sidebar-wrapper {
                            display: block;
                        }
                        .p-6 {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .sm\\:p-8 {
                            padding: clamp(16px, 4vw, 20px);
                        }
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .md\\:grid-cols-2 {
                            grid-template-columns: 1fr;
                        }
                    }
                    @media (min-width: 768px) and (max-width: 1023px) {
                        .p-6 {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .sm\\:p-8 {
                            padding: clamp(16px, 4vw, 20px);
                        }
                        .grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .md\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    @media (min-width: 1024px) and (max-width: 1279px) {
                        .grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .md\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    @media (min-width: 1280px) {
                        .p-6 {
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
                        onActivity={onActivity}
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
                        tabDescription="Settings"
                        userMessage="Manage your account and preferences"
                        className="header"
                    />
                    <main className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content ${showSidebar ? 'sidebar-open' : ''}`}>
                        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 shadow-xl">
                            {error && (
                                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm flex items-center">
                                    <span>{error}</span>
                                </div>
                            )}
                            {success && (
                                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-sm flex items-center">
                                    <span>{success}</span>
                                </div>
                            )}
                            <div className="tabs">
                                {[
                                    { id: 'profile', name: 'Profile' },
                                    { id: 'security', name: 'Security' },
                                    { id: 'notifications', name: 'Notifications' },
                                    { id: 'appearance', name: 'Appearance' },
                                    { id: 'privacy', name: 'Privacy' },
                                    { id: 'advanced', name: 'Advanced' },
                                ].map((tab) => (
                                    <div
                                        key={tab.id}
                                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        role="tab"
                                        aria-selected={activeTab === tab.id}
                                    >
                                        {tab.name}
                                    </div>
                                ))}
                            </div>

                            {activeTab === 'profile' && (
                                <ProfileTab
                                    setUser={setUser}
                                    user={user}
                                    onActivity={onActivity}
                                />
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Change Password</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={password.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    className="form-input"
                                                    placeholder="Enter current password"
                                                    aria-label="Current Password"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={password.newPassword}
                                                    onChange={handlePasswordChange}
                                                    className="form-input"
                                                    placeholder="New password"
                                                    aria-label="New Password"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={password.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    className="form-input"
                                                    placeholder="Confirm new password"
                                                    aria-label="Confirm Password"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleChangePassword}
                                            className="btn-secondary mt-4 flex items-center gap-2"
                                            aria-label="Change Password"
                                            disabled={loading}
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                            Change Password
                                        </button>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Two-Factor Authentication</h3>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-base font-medium">
                                                    2FA: {twoFactor.enabled ? 'Enabled' : 'Disabled'}
                                                </span>
                                                <span className="tooltip">
                                                    <InformationCircleIcon className="w-4 h-4 text-[var(--text-secondary)]" />
                                                    <span className="tooltip-text">Enhances account security</span>
                                                </span>
                                            </div>
                                            {!twoFactor.enabled && (
                                                <button
                                                    onClick={handleSetup2FA}
                                                    className="btn-secondary flex items-center gap-2"
                                                    aria-label="Enable 2FA"
                                                    disabled={loading}
                                                >
                                                    <PlusIcon className="w-4 h-4" />
                                                    Enable 2FA
                                                </button>
                                            )}
                                        </div>
                                        {twoFactor.qrCode && (
                                            <div className="space-y-4">
                                                <img
                                                    src={twoFactor.qrCode}
                                                    alt="2FA QR Code"
                                                    className="w-40 h-40"
                                                />
                                                <div>
                                                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                        Enter 6-digit Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={twoFactor.code}
                                                        onChange={(e) => setTwoFactor({ ...twoFactor, code: e.target.value })}
                                                        className="form-input w-32"
                                                        placeholder="123456"
                                                        aria-label="2FA Code"
                                                    />
                                                    <button
                                                        onClick={handleVerify2FA}
                                                        className="btn-secondary mt-2"
                                                        aria-label="Verify 2FA Code"
                                                        disabled={loading}
                                                    >
                                                        Verify Code
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Active Sessions</h3>
                                        <div className="space-y-4">
                                            {sessions.length > 0 ? (
                                                sessions.map((s) => (
                                                    <div
                                                        key={s.id}
                                                        className="flex items-center justify-between p-4 border rounded-lg border-[var(--border)]"
                                                    >
                                                        <div>
                                                            <p className="text-sm font-medium">{s.device}</p>
                                                            <p className="text-xs text-[var(--text-secondary)]">
                                                                Last active: {new Date(s.lastActive).toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setSessionToRevoke(s.id);
                                                                setIsRevokeModalOpen(true);
                                                            }}
                                                            className="btn-secondary flex items-center gap-2"
                                                            aria-label={`Revoke session ${s.device}`}
                                                            disabled={loading}
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                            Revoke
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-sm text-[var(--text-secondary)]">No active sessions found.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Notification Preferences</h3>
                                    <div className="space-y-4">
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.emailNotifications}
                                                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Email Notifications"
                                            />
                                            <div>
                                                <span className="text-base font-medium">Email Notifications</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Receive updates via email</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.pushNotifications}
                                                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Push Notifications"
                                            />
                                            <div>
                                                <span className="text-base font-medium">Push Notifications</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Receive browser or app notifications</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.chatNotifications}
                                                onChange={(e) => handleSettingChange('chatNotifications', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Chat Notifications"
                                            />
                                            <div>
                                                <span className="text-base font-medium">Chat Notifications</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Alerts for new messages</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.mentionNotifications}
                                                onChange={(e) => handleSettingChange('mentionNotifications', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Mention Notifications"
                                            />
                                            <div>
                                                <span className="text-base font-medium">Mention Notifications</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Alerts when mentioned</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.notificationSound}
                                                onChange={(e) => handleSettingChange('notificationSound', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Notification Sound"
                                            />
                                            <div>
                                                <span className="text-base font-medium">Notification Sound</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Play sound for notifications</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleSaveSettings}
                                            className="btn-secondary flex items-center gap-2"
                                            aria-label="Save Notification Settings"
                                            disabled={loading}
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                            Save Settings
                                        </button>
                                        <button
                                            onClick={handleClearNotifications}
                                            className="btn-secondary flex items-center gap-2"
                                            aria-label="Clear Notifications"
                                            disabled={loading}
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                            Clear Notifications
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'appearance' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Appearance Settings</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                Theme
                                            </label>
                                            <select
                                                value={darkMode ? 'dark' : 'light'}
                                                onChange={(e) => handleSettingChange('theme', e.target.value)}
                                                className="form-input"
                                                aria-label="Select Theme"
                                            >
                                                <option value="light">Light</option>
                                                <option value="dark">Dark</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                Font Size
                                            </label>
                                            <select
                                                value={settings.fontSize}
                                                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                                                className="form-input"
                                                aria-label="Select Font Size"
                                            >
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="large">Large</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                Language
                                            </label>
                                            <select
                                                value={settings.language}
                                                onChange={(e) => handleSettingChange('language', e.target.value)}
                                                className="form-input"
                                                aria-label="Select Language"
                                            >
                                                <option value="en">English</option>
                                                <option value="es">Spanish</option>
                                                <option value="fr">French</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSaveSettings}
                                        className="btn-secondary flex items-center gap-2"
                                        aria-label="Save Appearance Settings"
                                        disabled={loading}
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                        Save Settings
                                    </button>
                                </div>
                            )}

                            {activeTab === 'privacy' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Privacy Settings</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                Profile Visibility
                                            </label>
                                            <select
                                                value={settings.profileVisibility}
                                                onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                                                className="form-input"
                                                aria-label="Profile Visibility"
                                            >
                                                <option value="public">Public</option>
                                                <option value="friends">Friends Only</option>
                                                <option value="private">Private</option>
                                            </select>
                                        </div>
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.dataSharing}
                                                onChange={(e) => handleSettingChange('dataSharing', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Allow Data Sharing"
                                            />
                                            <div>
                                                <span className="text-base font-medium">Allow Data Sharing</span>
                                                <p className="text-sm text-[var(--text-secondary)]">
                                                    Share anonymized data for analytics
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleSaveSettings}
                                        className="btn-secondary flex items-center gap-2"
                                        aria-label="Save Privacy Settings"
                                        disabled={loading}
                                    >
                                        <PencilIcon className="w-4 h-4" />
                                        Save Settings
                                    </button>
                                </div>
                            )}

                            {activeTab === 'advanced' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">Advanced Settings</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-base font-medium text-[var(--text-primary)] mb-2">
                                                Data Export
                                            </h4>
                                            <p className="text-sm text-[var(--text-secondary)] mb-4">
                                                Download a copy of your account data
                                            </p>
                                            <button
                                                onClick={handleDataExport}
                                                className="btn-secondary flex items-center gap-2"
                                                aria-label="Export Data"
                                                disabled={loading}
                                            >
                                                <ArrowDownTrayIcon className="w-4 h-4" />
                                                Export Data
                                            </button>
                                        </div>
                                        <div>
                                            <h4 className="text-base font-medium text-[var(--text-primary)] mb-2">
                                                Delete Account
                                            </h4>
                                            <p className="text-sm text-[var(--text-secondary)] mb-4">
                                                Permanently delete your account and data
                                            </p>
                                            <button
                                                onClick={() => setIsDeleteModalOpen(true)}
                                                className="btn-danger flex items-center gap-2"
                                                aria-label="Delete Account"
                                                disabled={loading}
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteAccount}
                title="Confirm Account Deletion"
                message="Are you sure you want to delete your account? This action cannot be undone."
            />
            <ConfirmationModal
                isOpen={isRevokeModalOpen}
                onClose={() => setIsRevokeModalOpen(false)}
                onConfirm={handleRevokeSession}
                title="Revoke Session"
                message="Are you sure you want to revoke this session?"
            />
        </div>
    );
};

Settings.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
        createdAt: PropTypes.string,
    }).isRequired,
    setUser: PropTypes.func.isRequired,
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
    setNotifications: PropTypes.func.isRequired,
    onActivity: PropTypes.func,
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ),
    setActivities: PropTypes.func,
};

export default Settings;