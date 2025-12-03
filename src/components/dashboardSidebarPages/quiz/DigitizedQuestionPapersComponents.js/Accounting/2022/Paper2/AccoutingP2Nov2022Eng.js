
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import Results from './Results';
import '../../Accounting.css';

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
            <Timer examTime={examTime} setExamTime={setExamTime} />

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
                        <Question1 answers={answers} onAnswerChange={handleAnswerChange} />
                        <Question2 answers={answers} onAnswerChange={handleAnswerChange} />
                        <Question3 answers={answers} onAnswerChange={handleAnswerChange} />
                        <Question4 answers={answers} onAnswerChange={handleAnswerChange} />

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
                    <Results results={results} onRetake={handleClear} />
                )}

                <div className="copyright">
                    <p>Copyright reserved</p>
                </div>
            </div>
        </div>
    );
}

export default AccountingP2Nov2022Eng;
