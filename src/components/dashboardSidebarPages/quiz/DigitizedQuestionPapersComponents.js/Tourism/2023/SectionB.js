import React from 'react';

const SectionB = ({ formData, handleInputChange, handleTextareaChange }) => {
    return (
        <section className="section" id="sectionB">
            <h2>SECTION B — Map Work & Foreign Exchange (50 marks)</h2>

            {/* Case Study 2.1 - Cape Town Cycle Tour */}
            <div className="card case-study">
                <div className="case-study-header">
                    <h3>Case Study 2.1 — The Cape Town Cycle Tour</h3>
                    <div className="case-study-intro">
                        Gordon and his family from London are participating in the Cape Town Cycle Tour on 12 March 2023.
                        They flew from London to Cape Town via Dubai, arriving on 9 March 2023.
                    </div>
                </div>

                {/* World Time Zone Map Image */}
                <div className="question-image large">
                    <div className="image-caption">World Time Zone Map</div>
                    <img
                        src="/images/timezone.jpg"
                        alt="World Time Zone Map showing different time zones"
                        className="case-study-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <div className="image-fallback" style={{display: 'none'}}>
                        [World Time Zone Map showing different time zones - London UTC+0, Cape Town UTC+2]
                    </div>
                </div>

                <div className="questions-container">
                    <div className="question-item">
                        <div className="small qindex">2.1.1 Calculate the time difference between London and Cape Town (2 marks)</div>
                        <input type="text" name="q2_11" value={formData.q2_11 || ''} onChange={handleInputChange} placeholder="Enter time difference (e.g., 2 hours)" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">2.1.2 Calculate arrival time in Cape Town when they landed on 9 March 2023 (4 marks)</div>
                        <input type="text" name="q2_12" value={formData.q2_12 || ''} onChange={handleInputChange} placeholder="Enter arrival time (e.g., 08:00)" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">2.1.3 Give TWO reasons why the family planned their trip so that they would arrive in South Africa three days before the race (4 marks)</div>
                        <textarea name="q2_13" value={formData.q2_13 || ''} onChange={handleTextareaChange} placeholder="Type your two reasons here..." rows="3" />
                    </div>
                </div>
            </div>

            {/* Case Study 2.2 - Customs */}
            <div className="card case-study">
                <div className="case-study-header">
                    <h3>Case Study 2.2 — Customs Declaration</h3>
                    <div className="case-study-intro">
                        The family arrives at Cape Town International Airport and needs to proceed through customs.
                        They have declared all items worth more than R50,000 and have prohibited goods to declare.
                    </div>
                </div>

                {/* Customs Channel Image */}
                <div className="question-image">
                    <div className="image-caption">Customs Declaration Channels</div>
                    <img
                        src="/images/customs-channels.jpg"
                        alt="Red and Green channels at customs"
                        className="case-study-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <div className="image-fallback" style={{display: 'none'}}>
                        [Picture showing Red and Green channels at customs - Red channel for goods to declare, Green channel for nothing to declare]
                    </div>
                    <div className="image-source">Source: www.shutterstock.com</div>
                </div>

                <div className="questions-container">
                    <div className="question-item">
                        <div className="small qindex">2.2.1 (a) Which channel should the family proceed to? (1 mark)</div>
                        <div className="options">
                            <label><input type="radio" name="q2_21" value="green" onChange={handleInputChange} checked={formData.q2_21 === 'green'} /> Green channel</label>
                            <label><input type="radio" name="q2_21" value="red" onChange={handleInputChange} checked={formData.q2_21 === 'red'} /> Red channel</label>
                        </div>
                    </div>

                    <div className="question-item">
                        <div className="small qindex">2.2.1 (b) Give TWO reasons for your answer (4 marks)</div>
                        <textarea name="q2_22" value={formData.q2_22 || ''} onChange={handleTextareaChange} placeholder="Type your two reasons here..." rows="3" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">2.2.2 (a) Name the government body that employs customs officials (1 mark)</div>
                        <input type="text" name="q2_23" value={formData.q2_23 || ''} onChange={handleInputChange} placeholder="Answer (e.g., SARS)" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">2.2.2 (b) Explain TWO duties of the customs officials (4 marks)</div>
                        <textarea name="q2_24" value={formData.q2_24 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." rows="3" />
                    </div>
                </div>
            </div>

            {/* Case Study 2.3 - WhatsApp Time Difference */}
            <div className="card case-study">
                <div className="case-study-header">
                    <h3>Case Study 2.3 — International Communication</h3>
                    <div className="case-study-intro">
                        Gordon wants to send a WhatsApp message to his friend in New York about the race.
                        He needs to calculate the time difference considering Daylight Saving Time (DST).
                    </div>
                </div>

                {/* Time Zone Comparison Image */}
                <div className="question-image">
                    <div className="image-caption">Time Zone Comparison: South Africa vs New York</div>
                    <img
                        src="/images/comparison.jpg"
                        alt="Time zone comparison between South Africa and New York"
                        className="case-study-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <div className="image-fallback" style={{display: 'none'}}>
                        [Time zone comparison: South Africa (UTC+2) vs New York (UTC-4 with DST)]
                    </div>
                </div>

                <div className="questions-container">
                    <div className="question-item">
                        <div className="small qindex">2.3.1 If Gordon sent the message at 14:00 (South African time), what time would it be in New York? (Note: New York uses Daylight Saving Time) (2 marks)</div>
                        <input type="text" name="q2_31" value={formData.q2_31 || ''} onChange={handleInputChange} placeholder="Enter time (e.g., 08:00)" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">2.3.2 Explain why Daylight Saving Time affects the time difference calculation (2 marks)</div>
                        <textarea name="q2_32" value={formData.q2_32 || ''} onChange={handleTextareaChange} placeholder="Explain the effect of DST..." rows="2" />
                    </div>
                </div>
            </div>

            {/* Question 2.4 - Itinerary */}
            <div className="card">
                <div className="qtitle">Question 2.4 — Itinerary Planning (6 marks)</div>
                <div className="case-study-intro">
                    Complete the itinerary for Days 2 and 5. Include at least 1 adventure activity on both days and a shopping event before the race.
                </div>

                {/* Itinerary Table Image */}
                <div className="question-image">
                    <div className="image-caption">Partial Itinerary - Complete Days 2 and 5</div>
                    <img
                        src="/images/itinerary.jpg"
                        alt="Partial itinerary table showing days 1, 3, 4, 6"
                        className="case-study-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <div className="image-fallback" style={{display: 'none'}}>
                        [Itinerary Table:
                        Day 1: Arrival in Cape Town
                        Day 2: [To be completed]
                        Day 3: Table Mountain visit
                        Day 4: Wine tasting tour
                        Day 5: [To be completed]
                        Day 6: Cape Town Cycle Tour
                        Day 7: Departure]
                    </div>
                </div>

                <div className="small qindex">Complete Days 2 and 5 of the itinerary:</div>
                <textarea name="q2_41" value={formData.q2_41 || ''} onChange={handleTextareaChange} placeholder="Day 2: [Your plan]... Day 5: [Your plan]..." rows="4" />
            </div>

            {/* QUESTION 3 - Foreign Exchange */}
            <div className="card case-study">
                <div className="case-study-header">
                    <h3>QUESTION 3 — Foreign Exchange Case Study</h3>
                    <div className="case-study-intro">
                        Gordon needs to exchange British Pounds (GBP) for South African Rand (ZAR) for his expenses during the trip.
                        His grandmother advised him to buy his bicycle in South Africa due to exchange rate advantages.
                    </div>
                </div>

                <div className="questions-container">
                    <div className="question-item">
                        <div className="small qindex">3.1.1 (a) Do you think the rand was strong or weak against GBP and USD during this period? (1 mark)</div>
                        <select name="q3_11" value={formData.q3_11 || ''} onChange={handleInputChange}>
                            <option value="">--select--</option>
                            <option value="strong">Strong</option>
                            <option value="weak">Weak</option>
                        </select>
                    </div>

                    <div className="question-item">
                        <div className="small qindex">3.1.1 (b) Give ONE reason for your answer (2 marks)</div>
                        <input type="text" name="q3_12" value={formData.q3_12 || ''} onChange={handleInputChange} placeholder="Reason (1–2 sentences)" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">3.1.2 Explain THREE reasons why Gordon's grandmother insisted he buy the bicycle in South Africa (6 marks)</div>
                        <textarea name="q3_13" value={formData.q3_13 || ''} onChange={handleTextareaChange} placeholder="Type your three reasons here..." rows="4" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">3.1.3 Explain the term 'buying power' (2 marks)</div>
                        <input type="text" name="q3_14" value={formData.q3_14 || ''} onChange={handleInputChange} placeholder="Explain buying power..." />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">3.1.4 Convert GBP 3000 to ZAR using the exchange rate GBP 1 = ZAR 21.98 (3 marks)</div>
                        <input type="text" name="q3_15_work" value={formData.q3_15_work || ''} onChange={handleInputChange} placeholder="Show working (optional)" />
                        <input type="text" name="q3_15" value={formData.q3_15 || ''} onChange={handleInputChange} placeholder="Numeric answer (e.g., 65940.00)" style={{marginTop: '8px'}} />
                    </div>
                </div>

                {/* Exchange Rate Graph Image */}
                <div className="question-image large">
                    <div className="image-caption">ZAR/USD Exchange Rate Fluctuation (January - March 2023)</div>
                    <img
                        src="/images/graph.jpg"
                        alt="Graph showing fluctuation of ZAR against USD from January to March 2023"
                        className="case-study-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <div className="image-fallback" style={{display: 'none'}}>
                        [Graph showing fluctuation of ZAR against USD from January to March 2023
                        X-axis: Dates from 09-Jan to 15-Mar
                        Y-axis: Exchange rate from R16.80 to R18.80
                        Peak: R18.80 on 15 March 2023
                        Lowest: R16.80 on 14 January 2023]
                    </div>
                    <div className="image-source">Source: www.iol.com</div>
                </div>

                <div className="questions-container">
                    <div className="question-item">
                        <div className="small qindex">3.2.1 Identify the highest exchange rate and the date it occurred (2 marks)</div>
                        <input type="text" name="q3_21" value={formData.q3_21 || ''} onChange={handleInputChange} placeholder="e.g., R18.80 on 15 March 2023" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">3.2.2 Identify the lowest exchange rate and the date it occurred (2 marks)</div>
                        <input type="text" name="q3_22" value={formData.q3_22 || ''} onChange={handleInputChange} placeholder="e.g., R16.80 on 14 Jan 2023" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">3.2.3 Give TWO reasons why the South African rand fell to a new low against the US dollar during this period (4 marks)</div>
                        <textarea name="q3_23" value={formData.q3_23 || ''} onChange={handleTextareaChange} placeholder="Type your two reasons here..." rows="3" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionB;

