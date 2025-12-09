import React, { useState } from 'react';

const Question6 = ({ isAnswered }) => {
    const [showSolution, setShowSolution] = useState(false);

    return (
        <div className="question essay-question" id="question-6">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 6: THE END OF THE COLD WAR AND A NEW WORLD ORDER
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    The policy changes by Mikhail Gorbachev in the Soviet Union from 1985 led to its disintegration in 1991, however, they also brought positive results for South African politics.
                    <br />
                    <br />
                    Critically discuss this statement. Support your line of argument with relevant historical evidence. [50]
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
                    <p>Candidates need to critically discuss how policy changes (perestroika and glasnost) by Mikhail Gorbachev in the Soviet Union from 1985 led to its disintegration in 1991, but had a positive result in South African politics. They need to substantiate their argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates could include the following aspects in their response:</p>

                    <p><strong>Introduction:</strong></p>
                    <p>Candidates need to critically discuss how policy changes (Perestroika and Glasnost) by Mikhail Gorbachev in the Soviet Union from 1985 led to its disintegration in 1991, but had a positive result in South African politics. They should also indicate how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>

                    <p><strong>1. Gorbachev's Rise and Initial Reforms</strong></p>
                    <p>- Gorbachev became Secretary-General of the CPSU and leader of the government in 1985 at 54 years of age</p>
                    <p>- He was not a hardliner and hoped to revive Soviet Union's economy by improving both industrial output and technology, as well as expanding its markets</p>
                    <p>- He took a big risk of effecting political change, especially for the Soviet Union, known for its hard-line Communist stance</p>
                    <p>- He wanted to take the Soviet Union out of a weak economic system – due to space and arms race with the USA</p>

                    <p><strong>2. Introduction of Key Policies</strong></p>
                    <p>- In 1985 he introduced perestroika (economic reconstruction) and glasnost (openness)</p>
                    <p>- Perestroika allowed small scale private ownership and removed government control over production</p>
                    <p>- Perestroika and glasnost led to demands for the end of communism and full democracy</p>
                    <p>- Glasnost led to criticism of the policy of perestroika and Gorbachev himself</p>

                    <p><strong>3. Domestic Opposition and Challenges</strong></p>
                    <p>- Many hard-line communists were discontent with policies that became unpopular</p>
                    <p>- At home he had two types of opponents: hardliners who were opposed to the reforms and liberals who criticised him for not moving fast enough</p>
                    <p>- The two policies did not support each other as thought but ended the entire system of the Soviet Union</p>
                    <p>- He lost support at home – Unity of the Soviet Union was at risk and socialism became threatened</p>

                    <p><strong>4. International Recognition and Internal Divisions</strong></p>
                    <p>- He commanded a hero status to the West. His personal power and prestige increased. He received a Nobel Peace Prize in 1990</p>
                    <p>- Many underlying differences always existed among the 15 republics</p>
                    <p>- Civil unrests broke out between various groups</p>
                    <p>- Old form of nationalism emerged and led to new demand for independence</p>

                    <p><strong>5. Disintegration of the Soviet Union</strong></p>
                    <p>- He tried to stop the disintegration by proposing the establishment of a Federation of States – which failed</p>
                    <p>- In 1990, several Soviet states including Russia under Gorbachev's bitter rival, Boris Yeltsin, declared their independence</p>
                    <p>- On 25 Dec. 1991, the USSR was dissolved, the Communist Party disbanded</p>
                    <p>- Each of the 15 republics became independent and became members of the Commonwealth of Independent States</p>
                    <p>- The disintegration symbolised the end of the Cold War</p>

                    <p><strong>6. Positive Results of Gorbachev's Reforms on South African Politics</strong></p>
                    <p><strong>A. Pressure for Negotiations</strong></p>
                    <p>- Talks between the NP and the ANC in exile</p>
                    <p>- The collapse of the Soviet Union put pressure on both the National Party government and the ANC to begin negotiations</p>
                    <p>- The defeat of the SADF during the Battle of Cuito Cuanavale in 1988 spurred the National Party to start negotiations with communists over the independence of South West Africa</p>

                    <p><strong>B. Namibia as a Blueprint</strong></p>
                    <p>- FW de Klerk introduced reforms that led to negotiations between the National Party and the ANC</p>
                    <p>- South Africa withdrew from South West Africa – SWAPO won the elections (1990) and renamed it Namibia</p>
                    <p>- This peaceful transition from white minority rule to Black majority rule in Namibia served as a blueprint for SA to do the same</p>

                    <p><strong>C. Changing NP Perceptions</strong></p>
                    <p>- It became evident that the National Party government could not maintain white supremacy rule indefinitely</p>
                    <p>- Influential National Party members started to realise that apartheid was not the answer for the development of 'white' economic interests</p>
                    <p>- The government started to believe that reforms needed to include the development of a strong black middle class which would act as a 'bulwark against revolution'</p>

                    <p><strong>D. Loss of Anti-Communist Justification</strong></p>
                    <p>- The South African government could no longer use the threat of communism to generate Western support</p>
                    <p>- South Africa could no longer rely on Western backing for its 'anti-communist' stance</p>
                    <p>- World politics changed and this had an impact on South Africa's apartheid policies</p>
                    <p>- The apartheid regime could no longer use communism to justify its policy of racial segregation</p>
                    <p>- The National Party's claim that it was protecting South Africa from a communist onslaught became unrealistic</p>

                    <p><strong>E. ANC's Changed Position</strong></p>
                    <p>- De Klerk thought that the ANC would be weak and showed his willingness to negotiate with it</p>
                    <p>- The USSR could no longer support the ANC financially as it was bankrupt</p>
                    <p>- The USSR would not support the ANC with weapons anymore as it favoured peaceful negotiations</p>
                    <p>- The ANC was unable to continue the armed struggle against the NP without this military and financial support</p>
                    <p>- The ANC now also showed willingness to negotiate with NP as an alternative to the armed struggle</p>

                    <p><strong>F. Direct Impact on Negotiations</strong></p>
                    <p>- FW de Klerk started to accept that the black struggle against apartheid was not a conspiracy directed from Moscow</p>
                    <p>- This enabled De Klerk to engage with the liberation organisations to find a lasting solution for South Africa</p>
                    <p>- On 2 February 1990 De Klerk announced the unbanning of all anti-apartheid organisations and this paved the way for multi-party talks</p>
                    <p>- These talks ultimately led to democratic elections that were held in 1994</p>

                    <p><strong>7. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should tie up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction (Approx. 50 words):</strong> Present your critical stance on the statement, acknowledging both the Soviet disintegration and South African political benefits, while outlining your analytical approach.</p>

                    <p><strong>Body Paragraph 1:</strong> Gorbachev's reforms - perestroika and glasnost, their intentions and unintended consequences.</p>

                    <p><strong>Body Paragraph 2:</strong> Soviet disintegration - internal pressures, nationalist movements, economic collapse, formal dissolution.</p>

                    <p><strong>Body Paragraph 3:</strong> Impact on apartheid government - loss of anti-communist justification, international isolation, Namibia precedent.</p>

                    <p><strong>Body Paragraph 4:</strong> Impact on ANC - loss of Soviet support, shift from armed struggle to negotiations.</p>

                    <p><strong>Body Paragraph 5:</strong> Direct effects on South African negotiations - De Klerk's reforms, unbanning of organizations, CODESA process.</p>

                    <p><strong>Body Paragraph 6:</strong> Critical analysis - weighing negative Soviet outcomes against positive South African results, considering alternative factors.</p>

                    <p><strong>Body Paragraph 7:</strong> Broader Cold War context - end of bipolar world, changing international relations, impact on regional conflicts.</p>

                    <p><strong>Conclusion (Approx. 50 words):</strong> Provide a balanced assessment of the statement, evaluating the complex relationship between Soviet collapse and South Africa's transition, and considering whether positive outcomes for South Africa justify the Soviet disintegration.</p>

                    <p><strong>SAMPLE INTRODUCTION:</strong></p>
                    <p>"While Mikhail Gorbachev's reform policies of perestroika and glasnost indeed contributed to the Soviet Union's disintegration in 1991, they paradoxically created conditions that facilitated South Africa's democratic transition. The collapse of the USSR removed the apartheid government's anti-communist justification for racial oppression while simultaneously weakening the ANC's capacity for armed struggle, forcing both parties toward negotiation. This essay will critically examine how the end of the Cold War, precipitated by Gorbachev's reforms, created an international environment that made South Africa's negotiated settlement not just possible but necessary, while also acknowledging the complex interplay of domestic factors in both countries' political transformations."</p>
                </div>
            </div>
        </div>
    );
};

export default Question6;