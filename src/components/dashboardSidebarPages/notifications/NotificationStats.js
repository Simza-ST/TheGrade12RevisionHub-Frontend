import PropTypes from 'prop-types';

// Component for displaying notification stats
const NotificationStats = ({ totalNotifications, unreadNotifications, readNotifications }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <p className="bg-red-100 text-red-800 font-semibold py-2 px-4 rounded-lg hover:bg-red-200 transition">
            Total Notifications: {totalNotifications}
        </p>
        <p className="bg-blue-100 text-blue-800 font-medium py-2 px-4 rounded-lg hover:bg-blue-200 transition">
            Unread Notifications: {unreadNotifications}
        </p>
        <p className="bg-green-100 text-green-800 font-medium py-2 px-4 rounded-lg hover:bg-green-200 transition">
            Read Notifications: {readNotifications}
        </p>
    </div>
);

NotificationStats.propTypes = {
    totalNotifications: PropTypes.number.isRequired,
    unreadNotifications: PropTypes.number.isRequired,
    readNotifications: PropTypes.number.isRequired,
};

export default NotificationStats;