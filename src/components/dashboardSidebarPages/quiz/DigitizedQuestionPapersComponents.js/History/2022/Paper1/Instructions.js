
import React from 'react';

const Instructions = () => {
    return (
        <div className="instructions">
            <h2>📋 EXAMINATION INSTRUCTIONS</h2>
            <ul className="instructions-list">
                <li><strong>Duration:</strong> 3 hours</li>
                <li><strong>Total Marks:</strong> 150</li>
                <li><strong>Answer Structure:</strong> Answer ONE source-based question and ONE essay question</li>
                <li><strong>Source-Based Questions:</strong> Questions 1-3 (Choose ONE)</li>
                <li><strong>Essay Questions:</strong> Questions 4-6 (Choose ONE)</li>
                <li>Write all answers in the provided answer spaces</li>
                <li>Plan your essay in the space provided before writing your final answer</li>
                <li>Manage your time carefully - the timer will help you track your progress</li>
                <li>Click "Submit Answers" when finished, or wait for auto-submission when time expires</li>
                <li>After submission, you can view model solutions for each question</li>
                <li><strong>IMPORTANT:</strong> You must answer at least 3 questions total (minimum 1 from Section A and 1 from Section B)</li>
            </ul>

            <div style={{ marginTop: '20px', padding: '15px', background: '#d5edf7', borderRadius: '5px' }}>
                <strong>💡 Tip:</strong> Read all questions carefully before starting. Choose the questions you feel most confident about answering.
            </div>

            <div style={{ marginTop: '15px', padding: '15px', background: '#fff3cd', borderRadius: '5px', borderLeft: '4px solid #ffc107' }}>
                <strong>📝 Writing Guidelines:</strong>
                <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
                    <li>For source-based questions: Quote directly from sources where requested</li>
                    <li>For paragraph questions: Aim for 80-100 words with clear structure</li>
                    <li>For essay questions: Plan your introduction, body paragraphs, and conclusion</li>
                    <li>Use historical evidence and specific examples to support your arguments</li>
                    <li>Check your spelling and grammar for clarity</li>
                </ul>
            </div>
        </div>
    );
};

export default Instructions;

