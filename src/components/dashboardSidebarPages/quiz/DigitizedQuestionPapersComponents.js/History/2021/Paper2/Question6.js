
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
                    <p>Mikhail Gorbachev's reforms in the Soviet Union (Perestroika and Glasnost) led to the birth of a new era of co-operation between the African National Congress (ANC) and the National Party (NP) in South Africa from 1989.</p>
                    <p>Do you agree with the statement? Support your line of argument with relevant evidence.</p>
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
                    <p>Candidates need to indicate whether they agree or disagree with the statement. If they agree with the statement, they need to explain how Mikhail Gorbachev's reforms (Perestroika and Glasnost) in the Soviet Union led to the birth of a new era of co-operation between the African National Congress (ANC) and the National Party (NP) in South Africa from 1989. If they disagree with the statement, they need to substantiate their argument with relevant historical evidence.</p>

                    <p><strong>MAIN ASPECTS</strong></p>
                    <p>Candidates could include the following aspects in their essay:</p>

                    <p><strong>Introduction:</strong></p>
                    <p>Candidates should agree or disagree that Mikhail Gorbachev's reforms (Perestroika and Glasnost) in the Soviet Union led to the birth of a new era of co-operation between the African National Congress (ANC) and the National Party (NP) in South Africa from 1989. They should also indicate how they will support their line of argument.</p>

                    <p><strong>ELABORATION</strong></p>
                    <p><strong>1. Soviet Union Context (Background)</strong></p>
                    <p>- Soviet Union in economic hardships when Gorbachev took leadership in 1985</p>
                    <p>- Introduction of Perestroika (economic restructuring) and Glasnost (political openness)</p>
                    <p>- Perestroika allowed small scale private ownership and removed government control over production</p>
                    <p>- Glasnost allowed people to criticize government and led to demands for end of communism</p>

                    <p><strong>2. Impact on Cold War Dynamics</strong></p>
                    <p>- Reforms led to the end of communism and the end of the Cold War</p>
                    <p>- Soviet Union no longer regarded as a superpower</p>
                    <p>- Communism was no longer seen as a 'global threat'</p>
                    <p>- Collapse of the Berlin Wall in 1989 symbolized the end of Cold War divisions</p>

                    <p><strong>3. Impact on Western Support for Apartheid</strong></p>
                    <p>- The USA and its allies could no longer continue to support the apartheid regime</p>
                    <p>- The West now put pressure on the NP to negotiate with the ANC or face continued sanctions</p>
                    <p>- South Africa could no longer rely on Western backing for its 'anti-communist' stance</p>

                    <p><strong>4. Military and Regional Factors</strong></p>
                    <p>- The defeat of the SADF during the Battle of Cuito Cuanavale in 1988 spurred negotiations</p>
                    <p>- South Africa withdrew from South-West Africa – SWAPO won elections (1990) and renamed it Namibia</p>
                    <p>- Peaceful transition in Namibia served as a blueprint for South Africa</p>

                    <p><strong>5. Changing NP Perspective</strong></p>
                    <p>- It became evident that the National Party government could not maintain white supremacy rule indefinitely</p>
                    <p>- Influential NP members realized apartheid was not the answer for white economic interests</p>
                    <p>- The government believed reform was needed to develop a strong black middle class as a 'bulwark against revolution'</p>
                    <p>- The NP's claim that it was protecting South Africa from communist onslaught became unrealistic</p>

                    <p><strong>6. Impact on ANC Strategy</strong></p>
                    <p>- The Soviet Union could no longer support the ANC financially as it was bankrupt</p>
                    <p>- The Soviet Union would not support the ANC with weapons anymore as it favored peaceful negotiations</p>
                    <p>- The ANC was unable to continue the armed struggle without this military and financial support</p>
                    <p>- The ANC now showed willingness to negotiate with NP as an alternative to armed struggle</p>

                    <p><strong>7. De Klerk's Shift and Negotiations</strong></p>
                    <p>- FW de Klerk started to accept that the black struggle against apartheid was not a conspiracy directed from Moscow</p>
                    <p>- This enabled De Klerk to engage with liberation organisations</p>
                    <p>- On 2 February 1990 De Klerk announced the unbanning of all anti-apartheid organisations</p>
                    <p>- This paved the way for multi-party talks that ultimately led to democratic elections in 1994</p>

                    <p><strong>8. Any other relevant response</strong></p>

                    <p><strong>Conclusion:</strong> Candidates should tie up their argument with a relevant conclusion.</p>

                    <p><strong>ESSAY STRUCTURE GUIDELINES:</strong></p>
                    <p><strong>Introduction:</strong> Clearly state your position on whether Gorbachev's reforms were the primary factor leading to ANC-NP cooperation. Acknowledge other contributing factors while establishing your main argument.</p>
                    <p><strong>Body Paragraphs:</strong> Organize by thematic areas - Soviet reforms and Cold War impact, Western pressure changes, military realities, economic factors, and leadership decisions on both sides.</p>
                    <p><strong>Critical Analysis:</strong> Evaluate the relative importance of Gorbachev's reforms compared to other factors like internal resistance, economic sanctions, and military stalemate. Consider whether cooperation would have occurred without the Soviet reforms.</p>
                    <p><strong>Conclusion:</strong> Summarize your assessment of how significantly Gorbachev's reforms influenced the shift toward cooperation, while acknowledging the complex interplay of multiple factors in South Africa's transition.</p>
                </div>
            </div>
        </div>
    );
};

export default Question6;


