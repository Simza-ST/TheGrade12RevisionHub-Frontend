
import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: COMPANY FINANCIAL STATEMENTS <span className="marks-indicator">55 marks</span></h2>
            <p><strong>BUHLE LIMITED</strong></p>
            <p>The information relates to the financial year ended on 28 February 2023. The business sells bicycles.</p>

            <div className="info-box">
                <h4>INFORMATION A: Extract: Balances and totals from the records on 28 February 2023:</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Account</th>
                        <th>Amount (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ordinary share capital</td>
                        <td>20 000 000</td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>?</td>
                    </tr>
                    <tr>
                        <td>Loan, Untitled Bank</td>
                        <td>?</td>
                    </tr>
                    <tr>
                        <td>Debtors' control</td>
                        <td>483 110</td>
                    </tr>
                    <tr>
                        <td>Fixed deposit</td>
                        <td>1 500 000</td>
                    </tr>
                    <tr>
                        <td>Trading stock</td>
                        <td>2 125 380</td>
                    </tr>
                    <tr>
                        <td>SARS: Income Tax (provisional tax payments)</td>
                        <td>1 049 000</td>
                    </tr>
                    <tr>
                        <td>Bank (favourable)</td>
                        <td>629 000</td>
                    </tr>
                    <tr>
                        <td>Creditors' control</td>
                        <td>523 890</td>
                    </tr>
                    <tr>
                        <td>Sales</td>
                        <td>21 017 200</td>
                    </tr>
                    <tr>
                        <td>Cost of sales</td>
                        <td>?</td>
                    </tr>
                    <tr>
                        <td>Commission income</td>
                        <td>277 000</td>
                    </tr>
                    <tr>
                        <td>Fee income</td>
                        <td>303 000</td>
                    </tr>
                    <tr>
                        <td>Rent expense</td>
                        <td>?</td>
                    </tr>
                    <tr>
                        <td>Directors' fees</td>
                        <td>1 610 000</td>
                    </tr>
                    <tr>
                        <td>Dividends on ordinary shares</td>
                        <td>990 000</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="info-box">
                <h4>INFORMATION B: Adjustments and additional information:</h4>
                <p><strong>(i)</strong> The business uses a mark-up of 120% on cost of bicycles. Trade discounts totalling R336 000 have been granted and recorded.</p>

                <p><strong>(ii)</strong> Stock information using FIFO method:</p>
                <table>
                    <thead>
                    <tr>
                        <th>Purchase Date</th>
                        <th>Units</th>
                        <th>Price per unit</th>
                        <th>Total Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>June 2022</td>
                        <td>2 085</td>
                        <td>R1 950</td>
                        <td>R4 065 750</td>
                    </tr>
                    <tr>
                        <td>September 2022</td>
                        <td>2 215</td>
                        <td>R2 020</td>
                        <td>R4 474 300</td>
                    </tr>
                    <tr>
                        <td>January 2023</td>
                        <td>740</td>
                        <td>R2 100</td>
                        <td>R1 554 000</td>
                    </tr>
                    </tbody>
                </table>
                <p><strong>Notes:</strong></p>
                <ul>
                    <li>There were 1 009 bicycles on hand on 28 February 2023</li>
                    <li>40 bicycles, purchased in January 2023, were returned to supplier</li>
                    <li>A number of bicycles were stolen and must be recorded as a loss</li>
                </ul>

                <p><strong>(iii)</strong> Commission income, R41 000, is owed to the business.</p>

                <p><strong>(iv)</strong> Fee income includes R47 150 for February and March 2023. Fee income increased by 5% on 1 March 2023.</p>

                <p><strong>(v)</strong> Rent expense: 150m² at R330/m² from 1 May 2022. Increased by 25m² on 1 November 2022. Rent paid until 30 April 2023.</p>

                <p><strong>(vi)</strong> Directors' fees owed: Brenda earns R10 000 more than Johan. Brenda not paid for February. Johan took unpaid leave for last 3 months.</p>

                <p><strong>(vii)</strong> Transfer debtor's debit balance of R2 700 to creditors.</p>

                <p><strong>(viii)</strong> Three fixed deposits of equal value. One matures on 31 May 2023.</p>

                <p><strong>(ix)</strong> Tax still owed to SARS.</p>

                <p><strong>(x)</strong> Dividends: Interim R990 000 paid, Final R2 640 000 due.</p>

                <p><strong>(xi)</strong> Debt-equity ratio on 28 February 2023 is 0,2 : 1.</p>
            </div>

            <div className="question-number">1.1</div>
            <p>Calculate the value of closing stock of bicycles using the FIFO method. (6 marks)</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q1-1-workings"
                            value={answers['q1-1-workings'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-workings', e.target.value)}
                            placeholder="Show your FIFO calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q1-1-answer"
                            value={answers['q1-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.2</div>
            <p>Complete the Statement of Comprehensive Income for the year ended 28 February 2023. (24 marks)</p>

            <div className="financial-statement">
                <h4>STATEMENT OF COMPREHENSIVE INCOME FOR THE YEAR ENDED 28 FEBRUARY 2023</h4>
                <table className="statement-table">
                    <tbody>
                    <tr>
                        <td>Sales</td>
                        <td><input type="text" className="answer-input" id="q1-2-sales" placeholder="R" value="21 017 200" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Cost of sales</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-cos"
                            value={answers['q1-2-cos'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-cos', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>Gross profit</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-gp"
                            value={answers['q1-2-gp'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-gp', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>Other income</strong></td>
                    </tr>
                    <tr>
                        <td className="line-item">Commission income</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-commission"
                            value={answers['q1-2-commission'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-commission', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Fee income</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-fee"
                            value={answers['q1-2-fee'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-fee', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Bad debts recovered</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-bad-debts"
                            value={answers['q1-2-bad-debts'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-bad-debts', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Sundry income</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-sundry"
                            value={answers['q1-2-sundry'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-sundry', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>Gross operating income</strong></td>
                        <td><input type="text" className="answer-input" id="q1-2-goi" placeholder="R" value="12 254 100" readOnly /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>Operating expenses</strong></td>
                    </tr>
                    <tr>
                        <td className="line-item">Salaries and wages</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-salaries"
                            value={answers['q1-2-salaries'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-salaries', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Depreciation</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-depreciation"
                            value={answers['q1-2-depreciation'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-depreciation', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Sundry expenses</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-sundry-exp"
                            value={answers['q1-2-sundry-exp'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-sundry-exp', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Trading stock deficit</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-stock-deficit"
                            value={answers['q1-2-stock-deficit'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-stock-deficit', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Rent expense</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-rent"
                            value={answers['q1-2-rent'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-rent', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Directors' fees</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-directors-fees"
                            value={answers['q1-2-directors-fees'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-directors-fees', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>Operating profit</strong></td>
                        <td><input type="text" className="answer-input" id="q1-2-op-profit" placeholder="R" value="4 150 300" readOnly /></td>
                    </tr>
                    <tr>
                        <td>Interest income</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-interest-income"
                            value={answers['q1-2-interest-income'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-interest-income', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>Profit before interest expense</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-pbie"
                            value={answers['q1-2-pbie'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-pbie', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Interest expense</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-interest-exp"
                            value={answers['q1-2-interest-exp'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-interest-exp', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>Net profit before tax</strong></td>
                        <td><input type="text" className="answer-input" id="q1-2-npbt" placeholder="R" value="3 737 250" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Income tax</td>
                        <td><input type="text" className="answer-input" id="q1-2-tax" placeholder="R" value="(1 152 000)" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="total"><strong>Net profit after tax</strong></td>
                        <td><input type="text" className="answer-input" id="q1-2-npat" placeholder="R" value="2 585 250" readOnly /></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">1.3</div>
            <p>Complete the Statement of Financial Position as at 28 February 2023. (25 marks)</p>

            <div className="financial-statement">
                <h4>STATEMENT OF FINANCIAL POSITION AS AT 28 FEBRUARY 2023</h4>
                <table className="statement-table">
                    <tbody>
                    <tr>
                        <td colSpan="2"><strong>ASSETS</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>NON-CURRENT ASSETS</strong></td>
                    </tr>
                    <tr>
                        <td className="line-item">Fixed assets</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-fixed-assets"
                            value={answers['q1-3-fixed-assets'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-fixed-assets', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Investment: Fixed deposit</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-fixed-deposit"
                            value={answers['q1-3-fixed-deposit'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-fixed-deposit', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>CURRENT ASSETS</strong></td>
                    </tr>
                    <tr>
                        <td className="line-item">Inventories</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-inventories"
                            value={answers['q1-3-inventories'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-inventories', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Trade and other receivables</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-receivables"
                            value={answers['q1-3-receivables'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-receivables', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Cash and cash equivalents</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-cash"
                            value={answers['q1-3-cash'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-cash', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>TOTAL ASSETS</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-total-assets"
                            value={answers['q1-3-total-assets'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-total-assets', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>EQUITY AND LIABILITIES</strong></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>ORDINARY SHAREHOLDERS' EQUITY</strong></td>
                    </tr>
                    <tr>
                        <td className="line-item">Ordinary share capital</td>
                        <td><input type="text" className="answer-input" id="q1-3-share-capital" placeholder="R" value="20 000 000" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Retained income</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-retained-income"
                            value={answers['q1-3-retained-income'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-retained-income', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>NON-CURRENT LIABILITIES</strong></td>
                        <td><input type="text" className="answer-input" id="q1-3-ncl" placeholder="R" value="4 512 550" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Loan</td>
                        <td><input type="text" className="answer-input" id="q1-3-loan" placeholder="R" value="4 512 550" readOnly /></td>
                    </tr>
                    <tr>
                        <td colSpan="2"><strong>CURRENT LIABILITIES</strong></td>
                    </tr>
                    <tr>
                        <td className="line-item">Trade and other payables</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-payables"
                            value={answers['q1-3-payables'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-payables', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Current portion of loan</td>
                        <td><input type="text" className="answer-input" id="q1-3-current-loan" placeholder="R" value="420 000" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">SARS: Income tax</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-sars-tax"
                            value={answers['q1-3-sars-tax'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-sars-tax', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Shareholders for dividends</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-dividends"
                            value={answers['q1-3-dividends'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-dividends', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="total"><strong>TOTAL EQUITY AND LIABILITIES</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-3-total-equity-liabilities"
                            value={answers['q1-3-total-equity-liabilities'] || ''}
                            onChange={(e) => onAnswerChange('q1-3-total-equity-liabilities', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Question1;


