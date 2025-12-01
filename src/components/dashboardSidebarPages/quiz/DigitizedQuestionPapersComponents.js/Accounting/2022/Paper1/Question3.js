import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: INTERPRETATION OF FINANCIAL STATEMENTS <span className="marks-indicator">40 marks</span></h2>

            <div className="question-number">3.1</div>
            <p>You are provided with information for two companies in the same industry, Puma Ltd and Adidas Ltd, for the year ended 28 February 2022.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Extract: Statement of Comprehensive Income for the year ended 28 February 2022:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Puma Ltd (R)</th>
                        <th>Adidas Ltd (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Sales</td>
                        <td>8 500 000</td>
                        <td>6 800 000</td>
                    </tr>
                    <tr>
                        <td>Cost of sales</td>
                        <td>5 100 000</td>
                        <td>4 080 000</td>
                    </tr>
                    <tr>
                        <td>Operating expenses</td>
                        <td>2 380 000</td>
                        <td>1 904 000</td>
                    </tr>
                    <tr>
                        <td>Operating profit</td>
                        <td>1 020 000</td>
                        <td>816 000</td>
                    </tr>
                    <tr>
                        <td>Interest on loan</td>
                        <td>204 000</td>
                        <td>68 000</td>
                    </tr>
                    <tr>
                        <td>Net profit before tax</td>
                        <td>816 000</td>
                        <td>748 000</td>
                    </tr>
                    <tr>
                        <td>Income tax (30%)</td>
                        <td>244 800</td>
                        <td>224 400</td>
                    </tr>
                    <tr>
                        <td>Net profit after tax</td>
                        <td>571 200</td>
                        <td>523 600</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>B. Extract: Statement of Financial Position on 28 February 2022:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Puma Ltd (R)</th>
                        <th>Adidas Ltd (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ordinary share capital</td>
                        <td>4 000 000</td>
                        <td>3 000 000</td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>1 200 000</td>
                        <td>1 500 000</td>
                    </tr>
                    <tr>
                        <td>Loan</td>
                        <td>2 000 000</td>
                        <td>500 000</td>
                    </tr>
                    <tr>
                        <td>Fixed assets</td>
                        <td>5 500 000</td>
                        <td>3 800 000</td>
                    </tr>
                    <tr>
                        <td>Current assets</td>
                        <td>2 700 000</td>
                        <td>2 200 000</td>
                    </tr>
                    <tr>
                        <td>Current liabilities</td>
                        <td>1 500 000</td>
                        <td>1 000 000</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>C. Additional information:</strong></p>
                <ul className="transaction-list">
                    <li>Puma Ltd has 4 000 000 ordinary shares in issue.</li>
                    <li>Adidas Ltd has 3 000 000 ordinary shares in issue.</li>
                    <li>Puma Ltd paid a total dividend of R285 600 for the year.</li>
                    <li>Adidas Ltd paid a total dividend of R261 800 for the year.</li>
                </ul>
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">3.1.1</div>
            <p>Calculate the following financial indicators for both companies for the year ended 28 February 2022:</p>

            <table>
                <thead>
                <tr>
                    <th>Financial Indicator</th>
                    <th>Puma Ltd</th>
                    <th>Adidas Ltd</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Gross profit percentage</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-puma-gp'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-puma-gp', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-adidas-gp'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-adidas-gp', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Net profit percentage</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-puma-np'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-puma-np', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-adidas-np'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-adidas-np', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Return on equity (ROE)</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-puma-roe'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-puma-roe', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-adidas-roe'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-adidas-roe', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Debt-equity ratio</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-puma-de'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-puma-de', e.target.value)}
                            placeholder=":1"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-adidas-de'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-adidas-de', e.target.value)}
                            placeholder=":1"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Earnings per share (EPS)</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-puma-eps'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-puma-eps', e.target.value)}
                            placeholder="cents"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-adidas-eps'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-adidas-eps', e.target.value)}
                            placeholder="cents"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Dividend per share (DPS)</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-puma-dps'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-puma-dps', e.target.value)}
                            placeholder="cents"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-1-adidas-dps'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-1-adidas-dps', e.target.value)}
                            placeholder="cents"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.1.2</div>
            <p>Comment on the dividend policy of both companies. Quote TWO financial indicators to support your answer. (6)</p>
            <textarea
                className="answer-input"
                value={answers['q3-1-2'] || ''}
                onChange={(e) => onAnswerChange('q3-1-2', e.target.value)}
                placeholder="Enter your answer"
            />

            <div className="question-number">3.1.3</div>
            <p>Identify which company is more highly geared and explain TWO implications of this for the company. (6)</p>
            <textarea
                className="answer-input"
                value={answers['q3-1-3'] || ''}
                onChange={(e) => onAnswerChange('q3-1-3', e.target.value)}
                placeholder="Enter your answer"
            />

            <div className="question-number">3.2</div>
            <p>Explain THREE limitations of financial ratio analysis. (6)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2'] || ''}
                onChange={(e) => onAnswerChange('q3-2', e.target.value)}
                placeholder="Enter your answer"
            />
        </div>
    );
};

export default Question3;
