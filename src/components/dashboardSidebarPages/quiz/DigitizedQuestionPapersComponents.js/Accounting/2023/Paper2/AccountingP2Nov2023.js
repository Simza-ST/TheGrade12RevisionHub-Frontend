
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import Results from './Results';
//import '../../Accounting.css';

function AccountingP2Nov2023Eng() {
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
        const savedAnswers = localStorage.getItem('examProgressP2_2023_full');
        if (savedAnswers) {
            setAnswers(JSON.parse(savedAnswers));
        }
    }, []);

    // Auto-save progress
    useEffect(() => {
        localStorage.setItem('examProgressP2_2023_full', JSON.stringify(answers));
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

        // Question 1.1.1 (12 marks)
        let q1_1_1_score = 0;
        const q1_1_1_fields = [
            'q1-1-1a-receipts', 'q1-1-1a-payments', 'q1-1-1a-receipts-total', 'q1-1-1a-payments-total',
            'q1-1-1b-workings', 'q1-1-1b-answer'
        ];
        q1_1_1_fields.forEach(field => {
            if (answers[field]?.trim() !== '') q1_1_1_score += 2;
        });
        totalScore += q1_1_1_score;
        marksBreakdown += `<li>Question 1.1.1 (Cash Journals): ${q1_1_1_score}/12</li>`;

        // Question 1.1.2 (8 marks)
        const q1_1_2_answer = answers['q1-1-2-answer'] || '';
        let q1_1_2_score = 0;
        if (q1_1_2_answer.length > 100) q1_1_2_score += 8;
        else if (q1_1_2_answer.length > 50) q1_1_2_score += 4;
        totalScore += q1_1_2_score;
        marksBreakdown += `<li>Question 1.1.2 (Bank Reconciliation): ${q1_1_2_score}/8</li>`;

        // Question 1.1.3 (4 marks)
        const q1_1_3_answer = answers['q1-1-3-answer'] || '';
        let q1_1_3_score = 0;
        if (q1_1_3_answer.length > 50) q1_1_3_score += 4;
        else if (q1_1_3_answer.length > 25) q1_1_3_score += 2;
        totalScore += q1_1_3_score;
        marksBreakdown += `<li>Question 1.1.3 (Strategies): ${q1_1_3_score}/4</li>`;

        // Question 1.2.1 (9 marks)
        let q1_2_1_score = 0;
        const q1_2_1_fields = [
            'q1-2-1-i-control', 'q1-2-1-i-list', 'q1-2-1-ii-control', 'q1-2-1-ii-list',
            'q1-2-1-iii-control', 'q1-2-1-iii-list', 'q1-2-1-iv-control', 'q1-2-1-iv-list',
            'q1-2-1-v-control', 'q1-2-1-v-list', 'q1-2-1-control-total', 'q1-2-1-list-total'
        ];
        q1_2_1_fields.forEach(field => {
            if (answers[field]?.trim() !== '') q1_2_1_score += 0.75;
        });
        totalScore += Math.round(q1_2_1_score);
        marksBreakdown += `<li>Question 1.2.1 (Creditors' Reconciliation): ${Math.round(q1_2_1_score)}/9</li>`;

        // Question 1.2.2 (3 marks)
        const q1_2_2_workings = answers['q1-2-2-workings'] || '';
        const q1_2_2_answer = answers['q1-2-2-answer'] || '';
        let q1_2_2_score = 0;
        if (q1_2_2_workings.length > 20) q1_2_2_score += 2;
        if (q1_2_2_answer !== '') q1_2_2_score += 1;
        totalScore += q1_2_2_score;
        marksBreakdown += `<li>Question 1.2.2 (Amount Due): ${q1_2_2_score}/3</li>`;

        // Question 2.1.1 (4 marks)
        const q2_1_1_workings = answers['q2-1-1-workings'] || '';
        const q2_1_1_answer = answers['q2-1-1-answer'] || '';
        let q2_1_1_score = 0;
        if (q2_1_1_workings.length > 20) q2_1_1_score += 2;
        if (q2_1_1_answer !== '') q2_1_1_score += 2;
        totalScore += q2_1_1_score;
        marksBreakdown += `<li>Question 2.1.1 (Direct Material Cost): ${q2_1_1_score}/4</li>`;

        // Question 2.1.2 (7 marks)
        let q2_1_2_score = 0;
        const q2_1_2_fields = [
            'q2-1-2-indirect-workings', 'q2-1-2-indirect-amount', 'q2-1-2-water-workings',
            'q2-1-2-water-amount', 'q2-1-2-insurance-workings', 'q2-1-2-insurance-amount', 'q2-1-2-total'
        ];
        q2_1_2_fields.forEach(field => {
            if (answers[field]?.trim() !== '') q2_1_2_score += 1;
        });
        totalScore += Math.round(q2_1_2_score);
        marksBreakdown += `<li>Question 2.1.2 (Factory Overhead Costs): ${Math.round(q2_1_2_score)}/7</li>`;

        // Question 2.1.3 (5 marks)
        let q2_1_3_score = 0;
        const q2_1_3_fields = [
            'q2-1-3-dmc', 'q2-1-3-prime', 'q2-1-3-fohc', 'q2-1-3-tcop',
            'q2-1-3-subtotal', 'q2-1-3-copfg'
        ];
        q2_1_3_fields.forEach(field => {
            if (answers[field]?.trim() !== '') q2_1_3_score += 0.83;
        });
        totalScore += Math.round(q2_1_3_score);
        marksBreakdown += `<li>Question 2.1.3 (Production Cost Statement): ${Math.round(q2_1_3_score)}/5</li>`;

        // Question 2.1.4 (4 marks)
        const q2_1_4_workings = answers['q2-1-4-workings'] || '';
        const q2_1_4_answer = answers['q2-1-4-answer'] || '';
        let q2_1_4_score = 0;
        if (q2_1_4_workings.length > 20) q2_1_4_score += 2;
        if (q2_1_4_answer !== '') q2_1_4_score += 2;
        totalScore += q2_1_4_score;
        marksBreakdown += `<li>Question 2.1.4 (Raw Material Wastage): ${q2_1_4_score}/4</li>`;

        // Question 2.1.5 (2 marks)
        const q2_1_5_answer = answers['q2-1-5-answer'] || '';
        let q2_1_5_score = 0;
        if (q2_1_5_answer.length > 30) q2_1_5_score += 2;
        else if (q2_1_5_answer.length > 15) q2_1_5_score += 1;
        totalScore += q2_1_5_score;
        marksBreakdown += `<li>Question 2.1.5 (Strategies): ${q2_1_5_score}/2</li>`;

        // Question 2.2.1 (3 marks)
        const q2_2_1_workings = answers['q2-2-1-workings'] || '';
        const q2_2_1_answer = answers['q2-2-1-answer'] || '';
        let q2_2_1_score = 0;
        if (q2_2_1_workings.length > 20) q2_2_1_score += 2;
        if (q2_2_1_answer !== '') q2_2_1_score += 1;
        totalScore += q2_2_1_score;
        marksBreakdown += `<li>Question 2.2.1 (Break-even Confirmation): ${q2_2_1_score}/3</li>`;

        // Question 2.2.2 (6 marks)
        const q2_2_2_answer = answers['q2-2-2-answer'] || '';
        let q2_2_2_score = 0;
        if (q2_2_2_answer.length > 100) q2_2_2_score += 6;
        else if (q2_2_2_answer.length > 50) q2_2_2_score += 3;
        totalScore += q2_2_2_score;
        marksBreakdown += `<li>Question 2.2.2 (Cost Analysis): ${q2_2_2_score}/6</li>`;

        // Question 2.2.3 (4 marks)
        const q2_2_3_answer = answers['q2-2-3-answer'] || '';
        let q2_2_3_score = 0;
        if (q2_2_3_answer.length > 50) q2_2_3_score += 4;
        else if (q2_2_3_answer.length > 25) q2_2_3_score += 2;
        totalScore += q2_2_3_score;
        marksBreakdown += `<li>Question 2.2.3 (Starlet Bulbs Analysis): ${q2_2_3_score}/4</li>`;

        // Question 3.1 (4 marks)
        let q3_1_score = 0;
        const q3_1_fields = ['q3-1-a1', 'q3-1-a2', 'q3-1-b1', 'q3-1-b2'];
        q3_1_fields.forEach(field => {
            if (answers[field]?.trim() !== '') q3_1_score += 1;
        });
        totalScore += q3_1_score;
        marksBreakdown += `<li>Question 3.1 (Budget Items): ${q3_1_score}/4</li>`;

        // Question 3.2 (8 marks)
        const q3_2_answer = answers['q3-2-debtors-ans'] || '';
        let q3_2_score = 0;
        if (q3_2_answer !== '') q3_2_score += 8;
        totalScore += q3_2_score;
        marksBreakdown += `<li>Question 3.2 (Debtors Collection): ${q3_2_score}/8</li>`;

        // Question 3.3 (12 marks)
        let q3_3_score = 0;
        const q3_3_fields = ['q3-3-i-ans', 'q3-3-ii-ans', 'q3-3-iii-ans', 'q3-3-iv-ans'];
        q3_3_fields.forEach(field => {
            if (answers[field]?.trim() !== '') q3_3_score += 3;
        });
        totalScore += q3_3_score;
        marksBreakdown += `<li>Question 3.3 (Missing Amounts): ${q3_3_score}/12</li>`;

        // Question 3.4.1 (9 marks)
        const q3_4_1_c_answer = answers['q3-4-1-c'] || '';
        let q3_4_1_c_score = 0;
        if (q3_4_1_c_answer.length > 100) q3_4_1_c_score += 9;
        else if (q3_4_1_c_answer.length > 50) q3_4_1_c_score += 4;
        totalScore += q3_4_1_c_score;
        marksBreakdown += `<li>Question 3.4.1 (Commission Explanation): ${q3_4_1_c_score}/9</li>`;

        // Question 3.4.2 (7 marks)
        const q3_4_2_a_answer = answers['q3-4-2-a-ans'] || '';
        const q3_4_2_b_answer = answers['q3-4-2-b'] || '';
        let q3_4_2_score = 0;
        if (q3_4_2_a_answer !== '') q3_4_2_score += 5;
        if (q3_4_2_b_answer.length > 20) q3_4_2_score += 2;
        totalScore += q3_4_2_score;
        marksBreakdown += `<li>Question 3.4.2 (Property Purchase): ${q3_4_2_score}/7</li>`;

        // Question 4.1 (3 marks)
        let q4_1_score = 0;
        const q4_1_fields = ['q4-1-1-ans', 'q4-1-2-ans', 'q4-1-3-ans'];
        q4_1_fields.forEach(field => {
            if (answers[field]?.trim() !== '') q4_1_score += 1;
        });
        totalScore += q4_1_score;
        marksBreakdown += `<li>Question 4.1 (Stock Concepts): ${q4_1_score}/3</li>`;

        // Question 4.2.1 (6 marks)
        const q4_2_1_answer = answers['q4-2-1-final-ans'] || '';
        let q4_2_1_score = 0;
        if (q4_2_1_answer !== '') q4_2_1_score += 6;
        totalScore += q4_2_1_score;
        marksBreakdown += `<li>Question 4.2.1 (Closing Stock Value): ${q4_2_1_score}/6</li>`;

        // Question 4.2.2 (4 marks)
        const q4_2_2_answer = answers['q4-2-2-hawi-ans'] || '';
        let q4_2_2_score = 0;
        if (q4_2_2_answer !== '') q4_2_2_score += 4;
        totalScore += q4_2_2_score;
        marksBreakdown += `<li>Question 4.2.2 (Stockholding Period): ${q4_2_2_score}/4</li>`;

        // Question 4.2.3 (6 marks)
        const q4_2_3_answer = answers['q4-2-3-concern'] || '';
        let q4_2_3_score = 0;
        if (q4_2_3_answer.length > 80) q4_2_3_score += 6;
        else if (q4_2_3_answer.length > 40) q4_2_3_score += 3;
        totalScore += q4_2_3_score;
        marksBreakdown += `<li>Question 4.2.3 (Stockholding Concerns): ${q4_2_3_score}/6</li>`;

        // Question 4.3.1 (8 marks)
        const q4_3_1_cost_answer = answers['q4-3-1-cost-ans'] || '';
        const q4_3_1_trade_in_answer = answers['q4-3-1-trade-in-ans'] || '';
        let q4_3_1_score = 0;
        if (q4_3_1_cost_answer !== '') q4_3_1_score += 3;
        if (q4_3_1_trade_in_answer !== '') q4_3_1_score += 5;
        totalScore += q4_3_1_score;
        marksBreakdown += `<li>Question 4.3.1 (Vehicle Calculations): ${q4_3_1_score}/8</li>`;

        // Question 4.3.2 (4 marks)
        const q4_3_2_answer = answers['q4-3-2-depr'] || '';
        let q4_3_2_score = 0;
        if (q4_3_2_answer.length > 50) q4_3_2_score += 4;
        else if (q4_3_2_answer.length > 25) q4_3_2_score += 2;
        totalScore += q4_3_2_score;
        marksBreakdown += `<li>Question 4.3.2 (Depreciation Error): ${q4_3_2_score}/4</li>`;

        // Question 4.3.3 (4 marks)
        const q4_3_3_answer = answers['q4-3-3-donation'] || '';
        let q4_3_3_score = 0;
        if (q4_3_3_answer.length > 50) q4_3_3_score += 4;
        else if (q4_3_3_answer.length > 25) q4_3_3_score += 2;
        totalScore += q4_3_3_score;
        marksBreakdown += `<li>Question 4.3.3 (Donation Decision): ${q4_3_3_score}/4</li>`;

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
            localStorage.removeItem('examProgressP2_2023_full');
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
                    <h3>NOVEMBER 2023</h3>
                    <p>MARKS: 150 &nbsp;&nbsp;&nbsp; TIME: 2 hours</p>
                    <p>This question paper consists of 15 pages, a formula sheet and an 11-page answer book.</p>
                </div>

                <div className="instructions">
                    <h3>INSTRUCTIONS AND INFORMATION</h3>
                    <p>Read the following instructions carefully and follow them precisely.</p>
                    <ol>
                        <li>Answer ALL questions.</li>
                        <li>A special ANSWER BOOK is provided in which to answer ALL questions.</li>
                        <li>A Financial Indicator Formula Sheet is attached at the end of this question paper.</li>
                        <li>Show ALL workings to earn part-marks.</li>
                        <li>You may use a non-programmable calculator.</li>
                        <li>You may use a dark pencil or blue/black ink to answer the questions.</li>
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
                            <td>Reconciliations</td>
                            <td>40</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Cost Accounting</td>
                            <td>35</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Budgeting</td>
                            <td>40</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Stock Valuation and Fixed Assets</td>
                            <td>35</td>
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

export default AccountingP2Nov2023Eng;