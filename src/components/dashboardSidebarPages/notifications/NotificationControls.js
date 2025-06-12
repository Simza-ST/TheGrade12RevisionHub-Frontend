import PropTypes from 'prop-types';

const NotificationControls = ({ filterType, setFilterType, markAllAsRead, deleteAllNotifications, unreadNotifications, totalNotifications }) => (
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Notifications</h2>
        <div className="flex items-center gap-4">
            <select
                className="form-input"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="all">All Types</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="birthday">Birthday</option>
                <option value="read">Read</option>
                <option value="unread">Unread</option>
                <option value="quiz">Quiz</option>
            </select>
            <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-sm rounded-lg hover:bg-[var(--hover-tertiary)] whitespace-nowrap"
                disabled={unreadNotifications === 0}
            >
                Mark All as Read
            </button>
            <button
                onClick={deleteAllNotifications}
                className="px-4 py-2 bg-[var(--accent-secondary)] text-white text-sm rounded-lg hover:bg-[var(--hover-secondary)] whitespace-nowrap"
                disabled={totalNotifications === 0}
            >
                Delete All
            </button>
        </div>
    </div>
);

NotificationControls.propTypes = {
    filterType: PropTypes.string.isRequired,
    setFilterType: PropTypes.func.isRequired,
    markAllAsRead: PropTypes.func.isRequired,
    deleteAllNotifications: PropTypes.func.isRequired,
    unreadNotifications: PropTypes.number.isRequired,
    totalNotifications: PropTypes.number.isRequired,
};

export default NotificationControls;