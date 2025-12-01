import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: COMPANY FINANCIAL STATEMENTS <span className="marks-indicator">60 marks</span></h2>
            <p>The information relates to Laysano Ltd for the financial year ended on 28 February 2022.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Extract: Balances and totals from the records on 28 February:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>2022 (R)</th>
                        <th>2021 (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ordinary share capital</td>
                        <td>6 670 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>?</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Loan: Saturn Bank</td>
                        <td>1 159 000</td>
                        <td>1 280 750</td>
                    </tr>
                    {/* Add remaining rows from the original HTML */}
                    </tbody>
                </table>

                {/* Add all the remaining information sections from the original HTML */}

            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">1.1</div>
            <p>Refer to Information B (i). Calculate the cost of the stock that was damaged. (5)</p>
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
                  value={answers['q1-1-workings'] || ''}
                  onChange={(e) => onAnswerChange('q1-1-workings', e.target.value)}
                  placeholder="Show your workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.2</div>
            <p>Refer to Information B (ii).</p>

            <div className="question-number">1.2.1</div>
            <p>Calculate the profit/loss on sale of the delivery vehicle. (5)</p>
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
                  value={answers['q1-2-1-workings'] || ''}
                  onChange={(e) => onAnswerChange('q1-2-1-workings', e.target.value)}
                  placeholder="Show your workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-1-answer', e.target.value)}
                            placeholder="Profit/Loss"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.2.2</div>
            <p>Calculate total depreciation for the year. (4)</p>
            <table>
                <tbody>
                <tr>
                    <th>Depreciation before adjustments</th>
                    <td>328 200</td>
                </tr>
                <tr>
                    <th>Depreciation on vehicle sold</th>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-2-vehicle'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-2-vehicle', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <th>Depreciation on alarm system</th>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-2-alarm'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-2-alarm', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                <tr>
                    <th>TOTAL DEPRECIATION</th>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-2-total'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-2-total', e.target.value)}
                            placeholder="Total amount"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            {/* Add remaining sub-questions for Question 1 following the same pattern */}

        </div>
    );
};

export default Question1;
