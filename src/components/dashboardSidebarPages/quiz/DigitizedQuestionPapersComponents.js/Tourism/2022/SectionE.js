import React from 'react';
const SectionE = ({ answers, onAnswerChange }) => {
    return (
        <section className="section">
            <h2>SECTION E: DOMESTIC, REGIONAL AND INTERNATIONAL TOURISM; COMMUNICATION AND CUSTOMER CARE (30 marks)</h2>

            {/* QUESTION 9 */}
            <div className="card">
                <div className="qtitle">QUESTION 9: International Tourism Impacts [20 marks]</div>

                {/* Newspaper Article */}
                <div className="case-study">
                    <h4>FARAWAY CONFLICT, LOCAL CONSEQUENCES</h4>
                    <h5>How the war in Ukraine will affect South Africa's tourism industry</h5>
                    <p>
                        The conflict between Russia and Ukraine may seem far away. However, it
                        has serious consequences for South Africa and the country's tourism industry.
                    </p>
                </div>

                {/* 9.1.1 */}
                <div className="question-block">
                    <div className="small qindex">9.1.1 Choose the correct word: Russia and Ukraine are both located in the (Northern/Southern) Hemisphere. (2 marks)</div>
                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="9.1.1"
                                value="Northern"
                                checked={answers['9.1.1'] === 'Northern'}
                                onChange={(e) => onAnswerChange('9.1.1', e.target.value)}
                            />
                            Northern
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="9.1.1"
                                value="Southern"
                                checked={answers['9.1.1'] === 'Southern'}
                                onChange={(e) => onAnswerChange('9.1.1', e.target.value)}
                            />
                            Southern
                        </label>
                    </div>
                </div>

                {/* 9.1.2 */}
                <div className="question-block">
                    <div className="small qindex">9.1.2 Identify, from the extract, TWO impacts that the war between Russia and Ukraine has on South Africa. (4 marks)</div>
                    <textarea
                        value={answers['9.1.2'] || ''}
                        onChange={(e) => onAnswerChange('9.1.2', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* 9.1.3 */}
                <div className="question-block">
                    <div className="small qindex">9.1.3 Discuss THREE ways in which the travel needs of inbound international tourists will be negatively affected during their stay in South Africa. (6 marks)</div>
                    <textarea
                        value={answers['9.1.3'] || ''}
                        onChange={(e) => onAnswerChange('9.1.3', e.target.value)}
                        placeholder="Your answer"
                        rows="6"
                    />
                </div>

                {/* Provincial Share Map */}
                <div className="question-block">
                    <div className="small qindex">9.2 Study the map showing provincial share of international tourist arrivals</div>
                    <div className="image-container">
                        <img src="/images/South-Africa-Provinces.jpg" alt="Provincial Share of International Tourist Arrivals" />
                    </div>
                </div>

                {/* 9.2.1 */}
                <div className="question-block">
                    <div className="small qindex">9.2.1 Arrange the THREE provinces that received the most international visitors from most to least. (2 marks)</div>
                    <textarea
                        value={answers['9.2.1'] || ''}
                        onChange={(e) => onAnswerChange('9.2.1', e.target.value)}
                        placeholder="List provinces in order"
                        rows="3"
                    />
                </div>

                {/* 9.2.2 */}
                <div className="question-block">
                    <div className="small qindex">9.2.2 Give ONE reason for the low international visitor numbers to North West and Northern Cape provinces. (2 marks)</div>
                    <textarea
                        value={answers['9.2.2'] || ''}
                        onChange={(e) => onAnswerChange('9.2.2', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>
            </div>

            {/* QUESTION 10 */}
            <div className="card">
                <div className="qtitle">QUESTION 10: Customer Service and Satisfaction [10 marks]</div>

                <div className="image-container">
                    <img src="/images/fish.jpg" alt="Client Satisfaction Survey Results" />
                </div>

                {/* 10.1 */}
                <div className="question-block">
                    <div className="small qindex">10.1 Give ONE reason why the owner of The Blue Fish restaurant felt the need to conduct the survey. (2 marks)</div>
                    <textarea
                        value={answers['10.1'] || ''}
                        onChange={(e) => onAnswerChange('10.1', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 10.2 */}
                <div className="question-block">
                    <div className="small qindex">10.2 Refer to the survey results and identify the staff members who should receive the cash incentives. (2 marks)</div>
                    <input
                        type="text"
                        value={answers['10.2'] || ''}
                        onChange={(e) => onAnswerChange('10.2', e.target.value)}
                        placeholder="Your answer"
                    />
                </div>

                {/* 10.3 */}
                <div className="question-block">
                    <div className="small qindex">10.3 Give TWO reasons for your answer to QUESTION 10.2. (4 marks)</div>
                    <textarea
                        value={answers['10.3'] || ''}
                        onChange={(e) => onAnswerChange('10.3', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* 10.4 */}
                <div className="question-block">
                    <div className="small qindex">10.4 Recommend ONE strategy that can increase visitor numbers and profitability for the restaurant. (2 marks)</div>
                    <textarea
                        value={answers['10.4'] || ''}
                        onChange={(e) => onAnswerChange('10.4', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>
            </div>
        </section>
    );
};

export default SectionE;
