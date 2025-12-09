import React, { useState } from 'react';
//import { markEssay } from '../utils/markingUtils.jsx';

const Question3 = () => {
    // Consolidated state management
    const [showSolutions, setShowSolutions] = useState({
        1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false,
        9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false,
        16: false, 17: false, 18: false
    });

    // Toggle solution visibility
    const toggleSolution = (number) => {
        setShowSolutions(prev => ({
            ...prev,
            [number]: !prev[number]
        }));
    };

    return (
        <div className="question" id="question-3">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 3: HOW DID DIFFERENT FORMS OF SIT-INS CONTRIBUTE TO DESEGREGATION OF PUBLIC FACILITIES IN THE UNITED STATES OF AMERICA (USA) DURING THE 1960s?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3A</strong></p>
                <p>
                    The source below focuses on the reasons why young African American students decided to embark on a sit-in at a Woolworths store in Greensboro, North Carolina, in 1960.
                </p>
                <p>
                    It was college students who had relit (revived) the torch, with a seemingly new form of non-violent confrontation (challenge) – the sit-in. … On 1 February 1960, four male students (Ezell Blair Jr, Franklin McCain, Joseph McNeil and David Richmond) from the North Carolina Agricultural and Technical College (A&T) walked into the downtown Woolworths in Greensboro and sat down on stools at the store's lunch counter. When the waitresses wouldn't serve them, the students refused to move. Two of them were members of the Greensboro National Association for the Advancement of Colored People (NAACP) youth group, which, impatient with the glacial (slow) pace of school desegregation and the lack of momentum after the Montgomery boycott, had been agitating (pushing) to get things moving again. The Youth Council had been founded seventeen years before, after a visit to Greensboro by NAACP official Ella Baker.
                </p>
                <p>
                    After being refused service at Woolworths, the four returned the next day, and this time they brought with them more than twenty fellow students. The day after that, sixty-six students from Agricultural and Technical (A&T) and other colleges and universities throughout the area showed up. By the end of the week, more than a thousand young people were involved in the sit-in, shocking not only the residents of Greensboro but the rest of the South and the nation.
                </p>
                <p>
                    Soon, students in nearby Winston-Salem and Durham launched their own demonstrations. Hundreds of students staged sit-ins in downtown Nashville. Protest erupted in South Carolina, Florida and Virginia, igniting (awakening) each other like a string of firecrackers. By April, more than fifty thousand people throughout the South had taken part in sit-ins in seventy-eight cities and towns, and more than two thousand demonstrators were arrested.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.1 Quote the non-violent protest action from the source that the four college students from North Carolina were involved in. (1)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(1)}
                >
                    {showSolutions[1] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[1] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Sit-in'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.2 Define the term boycott in your own words. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(2)}
                >
                    {showSolutions[2] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[2] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Protest action against policies, laws or decisions by an entity or company that negatively affects the protestors</p>
                    <p>2. Act of showing discontent or disapproval by withholding support</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.3 Explain what is implied by the statement, 'By the end of the week, more than a thousand young people were involved in the sit-in', in the context of ending segregation in the USA. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(3)}
                >
                    {showSolutions[3] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[3] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. The sit-ins at a Woolworths store in Greensboro was just the beginning of many sit-ins that followed</p>
                    <p>2. Sit-ins spread to many cities in the South – a sign of growth</p>
                    <p>3. It inspired students from Winston-Salem and Durham to organise their own sit-ins</p>
                    <p>4. In Nashville hundreds of students participated in sit-ins</p>
                    <p>5. The sit-ins served as an inspiration to African Americans to desegregate facilities in the South</p>
                    <p>6. Protest action erupted in cities like Carolina, Florida and Virginia</p>
                    <p>7. Sit-ins inspired other similar protests such as kneel-ins which is in churches, read ins-in public libraries, play-ins in city parks, wade-ins in beaches and swim-ins in swimming pools</p>
                    <p>8. The growing numbers illustrates the impatience amongst African Americans with the slow pace of change in segregation laws</p>
                    <p>9. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3B</strong></p>
                <p>
                    The source below is part of an interview that was held between Joseph Jackson Jr (leader of the Tougaloo Nine) and writer Gabriel San Román of the Orange County Weekly in California, in 2015. It focuses on the interaction between nine students from Tougaloo College and the librarians at the 'whites only' Jackson Public Library in Mississippi on 27 March 1961, regarding their 'sit-in' ('read-in') in the library.
                </p>
                <p>
                    Joseph Jackson Jr, their leader, approached the circulation desk. With heart thumping, he stammered a message he had memorised: 'Ma'am, I want to know if you have this philosophy book. I need it for a research project.'
                </p>
                <p>
                    'You know you don't belong here!' the library assistant yelled, proceeding to call the library director.
                </p>
                <p>
                    'May I help you?' the latter (library director) asked, coming out of her office. 'We're doing research,' the students responded.
                </p>
                <p>
                    'There's a Coloured library on Mill Street,' she said. 'You are welcome there.'
                </p>
                <p>
                    Almost immediately, Jackson later reported, police entered the building and told the students to get out of the library. No one moved. The chief of police then told them that they were under arrest.
                </p>
                <p>
                    Six officers placed the students into squad cars and at the station charged them with breach (breaking) of the peace because they failed to leave the library when ordered. They were booked into the local jail.
                </p>
                <p>
                    Several days later, the students were taken to the courthouse to be tried. Several blocks away, hundreds of whites were marching through city streets under a huge Confederate flag. At the courthouse, however, some 100 black supporters had gathered to cheer what were now referred to as the 'Tougaloo Nine'.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.1 Who, according to the source, was the leader of the Tougaloo Nine? (1)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(4)}
                >
                    {showSolutions[4] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[4] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Joseph Jackson Jr'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.2 In the context of segregation in the USA, comment on what is conveyed by the words, 'There's a Coloured library on Mill Street'. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(5)}
                >
                    {showSolutions[5] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[5] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. That African Americans should use the library that was designated for coloureds – the segregation/discrimination/Jim Crow laws that the CRM was against</p>
                    <p>2. That African Americans will not be allowed to use the 'white only' library</p>
                    <p>3. The librarian was not prepared to desegregate the library</p>
                    <p>4. The librarian was racist/discriminative towards the Tougaloo Nine</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.3a How, according to the source, did whites react to the trial of the Tougaloo Nine at the courthouse? (1)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(6)}
                >
                    {showSolutions[6] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[6] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'hundreds of whites were marching through city streets under a huge Confederate flag'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.3b How, according to the source, did blacks react to the trial of the Tougaloo Nine at the courthouse? (1)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(7)}
                >
                    {showSolutions[7] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[7] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'some 100 black supporters had gathered to cheer what were now referred to as the 'Tougaloo Nine''</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.4 Explain why this source is reliable for a historian researching the non-violent action by African Americans to integrate facilities in United States during the 1960s. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(8)}
                >
                    {showSolutions[8] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[8] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>The source is reliable because:</p>
                    <p>1. The source is extracted from an interview – first-hand information</p>
                    <p>2. The interviewee, Joseph Jackson Jr, was the leader of the Tougaloo Nine</p>
                    <p>3. The interviewer was a writer for a state print media – Orange County Weekly</p>
                    <p>4. The reported incident happened on 27 March 1961 when sit-in protests were at their height</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3C</strong></p>
                <p>
                    The photograph below depicts young African Americans and whites in a 'swim-in' (to protest against segregation in swimming pools) at Pullen Park's swimming pool in Raleigh, North Carolina on 7 August 1962. In the background of the photograph are two groups, African Americans sitting and whites standing separately.
                </p>
                <div className="cartoon-placeholder">
                    <img
                        src="/images/SOURCE3CP121.png"
                        alt="Swim-in protest at Pullen Park swimming pool"
                        style={{maxWidth: '100%', height: 'auto', border: '1px solid #ccc', marginTop: '10px'}}
                    />
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.3.1 Explain the messages that are conveyed in the photograph regarding the 'swim-in' that took place in Raleigh, North Carolina on 7 August 1962. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(9)}
                >
                    {showSolutions[9] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[9] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. The photograph shows that both African American and whites swimming together (integrated) at Pullen's swimming pool</p>
                    <p>2. It depicts young African and white Americans who were involved in a protest to end segregation in swimming pools</p>
                    <p>3. It also highlights the possibility of ending segregation in public facilities (Pullen Park's swimming pool)</p>
                    <p>4. It shows an attempt to integrate the Pullen Park swimming pool</p>
                    <p>5. The photograph conveys that certain people were not in favour of desegregation/integration</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.3.2 What conclusion can be drawn from the photograph regarding the two separate groups that are outside the swimming pool, in the context of integration? (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(10)}
                >
                    {showSolutions[10] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[10] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. The two groups are not comfortable/uncertainty of using the same pool/integration</p>
                    <p>2. The two groups are anxious (first time experience) about integration</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3D</strong></p>
                <p>
                    Harris, the manager of the Greensboro Woolworth's finally relented (gave in). The sit-ins had already cost him $150 000 in lost business. On 25 July 1960, the lunch counter served its first black customers-four Woolworth's employees who worked in the store's kitchen. But by the end of the year, integration of lunch counters had occurred in many cities across the south. Sit-ins and marches, along with Kennedy's assassination in 1963, helped galvanise (start) support for the Civil Rights Act of 1964, which outlawed racial segregation in public facilities and employment. President John F Kennedy, in a live television address from the Oval Office, called for legislation that would give 'all Americans the right to be served in facilities which are open to the public-hotels, restaurants, theatres, retail stores, and the like'. It was signed into law by his successor, President L Johnson in July 1964.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.1 Quote THREE pieces of evidence from the source that suggests that the Civil Rights Movement's non-violent strategy to desegregate facilities in the South was a success. (3)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(11)}
                >
                    {showSolutions[11] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[11] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Harris, the manager of the Greensboro Woolworth's finally relented' (gave in)</p>
                    <p>2. 'The sit-ins had already cost him $150 000 in lost business'</p>
                    <p>3. 'On 25 July 1960, the lunch counter served its first black customers-four Woolworth's employees who worked in the store's kitchen'</p>
                    <p>4. 'But by the end of the year, integration of lunch counters had occurred in many cities across the south'</p>
                    <p>5. 'Sit-ins and marches, along with Kennedy's assassination in 1963, helped galvanise (start) support for the Civil Rights Act of 1964/which outlawed racial segregation in public facilities and employment'</p>
                    <p>6. 'President John F Kennedy, in a live television address from the Oval Office, called for legislation that would give 'all Americans the right to be served in facilities which are open to the public''</p>
                    <p>7. 'It (the Civil Rights Act) was signed into law by … Pres L Johnson in July 1964'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.2 Explain the term integration in the context of the Civil Rights Movement. (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(12)}
                >
                    {showSolutions[12] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[12] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. System of bringing all Americans across racial divisions together so that they could use public facilities irrespective of their skin colour</p>
                    <p>2. A call by the Civil Rights Movement to have African and white Americans equal in all spheres of life</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.3 List FOUR facilities in the source that President Kennedy requested should be open to all Americans. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(13)}
                >
                    {showSolutions[13] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[13] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'hotels'</p>
                    <p>2. 'restaurants'</p>
                    <p>3. 'theatres'</p>
                    <p>4. 'retail stores'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.4 Name the legislation in the source that outlawed racial segregation in public facilities and employment in 1964. (1)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(14)}
                >
                    {showSolutions[14] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[14] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>The Civil Rights Act of 1964</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.5a Using the information in the source and your own knowledge, explain why McCain on 1 February 1960 felt sitting on a stool was: (a) 'most relieving' (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(15)}
                >
                    {showSolutions[15] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[15] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. He felt relieved because he had broken the chains of segregation by sitting where he was previously not allowed/stood up against racial</p>
                    <p>2. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.5b (b) 'most cleansing feeling that I ever felt' (2)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(16)}
                >
                    {showSolutions[16] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[16] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. He felt cleansed because he had overcome the stigma of being inferior, an outcast and unclean/his dignity was restored</p>
                    <p>2. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.5 Compare Sources 3A and 3D. Explain how the information in Source 3A supports the evidence in Source 3D regarding the non-violent protest to desegregate facilities in the United States of America during the 1960s. (4)
                </div>
                <div
                    className="answer-space"
                    data-placeholder="Write your answer here..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(17)}
                >
                    {showSolutions[17] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[17] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Source 3A refers to the reasons for the sit-ins and Source 3D focuses on the achievements of the sit ins</p>
                    <p>2. Source 3A explains the growth of the sit-in movement and Source 3D highlights the impact that the sit-ins had in the USA (Civil Rights Act of 1964 was passed)</p>
                    <p>3. Both sources refer to the 'sit-ins' that took place in Woolworths in Greensboro, North Carolina</p>
                    <p>4. Both sources refer to the reactions towards this form of non-violent protest (Source 3A – protestors were arrested and in Source 3D – protestors were beaten)</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining how the different forms of sit-ins contributed to desegregation of public facilities in the United States of America during the 1960s. (8)
                </div>
                <div
                    className="answer-space large"
                    data-placeholder="Write your paragraph here (about 80 words)..."
                    contentEditable
                    suppressContentEditableWarning={true}
                ></div>
                <button
                    className={`btn btn-view-solution`}
                    onClick={() => toggleSolution(18)}
                >
                    {showSolutions[18] ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${showSolutions[18] ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>Different forms of sit-ins significantly advanced desegregation in the USA during the 1960s. The Greensboro Woolworth's sit-in inspired nationwide protests including read-ins at libraries, swim-ins at pools, and kneel-ins at churches. These non-violent demonstrations exposed segregation's injustice, gained media attention, and pressured businesses financially. The movement's growth from four students to thousands of participants demonstrated widespread discontent with segregation. This sustained civil disobedience culminated in the Civil Rights Act of 1964, which legally ended segregation in public facilities, proving that coordinated non-violent protests could achieve substantial legislative change and social progress.</p>
                </div>
            </div>
        </div>
    );
};

export default Question3;
