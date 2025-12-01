import React, { useState, useEffect } from 'react';
import Header from './Header';
import Instructions from './Instructions';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import FormulaSheet from './FormulaSheet';
import Results from './Results';
import Timer from './Timer';
import ProgressBar from './ProgressBar';

const ExamPaper = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    // Load saved progress
    useEffect(() => {
        const saved = localStorage.getItem('examProgressP2');
        if (saved) {
            setAnswers(JSON.parse(saved));
        }
    }, []);

    // Auto-save functionality
    useEffect(() => {
        const autoSave = setTimeout(() => {
            localStorage.setItem('examProgressP2', JSON.stringify(answers));
        }, 30000);

        return () => clearTimeout(autoSave);
    }, [answers]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const handleSubmit = () => {
        // Calculate score (simplified - you'd implement proper scoring logic)
        const calculatedScore = calculateScore(answers);
        setScore(calculatedScore);
        setShowResults(true);
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all answers? This action cannot be undone.')) {
            setAnswers({});
            localStorage.removeItem('examProgressP2');
            setShowResults(false);
        }
    };

    const calculateScore = (answers) => {
        // Implement your scoring logic here
        let totalScore = 0;

        // Example scoring logic - you'll need to implement proper validation
        Object.keys(answers).forEach(key => {
            if (answers[key] && answers[key].trim() !== '') {
                totalScore += 1; // Basic scoring - replace with actual marking scheme
            }
        });

        return Math.min(totalScore, 150);
    };

    return (
        <div className="exam-container">
            <ProgressBar />
            <Timer />

            <div className="container">
                <Header />
                <Instructions />

                <form id="exam-form">
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
                </form>

                {showResults && (
                    <Results score={score} total={150} answers={answers} />
                )}

                <div className="copyright">
                    <p>Copyright reserved</p>
                </div>
            </div>
        </div>
    );
};

export default ExamPaper;