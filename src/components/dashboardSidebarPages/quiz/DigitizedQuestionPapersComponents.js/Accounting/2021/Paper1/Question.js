
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import FormulaSheet from './FormulaSheet';
import Result from './Result';

function Question() {
    const [examTime, setExamTime] = useState(90 * 60);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

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

        // Basic scoring - give 1 point for each non-empty answer
        Object.values(answers).forEach(answer => {
            if (answer && answer.toString().trim().length > 0) {
                totalScore += 1;
            }
        });

        return Math.min(totalScore, 150);
    };

    const handleSubmit = () => {
        const calculatedScore = calculateScore(answers);
        setScore(calculatedScore);
        setShowResult(true);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all answers?')) {
            setAnswers({});
            localStorage.removeItem('examProgressP1');
            setShowResult(false);
            setScore(0);
        }
    };

    return (
        <div className="App">
            <Timer examTime={examTime} setExamTime={setExamTime} />

            <div className="container">
                <header className="header">
                    <h1>NATIONAL SENIOR CERTIFICATE</h1>
                    <h2>GRADE 12</h2>
                    <h2>ACCOUNTING P1</h2>
                    <h3>NOVEMBER 2021</h3>
                    <p>MARKS: 150 &nbsp;&nbsp;&nbsp; TIME: 2 hours</p>
                    <p>This question paper consists of 10 pages, a formula sheet and a 10-page answer book.</p>
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
                            <td>Statement of Financial Position</td>
                            <td>55</td>
                            <td>45</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Share Capital, Financial Indicators and Cash Flow Statement</td>
                            <td>35</td>
                            <td>25</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Interpretation of Company Financial Information</td>
                            <td>40</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Corporate Governance</td>
                            <td>20</td>
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

                {!showResult ? (
                    <>
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
                    </>
                ) : (
                    <Result score={score} />
                )}

                <div className="copyright">
                    <p>Copyright reserved</p>
                </div>
            </div>
            <style jsx>
                {`
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
                `}
            </style>
        </div>
    );
}

export default Question;
