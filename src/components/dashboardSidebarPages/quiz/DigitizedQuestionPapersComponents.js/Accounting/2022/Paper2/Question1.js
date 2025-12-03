import React from 'react';

const Question1 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 1: COST ACCOUNTING <span className="marks-indicator">35 marks</span></h2>

            <div className="question-number">1.1 Choose a cost category example (4 marks)</div>
            <p>Match the item in the question to the letter in the memo (A-E):</p>

            <div className="grid-2">
                <div className="input-group">
                    <label>1.1.1 Administration:</label>
                    <select
                        className="answer-input"
                        value={answers['q1_1_1'] || ''}
                        onChange={(e) => onAnswerChange('q1_1_1', e.target.value)}
                    >
                        <option value="">Select letter (A-E)</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>1.1.2 Direct material:</label>
                    <select
                        className="answer-input"
                        value={answers['q1_1_2'] || ''}
                        onChange={(e) => onAnswerChange('q1_1_2', e.target.value)}
                    >
                        <option value="">Select letter (A-E)</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>1.1.3 Selling and distribution:</label>
                    <select
                        className="answer-input"
                        value={answers['q1_1_3'] || ''}
                        onChange={(e) => onAnswerChange('q1_1_3', e.target.value)}
                    >
                        <option value="">Select letter (A-E)</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>1.1.4 Factory overhead:</label>
                    <select
                        className="answer-input"
                        value={answers['q1_1_4'] || ''}
                        onChange={(e) => onAnswerChange('q1_1_4', e.target.value)}
                    >
                        <option value="">Select letter (A-E)</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </div>
            </div>

            <div className="question-number">1.2.1 Calculate Costs (17 marks)</div>

            <div className="grid-2">
                <div className="sub-question">
                    <h4>Direct Labour Cost (7 marks):</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q1_2_1_dlc_ans'] || ''}
                        onChange={(e) => onAnswerChange('q1_2_1_dlc_ans', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>

                <div className="sub-question">
                    <h4>Factory Overhead Cost (6 marks):</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q1_2_1_foc_ans'] || ''}
                        onChange={(e) => onAnswerChange('q1_2_1_foc_ans', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>

                <div className="sub-question">
                    <h4>Total Cost of Production (4 marks):</h4>
                    <input
                        type="number"
                        className="answer-input"
                        value={answers['q1_2_1_tc_ans'] || ''}
                        onChange={(e) => onAnswerChange('q1_2_1_tc_ans', e.target.value)}
                        placeholder="Enter amount in Rands"
                    />
                </div>
            </div>

            <div className="sub-question">
                <h4>1.2.2 Explain why Annie should not be concerned about fixed costs increase (4 marks)</h4>
                <p>Provide TWO points with figures:</p>
                <textarea
                    className="answer-input"
                    value={answers['q1_2_2'] || ''}
                    onChange={(e) => onAnswerChange('q1_2_2', e.target.value)}
                    rows="4"
                    placeholder="Enter your explanation..."
                />
            </div>

            <div className="sub-question">
                <h4>1.2.3 Comment on the production bonus received (6 marks)</h4>
                <p>Provide THREE points with figures:</p>
                <textarea
                    className="answer-input"
                    value={answers['q1_2_3'] || ''}
                    onChange={(e) => onAnswerChange('q1_2_3', e.target.value)}
                    rows="4"
                    placeholder="Enter your comment..."
                />
            </div>

            <div className="sub-question">
                <h4>1.2.4 Calculate additional units to achieve R50 000 profit (4 marks)</h4>
                <input
                    type="number"
                    className="answer-input"
                    value={answers['q1_2_4'] || ''}
                    onChange={(e) => onAnswerChange('q1_2_4', e.target.value)}
                    placeholder="Enter number of units"
                />
            </div>
        </div>
    );
};
export default Question1;
