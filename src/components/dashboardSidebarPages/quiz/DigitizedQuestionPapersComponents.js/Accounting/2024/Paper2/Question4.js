
import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: COST ACCOUNTING <span className="marks-indicator">35 marks</span></h2>

            <div className="question-number">4.1 FLOWERPOTS MANUFACTURERS (19 marks)</div>

            <div className="grid-2">
                <div className="sub-question">
                    <h4>4.1.1 Calculate the direct/raw material cost (4 marks)</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q4_1_1'] || ''}
                        onChange={(e) => onAnswerChange('q4_1_1', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>

                <div className="sub-question">
                    <h4>4.1.2 Calculate the direct labour cost (7 marks)</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q4_1_2'] || ''}
                        onChange={(e) => onAnswerChange('q4_1_2', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>
            </div>

            <div className="sub-question">
                <h4>4.1.3 Complete the Factory Overhead Cost Note (8 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q4_1_3'] || ''}
                    onChange={(e) => onAnswerChange('q4_1_3', e.target.value)}
                    rows="6"
                    placeholder="Enter your workings and final amounts..."
                />
            </div>

            <div className="question-number">4.2 TIMEPIECE MANUFACTURERS (16 marks)</div>

            <div className="sub-question">
                <h4>4.2.1 Comment on the level of production and break-even point (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q4_2_1'] || ''}
                    onChange={(e) => onAnswerChange('q4_2_1', e.target.value)}
                    rows="4"
                    placeholder="Enter your comment..."
                />
            </div>

            <div className="sub-question">
                <h4>4.2.2 Comment on the gross profit and price charged (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q4_2_2'] || ''}
                    onChange={(e) => onAnswerChange('q4_2_2', e.target.value)}
                    rows="4"
                    placeholder="Enter your comment..."
                />
            </div>

            <div className="sub-question">
                <h4>4.2.3 Identify TWO main costs and provide a strategy for each (4 marks)</h4>
                <textarea
                    className="answer-input"
                    value={answers['q4_2_3'] || ''}
                    onChange={(e) => onAnswerChange('q4_2_3', e.target.value)}
                    rows="4"
                    placeholder="Enter your answer..."
                />
            </div>

            <div className="sub-question">
                <h4>4.2.4 Calculate the new price to charge (4 marks)</h4>
                <input
                    type="number"
                    step="0.01"
                    className="answer-input"
                    value={answers['q4_2_4'] || ''}
                    onChange={(e) => onAnswerChange('q4_2_4', e.target.value)}
                    placeholder="Enter price in Rands"
                />
            </div>
        </div>
    );
};

export default Question4;
