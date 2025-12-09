
import React, { useState } from 'react';

const Question5 = ({ isAnswered }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="question essay-question" id="question-5">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 5: THE COMING OF DEMOCRACY TO SOUTH AFRICA AND COMING TO TERMS WITH THE PAST
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    Explain to what extent compromises by different role players (political parties) remained a key feature that paved the way for a new political dispensation in South Africa in 1994.
                    <br />
                    <br />
                    Use relevant evidence to support your line of argument. [50]
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
                    <p>Candidates need to explain to what extent compromises by different role players remained a key feature that paved the way for a new political dispensation in South Africa in 1994. They need to substantiate their argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates could include the following aspects in their essays:</p>

                    <p><strong>Introduction:</strong></p>
                    <p>Candidates need to explain to what extent compromises by different role players remained a key feature that paved the way for a new political dispensation in South Africa in 1994. They should also indicate how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>

                    <p><strong>1. Initial Political Shifts (1989-1990)</strong></p>
                    <p>- FW de Klerk replaced PW Botha in 1989, signaling potential change</p>
                    <p>- Release of Nelson Mandela on 11 February 1990 and other banned political leaders in 1990 (compromises by De Klerk)</p>
                    <p>- Unbanning of the ANC, the PAC and the SACP and other banned organisations</p>

                    <p><strong>2. Early Negotiation Compromises (1990)</strong></p>
                    <p>- Groote Schuur Minute, 2 May 1990 - NP released political prisoners and both parties committed themselves to end violence and to negotiate (compromises by different role players)</p>
                    <p>- Pretoria Minute in August 1990 – ANC stopped armed struggle and NP stopped State of Emergency (significant mutual compromises)</p>

                    <p><strong>3. Establishing Peace Mechanisms</strong></p>
                    <p>- The National Peace Accord signed by 27 political organisations - provided safety net for negotiations (compromises by different role players)</p>
                    <p>- Establishment of Goldstone Commission to investigate violence</p>

                    <p><strong>4. CODESA Negotiations (1991-1992)</strong></p>
                    <p>- CODESA 1 (20 December 1991) – 19 political parties except for Conservative Party (CP) and Pan Africanist Congress (compromises by different role players)</p>
                    <p>- The Declaration of Intent – parties agreed to draw up a new constitution and interim government (compromises by different role players)</p>
                    <p>- Parties could not agree on power-sharing and constituent assembly – meeting ended</p>

                    <p><strong>5. Political Realignment and Continued Compromise</strong></p>
                    <p>- Whites-only referendum – De Klerk tested white opinion after losing three by-elections to CP, Result – landslide Yes (indication of supporting compromise by De Klerk)</p>
                    <p>- CODESA 2 (2 May 1992) – did not last because of violence and inability of parties to agree on power-sharing</p>

                    <p><strong>6. Violence and Political Challenges</strong></p>
                    <p>- Boipatong massacre and influence of Third Force (17 June 1992)</p>
                    <p>- Bisho massacre (September 1992) (violence) – ANC supporters who wanted to be part of negotiation process (compromises by different role players)</p>
                    <p>- ANC called for rolling mass action against the National Party (pushing the NP to compromise)</p>

                    <p><strong>7. Key Breakthroughs in Compromise</strong></p>
                    <p>- Record of Understanding (September 1992) – Meyer and Ramaphosa committed themselves to peace and to negotiations (compromises by different role players)</p>
                    <p>- Meyer and Ramaphosa agreed on Joe Slovo's Sunset Clause (major compromise)</p>
                    <p>- Parties winning more that 5% of vote will form a Government of National Unity to govern the new SA and whites could retain their jobs for 5 years (enforced unity through compromise)</p>

                    <p><strong>8. Final Negotiations and Disruptions</strong></p>
                    <p>- Multi-party negotiations resumed at the World Trade Centre</p>
                    <p>- The AWB interrupted the negotiations on 25 June 1993, when they stormed the World Trade Centre with armoured vehicle</p>
                    <p>- Assassination of Chris Hani (10 April 1993) – Janus Walus</p>
                    <p>- Mandela addresses nation on TV – calming the nation down (leadership in crisis)</p>

                    <p><strong>9. Violence Leading to Elections</strong></p>
                    <p>- St James massacre (25 July 1993)</p>
                    <p>- Heidelberg tavern shooting (30 December 1993)</p>
                    <p>- Shell House massacre (28 March 1994)</p>
                    <p>- Continued violence throughout elections – car bomb outside ANC head offices - Car bomb exploded at Jan Smuts Airport</p>

                    <p><strong>10. Election Compromises and Results</strong></p>
                    <p>- Date for the first democratic elections set (27–29 April 1994) (compromises)</p>
                    <p>- Elections held due to compromise (compromises by different role players)</p>
                    <p>- Results of election: ANC 62.7%, NP 20.4% and IFP 10.5%</p>

                    <p><strong>11. Government of National Unity</strong></p>
                    <p>- ANC, NP and IFP formed the Government of National Unity as agreed upon in the Sunset Clause</p>
                    <p>- Mandela became first black state president of the new democratic Republic of South Africa with Thabo Mbeki and FW de Klerk as his deputies</p>

                    <p><strong>12. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should tie up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction (Approx. 50 words):</strong> State your position on the extent of compromises, provide historical context of South Africa's transition, and outline your main arguments about key compromises.</p>

                    <p><strong>Body Paragraph 1:</strong> Initial de Klerk compromises - unbanning organizations, releasing Mandela, Groote Schuur Minute.</p>

                    <p><strong>Body Paragraph 2:</strong> Early negotiation compromises - Pretoria Minute, National Peace Accord, CODESA processes.</p>

                    <p><strong>Body Paragraph 3:</strong> Major breakthrough compromises - Record of Understanding, Sunset Clause, Government of National Unity concept.</p>

                    <p><strong>Body Paragraph 4:</strong> ANC compromises - suspension of armed struggle, acceptance of power-sharing, negotiations with former oppressors.</p>

                    <p><strong>Body Paragraph 5:</strong> Constitutional compromises - interim constitution, minority protections, property rights.</p>

                    <p><strong>Body Paragraph 6:</strong> Challenges to compromise - violence, right-wing resistance, deep-seated distrust between parties.</p>

                    <p><strong>Body Paragraph 7:</strong> Implementation of compromises - election agreement, GNU formation, Mandela's inclusive leadership.</p>

                    <p><strong>Conclusion (Approx. 50 words):</strong> Summarize the extent of compromises, evaluate their necessity for successful transition, and reflect on the legacy of negotiated settlement in post-apartheid South Africa.</p>

                    <p><strong>SAMPLE INTRODUCTION:</strong></p>
                    <p>"Compromises by various political role players were absolutely essential and remained a central feature throughout South Africa's transition to democracy in 1994. The negotiated settlement that ended apartheid required significant concessions from both the apartheid government and liberation movements, transforming a violent conflict into a peaceful transition. This essay will demonstrate how strategic compromises—from De Klerk's initial reforms and the ANC's suspension of armed struggle to the landmark Sunset Clause and Government of National Unity—created the framework for democratic elections and averted civil war, ultimately proving that compromise was not just a feature but the very foundation of South Africa's democratic breakthrough."</p>
                </div>
            </div>
        </div>
    );
};

export default Question5;