import React from 'react';

const Question2 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 2: COST ACCOUNTING <span className="marks-indicator">35 marks</span></h2>

            <div className="question-number">2.1 TZFIT MANUFACTURERS</div>
            <p>The business, owned by Mark Fit, manufactures T-shirts. The financial year ended on 28 February 2023.</p>

            <div className="info-box">
                <h4>INFORMATION A: Stock records:</h4>

                <p><strong>(i) Raw material (fabric to manufacture T-shirts):</strong></p>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>METRES</th>
                        <th>AMOUNT (R)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Stock balance on 1 March 2022</td>
                        <td>1 600 m</td>
                        <td>64 800</td>
                    </tr>
                    <tr>
                        <td>Purchases</td>
                        <td>18 800 m</td>
                        <td>894 000</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">2.1.1</div>
            <p>Calculate the direct material cost.</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q2-1-1-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-1-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-1-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.1.2</div>
            <p>Calculate the factory overhead costs for the year by completing the table below.</p>
            <table>
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Calculation</th>
                    <th>Amount (R)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Incorrect total</td>
                    <td></td>
                    <td>600 000</td>
                </tr>
                <tr>
                    <td>Indirect material adjustment</td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-2-indirect-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-2-indirect-workings', e.target.value)}
                            placeholder="Workings"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-2-indirect-amount'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-2-indirect-amount', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                <tr>
                    <td><strong>Correct total for factory overhead costs</strong></td>
                    <td></td>
                    <td>
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-2-total'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-2-total', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.1.4</div>
            <p>Calculate the cost of the wastage of raw materials.</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q2-1-4-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-4-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-1-4-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-1-4-answer', e.target.value)}
                            placeholder="R"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.1.5</div>
            <p>Mark is concerned about the increase in the cost of raw materials over the financial year. Provide TWO strategies that Mark can use to address the problem of wastage.</p>
            <textarea
                className="answer-input"
                value={answers['q2-1-5-answer'] || ''}
                onChange={(e) => onAnswerChange('q2-1-5-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">2.2 LIGHTING KINGS (PTY) LTD</div>
            <p>The business manufactures light bulbs. Richard Smith, the CEO (chief executive officer), intended to reduce the production cost of Orion bulbs due to technological changes and to introduce the new Starlet bulbs by setting up a new factory.</p>

            <div className="info-box">
                <h4>INFORMATION:</h4>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th colSpan="2">FACTORY A ORION</th>
                        <th>FACTORY B STARLET</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>2023</td>
                        <td>2022</td>
                        <td>2023</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Number of units produced and sold</td>
                        <td>163 000</td>
                        <td>198 860</td>
                        <td>225 000</td>
                    </tr>
                    <tr>
                        <td>Total cost of production per unit</td>
                        <td>R36,00</td>
                        <td>R28,54</td>
                        <td>R49,04</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="question-number">2.2.1</div>
            <p>Do a calculation to confirm that the 2023 break-even point of 149 145 units for Orion bulbs is correct.</p>
            <table className="calculation-table">
                <tbody>
                <tr>
                    <td className="workings-cell">
                        <strong>Workings:</strong><br />
                        <textarea
                            className="answer-input"
                            value={answers['q2-2-1-workings'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-workings', e.target.value)}
                            placeholder="Show your calculations here..."
                        />
                    </td>
                    <td className="answer-cell">
                        <strong>Answer:</strong><br />
                        <input
                            type="text"
                            className="answer-input"
                            value={answers['q2-2-1-answer'] || ''}
                            onChange={(e) => onAnswerChange('q2-2-1-answer', e.target.value)}
                            placeholder="Confirmed / Not confirmed"
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">2.2.2</div>
            <p>Identify and explain TWO cost items (with figures) that may have contributed to the increase in the cost of production per unit. Provide a reason in each case. Note that the current inflation rate is 7%.</p>
            <textarea
                className="answer-input"
                value={answers['q2-2-2-answer'] || ''}
                onChange={(e) => onAnswerChange('q2-2-2-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">2.2.3</div>
            <p>Explain whether the new Starlet bulbs were a good idea or not. Provide TWO points. Quote figures.</p>
            <textarea
                className="answer-input"
                value={answers['q2-2-3-answer'] || ''}
                onChange={(e) => onAnswerChange('q2-2-3-answer', e.target.value)}
                placeholder="Your answer..."
            />
        </div>
    );
};

export default Question2;

