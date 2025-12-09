
import React from 'react';

const Results = ({ score, answers, correctAnswers, questionWeights }) => {
    const renderQuestionResult = (questionId) => {
        const userAnswer = answers[questionId] || '';
        const correctAnswer = correctAnswers[questionId];
        const isCorrect = userAnswer.toLowerCase().includes(correctAnswer.toString().toLowerCase());

        return (
            <div key={questionId} className={isCorrect ? 'correct' : 'incorrect'}>
                <p><strong>{questionId}:</strong> {isCorrect ? 'Correct' : 'Incorrect'}</p>
                <p>Your answer: "{userAnswer}"</p>
                <p>Correct answer: "{correctAnswer}"</p>
                {isCorrect && <p>+{questionWeights[questionId]} marks</p>}
            </div>
        );
    };

    return (
        <div className="results" id="results">
            <div className="score" id="score">
                Your Score: {score.achieved}/{score.total} ({score.percentage}%)
            </div>
            <div id="detailed-results">
                {Object.keys(correctAnswers).map(questionId =>
                    answers[questionId] && renderQuestionResult(questionId)
                )}
            </div>
        </div>
    );
};

export default Results;

