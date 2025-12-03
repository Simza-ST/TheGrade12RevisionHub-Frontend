import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: VAT AND INVENTORY VALUATION <span className="marks-indicator">45 marks</span></h2>

            <div className="question-number">2.1 Calculate VAT amount payable to SARS (9 marks)</div>

            <div className="sub-question">
                <h4>VAT Payable:</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q2_1_final_ans'] || ''}
                    onChange={(e) => onAnswerChange('q2_1_final_ans', e.target.value)}
                    placeholder="Enter amount in Rands"
                />
            </div>

            <div className="question-number">2.2 Mountain Bikes Stock Valuation (22 marks)</div>

            <div className="sub-question">
                <h4>2.2.1 Total Value of Closing Stock (King, Palo, Gama) (9 marks)</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q2_2_1_total_ans'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_1_total_ans', e.target.value)}
                    placeholder="Enter amount in Rands"
                />
            </div>

            <div className="sub-question">
                <h4>2.2.2 Explain TWO division of duties examples to prevent theft (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q2_2_2'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_2', e.target.value)}
                    rows="4"
                    placeholder="Enter Example 1 and Example 2..."
                />
            </div>

            <div className="sub-question">
                <h4>2.2.4 Calculate the value of closing stock (FIFO) for Energy Drinks (6 marks)</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q2_2_4_final_ans'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_4_final_ans', e.target.value)}
                    placeholder="Enter amount in Rands"
                />
            </div>

            <div className="sub-question">
                <h4>2.2.5 Calculate the stockholding period (in days) (3 marks)</h4>
                <input
                    type="number"
                    step="0.1"
                    className="answer-input"
                    value={answers['q2_2_5_ans'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_5_ans', e.target.value)}
                    placeholder="Enter number of days"
                />
            </div>

            <div className="sub-question">
                <h4>2.2.8 Advice on selling outdated stock at half cost (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q2_2_8'] || ''}
                    onChange={(e) => onAnswerChange('q2_2_8', e.target.value)}
                    rows="4"
                    placeholder="Provide TWO points of advice..."
                />
            </div>
        </div>
    );
};

export default Question2;
