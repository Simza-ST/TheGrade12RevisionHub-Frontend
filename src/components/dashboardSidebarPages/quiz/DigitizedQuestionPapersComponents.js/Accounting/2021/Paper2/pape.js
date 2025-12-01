import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import FormulaSheet from './FormulaSheet';
import '../../Accounting.css';

function Pape() {
    const [examTime, setExamTime] = useState(90 * 60);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [marksBreakdown, setMarksBreakdown] = useState({});

    useEffect(() => {
        const savedAnswers = localStorage.getItem('examProgressP2');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('examProgressP2', JSON.stringify(answers));
    }, [answers]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const calculateScore = (answers) => {
        let totalScore = 0;
        const breakdown = {};

        // Your existing scoring logic here (keeping it the same)
        // Question 1.1 (2 marks)
        let q1_1_score = 0;
        if (answers['q1-1-1'] && answers['q1-1-1'].trim().length > 0) q1_1_score += 1;
        if (answers['q1-1-2'] && answers['q1-1-2'].trim().length > 0) q1_1_score += 1;
        totalScore += q1_1_score;
        breakdown['1.1'] = { score: q1_1_score, max: 2 };

        // Question 1.2 (18 marks)
        let q1_2_score = 0;
        if (answers['q1-2-i-amount'] === '1750' && answers['q1-2-i-change'] === '+') q1_2_score += 1;
        if (answers['q1-2-ii-amount'] === '2500' && answers['q1-2-ii-change'] === '0') q1_2_score += 1;
        if (answers['q1-2-iii-amount'] === '2700' && answers['q1-2-iii-change'] === '-') q1_2_score += 1;
        if (answers['q1-2-iv-amount'] === '7000' && answers['q1-2-iv-change'] === '+') q1_2_score += 1;
        if (answers['q1-2-v-amount'] === '5200' && answers['q1-2-v-change'] === '-') q1_2_score += 1;
        if (answers['q1-2-vi-amount'] === '450' && answers['q1-2-vi-change'] === '+') q1_2_score += 1;
        if (answers['q1-2-vii-amount'] === '7850' && answers['q1-2-vii-change'] === '0') q1_2_score += 1;
        if (answers['q1-2-final'] === '228700') q1_2_score += 2;
        if (answers['q1-2-barnes-amount'] === '15450') q1_2_score += 3;
        if (answers['q1-2-davis-amount'] === '35000') q1_2_score += 3;
        if (answers['q1-2-foley-amount'] === '8650') q1_2_score += 3;
        totalScore += q1_2_score;
        breakdown['1.2'] = { score: q1_2_score, max: 18 };

        // Continue with all your other scoring logic...
        // [Keep all your existing calculateScore logic here]
        // Question 1.3 (6 marks)
        let q1_3_score = 0;
        if (answers['q1-3-1-problem'] && answers['q1-3-1-problem'].length > 10 &&
            answers['q1-3-1-debtor'] && answers['q1-3-1-debtor'].length > 5) q1_3_score += 2;
        if (answers['q1-3-2-problem'] && answers['q1-3-2-problem'].length > 10 &&
            answers['q1-3-2-debtor'] && answers['q1-3-2-debtor'].length > 5) q1_3_score += 2;
        if (answers['q1-3-3-problem'] && answers['q1-3-3-problem'].length > 10 &&
            answers['q1-3-3-debtor'] && answers['q1-3-3-debtor'].length > 5) q1_3_score += 2;
        totalScore += q1_3_score;
        breakdown['1.3'] = { score: q1_3_score, max: 6 };

        // Question 1.4 (4 marks)
        let q1_4_score = 0;
        if (answers['q1-4-1'] && answers['q1-4-1'].length > 10) q1_4_score += 2;
        if (answers['q1-4-2'] && answers['q1-4-2'].length > 10) q1_4_score += 2;
        totalScore += q1_4_score;
        breakdown['1.4'] = { score: q1_4_score, max: 4 };

        // Question 2.1.1 (10 marks)
        let q2_1_1_score = 0;
        if (answers['q2-1-1-dmc'] === '1494000') q2_1_1_score += 2;
        if (answers['q2-1-1-dlc'] === '830000') q2_1_1_score += 2;
        if (answers['q2-1-1-prime'] === '2324000') q2_1_1_score += 2;
        if (answers['q2-1-1-foh'] === '560000') q2_1_1_score += 2;
        if (answers['q2-1-1-cop'] === '2884000') q2_1_1_score += 2;
        totalScore += q2_1_1_score;
        breakdown['2.1.1'] = { score: q2_1_1_score, max: 10 };

        // Question 2.1.2 (11 marks)
        let q2_1_2_score = 0;
        if (answers['q2-1-2-sales'] === '4433600') q2_1_2_score += 1;
        if (answers['q2-1-2-cos'] === '2860000') q2_1_2_score += 2;
        if (answers['q2-1-2-gp'] === '1573600') q2_1_2_score += 1;
        if (answers['q2-1-2-oe'] === '0') q2_1_2_score += 1;
        if (answers['q2-1-2-sdc'] === '260000') q2_1_2_score += 2;
        if (answers['q2-1-2-admin'] === '210000') q2_1_2_score += 2;
        if (answers['q2-1-2-np'] === '1103600') q2_1_2_score += 2;
        totalScore += q2_1_2_score;
        breakdown['2.1.2'] = { score: q2_1_2_score, max: 11 };

        // Question 2.2.1 (8 marks)
        let q2_2_1_score = 0;
        if (answers['q2-2-1-missing'] === '200') q2_2_1_score += 2;
        if (answers['q2-2-1-wasted'] === '100') q2_2_1_score += 2;
        if (answers['q2-2-1-strategy1'] && answers['q2-2-1-strategy1'].length > 10) q2_2_1_score += 2;
        if (answers['q2-2-1-strategy2'] && answers['q2-2-1-strategy2'].length > 10) q2_2_1_score += 2;
        totalScore += q2_2_1_score;
        breakdown['2.2.1'] = { score: q2_2_1_score, max: 8 };

        // Question 2.2.2 (6 marks)
        let q2_2_2_score = 0;
        if (answers['q2-2-2-answer'] === '36000') q2_2_2_score += 3;
        if (answers['q2-2-2-explanation'] && answers['q2-2-2-explanation'].length > 10) q2_2_2_score += 3;
        totalScore += q2_2_2_score;
        breakdown['2.2.2'] = { score: q2_2_2_score, max: 6 };

        // Question 2.3 (4 marks)
        let q2_3_score = 0;
        if (answers['q2-3-answer'] === '667' || answers['q2-3-answer'] === '666.7') q2_3_score += 4;
        totalScore += q2_3_score;
        breakdown['2.3'] = { score: q2_3_score, max: 4 };

        // Question 3.1 (4 marks)
        let q3_1_score = 0;
        if (answers['q3-1-1'] && answers['q3-1-1'].toUpperCase() === 'D') q3_1_score += 1;
        if (answers['q3-1-2'] && answers['q3-1-2'].toUpperCase() === 'B') q3_1_score += 1;
        if (answers['q3-1-3'] && answers['q3-1-3'].toUpperCase() === 'A') q3_1_score += 1;
        if (answers['q3-1-4'] && answers['q3-1-4'].toUpperCase() === 'C') q3_1_score += 1;
        totalScore += q3_1_score;
        breakdown['3.1'] = { score: q3_1_score, max: 4 };

        // Question 3.2 (20 marks) - Simplified scoring
        let q3_2_score = 0;
        if (answers['q3-2-oct-membership'] === '240000') q3_2_score += 2;
        if (answers['q3-2-nov-membership'] === '246000') q3_2_score += 2;
        if (answers['q3-2-dec-membership'] === '243000') q3_2_score += 2;
        // Award additional marks for completion of cash budget
        if (answers['q3-2-dec-end'] && answers['q3-2-dec-end'].length > 0) q3_2_score += 14;
        totalScore += q3_2_score;
        breakdown['3.2'] = { score: q3_2_score, max: 20 };

        // Question 3.3 (4 marks)
        let q3_3_score = 0;
        if (answers['q3-3-1'] && answers['q3-3-1'].length > 10) q3_3_score += 2;
        if (answers['q3-3-2'] && answers['q3-3-2'].length > 10) q3_3_score += 2;
        totalScore += q3_3_score;
        breakdown['3.3'] = { score: q3_3_score, max: 4 };

        // Question 4.1 (4 marks)
        let q4_1_score = 0;
        if (answers['q4-1-1'] && answers['q4-1-1'].toUpperCase() === 'B') q4_1_score += 1;
        if (answers['q4-1-2'] && answers['q4-1-2'].toUpperCase() === 'A') q4_1_score += 1;
        if (answers['q4-1-3'] && answers['q4-1-3'].toUpperCase() === 'C') q4_1_score += 1;
        if (answers['q4-1-4'] && answers['q4-1-4'].toUpperCase() === 'D') q4_1_score += 1;
        totalScore += q4_1_score;
        breakdown['4.1'] = { score: q4_1_score, max: 4 };

        // Question 4.2.1 (8 marks)
        let q4_2_1_score = 0;
        if (answers['q4-2-1-delivery-amount'] === '48000') q4_2_1_score += 3;
        if (answers['q4-2-1-bakery-amount'] === '52500') q4_2_1_score += 3;
        if (answers['q4-2-1-total'] === '100500') q4_2_1_score += 2;
        totalScore += q4_2_1_score;
        breakdown['4.2.1'] = { score: q4_2_1_score, max: 8 };

        // Question 4.2.2 (12 marks) - Simplified scoring
        let q4_2_2_score = 0;
        if (answers['q4-2-2-vehicles-balance'] === '600000') q4_2_2_score += 2;
        if (answers['q4-2-2-vehicles-end'] === '640000') q4_2_2_score += 2;
        if (answers['q4-2-2-accdep-balance'] === '262000') q4_2_2_score += 2;
        if (answers['q4-2-2-accdep-end'] === '234500') q4_2_2_score += 2;
        // Award additional marks for completion
        q4_2_2_score += 4;
        totalScore += q4_2_2_score;
        breakdown['4.2.2'] = { score: q4_2_2_score, max: 12 };

        // Question 4.2.3 (6 marks)
        let q4_2_3_score = 0;
        if (answers['q4-2-3-answer'] === '7000' || answers['q4-2-3-answer'] === '7000 profit') q4_2_3_score += 6;
        totalScore += q4_2_3_score;
        breakdown['4.2.3'] = { score: q4_2_3_score, max: 6 };

        // Question 4.3 (4 marks)
        let q4_3_score = 0;
        if (answers['q4-3-1'] && answers['q4-3-1'].length > 10) q4_3_score += 2;
        if (answers['q4-3-2'] && answers['q4-3-2'].length > 10) q4_3_score += 2;
        totalScore += q4_3_score;
        breakdown['4.3'] = { score: q4_3_score, max: 4 };

        return { totalScore, breakdown };
    };

    const handleSubmit = () => {
        const { totalScore, breakdown } = calculateScore(answers);
        setScore(totalScore);
        setMarksBreakdown(breakdown);
        setShowResult(true);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all answers?')) {
            setAnswers({});
            localStorage.removeItem('examProgressP2');
            setShowResult(false);
            setScore(0);
            setMarksBreakdown({});
        }
    };

    return (
        <div className="App">
            <Timer examTime={examTime} setExamTime={setExamTime} />

            <div className="container">
                <header className="header">
                    <h1>NATIONAL SENIOR CERTIFICATE</h1>
                    <h2>GRADE 12</h2>
                    <h2>ACCOUNTING P2</h2>
                    <h3>NOVEMBER 2021</h3>
                    <p>MARKS: 150 &nbsp;&nbsp;&nbsp; TIME: 2 hours</p>
                    <p>This question paper consists of 14 pages, a formula sheet and a 12-page answer book.</p>
                </header>

                <div className="instructions">
                    <h3>INSTRUCTIONS AND INFORMATION</h3>
                    <p>Read the following instructions carefully and follow them precisely.</p>
                    <ol>
                        <li>Answer ALL questions.</li>
                        <li>A special ANSWER BOOK is provided in which to answer ALL questions.</li>
                        <li>Show ALL workings to earn part-marks.</li>
                        <li>You may use a non-programmable calculator.</li>
                        <li>You may use a dark pencil or blue/black ink to answer questions.</li>
                        <li>Where applicable, show ALL calculations to ONE decimal point.</li>
                        <li>If you choose to do so, you may use the Financial Indicator Formula Sheet attached at the end of this question paper. The use of this formula sheet is NOT compulsory.</li>
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
                            <td>Debtors' Reconciliation and Age Analysis</td>
                            <td>30</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Cost Accounting</td>
                            <td>45</td>
                            <td>35</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Budgeting</td>
                            <td>35</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Inventories and Fixed Assets</td>
                            <td>40</td>
                            <td>30</td>
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

                {!showResult ? (
                    // Show the exam questions
                    <div id="exam-form">
                        <Question1 answers={answers} onAnswerChange={handleAnswerChange} />
                        <Question2 answers={answers} onAnswerChange={handleAnswerChange} />
                        <Question3 answers={answers} onAnswerChange={handleAnswerChange} />
                        <Question4 answers={answers} onAnswerChange={handleAnswerChange} />
                        <FormulaSheet />

                        <div className="btn-container">
                            <button type="button" className="clear-btn" onClick={handleClear}>
                                Clear All Answers
                            </button>
                            <button type="button" className="submit-btn" onClick={handleSubmit}>
                                Submit Answers
                            </button>
                        </div>
                    </div>
                ) : (
                    // Show the results like in the first code
                    <div className="results-card">
                        <h3>EXAM RESULTS</h3>
                        <div className="marks-display">
                            <h2>Total Marks: {score} / 150</h2>
                            <p>Percentage: {((score / 150) * 100).toFixed(2)}%</p>
                            <div className="grade">
                                {score >= 120 ? 'A - Outstanding!' :
                                    score >= 105 ? 'B - Good!' :
                                        score >= 90 ? 'C - Satisfactory' :
                                            score >= 75 ? 'D - Adequate' : 'E - Needs Improvement'}
                            </div>
                        </div>

                        {/* Optional: Show detailed breakdown */}
                        <div className="breakdown">
                            <h4>Marks Breakdown:</h4>
                            <ul>
                                {Object.entries(marksBreakdown).map(([question, data]) => (
                                    <li key={question}>
                                        Question {question}: {data.score} / {data.max}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button type="button" className="retake-btn" onClick={handleClear}>
                            Retake Exam
                        </button>
                    </div>
                )}

                <div className="copyright">
                    <p>Copyright reserved</p>
                </div>
            </div>
        </div>
    );
}
export default Pape;
