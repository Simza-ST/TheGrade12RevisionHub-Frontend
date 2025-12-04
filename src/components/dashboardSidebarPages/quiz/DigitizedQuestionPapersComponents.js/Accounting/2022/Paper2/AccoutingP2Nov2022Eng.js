
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import Results from './Results';
//import '../../Accounting.css';

function AccountingP2Nov2022Eng() {
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
        const savedAnswers = localStorage.getItem('examProgressP2_2022');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);

    // Auto-save progress
    useEffect(() => {
        localStorage.setItem('examProgressP2_2022', JSON.stringify(answers));
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

        // QUESTION 1.1 (4 marks)
        const q1_1_answers = ['q1_1_1', 'q1_1_2', 'q1_1_3', 'q1_1_4'];
        let q1_1_score = 0;
        q1_1_answers.forEach(key => {
            if (answers[key] === 'C' || answers[key] === 'D' || answers[key] === 'E' || answers[key] === 'B') {
                q1_1_score += 1;
            }
        });
        totalScore += q1_1_score;
        marksBreakdown += `<li>Question 1.1 (Multiple Choice): ${q1_1_score}/4</li>`;

        // QUESTION 1.2.1 (17 marks)
        if (answers['q1_2_1_dlc_ans'] && !isNaN(Number(answers['q1_2_1_dlc_ans']))) {
            const studentAns = Number(answers['q1_2_1_dlc_ans']);
            if (Math.abs(studentAns - 491648) < 100) {
                totalScore += 7;
                marksBreakdown += `<li>Question 1.2.1 (Direct Labour Cost): 7/7</li>`;
            } else {
                marksBreakdown += `<li>Question 1.2.1 (Direct Labour Cost): 0/7</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 1.2.1 (Direct Labour Cost): 0/7</li>`;
        }

        if (answers['q1_2_1_foc_ans'] && !isNaN(Number(answers['q1_2_1_foc_ans']))) {
            const studentAns = Number(answers['q1_2_1_foc_ans']);
            if (Math.abs(studentAns - 537600) < 100) {
                totalScore += 6;
                marksBreakdown += `<li>Question 1.2.1 (Factory Overhead Cost): 6/6</li>`;
            } else {
                marksBreakdown += `<li>Question 1.2.1 (Factory Overhead Cost): 0/6</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 1.2.1 (Factory Overhead Cost): 0/6</li>`;
        }

        if (answers['q1_2_1_tc_ans'] && !isNaN(Number(answers['q1_2_1_tc_ans']))) {
            const studentAns = Number(answers['q1_2_1_tc_ans']);
            if (Math.abs(studentAns - 1682048) < 100) {
                totalScore += 4;
                marksBreakdown += `<li>Question 1.2.1 (Total Cost of Production): 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 1.2.1 (Total Cost of Production): 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 1.2.1 (Total Cost of Production): 0/4</li>`;
        }

        // QUESTION 1.2.2 (4 marks)
        if (answers['q1_2_2'] && answers['q1_2_2'].length > 30) {
            totalScore += 2;
            marksBreakdown += `<li>Question 1.2.2 (Fixed Costs Explanation): 2/4</li>`;
        } else {
            marksBreakdown += `<li>Question 1.2.2 (Fixed Costs Explanation): 0/4</li>`;
        }

        // QUESTION 1.2.3 (6 marks)
        if (answers['q1_2_3'] && answers['q1_2_3'].length > 50) {
            totalScore += 3;
            marksBreakdown += `<li>Question 1.2.3 (Production Bonus Comment): 3/6</li>`;
        } else {
            marksBreakdown += `<li>Question 1.2.3 (Production Bonus Comment): 0/6</li>`;
        }

        // QUESTION 1.2.4 (4 marks)
        if (answers['q1_2_4'] && !isNaN(Number(answers['q1_2_4']))) {
            totalScore += 2;
            marksBreakdown += `<li>Question 1.2.4 (Additional Units): 2/4</li>`;
        } else {
            marksBreakdown += `<li>Question 1.2.4 (Additional Units): 0/4</li>`;
        }

        // QUESTION 2.1 VAT (9 marks)
        if (answers['q2_1_final_ans'] && !isNaN(Number(answers['q2_1_final_ans']))) {
            const studentAns = Number(answers['q2_1_final_ans']);
            if (Math.abs(studentAns - 52875) < 10) {
                totalScore += 9;
                marksBreakdown += `<li>Question 2.1 (VAT Payable): 9/9</li>`;
            } else {
                marksBreakdown += `<li>Question 2.1 (VAT Payable): 0/9</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.1 (VAT Payable): 0/9</li>`;
        }

        // QUESTION 2.2.1 Stock Valuation (9 marks)
        if (answers['q2_2_1_total_ans'] && !isNaN(Number(answers['q2_2_1_total_ans']))) {
            const studentAns = Number(answers['q2_2_1_total_ans']);
            if (Math.abs(studentAns - 1112000) < 100) {
                totalScore += 9;
                marksBreakdown += `<li>Question 2.2.1 (Closing Stock Value): 9/9</li>`;
            } else {
                marksBreakdown += `<li>Question 2.2.1 (Closing Stock Value): 0/9</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.2.1 (Closing Stock Value): 0/9</li>`;
        }

        // QUESTION 2.2.4 FIFO (6 marks)
        if (answers['q2_2_4_final_ans'] && !isNaN(Number(answers['q2_2_4_final_ans']))) {
            const studentAns = Number(answers['q2_2_4_final_ans']);
            if (Math.abs(studentAns - 112230) < 10) {
                totalScore += 6;
                marksBreakdown += `<li>Question 2.2.4 (FIFO Closing Stock): 6/6</li>`;
            } else {
                marksBreakdown += `<li>Question 2.2.4 (FIFO Closing Stock): 0/6</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.2.4 (FIFO Closing Stock): 0/6</li>`;
        }

        // QUESTION 2.2.5 Stockholding Period (3 marks)
        if (answers['q2_2_5_ans'] && !isNaN(Number(answers['q2_2_5_ans']))) {
            const studentAns = Number(answers['q2_2_5_ans']);
            if (Math.abs(studentAns - 101.4) < 1) {
                totalScore += 3;
                marksBreakdown += `<li>Question 2.2.5 (Stockholding Period): 3/3</li>`;
            } else {
                marksBreakdown += `<li>Question 2.2.5 (Stockholding Period): 0/3</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 2.2.5 (Stockholding Period): 0/3</li>`;
        }

        // QUESTION 3.2 Missing Figures (10 marks)
        if (answers['q3_2_i'] && !isNaN(Number(answers['q3_2_i']))) {
            const studentAns = Number(answers['q3_2_i']);
            if (Math.abs(studentAns - 450450) < 10) {
                totalScore += 2;
                marksBreakdown += `<li>Question 3.2 (i) Collection from debtors: 2/2</li>`;
            } else {
                marksBreakdown += `<li>Question 3.2 (i) Collection from debtors: 0/2</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 3.2 (i) Collection from debtors: 0/2</li>`;
        }

        if (answers['q3_2_ii'] && !isNaN(Number(answers['q3_2_ii']))) {
            const studentAns = Number(answers['q3_2_ii']);
            if (Math.abs(studentAns - 33750) < 10) {
                totalScore += 4;
                marksBreakdown += `<li>Question 3.2 (ii) Rent income: 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 3.2 (ii) Rent income: 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 3.2 (ii) Rent income: 0/4</li>`;
        }

        if (answers['q3_2_iii'] && !isNaN(Number(answers['q3_2_iii']))) {
            const studentAns = Number(answers['q3_2_iii']);
            if (Math.abs(studentAns - 39000) < 10) {
                totalScore += 4;
                marksBreakdown += `<li>Question 3.2 (iii) Salaries: 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 3.2 (iii) Salaries: 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 3.2 (iii) Salaries: 0/4</li>`;
        }

        // QUESTION 3.3.1 Deposit (5 marks)
        if (answers['q3_3_1_ans'] && !isNaN(Number(answers['q3_3_1_ans']))) {
            const studentAns = Number(answers['q3_3_1_ans']);
            if (Math.abs(studentAns - 151200) < 10) {
                totalScore += 5;
                marksBreakdown += `<li>Question 3.3.1 (Vehicle Deposit): 5/5</li>`;
            } else {
                marksBreakdown += `<li>Question 3.3.1 (Vehicle Deposit): 0/5</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 3.3.1 (Vehicle Deposit): 0/5</li>`;
        }

        // QUESTION 4.1 True/False (3 marks)
        const q4_1_answers = ['q4_1_1', 'q4_1_2', 'q4_1_3'];
        let q4_1_score = 0;
        q4_1_answers.forEach(key => {
            if (answers[key] === 'True' || answers[key] === 'False') {
                q4_1_score += 1;
            }
        });
        totalScore += q4_1_score;
        marksBreakdown += `<li>Question 4.1 (True/False): ${q4_1_score}/3</li>`;

        // QUESTION 4.2.2 Bank Balance (4 marks)
        if (answers['q4_2_2_ans'] && !isNaN(Number(answers['q4_2_2_ans']))) {
            const studentAns = Number(answers['q4_2_2_ans']);
            if (Math.abs(studentAns - 20520) < 10) {
                totalScore += 4;
                marksBreakdown += `<li>Question 4.2.2 (Correct Bank Balance): 4/4</li>`;
            } else {
                marksBreakdown += `<li>Question 4.2.2 (Correct Bank Balance): 0/4</li>`;
            }
        } else {
            marksBreakdown += `<li>Question 4.2.2 (Correct Bank Balance): 0/4</li>`;
        }

        // Other questions - placeholder marks
        const placeholderQuestions = [
            { key: 'q2_2_2', name: '2.2.2 (Division of Duties)', marks: 2 },
            { key: 'q2_2_8', name: '2.2.8 (Outdated Stock Advice)', marks: 2 },
            { key: 'q3_4', name: '3.4 (Mark-up & Advertising)', marks: 2 },
            { key: 'q3_5_1', name: '3.5.1 (Repairs & Maintenance)', marks: 1 },
            { key: 'q3_6', name: '3.6 (Online Payments)', marks: 1 },
            { key: 'q4_2_3_recon', name: '4.2.3 (Bank Reconciliation)', marks: 4 }
        ];

        placeholderQuestions.forEach(({ key, name, marks }) => {
            if (answers[key] && answers[key].length > 20) {
                totalScore += marks;
                marksBreakdown += `<li>${name}: ${marks}/${marks}</li>`;
            } else {
                marksBreakdown += `<li>${name}: 0/${marks}</li>`;
            }
        });

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
            localStorage.removeItem('examProgressP2_2022');
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
                    <h3>NOVEMBER 2022</h3>
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
                            <td>Cost Accounting</td>
                            <td>35</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>VAT and Inventory Valuation</td>
                            <td>45</td>
                            <td>35</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Budgeting</td>
                            <td>45</td>
                            <td>35</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Bank Reconciliation</td>
                            <td>25</td>
                            <td>20</td>
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

export default AccountingP2Nov2022Eng;
