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

    return (
        <div className="question" id="question-1">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 1: HOW DID THE MARSHALL PLAN INTENSIFY COLD WAR TENSIONS BETWEEN THE UNITED STATES OF AMERICA (USA) AND THE SOVIET UNION (USSR) FROM 1947?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1A</strong></p>
                <p>
                    The source below highlights the devastation and destruction that the Second World War had on the European economy and the need for its reconstruction.
                </p>
                <p>
                    Post-war Europe was in dire straits (a terrible state). Millions of its citizens had been killed or seriously wounded in the Second World War. Many cities, including some of the leading industrial and cultural centres of Great Britain, France, Germany, Italy and Belgium had been destroyed. Reports provided to Marshall (Secretary of State) suggested that some regions of the continent were on the brink of famine (starvation) because agricultural and other food production had been disrupted by the fighting. In addition, the region's transportation infrastructure – railways, roads, bridges and ports – had suffered extensive damage during airstrikes and the shipping fleets of many countries had been sunk. In fact, it could easily be argued that the only world power not structurally affected by the conflict had been the United States.The reconstruction coordinated under the Marshall Plan was formulated following a
                    meeting of the participating European states in the latter half of 1947. Notably,
                    invitations were extended to the Soviet Union and its satellite states. However, they
                    refused to join the effort …
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.1 Quote TWO pieces of evidence from the source to show that post-war Europe was in dire straits. (2)
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
                    <p>1. 'Millions of its citizens had been killed or seriously wounded in the Second World War'</p>
                    <p>2. 'Many cities, including some of the leading industrial and cultural centres of Great Britain, France, Germany, Italy and Belgium had been destroyed'</p>
                    <p>3. 'Some regions of the continent were on the brink of famine'</p>
                    <p>4. 'The region's transportation infrastructure – railways, roads, bridges and ports – had suffered extensive damage'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.2 Explain why the United States was the only world power not structurally affected by the Second World War. (2)
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
                    <p>1. The Second World War was fought over Europe/Asia and not over USA</p>
                    <p>2. USA only joined the war at a later stage/policy of isolationism</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.3 Define the term satellite states in your own words. (2)
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
                    <p>1. A country controlled by a stronger country/superpower</p>
                    <p>2. East European countries whose governments were taken over and controlled by Soviet Union as its colonies</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.4 Using the information in the source and your own knowledge, explain why the Soviet Union and its satellites states refused to join the Marshall Plan. (4)
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
                    <p>1. They did not want to be involved with the USA</p>
                    <p>2. They did not want to be influenced by capitalism</p>
                    <p>3. They wanted to protect and maintain communism/They viewed the Marshall Plan as a threat to communism</p>
                    <p>4. The Soviet Union had its own economic plan (COMECON)/The satellites states felt threatened by the Soviet Union</p>
                    <p>5. The Soviet Union viewed the Marshall Plan as dollar imperialism</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1B</strong></p>
                <p>
                    The source below is part of a speech that George Marshall, the Secretary of State of the United States of America (USA), delivered at Harvard University on 5 June 1947. It focuses on the USA's intention to provide financial (economic) aid to European countries.
                </p>
                <p>
                    It is logical that the United States should do whatever it is able to do to assist in the return of normal economic health in the world, without which there can be no political stability and no assured peace. Our policy is directed not against any country or doctrine, but against hunger, poverty, desperation and chaos. Its purpose should be the revival of a working economy in the world so as to permit the emergence of political and social conditions in which free institutions can exist. Such assistance, I am convinced, must not be on a piecemeal (separated) basis as various crises develop.It is already evident that, before the United States government can proceed much
                    further in its efforts to alleviate (improve) the situation and help start the European
                    world on its way to recovery, there must be some agreement among the countries of
                    Europe as to the requirements of the situation and the part those countries themselves
                    will take in order to give proper effect to whatever action might be undertaken by this
                    government. …
                </p>
                <p>
                    Any assistance that this government may render in the future should provide a cure rather than a mere palliative (be comforting). Any government that is willing to assist in the task of recovery will find full co-operation I am sure, on the part of the United States government. Any government which manoeuvres (tries) to block the recovery of other countries cannot expect help from us. Furthermore, governments, political parties or groups which seek to perpetuate (spread) human misery in order to profit therefrom politically or otherwise will encounter the opposition of the United States.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.1 Name FOUR aspects in the source at which the Marshall Plan was directed to assist with the return of normal economic conditions in the world. (4)
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
                    <p>1. 'Hunger'</p>
                    <p>2. 'Poverty'</p>
                    <p>3. 'Desperation'</p>
                    <p>4. 'Chaos'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.2 Explain how the Marshall Plan intended to prevent the spread of communism in Western Europe. (2)
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
                    <p>1. By assisting in the economic recovery of Western Europe through the reconstruction of industries</p>
                    <p>2. Marshall Aid was made available to countries needing assistance</p>
                    <p>3. To revive working economies in the world</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.3 State TWO conditions, as suggested in the source, that had to be satisfied in order to achieve European recovery. (2)
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
                    <p>1. 'there must be some agreement among the countries of Europe as to the requirements of the situation'</p>
                    <p>2. 'the part those countries themselves will take in order to give proper effect to whatever action might be undertaken by this government'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.4 Comment on the usefulness of this source when researching the intention of the Marshall Plan. (4)
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
                    <p>The source is useful because:</p>
                    <p>1. It is an extract from a speech (direct source) delivered at Harvard University on 5 June 1947</p>
                    <p>2. The speech was presented by the US Secretary of State, George Marshall</p>
                    <p>3. The speech was presented at the time (1947) when the Cold War started in Europe as a result of the devastation of World War II</p>
                    <p>4. It highlights how the Marshall Plan intended to help the Western European countries</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1C</strong></p>
                <p>
                    The source below focuses on the reasons forwarded by the Soviet Union's Foreign Minister, VM Molotov, for the rejection of the Marshall Plan at a meeting held in Paris on 2 July 1947.
                </p>
                <p>
                    Soviet Foreign Minister, VM Molotov, walks out of a meeting with representatives of the British and French governments, signalling the Soviet Union's rejection of the Marshall Plan. Molotov's action indicated that Cold War frictions (conflicts) between the United States and Russia were intensifying.
                    From the Soviet perspective, its refusal to participate in the Marshall Plan indicated its
                    desire to remain free from American economic imperialism and domination.

                    In the following weeks, the Soviet Union pressured (forced) its Eastern European allies
                    to reject all Marshall Plan assistance. That pressure was successful and none of the
                    Soviet satellites (colonies) participated in the Marshall Plan. The Soviet press claimed
                    that the American programme was a 'plan for interference in the domestic affairs of
                    other countries'. The United States ignored the Soviet action and, in 1948, officially
                    established the Marshall Plan and began providing funds to other European nations.
                </p>
                <p>
                    The Soviet reaction to Marshall's speech was a stony (hostile) silence. However, Foreign Minister Molotov agreed to a meeting on 27 June 1947 with his British and French counterparts to discuss the European reaction to the American offer.
                </p>
                <p>
                    Molotov immediately made clear the Soviet objections to the Marshall Plan. First, it would include economic assistance to Germany, and the Russians could not tolerate such aid to the enemy that had so recently devastated the Soviet Union. Second, Molotov was adamant (stubborn) in demanding that the Soviet Union have complete control and freedom of action over any Marshall Plan funds Germany might receive. Finally, the Foreign Minister wanted to know precisely how much money the United States would give to each nation. When it became clear that the French and British representatives did not share his objections, Molotov stormed (walked) out of the meeting on 2 July 1947.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.1 Name the TWO governments in the source who met with Molotov in Paris on 2 July 1947. (2)
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
                    <p>1. 'British'</p>
                    <p>2. 'French'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.2 According to the source, why did Molotov object to Germany receiving economic assistance through the Marshall Plan? (2)
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
                    <p>1. 'the Russians could not tolerate such aid to the enemy that had so recently devastated the Soviet Union'</p>
                    <p>2. 'Molotov was adamant (stubborn) in demanding that the Soviet Union have complete control and freedom of action over any Marshall Plan funds Germany might receive'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.3 Explain the concept economic imperialism in the context of the Cold War. (2)
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
                    <p>1. Economic control of countries (governments) outside the borders of major powers (in this case, the USA using the Marshall Plan to control the economic affairs of the whole world)</p>
                    <p>2. USA's use of dollar power in the form of the Marshall Plan</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.4 Using the information in the source and your own knowledge, explain why the Soviet Union forced the Eastern European allies to reject the Marshall Plan. (4)
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
                    <p>1. The image of the Soviet Union would have been compromised if the satellite states accepted the Marshall Plan</p>
                    <p>2. The Marshall Plan would turn communist governments in Eastern Europe into capitalist which would imply that communism was failing</p>
                    <p>3. To avoid Eastern European states benefitting from the fruits of capitalism which might turn them against communism</p>
                    <p>4. The Marshall Plan was seen as an interference in the domestic affairs of Eastern European countries</p>
                    <p>5. They wanted to be free from American economic imperialism and domination</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4 Study Sources 1B and 1C. Explain how the information in Source 1B differs from the evidence in Source 1C regarding the assistance given to Europe by the US government. (4)
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
                    <p>1. In Source 1B the US planned to assist in the return of normal economic health in the world whereas in Source 1C Molotov regarded US intervention as American economic imperialism and domination</p>
                    <p>2. In Source 1B the US implemented the Marshall Plan to revive a working economy in the world in which free institutions can exist whereas in Source 1C Molotov viewed the Marshall Plan as interference in the domestic affairs of other countries</p>
                    <p>3. In Source 1B the US expected the Marshall Plan to be applied to the whole of Europe whereas in Source 1C Eastern European countries were pressured to reject US assistance from the Marshall Plan</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1D</strong></p>
                <p>
                    The cartoon below was drawn by a German, William Wolfe, also known as Woop, on 4 October 1947. It depicts the efforts taken by President Truman of the United States of America and the Congress to implement the Marshall Plan in Europe from 1947.
                </p>
                <div className="cartoon-placeholder">
                    [ANGOLA: ANOTHER VIETNAM Protest Poster]
                    <img
                        src="/images/Source1DP121.png"
                        alt="ANGOLA: ANOTHER VIETNAM Protest Poster"
                        style={{maxWidth: '100%', height: 'auto', border: '1px solid #ccc', marginTop: '10px'}}
                    />
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.1 Explain the messages that are conveyed in the source regarding the implementation of the Marshall Plan from 1947. (4)
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
                    <p>1. The implementation of the Marshall Plan required the involvement of the President (Truman), the Congress (to authorise the release of funds) and George Marshall (the Secretary of State – for implementation)</p>
                    <p>2. President Truman is depicted as using the working tools/assistance for the Marshall Plan to begin with the economic reconstruction of Europe</p>
                    <p>3. The Congress is depicted in deep thoughts of whether the Marshall Plan will achieve its intended purpose</p>
                    <p>4. The source depicts the Marshall Plan as a work in progress/to fight the great famine in Europe</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.2 Comment on the significance of the word 'EUROPE' in the context of the implementation of the Marshall Plan. (2)
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
                    <p>1. EUROPE in the foreground suggest that the implementation of the Marshall Plan was planned to revive Europe only</p>
                    <p>2. EUROPE was ruined/devastated by World War II</p>
                    <p>3. As a result of World War II, EUROPE became the battleground of the Cold War</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining how the Marshall Plan intensified Cold War tensions between the USA and the USSR from 1947. (8)
                </div>
                <div
                    className="answer-space large"
                    data-placeholder="Write your paragraph here (about 80 words)..."
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
                    <p>The Marshall Plan significantly intensified Cold War tensions between the USA and USSR from 1947. While the USA presented it as humanitarian aid to rebuild war-torn Europe, the Soviet Union viewed it as American economic imperialism. Molotov's walkout from the Paris meeting symbolized Soviet rejection. The USSR pressured its Eastern European satellites to refuse Marshall Aid, establishing the division between capitalist Western Europe and communist Eastern Europe. This economic division mirrored the political and ideological split, cementing the bipolar world order that characterized the Cold War era and escalating superpower rivalry.</p>
                </div>
            </div>
        </div>
    );
};

export default Question1;

