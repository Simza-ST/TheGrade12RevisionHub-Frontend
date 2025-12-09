import React, { useState } from 'react';

const Question2 = ({ isAnswered }) => {
    const [showSolutions, setShowSolutions] = useState({});

    const toggleSolution = (question) => {
        setShowSolutions(prev => ({
            ...prev,
            [question]: !prev[question]
        }));
    };

    const isSolutionVisible = (question) => {
        return showSolutions[question] || false;
    };

    return (
        <div className="question" id="question-2">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 2: HOW DID THE TRUTH AND RECONCILIATION COMMISSION (TRC) DEAL WITH THE MURDER OF THE POLITICAL ACTIVIST, GRIFFITHS MXENGE?
                </div>
                <div className="marks">(50)</div>
            </div>

            {/* SOURCE 2A */}
            <div className="source-material">
                <p><strong>SOURCE 2A</strong></p>
                <p>The extract below focuses on the reasons for the establishment of the Truth and Reconciliation Commission (TRC) in 1995.</p>
                <p>The Truth and Reconciliation Commission (TRC) was a court-like body assembled in South Africa after the end of apartheid. Anybody who felt they had been a victim of violence could come forward and be heard at the TRC. Perpetrators of violence could also give testimony and request amnesty from prosecution. The hearings made international news and many sessions were broadcast on national television.</p>
                <p>The mandate of the commission was to bear witness to, record and, in some cases, grant amnesty to the perpetrators of crimes relating to human rights violations, reparation and rehabilitation.</p>
                <p>The work of the TRC was accomplished through three committees: the Human Rights Violations Committee investigated human rights abuses between 1960 and 1994, the Reparation and Rehabilitation Committee was charged with restoring victims' dignity, and the Amnesty Committee considered applications for amnesty. The commission could grant amnesty if crimes were politically motivated and the whole truth was told.</p>
                <div className="source-reference">[Adapted from historical sources on the TRC]</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.1.1 Who, according to the source, could come forward and be heard at the TRC? (1)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.1.1')}>
                    {isSolutionVisible('2.1.1') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.1.1') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Anybody who felt they had been a victim of violence'</p>
                    <p>2. 'Perpetrators of violence could also give testimony and request amnesty from prosecution'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.1.2 Define the concept amnesty in your own words. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.1.2')}>
                    {isSolutionVisible('2.1.2') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.1.2') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Official pardon for political crimes committed during apartheid in exchange for the disclosure of the whole truth</p>
                    <p>2. Exempt from prosecution for perpetrators who gave testimony on human rights violations that were politically motivated</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.1.3 Why do you think the hearings at the TRC made international news? (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.1.3')}>
                    {isSolutionVisible('2.1.3') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.1.3') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. It was newsworthy and of international interest</p>
                    <p>2. The international communities wanted to see how South Africa addressed the atrocities of the past</p>
                    <p>3. To observe whether the restorative justice system would work</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.1.4 List any THREE mandates of the TRC, as stated in the source. (3)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.1.4')}>
                    {isSolutionVisible('2.1.4') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.1.4') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'to bear witness to'</p>
                    <p>2. 'record'</p>
                    <p>3. 'grant amnesty to the perpetrators of crimes relating to human rights violations'</p>
                    <p>4. 'reparation and rehabilitation'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.1.5 Using the information in the source and your own knowledge, explain why the Human Rights Violations Committee investigated human rights abuses between 1960 and 1994. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.1.5')}>
                    {isSolutionVisible('2.1.5') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.1.5') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 1960 marked the Sharpeville massacre when the NP adopted brutal methods against activists</p>
                    <p>2. 1994 marked the end of apartheid and dawn of democratic South Africa</p>
                    <p>3. The highest number of political violence deaths occurred during this period</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.1.6 State TWO conditions that perpetrators had to meet before being granted amnesty. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.1.6')}>
                    {isSolutionVisible('2.1.6') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.1.6') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'The crimes were politically motivated'</p>
                    <p>2. 'the whole truth was told by the person seeking amnesty'</p>
                </div>
            </div>

            {/* SOURCE 2B */}
            <div className="source-material">
                <p><strong>SOURCE 2B</strong></p>
                <p>The poster below was produced by the TRC. It invites both perpetrators and victims to appear before the TRC and testify about human rights abuses committed between 1960 and 1994.</p>
                <div className="cartoon-placeholder">
                    <div style={{padding: '20px', background: '#f5f5f5', border: '1px solid #ccc', textAlign: 'center', fontStyle: 'italic'}}>
                        TRC POSTER: "IF YOUR MOTHER WAS TORTURED, FATHER MURDERED … WOULD YOU BE SILENT"
                        <img
                            src="/images/SOURCE2BP221.png"
                            alt="TRC Poster"
                            style={{
                                display: 'block',
                                maxWidth: '100%',
                                height: 'auto',
                                border: '1px solid #ccc',
                                marginTop: '10px',
                                borderRadius: '5px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        />
                    </div>
                </div>
                <div className="source-reference">[TRC Poster, 1995]</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.2.1 Why did the TRC decide to produce this poster? (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.2.1')}>
                    {isSolutionVisible('2.2.1') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.2.1') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. To encourage victims and perpetrators to come forward and tell their stories</p>
                    <p>2. To establish a record of human rights atrocities during apartheid</p>
                    <p>3. To provide opportunity for victims to voice their suffering for compensation</p>
                    <p>4. To foster reconciliation between perpetrators and victims</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.2.2 Comment on why the TRC used the words about family members being tortured/murdered. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.2.2')}>
                    {isSolutionVisible('2.2.2') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.2.2') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. To encourage victims not to remain silent about human rights abuses</p>
                    <p>2. Murder and torture were key human rights abuses the TRC wanted to expose</p>
                    <p>3. To invoke empathy and encourage people to share their stories</p>
                    <p>4. By speaking out, victims can find closure and healing</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.2.3 Explain the term reconciliation in the context of the TRC. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.2.3')}>
                    {isSolutionVisible('2.2.3') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.2.3') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. The state where victims and perpetrators live in peace and harmony</p>
                    <p>2. The process where victims forgive perpetrators who fully disclose abuses</p>
                    <p>3. Restoration of broken relationships between victims and perpetrators</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            {/* SOURCE 2C */}
            <div className="source-material">
                <p><strong>SOURCE 2C</strong></p>
                <p>The extract below is part of Dirk Coetzee's testimony at the TRC hearing into the murder of Griffiths Mxenge on 5 November 1996.</p>

                <p><strong>MR JANSEN:</strong> Did you give the members of the team any instructions as far as the way in which the murder had to be committed?</p>

                <p><strong>MR DIRK COETZEE:</strong> Yes, I did, Mr. Chairman. I said they should specifically not use guns, and must make it look like a robbery, and it was decided on knives, that Mr Mxenge will be killed with knives.</p>

                <p><strong>MR JANSEN:</strong> Did you give them any further instructions as to how they should go about achieving that goal?</p>

                <p><strong>MR DIRK COETZEE:</strong> They took his car away, they parked it in the parking lot between CR Swart Square and the magistrate's court … and I left. I then went to Warrant Officer Paul van Dyk and Constable Braam du Preez, whom I gave instructions to take Mr Mxenge's car and leave for Golela border post … I then went to … Brigadier Van der Hoven … and reported to him … that Mr Mxenge was killed. I said the only people that were reported to me that did the stabbing of Mr Mxenge were Joe Mamasela, Almond Nofomela and David Tshikalanga.</p>

                <p><strong>MR JANSEN:</strong> And on the probabilities, who would those orders have come from headquarters?</p>

                <p><strong>MR DIRK COETZEE:</strong> He told me it was orders from Brigadier Skoon …</p>

                <p><strong>MR JANSEN:</strong> And what was the purpose of burning the car near the Swaziland border?</p>

                <p><strong>MR DIRK COETZEE:</strong> To give the impression that the murder was committed by ANC cadres as a result of a quarrel … and then they fled back to Swaziland and burnt the car before crossing the border.</p>

                <div className="source-reference">[TRC Testimony Transcript, 5 November 1996]</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.3.1 Name any TWO killers implicated in the murder of Griffiths Mxenge. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.3.1')}>
                    {isSolutionVisible('2.3.1') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.3.1') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Joe Mamasela'</p>
                    <p>2. 'Almond Nofomela'</p>
                    <p>3. 'David Tshikalanga'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.3.2 Why did Dirk Coetzee implicate ANC cadres in the murder? (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.3.2')}>
                    {isSolutionVisible('2.3.2') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.3.2') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. To shift blame away from the NP government and mislead investigations</p>
                    <p>2. To create a bad reputation for the ANC</p>
                    <p>3. To conceal secret operations of askaris and state agencies</p>
                    <p>4. To fuel conflict within the ANC</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.3.3 Explain the usefulness of this source for a historian researching the murder of Griffiths Mxenge. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.3.3')}>
                    {isSolutionVisible('2.3.3') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.3.3') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. It is a transcript giving first-hand information about the murder</p>
                    <p>2. The testimony was from Dirk Coetzee, the Vlakplaas death squad commander</p>
                    <p>3. The testimony took place during actual TRC public hearings in 1996</p>
                    <p>4. Provides insight into methods used and names of those responsible</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.4 Refer to Sources 2B and 2C. Explain how the evidence in Source 2C supports Source 2B regarding the TRC's call for victims and perpetrators to appear. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.4')}>
                    {isSolutionVisible('2.4') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.4') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. Source 2B invites people to speak out against human rights abuses, and Source 2C shows Dirk Coetzee appearing before TRC to apply for amnesty</p>
                    <p>2. Source 2B encourages speaking out for reconciliation, and Source 2C shows Coetzee committing to full disclosure for reconciliation</p>
                    <p>3. Source 2B states people must tell the truth about murder, supported by Source 2C where Coetzee tells the truth about his involvement</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            {/* SOURCE 2D */}
            <div className="source-material">
                <p><strong>SOURCE 2D</strong></p>
                <p>The source below is from a newspaper article titled 'Coetzee Gets Amnesty for Mxenge Murder' in the Mail & Guardian on 4 August 1997.</p>

                <p><strong>COETZEE GETS AMNESTY FOR MXENGE MURDER</strong></p>

                <p>4 Aug. 1997</p>

                <p>MONDAY</p>

                <p>The Truth and Reconciliation Commission on Monday granted amnesty to former Vlakplaas police hit squad commander Dirk Coetzee and two accomplices for the November 1981 murder of Durban human rights lawyer Griffiths Mxenge. Coetzee and two former Vlakplaas operatives, David Tshikilanga and Almond Nofomela, were convicted of Mxenge's murder in the Durban High Court on May 15. They were due to have been sentenced on Friday.</p>

                <p>Giving details of its ruling, the TRC's amnesty committee said there was no doubt Coetzee had acted on the 'advice, command or order of one or more senior members of the security branch of the former SA Police'.</p>

                <p>'On the evidence before us we are satisfied that none of the applicants knew the deceased, Mxenge, or had any reason to wish to bring about his death before they were ordered to do so,' the committee said. 'We are satisfied that they did what they did because they regarded it as their duty as policemen who were engaged in the struggle against the ANC and other liberation movements.'</p>

                <p>Mxenge's family, meanwhile on Monday said they will ask the High Court to overturn the amnesty. Dr Fumbatha Mxenge, a Port Elizabeth dentist and brother of Griffiths, said the family was disappointed by the TRC's decision, but not surprised. 'We will challenge this decision. We are going to take it on review. You have not heard the last of this,' Mxenge said.</p>

                <div className="source-reference">[Adapted from Mail & Guardian, 4 August 1997]</div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.5.1 Identify any TWO perpetrators who were granted amnesty for the murder. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.5.1')}>
                    {isSolutionVisible('2.5.1') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.5.1') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Dirk Coetzee'</p>
                    <p>2. 'David Tshikilanga'</p>
                    <p>3. 'Almond Nofomela'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.5.2 Quote TWO reasons why the TRC granted amnesty to the murderers. (2)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.5.2')}>
                    {isSolutionVisible('2.5.2') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.5.2') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. 'Coetzee had acted on the advice, command or order of senior members of the security branch'</p>
                    <p>2. 'none of the applicants knew the deceased, Mxenge, or had any reason to wish his death'</p>
                    <p>3. 'they regarded it as their duty as policemen engaged in the struggle against the ANC'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.5.3 Explain why the Mxenge family was disappointed by the TRC's decision. (4)</div>
                <div className="answer-space" data-placeholder="Write your answer here..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.5.3')}>
                    {isSolutionVisible('2.5.3') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.5.3') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>1. They wanted the perpetrators to be punished for murder (retributive justice)</p>
                    <p>2. They were not in favour of restorative justice</p>
                    <p>3. They did not believe healing could occur through truth-telling alone</p>
                    <p>4. They believed the TRC was perpetrator-friendly</p>
                    <p>5. The family was not adequately consulted</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">2.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining how the TRC dealt with the murder of Griffiths Mxenge. (8)</div>
                <div className="answer-space large" data-placeholder="Write your paragraph here (about 80 words)..." contentEditable suppressContentEditableWarning={true}></div>
                <button className="btn btn-view-solution" onClick={() => toggleSolution('2.6')}>
                    {isSolutionVisible('2.6') ? '👁️ Hide Solution' : '👁️ View Solution'}
                </button>
                <div className={`solution-space ${isSolutionVisible('2.6') ? 'show' : ''}`}>
                    <div className="solution-header">💡 Model Answer:</div>
                    <p>The TRC investigated Griffiths Mxenge's murder through public hearings where Dirk Coetzee testified. He disclosed the truth about the politically motivated killing, naming Joe Mamasela, Almond Nofomela and David Tshikalanga as the killers. Coetzee admitted they framed ANC cadres by burning Mxenge's car near Swaziland. The TRC's Amnesty Committee granted amnesty after determining the crime was politically motivated and full disclosure was made. However, the Mxenge family opposed this decision, preferring retributive justice and challenging the amnesty in court, highlighting tensions between restorative and retributive justice approaches.</p>
                </div>
            </div>
        </div>
    );
};

export default Question2;
