
import React from 'react';

const Results = ({ results, onRetake }) => {
    return (
        <div className="results-card">
            <h2>Exam Results</h2>
            <div className="marks-display">
                <h3>Your total score: {results.totalScore} / 150</h3>
                <p>Percentage: {results.percentage}%</p>
                <div className="grade">
                    {results.totalScore >= 120 ? 'A - Outstanding!' :
                        results.totalScore >= 105 ? 'B - Good!' :
                            results.totalScore >= 90 ? 'C - Satisfactory' :
                                results.totalScore >= 75 ? 'D - Adequate' : 'E - Needs Improvement'}
                </div>
            </div>

            <div
                className="breakdown"
                dangerouslySetInnerHTML={{ __html: results.breakdown }}
            />

            <button type="button" className="retake-btn" onClick={onRetake}>
                Retake Exam
            </button>
        </div>
    );
};

export default Results;

