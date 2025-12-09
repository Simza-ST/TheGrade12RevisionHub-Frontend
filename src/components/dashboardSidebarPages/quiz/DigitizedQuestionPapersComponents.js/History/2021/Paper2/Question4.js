
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
                    Critically discuss how Steve Biko and the philosophy of Black Consciousness mobilised black South Africans to challenge the apartheid government in the 1960s and 1970s.
                </div>
                <div
                    className="essay-space large"
                    data-placeholder="Write your essay here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                    style={{minHeight: '300px'}}
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
                    <p>Candidates need to critically discuss how Steve Biko and the philosophy of Black Consciousness mobilised black South Africans to challenge the apartheid government in the 1960s and 1970s.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates could include the following aspects in their essays:</p>

                    <p><strong>Introduction:</strong></p>
                    <p>Candidates need to critically discuss how Steve Biko and the philosophy of Black Consciousness mobilised black South Africans to challenge the apartheid government in the 1960s and 1970s. They should also indicate how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>
                    <p><strong>1. Political vacuum (Background information)</strong></p>
                    <p>- Created after ANC and PAC political leaders and parties were banned or imprisoned in 1960</p>

                    <p><strong>2. Mobilisation as blacks</strong></p>
                    <p>- Infused blacks with sense of pride</p>
                    <p>- To accept themselves/have self-confidence/self-reliance/sense of identity</p>
                    <p>- Empowered blacks to reject the spirit of self-pity; inferiority complex; self-alienation and domination by external forces</p>
                    <p>- The formation of BC was welcomed by the apartheid government as an extension of separate development</p>

                    <p><strong>3. Political mobilisation</strong></p>
                    <p>- Black students started to organise themselves to resist white domination by breaking away from NUSAS and formed SASO (1968)</p>
                    <p>- Black students adopted the philosophy of Black Consciousness (Role of Biko/SASO)</p>
                    <p>- SASO was for university students and SASM for schools</p>
                    <p>- BC led to the formation of the Black Peoples Convention (BPC) in 1972 which involved students, churches, communities and trade unions</p>
                    <p>- Unions aligned to the BC philosophy included Black Parents' Association and Black Allied Workers Union (BAWU)</p>
                    <p>- South African Students Movement formed in 1972 which exposed Blacks to the ideals of BC</p>
                    <p>- Expulsion of Tiro which led to student protests</p>
                    <p>- BCM and SASO organised FRELIMO Rallies (1974)</p>
                    <p>- Expulsion of students from universities</p>
                    <p>- The arrests of BC leaders heightened political activism</p>

                    <p><strong>4. Student mobilisation</strong></p>
                    <p>- Bantu Education introduced Afrikaans as a medium of instruction in schools (1975)</p>
                    <p>- SASO and SASM influenced the formation of Soweto Students Representative Council (SSRC)</p>
                    <p>- Both black teachers and students rejected Afrikaans - as the language of the oppressor</p>
                    <p>- Some teachers and learners were already exposed to the ideas of Biko and the BC philosophy through SASO student teachers from universities</p>
                    <p>- The departmental circular on Afrikaans (50/50) was the trigger for the Soweto uprising</p>
                    <p>- 16 of June 1976 students protested peacefully against the implementation of the circular</p>
                    <p>- Police response to student protests (Hector Petersen, a 13-year-old boy was one of the first casualties of this uprising)</p>

                    <p><strong>5. Mobilisation through Community Programmes</strong></p>
                    <p>- Biko's banishment to King Williams Town led to diverted focus to community programmes</p>
                    <p>- Mamphele Ramphele's banishment to Tzaneen</p>
                    <p>- BC promoted independence from whites through Black Community Programmes to support blacks without white assistance. (Zanempilo Health Clinic/Ginsburg Educational Trust/Zimele Trust Fund/Solempilo Community Health Centre/Ithuseng Community Health Programme and Winter School Projects)</p>

                    <p><strong>6. Mobilisation through Labour</strong></p>
                    <p>- Mobilised workers to form trade unions</p>
                    <p>- BC led to the formation of the Black Allied Workers Union (BAWU) - worker's strikes in Durban in 1973)</p>

                    <p><strong>7. Killing of Biko (1977) in police custody</strong></p>

                    <p><strong>8. 19 October 1977 banning of 19 organisations aligned to BC</strong></p>

                    <p><strong>9. Mobilisation through Media</strong></p>
                    <p>- Role of media that was sympathetic to the BC philosophy, e.g. The World and The Weekend World newspapers were closed</p>

                    <p><strong>10. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should sum up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction:</strong> State your position clearly regarding how Steve Biko and Black Consciousness mobilized black South Africans. Provide a brief overview of your main arguments about the political, educational, community, and labor mobilization.</p>
                    <p><strong>Body Paragraphs:</strong> Organize your discussion by key themes - psychological liberation, student mobilization through SASO and SASM, community development programs, labor organization, and the impact of state repression.</p>
                    <p><strong>Critical Analysis:</strong> Evaluate both the successes and limitations of Black Consciousness in achieving mobilization against apartheid, including the state's response through bannings and Biko's death.</p>
                    <p><strong>Conclusion:</strong> Summarize your main points and provide a final assessment of the significance of Black Consciousness in the broader anti-apartheid struggle.</p>
                </div>
            </div>
        </div>
    );
};

export default Question4;

