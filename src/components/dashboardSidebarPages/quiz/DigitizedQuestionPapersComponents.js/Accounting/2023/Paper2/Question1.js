import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: RECONCILIATIONS <span className="marks-indicator">40 marks</span></h2>

            <div className="question-number">1.1 BANK RECONCILIATION</div>
            <p>The information relates to Mango Traders for June 2023. The business uses the official bank statement which is received on the 26th of each month.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. The Bank Reconciliation Statement on 31 May 2023 showed:</strong></p>
                <table>
                    <tbody>
                    <tr>
                        <td>Favourable balance on the Bank Statement</td>
                        <td>R27 600</td>
                    </tr>
                    <tr>
                        <td>Outstanding deposits:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">• 18 May 2023</td>
                        <td>R30 000</td>
                    </tr>
                    <tr>
                        <td className="line-item">• 30 May 2023</td>
                        <td>R18 200</td>
                    </tr>
                    <tr>
                        <td>Outstanding EFTs:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">• EFT 816 (to Ace Stationers)</td>
                        <td>R7 400</td>
                    </tr>
                    <tr>
                        <td className="line-item">• EFT 817 (to Spark Wholesalers)</td>
                        <td>R19 300</td>
                    </tr>
                    <tr>
                        <td>Favourable balance on the Bank Account in the Ledger</td>
                        <td>R49 100</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>NOTE:</strong> The cashier reported that the cash to be deposited on 18 May was stolen while she was on her way to the bank. This amount must be written off.</p>

                <p><strong>B. Cash Journal totals on 30 June 2023 before receiving the Bank Statement:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>Cash Receipts Journal</th>
                        <th>Cash Payments Journal</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>R81 300</td>
                        <td>R80 620</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">1.1.1</div>
            <p>Calculate the following on 30 June 2023:</p>

            <p><strong>(a)</strong> Correct totals for the Cash Journals. Use the table provided below.</p>
            <table>
                <thead>
                <tr>
                    <th></th>
                    <th>RECEIPTS</th>
                    <th>PAYMENTS</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Provisional totals</td>
                    <td>81 300</td>
                    <td>80 620</td>
                </tr>
                <tr>
                    <td>Adjustments</td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q1-1-1a-receipts'] || ''}
                  onChange={(e) => onAnswerChange('q1-1-1a-receipts', e.target.value)}
                  placeholder="Receipts adjustments"
              />
                    </td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q1-1-1a-payments'] || ''}
                  onChange={(e) => onAnswerChange('q1-1-1a-payments', e.target.value)}
                  placeholder="Payments adjustments"
              />
                    </td>
                </tr>
                <tr>
                    <td>Correct totals</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-1-1a-receipts-total'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-1a-receipts-total', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-1-1a-payments-total'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-1a-payments-total', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <p><strong>(b)</strong> Bank Account balance in the General Ledger of the business</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q1-1-1b-workings'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-1b-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-1-1b-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-1b-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.1.2</div>
            <p>Prepare the Bank Reconciliation Statement on 30 June 2023.</p>
            <textarea
                className="answer-input"
                value={answers['q1-1-2-answer'] || ''}
                onChange={(e) => onAnswerChange('q1-1-2-answer', e.target.value)}
                placeholder="Prepare the Bank Reconciliation Statement here..."
            />

            <div className="question-number">1.1.3</div>
            <p>Explain TWO strategies that the business can use to address the problem of missing cash.</p>
            <textarea
                className="answer-input"
                value={answers['q1-1-3-answer'] || ''}
                onChange={(e) => onAnswerChange('q1-1-3-answer', e.target.value)}
                placeholder="Your answer..."
            />
        </div>
    );
};

export default Question1;

