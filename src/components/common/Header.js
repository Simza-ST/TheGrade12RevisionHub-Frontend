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
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-md  flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--text-primary)]">{tabDescription}</h1>
                    <p className="text-sm mt-1 text-[var(--text-secondary)]">{userMessage}, {displayName}!</p>
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/notifications"
                        className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                        aria-label={`View notifications (${notificationCount} unread)`}
                    >
                        🔔
                        {notificationCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[var(--accent-secondary)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {notificationCount}
                                    </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
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