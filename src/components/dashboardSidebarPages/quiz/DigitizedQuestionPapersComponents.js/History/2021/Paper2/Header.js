import React, { useState, useEffect } from 'react';

const Header = ({ onTimeUp, onTimeUpdate, isExamSubmitted }) => {
    const [timeSpent, setTimeSpent] = useState(0);
    const [isWarning, setIsWarning] = useState(false);

    // Exam duration: 3 hours in seconds
    const examDuration = 3 * 60 * 60; // 3 hours

    useEffect(() => {
        if (isExamSubmitted) return;

        const timer = setInterval(() => {
            setTimeSpent(prev => {
                const newTime = prev + 1;

                // Update parent component
                onTimeUpdate(formatTime(newTime));

                // Check if 5 minutes remaining
                if (examDuration - newTime <= 300) { // 5 minutes
                    setIsWarning(true);
                }

                // Check if time is up
                if (newTime >= examDuration) {
                    clearInterval(timer);
                    onTimeUp(formatTime(newTime));
                    return newTime;
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isExamSubmitted, onTimeUp, onTimeUpdate]);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const timeRemaining = examDuration - timeSpent;
    const progressPercentage = (timeSpent / examDuration) * 100;

    return (
        <div className="exam-header">
            <h1 className="exam-title">GRADE 12 HISTORY EXAMINATION</h1>
            <p className="exam-subtitle">Paper 2 - Civil Society Protests 1950s to 1990s</p>

            <div className="timer-section">
                <div className="timer-display">
                    <div className={`timer ${isWarning ? 'timer-warning' : ''}`}>
                        {formatTime(timeSpent)}
                    </div>
                    <div className="time-remaining">
                        Time Remaining: {formatTime(timeRemaining)}
                    </div>
                </div>

                <div className="progress-bar" style={{
                    width: '100%',
                    height: '5px',
                    background: '#34495e',
                    marginTop: '10px',
                    borderRadius: '5px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progressPercentage}%`,
                        height: '100%',
                        background: isWarning ? '#e74c3c' : '#2ecc71',
                        transition: 'width 1s ease, background 0.3s ease'
                    }}></div>
                </div>

                {isWarning && timeRemaining > 0 && (
                    <div className="warning-message" style={{
                        color: '#e74c3c',
                        fontWeight: 'bold',
                        marginTop: '10px',
                        fontSize: '1.1em'
                    }}>
                        ⚠️ Only {Math.ceil(timeRemaining / 60)} minutes remaining!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
