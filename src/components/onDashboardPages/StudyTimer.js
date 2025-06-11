import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const StudyTimer = ({ onTimerFinish }) => {
    const [time, setTime] = useState(0); // Start at 0 seconds
    const [isActive, setIsActive] = useState(false);
    const [customTime, setCustomTime] = useState(''); // For user input in minutes

    useEffect(() => {
        let interval;
        if (isActive && time > 0) {
            interval = setInterval(() => setTime((prev) => prev - 1), 1000);
        } else if (time <= 0 && isActive) {
            setIsActive(false); // Stop when timer reaches 0
            onTimerFinish(); // Notify parent when timer finishes
        }
        return () => clearInterval(interval);
    }, [isActive, time, onTimerFinish]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleSetTime = () => {
        const minutes = parseInt(customTime, 10);
        if (!isNaN(minutes) && minutes > 0) {
            setTime(minutes * 60); // Convert minutes to seconds
            setCustomTime(''); // Clear input
            setIsActive(false); // Ensure timer is paused after setting
        }
    };

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Study Timer</h2>
            <div className="text-4xl font-mono text-[var(--accent-primary)] mb-4">{formatTime()}</div>
            <div className="flex gap-2 mb-2">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                    aria-label={isActive ? 'Pause timer' : 'Start timer'}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={() => {
                        setTime(0);
                        setIsActive(false);
                    }}
                    className="px-4 py-2 bg-[var(--border)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-primary)]"
                    aria-label="Reset timer"
                >
                    Reset
                </button>
            </div>
            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Set minutes..."
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="p-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] w-24"
                    aria-label="Set custom timer duration in minutes"
                />
                <button
                    onClick={handleSetTime}
                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                    aria-label="Set timer"
                >
                    Set
                </button>
            </div>
        </div>
    );
};

StudyTimer.propTypes = {
    onTimerFinish: PropTypes.func.isRequired,
};

export default StudyTimer;