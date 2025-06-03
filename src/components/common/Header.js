// src/common/Header.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ user, notificationCount, darkMode, setDarkMode, onNotificationsClick, title }) => (
    <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-primary)] p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-sm mt-1 text-[var(--text-secondary)]">Welcome, {user.name}!</p>
        </div>
        <div className="flex gap-4">
            <Link
                to="/notifications"
                onClick={onNotificationsClick}
                className="relative px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-primary)]"
                aria-label={`View notifications (${notificationCount} unread)`}
            >
                🔔
                {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--accent-secondary)] text-[var(--text-primary)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                    </span>
                )}
            </Link>
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-primary)]"
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
    title: PropTypes.string.isRequired,
};

export default Header;