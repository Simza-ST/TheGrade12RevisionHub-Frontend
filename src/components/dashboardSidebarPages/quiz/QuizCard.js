
import React from 'react';
import PropTypes from 'prop-types';

const QuizCard = ({ quiz, onStartQuiz, darkMode }) => {
    const handleClick = () => {
        if (!quiz.id) {
            console.error('Quiz ID is missing:', JSON.stringify(quiz, null, 2));
            return;
        }
        console.log('Starting quiz with ID:', quiz.id);
        onStartQuiz(quiz.id, quiz.title);
    };

    return (
        <div className="quiz-card bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border)] hover:shadow-lg">
            <style>
                {`
    .quiz-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    overflow: hidden;
}
.quiz-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.bg-[var(--bg-secondary)] {
    background-color: var(--bg-secondary, ${darkMode ? '#1e293b' : '#ffffff'});
}
.bg-[var(--accent-primary)] {
    background-color: var(--accent-primary, #007bff);
}
.text-[var(--text-primary)] {
    color: var(--text-primary, ${darkMode ? '#e2e8f0' : '#1f2937'});
}
.text-[var(--text-secondary)] {
    color: var(--text-secondary, ${darkMode ? '#94a3b8' : '#6b7280'});
}
.border-[var(--border)] {
    border-color: var(--border, ${darkMode ? '#475569' : '#e5e7eb'});
}
.hover\\:bg-blue-700:hover {
    background-color: #0056b3;
}
.quiz-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-primary, #007bff), transparent);
    opacity: 0.7;
}
.text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
}
.font-semibold {
    font-weight: 600;
}
.mb-2 {
    margin-bottom: 8px;
}
.mb-4 {
    margin-bottom: 16px;
}
.px-4 {
    padding-left: 16px;
    padding-right: 16px;
}
.py-2 {
    padding-top: 8px;
    padding-bottom: 8px;
}
.rounded-lg {
    border-radius: 8px;
}
.transition-colors {
    transition: background-color 0.2s ease;
}
`}
            </style>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                {quiz.title || 'Untitled Quiz'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
                Subject: {quiz.subject || 'Unknown'}
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
                Questions: {quiz.questions?.length || '0'}
            </p>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
                Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleDateString() : 'No due date'}
            </p>
            <button
                onClick={handleClick}
                disabled={!quiz.id}
                className={`px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg transition-colors ${
    !quiz.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
}`}
                aria-label={`Start quiz: ${quiz.title || 'Untitled Quiz'}`}
            >
                Start Quiz
            </button>
        </div>
    );
};

QuizCard.propTypes = {
    quiz: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        subject: PropTypes.string,
        questions: PropTypes.array,
        dueDate: PropTypes.string,
    }).isRequired,
    onStartQuiz: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default QuizCard;