import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GoalTracker = ({ goals, setGoals }) => {
    const [newGoal, setNewGoal] = useState('');

    const handleAddGoal = () => {
        if (newGoal.trim()) {
            setGoals([
                ...goals,
                {
                    id: goals.length + 1,
                    description: newGoal,
                    progress: 0,
                },
            ]);
            setNewGoal('');
        }
    };

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Goal Tracker</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Add a new goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="flex-1 p-3 border border-[var(--border)] rounded-l-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                    aria-label="Add a new goal"
                />
                <button
                    onClick={handleAddGoal}
                    className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] px-4 py-3 rounded-r-lg hover:bg-[var(--hover-tertiary)]"
                    aria-label="Add goal"
                >
                    Add
                </button>
            </div>
            <div className="space-y-4">
                {goals.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-4">
                        <div className="w-2/3 text-[var(--text-primary)]">{goal.description}</div>
                        <div className="w-1/3">
                            <div className="bg-[var(--border)] rounded-full h-4">
                                <div
                                    className="bg-[var(--accent-primary)] h-4 rounded-full"
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-[var(--text-secondary)]">{goal.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

GoalTracker.propTypes = {
    goals: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
    setGoals: PropTypes.func.isRequired,
};

export default GoalTracker;