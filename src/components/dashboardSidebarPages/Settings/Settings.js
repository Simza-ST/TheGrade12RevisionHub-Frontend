import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from "../../common/Header";

const Settings = ({ user, setNotifications, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();

    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        setTimeout(() => {
            try {
                setLoading(false);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        }, 1000);
    }, [darkMode]);

    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen">
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
                    tabDescription="Settings"
                    userMessage="Customize your experience"
                />
            <div
                className={`
          flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
          ${isCollapsed ? 'ml-16' : 'ml-64'}
        `}
            >
                <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
                    <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">User Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center space-x-2 text-[var(--text-primary)]">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                    className="h-4 w-4 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                                />
                                <span>Enable Dark Mode</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center space-x-2 text-[var(--text-primary)]">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                    className="h-4 w-4 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                                />
                                <span>Enable Email Notifications</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center space-x-2 text-[var(--text-primary)]">
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications}
                                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                                    className="h-4 w-4 text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                                />
                                <span>Enable Push Notifications</span>
                            </label>
                        </div>
                        <button
                            onClick={() => alert('Settings saved!')}
                            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

Settings.propTypes = {
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
};

export default Settings;