
import React from 'react';
import Question from './Question';
import ExamImage from './ExamImage';

const SectionB = ({ answers, onAnswerChange }) => {
    const questions21 = [
        {
            id: "q2.1.1",
            number: "2.1.1",
            text: "State ONE reason why the WHO is concerned about the spread of Covid-19.",
            type: "text",
            marks: 2
        },
        {
            id: "q2.1.2",
            number: "2.1.2",
            text: "Name TWO social media platforms that were used to spread information about Covid-19.",
            type: "text",
            marks: 4
        },
        {
            id: "q2.1.3",
            number: "2.1.3",
            text: "Explain why TikTok was used to create awareness about Covid-19.",
            type: "textarea",
            marks: 4
        }
    ];

    const questions22 = [
        {
            id: "q2.2.1",
            number: "2.2.1",
            text: "List FOUR items that are restricted at the airport.",
            type: "text",
            marks: 4
        },
        {
            id: "q2.2.2",
            number: "2.2.2",
            text: "State the quantity allowed for TWO of the restricted items.",
            type: "textarea",
            marks: 4
        },
        {
            id: "q2.2.3",
            number: "2.2.3",
            text: "Which channel should a passenger use if he/she has no goods to declare?",
            type: "text",
            marks: 2
        },
        {
            id: "q2.2.4a",
            number: "2.2.4a",
            text: "What are prohibited goods?",
            type: "text",
            marks: 2
        },
        {
            id: "q2.2.4b",
            number: "2.2.4b",
            text: "Which ONE of the following is a prohibited good?",
            type: "radio",
            options: [
                { value: "A", label: "A Narcotics" },
                { value: "B", label: "B Prescription medicine" },
                { value: "C", label: "C Laptop computer" },
                { value: "D", label: "D Camera" }
            ],
            marks: 2
        }
    ];

    const questions23 = [
        {
            id: "q2.3.1",
            number: "2.3.1",
            text: "At what time will the flight from Johannesburg arrive in Dubai?",
            type: "text",
            marks: 3
        },
        {
            id: "q2.3.2",
            number: "2.3.2",
            text: "How long is the flight from Dubai to Singapore?",
            type: "text",
            marks: 4
        },
        {
            id: "q2.3.3",
            number: "2.3.3",
            text: "At what time will the group arrive in Bangkok?",
            type: "text",
            marks: 5
        }
    ];

    const questions24 = [
        {
            id: "q2.4.1",
            number: "2.4.1",
            text: "Identify the travel-related ailment the group is likely to experience.",
            type: "text",
            marks: 2
        },
        {
            id: "q2.4.2",
            number: "2.4.2",
            text: "Suggest ONE way to overcome this ailment.",
            type: "text",
            marks: 2
        }
    ];

    const questions31 = [
        {
            id: "q3.1.1",
            number: "3.1.1",
            text: "Calculate the amount of Indian rupees (INR) the group will receive.",
            type: "number",
            marks: 3
        },
        {
            id: "q3.1.2",
            number: "3.1.2",
            text: "Calculate the amount of Thai baht (THB) the group will receive.",
            type: "number",
            marks: 5
        }
    ];

    const questions32 = [
        {
            id: "q3.2",
            number: "3.2",
            text: "State ONE negative impact of the tourism levy on the South African economy.",
            type: "text",
            marks: 2
        }
    ];

    return (
        <div className="section">
            <div className="section-title">
                <h2>SECTION B: MAP WORK AND TOUR PLANNING; FOREIGN EXCHANGE (50 marks)</h2>
            </div>

            {/* Question 2.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 2.1 (10)</div>
                    <div className="marks">10 marks</div>
                </div>
                <p>Study the extract on the World Health Organization (WHO) and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="who" />
                </div>

                <div className="options">
                    {questions21.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 2.2 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 2.2 (14)</div>
                    <div className="marks">14 marks</div>
                </div>
                <p>Study the picture on airport restrictions and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="airport" />
                    <img src="/images/problem.jpeg" alt="Problem" />
                </div>

                <div className="options">
                    {questions22.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 2.3 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 2.3 (12)</div>
                    <div className="marks">12 marks</div>
                </div>
                <p>Study the flight itinerary and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="flight" />
                </div>

                <div className="options">
                    {questions23.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 2.4 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 2.4 (4)</div>
                    <div className="marks">4 marks</div>
                </div>
                <p>A group of tourists is travelling from South Africa to Thailand and will cross several time zones.</p>

                <div className="image-container">
                    <ExamImage type="airport" />
                    <img src="/images/headaches.jpeg" alt="Headaches" />
                </div>

                <div className="options">
                    {questions24.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 3.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 3.1 (8)</div>
                    <div className="marks">8 marks</div>
                </div>
                <p>A group of tourists from South Africa is going on a tour to India and Thailand. They need to exchange ZAR to Indian rupees (INR) and Thai baht (THB).</p>

                <div className="image-container">
                    <ExamImage type="exchange" />

                    <img src="/images/jacket.jpeg" alt="jacket" />

                </div>

                <div className="options">
                    {questions31.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 3.2 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 3.2 (2)</div>
                    <div className="marks">2 marks</div>
                </div>

                <div className="image-container">
                    <ExamImage type="airport" />
                    <img src="/images/better.jpeg" alt="Better" />
                </div>

                <div className="options">
                    {questions32.map(question => (
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

export default SectionB;


