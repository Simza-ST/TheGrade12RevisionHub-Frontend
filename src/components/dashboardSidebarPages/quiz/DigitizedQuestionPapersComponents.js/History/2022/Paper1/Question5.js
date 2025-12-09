
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
                    <p>Critically discuss the effectiveness of Mobutu Sese Seko's socio-economic and political policies in developing the Congo after attaining independence from Belgian colonial rule in the 1960s. [50]</p>
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
                    <p>Candidates should critically discuss the effectiveness of Mobutu Sese Seko's socio-economic and political policies in developing Congo after attaining independence from Belgian colonial rule in the 1960s.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates should include the following aspects in their response:</p>
                    <p><strong>Introduction:</strong> Candidates should take a critical stance discussing the effectiveness of Mobutu Sese Seko's socio-economic and political policies in developing Congo after attaining independence from Belgian colonial rule in the 1960s. They should also indicate how they intend supporting their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>

                    <p><strong>ECONOMIC POLICIES</strong></p>

                    <p><strong>1. Colonial legacies: (as background information)</strong></p>
                    <p>• Exploitation – Belgian prosperity based on exploitation of cotton; rubber plantations; and mines (copper, tin & diamond) by colonial companies</p>
                    <p>• Profits from minerals (mines) based on exploitation of Congolese workers</p>
                    <p>• At independence Congo was considered most prosperous but with the economic wealth owned by foreign owners</p>

                    <p><strong>2. Inherited a capitalist economy from Belgium</strong></p>

                    <p><strong>3. Initially left the economy in the hands of white settlers and foreigners</strong></p>

                    <p><strong>4. The country's rich natural resources of copper, cobalt, diamonds and other materials attracted foreign investment</strong></p>

                    <p><strong>5. Nationalisation:</strong> Mobutu nationalised the country's copper mining industry and used profits from copper industry to finance his 10-year industrialisation plan</p>

                    <p><strong>6. Nationalised foreign-owned companies without compensation</strong></p>

                    <p><strong>7. Foreign companies were placed under control of his allies and family members</strong></p>

                    <p><strong>8. Introduced Zaireanisation (replacing foreigners with Zairian nationals)</strong></p>

                    <p><strong>9. Zaireanisation led to corruption, theft and mismanagement</strong></p>

                    <p><strong>10. The economy was characterised by nepotism and elitism (created big gap between the elite and ordinary citizens/rich and poor)</strong></p>

                    <p><strong>11. Weak economic policies led to the decline in the state of infrastructure such as roads etc.</strong></p>

                    <p><strong>12. Mobutu created a kleptocracy where a group of appointed public officials abused their position for financial gain</strong></p>

                    <p><strong>13. Mobutu was forced to introduce retrocession (return of foreign owners)</strong></p>

                    <p><strong>14. Very few foreign owners returned</strong></p>

                    <p><strong>15. Congo's economy collapsed</strong></p>

                    <p><strong>16. Congo became dependent on foreign aid and investment, e.g. from the World Bank</strong></p>

                    <p><strong>17. Any other relevant response</strong></p>

                    <p><strong>SOCIAL POLICIES</strong></p>

                    <p><strong>1. Colonial legacies: (as background information)</strong></p>
                    <p>• Promoted elitism: encouraged education of a small elite in a Western style of knowledge and skills</p>
                    <p>• Poor education system that did not benefit the Congolese nor empower them with skills</p>
                    <p>• French used as medium of instruction in schools</p>
                    <p>• At independence (1960) Congo had 14 university graduates out of 14 million people</p>

                    <p><strong>2. Implemented a policy Authenticite (originally to promote indigenous customs and beliefs) to eradicate colonial influence and unify Zaireans with a sense of pride for their own culture.</strong></p>

                    <p><strong>3. Africanisation/Zaireanisation (renaming from European to Zairean names)</strong></p>

                    <p><strong>4. Clothing: wearing of Western-style suits were outlawed (by a decree) and replaced with 'abacos' ('A bas le costumes'), meaning 'down with the suit' (social status)</strong></p>

                    <p><strong>5. Promotion of local music</strong></p>

                    <p><strong>6. Mobutu regarded democracy as a foreign ideology to Africa – he ruled as a Chief in a traditional African style and used it to strengthen his own authoritarian position</strong></p>

                    <p><strong>7. French remained the language of instruction and education system continued to favour the urban elite</strong></p>

                    <p><strong>8. After independence, primary education and school enrolment rose from 1,6 million in 1960 to 4,6 million in 1974</strong></p>
                    <p><strong>•</strong> When state funding was withdrawn by Mobutu, parents had to start paying and primary education started to decline</p>

                    <p><strong>9. Teachers and hospital staff went unpaid for months due to poor economic and political practice</strong></p>

                    <p><strong>10. Any other relevant response</strong></p>

                    <p><strong>POLITICAL POLICIES</strong></p>

                    <p><strong>1. Colonial legacies: (as background information)</strong></p>
                    <p>• Paternalism – Congolese were treated as children – with no responsibility in administration or representation of the government</p>
                    <p>• Political parties were banned and with quick Belgian withdrawal – due to the 1959 Leopoldville riots – many political parties (representing different regions and ethnicities) were formed; political parties formed along regional and ethnic groupings</p>
                    <p>• 120 political parties participated in the 1960 elections; no single political party won outright majority – Patrice Lumumba's Movement National Congolese (MNC) won most of the seats because unlike other regional parties, it had some level of nation-wide support</p>
                    <p>• Lack of political unity</p>

                    <p><strong>2. Congo became independent on 30 June 1960 with Joseph Kasavubu as President and Patrice Lumumba as Prime Minister.</strong></p>
                    <p>• Joseph Kasavubu preferred that Congo be a federal state while Patrice Lumumba was for a strong centralised national government/Lumumba also in conflict with Moise Tshombe</p>

                    <p><strong>3. Congo started with a lot of political instability – with Tshombe focused on secession of Katanga for its own independence</strong></p>

                    <p><strong>4. Mobutu seized power from Kasavubu through a coup d'état in 1965</strong></p>

                    <p><strong>5. He managed to bring some form of political stability (based on authoritarianism)</strong></p>

                    <p><strong>6. In 1967 Mobutu managed to stop the Katanga rebellion and gave his country a new constitution as a one-party state under his party, the Popular Movement for the Revolution (MPR)</strong></p>

                    <p><strong>7. Congo became a one-party state within the first five years after gaining independence with all opposition suppressed</strong></p>

                    <p><strong>8. Mobutu developed a personality cult (Mobutuism)</strong></p>

                    <p><strong>9. Mobutuism made Congo an autocratic state under himself as a military dictator</strong></p>

                    <p><strong>10. Mobutu was supported by the USA because he was seen as anti-communist ally</strong></p>

                    <p><strong>11. He created a strong centralised government and controlled all appointments, promotions and the allocation of government revenue.</strong></p>

                    <p><strong>12. He introduced a policy of Zaireanisation, a policy that replaced skilled foreigners or those occupying strategic management positions with the unskilled locals – which led to maladministration and mismanagement in political leadership roles</strong></p>

                    <p><strong>13. He allowed nepotism (kleptocracy)</strong></p>

                    <p><strong>14. Mobutu remained as 'president for life' until his death in 2007</strong></p>

                    <p><strong>15. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should tie their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>

                    <p><strong>Introduction (Approx. 50-80 words):</strong></p>
                    <p>• State that you will critically evaluate Mobutu's policies</p>
                    <p>• Mention the colonial legacy context</p>
                    <p>• Outline your approach: examining economic, social, and political policies separately</p>
                    <p>• Indicate your overall assessment (e.g., largely ineffective, mixed results, or initially promising but ultimately failed)</p>

                    <p><strong>Body Paragraphs (Approx. 300-400 words):</strong></p>

                    <p><strong>Paragraph 1: Economic Policies and Their Effectiveness</strong></p>
                    <p>• Nationalisation and Zaireanisation</p>
                    <p>• Short-term benefits vs long-term collapse</p>
                    <p>• Corruption and kleptocracy</p>
                    <p>• Economic dependency on foreign aid</p>

                    <p><strong>Paragraph 2: Social Policies and Cultural Impact</strong></p>
                    <p>• Authenticité movement and cultural revival</p>
                    <p>• Education policies and outcomes</p>
                    <p>• Social stratification and elitism</p>
                    <p>• Impact on ordinary citizens</p>

                    <p><strong>Paragraph 3: Political Policies and Governance</strong></p>
                    <p>• One-party state and suppression of opposition</p>
                    <p>• Mobutuism and personality cult</p>
                    <p>• Centralization of power</p>
                    <p>• US support and Cold War context</p>

                    <p><strong>Paragraph 4: Critical Assessment and Legacy</strong></p>
                    <p>• Balancing positive and negative aspects</p>
                    <p>• Comparison with initial colonial conditions</p>
                    <p>• Long-term impact on Congo's development</p>
                    <p>• Mobutu's role in African post-colonial politics</p>

                    <p><strong>Conclusion (Approx. 50-80 words):</strong></p>
                    <p>• Summarize key findings about effectiveness</p>
                    <p>• Provide final critical assessment</p>
                    <p>• Mention broader implications for post-colonial African development</p>
                    <p>• Connect to Congo's current situation</p>

                    <p><strong>CRITICAL ANALYSIS FOCUS:</strong></p>
                    <p>1. <strong>Balance:</strong> Consider both achievements and failures</p>
                    <p>2. <strong>Context:</strong> Situate policies within post-colonial challenges</p>
                    <p>3. <strong>Causality:</strong> Link policies to specific outcomes</p>
                    <p>4. <strong>Comparative:</strong> Contrast Mobutu's approach with other African leaders</p>
                    <p>5. <strong>Long-term:</strong> Assess lasting impact beyond Mobutu's rule</p>

                    <p><strong>KEY TERMS TO INCLUDE:</strong></p>
                    <p>• Kleptocracy • Authenticité • Zaireanisation • Nationalisation</p>
                    <p>• Mobutuism • One-party state • Patrice Lumumba • Katanga secession</p>
                    <p>• Colonial legacy • Neo-colonialism • Economic dependency</p>

                    <p><strong>HISTORICAL CONTEXT ESSENTIALS:</strong></p>
                    <p>• Belgian colonial rule (1908-1960)</p>
                    <p>• Congo Crisis (1960-1965)</p>
                    <p>• Assassination of Lumumba (1961)</p>
                    <p>• Cold War dynamics in Africa</p>
                    <p>• Resource curse and corruption</p>
                </div>
            </div>
        </div>
    );
};

export default Question5;

