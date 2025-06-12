import PropTypes from 'prop-types';

const NotificationStats = ({ totalNotifications, unreadNotifications, readNotifications }) => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <p className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold py-2 px-4 rounded-lg hover:bg-[var(--hover-tertiary)]">
            Total Notifications: {totalNotifications}
        </p>
        <p className="bg-[var(--accent-primary)] text-white font-medium py-2 px-4 rounded-lg hover:bg-[var(--hover-primary)]">
            Unread Notifications: {unreadNotifications}
        </p>
        <p className="bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium py-2 px-4 rounded-lg hover:bg-[var(--hover-tertiary)]">
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