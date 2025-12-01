import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: INTERPRETATION OF FINANCIAL INFORMATION <span className="marks-indicator">40 marks</span></h2>

            <div className="question-number">3.1</div>
            <p>Choose a category of indicators from COLUMN B that matches the description in COLUMN A. Write only the letter (A–D) next to the question numbers (3.1.1 to 3.1.4) in the ANSWER BOOK.</p>

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
                    <td>3.1.1 The benefit that shareholders receive for investing in a company</td>
                    <td>A liquidity</td>
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
                <tr>
                    <td>3.1.2 The ability of a business to pay off its short-term debts</td>
                    <td>B gearing</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-2'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-2', e.target.value)}
                            placeholder="A, B, C or D"
                        />
                    </td>
                </tr>
                <tr>
                    <td>3.1.3 The extent to which a company is financed on borrowed capital (loans)</td>
                    <td>C solvency</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-3'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-3', e.target.value)}
                            placeholder="A, B, C or D"
                        />
                    </td>
                </tr>
                <tr>
                    <td>3.1.4 The ability of a business to settle all its debts using existing assets</td>
                    <td>D return on equity</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-1-4'] || ''}
                            onChange={(e) => onAnswerChange('q3-1-4', e.target.value)}
                            placeholder="A, B, C or D"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.2</div>
            <p><strong>FLEXI LTD AND BROOM LTD</strong></p>
            <p>The information relates to two companies.</p>

            <div className="info-box">
                <h4>BACKGROUND INFORMATION:</h4>
                <ul className="transaction-list">
                    <li>Both companies operate in the fashion clothing industry. The financial year ends on the last day of February each year.</li>
                    <li>Bob Yates owns shares in both companies. On 1 November 2020, he convinced the board of directors of Flexi Ltd to repurchase 150 000 of his shares. He used the money received to purchase additional shares in Broom Ltd.</li>
                </ul>

                <div className="note">
                    <p><strong>NOTE:</strong> Where comments or explanations are required, quote financial indicators, figures and trends to support your answer.</p>
                </div>

                <h4>INFORMATION:</h4>

                <p><strong>A. Extracts from the accounting records at the end of each year:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th colspan="2">FLEXI LTD</th>
                        <th colspan="2">BROOM LTD</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Feb. 2021</th>
                        <th>Feb. 2020</th>
                        <th>Feb. 2021</th>
                        <th>Feb. 2020</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Number of shares in issue</td>
                        <td>700 000</td>
                        <td>850 000</td>
                        <td>1 500 000</td>
                        <td>1 100 000</td>
                    </tr>
                    <tr>
                        <td>Funds used to repurchase shares</td>
                        <td>R1 980 000</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Repurchase price</td>
                        <td>R13,20</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Increase in share capital</td>
                        <td>0</td>
                        <td></td>
                        <td>R2 640 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Issue price of additional shares</td>
                        <td></td>
                        <td></td>
                        <td>R6,60</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fixed assets purchased</td>
                        <td>R1 000 000</td>
                        <td></td>
                        <td>R2 200 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Increase (decrease) in loan</td>
                        <td>R4 500 000</td>
                        <td></td>
                        <td>(R400 000)</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>B. Financial indicators, interest rate and market price of shares:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th colspan="2">FLEXI LTD</th>
                        <th colspan="2">BROOM LTD</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>Feb. 2021</th>
                        <th>Feb. 2020</th>
                        <th>Feb. 2021</th>
                        <th>Feb. 2020</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>% operating expenses on sales</td>
                        <td>17,5%</td>
                        <td>14,6%</td>
                        <td>13,6%</td>
                        <td>17,0%</td>
                    </tr>
                    <tr>
                        <td>% operating profit on sales</td>
                        <td>18,2%</td>
                        <td>21,9%</td>
                        <td>24,2%</td>
                        <td>20,5%</td>
                    </tr>
                    <tr>
                        <td>% net profit on sales</td>
                        <td>13,8%</td>
                        <td>18,0%</td>
                        <td>19,6%</td>
                        <td>16,0%</td>
                    </tr>
                    <tr>
                        <td>Debt-equity ratio</td>
                        <td>1,1 : 1</td>
                        <td>0,4 : 1</td>
                        <td>0,2 : 1</td>
                        <td>0,4 : 1</td>
                    </tr>
                    <tr>
                        <td>% return on capital employed</td>
                        <td>10,2%</td>
                        <td>16,1%</td>
                        <td>17,2%</td>
                        <td>14,7%</td>
                    </tr>
                    <tr>
                        <td>% return on shareholders' equity</td>
                        <td>7,6%</td>
                        <td>12,2%</td>
                        <td>14,1%</td>
                        <td>10,7%</td>
                    </tr>
                    <tr>
                        <td>Net asset value per share</td>
                        <td>1 081 cents</td>
                        <td>1 128 cents</td>
                        <td>632 cents</td>
                        <td>609 cents</td>
                    </tr>
                    <tr>
                        <td>Market price of shares</td>
                        <td>990 cents</td>
                        <td>1 130 cents</td>
                        <td>660 cents</td>
                        <td>615 cents</td>
                    </tr>
                    <tr>
                        <td>Interest rate on loans</td>
                        <td>13%</td>
                        <td>13%</td>
                        <td>13%</td>
                        <td>13%</td>
                    </tr>
                    <tr>
                        <td>Earnings per share</td>
                        <td>80 cents</td>
                        <td>138 cents</td>
                        <td>72 cents</td>
                        <td>65 cents</td>
                    </tr>
                    <tr>
                        <td>Dividends per share</td>
                        <td>92 cents</td>
                        <td>82 cents</td>
                        <td>48 cents</td>
                        <td>70 cents</td>
                    </tr>
                    <tr>
                        <td>Dividend pay-out rate</td>
                        <td>115%</td>
                        <td>59%</td>
                        <td>67%</td>
                        <td>108%</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>C. Shareholding of Bob Yates in both companies</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th colspan="2">FLEXI LTD</th>
                        <th colspan="2">BROOM LTD</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th>2021</th>
                        <th>2020</th>
                        <th>2021</th>
                        <th>2020</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Shares in each company</td>
                        <td>283 500</td>
                        <td>433 500</td>
                        <td>?</td>
                        <td>460 000</td>
                    </tr>
                    <tr>
                        <td>% shareholding in each company</td>
                        <td>?</td>
                        <td>51,0%</td>
                        <td>?</td>
                        <td>41,8%</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">3.2.1</div>
            <p><strong>Profitability:</strong></p>
            <p>Quote and explain TWO financial indicators to show which company is managing its expenses more efficiently, and is thereby more profitable. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-1'] || ''}
                onChange={(e) => onAnswerChange('q3-2-1', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <div className="question-number">3.2.2</div>
            <p><strong>Dividends, earnings and returns:</strong></p>
            <p>- Comment on the dividend pay-out policy of Flexi Ltd. Explain why this is an irresponsible change in policy. Provide TWO points. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-2a'] || ''}
                onChange={(e) => onAnswerChange('q3-2-2a', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <p>- Comment on the % return on shareholders' equity of EACH company. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-2b'] || ''}
                onChange={(e) => onAnswerChange('q3-2-2b', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <p>- A shareholder feels that earnings per share (EPS) in Broom Ltd are better than that in Flexi Ltd. Explain why you agree with him. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-2c'] || ''}
                onChange={(e) => onAnswerChange('q3-2-2c', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <div className="question-number">3.2.3</div>
            <p><strong>Shareholding of Bob Yates in both companies:</strong></p>
            <p>- Comment on the price paid for the shares repurchased by Flexi Ltd. Provide TWO points. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-3a'] || ''}
                onChange={(e) => onAnswerChange('q3-2-3a', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <p>- Calculate the number of shares that Bob purchased in Broom Ltd with the money he received from the share buyback at Flexi Ltd. (2)</p>
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
                  value={answers['q3-2-3b-workings'] || ''}
                  onChange={(e) => onAnswerChange('q3-2-3b-workings', e.target.value)}
                  placeholder="Enter your workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q3-2-3b-answer'] || ''}
                            onChange={(e) => onAnswerChange('q3-2-3b-answer', e.target.value)}
                            placeholder="Enter your answer"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <p>- Explain the effect of the share repurchase on the % shareholding of Bob Yates in EACH company. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-3c'] || ''}
                onChange={(e) => onAnswerChange('q3-2-3c', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <div className="question-number">3.2.4</div>
            <p><strong>Financing strategies and gearing:</strong></p>
            <p>The directors of each company have taken deliberate decisions that are reflected in their Cash Flow Statements.</p>
            <p>- Explain the decisions taken by the directors of Broom Ltd and how these will benefit the company. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-4a'] || ''}
                onChange={(e) => onAnswerChange('q3-2-4a', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <p>- Explain how the decisions taken by Flexi Ltd affected the risk and gearing of the business. Quote TWO financial indicators. (6)</p>
            <textarea
                className="answer-input"
                value={answers['q3-2-4b'] || ''}
                onChange={(e) => onAnswerChange('q3-2-4b', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />
        </div>
    );
};

export default Question3;

