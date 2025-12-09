
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
            </ul>

            <div style={{ marginTop: '20px', padding: '15px', background: '#d5edf7', borderRadius: '5px' }}>
                <strong>💡 Tip:</strong> Read all questions carefully before starting. Choose the questions you feel most confident about answering. The source-based questions cover Mass Democratic Movement, Desmond Tutu's TRC role, and BRICS climate commitments. Essay questions cover Black Consciousness, democratic transition, and Cold War impacts.
            </div>
        </div>
    );
};

export default Instructions;
