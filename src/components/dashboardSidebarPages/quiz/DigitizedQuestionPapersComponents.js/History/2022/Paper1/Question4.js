
import React, { useState } from 'react';

const Question4 = ({ isAnswered }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="question essay-question" id="question-4">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 4: THE EXTENSION OF THE COLD WAR: CASE STUDY – VIETNAM
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    <p>The United States of America lost the war in Vietnam (1962 to 1975) due to unconventional strategies of guerrilla warfare and environmental factors on the battlefield.</p>
                    <p>Do you agree with the statement? Use relevant evidence to support your line of argument. [50]</p>
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
                    <p>Candidates should explain whether they agree or disagree with the statement. In agreeing with the statement, they need to explain how the USA lost the war in Vietnam due to unconventional strategies of guerrilla warfare on the ground and environmental factors in the country. If the candidates disagree with the statement, they need to substantiate their lines of argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates should include the following aspects in their response:</p>
                    <p><strong>Introduction:</strong> Candidates should take a stance by indicating whether they agree or disagree with the statement. They should also provide an outline of how they would support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>
                    <p>Focus on the strategies used by both the USA and the Vietcong.</p>

                    <p><strong>1. Division of North and South Vietnam (Background)</strong></p>
                    <p>• USA first intervention in South Vietnam (fear of Domino Theory) – sent weapons and military advisors against the Vietcong (Vietnamese communists)</p>
                    <p>• Ho Chi Minh Trail and its significance (used by the Vietminh [communist guerrillas from North Vietnam] to support the Vietcong) in the south</p>

                    <p><strong>2. USA introduced 'Safe Village' policy/Hamlet strategy/Villagisation – trying to isolate/separate guerrillas from villagers (1962)</strong></p>
                    <p>• Safe village policy failed because the Vietcong operated inside villages</p>

                    <p><strong>3. The Gulf of Tonkin incident and resolution (1964) – excuse for escalation of the army</strong></p>

                    <p><strong>4. The USA felt the war in Vietnam was not a conventional war like World War II</strong></p>

                    <p><strong>5. USA sent 3 500 Marines and ground troops to Vietnam on 8 March 1965</strong></p>

                    <p><strong>6. Operation Ranch Hand (1962–1971) – use of chemical defoliants</strong></p>
                    <p>• Agent Orange to destroy the forest (environmental factors)</p>
                    <p>• Agent Blue to destroy agricultural products and food to weaken the Vietcong</p>

                    <p><strong>7. President Johnson introduced Operation Rolling Thunder in March 1965</strong></p>
                    <p>• Aimed to quickly eliminate the Vietcong</p>
                    <p>• Ineffectiveness of a conventional strategy as opposed to unconventional guerrilla warfare</p>

                    <p><strong>8. Use of chemical weapons</strong></p>
                    <p>• Napalm gas made USA unpopular and many countries condemned the USA</p>
                    <p>• Caused most damage to the environment</p>

                    <p><strong>9. Guerrilla warfare by the Vietminh and Vietcong</strong></p>
                    <p>• Difficulty in separating guerrillas from villagers – farmers/peasants</p>

                    <p><strong>10. Highly effective use of guerrilla tactics by the Vietcong (unconventional strategies)</strong></p>

                    <p><strong>11. Vietcong responded to USA tactics with the Tet Offensive (1968)</strong></p>
                    <p>• Surprise attacks on 100 cities (unconventional strategies)</p>
                    <p>• Ambushed USA controlled cities</p>

                    <p><strong>12. Number of USA soldiers killed increased</strong></p>
                    <p>• Led to anti-war demonstrations in the USA</p>

                    <p><strong>13. USA sent young and inexperienced soldiers to Vietnam</strong></p>

                    <p><strong>14. USA used Search and Destroy Policy (missions)</strong></p>
                    <p>• My Lai massacre to destroy villages supporting the Vietcong</p>
                    <p>• Confused by guerrilla tactics</p>
                    <p>• This resulted in large numbers of civilian deaths leading to more support for the Vietcong</p>

                    <p><strong>15. USA atrocities and My Lai massacre (March 1968)</strong></p>
                    <p>• Turned public opinion against the USA waged war</p>

                    <p><strong>16. North Vietnam received military support from the USSR and China</strong></p>
                    <p>• Vietminh and Vietcong had access to some modern weapons</p>

                    <p><strong>17. Guerrilla warfare was effectively used by the Vietcong</strong></p>
                    <p>• Supported by Vietminh from the north</p>
                    <p>• Used tactics such as booby traps, underground tunnels, hit and run, sabotage (environmental factors)</p>
                    <p>• Underground tunnels – narrow to fit Vietcong body structure but not big USA soldiers</p>

                    <p><strong>18. The Vietcong increased its support base because of the tactics used against the USA soldiers</strong></p>

                    <p><strong>19. The Vietnamese were united in the defence of their country</strong></p>

                    <p><strong>20. Vietnamisation</strong></p>
                    <p>• President Nixon came up with the policy of strategic withdrawal from Vietnam</p>
                    <p>• Also called WHAM (Winning the hearts and minds of the Vietnamese)</p>
                    <p>• Signalled the failure of USA to stop Vietnam from becoming a communist state and its subsequent withdrawal</p>

                    <p><strong>21. USA withdrew all troops by 1973</strong></p>
                    <p>• President Nixon had signed the Paris Peace Accords on 27 January 1973 – ending USA involvement in the Vietnam war</p>

                    <p><strong>22. North Vietnam took control of Saigon in 1975</strong></p>

                    <p><strong>23. Vietnam was united under communist control</strong></p>

                    <p><strong>24. Any other relevant response</strong></p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>

                    <p><strong>Introduction (Approx. 50-80 words):</strong></p>
                    <p>• Clearly state your position: agree/disagree/partially agree with the statement</p>
                    <p>• Briefly outline your main arguments about guerrilla warfare, environmental factors, and other reasons for US defeat</p>
                    <p>• Mention key aspects you will discuss: guerrilla tactics, environmental challenges, political factors, etc.</p>

                    <p><strong>Body Paragraphs (Approx. 300-400 words):</strong></p>
                    <p><strong>Paragraph 1: Guerrilla Warfare Strategies</strong></p>
                    <p>• Vietcong unconventional tactics (tunnels, booby traps, hit-and-run)</p>
                    <p>• Ho Chi Minh Trail logistics</p>
                    <p>• Tet Offensive impact</p>

                    <p><strong>Paragraph 2: Environmental Factors</strong></p>
                    <p>• Jungle terrain advantages for Vietcong</p>
                    <p>• US chemical warfare (Agent Orange, Napalm) and backlash</p>
                    <p>• Climate challenges for US forces</p>

                    <p><strong>Paragraph 3: Political and Social Factors</strong></p>
                    <p>• US public opinion and anti-war movement</p>
                    <p>• My Lai massacre and war atrocities</p>
                    <p>• Vietnamese nationalism and unity</p>

                    <p><strong>Paragraph 4: Military and Strategic Factors</strong></p>
                    <p>• US conventional warfare limitations</p>
                    <p>• Search and Destroy policy failures</p>
                    <p>• Soviet and Chinese support for North Vietnam</p>

                    <p><strong>Conclusion (Approx. 50-80 words):</strong></p>
                    <p>• Summarize your main arguments</p>
                    <p>• Restate your position with final assessment</p>
                    <p>• Mention broader implications (end of Cold War era, lessons learned)</p>

                    <p><strong>Alternative Perspectives (if disagreeing):</strong></p>
                    <p>• Could argue that US defeat was primarily due to political factors rather than military ones</p>
                    <p>• Could emphasize role of domestic opposition and media coverage</p>
                    <p>• Could focus on Vietnamese nationalism as the decisive factor</p>

                    <p><strong>MARKING FOCUS:</strong></p>
                    <p>• Historical accuracy and evidence</p>
                    <p>• Logical argument structure</p>
                    <p>• Critical analysis of the statement</p>
                    <p>• Use of specific examples and dates</p>
                    <p>• Balanced consideration of multiple factors</p>
                </div>
            </div>
        </div>
    );
};

export default Question4;
