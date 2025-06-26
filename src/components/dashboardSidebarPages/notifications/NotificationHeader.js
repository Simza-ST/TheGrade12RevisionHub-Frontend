import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotificationHeader = ({ user, unreadNotifications, darkMode, setDarkMode }) => (
    <div className="bg-[var(--bg-secondary)] bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-[var(--shadow)] mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Notifications</h1>
            <p className="text-sm mt-1 text-[var(--text-secondary)]">Stay updated, {user.name}!</p>
        </div>
        <div className="notification-header-actions">
            <Link
                to="/notifications"
                className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] inline-flex items-center h-10"
                aria-label={`View notifications (${unreadNotifications} unread)`}
            >
                🔔
                {unreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[var(--accent-secondary)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotifications}
                    </span>
                )}
            </Link>
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] inline-flex items-center h-10"
                aria-label="Toggle dark mode"
            >
                {darkMode ? '☀️' : '🌙'}
            </button>
        </div>
    </div>
);

NotificationHeader.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    unreadNotifications: PropTypes.number.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
};

export default NotificationHeader;