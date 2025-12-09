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

    return (
        <div className="question" id="question-1">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 1: HOW DID THE MASS DEMOCRATIC MOVEMENT (MDM) CHALLENGE THE SEGREGATORY LAWS OF SOUTH AFRICA'S APARTHEID GOVERNMENT IN THE LATE 1980s?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1A</strong></p>
                <p>
                    The source below is an extract that outlines the formation of the Mass Democratic Movement (MDM) in South Africa in 1989 and how it challenged the apartheid government's racial legislation.
                </p>
                <p>
                    The Mass Democratic Movement (MDM) was the name of an informal coalition (alliance) of anti-apartheid groups during the 1970s and early 1980s. As a formal organisation, the MDM was established as an anti-apartheid successor to the United Democratic Front (UDF) after the 1988 emergency restrictions effectively banned the UDF and several other opposition groups. The UDF introduced the term 'Mass Democratic Movement (MDM)', and it said that the MDM should strengthen grassroots structures and bring in all those organisations on the periphery (sidelines), thus involving them in the struggle. Many previously excluded groups, including white groups and homeland groups, were invited to an Anti-Apartheid Conference organised by COSATU in September 1988. The government did not approve, and banned the conference.
                </p>
                <p>
                    Even after 1988, the MDM was a temporary loose coalition of anti-apartheid activists with no permanent constitution, no official membership rolls, no national or regional governing body, and no officeholders. Like the UDF, the MDM drew much of its support from the black community; a condition for affiliation with the MDM was adherence to the provisions of the ANC's Freedom Charter.
                </p>
                <p>
                    The MDM gained prominence (importance) in 1989, when it organised a campaign of civil disobedience in anticipation (hope) of national elections scheduled to take place in September of that year. Defying the state-of-emergency regulations in effect at the time, several hundred black protesters entered 'whites-only' hospitals and beaches. During that month, people of all races marched peacefully in several cities to protest against police brutality and repressive (brutal) legislation.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.1 Which organisation, according to the source, was established as an anti-apartheid successor to the United Democratic Front (UDF) in 1988? (1)
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
                    <p>1. 'Mass Democratic Movement' (MDM)</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.2 What, according to the UDF, was the Mass Democratic Movement (MDM) expected to achieve in the struggle against apartheid? Give TWO responses. (2)
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
                    <p>1. 'To strengthen grassroots structures'</p>
                    <p>2. 'To bring in all those organisations in the periphery, thus involving them in the struggle'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.3 Comment on the implication of the statement, 'a condition for affiliation with the MDM was adherence to the provisions of the ANC's Freedom Charter', in the context of the struggle against apartheid. (4)
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
                    <p>1. All organisations wanting to be part of the MDM should adopt the demands of the ANC's Freedom Charter</p>
                    <p>2. The struggle for liberation waged by the MDM was aimed at the realisation of the fundamental principles of the Freedom Charter which affiliates had to embrace</p>
                    <p>3. Organisations joining MDM must be anti-apartheid</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.4 Explain the term civil disobedience in the context of activities organised by the MDM in September 1989. (2)
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
                    <p>1. Passive resistance campaigns/non-violent protest action organised by the MDM aimed at defying unjust apartheid laws</p>
                    <p>2. Peaceful marches/protest of communities organised by MDM against segregatory laws in South Africa</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1B</strong></p>
                <p>The photograph (photographer unknown) below was taken at the 'whites-only' Addington Hospital in Durban on 2 August 1989. It highlights a protest against segregation as part of the Mass Democratic Movement's (MDM) 'Open Hospital' campaign.</p>

                <div className="image-container">
                    <img
                        src="/images/SOURCE1BP222.png"
                        alt="MDM protestors at Addington Hospital in Durban, 2 August 1989"
                        className="source-image"
                        style={{
                            width: '100%',
                            maxWidth: '600px',
                            height: 'auto',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            margin: '20px 0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = `
                <div style="
                  background-color: #f8f9fa;
                  border: 2px dashed #dee2e6;
                  padding: 40px;
                  text-align: center;
                  border-radius: 8px;
                  margin: 20px 0;
                  color: #6c757d;
                ">
                  <p><strong>Image: Addington Hospital Protest - Source 1B</strong></p>
                  <p>MDM protestors at Addington Hospital, Durban - 2 August 1989</p>
                  <p><small>Place image file in: public/images/addington-hospital.jpg</small></p>
                </div>
              `;
                        }}
                    />
                    <p className="image-caption" style={{
                        fontSize: '14px',
                        color: '#666',
                        fontStyle: 'italic',
                        marginTop: '8px',
                        textAlign: 'center'
                    }}>
                        <em>MDM protestors at Addington Hospital in Durban, 2 August 1989</em>
                    </p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.1 Explain the messages conveyed in the photograph regarding the MDM's 'Open Hospital' defiance campaign against segregation. (4)
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
                    <p>1. Apartheid laws promoting discrimination in hospitals are condemned/challenged by groups affiliated to MDM e.g. NUSAS</p>
                    <p>2. MDM rejected health provisioning and treatment of people based on apartheid discrimination – Desegregate hospitals</p>
                    <p>3. A call is made by MDM to desegregate and open all hospitals to all racial groups</p>
                    <p>4. Protestors belonged to different racial groups - inclusion of NUSAS</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.2 Comment on the racial composition of protestors that took part in this campaign. (2)
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
                    <p>1. The protest comprised of a multiracial group of protestors (blacks and whites)</p>
                    <p>2. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3 Refer to Sources 1A and 1B. Explain how the information in Source 1A supports the evidence in Source 1B regarding the defiance campaigns organised by the MDM against segregatory laws in 1989. (4)
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
                    <p>1. Source 1A refers to MDM protestors against whites-only hospitals and Source 1B depicts MDM multi-racial protestors against segregation at the whites-only Addington Hospital in Durban</p>
                    <p>2. Both sources highlight civil disobedience/peaceful campaigns organised by the MDM against segregatory laws</p>
                    <p>3. Both sources show multi-racial protest</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1C</strong></p>
                <p>
                    The source below is an extract from a book written by a historian, A Jeffery. It explains the events that took place during the peace march to the Cape Town City Hall that was organised by the Mass Democratic Movement (MDM) against police brutality on 13 September 1989.
                </p>
                <p>
                    In the aftermath (outcome) of the election, the MDM pledged (promised) to intensify the defiance campaign. Tutu and Boesak said they would lead a march on parliament when it reconvened (restarted) on 13 September 1989 to express outrage (anger) against police killings on election day. The day before the protest Tutu announced that the march would go to Cape Town's City Hall, rather than to parliament. He added that the march would be peaceful and disciplined, but stressed that there could be no question of the protest being abandoned (stopped). 'They have killed our people,' he said. It did not matter whether the death toll was 23, as he had first stated, or 15 as the police said. 'Fifteen is a massacre … Even if we deal only with their figures, it is a scandal (shame).'
                </p>
                <p>
                    Encouraged by assurances from the Rev. Johan Heyns, moderator (negotiator) of the Dutch Reformed Church, that the march would be non-violent, De Klerk allowed it to proceed, saying: 'We cannot have a democracy without protest marches.' De Klerk added that there was no reason for people to give vent (outlet) to their political aspirations (ambitions) through disorderly protest or rioting. 'The door to a new South Africa is open. It is not necessary to batter (hit) it down,' he said.
                </p>
                <p>
                    The march passed peacefully and signalled the de facto (actual) unbanning of the ANC. ANC flags and banners were prominently flown. Placards with ANC slogans were openly displayed, ANC freedom songs were sung, and ANC leaders were praised. Tutu and Boesak addressed the crowd from the balcony of the City Hall, which was adorned (decorated) with the flags of the ANC and the UDF. 'Walk Cape Town Open' the posters declared. The police kept a low profile and no action was taken to enforce the ban on the ANC or the restrictions on the UDF.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4.1 Why, according to the source, did Tutu and Boesak lead a peace march to Parliament on 13 September 1989? (1)
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
                    <p>1. 'To express outrage against police killings on election day'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4.2 Explain what Tutu meant with his expression, 'Fifteen is a massacre ... Even if we deal only with their figures, it is a scandal' in the context of police reaction against protestors. (4)
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
                    <p>1. Tutu condemns the brutal killing of protestors by police on the election day</p>
                    <p>2. Police had no respect for the lives of protestors</p>
                    <p>3. Tutu believes there is no justification for any loss of life of peaceful protestors, irrespective of numbers killed/it is a crime</p>
                    <p>4. It was a scandal because the incident was a cover up</p>
                    <p>5. The lives of people who were killed is reduced to statistics by the government</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4.3 Quote THREE reasons from the source why De Klerk allowed the peace march to proceed. (3)
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
                    <p>1. 'Encouraged by assurances from the Rev. Johan Heyns, moderator (negotiator) of the Dutch Reformed Church, that the march would be non-violent'</p>
                    <p>2. 'We cannot have a democracy without protest marches'</p>
                    <p>3. 'there was no reason for people to give vent (outlet) to their political aspirations (ambitions) through disorderly protest or rioting'</p>
                    <p>4. 'The door to a new South Africa is open'</p>
                    <p>5. 'It is not necessary to batter (hit) it down'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4.4 Why do you think the police kept a low profile during the peace march to the Cape Town City Hall on 13 September 1989? (2)
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
                    <p>1. De Klerk as the new NP leader/police wanted to prevent conflict</p>
                    <p>2. De Klerk allowed the march to continue</p>
                    <p>3. De Klerk wanted to show that he is charting a new course for change</p>
                    <p>4. De Klerk/police wanted to avoid repeating unnecessary killings that occurred before his tenure as President</p>
                    <p>5. The police were instructed to act with restraint by the new NP leadership to restore their credibility to avoid another scandal</p>
                    <p>6. To avoid negative publicity of the police</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4.5 Comment on the usefulness of this source to a researcher studying the events that took place during the peace march to the Cape Town City Hall on 13 September 1989. (4)
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
                    <p><strong>The source is USEFUL because:</strong></p>
                    <p>1. It is from a book by an academic and renowned author of History books, Anthea Jeffery</p>
                    <p>2. The date of the peace march (13 September 1989) was on the day Parliament had to reconvene after police brutality on election day</p>
                    <p>3. It explains the actual events that took place during the peace march to the Cape Town City Hall on 13 September 1989 organised by the MDM</p>
                    <p>4. It highlights the prominent leaders of the MDM like Boesak and Tutu who were instrumental in organising the march to challenge the apartheid regime</p>
                    <p>5. It includes direct words/quotations leaders from both sides of the conflict (Tutu and De Klerk)</p>
                    <p>6. It gives insight into the new path of reform that De Klerk was embarking on after 1989</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1D</strong></p>
                <p>
                    The source below is an extract from a book written by a historian, A Jeffery. It explains the reaction of the apartheid government towards the defiance campaigns organised by the Mass Democratic Movement (MDM) in 1989.
                </p>
                <p>
                    The police clamped (blocked) down, arresting or detaining some 30 MDM leaders as well as scores of people who had contravened (disobeyed) their restriction orders. Vlok (Minister of Police) said he was well aware that the aim of the defiance campaign was to compel the police to enforce laws providing for racial segregation and then draw negative publicity from this. However, the police were not acting to enforce apartheid laws. Rather, they were not prepared to tolerate civil disobedience activities which led to polarisation (division), confrontation, and violence. Tutu's wife was twice arrested during illegal protests, while both Boesak and Tutu were all taken into custody.
                </p>
                <p>
                    The clampdown drew sharp disapproval, the US (United States) administration registering deep concern over the arrest of Tutu and his spouse and urging the government to permit the peaceful expression of political dissent (opposition). In the UK (United Kingdom), television footage and newspaper coverage concentrated on the instances in which the police resorted to teargas, water cannons, sjamboks and mass arrests to break up demonstrations.
                </p>
                <p>
                    In the run-up to the poll, there were also a number of occasions when abuse by the police of their powers was abundantly clear. This was the case in Mitchell's Plain on 2 September, when police laid into protest marchers with batons and quirts (sjamboks), prompting one of their members, Lieutenant Gregory Rockman, to comment that his colleagues had acted like 'wild dogs with a killer instinct'. Said Tutu in response: 'Many people claim we are melodramatic (overemotional) and exaggerate when we say that … it is almost always the police with their presence or their action who provoke (cause) violence. But now a police lieutenant has charged the police with brutality and has said what we have been saying all along.'
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.1 According to the source, state THREE ways in which the police dealt with the MDM leaders and protestors who contravened their restriction orders. (3)
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
                    <p>1. 'Clamped down'</p>
                    <p>2. 'arresting'</p>
                    <p>3. 'detaining some 30 MDM leaders'</p>
                    <p>4. 'Tutu's wife was twice arrested during illegal protests'</p>
                    <p>5. 'Boesak and Tutu were taken into custody'</p>
                    <p>6. 'Police resorted to teargas, water cannons, sjamboks and mass arrests'</p>
                    <p>7. 'Police laid into protest marchers with batons and quirts'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.2 Define the term defiance campaign in your own words. (2)
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
                    <p>1. Peaceful protest/non-violent action aimed at disobeying unjust laws</p>
                    <p>2. Peaceful protest campaigns directed at undermining unjust legislation</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.3 Quote evidence from the source which suggests that the US administration was against the clampdown on Tutu and his spouse by the apartheid government. (2)
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
                    <p>1. 'The clampdown drew sharp disapproval'</p>
                    <p>2. 'The US administration registering concern over the arrest of Tutu and his spouse'</p>
                    <p>3. 'Urging the government to permit the peaceful expression of political dissent'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.4 Why do you think Lieutenant Gregory Rockman commented that his colleagues had acted like 'wild dogs with a killer instinct'? (2)
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
                    <p>1. He objected to the abuse of power by the police against peaceful marches</p>
                    <p>2. He pledged solidarity with the peaceful actions of marchers</p>
                    <p>3. He disliked brutality committed by his colleagues</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining how the MDM challenged the segregatory laws of South Africa's apartheid government in the 1980s. (8)
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
                    <p>The MDM challenged apartheid segregatory laws through coordinated civil disobedience campaigns. As a coalition replacing the banned UDF, it strengthened grassroots structures and united diverse anti-apartheid groups under the ANC's Freedom Charter. The movement organized defiance campaigns against 'whites-only' facilities like hospitals and beaches, conducting multi-racial protests that exposed police brutality. Peaceful marches in major cities, such as the 1989 Cape Town City Hall march, garnered international attention and pressured the government. By mobilizing mass participation and leveraging global condemnation of apartheid repression, the MDM significantly undermined the legitimacy of segregatory laws and contributed to the eventual dismantling of apartheid.</p>
                </div>
            </div>
        </div>
    );
};

export default Question1;

