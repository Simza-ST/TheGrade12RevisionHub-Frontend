
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import FormulaSheet from './FormulaSheet';
import Result from './Result';
import '../../Accounting.css';

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
        </div>
    );
}

export default Question;
