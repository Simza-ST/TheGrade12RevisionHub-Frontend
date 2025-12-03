import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: DEBTORS' RECONCILIATION, AGE ANALYSIS AND VAT <span className="marks-indicator">40 marks</span></h2>

            <div className="question-number">1.1 True or False (3 marks)</div>
            <p>Indicate whether each statement is TRUE or FALSE:</p>

            <div className="grid-2">
                <div className="input-group">
                    <label>1.1.1 EFT payments by debtors should be recorded in the CRJ, only after receiving proof of payment or an entry on the business' bank statement.</label>
                    <select
                        className="answer-input"
                        value={answers['q1_1_1'] || ''}
                        onChange={(e) => onAnswerChange('q1_1_1', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>1.1.2 Output VAT is regarded as an asset.</label>
                    <select
                        className="answer-input"
                        value={answers['q1_1_2'] || ''}
                        onChange={(e) => onAnswerChange('q1_1_2', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>1.1.3 VAT on bad debts will decrease VAT payable to SARS.</label>
                    <select
                        className="answer-input"
                        value={answers['q1_1_3'] || ''}
                        onChange={(e) => onAnswerChange('q1_1_3', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
            </div>

            <div className="question-number">1.2 MATSAMO TRADERS (19 marks)</div>

            <div className="sub-question">
                <h4>1.2.1 Correct Debtors' Control Account Balance (5 marks)</h4>
                <div className="input-group">
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q1_2_1'] || ''}
                        onChange={(e) => onAnswerChange('q1_2_1', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>
            </div>

            <div className="sub-question">
                <h4>1.2.2 Complete the corrected Debtors' List (14 marks)</h4>
                <p>Provide your workings and the final list totals:</p>
                <textarea
                    className="answer-input"
                    value={answers['q1_2_2'] || ''}
                    onChange={(e) => onAnswerChange('q1_2_2', e.target.value)}
                    rows="6"
                    placeholder="Enter your answer with calculations..."
                />
            </div>

            <div className="question-number">1.3 DEBTORS' AGE ANALYSIS (8 marks)</div>

            <div className="sub-question">
                <h4>1.3.1 Comment (4 marks)</h4>
                <p>Provide calculation/figures to show why Timo Traders should not be satisfied:</p>
                <textarea
                    className="answer-input"
                    value={answers['q1_3_1'] || ''}
                    onChange={(e) => onAnswerChange('q1_3_1', e.target.value)}
                    rows="4"
                    placeholder="Enter your answer..."
                />
            </div>

            <div className="sub-question">
                <h4>1.3.2 Advice (4 marks)</h4>
                <p>Explain TWO points of advice:</p>
                <textarea
                    className="answer-input"
                    value={answers['q1_3_2'] || ''}
                    onChange={(e) => onAnswerChange('q1_3_2', e.target.value)}
                    rows="4"
                    placeholder="Enter your answer..."
                />
            </div>

            <div className="question-number">1.4 VALUE-ADDED TAX (10 marks)</div>

            <div className="sub-question">
                <h4>Calculate the total net effect of transactions on VAT Payable to SARS</h4>
                <div className="input-group">
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q1_4'] || ''}
                        onChange={(e) => onAnswerChange('q1_4', e.target.value)}
                        placeholder="Enter amount in Rands (negative for increase, positive for decrease)"
                    />
                </div>
            </div>
        </div>
    );
};

export default Question1;
