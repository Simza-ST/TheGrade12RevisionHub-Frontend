import React, { useState } from 'react';
import Header from './Header';
import Timer from './Timer';
import SectionA from './SectionA';
import SectionB from './SectionB';
import SectionC from './SectionC';
import SectionD from './SectionD';
import SectionE from './SectionE';
import { memo } from './ExamData'; // Remove examData import since it's not used

function Tour() {
    const [answers, setAnswers] = useState({});
    const [totalMarks, setTotalMarks] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const calculateMarks = () => {
        let marks = 0;

        // Calculate objective questions
        Object.keys(answers).forEach(questionId => {
            if (memo[questionId]) {
                const userAnswer = answers[questionId]?.toString().toLowerCase().trim() || '';
                const correctAnswer = memo[questionId].answer.toString().toLowerCase().trim();

                if (userAnswer === correctAnswer) {
                    marks += memo[questionId].marks;
                }
            }
        });

        setTotalMarks(marks);
        setShowResults(true);
    };

    return (
        <div className="App">
            <Timer />
            <Header />

            <div className="instructions-card">
                <h3>INSTRUCTIONS AND INFORMATION</h3>
                <ol>
                    <li>This question paper consists of FIVE sections.</li>
                    <li>Answer ALL the questions.</li>
                    <li>Start EACH question on a NEW page.</li>
                    <li>You may use a non-programmable calculator.</li>
                    <li>Show ALL calculations, formulae, and steps where applicable.</li>
                    <li>Write neatly and legibly.</li>
                </ol>
            </div>

            <div className="exam-form">
                <SectionA answers={answers} onAnswerChange={handleAnswerChange} />
                <SectionB answers={answers} onAnswerChange={handleAnswerChange} />
                <SectionC answers={answers} onAnswerChange={handleAnswerChange} />
                <SectionD answers={answers} onAnswerChange={handleAnswerChange} />
                <SectionE answers={answers} onAnswerChange={handleAnswerChange} />

                <div className="controls">
                    <button onClick={calculateMarks} className="submit-btn">
                        Submit & Calculate Marks
                    </button>
                </div>

                {showResults && (
                    <div className="results-card">
                        <h3>EXAM RESULTS</h3>
                        <div className="marks-display">
                            <h2>Total Marks: {totalMarks} / 200</h2>
                            <p>Percentage: {((totalMarks / 200) * 100).toFixed(2)}%</p>
                            <div className="grade">
                                {totalMarks >= 160 ? 'A - Outstanding!' :
                                    totalMarks >= 140 ? 'B - Good!' :
                                        totalMarks >= 120 ? 'C - Satisfactory' :
                                            totalMarks >= 100 ? 'D - Adequate' : 'E - Needs Improvement'}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <style jsx>
                {`

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Inter', Arial, sans-serif;
                        background: #f3f6f9;
                        margin: 0;
                        padding: 20px;
                        color: #1b1e23;
                        line-height: 1.6;
                    }

                    header {
                        text-align: center;
                        margin-bottom: 18px;
                    }

                    h1 {
                        margin: 0;
                        font-size: 22px;
                        color: #2c3e50;
                    }

                    .meta {
                        color: #6c757d;
                        margin-top: 6px;
                        font-size: 14px;
                    }

                    .App {
                        max-width: 1100px;
                        margin: 0 auto;
                    }

                    .section {
                        margin: 25px 0;
                        background: white;
                        border-radius: 10px;
                        padding: 20px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }

                    .section h2 {
                        background: linear-gradient(90deg, #fff, #eef6ff);
                        border-left: 6px solid #0b6efd;
                        padding: 12px 15px;
                        margin: -20px -20px 20px -20px;
                        font-size: 18px;
                        color: #2c3e50;
                        border-radius: 10px 10px 0 0;
                    }

                    .card {
                        background: #fff;
                        border-radius: 8px;
                        padding: 15px;
                        box-shadow: 0 2px 6px rgba(15, 20, 30, 0.05);
                        margin-bottom: 15px;
                        border: 1px solid #e9ecef;
                    }

                    .qtitle {
                        font-weight: 600;
                        margin-bottom: 10px;
                        color: #2c3e50;
                        font-size: 16px;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #f8f9fa;
                    }

                    .options label {
                        display: block;
                        margin: 8px 0;
                        cursor: pointer;
                        padding: 8px;
                        border-radius: 6px;
                        transition: background-color 0.2s;
                    }

                    .options label:hover {
                        background-color: #f8f9fa;
                    }

                    .options input[type="radio"] {
                        margin-right: 10px;
                    }

                    input[type="text"], input[type="number"], textarea, select {
                        width: 100%;
                        box-sizing: border-box;
                        padding: 10px;
                        border-radius: 6px;
                        border: 1px solid #cfd8e3;
                        font-size: 14px;
                        margin-top: 8px;
                        transition: border-color 0.2s;
                    }

                    input[type="text"]:focus, textarea:focus, select:focus {
                        border-color: #0b6efd;
                        outline: none;
                        box-shadow: 0 0 0 3px rgba(11, 110, 253, 0.1);
                    }

                    textarea {
                        min-height: 100px;
                        resize: vertical;
                        font-family: inherit;
                    }

                    .row {
                        display: flex;
                        gap: 15px;
                        flex-wrap: wrap;
                        margin: 15px 0;
                    }

                    .col {
                        flex: 1 1 300px;
                        min-width: 260px;
                    }

                    .meta-small {
                        font-size: 12px;
                        color: #6c757d;
                        margin-top: 6px;
                    }

                    .controls {
                        text-align: center;
                        margin: 25px 0;
                    }

                    .submit-btn {
                        background: #0b6efd;
                        color: #fff;
                        border: none;
                        padding: 15px 30px;
                        font-size: 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        transition: background-color 0.2s;
                        font-weight: 600;
                    }

                    .submit-btn:hover {
                        background: #0a5ed7;
                    }

                    .results-card {
                        margin-top: 25px;
                        padding: 20px;
                        border-radius: 10px;
                        background: #e9f7ef;
                        border: 2px solid #28a745;
                        text-align: center;
                    }

                    .marks-display h2 {
                        color: #28a745;
                        margin: 0 0 10px 0;
                        font-size: 28px;
                    }

                    .marks-display p {
                        font-size: 18px;
                        margin: 10px 0;
                        color: #2c3e50;
                    }

                    .grade {
                        font-size: 20px;
                        font-weight: bold;
                        color: #e74c3c;
                        margin-top: 10px;
                    }

                    /* Timer Styles */
                    .timer-container {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background-color: #0b6efd;
                        color: white;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                        z-index: 1000;
                        text-align: center;
                        min-width: 150px;
                        font-family: 'Courier New', monospace;
                    }

                    .timer-display {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }

                    .timer-label {
                        font-size: 14px;
                        opacity: 0.9;
                    }

                    .timer-warning {
                        background-color: #f39c12;
                    }

                    .timer-critical {
                        background-color: #e74c3c;
                        animation: pulse 1s infinite;
                    }

                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }

                    .instructions-card {
                        background: #fff9e6;
                        border-left: 5px solid #f39c12;
                        padding: 20px;
                        margin-bottom: 25px;
                        border-radius: 8px;
                    }

                    .instructions-card h3 {
                        margin-top: 0;
                        color: #e67e22;
                    }

                    .instructions-card ol {
                        margin: 0;
                        padding-left: 20px;
                    }

                    .instructions-card li {
                        margin-bottom: 8px;
                    }

                    .question-block {
                        margin-bottom: 20px;
                        padding: 15px;
                        border: 1px solid #e9ecef;
                        border-radius: 8px;
                        background: #f8f9fa;
                    }

                    .small {
                        font-size: 14px;
                    }

                    .qindex {
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 8px;
                    }

                    .image-container {
                        text-align: center;
                        margin: 15px 0;
                    }

                    .image-container img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 8px;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                        border: 1px solid #ddd;
                    }

                    /* Enhanced World Icons Grid */
                    .icons-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin: 20px 0;
                    }

                    .icon-item {
                        text-align: center;
                        padding: 15px;
                        background: white;
                        border-radius: 10px;
                        border: 1px solid #e9ecef;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                        transition: transform 0.2s, box-shadow 0.2s;
                    }

                    .icon-item:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    }

                    .icon-item .image-container {
                        position: relative;
                        margin-bottom: 10px;
                    }

                    .icon-item img {
                        width: 100%;
                        height: 150px;
                        object-fit: cover;
                        border-radius: 8px;
                        border: 2px solid #dee2e6;
                        transition: transform 0.2s;
                    }

                    .icon-item img:hover {
                        transform: scale(1.02);
                    }

                    .icon-label {
                        font-weight: bold;
                        color: #2c3e50;
                        margin: 8px 0;
                        font-size: 14px;
                        text-align: center;
                    }

                    .icon-item input {
                        width: 100%;
                        margin-top: 8px;
                        padding: 10px;
                        border: 1px solid #ced4da;
                        border-radius: 6px;
                        font-size: 14px;
                        transition: border-color 0.2s;
                    }

                    .icon-item input:focus {
                        border-color: #0b6efd;
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(11, 110, 253, 0.1);
                    }

                    /* Image error handling */
                    .image-placeholder {
                        width: 100%;
                        height: 150px;
                        background: linear-gradient(45deg, #f8f9fa, #e9ecef);
                        border: 2px dashed #dee2e6;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #6c757d;
                        font-weight: bold;
                        text-align: center;
                        font-size: 14px;
                    }

                    .table-container {
                        overflow-x: auto;
                        margin: 15px 0;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 15px 0;
                    }

                    table th, table td {
                        border: 1px solid #dee2e6;
                        padding: 12px;
                        text-align: left;
                    }

                    table th {
                        background-color: #f8f9fa;
                        font-weight: 600;
                    }

                    .exchange-table th {
                        background-color: #e3f2fd;
                    }

                    .matching-table table {
                        background-color: white;
                    }

                    .matching-table th {
                        background-color: #f8f9fa;
                    }

                    .case-study {
                        background: #e3f2fd;
                        padding: 15px;
                        border-radius: 8px;
                        margin: 15px 0;
                        border-left: 4px solid #0b6efd;
                    }

                    .case-study h4 {
                        margin-top: 0;
                        color: #0b6efd;
                    }

                    .case-study h5 {
                        color: #495057;
                        margin: 8px 0;
                    }

                    .sub-question {
                        margin: 15px 0;
                        padding: 12px;
                        background: white;
                        border-radius: 6px;
                        border-left: 3px solid #6c757d;
                    }

                    /* Enhanced responsive design */
                    @media (max-width: 768px) {
                        body {
                            padding: 10px;
                        }

                        .row {
                            flex-direction: column;
                        }

                        .timer-container {
                            position: relative;
                            top: auto;
                            right: auto;
                            margin: 0 auto 20px auto;
                            width: 90%;
                        }

                        .section {
                            padding: 15px;
                            margin: 15px 0;
                        }

                        .section h2 {
                            margin: -15px -15px 15px -15px;
                            padding: 10px 12px;
                        }

                        .icons-grid {
                            grid-template-columns: repeat(2, 1fr);
                            gap: 15px;
                        }

                        .icon-item img {
                            height: 120px;
                        }

                        table {
                            font-size: 14px;
                        }

                        table th, table td {
                            padding: 8px;
                        }
                    }

                    @media (max-width: 480px) {
                        .icons-grid {
                            grid-template-columns: 1fr;
                        }

                        .icon-item {
                            padding: 10px;
                        }

                        .icon-item img {
                            height: 100px;
                        }

                        .submit-btn {
                            padding: 12px 24px;
                            font-size: 14px;
                        }

                        .marks-display h2 {
                            font-size: 24px;
                        }

                        .marks-display p {
                            font-size: 16px;
                        }
                    }

                    /* Print styles for better printing experience */
                    @media print {
                        .timer-container, .submit-btn, .controls {
                            display: none;
                        }

                        .section {
                            break-inside: avoid;
                            box-shadow: none;
                            border: 1px solid #ccc;
                            margin: 10px 0;
                        }

                        .icon-item {
                            break-inside: avoid;
                        }

                        .results-card {
                            background: white;
                            border: 2px solid #28a745;
                        }
                    }

                    /* Additional utility classes */
                    .text-center {
                        text-align: center;
                    }

                    .mb-10 {
                        margin-bottom: 10px;
                    }

                    .mt-10 {
                        margin-top: 10px;
                    }

                    .mb-20 {
                        margin-bottom: 20px;
                    }
                    .mt-20 {
                        margin-top: 20px;
                    }
                    .highlight {
                        background-color: #fff3cd;
                        padding: 10px;
                        border-radius: 6px;
                        border-left: 4px solid #ffc107;
                    }
                    .note {
                        background-color: #d1ecf1;
                        padding: 10px;
                        border-radius: 6px;
                        border-left: 4px solid #17a2b8;
                        font-size: 14px;
                    }

                `}
            </style>
        </div>
    );
}

export default Tour;
