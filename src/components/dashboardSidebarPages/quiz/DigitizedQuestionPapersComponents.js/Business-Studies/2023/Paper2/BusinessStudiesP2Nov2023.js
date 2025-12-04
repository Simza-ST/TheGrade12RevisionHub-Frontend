import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function normalizeAnswer(answer) {
    return answer.toLowerCase().trim().replace(/[.,!?]/g, '');
}

function checkAnswer(userAnswer, correctAnswers, marks) {
    if (!userAnswer) return { isCorrect: false, marks: 0 };
    userAnswer = normalizeAnswer(userAnswer);
    let isCorrect;
    let awardedMarks;
    if (Array.isArray(correctAnswers)) {
        const userList = userAnswer.split(/[,;\n]/).map(s => normalizeAnswer(s)).filter(Boolean);
        awardedMarks = userList.reduce((sum, u) => sum + (correctAnswers.some(ans => normalizeAnswer(ans) === u) ? 1 : 0), 0);
        isCorrect = awardedMarks > 0;
        awardedMarks = Math.min(awardedMarks, marks);
    } else {
        isCorrect = normalizeAnswer(correctAnswers) === userAnswer;
        awardedMarks = isCorrect ? marks : 0;
    }
    return { isCorrect, marks: awardedMarks };
}

function checkMultipleChoice(selected, correctValue, marks) {
    const isCorrect = selected === correctValue;
    return { isCorrect, marks: isCorrect ? marks : 0 };
}

const Question = ({ id, question, type, options, correctAnswers, marks, onAnswerChange, answerStatus }) => {
    const [value, setValue] = useState(type === 'radio' || type === 'select' ? '' : '');
    const [isCorrect, setIsCorrect] = useState(null);
    const [awardedMarks, setAwardedMarks] = useState(0);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        let result;
        if (type === 'radio' || type === 'select') {
            result = checkMultipleChoice(newValue, correctAnswers, marks);
        } else {
            result = checkAnswer(newValue, correctAnswers, marks);
        }
        setIsCorrect(result.isCorrect);
        setAwardedMarks(result.marks);
        onAnswerChange(id, result.marks, result.isCorrect);
    };

    return (
        <div className="space-y-2">
            <p className="font-medium text-[var(--text-primary)]"><strong>{id}</strong> {question}</p>
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
                                className="mr-2 accent-[var(--accent-primary)]"
                            />
                            {opt.text}
                        </label>
                    ))}
                </div>
            ) : type === 'select' ? (
                <select value={value} onChange={handleChange} className={`form-input ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}>
                    <option value="">Select</option>
                    {options.map((opt, idx) => (
                        <option key={idx} value={opt.value}>{opt.value}</option>
                    ))}
                </select>
            ) : type === 'text' ? (
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={handleChange}
                    className={`form-input ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}
                />
            ) : (
                <textarea
                    id={id}
                    rows="4"
                    value={value}
                    onChange={handleChange}
                    className={`form-input ${answerStatus && (isCorrect ? 'correct' : isCorrect === false ? 'incorrect' : '')}`}
                />
            )}
            {answerStatus && (
                <p className="text-[var(--text-secondary)] text-sm">
                    <strong>Correct Answer:</strong> {Array.isArray(correctAnswers) ? correctAnswers.join(' / ') : correctAnswers}<br />
                    <strong>Awarded:</strong> {awardedMarks} / {marks}
                </p>
            )}
        </div>
    );
};

Question.propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['radio', 'select', 'text', 'textarea']).isRequired,
    options: PropTypes.array,
    correctAnswers: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
    marks: PropTypes.number.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    answerStatus: PropTypes.bool.isRequired,
};

const ListQuestion = ({ id, question, numItems, correctAnswers, marks, onAnswerChange, answerStatus }) => {
    const [answers, setAnswers] = useState(Array(numItems).fill(''));
    const [results, setResults] = useState(Array(numItems).fill(null));

    const handleChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);

        const normalizedUserAnswers = newAnswers.map(ans => normalizeAnswer(ans)).filter(Boolean);
        const normalizedCorrect = correctAnswers.map(ans => normalizeAnswer(ans));
        let awarded = 0;
        const matched = new Set();

        normalizedUserAnswers.forEach(userAns => {
            if (!matched.has(userAns) && normalizedCorrect.some(correct => correct === userAns)) {
                awarded++;
                matched.add(userAns);
            }
        });

        awarded = Math.min(awarded, marks);

        // For individual feedback, check if each user answer matches any correct
        const newResults = normalizedUserAnswers.map(userAns => normalizedCorrect.some(correct => correct === userAns));
        setResults(newResults);

        onAnswerChange(id, awarded, awarded === marks);
    };

    return (
        <div>
            <p className="font-medium text-[var(--text-primary)]"><strong>{id}</strong> {question}</p>
            <div className="space-y-3 mt-4">
                {answers.map((answer, idx) => (
                    <div key={idx} className="flex items-center">
                        <label className="w-8 text-[var(--text-primary)]">{idx + 1}.</label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => handleChange(idx, e.target.value)}
                            className={`form-input flex-1 ${answerStatus && (results[idx] ? 'correct' : results[idx] === false ? 'incorrect' : '')}`}
                        />
                    </div>
                ))}
            </div>
            {answerStatus && (
                <div className="mt-4">
                    <p className="text-[var(--text-secondary)]"><strong>Correct Answers:</strong></p>
                    <ol className="list-decimal pl-5 text-[var(--text-secondary)]">
                        {correctAnswers.map((ans, idx) => <li key={idx}>{ans}</li>)}
                    </ol>
                </div>
            )}
        </div>
    );
};

ListQuestion.propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    numItems: PropTypes.number.isRequired,
    correctAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    marks: PropTypes.number.isRequired,
    onAnswerChange: PropTypes.func.isRequired,
    answerStatus: PropTypes.bool.isRequired,
};

const Timer = ({ initialMinutes = 120 }) => {
    const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (timeLeft > 0 && isActive) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            alert('Time is up!');
        }
    }, [timeLeft, isActive]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="timer">
            <div className="text-right font-bold text-red-600">
                Time Left: {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
        </div>
    );
}

const BusinessStudiesP2Nov2023 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
    const [totalScore, setTotalScore] = useState(0);
    const [answers, setAnswers] = useState({});
    const [sectionScores, setSectionScores] = useState({ A: 0, B: 0, C: 0 });
    const [answerStatus, setAnswerStatus] = useState(false);
    const [selectedSectionB, setSelectedSectionB] = useState([]); // Track which two of Q2,3,4 selected
    const [selectedSectionC, setSelectedSectionC] = useState(''); // Q5 or Q6

    const handleAnswerChange = (id, awardedMarks, isCorrect) => {
        setAnswers(prev => ({ ...prev, [id]: { awardedMarks, isCorrect } }));
    };

    const markAnswers = () => {
        let scoreA = 0;
        let scoreB = 0;
        let scoreC = 0;
        let total = 0;

        for (const key in answers) {
            const marks = answers[key].awardedMarks;
            total += marks;

            // Determine section based on id
            if (key.startsWith('1.')) {
                scoreA += marks;
            } else if (key.startsWith('2.') || key.startsWith('3.') || key.startsWith('4.')) {
                scoreB += marks;
            } else if (key === '5' || key === '6') {
                scoreC += marks;
            }
        }

        setSectionScores({ A: scoreA, B: scoreB, C: scoreC });
        setTotalScore(total);
        setAnswerStatus(true);
    };

    const notificationCount = notifications.filter((n) => !n.read).length;

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    };

    return (
        <div className="flex min-h-screen bg-[var(--bg-primary)]">

            {/* Global styles */}
            <style>
                {`
                    * {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                    }
                    .form-input {
                        width: 100%;
                        padding: 8px;
                        border: 1px solid var(--border-color, #ccc);
                        border-radius: 4px;
                        font-size: 14px;
                    }
                    .pdf-header h2 { background-color: yellow; display: inline-block; padding: 5px; border: 1px solid black; }
                    .pdf-header { border: 2px solid black; padding: 20px; margin-bottom: 20px; text-align: center; position: relative; background: white; align-items: center; justify-content: center; }
                    .pdf-header h1 { font-size: 18pt; font-weight: bold; margin: 10px 0; }
                    .scenario { border: 1px solid black; padding: 10px; margin: 10px 0; background: #f9f9f9; }
                    body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; }
                    .form-input.correct {
                        border-color: var(--green, #28a745);
                        background-color: rgba(40, 167, 69, 0.1);
                    }
                    .form-input.incorrect {
                        border-color: var(--red, #dc3545);
                        background-color: rgba(220, 53, 69, 0.1);
                    }
                    label.correct {
                        color: var(--green, #28a745);
                    }
                    label.incorrect {
                        color: var(--red, #dc3545);
                    }
                    .btn-primary {
                        background-color: var(--accent-primary, #007bff);
                        color: white;
                        padding: 10px 20px;
                        border-radius: 4px;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-primary:disabled {
                        background-color: #6c757d;
                        cursor: not-allowed;
                    }
                    .text-[var(--text-primary)] {
                        color: var(--text-primary, #333);
                    }
                    .text-[var(--text-secondary)] {
                        color: var(--text-secondary, #666);
                    }
                    .bg-[var(--bg-primary)] {
                        background-color: var(--bg-primary, #f4f4f4);
                    }
                    .bg-[var(--bg-secondary)] {
                        background-color: var(--bg-secondary, #fff);
                    }
                    .bg-opacity-95 {
                        background-color: var(--bg-secondary, #fff);
                    }
                    .backdrop-blur-sm {
                        backdrop-filter: blur(5px);
                    }
                    .shadow-[var(--shadow)] {
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .rounded-2xl {
                        border-radius: 16px;
                    }
                    .pdf-table { width: 100%; border-collapse: collapse; border: 1px solid black; }
                .pdf-table th, .pdf-table td { border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; }
                    .timer { 
                    position: fixed; 
                    top: 10px; 
                    right: 10px; 
                    background: white; 
                    padding: 10px; 
                    border: 1px solid black; 
                    z-index: 1000; }
                    .p-6 {
                        padding: 24px;
                    }
                    .sm\\:p-8 {
                        padding: 32px;
                    }
                    .font-medium {
                        font-weight: 500;
                    }
                    .font-semibold {
                        font-weight: 600;
                    }
                    .font-bold {
                        font-weight: 700;
                    }
                    .text-3xl {
                        font-size: 24px;
                    }
                    .text-2xl {
                        font-size: 20px;
                    }
                    .text-xl {
                        font-size: 18px;
                    }
                    .text-lg {
                        font-size: 16px;
                    }
                    .text-sm {
                        font-size: 12px;
                    }
                    .flex {
                        display: flex;
                    }
                    .flex-1 {
                        flex: 1;
                    }
                    .min-h-screen {
                        min-height: 100vh;
                    }
                    .min-w-0 {
                        min-width: 0;
                    }
                    .items-center {
                        align-items: center;
                    }
                    .justify-center {
                        justify-content: center;
                    }
                    .justify-between {
                        justify-content: space-between;
                    }
                    .gap-4 {
                        gap: 16px;
                    }
                    .list-decimal {
                        list-style-type: decimal;
                    }
                    .pl-5 {
                        padding-left: 20px;
                    }
                    .mr-2 {
                        margin-right: 8px;
                    }
                    .w-8 {
                        width: 32px;
                    }
                    .accent-[var(--accent-primary)] {
                        accent-color: var(--accent-primary, #007bff);
                    }
                    .relative {
                        position: relative;
                    }
                    .absolute {
                        position: absolute;
                    }
                    .-top-2 {
                        top: -8px;
                    }
                    .-right-2 {
                        right: -8px;
                    }
                    .bg-[var(--accent-secondary)] {
                        background-color: var(--accent-secondary, #ff6b6b);
                    }
                    .text-[var(--text-white)] {
                        color: var(--text-white, #fff);
                    }
                    .text-xs {
                        font-size: 10px;
                    }
                    .rounded-full {
                        border-radius: 9999px;
                    }
                    .h-5 {
                        height: 20px;
                    }
                    .pdf-section { border: 1px solid black; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; }
                    .page-break { page-break-before: always; }
                    .w-5 {
                        width: 20px;
                    }
                    .hover\\:bg-[var(--hover-tertiary)]:hover {
                        background-color: var(--hover-tertiary, #e0e0e0);
                    }
                    .transition-colors {
                        transition: background-color 0.2s ease;
                    }
                    .duration-200 {
                        transition-duration: 200ms;
                    }
                    pdf-header .header-text { 
                   flex-1;
                    text-align: center; 
                    margin-left: 120px; 
                    }
                    .coat-of-arms { width: 100px; height: auto; }
                    .score-breakdown { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
                    .score-item { text-align: center; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
                `}
            </style>

            <div className="flex-1 min-w-0 p-6 sm:p-8">
                <div className="pdf-header">
                    <img
                        src="/images/coatOfArm.png"
                        alt="Coat of Arms of South Africa"
                        className="coat-of-arms absolute top-4 left-4"
                        style={{position: 'relative', top: '1px', left: '405px'}}
                    />
                    <div className="header-text">
                        <strong>basic education</strong>
                        <br/>Department:<br/>
                        Basic Education<br/>
                        <strong>Republic of South Africa</strong>
                    </div>
                    <h1>NATIONAL SENIOR CERTIFICATE</h1>
                    <h2>Business Studies P2 November 2023</h2>
                    <p><strong>MARKS: 150</strong><br/><strong>TIME: 2 hours</strong></p>
                    <p>This question paper consists of 9 pages.</p>
                </div>
                <Timer/>
                <div className="pdf-section page-break">
                    <h2 style={{
                        fontSize: '14pt',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>INSTRUCTIONS AND INFORMATION</h2>
                    <ol>
                        <li>This question paper consists of THREE sections and covers TWO main topics.<br />
                            <strong>SECTION A: COMPULSORY</strong><br />
                            <strong>SECTION B:</strong> Consists of THREE questions. Answer any TWO of the three questions in this section.<br />
                            <strong>SECTION C:</strong> Consists of TWO questions. Answer any ONE of the two questions in this section.</li>
                        <li>Read the instructions for each question carefully and take note of what is required.<br />
                            Note that ONLY the answers to the first TWO questions selected in SECTION B and the answers to the FIRST question selected in SECTION C will be marked.</li>
                        <li>Number the answers correctly according to the numbering system used in this question paper. NO marks will be awarded for answers that are numbered incorrectly.</li>
                        <li>Except where other instructions are given, answers must be written in full sentences.</li>
                        <li>Use the mark allocation and nature of each question to determine the length and depth of an answer.</li>
                        <li>Use the table below as a guide for mark and time allocation when answering each question.</li>
                    </ol>
                    <table className="pdf-table mt-4">
                        <thead>
                        <tr><th>SECTION</th><th>QUESTION</th><th>MARKS</th><th>TIME (minutes)</th></tr>
                        </thead>
                        <tbody>
                        <tr><td>A: Objective-type questions</td><td>COMPULSORY</td><td>1</td><td>30</td><td>20</td></tr>
                        <tr><td>B: THREE direct/indirect-type questions</td><td>CHOICE: Answer any TWO.</td><td>2</td><td>40</td><td rowSpan="3">70</td></tr>
                        <tr><td></td><td>3</td><td>40</td></tr>
                        <tr><td></td><td>4</td><td>40</td></tr>
                        <tr><td>C: TWO essay-type questions</td><td>CHOICE: Answer any ONE.</td><td>5</td><td>40</td><td rowSpan="2">30</td></tr>
                        <tr><td></td><td>6</td><td>40</td></tr>
                        <tr><td colSpan="3"></td><td>TOTAL</td><td>150</td><td>120</td></tr>
                        </tbody>
                    </table>
                    <ol start="7">
                        <li>Begin the answer to EACH question on a NEW page, e.g. QUESTION 1 – new page, QUESTION 2 – new page.</li>
                        <li>You may use a non-programmable calculator.</li>
                        <li>Write neatly and legibly.</li>
                    </ol>
                </div>
                <div className="bg-[var(--bg-secondary)] bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-[var(--shadow)]">
                    <p className="mb-6 text-[var(--text-secondary)]">Instructions: Answer all in Section A. Choose any TWO in Section B. Choose ONE in Section C. For MCQ, select option. For open-ended, provide responses. Click "Mark Answers" to see score and correct answers. Essays require manual grading.</p>
                    {/* Section A: Compulsory */}
                    <div className="pdf-section page-break">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION A: COMPULSORY (30 marks)</h2>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 1</h3>
                        <div className="space-y-6">
                            <div>
                                <Question
                                    id="1.1.1"
                                    question="Mandla applied the … leadership theory when he encouraged his team to be creative when dealing with drastic changes in a dynamic work environment"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. situational' },
                                        { value: 'B', text: 'B. leaders and followers' },
                                        { value: 'C', text: 'C. transformational' },
                                        { value: 'D', text: 'D. transactional' }
                                    ]}
                                    correctAnswers="C"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.2"
                                    question="The directors of a … company are jointly and severally responsible for the debts of the business."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. non-profit' },
                                        { value: 'B', text: 'B. personal liability' },
                                        { value: 'C', text: 'C. state-owned' },
                                        { value: 'D', text: 'D. private' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.3"
                                    question="The principal amount remains the same for the duration of the investment period when calculating … earned."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. simple interest' },
                                        { value: 'B', text: 'B. capital gain' },
                                        { value: 'C', text: 'C. compound interest' },
                                        { value: 'D', text: 'D. dividends' }
                                    ]}
                                    correctAnswers="A"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.4"
                                    question="Employees of Ntsako Trading used the internet facilities of the business after working hours without permission. This refers to … as a type of unprofessional business practice"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. unproductive employees' },
                                        { value: 'B', text: 'B. abuse of work time' },
                                        { value: 'C', text: 'C. difficult employees' },
                                        { value: 'D', text: 'D. unauthorised use of workplace funds and resources' }
                                    ]}
                                    correctAnswers="D"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.5"
                                    question="Businesses develop counselling programmes and train counsellors as a strategy to deal with … as a socio-economic issue."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. poverty' },
                                        { value: 'B', text: 'B. HIV/Aids' },
                                        { value: 'C', text: 'C. inclusivity' },
                                        { value: 'D', text: 'D. unemployment' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>

                            <div>
                                <p className="mb-6 text-[var(--text-secondary)]">
                                    1.2 Complete the following statements by using the word(s) provided in the list
                                    below. Write only the word(s) next to the question numbers (1.2.1 to 1.2.5)
                                </p>
                                <p className="scenario">
                                    planet;    expert;    cooperative;    over-insured;    decision-making;
                                    partnership;    under-insured;    problem-solving;    complainer;    people
                                </p>
                                <Question
                                    id="1.2.1"
                                    question="The average clause is applied when assets are … to determine the amount that will be paid to the insured."
                                    type="text"
                                    correctAnswers="under-insured"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.2"
                                    question="The … as a form of ownership has no legal personality and lacks continuity."
                                    type="text"
                                    correctAnswers="partnership"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.3"
                                    question="Fuze Enterprises focuses on … as a triple bottom-line element by participating in projects aimed at uplifting communities."
                                    type="text"
                                    correctAnswers="people"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.4"
                                    question="A manager considers various alternatives before selecting the best one. This is known as …"
                                    type="text"
                                    correctAnswers="decision-making"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.5"
                                    question="Tim, the supervisor, is firm and assertive when dealing with a/an … as a type of difficult personality."
                                    type="text"
                                    correctAnswers="expert"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>

                            <div>
                                <p className="mb-6 text-[var(--text-secondary)]">
                                    1.3 Choose a description from COLUMN B that matches a term in COLUMN A.
                                    Write only the letter (A–J) next to the question numbers (1.3.1 to 1.3.5)
                                </p>
                                <table className="pdf-table">
                                    <thead>
                                    <tr>
                                        <th>COLUMN A</th>
                                        <th>COLUMN B</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.1"
                                                question="Bonus shares"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="D"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            A. a large group of employees makes suggestions to inspire new thought
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">D: issued as compensation for unpaid dividends</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.2"
                                                question="Management"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="J"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            B. promotes a platform for employees to raise their dissatisfaction without victimisation
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">J: use power because of the position of authority</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.3"
                                                question="Delphi technique"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="F"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            C. team members have a positive attitude of support towards other members
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">F: a group of experts solves business problems without bringing them together</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.4"
                                                question="Freedom of speech and expression"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="B"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            D. issued as compensation for unpaid dividends
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">B: promotes a platform for employees to raise their dissatisfaction without victimisation</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.5"
                                                question="Shared values"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="H"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            E. use power because of their knowledge and skills
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">H: team members respect the skills of other members</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            F. a group of experts solves business problems without bringing them together
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            G. issued as compensation to promoters of the company
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            H. team members respect the skills of other members
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            I. promotes mutual interaction between internal and external stakeholders
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            J. use power because of the position of authority
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Section B: Choose 2 */}
                    <div className="pdf-section page-break">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION B: Answer ANY TWO (80 marks)</h2>
                        <p className="mb-4 text-[var(--text-secondary)]">Select two questions:</p>
                        <div className="space-y-2">
                            <label>
                                <input type="checkbox" value="Q2" onChange={(e) => {
                                    const newSel = e.target.checked ? [...selectedSectionB, 'Q2'] : selectedSectionB.filter(s => s !== 'Q2');
                                    if (newSel.length > 2) return;
                                    setSelectedSectionB(newSel);
                                }} /> Question 2: Business Ventures (Investment)
                            </label>
                            <label>
                                <input type="checkbox" value="Q3" onChange={(e) => {
                                    const newSel = e.target.checked ? [...selectedSectionB, 'Q3'] : selectedSectionB.filter(s => s !== 'Q3');
                                    if (newSel.length > 2) return;
                                    setSelectedSectionB(newSel);
                                }} /> Question 3: Business Ventures (Forms of Ownership)
                            </label>
                            <label>
                                <input type="checkbox" value="Q4" onChange={(e) => {
                                    const newSel = e.target.checked ? [...selectedSectionB, 'Q4'] : selectedSectionB.filter(s => s !== 'Q4');
                                    if (newSel.length > 2) return;
                                    setSelectedSectionB(newSel);
                                }} /> Question 4: Business Roles (Ethics)
                            </label>
                        </div>

                        {selectedSectionB.includes('Q2') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 2: BUSINESS ENVIRONMENTS (40 marks)</h3>
                                <div>
                                    <ListQuestion
                                        id="2.1"
                                        question="List any FOUR examples of non-verbal presentations"
                                        numItems={4}
                                        correctAnswers={[
                                            'Tables',
                                            'Graphs',
                                            'bar graph',
                                            'line graph',
                                            'histogram',
                                            'pie chart',
                                            'Diagrams',
                                            'Illustrations',
                                            'Pictures',
                                            'Photographs',
                                            'Scenarios',
                                            'Models',
                                            'Written',
                                            'Business reports',
                                            'Flip charts',
                                            'Handouts',
                                            'Print outs',
                                            'PowerPoint'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.2"
                                        question="Outline the role of personal attitude in successful leadership"
                                        type="textarea"
                                        correctAnswers={[
                                            'Positive attitude releases leadership potential for personal growth',
                                            'A leader\'s good attitude can influence the success of the business',
                                            'Leaders must know their strengths and weaknesses to apply their leadership styles effectively',
                                            'Great leaders understand that the right attitude will set the right atmosphere',
                                            'Leaders\' attitude may influence employees\'/teams\' thoughts/behaviour',
                                            'Leaders should model the behaviour that they want to see in team members',
                                            'Successful leaders consider the abilities/skills of team members to allocate tasks/roles effectively',
                                            'Enthusiasm produces confidence in a leader and inspires them to work even harder',
                                            'A positive attitude is critical for good leadership because good leaders will stay with the task regardless of difficulties/challenges',
                                            'Successful leaders have a constant desire to work and achieve personal/professional success. √√ \n' +
                                            'Leaders with a positive attitude know that there is always more to learn/space to grow',

                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        2.3 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">BIZANA SPORTSWEAR (BS)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Bizana Sportswear has retail outlets throughout the country. The management
                                            of BS allows their employees to participate in the decision-making process.
                                        </p>
                                    </div>

                                    <Question
                                        id="2.3.1"
                                        question="Identify the leadership style applied by BS in the scenario above."
                                        type="text"
                                        correctAnswers={[
                                            'Democratic leadership style'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="2.3.2"
                                        question="Suggest situations in which the leadership style identified in  QUESTION 2.3.1 can be applied in the workplace."
                                        type="text"
                                        correctAnswers={[
                                            'group members are skilled/experienced/experts and eager to share their ideas',
                                            'the leader does not have all the information needed and employees have valuable information to contribute',
                                            'the leader knows his/her limitations to make decisions and is open to new ideas/innovative thinking',
                                            'cooperation is needed between the leader and the team',
                                            'decisions need to be looked at from several perspectives',
                                            'innovative and creative ideas are needed',
                                            'inputs of employees are valued/appreciated in promoting teamwork.'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <div>
                                        <Question
                                            id="2.4"
                                            question="Discuss the impact of Government/RSA Retail Savings Bonds as a form of investment."
                                            type="textarea"
                                            correctAnswers={[
                                                'Guaranteed returns, as interest rate is fixed for the whole investment period',
                                                'Interest rates are market related and attract more investors',
                                                'Interest can be received twice a year √ making it a viable investment option',
                                                'Investment may be easily accessible, as cash may be withdrawn after the first twelve months. √ - Low risk/Safe investment, as it is invested with the South African Government which cannot be liquidated',
                                                'It is an affordable type of investment for all levels of income earners including pensioners',
                                                'Retail bonds are easily/conveniently obtained electronically/from any Post Office/directly from the National Treasury',
                                                'No charges/costs/commissions payable on this type of investment',
                                                'Interest is usually higher than on fixed deposits',
                                                'Retail bonds are listed on the capital bond markets/on the JSE',
                                                'Retail bonds cannot be ceded to banks/financial institutions as security for obtaining loans',
                                                'A minimum of R500 must be invested, which may be difficult for some small investors to accumulate',
                                                'Retail bonds are not freely transferable amongst investors',
                                                'Investors need to have valid SA identification/should be older than 18 years which may discourage foreigners/young people to invest',
                                                'Penalties are charged for early withdrawals, if the savings is less than 12 months old'

                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            2.5 Read the scenario below and answer the questions that follow.
                                        </p>
                                        <div className="scenario">
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">GREEN LOGISTICS (GL)</h3>
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Green Logistics is in the process of investing their surplus funds. They
                                                considered the investment period and possible risk in the different investment
                                                options. GL also identified venture capital as the best investment opportunity
                                                to expand their business.
                                            </p>
                                        </div>
                                        <ListQuestion
                                            id="2.5.1"
                                            question="Name TWO factors that GL considered when making an investment decision in the scenario above."
                                            numItems={2}
                                            correctAnswers={[
                                                'Investment period',
                                                'Risk'
                                            ]}
                                            marks={2}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="2.5.2"
                                            question="Explain venture capital as a type of investment opportunity."
                                            type="textarea"
                                            correctAnswers={[
                                                'Venture capital is given by investors/businesses to start up/expand a business in return to have a share in the new/expanded business',
                                                'Investors should know the type of business/market/economic conditions before a business is bought/started',
                                                'Buying a franchise/existing business will be successful, if the investors have done proper research/understand exactly what he/she is investing in'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>

                                    <div>
                                        <Question
                                            id="2.6"
                                            question="Discuss the Unemployment Insurance Fund (UIF) as a type of compulsory insurance."
                                            type="textarea"
                                            correctAnswers={[
                                                'The UIF provides short term benefits to workers who have been working and become unemployed for various reasons',
                                                'The UIF provides financial assistance for a limited period to the dependants of a deceased employee who was registered with/contributed to the UIF',
                                                'Businesses contribute 1% of basic wages towards UIF, therefore reducing the expense of providing UIF benefits themselves',
                                                'Employees contribute 1% of their basic wage to UIF',
                                                'Businesses are compelled to register their employees with the fund and pay the 2% levy contributions to SARS/UIF monthly',
                                                'The contribution of businesses towards UIF increases the amount paid out to employees who become unemployed',
                                                'All employees who work at least 24 hours per month are required to be registered for UIF/contribute to the UIF',
                                                'Employees who become unemployed must register with the Department of Labour, and all valid claims will be processed by the UIF',
                                                'It is an affordable contribution that makes it possible for businesses to appoint substitute workers in some instances',
                                                'Businesses cannot be held responsible for unemployment cover as the UIF pays out to contributors directly/dependants of deceased contributors',
                                                'Employers will be held personally liable for unemployment cover if the UIF deductions are not made/paid timeously'

                                            ]}
                                            marks={6}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="2.7"
                                            question="Advise businesses on how the division of profits could contribute to the success and/or failure of a public company."
                                            type="textarea"
                                            correctAnswers={[
                                                'High profits and good returns to shareholders indicate the success of a company, which increases the value of shares',
                                                'Profits generated can be re-invested to expand business operations',
                                                'Shareholders receive profits according to the type and number of their shares',
                                                'Dividends are taxable/not always paid out which may discourage new/small investors',
                                                'Shareholders may sell their shares when dividends are low, resulting in a drop in share prices'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                </div>
                                {/* ... Full subquestions 2.3 to 2.7 with correctAnswers from memo, e.g., 2.3 text "cumulative preference shares" marks 2 */}
                            </div>
                        )}
                        {/* Similar for Q3 (ownership forms) and Q4 (ethics, with scenario on unethical practices) */}
                        {selectedSectionB.includes('Q3') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 3: BUSINESS OPERATIONS (40 marks)</h3>
                                {/* Subquestions on sole prop, partnership, company */}
                                <div>
                                    <ListQuestion
                                        id="3.1"
                                        question="Name any TWO problem-solving steps."
                                        numItems={4}
                                        correctAnswers={[
                                            'Identify the problem',
                                            'Define the problem',
                                            'Identify possible solutions to the problem',
                                            'Evaluate alternative solutions',
                                            'Select the most appropriate alternative/solution',
                                            'Develop an action plan',
                                            'Implement the suggested solution/action plan',
                                            'Monitor the implementation of the solution/action plan',
                                            'Evaluate the implemented solution'

                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="3.2"
                                        question="Outline the causes of conflict in the workplace."
                                        numItems={4}
                                        correctAnswers={[
                                            'Lack of proper communication/misunderstanding between management and workers',
                                            'Ignoring rules/procedures may result in disagreements/difference in opinions  and conflict',
                                            'Management and/or workers may have different personalities/backgrounds',
                                            'Different values/levels of knowledge/skills/experience of managers/workers',
                                            'Little/no co-operation between internal and/or external parties/stakeholders',
                                            'Lack of recognition for good work such as a manager not showing appreciation for extra hours worked to meet deadlines',
                                            'Lack of employee development may increase frustration levels as workers may repeat errors due to a lack of knowledge/skills',
                                            'Unfair disciplinary procedures such as favouritism/nepotism',
                                            'Little/no support from management with regard to supplying the necessary resources',
                                            'Leadership styles used such as autocratic managers may not consider worker inputs',
                                            'Unrealistic deadlines/Heavy/Unfair workloads lead to stress resulting in conflict',
                                            'Lack of agreement on mutual matters such as remuneration/working hours',
                                            'Unhealthy competition/Inter-team rivalry may cause workers to lose focus on team targets',
                                            'Constant changes can cause instability.'

                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        3.3 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">ZAMA TECHNOLOGIES (ZT)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Zama Technologies recognise diversity issues to achieve an inclusive
                                            workforce. They encourage younger employees to respect older employees
                                            and to learn from them. ZT also built ramps for wheelchairs at the entrance of
                                            their office.
                                        </p>
                                    </div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        Identify TWO diversity issues addressed by ZT. Motivate your answer by
                                        quoting from the scenario above.
                                    </p>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        Use the table below as a GUIDE to answer QUESTION 3.3.
                                    </p>
                                    <table>
                                        <thead>
                                        <tr>
                                            <td>DIVERSITY ISSUES</td>
                                            <td>MOTIVATIONS</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <ListQuestion
                                                    id=""
                                                    question=""
                                                    numItems={2}
                                                    correctAnswers={[
                                                        'Age',
                                                        'Disability'
                                                    ]}
                                                    marks={4}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                <ListQuestion
                                                    id=""
                                                    question=""
                                                    numItems={2}
                                                    correctAnswers={[
                                                        'They encourage younger employees to respect older employees and to learn from them',
                                                        'ZT also built ramps for wheelchairs at the entrance of their office'
                                                    ]}
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <Question
                                        id="3.4"
                                        question="Explain the advantages of creative thinking in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Better/Unique/Unconventional ideas/solutions are generated',
                                            'May give the business a competitive advantage if unusual/unique solutions/ideas/strategies are implemented',
                                            'Complex business problems may be solved',
                                            'Productivity increases as management/employees may quickly generate multiple ideas which utilises time and money more effectively',
                                            'Managers/Employees have more confidence as they can live up to their full potential',
                                            'Managers will be better leaders as they will be able to handle/manage change(s) positively and creatively',
                                            'Managers/Employees can develop a completely new outlook, which may be applied to any task(s) they may do',
                                            'Leads to more positive attitudes as managers/employees feel that they have contributed towards problem solving',
                                            'Improves motivation √ amongst staff members',
                                            'Managers/Employees have a feeling of great accomplishment and they will not resist/obstruct the process once they solved a problem/contributed towards the success of the business',
                                            'Managers/Employees may keep up with fast changing technology which may lead to an increased market share',
                                            'Stimulates initiative from employees/managers, as they are continuously pushed out of their comfort zone'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        3.5 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">EKSTEEN HOTELS (EH)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Eksteen Hotels provide transport for employees who work unusually long
                                            hours. They pay fair bonuses to employees as acknowledgement of their hard
                                            work and commitment. EH also implements ethically correct business
                                            decisions to avoid polluting the environment.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="3.5.1"
                                        question="Quote TWO ways in which EH contributed time and effort in improving the well-being of employees from the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'Eksteen Hotels provide transport for employees who work unusually long hours',
                                            'They pay fair bonuses to employees as acknowledgement for their hard work and commitment'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.5.2"
                                        question="Elaborate on the meaning of quality control."
                                        type="textarea"
                                        correctAnswers={[
                                            'Pay fair wages/salaries to the workers based on the nature of their work/the prevailing economic conditions in the market',
                                            'Working conditions should include safety/medical/canteen facilities/benefits like housing/leave/retirement',
                                            'Provide for employees\' participation in decision making that affects them',
                                            'Provide employees with recreational facilities to socialise and strengthen work relations',
                                            'Offer annual physical/medical assessments to workers√ to promote health awareness',
                                            'Encourage employees to stay fit and healthy by getting them involved health activities to minimize stress/substance abuse/obesity',
                                            'Make trauma debriefing/counselling/therapy available to any employee who requires these services',
                                            'Offer financial assistance in the case of any hardship caused by unexpected medical costs',
                                            'Allow flexible working hours to enhance productivity',
                                            'Offer support programmes for employees infected and affected by HIV/Aids',
                                            'Make childcare facilities available on the premises for working mothers in the business'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">
                                        3.6 Explain how businesses can apply the following King Code principles for good corporate governance to improve ethical business conduct:
                                    </p>
                                    <Question
                                        id="3.6.1"
                                        question="Transparency"
                                        type="textarea"
                                        correctAnswers={[
                                            'Regular audits should be done √ to determine the effectiveness of the business',
                                            'Business deals should be conducted openly so that there is no hint/sign of dishonesty/corruption',
                                            'Businesses should give details of shareholders\' voting rights to them before/at the Annual General Meeting (AGM)',
                                            'The board of directors must report on both the negative and positive impact of the business on the community/environment',
                                            'The board should ensure that the company\'s ethics are effectively implemented',
                                            'Decisions/Actions must be clear to all stakeholders',
                                            'Staffing and other processes should be open and transparent',
                                            'Employees/Shareholders/Directors should be aware of the employment policies of the business',
                                            'Auditing and other reports must be accurate/available to shareholders/employees'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.6.2"
                                        question="Accountability"
                                        type="textarea"
                                        correctAnswers={[
                                            'There must be regular communication between management and the stakeholders such as shareholders',
                                            'Company should appoint internal and external auditors to audit financial statements',
                                            'The board should ensure that the company\'s ethics are effectively implemented',
                                            'Businesses should be accountable/responsible for their decisions/actions',
                                            'Businesses should present accurate annual reports to shareholders at the Annual General Meeting (AGM)',
                                            'Top management should ensure that other levels of management are clear about their roles and responsibilities to improve accountability'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.7"
                                        question="Recommend ways in which businesses could deal with pricing of goods in rural areas as a type of unethical business practice."
                                        type="textarea"
                                        correctAnswers={[
                                            'A business may lobby with other businesses in the area to convince government to improve infrastructure in the rural area',
                                            'Charge market related/fair/affordable prices for goods and services',
                                            'Avoid unethical business practices to attract customer loyalty',
                                            'Investigate cost-effective ways of transporting products/Hire a large truck to combine deliveries to shop-owners in the same area',
                                            'Work together with suppliers to share delivery costs to remote rural areas',
                                            'Businesses can buy in bulk to get a discount to avoid charging high prices'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                            </div>
                        )}
                        {selectedSectionB.includes('Q4') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 4: MISCELLANEOUS TOPICS (40 marks)</h3>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS VENTURES</h3>
                                <div>
                                    <ListQuestion
                                        id="4.1"
                                        question="State any TWO types of preference shares."
                                        numItems={2}
                                        correctAnswers={[
                                            'Non-participating preference shares',
                                            'Ordinary preference shares',
                                            'Participating preference shares',
                                            'Cumulative preference shares',
                                            'Non-cumulative preference shares',
                                            'Redeemable preference shares',
                                            'Non-redeemable preference shares',
                                            'Convertible preference shares',
                                            'Non-convertible preference share'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="4.2"
                                        question="Outline the advantages of a non-profit company."
                                        numItems={4}
                                        correctAnswers={[
                                            'Proceeds/Surplus funds are used solely for the primary objective of the organisation/further the goals of the business',
                                            'They provide social services to various communities',
                                            'Donors receive tax deductions which motivates them to invest in a non-profit company',
                                            'There is a fixed management structure resulting in business stability',
                                            'The liability of members is limited which may attract additional membership',
                                            'Has continuity of existence which reduces the risk of closure',
                                            'Most of the income of a non-profit company is free from income taxes',
                                            'Can receive government funding/grants/aid to render their services'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        4.3 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">ADONISI FASHION (AF)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            The management of Adonisi Fashion wants to insure their stock against fire,
                                            changes in fashion and theft. They conducted research on insurable risks and
                                            understand the importance of insurance.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="4.3.1"
                                        question="Name TWO insurable risks in the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'Fire',
                                            'Theft'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.3.2"
                                        question="Explain the advantages of insurance for businesses."
                                        type="textarea"
                                        correctAnswers= {[
                                            'Transfers the risk from businesses/insured to an insurance company/insurer',
                                            'Transfer of risk is subject to the terms and conditions of the insurance contract',
                                            'Protects businesses against theft/loss of stock and/or damages caused by natural disasters such as floods/storm damage',
                                            'Protects businesses against dishonest employees',
                                            'Protects businesses from claims made by members of the public for damages that the business is responsible for',
                                            'Protects businesses against losses due to death of a debtor',
                                            'Businesses are protected against the loss of earnings such as strikes by employees which result in losses worth millions',
                                            'Businesses will be compensated for insurable losses such as destruction of property through fire',
                                            'Businesses\' assets such as vehicles/equipment/buildings need to be insured against damage and/or theft',
                                            'Life insurance can be taken on the life of partners in a partnership to prevent unexpected loss of capital',
                                            'Should the services of key personnel be lost due to accidents/death, the proceeds of an insurance policy can be paid out to businesses/beneficiaries'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.4"
                                        question="Advise businesses on the functions of the Johannesburg Securities Exchange (JSE)."
                                        type="textarea"
                                        correctAnswers={[
                                            'Gives opportunities to financial institutions such as insurance companies investing their surplus funds in shares',
                                            'Serves as a barometer/indicator of economic conditions in South Africa',
                                            'Keeps investors informed by publishing share prices daily',
                                            'Acts as a link between investors and public companies',
                                            'Shares are valued and assessed by experts',
                                            'Small investors are invited to take part in the economy of the country through the buying/selling of shares',
                                            'Venture capital market is made possible on the open market',
                                            'Strict investment rules ensure a disciplined/orderly market for securities',
                                            'Raises primary capital by encouraging new investments in listed companies',
                                            'Mobilises the funds of insurance companies and other institutions',
                                            'Regulates the market for trading in shares',
                                            'Plans, researches and advises on investment possibilities',
                                            'Ensures that the market operates in a transparent manner',
                                            'Provides protection for investors through strict rules/legislation',
                                            'Encourages short-term investment as shares can be sold at any time',
                                            'Facilitates electronic trading of shares/STRATE/Channels financial resources into productive economic activities',
                                            'Enhance job creation and increases economic growth/development'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS ROLES</h3>
                                <div>
                                    <ListQuestion
                                        id="4.5"
                                        question="Outline the economic rights of employees in the workplace."
                                        numItems={4}
                                        correctAnswers={[
                                            'Free from forced labour',
                                            'Free to accept/choose work',
                                            'Fair wages/Equal pay/Equal pay for work of equal value',
                                            'Reasonable limitation of working hours',
                                            'Fair labour practice',
                                            'Safe/Healthy working conditions',
                                            'Join/Form trade unions',
                                            'Right to participate in a legal strike'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        4.6 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">JASON ENTERPRISE (JE)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Jason Enterprise is experiencing a decrease in sales in one of their product
                                            lines. JE requested their employees to generate ideas silently on their own
                                            before sharing them with others.
                                        </p>
                                    </div>
                                    <Question
                                        id="4.6.1"
                                        question="Identify the problem-solving technique applied by JE in the scenario above."
                                        type="text"
                                        correctAnswers={[
                                            'Nominal group technique'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.6.2"
                                        question="Explain other ways in which JE can apply the problem-solving technique identified in QUESTION 4.6.1."
                                        type="textarea"
                                        correctAnswers={[
                                            'JE must divide the employees √ into smaller groups',
                                            'Encourage group to clearly define the problem/to improve the quality of their products due to various complaints so that all the small groups can work on the same problem',
                                            'Each employee in the small group will get the opportunity to present one of his/her ideas/solutions with a short explanation',
                                            'Appoint one employee to write the ideas/solutions on a large sheet of paper/capture solutions electronically on computer for all to see',
                                            'Allow each employee to give a second solution until all possible solutions have been recorded',
                                            'Encourage employees to ask clarity seeking questions',
                                            'Discourage criticism of ideas/solutions as this may prevent others from giving their solutions',
                                            'JE must eliminate ideas that are duplicated/similar',
                                            'Each employee must read through all the suggestions and anonymously rate them by giving the highest points for the best solution',
                                            'Collect the ratings and calculate total points'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.7"
                                        question="Discuss the impact of corporate social responsibility (CSR) on communities."
                                        type="textarea"
                                        correctAnswers={[
                                            'Community skills can be improved through the provision of bursaries',
                                            'Better educational facilities are established in poor communities',
                                            'The standard of living of the community is uplifted. /Quality of life of communities is improved',
                                            'Investing in the medical infrastructure, will improve the health of communities',
                                            'Socio-economic issues are attended to/addressed which will improve the welfare of the community',
                                            'Training opportunities in the community increase the possibility of appointments of members of the community',
                                            'Implementing developmental programmes in the community improves entrepreneurial skills of communities',
                                            'Distribution of scarce resources to selected beneficiaries in the community may cause problems such as discrimination',
                                            'Some businesses only participate in CSR initiatives to raise profit and do not really care for the community in which they operate',
                                            'Businesses cannot meet the longer-term needs of the society. /Businesses cannot deliver sustainable CSR programmes',
                                            'The benefits of the programmes may not filter to the intended persons within the community',
                                            'Spending money on CSR programmes means the business has to recover expenses through higher prices which have a negative impact on the economy',
                                            'Businesses tend to focus on CSR projects that do not directly benefit the community',
                                            'Consumers are not easily convinced that the business is acting in the best interest of the community/environment'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.8"
                                        question="Advise businesses on the roles of health and safety representatives in protecting the workplace environment."
                                        type="textarea"
                                        correctAnswers={[
                                            'Ensure that protective clothing is provided/available to all workers',
                                            'Identify potential dangers that could be harmful to their employees',
                                            'Initiate/Promote/Maintain/Review measures to ensure the health and safety of workers',
                                            'Ensure that employers conduct regular review of safety policies/rules/measures to prevent potential future accidents',
                                            'Check/Monitor the effectiveness of health and safety measures with management',
                                            'Ensure that all equipment that is necessary to perform the work is provided/maintained regularly',
                                            'Promote safety training so that employees may avoid potential dangers/act pro-actively',
                                            'Ensure that dangerous equipment is used under the supervision of trained/qualified workers'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="4.9"
                                        question="Suggest ways in which total quality management (TQM) can reduce the cost of quality."
                                        numItems={4}
                                        correctAnswers={[
                                            'Introduce quality circles/small teams of five to ten employees, who meets regularly to discuss ways of improving the quality of their work',
                                            'Schedule activities to eliminate duplication of tasks/activities',
                                            'Share responsibility for quality output between management and workers',
                                            'Develop work systems that empower employees to find new ways of improving quality',
                                            'Train employees at all levels, so that everyone understands their role in quality management',
                                            'Work closely with suppliers to improve the quality of raw materials/inputs',
                                            'Improve communication about the quality challenges/deviations, so that everyone can learn from past experiences',
                                            'Reduce investment on expensive, but ineffective inspection procedures in the production process',
                                            'Implement pro-active maintenance programmes for equipment/machinery to reduce/eliminate breakdowns'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                {/* ... */}
                            </div>
                        )}
                    </div>

                    {/* Section C: Choose 1 */}
                    <div className="pdf-section page-break">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION C: Answer ANY ONE (40 marks)</h2>
                        <p className="mb-4 text-[var(--text-secondary)]">Select one essay question:</p>
                        <div className="space-y-2">
                            <label>
                                <input type="radio" name="sectionC" value="Q5" onChange={(e) => setSelectedSectionC(e.target.value)} /> Question 5: Business Ventures (Investment: Securities)
                            </label>
                            <label>
                                <input type="radio" name="sectionC" value="Q6" onChange={(e) => setSelectedSectionC(e.target.value)} /> Question 6: Business Roles (Leadership)
                            </label>
                        </div>
                        {selectedSectionC === 'Q5' && (
                            <div>
                                <div className="scenario">
                                    <p className="text-[var(--text-primary)] leading-relaxed">
                                        A well-designed multimedia presentation is necessary for communicating with business
                                        stakeholders. Presenters must know the factors that must be considered while
                                        presenting to ensure a successful presentation. Some presenters use hand-outs and
                                        flip charts to enhance the quality of their presentations. Handling feedback in a
                                        non-aggressive and professional manner is important for concluding a presentation.
                                    </p>
                                </div>
                                <Question
                                    id="5"
                                    question='
                                    Write an essay on presentation and data response in which you include the following
                                    aspects:


                                     Outline aspects that should be considered when designing a multimedia
                                    presentation.
                                     Explain the factors that the presenter should consider while presenting.
                                     Discuss the impact of the following visual aids:
                                    o Hand-outs
                                    o Flip charts
                                     Recommend ways in which presenters can handle feedback in a non-aggressive
                                    and professional manner
                                    '
                                    type="textarea"
                                    correctAnswers={[
                                        'A multimedia presentation enables presenters to have a logical flow of facts and correct errors before presenting',
                                        'Presenters use relevant information to keep the audience attentive until the end of the presentation',
                                        'Handouts can be used to provide the audience with additional information to enable them to conduct further research on the topic',
                                        'Flip charts provide the opportunity for presenters to group together common responses obtained from the audience',
                                        'Handling feedback in a non-aggressive and professional manner may enable the audience to give more input on the presentation',
                                        'Start with the text which forms the basis of the presentation',
                                        'Select the background to complement/enhance the text',
                                        'Choose images that may help to communicate the message',
                                        'Include/Create graphics to assist the information which is conveyed',
                                        'Add special effects/sound/pictures/animation to make it interesting for the audience',
                                        'Create hyperlinks to allow quick access to other files/documents/video clips',
                                        'Use legible font and font size so that it is easy to see/read',
                                        'Keep slides/images/graphs/font simple by not mixing different styles/colours',
                                        'Make sure there are no language/spelling errors',
                                        'Use bright colours to increase visibility',
                                        'Structure information in a logical sequence so that the audience can easily follow the content of the presentation',
                                        'Limit the information on each slide by using key words and not full sentences',
                                        'Establish credibility by introducing yourself as the presenter at the start',
                                        'Mention/Show the most important information first',
                                        'Make the purpose/main points of the presentation clear at the start of the presentation',
                                        'Use suitable section titles/headings/sub-headings/bullets',
                                        'Meaningful hand-outs may be handed out at the start of the presentation to',
                                        'attract attention/encourage participation',
                                        'Notes/Hard copies of the slide presentation can be distributed at the end of the presentation as a reminder of the key facts of the presentation',
                                        'It is easy to update handouts with recent information/developments',
                                        'Notes may be compared with electronic slides /PowerPoint to validate/compare the accuracy of the information',
                                        'Extra information such as contact details/price lists may be handed out to promote the services of the business',
                                        'Useful information for improving the next presentation may be obtained, when the audience completes feedback questionnaires after the presentation',
                                        'Summarise the main points of the presentation √ to conclude the presentation',
                                        'Stand in a good position/upright, where the audience can clearly see the',
                                        'presenter/presentation',
                                        'Avoid hiding behind equipment',
                                        'Do not ramble on at the start to avoid losing the audience/their interest',
                                        'Capture listeners\' attention/Involve the audience with a variety of methods',
                                        'such as short video clips/sound effects/humour',
                                        'Maintain eye contact with the audience',
                                        'Be audible/loud and clear to all listeners/audience',
                                        'Vary the tone of voice/tempo within certain sections to prevent monotony',
                                        'Make the presentation interesting with visual aids/anecdotes/examples/Use',
                                        'visual aids effectively',
                                        'Use appropriate gestures to emphasize certain points',
                                        'Speak with energy and enthusiasm',
                                        'A multimedia presentation provides a comprehensive guideline on how presenters should cater for different types of audiences',
                                        'A well-researched presentation will enable the presenter to use different approaches while presenting',
                                        'Hand-outs enable presenters and the audience to use information for future references',
                                        'Flip charts can be used to clarify some issues raised by the audience in a simplified manner'
                                    ]}
                                    marks={40}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                        )}
                        {selectedSectionC === 'Q6' && (
                            <div>
                                <div className="scenario">
                                    <p className="text-[var(--text-primary)] leading-relaxed">
                                        The workplace environment is dynamic and consists of people with different
                                        experiences, which may lead to grievances and conflicts. Businesses follow the correct
                                        procedure to deal with grievances in the workplace. They also know that teams go
                                        through different stages of team development and follow team dynamic theories as a
                                        guide to improve team performance.
                                    </p>
                                </div>
                                <Question
                                    id="6"
                                    question='
                                    Write an essay on team performance assessment and conflict management in which
                                    you include the following aspects:


                                     Outline the differences between grievance and conflict.
                                     Explain the correct procedure to deal with grievances in the workplace.
                                     Discuss the following stages of team development:
                                    o Storming
                                    o Norming
                                     Advise businesses on the importance of team dynamic theories in improving team
                                    performance.
                                    '
                                    type="textarea"
                                    correctAnswers={[
                                        'Conflicts and grievances may interrupt business operations and create stressful work environments if not handled timeously',
                                        'The correct procedure to deal with grievances must be applied to create harmony and healthy work relations.',
                                        'The stages of team development enable team leaders to improve understanding of their team member’s strengths and abilities.',
                                        'The team dynamic theories provide a framework for the establishment of highly effective teams',
                                        'When an employee is unhappy/ has a problem/complaint in the workplace',
                                        'It is when an/a individual/group has a work-related issue',
                                        'It is a formal complaint which requires employees to follow a grievance procedure',
                                        'Can be resolved through following proper conflict resolution steps',
                                        'Disagreement between two or more parties in the workplace',
                                        'Clash of opinions/ideas/viewpoints in the workplace',
                                        'An aggrieved employee must verbally report the incident/grievance to his/her supervisor/manager',
                                        'Supervisor/manager needs to resolve the issue within three to five (3 to 5) working days',
                                        'Should the employee and supervisor not be able to resolve the grievance, the employee may take it to the next level of management',
                                        'The employee may move to a more formal process where the grievance must \n' +
                                        'be lodged in writing/completes a grievance form',
                                        'The employee must receive a written reply in response to the written grievance',
                                        'A grievance hearing/meeting must be held with all relevant parties present',
                                        'Teams go through a period of unease/conflict after formation',
                                        'Different ideas from team members will compete for consideration',
                                        'Team members open up to each other and confront each other\'s ideas/perspectives',
                                        'Tension/struggle/arguments occur and upset the team members, there may be power struggles for the position of team leader',
                                        'The conflict during the storming stage must be resolved to allow the team to move to the norming stage',
                                        'Team members come to an agreement and reach consensus',
                                        'Roles and responsibilities are clear and accepted',
                                        'Processes/Working style and respect develop amongst members',
                                        'Team members have the ambition to work for the success of the team',
                                        'Team dynamic theories explain how effective teams work/operate',
                                        'Businesses are able to allocate tasks according to the roles of team members',
                                        'An aggrieved employee should not be ignored as he/she can report the matter to higher authorities resulting in a bad image of the business',
                                        'Businesses that are well-informed on the causes of conflict are able to resolve it timeously and minimise potential conflicts from reoccurring'
                                    ]}
                                    marks={40}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={markAnswers}
                            className="btn-primary"
                            disabled={answerStatus || selectedSectionB.length !== 2 || !selectedSectionC}
                        >
                            Mark Answers
                        </button>
                    </div>

                    {answerStatus && (
                        <div className="mt-6 p-4 border rounded text-center pdf-section">
                            <h3 className="text-xl font-bold">Your Total Score: {totalScore} / 150</h3>
                            <p className="text-secondary">Essays are partially auto-marked based on key phrases. For full accuracy, refer to official memo.</p>
                            <div className="score-breakdown">
                                <div className="score-item">
                                    <strong>Section A:</strong><br />
                                    {sectionScores.A} / 30 ({Math.round((sectionScores.A / 30) * 100)}%)
                                </div>
                                <div className="score-item">
                                    <strong>Section B:</strong><br />
                                    {sectionScores.B} / 80 ({Math.round((sectionScores.B / 80) * 100)}%)
                                </div>
                                <div className="score-item">
                                    <strong>Section C:</strong><br />
                                    {sectionScores.C} / 40 ({Math.round((sectionScores.C / 40) * 100)}%)
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

BusinessStudiesP2Nov2023.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP2Nov2023;