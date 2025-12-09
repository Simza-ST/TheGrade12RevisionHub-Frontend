
import React, { useState } from 'react';

const Question5 = ({ isAnswered }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="question essay-question" id="question-5">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 5: INDEPENDENT AFRICA: CASE STUDY – THE CONGO
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    5. The Congo's attainment of independence from Belgium in June 1960 created expectations for a new and better life for all the Congolese. Critically discuss this statement with reference to the political, economic, social and cultural policies that Mobutu Sese Seko implemented in the Congo from the 1960s to the 1970s.
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
                    <p>Candidates should critically discuss Mobutu Sese Seko's political, economic, social and cultural policies and how they created a new and better life for all Congolese citizens after attaining independence from Belgium in the 1960s.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates should include the following aspects in their response:</p>
                    <p>Introduction: Candidates should take a stance and critically discuss Mobutu Sese Seko's political, economic, social and cultural policies and how they created a new and better life for all Congolese citizens after attaining independence from Belgium in the 1960s. They should also indicate how they intend supporting their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>

                    <p><strong>Political policies</strong></p>
                    <p>1. Colonial legacies: (as background information)</p>
                    <p>- Paternalism – Congolese were treated as children – with no responsibility in administration or representation of the government;</p>
                    <p>- Political parties were banned and with quick Belgian withdrawal - due to the 1959 Leopoldville riots - many political parties (representing different regions and ethnicities) were formed;</p>
                    <p>- 120 political parties participated in the 1960 elections; no single political party won outright majority – Patrice Lumumba's Movement National Congolese (MNC) won most of the seats because unlike other regional parties, it had some level of nation-wide support</p>
                    <p>- Lack of political unity</p>
                    <p>2. Congo became independent on 30 June 1960 with Joseph Kasavubu as President and Patrice Lumumba as Prime Minister. Joseph Kasavubu preferred that Congo be a federal state while Patrice Lumumba was for a strong centralised national government/Lumumba also in conflict with Moise Tshombe</p>
                    <p>3. Congo started with a lot of political instability – with Tshombe focused on secession of Katanga for its own independence</p>
                    <p>4. Joseph Mobutu seized power from Kasavubu through a coup d'état in 1965</p>
                    <p>5. He managed to bring some form of political stability (based on authoritarianism)</p>
                    <p>6. In 1967 Mobutu managed to stop the Katanga rebellion and gave his country a new constitution as a one party-state under his party, the Popular Movement for the Revolution (MPR)</p>
                    <p>7. Congo became a one-party state within the first five years after gaining independence with all opposition suppressed</p>
                    <p>8. Mobutu developed a personality cult (Mobutuism)</p>
                    <p>9. Mobutuism made Congo an autocratic state under himself as a military dictator</p>
                    <p>10. Was supported by the USA because he was seen as anti-communist ally</p>
                    <p>11. Created a strong centralised government and controlled all appointments, promotions and the allocation of government revenue.</p>
                    <p>12. Introduced a policy of Zaireanisation, a policy that replaced skilled foreigners or those occupying strategic management positions with the unskilled locals – which led to maladministration and mismanagement in political leadership roles</p>
                    <p>13. He allowed nepotism (kleptocracy)</p>
                    <p>14. Mobutu remained as 'president for life' until his death in 2007</p>
                    <p>15. Any other relevant response</p>

                    <p><strong>Economic policies</strong></p>
                    <p>1. Colonial legacies: (as background information)</p>
                    <p>- Exploitation – Belgian prosperity based on exploitation of cotton; rubber plantations; and mines (copper, tin & diamond) by colonial companies; Profits from minerals (mines) based on exploitation of Congolese workers</p>
                    <p>- At independence Congo was considered most prosperous but with the economic wealth owned by foreign owners</p>
                    <p>2. Inherited a capitalist economy from Belgium</p>
                    <p>3. Initially left the economy in the hands of white settlers and foreigners</p>
                    <p>4. The country's rich natural resources of copper, cobalt, diamonds and other materials attracted foreign investment</p>
                    <p>5. Nationalisation: Mobutu nationalised the country's copper mining industry and used profits from copper industry to finance his 10-year industrialisation plan</p>
                    <p>6. Nationalised foreign-owned companies without compensation</p>
                    <p>7. Foreign companies placed under control of his allies and family members</p>
                    <p>8. Introduced Zaireanisation (replacing foreigners with Zairian nationals)</p>
                    <p>9. Zaireanisation led to corruption, theft and mismanagement</p>
                    <p>10. The economy was characterised by nepotism and elitism (Created big gap between the elite and ordinary citizens/rich and poor)</p>
                    <p>11. Weak economic policies led to the decline in the state of infrastructure such as roads etc.</p>
                    <p>12. Mobutu Sese Seko created a kleptocracy were a group of appointed public officials abused their position for financial gain</p>
                    <p>13. Mobutu was forced to introduce retrocession (return of foreign owners)</p>
                    <p>14. Very few foreign owners returned</p>
                    <p>15. Congo's economy collapsed</p>
                    <p>16. Congo became dependent on foreign aid and investment, e.g. from the World Bank</p>
                    <p>17. Any other relevant response</p>

                    <p><strong>Social and cultural policies</strong></p>
                    <p>1. Colonial legacies: (as background information)</p>
                    <p>- Promoted elitism: encouraged education of a small elite in a western style of knowledge and skills</p>
                    <p>- Poor education system that did not benefit the Congolese nor empower them with skills</p>
                    <p>- French used as medium of instruction in schools</p>
                    <p>- At independence Congo had 14 university graduates out of 14 million people</p>
                    <p>2. Implemented a policy of Authenticité (originally to promote indigenous customs and beliefs) to eradicate colonial influence and unify Zairians with a sense of pride for own culture. Also referred to as Africanisation</p>
                    <p>- Replaced Christian names with African names, e.g. The Congo was renamed Zaire in 1971; Leopoldville became Kinshasa, Elisabethville became Lubumbashi, and Stanleyville became Kisangani; Mobutu also changed his name from Joseph-Desire Mobutu to Mobutu Sese Seko Kuku Ngbedu Waza Banga, meaning, 'The All-Conquering Warrior Who, Because of his Endurance And Inflexible Will To Win, Will go from Conquest to Conquest Leaving Fire in His Wake.'</p>
                    <p>3. Clothing: wearing of Western-style suits were outlawed (by a decree) and replaced with 'abacos' ('A bas le costumes'), meaning 'down with the suit'</p>
                    <p>4. Promoted local music</p>
                    <p>5. Mobutu regarded democracy as a foreign ideology to Africa – he ruled as a Chief in a traditional African style and used it to strengthen his own authoritarian position</p>
                    <p>6. French remained the language of instruction and education system continued to favour the urban elite</p>
                    <p>7. After independence, primary education and school enrolment rose from 1,6 million in 1960 to 4,6 million in 1974/When state funding was withdrawn by Mobutu, parents had to start paying and primary education started to decline</p>
                    <p>8. Teachers and hospital staff went unpaid for months due to poor economic and political practices</p>
                    <p>9. Any other relevant response</p>

                    <p><strong>Conclusion:</strong> Candidates should tie their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction:</strong> State your position clearly regarding whether Mobutu's policies fulfilled the expectations of independence. Provide a brief overview of your main arguments across political, economic, social and cultural dimensions.</p>
                    <p><strong>Body Paragraphs:</strong> Organize your discussion by policy areas (political, economic, social/cultural). Include specific examples of policies like Zaireanisation, Authenticité, and their impacts.</p>
                    <p><strong>Critical Analysis:</strong> Evaluate both positive and negative aspects of Mobutu's rule. Consider short-term vs long-term impacts.</p>
                    <p><strong>Conclusion:</strong> Summarize your main points and provide a final assessment of whether independence created a "new and better life" for all Congolese.</p>
                </div>
            </div>
        </div>
    );
};

export default Question5;

