import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const Settings = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });
    const [settings, setSettings] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching settings
        setTimeout(() => {
            try {
                setLoading(false);
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        }, 1000);
    }, []);

    const handleSettingChange = (key, value) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <div
                className={`
                    flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
                    ${isCollapsed ? 'ml-16' : 'ml-64'}
                    ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}
                `}
            >
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Settings</h1>
                        <p className="text-sm mt-1">Customize your experience, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
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
                            className="px-4 py-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">User Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>Enable Dark Mode</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>Enable Email Notifications</span>
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-200">
                                <input
                                    type="checkbox"
                                    checked={settings.pushNotifications}
                                    onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>Enable Push Notifications</span>
                            </label>
                        </div>
                        <button
                            onClick={() => alert('Settings saved!')}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Save Settings
                        </button>
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