
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
    const [showSolution17, setShowSolution17] = useState(false);

    return (
        <div className="question" id="question-3">
            <div className="question-header">
                <div className="question-text">
                    QUESTION 3: HOW COMMITTED HAVE DEVELOPING COUNTRIES OF BRICS BEEN TO GLOBAL CLIMATE CHANGE ISSUES BETWEEN 2000 AND 2021?
                </div>
                <div className="marks">(50)</div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3A</strong></p>
                <p>
                    This source is an extract from a statement by the South African Department of Energy, issued on 30 November 2011. It highlights South Africa's commitment to the United Nations Framework Convention on Climate Change (UNFCCC).
                </p>
                <p>
                    South Africa is a party to both the United Nations Framework Convention on Climate Change (UNFCCC) and its Kyoto Protocol, having acceded (agreed) to the Convention in 1997 and ratified (approved) the Protocol in 2002. As a signatory (participant), the country has to comply with and participate in meetings and discussions of the UNFCCC and its Kyoto Protocol.
                </p>
                <p>
                    The United Nations Framework Convention on Climate Change (UNFCCC) is the main global response to climate change. The associated Kyoto Protocol is an international agreement that classifies countries by their level of industrialisation and commits certain countries to greenhouse gas (GHG) emission-reduction targets.
                </p>
                <p>
                    The South African Cabinet approved the hosting of the United Nations Climate Change Conference in May 2008, which will encompass (include) the seventeenth Conference of the Parties (COP17) of the United Nations Framework Convention on Climate Change (UNFCCC). The UNFCCC accepted the country's offer to host in December 2008.
                </p>
                <p>
                    The Department of Environmental Affairs (DEA) together with the Department of International Relations and Cooperation (DIRCO) are the main lead departments in the coordination of the conference. The Interministerial Committee on Climate Change constituting all of the relevant departments has been established to oversee both the logistics and substantive (practical) content issues of our hosting, and at operational level two technical working subcommittees have been formed to look at logistics and substantive content, respectively.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.1 Identify TWO roles that South Africa has to play as a signatory to the United Nations Framework Convention on Climate Change. (2)
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
                    <p>1. 'To comply with and'</p>
                    <p>2. 'participate in meetings and discussions of the UNFCCC and its Kyoto Protocol'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.2 Define the concept climate change in your own words. (2)
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
                    <p>1. A long-term shift in temperatures and weather pattern due to human activities like burning of fuels such as coal, oil, gas or fossil</p>
                    <p>2. Change in global or regional climate patterns also referred to as global warming</p>
                    <p>3. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.3 Give TWO responsibilities of the Kyoto Protocol, stated in the source. (2)
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
                    <p>1. 'classifies countries by their level of industrialisation'</p>
                    <p>2. 'commits certain countries to Greenhouse Gas (GHG) emission-reduction targets'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.1.4 State TWO activities in the source that were delegated to the Inter-Ministerial Committee on Climate Change in preparation for the hosting of the UNFCCC in May 2008. (2)
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
                    <p>1. 'to oversee both the logistics and substantive (practical) content issues of our hosting'</p>
                    <p>2. 'at operational level two technical working sub-committees have been formed to look at logistics and substantive content'</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3B</strong></p>
                <p>
                    This source below is an extract from a transcript of a speech made by Greta Thunberg, a Swedish environmental activist at the UN's 25th Conference of Parties (COP25) in Madrid, Spain, on 11 December 2011. It highlights how rich and developing countries were not honouring their commitment to reduce emissions of greenhouse gases.
                </p>
                <p>
                    For about a year I have been constantly talking about our rapidly declining carbon budgets over and over again. But since that is still being ignored, I will just keep repeating it. The G20 countries account for almost 80 per cent of total emissions (discharges). The richest 10 per cent of the world's population produce half of our carbon dioxide (CO2) emissions, while the poorest 50 per cent account for just one-tenth. We indeed have some work to do but some more than others.
                </p>
                <p>
                    Recently, a handful of rich countries pledged (promised) to reduce their emissions of greenhouse gases by so-and-so many per cent by this or that date or to become climate neutral or net zero in so-and-so many years. This may sound impressive at first glance but even though the intentions may be good, this is not leadership. This is not leading. This is misleading because most of these pledges do not include aviation, shipping, imported and exported goods and consumption. They do, however, include the possibility of countries to offset their emissions elsewhere.
                </p>
                <p>
                    … and without that sense of urgency, how can we, the people, understand that we are facing a real crisis. And if the people are not fully aware of what is going on, then they will not put pressure on the people in power to act. And without pressure from the people, our leaders can get away with basically not doing anything, which is where we are now.
                </p>
                <p>
                    Well, I'm telling you, there is hope. I have seen it but it does not come from the governments or corporations. It comes from the people. The people who have been unaware but are now starting to wake up. And once we become aware, we change. People can change. People are ready for change.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.1 According to the source, what amount of CO2 emissions is produced by the following:
                </div>
                <div className="subquestion-sub">
                    <p>(a) Richest 10 per cent of the world population (1)</p>
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
                        <p>1. 'half'</p>
                    </div>

                    <p>(b) Poorest 50 per cent of the world population (1)</p>
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
                        <p>1. 'one-tenth'</p>
                    </div>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.2 Why do you think rich countries failed to honour their pledge to reduce their emission of greenhouse gases? (4)
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
                    <p>1. They were/are greedy/not prepared to reduce their industrial or economic targets</p>
                    <p>2. They were/are not prepared to cut down on their emissions as they derived huge profits from the businesses</p>
                    <p>3. They were/are not prepared to contribute fair amounts towards assisting the developing countries to reduce their emissions</p>
                    <p>4. Their leaders were/are not honest people/lacked leadership skills</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.3 Comment on what Greta Thunberg meant by the statement, 'there is hope. I have seen it but it does not come from the governments or corporations. It comes from the people', in the context of dealing with challenges posed by climate change. (2)
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
                    <p>1. Ordinary people are showing greater interest/awareness in protecting the environment</p>
                    <p>2. Governments and big companies are only concerned with making profits against protecting the environment</p>
                    <p>3. Protests towards protecting the environment are led by ordinary people</p>
                    <p>4. There has been insufficient effort by leaders to make individuals aware of the threats to the environment</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.2.4 Explain the reliability of the source to a historian researching the climate change issues between 2000 and 2021. (2)
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
                    <p><strong>The source is RELIABLE because:</strong></p>
                    <p>1. It is extracted from a speech (direct information) by Greta Thunberg</p>
                    <p>2. The speech was presented by Greta Thunberg, a Swedish Environmental activist at the United Nations Committee of Parties conference</p>
                    <p>3. The speech was presented on 11 December 2011 during the COP25 climate conference</p>
                    <p>4. The speech addressed the thorny issue of the reluctance by most rich countries towards reducing their gas emissions as agreed in the previous conferences</p>
                    <p>5. The speech addressed a topical issue on the effects of climate change globally</p>
                    <p>6. The information in Source 3B can be corroborated by evidence in Source 3D regarding the issues about climate change</p>
                    <p>7. Any other relevant response</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3C</strong></p>
                <p>
                    The source below is an extract from the national statement made by the Indian Prime Minister, Shri Narendra Modi, at the COP26 Summit in Glasgow on 2 November 2021. It highlights how India was committed to honouring climate change programmes.
                </p>
                <p>
                    When I first came to Paris for the Climate Summit, it was not my intention to add one promise to the many promises already being made in the world. I came with a concern for humanity. I came as a representative of a culture that gave the message of 'Sarve Bhavantu Sukhinah', which means 'Happiness for All'. And so, for me the event in Paris was not a summit, it was a sentiment and a commitment. And India was not making those promises to the world, but crores (ten million) Indians were making those promises to themselves.
                </p>
                <p>
                    And I am happy that a developing country like India, which is working to lift crores of people out of poverty, and which is working day and night on the ease of living for crores of people, today, despite being 17% of the world's population, whose responsibility has been only 5 per cent in emissions, it has left no stone unturned to show that it has fulfilled its obligation.
                </p>
                <p>
                    Today the whole world believes that India is the only big economy which has delivered in letter and spirit on the Paris Commitment. We are making every effort with determination; and we are working hard and showing results. Today India is moving forward on the subject of climate with great courage and great ambition. India also understands the suffering of all other developing countries, shares them, and will continue to express their expectations.
                </p>
                <p>
                    For many developing countries, climate change is looming (threatening) large over their existence. We have to take big steps today to save the world. This is the need of the hour and this will also prove the relevance of this forum. I am confident that the decisions taken in Glasgow will save the future of our future generations, giving them the gift of a secure and prosperous life.
                </p>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.3.1 Give TWO concerns that the Indian Prime Minister, Shri Narendra Modi brought to the Paris Climate Summit. (2)
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
                    <p>1. 'a concern for humanity'</p>
                    <p>2. 'India was not making those promises to the world, but crores (ten million) Indians were making those promises to themselves'</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.3.2 Comment on the implication of the statement, 'for me the event in Paris was not a summit, it was a sentiment and a commitment', in the context of India's involvement in the Paris Climate Summit. (4)
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
                    <p>1. Modi did not consider the Paris Climate Summit as just another Conference – he valued it as a turning point</p>
                    <p>2. India's presence at the conference was an occasion where President Modi could display the honest feelings of his countrymen towards the environment</p>
                    <p>3. The Indian Prime Minister regarded the promises made as an undertaking towards protecting the environment that every effort should be put to ensure its success</p>
                    <p>4. Indians had a complete understanding of the devastation that climate change could cause to life</p>
                    <p>5. There was cooperation among Indians in their efforts towards protecting the environment</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.3.3 Explain the concept developing countries with reference to Brazil, India and South Africa. (2)
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
                    <p><strong>Refers to:</strong></p>
                    <p>1. Poor agricultural countries that are economically and socially developing</p>
                    <p>2. Countries that have fewer industrial as well as technical advanced facilities</p>
                    <p>3. Countries where the majority of the population earn a low or middle income</p>
                    <p>4. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.3.4 Why, according to the source, did the whole world believe that India is the only big economy that has delivered in letter and in spirit on the Paris commitment? Give TWO responses. (2)
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
                    <p>1. 'it has left no stone unturned to show that it has fulfilled its obligation'</p>
                    <p>2. 'we are making every effort with determination'</p>
                    <p>3. 'we are working hard and showing results'</p>
                    <p>4. 'India is moving forward on the subject of climate with great courage and great ambition'</p>
                    <p>5. 'India also understands the suffering of all other developing countries, shares them, and will continue to express their expectations'</p>
                </div>
            </div>

            <div className="source-material">
                <p><strong>SOURCE 3D</strong></p>
                <p>
                    This photograph by C Kampfner for The Times newspaper was taken outside the COP26 Summit held at Glasgow, Scotland, on 12 November 2012. It portrays a protest by Brazilians against their political leaders (Joaquim Leite, Minister of Environment, and Bolsonaro, Brazilian President) for not doing enough in protecting the Brazilian forests.
                </p>

                <div className="image-container">
                    <img
                        src="/images/SOURCE3DP222.png"
                        alt="Brazilian protest at COP26 Glasgow: 'Amazon Not For Sale' and 'Where is our Minister?'"
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
                  <p><strong>Image: Brazilian Climate Protest - COP26 Glasgow</strong></p>
                  <p>Brazilian protestors with banners: "Amazon Not For Sale" and "Where is our Minister?"</p>
                  <p><small>Place image file in: public/images/cop26-brazil-protest.jpg</small></p>
                  <div style="margin-top: 15px; font-size: 12px; color: #888;">
                    <p><strong>Image description:</strong></p>
                    <p>Brazilian protestors at COP26 summit in Glasgow holding banners that read:</p>
                    <p>"Amazon Not For Sale" - protesting deforestation and commercialization of the Amazon rainforest</p>
                    <p>"Where is our Minister?" - questioning the absence of Brazil's Environment Minister Joaquim Leite</p>
                    <p>Protest directed at President Jair Bolsonaro's environmental policies</p>
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
                        <em>Brazilian protest at COP26 Glasgow: "Amazon Not For Sale" - Protest against deforestation and government inaction on climate change</em>
                    </p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.1 Explain why you think this photograph that appeared in The Times newspaper on 12 November 2021 was taken. (2)
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
                    <p>1. To highlight the plight of people in Brazil regarding climate change effects</p>
                    <p>2. To protest the failure by Brazilian government officials in protecting their citizens against environmental threats</p>
                    <p>3. To highlight the failure of the United Nations' environment conventions to address the plight of people across the world</p>
                    <p>4. It is news worthy because it highlights Brazil's negligence of the Amazon and Caatinga forests</p>
                    <p>5. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.4.2 Using the information in the source and your own knowledge, comment on why Brazilians were concerned about the Amazon and Caatinga Forests. (4)
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
                    <p>1. Forests play an important role in preventing climate change (global warming)</p>
                    <p>2. The Caatinga forest was allowed to disappear due to officials who received (in exchange of what the forest produces) a few American dollars that did not benefit the nation</p>
                    <p>3. The forests were cleared for urbanisation and mining</p>
                    <p>4. Deforestation would destroy the natural habitat for animals and plants/ cause flooding and environmental destruction</p>
                    <p>5. Subsistence life of indigenous people living in the forests would be negatively affected</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.5 Use Source 3B and Source 3D. Explain how the information in Source 3B supports the evidence in Source 3D regarding the implementation of the climate change agreements. (4)
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
                    <p>1. In both sources leaders pledged to reduce emissions of greenhouse gases but they don't implement these agreements</p>
                    <p>2. In Source 3B Thunberg makes reference to lack of urgency in addressing climate change issues and in Source 3D Brazilian's protests against their political leaders for not working fast enough to protect their forests</p>
                    <p>3. Both sources refer to pressure from ordinary people against those in power</p>
                    <p>4. Hope for change through pressure from ordinary people referred to in Source 3B is evident through activism in Source 3D</p>
                    <p>5. Both sources highlight the importance of protecting the environment</p>
                    <p>6. Any other relevant response</p>
                </div>
            </div>

            <div className="subquestion">
                <div className="subquestion-text">
                    3.6 Using the information in the relevant sources and your own knowledge, write a paragraph of about EIGHT lines (about 80 words) explaining the commitment of developing countries of BRICS to global climate change issues between 2000 and 2021. (8)
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
                    <p>BRICS developing countries demonstrated varied commitment to climate change between 2000-2021. South Africa actively participated in UNFCCC frameworks and hosted COP17, establishing inter-ministerial committees for climate action. India showed strong commitment, fulfilling Paris Agreement obligations despite limited historical emissions, and integrating climate goals with development objectives. However, Brazil faced challenges, with public protests highlighting inadequate forest protection and government inaction. While institutional frameworks and international participation were established, implementation varied, with civil society pressure often needed to push climate agendas forward amid competing development priorities.</p>
                </div>
            </div>
        </div>
    );
};

export default Question3;

