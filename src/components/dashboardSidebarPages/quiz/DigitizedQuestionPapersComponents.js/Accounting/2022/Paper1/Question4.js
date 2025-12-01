import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: CORPORATE GOVERNANCE <span className="marks-indicator">15 marks</span></h2>

            <div className="question-number">4.1</div>
            <p>Briefly explain the following concepts:</p>

            <table>
                <thead>
                <tr>
                    <th>Concept</th>
                    <th>Explanation</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>4.1.1 Sustainability</td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q4-1-1'] || ''}
                  onChange={(e) => onAnswerChange('q4-1-1', e.target.value)}
                  placeholder="Enter explanation"
              />
                    </td>
                </tr>
                <tr>
                    <td>4.1.2 Triple bottom line</td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q4-1-2'] || ''}
                  onChange={(e) => onAnswerChange('q4-1-2', e.target.value)}
                  placeholder="Enter explanation"
              />
                    </td>
                </tr>
                <tr>
                    <td>4.1.3 King Code</td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q4-1-3'] || ''}
                  onChange={(e) => onAnswerChange('q4-1-3', e.target.value)}
                  placeholder="Enter explanation"
              />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">4.2</div>
            <p>Discuss THREE responsibilities of the board of directors in ensuring good corporate governance. (9)</p>
            <textarea
                className="answer-input"
                value={answers['q4-2'] || ''}
                onChange={(e) => onAnswerChange('q4-2', e.target.value)}
                placeholder="Enter your answer"
            />
        </div>
    );
};

export default Question4;
