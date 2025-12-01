import React from 'react';

const SectionE = ({ formData, handleInputChange, handleTextareaChange }) => {
    return (
        <section className="section" id="sectionE">
            <h2>SECTION E — Domestic, Regional & International Tourism; Communication & Customer Care (30 marks)</h2>

            {/* Question 9 - World Cup & Kruger NP */}
            <div className="card">
                <div className="qtitle">Question 9 — World Cup & Kruger National Park (20 marks)</div>

                {/* IMAGE PLACEHOLDER: World Cup Map */}
                <div className="image-placeholder large">
                    <h4>2026 FIFA WORLD CUP MAP WOULD APPEAR HERE</h4>
                    <div className="map-container">
                        [Map of North America showing USA, Canada, and Mexico with host cities marked]
                    </div>
                    <div className="image-source">Source: www.future.fandom.com</div>
                </div>

                <div className="small qindex">9.1.1 Give ONE reason why the extract refers to a continent and not to a single country (2 marks)</div>
                <input type="text" name="q9_11" value={formData.q9_11 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />

                <div className="small qindex">9.1.2 Identify TWO reasons why the 2026 FIFA World Cup will be unique (4 marks)</div>
                <textarea name="q9_12" value={formData.q9_12 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." />

                <div className="small qindex">9.1.3 Give TWO reasons why the 2026 FIFA World Cup is considered a global event (4 marks)</div>
                <textarea name="q9_13" value={formData.q9_13 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." />

                <div className="small qindex">9.1.4 Discuss ONE positive impact the FIFA World Cup will have on the economy of the North American continent (2 marks)</div>
                <input type="text" name="q9_14" value={formData.q9_14 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />

                <div className="small qindex">9.1.5 Explain the concept multiple-entry visa (2 marks)</div>
                <input type="text" name="q9_15" value={formData.q9_15 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />

                {/* IMAGE PLACEHOLDER: Kruger Park Graphs */}
                <div className="image-placeholder large" style={{marginTop: '15px'}}>
                    <h4>KRUGER NATIONAL PARK VISITOR GRAPHS WOULD APPEAR HERE</h4>
                    <div className="graphs-container">
                        <div className="graph">
                            [Graph A: International visitors % - USA 10.7%, UK 11.3%, Germany 26%]
                        </div>
                        <div className="graph">
                            [Graph B: Domestic visitors % - Gauteng 31%, Mpumalanga 30.4%, Limpopo 22.3%]
                        </div>
                    </div>
                    <div className="image-source">Adapted from www.tourismupdate.co.za</div>
                </div>

                <div className="small qindex">9.2.1 From graph A, identify the core market with the lowest visitor numbers (2 marks)</div>
                <input type="text" name="q9_21" value={formData.q9_21 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />

                <div className="small qindex">9.2.2 Discuss ONE reason why both Mpumalanga and Limpopo are considered two of the top three provinces for domestic visitors to the Kruger National Park (2 marks)</div>
                <input type="text" name="q9_22" value={formData.q9_22 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />

                <div className="small qindex">9.2.3 Give ONE reason why the recorded visitor numbers are compared to the 2019 season and not to the 2020/2021 season (2 marks)</div>
                <input type="text" name="q9_23" value={formData.q9_23 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />
            </div>

            {/* Question 10 - Customer Service */}
            <div className="card">
                <div className="qtitle">Question 10 — Customer service infographic & cartoon (10 marks)</div>

                {/* IMAGE PLACEHOLDER: Infographic */}
                <div className="image-placeholder">
                    <h4>CUSTOMER SERVICE INFOGRAPHIC WOULD APPEAR HERE</h4>
                    <div className="infographic-content">
                        [Infographic: "Tourism Businesses Take Note – Numbers Do Not Lie"]
                        <br />
                        • To win a new customer is 6–7 times more expensive than to keep a current one
                        <br />
                        • Loyal customers are worth up to 10 times as much as their first purchase
                        <br />
                        • 78% of customers will not purchase again after poor service
                        <br />
                        • It takes 12 positive experiences to make up for one negative one
                        <br />
                        • Bad service reaches more than twice as many ears as praise for good service
                    </div>
                    <div className="image-source">Source: www.ariscommunity.com</div>
                </div>

                {/* IMAGE PLACEHOLDER: Cartoon */}
                <div className="image-placeholder">
                    <h4>CUSTOMER SERVICE CARTOON WOULD APPEAR HERE</h4>
                    <div className="cartoon-content">
                        [Cartoon: "Oh, The Disappointment!" showing customer complaining about poor service]
                    </div>
                    <div className="image-source">Own creation</div>
                </div>

                <div className="small qindex">10.1.1 Explain TWO reasons why the findings above are important to tourism businesses (4 marks)</div>
                <textarea name="q10_11" value={formData.q10_11 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." />

                <div className="small qindex">10.1.2 Explain the meaning of: "It takes 12 positive experiences to make up for one negative one" (2 marks)</div>
                <input type="text" name="q10_12" value={formData.q10_12 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />

                <div className="small qindex">10.2.1 State ONE way in which management could respond appropriately to the customer (2 marks)</div>
                <input type="text" name="q10_21" value={formData.q10_21 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />

                <div className="small qindex">10.2.2 Recommend ONE strategy a company can use to win back the customer's loyalty (2 marks)</div>
                <input type="text" name="q10_22" value={formData.q10_22 || ''} onChange={handleInputChange} placeholder="Type your answer here..." />
            </div>
        </section>
    );
};

export default SectionE;