import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Schedule = ({ schedule }) => {
    const days = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
    const [selectedDay, setSelectedDay] = useState('T');
    const [viewMode, setViewMode] = useState('list');

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Schedule</h2>
                <button
                    onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                    className="px-4 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                    aria-label={`Switch to ${viewMode === 'list' ? 'calendar' : 'list'} view`}
                >
                    {viewMode === 'list' ? 'Calendar View' : 'List View'}
                </button>
            </div>
            {viewMode === 'list' ? (
                <>
                    <div className="flex space-x-2 mb-4">
                        {days.map((day) => (
                            <button
                                key={day}
                                className={`px-3 py-1 rounded ${
                                    selectedDay === day
                                        ? 'bg-[var(--accent-primary)] text-[var(--text-primary)]'
                                        : 'bg-[var(--bg-tertiary)] hover:bg-[var(--hover-tertiary)] text-[var(--text-primary)]'
                                }`}
                                onClick={() => setSelectedDay(day)}
                                aria-label={`Select ${day}`}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-2">
                        {schedule
                            .filter((item) => item.day === selectedDay)
                            .map((item) => (
                                <div
                                    key={item.course}
                                    className="flex items-center justify-between p-2 bg-[var(--bg-secondary)] rounded hover:bg-[var(--hover-primary)] transition"
                                    title={`Location: ${item.location}`}
                                >
                                    <span className="font-medium text-[var(--text-primary)]">{item.course}</span>
                                    <span className="text-[var(--text-secondary)]">{item.time}</span>
                                </div>
                            ))}
                        {schedule.filter((item) => item.day === selectedDay).length === 0 && (
                            <p className="text-[var(--text-secondary)]">No schedule for this day.</p>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-[var(--text-secondary)]">Calendar view coming soon!</div>
            )}
        </div>
    );
};

Schedule.propTypes = {
    schedule: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            course: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Schedule;