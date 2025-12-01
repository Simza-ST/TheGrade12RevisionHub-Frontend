import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: CASH FLOW STATEMENT AND FINANCIAL INDICATORS <span className="marks-indicator">35 marks</span></h2>

            <div className="question-number">2.1</div>
            <p>Choose the correct word from those given in brackets. Write only the word next to the question numbers (2.1.1 to 2.1.3) in the ANSWER BOOK.</p>

            <table className="two-column-table">
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>2.1.1 (Solvency/Liquidity) is the ability of the business to pay off all debts using existing assets.</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-1'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-1', e.target.value)}
                            placeholder="Answer"
                        />
                    </td>
                </tr>
                <tr>
                    <td>2.1.2 Effective control of income and expenses is a reflection of the (risk/profitability).</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-2'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-2', e.target.value)}
                            placeholder="Answer"
                        />
                    </td>
                </tr>
                <tr>
                    <td>2.1.3 The use of loans to finance a company is known as (returns/gearing).</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-3'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-3', e.target.value)}
                            placeholder="Answer"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.2 EAGLE LTD</div>
            <p>The information relates to the financial year ended 28 February 2022. The business is registered with an authorised share capital of 1 800 000 shares.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Extract: Statement of Comprehensive Income on 28 February 2022:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Sales</td>
                        <td>11 232 000</td>
                    </tr>
                    <tr>
                        <td>Depreciation</td>
                        <td>428 300</td>
                    </tr>
                    <tr>
                        <td>Interest on loan</td>
                        <td>382 000</td>
                    </tr>
                    <tr>
                        <td>Net profit before tax</td>
                        <td>1 297 700</td>
                    </tr>
                    <tr>
                        <td>Income tax</td>
                        <td>389 310</td>
                    </tr>
                    <tr>
                        <td>Net profit after tax</td>
                        <td>908 390</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>B. Extract: Statement of Financial Position on 28 February:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>Item</th>
                        <th>2022 (R)</th>
                        <th>2021 (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ordinary share capital</td>
                        <td>4 500 000</td>
                        <td>4 000 000</td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>1 800 000</td>
                        <td>1 400 000</td>
                    </tr>
                    <tr>
                        <td>Loan: FNB</td>
                        <td>2 400 000</td>
                        <td>2 800 000</td>
                    </tr>
                    <tr>
                        <td>Fixed assets (at carrying value)</td>
                        <td>5 600 000</td>
                        <td>4 800 000</td>
                    </tr>
                    <tr>
                        <td>Current assets</td>
                        <td>3 200 000</td>
                        <td>2 900 000</td>
                    </tr>
                    <tr>
                        <td>Current liabilities</td>
                        <td>1 900 000</td>
                        <td>1 500 000</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>C. Additional information:</strong></p>
                <ul className="transaction-list">
                    <li>Fixed assets were purchased for R1 200 000 cash during the year.</li>
                    <li>No fixed assets were sold during the year.</li>
                    <li>An interim dividend of R350 000 was paid during the year.</li>
                    <li>A final dividend of R450 000 was declared on 28 February 2022.</li>
                    <li>500 000 ordinary shares were issued at R1.50 each during the year.</li>
                </ul>
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">2.2.1</div>
            <p>Calculate the following financial indicators for the year ended 28 February 2022:</p>

            <table>
                <thead>
                <tr>
                    <th>Financial Indicator</th>
                    <th>Workings</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Return on equity (ROE)</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-1-roe-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-roe-workings', e.target.value)}
                            placeholder="Workings"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-1-roe-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-roe-answer', e.target.value)}
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
                            value={answers['q2-2-1-de-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-de-workings', e.target.value)}
                            placeholder="Workings"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-1-de-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-de-answer', e.target.value)}
                            placeholder=":1"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Net asset value per share (NAV)</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-1-nav-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-nav-workings', e.target.value)}
                            placeholder="Workings"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-1-nav-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-nav-answer', e.target.value)}
                            placeholder="cents"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.2.2</div>
            <p>Prepare the Cash Flow Statement for the year ended 28 February 2022. (20)</p>

            <table>
                <thead>
                <tr>
                    <th>CASH FLOW STATEMENT FOR THE YEAR ENDED 28 FEBRUARY 2022</th>
                    <th>Amount (R)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><strong>CASH FLOW FROM OPERATING ACTIVITIES</strong></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Cash generated from operations</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-cfo'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-cfo', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Interest paid</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-interest'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-interest', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Dividends paid</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-dividends'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-dividends', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Income tax paid</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-tax'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-tax', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Cash flow from operating activities</strong></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-cfo-total'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-cfo-total', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>CASH FLOW FROM INVESTING ACTIVITIES</strong></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Purchase of fixed assets</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-investing'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-investing', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Cash flow from investing activities</strong></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-investing-total'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-investing-total', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>CASH FLOW FROM FINANCING ACTIVITIES</strong></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Proceeds from issue of shares</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-shares'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-shares', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Repayment of loan</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-loan'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-loan', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Cash flow from financing activities</strong></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-financing-total'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-financing-total', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Net change in cash and cash equivalents</strong></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-net-change'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-net-change', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td>Cash and cash equivalents at beginning of year</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-beginning'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-beginning', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Cash and cash equivalents at end of year</strong></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-2-end'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-2-end', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Question2;
