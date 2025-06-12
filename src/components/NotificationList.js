import PropTypes from 'prop-types';

const NotificationList = ({ filteredNotifications, markAsRead, deleteNotification }) => {
    // Safely format date
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
        }); // e.g., "Jun 1, 2025, 9:30 PM"
    };

    return (
        <ul className="space-y-2">
            {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                    <li
                        key={notification.id}
                        className={`p-2 rounded flex justify-between items-center ${
                            notification.read ? 'bg-gray-800' : 'bg-teal-600'
                        }`}
                    >
                        <div className="flex items-center gap-2">
              <span
                  className={`text-sm font-medium ${
                      notification.type === 'info'
                          ? 'text-blue-400'
                          : notification.type === 'warning'
                              ? 'text-yellow-400'
                              : notification.type === 'error'
                                  ? 'text-red-500'
                                  : 'text-gray-400'
                  }`}
              >
                [{notification.type ? notification.type.toUpperCase() : 'UNKNOWN'}]
              </span>
                            <span className="text-white">{notification.message}</span>
                        </div>
                        <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">
                {formatDate(notification.createdAt)}
              </span>
                            {!notification.read && (
                                <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-sm text-blue-400 hover:underline"
                                    aria-label={`Mark notification ${notification.message} as read`}
                                >
                                    Mark as Read
                                </button>
                            )}
                            <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-sm text-red-400 hover:text-red-300 transition"
                                aria-label={`Delete notification ${notification.message}`}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <p className="text-gray-300">No notifications available.</p>
            )}
        </ul>
    );
};

NotificationList.propTypes = {
    filteredNotifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired, // Changed from 'date' to 'createdAt'
            read: PropTypes.bool.isRequired,
            type: PropTypes.oneOf(['info', 'warning', 'error', undefined]),
        })
    ).isRequired,
    markAsRead: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
};

export default NotificationList;