
import React from 'react';

const SectionA = ({ answers, onAnswerChange }) => {
    const multipleChoiceQuestions = [
        {
            id: '1.1.1',
            question: 'A recent Covid-19 requirement for international travel:',
            options: [
                'A Visa application',
                'B Proof of vaccination',
                'C Cholera certificate',
                'D International driver\'s licence'
            ]
        },
        {
            id: '1.1.2',
            question: 'Ms Jones purchased jewellery to the value of R50 000 on a recent overseas trip. On arrival at South African customs, this purchase would fall under …',
            options: [
                'A items to be declared.',
                'B items not to be declared.',
                'C duty-free allowances.',
                'D prohibited items.'
            ]
        },
        {
            id: '1.1.3',
            question: 'Sydney (+10) is … hours ahead of Johannesburg (+2).',
            options: ['A 0', 'B 9', 'C 8', 'D 6']
        },
        {
            id: '1.1.4',
            question: 'Jet fatigue is a travel-related condition caused by travelling …',
            options: [
                'A across many time zones.',
                'B on a long-haul flight.',
                'C at odd times of the day.',
                'D only at night'
            ]
        },
        {
            id: '1.1.5',
            question: 'The bank selling rate is always … the bank buying rate.',
            options: [
                'A lower than',
                'B higher than',
                'C equal to',
                'D double'
            ]
        },
        {
            id: '1.1.6',
            question: 'The famous wall in Israel used for prayers and confessions:',
            options: [
                'A Berlin Wall',
                'B Southern Wall',
                'C Wailing Wall',
                'D Eastern Wall'
            ]
        },
        {
            id: '1.1.7',
            question: 'Petra is located in this Middle Eastern country:',
            options: ['A Israel', 'B Jordan', 'C Lebanon', 'D Turkey']
        },
        {
            id: '1.1.8',
            question: 'The Swiss Alps are known as …',
            options: [
                'A a sacred mountain range for locals.',
                'B a range of mountains in Nepal.',
                'C a mountain range popular for skiing holidays.',
                'D the highest mountain range in the world.'
            ]
        },
        {
            id: '1.1.9',
            question: 'The Vredefort Dome and iSimangaliso Wetland Park have the following in common:',
            options: [
                'A Both are located in KwaZulu-Natal.',
                'B Both are natural sites.',
                'C Both are cultural sites.',
                'D Both are located in North West.'
            ]
        },
        {
            id: '1.1.10',
            question: 'The current brand image of South Africa:',
            options: [
                'A Welcome',
                'B It\'s possible',
                'C South Africa - Alive with possibility',
                'D South Africa - Inspiring new ways'
            ]
        }
    ];

    return (
        <section className="section">
            <h2>SECTION A: SHORT QUESTIONS (40 marks)</h2>

            {/* QUESTION 1.1 */}
            <div className="card">
                <div className="qtitle">QUESTION 1.1: Multiple Choice (1.1.1 to 1.1.10) [10 x 1 = 10 marks]</div>
                <p>Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers.</p>

                {multipleChoiceQuestions.map((q) => (
                    <div key={q.id} className="question-block">
                        <div className="small qindex">{q.id} {q.question}</div>
                        <div className="options">
                            {q.options.map((option, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name={q.id}
                                        value={option.charAt(0)}
                                        checked={answers[q.id] === option.charAt(0)}
                                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* QUESTION 1.2 */}
            <div className="card">
                <div className="qtitle">QUESTION 1.2: Give ONE word/term [5 x 1 = 5 marks]</div>

                {[
                    '1.2.1 Branded paper and pens that improve the image of the hotel',
                    '1.2.2 Cleanliness of the travel agency and the surrounding gardens',
                    '1.2.3 Acceptable haircut and short nails for male employees',
                    '1.2.4 The value of a code of conduct for tourist guides',
                    '1.2.5 Airlines contributing to the cost of the cabin crew\'s work wear'
                ].map((question, index) => (
                    <div key={index} className="question-block">
                        <div className="small qindex">{question}</div>
                        <input
                            type="text"
                            value={answers[`1.2.${index + 1}`] || ''}
                            onChange={(e) => onAnswerChange(`1.2.${index + 1}`, e.target.value)}
                            placeholder="Your answer"
                        />
                    </div>
                ))}
            </div>

            {/* QUESTION 1.3 */}
            <div className="card">
                <div className="qtitle">QUESTION 1.3: Choose Correct Words [5 x 1 = 5 marks]</div>

                {[
                    {id: '1.3.1', question: 'An example of recycling is (re-visiting/re-using) plastic crates in which vegetables are delivered to a restaurant.'},
                    {id: '1.3.2', question: 'Using energy efficient light bulbs in a museum is an example of sustainable (management of resources/preservation of artifacts).'},
                    {id: '1.3.3', question: 'The removal of (alien plants/indigenous animals) is beneficial to the natural environment.'},
                    {id: '1.3.4', question: 'A tourism business making use of (grey water/sea water) for gardening purposes will attract environmentally conscious tourists.'},
                    {id: '1.3.5', question: 'A responsible tourist will pay a fair price for (mass-produced/handmade) souvenirs.'}
                ].map((q) => (
                    <div key={q.id} className="question-block">
                        <div className="small qindex">{q.question}</div>
                        <input
                            type="text"
                            value={answers[q.id] || ''}
                            onChange={(e) => onAnswerChange(q.id, e.target.value)}
                            placeholder="Your answer"
                        />
                    </div>
                ))}
            </div>

            {/* QUESTION 1.4 */}
            <div className="card">
                <div className="qtitle">QUESTION 1.4: Matching [5 x 1 = 5 marks]</div>
                <p>Choose a destination from COLUMN B that matches a global natural disaster in COLUMN A.</p>

                <div className="matching-table">
                    <table>
                        <thead>
                        <tr>
                            <th>COLUMN A</th>
                            <th>COLUMN B</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[
                            {id: '1.4.1', question: 'Many tourists had to cancel their holidays to this South African coastal province due to severe flooding in 2022', options: ['A Philippines', 'B Madagascar', 'C Ecuador', 'D KwaZulu-Natal', 'E Texas', 'F Eswatini']},
                            {id: '1.4.2', question: 'The January 2021 landslides caused major damage and disruptions in this Southern African neighbouring country', options: ['A Philippines', 'B Madagascar', 'C Ecuador', 'D KwaZulu-Natal', 'E Texas', 'F Eswatini']},
                            {id: '1.4.3', question: 'Tropical storm Megi caused severe damage in this Southeast Asian country in April 2022', options: ['A Philippines', 'B Madagascar', 'C Ecuador', 'D KwaZulu-Natal', 'E Texas', 'F Eswatini']},
                            {id: '1.4.4', question: 'In February 2022, Cyclone Ermati caused devastation in this Indian Ocean island', options: ['A Philippines', 'B Madagascar', 'C Ecuador', 'D KwaZulu-Natal', 'E Texas', 'F Eswatini']},
                            {id: '1.4.5', question: 'Flights were delayed due to ash eruptions from Wolf Volcano in this South American country', options: ['A Philippines', 'B Madagascar', 'C Ecuador', 'D KwaZulu-Natal', 'E Texas', 'F Eswatini']}
                        ].map((q) => (
                            <tr key={q.id}>
                                <td>
                                    <div className="small qindex">{q.id} {q.question}</div>
                                </td>
                                <td>
                                    <select
                                        value={answers[q.id] || ''}
                                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                    >
                                        <option value="">Select answer</option>
                                        {q.options.map((option, idx) => (
                                            <option key={idx} value={option.charAt(0)}>{option}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* QUESTION 1.5 */}
            <div className="card">
                <div className="qtitle">QUESTION 1.5: World Heritage Sites [5 x 1 = 5 marks]</div>
                <p>A tourist interested in South Africa's World Heritage Sites would like to visit sites A, B, C, D and E shown on the map below.</p>

                <div className="image-container">
                    <img src="/images/south.jpg" alt="South Africa World Heritage Sites Map" />
                </div>

                {[
                    '1.5.1 World Heritage Site A is associated with the golden rhinoceros.',
                    '1.5.2 World Heritage Site B exposes tourists to ancient mountainous landscapes in Mpumalanga.',
                    '1.5.3 World Heritage Site C is South Africa\'s only mixed World Heritage Site.',
                    '1.5.4 World Heritage Site D displays evidence of the origins of mankind.',
                    '1.5.5 A former South African president was imprisoned at World Heritage Site E.'
                ].map((question, index) => (
                    <div key={index} className="question-block">
                        <div className="small qindex">{question}</div>
                        <input
                            type="text"
                            value={answers[`1.5.${index + 1}`] || ''}
                            onChange={(e) => onAnswerChange(`1.5.${index + 1}`, e.target.value)}
                            placeholder="Name of World Heritage Site"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SectionA;

