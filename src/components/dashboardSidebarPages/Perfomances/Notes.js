import React from 'react';
import './PerformanceCSS.css';

const Notes = () => {
    return (
        <div>
            <h2>Notes</h2>
            <ul>
                <li><strong>Status Criteria</strong>: Passed (≥70%), Needs Improvement (50–69%), Failed (50%).</li>
                <li><strong>Time Spent</strong>: Recorded in minutes, reflecting the duration taken to complete the activity.</li>
                <li><strong>Difficulty Level</strong>: Categorized as Easy, Medium, or Hard based on activity complexity.</li>
                <li>
                    <strong>Implementation</strong>: Static React component. For dynamic data, integrate with a backend (e.g., Node.js, SQLite).
                </li>
                <li><strong>Dark Mode</strong>: Applied with CSS for a modern, eye-friendly interface.</li>
            </ul>
        </div>
    );
};

export default Notes;