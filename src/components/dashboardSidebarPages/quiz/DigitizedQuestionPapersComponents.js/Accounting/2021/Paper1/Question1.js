
import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: STATEMENT OF FINANCIAL POSITION <span className="marks-indicator">55 marks</span></h2>
            <h3>JIMO LIMITED</h3>
            <p>The information relates to the financial year ended 30 June 2021. The business sells formal clothing for men and women.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. List of balances, before taking into account all adjustments below:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>30 June 2021 (R)</th>
                        <th>30 June 2020 (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Ordinary share capital</td>
                        <td>?</td>
                        <td>?</td>
                    </tr>
                    <tr>
                        <td>Retained income</td>
                        <td>3 240 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Mortgage loan: Best Bank</td>
                        <td>3 755 000</td>
                        <td>4 175 000</td>
                    </tr>
                    <tr>
                        <td>Trading stock</td>
                        <td>4 198 500</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>SARS: Income tax (provisional tax)</td>
                        <td>1 200 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Net trade debtors</td>
                        <td>3 668 810</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Bank overdraft</td>
                        <td>?</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Petty cash and cash float</td>
                        <td>?</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Creditors' control</td>
                        <td>1 253 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Accrued income/Income receivable</td>
                        <td>8 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Shareholders for dividends</td>
                        <td>1 170 000</td>
                        <td>821 700</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>B.</strong> The accountant omitted the closing stock figure of formal suits in the trading stock balance provided in Information A.</p>

                <div className="note">
                    <p><strong>NOTE:</strong></p>
                    <ul>
                        <li>The first-in-first-out (FIFO) method is used to value the stock of the formal suits.</li>
                        <li>All other relevant entries have been recorded correctly.</li>
                    </ul>
                </div>

                <p>The information relating to the stock of formal suits is as follows:</p>
                <table>
                    <thead>
                    <tr>
                        <th>Balances:</th>
                        <th>QUANTITY</th>
                        <th>UNIT PRICE</th>
                        <th>TOTAL VALUE</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1 July 2020</td>
                        <td>110</td>
                        <td>R1 900</td>
                        <td>R209 000</td>
                    </tr>
                    <tr>
                        <td>30 June 2021</td>
                        <td>240</td>
                        <td>?</td>
                        <td>?</td>
                    </tr>
                    <tr>
                        <th>Purchases:</th>
                        <th>760</th>
                        <th></th>
                        <th>R1 943 500</th>
                    </tr>
                    <tr>
                        <td>14 Nov. 2020</td>
                        <td>360</td>
                        <td>R2 350</td>
                        <td>R846 000</td>
                    </tr>
                    <tr>
                        <td>10 Feb. 2021</td>
                        <td>170</td>
                        <td>R2 600</td>
                        <td>R442 000</td>
                    </tr>
                    <tr>
                        <td>18 May 2021</td>
                        <td>230</td>
                        <td>R2 850</td>
                        <td>R655 500</td>
                    </tr>
                    <tr>
                        <th>Returns:</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>25 May 2021</td>
                        <td>24</td>
                        <td>R2 850</td>
                        <td>R68 400</td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>C.</strong> The net profit before tax, R4 918 950, was calculated before taking into account/correcting the following:</p>
                <ul className="transaction-list">
                    <li><strong>(i)</strong> Audit fees include R123 600 which was paid in advance for the next financial year.</li>
                    <li><strong>(ii)</strong> The repayments on the loan are fixed at R35 000 per month (including capitalised interest). The balances as per loan statement were:
                        <ul>
                            <li>1 July 2020, R4 175 000</li>
                            <li>30 June 2021, R4 028 000</li>
                        </ul>
                        Provide for interest on loan.
                    </li>
                    <li><strong>(iii)</strong> Rent income: Rent of R74 000 was received from a tenant for the period 1 July 2020 to 31 August 2021. This has been recorded. This amount takes into account a reduction of R750 per month from 1 May 2021. The year-end adjustment has not yet been made.</li>
                    <li><strong>(iv)</strong> After taking into account the corrections above, it was determined that an additional R85 250 is still owed to SARS in respect of income tax for the year.</li>
                </ul>

                <p><strong>D. Shares and dividends:</strong></p>
                <ul className="transaction-list">
                    <li>26 000 shares were repurchased on 1 July 2020 at R3,00 above the average share price.</li>
                    <li>The business did not pay interim dividends during the 2021 financial year.</li>
                    <li>A final dividend of 65 cents per share was declared on 30 June 2021.</li>
                    <li>1 800 000 shares were in issue on 30 June 2021.</li>
                </ul>

                <p><strong>E.</strong> Debtors with credit balances totaling R11 000 must be transferred to the Creditors' Ledger.</p>

                <p><strong>F.</strong> On 30 June 2021, Jimo Ltd returned 10 ladies' coats to the supplier, Bargain Wholesalers. The selling price was R1 750 each. The mark-up was 25% on cost. No entry has been made.</p>

                <p><strong>G.</strong> A fixed monthly instalment of R35 000 (to cover loan repayments and interest) has to be paid over the full period of the loan. Interest will decline over the life of the loan. The interest on the loan budgeted for the next financial year is R234 000.</p>

                <p><strong>H.</strong> The following financial indicators were calculated on 30 June 2021:</p>
                <table>
                    <tbody>
                    <tr>
                        <td>Acid-test ratio</td>
                        <td>1,2 : 1</td>
                    </tr>
                    <tr>
                        <td>Net asset value per share (NAV)</td>
                        <td>540 cents</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <h4>REQUIRED:</h4>

            <div className="question-number">1.1</div>
            <p>Refer to Information B.</p>
            <p>Calculate the value of the closing stock of formal suits that was omitted from the stock sheets on 30 June 2021.</p>

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
                  value={answers['q1-1-workings'] || ''}
                  onChange={(e) => onAnswerChange('q1-1-workings', e.target.value)}
                  placeholder="Enter your workings"
              />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-answer', e.target.value)}
                            placeholder="Enter your answer"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.2</div>
            <p>Refer to Information C.</p>
            <p>Use the table provided to calculate the correct net profit after tax for the year ended 30 June 2021. Indicate '+' for increase and '-' for decrease.</p>

            <table>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Incorrect net profit before tax</td>
                    <td>4 918 950</td>
                </tr>
                <tr>
                    <td>(i) Audit fees</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-i'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-i', e.target.value)}
                            placeholder="Enter amount with + or -"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(ii) Interest on loan</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-ii'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-ii', e.target.value)}
                            placeholder="Enter amount with + or -"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(iii) Rent income</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-iii'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-iii', e.target.value)}
                            placeholder="Enter amount with + or -"
                        />
                    </td>
                </tr>
                <tr>
                    <td>(iv) Income tax</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-iv'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-iv', e.target.value)}
                            placeholder="Enter amount with + or -"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Net profit after tax</strong></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q1-2-final'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-final', e.target.value)}
                            placeholder="Enter final answer"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.3</div>
            <p>Refer to Information A–H.</p>
            <p>Complete the following on 30 June 2021:</p>
            <ul>
                <li>Retained Income Note (5)</li>
                <li>Statement of Financial Position (Balance Sheet) (33)</li>
            </ul>

            <div className="note">
                <p><strong>NOTE:</strong></p>
                <ul>
                    <li>Adjustments from Information C also affect the Statement of Financial Position (Balance Sheet).</li>
                    <li>Show workings. Certain figures are provided in the ANSWER BOOK.</li>
                    <li>Figures are NOT required in the shaded areas.</li>
                </ul>
            </div>
        </div>
    );
};

export default Question1;
