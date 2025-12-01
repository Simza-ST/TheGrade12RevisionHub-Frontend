import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: BUDGETING <span className="marks-indicator">35 marks</span></h2>

            <div className="question-number">3.1</div>
            <p>Choose a description from COLUMN B that matches the budget in COLUMN A. Write only the letter (A–D) next to the question numbers (3.1.1 to 3.1.4) in the ANSWER BOOK.</p>

            <table className="two-column-table">
                <thead>
                <tr>
                    <th>COLUMN A</th>
                    <th>COLUMN B</th>
                    <th className="answer-column">ANSWER</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>3.1.1 Sales Budget</td>
                    <td>A Shows expected receipts and payments</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1', e.target.value)}
                            placeholder="A, B, C or D"
                        />
                    </td>
                </tr>
                {/* Repeat for other matching questions */}
                </tbody>
            </table>

            <div className="question-number">3.2</div>
            <p><strong>JAY'S GYM</strong></p>
            <p>The information relates to Jay's Gym for the three months ending 31 December 2021. Jay is the owner and manager.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>
                {/* Add all the information tables for 3.2 */}
            </div>

            <h4>REQUIRED:</h4>
            <p>Prepare the Cash Budget of Jay's Gym for the three months ending 31 December 2021. (20)</p>

            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>October 2021</th>
                    <th>November 2021</th>
                    <th>December 2021</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>RECEIPTS</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Membership fees</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-2-oct-membership'] || ''}
                            onChange={(e) => onAnswerChange('q3-2-oct-membership', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                    {/* Repeat for other months and categories */}
                </tr>
                {/* Continue with all cash budget rows */}
                </tbody>
            </table>

            <div className="question-number">3.3</div>
            <p>Jay is concerned about the cash position of his gym at the end of December 2021. Provide TWO practical suggestions to improve the cash position. (4)</p>
            <p>SUGGESTION 1:
                <textarea
                    className="answer-input"
                    value={answers['q3-3-1'] || ''}
                    onChange={(e) => onAnswerChange('q3-3-1', e.target.value)}
                    placeholder="Enter suggestion"
                />
            </p>
            <p>SUGGESTION 2:
                <textarea
                    className="answer-input"
                    value={answers['q3-3-2'] || ''}
                    onChange={(e) => onAnswerChange('q3-3-2', e.target.value)}
                    placeholder="Enter suggestion"
                />
            </p>
        </div>
    );
};

export default Question3;
