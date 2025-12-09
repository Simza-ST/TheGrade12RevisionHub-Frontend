import React, { useState } from 'react';

const Question1 = ({ isAnswered }) => {
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
    const [showSolution18, setShowSolution18] = useState(false);

    return (
        <div className="question" id="question-1">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 1: HOW DID THE TRUMAN DOCTRINE CONTRIBUTE TO COLD WAR TENSIONS BETWEEN THE UNITED STATES OF AMERICA (USA) AND THE SOVIET UNION (USSR) FROM 1947?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1A</strong></p>
                <p>The source below is an extract from an article titled 'Truman Doctrine for APUSH' by Dr J Roy, a History teacher for the Advanced Placement US History Programme (APUSH). It was published on 22 February 2019. The extract explains how the Truman Doctrine came into existence in 1947.</p>
                <p>
                    Once a Second World War ally (friend) of the United States, the Soviet Union was quickly becoming a real threat to democracy around the world. The spread of communism was seen as the most dangerous threat to world stability and Truman was determined to take a hard line with the Soviets. American diplomat and historian, George Kennan, proposed the idea of containment; this concept would become the centrepiece of the Truman Doctrine. Containment was the concept of applying counterpressure to every political, military or economic advance wherever and whenever the Soviets tried to make them.
                </p>
                <p>
                    While not an entirely new idea, it was never seriously envisioned (intended) as a foreign policy until March of 1947 after a presidential address to Congress by Truman. Due to their own domestic hardships, England announced that they would be unable to continue to militarily and economically support the democratic and strategically located nations of Greece and Turkey. Truman decided it was time for the United States to step into the role of world leader, a role left vacant by the declining British Empire.
                </p>
                <p>
                    The Truman Doctrine was based on the principle of containing communism where it already existed and not allowing it to spread to neighbouring European nations like an unstoppable virus.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.1 Give TWO reasons in the source why Truman was determined to take a hard line with the Soviets. (2)
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
                    <p>1. 'the Soviet Union was quickly becoming a real threat to democracy around the world'</p>
                    <p>2. 'The spread of communism was seen as the most dangerous threat to world stability'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.2 Define the concept containment in your own words. (2)
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
                    <p>1. A US foreign policy adopted after the Second World War to contain/restrict the further spread/expansion of communism</p>
                    <p>2. A policy of preventing the expansion/spread of a hostile ideology/ideas</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.3 Explain what is implied by the statement, 'Truman decided it was time for the United States to step into the role of world leader' in the context of the Truman Doctrine. (4)
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
                    <p>1. The Truman Doctrine formalised the replacement of England with the USA as a defender of capitalism against communism</p>
                    <p>2. The USA had to stand up and challenge the Soviet Union that had emerged (after the Second World War) as a threat to democracy in the world</p>
                    <p>3. The USA had to ascertain that its economic policy (capitalism) flourished in the whole world by supporting governments against the popularity of communist leaders</p>
                    <p>4. The USA had to provide military support to governments that were threatened with protests due to shortage of resources after the war</p>
                    <p>5. The USA had to provide advice and skills to weak governments in order to strengthen their leadership against communism</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.4 Comment on why you think communism was regarded as a threatening 'unstoppable virus' to neighbouring European nations. (2)
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
                    <p>1. At the end of the Second World War most East European countries had been taken over by communist parties</p>
                    <p>2. Stalin's creation of spheres of influence into Europe towards the end of the Second World War replaced capitalist governments with communist governments</p>
                    <p>3. Communism was becoming a popular economic system amongst European countries as people had lost jobs and were starving due to the effects of the Second World War</p>
                    <p>4. European governments were faced with protests led by communists and faced challenges to stop the riots</p>
                    <p>5. The USA had a great fear of the Domino Theory</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1B</strong></p>
                <p>The source below is an extract from a speech delivered by Sir Harry Truman (President of the United States of America) to Congress on 12 March 1947. It outlines how the USA wanted to contain the spread of communism in Eastern Europe by financially and militarily supporting Greece and Turkey.</p>
                <p>
                    In addition to funds, I ask Congress to authorise (approve) the detail of American civilian and military personnel to Greece and Turkey, at the request of those countries, to assist in the tasks of reconstruction, and for the purpose of supervising the use of such financial and material assistance as may be furnished. I recommend that authority also be provided for the instruction and training of selected Greek and Turkish personnel.
                </p>
                <p>
                    Finally, I ask that the Congress provide authority which will permit the speediest and most effective use, in terms of needed commodities, supplies and equipment, of such funds as may be authorised.
                </p>
                <p>
                    The assistance that I am recommending for Greece and Turkey amounts to little more than 1 tenth of 1 per cent of this investment. It is only common sense that we should safeguard this investment and make sure that it was not in vain.
                </p>
                <p>
                    The seeds of totalitarian regimes are nurtured (supported) by misery and want. They spread and grow in the evil soil of poverty and strife (conflict). They reach their full growth when the hope of a people for a better life has died. We must keep that hope alive.
                </p>
                <p>
                    The free peoples of the world look to us for support in maintaining their freedoms.
                </p>
                <p>
                    If we falter (fail) in our leadership, we may endanger the peace of the world – and we shall surely endanger the welfare of our own nation.
                </p>
                <p>
                    Great responsibilities have been placed upon us by the swift movement of events.
                </p>
                <p>
                    I am confident that the Congress will face these responsibilities squarely.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.1 State FOUR requests in the source that Truman asked Congress to authorise in order to assist Greece and Turkey. (4)
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
                    <p>1. 'Funds'</p>
                    <p>2. 'detail of American civilian and military personnel to Greece and Turkey'</p>
                    <p>3. 'assist in the tasks of reconstruction'</p>
                    <p>4. 'supervising the use of such financial and material assistance'</p>
                    <p>5. 'instruction and training of selected Greek and Turkish personnel'</p>
                    <p>6. 'provide authority which will permit the speediest and most effective use, in terms of needed commodities, supplies and equipment'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.2 Explain the concept totalitarian regimes in the context of the Truman Doctrine. (2)
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
                    <p>1. Reference by the West to forms of government and political systems introduced by the communists to outlaw democratically elected parties in European countries</p>
                    <p>2. Reference by the West to forms of communist governments that had not been fairly elected when taking over East European countries after the Second World War</p>
                    <p>3. A Western perception that communist governments are led by dictators</p>
                    <p>4. Reference by the West to forms of communist governments that had taken over East European countries and led by leaders who held high degrees of control and regulations over public and private life</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.3 What do you think Truman meant by the statement, 'The seeds of totalitarian regimes are nurtured by misery and want', regarding the spread of communism to Europe? (2)
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
                    <p>That:</p>
                    <p>1. Totalitarian regimes which are communists would thrive where there is lack of basic resources/would flourish in poor and needy countries</p>
                    <p>2. Totalitarian regimes which are communists would most likely gain popularity in the European countries with weak economies as a result of the Second World War</p>
                    <p>3. European governments would turn to dictatorship which are communists when they fail to meet the needs of their communities</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.4 Quote TWO reasons from the source why the United States of America could not falter (fail) in supporting the 'free peoples of the world'. (2)
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
                    <p>1. 'We may endanger the peace of the world'</p>
                    <p>2. 'we shall surely endanger the welfare of our own nation'</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1C</strong></p>
                <p>The cartoon below is by Mark Hill, a USA cartoonist, and it depicts President Truman of the United States of America supporting Europe financially and militarily against a threat posed by the 'VIRUS OF COMMUNISM'.</p>
                <div className="cartoon-placeholder">
                    <img
                        src="/images/SOURCE1CP122.png"
                        alt="Truman Doctrine cartoon depicting Truman distributing US dollars to Europe against the 'virus of communism'"
                        style={{maxWidth: '100%', height: 'auto', border: '1px solid #ccc', marginTop: '10px'}}
                    />
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.1 Explain the messages that are conveyed in the cartoon regarding Cold War tensions between the USA and the Soviet Union from 1947. (4)
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
                    <p>1. Communism is depicted as a virus (threat) hovering over Europe which is capitalist</p>
                    <p>2. President Truman is shown arriving with his Truman Doctrine and distributing amounts of American dollars to protect Europe from the virus (communism)</p>
                    <p>3. NATO military tanks (to protect capitalism) have been placed in different European countries to protect them against the virus (communism)</p>
                    <p>4. The clouds (virus of communism) and the parachute/hot air balloon (Truman Doctrine) represent the Cold War tension between the Soviet Union and the USA</p>
                    <p>5. Bags of money (with dollar signs) represent financial aid (in the form of the Marshall Plan) to distribute to European countries for economic recovery</p>
                    <p>6. Truman's political domination over Europe is represented by the parachute/hot air balloon</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.2 Comment on the limitations of this source for a historian researching communism. (4)
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
                    <p>1. The author is an American who might be against communism/shows bias against the Soviet Union</p>
                    <p>2. The source portrays the ideology of communism negatively (in a bad light) as a virus</p>
                    <p>3. The source portrays the Truman Doctrine as a solution while communism is depicted as a problem</p>
                    <p>4. The source portrays the USA as a saviour of Europe and does not expose its real imperialist intentions</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4 Study Sources 1B and 1C. Explain how the evidence in Source 1B supports the information in Source 1C regarding the assistance that the United States of America had given to Europe in order to contain the spread of communism. (4)
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
                    <p>1. Source 1B provides an outline of how the USA wanted to contain the spread of Communism through provision of assistance financially and militarily which in Source 1C is depicted through Truman by distributing US dollars and providing military assistance to European countries</p>
                    <p>2. Source 1B refers to Truman asking for funding from the Congress and in Source 1C Truman is seen distributing US dollars – implying that the Congress had granted funding</p>
                    <p>3. In Source 1B reference is made to the speediest request of funds and in Source 1C the hot air balloon is used to speedily distribute the funds to Europe</p>
                    <p>4. In Source 1B Truman stated that 'misery and want' are fertile ground of totalitarian regimes and in Source 1C Truman is seen distributing US dollars to stop poverty and want in Europe</p>
                    <p>5. In Source 1B president Truman indicated that the world looked to the USA for maintaining their freedom, financial support and military assistance and Source 1C shows the USA financial and military support that was to ensure Europe was free from Communist infiltration</p>
                    <p>6. Both sources show how the USA wanted to contain the spread of communism through the Truman Doctrine</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1D</strong></p>
                <p>The source below is an extract from an article titled 'The Stalinist Image of Canada: The Cominform and Soviet Press, 1947–1955' and was published in the Labour/Le Travailleur Journal (Spring 1988). It highlights why the Cominform was established and how it reacted against the Truman Doctrine.</p>
                <p>
                    During meetings in Szlarska Poreba, Poland, 22–27 September 1947, the Information Bureau of the Communist and Workers' Parties (Cominform) was established. It had nine founding parties from the USSR, Yugoslavia, Bulgaria, Romania, Hungary, Poland, Czechoslovakia, Italy and France. The Cominform, as the organisation came to be called, held only five conferences for public record …
                </p>
                <p>
                    The occasion of the meeting in September 1947 was a striking shift in the fortunes of communist parties in Western Europe. Until early 1947 Communists had access to power within coalition governments in France, Italy and Belgium, a fact which had augured (meant) well for the united front policies …
                </p>
                <p>
                    By the summer of 1947, however, the … Truman Doctrine … had been announced, and the powerful French, Italian and Belgium parties were removed from coalition governments. Some reorganisation was necessary. Some of the delegates to the Cominform meetings had been prominent in the Comintern; others were well-known from activities in their own countries or had known each other while in exile in the USSR.
                </p>
                <p>
                    … The essence of the Cominform position was presented in several notices in the fall of 1947. The first was a communiqué of 4 October 1947 which divided the world into two immutably (firm) hostile camps: the 'imperialist, anti-democratic camp' and the 'anti-imperialist, democratic camp'. The second took the form of an editorial in Pravda (10 October 1947), which confirmed the establishment of the Cominform and its role as an organisational bastion (defender) against an aggressively hostile, American-led, anti-socialist campaign.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.1 Name any TWO countries in the source whose parties were members of Cominform in 1947. (2)
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
                    <p>1. USSR</p>
                    <p>2. Yugoslavia</p>
                    <p>3. Bulgaria</p>
                    <p>4. Romania</p>
                    <p>5. Hungary</p>
                    <p>6. Poland</p>
                    <p>7. Czechoslovakia</p>
                    <p>8. Italy</p>
                    <p>9. France</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.2 Using the information in the source and your own knowledge, explain why, by the summer of 1947, the Truman Doctrine had become a threat to Cominform. (2)
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
                    <p>1. The Truman Doctrine weakened the communist's parties in France, Italy and Belgium</p>
                    <p>2. The Truman Doctrine revived capitalist policies in France, Italy and Belgium – where Communism had infiltrated</p>
                    <p>3. The communists were losing their grip in coalition governments</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.3 In the context of the Cold War, who, according to the Cominform, represented the following two hostile camps?
                </div>
                <div className="subquestion-text">
                    (a) Imperialist, anti-democratic camp (2)
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
                    <p>1. The Capitalists/the USA/West/Truman</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    (b) Anti-imperialist, democratic camp (2)
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
                    <p>1. The Communists/the Soviet Union/East/Stalin</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.4 What, according to the source, did an editorial in the Pravda newspaper confirm regarding the Cominform? Give TWO responses. (2)
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
                    <p>1. '... confirmed the establishment of Cominform'</p>
                    <p>2. '... (confirmed) its role as an organisational bastion (defender) against an aggressively hostile, American-led, anti-socialist campaign'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining how the Truman Doctrine contributed to Cold War tensions between the United States of America and the Soviet Union from 1947. (8)
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
                    <p>The Truman Doctrine significantly intensified Cold War tensions by formalizing US opposition to Soviet expansion. It positioned America as the defender of capitalism against communism, which Stalin perceived as aggressive containment. By providing military and financial aid to Greece and Turkey, the USA directly challenged Soviet influence in Eastern Europe. This prompted the Soviet Union to establish Cominform, dividing the world into two hostile camps. The doctrine's framing of communism as a "virus" and totalitarian threat deepened ideological divisions, creating a bipolar world order that defined superpower relations for decades.</p>
                </div>
            </div>
        </div>
    );
};

export default Question1;

