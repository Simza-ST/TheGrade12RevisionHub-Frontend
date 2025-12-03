
import React, { useState, useEffect } from 'react';

const Timer = ({ examTime, setExamTime }) => {
    const [timeLeft, setTimeLeft] = useState(examTime);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
            setExamTime(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, setExamTime]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercentage = ((examTime - timeLeft) / examTime) * 100;

    return (
        <>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <div className="timer">
                ⏰ {formatTime(timeLeft)}
            </div>
        </>
    );
};

export default Timer;