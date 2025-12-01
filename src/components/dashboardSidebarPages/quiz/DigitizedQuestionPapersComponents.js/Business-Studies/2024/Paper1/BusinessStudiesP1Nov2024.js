import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import q23 from "../../coatOfArm.png";

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

const BusinessStudiesP1Nov2024 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
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
                        src={q23}
                        alt="Coat of Arms of South Africa"
                        className="coat-of-arms absolute top-4 left-4"
                        style={{position: 'relative', top: '1px', left: '485px'}}
                    />
                    <div className="header-text">
                        <strong>basic education</strong>
                        <br/>Department:<br/>
                        Basic Education<br/>
                        <strong>Republic of South Africa</strong>
                    </div>
                    <h1>NATIONAL SENIOR CERTIFICATE</h1>
                    <h2>Business Studies P1 November 2024</h2>
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
                    {/* Section A: Compulsory */}
                    <div className="pdf-section page-break">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION A: COMPULSORY (30 marks)</h2>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 1</h3>
                        <div className="space-y-6">
                            <div>
                                <Question
                                    id="1.1.1"
                                    question="This Act prevents discrimination on the grounds of race, gender and disability in the workplace:"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. Consumer Protection Act (CPA), 2008 (Act 68 of 2008)' },
                                        { value: 'B', text: 'B. Employment Equity Act (EEA), 1998 (Act 55 of 1998)' },
                                        { value: 'C', text: 'C. Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)' },
                                        { value: 'D', text: 'D. Labour Relations Act (LRA), 1995 (Act 66 of 1995)' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.2"
                                    question="Niemand Traders is experiencing a high employee turnover. This is classified as a/an … in the SWOT analysis."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. weakness' },
                                        { value: 'B', text: 'B. threat' },
                                        { value: 'C', text: 'C. opportunity' },
                                        { value: 'D', text: 'D. strength' }
                                    ]}
                                    correctAnswers="A"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.3"
                                    question="Mabasa Enterprise has … control over suppliers who increase the prices of their products."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. full' },
                                        { value: 'B', text: 'B. no' },
                                        { value: 'C', text: 'C. limited' },
                                        { value: 'D', text: 'D. complete' }
                                    ]}
                                    correctAnswers="C"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.4"
                                    question="The role of the interviewee during an interview is to …"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. make the interviewer feel at ease.' },
                                        { value: 'B', text: 'B. explain the purpose of the interview to the panel.' },
                                        { value: 'C', text: 'C. prepare responses for possible questions.' },
                                        { value: 'D', text: 'D. ask clarity-seeking questions about the position.' }
                                    ]}
                                    correctAnswers="D"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.5"
                                    question="Businesses utilise machinery and equipment optimally in the … function."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. purchasing' },
                                        { value: 'B', text: 'B. production' },
                                        { value: 'C', text: 'C. marketing' },
                                        { value: 'D', text: 'D. administration' }
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
                                    employer;    secondary;    placement;    backward vertical;    plan;
                                    selection;    forward vertical;    act;    employee;    tertiary
                                </p>
                                <Question
                                    id="1.2.1"
                                    question="The … has the right to embark on a legal strike as a remedy for grievances."
                                    type="text"
                                    correctAnswers="employee"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.2"
                                    question="Sizwe Bakery applied the … integration strategy when they bought a wheat farm."
                                    type="text"
                                    correctAnswers="backward vertical"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.3"
                                    question="Fazzel Hairdressing Salon operates in the … sector as they specialise in the selling of hair products."
                                    type="text"
                                    correctAnswers="tertiary"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.4"
                                    question="The employee's qualifications and skills are matched with the requirements of the job during the ... procedure."
                                    type="text"
                                    correctAnswers="placement"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.5"
                                    question="Monwa Plastics continuously revise their processes to improve the quality of their products. This is known as the … step in the PDCA model."
                                    type="text"
                                    correctAnswers="act"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                            {/* ... 1.2.2 to 1.2.5 */}
                            {/* 1.3 Matching (5 x 2 = 10 marks) */}
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
                                                question="Learnership"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="E"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            A. process of finding potential candidates for available vacancies
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">E: practical training opportunities that lead to a recognised qualification</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.2"
                                                question="Compensation for Occupational Injuries and Diseases Amendment Act, 1997 (Act 61 of 1997)"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="D"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            B. large businesses may prevent effective training due to poor communication
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">D: provides protection to employees who become disabled due to a workplace accident</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.3"
                                                question="Recruitment"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="A"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            C. ensures that the features of goods satisfy a specific need
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">A: process of finding potential candidates for available vacancies</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.4"
                                                question="Quality control"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="J"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            D. provides protection to employees who become disabled due to a workplace accident
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">J: ensures that finished products meet the required standards</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.5"
                                                question="Adequate financing and capacity"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="I"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            E. practical training opportunities that lead to a recognised qualification
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">I: large businesses can afford to put systems in place to prevent defects in products</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            F. process of determining a candidate's suitability for the position
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            G. provides protection to employees who are unfairly dismissed in the workplace
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            H. practical training opportunities for ongoing professional development
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            I. large businesses can afford to put systems in place to prevent defects in products
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            J. ensures that finished products meet the required standards
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
                                        question="Name any TWO types of diversification strategies."
                                        numItems={2}
                                        correctAnswers={[
                                            'Concentric diversification',
                                            'Horizontal diversification',
                                            'Conglomerate diversification'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="2.2"
                                        question="Outline the advantages of intensive strategies."
                                        numItems={6}
                                        correctAnswers={[
                                            'Increase in sales/income/profitability due to a variety of advertising campaigns',
                                            'Regular sales to existing customers may increase',
                                            'Gain customer loyalty through effective promotion campaigns',
                                            'Improved service delivery may positively impact/increase sales',
                                            'Eliminate competitors and dominate market prices',
                                            'Decrease in price could influence customers to buy more products',
                                            'Businesses can have more control over the prices of products/services',
                                            'Enables the business to focus on markets/well-researched quality products that satisfy the needs of consumers'
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
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MONDO MANUFACTURERS (MM)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Mondo Manufacturers specialise in the production of winter blankets.
                                            MM disposes of their chemical waste from the manufacturing process into the
                                            local river in order to save costs.
                                        </p>
                                    </div>
                                    <Question
                                        id="2.3.1"
                                        question="Name the PESTLE factor that is applicable to MM in the scenario above."
                                        type="text"
                                        correctAnswers="Environmental"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <ListQuestion
                                        id="2.3.2"
                                        question="Recommend ways in which MM can deal with the challenges posed by the PESTLE factor named in QUESTION 2.3.1."
                                        numItems={4}
                                        correctAnswers={[
                                            'Chemicals/Ingredients should be clearly indicated on labels/packaging to inform customers about possible side effects/correct use of products',
                                            'MM/Businesses implemented cost effective measures to dispose of waste',
                                            'Implement recycling measures to prevent pollution of the environment/Use packaging that is re-usable/recyclable',
                                            'Engage in environmentally sustainable practices such as the conservation/preservation of natural resources'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="2.4"
                                        question="Discuss any TWO types of defensive strategies."
                                        type="textarea"
                                        correctAnswers={[
                                            'Divestiture - Disposing/Selling some assets/divisions that are no longer profitable/productive',
                                            'Retrenchment - Terminating employment contracts/Letting go of employees for operational reasons/to reduce costs/expenses',
                                            'Liquidation - Selling all assets/Bringing the business activities to an end to pay creditors due to lack of capital'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        2.5 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">LASS SUPPLIERS (LS)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Lass Suppliers implemented the Broad-Based Black Economic Empowerment
                                            Act (BBBEE), 2003 (Act 53 of 2003). They promoted Sandile to a senior
                                            executive position to serve on their board of directors
                                        </p>
                                    </div>
                                    <Question
                                        id="2.5.1"
                                        question="Name the pillar of the Broad-Based Black Economic Empowerment Act (BBBEE), 2003 (Act 53 of 2003) applied by LS in the scenario above."
                                        type="text"
                                        correctAnswers={['Management control']}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="2.5.2"
                                        question="Describe the purpose of the Broad-Based Black Economic Empowerment Act (BBBEE), 2003 (Act 53 of 2003)."
                                        type="textarea"
                                        correctAnswers={[
                                            'BBBEE Act enables wealth to be spread more broadly across all population groups',
                                            'Outlines areas that would give the government a platform for bringing equitable spread of wealth',
                                            'Allows for the development of Codes of Good Practice',
                                            'Empowers the Minister to issue Codes of Good Practice and publish transformation charters',
                                            'Establishes the Black Economic Empowerment Advisory Council, which addresses matters related to black empowerment',
                                            'Creates capacity within the broader economic landscape at all levels through the implementation of the BBBEE pillars'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.6"
                                        question="Explain ways in which businesses can comply with the Consumer Protection Act (CPA), 2008 (Act 68 of 2008)."
                                        type="textarea"
                                        correctAnswers={[
                                            'Disclose prices of all products on sale',
                                            'Provide/Conduct adequate training to staff/stakeholders on the CPA',
                                            'All agreements must provide for a five-day cooling off period',
                                            'Ensure that goods/services offered are standardised/of the same quality',
                                            'Comply with the requirements regarding promotional competitions',
                                            'Comply with requirements regarding the display of information on labels/packaging',
                                            'Display the name of the business on all business documents, such as invoices/contracts',
                                            'Bundling of goods/services should benefit consumers, such as offering a cell phone and a tablet at a special price'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.7"
                                        question="Discuss the impact of the Labour Relations Act (LRA), 1995 (Act 66 of 1995) on businesses."
                                        type="textarea"
                                        correctAnswers={[
                                            'Promotes a healthy relationship between the employer and employees',
                                            'Protects the rights of businesses in labour relations issues',
                                            'Labour disputes are settled quicker and are less expensive',
                                            'Workplace forums can add value to businesses if it functions properly',
                                            'Reduced global competitiveness due to lower productivity',
                                            'Productivity may decrease if employees are allowed to participate in the activities of trade unions during work time',
                                            'Costs of labour increases because of legal strikes',
                                            'Employers may not get a court interdict to stop a strike',
                                            'Many employees take advantage of the right to strike without acknowledging their responsibilities'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.8"
                                        question="Advise businesses on the strategic management process."
                                        type="textarea"
                                        correctAnswers={[
                                            'Have a clear vision/mission statement/measurable/realistic objective in place',
                                            'Identify opportunities/weaknesses/strengths/threats by conducting environmental scanning/situational analysis',
                                            'Tools available for environmental scanning may include a SWOT analysis/Porter\'s Five Forces model/PESTLE analysis/industrial analysis tools',
                                            'Formulate alternative strategies to respond to the challenges',
                                            'Develop (an) action plan(s), including the tasks to be done/deadlines to be met/resources to be procured',
                                            'Review/Analyse/Re-examine their vision/mission statement',
                                            'Conduct an environmental analysis using models such as SWOT/ PESTLE/Porter\'s Five Forces',
                                            'Formulate a strategy, such as defensive/retrenchment strategy',
                                            'Implement a strategy, using a template such as an action plan'
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
                                        question="State any FOUR sources of internal recruitment."
                                        numItems={4}
                                        correctAnswers={[
                                            'Internal e-mails/Intranet/Web sites to staff',
                                            'Word of mouth/Staff meetings',
                                            'Business newsletter/Circulars to staff',
                                            'Internal/management referrals',
                                            'Notice board of the business',
                                            'Internal bulletins',
                                            'Recommendation of current employees',
                                            'Head hunting within the business/organisational database'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="3.2"
                                        question="State any FOUR sources of internal recruitment."
                                        numItems={4}
                                        correctAnswers={[
                                            'Book and prepare the venue for the interview',
                                            'Inform all shortlisted candidates about the date and place of the interview',
                                            'Set the interview date and ensure that all interviews take place on the same date, if possible',
                                            'Notify all panel members conducting the interview about the date and place of the interview',
                                            'The interviewer should develop a core set of questions based on the skills/knowledge/ability required',
                                            'Check/read the application/verify the CV of every candidate for anything that may need to be explained',
                                            'Plan the programme for the interview and determine the time that should be allocated to each candidate'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        2.3 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">TOBBI LOGISTICS (TL)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Tobbi Logistics drafted an employment contract for Thabo, a newly
                                            appointed transport supervisor. Management explained the terms and
                                            conditions of the employment contract to him. Thabo was given an
                                            opportunity to read the contract before signing it. TL also highlighted the
                                            reasons why an employment contract could be terminated.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="3.5"
                                        question="Quote TWO legal requirements of an employment contract from the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'Management explained the terms and conditions of the employment contract to him',
                                            'Thabo was given an opportunity to read the contract before signing it'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.3.2"
                                        question="Advise businesses on the reasons for the termination of an employment contract."
                                        type="textarea"
                                        correctAnswers={[
                                            'The employer may dismiss an employee for a valid reason(s) such as unsatisfactory job performance/misconduct',
                                            'Employer may no longer have work for redundant employees/cannot fulfil the contract/is restructuring',
                                            'The employer may retrench some employees due to insolvency/may not be able to pay the employees',
                                            'Employees may decide to leave/resign voluntarily for better job opportunities',
                                            'An employee may have reached the pre-determined age for retirement',
                                            'Incapacity of an employee to work due to illness/injuries',
                                            'By a mutual agreement between the employer and employee',
                                            'The duration of the employment contract expires/comes to an end'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.4"
                                        question="Discuss the implications of the Employment Equity Act (EEA), 1998 (Act 55 of 1998) on the human resources function."
                                        type="textarea"
                                        correctAnswers={[
                                            'Offer equal pay for work of equal value',
                                            'Compile employment equity plans that indicate how they will implement affirmative action',
                                            'Ensures that affirmative action promotes diversity in the workplace',
                                            'The human resources manager must treat employees fairly and promote/provide equal opportunities in the workplace',
                                            'Retrain/Develop/Train designated groups through skills development programmes',
                                            'Restructure/Analyse current employment policies/practices/procedures to accommodate designated groups',
                                            'Ensures that the workplace represents the demographics of the country at all levels',
                                            'Conduct medical/psychological tests fairly to employees/when deemed necessary',
                                            'Report to the Department of Labour on the progress in the implementation of the equity plan',
                                            'Assign a manager to ensure that the employment equity plan will be implemented/regularly monitored'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="3.5"
                                        question="Outline the benefits of a good quality management system."
                                        numItems={4}
                                        correctAnswers={[
                                            'Effective customer services are rendered, resulting in increased customer satisfaction',
                                            'Time and resources are used efficiently',
                                            'Productivity increases through proper time management/using high quality resources',
                                            'Products/Services are constantly improved resulting in increased levels of customer satisfaction',
                                            'Vision/Mission/Business goals may be achieved',
                                            'A business has a competitive advantage over its competitors',
                                            'Regular training will continuously improve the quality of employees\' skills/knowledge',
                                            'Employers and employees will have a healthy working relationship resulting in happy/productive workers',
                                            'Increased market share/Financial sustainability as more customers improves profitability'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">3.6 Read the scenario below and answer the question that follows.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MOOSA LIMITED (ML)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Moosa Limited sells storage containers to small businesses.
                                            ML continuously updates their bookkeeping records to ensure that their
                                            tax payment to the South African Revenue Services (SARS) is timeous and
                                            accurate.
                                        </p>
                                    </div>
                                    <Question
                                        id="3.6.1"
                                        question="Identify the business function that is applicable to ML in the scenario above."
                                        type="text"
                                        correctAnswers={['Financial function']}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.6.2"
                                        question="Explain other quality indicators of the business function identified in QUESTION 3.6.1."
                                        type="textarea"
                                        correctAnswers={[
                                            'Obtain capital from the most suitable/available/reliable sources',
                                            'Negotiate better interest rates in order to keep financial cost down',
                                            'Draw up budgets to ensure sufficient application of monetary resources',
                                            'Analyse strategies to increase profitability',
                                            'Invest surplus funds to create sources of passive income',
                                            'Implement financial control measures/systems to prevent fraud',
                                            'Implement credit granting/debt collecting policies to monitor cash flow',
                                            'Draw up accurate financial statements timeously/regularly',
                                            'Accurately analyse and interpret financial information',
                                            'Invest in strategies that will assist the business to remain profitable'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.7"
                                        question="Discuss the impact of total client/customer satisfaction as a total quality management (TQM) element on large businesses."
                                        type="textarea"
                                        correctAnswers={[
                                            'Large businesses use market research/customer surveys to measure/monitor customer satisfaction/reaction time to changing consumer demand/analyse customers\' needs',
                                            'Continuously promote a positive business image',
                                            'May achieve a state of total client/customer satisfaction, if businesses follow sound business practices that incorporates all stakeholders',
                                            'Strive to understand/fulfil customer expectations by aligning cross-functional teams across critical processes',
                                            'Ensures that cross-functional teams understand their core competencies and develop/strengthen it',
                                            'Large businesses that become complacent with the existing customer satisfaction/target market may experience limited long term growth potential',
                                            'Employees who seldom come into contact with customers often do not have a clear idea of what will satisfy their needs',
                                            'Monopolistic businesses have an increased bargaining power so they do not necessarily have to please customers',
                                            'Not all employees may be involved/committed to total client/customer satisfaction.'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.8"
                                        question="Recommend ways in which total quality management (TQM) can reduce the cost of quality."
                                        type="textarea"
                                        correctAnswers={[
                                            'Introduce quality circles to discuss ways of improving the quality of their work/workmanship.',
                                            'Schedule activities to eliminate duplication of tasks',
                                            'Share responsibilities for quality output amongst management and workers',
                                            'Train employees at all levels, so that everyone understands their roles in quality management',
                                            'Develop work systems that empower employees to find new ways of improving quality',
                                            'Work closely with suppliers to improve the quality of raw materials/inputs',
                                            'Improve communication about the quality challenges/deviations, so that everyone can learn from past experiences',
                                            'Reduce investment on expensive, but ineffective inspection procedures in the production process'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                {/* ... */}
                            </div>
                        )}
                        {selectedSectionB.includes('Q4') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 4: MISCELLANEOUS TOPICS (40 marks)</h3>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS ENVIRONMENTS</h3>
                                <div>
                                    <ListQuestion
                                        id="4.1"
                                        question="Name any FOUR provisions of the Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)."
                                        numItems={4}
                                        correctAnswers={[
                                            'Regulation of working time/Ordinary hours of work/overtime/meal intervals and rest periods/Sunday work/public holidays',
                                            'Leave/annual/sick/family responsibility/maternity/paternity/parental',
                                            'Particulars of employment and remuneration',
                                            'Termination of employment',
                                            'Prohibition of employment of children and forced labour'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="4.2"
                                        question="Outline the rights of consumers in terms of the National Credit Act (NCA), 2005 (Act 34 of 2005)."
                                        numItems={6}
                                        correctAnswers={[
                                            'Apply for credit and to be free from discrimination',
                                            'Obtain reasons for credit being refused',
                                            'Receive pre-agreement documentation/credit quote that is valid for 7 days before concluding any credit transaction',
                                            'Fair and responsible marketing by the credit provider',
                                            'Surrender/Return goods to the credit provider in order to settle the outstanding amount/debt',
                                            'Apply for debt review/counselling if the consumers cannot afford to repay their debts',
                                            'Receive information in plain and understandable language',
                                            'Receive documents/statements as required by the Act',
                                            'Access and challenge credit records and information',
                                            'Receive protection of their personal information',
                                            'Receive protection from being held accountable for the use of their credit facility after they reported the loss/theft',
                                            'Refuse a credit limit increase'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">4.3 Read the scenario below and answer the questions that follow.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">SHOE BOUTIQUE (SB)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Shoe Boutique implemented a strategy aimed at improving their customer
                                            service due to a decrease in sales. The management of SB evaluated if their
                                            strategy had been effective. SB examined the underlying basis of their strategy
                                            throughout the implementation process. They also analysed the impact of the
                                            implemented strategy on their internal and external environments.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="4.3.1"
                                        question="Quote TWO steps in strategy evaluation implemented by SB from the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'SB examined the underlying basis of their strategy throughout the implementation process',
                                            'They also analysed the impact of the implemented strategy on their internal and external environments',
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.3.2"
                                        question="Explain other steps in strategy evaluation."
                                        type="textarea"
                                        correctAnswers={[
                                            'Look forward and backwards into the implementation process',
                                            'Compare the expected performance with the actual performance',
                                            'Determine the reasons for deviations and analyse these reasons',
                                            'Take corrective action so that deviations may be corrected',
                                            'Set specific dates for control and follow up',
                                            'Draw up a table of the advantages and disadvantages of a strategy',
                                            'Decide on the desired outcome√ as envisaged/expected when strategies were implemented'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="4.4"
                                        question="Advise businesses on how they could apply the power of suppliers as a force of Porter's Five Forces model to analyse their position in the market environment."
                                        type="textarea"
                                        correctAnswers={[
                                            'Assess the power of the suppliers in influencing prices',
                                            'Suppliers that deliver high quality/ unique/scarce product may have power over the business',
                                            'The more powerful the suppliers, the less control the business has over them',
                                            'The smaller the number of suppliers, the more powerful they may be as the choice of suppliers may be limited',
                                            'Identify the kind of power suppliers\' have in terms of the quality of products/services/reliability/ability to make prompt deliveries'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS OPERATIONS</h3>
                                <div>
                                    <ListQuestion
                                        id="4.5"
                                        question="State any FOUR aspects that should be included in an employment contract."
                                        numItems={4}
                                        correctAnswers={[
                                            'Personal details of the employee',
                                            'Details of the business/employer such as the name and address',
                                            'Job title/Position',
                                            'Job description such as duties/responsibilities and working conditions',
                                            'Date of employment/Commencement of employment',
                                            'Place where employee will spend most of his/her working time',
                                            'Hours of work such as normal time and overtime',
                                            'Remuneration such as weekly or monthly pay',
                                            'Benefits/Fringe benefits/Perks/Allowances',
                                            'Leave such as sick/maternity/annual/adoption leave',
                                            'Probation period'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">4.6 Read the scenario below and answer the question that follows.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MPHEMBA CONSTRUCTION (MC)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Mphemba Construction compiled a job analysis for the vacant position of a
                                            project manager. MC indicated that applicants must have a diploma in
                                            construction. The successful candidate will compile progress reports on
                                            assigned projects.
                                        </p>
                                    </div>
                                    <p className="mb-4 text-[var(--text-secondary)]">Identify TWO components of a job analysis used by MC. Motivate your answer by quoting from the scenario above.</p>
                                    <p className="mb-4 text-[var(--text-secondary)]">Use the table below as a GUIDE to answer QUESTION 4.6.</p>
                                    <table className="pdf-table">
                                        <thead>
                                        <tr>
                                            <th>COMPONENTS OF A JOB ANALYSIS</th>
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
                                                        'Job specification',
                                                        'Job description'
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
                                                        'MC indicated that applicants must have a diploma in construction',
                                                        'The successful candidate will compile progress reports on assigned projects'
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
                                        question="Explain the role of quality circles as part of continuous improvement to processes and systems."
                                        type="textarea"
                                        correctAnswers={[
                                            'Solve problems related to quality and implement improvements',
                                            'Investigate problems and suggest solutions to management',
                                            'Ensure that there is no duplication of activities/tasks in the workplace',
                                            'Make suggestions for improving processes and systems in the workplace',
                                            'Improve the quality of products/services/productivity through regular reviews of quality processes',
                                            'Monitor/Reinforce strategies to improve the smooth running of business operations',
                                            'Increase employees\' morale/motivation to boost the team spirit in achieving organisational goals',
                                            'Contribute towards the improvement and development of the organisation',
                                            'Reduce costs of redundancy and wasteful efforts in the long run',
                                            'Increase the demand for products/services of the business',
                                            'Create harmony and high performance in the workplace',
                                            'Build a healthy workplace relationship √ between the employer and employee'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.8"
                                        question="Advise businesses on the quality indicators of the general management function."
                                        type="textarea"
                                        correctAnswers={[
                                            'Develop/Implement/Monitor effective strategic plans',
                                            'Efficient organisation/allocation of business resources to provide for the successful achievement of long-term and short-term plans',
                                            'Structured standards and norms should be in place so that control mechanisms can be implemented',
                                            'Learn about/understand changes in the business environment on an on-going basis',
                                            'Effectively communicate shared vision, mission and values',
                                            'Set direction and establish priorities for their business',
                                            'Be prepared to set an example of the behaviour that is expected from employees in terms of ethics as well as productivity',
                                            'Be proactive and always seeks to improve competitive advantage over competitors',
                                            'Ensure that all departments/the business meet their deadlines/targets',
                                            ''
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
                                        The basic aim of the Skills Development Act (SDA), 1998 (Act 97 of 1998) is to
                                        expand on the knowledge and competencies of the labour force. SETAs were
                                        established to facilitate the implementation of the SDA. Businesses are expected to
                                        oblige with this Act and be fully conversant with its requirements.
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
                                        'A SETA is a vocational skills training organisation that identifies skills shortages \n' +
                                        'that are needed in different industries',
                                        'The Skills Development Act was introduced to redress the imbalances of the past',
                                        'The SDA enables South Africans to gain access to skills training opportunities that have long-term benefits',
                                        'Businesses that comply with the SDA are able to create a good public image and address skills shortages in the South African workplace',
                                        'Report to the Director General',
                                        'Promote and establish learnerships',
                                        'Collect levies and pay out grants as required',
                                        'Provide accreditation for skills development facilitators',
                                        'Register learnership agreements/learning programmes',
                                        'Approve workplace skills plans and annual training reports',
                                        'Monitor/Evaluate the actual training by service providers',
                                        'Allocate grants to employers/education/training providers',
                                        'Oversee training in different sectors of the South African economy',
                                        'Develop sector skills plans in line with the National Skills Development Strategy',
                                        'Draw up skills development plans for their specific economic sectors',
                                        'Provide training material/programmes for skills development facilitators',
                                        'Develops the skills of people in South Africa in order to improve productivity',
                                        'Invests in education and training of the South African workforce',
                                        'Improves the chances of getting a job for previously disadvantaged people',
                                        'Encourages workers to participate in learning programmes',
                                        'Redresses imbalances of the past through education and training',
                                        'Encourages businesses to improve the skills of their workers',
                                        'Provides the systematic implementation of strategies on a national, sector and workplace basis',
                                        'Increases the number of skilled employees in areas where these skills are scarce',
                                        'Trains employees to improve productivity in the workplace',
                                        'Businesses could become globally√ more competitive',
                                        'On-going skills development/learning/acquisition of new skills are encouraged to sustain the improvement of skills development',
                                        'Increases investment in education and training in the labour market',
                                        'Increases the return on investment in education and training',
                                        'Improves employment opportunities and labour movement',
                                        'Self-employment and entrepreneurship are promoted',
                                        'Workplace discrimination can be addressed through training',
                                        'Workplace is used as an active learning environment where employees can gain practical job experience',
                                        'Businesses may claim back some of the costs of training as a refund from relevant SETAs',
                                        'The SDA process is prescriptive/requires a large amount of paperwork/administration, that can cost time/money',
                                        'Skills Development Levy could be an extra burden to financially struggling businesses',
                                        'It may be monitored/controlled by government departments that do not have education/training as their key priorities',
                                        'Many courses offered by companies may not have unit standards that relate to the course content',
                                        'Skills programmes may not always address the training needs of employees',
                                        'Many service providers that offer training services are not SAQA accredited',
                                        'Many businesses may not support this government initiative',
                                        'Businesses/Employers who collect PAYE should register with the relevant SETAs',
                                        'One per cent (1%) of an employer\'s payroll must be paid over to the SETA through SARS',
                                        'Businesses should register with SARS in the area in which their business is classified (in terms of the SETA)',
                                        'Employers should submit a workplace skills plan and provide evidence that it was implemented',
                                        'Businesses with more than 50 employees must appoint a skills development facilitator',
                                        'Assess the skills of employees to determine areas in which skills development is needed',
                                        'Encourage employees to participate in learnerships and other training programmes',
                                        'Provide all employees with the opportunity to improve their skills',
                                        'Businesses should register with SETAs for training programmes that are accredited with the South African Qualification Authorities (SAQA)',
                                        'The SDA makes provisions for the establishment and the effective functioning of SETAs',
                                        'The Skills Development Act plays an important role in ensuring that the South African workforce is skilled and encourage employee participation in lifelong learning',
                                        'Businesses are encouraged to comply with this Act in order to avoid penalties and an increased financial burden on businesses'
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
                                        Businesses that follow the correct selection procedures are able to identify suitable
                                        and qualified candidates for vacant positions. They also use different salary
                                        determination methods to ensure that their employees are remunerated correctly.
                                        Businesses offering fringe benefits and inducting new employees are more likely to
                                        have a productive workforce.
                                    </p>
                                </div>

                                <Question
                                    id="6"
                                    question="Write an essay on the human resources function in which you include the following
                                            aspects:
                                             Outline the selection procedure as a human resources activity.
                                             Explain the TWO salary determination methods.
                                             Discuss the impact of fringe benefits on businesses.
                                             Advise businesses on the benefits of induction."
                                    type="textarea"
                                    correctAnswers={[
                                        'The human resources manager is responsible for selecting and appointing qualified and competent employees to avoid fruitless expenditure',
                                        'Businesses use different salary determination methods to appropriately compensate their employees according to the kind of work done or tasks they perform',
                                        'Employees receive fringe benefits over and above their normal salaries and wages, which often improves their overall job satisfaction',
                                        'The induction of new employees into the work environment provides introductory training to allow for a smooth transition into the new work environment',
                                        'Determine fair assessment criteria on which selection will be based',
                                        'Applicants must submit the application forms/curriculum vitae and certified',
                                        'copies of personal documents/IDs/proof of qualifications',
                                        'Sort the received documents/CVs according to the assessment/selection criteria',
                                        'Screen/Determine which applications meet the minimum job requirements and separate these from the rest',
                                        'Preliminary interviews are conducted if many suitable applications were received/to identify suitable applicants',
                                        'Reference checks/Vetting process should be made/followed to verify work experience/criminal records/credit records/qualifications on the CV',
                                        'Compile a shortlist of potential candidates identified',
                                        'Shortlisted candidates may be subjected to various types of selection tests such as skills tests',
                                        'Invite shortlisted candidates for an interview',
                                        'A written offer is made to the selected candidate',
                                        'Receive documentation such as application forms and sort it according to the criteria of the job',
                                        'Evaluate CVs and create a shortlist/Screen the applicants',
                                        'Check information in the CVs and contact references',
                                        'Conduct preliminary sifting interviews to identify applicants who are not suitable for the job, although they meet all requirements',
                                        'Assess/Test candidates who have applied for senior positions/to ensure the best candidate is chosen',
                                        'Conduct interviews with shortlisted candidates',
                                        'Allows new employees to settle in quickly and work effectively',
                                        'Ensures that new employees understand rules and restrictions in the business',
                                        'New employees may establish relationships with fellow employees at different levels',
                                        'Make new employees feel at ease in the workplace, which reduces anxiety/insecurity/fear',
                                        'The results obtained during the induction process provide a base for focussed training',
                                        'Increases quality of performance/productivity which promotes the effective use of working methods/resources',
                                        'Minimises/Decreases the need for on-going training and development',
                                        'Employees will be familiar with organisational structures, such as who are their supervisors/low level managers',
                                        'Opportunities are created for new employees to experience/explore different departments',
                                        'New employees will understand their role/responsibilities concerning safety regulations and rules',
                                        'Businesses which cannot offer fringe benefits fail to attract skilled workers',
                                        'Businesses which offer employees different benefit plans may create resentment to those who receive less benefit resulting in lower productivity',
                                        'It can create conflict/lead to corruption if allocated unfairly',
                                        'Attractive fringe benefit packages may result in higher employee retention/reduces employee turnover',
                                        'Attracts qualified/skilled/experienced employees who may positively contribute towards the business goals/objectives',
                                        'Improves productivity resulting in higher profitability',
                                        'It increases employee satisfaction/loyalty as they may be willing to go the extra mile',
                                        'Workers are paid according to the amount of time/hours they spend at work/on a task',
                                        'Workers with the same experience/qualifications are paid on salary scales regardless of the amount of work done',
                                        'Many private and public sector businesses use this method',
                                        'Workers are paid according to the number of items/units produced/action performed',
                                        'Workers are not remunerated for the number of hours worked, regardless of how long it takes them to make the items',
                                        'Mostly used in factories particularly in the textile/technology industries'
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

BusinessStudiesP1Nov2024.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP1Nov2024;