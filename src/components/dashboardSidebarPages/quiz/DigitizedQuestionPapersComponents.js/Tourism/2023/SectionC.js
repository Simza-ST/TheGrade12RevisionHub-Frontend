
import React from 'react';

const SectionC = ({ formData, handleInputChange, handleTextareaChange }) => {
    // Helper function for the improved error handler
    const handleImageError = (e) => {
        e.target.style.display = 'none';
        // Set display to 'flex' to ensure the fallback text is centered as intended
        if (e.target.nextSibling) {
            e.target.nextSibling.style.display = 'flex';
        }
    };

    return (
        <section className="section" id="sectionC">
            <h2>SECTION C — Tourist Attractions; Culture & Heritage; Marketing (50 marks)</h2>

            {/* Question 4.1 - Icons/Attractions */}
            <div className="card">
                <div className="qtitle">Question 4.1 — Identify icons & reasons (14 marks)</div>

                {/* Icons Images Grid */}
                <div className="icons-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '20px'}}>
                    {/* Icon A - Bullfighting */}
                    <div className="icon-item" style={{textAlign: 'center'}}>
                        <div className="icon-label">A</div>
                        <div className="question-image">
                            <img
                                src="/images/bullfighting.jpg"
                                alt="Bullfighting entertainment"
                                className="icon-image"
                                onError={handleImageError} // Using the fixed handler
                            />
                            <div className="image-fallback" style={{ border: '1px solid #ccc', padding: '20px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                [Image A: Bullfighting - Matador entertainment]
                            </div>
                        </div>
                    </div>

                    {/* Icon B - Statue of Liberty */}
                    <div className="icon-item" style={{textAlign: 'center'}}>
                        <div className="icon-label">B</div>
                        <div className="question-image">
                            <img
                                src="/images/statue.jpg"
                                alt="Statue of Liberty"
                                className="icon-image"
                                onError={handleImageError} // Using the fixed handler
                            />
                            <div className="image-fallback" style={{ border: '1px solid #ccc', padding: '20px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                [Image B: Statue of Liberty - Symbol of democracy]
                            </div>
                        </div>
                    </div>

                    {/* Icon C - Floating Market */}
                    <div className="icon-item" style={{textAlign: 'center'}}>
                        <div className="icon-label">C</div>
                        <div className="question-image">
                            <img
                                src="/images/floating.jpg"
                                alt="Floating Market in Thailand"
                                className="icon-image"
                                onError={handleImageError} // Using the fixed handler
                            />
                            <div className="image-fallback" style={{border: '1px solid #ccc', padding: '20px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                [Image C: Floating Market - Traditional Thai market]
                            </div>
                        </div>
                    </div>

                    {/* Icon D - Grand Canyon */}
                    <div className="icon-item" style={{textAlign: 'center'}}>
                        <div className="icon-label">D</div>
                        <div className="question-image">
                            <img
                                src="/images/grand.jpg"
                                alt="Grand Canyon"
                                className="icon-image"
                                onError={handleImageError} // Using the fixed handler
                            />
                            <div className="image-fallback" style={{border: '1px solid #ccc', padding: '20px', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                [Image D: Grand Canyon - Red rock formation]
                            </div>
                        </div>
                    </div>
                </div>

                <div className="small qindex">4.1.1 Identify icons (4 x 1 mark)</div>
                <div className="row">
                    <div className="col">
                        <input type="text" name="q4_11a" value={formData.q4_11a || ''} onChange={handleInputChange} placeholder="4.1.1(a) The matador entertainment" />
                    </div>
                    <div className="col">
                        <input type="text" name="q4_11b" value={formData.q4_11b || ''} onChange={handleInputChange} placeholder="4.1.1(b) Symbol of democracy" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="text" name="q4_11c" value={formData.q4_11c || ''} onChange={handleInputChange} placeholder="4.1.1(c) Market in Thailand" />
                    </div>
                    <div className="col">
                        <input type="text" name="q4_11d" value={formData.q4_11d || ''} onChange={handleInputChange} placeholder="4.1.1(d) Red rock formation" />
                    </div>
                </div>

                <div className="small qindex">4.1.2 (a) Identify TWO World Heritage Sites from the icons above (2 marks)</div>
                <input type="text" name="q4_12" value={formData.q4_12 || ''} onChange={handleInputChange} placeholder="Two sites (comma separated)" />

                <div className="small qindex">4.1.2 (b) Explain TWO reasons why both sites must be protected (4 marks)</div>
                <textarea name="q4_12b" value={formData.q4_12b || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." rows="3" />

                <div className="small qindex">4.1.3 Describe ONE unique aspect of icon D (2 marks)</div>
                <textarea name="q4_13" value={formData.q4_13 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." rows="2" />

                <div className="small qindex">4.1.4 Discuss TWO reasons why certain people may believe bullfighting should be allowed to continue (4 marks)</div>
                <textarea name="q4_14" value={formData.q4_14 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." rows="3" />
            </div>

            {/* Question 4.2 - Machu Picchu */}
            <div className="card">
                <div className="qtitle">Question 4.2 — Machu Picchu closure (8 marks)</div>

                {/* Machu Picchu Image */}
                <div className="question-image">
                    <div className="image-caption">Machu Picchu - Ancient Inca City</div>
                    <img
                        src="/images/machu.jpg"
                        alt="Machu Picchu ancient ruins"
                        className="case-study-image"
                        onError={handleImageError} // Using the fixed handler
                    />
                    <div className="image-fallback" style={{border: '1px solid #ccc', padding: '30px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        [Image: Machu Picchu - Ancient Inca city in Peru, South America]
                    </div>
                    <div className="image-source">Source: UNESCO World Heritage Center</div>
                </div>

                <div className="small qindex">4.2.1 Name continent & country where Machu Picchu is located (2 marks)</div>
                <input type="text" name="q4_21" value={formData.q4_21 || ''} onChange={handleInputChange} placeholder="e.g., South America, Peru" />

                <div className="small qindex">4.2.2 Describe ONE physical feature that makes Machu Picchu a popular tourist attraction (2 marks)</div>
                <input type="text" name="q4_22" value={formData.q4_22 || ''} onChange={handleInputChange} placeholder="Short answer" />

                <div className="small qindex">4.2.3 Discuss TWO negative impacts of the closure of Machu Picchu (4 marks)</div>
                <textarea name="q4_23" value={formData.q4_23 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." rows="3" />
            </div>

            {/* Question 5 - Fynbos */}
            <div className="card">
                <div className="qtitle">Question 5 — South Africa's Flowers and Fynbos (16 marks)</div>

                {/* Fynbos Image */}
                <div className="question-image">
                    <div className="image-caption">Cape Floral Region - Fynbos Biome</div>
                    <img
                        src="/images/fynbos.jpg"
                        alt="South Africa's fabulous flowers and fynbos"
                        className="case-study-image"
                        onError={handleImageError} // Using the fixed handler
                    />
                    <div className="image-fallback" style={{border: '1px solid #ccc', padding: '30px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        [Image: South Africa's Fabulous Flowers and Fynbos - Cape Floral Region]
                    </div>
                    <div className="image-source">Source: www.unescoworldheritagecenter.org</div>
                </div>

                <div className="questions-container">
                    <div className="question-item">
                        <div className="small qindex">5.1.1 Identify the World Heritage Site (2 marks)</div>
                        <input type="text" name="q5_11" value={formData.q5_11 || ''} onChange={handleInputChange} placeholder="e.g., Cape Floral Region Protected Areas" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">5.1.2 Complete the sentence: The World Heritage Site can be classified as a ... site (2 marks)</div>
                        <input type="text" name="q5_12" value={formData.q5_12 || ''} onChange={handleInputChange} placeholder="e.g., natural" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">5.1.3 Name the province where the World Heritage Site is located (2 marks)</div>
                        <input type="text" name="q5_13" value={formData.q5_13 || ''} onChange={handleInputChange} placeholder="e.g., Western Cape" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">5.1.4 Name ONE other World Heritage Site in that province (2 marks)</div>
                        <input type="text" name="q5_14" value={formData.q5_14 || ''} onChange={handleInputChange} placeholder="e.g., Robben Island" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">5.2.1 Explain ONE value of the unique fynbos biome in attracting tourists to the area (2 marks)</div>
                        <input type="text" name="q5_21" value={formData.q5_21 || ''} onChange={handleInputChange} placeholder="Short answer" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">5.2.2 Discuss THREE threats of uncontrolled fires as a result of irresponsible tourist behaviour (6 marks)</div>
                        <textarea name="q5_22" value={formData.q5_22 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." rows="4" />
                    </div>
                </div>
            </div>

            {/* Question 6 - Meetings Africa */}
            <div className="card">
                <div className="qtitle">Question 6 — Meetings Africa & Marketing (12 marks)</div>

                {/* Meetings Africa Image */}
                <div className="question-image">
                    <div className="image-caption">Meetings Africa 2023 - Business Tourism Event</div>
                    <img
                        src="/images/meetings-africa.jpg"
                        alt="Meetings Africa 2023 event"
                        className="case-study-image"
                        onError={handleImageError} // Using the fixed handler
                    />
                    <div className="image-fallback" style={{border: '1px solid #ccc', padding: '30px', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        [Image: Meetings Africa 2023 - Business tourism event in South Africa]
                    </div>
                    <div className="image-source">Source: www.tourismupdate.co.za</div>
                </div>

                <div className="questions-container">
                    <div className="question-item">
                        <div className="small qindex">6.1 Name the marketing organisation responsible for hosting Meetings Africa 2023 (2 marks)</div>
                        <input type="text" name="q6_11" value={formData.q6_11 || ''} onChange={handleInputChange} placeholder="e.g., South African Tourism" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">6.2 Identify ONE type of tourist that will be attracted to this event (2 marks)</div>
                        <input type="text" name="q6_12" value={formData.q6_12 || ''} onChange={handleInputChange} placeholder="e.g., MICE tourist" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">6.3 Name TWO other international travel trade shows where South Africa is marketed (2 marks)</div>
                        <input type="text" name="q6_13" value={formData.q6_13 || ''} onChange={handleInputChange} placeholder="e.g., ITB Berlin, World Travel Market" />
                    </div>

                    <div className="question-item">
                        <div className="small qindex">6.4 Discuss TWO ways in which international travel trade shows can position South Africa as a destination of choice (6 marks)</div>
                        <textarea name="q6_14" value={formData.q6_14 || ''} onChange={handleTextareaChange} placeholder="Type your answer here..." rows="4" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SectionC;

