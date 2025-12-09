
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
                    6. Explain to what extent the philosophy of Black Power empowered African Americans to be assertive and do things for themselves (be self-reliant) during the 1960s. Use relevant evidence to support your line of argument.
                </div>
                <div
                    className="answer-space large"
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
                    <p>Candidates need to explain to what extent the philosophy of Black Power empowered African Americans to be assertive and self-reliant during the 1960s. They should support their line of argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates should include the following aspects in their response:</p>

                    <p><strong>Introduction:</strong></p>
                    <p>Candidates should take a stance by explaining to what extent the philosophy of Black Power empowered African Americans to be assertive and self-reliant during the 1960s. They should also provide an outline of how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>
                    <p>1. Conditions in the USA: (Background information)</p>
                    <p>- African Americans still economically and politically crippled in the USA due to discriminatory (Jim Crow) laws</p>
                    <p>- Lack of a sense of pride due to socio-economic circumstances (Lived in ghettos and slum areas/poor housing/under-resourced facilities)</p>
                    <p>- African Americans became impatient with the slow pace of change and the impact of the Civil Rights Movement in the 1960s</p>
                    <p>- African Americans subjected to police brutality – led to growth of nationalist feelings.</p>

                    <p>2. Black Power Movement advocated for assertiveness; self-reliance; black pride; control of politics in their own communities (advocated by Stokely Carmichael); African Americans to protect themselves against police brutality; blacks to seek freedom from white authority; promotion of Afro hairstyle and African clothing and coined the slogan 'Black is beautiful'</p>

                    <p>3. 1966 Bobby Seale and Huey Newton formed the Black Panther Party (BPP) for Self-Defence – against police brutality</p>

                    <p>4. Adopted Ten Point Plan to cover its social, political and economic goals for the upliftment of the African American community</p>

                    <p>5. The Black Panther Party ran feeding schemes, childcare and literacy projects in black communities - the feeding schemes eradicated hunger amongst the youth and improved learning in schools</p>

                    <p>6. BPP literacy projects eradicated illiteracy amongst the African American communities</p>

                    <p>7. BPP childcare projects took care of medical needs of African Americans in black communities</p>

                    <p>8. BPP members patrolled the streets to monitor police activities (police the police) and defend themselves against police brutality</p>

                    <p>9. BPP demanded that Black history must be taught in black schools</p>

                    <p>10. Malcolm X promoted armed self-defence against white oppression</p>

                    <p>11. He argued that bloodshed was necessary for revolution (black nationalism) and he advocated self-respect and self-discipline</p>

                    <p>12. Promoted the concept of 'Black Pride' (self-esteem/self-respect/self-help)</p>

                    <p>13. Encouraged African Americans to stand up against white American authorities in pursuit of freedom, justice and equality by whatever means possible</p>

                    <p>14. Supported the use of violence as a means of self-defence against those who attacked African Americans</p>

                    <p>15. Stokely Carmichael believed that the non-violent strategy failed because of ongoing violence against African Americans</p>

                    <p>16. Advocated the exclusion of white 'liberals' as a philosophy for African Americans</p>

                    <p>17. He promoted one plan to split the United States into separate black and white countries</p>

                    <p>18. He was against the USA's involvement in the Vietnam war</p>

                    <p>19. Impact: the most obvious forms of racial discrimination ended</p>

                    <p>20. Racial violence and tension declined</p>

                    <p>21. African Americans were elected to public offices</p>

                    <p>22. Housing and facilities of African Americans were improved</p>

                    <p>23. Black literacy and dependence on state grants were limited</p>

                    <p>24. Affirmative action policies for federal employment were put in place.</p>

                    <p>25. Any other relevant response</p>

                    <p><strong>Conclusion:</strong> Candidates should tie up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction:</strong> State your position clearly regarding the extent to which Black Power philosophy empowered African Americans. Provide a brief overview of your main arguments.</p>
                    <p><strong>Body Paragraphs:</strong> Organize your discussion by key themes - conditions that led to Black Power, main philosophies and leaders, specific empowerment initiatives, and long-term impacts.</p>
                    <p><strong>Critical Analysis:</strong> Evaluate both the successes and limitations of Black Power in achieving self-reliance and assertiveness for African Americans.</p>
                    <p><strong>Conclusion:</strong> Summarize your main points and provide a final assessment of the extent of empowerment achieved through Black Power philosophy.</p>
                </div>
            </div>
        </div>
    );
};

export default Question6;
