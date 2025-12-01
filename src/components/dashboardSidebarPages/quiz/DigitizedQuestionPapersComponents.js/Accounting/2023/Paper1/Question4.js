
import React from 'react';

const Question4 = ({ answers, onAnswerChange }) => {
    return (
        <div className="question">
            <h2>QUESTION 4: CORPORATE GOVERNANCE <span className="marks-indicator">15 marks</span></h2>

            <div className="info-box">
                <h4>MONACO LTD: A WHISTLE-BLOWER'S STORY</h4>
                <p>Eight months ago, internal auditor Sally Bolden was fired after exposing board chairperson Glen Turner and CFO Rachel Donovan for irregular payments of R3 500 million to companies linked to them.</p>

                <p><strong>Key facts:</strong></p>
                <ul>
                    <li>Sally introduced internal control measures that turned R500 million loss (2021) into R280 million profit (2022)</li>
                    <li>New board appointed, chaired by Turner</li>
                    <li>Turner claims Sally was fired for "bringing company into disrepute"</li>
                    <li>Board investigating to identify other whistle-blowers</li>
                    <li>External auditors found further R200 million in irregular payments</li>
                    <li>Turner and Donovan manipulated policies to appoint friends to board</li>
                </ul>
            </div>

            <div className="question-number">4.1</div>
            <p>Auditing: (4 marks)</p>
            <p><strong>(a)</strong> Explain ONE duty of an internal auditor. (2 marks)</p>
            <textarea
                className="answer-input"
                id="q4-1a-answer"
                value={answers['q4-1a-answer'] || ''}
                onChange={(e) => onAnswerChange('q4-1a-answer', e.target.value)}
                placeholder="Your answer..."
            />
            <p><strong>(b)</strong> Give ONE reason why listed companies must be audited by external auditors. (2 marks)</p>
            <textarea
                className="answer-input"
                id="q4-1b-answer"
                value={answers['q4-1b-answer'] || ''}
                onChange={(e) => onAnswerChange('q4-1b-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">4.2</div>
            <p>Whistle-blowers: What would you say to Sally about her statement that whistle-blowers regret taking a stand? Explain ONE point. (2 marks)</p>
            <textarea
                className="answer-input"
                id="q4-2-answer"
                value={answers['q4-2-answer'] || ''}
                onChange={(e) => onAnswerChange('q4-2-answer', e.target.value)}
                placeholder="Your answer..."
            />

            <div className="question-number">4.3</div>
            <p>As a shareholder, explain THREE points that concern you about Monaco Ltd's board actions. Give reasons. (9 marks)</p>
            <table>
                <thead>
                <tr>
                    <th>Concern</th>
                    <th>Reason</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><textarea
                        className="answer-input"
                        id="q4-3-concern1"
                        value={answers['q4-3-concern1'] || ''}
                        onChange={(e) => onAnswerChange('q4-3-concern1', e.target.value)}
                        placeholder="Concern 1"
                    /></td>
                    <td><textarea
                        className="answer-input"
                        id="q4-3-reason1"
                        value={answers['q4-3-reason1'] || ''}
                        onChange={(e) => onAnswerChange('q4-3-reason1', e.target.value)}
                        placeholder="Reason 1"
                    /></td>
                </tr>
                <tr>
                    <td><textarea
                        className="answer-input"
                        id="q4-3-concern2"
                        value={answers['q4-3-concern2'] || ''}
                        onChange={(e) => onAnswerChange('q4-3-concern2', e.target.value)}
                        placeholder="Concern 2"
                    /></td>
                    <td><textarea
                        className="answer-input"
                        id="q4-3-reason2"
                        value={answers['q4-3-reason2'] || ''}
                        onChange={(e) => onAnswerChange('q4-3-reason2', e.target.value)}
                        placeholder="Reason 2"
                    /></td>
                </tr>
                <tr>
                    <td><textarea
                        className="answer-input"
                        id="q4-3-concern3"
                        value={answers['q4-3-concern3'] || ''}
                        onChange={(e) => onAnswerChange('q4-3-concern3', e.target.value)}
                        placeholder="Concern 3"
                    /></td>
                    <td><textarea
                        className="answer-input"
                        id="q4-3-reason3"
                        value={answers['q4-3-reason3'] || ''}
                        onChange={(e) => onAnswerChange('q4-3-reason3', e.target.value)}
                        placeholder="Reason 3"
                    /></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Question4;
