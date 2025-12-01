
import React, { useState } from 'react';
import Timer from './Timer';
import SectionA from './SectionA';
import SectionB from './SectionB';
import SectionC from './SectionC';
import SectionD from './SectionD';
import SectionE from './SectionE';
import '../Tour.css';

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
        </div>
    );
};

export default TourismExam;