import PropTypes from 'prop-types';

const NotificationList = ({ filteredNotifications, markAsRead, deleteNotification }) => (
    <ul className="space-y-2">
        {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
                <li
                    key={notification.id}
                    className={`p-2 rounded flex justify-between items-center ${
                        notification.read ? 'bg-teal-700' : 'bg-teal-600'
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
                                ? 'text-red-400'
                                : 'text-gray-400'
                }`}
            >
              [{notification.type ? notification.type.toUpperCase() : 'UNKNOWN'}]
            </span>
                        <span className="text-white">{notification.message}</span>
                    </div>
                    <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">
              {new Date(notification.date).toLocaleString()}
            </span>
                        {!notification.read && (
                            <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-sm text-teal-400 hover:underline"
                                aria-label={`Mark notification ${notification.message} as read`}
                            >
                                Mark as Read
                            </button>
                        )}
                        <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-sm text-red-400 hover:underline"
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

NotificationList.propTypes = {
    filteredNotifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            type: PropTypes.oneOf(['info', 'warning', 'error', undefined]),
        })
    ).isRequired,
    markAsRead: PropTypes.func.isRequired,
    deleteNotification: PropTypes.func.isRequired,
};

export default NotificationList;