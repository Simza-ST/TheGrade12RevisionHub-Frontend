import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime = 2.5 * 60 * 60, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp?.();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerClass = () => {
        if (timeLeft <= 600) return 'timer-critical';
        if (timeLeft <= 1800) return 'timer-warning';
        return '';
    };

    return (
        <div className={`timer-container ${getTimerClass()}`}>
            <div className="timer-display">{formatTime(timeLeft)}</div>
            <div className="timer-label">TIME REMAINING</div>
        </div>
    );
};

export default Timer;