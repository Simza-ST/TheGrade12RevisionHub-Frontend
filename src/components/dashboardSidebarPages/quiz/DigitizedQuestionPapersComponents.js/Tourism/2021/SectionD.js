
import React from 'react';
import Question from './Question';
import ExamImage from './ExamImage';

const SectionD = ({ answers, onAnswerChange }) => {
    const questions71 = [
        {
            id: "q7.1.1",
            number: "7.1.1",
            text: "What is a corporate identity?",
            type: "text",
            marks: 2
        },
        {
            id: "q7.1.2",
            number: "7.1.2",
            text: "Identify the term used to describe the correct way to communicate on the internet.",
            type: "text",
            marks: 2
        },
        {
            id: "q7.1.3",
            number: "7.1.3",
            text: "Explain how the image of a business can be damaged by negative electronic word-of-mouth.",
            type: "textarea",
            marks: 2
        }
    ];

    const questions72 = [
        {
            id: "q7.2.1",
            number: "7.2.1",
            text: "Explain why John was dismissed.",
            type: "textarea",
            marks: 2
        },
        {
            id: "q7.2.2",
            number: "q7.2.2",
            text: "Do you agree with the way John handled the situation? Motivate your answer.",
            type: "textarea",
            marks: 4
        }
    ];

    const questions81 = [
        {
            id: "q8.1.1",
            number: "8.1.1",
            text: "Identify the pillar of sustainability referred to in the statement above.",
            type: "text",
            marks: 2
        },
        {
            id: "q8.1.2",
            number: "8.1.2",
            text: "Explain how RAIN applies corporate social investment.",
            type: "textarea",
            marks: 2
        }
    ];

    const questions82 = [
        {
            id: "q8.2.1",
            number: "8.2.1",
            text: "Explain how the provision of clean drinking water at schools contributes to responsible tourism.",
            type: "textarea",
            marks: 6
        },
        {
            id: "q8.2.2",
            number: "8.2.2",
            text: "Discuss why building hand washing stations is a sustainable initiative.",
            type: "textarea",
            marks: 2
        }
    ];

    return (
        <div className="section">
            <div className="section-title">
                <h2>SECTION D: TOURISM SECTORS; SUSTAINABLE AND RESPONSIBLE TOURISM (30 marks)</h2>
            </div>
            <div className="image-container">
                <ExamImage type="professionalism" />
                <img src="/images/professionalism.jpeg" alt="Professionalism" />
            </div>

            {/* Question 7.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 7.1 (6)</div>
                    <div className="marks">6 marks</div>
                </div>
                <p>Study the extract on corporate identity and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="corporate" />
                </div>

                <div className="options">
                    {questions71.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 7.2 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 7.2 (6)</div>
                    <div className="marks">6 marks</div>
                </div>
                <p>Read the scenario below and answer the questions.</p>

                <div className="options">
                    {questions72.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 8.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 8.1 (4)</div>
                    <div className="marks">4 marks</div>
                </div>
                <p>Study the extract on the Rejuvenation Africa Initiative (RAIN) and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="rain" />

                    <img src="/images/rain.jpeg" alt="Rain" />
                </div>

                <div className="options">
                    {questions81.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 8.2 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 8.2 (8)</div>
                    <div className="marks">8 marks</div>
                </div>
                <p>Study the picture on hand washing stations and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="handwashing" />
                </div>

                <div className="options">
                    {questions82.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionD;

