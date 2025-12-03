import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: BUDGETING <span className="marks-indicator">40 marks</span></h2>

            <div className="question-number">3.1 Cash Budget and Projected Statement of Comprehensive Income (6 marks)</div>

            <div className="sub-question">
                <h4>Show the effect of transactions 3.1.1 to 3.1.3 on the Cash Budget and the Statement of Comprehensive Income</h4>
                <textarea
                    className="answer-input"
                    value={answers['q3_1'] || ''}
                    onChange={(e) => onAnswerChange('q3_1', e.target.value)}
                    rows="6"
                    placeholder="Enter your answer with calculations..."
                />
            </div>

            <div className="question-number">3.2 JESARY SUPERSPARES Calculations (25 marks)</div>

            <div className="sub-question">
                <h4>3.2.1 Calculate the credit purchases for November 2024 (6 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q3_2_1_purch'] || ''}
                    onChange={(e) => onAnswerChange('q3_2_1_purch', e.target.value)}
                    rows="4"
                    placeholder="Enter your workings and answer..."
                />
            </div>

            <div className="sub-question">
                <h4>3.2.2 Complete the Creditors' Payment Schedule for December 2024 (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q3_2_1_schedule'] || ''}
                    onChange={(e) => onAnswerChange('q3_2_1_schedule', e.target.value)}
                    rows="4"
                    placeholder="Enter your answer..."
                />
            </div>

            <div className="sub-question">
                <h4>3.2.2 Calculate the following amounts (15 marks):</h4>

                <div className="grid-2">
                    <div className="input-group">
                        <label>(i) Rent expense for December 2024 (R):</label>
                        <input
                            type="number"
                            className="answer-input"
                            value={answers['q3_3_i'] || ''}
                            onChange={(e) => onAnswerChange('q3_3_i', e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="input-group">
                        <label>(ii) Interest on loan for December 2024 (R):</label>
                        <input
                            type="number"
                            className="answer-input"
                            value={answers['q3_3_ii'] || ''}
                            onChange={(e) => onAnswerChange('q3_3_ii', e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="input-group">
                        <label>(iii) Deposit for new computers (Nov 2024) (R):</label>
                        <input
                            type="number"
                            className="answer-input"
                            value={answers['q3_3_iii'] || ''}
                            onChange={(e) => onAnswerChange('q3_3_iii', e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="input-group">
                        <label>(iv) Insurance for December 2024 (R):</label>
                        <input
                            type="number"
                            className="answer-input"
                            value={answers['q3_3_iv'] || ''}
                            onChange={(e) => onAnswerChange('q3_3_iv', e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="input-group">
                        <label>(v) Salaries for November 2024 (R):</label>
                        <input
                            type="number"
                            className="answer-input"
                            value={answers['q3_3_v'] || ''}
                            onChange={(e) => onAnswerChange('q3_3_v', e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>
                </div>
            </div>

            <div className="question-number">3.2.3 Sales Policy & Control (9 marks)</div>

            <div className="grid-2">
                <div className="sub-question">
                    <h4>(a) Explain the change in sales policy (2 marks)</h4>
                    <textarea
                        className="answer-input"
                        value={answers['q3_2_3_a'] || ''}
                        onChange={(e) => onAnswerChange('q3_2_3_a', e.target.value)}
                        rows="4"
                        placeholder="Enter your explanation..."
                    />
                </div>

                <div className="sub-question">
                    <h4>(b) Why Bluey should not be concerned about higher actual credit sales (4 marks)</h4>
                    <textarea
                        className="answer-input"
                        value={answers['q3_2_3_b'] || ''}
                        onChange={(e) => onAnswerChange('q3_2_3_b', e.target.value)}
                        rows="4"
                        placeholder="Enter your explanation..."
                    />
                </div>

                <div className="sub-question">
                    <h4>(c) Comment on the control over delivery expenses and packing materials (4 marks)</h4>
                    <textarea
                        className="answer-input"
                        value={answers['q3_2_3_c'] || ''}
                        onChange={(e) => onAnswerChange('q3_2_3_c', e.target.value)}
                        rows="4"
                        placeholder="Enter your comment..."
                    />
                </div>
            </div>
        </div>
    );
};

export default Question3;
