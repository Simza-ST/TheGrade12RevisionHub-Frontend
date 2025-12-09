
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
                    Explain to what extent commitment and compromise played key roles in sustaining the negotiation process that ultimately led to a new democratic Republic of South Africa in 1994.
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
                    <p>Candidates need to indicate to what extent commitment and compromise played key roles in sustaining the negotiations process that ultimately led to a new democratic Republic of South Africa in 1994.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates could include the following aspects in their essays:</p>

                    <p><strong>Introduction:</strong></p>
                    <p>Candidates need to indicate to what extent commitment and compromise played key roles in sustaining the negotiations process that ultimately led to a new democratic Republic of South Africa in 1994. They should also indicate how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>
                    <p><strong>1. Initial Steps (commitment and compromise)</strong></p>
                    <p>- Release of Nelson Mandela on the 11 February 1990 and other banned political leaders in 1990</p>
                    <p>- Unbanning of the ANC, the PAC and the SACP and other banned organisations</p>

                    <p><strong>2. Early Negotiations and Agreements</strong></p>
                    <p>- Groote Schuur Minute, 2 May 1990 - NP released political prisoners and both parties committed themselves to end violence and to negotiate</p>
                    <p>- Pretoria Minute in August 1990 – ANC stopped armed struggle and NP stopped state of emergency (major compromise)</p>
                    <p>- The National Peace Accord signed by 27 political organisations - provided safety net for negotiations</p>

                    <p><strong>3. CODESA Negotiations</strong></p>
                    <p>- CODESA 1 (20 December 1991) - 19 political parties except for CP and PAC</p>
                    <p>- The Declaration of Intent – parties agreed to draw up a new constitution and interim government</p>
                    <p>- Parties could not agree on power-sharing and constituent assembly – meeting ended</p>
                    <p>- Whites-only referendum – De Klerk tested white opinion after losing three by-elections to CP</p>
                    <p>- Result – landslide Yes (indication of commitment from whites) – negotiations continued</p>
                    <p>- CODESA 2 (2 May 1992) – did not last because of violence and inability of parties to agree on power-sharing</p>

                    <p><strong>4. Challenges and Violence (Testing Commitment)</strong></p>
                    <p>- Boipatong massacre and influence of Third Force (17 June 1992)</p>
                    <p>- Bisho massacre (September 1992) – ANC supporters who wanted to be part of negotiation process</p>
                    <p>- ANC called for rolling mass action against the National Party</p>

                    <p><strong>5. Key Breakthroughs</strong></p>
                    <p>- Record of Understanding (September 1992) – Meyer and Ramaphosa committed themselves to peace and to negotiations</p>
                    <p>- Meyer and Ramaphosa agreed on Joe Slovo's Sunset clause (major compromise)</p>
                    <p>- Parties winning more that 5% of vote will form a government of national unity to govern the new SA and whites could retain their jobs for 5 years</p>

                    <p><strong>6. Final Challenges Before Elections</strong></p>
                    <p>- Multi-party negotiations resumed at the World Trade Centre</p>
                    <p>- The AWB interrupted the negotiations on 15 June 1993, when they stormed the World Trade Centre with armoured vehicle</p>
                    <p>- Assassination of Chris Hani (10 April 1993) – Janusz Waluś (major test of commitment)</p>
                    <p>- Mandela addresses nation on TV (showing leadership and commitment)</p>
                    <p>- St James massacre (25 July 1993)</p>
                    <p>- Heidelberg Tavern shooting (30 December 1993)</p>
                    <p>- Shell House massacre (28 March 1994)</p>

                    <p><strong>7. Elections and Final Outcome</strong></p>
                    <p>- Date for the first democratic elections set (27–29 April 1994)</p>
                    <p>- Continued violence throughout elections – car bomb outside ANC head offices</p>
                    <p>- Car bomb exploded at Jan Smuts Airport (last efforts to disrupt process)</p>
                    <p>- Elections held due to commitment and compromise despite violence</p>
                    <p>- Results of election: ANC 62.7%, NP 20.4% and IFP 10.5%</p>
                    <p>- ANC, NP and IFP formed the Government of National Unity as agreed upon in the Sunset Clause</p>
                    <p>- Mandela became first black State President of the new democratic Republic of South Africa with Thabo Mbeki and FW de Klerk as his deputies</p>

                    <p><strong>8. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should tie up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction:</strong> State your position clearly regarding the extent to which commitment and compromise sustained the negotiation process. Provide an overview of key moments where these factors were crucial.</p>
                    <p><strong>Body Paragraphs:</strong> Organize chronologically - early negotiations (1990-1991), CODESA phases, breakdown and Record of Understanding, final negotiations and elections. Analyze where commitment was tested and where compromise was essential.</p>
                    <p><strong>Critical Analysis:</strong> Evaluate the significance of key compromises (Sunset Clause, GNU) and moments where commitment was tested (violence, walkouts). Assess whether these factors were sufficient or if other elements were also crucial.</p>
                    <p><strong>Conclusion:</strong> Summarize your assessment of how commitment and compromise ultimately enabled South Africa's peaceful transition to democracy despite numerous challenges.</p>
                </div>
            </div>
        </div>
    );
};

export default Question5;
