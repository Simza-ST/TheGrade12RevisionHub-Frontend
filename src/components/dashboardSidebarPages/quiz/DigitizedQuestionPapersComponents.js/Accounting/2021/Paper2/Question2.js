import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: COST ACCOUNTING <span className="marks-indicator">45 marks</span></h2>

            <div className="question-number">2.1 PRUDY MANUFACTURERS</div>
            <p>The information relates to the financial year ended 28 February 2021. The business produces one style of travelling bag. The owner is Prudy Sithole.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Stock balances:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>28 February 2021</th>
                        <th>1 March 2020</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Finished goods stock</td>
                        <td>R96 000</td>
                        <td>R72 000</td>
                    </tr>
                    </tbody>
                </table>
                <p>There is no work-in-progress at the beginning or end of the year.</p>

                <p><strong>B.</strong> Raw material issued to the factory for production, R1 494 000.</p>

                <p><strong>C. Production wages:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>NET WAGES PAID TO PRODUCTION WORKERS</th>
                        <th>TOTAL DEDUCTIONS</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>R647 400</td>
                        <td>22% of gross wages</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>D. The bookkeeper calculated the following costs for the year ended 28 February 2021:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>Cost Type</th>
                        <th>Amount (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Factory overhead cost</td>
                        <td>520 280</td>
                    </tr>
                    <tr>
                        <td>Selling and distribution cost</td>
                        <td>224 960</td>
                    </tr>
                    <tr>
                        <td>Administration cost</td>
                        <td>187 760</td>
                    </tr>
                    </tbody>
                </table>
                <p>It was discovered that she did not take the following into account:</p>
                <ul className="transaction-list">
                    <li>The telephone account of R22 400 was posted in error to the factory overhead cost. This expense relates to the office.</li>
                    <li>The entire amount of rent expense, R98 400, was posted to the factory overhead cost. This expense should have been split in the ratio 7 : 2 : 1 between the factory, sales and administration departments.</li>
                    <li>The insurance expense of R26 400 was divided equally between the factory overhead cost and the sales department in error. 60% of this expense relates to the factory and the balance applies to the sales department.</li>
                </ul>

                <p><strong>E. Sales:</strong> Total sales for the year amounted to R4 433 600.</p>
            </div>

            <h4>REQUIRED:</h4>
            <p>Complete the following for the year ended 28 February 2021:</p>

            <div className="question-number">2.1.1 Production Cost Statement (10)</div>
            <table>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount (R)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Direct material cost</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-1-dmc'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-1-dmc', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                {/* Repeat for other rows */}
                </tbody>
            </table>

            <div className="question-number">2.1.2 Abridged Statement of Comprehensive Income (Income Statement) (11)</div>
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
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-2-sales'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-2-sales', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                {/* Repeat for other rows */}
                </tbody>
            </table>

            {/* Continue with 2.2 and 2.3 following the same pattern */}

            <div className="question-number">2.2 CONTROL OF RAW MATERIAL</div>
            <p>After completing the statements in QUESTION 2.1, the internal auditor of Prudy Manufacturers suspects that the raw material (fabric) is not being controlled well in the storeroom and the factory.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>
                {/* Add information tables for 2.2 */}
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">2.2.1</div>
            <p>Calculate:</p>
            <ul>
                <li>The metres of fabric missing from the storeroom</li>
                <li>The metres of fabric wasted in the factory</li>
            </ul>
            <p>Apart from installing cameras, provide a specific strategy to improve internal control in the storeroom and factory. In EACH case, provide a different point.</p>

            <table>
                <thead>
                <tr>
                    <th>Calculation</th>
                    <th>Answer</th>
                    <th>Internal Control Strategy</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Metres of fabric missing from storeroom</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-1-missing'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-missing', e.target.value)}
                            placeholder="Answer"
                        />
                    </td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q2-2-1-strategy1'] || ''}
                  onChange={(e) => onAnswerChange('q2-2-1-strategy1', e.target.value)}
                  placeholder="Strategy for storeroom"
              />
                    </td>
                </tr>
                {/* Repeat for wasted fabric */}
                </tbody>
            </table>

            <div className="question-number">2.3</div>
            <p>Prudy Sithole is considering producing a new style of travel bag. She has provided the following information:</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Amount (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Fixed costs per month</td>
                        <td>120 000</td>
                    </tr>
                    <tr>
                        <td>Variable costs per bag</td>
                        <td>280</td>
                    </tr>
                    <tr>
                        <td>Selling price per bag</td>
                        <td>460</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h4>REQUIRED:</h4>
            <p>Calculate the break-even point for the new style of travel bag.</p>
            <table>
                <thead>
                <tr>
                    <th>Workings</th>
                    <th>Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q2-3-workings'] || ''}
                  onChange={(e) => onAnswerChange('q2-3-workings', e.target.value)}
                  placeholder="Workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-3-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-3-answer', e.target.value)}
                            placeholder="Break-even point"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Question2;

