import React from 'react'

const ResultsSection = ({ results }) => {
    const getPerformanceMessage = (percentage) => {
        if (percentage >= 80) return "Outstanding! Excellent work! 🎉"
        if (percentage >= 70) return "Very good! Keep it up! 👍"
        if (percentage >= 60) return "Good work! You're doing well. 😊"
        if (percentage >= 50) return "Satisfactory. Keep practicing. 📚"
        if (percentage >= 40) return "Needs improvement. Review the material. 🔍"
        return "Needs more work. Don't give up! 💪"
    }

    return (
        <div className="results-section">
            <h2>Your Results {results.autoSubmitted && "(Auto-submitted)"}</h2>
            {results.autoSubmitted && (
                <div className="auto-submit-notice">
                    ⏰ This paper was automatically submitted when the time expired.
                </div>
            )}
            <div className="score">
                {results.obtainedMarks} / {results.totalMarks}
            </div>
            <div className="score-percentage">
                {results.percentage}%
            </div>
            <div className="performance-message">
                {getPerformanceMessage(results.percentage)}
            </div>
            <p>Click "View Solution" on each question to see the correct answers and explanations.</p>
        </div>
    )
}

export default ResultsSection