import React, { useState } from 'react';

const Question6 = ({ isAnswered }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="question essay-question" id="question-6">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 6: CIVIL SOCIETY PROTESTS FROM THE 1950s TO THE 1970s: THE BLACK POWER MOVEMENT
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    <p>Explain to what extent various role-players were successful in using the Black Power philosophy to end discrimination against African Americans in the United States of America in the 1960s. [50]</p>
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
                    <p>Candidates need to explain to what extent various role players were successful in using the Black Power philosophy to end discrimination against African Americans in the USA in the 1960s. They should support their line of argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates should include the following aspects in their response:</p>
                    <p><strong>Introduction:</strong> Candidates should take a stance by explaining to what extent various role players were successful in using the Black Power philosophy to end discrimination against African Americans in the USA in the 1960s. They should also provide an outline of how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>

                    <p><strong>1. Conditions in the USA: (Background information)</strong></p>
                    <p>• African Americans still economically and politically crippled in the USA due to discriminatory (Jim Crow) laws</p>
                    <p>• Lack of a sense of pride due to socio-economic circumstances (lived in ghettos and slum areas/poor housing/under-resourced facilities)</p>
                    <p>• African Americans became impatient with the slow pace of change and the impact of the Civil Rights Movement in the 1960s</p>
                    <p>• African Americans subjected to police brutality – led to growth of nationalist feelings</p>

                    <p><strong>2. Black Power Movement advocated for the Black Power philosophy which promoted:</strong></p>
                    <p>• The spirit of assertiveness; self-reliance; Black Pride</p>
                    <p>• Control of politics in their own communities (advocated by Stokely Carmichael)</p>
                    <p>• African Americans to protect themselves against police brutality</p>
                    <p>• Blacks to seek freedom from white authority</p>
                    <p>• Promotion of Afro hairstyle and African clothing</p>
                    <p>• Coined the slogan 'Black is beautiful'</p>

                    <p><strong>3. Malcolm X promoted armed self-defence against white oppression</strong></p>

                    <p><strong>4. He argued that bloodshed was necessary for revolution (black nationalism) and he advocated self-respect and self-discipline</strong></p>

                    <p><strong>5. Promoted the concept of 'Black Pride' (self-esteem/self-respect/self-help)</strong></p>

                    <p><strong>6. Encouraged African Americans to stand up against white American authorities in pursuit of freedom, justice and equality by whatever means possible</strong></p>

                    <p><strong>7. Supported the use of violence as a means of self-defence against those who attacked African Americans</strong></p>

                    <p><strong>8. Stokely Carmichael believed that the non-violent strategy failed because of ongoing violence against African Americans</strong></p>

                    <p><strong>9. Advocated the exclusion of white 'liberals' as a philosophy for African Americans</strong></p>

                    <p><strong>10. He promoted one plan to split the USA into separate black and white countries</strong></p>

                    <p><strong>11. He was against the USA's involvement in the Vietnam war</strong></p>

                    <p><strong>12. 1966 Bobby Seale and Huey Newton formed the Black Panther Party (BPP) for Self-Defence – against police brutality</strong></p>

                    <p><strong>13. Adopted Ten Point Plan to cover its social, political and economic goals for the upliftment of the African American community</strong></p>

                    <p><strong>14. The Black Panther Party ran feeding schemes, childcare and literacy projects in black communities</strong></p>
                    <p>• The feeding schemes eradicated hunger amongst the youth and improved learning in schools</p>

                    <p><strong>15. BPP literacy projects eradicated illiteracy amongst the African American communities</strong></p>

                    <p><strong>16. BPP childcare projects took care of medical needs of African Americans in black communities</strong></p>

                    <p><strong>17. BPP members patrolled the streets to monitor police activities (police the police) and defend themselves against police brutality</strong></p>

                    <p><strong>18. BPP demanded that black history must be taught in black schools</strong></p>

                    <p><strong>19. Role of other activists/women</strong></p>
                    <p>• Angela Davis – academic and political activist</p>
                    <p>• Kathleen Cleaver – communications secretary for BPP</p>
                    <p>• Elaine Brown – first and only female chairperson of BPP</p>

                    <p><strong>20. Impact/short- and long-term goals: the most obvious forms of racial discrimination ended</strong></p>

                    <p><strong>21. Racial violence and tension declined</strong></p>

                    <p><strong>22. African Americans were elected to public offices</strong></p>

                    <p><strong>23. Housing and facilities of African Americans were improved</strong></p>

                    <p><strong>24. Black literacy increased and dependence on state grants declined</strong></p>

                    <p><strong>25. Affirmative action policies for federal employment were put in place</strong></p>

                    <p><strong>26. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should tie up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>

                    <p><strong>Introduction (Approx. 50-80 words):</strong></p>
                    <p>• State your position on the extent of success achieved by Black Power role-players</p>
                    <p>• Mention key role-players you will discuss (Malcolm X, Stokely Carmichael, Black Panthers)</p>
                    <p>• Outline the historical context (1960s USA, Civil Rights Movement limitations)</p>
                    <p>• Preview your argument about successes and limitations</p>

                    <p><strong>Body Paragraphs (Approx. 300-400 words):</strong></p>

                    <p><strong>Paragraph 1: Key Role-Players and Their Philosophies</strong></p>
                    <p>• Malcolm X: From NOI to broader black nationalism, emphasis on self-defence</p>
                    <p>• Stokely Carmichael: SNCC to Black Power, critique of non-violence</p>
                    <p>• Black Panther Party: Bobby Seale & Huey Newton, Ten Point Program</p>

                    <p><strong>Paragraph 2: Strategies and Tactics Employed</strong></p>
                    <p>• Community programs (breakfast programs, schools, health clinics)</p>
                    <p>• Armed self-defence and police monitoring</p>
                    <p>• Cultural nationalism (Black is beautiful, Afrocentric education)</p>
                    <p>• Political mobilization and voter registration</p>

                    <p><strong>Paragraph 3: Successes in Ending Discrimination</strong></p>
                    <p>• Psychological impact: Black pride and self-esteem</p>
                    <p>• Political gains: Increased black political representation</p>
                    <p>• Social programs: Tangible community improvements</p>
                    <p>• Legal changes: Influence on anti-discrimination legislation</p>

                    <p><strong>Paragraph 4: Limitations and Challenges</strong></p>
                    <p>• Government repression (COINTELPRO, police violence)</p>
                    <p>• Internal divisions and leadership challenges</p>
                    <p>• Limited economic transformation</p>
                    <p>• Ongoing structural racism despite gains</p>

                    <p><strong>Conclusion (Approx. 50-80 words):</strong></p>
                    <p>• Summarize the extent of success achieved</p>
                    <p>• Balance tangible achievements with ongoing challenges</p>
                    <p>• Assess Black Power's legacy in the broader Civil Rights struggle</p>
                    <p>• Connect to contemporary racial justice movements</p>

                    <p><strong>ASSESSING "TO WHAT EXTENT":</strong></p>
                    <p>1. <strong>Highly Successful:</strong> Argue for transformative psychological, cultural, and political impact</p>
                    <p>2. <strong>Moderately Successful:</strong> Balance achievements with significant limitations</p>
                    <p>3. <strong>Limited Success:</strong> Focus on repression, internal challenges, and structural barriers</p>
                    <p>4. <strong>Mixed Results:</strong> Different outcomes in different areas (cultural vs. economic)</p>

                    <p><strong>KEY ROLE-PLAYERS TO ANALYZE:</strong></p>
                    <p>• Malcolm X (Nation of Islam, later broader perspective)</p>
                    <p>• Stokely Carmichael (SNCC, Black Power slogan)</p>
                    <p>• Huey Newton & Bobby Seale (Black Panther Party founders)</p>
                    <p>• Angela Davis (academic, political prisoner, activist)</p>
                    <p>• Eldridge Cleaver (BPP Minister of Information)</p>

                    <p><strong>SUCCESS INDICATORS:</strong></p>
                    <p>• Cultural: Black pride, Afrocentric education, cultural production</p>
                    <p>• Political: Black elected officials, community control</p>
                    <p>• Social: Community programs, reduced police brutality awareness</p>
                    <p>• Economic: Limited progress despite efforts</p>

                    <p><strong>HISTORICAL CONTEXT ESSENTIALS:</strong></p>
                    <p>• Civil Rights Act (1964) and Voting Rights Act (1965) limitations</p>
                    <p>• Urban uprisings (Watts 1965, Detroit 1967)</p>
                    <p>• Assassinations (Malcolm X 1965, MLK 1968, Fred Hampton 1969)</p>
                    <p>• COINTELPRO repression of black organizations</p>
                    <p>• Vietnam War opposition and draft resistance</p>
                </div>
            </div>
        </div>
    );
};

export default Question6;



