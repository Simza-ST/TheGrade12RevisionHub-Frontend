import React, { useState } from 'react';
import '../TourismExam.css';
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
        </div>
    );
}

export default Tour;
