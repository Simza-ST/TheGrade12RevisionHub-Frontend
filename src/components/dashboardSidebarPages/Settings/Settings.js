import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import ProfileTab from "./ProfileTab";

const Settings = ({ user, setUser, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications, onActivity, activities, setActivities }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [currentPasswordError, setCurrentPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [settings, setSettings] = useState({
        emailNotifications: true,
        chatNotifications: true,
        notificationSound: true,
        fontSize: localStorage.getItem('fontSize') || 'medium',
        theme: darkMode ? 'dark' : 'light',
    });
    const [initialSettings, setInitialSettings] = useState(settings);
    const [initialDarkMode, setInitialDarkMode] = useState(darkMode);
    const sidebarRef = useRef(null);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        document.documentElement.style.fontSize = settings.fontSize === 'small' ? '14px' : settings.fontSize === 'large' ? '18px' : '16px';
        localStorage.setItem('fontSize', settings.fontSize);
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
            setError('');
            try {
                const token = sessionStorage.getItem('jwt');
                if (!token) throw new Error('No JWT token found');
                console.log('Fetching user data with token:', token); // Debug JWT
                // Fetch user details
                const userResponse = await fetch(`${API_BASE_URL}/users/me`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'GET',
                });
                if (!userResponse.ok) {
                    const contentType = userResponse.headers.get('content-type');
                    let errorMessage = `Failed to fetch user: HTTP ${userResponse.status}`;
                    if (contentType && contentType.includes('application/json')) {
                        const data = await userResponse.json();
                        errorMessage = data.message || errorMessage;
                    }
                    throw new Error(errorMessage);
                }
                const userData = await userResponse.json();
                setUser((prev) => ({
                    ...prev,
                    id: userData.id,
                    email: userData.email,
                    name: `${userData.firstName} ${userData.lastName}`,
                    role: userData.role,
                    createdAt: userData.createdAt,
                    twoFactorEnabled: userData.twoFactorEnabled,
                    phoneNumber: userData.phoneNumber,
                    idNumber: userData.idNumber,
                    profilePicture: userData.profilePicture,
                }));

                // Fetch settings
                const settingsResponse = await fetch(`${API_BASE_URL}/users/settings`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                    method: 'GET',
                });
                let userSettings = {};
                if (settingsResponse.ok) {
                    userSettings = await settingsResponse.json();
                } else {
                    const contentType = settingsResponse.headers.get('content-type');
                    let errorMessage = `Failed to load settings: HTTP ${settingsResponse.status}`;
                    if (contentType && contentType.includes('application/json')) {
                        const data = await settingsResponse.json();
                        errorMessage = data.message || errorMessage;
                    }
                    userSettings = {
                        emailNotifications: true,
                        chatNotifications: true,
                        notificationSound: true,
                        fontSize: localStorage.getItem('fontSize') || 'medium',
                        theme: darkMode ? 'dark' : 'light',
                        pushNotifications: false,
                        mentionNotifications: true,
                        language: 'en',
                        profileVisibility: 'public',
                        dataSharing: false,
                    };
                }
                setSettings({
                    emailNotifications: userSettings.emailNotifications ?? true,
                    chatNotifications: userSettings.chatNotifications ?? true,
                    notificationSound: userSettings.notificationSound ?? true,
                    fontSize: localStorage.getItem('fontSize') || userSettings.fontSize || 'medium',
                    theme: userSettings.theme ?? (darkMode ? 'dark' : 'light'),
                });
                setInitialSettings({
                    emailNotifications: userSettings.emailNotifications ?? true,
                    chatNotifications: userSettings.chatNotifications ?? true,
                    notificationSound: userSettings.notificationSound ?? true,
                    fontSize: localStorage.getItem('fontSize') || userSettings.fontSize || 'medium',
                    theme: userSettings.theme ?? (darkMode ? 'dark' : 'light'),
                });
                setDarkMode(userSettings.theme === 'dark');
                setInitialDarkMode(userSettings.theme === 'dark');
            } catch (err) {
                setError(`Failed to load data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [setDarkMode, setUser]);

    const validateCurrentPassword = (password) => {
        if (!password.trim()) return 'Current password is required.';
        return '';
    };

    const validateNewPassword = (password) => {
        if (!password.trim()) return 'New password is required.';
        if (password.length < 8) return 'New password must be at least 8 characters long.';
        if (!/[A-Z]/.test(password)) return 'New password must contain at least one uppercase letter.';
        if (!/[0-9]/.test(password)) return 'New password must contain at least one number.';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'New password must contain at least one special character.';
        return '';
    };

    const validateConfirmPassword = (newPassword, confirmPassword) => {
        if (!confirmPassword.trim()) return 'Confirm password is required.';
        if (newPassword !== confirmPassword) return 'Passwords do not match.';
        return '';
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
        if (name === 'currentPassword') {
            setCurrentPasswordError(validateCurrentPassword(value));
        } else if (name === 'newPassword') {
            setNewPasswordError(validateNewPassword(value));
            setConfirmPasswordError(validateConfirmPassword(value, password.confirmPassword));
        } else if (name === 'confirmPassword') {
            setConfirmPasswordError(validateConfirmPassword(password.newPassword, value));
        }
    };

    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        if (key === 'theme') {
            setDarkMode(value === 'dark');
        }
        if (key === 'fontSize') {
            document.documentElement.style.fontSize = value === 'small' ? '14px' : value === 'large' ? '18px' : '16px';
            localStorage.setItem('fontSize', value);
        }
    };

    const hasSettingsChanged = () => {
        return (
            settings.emailNotifications !== initialSettings.emailNotifications ||
            settings.chatNotifications !== initialSettings.chatNotifications ||
            settings.notificationSound !== initialSettings.notificationSound ||
            settings.fontSize !== initialSettings.fontSize ||
            settings.theme !== initialSettings.theme
        );
    };

    const handleSaveSettings = async () => {
        if (loading || !hasSettingsChanged()) return; // Prevent multiple clicks or no changes
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) throw new Error('No JWT token found');
            console.log('Saving settings with payload:', { // Debug payload
                username: user.email, // Added username
                emailNotifications: settings.emailNotifications,
                chatNotifications: settings.chatNotifications,
                notificationSound: settings.notificationSound,
                fontSize: settings.fontSize,
                theme: settings.theme,
            });
            const response = await fetch(`${API_BASE_URL}/users/settings`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: user.email, // Added username
                    emailNotifications: settings.emailNotifications,
                    chatNotifications: settings.chatNotifications,
                    notificationSound: settings.notificationSound,
                    fontSize: settings.fontSize,
                    theme: settings.theme,
                    pushNotifications: false,
                    mentionNotifications: true,
                    language: 'en',
                    profileVisibility: 'public',
                    dataSharing: false,
                }),
            });
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errorMessage = `Failed to save settings: HTTP ${response.status}`;
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    errorMessage = data.message || errorMessage;
                }
                throw new Error(errorMessage);
            }
            const data = await response.json();
            setInitialSettings(settings);
            setInitialDarkMode(darkMode);
            localStorage.setItem('fontSize', settings.fontSize);
            localStorage.setItem('theme', settings.theme);
            setSuccess(data.message || 'Settings saved successfully');
            setTimeout(() => setSuccess(''), 3000);
            onActivity('Saved settings'); // Log activity
        } catch (err) {
            console.error('Save settings error:', err); // Debug error
            setError(err.message || 'An error occurred while saving settings.');
        } finally {
            setLoading(false);
        }
    };

    const handleClearNotifications = async () => {
        if (loading || notifications.length === 0 || !user.id) return;
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) throw new Error('No JWT token found');
            console.log('Clearing notifications for user ID:', user.id); // Debug
            const response = await fetch(`${API_BASE_URL}/users/notifications/${user.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errorMessage = `Failed to clear notifications: HTTP ${response.status}`;
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    errorMessage = data.message || errorMessage;
                }
                throw new Error(errorMessage);
            }
            setNotifications([]);
            setSuccess('Notifications cleared successfully');
            setTimeout(() => setSuccess(''), 3000);
            onActivity('Cleared notifications');
        } catch (err) {
            console.error('Clear notifications error:', err); // Debug
            setError(err.message || 'An error occurred while clearing notifications.');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (loading) return;
        setLoading(true);
        setError('');
        setSuccess('');

        const currentPasswordValidation = validateCurrentPassword(password.currentPassword);
        const newPasswordValidation = validateNewPassword(password.newPassword);
        const confirmPasswordValidation = validateConfirmPassword(password.newPassword, password.confirmPassword);

        if (currentPasswordValidation) {
            setCurrentPasswordError(currentPasswordValidation);
            setError(currentPasswordValidation);
            setLoading(false);
            return;
        }
        if (newPasswordValidation) {
            setNewPasswordError(newPasswordValidation);
            setError(newPasswordValidation);
            setLoading(false);
            return;
        }
        if (confirmPasswordValidation) {
            setConfirmPasswordError(confirmPasswordValidation);
            setError(confirmPasswordValidation);
            setLoading(false);
            return;
        }
        if (password.currentPassword === password.newPassword) {
            setNewPasswordError('New password cannot be the same as the current password.');
            setError('New password cannot be the same as the current password.');
            setLoading(false);
            return;
        }

        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) throw new Error('No JWT token found');
            const response = await fetch(`${API_BASE_URL}/users/profile/change-password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    currentPassword: password.currentPassword.trim(),
                    newPassword: password.newPassword.trim(),
                }),
            });
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                let errorMessage = `Failed to change password: HTTP ${response.status}`;
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    errorMessage = data.message || errorMessage;
                }
                throw new Error(errorMessage);
            }
            setSuccess('Password changed successfully');
            setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setCurrentPasswordError('');
            setNewPasswordError('');
            setConfirmPasswordError('');
            onActivity('Changed password');
        } catch (err) {
            setError(err.message || 'An error occurred while changing password.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    if (loading) {
        return (
            <div className="full">
                <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"
                        role="status"
                        aria-label="Loading..."
                    ></div>
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
          .sidebar-wrapper, .hamburger, .dashboard-content, .header, .header h1 {
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
          .hover\\:bg-[var(--hover-tertiary)]:hover {
            background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
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
          .mt-1 {
            margin-top: clamp(2px, 0.5vw, 4px);
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
          .form-input-container {
            position: relative;
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
            padding-right: clamp(30px, 7.5vw, 40px);
          }
          .form-input:focus, select:focus {
            border-color: var(--accent-primary);
            outline: none;
            box-shadow: 0 0 0 clamp(2px, 0.5vw, 3px) rgba(59, 130, 246, 0.1);
          }
          .form-input[type="password"]::-ms-reveal,
          .form-input[type="password"]::-ms-clear,
          .form-input[type="password"]::-webkit-credentials-auto-fill-button {
            display: none !important;
            visibility: hidden !important;
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
            transition: background-color 0.2s ease, transform 0.1s ease;
          }
          .btn-primary:disabled {
            background-color: var(--text-secondary);
            cursor: not-allowed;
            transform: none;
          }
          .btn-primary:not(:disabled):hover {
            background-color: #2563eb;
            transform: translateY(-1px);
          }
          .btn-primary:not(:disabled):active {
            transform: translateY(0);
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
            transition: background-color 0.2s ease, transform 0.1s ease;
          }
          .btn-danger:disabled {
            background-color: var(--text-secondary);
            cursor: not-allowed;
            transform: none;
          }
          .btn-danger:not(:disabled):hover {
            background-color: #dc2626;
            transform: translateY(-1px);
          }
          .btn-danger:not(:disabled):active {
            transform: translateY(0);
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
          .password-toggle {
            position: absolute;
            right: clamp(8px, 2vw, 12px);
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-secondary);
          }
          .password-toggle:hover {
            color: var(--accent-primary);
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
                    <svg
                        className="w-6 h-6 text-[var(--text-primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
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
                    <main
                        className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${
                            isCollapsed ? 'ml-16' : 'ml-64'
                        } dashboard-content ${showSidebar ? 'sidebar-open' : ''}`}
                    >
                        <div className="bg-[var(--bg-secondary)] rounded-xl p-6 shadow-xl">
                            {error && (
                                <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm flex items-center" role="alert">
                                    <span>{error}</span>
                                </div>
                            )}
                            {success && (
                                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-sm flex items-center" role="alert">
                                    <span>{success}</span>
                                </div>
                            )}
                            <div className="tabs">
                                {[
                                    { id: 'profile', name: 'Profile' },
                                    { id: 'security', name: 'Security' },
                                    { id: 'notifications', name: 'Notifications' },
                                    { id: 'appearance', name: 'Appearance' },
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
                                <ProfileTab setUser={setUser} user={user} onActivity={onActivity} />
                            )}
                            {activeTab === 'security' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Change Password</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="form-input-container">
                                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                    Current Password
                                                </label>
                                                <input
                                                    type={showCurrentPassword ? 'text' : 'password'}
                                                    name="currentPassword"
                                                    value={password.currentPassword}
                                                    onChange={handlePasswordChange}
                                                    className="form-input"
                                                    placeholder="Enter current password"
                                                    aria-label="Current Password"
                                                    aria-invalid={currentPasswordError ? 'true' : 'false'}
                                                    aria-describedby={currentPasswordError ? 'currentPasswordError' : undefined}
                                                    disabled={loading}
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={toggleCurrentPasswordVisibility}
                                                    aria-label={showCurrentPassword ? 'Hide current password' : 'Show current password'}
                                                    disabled={loading}
                                                >
                                                    {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                                                </button>
                                                {currentPasswordError && (
                                                    <p
                                                        id="currentPasswordError"
                                                        className="text-red-800 text-sm mt-1"
                                                        role="alert"
                                                    >
                                                        {currentPasswordError}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-input-container">
                                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    type={showNewPassword ? 'text' : 'password'}
                                                    name="newPassword"
                                                    value={password.newPassword}
                                                    onChange={handlePasswordChange}
                                                    className="form-input"
                                                    placeholder="New password"
                                                    aria-label="New Password"
                                                    aria-invalid={newPasswordError ? 'true' : 'false'}
                                                    aria-describedby={newPasswordError ? 'newPasswordError' : undefined}
                                                    disabled={loading}
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={toggleNewPasswordVisibility}
                                                    aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                                                    disabled={loading}
                                                >
                                                    {showNewPassword ? '👁️' : '👁️‍🗨️'}
                                                </button>
                                                {newPasswordError && (
                                                    <p id="newPasswordError" className="text-red-800 text-sm mt-1" role="alert">
                                                        {newPasswordError}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="form-input-container">
                                                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    value={password.confirmPassword}
                                                    onChange={handlePasswordChange}
                                                    className="form-input"
                                                    placeholder="Confirm new password"
                                                    aria-label="Confirm Password"
                                                    aria-invalid={confirmPasswordError ? 'true' : 'false'}
                                                    aria-describedby={confirmPasswordError ? 'confirmPasswordError' : undefined}
                                                    disabled={loading}
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                                    disabled={loading}
                                                >
                                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                                </button>
                                                {confirmPasswordError && (
                                                    <p
                                                        id="confirmPasswordError"
                                                        className="text-red-800 text-sm mt-1"
                                                        role="alert"
                                                    >
                                                        {confirmPasswordError}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <br />
                                        <button
                                            onClick={handleChangePassword}
                                            className="btn-primary flex gap-2"
                                            aria-label="Change Password"
                                            disabled={loading || currentPasswordError || newPasswordError || confirmPasswordError}
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                            {loading ? 'Changing Password...' : 'Change Password'}
                                        </button>
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
                                                disabled={loading}
                                            />
                                            <div>
                                                <span className="text-base font-medium">Email Notifications</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Receive updates via email</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.chatNotifications}
                                                onChange={(e) => handleSettingChange('chatNotifications', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Chat Notifications"
                                                disabled={loading}
                                            />
                                            <div>
                                                <span className="text-base font-medium">Chat Notifications</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Alerts for new messages</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={settings.notificationSound}
                                                onChange={(e) => handleSettingChange('notificationSound', e.target.checked)}
                                                className="h-5 w-5 text-[var(--accent-primary)] rounded focus:ring-[var(--accent-primary)]"
                                                aria-label="Notification Sound"
                                                disabled={loading}
                                            />
                                            <div>
                                                <span className="text-base font-medium">Notification Sound</span>
                                                <p className="text-sm text-[var(--text-secondary)]">Play sound for notifications</p>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="tooltip">
                                            {/*<button*/}
                                            {/*    onClick={handleSaveSettings}*/}
                                            {/*    className="btn-primary flex gap-2"*/}
                                            {/*    aria-label="Save Notification Settings"*/}
                                            {/*    disabled={loading || !hasSettingsChanged()}*/}
                                            {/*>*/}
                                            {/*    <PencilIcon className="w-4 h-4" />*/}
                                            {/*    {loading ? 'Saving...' : 'Save Settings'}*/}
                                            {/*</button>*/}
                                            <span className="tooltip-text">
                                                {hasSettingsChanged() ? 'Save changes to notification settings' : 'No changes to save'}
                                            </span>
                                        </div>
                                        <div className="tooltip">
                                            {/*<button*/}
                                            {/*    onClick={handleClearNotifications}*/}
                                            {/*    className="btn-danger flex gap-2"*/}
                                            {/*    aria-label="Clear Notifications"*/}
                                            {/*    disabled={loading || notifications.length === 0 || !user.id}*/}
                                            {/*>*/}
                                            {/*    <TrashIcon className="w-4 h-4" />*/}
                                            {/*    {loading ? 'Clearing...' : 'Clear Notifications'}*/}
                                            {/*</button>*/}
                                            <span className="tooltip-text">
                                                {notifications.length === 0 ? 'No notifications to clear' : 'Clear all notifications'}
                                            </span>
                                        </div>
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
                                                value={settings.theme}
                                                onChange={(e) => handleSettingChange('theme', e.target.value)}
                                                className="form-input"
                                                aria-label="Select Theme"
                                                disabled={loading}
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
                                                disabled={loading}
                                            >
                                                <option value="small">Small</option>
                                                <option value="medium">Medium</option>
                                                <option value="large">Large</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="tooltip">
                                        {/*<button*/}
                                        {/*    onClick={handleSaveSettings}*/}
                                        {/*    className="btn-primary flex gap-2"*/}
                                        {/*    aria-label="Save Appearance Settings"*/}
                                        {/*    disabled={loading || !hasSettingsChanged()}*/}
                                        {/*>*/}
                                        {/*    <PencilIcon className="w-4 h-4" />*/}
                                        {/*    {loading ? 'Saving...' : 'Save Settings'}*/}
                                        {/*</button>*/}
                                        <span className="tooltip-text">
                                            {hasSettingsChanged() ? 'Save changes to appearance settings' : 'No changes to save'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>
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
        id: PropTypes.number,
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