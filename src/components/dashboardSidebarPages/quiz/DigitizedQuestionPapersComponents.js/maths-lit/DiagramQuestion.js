import React from 'react'
import Question from './Question'

const DiagramQuestion = ({
                             number,
                             text,
                             image,
                             solution,
                             subquestions,
                             onShowSolution,
                             userAnswers,
                             onAnswerChange,
                             submitted,
                             results
                         }) => {
    return (
        <div className="diagram-question">
            <div className="diagram-question-header">
                <div className="question-number">{number}</div>
                {submitted && results && results.questionResults[number] && (
                    <div className={`question-status ${results.questionResults[number].status || 'pending'}`}>
                        {results.questionResults[number].status === 'correct' ? '✓' :
                            results.questionResults[number].status === 'incorrect' ? '✗' : '⏳'}
                        {results.questionResults[number].obtained}/{results.questionResults[number].marks}
                    </div>
                )}
            </div>

            {image && (
                <div className="diagram-image">
                    <img
                        src={image}
                        alt={`Diagram for question ${number}`}
                        className="diagram-img"
                    />
                </div>
            )}

            <div className="diagram-question-text">{text}</div>

            <div className="diagram-instructions">
                <strong>Diagram-Based Question:</strong> Refer to the diagram above to answer the subquestions below.
            </div>

            <div className="subquestions-container">
                {subquestions.map((subquestion, index) => (
                    <Question
                        key={index}
                        number={subquestion.number}
                        text={subquestion.text}
                        type={subquestion.type}
                        options={subquestion.options}
                        lines={subquestion.lines}
                        solution={subquestion.solution}
                        onShowSolution={onShowSolution}
                        userAnswer={userAnswers[subquestion.number]}
                        onAnswerChange={onAnswerChange}
                        submitted={submitted}
                        result={results ? results.questionResults[subquestion.number] : null}
                    />
                ))}
            </div>

            {submitted && (
                <button
                    className="view-solution-btn"
                    onClick={() => onShowSolution(number, solution)}
                >
                    View Diagram Solution
                </button>
            )}
        </div>
    )
}

export default DiagramQuestion