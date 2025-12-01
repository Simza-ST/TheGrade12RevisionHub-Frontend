import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: CASH FLOW STATEMENT AND FINANCIAL INDICATORS <span className="marks-indicator">35 marks</span></h2>

            <p>The information relates to Eybers Ltd for the financial year ended 29 February 2024.</p>

            <div className="question-number">2.1</div>
            <p>Prepare the Retained Income Note for the year ended 29 February 2024.</p>

            <div className="financial-statement">
                <h4>RETAINED INCOME NOTE FOR THE YEAR ENDED 29 FEBRUARY 2024</h4>
                <table className="statement-table">
                    <tbody>
                    <tr>
                        <td>Balance at the beginning of the year</td>
                        <td><input type="text" className="answer-input" id="q2-1-beginning" placeholder="R" value="573 720" readOnly /></td>
                    </tr>
                    <tr>
                        <td>Net profit after tax</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-1-npat"
                            value={answers['q2-1-npat'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-npat', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td>Repurchase of shares</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-1-repurchase"
                            value={answers['q2-1-repurchase'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-repurchase', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td>Ordinary share dividends</td>
                        <td><input type="text" className="answer-input" id="q2-1-dividends" placeholder="R" value="(744 860)" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Interim dividend</td>
                        <td><input type="text" className="answer-input" id="q2-1-interim" placeholder="R" value="416 000" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Final dividend</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-1-final"
                            value={answers['q2-1-final'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-final', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="total"><strong>Balance at the end of the year</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-1-ending"
                            value={answers['q2-1-ending'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-ending', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">2.2</div>
            <p>Complete the Cash Flow Statement for the year ended 29 February 2024.</p>

            <div className="financial-statement">
                <h4>CASH FLOW STATEMENT FOR THE YEAR ENDED 29 FEBRUARY 2024</h4>
                <table className="statement-table">
                    <tbody>
                    <tr>
                        <td><strong>CASH FLOW FROM OPERATING ACTIVITIES</strong></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">Cash generated from operations</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-cfo"
                            value={answers['q2-2-cfo'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-cfo', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Interest paid</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-interest-paid"
                            value={answers['q2-2-interest-paid'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-interest-paid', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Taxation paid</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-tax-paid"
                            value={answers['q2-2-tax-paid'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-tax-paid', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Dividends paid</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-dividends-paid"
                            value={answers['q2-2-dividends-paid'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-dividends-paid', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>CASH FLOW FROM INVESTING ACTIVITIES</strong></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">Purchase of fixed assets</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-fixed-assets"
                            value={answers['q2-2-fixed-assets'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-fixed-assets', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>CASH FLOW FROM FINANCING ACTIVITIES</strong></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">New shares issued</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-shares-issued"
                            value={answers['q2-2-shares-issued'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-shares-issued', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Shares repurchased</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-shares-repurchased"
                            value={answers['q2-2-shares-repurchased'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-shares-repurchased', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Loan repaid</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-loan-repaid"
                            value={answers['q2-2-loan-repaid'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-loan-repaid', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="total"><strong>NET CHANGE IN CASH AND CASH EQUIVALENTS</strong></td>
                        <td><input type="text" className="answer-input" id="q2-2-net-change" placeholder="R" value="296 460" readOnly /></td>
                    </tr>
                    <tr>
                        <td>Cash and cash equivalents at the beginning of the year</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-cash-beginning"
                            value={answers['q2-2-cash-beginning'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-cash-beginning', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="total"><strong>Cash and cash equivalents at the end of the year</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-cash-ending"
                            value={answers['q2-2-cash-ending'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-cash-ending', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">2.3</div>
            <p>Calculate the following financial indicators for the year ended 29 February 2024:</p>

            <div className="question-number">2.3.1</div>
            <p>% operating expenses on sales</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q2-3-1-workings"
                            value={answers['q2-3-1-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-3-1-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q2-3-1-answer"
                            value={answers['q2-3-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-3-1-answer', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.3.2</div>
            <p>Acid-test ratio</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q2-3-2-workings"
                            value={answers['q2-3-2-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-3-2-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q2-3-2-answer"
                            value={answers['q2-3-2-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-3-2-answer', e.target.value)}
                            placeholder=":1"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.3.3</div>
            <p>Debt-equity ratio</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q2-3-3-workings"
                            value={answers['q2-3-3-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-3-3-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q2-3-3-answer"
                            value={answers['q2-3-3-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-3-3-answer', e.target.value)}
                            placeholder="%"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Extract from the Statement of Comprehensive Income for the year ended 29 February 2024:</strong></p>
                <table>
                    <tbody>
                    <tr>
                        <td>Sales</td>
                        <td>R12 500 000</td>
                    </tr>
                    <tr>
                        <td>Cost of sales</td>
                        <td>(7 500 000)</td>
                    </tr>
                    <tr>
                        <td>Gross profit</td>
                        <td>5 000 000</td>
                    </tr>
                    <tr>
                        <td>Operating expenses</td>
                        <td>(3 200 000)</td>
                    </tr>
                    <tr>
                        <td>Operating profit</td>
                        <td>1 800 000</td>
                    </tr>
                    <tr>
                        <td>Interest income</td>
                        <td>50 000</td>
                    </tr>
                    <tr>
                        <td>Profit before interest expense</td>
                        <td>1 850 000</td>
                    </tr>
                    <tr>
                        <td>Interest expense</td>
                        <td>(200 000)</td>
                    </tr>
                    <tr>
                        <td>Net profit before tax</td>
                        <td>1 650 000</td>
                    </tr>
                    <tr>
                        <td>Income tax</td>
                        <td>(462 000)</td>
                    </tr>
                    <tr>
                        <td>Net profit after tax</td>
                        <td>1 188 000</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>B. Extract from the Statement of Financial Position on 29 February 2024:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>ASSETS</th>
                        <th>2024</th>
                        <th>2023</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Non-current assets</td>
                        <td>4 200 000</td>
                        <td>3 800 000</td>
                    </tr>
                    <tr>
                        <td>Current assets</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">Inventories</td>
                        <td>1 500 000</td>
                        <td>1 200 000</td>
                    </tr>
                    <tr>
                        <td className="line-item">Trade and other receivables</td>
                        <td>1 800 000</td>
                        <td>1 500 000</td>
                    </tr>
                    <tr>
                        <td className="line-item">Cash and cash equivalents</td>
                        <td>800 000</td>
                        <td>503 540</td>
                    </tr>
                    <tr>
                        <td><strong>TOTAL ASSETS</strong></td>
                        <td><strong>8 300 000</strong></td>
                        <td><strong>7 003 540</strong></td>
                    </tr>
                    <tr>
                        <th>EQUITY AND LIABILITIES</th>
                        <th>2024</th>
                        <th>2023</th>
                    </tr>
                    <tr>
                        <td>Share capital</td>
                        <td>3 500 000</td>
                        <td>3 200 000</td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>1 017 860</td>
                        <td>573 720</td>
                    </tr>
                    <tr>
                        <td>Non-current liabilities</td>
                        <td>2 000 000</td>
                        <td>1 800 000</td>
                    </tr>
                    <tr>
                        <td>Current liabilities</td>
                        <td>1 782 140</td>
                        <td>1 429 820</td>
                    </tr>
                    <tr>
                        <td><strong>TOTAL EQUITY AND LIABILITIES</strong></td>
                        <td><strong>8 300 000</strong></td>
                        <td><strong>7 003 540</strong></td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>C. Additional information:</strong></p>
                <ul>
                    <li>Ordinary share dividends for the year ended 29 February 2024:
                        <ul>
                            <li>Interim dividend: R416 000</li>
                            <li>Final dividend: R328 860</li>
                        </ul>
                    </li>
                    <li>Shares with a total value of R500 000 were issued during the year.</li>
                    <li>Shares with a total value of R200 000 were repurchased during the year.</li>
                    <li>Fixed assets to the value of R800 000 were purchased during the year.</li>
                    <li>A loan of R300 000 was repaid during the year.</li>
                    <li>Depreciation for the year amounted to R400 000.</li>
                    <li>Interest paid during the year amounted to R180 000.</li>
                    <li>Taxation paid during the year amounted to R450 000.</li>
                </ul>
            </div>
        </div>
    );
};

export default Question2;
