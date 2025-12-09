
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

    return (
        <div className="question" id="question-2">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 2: WHAT CAN SOUTH AFRICANS LEARN FROM THE ROLE PLAYED BY ARCHBISHOP DESMOND TUTU, CHAIRPERSON OF THE TRUTH AND RECONCILIATION COMMISSION (TRC) FROM 1995 TO 1998?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2A</strong></p>
                <p>
                    The extract below has been taken from Archbishop Desmond Tutu's acceptance speech at the first public gathering of the Truth and Reconciliation Commission (TRC) at the City Hall in East London in the Eastern Cape, on 16 December 1995.
                </p>
                <p>
                    Everyone is aware that we have been assigned a delicate (tricky) task whose execution, successful or otherwise, will have critical and far-reaching consequences for our land and nation. It is an awesome (tremendous) responsibility. It is important to bear constantly in mind the title of the Act that has brought us into being – the Promotion of National Unity and Reconciliation.
                </p>
                <p>
                    Absolutely central to our concern in the work of our Commission is helping our land and people to achieve genuine, real and not cheap and spurious (false) reconciliation. Some view the Commission with considerable misgiving and indeed suspicion and even hostility because they have convinced themselves that the Commission is going to degenerate (decline) into an inquisition (investigation), a witch-hunt hell-bent on bringing miscreants (offenders) to book.
                </p>
                <p>
                    We must scotch (stop) that rumour or suspicion from the outset. We are meant to be a part of the process of the healing of our nation, of our people, all of us, since every South African has to some extent or other been traumatised (upset). We are a wounded people because of the conflict of the past, no matter on which side we stood. We all stand in need of healing.
                </p>
                <p>
                    We are privileged to be on this Commission to assist our land, our people to come to terms with our dark past once and for all. They say that those who suffer from amnesia (forgetfulness), those who forget the past, are doomed to repeat it.
                </p>
                <p>
                    That is why the truth is so central to this whole exercise. But we will be engaging in something that is ultimately deeply spiritual, deeply personal. That is why I have been appealing to all our people – this is not something just for the Commission alone. We are in it, all of us together, black and white, coloured and Indian.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.1 Which Act, according to the source, brought the Truth and Reconciliation Commission into being? (1)
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
                    <p>1. 'The Promotion of National Unity and Reconciliation'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.2 What, according to Tutu, should remain absolutely central to the concerns of South Africans in 'the work of our Commission' (TRC)? (2)
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
                    <p>1. 'helping our land and people to achieve genuine, real and not cheap and spurious (false) reconciliation'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.1.3 Explain what Tutu meant by the statement, '... no matter on which side we stood. We all stand in need of healing', in the context of reconciliation and national unity. (4)
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
                    <p>1. That the TRC was not going to focus on the victims only, but also on perpetrators who should be relieved from the guilt of crimes that they committed</p>
                    <p>2. That the past should be fearlessly faced by all racial groups to achieve healing and reconciliation/unity from its trauma</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2B</strong></p>
                <p>The cartoon below was drawn by J Shapiro, 'Zapiro', for the Sowetan newspaper. It depicts Archbishop Desmond Tutu delivering the Truth and Reconciliation Commission's report to President Nelson Mandela on 29 October 1998.</p>

                <div className="image-container">
                    <img
                        src="/images/SOURCE2BP222.png"
                        alt="Zapiro cartoon showing Tutu delivering TRC report to Mandela while being attacked from all sides"
                        className="source-image"
                        style={{
                            width: '100%',
                            maxWidth: '700px',
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
                  <p><strong>Image: Zapiro Cartoon - TRC Report Submission</strong></p>
                  <p>Cartoon showing Tutu delivering TRC report to Mandela while being attacked from all sides</p>
                  <p><small>Place image file in: public/images/zapiro-cartoon-trc.jpg</small></p>
                  <div style="margin-top: 15px; font-size: 12px; color: #888;">
                    <p><strong>Cartoon description:</strong></p>
                    <p>Archbishop Desmond Tutu (depicted as an angel/messenger) is delivering a package labeled "TRC REPORT SPECIAL DELIVERY" to President Nelson Mandela.</p>
                    <p>Political parties (ANC, NP, IFP, FF, PAC) are shown attacking Tutu from all sides with weapons and criticism.</p>
                    <p>The cartoon illustrates the intense political criticism faced by the TRC report from various factions.</p>
                  </div>
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
                        <em>Zapiro cartoon: "Attacked from left, right and centre" - Tutu delivering TRC report to Mandela, 29 October 1998</em>
                    </p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.1 Identify any FOUR political parties in the cartoon that attacked Tutu when he delivered the Truth and Reconciliation Commission's report to President Nelson Mandela on 29 October 1998. (4)
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
                    <p>1. 'NP' (National Party)</p>
                    <p>2. 'ANC' (African National Congress)</p>
                    <p>3. 'FF' (Freedom Front)</p>
                    <p>4. 'IFP' (Inkatha Freedom Party)</p>
                    <p>5. 'PAC' (Pan Africanist Congress)</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.2 Explain the messages conveyed in this cartoon regarding the final TRC report submitted to President Nelson Mandela on 29 October 1998. (4)
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
                    <p>1. Many political parties attacked the TRC report because they were implicated</p>
                    <p>2. Tutu (as the Chairperson of the TRC) submitted the TRC report to the office of Nelson Mandela (the President of South Africa) despite all the challenges</p>
                    <p>3. Although the TRC was criticised by various political parties the basic work was completed and South Africa had dealt with the past to some extent</p>
                    <p>4. Tutu regarded the submission of the TRC report as something special (special delivery)</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.2.3 Comment on the limitations of this source for a historian researching the submission of the final report of the Truth and Reconciliation Commission. (4)
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
                    <p><strong>The source is LIMITED because:</strong></p>
                    <p>1. It is only a view of Zapiro/bias – the cartoonist</p>
                    <p>2. The cartoonist portrayed a negative perspective of the TRC report being attacked by various political parties</p>
                    <p>3. The language used 'attacked from left, right and centre …' serves as an admission of negativity on the TRC report</p>
                    <p>4. The TRC is depicted as a failure</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2C</strong></p>
                <p>
                    This source by A Yates is taken from a special report titled 'Justice Delayed: The TRC Recommendations 20 Years Later'. It focuses on Advocate Ntsebeza's (one of the TRC commissioners) evaluation of the work of the TRC led by Archbishop Desmond Tutu, the chairperson of the TRC.
                </p>
                <p>
                    The TRC submitted around 300 perpetrators of human rights violations to prosecute. Until the recent National Prosecuting Authority (NPA) announcement to prosecute 15 cases from this list, there had been only one person found guilty of apartheid-era crimes, Eugene de Kock. The recent resurgence (revival) in TRC-related prosecutions is a welcome sign that this recommendation may be realised, albeit (although) slowly … The cases of Ahmed Timol, the Cradock Four, and others are currently being litigated (charged). Many hope that the 15 new cases taken on by the NPA will be the start to a long process of prosecuting the full list from the TRC report.
                </p>
                <p>
                    The TRC was successful in some of its aims. As Ntsebeza Dumisa (TRC commissioner) recalls with vivid (clear) detail, the simple act of having one's story publicly validated (confirmed), was a significant and meaningful step for all who were involved. Apartheid was an era in which proliferating (increasing) misinformation created a fabricated (false) narrative (story) both nationally and globally about the reality of what was happening in South Africa. It is reasonable to dream that in the wake of the absence of truth, public declarations of fact would not just be a restoration of personal dignity but would also be the first step towards national unity.
                </p>
                <p>
                    Ntsebeza Dumisa agrees that the international narrative that the TRC liberated South Africans of their past and resulted in a fairy-tale ending for a massive human rights struggle is false. The notion that, with Desmond Tutu at the helm (in control), Christian values prevailed, and forgiveness erased (removed) the trauma of 50 plus years of oppression, is also short-sighted.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.1 Define the concept perpetrator in your own words. (2)
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
                    <p>1. Anyone who is responsible for the gross human rights violations on another individual</p>
                    <p>2. Anyone who has intentionally dehumanised or harmed innocent people for political reasons</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.2 Quote TWO pieces of evidence from the source to indicate that the NPA acted on the recommendations of the final TRC report. (4)
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
                    <p>1. 'The NPA announcement to prosecute 15 cases from the list'</p>
                    <p>2. 'One person found guilty of apartheid era crimes – Eugene de Kock'</p>
                    <p>3. 'Recent resurgence of TRC related prosecution'</p>
                    <p>4. 'The cases of Ahmed Timol, the Cradock four and others are currently being litigated'</p>
                    <p>5. 'Many hope that the fifteen new cases taken on by the NPA will be the start to a long process of prosecuting the full list from the TRC report'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.3.3 Explain what Commissioner Ntsebeza meant by 'public declarations of fact would … be the first step towards national unity', regarding the TRC hearings. (4)
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
                    <p>1. Public declarations signified an achievement for the TRC</p>
                    <p>2. Testimonies of the victims and perpetrators in the TRC should not be taken for granted – they revealed important information</p>
                    <p>3. Public hearings clarified some misconceptions, misinformation and lies</p>
                    <p>4. Public declarations would lead to reconciliation/healing</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 2D</strong></p>
                <p>
                    The source below by the South African writer and political commentator, Sisonke Msimang, was published on 27 December 2021 in the Al Jazeera editorial. It was a tribute to Archbishop Tutu who passed away on 26 December 2021.
                </p>
                <p>
                    Tutu was neither made nor broken by the difficult exchanges that took place in the context of the Truth and Reconciliation Commission (TRC). He was a man with nothing to prove and he ran the commission with a deep sense of love and a commitment to truth-telling and forgiveness. This instinct (feeling) sometimes overshadowed (exceeded) his country's need for tangible (real) justice, for perpetrators to serve time behind bars and for victims to be provided the details of where their loved ones had been killed.
                </p>
                <p>
                    By focusing on the stories of the most obviously wounded – the relatives of the tortured and murdered – the commission missed an important opportunity to address the structural and systemic (whole) impact of apartheid. In other words, in spite of its harrowing (disturbing) stories and its scenes of spectacular grief, the TRC was never given a full mandate to address the group effects of apartheid – the loss of opportunity wrought (created) on generations of black people by naked racism.
                </p>
                <p>
                    The TRC handed a list of apartheid operatives (secret agents) who were thought to have been involved in killing anti-apartheid activists to the National Prosecuting Authority (NPA). In the two decades since then, the South African government has done nothing to bring those people to justice, nor has it ever agreed to address the question of redress (restore) and compensation for all the victims of apartheid. The fault for this does not lie with Desmond Tutu. To the contrary, his death reminds us of the unfinished business of the transition from apartheid to democracy. This was not his business – it is ours. The jaded (tired) among us would do well to heed (take note) the great man's words. With his trademark bluntness, Tutu said, 'If you want peace, you don't talk to your friends. You talk to your enemies.' This insistence on reaching out and across all sorts of divides was the key to his effectiveness.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.4.1 Quote any THREE statements made by Sisonke Msimang which paid tribute to Archbishop Tutu after he passed away on 26 December 2021. (3)
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
                    <p>1. 'Tutu was neither made nor broken by the difficult exchanges that took place in the context of the TRC'</p>
                    <p>2. 'He was a man with nothing to prove'</p>
                    <p>3. 'He ran the commission with a deep sense of love and a commitment to truth-telling and forgiveness'</p>
                    <p>4. 'This insistence on reaching out and across all sorts of divides was the key to his effectiveness'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.4.2 Using the information in the source and your own knowledge, comment on the statement, 'the TRC was never given a full mandate to address the group effects of apartheid'. (4)
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
                    <p>1. The TRC focused only on specific cases affecting victims and perpetrators</p>
                    <p>2. The TRC did not address the general impact of apartheid on blacks (non-whites)</p>
                    <p>3. The TRC focused on atrocities committed only between 1960 and 1994/ limited to a specified time frames</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.4.3 Explain the term redress in the context of what the government wanted to achieve through the TRC. (2)
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
                    <p>1. Restoring human dignity of those who were oppressed by the apartheid government</p>
                    <p>2. Implementing reparations and the rehabilitation process of the loss and trauma that South Africans experienced during apartheid</p>
                    <p>3. Restoring fairness so that the victims could reconcile with the perpetrators for equality in South Africa</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.4.4 What did Msimang imply by 'his (Tutu's) death reminds us of the unfinished business of the transition from apartheid to democracy'? (2)
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
                    <p>1. That Tutu led the TRC effectively to deal with the past and it was important that the ANC government completes the process by implementing the recommendations</p>
                    <p>2. The TRC's recommendations have not been fully implemented by the NPA</p>
                    <p>3. South Africa is still reeling from the impact of apartheid and has not moved to democratic principles</p>
                    <p>4. Some reparations promised to the victims have not yet been paid</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.5 Refer to Sources 2C and 2D. Explain how the information in Source 2C supports the evidence in Source 2D regarding the work of the TRC. (4)
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
                    <p>1. In Source 2C Commissioner Ntsebeza believed that the TRC was successful in some of its aims and in Source 2D Msimang states that Tutu was a man who ran the commission with a deep sense of love and a commitment to truth-telling and forgiveness</p>
                    <p>2. Both sources highlight the role/contribution that Tutu made as chairperson of the TRC</p>
                    <p>3. Both sources acknowledge that the TRC report managed to submit a list of perpetrators (apartheid operatives) to the NPA</p>
                    <p>4. Both sources allude to the fact that the slow movement of the NPA on the list provided by the TRC cannot be blamed on Tutu</p>
                    <p>5. Both sources focus on the wounded (victims)</p>
                    <p>6. Both sources acknowledge that the TRC was unable to provide adequate redress to all the victims of apartheid</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    2.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining what South Africans can learn from the role played by Archbishop Desmond Tutu, chairperson of the Truth and Reconciliation Commission (TRC) from 1995 to 1998. (8)
                </div>
                <div
                    className="answer-space large"
                    data-placeholder="Write your paragraph here (about 80 words)..."
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
                    <p>South Africans can learn from Tutu's profound commitment to authentic reconciliation over retribution. As TRC chairperson, he demonstrated that healing requires truth-telling from all sides, emphasizing that both victims and perpetrators needed healing. Despite intense political criticism, he persevered in delivering the TRC report, showing courage in facing uncomfortable truths. Tutu's leadership exemplified Ubuntu principles – that national unity requires confronting past injustices collectively. His legacy teaches that reconciliation is an ongoing process requiring constant engagement across divides, and that true peace comes from dialogue with adversaries, not just allies.</p>
                </div>
            </div>
        </div>
    );
};

export default Question2;

