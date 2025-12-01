import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: CASH FLOW STATEMENT AND FINANCIAL INDICATORS <span className="marks-indicator">35 marks</span></h2>
            <p>The information relates to Sherbiz Ltd for the financial year ended 28 February 2023.</p>

            <div className="info-box">
                <h4>INFORMATION A: Share capital and dividends:</h4>
                <ul>
                    <li>1 March 2022: 1 200 000 shares in issue</li>
                    <li>30 June 2022: 300 000 additional shares issued</li>
                    <li>1 December 2022: 90 000 shares repurchased at R0,80 above average share price</li>
                </ul>

                <h4>INFORMATION B: Statement of Financial Position extracts:</h4>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>28 Feb 2023</th>
                        <th>28 Feb 2022</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ordinary shareholders' equity</td>
                        <td>R10 200 000</td>
                        <td>R7 985 500</td>
                    </tr>
                    <tr>
                        <td>Ordinary share capital</td>
                        <td>R9 306 000</td>
                        <td>R7 200 000</td>
                    </tr>
                    <tr>
                        <td>SARS: Income tax</td>
                        <td>R27 800 (Cr)</td>
                        <td>R42 500 (Dr)</td>
                    </tr>
                    <tr>
                        <td>Shareholders for dividends</td>
                        <td>R282 000</td>
                        <td>?</td>
                    </tr>
                    </tbody>
                </table>

                <h4>INFORMATION C: Loan Statement:</h4>
                <ul>
                    <li>Balance 28 Feb 2023: R1 678 600</li>
                    <li>Interest capitalised: R117 600</li>
                    <li>Monthly payments including interest: R22 750</li>
                </ul>

                <h4>INFORMATION D: Net profit and tax:</h4>
                <ul>
                    <li>Net profit after tax: R912 500</li>
                    <li>Income tax rate: 27%</li>
                </ul>

                <h4>INFORMATION E: Dividends and EPS:</h4>
                <table>
                    <tbody>
                    <tr>
                        <td>Final dividends per share (28 Feb 2022)</td>
                        <td>24,0 cents</td>
                    </tr>
                    <tr>
                        <td>Interim dividends per share (31 Aug 2022)</td>
                        <td>30,0 cents</td>
                    </tr>
                    <tr>
                        <td>Final dividends per share (28 Feb 2023)</td>
                        <td>?</td>
                    </tr>
                    <tr>
                        <td>Earnings per share (28 Feb 2023)</td>
                        <td>66,2 cents</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">2.1</div>
            <p>Prepare the Ordinary Share Capital Note. (7 marks)</p>
            <textarea
                className="answer-input"
                id="q2-1-answer"
                value={answers['q2-1-answer'] || ''}
                onChange={(e) => onAnswerChange('q2-1-answer', e.target.value)}
                placeholder="Prepare the Ordinary Share Capital Note here..."
            />

            <div className="question-number">2.2</div>
            <p>Complete the following sections of the Cash Flow Statement: (16 marks)</p>

            <div className="financial-statement">
                <h4>CASH FLOW STATEMENT EXTRACTS</h4>
                <table className="statement-table">
                    <tbody>
                    <tr>
                        <td colSpan="2"><strong>CASH FLOW FROM OPERATING ACTIVITIES</strong></td>
                    </tr>
                    <tr>
                        <td>Cash generated from operations</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-cash-from-ops"
                            value={answers['q2-2-cash-from-ops'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-cash-from-ops', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Interest paid</td>
                        <td><input type="text" className="answer-input" id="q2-2-interest-paid" placeholder="R" value="(117 600)" readOnly /></td>
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
                        <td className="line-item">Income tax paid</td>
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
                        <td colSpan="2"><strong>CASH FLOW FROM FINANCING ACTIVITIES</strong></td>
                    </tr>
                    <tr>
                        <td>Proceeds from shares issued</td>
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
                        <td className="line-item">Funds used to repurchase shares</td>
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
                        <td className="line-item">Change in loan</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q2-2-loan-change"
                            value={answers['q2-2-loan-change'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-loan-change', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">2.3</div>
            <p>Calculate the following financial indicators: (12 marks)</p>

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
                    <td>Net asset value per share</td>
                    <td><textarea
                        className="answer-input"
                        id="q2-3-nav-workings"
                        value={answers['q2-3-nav-workings'] || ''}
                        onChange={(e) => onAnswerChange('q2-3-nav-workings', e.target.value)}
                        placeholder="Show workings"
                    /></td>
                    <td><input
                        type="text"
                        className="answer-input"
                        id="q2-3-nav-answer"
                        value={answers['q2-3-nav-answer'] || ''}
                        onChange={(e) => onAnswerChange('q2-3-nav-answer', e.target.value)}
                        placeholder="cents"
                    /></td>
                </tr>
                <tr>
                    <td>Dividend payout rate</td>
                    <td><textarea
                        className="answer-input"
                        id="q2-3-dpr-workings"
                        value={answers['q2-3-dpr-workings'] || ''}
                        onChange={(e) => onAnswerChange('q2-3-dpr-workings', e.target.value)}
                        placeholder="Show workings"
                    /></td>
                    <td><input
                        type="text"
                        className="answer-input"
                        id="q2-3-dpr-answer"
                        value={answers['q2-3-dpr-answer'] || ''}
                        onChange={(e) => onAnswerChange('q2-3-dpr-answer', e.target.value)}
                        placeholder="%"
                    /></td>
                </tr>
                <tr>
                    <td>Return on average shareholders' equity</td>
                    <td><textarea
                        className="answer-input"
                        id="q2-3-rose-workings"
                        value={answers['q2-3-rose-workings'] || ''}
                        onChange={(e) => onAnswerChange('q2-3-rose-workings', e.target.value)}
                        placeholder="Show workings"
                    /></td>
                    <td><input
                        type="text"
                        className="answer-input"
                        id="q2-3-rose-answer"
                        value={answers['q2-3-rose-answer'] || ''}
                        onChange={(e) => onAnswerChange('q2-3-rose-answer', e.target.value)}
                        placeholder="%"
                    /></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Question2;
