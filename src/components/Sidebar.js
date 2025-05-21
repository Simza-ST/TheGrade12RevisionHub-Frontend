import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// UserProfile component for sidebar
const UserProfile = ({ user, onLogout }) => {
    if (!user) {
        return null; // Don't render if user is undefined
    }

    return (
        <div className="flex items-center space-x-4 p-4 bg-indigo-900 rounded-lg">
            <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
                <h2 className="text-sm font-semibold text-white">{user.name || 'Unknown User'}</h2>
                <p className="text-xs text-gray-300">{user.title || 'No Title'}</p>
            </div>
        </div>
    );
};

const Sidebar = ({ user, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'Subjects', path: '/subjects', icon: '📚' },
        { name: 'Quizzes', path: '/quizzes', icon: '❓' },
        { name: 'Question Papers', path: '/questionpapers', icon: '📝' },
        { name: 'Resources', path: '/resources', icon: '🔗' },
        { name: 'Schedule', path: '/schedule', icon: '📅' },
        { name: 'Performance', path: '/performance', icon: '📊' },
        { name: 'Notifications', path: '/notifications', icon: '🔔' },
        { name: 'Chatroom', path: '/chatroom', icon: '💬' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
        { name: 'Logout', path: '/', icon: '🚪' },
    ];

    return (
        <nav
            className={`h-screen bg-indigo-800 text-white flex flex-col p-4 fixed transition-all duration-300 ${
                isCollapsed ? 'w-16' : 'w-64'
            }`}
        >
            <div className="flex items-center justify-between mb-8">
                {!isCollapsed && (
                    <div className="text-2xl font-bold">RevisionHub</div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded hover:bg-indigo-600"
                >
                    {isCollapsed ? '➡️' : '⬅️'}
                </button>
            </div>
            <ul className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <li key={item.name} className="flex items-center">
                        <Link
                            to={item.path}
                            className={`flex items-center w-full py-2 px-4 rounded hover:bg-indigo-600 ${
                                isCollapsed ? 'justify-center' : ''
                            }`}
                            title={isCollapsed ? item.name : ''}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!isCollapsed && (
                                <span className="ml-3">{item.name}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
            {!isCollapsed && (
                <div className="mt-auto">
                    <UserProfile user={user} onLogout={onLogout} />
                </div>
            )}
        </nav>
    );
};

export default Sidebar;