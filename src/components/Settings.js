import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"; // Adjust path as needed

const Settings = () => {
    const [userSettings, setUserSettings] = useState({
        emailNotifications: true,
        theme: 'light',
        language: 'English',
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/settings', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setUserSettings(data);
                }
            } catch (error) {
                console.error('Error fetching settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handleSaveSettings = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers,
                body: JSON.stringify(userSettings),
            });
            if (response.ok) {
                alert('Settings saved successfully!');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
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