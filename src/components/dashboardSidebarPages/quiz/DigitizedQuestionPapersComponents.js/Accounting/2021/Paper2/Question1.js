
import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: DEBTORS' RECONCILIATION AND AGE ANALYSIS <span className="marks-indicator">30 marks</span></h2>
            <p>Zig Zag Traders sells ladies clothing on credit. Debtors are allowed a credit term of 30 days to settle their accounts.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Balances on 30 September 2021, before taking into account errors and omissions in Information B:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Amount (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Debtors' Control Account</td>
                        <td>228 000</td>
                    </tr>
                    <tr>
                        <td>Extract from the debtors' list:</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>A Barnes</td>
                        <td>13 500</td>
                    </tr>
                    <tr>
                        <td>C Davis</td>
                        <td>25 000</td>
                    </tr>
                    <tr>
                        <td>E Foley</td>
                        <td>18 300</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>B. The following errors and omissions must be taken into account:</strong></p>
                <ul className="transaction-list">
                    <li><strong>(i)</strong> An invoice for R1 750 issued to A Barnes was not recorded in the books of Zig Zag Traders.</li>
                    <li><strong>(ii)</strong> A direct deposit of R2 500 by E Foley was correctly recorded in the journal but incorrectly posted to the account of E Foges (another debtor) in the Debtors' Ledger.</li>
                    <li><strong>(iii)</strong> The total of the Debtors' Journal, R62 500, was incorrectly recorded as R65 200 in the Debtors' Control Account.</li>
                    <li><strong>(iv)</strong> Merchandise sold to C Davis, R3 500, was treated as a return of goods and recorded in the Debtors' Allowances Journal.</li>
                    <li><strong>(v)</strong> R5 200, received from D Klein, a debtor whose outstanding balance was written off six months ago, was recorded in the Cash Receipts Journal as a receipt from a debtor.</li>
                    <li><strong>(vi)</strong> Merchandise returned by A Barnes was recorded in the relevant journal as R250 instead of R700 and posted accordingly.</li>
                    <li><strong>(vii)</strong> An EFT for R7 850, received from E Foley as part payment of his account, was entered correctly in the relevant journal but no entries were made in the Debtors' Ledger.</li>
                </ul>

                <p><strong>C. The following age analysis was compiled on 30 September 2021:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th>DEBTOR</th>
                        <th>CREDIT-LIMIT R</th>
                        <th>BALANCE R</th>
                        <th>CURRENT R</th>
                        <th>30 DAYS R</th>
                        <th>60 DAYS R</th>
                        <th>MORE THAN 90 DAYS R</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>J Blom</td>
                        <td>52 000</td>
                        <td>45 000</td>
                        <td>18 000</td>
                        <td>7 000</td>
                        <td>20 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Z Phi</td>
                        <td>22 000</td>
                        <td>29 000</td>
                        <td>3 000</td>
                        <td>26 000</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>S Sah</td>
                        <td>16 000</td>
                        <td>12 500</td>
                        <td>12 500</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>O Mach</td>
                        <td>6 000</td>
                        <td>6 000</td>
                        <td>2 000</td>
                        <td></td>
                        <td></td>
                        <td>4 000</td>
                    </tr>
                    <tr>
                        <td>Other debtors</td>
                        <td></td>
                        <td>146 300</td>
                        <td>55 244</td>
                        <td>48 192</td>
                        <td>30 148</td>
                        <td>12 716</td>
                    </tr>
                    <tr>
                        <th>TOTALS</th>
                        <th></th>
                        <th>R238 800</th>
                        <th>R90 744</th>
                        <th>R81 192</th>
                        <th>R50 148</th>
                        <th>R16 716</th>
                    </tr>
                    <tr>
                        <th>PERCENTAGE</th>
                        <th></th>
                        <th>100%</th>
                        <th>38%</th>
                        <th>34%</th>
                        <th>21%</th>
                        <th>7%</th>
                    </tr>
                    </tbody>
                </table>

                <p><strong>D.</strong> Susan, a member of the sales staff, is also responsible for:</p>
                <ul className="transaction-list">
                    <li>Collecting cash from customers who choose to pay in this way</li>
                    <li>Receiving goods returned and issuing credit notes to customers who return goods.</li>
                </ul>
                <p>The internal auditor is not happy with Susan's job description as he feels it has the potential for fraud, which could lead to loss of cash and trading stock.</p>
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">1.1</div>
            <p>Provide TWO documents that Zig Zag Traders will need from potential debtors before they will be allowed to open accounts. (2)</p>
            <p>DOCUMENT 1:
                <input
                    type="text"
                    className="answer-input"
                    value={answers['q1-1-1'] || ''}
                    onChange={(e) => onAnswerChange('q1-1-1', e.target.value)}
                    placeholder="Enter document type"
                />
            </p>
            <p>DOCUMENT 2:
                <input
                    type="text"
                    className="answer-input"
                    value={answers['q1-1-2'] || ''}
                    onChange={(e) => onAnswerChange('q1-1-2', e.target.value)}
                    placeholder="Enter document type"
                />
            </p>

            <div className="question-number">1.2</div>
            <p>Refer to Information A and B.</p>
            <p>Use the table provided to calculate the following:</p>
            <ul>
                <li>The correct closing balance of the Debtors' Control Account on 30 September 2021. Indicate changes with '+' for an increase, '-' for a decrease or '0' for no change. (9)</li>
                <li>The correct amounts owed by the following debtors only: A Barnes, C Davis, E Foley (9)</li>
            </ul>

            <h4>Debtors' Control Account Reconciliation</h4>
            <table>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount (R)</th>
                    <th>Change (+/-/0)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Provisional Balance</td>
                    <td>228 000</td>
                    <td></td>
                </tr>
                <tr>
                    <td>(i) Invoice to A Barnes not recorded</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-i-amount'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-i-amount', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-i-change'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-i-change', e.target.value)}
                            placeholder="+/-/0"
                        />
                    </td>
                </tr>
                {/* Repeat for all other items (ii) to (vii) */}
                <tr>
                    <td><strong>Corrected Balance</strong></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-final'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-final', e.target.value)}
                            placeholder="Final amount"
                        />
                    </td>
                    <td></td>
                </tr>
                </tbody>
            </table>

            <h4>Correct Amounts Owed by Specific Debtors</h4>
            <table>
                <thead>
                <tr>
                    <th>Debtor</th>
                    <th>Workings</th>
                    <th>Correct Amount (R)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>A Barnes</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-barnes-workings'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-barnes-workings', e.target.value)}
                            placeholder="Workings"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-barnes-amount'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-barnes-amount', e.target.value)}
                            placeholder="Amount"
                        />
                    </td>
                </tr>
                {/* Repeat for C Davis and E Foley */}
                </tbody>
            </table>

            <div className="question-number">1.3</div>
            <p>Refer to Information C.</p>
            <p>Explain THREE different problems highlighted by the debtors' age analysis. Provide the name of a debtor and/or the figure(s) in EACH case. (6)</p>
            <table>
                <thead>
                <tr>
                    <th>Problem</th>
                    <th>Debtor Name and Figures</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q1-3-1-problem'] || ''}
                  onChange={(e) => onAnswerChange('q1-3-1-problem', e.target.value)}
                  placeholder="Problem 1"
              />
                    </td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q1-3-1-debtor'] || ''}
                  onChange={(e) => onAnswerChange('q1-3-1-debtor', e.target.value)}
                  placeholder="Debtor and figures"
              />
                    </td>
                </tr>
                {/* Repeat for 2 more problems */}
                </tbody>
            </table>

            <div className="question-number">1.4</div>
            <p>Refer to Information D.</p>
            <p>Provide TWO points to support the internal auditor's concern that Susan's job description could lead to potential fraud. (4)</p>
            <p>POINT 1:
                <textarea
                    className="answer-input"
                    value={answers['q1-4-1'] || ''}
                    onChange={(e) => onAnswerChange('q1-4-1', e.target.value)}
                    placeholder="Enter point 1"
                />
            </p>
            <p>POINT 2:
                <textarea
                    className="answer-input"
                    value={answers['q1-4-2'] || ''}
                    onChange={(e) => onAnswerChange('q1-4-2', e.target.value)}
                    placeholder="Enter point 2"
                />
            </p>
        </div>
    );
};

export default Question1;

