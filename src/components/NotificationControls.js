import PropTypes from 'prop-types';

// Component for the notification controls (filter and buttons)
const NotificationControls = ({ filterType, setFilterType, markAllAsRead, deleteAllNotifications, unreadNotifications, totalNotifications }) => (
    <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Your Notifications</h2>
        <div className="flex items-center gap-4">
            <select
                className="border rounded-lg px-2 py-1 text-sm text-white bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
            >
                <option value="all">All Types</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
            </select>
            <button
                onClick={markAllAsRead}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
                style={{ boxShadow: '2px 6px 15px rgba(0, 0, 200, 0.4)' }}
                disabled={unreadNotifications === 0}
            >
                Mark All as Read
            </button>
            <button
                onClick={deleteAllNotifications}
                className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition transform hover:-translate-y-1"
                style={{ boxShadow: '2px 6px 15px rgba(250, 0, 20, 0.4)' }}
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