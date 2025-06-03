import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NotificationsWidget = ({ notifications }) => (
    <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Notifications</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                    <li
                        key={notification.id}
                        className="p-2 bg-[var(--bg-secondary)] rounded hover:bg-[var(--hover-primary)] transition"
                    >
                        <span className="text-[var(--text-primary)]">{notification.message}</span>
                        <span className="text-sm text-[var(--text-secondary)] ml-2">{notification.date}</span>
                    </li>
                ))
            ) : (
                <p className="text-[var(--text-secondary)]">No notifications.</p>
            )}
        </ul>
        <Link
            to="/notifications"
            className="block text-center mt-4 text-[var(--accent-primary)] hover:underline"
        >
            View All Notifications
        </Link>
    </div>
);

NotificationsWidget.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NotificationsWidget;