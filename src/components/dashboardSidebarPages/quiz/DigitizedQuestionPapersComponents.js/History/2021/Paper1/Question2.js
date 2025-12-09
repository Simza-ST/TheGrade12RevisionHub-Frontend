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

    return (
        <div className="question" id="question-2">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 2: WHY DID FOREIGN POWERS BECOME INVOLVED IN THE ANGOLAN CIVIL WAR BETWEEN 1974 AND 1976?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2A</strong></p>
                <p>
                    The source below outlines the impact of the developments in Portugal that led to the independence of Angola in 1975 and the subsequent contestation (challenge) for power by the three Angolan liberation movements (MPLA, FNLA and UNITA).
                </p>
                <p>
                    In April 1974, junior officers belonging to the Movement of the Armed Forces (MFA) toppled the Salazar-Caetano regime in Portugal and began the process of decolonisation.
                </p>
                <p>
                    In 1974, however, a frenzy (rage) of diplomatic and political activity at home (Angola) and abroad mitigated (helped) against a negotiated independence. In 1975, as the will to retain imperial control over Angola dwindled (declined), fighting broke out in many provinces of Angola and also in the capital, Luanda, where the armies of the Popular Movement for the Liberation of Angola (MPLA), the National Front for the Liberation of Angola (FNLA) and National Union for the Total Independence of Angola (UNITA) were intended to maintain the peace with joint patrols. In January 1975, under heavy international pressure, the colonial power and the three movements had signed an agreement in Alvor, Portugal, providing for a transitional (temporary) government, a constitution, elections and independence.
                </p>
                <p>
                    This Alvor Accord soon collapsed, however, and the transitional government scarcely (hardly) functioned. In the subsequent confrontations the FNLA received military support from Zaire with the backing of China and the US, while under Agostinho Neto the MPLA gained ground, in particular in Luanda, with support from the Soviet Union and from Cuban troops. On 11 November 1975 Angola became independent. The FNLA and UNITA were excluded from the city and from government and a socialist one-party regime was established which eventually gained international recognition, though not from the United States.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.1 What incident, according to the source, led to the process of decolonisation in Portugal? (1)
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
                    <p>1. 'In April 1974, junior officers belonging to the Movement of the Armed Forces (MFA) toppled the Salazar-Caetano regime'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.2 Define the concept decolonisation in your own words. (2)
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
                    <p>1. The process through which the colonised countries began achieving independence/attaining freedom from the control of their colonial powers</p>
                    <p>2. Process of bringing colonial practices over another country to an end</p>
                    <p>3. Process of a state withdrawing from a former colony, leaving it independent</p>
                    <p>4. The release of one country or territory from political control by another country</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.3 Name the THREE liberation movements in the source that signed the Alvor Agreement in 1975. (3)
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
                    <p>1. 'Popular Movement for the Liberation of Angola (MPLA)'</p>
                    <p>2. 'National Front for the Liberation of Angola (FNLA)'</p>
                    <p>3. 'National Union for the Total Independence of Angola (UNITA)'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.4 Using the information in the source and your own knowledge, explain what led to the collapse of the Alvor Accord in 1975. (4)
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
                    <p>1. All three liberation movements had ideological differences</p>
                    <p>2. All three liberation movements had deep-rooted ethnic differences</p>
                    <p>3. All three liberation movements thought that they could govern Angola on their own/unwilling to share power</p>
                    <p>4. All three liberation movements had different sources of funding</p>
                    <p>5. All three leaders had different visions for their country which made cooperation very difficult/mistrust amongst leaders</p>
                    <p>6. All three leaders were influenced by foreign powers who had different agendas</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2B</strong></p>
                <p>
                    The extract below focuses on why the United States of America (USA) became involved in the Angolan Civil War in 1975.
                </p>
                <p>
                    The Soviet Union and Cuba doubled down (increased) on their defence of the MPLA government. The Soviets amped (increased) up their economic aid, while the Cubans initially committed about 15 000 ground troops to the region, a number that rose to nearly 36 000 within the year.
                </p>
                <p>
                    The United States' intervention in Angola was heavily shaped by several factors. First, much like in Vietnam, American leaders, such as Secretary of State Henry Kissinger, believed that a communist takeover in Angola would lead to a domino effect in the rest of southern Africa. If Angola fell, it was feared that the Soviets, Cuba, and to a lesser extent China, would feel bold enough to inspire revolution that was Pan-African and communist in nature, rather than nation-based and capitalist-oriented, throughout the African continent.
                </p>
                <p>
                    Second, offshore of the northern half of the country lay enormous oil fields. Neither the United States nor the Soviet Union wanted such reserves to fall into the other's hands. Angolan oil could potentially benefit both nations economically and could also help cut costs of military operations in the continent should they arise in the future.
                </p>
                <p>
                    Third, the CIA feared that the Soviet Union was attempting to establish a military base in Angola. Such a concern was based on historical evidence. The Soviets had backed a 1977 coup led by former Interior Minister of Angola, Nito Alves. Although Alves was eventually executed by Neto following the Nitista (a name given to the followers of Alves) coup, American officials knew that the Angolan Civil War served as a real threat to its interests throughout all of Africa.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.1 Name the TWO countries in the source that decided to defend the MPLA government. (2)
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
                    <p>1. 'The Soviet Union'</p>
                    <p>2. 'Cuba'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.2 In the context of the Cold War in Angola, explain the term domino effect. (2)
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
                    <p>1. A theory/belief that if Angola fell to communism, then all other neighbouring countries in southern Africa would one by one also become communist</p>
                    <p>2. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.3 Quote evidence from the source that suggests that the Soviet Union was attempting to establish a military base in Angola. (2)
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
                    <p>1. 'the CIA feared that the Soviet Union was attempting to establish a military base in Angola'</p>
                    <p>2. 'The Soviets had backed a 1977 coup led by former Interior Minister of Angola, Nito Alves'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.4 In the context of the Cold War, what is implied by the words, 'American officials knew that the Angolan Civil War served as a real threat to its interests throughout all of Africa'? (4)
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
                    <p>1. USA knew that the spread of communism in Angola could cause a domino effect throughout Africa therefore erasing capitalism</p>
                    <p>2. USA knew that Cuban and Russian involvement in Angola was a threat to its oil/petroleum interests in that country</p>
                    <p>3. USA knew that the Russian intervention in Africa was an objective from the USSR to obtain military bases in Africa and therefore remove the USA from the scene</p>
                    <p>4. USA knew that Africa was a strategic continent in relation to trade routes and did not want the USSR to play a leading role in Africa</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2C</strong></p>
                <p>
                    The source below explains South Africa's foreign policy proposal to FNLA and UNITA to ensure regional stability.
                </p>
                <p>
                    From the outset, the question of coming to an arrangement with the MPLA was a non-starter. The public remained acutely sensitive to any suggestion of the spread of communist influence – broadly defined – in any part of Africa or the Indian Ocean.
                </p>
                <p>
                    Pretoria therefore launched a series of exploratory overtures (proposals) to the FNLA and UNITA to see whether an Angola ruled by either would provide the regional stability and security that South Africa desired. From February 1975, SADF military intelligence and the Bureau of State Security (BOSS) officials began meeting regularly with the upper echelons (ranks) of both organisations in Angola and Europe.
                </p>
                <p>
                    Both the FNLA and UNITA were desperate for help and said what South Africa wanted to hear: namely that an Angola under their control would form part of an anti-communist bloc in southern Africa, built on the three pillars of economic interdependence, good neighbourliness, and non-interference in each other's affairs.
                </p>
                <p>
                    Crucially, both committed to denying SWAPO bases from which to operate in southern Angola. 'Dr Savimbi promised,' FJ du Toit Spies (historian) wrote, 'that SWAPO attacks on South West Africa would not be permitted.' The FNLA, not to be outdone, said it would allow the SADF to conduct 'hot pursuit' operations against SWAPO operatives up to 80 kilometres inside Angola. Consequently, over the coming months Pretoria supplied limited military aid and funding to both organisations.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.1 Why, according to the source, was the question of South Africa coming to an arrangement with the MPLA a non-starter? (2)
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
                    <p>1. 'The public remained acutely sensitive to any suggestion of the spread of Communist influence – in any part of Africa or the Indian Ocean'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.2 Name TWO South African state agencies, referred to in the source, that met with both the FNLA and UNITA in Angola as well as Europe in 1975. (2)
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
                    <p>1. 'SADF military intelligence'</p>
                    <p>2. 'Bureau of State Security (BOSS)'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.3 Comment on the meaning of the statement, 'an Angola under their (FNLA and UNITA) control would form part of an anti-Communist bloc in southern Africa'. (2)
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
                    <p>1. These movements were anti-communism/would maintain regional stability</p>
                    <p>2. Both these movements favoured capitalism as an economic system as opposed to communism</p>
                    <p>3. Both these movements would support SA and together they are seen as allies of the West</p>
                    <p>4. These movements wanted to gain international recognition and support by opposing communism in southern Africa</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.4 Using the information in the source and your own knowledge, explain why South Africa provided limited military aid and funding to both the FNLA and UNITA. (4)
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
                    <p>1. South Africa wanted to limit their involvement in the Angolan Civil War</p>
                    <p>2. South Africa used the FNLA and UNITA as proxies to fight in the Angolan Civil War</p>
                    <p>3. South Africa wanted to keep its involvement in the Angolan Civil War a 'secret'</p>
                    <p>4. South Africa had been involved in a war against SWAPO in Namibia</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.4 Refer to Sources 2B and 2C. Explain how these sources are similar regarding the involvement of the USA and South Africa in the Angolan Civil War between 1974 and 1976. (4)
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
                    <p>1. Both sources indicate that the USA and South Africa were anti-communist</p>
                    <p>2. Both sources indicate the individual interests of the USA and South Africa in Angola to prevent communism</p>
                    <p>3. Both sources indicate the USA's and South Africa's intention to advance capitalism</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2D</strong></p>
                <p>
                    The source below is a poster titled 'ANGOLA: ANOTHER VIETNAM'. It calls for the withdrawal of South Africa and the US from the Angolan conflict.
                </p>
                <div className="cartoon-placeholder">
                    [ANGOLA: ANOTHER VIETNAM Protest Poster]
                    <img
                        src="/images/SOURCE2DP121.png"
                        alt="ANGOLA: ANOTHER VIETNAM Protest Poster"
                        style={{maxWidth: '100%', height: 'auto', border: '1px solid #ccc', marginTop: '10px'}}
                    />
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.5.1 What messages are conveyed in this poster regarding the involvement of the USA and South Africa in the Angolan Civil War between 1974 and 1976? (4)
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
                    <p>1. The poster depicts foreign powers were not welcomed in Angola</p>
                    <p>2. The poster depicts foreign powers were involved in Angola in the same manner that they were involved in Vietnam</p>
                    <p>3. USA and South Africa should stop being involved in the Angola Civil War</p>
                    <p>4. USA and South Africa would bring imperialism and racism to Angola respectively</p>
                    <p>5. The withdrawal of South Africa and the USA would weaken FNLA and UNITA while strengthening MPLA</p>
                    <p>6. USA and South African involvement will lead to suffering and killing of innocent civilians in Angola/led to a refugee issue</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.5.2 Explain the limitations of this source to a historian researching the Angolan Civil War between 1974 and 1976. (4)
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
                    <p>1. It was used as a propaganda campaign for the MPLA</p>
                    <p>2. It is biased against foreign powers that supported enemies of the MPLA, namely FNLA and UNITA</p>
                    <p>3. It is one sided – it puts blame on capitalist countries</p>
                    <p>4. It is silent on activities of the Soviet Union, Cuba and China because they supported the MPLA</p>
                    <p>5. The origin of the source is unknown</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining why foreign powers became involved in the Angolan Civil War between 1974 and 1976. (8)
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
                    <p>Foreign powers became involved in the Angolan Civil War primarily due to Cold War ideological competition. The USA supported FNLA and UNITA to prevent communist expansion, fearing a domino effect in Africa. The Soviet Union and Cuba backed MPLA to spread communist influence. South Africa intervened to create an anti-communist buffer zone and combat SWAPO. Economic interests, particularly Angola's oil reserves, also motivated foreign involvement. This proxy war reflected global superpower rivalry, with Angola becoming a battleground for competing ideologies and strategic interests in Southern Africa during the Cold War era.</p>
                </div>
            </div>
        </div>
    );
};

export default Question2;
