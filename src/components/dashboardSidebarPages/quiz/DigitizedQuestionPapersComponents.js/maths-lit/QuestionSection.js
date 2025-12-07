import React from 'react'
import Question from './Question'

const QuestionSection = ({ title, questions, onShowSolution, userAnswers, onAnswerChange, submitted, results }) => {
    return (
        <div className="question-section">
            <h2>{title}</h2>
            {questions.map((question, index) => (
                <Question
                    key={index}
                    number={question.number}
                    text={question.text}
                    type={question.type}
                    options={question.options}
                    lines={question.lines}
                    solution={question.solution}
                    image={question.image}
                    onShowSolution={onShowSolution}
                    userAnswer={userAnswers[question.number]}
                    onAnswerChange={onAnswerChange}
                    submitted={submitted}
                    result={results ? results.questionResults[question.number] : null}
                />
            ))}
        </div>
    )
}

export default QuestionSection