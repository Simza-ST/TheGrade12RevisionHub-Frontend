import React, { useEffect, useState } from 'react';

const Timer = ({ examTime, setExamTime }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (examTime > 0) {
            const timer = setTimeout(() => {
                setExamTime(examTime - 1);
                setProgress(((90 * 60 - examTime) / (90 * 60)) * 100);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [examTime, setExamTime]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="timer">{formatTime(examTime)}</div>
        </>
    );
};
export default Timer;