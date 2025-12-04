
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
//import '../../Accounting.css';

function Exam() {
    const [examTime, setExamTime] = useState(90 * 60);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [marksBreakdown, setMarksBreakdown] = useState({});

    useEffect(() => {
        const savedAnswers = localStorage.getItem('examProgressP1');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('examProgressP1', JSON.stringify(answers));
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

        // Question 1 - Company Financial Statements (55 marks)
        let q1_score = 0;

        // Question 1.1 - FIFO Calculation (6 marks)
        const q1_1_workings = answers['q1-1-workings'] || '';
        const q1_1_answer = answers['q1-1-answer'] || '';
        if (q1_1_workings.length > 20) q1_score += 3;
        if (q1_1_answer !== '') q1_score += 3;
        breakdown['1.1'] = { score: q1_score, max: 6 };

        // Question 1.2 - Financial Statements (24 marks)
        let q1_2_score = 0;
        const q1_2_fields = ['q1-2-cos', 'q1-2-gp', 'q1-2-commission', 'q1-2-fee', 'q1-2-bad-debts',
            'q1-2-sundry', 'q1-2-salaries', 'q1-2-depreciation', 'q1-2-sundry-exp',
            'q1-2-stock-deficit', 'q1-2-rent', 'q1-2-directors-fees', 'q1-2-interest-income',
            'q1-2-pbie', 'q1-2-interest-exp'];
        q1_2_fields.forEach(field => {
            if (answers[field] && answers[field].toString().trim() !== '') q1_2_score += 1.6;
        });
        q1_score += Math.round(q1_2_score);
        breakdown['1.2'] = { score: Math.round(q1_2_score), max: 24 };

        // Question 1.3 - Financial Position (25 marks)
        let q1_3_score = 0;
        const q1_3_fields = ['q1-3-fixed-assets', 'q1-3-fixed-deposit', 'q1-3-inventories', 'q1-3-receivables',
            'q1-3-cash', 'q1-3-total-assets', 'q1-3-retained-income', 'q1-3-payables',
            'q1-3-sars-tax', 'q1-3-dividends', 'q1-3-total-equity-liabilities'];
        q1_3_fields.forEach(field => {
            if (answers[field] && answers[field].toString().trim() !== '') q1_3_score += 2.27;
        });
        q1_score += Math.round(q1_3_score);
        breakdown['1.3'] = { score: Math.round(q1_3_score), max: 25 };

        totalScore += q1_score;
        breakdown['1'] = { score: q1_score, max: 55 };

        // Question 2 - Cash Flow and Financial Indicators (35 marks)
        let q2_score = 0;

        // Question 2.1 - Share Capital Note (7 marks)
        const q2_1_answer = answers['q2-1-answer'] || '';
        let q2_1_score = 0;
        if (q2_1_answer.length > 100) q2_1_score += 7;
        else if (q2_1_answer.length > 50) q2_1_score += 4;
        q2_score += q2_1_score;
        breakdown['2.1'] = { score: q2_1_score, max: 7 };

        // Question 2.2 - Cash Flow (16 marks)
        let q2_2_score = 0;
        const q2_2_fields = ['q2-2-cash-from-ops', 'q2-2-dividends-paid', 'q2-2-tax-paid',
            'q2-2-shares-issued', 'q2-2-shares-repurchased', 'q2-2-loan-change'];
        q2_2_fields.forEach(field => {
            if (answers[field] && answers[field].toString().trim() !== '') q2_2_score += 2.67;
        });
        q2_score += Math.round(q2_2_score);
        breakdown['2.2'] = { score: Math.round(q2_2_score), max: 16 };

        // Question 2.3 - Financial Indicators (12 marks)
        let q2_3_score = 0;
        const q2_3_fields = ['q2-3-nav-workings', 'q2-3-nav-answer', 'q2-3-dpr-workings',
            'q2-3-dpr-answer', 'q2-3-rose-workings', 'q2-3-rose-answer'];
        q2_3_fields.forEach(field => {
            if (answers[field] && answers[field].toString().trim() !== '') q2_3_score += 2;
        });
        q2_score += q2_3_score;
        breakdown['2.3'] = { score: q2_3_score, max: 12 };

        totalScore += q2_score;
        breakdown['2'] = { score: q2_score, max: 35 };

        // Question 3 - Interpretation (45 marks)
        let q3_score = 0;

        // Question 3.1 - Matching (3 marks)
        let q3_1_score = 0;
        const q3_1_1 = (answers['q3-1-1'] || '').trim().toUpperCase();
        const q3_1_2 = (answers['q3-1-2'] || '').trim().toUpperCase();
        const q3_1_3 = (answers['q3-1-3'] || '').trim().toUpperCase();
        if (q3_1_1 === 'C') q3_1_score += 1;
        if (q3_1_2 === 'D') q3_1_score += 1;
        if (q3_1_3 === 'B') q3_1_score += 1;
        q3_score += q3_1_score;
        breakdown['3.1'] = { score: q3_1_score, max: 3 };

        // Question 3.2 (5 marks)
        const q3_2_answer = answers['q3-2-answer'] || '';
        let q3_2_score = 0;
        if (q3_2_answer.length > 80) q3_2_score += 5;
        else if (q3_2_answer.length > 40) q3_2_score += 3;
        q3_score += q3_2_score;
        breakdown['3.2'] = { score: q3_2_score, max: 5 };

        // Question 3.3 (8 marks)
        let q3_3_score = 0;
        const q3_3a_answer = answers['q3-3a-answer'] || '';
        const q3_3b_answer = answers['q3-3b-answer'] || '';
        if (q3_3a_answer.length > 50) q3_3_score += 4;
        else if (q3_3a_answer.length > 25) q3_3_score += 2;
        if (q3_3b_answer.length > 50) q3_3_score += 4;
        else if (q3_3b_answer.length > 25) q3_3_score += 2;
        q3_score += q3_3_score;
        breakdown['3.3'] = { score: q3_3_score, max: 8 };

        // Question 3.4 (9 marks)
        let q3_4_score = 0;
        const q3_4a_answer = answers['q3-4a-answer'] || '';
        const q3_4b_answer = answers['q3-4b-answer'] || '';
        if (q3_4a_answer.length > 40) q3_4_score += 3;
        else if (q3_4a_answer.length > 20) q3_4_score += 1;
        if (q3_4b_answer.length > 80) q3_4_score += 6;
        else if (q3_4b_answer.length > 40) q3_4_score += 3;
        q3_score += q3_4_score;
        breakdown['3.4'] = { score: q3_4_score, max: 9 };

        // Question 3.5 (10 marks)
        let q3_5_score = 0;
        const q3_5a_answer = answers['q3-5a-answer'] || '';
        const q3_5b_answer = answers['q3-5b-answer'] || '';
        const q3_5c_answer = answers['q3-5c-answer'] || '';
        if (q3_5a_answer.length > 30) q3_5_score += 2;
        if (q3_5b_answer.length > 50) q3_5_score += 4;
        else if (q3_5b_answer.length > 25) q3_5_score += 2;
        if (q3_5c_answer.length > 50) q3_5_score += 4;
        else if (q3_5c_answer.length > 25) q3_5_score += 2;
        q3_score += q3_5_score;
        breakdown['3.5'] = { score: q3_5_score, max: 10 };

        // Question 3.6 (10 marks)
        let q3_6_score = 0;
        const q3_6a_answer = answers['q3-6a-answer'] || '';
        const q3_6b_answer = answers['q3-6b-answer'] || '';
        const q3_6c_answer = answers['q3-6c-answer'] || '';
        if (q3_6a_answer.length > 30) q3_6_score += 2;
        if (q3_6b_answer.length > 80) q3_6_score += 6;
        else if (q3_6b_answer.length > 40) q3_6_score += 3;
        if (q3_6c_answer.length > 30) q3_6_score += 2;
        q3_score += q3_6_score;
        breakdown['3.6'] = { score: q3_6_score, max: 10 };

        totalScore += q3_score;
        breakdown['3'] = { score: q3_score, max: 45 };

        // Question 4 - Corporate Governance (15 marks)
        let q4_score = 0;

        // Question 4.1 (4 marks)
        let q4_1_score = 0;
        const q4_1a_answer = answers['q4-1a-answer'] || '';
        const q4_1b_answer = answers['q4-1b-answer'] || '';
        if (q4_1a_answer.length > 30) q4_1_score += 2;
        if (q4_1b_answer.length > 30) q4_1_score += 2;
        q4_score += q4_1_score;
        breakdown['4.1'] = { score: q4_1_score, max: 4 };

        // Question 4.2 (2 marks)
        const q4_2_answer = answers['q4-2-answer'] || '';
        let q4_2_score = 0;
        if (q4_2_answer.length > 30) q4_2_score += 2;
        q4_score += q4_2_score;
        breakdown['4.2'] = { score: q4_2_score, max: 2 };

        // Question 4.3 (9 marks)
        let q4_3_score = 0;
        const q4_3_fields = ['q4-3-concern1', 'q4-3-reason1', 'q4-3-concern2', 'q4-3-reason2', 'q4-3-concern3', 'q4-3-reason3'];
        q4_3_fields.forEach(field => {
            if (answers[field] && answers[field].toString().length > 20) q4_3_score += 1.5;
        });
        q4_score += Math.round(q4_3_score);
        breakdown['4.3'] = { score: Math.round(q4_3_score), max: 9 };

        totalScore += q4_score;
        breakdown['4'] = { score: q4_score, max: 15 };

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
            localStorage.removeItem('examProgressP1');
            setShowResult(false);
            setScore(0);
            setMarksBreakdown({});
        }
    };

    return (
        <div className="App">
            <Timer examTime={examTime} setExamTime={setExamTime}/>

            <div className="container">
                <header className="header">
                    <h1>NATIONAL SENIOR CERTIFICATE</h1>
                    <h2>GRADE 12</h2>
                    <h2>ACCOUNTING P1</h2>
                    <h3>NOVEMBER 2023</h3>
                    <p>MARKS: 150 &nbsp;&nbsp;&nbsp; TIME: 2 hours</p>
                    <p>This question paper consists of 10 pages, a formula sheet and a 10-page answer book.</p>
                </header>

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
                            <td>Company Financial Statements</td>
                            <td>55</td>
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
                            <td>Interpretation of Financial Information</td>
                            <td>45</td>
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

                {!showResult ? (
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
                        </div>
                    </>
                ) : (
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
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
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
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .submit-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
                    background: linear-gradient(to right, #2980b9, #2471a3);
                }

                .results-card {
                    margin-top: 40px;
                    padding: 25px;
                    border-radius: 8px;
                    background: linear-gradient(to right, #d4edda, #c3e6cb);
                    color: #155724;
                    border: 1px solid #c3e6cb;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
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
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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

export default Exam;

