import PropTypes from 'prop-types';

const NotificationList = ({ filteredNotifications, markAsRead, deleteNotification }) => {
    const formatDate = (dateString) => {
        if (!dateString || typeof dateString !== 'string') {
            return 'Unknown Date';
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    return (
        <ul className="space-y-2">
            {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                    <li
                        key={notification.id}
                        className={`p-2 rounded flex justify-between items-center notification ${notification.read ? 'read' : ''}`}
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className={`text-sm font-medium ${
                                    notification.type === 'info'
                                        ? 'text-[var(--accent-primary)]'
                                        : notification.type === 'warning'
                                            ? 'text-yellow-400'
                                            : notification.type === 'error'
                                                ? 'text-[var(--accent-secondary)]'
                                                : 'text-[var(--text-secondary)]'
                                }`}
                            >
                                [{notification.type ? notification.type.toUpperCase() : 'UNKNOWN'}]
                            </span>
                            <span className="text-[var(--text-primary)]">{notification.message}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-[var(--text-secondary)]">
                                {formatDate(notification.createdAt)}
                            </span>
                            {!notification.read && (
                                <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-sm text-[var(--accent-primary)] hover:underline"
                                    aria-label={`Mark notification ${notification.message} as read`}
                                >
                                    Mark as Read
                                </button>
                            )}
                            <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-sm text-[var(--accent-secondary)] hover:text-[var(--hover-secondary)]"
                                aria-label={`Delete notification ${notification.message}`}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <p className="text-[var(--text-secondary)]">No notifications available.</p>
            )}
        </ul>
    );
};

NotificationList.propTypes = {
    filteredNotifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            type: PropTypes.oneOf(['info', 'warning', 'error', undefined]),
        })
    ).isRequired,
    markAsRead: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
};

export default NotificationList;