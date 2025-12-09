import React, { useState } from 'react';

const Question4 = ({ isAnswered }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="question essay-question" id="question-4">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 4: CIVIL RESISTANCE, 1970s TO 1980s: SOUTH AFRICA
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    The philosophy of Black Consciousness successfully instilled blacks with pride and self-belief to start challenging apartheid South Africa in the 1970s.
                    <br />
                    <br />
                    Do you agree with this statement? Support your line of argument with relevant historical evidence. [50]
                </div>
                <div
                    className="essay-space large"
                    data-placeholder="Write your essay here... (Approximately 400-600 words)"
                    contentEditable
                    suppressContentEditableWarning={true}
                    style={{minHeight: '400px'}}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution(!showSolution)}
                >
                    {showSolution ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>

                    <p><strong>SYNOPSIS</strong></p>
                    <p>Candidates need to indicate whether they agree or disagree with the statement. If they agree with the statement, they need to explain how the philosophy of Black Consciousness successfully instilled blacks with pride and self-belief to start challenging apartheid South Africa in the 1970s. If they disagree with the statement, they need to substantiate their argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates could include the following aspects in their essays:</p>

                    <p><strong>Introduction:</strong></p>
                    <p>Candidates could agree or disagree on how the philosophy of Black Consciousness successfully instilled blacks with pride and self-belief to start challenging apartheid South Africa in the 1970s. They should also indicate how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>

                    <p><strong>1. Political vacuum (Background information)</strong></p>
                    <p>- Origins of BC/Created after ANC and PAC political leaders and parties were banned or imprisoned in 1960</p>

                    <p><strong>2. Instilling of blacks with pride and self-belief to challenge the apartheid state (BC philosophy)</strong></p>
                    <p>- Infused blacks with sense of pride</p>
                    <p>- Influenced blacks to accept themselves/have self-confidence/self reliance/sense of identity</p>
                    <p>- Empowered blacks to reject the spirit of self-pity; inferiority complex; self alienation and domination by external forces</p>

                    <p><strong>3. Instilling political organisations with self-belief to challenge the apartheid state</strong></p>
                    <p>- Black students started to organise themselves to resist white domination by breaking away from NUSAS and formed SASO (1968)</p>
                    <p>- Black students adopted the philosophy of Black Consciousness (Role of Biko/SASO)</p>
                    <p>- SASO was for university students and SASM for schools</p>
                    <p>- Black Consciousness (BC) led to the formation of the Black Peoples Convention (BPC) in 1972 which involved students, churches, communities and trade unions</p>
                    <p>- Unions aligned to the BC philosophy included Black Parents' Association and Black Allied Workers Union (BAWU)</p>
                    <p>- South African Students Movement formed in 1972 which exposed Blacks to the ideals of BC</p>
                    <p>- BPC and SASO organised FRELIMO Rallies (1974)</p>
                    <p>- The arrests of BC leaders heightened political activism</p>

                    <p><strong>4. Instilled students with self-belief to challenge the apartheid state</strong></p>
                    <p>- Bantu Education introduced Afrikaans as a medium of instruction in schools (1975)</p>
                    <p>- SASO and SASM influenced the formation of Soweto Students Representative Council (SSRC)</p>
                    <p>- Both black teachers and students rejected Afrikaans – as the language of the oppressor</p>
                    <p>- Some teachers and students were already exposed to the ideas of Biko and the BC philosophy through SASO student teachers from universities</p>
                    <p>- The departmental circular on Afrikaans (50/50) was the trigger for the Soweto uprising</p>
                    <p>- 16th June 1976 students protested peacefully against the implementation of the circular</p>
                    <p>- Police response to student protests (Hector Petersen, a 13-year-old boy was one of the first casualties of this uprising)</p>
                    <p>- Activists went into exile</p>

                    <p><strong>5. Instilled blacks with self-belief in starting Community Programmes and be self-sufficient</strong></p>
                    <p>- Biko's banishment to King Williams Town led to diverted focus to community programmes</p>
                    <p>- BC promoted independence from whites through Black Community Programmes to support blacks without white assistance. (Zanempilo Health Clinic/Ginsburg Educational Trust/Zimele Trust Fund/Solempilo Community Health Centre/Ithuseng Community Health Programme and Winter School Projects)</p>

                    <p><strong>6. Influenced workers to challenge the apartheid state</strong></p>
                    <p>- Mobilised workers to form trade unions</p>
                    <p>- BC led to the formation of the Black Allied Workers Union (BAWU) – worker's strikes in Durban in 1973</p>

                    <p><strong>7. Influenced blacks to have their own media to challenge the apartheid state</strong></p>
                    <p>- Role of media that was sympathetic to the BC philosophy e.g. The World newspaper</p>

                    <p><strong>8. Legacy of Biko and Black Consciousness</strong></p>
                    <p>- BC philosophy laid the psychological foundation for resistance</p>
                    <p>- Created a generation of activists who would continue the struggle</p>
                    <p>- Influenced later movements and organizations</p>

                    <p><strong>9. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should sum up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction (Approx. 50 words):</strong> Clearly state your position (agree/disagree), provide historical context of Black Consciousness movement, and outline your main arguments.</p>

                    <p><strong>Body Paragraph 1:</strong> Origins and philosophy of Black Consciousness - Response to political vacuum, Steve Biko's ideas, psychological empowerment.</p>

                    <p><strong>Body Paragraph 2:</strong> Organizational impact - SASO, BPC, community organizations, breaking from white-dominated movements.</p>

                    <p><strong>Body Paragraph 3:</strong> Student activism and Soweto Uprising - Role in 1976 protests, rejection of Afrikaans, police brutality.</p>

                    <p><strong>Body Paragraph 4:</strong> Community development and self-reliance - Health clinics, educational programs, economic initiatives.</p>

                    <p><strong>Body Paragraph 5:</strong> Worker mobilization and media influence - Trade unions, strikes, alternative media.</p>

                    <p><strong>Body Paragraph 6:</strong> Critiques and limitations - Government repression, internal challenges, relationship with other movements.</p>

                    <p><strong>Conclusion (Approx. 50 words):</strong> Summarize your argument, evaluate the success of Black Consciousness in instilling pride and self-belief, and discuss its lasting legacy in South Africa's liberation struggle.</p>

                    <p><strong>SAMPLE INTRODUCTION:</strong></p>
                    <p>"I strongly agree that the philosophy of Black Consciousness successfully instilled blacks with pride and self-belief to challenge apartheid in 1970s South Africa. Emerging after the banning of liberation movements, Black Consciousness, spearheaded by Steve Biko, provided the psychological foundation for resistance by empowering black people to reject inferiority and assert their humanity. This essay will demonstrate how Black Consciousness transformed individual psychology, mobilized student activism through SASO, fueled the 1976 Soweto Uprising, and fostered community self-reliance, fundamentally altering the anti-apartheid struggle."</p>
                </div>
            </div>
        </div>
    );
};

export default Question4;

