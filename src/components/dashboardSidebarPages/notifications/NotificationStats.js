import PropTypes from 'prop-types';

const NotificationStats = ({ totalNotifications, unreadNotifications, readNotifications }) => (
    <div className="grid mb-4">
        <p className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold p-2 rounded-lg hover:bg-[var(--hover-tertiary)] text-sm flex items-center justify-center">
            Total: {totalNotifications}
        </p>
        <p className="bg-[var(--accent-primary)] text-white font-medium p-2 rounded-lg hover:bg-[var(--hover-primary)] text-sm flex items-center justify-center">
            Unread: {unreadNotifications}
        </p>
        <p className="bg-[var(--bg-secondary)] text-[var(--text-primary)] font-medium p-2 rounded-lg hover:bg-[var(--hover-tertiary)] text-sm flex items-center justify-center">
            Read: {readNotifications}
        </p>
    </div>
);

NotificationStats.propTypes = {
    totalNotifications: PropTypes.number.isRequired,
    unreadNotifications: PropTypes.number.isRequired,
    readNotifications: PropTypes.number.isRequired,
};

export default NotificationStats;