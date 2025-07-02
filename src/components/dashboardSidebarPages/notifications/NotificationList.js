import PropTypes from 'prop-types';

const NotificationList = ({ filteredNotifications, markAsRead, deleteNotification }) => {
    console.log('Rendered Notifications:', filteredNotifications);
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

    // Sort notifications by createdAt in descending order (newest first)
    const sortedNotifications = [...filteredNotifications].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <ul className="space-y-2">
            {sortedNotifications.length > 0 ? (
                sortedNotifications.map((notification) => (
                    <li
                        key={notification.id}
                        className={`p-2 rounded flex flex-col notification ${notification.read ? 'read' : ''}`}
                    >
                        <div className="flex items-center gap-2 mb-1">
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
                        </div>
                        <div className="text-[var(--text-primary)] mb-1">
                            {notification.message}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-[var(--text-secondary)] mb-1 sm:mb-0">
                                {formatDate(notification.createdAt)}
                            </span>
                            <div className="flex gap-2">
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
                        </div>
                    </li>
                ))
            ) : (
                <p className="text-[var(--text-secondary)]">No notifications available.</p>
            )}
            <style>{`
                .notification {
                    background-color: var(--bg-tertiary, ${typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#374151' : '#e5e7eb'});
                }
                .notification.read {
                    background-color: var(--bg-secondary, ${typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#1f2937' : '#ffffff'});
                }
                @media (max-width: 639px) {
                    .notification {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .notification > div {
                        width: 100%;
                    }
                }
            `}</style>
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