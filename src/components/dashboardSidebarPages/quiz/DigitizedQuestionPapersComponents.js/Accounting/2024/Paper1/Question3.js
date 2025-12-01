
import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: INTERPRETATION OF FINANCIAL INFORMATION <span className="marks-indicator">45 marks</span></h2>

            <p>The information relates to two companies, Kasi Ltd and Suburb Ltd, for the financial year ended 29 February 2024.</p>

            <div className="question-number">3.1</div>
            <p>Calculate the following financial indicators for both companies for the year ended 29 February 2024:</p>

            <div className="question-number">3.1.1</div>
            <p>Net asset value per share</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q3-1-1-workings"
                            value={answers['q3-1-1-workings'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q3-1-1-answer"
                            value={answers['q3-1-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.1.2</div>
            <p>Earnings per share</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q3-1-2-workings"
                            value={answers['q3-1-2-workings'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-2-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q3-1-2-answer"
                            value={answers['q3-1-2-answer'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-2-answer', e.target.value)}
                            placeholder="cents"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.1.3</div>
            <p>Dividend per share</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q3-1-3-workings"
                            value={answers['q3-1-3-workings'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-3-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q3-1-3-answer"
                            value={answers['q3-1-3-answer'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-3-answer', e.target.value)}
                            placeholder="cents"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.1.4</div>
            <p>Debt-equity ratio</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q3-1-4-workings"
                            value={answers['q3-1-4-workings'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-4-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q3-1-4-answer"
                            value={answers['q3-1-4-answer'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-4-answer', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.2</div>
            <p>Comment on the liquidity position of both companies. Quote TWO financial indicators with figures.</p>
            <textarea
                className="answer-input"
                id="q3-2-answer"
                value={answers['q3-2-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-2-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">3.3</div>
            <p>Explain which company has a better return for shareholders. Provide TWO points with figures.</p>
            <textarea
                className="answer-input"
                id="q3-3-answer"
                value={answers['q3-3-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-3-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">3.4</div>
            <p>Advise the management of Kasi Ltd on TWO strategies to improve their financial performance.</p>
            <textarea
                className="answer-input"
                id="q3-4-answer"
                value={answers['q3-4-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-4-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>Extract from the financial statements of Kasi Ltd and Suburb Ltd for the year ended 29 February 2024:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>KASI LTD</th>
                        <th>SUBURB LTD</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ordinary share capital (R2 each)</td>
                        <td>R4 000 000</td>
                        <td>R6 000 000</td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>R1 200 000</td>
                        <td>R2 500 000</td>
                    </tr>
                    <tr>
                        <td>Long-term loans</td>
                        <td>R2 500 000</td>
                        <td>R1 800 000</td>
                    </tr>
                    <tr>
                        <td>Net profit after tax</td>
                        <td>R800 000</td>
                        <td>R1 500 000</td>
                    </tr>
                    <tr>
                        <td>Ordinary share dividends</td>
                        <td>R400 000</td>
                        <td>R750 000</td>
                    </tr>
                    <tr>
                        <td>Current assets</td>
                        <td>R3 000 000</td>
                        <td>R4 500 000</td>
                    </tr>
                    <tr>
                        <td>Current liabilities</td>
                        <td>R2 200 000</td>
                        <td>R2 800 000</td>
                    </tr>
                    <tr>
                        <td>Inventories</td>
                        <td>R1 500 000</td>
                        <td>R2 000 000</td>
                    </tr>
                    <tr>
                        <td>Market price per share</td>
                        <td>R3.50</td>
                        <td>R5.00</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Question3;
