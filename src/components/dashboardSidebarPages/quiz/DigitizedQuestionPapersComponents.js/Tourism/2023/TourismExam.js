
import React, { useState } from 'react';
import Timer from './Timer';
import SectionA from './SectionA';
import SectionB from './SectionB';
import SectionC from './SectionC';
import SectionD from './SectionD';
import SectionE from './SectionE';

const TourismExam = () => {
    const [formData, setFormData] = useState({});
    const [results, setResults] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'radio' ? value :
                type === 'checkbox' ? checked : value
        }));
    };

    const handleTextareaChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Calculate results
        const calculatedResults = calculateResults();
        setResults(calculatedResults);
    };

    const calculateResults = () => {
        // This would contain the full grading logic
        let totalAwarded = 0;

        // Auto-mark multiple choice questions
        const memo = {
            q1_1: 'C', q1_2: 'D', q1_3: 'B', q1_4: 'A', q1_5: 'B',
            q1_6: 'D', q1_7: 'D', q1_8: 'B', q1_9: 'A', q1_10: 'C',
            q1_11: 'B', q1_12: 'D', q1_13: 'B', q1_14: 'B', q1_15: 'C',
            q1_16: 'D', q1_17: 'B', q1_18: 'A', q1_19: 'B', q1_20: 'C'
            // ... more answers
        };

        // Calculate marks (simplified)
        Object.keys(memo).forEach(question => {
            if (formData[question] === memo[question]) {
                totalAwarded += 1;
            }
        });

        const percentage = ((totalAwarded / 200) * 100).toFixed(2);

        return {
            totalMarks: totalAwarded,
            percentage: percentage,
            totalPossible: 200
        };
    };

    const handleReset = () => {
        setFormData({});
        setResults(null);
    };

    const handleTimeUp = () => {
        alert("Time's up! Please submit your exam.");
        handleSubmit(new Event('submit'));
    };

    return (
        <div className="exam-container">
            <Timer onTimeUp={handleTimeUp} />

            <main>
                <header>
                    <h1>TOURISM — NOVEMBER 2023 (NSC) — Full paper (Sections A–E)</h1>
                    <div className="meta">MARKS: 200 | TIME: 3 hours</div>
                    <div className="meta">This question paper consists of 26 pages.</div>
                </header>

                <div className="instructions">
                    <h3>INSTRUCTIONS AND INFORMATION</h3>
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
                </div>

                <form id="examForm" onSubmit={handleSubmit}>
                    <SectionA
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleTextareaChange={handleTextareaChange}
                        handleSelectChange={handleSelectChange}
                    />
                    <SectionB
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleTextareaChange={handleTextareaChange}
                    />
                    <SectionC
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleTextareaChange={handleTextareaChange}
                    />
                    <SectionD
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleTextareaChange={handleTextareaChange}
                    />
                    <SectionE
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleTextareaChange={handleTextareaChange}
                    />

                    <div className="controls">
                        <button type="submit" id="gradeBtn">Submit & Mark</button>
                        <button type="button" id="resetBtn" className="secondary" onClick={handleReset}>
                            Reset
                        </button>
                    </div>

                    {results && (
                        <div id="resultBox" className="card">
                            <div id="summary">
                                <strong>Total awarded:</strong> {results.totalMarks} / {results.totalPossible} marks &nbsp; — &nbsp;
                                <strong>Percentage:</strong> {results.percentage}%
                            </div>
                            <div className="grade-info">
                                {results.percentage >= 80 && "Excellent! Distinction Pass"}
                                {results.percentage >= 70 && results.percentage < 80 && "Good! Merit Pass"}
                                {results.percentage >= 50 && results.percentage < 70 && "Satisfactory! Pass"}
                                {results.percentage < 50 && "Needs Improvement - Try Again"}
                            </div>
                        </div>
                    )}
                </form>

                <footer>
                    Built from the uploaded question paper & marking guidelines. Memo source: official marking guidelines.
                </footer>
            </main>
            <style jsx>
                {`
                    .exam-container {
                        font-family: Inter, Arial, sans-serif;
                        background: #f3f6f9;
                        margin: 0;
                        padding: 20px;
                        color: #1b1e23;
                    }

                    header {
                        text-align: center;
                        margin-bottom: 18px;
                    }

                    h1 {
                        margin: 0;
                        font-size: 22px;
                    }

                    .meta {
                        color: #6c757d;
                        margin-top: 6px;
                    }

                    main {
                        max-width: 1100px;
                        margin: 0 auto;
                    }

                    .section {
                        margin: 18px 0;
                    }

                    .section h2 {
                        background: linear-gradient(90deg, #fff, #eef6ff);
                        border-left: 6px solid #0b6efd;
                        padding: 10px 12px;
                        margin: 0 0 12px 0;
                        font-size: 18px;
                    }

                    .card {
                        background: #fff;
                        border-radius: 8px;
                        padding: 12px;
                        box-shadow: 0 2px 6px rgba(15, 20, 30, 0.05);
                        margin-bottom: 10px;
                    }

                    .qtitle {
                        font-weight: 600;
                        margin-bottom: 6px;
                    }

                    .options label {
                        display: block;
                        margin: 4px 0;
                        cursor: pointer;
                    }

                    input[type="text"],
                    input[type="number"],
                    textarea,
                    select {
                        width: 100%;
                        box-sizing: border-box;
                        padding: 8px;
                        border-radius: 6px;
                        border: 1px solid #cfd8e3;
                        font-size: 14px;
                        margin-top: 6px;
                    }

                    textarea {
                        min-height: 96px;
                        resize: vertical;
                    }

                    .row {
                        display: flex;
                        gap: 12px;
                        flex-wrap: wrap;
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

                    .marker {
                        width: 120px;
                    }

                    .controls {
                        text-align: center;
                        margin: 18px 0;
                    }

                    button {
                        background: #0b6efd;
                        color: #fff;
                        border: none;
                        padding: 12px 18px;
                        font-size: 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        margin: 0 5px;
                    }

                    button.secondary {
                        background: #6c757d;
                    }

                    #resultBox {
                        margin-top: 18px;
                        padding: 12px;
                        border-radius: 8px;
                        background: #e9f7ef;
                        border: 1px solid #28a745;
                    }

                    .hint {
                        font-size: 13px;
                        color: #444;
                        margin-top: 6px;
                    }

                    .small {
                        font-size: 12px;
                        color: #6c757d;
                    }

                    footer {
                        text-align: center;
                        color: #6c757d;
                        margin-top: 26px;
                        font-size: 13px;
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
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

                    /* Image Placeholder Styles */
                    .image-placeholder {
                        background: #f8f9fa;
                        border: 2px dashed #dee2e6;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 15px 0;
                        text-align: center;
                    }

                    .image-placeholder.large {
                        min-height: 200px;
                    }

                    .image-placeholder h4 {
                        color: #6c757d;
                        margin-bottom: 15px;
                    }

                    .image-source {
                        font-size: 12px;
                        color: #6c757d;
                        margin-top: 10px;
                        font-style: italic;
                    }

                    /* Image Grids */
                    .image-grid, .icons-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 15px;
                        margin: 15px 0;
                    }

                    .image-item, .icon-item {
                        background: #e9ecef;
                        padding: 15px;
                        border-radius: 6px;
                        text-align: center;
                    }

                    .image-box, .icon-image {
                        height: 80px;
                        background: #ced4da;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        color: #6c757d;
                    }

                    /* Map and Graph Containers */
                    .map-container, .graph-container {
                        background: white;
                        padding: 20px;
                        border: 1px solid #dee2e6;
                        border-radius: 4px;
                        min-height: 150px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                    }

                    .graph-details {
                        font-size: 12px;
                        color: #6c757d;
                        margin-top: 10px;
                        text-align: center;
                    }

                    /* Customs Image */
                    .customs-image, .fynbos-image, .crew-image, .infographic-content, .cartoon-content {
                        background: white;
                        padding: 30px;
                        border: 1px solid #dee2e6;
                        border-radius: 4px;
                        min-height: 120px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    /* Responsive */
                    @media (max-width: 700px) {
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

                        .image-grid, .icons-grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    @media (max-width: 500px) {
                        .image-grid, .icons-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                    /* Section D specific styles */
                    .sentence-completion {
                        font-size: 16px;
                        margin: 10px 0;
                        padding: 10px;
                        background: #f8f9fa;
                        border-radius: 6px;
                    }

                    .definition-box {
                        background: #e9ecef;
                        padding: 15px;
                        border-radius: 6px;
                        border-left: 4px solid #0b6efd;
                        font-style: italic;
                        margin: 10px 0;
                    }
                    /* Multiple Choice Question Images */
                    .question-image {
                        margin: 10px 0;
                        text-align: center;
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 6px;
                        border: 1px solid #e9ecef;
                    }

                    .mcq-image {
                        max-width: 100%;
                        max-height: 200px;
                        border-radius: 4px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }

                    .image-fallback {
                        background: #e9ecef;
                        padding: 20px;
                        border-radius: 4px;
                        color: #6c757d;
                        font-style: italic;
                    }

                    /* Ensure images don't break the layout */
                    .col .question-image + .options {
                        margin-top: 15px;
                    }
                    .icons-grid {
                        border: 1px solid #ddd;
                        padding: 15px;
                        border-radius: 5px;
                        background: #f9f9f9;
                    }
                    .icon-item {
                        text-align: center;
                    }
                    .icon-label {
                        font-weight: bold;
                        font-size: 16px;
                        margin-bottom: 8px;
                    }
                    .icon-image {
                        max-width: 100%;
                        height: 150px;
                        object-fit: cover;
                        border: 1px solid #ccc;
                    }
                    .image-caption {
                        font-weight: bold;
                        margin-bottom: 8px;
                        text-align: center;
                    }
                    .image-source {
                        font-style: italic;
                        text-align: center;
                        margin-top: 5px;
                        font-size: 12px;
                        color: #666;
                    }


                    App.css

                    .App {
                        text-align: center;
                    }

                    .App-logo {
                        height: 40vmin;
                        pointer-events: none;
                    }

                    @media (prefers-reduced-motion: no-preference) {
                        .App-logo {
                            animation: App-logo-spin infinite 20s linear;
                        }
                    }

                    .App-header {
                        background-color: #282c34;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        font-size: calc(10px + 2vmin);
                        color: white;
                    }

                    .App-link {
                        color: #61dafb;
                    }

                    @keyframes App-logo-spin {
                        from {
                            transform: rotate(0deg);
                        }
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default TourismExam;