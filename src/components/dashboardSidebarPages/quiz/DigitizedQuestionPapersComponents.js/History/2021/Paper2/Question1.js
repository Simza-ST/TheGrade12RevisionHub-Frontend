
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
                    QUESTION 1: HOW DID THE UNITED DEMOCRATIC FRONT (UDF) RESPOND TO THE APARTHEID REFORMS INTRODUCED BY PW BOTHA IN 1983?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1A</strong></p>
                <p>
                    The source below explains the reasons why PW Botha, President of the Republic of South Africa, introduced reforms in 1983.
                </p>
                <p>
                    … in early 1983, Botha attempted to ease the mounting pressures on the country by introducing some piecemeal reforms to the apartheid policy without relinquishing (giving up) white minority control. He scrapped what he called 'outdated' and 'unnecessary' apartheid statutes (laws), such as the outlawing of mixed marriages and sex across colour line, to present a new image of reformism (change) to the world.
                </p>
                <p>
                    It almost succeeded. The Western powers, ever eager to read the South African situation optimistically (positively), were deceived for a time into believing that Botha was really dismantling apartheid. But, on a closer examination, when Botha unveiled constitutional changes he intended making, it became clear what he had in mind was not reform but rather a reformulation (restructuring) of apartheid. He set out his plan to establish a tricameral parliament in which the mixed-race 'Coloured' and Indian minorities would have separate chambers to legislate their 'own affairs', while the existing much larger, whites-only House of Assembly would deal with both 'whites issues' and the nation's 'general affairs'.
                </p>
                <p>
                    The huge black majority, meanwhile, would get nothing beyond the right to vote in their remote tribal Bantustans, and the municipal councils would run their separate black townships in so-called 'white' South Africa. But even these urban councils were not autonomous (free). The legislation enabled the white minister to remove members, appoint others, or dismiss the whole council and appoint a new one. It meant that the black councils had to implement government policy rather than be responsive to their electorates.
                </p>
                <div className="source-reference">
                    [Adapted from The Washington Post, 1983]
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.1 Name TWO apartheid statutes in the source that PW Botha scrapped while introducing reforms to the apartheid policy. (2)
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
                    <p>1. 'mixed marriages'</p>
                    <p>2. 'sex across colour line'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.2 Explain what is implied by the statement, '… what he (PW Botha) had in mind was not reform but rather a reformulation (restructuring) of apartheid.' (2)
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
                    <p>1. PW Botha's intention was not to dismantle apartheid but to reinforce/revamp/renew/restructure it in a different way</p>
                    <p>2. PW Botha's intention was to ensure that the white minority would retain their political power</p>
                    <p>3. PW Botha wanted to create the impression that the minority groups were included in the power sharing government</p>
                    <p>4. PW Botha's intended changes were cosmetic as whites would still deal with 'white issues' and also have a say over the majority issues</p>
                    <p>5. PW Botha wanted apartheid to look less discriminatory to the outside world</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.3 Define the term tricameral parliament in your own words. (2)
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
                    <p>1. The tricameral parliament was a three-chamber parliament for white, Coloured and Indian representatives while Africans were excluded</p>
                    <p>2. The Tricameral parliament had three separate chambers where Coloured and Indian representatives were made to believe they could oversee their own affairs, while whites dealt with the affairs of 'all'</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.4 Using the information in the source and your own knowledge, explain why you think the black majority was excluded from the new legislation. (4)
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
                    <p>1. Provision was made for them to vote in the Bantustans/municipal/local councils/The National Party granted them political rights in the Bantustans</p>
                    <p>2. If included they would outvote the white voters who were in the minority</p>
                    <p>3. If included they would change the apartheid laws and address the inequalities</p>
                    <p>4. Africans would not be able to fight for their rights</p>
                    <p>5. To protect white privileges</p>
                    <p>6. To weaken resistance against apartheid</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.1.5 Identify FOUR legislative powers in the source that the white minister had over black urban councils. (4)
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
                    <p>1. 'Remove members'</p>
                    <p>2. 'Appoint others'</p>
                    <p>3. 'Dismiss the whole council'</p>
                    <p>4. 'Appoint a new one'</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1B</strong></p>
                <p>
                    The source below is an extract from a speech delivered by Rev. Dr Allan Boesak at the launch of the United Democratic Front (UDF) at the Rocklands Civic Centre, in Mitchells Plain on 20 August 1983. It focuses on the formation and intensions of the UDF.
                </p>
                <p>
                    We have arrived at a historic moment. We have brought together, under the aegis (protection) of the United Democratic Front (UDF), the broadest and most significant coalition of groups and organisations struggling against apartheid, racism and injustice since the early nineteen fifties.
                </p>
                <p>
                    We have been able to create a unity amongst freedom-loving people this country has not seen for many a year. I am particularly happy to note that this meeting is not merely a gathering of loose individuals. No, we represent organisations deeply rooted in the struggle for justice, deeply in the heart of our people.
                </p>
                <p>
                    We are here to say that the government's constitutional proposals are inadequate, and that they do not express the will of the vast majority of South Africa's people.
                </p>
                <p>
                    … The most important reason for us coming together here today is the continuation of the government's apartheid policies as seen in the constitutional proposals. … All the basic laws, which are the very pillars of apartheid, indeed, those laws without which the system cannot survive – group areas, racial classification, separate and unequal education, to name but a few – remain untouched and unchanged. The homelands policy forms the basis of the wilful exclusion of 80% of our nation from the new political deal. Clearly the oppression will continue, the apartheid line is not all abolished.
                </p>
                <div className="source-reference">
                    [Adapted from a speech by Rev. Dr Allan Boesak, 20 August 1983]
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.1 Why, according to the source, did Rev. Dr Allan Boesak refer to the launch of the UDF as a historic moment? Give ONE reason. (4)
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
                    <p>1. 'brought together under the aegis (protection) of the United Democratic Front (UDF) the broadest and most significant coalition of groups and organisations struggling against apartheid, racism and injustice since the early nineteen fifties'</p>
                    <p>2. 'We have been able to create a unity amongst freedom-loving people this country has not seen for many a year'</p>
                    <p>3. '… we represent organisations deeply rooted in the struggle for justice, deeply in the heart of our people'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.2 Quote evidence from the source that shows that the meeting called by the UDF was not merely a gathering of loose individuals. (2)
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
                    <p>1. '… we represent organisations deeply rooted in the struggle for justice'</p>
                    <p>2. 'unity amongst freedom-loving people'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.3 Explain the meaning of Rev. Dr Allan Boesak's statement, 'The homelands policy forms the basis of the wilful exclusion of 80% of our nation from the new political deal.' (4)
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
                    <p>1. Africans who were in the majority in South Africa (at 80%) were excluded from the tricameral parliament</p>
                    <p>2. Africans would be catered for through the homeland policy</p>
                    <p>3. The apartheid policy of divide and rule was maintained</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.2.4 Why would a historian consider this source to be reliable regarding the launch of the UDF? (4)
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
                    <p>1. The speech was delivered by Allan Boesak who was one of the leaders of the UDF</p>
                    <p>2. The speech was delivered on 20 August 1983 which was the actual date of the launch of the UDF</p>
                    <p>3. It highlights the reasons for the launch of the UDF which was in response to the introduction of apartheid reforms and the establishment of the Tricameral Parliament</p>
                    <p>4. The information in the source can be corroborated with other sources</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1C</strong></p>
                <p>
                    The poster below, published and distributed by the UDF in 1983, is directed at Botha's call for elections for a tricameral parliament. It urges all white, Coloured and Indian South Africans not to participate in the apartheid elections.
                </p>
                <div className="cartoon-placeholder">
                    <img
                        src="/images/SOURCE1CP221.png"
                        alt="UDF Election Boycott Poster showing 'DON'T VOTE IN APARTHEID ELECTIONS!' and 'FORWARD TO FREEDOM!'"
                        style={{maxWidth: '100%', height: 'auto', border: '1px solid #ccc', marginTop: '10px'}}
                    />
                </div>
                <div className="source-reference">
                    [UDF Poster, 1983]
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.1 Explain what is implied by the words in the poster, 'DON'T VOTE IN APARTHEID ELECTIONS!', in the context of the UDF's resistance to the introduction of the tricameral parliament in 1983. (2)
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
                    <p>1. White, Coloured and Indian voters were encouraged to boycott the tricameral parliament elections</p>
                    <p>2. The UDF's Don't Vote Campaign was to create an awareness that the tricameral parliament elections would continue apartheid despite the 'proposed changes'</p>
                    <p>3. The elections were deemed to be apartheid elections because the blacks were excluded from participating in these elections</p>
                    <p>4. The UDF was discouraging the 'divide and rule' strategy of the apartheid government</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.3.2 Comment on the slogan 'FORWARD TO FREEDOM!' held by the UDF supporters, in the context of resistance to PW Botha's apartheid reforms. (2)
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
                    <p>1. The slogan infers that the tricameral parliament would not provide freedom</p>
                    <p>2. The UDF would through protest actions achieve freedom</p>
                    <p>3. People must be mobilised/unite in strength to attain freedom</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.4 Refer to Sources 1B and 1C. Explain how the evidence in Source 1C supports the information in Source 1B regarding the UDF's internal resistance against apartheid reforms in 1983. (4)
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
                    <p>1. Source 1B speaks to the unity of freedom loving people and Source 1C shows the unity of people from all walks of life on the poster regarding resistance against apartheid</p>
                    <p>2. Source 1B mentions coalition groups and organisations formed the UDF and 1C shows the UDF calling on these groups and organisations not to vote in the apartheid elections</p>
                    <p>3. Source 1B states that the UDF was established to oppose apartheid and Source 1C shows that South Africans are opposing apartheid</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 1D</strong></p>
                <p>
                    The source below, taken from a newspaper article titled 'Indian Turnout about 20% in South African Elections', was written by Allister Sparks for the Washington Post on 29 August 1984. It explains why there was a low turn-out from both Indians and Coloureds in the tricameral elections in 1984.
                </p>
                <p>
                    About 20 per cent of the registered voters in South Africa's Indian community appeared to have voted today in elections for a new parliament that were marked by sporadic violence between boycotters and police in several cities.
                </p>
                <p>
                    The results available tonight indicated that members of the 870 000-strong Indian community stayed away from the polls in even larger numbers than the mixed-race Coloured electorate did in last week's voting for representatives in the racially compartmentalised (classified) tricameral parliament.
                </p>
                <p>
                    There was a 30 per cent turnout at the elections for the larger Coloured community. The government declared that figure adequate for pressing ahead with plans to implement its new constitution, but other observers labelled it a rebuff (refusal).
                </p>
                <p>
                    Since many people who were eligible to vote did not register, particularly among the Coloureds, leaders of the boycott movement were claiming tonight that the effective vote in the two elections was about 18 per cent out of a joint population of 3,5 million. The movement said this represented a 'massive rejection' of the white minority government's new constitution, which offers the Coloured and Indian minority groups a form of parliamentary representation for the first time, but continues to exclude the black African majority.
                </p>
                <p>
                    White voters endorsed the constitution by a two-thirds majority at a referendum last November, and the United States State Department joined in praising the government of President PW Botha for taking 'a step in the right direction.'
                </p>
                <div className="source-reference">
                    [Adapted from Washington Post, 29 August 1984]
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.1 Identify the voter turnout for the elections of the tricameral parliament (in percentages) for the following communities:
                </div>
                <p>(a) Indian (1)</p>
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
                    <p>1. Indian – '20%'</p>
                </div>

                <p>(b) Coloured (1)</p>
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
                    <p>1. Coloured – '30%'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.2 Explain the term boycott in the context of the UDF's reaction during the elections for the tricameral parliament. (2)
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
                    <p>1. Call by the UDF for people not to vote and stay away from the elections for the tricameral parliament</p>
                    <p>2. Stay away from the voting stations as they were not in favour of the tricameral parliament because it continued with the implementation of apartheid</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.3 Why do you think two-thirds of the white voters endorsed the constitution in a referendum held in November 1983? (2)
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
                    <p>1. To maintain their ruling power</p>
                    <p>2. To maintain their white privileges</p>
                    <p>3. To maintain their white dominance</p>
                    <p>4. The tricameral constitution protected their privileges</p>
                    <p>5. The whites were against equality between blacks and whites</p>
                    <p>6. To avoid South Africa being described as a pariah state/To be accepted back into the international arena</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.5.4 Comment on why the United States State Department believed that Botha's reforms were 'a step in the right direction'. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
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
                    <p>1. The US 'secretly' supported South Africa, so they welcomed Botha's reforms as positive development</p>
                    <p>2. The US were actually deceived by Botha's tricks of restructuring apartheid</p>
                    <p>3. The US State Department commended PW Botha for including the Indians and Coloureds in the new legislature as a way of changing apartheid</p>
                    <p>4. The US State Department felt that the inclusivity of Indians and Coloureds was a right move towards democracy</p>
                    <p>5. The US State Department felt that Botha was reforming the policy of apartheid</p>
                    <p>6. The US saw 'reforms' as a way of preventing the spread of communism in South Africa</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    1.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining how the United Democratic Front (UDF) responded to the apartheid reforms introduced by PW Botha in 1983. (8)
                </div>
                <div
                    className="answer-space large"
                    data-placeholder="Write your paragraph here (about 80 words)..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => setShowSolution18(!showSolution18)}
                >
                    {showSolution18 ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolution18 ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. When the UDF was formed in 1983 it had to co-ordinate opposition to the National Party government's reforms (Source 1A)</p>
                    <p>2. The UDF was launched on 20 August 1983 to oppose the introduction of the tricameral parliament (Source 1B)</p>
                    <p>3. The launch of the UDF was a pivotal event in the history of the struggle for freedom and democracy in South Africa (own knowledge)</p>
                    <p>4. In his speech, Dr Allan Boesak highlighted the unity of the coalition group and organisations in the struggle against apartheid, racism and injustice (Source 1B)</p>
                    <p>5. At the launch Dr Allan Boesak calls for the rejection of the government's constitutional proposals (Source 1B)</p>
                    <p>6. The UDF started a 'DON'T VOTE IN APARTHEID ELECTIONS' campaign (Source 1C)</p>
                    <p>7. The UDF provided a platform and voice to the ordinary people (own knowledge)</p>
                    <p>8. Indian and Coloured communities boycotted the tricameral parliament elections which resulted in a poor voter turnout (Source 1D)</p>
                    <p>9. Allister Sparks regarded the poor turnout a massive rejection of the government's new constitution (Source 1D)</p>
                    <p>10. The UDF launched 'million signature' campaign – a petition to create awareness and reject the tricameral system (own knowledge)</p>
                    <p>11. Any other relevant response</p>
                </div>
            </div>
        </div>
    );
};

export default Question1;

