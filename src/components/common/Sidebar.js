import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './sidebar.css';


const UserProfile = ({ user, onLogout }) => {
    if (!user) {
        return null;
    }
    const displayName = user.firstName || user.lastName
        ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
        : user.email || 'User';

    const getInitials = (firstName, lastName) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    return (
        <div className="user-profile flex items-center space-x-4 p-4 bg-[var(--bg-secondary)] rounded-2xl shadow-lg">
            {user.profilePicture ? (
                <img
                    src={user.profilePicture}
                    alt="Profile picture"
                    className="w-12 h-12 rounded-full border-2 border-[var(--accent-primary)] object-cover"
                />
            ) : (
                <div className="h-12 w-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-2xl text-[var(--text-primary)] border-2 border-[var(--accent-primary)]">
                    {getInitials(user.firstName, user.lastName)}
                </div>
            )}
            <div className="user-profile-info flex-1">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                    {displayName || 'Unknown User'}
                </h2>
                <p className="text-sm font-medium text-[var(--text-secondary)]">
                    {user.email || 'No Email'}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                    {user.title || 'No Role'}
                </p>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
};

const Sidebar = ({ user, onLogout, isCollapsed, setIsCollapsed, darkMode, disableHamburger ,onActivity}) => {
        const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'Subjects', path: '/subjects', icon: '📚', },
        { name: 'Quizzes', path: '/quizzes', icon: '❓',  },
        { name: 'Question Papers', path: '/question-papers/list', icon: '📝', },
        { name: 'Resources', path: '/resources', icon: '🔗', onClick: () => onActivity && onActivity('Viewed Resources') },
        { name: 'Performance', path: '/performance', icon: '📊', onClick: () => onActivity && onActivity('Viewed Performances') },
        { name: 'Notifications', path: '/notifications', icon: '🔔', onClick: () => onActivity && onActivity('Viewed Notifications') },
        { name: 'Chatroom', path: '/chatroom', icon: '💬', onClick: () => onActivity && onActivity('Visited Chatroom') },
        { name: 'Settings', path: '/settings', icon: '⚙️',  },
        { name: 'Logout', path: '/', icon: '🚪', onClick: onLogout },
    ];

    return (
        <nav
            className={`
        h-screen bg-[var(--bg-secondary)] text-[var(--text-primary)] flex flex-col fixed top-0 left-0
        shadow-md z-30
        ${isCollapsed ? 'w-16' : 'w-64'}
      `}
        >
            <div className="flex items-center justify-between p-6">
                {!isCollapsed && (
                    <div className="text-2xl font-semibold text-[var(--text-primary)]">RevisionHub</div>
                )}
                {!disableHamburger && (
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 bg-[var(--bg-secondary)] hover:bg-[var(--hover-tertiary)] text-[var(--text-primary)] rounded-2xl shadow-md"
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
                    )}
            </div>
            <ul className="space-y-2 flex-1 px-2 overflow-auto hide-scrollbar">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            onClick={item.onClick}
                            className={`
                flex items-center w-full py-2 px-3 rounded-lg
                hover:bg-[var(--hover-tertiary)] hover:shadow-sm
                ${isCollapsed ? 'justify-center' : ''}
              `}
                            title={isCollapsed ? item.name : ''}
                            aria-label={`Navigate to ${item.name}`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!isCollapsed && (
                                <span className="ml-3 text-sm font-medium text-[var(--text-secondary)]">{item.name}</span>
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
        id: PropTypes.number,
        name: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func,
    darkMode: PropTypes.bool.isRequired,
    disableHamburger: PropTypes.bool,
    onActivity: PropTypes.func.isRequired,
};

export default Sidebar;