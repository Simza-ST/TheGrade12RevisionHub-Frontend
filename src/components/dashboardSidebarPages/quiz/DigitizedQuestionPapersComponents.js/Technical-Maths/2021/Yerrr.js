import React from 'react';
import './Quiz.css';

const QuizQuestion = ({ item }) => {
    switch (item.type) {
        case 'instruction':
            return <div className="quiz-instruction">{item.instruction || item.text}</div>;
        case 'image':
            return (
                <div className="quiz-image">
                    <img src={item.src} alt={item.alt || "Quiz diagram"} />
                </div>
            );
        case 'text-input':
        case 'long-text':
        case 'question':
            return (
                <div className="quiz-card">
                    <p>{item.question}</p>
                    <input type="text" placeholder="Enter your answer" />
                    {item.points && <p className="quiz-points">{item.points} point{item.points > 1 ? 's' : ''}</p>}
                </div>
            );
        default:
            return null;
    }
};

export default QuizQuestion;
