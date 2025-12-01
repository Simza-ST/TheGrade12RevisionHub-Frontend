import React from 'react';

const SectionC = ({ answers, onAnswerChange }) => {
    const worldIcons = [
        { id: 'A', name: 'Mecca (Kaabah, Mosque)' },
        { id: 'B', name: 'The Parthenon' },
        { id: 'C', name: 'Dome of the Rock' },
        { id: 'D', name: 'Blue Mosque' },
        { id: 'E', name: 'Eiffel Tower' },
        { id: 'F', name: 'Taj Mahal' }
    ];

    return (
        <section className="section">
            <h2>SECTION C: TOURIST ATTRACTIONS; CULTURE AND HERITAGE TOURISM; MARKETING (50 marks)</h2>

            {/* QUESTION 4 */}
            <div className="card">
                <div className="qtitle">QUESTION 4: World Icons and Heritage Sites [30 marks]</div>

                {/* 4.1.1 World Icons with Images */}
                <div className="question-block">
                    <div className="small qindex">4.1.1 Identify icons A to F in the pictures above. (6 marks)</div>

                    {/* World Icons Images Grid */}
                    <div className="icons-grid">
                        {worldIcons.map((icon) => (
                            <div key={icon.id} className="icon-item">
                                <div className="image-container">
                                    <img
                                        src={`/images/world-icons/${icon.id.toLowerCase()}.jpg`}
                                        alt={`World Icon ${icon.id}`}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="image-placeholder" style={{display: 'none'}}>
                                        Icon {icon.id} Image
                                    </div>
                                </div>
                                <div className="icon-label">Icon {icon.id}</div>
                                <input
                                    type="text"
                                    value={answers[`4.1.1${icon.id}`] || ''}
                                    onChange={(e) => onAnswerChange(`4.1.1${icon.id}`, e.target.value)}
                                    placeholder={`Name of Icon ${icon.id}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4.1.2 */}
                <div className="question-block">
                    <div className="small qindex">4.1.2 Explain the difference between an icon and an attraction. (4 marks)</div>
                    <textarea
                        value={answers['4.1.2'] || ''}
                        onChange={(e) => onAnswerChange('4.1.2', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* 4.1.3 */}
                <div className="question-block">
                    <div className="small qindex">4.1.3 Describe TWO unique features of EACH of the icons below: (8 marks)</div>

                    <div className="sub-question">
                        <div className="small qindex">(a) Icon B (The Parthenon)</div>
                        <textarea
                            value={answers['4.1.3a'] || ''}
                            onChange={(e) => onAnswerChange('4.1.3a', e.target.value)}
                            placeholder="Describe two unique features of The Parthenon"
                            rows="3"
                        />
                    </div>

                    <div className="sub-question">
                        <div className="small qindex">(b) Icon D (Blue Mosque)</div>
                        <textarea
                            value={answers['4.1.3b'] || ''}
                            onChange={(e) => onAnswerChange('4.1.3b', e.target.value)}
                            placeholder="Describe two unique features of the Blue Mosque"
                            rows="3"
                        />
                    </div>
                </div>

                {/* 4.1.4 */}
                <div className="question-block">
                    <div className="small qindex">4.1.4 Discuss why icon E (Eiffel Tower) is considered the most visited icon in France. (4 marks)</div>
                    <textarea
                        value={answers['4.1.4'] || ''}
                        onChange={(e) => onAnswerChange('4.1.4', e.target.value)}
                        placeholder="Include ONE unique feature and ONE economic benefit"
                        rows="4"
                    />
                </div>

                {/* Mount Fuji Section */}
                <div className="question-block">
                    <div className="small qindex">4.2 Study the information about Mount Fuji</div>
                    <div className="image-container">
                        <img
                            src="/images/mount-fuji.jpg"
                            alt="Mount Fuji Hiking Trails"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="image-placeholder" style={{display: 'none'}}>
                            Mount Fuji Hiking Trails Map
                        </div>
                    </div>

                    <div className="case-study">
                        <p><strong>FABULOUS MOUNT FUJI</strong></p>
                        <p>Tourism is beneficial to the communities located around Mount Fuji. However, there are also many challenges caused by the influx of tourists and the high levels of pollution caused by litter.</p>
                    </div>
                </div>

                {/* 4.2.1 */}
                <div className="question-block">
                    <div className="small qindex">4.2.1 Name the country where Mount Fuji is located. (2 marks)</div>
                    <input
                        type="text"
                        value={answers['4.2.1'] || ''}
                        onChange={(e) => onAnswerChange('4.2.1', e.target.value)}
                        placeholder="Your answer"
                    />
                </div>

                {/* 4.2.2 */}
                <div className="question-block">
                    <div className="small qindex">4.2.2 Name ONE negative impact of mass tourism (over-tourism) on Mount Fuji. (2 marks)</div>
                    <textarea
                        value={answers['4.2.2'] || ''}
                        onChange={(e) => onAnswerChange('4.2.2', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 4.2.3 */}
                <div className="question-block">
                    <div className="small qindex">4.2.3 Suggest TWO sustainable and responsible practices for better management of Mount Fuji. (4 marks)</div>
                    <textarea
                        value={answers['4.2.3'] || ''}
                        onChange={(e) => onAnswerChange('4.2.3', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>
            </div>

            {/* QUESTION 5 - GEMS OF THE NORTHERN CAPE */}
            <div className="card">
                <div className="qtitle">QUESTION 5: South African Heritage Sites [10 marks]</div>

                <div className="image-container">
                    <img
                        src="/images/gems.jpg"
                        alt="Gems of the Northern Cape"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="image-placeholder" style={{display: 'none'}}>
                        Northern Cape World Heritage Sites
                    </div>
                </div>

                <div className="case-study">
                    <h4>GEMS OF THE NORTHERN CAPE</h4>
                    <p>The San and the Nama people are associated with (linked to) World Heritage Sites A and B.</p>
                </div>

                {/* 5.1 */}
                <div className="question-block">
                    <div className="small qindex">5.1 Identify World Heritage Sites A and B in the pictures above. (4 marks)</div>
                    <div className="row">
                        <div className="col">
                            <strong>Site A:</strong>
                            <input
                                type="text"
                                value={answers['5.1A'] || ''}
                                onChange={(e) => onAnswerChange('5.1A', e.target.value)}
                                placeholder="Name of Site A"
                            />
                        </div>
                        <div className="col">
                            <strong>Site B:</strong>
                            <input
                                type="text"
                                value={answers['5.1B'] || ''}
                                onChange={(e) => onAnswerChange('5.1B', e.target.value)}
                                placeholder="Name of Site B"
                            />
                        </div>
                    </div>
                </div>

                {/* 5.2.1 */}
                <div className="question-block">
                    <div className="small qindex">5.2.1 Give ONE reason why it is important to protect the culture of the San and the Nama people. (2 marks)</div>
                    <textarea
                        value={answers['5.2.1'] || ''}
                        onChange={(e) => onAnswerChange('5.2.1', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 5.2.2 */}
                <div className="question-block">
                    <div className="small qindex">5.2.2 Explain ONE way in which the San people showcase their culture to visitors. (2 marks)</div>
                    <textarea
                        value={answers['5.2.2'] || ''}
                        onChange={(e) => onAnswerChange('5.2.2', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 5.3 */}
                <div className="question-block">
                    <div className="small qindex">5.3 Discuss ONE way in which the province benefits from the World Heritage Sites. (2 marks)</div>
                    <textarea
                        value={answers['5.3'] || ''}
                        onChange={(e) => onAnswerChange('5.3', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>
            </div>

            {/* QUESTION 6 - AFRICA'S TRAVEL INDABA */}
            <div className="card">
                <div className="qtitle">QUESTION 6: Tourism Marketing [10 marks]</div>

                <div className="image-container">
                    <img
                        src="/images/indaba.jpg"
                        alt="Africa Travel Indaba 2022"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="image-placeholder" style={{display: 'none'}}>
                        Africa Travel Indaba 2022 Banner
                    </div>
                </div>

                <div className="case-study">
                    <h4>AFRICA'S TRAVEL INDABA 2022</h4>
                    <p><strong>AFRICA'S STORIES. YOUR SUCCESS.</strong></p>
                    <p>TELL YOUR STORY AT AFRICA'S BIGGEST TRAVEL TRADE SHOW</p>
                    <p>SATourism uses Africa's Travel Indaba to market South Africa nationally and internationally.</p>
                </div>

                {/* 6.1 */}
                <div className="question-block">
                    <div className="small qindex">6.1 Give the definition of a travel trade show. (2 marks)</div>
                    <textarea
                        value={answers['6.1'] || ''}
                        onChange={(e) => onAnswerChange('6.1', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 6.2 */}
                <div className="question-block">
                    <div className="small qindex">6.2 Name ONE other travel trade show held in South Africa. (2 marks)</div>
                    <input
                        type="text"
                        value={answers['6.2'] || ''}
                        onChange={(e) => onAnswerChange('6.2', e.target.value)}
                        placeholder="Your answer"
                    />
                </div>

                {/* 6.3 */}
                <div className="question-block">
                    <div className="small qindex">6.3 Explain the THREE steps on how the 1% levy collected from tourism businesses is used to market South Africa. (6 marks)</div>
                    <textarea
                        value={answers['6.3'] || ''}
                        onChange={(e) => onAnswerChange('6.3', e.target.value)}
                        placeholder="Explain three steps"
                        rows="6"
                    />
                </div>
            </div>
        </section>
    );
};

export default SectionC;
