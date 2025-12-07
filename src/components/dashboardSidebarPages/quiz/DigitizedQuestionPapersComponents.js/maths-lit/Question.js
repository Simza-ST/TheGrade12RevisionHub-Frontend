import React from 'react'

const Question = ({
                      number,
                      text,
                      type,
                      options,
                      lines,
                      solution,
                      onShowSolution,
                      image,
                      userAnswer,
                      onAnswerChange,
                      submitted,
                      result,
                      isSubquestion = false
                  }) => {
    const handleInputChange = (event) => {
        onAnswerChange(number, event.target.value)
    }

    const handleRadioChange = (event) => {
        onAnswerChange(number, event.target.value)
    }

    const renderAnswerField = () => {
        switch (type) {
            case 'radio':
                return (
                    <div className="radio-group">
                        {options.map((option, index) => (
                            <label key={index} className="radio-option">
                                <input
                                    type="radio"
                                    name={number}
                                    value={option}
                                    checked={userAnswer === option}
                                    onChange={handleRadioChange}
                                    disabled={submitted}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                )
            case 'textarea':
                return (
                    <textarea
                        className="text-area"
                        rows={lines || 4}
                        placeholder="Type your answer here..."
                        value={userAnswer || ''}
                        onChange={handleInputChange}
                        disabled={submitted}
                    />
                )
            case 'text':
                return (
                    <input
                        type="text"
                        className="text-field"
                        placeholder="Type your answer here..."
                        value={userAnswer || ''}
                        onChange={handleInputChange}
                        disabled={submitted}
                    />
                )
            case 'diagram-header':
                return (
                    <div className="diagram-header">
                        <div className="diagram-header-text">{text}</div>
                        {image && (
                            <div className="question-image">
                                <img src={image} alt={`Diagram for ${number}`} className="question-img" />
                            </div>
                        )}
                    </div>
                )
            default:
                return null
        }
    }

    const getQuestionClass = () => {
        if (!submitted || !result) return 'question'
        return result.correct ? 'question correct' : 'question incorrect'
    }

    return (
        <div className={getQuestionClass()}>
            <div className="question-number">{number}</div>

            {submitted && result && (
                <div className={`question-status ${result.correct ? 'correct' : 'incorrect'}`}>
                    {result.correct ? '✓ Correct' : '✗ Incorrect'} ({result.obtained}/{result.marks})
                </div>
            )}

            {((!isSubquestion && image) || type === 'diagram-header') && (
                <div className="question-image">
                    <img
                        src={image}
                        alt={`Diagram for question ${number}`}
                        className="question-img"
                    />
                </div>
            )}

            <div className="question-text">{text}</div>

            <div className="answer-section">
                {renderAnswerField()}

                {submitted && !image && (
                    <button
                        className="view-solution-btn"
                        onClick={() => onShowSolution(number, solution)}
                    >
                        View Solution
                    </button>
                )}
            </div>
        </div>
    )
}

export default Question