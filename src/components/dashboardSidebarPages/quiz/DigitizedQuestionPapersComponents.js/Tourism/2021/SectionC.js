import React from 'react';
import Question from './Question';
import ExamImage from './ExamImage';

const SectionC = ({ answers, onAnswerChange }) => {
    const questions41 = [
        { id: "q4.1.1a", number: "4.1.1a", text: "Name the tourist attraction for EACH icon.", type: "text", marks: 3 },
        { id: "q4.1.1b", number: "4.1.1b", text: "Name the continent where EACH attraction is located.", type: "text", marks: 3 },
        { id: "q4.1.2", number: "4.1.2", text: "Define the term domestic tourists.", type: "text", marks: 2 },
        { id: "q4.1.3", number: "4.1.3", text: "Explain the difference in visitor numbers between icon B and icon C.", type: "textarea", marks: 2 }
    ];

    const questions42 = [
        { id: "q4.2.1a", number: "4.2.1a", text: "Name the country where the Giza Necropolis is located.", type: "text", marks: 1 },
        { id: "q4.2.1b", number: "4.2.1b", text: "Name the continent where this country is located.", type: "text", marks: 1 },
        { id: "q4.2.2", number: "4.2.2", text: "State the reason why the pyramids were built.", type: "text", marks: 2 },
        { id: "q4.2.3", number: "4.2.3", text: "Identify the animal that forms part of the Great Sphinx.", type: "text", marks: 2 },
        { id: "q4.2.4a", number: "4.2.4a", text: "Explain how the site is being conserved for future generations.", type: "textarea", marks: 4 },
        { id: "q4.2.4b", number: "4.2.4b", text: "Explain how the local community benefits from the Giza Necropolis.", type: "textarea", marks: 4 },
        { id: "q4.2.5a", number: "4.2.5a", text: "Give ONE form of tourist facilitation available at the site.", type: "text", marks: 2 },
        { id: "q4.2.5b", number: "4.2.5b", text: "Give ONE form of tourist facilitation available at the site.", type: "text", marks: 2 }
    ];

    const questions51 = [
        { id: "q5.1", number: "5.1", text: "Name the province where the iSimangaliso Wetland Park is located.", type: "text", marks: 1 },
        { id: "q5.2", number: "5.2", text: "State the type of World Heritage Site of the iSimangaliso Wetland Park.", type: "text", marks: 1 },
        { id: "q5.3.1", number: "5.3.1", text: "Identify the organisation that has granted the iSimangaliso Wetland Park World Heritage Site status.", type: "text", marks: 2 },
        { id: "q5.3.2", number: "5.3.2", text: "Explain the concern raised about the iSimangaliso Wetland Park.", type: "textarea", marks: 2 },
        { id: "q5.3.3", number: "5.3.3", text: "Discuss the impact of the proposed development on special interest tourism.", type: "textarea", marks: 4 },
        { id: "q5.4", number: "5.4", text: "Name ONE other World Heritage Site in South Africa that is transfrontier.", type: "text", marks: 2 }
    ];

    const questions61 = [
        { id: "q6.1", number: "6.1", text: "Identify the organisation responsible for marketing South Africa internationally.", type: "text", marks: 2 },
        { id: "q6.2", number: "6.2", text: "Explain the advantage of partnerships in marketing South Africa.", type: "textarea", marks: 4 },
        { id: "q6.3", number: "6.3", text: "Identify the marketing tool used to create a unique identity for South Africa.", type: "text", marks: 2 },
        { id: "q6.4", number: "6.4", text: "Describe how the tourism levy is paid over to SAT.", type: "textarea", marks: 2 }
    ];

    return (
        <div className="section">

            <div className="section-title">
                <h2>SECTION C: TOURISM ATTRACTIONS; CULTURE AND HERITAGE TOURISM; MARKETING (50 marks)</h2>
            </div>

            {/* QUESTION 4.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 4.1 (10)</div>
                    <div className="marks">10 marks</div>
                </div>

                <p>Study the icons of the world's most popular tourist attractions and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="attractions" />
                    <img src="/images/majority.jpeg" alt="Majority" />
                </div>

                <div className="options">
                    {questions41.map(q => (
                        <Question
                            key={q.id}
                            question={q}
                            answer={answers[q.id] || ""}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* QUESTION 4.2 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 4.2 (18)</div>
                    <div className="marks">18 marks</div>
                </div>

                <p>Study the extract on the Giza Necropolis and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="giza" />
                    <img src="/images/ancientsite.jpeg" alt="Ancientsite" />
                </div>

                <div className="options">
                    {questions42.map(q => (
                        <Question
                            key={q.id}
                            question={q}
                            answer={answers[q.id] || ""}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* QUESTION 5 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 5.1 (12)</div>
                    <div className="marks">12 marks</div>
                </div>

                <p>Study the extract on the iSimangaliso Wetland Park and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="isimangaliso" />
                    <img src="/images/nature.jpeg" alt="Nature" />
                </div>

                <div className="options">
                    {questions51.map(q => (
                        <Question
                            key={q.id}
                            question={q}
                            answer={answers[q.id] || ""}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* QUESTION 6 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 6.1 (10)</div>
                    <div className="marks">10 marks</div>
                </div>

                <p>Study the extract on marketing South Africa and answer the questions.</p>

                <div className="image-container">
                    <ExamImage type="marketing" />
                    <img src="/images/artandculture.jpeg" alt="Art And Culture" />
                </div>

                <div className="options">
                    {questions61.map(q => (
                        <Question
                            key={q.id}
                            question={q}
                            answer={answers[q.id] || ""}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SectionC;
