import React from 'react';

const Question = ({ question, answer, onAnswerChange }) => {
    const handleChange = (e) => {
        onAnswerChange(question.id, e.target.value);
    };

    return (
        <div className="option">
            <p>{question.number} {question.text}</p>
            {question.type === 'radio' ? (
                question.options.map(option => (
                    <div key={option.value}>
                        <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={answer === option.value}
                            onChange={handleChange}
                        />
                        <label>{option.label}</label>
                    </div>
                ))
            ) : question.type === 'textarea' ? (
                <textarea
                    name={question.id}
                    value={answer}
                    onChange={handleChange}
                    className="answer-input"
                    placeholder="Type your answer here..."
                />
            ) : (
                <input
                    type={question.type}
                    name={question.id}
                    value={answer}
                    onChange={handleChange}
                    className="answer-input"
                    placeholder="Type your answer here..."
                />
            )}
        </div>
    );
};

export default Question;