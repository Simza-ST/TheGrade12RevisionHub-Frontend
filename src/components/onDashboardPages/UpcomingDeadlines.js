import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpcomingDeadlines = ({ deadlines }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDeadlines = deadlines.filter((deadline) =>
        deadline.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Upcoming Deadlines</h2>
            <input
                type="text"
                placeholder="Search deadlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                aria-label="Search deadlines"
            />
            <ul className="space-y-2 max-h-80 overflow-y-auto mt-4">
                {filteredDeadlines.length > 0 ? (
                    filteredDeadlines.map((deadline) => (
                        <li
                            key={deadline.id}
                            className="p-2 bg-[var(--bg-secondary)] rounded flex justify-between hover:bg-[var(--hover-primary)] transition"
                        >
                            <span className="font-medium text-[var(--text-primary)]">{deadline.title}</span>
                            <span className="text-sm text-[var(--accent-secondary)]">{deadline.dueDate}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-[var(--text-secondary)]">No upcoming deadlines.</p>
                )}
            </ul>
        </div>
    );
};

UpcomingDeadlines.propTypes = {
    deadlines: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            dueDate: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default UpcomingDeadlines;