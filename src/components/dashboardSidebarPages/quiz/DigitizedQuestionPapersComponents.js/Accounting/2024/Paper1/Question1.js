import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: COMPANY FINANCIAL STATEMENTS <span className="marks-indicator">55 marks</span></h2>

            <p>The information relates to Ivory Park Ltd for the financial year ended 29 February 2024.</p>

            <div className="question-number">1.1</div>
            <p>Refer to Information B (i) for fixed assets:</p>

            <div className="question-number">1.1.1</div>
            <p>Calculate depreciation on equipment on 29 February 2024</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q1-1-1-workings"
                            value={answers['q1-1-1-workings'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-1-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q1-1-1-answer"
                            value={answers['q1-1-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-1-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.1.2</div>
            <p>Calculate cost price of vehicles on 29 February 2024</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q1-1-2-workings"
                            value={answers['q1-1-2-workings'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-2-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q1-1-2-answer"
                            value={answers['q1-1-2-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-2-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.1.3</div>
            <p>Calculate depreciation on vehicles on 29 February 2024</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q1-1-3-workings"
                            value={answers['q1-1-3-workings'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-3-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q1-1-3-answer"
                            value={answers['q1-1-3-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-3-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.1.4</div>
            <p>Calculate profit/loss on vehicle traded in on 1 September 2023</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            id="q1-1-4-workings"
                            value={answers['q1-1-4-workings'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-4-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            id="q1-1-4-answer"
                            value={answers['q1-1-4-answer'] || ''}
                            onChange={(e) => onAnswerChange('q1-1-4-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">1.2</div>
            <p>Complete the Statement of Comprehensive Income for the year ended 29 February 2024</p>

            <div className="financial-statement">
                <h4>STATEMENT OF COMPREHENSIVE INCOME FOR THE YEAR ENDED 29 FEBRUARY 2024</h4>
                <table className="statement-table">
                    <tbody>
                    <tr>
                        <td>Sales</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-sales"
                            value={answers['q1-2-sales'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-sales', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td>Cost of sales</td>
                        <td><input type="text" className="answer-input" id="q1-2-cos" placeholder="R" value="(4 780 900)" readOnly /></td>
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
                        <td>Other income</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">Service fee income</td>
                        <td><input type="text" className="answer-input" id="q1-2-service" placeholder="R" value="1 757 700" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Rent income</td>
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
                        <td className="line-item">Interest income</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-interest"
                            value={answers['q1-2-interest'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-interest', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Profit on sale of asset</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-profit-sale"
                            value={answers['q1-2-profit-sale'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-profit-sale', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Provision for bad debts adjustment</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-provision"
                            value={answers['q1-2-provision'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-provision', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td><strong>Gross operating income</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-goi"
                            value={answers['q1-2-goi'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-goi', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td>Operating expenses</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="line-item">Audit fees</td>
                        <td><input type="text" className="answer-input" id="q1-2-audit" placeholder="R" value="79 000" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Sundry operating expenses</td>
                        <td><input type="text" className="answer-input" id="q1-2-sundry" placeholder="R" value="119 900" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Bad debts</td>
                        <td><input type="text" className="answer-input" id="q1-2-bad-debts" placeholder="R" value="24 780" readOnly /></td>
                    </tr>
                    <tr>
                        <td className="line-item">Packing material</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-packing"
                            value={answers['q1-2-packing'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-packing', e.target.value)}
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
                        <td className="line-item">Insurance</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-insurance"
                            value={answers['q1-2-insurance'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-insurance', e.target.value)}
                            placeholder="R"
                        /></td>
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
                        <td className="line-item">Directors' fees</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-directors"
                            value={answers['q1-2-directors'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-directors', e.target.value)}
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
                        <td><strong>Operating profit</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-op"
                            value={answers['q1-2-op'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-op', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td>Interest income</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-interest-inc"
                            value={answers['q1-2-interest-inc'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-interest-inc', e.target.value)}
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
                        <td>Interest expense</td>
                        <td><input type="text" className="answer-input" id="q1-2-interest-exp" placeholder="R" value="(149 400)" readOnly /></td>
                    </tr>
                    <tr>
                        <td><strong>Net profit before tax</strong></td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-npbt"
                            value={answers['q1-2-npbt'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-npbt', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td>Income tax</td>
                        <td><input
                            type="text"
                            className="answer-input"
                            id="q1-2-tax"
                            value={answers['q1-2-tax'] || ''}
                            onChange={(e) => onAnswerChange('q1-2-tax', e.target.value)}
                            placeholder="R"
                        /></td>
                    </tr>
                    <tr>
                        <td className="total"><strong>Net profit after tax</strong></td>
                        <td><input type="text" className="answer-input" id="q1-2-npat" placeholder="R" value="992 160" readOnly /></td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="info-box">
                <h4>INFORMATION:</h4>

                <p><strong>A. Balances/totals, among others, that appeared in the books on:</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>29 Feb. 2024</th>
                        <th>28 Feb. 2023</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Mortgage loan: Phambili Bank</td>
                        <td>744 100</td>
                        <td>987 700</td>
                    </tr>
                    <tr>
                        <td>Equipment at cost</td>
                        <td>852 000</td>
                        <td>852 000</td>
                    </tr>
                    <tr>
                        <td>Accumulated depreciation on equipment</td>
                        <td>472 500</td>
                        <td>344 700</td>
                    </tr>
                    <tr>
                        <td>Vehicles at cost</td>
                        <td>?</td>
                        <td>1 250 000</td>
                    </tr>
                    <tr>
                        <td>Accumulated depreciation on vehicles</td>
                        <td>?</td>
                        <td>420 000</td>
                    </tr>
                    <tr>
                        <td>Trading stock</td>
                        <td>654 500</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Debtors' control</td>
                        <td>516 600</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Provision for bad debt</td>
                        <td>?</td>
                        <td>29 520</td>
                    </tr>
                    <tr>
                        <td>SARS: Income tax (provisional tax payments)</td>
                        <td>340 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sales</td>
                        <td>?</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Cost of sales</td>
                        <td>4 780 900</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Audit fees</td>
                        <td>79 000</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Service fee income</td>
                        <td>1 757 700</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Sundry operating expenses</td>
                        <td>119 900</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Bad debts</td>
                        <td>24 780</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Packing material</td>
                        <td>66 550</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Salaries and wages (including contributions)</td>
                        <td>1 425 600</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Insurance</td>
                        <td>100 800</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Rent income</td>
                        <td>158 100</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Interest income</td>
                        <td>?</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Directors' fees</td>
                        <td>?</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Interest on loan</td>
                        <td>149 400</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dividends on ordinary shares</td>
                        <td>250 000</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>

                <p><strong>B. Adjustments and additional information:</strong></p>

                <p><strong>(i) Fixed assets:</strong></p>
                <p><strong>Equipment:</strong></p>
                <ul>
                    <li>No equipment was bought or sold during the year.</li>
                </ul>

                <p><strong>Vehicles:</strong></p>
                <ul>
                    <li>An old vehicle was traded in on 1 September 2023 for a new vehicle, costing R320 000. The trade-in value received was R153 660.</li>
                    <li>The following extract of the vehicle sold was taken from the Fixed Asset Register:</li>
                </ul>

                <table>
                    <tbody>
                    <tr>
                        <td>Cost price:</td>
                        <td>R240 000</td>
                        <td>Date purchased:</td>
                        <td>1 July 2021</td>
                    </tr>
                    <tr>
                        <td>Rate of depreciation:</td>
                        <td colSpan="3">20% p.a. on the diminishing-balance method</td>
                    </tr>
                    </tbody>
                </table>

                <table>
                    <thead>
                    <tr>
                        <th>FINANCIAL YEAR END</th>
                        <th>DEPRECIATION</th>
                        <th>ACCUMULATED DEPRECIATION</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>28 February 2022</td>
                        <td>R32 000</td>
                        <td>R32 000</td>
                    </tr>
                    <tr>
                        <td>28 February 2023</td>
                        <td>R41 600</td>
                        <td>R73 600</td>
                    </tr>
                    <tr>
                        <td>1 September 2023</td>
                        <td>?</td>
                        <td>?</td>
                    </tr>
                    </tbody>
                </table>

                <ul>
                    <li>Vehicles are depreciated at 20% p.a. on the diminishing-balance method.</li>
                    <li>Depreciation on the old remaining vehicles was R132 720.</li>
                </ul>

                <p><strong>(ii)</strong> The company maintains a mark-up of 60% on cost. Note that goods costing R115 000 (included in cost of sales) were sold at a mark-up of 40% on cost to internal employees.</p>

                <p><strong>(iii)</strong> Physical stocktaking on 29 February 2024 revealed the following:</p>
                <ul>
                    <li>Trading stock, R647 100</li>
                    <li>Packing material used during the financial year, R58 700</li>
                </ul>

                <p><strong>(iv)</strong> Provision for bad debts must be adjusted to 5% of the outstanding debtors.</p>

                <p><strong>(v)</strong> Monthly insurance premiums were fixed for the past three years and were paid up to 31 May 2024.</p>

                <p><strong>(vi)</strong> A tenant is renting an office from Ivory Park Ltd. Rent for this office has been received up until 30 April 2024. Rent was decreased by 8% on 1 December 2023 on the office rented.</p>

                <p><strong>(vii)</strong> One employee was omitted from the Salaries Journal of February 2024. His net monthly salary was R19 340 after 35% deductions were made for his pension and personal tax and R2 500 deducted for medical aid. The employer contributes 10% of his gross salary on behalf of employees towards pension.</p>

                <p><strong>(viii)</strong> The company had two directors who received a combined annual fee of R1 065 200 after their monthly fees were increased by R5 800 each on 1 August 2023. A third director joined the company on 1 November 2023 and received the same monthly fee as the other directors, excluding the increase of R5 800 per month.</p>

                <p><strong>(ix)</strong> Net profit after tax, R992 160, was calculated after taking into account all the adjustments above. Income tax is calculated at 28% of the net profit.</p>
            </div>
        </div>
    );
};

export default Question1;
