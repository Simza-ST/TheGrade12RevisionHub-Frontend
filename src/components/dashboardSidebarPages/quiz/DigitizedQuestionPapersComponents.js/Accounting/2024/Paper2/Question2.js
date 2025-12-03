import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: STOCK VALUATION <span className="marks-indicator">35 marks</span></h2>

            <div className="question-number">2.1 SUNGLASS CITY (22 marks)</div>

            <div className="grid-2">
                <div className="sub-question">
                    <h4>2.1.1 Weighted Average Cost of ONE pair (5 marks)</h4>
                    <input
                        type="number"
                        step="0.01"
                        className="answer-input"
                        value={answers['q2_1_1'] || ''}
                        onChange={(e) => onAnswerChange('q2_1_1', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>

                <div className="sub-question">
                    <h4>2.1.2 Number of sunglasses stolen (4 marks)</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q2_1_2_units'] || ''}
                        onChange={(e) => onAnswerChange('q2_1_2_units', e.target.value)}
                        placeholder="Enter number of units"
                    />
                </div>
            </div>

            <div className="sub-question">
                <h4>2.1.2 Rand value of sunglasses stolen using WAC (2 marks)</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q2_1_2_value'] || ''}
                    onChange={(e) => onAnswerChange('q2_1_2_value', e.target.value)}
                    placeholder="Enter amount in Rands"
                />
            </div>

            <div className="sub-question">
                <h4>2.1.3 Value of closing stock using FIFO method (5 marks)</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q2_1_3'] || ''}
                    onChange={(e) => onAnswerChange('q2_1_3', e.target.value)}
                    placeholder="Enter amount in Rands"
                />
            </div>

            <div className="sub-question">
                <h4>2.1.4 Explain how Nosisa could have proven Micha and Jack guilty (2 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q2_1_4_explain'] || ''}
                    onChange={(e) => onAnswerChange('q2_1_4_explain', e.target.value)}
                    rows="3"
                    placeholder="Enter your explanation..."
                />
            </div>

            <div className="sub-question">
                <h4>2.1.4 Action to be taken against Micha and Jack (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q2_1_4_action'] || ''}
                    onChange={(e) => onAnswerChange('q2_1_4_action', e.target.value)}
                    rows="4"
                    placeholder="Enter your answer (ONE point for each person)..."
                />
            </div>

            <div className="question-number">2.2 PROBLEM-SOLVING (13 marks)</div>

            <div className="sub-question">
                <h4>2.2.1 Trousers Mark-up Percentage (3 marks)</h4>
                <input
                    type="number"
                    step="0.1"
                    className="answer-input"
                    value={answers['q2_2_1_markup'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_1_markup', e.target.value)}
                    placeholder="Enter percentage (e.g., 84.0)"
                />
            </div>

            <div className="sub-question">
                <h4>2.2.2 Comment on how the return of casual shirts would affect the business negatively (2 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q2_2_2'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_2', e.target.value)}
                    rows="3"
                    placeholder="Enter your comment..."
                />
            </div>

            <div className="sub-question">
                <h4>2.2.3 Formal Shirts Stock Holding Period (4 marks)</h4>
                <input
                    type="number"
                    step="0.1"
                    className="answer-input"
                    value={answers['q2_2_3'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_3', e.target.value)}
                    placeholder="Enter number of days (e.g., 17.8)"
                />
            </div>
        </div>
    );
};

export default Question2;

