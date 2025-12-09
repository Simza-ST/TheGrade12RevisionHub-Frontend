
import React, { useState } from 'react';

const Question2 = ({ isAnswered }) => {
    const [showSolution1, setShowSolution1] = useState(false);
    const [showSolution2, setShowSolution2] = useState(false);
    const [showSolution3, setShowSolution3] = useState(false);
    const [showSolution4, setShowSolution4] = useState(false);
    const [showSolution5, setShowSolution5] = useState(false);
    const [showSolution6, setShowSolution6] = useState(false);
    const [showSolution7, setShowSolution7] = useState(false);
    const [showSolution8, setShowSolution8] = useState(false);
    const [showSolution9, setShowSolution9] = useState(false);
    const [showSolution10, setShowSolution10] = useState(false);
    const [showSolution11, setShowSolution11] = useState(false);
    const [showSolution12, setShowSolution12] = useState(false);
    const [showSolution13, setShowSolution13] = useState(false);
    const [showSolution14, setShowSolution14] = useState(false);
    const [showSolution15, setShowSolution15] = useState(false);
    const [showSolution16, setShowSolution16] = useState(false);
    const [showSolution17, setShowSolution17] = useState(false);

    return (
        <div className="question" id="question-2">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 2: HOW DID THE STATISTICS (INFORMATION SHOWN IN NUMBERS) CREATE DEBATES AND CONTROVERSIES ABOUT THE OUTCOME OF THE BATTLE OF CUITO CUANAVALE (1987–1988)?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2A</strong></p>
                <p>The source below is from a book titled The Siege of Cuito Cuanavale by H Campbell. It sheds light on rival encounters between the People's Armed Forces of Liberation of Angola (FAPLA) and the National Union for the Total Independence of Angola/South African Defence Force (UNITA/SADF) during the Battle of Cuito Cuanavale (1987–1988).</p>
                <p>
                    The purpose of Operation Modular was to capture (control) the military stronghold of the Angolans at Menongue and to set up a provisional government of the National Union for the Total Independence of Angola (UNITA) in Angola. This was supposed to boost (increase) the image of UNITA in the USA and to give credence (belief) to the idea that UNITA had over two-thirds of Angola under its control.
                </p>
                <p>
                    A major battle took place on the Lomba River when the South African Defence Force (SADF) clashed with the forces of the People's Armed Forces of Liberation of Angola (FAPLA), both with offensive weapons. After a fierce (powerful) battle the Angolans retreated (withdrew) to Cuito Cuanavale and the South African Defence Force (SADF) laid siege (guard). The commanders of the SADF had expected to overrun FAPLA in retreat but by the end of December the South Africans had lost more than 230 soldiers and UNITA over 1 000. The South Africans lost over 41 aircraft, three helicopters and over 31 vehicles.
                </p>
                <p>
                    As it turned out, the generals had to fight with the 9 000 troops who were on the banks of the Cuito River while the Angolans organised to fight a defensive war. More significantly, when the President of South Africa travelled to the front inside Angola, the Angolans requested the Cubans to assist in defending Cuito Cuanavale. The Angolans were holed up (stuck) in Cuito Cuanavale while the SADF carried out tremendous shelling (bombing). But in this instance the radar (system of detecting the presence, direction, distance and speed of aircrafts) defensive line of the Angolans was operational and the South Africans were on the banks of the Cuito River shelling Cuito Cuanavale without air cover.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.1 What, according to the source, were the TWO purposes of Operation Modular during the Battle of Cuito Cuanavale? (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution1(!showSolution1)}
                >
                    {showSolution1 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution1 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'To capture the military stronghold of the Angolans at Menongue'</p>
                    <p>2. 'To set up a provisional government of UNITA in Angola'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.2 Define the term provisional government in your own words. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution2(!showSolution2)}
                >
                    {showSolution2 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution2 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. An interim/temporary government set up to manage a transition from one government to the next</p>
                    <p>2. An emergency or temporary government established to take care of a process of change of governments</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.3 Name TWO forces in the source which clashed at the battle on the Lomba River. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution3(!showSolution3)}
                >
                    {showSolution3 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution3 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'SADF'</p>
                    <p>2. 'FAPLA'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.4 Explain the implication of the statement, '… the Angolans retreated to Cuito Cuanavale and the South African Defence Force (SADF) laid siege', in the context of the battle on the Lomba River. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution4(!showSolution4)}
                >
                    {showSolution4 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution4 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. FAPLA was forced to withdraw from Lomba to Cuito because the SADF had the upper hand</p>
                    <p>2. FAPLA withdrew to Cuito but SADF could only lay siege and not defeat FAPLA</p>
                    <p>3. FAPLA/Angolans were stuck/pinned down by SADF at Cuito</p>
                    <p>4. Angolans retreated not to allow the enemy to have a decisive victory</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.5 Why do you think the Angolan government requested the Cubans to assist them in defending Cuito Cuanavale? (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution5(!showSolution5)}
                >
                    {showSolution5 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution5 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. To protect the Angolan government against invasion from South Africa (by SADF)</p>
                    <p>2. To prevent SADF from taking control of Cuito Cuanavale</p>
                    <p>3. To defend the communist FAPLA government against the capitalist apartheid regime</p>
                    <p>4. They shared the same ideology</p>
                    <p>5. The Angolans needed sophisticated weapons provided by the Cubans/secure victory</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2B</strong></p>
                <p>The table below is from a book titled THE SADF IN THE BORDER WAR 1966–1989 by an academic, Leopold Scholtz. It contains statistics provided by General Jannie Geldenhuys, an SADF army leader. It outlines a comparison of damages to the artillery suffered by the two warring (fighting) factions (SADF and CUBA/FAPLA) during the Battle of Cuito Cuanavale.</p>
                <div className="cartoon-placeholder">
                    <img
                        src="/images/SOURCE2BP122.png"
                        alt="Statistics table comparing damages between SADF and CUBA/FAPLA"
                        style={{maxWidth: '100%', height: 'auto', border: '1px solid #ccc', marginTop: '10px'}}
                    />
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.1 Identify in the source the number of tanks destroyed on the side of the following:
                </div>
                <div className="subquestion-text">
                    (a) Cuba/FAPLA (1)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution6(!showSolution6)}
                >
                    {showSolution6 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution6 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 94</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    (b) SADF (1)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution7(!showSolution7)}
                >
                    {showSolution7 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution7 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 3</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.2 What does the number of logistical vehicles destroyed (389 for FAPLA and only 1 for the SADF) suggest regarding the outcome of the Battle of Cuito Cuanavale? (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution8(!showSolution8)}
                >
                    {showSolution8 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution8 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>It suggests that:</p>
                    <p>1. FAPLA suffered more losses than the SADF</p>
                    <p>2. SADF was victorious during the combat at Cuito Cuanavale</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.3 Explain whether a historian might consider this source reliable when researching the losses suffered by the Cuban/FAPLA and SADF forces during the Battle of Cuito Cuanavale. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution9(!showSolution9)}
                >
                    {showSolution9 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution9 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p><strong>Candidates can choose either RELIABLE or NOT RELIABLE and substantiate their responses with relevant evidence.</strong></p>
                    <p><strong>RELIABLE</strong></p>
                    <p>1. The evidence is published in a book by an academic – a product of research</p>
                    <p>2. Geldenhuys was actively involved in the Battle of Cuito Cuanavale – eye witness account/General of the SADF, Chief of the SADF</p>
                    <p>3. Any other relevant response</p>
                    <p><strong>NOT RELIABLE</strong></p>
                    <p>1. Only the SADF perspective is reflected showing huge losses by opponents</p>
                    <p>2. Losses suffered by Cuba/FAPLA are allegedly inflated to suggest that they lost the war</p>
                    <p>3. It is statistics provided by a SADF army, General Jannie Geldenhuys</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2C</strong></p>
                <p>This account of the Battle of Cuito Cuanavale by Vladimir Anatoliyevich Korolkov, a Russian soldier who served in the south of Angola between 1986 and 1988, is taken from the book, The Bush War: The Road to Cuito Cuanavale, by G Shubin. It focuses on the views about General Geldenhuys and the statistics of damaged artillery during the Battle of Cuito Cuanavale.</p>
                <p>
                    I don't wish to insult General Geldenhuys (who is respected not only by his compatriots but also by his former enemies), but he cites (quotes), to put it mildly, incorrect data about the losses of the South Africans, in particular the aircraft. He does not mention the heavy losses of UNITA troops (hundreds of them died every day during major battles near Cuito Cuanavale in March 1988) and the South West African Territorial Force (SWATF), but only those of the SADF, a formation of only 40 men.
                </p>
                <p>
                    Moreover, he intentionally or unintentionally lumps (combines) together FAPLA with the Cubans, and, furthermore, he doesn't even remember SWAPO – three armies with very big differences concerning their levels of preparation and ability to fight. He also minimises the threat of Fidel Castro to seize the whole of Namibia to resolve the outcome of the war. Castro held, by March 1988, overwhelming military superiority in terms of numbers and capability, both on land and in the air.
                </p>
                <p>
                    The SADF were also defeated by the Cubans in several little-known battles after Cuito Cuanavale in April–June 1988. The South Africans started to blow up bridges on the Namibian border after the Cuban offensive towards the Namibian border from Cahama in southern Angola. This offensive was backed by some 700 to 800 Cuban tanks, 40 000 military personnel and 60–70 combat planes. The South Africans had two choices – to be kicked out of Namibia by the Cubans or sign the peace agreement that would herald (show) Namibian independence and allow themselves a face-saving disengagement (withdrawal). South African political and military authorities signed the accord (peace agreement) and declared themselves the political and military winners.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.1 Quote TWO reasons from the source that Vladimir Korolkov gave for rejecting General Geldenhuys's statistics about the losses suffered by South Africans. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution10(!showSolution10)}
                >
                    {showSolution10 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution10 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Geldenhuys cites, to put it mildly, incorrect data about the losses of the South Africans, in particular the aircraft'</p>
                    <p>2. 'He does not mention the heavy losses of UNITA troops and South West African Territorial Force (SWATF), but only those in SADF'</p>
                    <p>3. 'intentionally or unintentionally he lumps (combined) together FAPLA with the Cubans'</p>
                    <p>4. 'He does not even remember SWAPO'</p>
                    <p>5. 'He minimises the threat of Fidel Castro to seize the whole of Namibia to resolve the outcome of the war'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.2 Using the source and your own knowledge, comment on why Korolkov was convinced that General Geldenhuys minimised the threat of Fidel Castro in the Battle of Cuito Cuanavale. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution11(!showSolution11)}
                >
                    {showSolution11 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution11 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. He did not refer to thousands of Cuban troops that were deployed in Angola to support FAPLA</p>
                    <p>2. He was not convinced that the Cuban army was well equipped to match the SADF</p>
                    <p>3. He never acknowledged air superiority of the Cuban force over SADF/Korolkov believed Geldenhuys did not want to admit defeat by the communists</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.3 Explain the term accord in the context of ending the Battle of Cuito Cuanavale. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution12(!showSolution12)}
                >
                    {showSolution12 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution12 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. A ceasefire reached between warring factions (Cuba and South Africa) leading to the withdrawal of Cuba and South Africa from Angola</p>
                    <p>2. Peace agreement signed by Cuba and South Africa ending the Battle of Cuito Cuanavale and leading to the granting of independence to Namibia in return for Cuban withdrawal from Angola and Namibia</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.4 Refer to Sources 2B and 2C. Explain how the information in Source 2B differs from the evidence in Source 2C regarding losses suffered during the Battle of Cuito Cuanavale. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution13(!showSolution13)}
                >
                    {showSolution13 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution13 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Source 2B gives the least number of losses suffered by SADF as provided by General Geldenhuys while Source 2C contradicts the numbers given by the SADF General</p>
                    <p>2. Sources 2B highlights a pro-SADF (minor losses) perspective whilst Source 2C is from a Russian soldier's perspective (refutes statistics provided by General Geldenhuys)</p>
                    <p>3. Source 2B portrays SADF as victors while Source 2C portrays the SADF and its allies as losers during the battle at Cuito Cuanavale</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2D</strong></p>
                <p>The source below, published in the Conversation, explains the controversies (contradicting arguments) concerning the outcome of the Battle of Cuito Cuanavale in 1988.</p>
                <p>
                    There are still fierce (strong) arguments about how important the battle was, who won and whether the South African Defence Force was really defeated. That those who fought in the battle should have wildly different interpretations of its importance is not surprising.
                </p>
                <p>
                    The African National Congress (ANC) and its leader, Nelson Mandela, the Cubans and the Angolan government claim the South African army was decisively defeated. The objective of the South African government was to weaken the socialist orientated Angolan government, stop it from supporting the ANC and the Namibian South-West Africa People's Organisation (SWAPO) guerrillas from entering South African occupied Namibia.
                </p>
                <p>
                    But many South Africans who fought in Angola swear that they were never defeated, as South African author and academic, Leopold Scholtz, noted in his book on the battle.
                </p>
                <p>
                    Objective observers declared the end to have been a tactical military stalemate (deadlock) between the allied forces on either side. But it was a stalemate that led to major strategic realignments (changes) with huge consequences for the whole region; leading to the independence of Namibia, the withdrawal of South African and Cuban forces from Angola and the eventual dismantling (taking down) of apartheid. Nelson Mandela lauded (praised) the result of the battle during a visit to Cuba in 1991 to thank Fidel Castro for supporting liberation struggles in southern Africa.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.5.1 Give any TWO arguments in the source regarding the outcome of the Battle of Cuito Cuanavale. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution14(!showSolution14)}
                >
                    {showSolution14 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution14 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p><strong>Arguments:</strong></p>
                    <p>1. 'how important the battle was'</p>
                    <p>2. 'Who won'</p>
                    <p>3. 'Whether the South African army was really defeated'</p>
                    <p>4. 'the Angolan government claim that the South African army was decisively defeated'</p>
                    <p>5. 'many South Africans who fought in Angola swear that they were never defeated'</p>
                    <p>6. 'The objective observers declared the end to have been a tactical military stalemate'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.5.2 Explain why objective observers believed that the Battle of Cuito Cuanavale ended as a tactical military stalemate. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution15(!showSolution15)}
                >
                    {showSolution15 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution15 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Each of the parties claimed victory/neither side admitted defeat</p>
                    <p>2. Because they signed a peace agreement to end the war</p>
                    <p>3. Because both Cuba and South African forces had to withdraw from Angola</p>
                    <p>4. The stalemate led to political changes seeing the withdrawal of Cuba and South Africa from Angola and the independence of Namibia</p>
                    <p>5. Both settled for a political solution regarding the withdrawal from Angola and Namibia</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.5.3 Why, according to the source, did Nelson Mandela thank Fidel Castro during his visit to Cuba in 1991? (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution16(!showSolution16)}
                >
                    {showSolution16 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution16 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'For supporting liberation struggles in southern Africa'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining how statistics (information shown in numbers) created debates and controversies about the outcome of the Battle of Cuito Cuanavale (1987–1988). (8)
                </div>
                <div
                    className="answer-space large"
                    data-placeholder="Write your paragraph here (about 80 words)..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution17(!showSolution17)}
                >
                    {showSolution17 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution17 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>The Battle of Cuito Cuanavale sparked intense debates due to conflicting statistical claims. General Geldenhuys presented SADF statistics showing minimal losses, suggesting victory. However, Russian soldier Korolkov disputed these figures, accusing Geldenhuys of omitting UNITA and SWATF casualties while combining FAPLA and Cuban losses. SADF claimed 3 tanks destroyed versus 94 for Cuba/FAPLA, while opponents highlighted Cuba's 40,000 troops and 800 tanks. These statistical discrepancies fueled competing narratives of victory, defeat, or stalemate. Ultimately, objective observers viewed it as a tactical stalemate that nevertheless achieved strategic outcomes: Namibian independence and regional political transformation.</p>
                </div>
            </div>
        </div>
    );
};

export default Question2;
