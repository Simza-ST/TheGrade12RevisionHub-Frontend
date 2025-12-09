import React from 'react';

const Instructions = () => {
    return (
        <div className="instructions">
            <h3>INSTRUCTIONS AND INFORMATION</h3>
            <p>Read the instructions carefully before answering the questions.</p>
            <ol>
                <li>This question paper consists of FIVE sections.</li>
                <li>Answer ALL the questions.</li>
                <li>Start EACH question on a NEW page.</li>
                <li>In QUESTION 3.1, round off your answers to TWO decimal places.</li>
                <li>Show ALL calculations.</li>
                <li>You may use a non-programmable calculator.</li>
                <li>Use the mark allocation of each question as a guide to the length of your answer.</li>
                <li>Write neatly and legibly.</li>
            </ol>

            <table className="time-guide">
                <thead>
                <tr>
                    <th>SECTION</th>
                    <th>TOPIC</th>
                    <th>MARKS</th>
                    <th>TIME (minutes)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>A</td>
                    <td>Short Questions</td>
                    <td>40</td>
                    <td>20</td>
                </tr>
                <tr>
                    <td>B</td>
                    <td>Map Work and Tour Planning; Foreign Exchange</td>
                    <td>50</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>C</td>
                    <td>Tourism Attractions; Culture and Heritage Tourism; Marketing</td>
                    <td>50</td>
                    <td>50</td>
                </tr>
                <tr>
                    <td>D</td>
                    <td>Tourism Sectors; Sustainable and Responsible Tourism</td>
                    <td>30</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>E</td>
                    <td>Domestic, Regional and International Tourism; Communication and Customer Care</td>
                    <td>30</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td colSpan="2"><strong>TOTAL</strong></td>
                    <td><strong>200</strong></td>
                    <td><strong>180</strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Instructions;


