import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [totalTime, setTotalTime] = useState(3 * 60 * 60); // 3 hours in seconds
    const [timerClass, setTimerClass] = useState('timer-container');

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTotalTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(timerInterval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    useEffect(() => {
        if (totalTime <= 600) {
            setTimerClass('timer-container timer-critical');
        } else if (totalTime <= 1800) {
            setTimerClass('timer-container timer-warning');
        } else {
            setTimerClass('timer-container');
        }
    }, [totalTime]);

    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
        <div className={timerClass} id="timer">
            <div className="timer-display" id="timer-display">{display}</div>
            <div className="timer-label">TIME REMAINING</div>
        </div>
    );
};

export default Timer;

