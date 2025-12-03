import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: BANK RECONCILIATION <span className="marks-indicator">25 marks</span></h2>

            <div className="question-number">4.1 Indicate TRUE or FALSE (3 marks)</div>

            <div className="grid-2">
                <div className="input-group">
                    <label>4.1.1 Debit card fees form part of bank charges:</label>
                    <select
                        className="answer-input"
                        value={answers['q4_1_1'] || ''}
                        onChange={(e) => onAnswerChange('q4_1_1', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>4.1.2 Interest on overdraft is recorded in the CRJ:</label>
                    <select
                        className="answer-input"
                        value={answers['q4_1_2'] || ''}
                        onChange={(e) => onAnswerChange('q4_1_2', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>4.1.3 A debit balance on the Bank Statement reflects a favourable balance:</label>
                    <select
                        className="answer-input"
                        value={answers['q4_1_3'] || ''}
                        onChange={(e) => onAnswerChange('q4_1_3', e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                </div>
            </div>

            <div className="question-number">4.2.2 Calculate the correct bank balance in the ledger (4 marks)</div>

            <div className="sub-question">
                <h4>Correct Bank Balance (31 July 2022):</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q4_2_2_ans'] || ''}
                    onChange={(e) => onAnswerChange('q4_2_2_ans', e.target.value)}
                    placeholder="Enter amount in Rands"
                />
            </div>

            <div className="sub-question">
                <h4>4.2.3 Prepare the Bank Reconciliation Statement (8 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q4_2_3_recon'] || ''}
                    onChange={(e) => onAnswerChange('q4_2_3_recon', e.target.value)}
                    rows="6"
                    placeholder="Prepare the statement entries..."
                />
            </div>
        </div>
    );
};

export default Question4;
