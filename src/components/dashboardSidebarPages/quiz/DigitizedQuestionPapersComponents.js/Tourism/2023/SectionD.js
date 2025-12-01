import React from 'react';

const SectionD = ({ formData, handleInputChange, handleTextareaChange }) => {
    return (
        <section className="section" id="sectionD">
            <h2>SECTION D — Tourism Sectors; Sustainable & Responsible Tourism (30 marks)</h2>

            {/* Question 7 - Airline Crew */}
            <div className="card">
                <div className="qtitle">Question 7 — Airline uniform & cabin crew (10 marks)</div>

                {/* IMAGE PLACEHOLDER: Airline Crew */}
                <div className="image-placeholder">
                    <h4>PROFESSIONAL IMAGE OF AN AIRLINE CREW WOULD APPEAR HERE</h4>
                    <div className="crew-image">
                        [Image of professional airline crew in uniform]
                    </div>
                    <div className="image-source">Adapted from www.thedesignair.net</div>
                </div>

                {/* 7.1 - Uniform discussion */}
                <div className="small qindex">7.1 Discuss TWO ways in which the correct manner in which employees wear a uniform contributes to the professional image of an airline. (4 marks)</div>
                <textarea
                    name="q7_11"
                    value={formData.q7_11 || ''}
                    onChange={handleTextareaChange}
                    placeholder="Discuss two ways uniform wearing contributes to professional image..."
                    rows="4"
                />

                {/* 7.2 - Complete the sentence */}
                <div className="small qindex" style={{marginTop: '15px'}}>7.2 Complete the sentence below: (2 marks)</div>
                <div className="sentence-completion">
                    The staff responsible for the safety of passengers onboard the aircraft is the
                    <input
                        type="text"
                        name="q7_12"
                        value={formData.q7_12 || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., cabin crew"
                        style={{width: '200px', margin: '0 8px'}}
                    />
                    .
                </div>

                {/* 7.3 - Code of conduct conditions */}
                <div style={{marginTop: '15px'}}>
                    <div className="small qindex">7.3 The cabin crew of an airline has many responsibilities. Give ONE condition as part of the airline's code of conduct on the following: (4 marks)</div>

                    <div style={{marginTop: '10px'}}>
                        <div className="small qindex">7.3.1 Punctuality (2 marks)</div>
                        <input
                            type="text"
                            name="q7_13"
                            value={formData.q7_13 || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., Arrive at least 30 minutes before departure"
                            style={{width: '100%'}}
                        />
                    </div>

                    <div style={{marginTop: '10px'}}>
                        <div className="small qindex">7.3.2 Treatment of passengers (2 marks)</div>
                        <input
                            type="text"
                            name="q7_14"
                            value={formData.q7_14 || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., Always address passengers respectfully"
                            style={{width: '100%'}}
                        />
                    </div>
                </div>
            </div>

            {/* Question 8 - Weeva & Sustainability */}
            <div className="card">
                <div className="qtitle">Question 8 — Weeva Technology & Sustainability (20 marks)</div>

                {/* 8.1 - Definition */}
                <div className="small qindex">8.1 Give ONE word for the definition below: (2 marks)</div>
                <div className="definition-box">
                    "Using resources in a way that meets the needs of current generations without compromising the needs of future generations"
                </div>
                <input
                    type="text"
                    name="q8_11"
                    value={formData.q8_11 || ''}
                    onChange={handleInputChange}
                    placeholder="e.g., Sustainability"
                    style={{width: '200px', marginTop: '8px'}}
                />

                {/* 8.2 - Sustainable practices */}
                <div style={{marginTop: '20px'}}>
                    <div className="small qindex">8.2 Hotel groups can reduce their impact on the environment in different ways. Discuss TWO ways how the hotel can manage EACH of the following sustainable practices to reduce their impact on the environment: (8 marks)</div>

                    <div style={{marginTop: '15px'}}>
                        <div className="small qindex">8.2.1 Water management (4 marks)</div>
                        <textarea
                            name="q8_21"
                            value={formData.q8_21 || ''}
                            onChange={handleTextareaChange}
                            placeholder="Discuss two ways for water management..."
                            rows="4"
                        />
                    </div>

                    <div style={{marginTop: '15px'}}>
                        <div className="small qindex">8.2.2 Energy management (4 marks)</div>
                        <textarea
                            name="q8_22"
                            value={formData.q8_22 || ''}
                            onChange={handleTextareaChange}
                            placeholder="Discuss two ways for energy management..."
                            rows="4"
                        />
                    </div>
                </div>

                {/* 8.3 - Positive economic impacts */}
                <div style={{marginTop: '20px'}}>
                    <div className="small qindex">8.3 Discuss THREE positive impacts of tourism on the global economy. (6 marks)</div>
                    <textarea
                        name="q8_23"
                        value={formData.q8_23 || ''}
                        onChange={handleTextareaChange}
                        placeholder="Discuss three positive economic impacts of tourism..."
                        rows="5"
                    />
                </div>

                {/* 8.4 - Encouraging Weeva usage */}
                <div style={{marginTop: '20px'}}>
                    <div className="small qindex">8.4 The Weeva digital system is designed to track environmental and social impacts of tourism businesses. Many tourism businesses, however, are NOT in favour of using this new system as it may expose their carbon footprint. Suggest TWO ways in which you would encourage these businesses to make use of the Weeva digital system and thereby enjoy the benefits of reduced environmental impacts. (4 marks)</div>
                    <textarea
                        name="q8_24"
                        value={formData.q8_24 || ''}
                        onChange={handleTextareaChange}
                        placeholder="Suggest two ways to encourage Weeva system usage..."
                        rows="4"
                    />
                </div>
            </div>
        </section>
    );
};

export default SectionD;