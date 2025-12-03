
import React from 'react';

const Question3 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 3: BUDGETING <span className="marks-indicator">45 marks</span></h2>

            <div className="question-number">3.2 Calculate missing figures in the Cash Budget (10 marks)</div>

            <div className="grid-2">
                <div className="sub-question">
                    <h4>(i) Collection from debtors: December 2022</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q3_2_i'] || ''}
                        onChange={(e) => onAnswerChange('q3_2_i', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>

                <div className="sub-question">
                    <h4>(ii) Rent income: December 2022</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q3_2_ii'] || ''}
                        onChange={(e) => onAnswerChange('q3_2_ii', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>

                <div className="sub-question">
                    <h4>(iii) Salaries: November 2022</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q3_2_iii'] || ''}
                        onChange={(e) => onAnswerChange('q3_2_iii', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>
            </div>

            <div className="question-number">3.3.1 Calculate the deposit for the company vehicle (5 marks)</div>

            <div className="sub-question">
                <h4>Deposit Amount:</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q3_3_1_ans'] || ''}
                    onChange={(e) => onAnswerChange('q3_3_1_ans', e.target.value)}
                    placeholder="Enter amount in Rands"
                />
            </div>

            <div className="sub-question">
                <h4>3.4 Comment on Mark-up % and Advertising decisions in Oct 2022 (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q3_4'] || ''}
                    onChange={(e) => onAnswerChange('q3_4', e.target.value)}
                    rows="4"
                    placeholder="Provide TWO points with figures/calculations..."
                />
            </div>

            <div className="sub-question">
                <h4>3.5.1 Explain concern about actual amount spent on Repairs and Maintenance (2 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q3_5_1'] || ''}
                    onChange={(e) => onAnswerChange('q3_5_1', e.target.value)}
                    rows="3"
                    placeholder="Explain with a figure/calculation..."
                />
            </div>

            <div className="sub-question">
                <h4>3.6 Name THREE additional payments for an online shopping platform (3 marks)</h4>
                <input
                    type="text"
                    className="answer-input"
                    value={answers['q3_6'] || ''}
                    onChange={(e) => onAnswerChange('q3_6', e.target.value)}
                    placeholder="e.g., website maintenance, hosting fee, courier services"
                />
            </div>
        </div>
    );
};

export default Question3;

