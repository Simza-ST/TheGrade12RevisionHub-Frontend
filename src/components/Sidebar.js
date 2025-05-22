import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// UserProfile component for sidebar
const UserProfile = ({ user, onLogout }) => {
    if (!user) {
        return null; // Don't render if user is undefined
    }

    return (
        <div className="flex items-center space-x-4 p-4 bg-indigo-900 rounded-lg shadow-sm">
            <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-300"
            />
            <div className="flex-1">
                <h2 className="text-sm font-semibold text-white">{user.name || 'Unknown User'}</h2>
                <p className="text-xs text-indigo-200">{user.title || 'No Title'}</p>
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

const Sidebar = ({ user, onLogout, isCollapsed, setIsCollapsed }) => {
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
            className={`
                h-screen bg-indigo-800 text-white flex flex-col fixed top-0 left-0
                transition-all duration-300 ease-in-out shadow-lg z-30
                ${isCollapsed ? 'w-16' : 'w-64'}
            `}
        >
            <div className="flex items-center justify-between p-4">
                {!isCollapsed && (
                    <div className="text-2xl font-bold tracking-tight">RevisionHub</div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    <span className="text-xl">{isCollapsed ? '➡️' : '⬅️'}</span>
                </button>
            </div>
            <ul className="space-y-1 flex-1 px-2">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            className={`
                                flex items-center w-full py-2 px-3 rounded-lg
                                hover:bg-indigo-700 hover:shadow-sm transition-all duration-200
                                ${isCollapsed ? 'justify-center' : ''}
                            `}
                            title={isCollapsed ? item.name : ''}
                            aria-label={`Navigate to ${item.name}`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!isCollapsed && (
                                <span className="ml-3 text-sm font-medium">{item.name}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
            {!isCollapsed && (
                <div className="mt-auto p-2">
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
};

export default Sidebar;