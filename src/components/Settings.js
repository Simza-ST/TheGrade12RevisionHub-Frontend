import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const Settings = () => {
    const navigate = useNavigate();
    const [userSettings, setUserSettings] = useState({
        emailNotifications: true,
        theme: 'light',
        language: 'English',
    });
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockSettings = {
            emailNotifications: true,
            theme: 'light',
            language: 'English',
        };

        setTimeout(() => {
            try {
                setUserSettings(mockSettings);
            } catch (error) {
                console.error('Error setting mock settings:', error);
            }
        }, 1000); // Simulate API delay
    }, []);

    const handleSaveSettings = () => {
        alert('Settings saved successfully!'); // Mock save action
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="p-8 w-full transition-all duration-300 ml-64 sm:ml-64 lg:ml-64 xl:ml-64">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">User Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={userSettings.emailNotifications}
                                    onChange={(e) =>
                                        setUserSettings({
                                            ...userSettings,
                                            emailNotifications: e.target.checked,
                                        })
                                    }
                                />
                                <span>Enable Email Notifications</span>
                            </label>
                        </div>
                        <div>
                            <label className="block mb-1">Theme</label>
                            <select
                                value={userSettings.theme}
                                onChange={(e) =>
                                    setUserSettings({
                                        ...userSettings,
                                        theme: e.target.value,
                                    })
                                }
                                className="p-2 border rounded"
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-1">Language</label>
                            <select
                                value={userSettings.language}
                                onChange={(e) =>
                                    setUserSettings({
                                        ...userSettings,
                                        language: e.target.value,
                                    })
                                }
                                className="p-2 border rounded"
                            >
                                <option value="English">English</option>
                                <option value="Spanish">Spanish</option>
                            </select>
                        </div>
                        <button
                            onClick={handleSaveSettings}
                            className="bg-indigo-600 text-white px-4 py-2 rounded"
                        >
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;