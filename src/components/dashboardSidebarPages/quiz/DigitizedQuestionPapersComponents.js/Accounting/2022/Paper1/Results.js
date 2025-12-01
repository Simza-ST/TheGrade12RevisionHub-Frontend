import React from 'react';
const Results = ({ score, total, answers }) => {
    const percentage = ((score / total) * 100).toFixed(1);

    return (
        <div className="result success">
            <h2>Exam Results</h2>
            <p>Your total score: <span className="total-score">{score}</span> / {total}</p>
            <p>Percentage: <span className="percentage">{percentage}%</span></p>

            <div className="marks-breakdown">
                <h3>Marks Breakdown:</h3>
                <ul>
                    <li>Question 1: --/60</li>
                    <li>Question 2: --/35</li>
                    <li>Question 3: --/40</li>
                    <li>Question 4: --/15</li>
                </ul>
            </div>
        </div>
    );
};

export default Results;
