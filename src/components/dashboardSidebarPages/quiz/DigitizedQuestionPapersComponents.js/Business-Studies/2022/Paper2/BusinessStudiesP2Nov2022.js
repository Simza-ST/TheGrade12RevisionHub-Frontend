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

const BusinessStudiesP2Nov2022 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
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
                        src="src/assets/coatOfArm.png"
                        alt="Coat of Arms of South Africa"
                        className="coat-of-arms absolute top-4 left+10"
                        style={{ position: 'relative', top: '100px', left: '-138px' }}
                    />
                    <div className="header-text">
                        <strong>basic education</strong>
                        <br/>Department:<br />
                        Basic Education<br />
                        <strong>Republic of South Africa</strong>
                    </div>
                    <h1>NATIONAL SENIOR CERTIFICATE</h1>
                    <h2>Business Studies P2 November 2022</h2>
                    <p><strong>MARKS: 150</strong><br /><strong>TIME: 2 hours</strong></p>
                    <p>This question paper consists of 9 pages.</p>
                </div>
                <Timer />
                <div className="pdf-section page-break">
                    <h2 style={{ fontSize: '14pt', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>INSTRUCTIONS AND INFORMATION</h2>
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
                    {/* Section A: Compulsory */}
                    <div className="pdf-section page-break">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION A: COMPULSORY (30 marks)</h2>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 1</h3>
                        <div className="space-y-6">
                            <div>
                                <Question
                                    id="1.1.1"
                                    question="Ayisha applied the … leadership style when she used her personality to motivate her employees to work hard"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. democratic' },
                                        { value: 'B', text: 'B. autocratic' },
                                        { value: 'C', text: 'C. charismatic' },
                                        { value: 'D', text: 'D. transactional' }
                                    ]}
                                    correctAnswers="C"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.2"
                                    question="The shareholders of Sizwe Trading were issued … shares as compensation for unpaid dividends"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. bonus' },
                                        { value: 'B', text: 'B. preference' },
                                        { value: 'C', text: 'C. ordinary' },
                                        { value: 'D', text: 'D. founders' }
                                    ]}
                                    correctAnswers="A"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.3"
                                    question="The presenter should … when preparing for a presentation."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. use appropriate gestures' },
                                        { value: 'B', text: 'B. avoid hiding behind equipment ' },
                                        { value: 'C', text: 'C. use humour appropriately' },
                                        { value: 'D', text: 'D. create visual aids' }
                                    ]}
                                    correctAnswers="D"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.4"
                                    question="Godana Doors appointed both male and female employees in managerial positions to deal with … as a diversity issue."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. age' },
                                        { value: 'B', text: 'B. gender' },
                                        { value: 'C', text: 'C. language' },
                                        { value: 'D', text: 'D. culture' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.5"
                                    question="Jacky Trading dealt with a/an … as a type of difficult personality when they listened to Trevor's criticism without acknowledging him."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. complainer' },
                                        { value: 'B', text: 'B. expert' },
                                        { value: 'C', text: 'C. indecisive person' },
                                        { value: 'D', text: 'D. aggressor' }
                                    ]}
                                    correctAnswers="A"
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
                                    insurable;   economic;   ethical;   accountability;
                                    RSA Retail Savings Bonds;   non-insurable;   social;
                                    unit trusts;    professional;   responsibility
                                </p>
                                <Question
                                    id="1.2.1"
                                    question="Sakkie invested in … as it will allow him to cash in without penalties when he needs money."
                                    type="text"
                                    correctAnswers="unit trusts"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.2"
                                    question="Changes in technology can be regarded as a/an … risk."
                                    type="text"
                                    correctAnswers="non-insurable"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.3"
                                    question="The employees of Blake Consultants show … behaviour, as they apply the business's code of conduct when dealing with clients."
                                    type="text"
                                    correctAnswers="professional"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.4"
                                    question="The … rights of employees allow them to participate in a legal strike."
                                    type="text"
                                    correctAnswers="economic"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.5"
                                    question="Businesses apply … as a King Code principle when they appoint external auditors to audit their financial statements"
                                    type="text"
                                    correctAnswers="accountability"
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
                                                question="Situational leadership theory"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="F"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            A. improves the image of the business and increases profits
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">F: leaders analyse the business objectives to choose an appropriate leadership style</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.2"
                                                question="Security"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="D"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            B. team members show respect for the knowledge of other members
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">D: applies to long-term insurance</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.3"
                                                question="Private company"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="G"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            C. leaders reward the positive behaviour of their employees
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">G: raises capital by selling shares to its shareholders</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="D."
                                                question="Corporate social responsibility"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="A"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            D. applies to long-term insurance
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">A: improves the image of the business and increases profits</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.5"
                                                question="Shared values"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="B"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            E. raises capital by selling shares to the community
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">B: team members show respect for the knowledge of other members</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            F. leaders analyse the business objectives to choose an appropriate leadership style
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            G. raises capital by selling shares to its shareholders
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td className="border border-gray-400 px-4 py-2">
                                            H. applies to short-term insurance
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            I. improves the standard of living of the community without a return on investment
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            J. team members work together as a unit and take part in decision-making
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
                                        question="Name any FOUR examples of long-term insurance."
                                        numItems={4}
                                        correctAnswers={[
                                            'Endowment policy',
                                            'Life cover policy',
                                            'Life insurance',
                                            'Retirement annuity',
                                            'Pension fund',
                                            'Provident fund',
                                            'Disability policy',
                                            'Trauma insurance',
                                            'Funeral insurance',
                                            'Health insurance',
                                            'Medical aid'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="2.2"
                                        question="Elaborate on the meaning of excess as an insurance concept."
                                        numItems={6}
                                        correctAnswers={[
                                            'Excess is the amount that the insured agrees to pay upfront√ when he/she takes out an insurance policy/The amount the insured agrees to pay upfront as stipulated in the insurance policy',
                                            'A portion of the insurance claim that the insured will have to pay towards the cost of replacing/repairing goods/property concerned',
                                            'Excess payments protect the insurer against fraudulent claims as the insured is less likely to submit a false claim/when he/she needs to pay the amount upfront',
                                            'It is the amount paid to the insurer when a claim for damages is lodged/ in the event of a claim',
                                            'Higher excess amounts keep the insurance premium lower and discourage fraud',
                                            'Excess payment prevents the insured from claiming for minor damages'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">Identify the type of visual aid that was used by Dumisani while presenting in EACH statement below.</p>
                                    <Question
                                        id="2.3.1"
                                        question="Name the PESTLE factor that is applicable to MM in the scenario above."
                                        type="text"
                                        correctAnswers={[
                                            'PowerPoint',
                                            'Data projector'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <ListQuestion
                                        id="2.3.2"
                                        question="He provided the audience with hard copies of his presentation at the beginning of the session"
                                        numItems={4}
                                        correctAnswers={[
                                            'Hand-outs',
                                            'flyers',
                                            'brochures'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="2.4"
                                        question="Explain the difference between limited liability and unlimited liability"
                                        type="textarea"
                                        correctAnswers={[
                                            'Losses are limited to the amount that the owner invested in the business',
                                            'The owner‟s personal assets are protected against the debts of the business',
                                            'Applicable to companies that have a separate entity/personality',
                                            'The liability of the owner to pay debts/claims is not limited to the business only',
                                            'The owner‟s personal assets may be seized to pay for the debts of the business',
                                            'Applicable to a sole proprietorship and partnership as they do not have a separate legal entity/personality'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.5"
                                        question="Describe the functions of the Johannesburg Securities Exchange (JSE)."
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
                                            'Ensures that the market operates√ in a transparent manner',
                                            'Provides protection for investors through strict rules/legislation',
                                            'Encourages short-term investment'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        2.6 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Thapelo invested an amount of R7 000 in a fixed deposit at 10% simple
                                            interest per year over a period of two years.
                                        </p>
                                    </div>
                                    <Question
                                        id="2.6.1"
                                        question="Calculate the simple interest that Thapelo will receive after two years. Show ALL calculations"
                                        type="textarea"
                                        correctAnswers={[
                                            'Interest = P x R x T \n' +
                                            'R7 000 x 10% x 2 years \n' +
                                            '= R1 400',
                                            'R1 400'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="2.6.2"
                                        question="Discuss the impact of fixed deposits as a form of investment"
                                        type="textarea"
                                        correctAnswers={[
                                            'Interest is earned at a fixed rate regardless of changes in the economic climate',
                                            'The period of investment can be over a short/medium/long term',
                                            'Investors can choose the investment period that suits them',
                                            'The principal amount plus interest earned is paid out on the maturity date',
                                            'Ensures financial discipline as investors cannot withdraw their funds before the maturity date',
                                            'Investors earn a better return on investment than on an ordinary savings account',
                                            'It has a low risk as investors are guaranteed of the final payment',
                                            'The higher the principal amount/the longer the investment period, the higher the interest rate offered by a financial institution',
                                            'The investor cannot withdraw their funds before the maturity date',
                                            'Low returns compared to other investments',
                                            'May not outperform the effect of inflation over the long-term'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.7"
                                        question="Advise businesses on the advantages of insurance."
                                        type="textarea"
                                        correctAnswers={[
                                            'Transfers the risk from the business/insured to an insurance company/insurer',
                                            'Transfer of risk is subject to the terms and conditions of the insurance contract',
                                            'Protects businesses against theft/loss of stock and/or damages caused by natural disasters such as floods/storm damage',
                                            'Businesses will be compensated for insurable losses such as the destruction of property through fire',
                                            'Businesses assets such as vehicles/equipment/buildings need to be insured against damage and/or theft',
                                            'Businesses are protected against the loss of earnings such as strikes by employees which may result in losses worth millions',
                                            'Protects businesses against dishonest employees',
                                            'Life insurance can be taken on the life of partners in a partnership to prevent unexpected loss of capital',
                                            'Should the services of key personnel be lost due to accidents/death, the proceeds of an insurance policy can be paid out to the business/beneficiaries',
                                            'Replacement costs for damaged machinery/equipment are very high, therefore insurance can reduce/cover such costs',
                                            'Protects businesses from claims made by members of the public for damages that businesses are responsible for',
                                            'Protects businesses against losses due to death of a debtor'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.8"
                                        question="Suggest ways in which the presenter can handle feedback after a presentation in a non-aggressive and professional manner."
                                        type="textarea"
                                        correctAnswers={[
                                            'The presenter should stand throughout the feedback session',
                                            'Be polite/confident/courteous when responding to questions',
                                            'Ensure that each question/comment is clearly understood before responding/re-phrase questions if uncertain',
                                            'The presenter should first listen and then respond',
                                            'Provide feedback as soon as possible after the question was asked/after the session',
                                            'Be direct/honest/sincere when responding to questions',
                                            'Use simple language to support the examples used in the presentation',
                                            'Keep answers short and to the point',
                                            'Apologise/acknowledge errors/mistakes if pointed out by the audience',
                                            'Encourage questions from the audience',
                                            'Always address the question and not the person',
                                            'Acknowledge good questions to motivate the audience to ask more questions',
                                            'The presenter should not involve himself in a debate when responding to questions',
                                            'Address the full audience and not only the person who posed the question',
                                            'The presenter should not avoid the questions if he/she does not know the answer, but rather promise feedback on it'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
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
                                        question="Name any FOUR human rights in the workplace."
                                        numItems={4}
                                        correctAnswers={[
                                            'Privacy',
                                            'Dignity',
                                            'Equity',
                                            'Freedom of speech and expression',
                                            'Information',
                                            'Safety, security and protection of life'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="3.2"
                                        question="Outline the roles of the health and safety representatives in protecting the workplace environment."
                                        numItems={4}
                                        correctAnswers={[
                                            'Ensure that protective clothing is provided/available to all workers',
                                            'Identify potential dangers in the workplace',
                                            'Initiate/Promote/Maintain/Review measures to ensure the health and safety of workers',
                                            'Check/Monitor the effectiveness of health and safety measures with management',
                                            'Ensure that all equipment that is necessary to perform the work is provided/maintained regularly',
                                            'Promote safety training so that employees may avoid potential dangers/act pro-actively',
                                            'Ensure that dangerous equipment is used under the supervision of trained/qualified workers',
                                            'Ensure that workers\' health and safety is not endangered by hazards resulting from production/processing/storage/transportation of material/equipment',
                                            'Work together with the employer, to investigate any accidents/complaints from the workers concerning health and safety in the workplace',
                                            'Ensure that employers comply with COIDA'
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
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">TAKALANI TRADERS (TT)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Zuki and Jane are supervisors at Takalani Traders. They do not speak to
                                            each other because they have different views. Management arranged a
                                            pre-negotiation meeting in which Zuki and Jane expressed their views
                                            separately. They were given the opportunity to agree on the best solution.
                                            They were also advised to refer the matter to the CCMA if they were not
                                            happy with the outcome.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="3.3.1"
                                        question="Quote TWO steps in handling conflict from the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'Management arranged a pre-negotiation meeting in which Zuki and Jane expressed their views separately',
                                            'They were given the opportunity to agree on the best solution'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.3.2"
                                        question="Describe other steps in handling conflict in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Acknowledge that there is conflict between employers/employees/parties in the workplace',
                                            'Identify the cause of the conflict',
                                            'Arrange time and place for negotiations √ where all employees involved are present',
                                            'Arrange a meeting between conflicting employers/employees',
                                            'Make intentions for the intervention clear so that parties involved may feel at ease',
                                            'Each party has the opportunity to express his/her own opinions/feelings',
                                            'Conflicting parties may recognise that their views are different during the meeting',
                                            'Analyse/Evaluate the cause(s) of conflict by breaking it down into different parts',
                                            'Blame shifting should be avoided and a joint effort should be made',
                                            'Direct conflicting parties towards finding/focusing on solutions',
                                            'Devise/Brainstorm possible ways of resolving the conflict',
                                            'Conflicting parties agree on criteria to evaluate the alternatives',
                                            'Select/Implement the best solution'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.4"
                                        question="Explain ways in which businesses can deal with unemployment a socio-economic issue"
                                        type="textarea"
                                        correctAnswers={[
                                            'Provide skills development programmes through learnerships',
                                            'Offer bursaries to the community to improve the level of education',
                                            'Create jobs for members of the community',
                                            'Provide entrepreneurial programmes that can promote self-employment',
                                            'Support existing small businesses to create more employment opportunities'
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
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">TECH CARPETS (TC)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Tech Carpets is a large business that specialises in the manufacturing of
                                            carpets. TC did not declare all their income to the South African Revenue
                                            Service (SARS) for the previous financial year. Employees make personal
                                            calls during working hours. TC also use fine print to hide important information
                                            when promoting their products.
                                        </p>
                                    </div>
                                    <p className="font-medium text-[var(--text-primary)]">Identify TWO types of unethical business practices applicable to TC. Motivate
                                        your answer by quoting from the scenario above.</p>
                                    <p className="font-medium text-[var(--text-primary)]">Use the table below as a GUIDE to answer QUESTIONS 3.5</p>

                                    <table className="pdf-table">
                                        <thead>
                                        <tr><th>TYPES OF UNETHICAL BUSINESS PRACTICES</th>
                                            <th>MOTIVATIONS</th>
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
                                                        'Taxation',
                                                        'Tax evasion',
                                                        'Unfair advertising'
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
                                                        'TC did not declare all their income to the South African Revenue Service (SARS) for the previous financial year',
                                                        'TC also use fine print to hide important information when promoting their products'
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
                                        id="3.6"
                                        question="Discuss the impact of corporate social responsibility (CSR) on communities."
                                        type="text"
                                        correctAnswers={[
                                            'Community skills can be improved through the provisions of bursaries',
                                            'Better educational facilities are established in poor communities',
                                            'The standard of living of communities √ is uplifted /Quality of life of communities is improved',
                                            'Investing in the medical infrastructure, will improve the health of communities',
                                            'Socio-economic issues are attended to which will improve the welfare of communities',
                                            'Training opportunities increase the possibility of appointments of members from communities',
                                            'Implementing developmental programmes improves entrepreneurial skills of communities',
                                            'Businesses are not always equipped to address social problems',
                                            'Communities tend to be dependent on CSR programmes and struggle to take their own initiatives',
                                            'Distribution of scarce resources to selected beneficiaries in communities may cause problems such as discrimination',
                                            'Some businesses only participate in CSR initiatives to raise profit and do not really care for communities in which they operate',
                                            'Businesses cannot meet the long term needs of the society. /Businesses cannot deliver sustainable CSR programmes',
                                            'The benefits of the programmes may not filter to the intended persons within the communities',
                                            'Businesses tend to focus on CSR projects that does not directly benefit communities'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>


                                <div>
                                    <Question
                                        id="3.7"
                                        question="Suggest ways in which professional, responsible, ethical and effective business practices should be conducted."
                                        type="textarea"
                                        correctAnswers={[
                                            'Mission statement should include the values of equality/respect',
                                            'Businesses should develop equity programmes/promote strategies to ensure that all employees are treated equally regardless of status/rank/power',
                                            'Treat workers with respect/dignity by recognising work well done/the value of human capital',
                                            'Plan properly and put preventative measures in place',
                                            'Pay fair wages/salaries which are in line with the minimum requirements of the BCEA/Remunerate employees for working overtime/during public holidays',
                                            'Engage in environmental awareness programmes/Refrain from polluting the environment such as legally disposing of toxic waste',
                                            'Refrain from starting a venture using other businesses\' ideas that are protected by law',
                                            'Business decisions and actions must be clear/transparent to all stakeholders',
                                            'Businesses should be accountable /responsible for their decisions and actions/patent rights',
                                            'Hire honest/trustworthy accountants/financial officers with good credentials',
                                            'Regular/Timeous payment of taxes',
                                            'All workers should have access to equal opportunities/ positions/ resources',
                                            'Ensure that employees work in a work environment that is conducive to safety/ fairness/free of embarrassment',
                                            'Draw up a code of ethics/conduct',
                                            'On-going development and training for all employees',
                                            'Performance management systems/Appraisals should be in place',
                                            'Adequate internal controls/monitoring/evaluatio'
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
                                        question="State any THREE factors that should be considered when making investment decisions."
                                        numItems={4}
                                        correctAnswers={[
                                            'Return on investment',
                                            'Risk',
                                            'Investment term',
                                            'Investment period'
                                        ]}
                                        marks={3}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        4.2 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">RAVAT TRADERS (RT)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            The management of Ravat Traders ensures that both the business and
                                            employees each contribute 1% of their wages to the Department of Labour.
                                            The contribution is compulsory as specified in legislation.
                                        </p>
                                    </div>
                                    <Question
                                        id="4.2.1"
                                        question="Identify the type of compulsory insurance applicable to the scenario above."
                                        type="text"
                                        correctAnswers={[
                                            'Unemployment Insurance Fund',
                                            'UIF'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.2.2"
                                        question="Explain ONE other type of compulsory insurance."
                                        type="textarea"
                                        correctAnswers={[
                                            'RAF/RABS insures road users against the negligence of other road users',
                                            'The RAF/RABS provides compulsory cover for all road users in South Africa, which include South African businesses',
                                            'Drivers of business vehicles are indemnified against claims by persons injured in vehicle accidents',
                                            'RAF/RABS is funded by a levy on the sale of fuel/diesel/petrol',
                                            'The amount that can be claimed for loss of income is limited by legislation',
                                            'The next of kin of workers/breadwinners who are injured/killed in road accidents, may claim directly from the RAF/RABS',
                                            'Injured parties and negligent drivers are both covered by RAF/RABS',
                                            'The injured party will be compensated, irrespective of whether the negligent driver is rich/poor/insured/uninsured',
                                            'The fund covers occupational diseases and workplace injuries',
                                            'Compensates employees for injuries and diseases incurred at work',
                                            'Compensation paid is determined by the degree of disablement',
                                            'The contribution payable is reviewed every few years according to the risk associated with that type of work',
                                            'All employers are obliged to register with the Compensation Fund so that employees may be compensated for accidents and diseases sustained in the workplace',
                                            'The fund covers employers for any legal claim that workers may bring against them',
                                            'Employers are required to report all accidents within 7 days and occupational diseases within 14 days to the Compensation Commissioner',
                                            'Employers are responsible for contributing towards the fund and may not claim money back from employees/deduct contributions from wages',
                                            'Employees do not have to contribute towards this fund',
                                            'Employees receive medical assistance provided there is no other party/medical fund involved'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">4.3 Discuss how the following criteria could contribute to the success and/or failure of a partnership:</p>
                                    <Question
                                        id="4.3.1"
                                        question="Capital"
                                        type="textarea"
                                        correctAnswers={[
                                            'Very little capital is needed to start a partnership',
                                            'Contribution can be in the form of cash/capital/skills/equipment',
                                            'More than one partner can make a contribution',
                                            'Capital can be carefully spent and managed by the partners',
                                            'Partners may not all have capital to put into the business when needed/limiting the growth',
                                            'Unequal inputs as some partners put in expertise instead of cash'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.3.2"
                                        question="Management"
                                        type="textarea"
                                        correctAnswers={[
                                            'Partners are actively involved in management and may use the ideas of other partners',
                                            'Partners have access to expertise of other partners when difficult decisions have to be made',
                                            'Not all partners need to be actively involved in management and could rather appoint competent managers',
                                            'Decision making can be time consuming as all partners have to be in agreement',
                                            'Some management tasks may be neglected, as one partner may leave it to others to complete',
                                            'Partners may disagree on how to run the business, which may lead to tension between them',
                                            'Partners are agents of the partnership and bad management decisions may be forced onto other partners'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="4.4"
                                        question="Suggest situations in which the laissez-faire/free-reign leadership style can be applied in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Subordinates are experts and know what they want/can take responsibility for their actions',
                                            'The leader is very busy and delegation of tasks will increase productivity',
                                            'Team members need to improve/develop leadership skills',
                                            'Employees are highly experienced and know more about the task than the leader'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS ROLES</h3>
                                <div>
                                    <ListQuestion
                                        id="4.5"
                                        question="Name FOUR corporate social investment (CSI) focus areas."
                                        numItems={4}
                                        correctAnswers={[
                                            'Community',
                                            'Rural development',
                                            'Employees',
                                            'Environment'
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
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">CHAMPION WINNERS (CW)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Ntsiki is a team leader for Champion Winners, which consists of highly skilled
                                            team members. All members agreed on set roles and responsibilities. They
                                            also know that all tasks must be completed before the team dissolves.
                                        </p>
                                    </div>

                                    <p className="mb-4 text-[var(--text-secondary)]">Identify TWO stages of team development that were experienced by CW. Motivate your answer by quoting from the scenario above.</p>
                                    <p className="mb-4 text-[var(--text-secondary)]">Use the table below as a GUIDE to answer QUESTION 4.6.</p>
                                    <table className="pdf-table">
                                        <thead>
                                        <tr>
                                            <th>STAGES OF TEAM DEVELOPMENT</th>
                                            <th>MOTIVATIONS</th>
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
                                                        'Norming',
                                                        'Adjourning',
                                                        'Mourning'
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
                                                        'All members agreed on set roles and responsibilities',
                                                        'They also know that all tasks must be completed before the team dissolves'
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
                                        id="4.7"
                                        question="Discuss the impact of the nominal group technique in solving complex business problems."
                                        type="textarea"
                                        correctAnswers={[
                                            'It provides time to think about the question in silence before responding',
                                            'Each team member/director has a chance to participate without interference from other team members',
                                            'Voting on the ideas is anonymous and may be more reliable/honest',
                                            'Everyone in the group is given an opportunity to contribute to the discussion√, while avoiding the likelihood of one person dominating the group process',
                                            'Strong technique for preventing conformity to group pressure',
                                            'It minimises discussion, and thus does not allow for the full development of ideas',
                                            'It is time consuming, as each member must make a presentation',
                                            'Suggestions may not be as creative as when a group throws ideas around',
                                            'Ideas/Inputs made by members may not converge and cannot lead to the same solution(s).'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.8"
                                        question="Advise businesses on the benefits of diversity in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Workforce diversity improves the ability of businesses to solve problems/innovate/cultivate diverse markets',
                                            'Employees value each other‟s diversity and learn to connect/communicate across lines of difference',
                                            'Diversity in the workforce improves morale/motivation',
                                            'Employees demonstrate greater loyalty to businesses because they feel respected/accepted/understood',
                                            'Diversified workforce can give businesses a competitive advantage, as they can render better services',
                                            'Being respectful of differences/demonstrating diversity makes good business sense/improves profitability',
                                            'Diverse businesses ensure that their policies/practices empower every employee to perform at his/her full potential',
                                            'Stakeholders increasingly evaluate businesses on how they manage diversity in the workplace',
                                            'Employees from different backgrounds can bring different perspectives to businesses'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

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
                                        Effective management and leadership play an important role in achieving business
                                        goals. Many leaders follow the transformational leadership theory as a guide to lead
                                        their employees. Others use the democratic and autocratic leadership styles in the
                                        workplace. Some leaders agree that the role of personal attitude is important for
                                        successful leadership.
                                    </p>
                                </div>
                                <Question
                                    id="5"
                                    question="Write an essay on the Skills Development Act in which you include the following aspects:
                                -Outline the role of SETAs in supporting the Skills Development Act.
                                -Explain the purpose of the Skills Development Act.
                                -Discuss the impact of the Skills Development Act on businesses.
                                -Recommend ways in which businesses can comply with this Act."
                                    type="textarea"
                                    correctAnswers={[
                                        'Leaders develop a vision to set direction for the business',
                                        'Managers are analytical thinkers as they make different types of decisions',
                                        'The transformational leadership theory allows for change to be implemented \n' +
                                        'successfully in the workplace',
                                        'Guides human behaviour',
                                        'Communicates through management functions such as the line function',
                                        'Administers plans/programs/tasks to reach targets',
                                        'Controls systems and procedures to get the job done',
                                        'Focuses on how and when',
                                        'Focuses on the short/medium term',
                                        'A person becomes a manager because of the position in which he/she is appointed',
                                        'Influences human behaviour',
                                        'Communicates by means of interaction/behaviour/vision/values/charisma',
                                        'Innovates/Encourages new ideas to increase productivity',
                                        'Focuses on what and why',
                                        'Suitable for a dynamic environment, where change could be drastic',
                                        'The passion/vision/personality of leaders inspire followers to change their expectations/perceptions/motivation to work towards a common goal',
                                        'Strategic thinking leaders develop a long term vision for the organisation and \n' +
                                        'sell it to subordinates/employees',
                                        'Leaders have the trust/respect/admiration of their followers/subordinates',
                                        'Promotes intellectual stimulation/creative thinking/problem solving which result \n' +
                                        'in the growth/development/success of the business',
                                        'Employees participate in the decision-making process, so they feel \n' +
                                        'empowered/positive',
                                        'Staff gives a variety of ideas/inputs/feedback/viewpoints that can lead to \n' +
                                        'innovation/improved production methods/increased sales',
                                        'Clear/Two-way communication ensures group commitment to final decision(s)',
                                        'Incorrect decisions may be made if staff is inexperienced/not fully informed',
                                        'Decision making may be time consuming because stakeholders have to be consulted',
                                        'Employees may feel discouraged if their opinions/inputs are not considered',
                                        'Quick decisions can be taken without consulting/considering followers/employees',
                                        'Work gets done in time/on schedule as targets are clearly specified',
                                        'Direct supervision/strict control ensure high quality products/service',
                                        'Leaders and followers may become divided and may not agree on ways to \n' +
                                        'solve problems',
                                        'Workers can become demotivated if their opinions/ideas are not considered',
                                        'Demotivated workers impact negatively on productivity',
                                        'Positive attitude releases leadership potential for personal growth',
                                        'A leader\'s good attitude can influence the success of the business',
                                        'Great leaders understand that the right attitude will set the right atmosphere',
                                        'Leaders\' attitude may influence employees\'/teams\' thoughts/behaviour',
                                        'Leaders should model the behaviour that they want to see in team members',
                                        'Competent managers are able to see beyond the current situation and plan \n' +
                                        'ahead of time',
                                        'The transformational leadership theory provides guidelines on how change should be handled in the workplace',
                                        'The democratic leadership style is beneficial to both leaders and followers as \n' +
                                        'they learn from one another'
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
                                        Businesses need to identify problems that affect their operations in order to make
                                        informed decisions. They must also create an environment that promotes creative
                                        thinking to enjoy the benefits of creativity in the workplace. The Delphi technique and
                                        the force-field analysis enable businesses to solve complex business problems.
                                    </p>
                                </div>
                                <Question
                                    id="6"
                                    question="Write an essay on leadership in business roles, including: Qualities of effective leaders; Impact on team performance; Strategies for ethical leadership; Advice for businesses on developing leaders."
                                    type="textarea"
                                    correctAnswers={[
                                        'The business environment is volatile and requires advanced creative thinking \n' +
                                        'skills for effective decisions',
                                        'An environment that promotes creative thinking enables employees to unleash \n' +
                                        'their potential for the benefit of businesses',
                                        'Creative thinking enables businesses to differentiate their products and develop \n' +
                                        'new ways of doing things',
                                        'Businesses with diverse and highly skilled employees may apply the Delphi\n' +
                                        'technique to avoid delays in solving complex business problems',
                                        'Problems can be solved by a group/team which makes the process consultative',
                                        'Alternative solutions are generated/identified and critically evaluated',
                                        'It is often done by one person/a member of senior management who makes the process authoritarian',
                                        'Various alternatives are considered before deciding on the best one',
                                        'Encourage alternative ways√ of working/doing things',
                                        'Emphasise the importance of creative thinking√ to ensure that all staff know that \n' +
                                        'management wants to hear their ideas',
                                        'Make time for brainstorming sessions√ to generate new ideas such as regular \n' +
                                        'workshops generate more ideas/build on one another\'s ideas',
                                        'Place suggestion boxes around the workplace√ and keep communication \n' +
                                        'channels open for new ideas',
                                        'Train staff in innovative techniques√ such as creative problem-solving skills/ \n' +
                                        'mind-mapping/lateral thinking',
                                        'Encourage job swops√ within the organisation√/Study how other businesses√ \n' +
                                        'are doing things',
                                        'Better/Unique/Unconventional ideas/solutions√ are generated',
                                        'May give the business a competitive advantage√ if unusual/unique solutions/ \n' +
                                        'ideas/strategies are implemented',
                                        'Complex business problems√ may be solved',
                                        'Productivity increases as management/employees may quickly generate \n' +
                                        'multiple ideas√ which utilises time and money more effectively',
                                        'Managers/Employees have more confidence√ as they can live up to their full potential',
                                        'Managers will be better leaders√ as they will be able to handle/manage \n' +
                                        'change(s) positively and creative',
                                        'Businesses must invite a panel of experts to research the complaints from customers',
                                        'Experts do not have to be in one place and will be contacted individually',
                                        'Design a questionnaire consisting of questions on how to improve the quality of \n' +
                                        'their products and distribute it to the panel members/experts',
                                        'Request the panel to individually respond to the questionnaire/suggest \n' +
                                        'improvements to the products and return it to the business',
                                        'Describe the current situation/problem and the desired situation',
                                        'Weigh up the positives and negatives then decide if the project is viable',
                                        'Businesses should put systems in place that will enable them to overcome \n' +
                                        'competition in the market',
                                        'Creating an environment that promotes creative thinking in the workplace \n' +
                                        'contributes in achieving business goals and increasing the market share',
                                        'Creative thinking enables businesses to keep abreast with latest development \n' +
                                        'in the market.'
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

BusinessStudiesP2Nov2022.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP2Nov2022;