
import React, { useState } from 'react';

const Question3 = ({ isAnswered }) => {
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
        <div className="question" id="question-3">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 3: WHAT WERE THE CHALLENGES ENCOUNTERED BY CIVIL RIGHTS PROTESTORS WHO PARTICIPATED IN THE SELMA TO MONTGOMERY MARCHES IN MARCH 1965?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3A</strong></p>
                <p>The source below outlines reasons for the first Selma to Montgomery march in the United States of America on 7 March 1965. It also highlights why it was referred to as 'Bloody Sunday'.</p>
                <p>
                    On 2 January 1965, Martin Luther King Jr and the Southern Christian Leadership Conference (SCLC) joined the Student Non-Violent Coordinating Committee (SNCC), the Dallas County Voters League and other local African American activists in a voting rights campaign in Selma where, in spite of repeated registration attempts by local blacks, only two per cent were on the voters' roll. The SCLC had chosen to focus its efforts in Selma because they anticipated that the notorious (shameful) brutality of local law enforcement, under Sheriff Jim Clark, would attract national attention and pressure President Lyndon B Johnson and Congress to enact (pass) new national voting rights legislation …
                </p>
                <p>
                    In response to Jackson's death (a civil rights activist), activists in Selma and Marion set out on 7 March to march from Selma to the state capitol in Montgomery. While King was in Atlanta, his SCLC colleague, Hosea Williams, and SNCC leader, John Lewis, led the march. The marchers made their way through Selma across the Edmund Pettus Bridge where they faced a blockade of State Troopers and local lawmen commanded by Clark and Major John Cloud, who ordered the marchers to disperse. When they did not, Cloud ordered his men to advance. Cheered on by white onlookers, the troopers attacked the crowd with clubs and tear gas. Mounted police chased retreating marchers and continued to beat them. Television coverage of 'Bloody Sunday', as the event became known, triggered (started) national outrage (anger).
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.1 List THREE organisations in the source that participated in the voting rights campaign in Selma on 2 January 1965. (3)
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
                    <p>1. Southern Christian Leadership Conference (SCLC)</p>
                    <p>2. Student Non-Violent Coordinating Committee (SNCC)</p>
                    <p>3. Dallas County Voters League</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.2 Define the term voting rights campaign in your own words. (2)
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
                    <p>1. Organised electoral campaigns which seek to influence the decision making of the voters</p>
                    <p>2. Protests by African Americans to have voting rights</p>
                    <p>3. Planned activities carried out over time in order to effect political and social changes by mobilising and convincing citizens to vote for a particular political party</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.3 Why do you think only two per cent of the local blacks appeared on the voters' roll in Selma? (2)
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
                    <p>1. Because of segregationist laws that denied many African Americans of voting rights in Alabama</p>
                    <p>2. Many African Americans did not qualify to vote because they allegedly could not read and write (were illiterate)</p>
                    <p>3. African Americans were subjected to literacy tests which they allegedly failed to ensure that they do not qualify to register to vote</p>
                    <p>4. To prevent African Americans from taking control of local government</p>
                    <p>5. To ensure that local government in Selma would be under the control of segregationist whites</p>
                    <p>6. They faced threats and intimidation from white supremacists</p>
                    <p>7. Registration facilities were not readily accessible to African Americans</p>
                    <p>8. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.4 Name the TWO leaders in the source that led the march from Selma to Montgomery on 7 March 1965. (2)
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
                    <p>1. Hosea Williams</p>
                    <p>2. John Lewis</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.5 Using the information in the source and your own knowledge, explain how demonstrators benefitted from media coverage of the 'Bloody Sunday' incident. (2)
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
                    <p>1. Brutality by police (State Troopers) was widely exposed/national television coverage/national outrage</p>
                    <p>2. To the civil rights activists, it helped to identify the oppressors and the oppressed</p>
                    <p>3. It led to national and international embarrassment to the pro-democratic country (USA) and its leaders</p>
                    <p>4. It validated the demands of the demonstrators – this ultimately led to the passing of the Voting Rights Act of 1965</p>
                    <p>5. It led to national and international sympathy in supporting the demands of the demonstrators</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3B</strong></p>
                <p>The extract below is from part of John Lewis' (chairperson of the Student Non-Violent Coordinating Committee – SNCC) testimony in a federal hearing within a week after the 'Bloody Sunday' incident. It gives an account of how the first march from Selma was stopped and the demonstrators were ordered to disperse.</p>
                <p>
                    ATTORNEY HALL: Then what happened?
                </p>
                <p>
                    JOHN LEWIS: He said, 'I am Major Cloud, and this is an unlawful assembly. This demonstration will not continue. You have been banned by the Governor. I am going to order you to disperse.' Mr Williams (an SCLC activist) said, 'Mr Major, I would like to have a word, can we have a word?' And he said, 'No, I will give you two minutes to leave.' And again, Mr Williams said, 'Can I have a word?' He said, 'There will be no word.' And in about a minute or more Major Cloud ordered the State Troopers to advance, and at that time the State Troopers took their position, I guess, and they moved forward with their clubs up over their … near their shoulders, the top part of the body; they came rushing in, knocking us down and pushing us.
                </p>
                <p>
                    ATTORNEY HALL: Were … was any words said by the State Troopers?
                </p>
                <p>
                    JOHN LEWIS: Well, the State Troopers … most of them kept saying, 'Move back, move back, you niggers, disperse … and things like that …'
                </p>
                <p>
                    ATTORNEY HALL: After you were stopped, at some subsequent time, was tear gas used by the State Troopers, or some form of gas?
                </p>
                <p>
                    JOHN LEWIS: … Well, when we were forced back, most of the people in line knelt in a prayerful manner; they had their backs towards the … Selma, kneeling, the line all the way back was almost a spontaneous reaction on the part of all the people in the line as far back as you could see, and that time the Major ordered the State Troopers to put on their gas masks, and they started throwing gas, and people became sick and started vomiting, and some of us were forced off the highway and behind some buildings in the woods.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.1 Give TWO reasons in the source that Major Cloud provided as to why the demonstration on 7 March 1965 could not occur. (2)
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
                    <p>1. 'this is an unlawful assembly'</p>
                    <p>2. 'This demonstration will not continue'</p>
                    <p>3. 'You have been banned by the Governor'</p>
                    <p>4. 'I am going to order you to disperse'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.2 Explain the implication of the statement, 'There will be no word', in the context of Major Cloud's attitude towards the activists. (2)
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
                    <p>1. Major Cloud's intention was to ensure that the march was blocked</p>
                    <p>2. He was not ready to listen and discuss the pleas of the protestors</p>
                    <p>3. He was only carrying out orders given to him to block and disperse the marchers</p>
                    <p>4. His mandate was to implement the courts' march restraining order</p>
                    <p>5. The march was unlawful and unauthorised – no need to discuss the matter</p>
                    <p>6. He showed arrogance towards African American protestors</p>
                    <p>7. It revealed his racist attitude towards African Americans</p>
                    <p>8. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.3 Comment on why you think the State Troopers used derogatory words when they addressed the demonstrators during the first march from Selma to Montgomery. (2)
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
                    <p>1. They were racists towards African Americans</p>
                    <p>2. To provoke the protestors to retaliate so as to justify the police's extensive use of violence, teargas and mounted police</p>
                    <p>3. The police were also supremacists who did not want the African Americans to vote</p>
                    <p>4. To break the courage and instil fear amongst African Americans</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.4 State THREE effects in the source that the tear gas, which was thrown by the State Troopers, had on the marchers. (3)
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
                    <p>1. 'people became sick'</p>
                    <p>2. 'started vomiting'</p>
                    <p>3. 'forced off the highway and behind some buildings in the woods'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.3 Use Sources 3A and 3B. Explain how the evidence in Source 3A supports the information in Source 3B regarding how the State Troopers dealt with the demonstrators at the Selma to Montgomery March on 7 March 1965. (4)
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
                    <p>1. Both sources show that Major Cloud ordered the State Troopers to disperse the crowd</p>
                    <p>2. The Southern Christian Leadership Conference leaders in Source 3A states that the peaceful CRM activists always awaited brutal attacks from the racist police and in Source 3B John Lewis explains how the police were instructed to attack the peaceful unarmed marchers demanding a right to vote (Both sources show that the police responded with violence)</p>
                    <p>3. In Source 3A it is explained how the police were instructed to use clubs, tear gas to disperse the protestors and in Source 3B John Lewis testifies how the protestors were affected by the gas, they became sick and started vomiting</p>
                    <p>4. In Source 3A it is stated that mounted police were used to disperse the protestors and in Source 3B John Lewis testifies that some of the protestors were forced off the highway and had to ran into the woods</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3C</strong></p>
                <p>The extract below is from a writing by Martin Luther King Jr, published in the book A Testament of Hope, The Essential Writings and Speeches of Martin Luther King, Jr. It provides a reflection on Martin Luther King's preparations for the Second Selma to Montgomery March on 9 March 1965.</p>
                <p>
                    We felt that the State Troopers, who had been severely criticised over their terrible acts two weeks earlier even by conservative Alabama papers, would never again engage in this kind of violence. I shall never forget my agony (pain) of conscience for not being there when I heard of the dastardly (shameful) acts perpetrated (committed) against non-violent demonstrators that Sunday. As a result, I felt that I had to lead a march on the following Tuesday and decided to spend Monday mobilising for it.
                </p>
                <p>
                    The next question was whether the confrontation had to be a violent one; here the responsibility of weighing all factors and estimating the consequences rests heavily on the civil rights leaders. It is easy to decide on either extreme. To go forward recklessly can have terrible consequences in terms of human life and can also cause friends and supporters to lose confidence if they feel lack of responsibility exists.
                </p>
                <p>
                    We determined to seek the middle course. We would march until we faced the State Troopers. We would not disengage until they made clear that they are going to use force. We would disengage (split up) then, having made our point, revealing the continued presence of violence, and showing clearly who are the oppressed and who are the oppressors, hoping, finally, that the national administration in Washington would feel and respond to the shocked reactions with action.
                </p>
                <p>
                    On Tuesday (morning), 9 March 1965, Judge Frank M Johnson of the federal district court in Montgomery issued an order enjoining (ordering) me and the local Selma leadership of the non-violent voting rights movement from peacefully marching to Montgomery.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.1 Why, according to the source, did the Alabama papers criticise the State Troopers? (2)
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
                    <p>1. 'over their terrible acts two weeks earlier'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.2 Explain the concept civil rights in context of the Selma to Montgomery March in 1965. (2)
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
                    <p>1. Voting rights for African Americans which were demanded during the Selma to Montgomery march</p>
                    <p>2. Human rights guaranteed by USA constitution to its citizens</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.3 Comment on the usefulness of this source for a historian researching on the preparations for the second Selma to Montgomery March on 9 March 1965. (4)
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
                    <p><strong>The source is USEFUL because:</strong></p>
                    <p>1. It is an extract from a piece of writing (direct source/first-hand information) by Martin Luther King Jr.</p>
                    <p>2. Martin Luther King Jr. penned his writings as the leader of the Civil Rights Movement</p>
                    <p>3. The writing was during the course of the Selma to Montgomery marches in March 1965</p>
                    <p>4. It provides an outline of planning and preparations for the Second Selma to Montgomery March – 9 March 1965</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3D</strong></p>
                <p>The source below shows protestors arriving at the Alabama state capitol after completing the Third Selma to Montgomery March that started on 21 March and ended on 25 March 1965.</p>
                <div className="cartoon-placeholder">
                    <img
                        src="/images/SOURCE3DP122.png"
                        alt="Protestors arriving at Alabama state capitol after Third Selma to Montgomery March"
                        style={{maxWidth: '100%', height: 'auto', border: '1px solid #ccc', marginTop: '10px'}}
                    />
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.5.1 Explain the messages conveyed by this photograph. (4)
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
                    <p>1. The Third Selma to Montgomery March was a success because they reached Alabama state capitol</p>
                    <p>2. Protestors were committed to the march that started on 21 March and ended on 25 March 1965</p>
                    <p>3. A large crowd of people had participated in the march – 25 000 gathered at Montgomery</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.5.2 Why would you regard this photograph to be iconic (symbolic) regarding the civil rights protests? (4)
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
                    <p>1. It was a victory for the CRM's non-violent strategy – 25 000 marchers (from all walks of life) participated in the march</p>
                    <p>2. It was a success because after two attempts the demonstrators reached their destination – Montgomery capital city of Alabama state</p>
                    <p>3. It was a victory for demonstrators in that a court order had given them permission to freely march after permission was twice denied</p>
                    <p>4. Its success put a lot of pressure on the USA President to pass the Voting Rights Act – 1965</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining the challenges that were encountered by civil rights protestors who participated in the Selma to Montgomery marches in March 1965. (8)
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
                    <p>Civil rights protestors in Selma faced severe challenges including systemic voter exclusion, with only 2% of blacks registered. They encountered brutal police violence on "Bloody Sunday" - beaten with clubs, attacked with tear gas, and chased by mounted police. State troopers used racist slurs and blocked their path unlawfully. The marches faced court injunctions banning peaceful protest. Despite these obstacles, protestors demonstrated remarkable resilience, leading to national outrage that pressured President Johnson to pass the Voting Rights Act of 1965, marking a pivotal victory for the Civil Rights Movement.</p>
                </div>
            </div>
        </div>
    );
};

export default Question3;
