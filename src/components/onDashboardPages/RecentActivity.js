import React from 'react';
import PropTypes from 'prop-types';

const RecentActivity = ({ activities }) => (
    <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)] text-center">Recent Activity</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto hide-scrollbar">
            {activities.length > 0 ? (
                activities.map((activity) => (
                    <li
                        key={activity.id}
                        className="py-2 px-16 bg-[var(--bg-secondary)] rounded hover:bg-[var(--hover-primary)] transition cursor-pointer  flex justify-between items-center"
                        onClick={() => console.log(`View details for: ${activity.description}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && console.log(`View details for: ${activity.description}`)}
                    >
                        <span className="font-medium text-[var(--text-primary)]">{activity.description}</span>
                        <span className="text-sm text-[var(--text-secondary)] ">
              {new Date(activity.date).toLocaleString()}
            </span>
                    </li>
                ))
            ) : (
                <p className="text-[var(--text-secondary)]">No recent activity.</p>
            )}
        </ul>
    </div>
);

RecentActivity.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default RecentActivity;