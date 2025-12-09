import React, { useState } from 'react';

const Question3 = ({ isAnswered }) => {
    const [showSolutions, setShowSolutions] = useState({});

    const toggleSolution = (question) => {
        setShowSolutions(prev => ({
            ...prev,
            [question]: !prev[question]
        }));
    };

    const isSolutionVisible = (question) => {
        return showSolutions[question] || false;
    };

    return (
        <div className="question" id="question-3">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 3: HOW DID DIFFERENT FORMS OF SIT-INS CONTRIBUTE TO DESEGREGATION OF PUBLIC FACILITIES IN THE UNITED STATES OF AMERICA (USA) DURING THE 1960s?
                </div>
                <div className="marks">(50)</div>
            </div>

            {/* SOURCE 3A */}
            <div className="source-material">
                <p><strong>SOURCE 3A</strong></p>
                <p>The source below has been taken from an article written by S Kitenge, titled 'Globalisation and the Covid-19 pandemic: How is Africa's economy impacted?' It focuses on how globalisation contributed to the spread of Covid-19.</p>

                <p>Since the rise of globalisation, the world has become more closely connected and people can easily interact with one other without facing any serious barriers. This has been both beneficial and detrimental (negative) to the social, political and economic spheres as far as the welfare of people is concerned. The free movement of people, goods and services brought about by globalisation have stimulated socio-economic development, but it has also become a channel for the spread of diseases. As a result of the technological developments associated with globalisation an outbreak, such as Covid-19, has turned into a major pandemic that affects people around the world regardless of their geographical location. According to K Lee, globalisation is defined as the 'changing nature of human interaction across a wide range of spheres including economic, political, social, technological and environmental … The process of change can be described as globalising in the sense that the boundaries of various kinds are becoming eroded'.</p>

                <p>Thus, it is fair to assert that globalisation, which made free movement of people from different cities, countries and continents possible, is the main enabler (source) of the spread of Covid-19 around the world. This is simply because technological advancement, which is one of the main forces for globalisation, has made it easier for people to travel by land, sea and air from one part of the world to another without facing any obstacles. If travellers have contracted a disease, such as Covid-19, in city or country (A), they can easily transmit it to the previously non-infected city or country (B) …</p>

                <div className="source-reference">[Adapted from S Kitenge, 'Globalisation and the Covid-19 pandemic']</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.1.1 Quote from the source the effects of the rise of globalisation on:</div>
                <p>(a) The world (1)</p>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.1.1a')}>
                    {isSolutionVisible('3.1.1a') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.1.1a') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. The World - 'has become more closely connected'</p>
                </div>

                <p>(b) People (1)</p>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.1.1b')}>
                    {isSolutionVisible('3.1.1b') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.1.1b') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. People - 'can easily interact with each other without facing any serious barriers'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.1.2 According to the source, how has the free movement of people, goods and services, brought about by globalisation, been:</div>
                <p>(a) Beneficial to the world (1)</p>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.1.2a')}>
                    {isSolutionVisible('3.1.2a') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.1.2a') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Beneficial - 'has stimulated socio-economic development'</p>
                </div>

                <p>(b) Detrimental to the world (1)</p>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.1.2b')}>
                    {isSolutionVisible('3.1.2b') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.1.2b') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Detrimental - 'it has also become a channel for the spread of diseases'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.1.3 Define the concept globalisation in your own words. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.1.3')}>
                    {isSolutionVisible('3.1.3') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.1.3') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Globalisation is a process whereby the world has become more integrated and connected/intertwining of borders due to technology</p>
                    <p>2. Globalisation describes the way in which people, goods, money and ideas are moved around the world faster and cheaper than ever before</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.1.4 Using the information in the source and your own knowledge, explain how technological advancement has contributed to Covid-19 becoming a global pandemic. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.1.4')}>
                    {isSolutionVisible('3.1.4') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.1.4') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Movement of people through aeroplanes</p>
                    <p>2. Movement of people through ships</p>
                    <p>3. Movement of people through rail</p>
                    <p>4. Movement of traded goods through air and sea</p>
                    <p>5. The role of media in rapid information spread</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            {/* SOURCE 3B */}
            <div className="source-material">
                <p><strong>SOURCE 3B</strong></p>
                <p>The source below is an extract from a speech delivered by President Cyril Ramaphosa on 15 March 2020. The speech deals with the measures that have to be taken to combat the spread of Covid-19 in South Africa.</p>
                <p>Fellow South Africans, I am addressing you this evening on a matter of great national importance. The world is facing a medical emergency far graver (serious) than what we have experienced in over a century. The World Health Organisation has declared the coronavirus outbreak as a global pandemic.</p>
                <p>From the start of the outbreak in China earlier this year, the South African government has put in place measures to screen visitors entering the country, to contain its spread and to treat those infected.</p>
                <p>Following an extensive analysis of the progression of the disease worldwide and in South Africa, Cabinet has decided on the following measures:</p>
                <p>Firstly, to limit contact between persons who may be infected and South African citizens, we are imposing a travel ban on foreign nationals from high-risk countries, such as Italy, Iran, South Korea, Spain, Germany, the United States, the United Kingdom and China as from 18 March 2020.</p>
                <div className="source-reference">[Speech by President Cyril Ramaphosa, 15 March 2020]</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.2.1 Name the international organisation that declared the coronavirus outbreak a global pandemic. (1)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.2.1')}>
                    {isSolutionVisible('3.2.1') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.2.1') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'The World Health Organisation'/'WHO'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.2.2 Explain the term pandemic in the context of Covid-19. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.2.2')}>
                    {isSolutionVisible('3.2.2') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.2.2') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. A disease that is prevalent globally – affecting all continents</p>
                    <p>2. A global disease caused by the coronavirus that spreads rapidly through close contact</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.2.3 Using the information in the source and your own knowledge, explain why it was necessary for the South African government to introduce measures to contain the spread of the coronavirus. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.2.3')}>
                    {isSolutionVisible('3.2.3') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.2.3') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. To prevent more people from getting infected with the virus</p>
                    <p>2. To reduce the number of hospital admissions and fatalities</p>
                    <p>3. To slow down the transmission of the virus</p>
                    <p>4. To protect the South African economy</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.2.4 Name any TWO high-risk countries in the source on which the South African government imposed a travel ban. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.2.4')}>
                    {isSolutionVisible('3.2.4') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.2.4') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Italy'</p>
                    <p>2. 'Iran'</p>
                    <p>3. 'South Korea'</p>
                    <p>4. 'Spain'</p>
                    <p>5. 'Germany'</p>
                    <p>6. 'United States'</p>
                    <p>7. 'United Kingdom'</p>
                    <p>8. 'China'</p>
                </div>
            </div>

            {/* SOURCE 3C */}
            <div className="source-material">
                <p><strong>SOURCE 3C</strong></p>
                <p>The source below is part of an article written by Vuyokazi Futshane (project officer of Oxfam South Africa) for the online magazine, The Conversation. It focuses on the economic impact that lockdown regulations have had in South Africa.</p>
                <p>Poverty and inequality have been heightened (increased) by the Covid-19 pandemic. When South Africa went into a hard lockdown on 26 March 2020, many informal workers and precarious (irregular) workers found themselves without any means of generating income.</p>
                <p>The National Income Dynamics Coronavirus Rapid Mobile Survey estimated that nearly three million people had lost their jobs because of the pandemic and the official unemployment rate now stands at a shockingly high rate of 30,1%.</p>
                <p>Townships and informal settlements whose demographic profile is predominately black people and people of colour who are employed in low-paying jobs that increase their risk of exposure to Covid-19, have become Covid-19 hotspots.</p>
                <p>This is because of dynamics, such as spatial planning, that hold the legacies of apartheid, such as the Group Areas Act in 1950 where black and non-white South Africans were forced to relocate to the areas outside of major cities and economic hubs (centres).</p>
                <div className="source-reference">[Adapted from Vuyokazi Futshane, The Conversation]</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.3.1 Identify ONE negative economic indicator mentioned in the source that was heightened by the Covid-19 pandemic. (1)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.3.1')}>
                    {isSolutionVisible('3.3.1') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.3.1') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Poverty'</p>
                    <p>2. 'Inequality'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.3.2 Using the information in the source and your own knowledge, explain how the Covid-19 pandemic left many black women without any means of generating an income. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.3.2')}>
                    {isSolutionVisible('3.3.2') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.3.2') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Many of them were informal workers who could no longer go out to generate income</p>
                    <p>2. Many of them became unemployed due to lockdown restrictions</p>
                    <p>3. They could no longer venture outside looking for work</p>
                    <p>4. Street vendors lost their customers who were observing the lockdown</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.3.3 According to the source, why are more South Africans now afraid of unemployment than of the Covid-19 pandemic? Give TWO reasons. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.3.3')}>
                    {isSolutionVisible('3.3.3') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.3.3') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'unemployment is more than a state of joblessness'</p>
                    <p>2. 'It means worrying about being able to afford everyday basic necessities'</p>
                    <p>3. 'how to send children to school'</p>
                    <p>4. 'how to stay healthy and nourished'</p>
                    <p>5. 'it means worrying being able to access health care'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.3.4 Give TWO reasons mentioned in the source why townships became Covid-19 hotspots. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.3.4')}>
                    {isSolutionVisible('3.3.4') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.3.4') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'These areas are largely underdeveloped'</p>
                    <p>2. 'overly populated'</p>
                    <p>3. 'have poor sanitation facilities'</p>
                    <p>4. 'lack of running water in many low-income communities'</p>
                    <p>5. 'a poorly structured public healthcare system'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.3.5 Explain the limitations of this source for a student researching the economic impact that lockdown has had on townships and informal settlements in South Africa. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.3.5')}>
                    {isSolutionVisible('3.3.5') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.3.5') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. The source is one-sided and only gives Futshane's views on how the lockdown regulations affected the poor</p>
                    <p>2. The source creates an impression that the hard lockdown was wrong</p>
                    <p>3. The source does not give insight into how the lockdown affected the middle class and the rich</p>
                    <p>4. The source creates the impression that only the poor were affected by the lockdown</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            {/* SOURCE 3D */}
            <div className="source-material">
                <p><strong>SOURCE 3D</strong></p>
                <p>The cartoon below, by H Mangena, appeared in an online publication of the African News Agency on 21 April 2020. The cartoon highlights the challenges faced by the poor as a result of the Covid-19 pandemic.</p>
                <div className="cartoon-placeholder">
                    <div style={{padding: '20px', background: '#f5f5f5', border: '1px solid #ccc', textAlign: 'center', fontStyle: 'italic'}}>
                        CARTOON: "BETWEEN A ROCK AND A HARD PLACE" showing poor mother with empty plate facing Covid-19 threat
                        <img
                            src="/images/SOURCE3DP221.png"
                            alt="Cartoon showing a poor mother holding an empty plate, facing the threat of Covid-19 with the caption 'BETWEEN A ROCK AND A HARD PLACE'"
                            style={{
                                display: 'block',
                                maxWidth: '100%',
                                height: 'auto',
                                border: '1px solid #ccc',
                                marginTop: '10px',
                                borderRadius: '5px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        />
                    </div>
                </div>
                <div className="source-reference">[Cartoon by H Mangena, African News Agency, 21 April 2020]</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.4.1 Explain what the cartoonist means by the caption, 'BETWEEN A ROCK AND A HARD PLACE', regarding the position of the poor. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.4.1')}>
                    {isSolutionVisible('3.4.1') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.4.1') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Poor South Africans found themselves between two enemies, Covid-19 on one hand and poverty and hunger on another</p>
                    <p>2. The danger posed by Covid-19 and poverty would kill the poor</p>
                    <p>3. There is no one to donate food when the poor went out begging</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.4.2 What messages are conveyed by the cartoonist regarding the Covid-19 pandemic? Use the visual clues in the source to support your answer. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.4.2')}>
                    {isSolutionVisible('3.4.2') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.4.2') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Covid-19 put the poor in danger of poverty, hunger and death</p>
                    <p>2. Poor South Africans were scared of the Covid-19 pandemic because of the deaths it caused</p>
                    <p>3. The Covid-19 pandemic was a threat to the livelihood of the poor</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.5 Study Sources 3C and 3D. Explain how the information in Source 3C supports the evidence in Source 3D regarding the impact that the lockdown has had on the poor. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.5')}>
                    {isSolutionVisible('3.5') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.5') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Source 3C states that poverty and inequality had been heightened by Covid-19 and Source 3D shows poverty and hunger affecting the poor</p>
                    <p>2. Source 3C states that the hard lockdown heightened poverty and Source 3D shows a poverty-stricken mother confronting Covid-19</p>
                    <p>3. Source 3C states that unemployment meant worrying about basic necessities and Source 3D shows a mother looking for food</p>
                    <p>4. Source 3C refers to poor South Africans being afraid and Source 3D depicts worried and fearful faces</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">3.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining the impact that the global Covid-19 pandemic has had on South Africa. (8)</div>
                <div className="answer-space large" data-placeholder="Write your paragraph here (about 80 words)..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('3.6')}>
                    {isSolutionVisible('3.6') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('3.6') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>The Covid-19 pandemic severely impacted South Africa through globalisation's interconnectedness. President Ramaphosa implemented travel bans and lockdowns to contain the virus, but these measures caused massive job losses, pushing unemployment to 30.1%. Poverty and inequality worsened, particularly affecting black women in informal employment. Townships became hotspots due to overcrowding and poor infrastructure stemming from apartheid spatial planning. The poor faced impossible choices between Covid-19 infection and starvation, captured in the "between a rock and a hard place" dilemma. The pandemic exposed and deepened existing socio-economic inequalities in South African society.</p>
                </div>
            </div>
        </div>
    );
};

export default Question3;
