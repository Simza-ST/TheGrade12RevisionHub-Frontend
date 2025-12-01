import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: SHARE CAPITAL, FINANCIAL INDICATORS AND CASH FLOW STATEMENT <span className="marks-indicator">35 marks</span></h2>
            <p>The information relates to Brewer Ltd for the financial year ended 28 February 2021.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Shares and dividends:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>DATE</th>
                        <th>DETAILS OF SHARES</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1 March 2020</td>
                        <td>800 000 in issue</td>
                    </tr>
                    <tr>
                        <td>30 June 2020</td>
                        <td>100 000 new shares issued</td>
                    </tr>
                    <tr>
                        <td>1 January 2021</td>
                        <td>30 000 shares repurchased at R1,20 more than the average share price</td>
                    </tr>
                    <tr>
                        <td>28 February 2021</td>
                        <td>? shares in issue</td>
                    </tr>
                    </tbody>
                </table>
                <ul className="transaction-list">
                    <li>Interim dividend of R162 000 was paid on 30 September 2020.</li>
                    <li>A final dividend of 22 cents per share was declared on 28 February 2021.</li>
                </ul>

                <p><strong>B. Extract from the Statement of Comprehensive Income (Income Statement) for the year ended 28 February 2021:</strong></p>
                <table>
                    <tbody>
                    <tr>
                        <td>Sales</td>
                        <td>R7 293 000</td>
                    </tr>
                    <tr>
                        <td>Cost of sales</td>
                        <td>4 862 000</td>
                    </tr>
                    <tr>
                        <td>Operating expenses</td>
                        <td>1 458 600</td>
                    </tr>
                    <tr>
                        <td>Net profit before tax</td>
                        <td>1 350 000</td>
                    </tr>
                    <tr>
                        <td>Net profit after tax</td>
                        <td>985 500</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>C. Extract from the Statement of Financial Position (Balance Sheet) on:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>28 Feb. 2021 R</th>
                        <th>29 Feb. 2020 R</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Petty cash and cash float</td>
                        <td>?</td>
                        <td>20 000</td>
                    </tr>
                    <tr>
                        <td>Ordinary shareholders' equity</td>
                        <td>8 038 100</td>
                        <td>6 450 000</td>
                    </tr>
                    <tr>
                        <td>Ordinary share capital</td>
                        <td>7 395 000</td>
                        <td>6 400 000</td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>643 100</td>
                        <td>50 000</td>
                    </tr>
                    <tr>
                        <td>Loan: Sharks Bank</td>
                        <td>1 650 000</td>
                        <td>2 200 000</td>
                    </tr>
                    <tr>
                        <td>SARS: Income tax</td>
                        <td>29 100 Dr</td>
                        <td>35 900 Cr</td>
                    </tr>
                    <tr>
                        <td>Shareholders for dividends</td>
                        <td>191 400</td>
                        <td>115 300</td>
                    </tr>
                    <tr>
                        <td>Bank overdraft</td>
                        <td>0</td>
                        <td>95 200</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">2.1</div>
            <p>Prepare the Ordinary Share Capital Note on 28 February 2021. (6)</p>

            <table>
                <tbody>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-shares-beginning'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-shares-beginning', e.target.value)}
                            placeholder="Number of shares"
                        />
                    </td>
                    <td>Ordinary shares at the beginning</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-value-beginning'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-value-beginning', e.target.value)}
                            placeholder="Value"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-shares-issued'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-shares-issued', e.target.value)}
                            placeholder="Number of shares"
                        />
                    </td>
                    <td>New shares issued</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-value-issued'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-value-issued', e.target.value)}
                            placeholder="Value"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-shares-repurchased'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-shares-repurchased', e.target.value)}
                            placeholder="Number of shares"
                        />
                    </td>
                    <td>Repurchased shares at
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-price'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-price', e.target.value)}
                            placeholder="Price per share"
                            style={{width: '100px', marginLeft: '10px'}}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-value-repurchased'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-value-repurchased', e.target.value)}
                            placeholder="Value"
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-shares-end'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-shares-end', e.target.value)}
                            placeholder="Number of shares"
                        />
                    </td>
                    <td>Shares at the end of the year</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-value-end'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-value-end', e.target.value)}
                            placeholder="Value"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.2</div>
            <p>Calculate the following financial indicators on 28 February 2021:</p>
            <ul>
                <li>% operating expenses on sales (2)</li>
                <li>Dividend per share (4)</li>
                <li>% return on average shareholders' equity (5)</li>
            </ul>

            <h4>% operating expenses on sales</h4>
            <table>
                <thead>
                <tr>
                    <th>WORKINGS</th>
                    <th>ANSWER</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q2-2a-workings'] || ''}
                  onChange={(e) => onAnswerChange('q2-2a-workings', e.target.value)}
                  placeholder="Enter your workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2a-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-2a-answer', e.target.value)}
                            placeholder="Enter your answer"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <h4>Dividend per share</h4>
            <table>
                <thead>
                <tr>
                    <th>WORKINGS</th>
                    <th>ANSWER</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q2-2b-workings'] || ''}
                  onChange={(e) => onAnswerChange('q2-2b-workings', e.target.value)}
                  placeholder="Enter your workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2b-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-2b-answer', e.target.value)}
                            placeholder="Enter your answer"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <h4>% return on average shareholders' equity</h4>
            <table>
                <thead>
                <tr>
                    <th>WORKINGS</th>
                    <th>ANSWER</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q2-2c-workings'] || ''}
                  onChange={(e) => onAnswerChange('q2-2c-workings', e.target.value)}
                  placeholder="Enter your workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2c-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-2c-answer', e.target.value)}
                            placeholder="Enter your answer"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.3</div>
            <p>Complete the Cash Flow Statement for the year ended 28 February 2021. Certain figures are provided in the ANSWER BOOK. (18)</p>

            <p><em>Note: This would typically involve completing a cash flow statement template with various inputs.</em></p>
        </div>
    );
};

export default Question2;
