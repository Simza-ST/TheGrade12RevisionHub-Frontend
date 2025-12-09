
import React from 'react';
import Question from './Question';
import ExamImage from './ExamImage';

const SectionE = ({ answers, onAnswerChange }) => {
    const questions91 = [
        {
            id: "q9.1.1",
            number: "9.1.1",
            text: "Identify the risk of travelling during the Covid-19 pandemic.",
            type: "text",
            marks: 2
        },
        {
            id: "q9.1.2",
            number: "9.1.2",
            text: "Explain the role of the TBCSA in developing the protocols.",
            type: "textarea",
            marks: 2
        },
        {
            id: "q9.1.3",
            number: "9.1.3",
            text: "Suggest ONE measure that can be implemented to ensure compliance with the protocols.",
            type: "text",
            marks: 4
        },
        {
            id: "q9.1.4",
            number: "9.1.4",
            text: "Discuss ONE challenge of implementing the protocols.",
            type: "textarea",
            marks: 4
        }
    ];

    const questions92 = [
        {
            id: "q9.2",
            number: "9.2",
            text: "Explain the importance of health and safety protocols for tourism businesses.",
            type: "textarea",
            marks: 4
        }
    ];

    const questions93 = [
        {
            id: "q9.3.1",
            number: "9.3.1",
            text: "State the impact of Covid-19 on inbound tourism to South Africa in 2020.",
            type: "text",
            marks: 2
        },
        {
            id: "q9.3.2",
            number: "9.3.2",
            text: "Describe the Tourism Recovery Plan.",
            type: "textarea",
            marks: 8
        }
    ];

    const questions101 = [
        {
            id: "q10.1",
            number: "10.1",
            text: "Name TWO initiatives introduced by Thailand to restore tourist confidence.",
            type: "text",
            marks: 2
        },
        {
            id: "q10.2",
            number: "q10.2",
            text: "Explain how the screening app will benefit tourists.",
            type: "textarea",
            marks: 2
        }
    ];

    return (
        <div className="section">
            <div className="section-title">
                <h2>SECTION E: DOMESTIC, REGIONAL AND INTERNATIONAL TOURISM; COMMUNICATION AND CUSTOMER CARE (30 marks)</h2>
            </div>

            {/* Question 9.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 9.1 (12)</div>
                    <div className="marks">12 marks</div>
                </div>
                <p>Study the extract on health and safety protocols and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="covid" />
                </div>

                <div className="options">
                    {questions91.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 9.2 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 9.2 (4)</div>
                    <div className="marks">4 marks</div>
                </div>

                <div className="options">
                    {questions92.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 9.3 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 9.3 (10)</div>
                    <div className="marks">10 marks</div>
                </div>
                <p>Study the graph on tourist arrivals and the extract on the Tourism Recovery Plan and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="arrivals" />
                    <img src="/images/arrival.jpeg" alt="Arrival" />
                </div>

                <div className="image-container">
                    <ExamImage type="recovery" />
                </div>

                <div className="options">
                    {questions93.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            <div className="image-container">
                <ExamImage type="staySafe" />
                <img src="/images/staysafe.jpeg" alt="StaySafe" />
            </div>

            {/* Question 10.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 10.1 (4)</div>
                    <div className="marks">4 marks</div>
                </div>
                <p>Study the extract on restoring tourist confidence and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="thailand" />
                </div>

                <div className="options">
                    {questions101.map(question => (
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

export default SectionE;

