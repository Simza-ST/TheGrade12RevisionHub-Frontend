import React from 'react';
import './PerformanceCSS.css';

const Notes = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Notes</h2>
            <ul className="text-[var(--text-secondary)]">
                <li><strong>Status Criteria</strong>: Passed (70%), Needs Improvement (50–69%), Failed (50%).</li>
                <li><strong>Time Spent</strong>: Recorded in minutes, reflecting the duration taken to complete the activity.</li>
                <li><strong>Difficulty Level</strong>: Categorized as Easy, Medium, or Hard based on activity complexity.</li>
                <li><strong>Implementation</strong>: Dynamic data fetched from backend API.</li>
                <li><strong>Dark Mode</strong>: Applied with CSS for a modern, eye-friendly interface.</li>
            </ul>
        </div>
    );
};

export default Notes;