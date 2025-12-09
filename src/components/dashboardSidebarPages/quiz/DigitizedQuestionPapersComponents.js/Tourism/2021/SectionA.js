import React from 'react';
import Question from './Question';

const SectionA = ({ answers, onAnswerChange }) => {
    const questions1 = [
        {
            id: "q1.1.1",
            number: "1.1.1",
            text: "A plan used to make a journey logical and timesaving:",
            type: "radio",
            options: [
                { value: "A", label: "A Meal plan" },
                { value: "B", label: "B Budget plan" },
                { value: "C", label: "C Route plan" },
                { value: "D", label: "D Credit plan" }
            ],
            marks: 1
        },
        {
            id: "q1.1.2",
            number: "1.1.2",
            text: "A … itinerary is designed according to a tourist's needs.",
            type: "radio",
            options: [
                { value: "A", label: "A personalised" },
                { value: "B", label: "B general" },
                { value: "C", label: "C group" },
                { value: "D", label: "D segmented" }
            ],
            marks: 1
        },
        {
            id: "q1.1.3",
            number: "1.1.3",
            text: "Tourists are vulnerable to crime-related incidents. As a safety precaution at the airport, tourists must …",
            type: "radio",
            options: [
                { value: "A", label: "A avoid using registered transport services." },
                { value: "B", label: "B ensure luggage is securely locked." },
                { value: "C", label: "C never talk on their cellphones." },
                { value: "D", label: "D use facilities for the disabled." }
            ],
            marks: 1
        },
        {
            id: "q1.1.4",
            number: "1.1.4",
            text: "Preventative advice given by travel clinics to tourists travelling to destinations with extremely high temperatures:",
            type: "radio",
            options: [
                { value: "A", label: "A Take hot showers to keep cool." },
                { value: "B", label: "B Consume sugary drinks to keep hydrated." },
                { value: "C", label: "C Wear reading glasses for protection against the harsh sunlight." },
                { value: "D", label: "D Use sunscreen containing a high sun protection factor." }
            ],
            marks: 1
        },
        {
            id: "q1.1.5",
            number: "1.1.5",
            text: "A document required when obtaining an international driving permit (IDP):",
            type: "radio",
            options: [
                { value: "A", label: "A Valid South African driving licence" },
                { value: "B", label: "B Eight identical photographs" },
                { value: "C", label: "C Set of fingerprints" },
                { value: "D", label: "D Copy of the return ticket" }
            ],
            marks: 1
        },
        {
            id: "q1.1.6",
            number: "1.1.6",
            text: "The Berlin Wall was built to divide this country into west and east:",
            type: "radio",
            options: [
                { value: "A", label: "A China" },
                { value: "B", label: "B Brazil" },
                { value: "C", label: "C Italy" },
                { value: "D", label: "D Germany" }
            ],
            marks: 1
        },
        {
            id: "q1.1.7",
            number: "1.1.7",
            text: "The statue of Christ The Redeemer and the Vatican City have the following in common: Both …",
            type: "radio",
            options: [
                { value: "A", label: "A have religious significance." },
                { value: "B", label: "B are statues made of cement." },
                { value: "C", label: "C are symbols of independence." },
                { value: "D", label: "D have natural significance." }
            ],
            marks: 1
        },
        {
            id: "q1.1.8",
            number: "1.1.8",
            text: "The Fossil Hominid Sites of South Africa consist of three sites called the Makapan Valley, the Taung Skull Fossil Site and the …",
            type: "radio",
            options: [
                { value: "A", label: "A Cape Floral Region Protected Areas." },
                { value: "B", label: "B #Khomani Cultural Landscape." },
                { value: "C", label: "C Mapungubwe Cultural Landscape." },
                { value: "D", label: "D Cradle of Humankind." }
            ],
            marks: 1
        },
        {
            id: "q1.1.9",
            number: "1.1.9",
            text: "The Vredefort Dome World Heritage Site meets this UNESCO criterion:",
            type: "radio",
            options: [
                { value: "A", label: "A Biological evidence of human developmental stages" },
                { value: "B", label: "B Geological evidence of a meteorite impact structure" },
                { value: "C", label: "C An outstanding example of a human settlement" },
                { value: "D", label: "D An outstanding example of a unique type of building" }
            ],
            marks: 1
        },
        {
            id: "q1.1.10",
            number: "1.1.10",
            text: "Marketing South Africa internationally will lead to a/an …",
            type: "radio",
            options: [
                { value: "A", label: "A increase in travel diseases." },
                { value: "B", label: "B increase in tourist volumes." },
                { value: "C", label: "C decrease in arrival numbers." },
                { value: "D", label: "D decrease in destination development." }
            ],
            marks: 1
        },
        {
            id: "q1.1.11",
            number: "1.1.11",
            text: "This factor contributes to the professional image of an employee working in the tourism industry:",
            type: "radio",
            options: [
                { value: "A", label: "A History of the company" },
                { value: "B", label: "B Termination of service" },
                { value: "C", label: "C Travel benefits" },
                { value: "D", label: "D Positive interaction with customers" }
            ],
            marks: 1
        },
        {
            id: "q1.1.12",
            number: "1.1.12",
            text: "A reason why people may want to apply for jobs in the airline industry:",
            type: "radio",
            options: [
                { value: "A", label: "A They will enjoy fringe benefits such as discounted travel." },
                { value: "B", label: "B Everyone will earn above average salaries." },
                { value: "C", label: "C They will automatically become shareholders in the airline." },
                { value: "D", label: "D Everyone will have high-profile positions." }
            ],
            marks: 1
        },
        {
            id: "q1.1.13",
            number: "1.1.13",
            text: "The image below shows internet-based platforms where tourism businesses have an online presence. These platforms are known as …",
            type: "radio",
            options: [
                { value: "A", label: "A corporate social investment." },
                { value: "B", label: "B social responsibility." },
                { value: "C", label: "C social media." },
                { value: "D", label: "D social distancing." }
            ],
            marks: 1
        },
        {
            id: "q1.1.14",
            number: "1.1.14",
            text: "This document guides staff on the expected behaviour in the performance of their duties and staff members faced with ethical challenges:",
            type: "radio",
            options: [
                { value: "A", label: "A Basic Conditions of Employment Act, 1997 (Act 75 of 1997)" },
                { value: "B", label: "B Tourism Act, 2014 (Act 3 of 2014)" },
                { value: "C", label: "C The King III report on sustainability" },
                { value: "D", label: "D Code of conduct" }
            ],
            marks: 1
        },
        {
            id: "q1.1.15",
            number: "1.1.15",
            text: "The manner in which a company presents its products to customers, which will contribute to a professional image:",
            type: "radio",
            options: [
                { value: "A", label: "A Good environmental policies" },
                { value: "B", label: "B Personal hygiene of staff" },
                { value: "C", label: "C Interaction with suppliers" },
                { value: "D", label: "D Packaging design" }
            ],
            marks: 1
        },
        {
            id: "q1.1.16",
            number: "1.1.16",
            text: "The year 2020 had unprecedented (never experienced before) political and social uprisings. This type of occurrence is referred to as a …",
            type: "radio",
            options: [
                { value: "A", label: "A world war." },
                { value: "B", label: "B natural disaster." },
                { value: "C", label: "C protest action." },
                { value: "D", label: "D global disaster." }
            ],
            marks: 1
        },
        {
            id: "q1.1.17",
            number: "1.1.17",
            text: "A negative impact of Covid-19 on major soccer events:",
            type: "radio",
            options: [
                { value: "A", label: "A Media coverage was banned." },
                { value: "B", label: "B Soccer stadiums were empty." },
                { value: "C", label: "C Teams continued practising." },
                { value: "D", label: "D Interest in soccer increased." }
            ],
            marks: 1
        },
        {
            id: "q1.1.18",
            number: "1.1.18",
            text: "Participating countries took this decision to prevent the spread of Covid-19 during the World Economic Forum (WEF) in January 2021:",
            type: "radio",
            options: [
                { value: "A", label: "A The WEF was held by means of a virtual platform." },
                { value: "B", label: "B All participants wore masks during the virtual WEF." },
                { value: "C", label: "C Countries flew their delegates to the WEF." },
                { value: "D", label: "D Many countries did not participate in the WEF." }
            ],
            marks: 1
        },
        {
            id: "q1.1.19",
            number: "1.1.19",
            text: "African land markets refer to inbound tourists arriving …",
            type: "radio",
            options: [
                { value: "A", label: "A from Transatlantic destinations." },
                { value: "B", label: "B from intercontinental destinations." },
                { value: "C", label: "C from neighbouring provinces." },
                { value: "D", label: "D through South Africa's border posts." }
            ],
            marks: 1
        },
        {
            id: "q1.1.20",
            number: "1.1.20",
            text: "An example of an electronic customer feedback tool:",
            type: "radio",
            options: [
                { value: "A", label: "A Writing in a guest journal at a hotel" },
                { value: "B", label: "B Dropping a note in a suggestion box" },
                { value: "C", label: "C Speaking to the manager of the business" },
                { value: "D", label: "D Liking a Facebook post on a business' web page" }
            ],
            marks: 1
        }
    ];

    const questions2 = [
        {
            id: "q1.2.1",
            number: "1.2.1",
            text: "Allows a traveller to pass through a country to reach his/her final destination",
            type: "text",
            marks: 1
        },
        {
            id: "q1.2.2",
            number: "1.2.2",
            text: "Required when travelling to a country with risk of yellow fever",
            type: "text",
            marks: 1
        },
        {
            id: "q1.2.3",
            number: "1.2.3",
            text: "The most important travel document for international travel",
            type: "text",
            marks: 1
        },
        {
            id: "q1.2.4",
            number: "1.2.4",
            text: "Required by most countries during the Covid-19 pandemic",
            type: "text",
            marks: 1
        },
        {
            id: "q1.2.5",
            number: "1.2.5",
            text: "Allows travel to 26 European countries",
            type: "text",
            marks: 1
        }
    ];

    const questions3 = [
        {
            id: "q1.3.1",
            number: "1.3.1",
            text: "The tourism industry has a responsibility to protect the … resources of the destination.",
            type: "text",
            marks: 1
        },
        {
            id: "q1.3.2",
            number: "1.3.2",
            text: "Businesses can plough back into the community through … projects.",
            type: "text",
            marks: 1
        },
        {
            id: "q1.3.3",
            number: "1.3.3",
            text: "The tourism levy is also referred to as the …",
            type: "text",
            marks: 1
        },
        {
            id: "q1.3.4",
            number: "1.3.4",
            text: "… friendly tourism products are becoming more popular.",
            type: "text",
            marks: 1
        },
        {
            id: "q1.3.5",
            number: "1.3.5",
            text: "The tourism industry can contribute to job creation and …",
            type: "text",
            marks: 1
        }
    ];

    const questions4 = [
        {
            id: "q1.4.1",
            number: "1.4.1",
            text: "Salary and wages are also referred to as …",
            type: "text",
            marks: 1
        },
        {
            id: "q1.4.2",
            number: "1.4.2",
            text: "Employees may receive … to purchase clothing required for work.",
            type: "text",
            marks: 1
        },
        {
            id: "q1.4.3",
            number: "1.4.3",
            text: "The BCEA stipulates the procedure to be followed for the … of employees.",
            type: "text",
            marks: 1
        },
        {
            id: "q1.4.4",
            number: "1.4.4",
            text: "The BCEA stipulates the number of … per day and week.",
            type: "text",
            marks: 1
        },
        {
            id: "q1.4.5",
            number: "1.4.5",
            text: "A job description outlines the … of a specific job.",
            type: "text",
            marks: 1
        }
    ];

    const questions5 = [
        {
            id: "q1.5.1",
            number: "1.5.1",
            text: "Step 1:",
            type: "text",
            marks: 1
        },
        {
            id: "q1.5.2",
            number: "1.5.2",
            text: "Step 2:",
            type: "text",
            marks: 1
        },
        {
            id: "q1.5.3",
            number: "1.5.3",
            text: "Step 3:",
            type: "text",
            marks: 1
        },
        {
            id: "q1.5.4",
            number: "1.5.4",
            text: "Step 4:",
            type: "text",
            marks: 1
        },
        {
            id: "q1.5.5",
            number: "1.5.5",
            text: "Step 5:",
            type: "text",
            marks: 1
        }
    ];

    return (
        <div className="section">
            <div className="section-title">
                <h2>SECTION A: SHORT QUESTIONS (40 marks)</h2>
            </div>

            {/* Question 1.1 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 1.1 (20 x 1) (20)</div>
                    <div className="marks">20 marks</div>
                </div>
                <p>Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.20) in the ANSWER BOOK.</p>

                <div className="options">
                    {questions1.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 1.2 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 1.2 (5 x 1) (5)</div>
                    <div className="marks">5 marks</div>
                </div>
                <p>Give the correct travel term/concept for each of the following descriptions.</p>

                <div className="options">
                    {questions2.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 1.3 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 1.3 (5 x 1) (5)</div>
                    <div className="marks">5 marks</div>
                </div>
                <p>Complete the following sentences.</p>

                <div className="options">
                    {questions3.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 1.4 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 1.4 (5 x 1) (5)</div>
                    <div className="marks">5 marks</div>
                </div>
                <p>Complete the following sentences.</p>

                <div className="options">
                    {questions4.map(question => (
                        <Question
                            key={question.id}
                            question={question}
                            answer={answers[question.id] || ''}
                            onAnswerChange={onAnswerChange}
                        />
                    ))}
                </div>
            </div>

            {/* Question 1.5 */}
            <div className="question">
                <div className="question-header">
                    <div className="question-number">QUESTION 1.5 (5 x 1) (5)</div>
                    <div className="marks">5 marks</div>
                </div>
                <p>List FIVE steps to follow when planning an overseas holiday.</p>

                <div className="options">
                    {questions5.map(question => (
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

export default SectionA;
