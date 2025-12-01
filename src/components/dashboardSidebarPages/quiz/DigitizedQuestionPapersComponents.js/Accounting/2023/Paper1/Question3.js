import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: INTERPRETATION OF FINANCIAL INFORMATION <span className="marks-indicator">45 marks</span></h2>
            <p><strong>GUARDIAN LTD AND NAVARRA LTD</strong></p>

            <div className="info-box">
                <h4>INFORMATION A: Background:</h4>
                <ul>
                    <li>Navarra Ltd financial statements not yet audited</li>
                    <li>Sheryl Mabaso - CFO of Guardian Ltd (retiring March 2023)</li>
                    <li>Nathan Crewe - CFO of Navarra Ltd</li>
                </ul>

                <h4>INFORMATION B: Extracts from records:</h4>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th colSpan="2">GUARDIAN LTD</th>
                        <th colSpan="2">NAVARRA LTD</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Number of shares (beginning)</td>
                        <td colSpan="2">1 200 000</td>
                        <td colSpan="2">1 200 000</td>
                    </tr>
                    <tr>
                        <td>New shares issued/repurchased (31 Aug 2022)</td>
                        <td colSpan="2">800 000</td>
                        <td colSpan="2">(300 000)</td>
                    </tr>
                    <tr>
                        <td>Number of shares (end)</td>
                        <td colSpan="2">2 000 000</td>
                        <td colSpan="2">900 000</td>
                    </tr>
                    <tr>
                        <td>Issue price of new shares</td>
                        <td colSpan="2">R11,20</td>
                        <td colSpan="2"></td>
                    </tr>
                    <tr>
                        <td>Share repurchase price</td>
                        <td colSpan="2"></td>
                        <td colSpan="2">R11,50</td>
                    </tr>
                    </tbody>
                </table>

                <h4>INFORMATION C: Shareholders' Registers:</h4>
                <p>Navarra Ltd repurchased 300 000 of Nathan's shares for R3 450 000 on 1 September 2022.</p>

                <table>
                    <thead>
                    <tr>
                        <th>Shareholder</th>
                        <th colSpan="2">GUARDIAN LTD</th>
                        <th colSpan="2">NAVARRA LTD</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2023</td>
                        <td>2022</td>
                        <td>2023</td>
                        <td>2022</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Sheryl Mabaso</td>
                        <td>350 000</td>
                        <td>350 000</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Nathan Crewe</td>
                        <td></td>
                        <td></td>
                        <td>362 000</td>
                        <td>662 000</td>
                    </tr>
                    <tr>
                        <td>% shareholding</td>
                        <td>17,5%</td>
                        <td>29,2%</td>
                        <td>40,2%</td>
                        <td>55,2%</td>
                    </tr>
                    </tbody>
                </table>

                <h4>INFORMATION D: Financial Indicators:</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Indicator</th>
                        <th colSpan="2">GUARDIAN LTD</th>
                        <th colSpan="2">NAVARRA LTD</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2023</td>
                        <td>2022</td>
                        <td>2023</td>
                        <td>2022</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Dividend payout rate</td>
                        <td>46,7%</td>
                        <td>33,0%</td>
                        <td>103,8%</td>
                        <td>34,8%</td>
                    </tr>
                    <tr>
                        <td>Earnings per share</td>
                        <td>150c</td>
                        <td>106c</td>
                        <td>80c</td>
                        <td>115c</td>
                    </tr>
                    <tr>
                        <td>Dividends per share</td>
                        <td>70c</td>
                        <td>35c</td>
                        <td>83c</td>
                        <td>40c</td>
                    </tr>
                    <tr>
                        <td>Current ratio</td>
                        <td>1,7:1</td>
                        <td>1,5:1</td>
                        <td>0,9:1</td>
                        <td>2,5:1</td>
                    </tr>
                    <tr>
                        <td>Acid-test ratio</td>
                        <td>1,2:1</td>
                        <td>1,0:1</td>
                        <td>0,2:1</td>
                        <td>1,4:1</td>
                    </tr>
                    <tr>
                        <td>Debt-equity ratio</td>
                        <td>0,2:1</td>
                        <td>0,3:1</td>
                        <td>0,6:1</td>
                        <td>0,2:1</td>
                    </tr>
                    <tr>
                        <td>Return on capital employed</td>
                        <td>16,6%</td>
                        <td>13,5%</td>
                        <td>11,3%</td>
                        <td>14,8%</td>
                    </tr>
                    <tr>
                        <td>Return on shareholders' equity</td>
                        <td>12,1%</td>
                        <td>10,5%</td>
                        <td>6,4%</td>
                        <td>11%</td>
                    </tr>
                    <tr>
                        <td>Net asset value per share</td>
                        <td>1 230c</td>
                        <td>1 110c</td>
                        <td>992c</td>
                        <td>1 095c</td>
                    </tr>
                    <tr>
                        <td>Market price per share</td>
                        <td>1 350c</td>
                        <td>1 150c</td>
                        <td>400c</td>
                        <td>1 800c</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">3.1</div>
            <p>Match the terms in COLUMN A with explanations in COLUMN B: (3 marks)</p>

            <table>
                <thead>
                <tr>
                    <th>COLUMN A</th>
                    <th>COLUMN B</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>3.1.1 Director</td>
                    <td>A. no opinion was expressed on the financial position</td>
                    <td><input
                        type="text"
                        className="answer-input"
                        id="q3-1-1"
                        value={answers['q3-1-1'] || ''}
                        onChange={(e) => onAnswerChange('q3-1-1', e.target.value)}
                        placeholder="Letter"
                    /></td>
                </tr>
                <tr>
                    <td>3.1.2 Unqualified audit report</td>
                    <td>B. the person who invests funds in a company</td>
                    <td><input
                        type="text"
                        className="answer-input"
                        id="q3-1-2"
                        value={answers['q3-1-2'] || ''}
                        onChange={(e) => onAnswerChange('q3-1-2', e.target.value)}
                        placeholder="Letter"
                    /></td>
                </tr>
                <tr>
                    <td>3.1.3 Shareholder</td>
                    <td>C. manages operating, financing and investing activities</td>
                    <td><input
                        type="text"
                        className="answer-input"
                        id="q3-1-3"
                        value={answers['q3-1-3'] || ''}
                        onChange={(e) => onAnswerChange('q3-1-3', e.target.value)}
                        placeholder="Letter"
                    /></td>
                </tr>
                <tr>
                    <td></td>
                    <td>D. financial statements fairly present the financial position</td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">3.2</div>
            <p>Identify the company that is managing its working capital well. Quote TWO financial indicators. (5 marks)</p>
            <textarea
                className="answer-input"
                id="q3-2-answer"
                value={answers['q3-2-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-2-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">3.3</div>
            <p>Financing strategies and gearing: Guardian Ltd (8 marks)</p>
            <p><strong>(a)</strong> What were the causes of the change in the debt-equity ratio? Provide TWO causes with figures. (4 marks)</p>
            <textarea
                className="answer-input"
                id="q3-3a-answer"
                value={answers['q3-3a-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-3a-answer', e.target.value)}
                placeholder="Your answer..."
            />
            <p><strong>(b)</strong> Explain why it was wise for the company to make more use of loans. Quote and explain ONE other financial indicator. (4 marks)</p>
            <textarea
                className="answer-input"
                id="q3-3b-answer"
                value={answers['q3-3b-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-3b-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">3.4</div>
            <p>Dividends, earnings and returns: Navarra Ltd (9 marks)</p>
            <p><strong>(a)</strong> Explain ONE financial indicator which indicates that a concerned shareholder should not be satisfied with the change in dividend policy. (3 marks)</p>
            <textarea
                className="answer-input"
                id="q3-4a-answer"
                value={answers['q3-4a-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-4a-answer', e.target.value)}
                placeholder="Your answer..."
            />
            <p><strong>(b)</strong> Explain whether shareholders should be satisfied with earnings and returns. Quote TWO financial indicators. (6 marks)</p>
            <textarea
                className="answer-input"
                id="q3-4b-answer"
                value={answers['q3-4b-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-4b-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">3.5</div>
            <p>Shareholding of Nathan Crewe in Navarra Ltd (10 marks)</p>
            <p><strong>(a)</strong> Identify the effect of share repurchase on Nathan's % shareholding. (2 marks)</p>
            <textarea
                className="answer-input"
                id="q3-5a-answer"
                value={answers['q3-5a-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-5a-answer', e.target.value)}
                placeholder="Your answer..."
            />
            <p><strong>(b)</strong> Explain how the company raised R4,4 million for share repurchase and dividends. Provide TWO points. (4 marks)</p>
            <textarea
                className="answer-input"
                id="q3-5b-answer"
                value={answers['q3-5b-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-5b-answer', e.target.value)}
                placeholder="Your answer..."
            />
            <p><strong>(c)</strong> Give TWO reasons why the decision to repurchase Nathan's shares was irresponsible. (4 marks)</p>
            <textarea
                className="answer-input"
                id="q3-5c-answer"
                value={answers['q3-5c-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-5c-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">3.6</div>
            <p>Directorship (10 marks)</p>
            <p><strong>(a)</strong> Explain why you agree that "The CFO has a significant influence on the success of a company." (2 marks)</p>
            <textarea
                className="answer-input"
                id="q3-6a-answer"
                value={answers['q3-6a-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-6a-answer', e.target.value)}
                placeholder="Your answer..."
            />
            <p><strong>(b)</strong> Explain whether directors should be satisfied with share prices. Quote TWO financial indicators for EACH company. (6 marks)</p>
            <textarea
                className="answer-input"
                id="q3-6b-answer"
                value={answers['q3-6b-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-6b-answer', e.target.value)}
                placeholder="Your answer..."
            />
            <p><strong>(c)</strong> Give ONE point of advice to Guardian Ltd's CEO about offering CFO position to Nathan Crewe. (2 marks)</p>
            <textarea
                className="answer-input"
                id="q3-6c-answer"
                value={answers['q3-6c-answer'] || ''}
                onChange={(e) => onAnswerChange('q3-6c-answer', e.target.value)}
                placeholder="Your answer..."
            />
        </div>
    );
};

export default Question3;
