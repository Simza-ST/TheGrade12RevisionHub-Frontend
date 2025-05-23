import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Sidebar.css';

// UserProfile component for sidebar
const UserProfile = ({ user, onLogout }) => {
    if (!user) {
        return null; // Don't render if user is undefined
    }

    return (
        <div className="flex items-center space-x-4 p-4 bg-teal-800 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl">
            <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-teal-400"
            />
            <div className="flex-1">
                <h2 className="text-sm font-semibold text-white">{user.name || 'Unknown User'}</h2>
                <p className="text-xs text-gray-300">{user.title || 'No Title'}</p>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
};

const Sidebar = ({ user, onLogout, isCollapsed, setIsCollapsed, darkMode }) => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'Subjects', path: '/subjects', icon: '📚' },
        { name: 'Quizzes', path: '/quizzes', icon: '❓' },
        { name: 'Question Papers', path: '/questionpapers', icon: '📝' },
        { name: 'Resources', path: '/resources', icon: '🔗' },
        { name: 'Performance', path: '/performance', icon: '📊' },
        { name: 'Notifications', path: '/notifications', icon: '🔔' },
        { name: 'Chatroom', path: '/chatroom', icon: '💬' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
        { name: 'Logout', path: '/', icon: '🚪' },
    ];

    return (
        <nav
            className={`
                h-screen bg-teal-${darkMode ? '900' : '800'} text-white flex flex-col fixed top-0 left-0
                transition-all duration-300 ease-in-out shadow-2xl z-30
                ${isCollapsed ? 'w-16' : 'w-64'}
            `}
        >
            <div className="flex items-center justify-between p-6">
                {!isCollapsed && (
                    <div className="text-2xl font-semibold text-white">RevisionHub</div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 bg-teal-800 hover:bg-teal-700 text-white rounded-2xl shadow-2xl transition-colors"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
            <ul className="space-y-2 flex-1 px-2 overflow-auto hide-scrollbar">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            className={`
                                flex items-center w-full py-2 px-3 rounded-lg
                                hover:bg-teal-800 hover:shadow-sm transition-all duration-200
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                            title={isCollapsed ? 'item.name' : ''}
                            aria-label={`Navigate to ${item.name}`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!isCollapsed && (
                                <span className="ml-3 text-sm font-medium text-gray-300">{item.name}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
            {!isCollapsed && (
                <div className="mt-auto p-4">
                    <UserProfile user={user} onLogout={onLogout} />
                </div>
            )}
        </nav>
    );
};

Sidebar.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default Sidebar;