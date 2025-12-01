import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: CORPORATE GOVERNANCE <span className="marks-indicator">20 marks</span></h2>

            <div className="question-number">4.1</div>
            <p>Explain why a disclaimer audit report would be bad for a company's reputation. Provide TWO points. (4)</p>
            <p>POINT 1:
                <textarea
                    className="answer-input"
                    value={answers['q4-1-1'] || ''}
                    onChange={(e) => onAnswerChange('q4-1-1', e.target.value)}
                    placeholder="Enter your answer"
                />
            </p>
            <p>POINT 2:
                <textarea
                    className="answer-input"
                    value={answers['q4-1-2'] || ''}
                    onChange={(e) => onAnswerChange('q4-1-2', e.target.value)}
                    placeholder="Enter your answer"
                />
            </p>

            <div className="question-number">4.2</div>
            <p>One of the most important decisions that shareholders have to make at the annual general meeting (AGM) is to appoint directors to serve on the board.</p>
            <p>- Explain why the shareholders have been given this responsibility. (2)</p>
            <textarea
                className="answer-input"
                value={answers['q4-2a'] || ''}
                onChange={(e) => onAnswerChange('q4-2a', e.target.value)}
                rows="3"
                placeholder="Enter your answer here"
            />

            <p>- If you were a shareholder, what factors or characteristics would you want to find out about the directors who would get your vote? Explain TWO points and give a reason for EACH. (6)</p>
            <table>
                <thead>
                <tr>
                    <th>Explanation</th>
                    <th>Reason</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q4-2b-exp1'] || ''}
                  onChange={(e) => onAnswerChange('q4-2b-exp1', e.target.value)}
                  placeholder="Point 1"
              />
                    </td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q4-2b-reason1'] || ''}
                  onChange={(e) => onAnswerChange('q4-2b-reason1', e.target.value)}
                  placeholder="Reason for point 1"
              />
                    </td>
                </tr>
                <tr>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q4-2b-exp2'] || ''}
                  onChange={(e) => onAnswerChange('q4-2b-exp2', e.target.value)}
                  placeholder="Point 2"
              />
                    </td>
                    <td>
              <textarea
                  className="answer-input"
                  value={answers['q4-2b-reason2'] || ''}
                  onChange={(e) => onAnswerChange('q4-2b-reason2', e.target.value)}
                  placeholder="Reason for point 2"
              />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className="question-number">4.3</div>
            <p>A recent news report stated that a major company, Baxco Ltd, had been awarded a tender to supply equipment worth R20 m to a chain of private hospitals. The report accuses the CFO (chief financial officer) of that company of paying R2 m in cash to the CEO of the hospital group.</p>
            <p>As a shareholder, explain what you would say at the AGM. Provide TWO points. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q4-3'] || ''}
                onChange={(e) => onAnswerChange('q4-3', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />

            <div className="question-number">4.4</div>
            <p>A major South African company has stated the following on its website and in its Directors' Report.</p>
            <div className="note">
                <p><em>We have set up ways for employees and external stakeholders to report unethical conduct and incidents of individuals not complying with the company's ethical policies.</em></p>
                <p><em>We have set up a tip-off phone line (call centre) controlled by an independent service provider.</em></p>
                <p><em>All information will be treated confidentially. Whistle-blowers (informants) who submit genuine information will be protected and will remain anonymous.</em></p>
            </div>
            <p>In your opinion, explain why this major company found it necessary to implement this policy. Provide TWO points. (4)</p>
            <textarea
                className="answer-input"
                value={answers['q4-4'] || ''}
                onChange={(e) => onAnswerChange('q4-4', e.target.value)}
                rows="4"
                placeholder="Enter your answer here"
            />
        </div>
    );
};

export default Question4;

