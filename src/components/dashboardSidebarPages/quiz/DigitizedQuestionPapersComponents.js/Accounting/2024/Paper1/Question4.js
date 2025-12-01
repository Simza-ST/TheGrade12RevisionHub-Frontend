
import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: CORPORATE GOVERNANCE <span className="marks-indicator">15 marks</span></h2>

            <div className="question-number">4.1</div>
            <p>Explain the role of the audit committee in a company.</p>
            <textarea
                className="answer-input"
                id="q4-1-answer"
                value={answers['q4-1-answer'] || ''}
                onChange={(e) => onAnswerChange('q4-1-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">4.2</div>
            <p>Discuss TWO responsibilities of the board of directors in ensuring good corporate governance.</p>
            <textarea
                className="answer-input"
                id="q4-2-answer"
                value={answers['q4-2-answer'] || ''}
                onChange={(e) => onAnswerChange('q4-2-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">4.3</div>
            <p>Explain the importance of the King IV Report on Corporate Governance for South African companies.</p>
            <textarea
                className="answer-input"
                id="q4-3-answer"
                value={answers['q4-3-answer'] || ''}
                onChange={(e) => onAnswerChange('q4-3-answer', e.target.value)}
                placeholder="Your answer..."
            />
        </div>
    );
};

export default Question4;

