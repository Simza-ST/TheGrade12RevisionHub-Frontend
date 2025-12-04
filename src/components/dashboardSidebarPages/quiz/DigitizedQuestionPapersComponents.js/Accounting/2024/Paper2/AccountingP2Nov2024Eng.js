import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import Results from './Results';
//import '../../Accounting.css';

function AccountingP2Nov2024Eng() {
    const [examTime, setExamTime] = useState(90 * 60); // 90 minutes in seconds
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState({
        totalScore: 0,
        percentage: 0,
        breakdown: ''
    });

    // Load saved progress
    useEffect(() => {
        const savedAnswers = localStorage.getItem('examProgressP2_2024');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);

    // Auto-save progress
    useEffect(() => {
        localStorage.setItem('examProgressP2_2024', JSON.stringify(answers));
    }, [answers]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const calculateScore = () => {
        let totalScore = 0;
        let marksBreakdown = '<h3>Marks Breakdown:</h3><ul>';

        // QUESTION 1: DEBTORS' RECONCILIATION, AGE ANALYSIS AND VAT (40 marks)
        const q1_true_false = ['q1_1_1', 'q1_1_2', 'q1_1_3'];
        let q1_tf_score = 0;
        q1_true_false.forEach(key => {
            if (answers[key] === 'true') {
                q1_tf_score += 1;
            }
        });
        totalScore += q1_tf_score;
        marksBreakdown += `<li>Question 1.1 (True/False): ${q1_tf_score}/3</li>`;

        // Q1.2.1 Debtors' Control Account Balance (5 marks)
        if (answers['q1_2_1'] && !isNaN(Number(answers['q1_2_1']))) {
            const studentAns = Number(answers['q1_2_1']);
            const correct = 355300;
            if (Math.abs(studentAns - correct) < 10) {
                totalScore += 5;
                marksBreakdown += `<li>Question 1.2.1 (Debtors' Control): 5/5</li>`;
            } else {
                marksBreakdown += `<li>Question 1.2.1 (Debtors' Control): 0/5</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 1.2.1 (Debtors' Control): 0/5</li>`;
        }

        // Q1.2.2 Debtors' List (14 marks) - Placeholder: give 7 marks for attempt
        if (answers['q1_2_2'] && answers['q1_2_2'].length > 50) {
            totalScore += 7;
            marksBreakdown += `<li>Question 1.2.2 (Debtors' List): 7/14</li>`;
        } else {
            marksBreakdown += `<li>Question 1.2.2 (Debtors' List): 0/14</li>`;
        }

        // Q1.3.1 Comment (4 marks)
        if (answers['q1_3_1'] && answers['q1_3_1'].length > 30) {
            totalScore += 2;
            marksBreakdown += `<li>Question 1.3.1 (Comment): 2/4</li>`;
        } else {
            marksBreakdown += `<li>Question 1.3.1 (Comment): 0/4</li>`;
        }

        // Q1.3.2 Advice (4 marks)
        if (answers['q1_3_2'] && answers['q1_3_2'].length > 30) {
            totalScore += 2;
            marksBreakdown += `<li>Question 1.3.2 (Advice): 2/4</li>`;
        } else {
            marksBreakdown += `<li>Question 1.3.2 (Advice): 0/4</li>`;
        }

        // Q1.4 VAT Effect (10 marks)
        if (answers['q1_4'] && !isNaN(Number(answers['q1_4']))) {
            const studentAns = Number(answers['q1_4']);
            const correct = -16950;
            if (Math.abs(studentAns - correct) < 100) {
                totalScore += 10;
                marksBreakdown += `<li>Question 1.4 (VAT Effect): 10/10</li>`;
            } else {
                marksBreakdown += `<li>Question 1.4 (VAT Effect): 0/10</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 1.4 (VAT Effect): 0/10</li>`;
        }

        // QUESTION 2: STOCK VALUATION (35 marks)
        // Q2.1.1 Weighted Average Cost (5 marks)
        if (answers['q2_1_1'] && !isNaN(Number(answers['q2_1_1']))) {
            const studentAns = Number(answers['q2_1_1']);
            if (Math.abs(studentAns - 3500) < 10) {
                totalScore += 5;
                marksBreakdown += `<li>Question 2.1.1 (WAC): 5/5</li>`;
            } else {
                marksBreakdown += `<li>Question 2.1.1 (WAC): 0/5</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.1.1 (WAC): 0/5</li>`;
        }

        // Q2.1.2 Stolen Units (4 marks)
        if (answers['q2_1_2_units'] && !isNaN(Number(answers['q2_1_2_units']))) {
            const studentAns = Number(answers['q2_1_2_units']);
            if (Math.abs(studentAns - 110) < 5) {
                totalScore += 4;
                marksBreakdown += `<li>Question 2.1.2 (Stolen Units): 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 2.1.2 (Stolen Units): 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.1.2 (Stolen Units): 0/4</li>`;
        }

        // Q2.1.2 Stolen Value (2 marks)
        if (answers['q2_1_2_value'] && !isNaN(Number(answers['q2_1_2_value']))) {
            const studentAns = Number(answers['q2_1_2_value']);
            if (Math.abs(studentAns - 385000) < 1000) {
                totalScore += 2;
                marksBreakdown += `<li>Question 2.1.2 (Stolen Value): 2/2</li>`;
            } else {
                marksBreakdown += `<li>Question 2.1.2 (Stolen Value): 0/2</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.1.2 (Stolen Value): 0/2</li>`;
        }

        // Q2.1.3 FIFO Value (5 marks)
        if (answers['q2_1_3'] && !isNaN(Number(answers['q2_1_3']))) {
            const studentAns = Number(answers['q2_1_3']);
            if (Math.abs(studentAns - 3485250) < 1000) {
                totalScore += 5;
                marksBreakdown += `<li>Question 2.1.3 (FIFO): 5/5</li>`;
            } else {
                marksBreakdown += `<li>Question 2.1.3 (FIFO): 0/5</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.1.3 (FIFO): 0/5</li>`;
        }

        // Q2.2.1 Markup (3 marks)
        if (answers['q2_2_1_markup'] && !isNaN(Number(answers['q2_2_1_markup']))) {
            const studentAns = Number(answers['q2_2_1_markup']);
            if (Math.abs(studentAns - 84) < 2) {
                totalScore += 3;
                marksBreakdown += `<li>Question 2.2.1 (Markup): 3/3</li>`;
            } else {
                marksBreakdown += `<li>Question 2.2.1 (Markup): 0/3</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.2.1 (Markup): 0/3</li>`;
        }

        // Q2.2.3 Stock Holding Period (4 marks)
        if (answers['q2_2_3'] && !isNaN(Number(answers['q2_2_3']))) {
            const studentAns = Number(answers['q2_2_3']);
            if (Math.abs(studentAns - 17.8) < 0.5) {
                totalScore += 4;
                marksBreakdown += `<li>Question 2.2.3 (SHP): 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 2.2.3 (SHP): 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.2.3 (SHP): 0/4</li>`;
        }

        // QUESTION 3: BUDGETING (40 marks)
        // Q3.2.2 Calculations (15 marks total for i-v)
        const q3_calculations = [
            { key: 'q3_3_i', correct: 30740, marks: 2 },
            { key: 'q3_3_ii', correct: 2800, marks: 4 },
            { key: 'q3_3_iii', correct: 88200, marks: 3 },
            { key: 'q3_3_iv', correct: 22400, marks: 3 },
            { key: 'q3_3_v', correct: 103500, marks: 3 }
        ];

        let q3_calc_score = 0;
        q3_calculations.forEach(({ key, correct, marks }) => {
            if (answers[key] && !isNaN(Number(answers[key]))) {
                const studentAns = Number(answers[key]);
                if (Math.abs(studentAns - correct) < 100) {
                    q3_calc_score += marks;
                }
            }
        });
        totalScore += q3_calc_score;
        marksBreakdown += `<li>Question 3.2.2 (Calculations i-v): ${q3_calc_score}/15</li>`;

        // Q3.1 Cash Budget & Statement (6 marks)
        if (answers['q3_1'] && answers['q3_1'].length > 30) {
            totalScore += 3;
            marksBreakdown += `<li>Question 3.1 (Cash Budget): 3/6</li>`;
        } else {
            marksBreakdown += `<li>Question 3.1 (Cash Budget): 0/6</li>`;
        }

        // Q3.2.3 Sales Policy (9 marks)
        if (answers['q3_2_3_a'] && answers['q3_2_3_a'].length > 30) {
            totalScore += 2;
            marksBreakdown += `<li>Question 3.2.3 (a): 2/2</li>`;
        } else {
            marksBreakdown += `<li>Question 3.2.3 (a): 0/2</li>`;
        }

        if (answers['q3_2_3_b'] && answers['q3_2_3_b'].length > 50) {
            totalScore += 2;
            marksBreakdown += `<li>Question 3.2.3 (b): 2/4</li>`;
        } else {
            marksBreakdown += `<li>Question 3.2.3 (b): 0/4</li>`;
        }

        if (answers['q3_2_3_c'] && answers['q3_2_3_c'].length > 30) {
            totalScore += 2;
            marksBreakdown += `<li>Question 3.2.3 (c): 2/4</li>`;
        } else {
            marksBreakdown += `<li>Question 3.2.3 (c): 0/4</li>`;
        }

        // QUESTION 4: COST ACCOUNTING (35 marks)
        // Q4.1.1 Direct Material Cost (4 marks)
        if (answers['q4_1_1'] && !isNaN(Number(answers['q4_1_1']))) {
            const studentAns = Number(answers['q4_1_1']);
            if (Math.abs(studentAns - 933333) < 1000) {
                totalScore += 4;
                marksBreakdown += `<li>Question 4.1.1 (DM Cost): 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 4.1.1 (DM Cost): 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 4.1.1 (DM Cost): 0/4</li>`;
        }

        // Q4.1.2 Direct Labour Cost (7 marks)
        if (answers['q4_1_2'] && !isNaN(Number(answers['q4_1_2']))) {
            const studentAns = Number(answers['q4_1_2']);
            if (Math.abs(studentAns - 1074260) < 1000) {
                totalScore += 7;
                marksBreakdown += `<li>Question 4.1.2 (DL Cost): 7/7</li>`;
            } else {
                marksBreakdown += `<li>Question 4.1.2 (DL Cost): 0/7</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 4.1.2 (DL Cost): 0/7</li>`;
        }

        // Q4.2.4 New Price (4 marks)
        if (answers['q4_2_4'] && !isNaN(Number(answers['q4_2_4']))) {
            const studentAns = Number(answers['q4_2_4']);
            if (Math.abs(studentAns - 1256.14) < 10) {
                totalScore += 4;
                marksBreakdown += `<li>Question 4.2.4 (New Price): 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 4.2.4 (New Price): 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 4.2.4 (New Price): 0/4</li>`;
        }

        marksBreakdown += '</ul>';

        return { totalScore, breakdown: marksBreakdown };
    };

    const handleSubmit = () => {
        const { totalScore, breakdown } = calculateScore();
        setResults({
            totalScore,
            percentage: ((totalScore / 150) * 100).toFixed(1),
            breakdown
        });
        setShowResults(true);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all answers? This action cannot be undone.')) {
            setAnswers({});
            localStorage.removeItem('examProgressP2_2024');
            setShowResults(false);
        }
    };

    return (
        <div className="App">
            <Timer examTime={examTime} setExamTime={setExamTime}/>

            <div className="container">
                <div className="header">
                    <h1>NATIONAL SENIOR CERTIFICATE</h1>
                    <h2>GRADE 12</h2>
                    <h2>ACCOUNTING P2</h2>
                    <h3>NOVEMBER 2024</h3>
                    <p>MARKS: 150 &nbsp;&nbsp;&nbsp; TIME: 1 hour 30 minutes</p>
                    <p>This question paper consists of 4 questions.</p>
                </div>

                <div className="instructions">
                    <h3>INSTRUCTIONS AND INFORMATION</h3>
                    <p>Read the following instructions carefully and follow them precisely.</p>
                    <ol>
                        <li>Answer ALL questions.</li>
                        <li>Show ALL workings to earn part-marks.</li>
                        <li>You may use a non-programmable calculator.</li>
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
                            <td>Debtors' Reconciliation, Age Analysis and VAT</td>
                            <td>40</td>
                            <td>35</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Stock Valuation</td>
                            <td>35</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Budgeting</td>
                            <td>40</td>
                            <td>35</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Cost Accounting</td>
                            <td>35</td>
                            <td>25</td>
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

                {!showResults ? (
                    <>
                        <Question1 answers={answers} onAnswerChange={handleAnswerChange}/>
                        <Question2 answers={answers} onAnswerChange={handleAnswerChange}/>
                        <Question3 answers={answers} onAnswerChange={handleAnswerChange}/>
                        <Question4 answers={answers} onAnswerChange={handleAnswerChange}/>

                        <div className="btn-container">
                            <button type="button" className="clear-btn" onClick={handleClear}>
                                Clear All Answers
                            </button>
                            <button type="button" className="submit-btn" onClick={handleSubmit}>
                                Submit Answers
                            </button>
                            <button type="button" className="index-btn">
                                <a href="/">Dashboard</a>
                            </button>
                        </div>
                    </>
                ) : (
                    <Results results={results} onRetake={handleClear}/>
                )}

                <div className="copyright">
                    <p>Copyright reserved</p>
                </div>
            </div>
            <style jsx>{`
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 20px;
                    background-color: #f5f7fa;
                    color: #333;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    background-color: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }

                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #2c3e50;
                    padding-bottom: 20px;
                }

                h1, h2, h3, h4 {
                    color: #2c3e50;
                }

                h1 {
                    font-size: 28px;
                    margin-bottom: 10px;
                }

                h2 {
                    font-size: 22px;
                    margin-top: 35px;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #ddd;
                }

                h3 {
                    font-size: 20px;
                    margin-top: 25px;
                    margin-bottom: 15px;
                }

                h4 {
                    font-size: 18px;
                    margin-top: 20px;
                    margin-bottom: 15px;
                }

                .question {
                    margin-bottom: 40px;
                    padding-bottom: 25px;
                    border-bottom: 1px solid #eee;
                }

                .answer-input {
                    width: 100%;
                    padding: 10px;
                    margin: 8px 0;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 15px;
                    transition: border 0.3s;
                }

                .answer-input:focus {
                    border-color: #3498db;
                    outline: none;
                    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
                }

                textarea.answer-input {
                    min-height: 100px;
                    resize: vertical;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 15px 0;
                    font-size: 15px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }

                th {
                    background-color: #f2f6fc;
                    font-weight: bold;
                    color: #2c3e50;
                }

                .submit-btn {
                    background: linear-gradient(to right, #3498db, #2980b9);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 30px;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    transition: all 0.3s;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 8px rgba(0,0,0,0.15);
                    background: linear-gradient(to right, #2980b9, #2471a3);
                }

                .results-card {
                    margin-top: 40px;
                    padding: 25px;
                    border-radius: 8px;
                    background: linear-gradient(to right, #d4edda, #c3e6cb);
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .marks-breakdown {
                    margin-top: 25px;
                }

                .marks-breakdown ul {
                    padding-left: 25px;
                }

                .marks-breakdown li {
                    margin-bottom: 12px;
                    font-size: 16px;
                }

                .instructions {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                    border-left: 5px solid #3498db;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }

                .note {
                    font-style: italic;
                    color: #666;
                    margin: 15px 0;
                    padding: 15px;
                    background-color: #f9f9f9;
                    border-left: 4px solid #f39c12;
                    border-radius: 4px;
                }

                .info-box {
                    background-color: #f0f8ff;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                    border-left: 5px solid #3498db;
                }

                .question-number {
                    background-color: #2c3e50;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-bottom: 10px;
                }

                .marks-indicator {
                    display: inline-block;
                    background-color: #3498db;
                    color: white;
                    padding: 3px 8px;
                    border-radius: 3px;
                    font-size: 14px;
                    margin-left: 10px;
                }

                .score-display {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 15px 0;
                    text-align: center;
                }

                .grade {
                    font-size: 20px;
                    text-align: center;
                    margin-bottom: 20px;
                }

                .calculation-table {
                    width: 100%;
                    margin: 15px 0;
                }

                .calculation-table td {
                    padding: 10px;
                    vertical-align: top;
                }

                .workings-cell {
                    width: 70%;
                }

                .answer-cell {
                    width: 30%;
                }

                .financial-statement {
                    background-color: #f8f9fa;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                }

                .statement-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .statement-table td {
                    padding: 8px;
                    border-bottom: 1px solid #ddd;
                }

                .statement-table .line-item {
                    padding-left: 20px;
                }

                .statement-table .total {
                    font-weight: bold;
                    border-top: 2px solid #2c3e50;
                }

                @media print {
                    .submit-btn, .results-card {
                        display: none !important;
                    }
                }

                @media (max-width: 768px) {
                    .container {
                        padding: 15px;
                    }

                    table {
                        font-size: 14px;
                    }

                    th, td {
                        padding: 8px;
                    }
                }

                .clear-btn {
                    background: linear-gradient(to right, #e74c3c, #c0392b);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 20px;
                    margin-right: 10px;
                    transition: all 0.3s;
                }

                .clear-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    background: linear-gradient(to right, #c0392b, #a93226);
                }

                .retake-btn {
                    background: linear-gradient(to right, #e74c3c, #c0392b);
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    margin-top: 20px;
                    transition: all 0.3s;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                }

                .retake-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    background: linear-gradient(to right, #c0392b, #a93226);
                }

                .btn-container {
                    display: flex;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 30px;
                }

                .timer {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #e74c3c;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 5px;
                    font-weight: bold;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    z-index: 1000;
                }

                .progress-bar {
                    height: 5px;
                    background: #ecf0f1;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    z-index: 999;
                }

                .progress {
                    height: 100%;
                    background: #3498db;
                    width: 0%;
                    transition: width 0.5s;
                }

                .breakdown {
                    margin-top: 20px;
                }

                .breakdown ul {
                    list-style: none;
                    padding: 0;
                }

                .breakdown li {
                    padding: 8px 0;
                    border-bottom: 1px solid #ddd;
                }

                .copyright {
                    text-align: center;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                    color: #666;
                }
            `}</style>
        </div>
    );
}

export default AccountingP2Nov2024Eng;