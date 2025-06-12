import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ user, notifications, isCollapsed, darkMode, setDarkMode , tabDescription, userMessage}) => {
    const notificationCount = notifications.filter((n) => !n.read).length;
    const displayName = user.firstName || user.lastName
        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
        : user.email || 'User';

    return (
        <div
            className={`
                flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 mx-auto
                ${isCollapsed ? 'ml-16' : 'ml-64'}
            `}
        >
            <div className={`${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-teal-600 to-red-600'}
            text-white p-6 rounded-2xl shadow-2xl mb-2 flex justify-between items-center`}>
                <div className="flex items-center space-x-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{tabDescription}</h1>
                        <p className="text-sm mt-1 text-gray-300">
                            {userMessage}, {displayName}!
                        </p>
                        {user.title && (
                            <p className="text-xs text-gray-400">{user.title}</p>
                        )}
                        {(user.email && !user.firstName && !user.lastName) && (
                            <p className="text-xs text-gray-400">{user.email}</p>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 sm:gap-4">
                    <Link
                        to="/notifications"
                        className="relative px-3 py-2 sm:px-4 sm:py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200"
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
                        className="px-3 py-2 sm:px-4 sm:py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm sm:text-base"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    tabDescription: PropTypes.string.isRequired,
    userMessage: PropTypes.string.isRequired,
};

export default Header;