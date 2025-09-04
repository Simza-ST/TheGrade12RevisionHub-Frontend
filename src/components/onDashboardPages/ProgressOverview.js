import React from 'react';
import PropTypes from 'prop-types';

const ProgressOverview = ({ courses }) => {
    const averageProgress = Math.round( courses.reduce((sum, course) => sum + course.progress, 0) / courses.length || 0);

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Progress Overview</h2>
            <div className="flex items-center space-x-4">
                <div className="w-1/2">
                    <div className="bg-[var(--border)] rounded-full h-6">
                        <div
                            className="bg-[var(--accent-primary)] h-6 rounded-full"
                            style={{ width: `${averageProgress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="w-1/2 text-center">
                    <p className="text-2xl font-semibold text-[var(--accent-primary)]">{averageProgress}%</p>
                    <p className="text-sm text-[var(--text-secondary)]">Overall Progress</p>
                </div>
            </div>
        </div>
    );
};

ProgressOverview.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ProgressOverview;