import { useState } from 'react';

function normalizeAnswer(answer) {
    return answer.toLowerCase().trim().replace(/[.,!?]/g, '');
}

function checkAnswer(userAnswer, correctAnswers, marks) {
    if (!userAnswer) return { isCorrect: false, marks: 0 };
    userAnswer = normalizeAnswer(userAnswer);
    let isCorrect;
    if (Array.isArray(correctAnswers)) {
        isCorrect = correctAnswers.some(ans => normalizeAnswer(ans) === userAnswer);
    } else {
        isCorrect = normalizeAnswer(correctAnswers) === userAnswer;
    }
    return { isCorrect, marks: isCorrect ? marks : 0 };
}

function checkMultipleChoice(selected, correctValue, marks) {
    const isCorrect = selected === correctValue;
    return { isCorrect, marks: isCorrect ? marks : 0 };
}

const Question = ({ id, question, type, options, correctAnswers, marks, onAnswerChange, answerStatus }) => {
    const [showAnswer, setShowAnswer] = useState(false);
    const [value, setValue] = useState(type === 'radio' ? '' : '');
    const [isCorrect, setIsCorrect] = useState(null);

    const handleChange = (e) => {
        const newValue = type === 'radio' ? e.target.value : e.target.value;
        setValue(newValue);
        if (type === 'radio') {
            const result = checkMultipleChoice(newValue, correctAnswers, marks);
            setIsCorrect(result.isCorrect);
            onAnswerChange(id, result.marks, result.isCorrect);
        } else {
            const result = checkAnswer(newValue, correctAnswers, marks);
            setIsCorrect(result.isCorrect);
            onAnswerChange(id, result.marks, result.isCorrect);
        }
    };

    return (
        <div className="space-y-2">
            <p className="font-medium text-gray-800"><strong>{id}</strong> {question}</p>
            {type === 'radio' ? (
                <div className="space-y-2">
                    {options.map((opt, idx) => (
                        <label
                            key={idx}
                            className={`flex items-center ${answerStatus && (opt.value === correctAnswers ? 'correct' : (value === opt.value && !isCorrect) ? 'incorrect' : '')}`}
                        >
                            <input
                                type="radio"
                                name={id}
                                value={opt.value}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            {opt.text}
                        </label>
                    ))}
                </div>
            ) : type === 'text' ? (
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={handleChange}
                    className={`border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}
                />
            ) : (
                <textarea
                    id={id}
                    rows="4"
                    value={value}
                    onChange={handleChange}
                    className={`border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}
                />
            )}
            <div className="answer-display" style={{ display: showAnswer || answerStatus ? 'block' : 'none' }}>
                <p className="correct-answer"><strong>Correct Answer:</strong> {Array.isArray(correctAnswers) ? correctAnswers.join(' / ') : correctAnswers}</p>
            </div>
        </div>
    );
};

const SummaryQuestion = ({ onAnswerChange, answerStatus }) => {
    const [answers, setAnswers] = useState(Array(7).fill(''));
    const [wordCount, setWordCount] = useState(0);
    const [results, setResults] = useState(Array(7).fill(null));

    const correctAnswers = [
        'Support the global movement campaigning for reducing the use of plastic',
        'Use recyclable biodegradable bags that are eco-friendly',
        'Keep Have a cup that can be reused',
        'Use a glass stainless steel bottle',
        'Use glass steel bamboo straws',
        'Purchase ear buds lollipops with cardboard sticks',
        'Purchase sweets that are not individually wrapped and keep them in a jar'
    ];

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
        const words = newAnswers.reduce((count, ans) => count + (ans.trim() ? ans.trim().split(/\s+/).length : 0), 0);
        setWordCount(words);

        const newResults = [...results];
        const result = checkAnswer(value, correctAnswers, 1);
        newResults[index] = result.isCorrect;
        setResults(newResults);

        let points = newResults.filter(r => r).length;
        let verbatimQuotes = newAnswers.filter(ans => correctAnswers.includes(ans)).length;
        let languageMarks = 0;
        if (points >= 6) languageMarks = verbatimQuotes >= 6 ? 0 : 3;
        else if (points >= 4) languageMarks = verbatimQuotes >= 6 ? 0 : 2;
        else if (points >= 1) languageMarks = verbatimQuotes >= 6 ? 0 : 1;
        onAnswerChange('q2', points + languageMarks, newResults.every(r => r !== false));
    };

    return (
        <div>
            <p className="font-medium text-gray-800"><strong>QUESTION 2</strong> List SEVEN points on how to reduce plastic pollution in full sentences, using no more than 70 words. Number your sentences from 1 to 7. Use your OWN words as far as possible.</p>
            <div className="space-y-3 mt-4">
                {answers.map((answer, idx) => (
                    <div key={idx} className="flex items-center">
                        <label className="w-8">{idx + 1}.</label>
                        <input
                            type="text"
                            id={`q2_${idx + 1}`}
                            value={answer}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            className={`flex-1 border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 ${answerStatus && (results[idx] ? 'correct' : results[idx] === false ? 'incorrect' : '')}`}
                        />
                    </div>
                ))}
            </div>
            <p className="mt-3 text-gray-600">Word count: <span>{wordCount}</span> / 70</p>
            <div className="answer-display" style={{ display: answerStatus ? 'block' : 'none' }}>
                <p className="correct-answer"><strong>Correct Answers:</strong></p>
                <ol className="list-decimal pl-5">
                    {correctAnswers.map((ans, idx) => <li key={idx}>{ans}</li>)}
                </ol>
                <p className="text-gray-600"><strong>Note:</strong> 1 mark per correct point (7 marks). Language marks: 6-7 points correct = 3 marks; 4-5 points correct = 2 marks; 1-3 points correct = 1 mark. Verbatim quotes may reduce language marks.</p>
            </div>
        </div>
    );
};

const EnglishFALP12020 = () => {
    const [totalScore, setTotalScore] = useState(0);
    const [answers, setAnswers] = useState({});
    const [answerStatus, setAnswerStatus] = useState(false);

    const handleAnswerChange = (id, marks, isCorrect) => {
        setAnswers(prev => ({ ...prev, [id]: { marks, isCorrect } }));
    };

    const markAnswers = () => {
        let score = 0;
        for (const key in answers) {
            score += answers[key].marks;
        }
        setTotalScore(score);
        setAnswerStatus(true);
    };

    return (
        <div className="container mx-auto p-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">English First Additional Language P1 - November 2020</h1>
            <p className="mb-4 text-gray-700"><strong>Total Marks: 80</strong> | Time: 2 hours</p>
            <p className="mb-6 text-gray-600">Instructions: Answer all questions. For multiple-choice questions, select one option. For open-ended questions, provide detailed responses. Click "Mark Answers" to see your score and correct answers.</p>

            {/* SECTION A: Comprehension */}
            <section className="mb-10 section-card p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">SECTION A: Comprehension (30 marks)</h2>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">TEXT A: MANNERS MATTER</h3>
                    <p className="mt-2 text-gray-600">[Adapted from Sunday Times, Lifestyle, 27 January 2019]</p>
                    <p className="mt-2 text-gray-700">1 The Collins Dictionary defines 'Etiquette' as: 'The customs or rules governing behaviour regarded as correct or acceptable in social or official life'. This is related to how people behave in a particular group or in a specific setting.</p>
                    <p className="text-gray-700">2 When you show consideration for others, you display good manners. For example, speaking to other people sitting at the dinner table at a party is good manners. Writing a message or e-mail to the hosts of the dinner party the next day, expressing your gratitude for being invited, is polite. This would most likely lead to you being invited to their next dinner party.</p>
                    <p className="text-gray-700">3 Good manners have their origins in ancient history. For instance, it may be seen as hygienic to cover your mouth when yawning. However, centuries ago the act of yawning was believed to be the soul leaving one's body, allowing evil spirits to enter. The belief was that covering the mouth kept the soul inside the body. The habit of saying 'Bless you' when someone sneezes dates back to the time of Pope Gregory the First. He commanded that anyone who sneezed should be blessed in case they had contracted the plague, which was a deadly disease at that time.</p>
                    <p className="text-gray-700">4 Manners are often used as a means to judge people. For example, in Western culture, one is judged by the way one uses one's cutlery at the dinner table. However, there are some cultures that use their hands to eat their food.</p>
                    <p className="text-gray-700">5 In most African cultures, a child is expected to address adults with a certain level of formality, regardless of their relationship with them. Not using a title when addressing adults is considered to be highly insulting, yet in some cultures it is acceptable to address an adult by his or her first name. It is also a sign of respect not to look an elder in the eye but this may not necessarily be so in other cultures.</p>
                    <p className="text-gray-700">6 In Kenya and Nigeria, when greeting a person, it is the norm to ask about their general well-being. Skipping this part is considered very poor manners. In some cultures, presenting a gift to someone should be done with the right hand or both hands, but never with the left hand alone. The question is, whose manners are correct?</p>
                    <p className="text-gray-700">7 In a multicultural society like South Africa, the question of etiquette can be challenging when trying to understand one another. Therefore, with the many distinct cultural groups that make up this nation, the entire point of etiquette is to promote smooth social relations. If used correctly, manners can unite people rather than cause conflict. If not used correctly, different understandings of etiquette across cultures can affect everything from your relationship with others to your ability to get a job.</p>
                    <p className="text-gray-700">8 Research by a communication company, Commiceo, has found that there can be discrimination at job interviews due to differences in etiquette. The company noted how things such as eye contact or mentioning the names of important people during the interview, can be interpreted very differently. It further reports that while many cultures in Europe, North America and Asia emphasise the importance of punctuality, many other cultures do not engage in the same type of clock-watching.</p>
                    <p className="text-gray-700">9 To speak loudly and clearly may be viewed as a positive quality and not a sign of disrespect in the Western world. However, in many other countries, like Malaysia, people believe that speaking softly is a good quality. Therefore, instead of judging someone because they do something in a certain way, it is important to understand the reasons for their behaviour and actions.</p>
                    <p className="text-gray-700">10 We must remember that our ancestors developed etiquette over the years to foster social harmony and keep conflict at a minimum.</p>
                    <p className="text-gray-600"><strong>Glossary:</strong> *Etiquette - politeness or good manners</p>
                </div>
                <div className="space-y-6">
                    <Question
                        id="1.1"
                        question="Which ONE of the words below means the same as 'customs', as used in this context?"
                        type="radio"
                        options={[
                            { value: 'A', text: 'A Taxes' },
                            { value: 'B', text: 'B Duties' },
                            { value: 'C', text: 'C Habits' },
                            { value: 'D', text: 'D Levies' }
                        ]}
                        correctAnswers="C"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.2.1"
                        question="What is meant by 'consideration for others'?"
                        type="text"
                        correctAnswers={[
                            'To take into account the feelings of others',
                            'To show respect to others',
                            'To acknowledge others'
                        ]}
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.2.2"
                        question="Using your OWN words, explain why it is important to express gratitude to your hosts for being invited to their dinner party."
                        type="textarea"
                        correctAnswers="This is to show courtesy/good manners. This may result in being invited again."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.3.1"
                        question="Give an antonym for the word 'ancient'."
                        type="text"
                        correctAnswers={['modern', 'contemporary', 'recent', 'present']}
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.3.2"
                        question="State TWO beliefs in this paragraph that may not be relevant today."
                        type="textarea"
                        correctAnswers="The belief that when one yawns the soul leaves ones body. The belief that covering ones mouth when yawning prevents the entry of evil spirits to the body."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.4.1"
                        question="What do the words, 'address adults with a certain level of formality' (lines 20-21), suggest about the relationship between children and adults in African society?"
                        type="textarea"
                        correctAnswers="This indicates that in African society children have a respectful relationship with adults. The relationship is also a strict one."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.4.2"
                        question="Quote a SINGLE word which means the same as 'offensive'."
                        type="text"
                        correctAnswers="insulting"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.5.1"
                        question="Why does the writer refer to Kenya and Nigeria?"
                        type="textarea"
                        correctAnswers="To show the similarities in etiquette between Kenya and Nigeria. OR Kenya and Nigeria serve as examples of how people behave in some African countries. / The writer uses Kenya and Nigeria as examples to show how different and diverse manners can be across cultures and countries."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.5.2"
                        question="Why does the writer conclude paragraph 6 with a question?"
                        type="textarea"
                        correctAnswers="To get the reader to understand that manners may differ and that there are no right or wrong manners. OR This is a rhetorical question and the writer leaves it to the reader to arrive at a conclusion on whose manners are correct/ that different types of etiquette are acceptable."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.6"
                        question="Explain why the following statement is FALSE: A poor understanding of etiquette across different cultures only affects one's relationships with others."
                        type="textarea"
                        correctAnswers="Poor understanding of etiquette can also affect one's employment prospects."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.7.1"
                        question="Explain the findings of Commiceo in lines 40-43 ('... has found that interpreted very differently'). Use your OWN words."
                        type="textarea"
                        correctAnswers="A misunderstanding of an interviewee's manners can disadvantage him/her."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.7.2"
                        question="Explain what is meant by clock-watching."
                        type="textarea"
                        correctAnswers="A (high) regard for punctuality. / The strict adherence to time (is respected/revered in the workplace.)"
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.8.1"
                        question="Give TWO reasons why speaking loudly 'may be viewed as a positive quality in the Western world'."
                        type="textarea"
                        correctAnswers="Any TWO of: It may show confidence. It may show respect. It may indicate that one's message is conveyed clearly/with clarity."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.8.2"
                        question="Do you agree with the writer's views in lines 49-51 ('Therefore, instead of ... behaviour and actions') of this paragraph? Substantiate your answer."
                        type="textarea"
                        correctAnswers="Agree. The writer believes that there can be unity in diversity. To a large extent, people of different backgrounds have learned how to coexist in harmony because of their acceptance of one another's cultural practices and manners. OR Disagree. Not everyone is accepting of one another's cultural diversity. There are several instances in society, where the failure to accept the differences among cultures has led to conflict."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.9"
                        question="Discuss the suitability of the title, 'MANNERS MATTER'."
                        type="textarea"
                        correctAnswers="The title, 'MANNERS MATTER' is suitable because it summarises the fact that manners matter among different cultural groups and in different contexts. The passage also explores the conventions of behaviour that different cultures have to adhere to and that other cultures have to respect. OR The title is not suitable because it is not captivating enough. It creates the impression that the article is only about a set of manners whereas it also explores other ideas."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800">TEXT B</h3>
                        <img src="/public/images/Text_B.png" alt="Visual representation of statistics on average South African household expenditure" className="mt-2 rounded-lg shadow-md max-w-full" />
                        <p className="mt-2 text-gray-600">[Visual representation of statistics on average South African household expenditure.]</p>
                    </div>
                    <Question
                        id="1.10"
                        question="Identify the percentage that is spent on fast food by the average South African household."
                        type="text"
                        correctAnswers="2,11%"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.11"
                        question="What do the statistics suggest about the amount of money that is spent on education when compared to the expenditure on clothing and footwear?"
                        type="textarea"
                        correctAnswers="More money is spent on clothing and footwear than on education."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.12"
                        question="Why do the illustrations of wallets with arrows in the circle appear in this text? State TWO points."
                        type="textarea"
                        correctAnswers="The wallet with the arrow facing towards it, shows money coming in (income). The wallet with the arrow facing away from it shows money being spent (expenditure)."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="1.13"
                        question="Discuss whether a bar graph would be more effective in conveying the statistics for average South African household expenditure."
                        type="textarea"
                        correctAnswers="Yes. The given text is confusing. The bar graph would be easier to understand as the information would have been presented in order of the amount spent. OR No. The text is accessible as there are illustrations that are easy to understand."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                </div>
            </section>

            {/* SECTION B: Summary */}
            <section className="mb-10 section-card p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">SECTION B: Summary (10 marks)</h2>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">TEXT C: FINDING SOLUTIONS TO THE PLASTIC PROBLEM</h3>
                    <p className="mt-2 text-gray-600">[Adapted from Sawubona, October 2018]</p>
                    <p className="text-gray-700">Plastic pollution has a devastating effect on our planet. The South African World Wildlife Fund has started a campaign to show that by changing a few of our day-to-day choices, we can tackle the problem. When you support the campaign, you become part of a global movement that uses less plastic.</p>
                    <p className="text-gray-700">Plastic shopping bags cause serious damage to the environment and to sea creatures like turtles. The alternative is to use strong, reusable bags that are made of environmentally friendly materials.</p>
                    <p className="text-gray-700">Globally, over 100 billion plastic cups or those that have a plastic lining are discarded every year. Rather carry your own reusable cup or mug. It takes 26 litres of water to produce a one-litre bottle made out of plastic. A refillable glass or stainless steel bottle is a better choice.</p>
                    <p className="text-gray-700">Plastic straws cause the death of birds and fish when eaten. Instead, use reusable straws made of glass, steel or bamboo. Nowadays, plastic lollipop sticks and ear buds cause a similar problem as straws when swallowed by marine creatures. There are brands of lollipops and ear buds available where the sticks are made of cardboard. These are better alternatives to buy.</p>
                    <p className="text-gray-700">A huge amount of plastic sweet wrappers are found in our rivers, lakes and seas. It makes sense to buy unwrapped sweets and store them in a glass jar. Unrecyclable containers, sauce packets and plastic cutlery used in the takeaway industry add to the plastic problem. Avoid using these items. It is important for each of us to join the battle against plastic pollution.</p>
                </div>
                <SummaryQuestion onAnswerChange={handleAnswerChange} answerStatus={answerStatus} />
            </section>

            {/* SECTION C: Language */}
            <section className="mb-10 section-card p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">SECTION C: Language (40 marks)</h2>
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800">QUESTION 3: ANALYSING AN ADVERTISEMENT</h3>
                    <h4 className="text-lg font-semibold mt-2 text-gray-700">TEXT D</h4>
                    <img src="/public/images/Text_D.png" alt="Advertisement featuring four bottles of Plush Supreme All Purpose Cream" className="mt-2 rounded-lg shadow-md max-w-full" />
                    <p className="text-gray-700">The secret to a cleaner, fresher home</p>
                    <p className="text-gray-700">From floors to counters and stoves to showers, you can rely on the new Plush Supreme All Purpose Cream to remove dirt and grime and leave all your surfaces sparkling clean again.</p>
                    <p className="text-gray-600">[Visual: Four bottles of Plush Supreme Cream, a lady with her finger on her lips.]</p>
                </div>
                <div className="space-y-6">
                    <Question
                        id="3.1"
                        question="Who is the target audience in this advertisement?"
                        type="text"
                        correctAnswers={[
                            'People who want to clean their homes',
                            'Home executives',
                            'Domestic helpers'
                        ]}
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="3.2"
                        question="Why has the advertiser included four bottles of Plush Supreme Cream?"
                        type="text"
                        correctAnswers="To indicate that Plush Supreme comes in four different fragrances/varieties."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="3.3"
                        question="How is the word, 'Supreme', intended to influence the reader?"
                        type="textarea"
                        correctAnswers="It suggests that this product is superior to other similar products/is the best 'all purpose cleaner' on the market. OR The word 'Supreme' is written in capital/bold/in a white colour to attract the reader's attention."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="3.4"
                        question="How does the advertiser reinforce the idea that Plush Supreme is an all-purpose cleaner?"
                        type="textarea"
                        correctAnswers="The advertiser states that the product can be used to clean various surfaces (floors, counters, stoves, showers). OR The words All Purpose are written in bold and the visual shows different surfaces."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="3.5"
                        question="Quote a SINGLE word from the body copy which means the same as 'glittering'."
                        type="text"
                        correctAnswers="sparkling"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="3.6"
                        question="How can the reader get more information about the advertised product? State TWO points."
                        type="textarea"
                        correctAnswers="Visit the website/www.plush.co.za Facebook/@PlushSA"
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="3.7"
                        question="In your view, is the visual of the lady effective in conveying the message of the advertisement? Substantiate your answer."
                        type="textarea"
                        correctAnswers="Yes. The lady has her finger on her lips suggesting secrecy. The headline of the advertisement suggests the sharing of a secret about the product that can be used to have a cleaner, fresher home. OR No. The visual is not effective because it has a fragile link with the written content of the advertisement. The visual of the lady has nothing to do with the effectiveness of the cleaning product."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">QUESTION 4: ANALYSING A CARTOON</h3>
                    <h4 className="text-lg font-semibold mt-2 text-gray-700">TEXT E: CALVIN AND HOBBES</h4>
                    <img src="/public/images/Text_E.png" alt="Calvin and Hobbes cartoon" className="mt-2 rounded-lg shadow-md max-w-full" />
                    <p className="text-gray-600">[Cartoon featuring a boy named Calvin and his mother. In FRAME 1, Calvin's mother asks him to fetch her purse, and he says, 'SURE'. In FRAME 3, Calvin says, 'AHEM'. In FRAME 4, Calvin is angry, saying, 'Huh' and threatening not to fetch anything again, while his mother shouts with a wide-open mouth, raised eyebrows, and bold text with double exclamation marks.]</p>
                </div>
                <div className="space-y-6">
                    <Question
                        id="4.1.1"
                        question="In the context of this cartoon, the word 'purse' means ..."
                        type="radio"
                        options={[
                            { value: 'A', text: 'A Cellphone' },
                            { value: 'B', text: 'B Handbag' },
                            { value: 'C', text: 'C Suitcase' },
                            { value: 'D', text: 'D Laptop' }
                        ]}
                        correctAnswers="B"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="4.1.2"
                        question="What is Calvin's mother doing in this frame?"
                        type="textarea"
                        correctAnswers="She is working at her desk. / She is doing some written work. / She is doing some calculations. / She is talking to Calvin. / She is looking at Calvin."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="4.2"
                        question="Explain why Calvin says, 'AHEM'."
                        type="textarea"
                        correctAnswers="Calvin is trying to get his mother's attention from whom he wants money for fetching her purse."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="4.3.1"
                        question="Explain how Calvin's attitude in FRAME 4 is a contrast to his attitude in FRAME 1."
                        type="textarea"
                        correctAnswers="In Frame 1, Calvin obligingly/obediently accedes to his mother's request to fetch her purse (by saying the word, 'SURE'.) In Frame 4 he scowls/has an angry expression on his face/(says, 'Huh' and threatens not to fetch anything for his mother again.)"
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="4.3.2"
                        question="How does the cartoonist use a visual and a verbal clue to convey the mother's feelings in FRAME 4?"
                        type="textarea"
                        correctAnswers="Visual: Her mouth is wide-open (showing that she is shouting). / Her eyebrows are raised. / She is leaning forward. Verbal: Her words are written in a larger/bolder font. / Double exclamation marks are used."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="4.4"
                        question="Do you think Calvin's behaviour is justified in this cartoon? Substantiate your answer."
                        type="textarea"
                        correctAnswers="No. Calvin has an insincere/rude/disrespectful attitude towards his mother. He should not have expected money for assisting his mother. His behaviour is therefore highly inappropriate/unacceptable. OR Yes. Calvin has done his mother a favour, therefore she should have tipped him. Consequently, he is justified in being angry."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                </div>
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800">QUESTION 5: LANGUAGE AND EDITING SKILLS</h3>
                    <h4 className="text-lg font-semibold mt-2 text-gray-700">TEXT F: HAKUNA MATATA</h4>
                    <p className="text-gray-600">[Adapted from Juice, November 2018]</p>
                    <p className="text-gray-700">1 From the moment you set foot out of the aeroplane in Zanzibar, you are warmly welcomed - not only by the warm tropical breeze, but also by the people themselves.</p>
                    <p className="text-gray-700">2 'Welcome in our island. Hakuna matata'. That is the welcome you recieve wherever you go.</p>
                    <p className="text-gray-700">3 At first I thought the locals where just trying to relate to tourists because they knew we really liked Disney's, The Lion King. However, I soon realised that hakuna matata is truly the way they go about living their lives.</p>
                    <p className="text-gray-700">4 In fact, when I think back, not once did we see a Zanzibari person get stressed or angry during our stay. Not when our taxi drivers would get stuck in traffic; not when stubborn goats wouldnt move out of the road. Not a single frown!</p>
                    <p className="text-gray-700">5 They just smile and say: 'No worries - hakuna matata'. What a way to live. Never have I seen such a community spirit.</p>
                </div>
                <div className="space-y-6">
                    <div>
                        <p className="font-medium text-gray-800"><strong>5.1.1</strong> Correct the SINGLE error in EACH of the following sentences. Write down ONLY the question numbers and the words you have corrected.</p>
                        <p className="text-gray-700">(a) Welcome in our island.</p>
                        <Question
                            id="5.1.1_a"
                            question=""
                            type="text"
                            correctAnswers="(a) to"
                            marks={1}
                            onAnswerChange={handleAnswerChange}
                            answerStatus={answerStatus}
                        />
                        <p className="text-gray-700">(b) That is the welcome you recieve wherever you go.</p>
                        <Question
                            id="5.1.1_b"
                            question=""
                            type="text"
                            correctAnswers="(b) receive"
                            marks={1}
                            onAnswerChange={handleAnswerChange}
                            answerStatus={answerStatus}
                        />
                        <p className="text-gray-700">(c) At first I thought the locals where just trying to relate to tourists because they knew we really liked Disney's, The Lion King.</p>
                        <Question
                            id="5.1.1_c"
                            question=""
                            type="text"
                            correctAnswers="(c) were"
                            marks={1}
                            onAnswerChange={handleAnswerChange}
                            answerStatus={answerStatus}
                        />
                        <p className="text-gray-700">(d) Not when our taxi drivers would get stuck in traffic; not when stubborn goats wouldnt move out of the road.</p>
                        <Question
                            id="5.1.1_d"
                            question=""
                            type="text"
                            correctAnswers="(d) wouldn't / would not"
                            marks={1}
                            onAnswerChange={handleAnswerChange}
                            answerStatus={answerStatus}
                        />
                    </div>
                    <Question
                        id="5.1.2"
                        question="Rewrite the following sentence in the passive voice: The people of Zanzibar extended a warm welcome to the tourists."
                        type="textarea"
                        correctAnswers="A warm welcome was extended to the tourists by the people of Zanzibar. OR The tourists were extended a warm welcome by the people of Zanzibar."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="5.1.3"
                        question="Combine the following sentences into a single sentence: My family and I stepped out of the aeroplane in Zanzibar. My family and I were welcomed with fresh flowers. Begin with: When my family and I ..."
                        type="textarea"
                        correctAnswers="When my family and I (had) stepped out of the aeroplane in Zanzibar, we were welcomed with fresh flowers."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="5.1.4"
                        question="Give the correct degree of comparison in the following sentence: Some tourists are (friendly) than others."
                        type="text"
                        correctAnswers="friendlier / more friendly"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="5.1.5"
                        question="Rewrite the following sentence in the simple past tense: Zanzibari taxi drivers encounter many obstacles on the roads."
                        type="text"
                        correctAnswers="Zanzibari taxi drivers encountered many obstacles on the roads."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="5.1.6"
                        question="Complete the following tag question: Hakuna matata means 'no worries', ...?"
                        type="text"
                        correctAnswers="doesn't it / does it not"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="5.1.7"
                        question="Rewrite the following sentence in reported speech: 'I have never seen such a community spirit,' said the tourist."
                        type="textarea"
                        correctAnswers="The tourist said that he/she had never seen such a community spirit."
                        marks={2}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <div>
                        <h4 className="text-lg font-semibold mt-2 text-gray-700">TEXT G</h4>
                        <img src="/public/images/Text_G.png" alt="Text G: Supermarkets offer a wide variant of hot beverages. Dhania makes a soothing cup of hot chocolate. Mothers dress their children warmly. The weather is extremely cold this winter. Pupils are allowed to wear scarf to school in winter." className="mt-2 rounded-lg shadow-md max-w-full" />
                    </div>
                    <Question
                        id="5.2.1"
                        question="Give the correct form of the word in brackets: Supermarkets offer a wide (variant) of hot beverages."
                        type="text"
                        correctAnswers="variety"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="5.2.2"
                        question="Rewrite the following sentence in the negative form: Dhania makes a soothing cup of hot chocolate."
                        type="text"
                        correctAnswers="Dhania does not make a soothing cup of hot chocolate."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <div>
                        <p className="font-medium text-gray-800"><strong>5.2.3</strong> State the part of speech of EACH of the underlined words used in the context of this sentence: Mothers <u>dress</u> their children <u>warmly</u>.</p>
                        <p className="text-gray-700">dress: <Question
                            id="5.2.3_dress"
                            question=""
                            type="text"
                            correctAnswers="verb"
                            marks={1}
                            onAnswerChange={handleAnswerChange}
                            answerStatus={answerStatus}
                        /></p>
                        <p className="text-gray-700">warmly: <Question
                            id="5.2.3_warmly"
                            question=""
                            type="text"
                            correctAnswers="adverb"
                            marks={1}
                            onAnswerChange={handleAnswerChange}
                            answerStatus={answerStatus}
                        /></p>
                    </div>
                    <Question
                        id="5.2.4"
                        question="Use a homonym for the word cold in a sentence of your own."
                        type="textarea"
                        correctAnswers="One can catch a cold in winter. / Jim's attitude towards his neighbour was cold."
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                    <Question
                        id="5.2.5"
                        question="Give the plural form of the underlined word in the following sentence: Pupils are allowed to wear <u>scarf</u> to school in winter."
                        type="text"
                        correctAnswers="scarves / scarfs"
                        marks={1}
                        onAnswerChange={handleAnswerChange}
                        answerStatus={answerStatus}
                    />
                </div>
            </section>

            <div className="mt-8 flex items-center space-x-4">
                <button onClick={markAnswers} className="btn-primary text-white px-6 py-2 rounded-md font-medium">Mark Answers</button>
                <p className="text-gray-800"><strong>Your Score:</strong> <span>{totalScore}</span> / 80</p>
            </div>
        </div>
    );
};

export default EnglishFALP12020;