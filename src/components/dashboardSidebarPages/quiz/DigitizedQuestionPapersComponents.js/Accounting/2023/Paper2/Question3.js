
import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: BUDGETING <span className="marks-indicator">40 marks</span></h2>

            <div className="question-number">3.1</div>
            <p>Identify items incorrectly recorded in the Cash Budget and items not included in the Projected Statement of Comprehensive Income.</p>

            <div className="question-number">3.1.1</div>
            <p>Items incorrectly recorded in the Cash Budget:</p>
            <table>
                <tbody>
                <tr>
                    <td>(a) First item:</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-a1'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-a1', e.target.value)}
                            placeholder="Enter item name"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(b) Second item:</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-a2'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-a2', e.target.value)}
                            placeholder="Enter item name"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.1.2</div>
            <p>Items NOT included in the Projected Statement of Comprehensive Income:</p>
            <table>
                <tbody>
                <tr>
                    <td>(a) First item:</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-b1'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-b1', e.target.value)}
                            placeholder="Enter item name"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(b) Second item:</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-b2'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-b2', e.target.value)}
                            placeholder="Enter item name"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.2</div>
            <p>Complete Debtors' Collection for December 2023.</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q3-2-workings'] || ''}
                            onChange={(e) => onAnswerChange('q3-2-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Total Cash from debtors (R):</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-2-debtors-ans'] || ''}
                            onChange={(e) => onAnswerChange('q3-2-debtors-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.3</div>
            <p>Calculate missing amounts (i) to (iv):</p>
            <table>
                <tbody>
                <tr>
                    <td>(i) Discount allowed (October):</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-3-i-ans'] || ''}
                            onChange={(e) => onAnswerChange('q3-3-i-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(ii) Interest on savings (December):</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-3-ii-ans'] || ''}
                            onChange={(e) => onAnswerChange('q3-3-ii-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(iii) Payments to creditors (December):</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-3-iii-ans'] || ''}
                            onChange={(e) => onAnswerChange('q3-3-iii-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(iv) Rent expense (November):</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-3-iv-ans'] || ''}
                            onChange={(e) => onAnswerChange('q3-3-iv-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.4.1</div>
            <p>Explain the changes to salespeople commission and why salespeople regretted it.</p>
            <textarea
                className="answer-input"
                value={answers['q3-4-1-c'] || ''}
                onChange={(e) => onAnswerChange('q3-4-1-c', e.target.value)}
                placeholder="Your explanation..."
            />

            <div className="question-number">3.4.2</div>
            <p>Calculate the net effect on monthly cash flows and give ONE reason for the property purchase.</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings for net effect:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q3-4-2-workings'] || ''}
                            onChange={(e) => onAnswerChange('q3-4-2-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Net effect (R):</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-4-2-a-ans'] || ''}
                            onChange={(e) => onAnswerChange('q3-4-2-a-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <p><strong>Reason for property purchase:</strong></p>
            <textarea
                className="answer-input"
                value={answers['q3-4-2-b'] || ''}
                onChange={(e) => onAnswerChange('q3-4-2-b', e.target.value)}
                placeholder="Your reason..."
            />
        </div>
    );
};

export default Question3;
