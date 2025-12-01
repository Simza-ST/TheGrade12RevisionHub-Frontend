import React from 'react';

const Instructions = () => {
    return (
        <div className="instructions">
            <h3>INSTRUCTIONS AND INFORMATION</h3>
            <p>Read the following instructions carefully and follow them precisely.</p>
            <ol>
                <li>Answer ALL questions.</li>
                <li>A special ANSWER BOOK is provided in which to answer ALL questions.</li>
                <li>A Financial Indicator Formula Sheet is attached at the end of this question paper.</li>
                <li>Show ALL workings to earn part-marks.</li>
                <li>You may use a non-programmable calculator.</li>
                <li>You may use a dark pencil or blue/black ink to answer questions.</li>
                <li>Where applicable, show ALL calculations to ONE decimal point.</li>
                <li>Write neatly and legibly.</li>
            </ol>

            <table>
                <thead>
                <tr>
                    <th>QUESTION</th>
                    <th>TOPIC</th>
                    <th>MARKS</th>
                    <th>MINUTES</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Company Financial Statements: Statement of Comprehensive Income and Statement of Financial Position</td>
                    <td>60</td>
                    <td>45</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Cash Flow Statement and Financial Indicators</td>
                    <td>35</td>
                    <td>25</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Interpretation of Financial Statements</td>
                    <td>40</td>
                    <td>35</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Corporate Governance</td>
                    <td>15</td>
                    <td>15</td>
                </tr>
                <tr>
                    <td><strong>TOTAL</strong></td>
                    <td></td>
                    <td><strong>150</strong></td>
                    <td><strong>120</strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Instructions;
