import React from 'react';

const SectionB = ({ answers, onAnswerChange }) => {
    return (
        <section className="section">
            <h2>SECTION B: MAP WORK AND TOUR PLANNING; FOREIGN EXCHANGE (50 marks)</h2>

            {/* QUESTION 2 */}
            <div className="card">
                <div className="qtitle">QUESTION 2: Philan-Tourism Case Study [29 marks]</div>

                <div className="case-study">
                    <h4>PHILAN-TOURISM: A GROWING TREND</h4>
                    <p>
                        Mr Murdock is from Canada. He is a philanthropist and travels to destinations
                        in need of tourism development. He travelled to the flood-affected areas in
                        KwaZulu-Natal to help rebuild the damaged tourism infrastructure.

                        He is following the growing philan-tourism, a new term that comes from a combination
                        of the words 'philanthropy' and 'tourism'. The aim of philan-tourism is to travel to
                        destinations to have a positive impact on both the local community and the environment.

                        In KwaZulu-Natal he stayed at local B&Bs and used public transport.
                        PHILANTHROPIST: a person who cares about community by assisting with projects and making
                        financial contributions.
                    </p>
                </div>

                {/* 2.1.1 */}
                <div className="question-block">
                    <div className="small qindex">2.1.1 Name ONE way, in the extract above, how Mr Murdock is involved in philan-tourism. (2 marks)</div>
                    <textarea
                        value={answers['2.1.1'] || ''}
                        onChange={(e) => onAnswerChange('2.1.1', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 2.1.2 */}
                <div className="question-block">
                    <div className="small qindex">2.1.2 Name the compulsory travel document Mr Murdock would require to enter South Africa. (2 marks)</div>
                    <input
                        type="text"
                        value={answers['2.1.2'] || ''}
                        onChange={(e) => onAnswerChange('2.1.2', e.target.value)}
                        placeholder="Your answer"
                    />
                </div>

                {/* 2.1.3 */}
                <div className="question-block">
                    <div className="small qindex">2.1.3 Name the global organisation responsible for regulating the Covid-19 vaccinations. (2 marks)</div>
                    <input
                        type="text"
                        value={answers['2.1.3'] || ''}
                        onChange={(e) => onAnswerChange('2.1.3', e.target.value)}
                        placeholder="Your answer"
                    />
                </div>

                {/* 2.1.4 */}
                <div className="question-block">
                    <div className="small qindex">2.1.4 Recommend ONE health precaution to Mr Murdock when he visits the flood-affected area. (2 marks)</div>
                    <textarea
                        value={answers['2.1.4'] || ''}
                        onChange={(e) => onAnswerChange('2.1.4', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* QUESTION 2.2 - WITH IMAGE */}
                <div className="question-block">
                    <div className="small qindex">2.2 Study the World Time Zone map and itinerary below and answer the questions that follow.</div>

                    {/* Add the image here */}
                    <div className="image-container">
                        <img
                            src="/images/worldTimeZone.jpg"
                            alt="World Time Zone Map"
                            style={{ maxWidth: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '8px' }}
                        />
                    </div>

                    {/* Itinerary Information */}
                    <div className="case-study" style={{ marginTop: '15px', backgroundColor: '#f8f9fa' }}>
                        <h5>MR MURDOCK'S ITINERARY</h5>
                        <p><strong>There are no direct flights from Vancouver, Canada, to Johannesburg, South Africa.</strong></p>
                        <p>Mr Murdock had to fly from Vancouver International Airport to Frankfurt in Germany to board a connecting flight to South Africa.</p>
                        <ul>
                            <li>The flight departed from Vancouver International Airport at 18:00 on Saturday.</li>
                            <li>The duration of the nonstop flight was 9 hours.</li>
                            <li>He remained in transit at Frankfurt International Airport in Germany until his flight departed for South Africa at 16:00 on Sunday.</li>
                            <li>The duration of the flight to South Africa was 11 hours.</li>
                        </ul>
                        <p><em>NOTE: Canada and Germany were not practising DST at the time of Mr Murdock's travel.</em></p>
                    </div>
                </div>

                {/* 2.2.1 */}
                <div className="question-block">
                    <div className="small qindex">2.2.1 Explain the term connecting flight. (2 marks)</div>
                    <textarea
                        value={answers['2.2.1'] || ''}
                        onChange={(e) => onAnswerChange('2.2.1', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 2.2.2 */}
                <div className="question-block">
                    <div className="small qindex">2.2.2 Calculate the time and day in Frankfurt when Mr Murdock departed from Vancouver International Airport. (4 marks)</div>
                    <textarea
                        value={answers['2.2.2'] || ''}
                        onChange={(e) => onAnswerChange('2.2.2', e.target.value)}
                        placeholder="Show ALL calculations"
                        rows="4"
                    />
                </div>

                {/* 2.2.3 */}
                <div className="question-block">
                    <div className="small qindex">2.2.3 Mr Murdock arrived at Frankfurt International Airport at 12:00 on Sunday. Calculate how long he had to be in transit before his flight departed for South Africa. (2 marks)</div>
                    <input
                        type="text"
                        value={answers['2.2.3'] || ''}
                        onChange={(e) => onAnswerChange('2.2.3', e.target.value)}
                        placeholder="Your answer"
                    />
                </div>

                {/* 2.2.4 */}
                <div className="question-block">
                    <div className="small qindex">2.2.4 Calculate the time and day that Mr Murdock arrived in Johannesburg. (5 marks)</div>
                    <textarea
                        value={answers['2.2.4'] || ''}
                        onChange={(e) => onAnswerChange('2.2.4', e.target.value)}
                        placeholder="Show ALL calculations"
                        rows="4"
                    />
                </div>

                {/* 2.3.1 */}
                <div className="question-block">
                    <div className="small qindex">2.3.1 Choose the customs channel Mr Murdock had to proceed through on arrival at OR Tambo International Airport. (2 marks)</div>
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="2.3.1"
                                value="green"
                                checked={answers['2.3.1'] === 'green'}
                                onChange={(e) => onAnswerChange('2.3.1', e.target.value)}
                            />
                            Green channel
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="2.3.1"
                                value="red"
                                checked={answers['2.3.1'] === 'red'}
                                onChange={(e) => onAnswerChange('2.3.1', e.target.value)}
                            />
                            Red channel
                        </label>
                    </div>
                </div>

                {/* 2.3.2 */}
                <div className="question-block">
                    <div className="small qindex">2.3.2 Give ONE reason for your answer to QUESTION 2.3.1. (2 marks)</div>
                    <textarea
                        value={answers['2.3.2'] || ''}
                        onChange={(e) => onAnswerChange('2.3.2', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 2.3.3 */}
                <div className="question-block">
                    <div className="small qindex">2.3.3 Advise Mr Murdock on TWO safety considerations before selecting a transport provider. (4 marks)</div>
                    <textarea
                        value={answers['2.3.3'] || ''}
                        onChange={(e) => onAnswerChange('2.3.3', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>
            </div>

            {/* QUESTION 3 */}
            <div className="card">
                <div className="qtitle">QUESTION 3: Foreign Exchange [21 marks]</div>

                <div className="case-study">
                    <h4>TENNIS DREAM COMES TRUE!</h4>
                    <p>Mrs Murray, a tennis enthusiast, flew from South Africa to London to watch Wimbledon, the most famous tennis tournament in the world. She spent four days in London.</p>
                    <p><strong>Cost of the trip:</strong></p>
                    <ul>
                        <li>Non-stop return flight to London: R13,000</li>
                        <li>Visa costs: R2,950</li>
                        <li>Travel Insurance: R1,456</li>
                        <li>Wimbledon package: R37,850 (including accommodation, meals and Wimbledon tickets)</li>
                    </ul>
                    <p>She had a total budget of R75,000.</p>
                </div>

                {/* Exchange Rates Table */}
                <div className="table-container">
                    <table className="exchange-table">
                        <thead>
                        <tr>
                            <th>COUNTRY/REGION</th>
                            <th>CURRENCY CODE</th>
                            <th>BANK BUYING RATE (BBR)</th>
                            <th>BANK SELLING RATE (BSR)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Britain</td>
                            <td>GBP</td>
                            <td>19.23</td>
                            <td>20.42</td>
                        </tr>
                        <tr>
                            <td>Europe</td>
                            <td>EUR</td>
                            <td>16.75</td>
                            <td>17.22</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* 3.1.1 */}
                <div className="question-block">
                    <div className="small qindex">3.1.1 Give the name of the currency Mrs Murray needed for her trip to London. (2 marks)</div>
                    <input
                        type="text"
                        value={answers['3.1.1'] || ''}
                        onChange={(e) => onAnswerChange('3.1.1', e.target.value)}
                        placeholder="Your answer"
                    />
                </div>

                {/* 3.1.2 */}
                <div className="question-block">
                    <div className="small qindex">3.1.2 Calculate the total cost in South African rand of Mrs Murray's trip to Wimbledon. (2 marks)</div>
                    <textarea
                        value={answers['3.1.2'] || ''}
                        onChange={(e) => onAnswerChange('3.1.2', e.target.value)}
                        placeholder="Show calculations"
                        rows="3"
                    />
                </div>

                {/* 3.1.3 */}
                <div className="question-block">
                    <div className="small qindex">3.1.3 Calculate the amount in rand she had available to spend in London. (2 marks)</div>
                    <textarea
                        value={answers['3.1.3'] || ''}
                        onChange={(e) => onAnswerChange('3.1.3', e.target.value)}
                        placeholder="Show calculations"
                        rows="3"
                    />
                </div>

                {/* 3.1.4 */}
                <div className="question-block">
                    <div className="small qindex">3.1.4 Mrs Murray had sufficient spending money while visiting London. Do you agree? Give TWO reasons. (4 marks)</div>
                    <textarea
                        value={answers['3.1.4'] || ''}
                        onChange={(e) => onAnswerChange('3.1.4', e.target.value)}
                        placeholder="Your answer with reasons"
                        rows="4"
                    />
                </div>

                {/* 3.1.5 */}
                <div className="question-block">
                    <div className="small qindex">3.1.5 Convert the total cost of the tour to the currency used in London. (3 marks)</div>
                    <textarea
                        value={answers['3.1.5'] || ''}
                        onChange={(e) => onAnswerChange('3.1.5', e.target.value)}
                        placeholder="Show calculations"
                        rows="3"
                    />
                </div>

                {/* Currency Crisis Section */}
                <div className="case-study" style={{ backgroundColor: '#fff3cd', borderLeftColor: '#ffc107' }}>
                    <h4>CURRENCY CRISIS</h4>
                    <p><em>"IT'S NOT JUST THE RAND THAT'S FEELING SQUEEZED!"</em></p>
                    <p>The war between Russia and Ukraine and the ongoing Covid-19 pandemic has resulted in foreign currencies fluctuating and struggling to regain stability.</p>
                    <p>The impact of these global events as well as the local floods in KwaZulu-Natal have had a negative impact on the South African rand.</p>
                </div>

                {/* 3.2.1 */}
                <div className="question-block">
                    <div className="small qindex">3.2.1 Explain the term fluctuation. (2 marks)</div>
                    <textarea
                        value={answers['3.2.1'] || ''}
                        onChange={(e) => onAnswerChange('3.2.1', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 3.2.2 */}
                <div className="question-block">
                    <div className="small qindex">3.2.2 Discuss the impact of a weak rand on the tourism industry in South Africa. (6 marks)</div>
                    <textarea
                        value={answers['3.2.2'] || ''}
                        onChange={(e) => onAnswerChange('3.2.2', e.target.value)}
                        placeholder="Your answer - focus on inbound tourism and multiplier effect"
                        rows="6"
                    />
                </div>
            </div>
        </section>
    );
};
export default SectionB;

