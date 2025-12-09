
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
                    4. The tactics and strategies that the United States of America used between 1963 and 1975 against the Vietcong during the war in Vietnam were a dismal failure. Do you agree with the statement? Use relevant evidence to support your line of argument.
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
                    <p>Candidates should explain whether they agree or disagree with the statement. In agreeing with the statement, they need to explain how the tactics and strategies used by the United States of America against the Vietcong were a dismal failure. If the candidates disagree with the statement, they need to substantiate their line of argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates should include the following aspects in their response:</p>
                    <p>1. Introduction: Candidates should take a stance by indicating whether they agree or disagree with the statement. They should also provide an outline of how they would support their line of argument</p>

                    <p><strong>ELABORATION</strong></p>
                    <p>Focus on the strategies used by both the USA and the Vietcong.</p>
                    <p>1. Conditions immediately before the war: (Background)</p>
                    <p>- The division of Vietnam and the formation of the Vietcong</p>
                    <p>- Reasons for USA involvement: containment and domino theory</p>
                    <p>2. US first intervention in South Vietnam – sent weapons and military advisors against the Vietcong (Vietnamese communist)</p>
                    <p>3. Ho Chi Minh Trail and its significance (used by the Vietminh (communist guerrillas from North Vietnam) to support the Vietcong)</p>
                    <p>4. US introduced 'Safe Village' policy/Hamlet strategy/Villagisation – trying to isolate/separate guerrillas from villagers (1963)</p>
                    <p>5. Safe village policy failed because the Vietcong operated inside villages</p>
                    <p>6. The Gulf of Tonkin incident and resolution (1964)</p>
                    <p>7. The USA felt the war in Vietnam was not a conventional war like World War II</p>
                    <p>8. USA sent 3 500 marines and ground troops to Vietnam on 8 March 1965</p>
                    <p>9. Operation Ranch Hand (1962–1971) – use of chemical defoliants (Agent Orange to destroy the forest) and Agent Blue (to destroy agricultural products and food to weaken the Vietcong)</p>
                    <p>10. President Johnson introduced Operation Rolling Thunder in March 1965 to quickly eliminate the Vietcong</p>
                    <p>11. Use of chemical weapons e.g. Napalm gas made USA unpopular and many countries condemned the USA</p>
                    <p>12. Guerrilla warfare by the Vietminh and Vietcong (difficulty in separating guerrillas from villagers – farmers/peasants)</p>
                    <p>13. Vietcong responded with the Tet Offensive (1968) - surprised attacks on 100 cities</p>
                    <p>14. Number of US soldiers killed increased – led to anti-war demonstrations</p>
                    <p>15. Highly effective use of guerrilla tactics by the Vietcong</p>
                    <p>16. US sent young and inexperienced soldiers to Vietnam</p>
                    <p>17. US used search and destroy missions (My Lai massacre) to destroy villages supported by Vietcong</p>
                    <p>18. This resulted in large numbers of civilian deaths – more support for Vietcong</p>
                    <p>19. US atrocities and My Lai massacre (March 1968) turned public opinion against the war</p>
                    <p>20. North Vietnam received military support from the USSR and China so the Vietminh and Vietcong had access to some modern weapons</p>
                    <p>21. Guerrilla warfare was effectively used by the Vietcong, supported by Vietminh from the north and used tactics such as booby traps, underground tunnels, hit and run, sabotage</p>
                    <p>22. The Vietcong increased its support base because of the tactics used against the USA soldiers</p>
                    <p>23. The Vietnamese were united in the defence of their country</p>
                    <p>24. Vietnamisation: President Nixon came up with the policy of strategic withdrawal from Vietnam. Also called WHAM (Winning the hearts and minds of the Vietnamese) signalled the failure of USA to stop Vietnam from becoming a communist state and its subsequent withdrawal</p>
                    <p>25. USA withdrew all troops by 1973 (President Nixon had signed the Paris Peace Accords on 27 January 1973 – ending US involvement in the Vietnam war</p>
                    <p>26. North Vietnam took control of Saigon in 1975</p>
                    <p>27. Vietnam was united under communist control</p>
                    <p>28. Any other relevant response</p>
                    <p>29. Conclusion: Candidates should tie up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction:</strong> State your position clearly - agree or disagree with the statement. Provide a brief overview of your main arguments.</p>
                    <p><strong>Body Paragraphs:</strong> Organize your arguments chronologically or thematically. Include specific historical evidence like dates, operations, and key events.</p>
                    <p><strong>Counterarguments:</strong> Address potential counterarguments to strengthen your position.</p>
                    <p><strong>Conclusion:</strong> Summarize your main points and restate your thesis in light of the evidence presented.</p>
                </div>
            </div>
        </div>
    );
};

export default Question4;
