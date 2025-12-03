
import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: STOCK VALUATION AND FIXED ASSETS <span className="marks-indicator">35 marks</span></h2>

            <div className="question-number">4.1</div>
            <p>Choose the correct concept for each description:</p>
            <table>
                <tbody>
                <tr>
                    <td>4.1.1 Stock system that records COS at sale:</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-1-1-ans'] || ''}
                            onChange={(e) => onAnswerChange('q4-1-1-ans', e.target.value)}
                            placeholder="periodic/perpetual"
                        />
                    </td>
                </tr>
                <tr>
                    <td>4.1.2 Method for low-cost stock purchased regularly:</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-1-2-ans'] || ''}
                            onChange={(e) => onAnswerChange('q4-1-2-ans', e.target.value)}
                            placeholder="FIFO/weighted-average"
                        />
                    </td>
                </tr>
                <tr>
                    <td>4.1.3 Method that values closing stock at most current prices:</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-1-3-ans'] || ''}
                            onChange={(e) => onAnswerChange('q4-1-3-ans', e.target.value)}
                            placeholder="FIFO/weighted-average"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">4.2.1</div>
            <p>Calculate the value of closing stock.</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q4-2-1-workings'] || ''}
                            onChange={(e) => onAnswerChange('q4-2-1-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Total Value (R):</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-2-1-final-ans'] || ''}
                            onChange={(e) => onAnswerChange('q4-2-1-final-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">4.2.2</div>
            <p>Calculate Hawi stockholding period (days).</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q4-2-2-workings'] || ''}
                            onChange={(e) => onAnswerChange('q4-2-2-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Stockholding Period (days):</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-2-2-hawi-ans'] || ''}
                            onChange={(e) => onAnswerChange('q4-2-2-hawi-ans', e.target.value)}
                            placeholder="e.g., 135.5"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">4.2.3</div>
            <p>Explain stockholding concerns comparing Hawi and Yama.</p>
            <textarea
                className="answer-input"
                value={answers['q4-2-3-concern'] || ''}
                onChange={(e) => onAnswerChange('q4-2-3-concern', e.target.value)}
                placeholder="Your explanation..."
            />

            <div className="question-number">4.3.1</div>
            <p>Calculate cost price of vehicles and trade-in value.</p>
            <table>
                <tbody>
                <tr>
                    <td>Cost price of vehicles on 1 March 2022 (R):</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-3-1-cost-ans'] || ''}
                            onChange={(e) => onAnswerChange('q4-3-1-cost-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Trade-in value received on the vehicle disposed (R):</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-3-1-trade-in-ans'] || ''}
                            onChange={(e) => onAnswerChange('q4-3-1-trade-in-ans', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">4.3.2</div>
            <p>Explain depreciation error for computers.</p>
            <textarea
                className="answer-input"
                value={answers['q4-3-2-depr'] || ''}
                onChange={(e) => onAnswerChange('q4-3-2-depr', e.target.value)}
                placeholder="Your explanation..."
            />

            <div className="question-number">4.3.3</div>
            <p>Support the CEO's donation decision with TWO points.</p>
            <textarea
                className="answer-input"
                value={answers['q4-3-3-donation'] || ''}
                onChange={(e) => onAnswerChange('q4-3-3-donation', e.target.value)}
                placeholder="Your points..."
            />
        </div>
    );
};

export default Question4;

