
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ user, notificationCount, darkMode, setDarkMode, onNotificationsClick }) => (
    <div className="bg-gradient-to-r from-teal-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">Subjects</h1>
            <p className="text-sm mt-1 text-gray-300">Manage your courses, {user.name}!</p>
        </div>
        <div className="flex gap-4">
            <Link
                to="/notifications"
                className="relative px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                aria-label={`View notifications (${notificationCount} unread)`}
                onClick={onNotificationsClick}
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
                className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                aria-label="Toggle dark mode"
            >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
    </div>
);

Header.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    notificationCount: PropTypes.number.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    onNotificationsClick: PropTypes.func.isRequired,
};

export default Header;