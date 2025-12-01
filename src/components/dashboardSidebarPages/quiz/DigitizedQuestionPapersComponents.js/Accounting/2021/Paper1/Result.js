import React from 'react';

const Result = ({ score }) => {
    const percentage = ((score / 150) * 100).toFixed(1);

    return (
        <div className="result">
            <h2>Exam Results</h2>
            <p><strong>Your total score: {score} / 150</strong></p>
            <p><strong>Percentage: {percentage}%</strong></p>

            <div className="performance-feedback">
                <h3>Performance Feedback:</h3>
                {percentage >= 80 ? (
                    <p className="excellent">🎉 Excellent work! You have a strong understanding of the material.</p>
                ) : percentage >= 60 ? (
                    <p className="good">👍 Good job! You have a solid understanding but there's room for improvement.</p>
                ) : percentage >= 50 ? (
                    <p className="average">✅ You've passed, but consider reviewing the areas where you lost marks.</p>
                ) : (
                    <p className="needs-improvement">📚 You need to review the material and practice more.</p>
                )}
            </div>
        </div>
    );
};

export default Result;

