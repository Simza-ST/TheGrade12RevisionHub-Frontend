import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: INVENTORIES AND FIXED ASSETS <span className="marks-indicator">40 marks</span></h2>

            <div className="question-number">4.1</div>
            <p>Choose a description from COLUMN B that matches the inventory system in COLUMN A. Write only the letter (A–D) next to the question numbers (4.1.1 to 4.1.4) in the ANSWER BOOK.</p>

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
                    <td>4.1.1 Perpetual inventory system</td>
                    <td>A Stock is counted periodically</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-1-1'] || ''}
                            onChange={(e) => onAnswerChange('q4-1-1', e.target.value)}
                            placeholder="A, B, C or D"
                        />
                    </td>
                </tr>
                {/* Repeat for other matching questions */}
                </tbody>
            </table>

            <div className="question-number">4.2</div>
            <p><strong>FIXED ASSETS OF KAY'S KITCHENS</strong></p>
            <p>The information relates to the fixed assets of Kay's Kitchens for the year ended 28 February 2021.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>
                {/* Add all fixed assets information */}
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">4.2.1</div>
            <p>Calculate the depreciation on vehicles for the year ended 28 February 2021. (8)</p>
            <table>
                <thead>
                <tr>
                    <th>Vehicle</th>
                    <th>Workings</th>
                    <th>Amount (R)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Delivery Van</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-2-1-delivery-workings'] || ''}
                            onChange={(e) => onAnswerChange('q4-2-1-delivery-workings', e.target.value)}
                            placeholder="Workings"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-2-1-delivery-amount'] || ''}
                            onChange={(e) => onAnswerChange('q4-2-1-delivery-amount', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                {/* Repeat for other vehicles */}
                </tbody>
            </table>

            <div className="question-number">4.2.2</div>
            <p>Prepare the following accounts in the General Ledger of Kay's Kitchens for the year ended 28 February 2021:</p>
            <ul>
                <li>Vehicles Account (5)</li>
                <li>Accumulated Depreciation on Vehicles Account (7)</li>
            </ul>

            {/* Add ledger account tables */}

            <div className="question-number">4.2.3</div>
            <p>Calculate the profit or loss on the sale of equipment on 30 September 2020. (6)</p>
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
                  value={answers['q4-2-3-workings'] || ''}
                  onChange={(e) => onAnswerChange('q4-2-3-workings', e.target.value)}
                  placeholder="Workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q4-2-3-answer'] || ''}
                            onChange={(e) => onAnswerChange('q4-2-3-answer', e.target.value)}
                            placeholder="Profit/Loss amount"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">4.3</div>
            <p>Explain TWO reasons why a business would choose to use the diminishing balance method of depreciation instead of the straight-line method. (4)</p>
            <p>REASON 1:
                <textarea
                    className="answer-input"
                    value={answers['q4-3-1'] || ''}
                    onChange={(e) => onAnswerChange('q4-3-1', e.target.value)}
                    placeholder="Enter reason"
                />
            </p>
            <p>REASON 2:
                <textarea
                    className="answer-input"
                    value={answers['q4-3-2'] || ''}
                    onChange={(e) => onAnswerChange('q4-3-2', e.target.value)}
                    placeholder="Enter reason"
                />
            </p>
        </div>
    );
};

export default Question4;
