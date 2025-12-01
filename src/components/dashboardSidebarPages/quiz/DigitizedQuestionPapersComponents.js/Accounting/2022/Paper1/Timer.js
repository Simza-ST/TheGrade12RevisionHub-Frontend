import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) {
            // Auto-submit when time runs out
            const submitBtn = document.querySelector('.submit-btn');
            if (submitBtn) submitBtn.click();
            return;
        }

        const timerId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="timer">
            {formatTime(timeLeft)}
        </div>
    );
};

export default Timer;