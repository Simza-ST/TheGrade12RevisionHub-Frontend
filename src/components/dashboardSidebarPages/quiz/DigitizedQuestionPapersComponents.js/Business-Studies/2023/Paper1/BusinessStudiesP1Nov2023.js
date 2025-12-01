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

const BusinessStudiesP1Nov2023 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
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
                    <h2>Business Studies P1 November 2023</h2>
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
                    <div className="pdf-section page-break">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION A: COMPULSORY (30 marks)</h2>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 1</h3>
                        <div className="space-y-6">
                            <div>
                                <Question
                                    id="1.1.1"
                                    question="This Act outlines the minimum requirements for the employment contract:"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. Consumer Protection Act (CPA), 2008 (Act 68 of 2008)' },
                                        { value: 'B', text: 'B. Employment Equity Act (EEA), 1998 (Act 55 of 1998)' },
                                        { value: 'C', text: 'C. Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)' },
                                        { value: 'D', text: 'D. Skills Development Act (SDA), 1998 (Act 97 of 1998) ' }
                                    ]}
                                    correctAnswers="C"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.2"
                                    question="The Compensation for Occupational Injuries and Diseases Amendment Act (COIDA), 1997 (Act 61 of 1997) promotes …"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. Consultation in the workplace.' },
                                        { value: 'B', text: 'B. safety in the workplace' },
                                        { value: 'C', text: 'C. employees\' rights in the workplace' },
                                        { value: 'D', text: 'D. diversity in the workplace' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.3"
                                    question="A social factor of the PESTLE analysis posing a challenge to Rashid Carpentry is that …"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. customers are unable to afford their products due to low-income levels.' },
                                        { value: 'B', text: 'B. costs involved in obtaining a trading licence are high' },
                                        { value: 'C', text: 'C. employees are unskilled to operate new equipment' },
                                        { value: 'D', text: 'D. measures to dispose of their waste are expensive' }
                                    ]}
                                    correctAnswers="A"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.4"
                                    question="Businesses are required to contribute to the … fund as a compulsory fringe benefit."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. pension' },
                                        { value: 'B', text: 'B. medical aid' },
                                        { value: 'C', text: 'C. provident' },
                                        { value: 'D', text: 'D. unemployment insurance' }
                                    ]}
                                    correctAnswers="D"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.5"
                                    question="Astra Limited implements continuous skills development as a total quality management (TQM) element when … "
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. applying procedures to reduce defects in machinery' },
                                        { value: 'B', text: 'B. using the human resources department to address training needs' },
                                        { value: 'C', text: 'C. sharing their strategies with competitors' },
                                        { value: 'D', text: 'D. offering trained employees better incentives' }
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
                                <p className="scenario">selection; weakness; public relations; BBBEE Act; learnerships; BEE; internships; threat; production; recruitment</p>
                                <Question
                                    id="1.2.1"
                                    question="Businesses provide … to employees through practical training opportunities that lead to a recognised qualification."
                                    type="text"
                                    correctAnswers="learnerships"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.2"
                                    question="KB Transport is affected by an increase in the price of petrol. This is classified as a … in the SWOT analysis"
                                    type="text"
                                    correctAnswers="threat"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.3"
                                    question="The … focused only on three pillars which excluded some previously disadvantaged people"
                                    type="text"
                                    correctAnswers="BEE"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.4"
                                    question="Reference checks are made during the … procedure to verify the content of applicants' CVs"
                                    type="text"
                                    correctAnswers="selection"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.5"
                                    question="The … function is responsible for providing regular press releases to all stakeholders."
                                    type="text"
                                    correctAnswers="public relations"
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
                                                question="Consumer Protection Act (CPA), 2008 (Act 68 of 2008)"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="D"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            A. describes the duties that need to be performed for a certain post
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">D: promotes customers' safety by protecting them from hazardous products</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.2"
                                                question="Human resources development strategy"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="H"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            B. adding new products that are unrelated to existing products appealing to new customers
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">H: improves the supply of skills which directly benefit the country</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.3"
                                                question="Conglomerate diversification"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="B"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            C. aims to get the product right the first time
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">B: adding new products that are unrelated to existing products appealing to new customers</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.4"
                                                question="Job specification"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="I"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            D. promotes customers' safety by protecting them from hazardous products
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">I: describes the acceptable qualifications for a certain post</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.5"
                                                question="Quality assurance"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="C"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            E. improves the use of the National Skills Fund
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">C: aims to get the product right the first time</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            F. adding new products that are related to existing products appealing to new customers
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            G. promotes branded products that are preferred by customers
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            H. improves the supply of skills which directly benefit the country
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            I. describes the acceptable qualifications for a certain post
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            J. aims to provide a framework for organisational processes
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
                                        question="Name any FOUR consumer rights as stipulated in the Consumer Protection Act (CPA), 2008 (Act 68 of 2008)."
                                        numItems={2}
                                        correctAnswers={[
                                            'Right to choose',
                                            'Right to privacy',
                                            'Right to fair and honest dealings',
                                            'Right to disclosure and information',
                                            'Right to fair and responsible marketing',
                                            'Right to fair value/good quality and safety',
                                            'Right to accountability by suppliers',
                                            'Right to fair/just and reasonable terms and conditions',
                                            'Right of equality in the consumer market'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">2.2 Read the scenario below and answer the questions that follow.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">BEST CANNING (BC)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Best Canning manufactures a variety of canned foods. BC lost customers to
                                            Damian Canning because their products are of a high quality. The profitability
                                            of BC decreased due to poor management skills. Best Canning borrowed
                                            money from the bank at a high interest rate.
                                        </p>
                                    </div>

                                    <p className="font-medium text-[var(--text-primary)]">2.2.1  Quote THREE challenges for BC from the scenario above.</p>
                                    <p className="font-medium text-[var(--text-primary)]">2.2.2  Classify BC's challenges according to the THREE business environments.</p>
                                    <p className="font-medium text-[var(--text-primary)]">2.2.3  State the extent of control BC has over EACH business environment classified in QUESTION 2.2.2.</p>
                                    <p className="font-medium text-[var(--text-primary)]">Use the table below as a GUIDE to answer QUESTIONS 2.2.1 to 2.2.3.</p>
                                    <table className="pdf-table">
                                        <thead>
                                        <tr><th>CHALLENGES (2.2.1)</th>
                                            <th>BUSINESS ENVIRONMENTS (2.2.2)</th>
                                            <th>EXTENT OF CONTROL (2.2.3)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <ListQuestion
                                                    id=""
                                                    question=""
                                                    numItems={3}
                                                    correctAnswers={[
                                                        'BC lost customers to Damian Canning because their products are of a high quality.',
                                                        'The profitability of BC decreased due to poor management skills.',
                                                        'Best Canning borrowed money from the bank at a high interest rate'
                                                    ]}
                                                    marks={3}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                <ListQuestion
                                                    id=""
                                                    question=""
                                                    numItems={3}
                                                    correctAnswers={[
                                                        'Market environment',
                                                        'Micro environment ',
                                                        'Macro environment'
                                                    ]}
                                                    marks={3}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                <ListQuestion
                                                    id=""
                                                    question=""
                                                    numItems={3}
                                                    correctAnswers={[
                                                        'Partial',
                                                        'Some',
                                                        'Limited',
                                                        'Less',
                                                        'Little',
                                                        'control',
                                                        'Full control',
                                                        'Complete control',
                                                        'No control'
                                                    ]}
                                                    marks={3}
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
                                        id="2.3"
                                        question="Explain the rights of employers in terms of the Labour Relations Act (LRA), 1995 (Act 66 of 1995)"
                                        type="textarea"
                                        correctAnswers={[
                                            'form employer organisations to represent them in labour related matters.',
                                            'form bargaining councils for collective bargaining purposes.',
                                            'lockout employees who engage in unprotected/illegal strike/labour action.',
                                            'dismiss employees who engage in an unprotected strike/misconduct such as intimidation/violence during a strike action',
                                            'not pay/remunerate an employee who has participated in a protected strike for services/work they did not do during the strike.'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="2.4"
                                        question="Discuss the purpose of the Employment Equity Act (EEA), 1998 (Act 55 of 1998)."
                                        type="textarea"
                                        correctAnswers={[
                                            'The EEA allows employees who do the same work to be paid equally.',
                                            'Eliminates discrimination on grounds of gender/race/disability in the workplace.',
                                            'Promotes equal opportunity and fair treatment in the workplace.',
                                            'Promotes diversity in the workplace by ensuring that people of diverse backgrounds are appointed',
                                            'Protects employees from victimisation if they exercise the rights given to them by the EEA'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">2.5 Read the scenario below and answer the questions that follow.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">BEYERS TOYS (BT)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Beyers Toys is experiencing a decline in sales due to a decrease in the
                                            demand for their products. They sold some unproductive assets to pay off
                                            debts. BT also evaluated the effectiveness of their chosen strategy.
                                        </p>
                                    </div>
                                    <Question
                                        id="2.5.1"
                                        question="Identify the type of defensive strategy applied by BT. Motivate your answer by quoting from the scenario above."
                                        type="text"
                                        correctAnswers="{['Divestiture', 'They sold some unproductive assets to pay off debts.']}"
                                        marks={3}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="2.5.2"
                                        question="Advise businesses on the steps in strategy evaluation."
                                        type="textarea"
                                        correctAnswers={[
                                            'Examine the underlying basis of a business strategy',
                                            'Look forward and backwards into the implementation process',
                                            'Compare the expected performance with the actual performance',
                                            'Determine the reasons for deviations and analyse these reasons',
                                            'Take corrective action so that deviations may be corrected',
                                            'Set specific dates for control and follow up',
                                            'Draw up a table of the advantages and disadvantages of a strategy',
                                            'Decide on the desired outcome as envisaged when strategies were implemented',
                                            'Consider the impact of the strategic implementation in the internal and  external environments of the business'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.6"
                                        question="Explain the implications of any TWO pillars of the Broad-Based Black Economic Empowerment Act (BBBEE), 2003 (Act 53 of 2003) on businesses."
                                        type="textarea"
                                        correctAnswers={[
                                            'Businesses must ensure that transformation is implemented at all levels',
                                            'Appoint black people in senior executive positions/to management',
                                            'Involve black people in the strategic decision-making processes',
                                            'Ensure that black females are represented in management',
                                            'Businesses are directly penalised for not implementing this pillar',
                                            'Due to a shortage of skilled black managers/directors, some businesses find it difficult to make appointments',
                                            'Businesses should include black people in shareholding/partnerships/franchises',
                                            'Encourage small black investors to invest in big companies and share ownership',
                                            'Exempted Micro Enterprises (EMEs) with an ownership of 50% or more of black people are promoted to level 3 of the BEE scorecard',
                                            'More opportunities are created for black people to become owners/entrepreneurs',
                                            'Large businesses should form joint ventures with small black owned businesses and share business risks',
                                            'Businesses must create jobs as ESD promotes local manufacturing',
                                            'Identify black owned suppliers that are able to supply goods and services',
                                            'Outsource services to suppliers that are BBBEE compliant',
                                            'Businesses must engage black employees in skills development initiatives',
                                            'Provide learnerships/Learning programmes to black employees',
                                            'Businesses could benefit from the increased pool of skilled/trained workers'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.7"
                                        question="Recommend ways in which businesses can deal with the challenges that are posed by the economic factors of the PESTLE analysis."
                                        type="textarea"
                                        correctAnswers={[
                                            'Borrow money from financial institutions when interest rates are favourable',
                                            'Businesses should consider decreasing their profit margin rather than increasing the price of their products',
                                            'Consider exchange rates when trading with other countries',
                                            'Negotiate favourable interest rates with creditors',
                                            'Negotiate payment terms with suppliers',
                                            'Sell/Dispose parts of assets that are no longer profitable',
                                            'Sell shares at competitive/lower prices to attract more foreign direct investments'
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
                                        question="State any FOUR aspects that should be included in an employment contract."
                                        numItems={4}
                                        correctAnswers={[
                                            'Personal details of the employee',
                                            'Details of the business/employer such as the name and address',
                                            'Job title/Position',
                                            'Job description such as duties/responsibilities and working conditions',
                                            'Job specification such as formal qualifications and willingness to travel',
                                            'Date of employment/Commencement of employment',
                                            'Place where employee will spend most of his/her working time',
                                            'Hours of work such as normal time and overtime',
                                            'Remuneration such as weekly or monthly pay',
                                            'Benefits/Fringe benefits/Perks/Allowances',
                                            'Leave such as sick/maternity/annual/adoption leave',
                                            'Employee deductions such as compulsory/non-compulsory',
                                            'Signatures of both the employer and employee',
                                            'Probation period',
                                            'Duration/Period of employment contract/Details of termination/Expiry date of employment contract'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="3.2"
                                        question="Outline the difference between piecemeal and time-related salary determination methods."
                                        numItems={4}
                                        correctAnswers={[
                                            'Workers are paid according to the number of items/units produced/action performed',
                                            'Workers are not remunerated for the number of hours worked, regardless of how long it takes them to make the items',
                                            'Mostly used in factories particularly in the textile/technology industries',
                                            'Workers are paid according to the amount of time/hours they spend at work/on a task',
                                            'Workers with the same experience/qualifications are paid on salary scales regardless of the amount of work done',
                                            'Many private and public sector businesses use this method'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">3.3 Read the scenario below and answer the questions that follow.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MZAMO TRADERS (MT)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Mzamo Traders has a vacant position for a store manager. MT advertised the
                                            vacancy in local newspapers. They invited shortlisted candidates for an
                                            interview.
                                        </p>
                                    </div>
                                    <Question
                                        id="3.3.1"
                                        question="Name the method of recruitment used by MT in the scenario above."
                                        type="text"
                                        correctAnswers="External recruitment"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.3.2"
                                        question="Explain the role of the interviewee during the interview."
                                        type="textarea"
                                        correctAnswers={[
                                            'Greet the interviewer by name with a solid handshake and a friendly smile',
                                            'Listen carefully to the questions before responding',
                                            'Make eye contact and have good posture/body language',
                                            'Show confidence and have a positive attitude/be assertive',
                                            'Be inquisitive and show interest in the business',
                                            'Show respect and treat the interview with its due importance',
                                            'Be honest about mistakes and explain how you dealt with them',
                                            'Know your strengths and weaknesses and be prepared to explain them',
                                            'Ask clarity seeking questions, about the job/position offered',
                                            'Thank the interviewer for the opportunity given to be part of the interview'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.4"
                                        question="Discuss the impact of fringe benefits on businesses."
                                        type="textarea"
                                        correctAnswers={[
                                            'Attractive fringe benefit packages may result in higher employee retention/reduces employee turnover',
                                            'Attracts qualified/skilled/experienced employees who may positively contribute towards the business goals/objectives',
                                            'Improves productivity resulting in higher profitability',
                                            'It increases employee satisfaction/loyalty, as they may be willing to go the extra mile',
                                            'Businesses save money as benefits are tax deductible',
                                            'Fringe benefits can be used as leverage for salary negotiations',
                                            'Businesses which cannot offer fringe benefits, fail to attract skilled workers',
                                            'It can create conflict/lead to corruption if allocated unfairly',
                                            'Fringe benefits are additional costs that may result in cash flow problems',
                                            'Decreases business profits, as incentive/package/remuneration costs are higher',
                                            'Errors in benefit plans may lead to costly lawsuits/regulatory fines',
                                            'Businesses have to pay advisors/attorneys to help them create benefit plans that comply with legislation'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.5"
                                        question="Elaborate on the meaning of quality control."
                                        type="textarea"
                                        correctAnswers={[
                                            'A system that ensures the desired quality is met √ by inspecting the final product',
                                            'Ensures that finished products meet the required standards',
                                            'Quality control processes ensure that products are consistently manufactured to high standards',
                                            'Checking raw materials/employees/machinery/workmanship/production to ensure that high quality standards are maintained',
                                            'Includes setting targets/measuring performance and taking corrective measures'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="3.6"
                                        question="Explain how quality of performance of the production function can contribute to the success of the business."
                                        type="textarea"
                                        correctAnswers={[
                                            'Provide high quality services/products according to specifications',
                                            'The production/operating processes of a business should be done correctly through proper production planning and control',
                                            'Products and services should be produced at the lowest possible cost to allow for profit maximisation',
                                            'The business should clearly communicate the roles and responsibilities to the production workforce',
                                            'Products must meet customers\' requirements by being safe, reliable and durable',
                                            'The business should have good after-sales services and warrantees',
                                            'Empower workers so that they can take pride  in their workmanship',
                                            'Obtain accreditation from the SABS/ISO 9001 to ensure that quality products are being produced',
                                            'Specify the product/service standards and take note of the factors that consumers use to judge quality',
                                            'Monitor processes and find the root causes of production problems',
                                            'Implement quality control systems to ensure that quality products are consistently being produced',
                                            'Utilise machines and equipment optimally',
                                            'Accurately calculate the production costs'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">3.7 Read the scenario below and answer the question that follows.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">VILLE LIMITED (VL)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Ville Limited manufactures electrical components for various businesses. VL
                                            can afford to purchase quality raw materials and equipment to avoid faulty
                                            products. They also promote a positive business image by fulfilling the needs
                                            of their buyers.
                                        </p>
                                    </div>
                                    <p className="font-medium text-[var(--text-primary)]">Identify TWO total quality management (TQM) elements applied by VL.
                                        Motivate your answer by quoting from the scenario above.</p>
                                    <p className="font-medium text-[var(--text-primary)]">Use the table below as a GUIDE to answer QUESTIONS 3.7</p>

                                    <table className="pdf-table">
                                        <thead>
                                        <tr><th>TQM ELEMENTS</th>
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
                                                        'Adequate financing and capacity',
                                                        'Total client/customer satisfaction'
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
                                                        'VL can afford to purchase quality raw materials and equipment to avoid faulty products',
                                                        'They also promote a positive business image by fulfilling the needs of their buyers'
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
                                        id="3.8"
                                        question="Advise businesses on the role of quality circles as part of continuous improvement to processes and systems."
                                        type="textarea"
                                        correctAnswers={[
                                            'Solve problems related to quality and implement improvements',
                                            'Investigate problems and suggest solutions to management',
                                            'Ensure that there is no duplication of activities/tasks in the workplace',
                                            'Make suggestions for improving processes and systems in the workplace',
                                            'Improve the quality of products/services/productivity through regular reviews of quality processes',
                                            'Monitor/Reinforce strategies to improve the smooth running of business operations.',
                                            'Increase employees\' morale/motivation to boost the team spirit in achieving organisational goals.',
                                            'Contribute towards the improvement and development of the organisation',
                                            'Reduce costs of redundancy and wasteful efforts in the long run',
                                            'Increase the demand for products/services of the business',
                                            'Create harmony and high performance in the workplace',
                                            'Build a healthy workplace relationship between the employer and employee',
                                            'Improve employees\' loyalty/commitment to the organisational goals',
                                            'Improve employees\' communication at all levels of the business'
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
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS ENVIRONMENTS</h3>
                                <div>
                                    <ListQuestion
                                        id="4.1"
                                        question="Name any TWO types of business sectors."
                                        numItems={2}
                                        correctAnswers={[
                                            'Primary',
                                            'Secondary',
                                            'Tertiary'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">
                                        Identify the leave provision as stipulated in the Basic Conditions
                                        of Employment Act (BCEA), 1997 (Act 75 of 1997) applicable to
                                        TD Accountants in EACH statement below.
                                    </p>
                                    <Question
                                        id="4.2.1"
                                        question="Employees receive a maximum of five days leave in the event of the death of a close relative."
                                        type="text"
                                        correctAnswers={[
                                            'Family responsibility leave'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.2.2"
                                        question="Medical certificates must be submitted by employees when absent from work for more than two consecutive days due to illness."
                                        type="text"
                                        correctAnswers={[
                                            'Sick leave'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.3"
                                        question="Explain how the Sector Education and Training Authorities (SETAs) are funded."
                                        type="textarea"
                                        correctAnswers={[
                                            'Skills Development levies are paid by employers to SARS as a collecting agency for the government',
                                            'Employers who have a salary bill that exceeds R500 000 per annum, should pay one percent (1%) of their annual salaries as a levy',
                                            'The different SETAs receive eighty percent (80%) of the levy for organisational expenses and the remaining twenty percent (20%) is paid to the National Skills Fund',
                                            'Donations/Grants received from the public/businesses/CSI programmes',
                                            'Surplus funds received from government institutions',
                                            'Funds received from rendering their services'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="4.4"
                                        question="Discuss any TWO types of integration strategies"
                                        type="textarea"
                                        correctAnswers={[
                                            'Involves expansion of business activities to gain control over the direct distribution of the products/services',
                                            'The business takes over the distribution system and sells products/services directly to consumers/customers',
                                            'Increases profitability as the intermediary/distributor/middleman is excluded',
                                            'Aims at decreasing the business\'s dependency on the supplier',
                                            'Enables businesses to cut costs and have influence over the prices/quality/quantity of raw materials',
                                            'The aim is to reduce the threat of competition/substitute products/services',
                                            'Increases the market share/sales/profits and enhance production/distribution',
                                            'Suitable for businesses that operate in multiple geographical areas through joint ventures/licencing/franchising'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.5"
                                        question="Advise businesses on ways in which they can comply with the National Credit Act (NCA), 2005 (Act 34 of 2005)."
                                        type="textarea"
                                        correctAnswers={[
                                            'Offer applicants pre-agreement statements',
                                            'Disclose all costs of the loan/No hidden costs should be charged/added',
                                            'Obtain credit records/checks of clients before granting loans',
                                            'Businesses should be registered with the National Credit Regulator',
                                            'Submit an annual compliance report to the National Credit Regulator',
                                            'Conduct affordability assessment to ensure that consumers have the ability to meet their obligations',
                                            'Conduct credit checks with a registered credit bureau and consult the National Credit Register',
                                            'Businesses must have procedures in place to comply with the provision of the Financial Intelligence Centre Act (FICA)'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS OPERATIONS</h3>
                                <div>
                                    <ListQuestion
                                        id="4.6"
                                        question="Outline the purpose of induction."
                                        numItems={6}
                                        correctAnswers={[
                                            'Introduce new employees to management/colleagues to establish relationships with fellow colleagues at different levels',
                                            'Give new employees a tour/information about the layout of the building/office',
                                            'Make new employees feel welcome by introducing them to their physical workspace',
                                            'Improve skills through in-service training',
                                            'Familiarise new employees with the organisational structure/their supervisors',
                                            'Allow new employees the opportunity to ask questions that will put them at ease/reduce insecurity/anxiety/fear',
                                            'Create opportunities for new employees to experience/explore different departments',
                                            'Explain safety regulations and rules, so that new employees will understand their roles/responsibilities in this regard',
                                            'Ensure that employees understand their roles/responsibilities so that they will be more efficient/productive',
                                            'Communicate information about the products/services offered by the business'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="4.7"
                                        question="Explain the placement procedure as a human resources activity."
                                        type="textarea"
                                        correctAnswers={[
                                            'Businesses should outline the specific responsibilities/expectations/skills of the new position',
                                            'Determine the successful candidate\'s strengths/weaknesses/interests/skills by subjecting him/her to a range of psychometric tests.',
                                            'Determine the relationship between the position and the competencies of the new candidate'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">4.8 Read the scenario below and answer the question that follows.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">UNIQUE BOUTIQUE (UB)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Unique Boutique is well known for their good quality management system.
                                            UB increases their productivity through proper time management.
                                            Management holds annual general meetings with all external stakeholders.
                                            They conduct regular training to improve the quality of employees' skills.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="4.8.1"
                                        question="Quote TWO benefits of a good quality management system from the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'UB increases their productivity through proper time management',
                                            'They conduct regular training to improve the quality of employees\' skills'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.8.2"
                                        question="Explain other benefits of a good quality management system."
                                        type="textarea"
                                        correctAnswers={[
                                            'Effective customer services are rendered, resulting in increased customer satisfaction',
                                            'Time and resources are used efficiently',
                                            'Products/Services are constantly improved resulting in increased levels of customer satisfaction',
                                            'Vision/Mission/Business goals may be achieved',
                                            'A business has a competitive advantage over its competitors',
                                            'Employers and employees will have a healthy working relationship resulting in happy/productive workers',
                                            'Increased market share/More customers improves profitability/financial sustainability',
                                            'Improves business image √ as there are less defects/returns'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.9"
                                        question="Suggest ways in which total quality management (TQM) can reduce the cost of quality."
                                        type="textarea"
                                        correctAnswers={[
                                            'Introduce quality circles/small teams of five to ten employees, who meets regularly to discuss ways of improving the quality of their work',
                                            'Schedule activities to eliminate duplication of tasks/activities',
                                            'Share responsibility for quality output between management and workers',
                                            'Develop work systems that empower employees to find new ways of improving quality',
                                            'Train employees at all levels, so that everyone understands their role in quality management',
                                            'Work closely with suppliers to improve the quality of raw materials/inputs',
                                            'Improve communication about the quality challenges/deviations, so that everyone can learn from past experiences',
                                            'Reduce investment on expensive, but ineffective inspection procedures in the production process'
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
                                        Successful businesses implement the strategic management process to improve
                                        internal operations. Porter's Five Forces model enables businesses to analyse their
                                        position in the market. Some businesses use intensive and diversification strategies
                                        to deal with challenges posed by the business environments.
                                    </p>
                                </div>
                                <Question
                                    id="5"
                                    question="Write an essay on business strategies in which you include the following aspects:
                                -Outline the strategic management process.
                                -Explain how businesses could apply the following forces of Porter's Five Forces model to analyse their position in the market environment:
                                  - Power of buyers
                                  - Power of competitors/Competitive rivalry
                                -Discuss THREE types of intensive strategies.
                                -Advise businesses on the advantages of diversification strategies."
                                    type="textarea"
                                    correctAnswers={[
                                        'The strategic management process allows businesses to develop turnaround strategies to enhance/improve their operations',
                                        'A critical analysis of Porter\'s Five Forces model requires businesses to conduct \n' +
                                        'continuous research on latest developments in the market',
                                        'The effective implementation of intensive strategies enables businesses to gain a competitive advantage in the market',
                                        'Diversification strategies provides growth opportunities for businesses as they can identify the strengths and weaknesses of each product line',
                                        'Have a clear vision/mission statement/measurable/realistic objective in place',
                                        'Identify opportunities/weaknesses/strengths/threats by conducting environmental scanning/situational analysis',
                                        'Tools available for environmental scanning may include a SWOT analysis/Porter\'s Five Forces model/PESTLE analysis/industrial analysis tools',
                                        'Formulate alternative strategies to respond to the challenges',
                                        'Develop (an) action plan(s), including the tasks to be done/deadlines to be met/resources to be procured',
                                        'Review/Analyse/Re-examine their vision/mission statement',
                                        'Formulate a strategy, such as a defensive/retrenchment strategy',
                                        'Implement a strategy, using a template such as an action plan',
                                        'Assess how easy it is for buyers/customers to drive prices down',
                                        'Determine the number of buyers/the importance of each buyer to the business and the cost of switching to other products',
                                        'A few powerful buyers are often able to dictate their terms to the business',
                                        'Buyers buying in bulk can bargain for prices in their favour',
                                        'If buyers can do without the business\'s products then they have more power to determine the prices and terms of sale',
                                        'Competitors selling the same/similar products/services may have a greater impact on the market of the business',
                                        'If competitors have a unique product/service, then they will have greater power',
                                        'A business with many competitors in the same market has very little power in their market',
                                        'Some businesses have the necessary resources to start a price war and to \n' +
                                        'continue selling at a loss until some/all competitors leave the market',
                                        'New products penetrate an existing market at a low price, until it is well known \n' +
                                        'to the customers and then the price increases',
                                        'Businesses focus on selling existing products into existing markets to increase their market share',
                                        'Businesses use market research on existing clients to decide on how to improve their marketing mix',
                                        'Employ more sales staff to improve sales/services',
                                        '\n' +
                                        'It is a growth strategy where businesses aim to sell their existing products in new markets',
                                        'Businesses target consumers in a potential market that is outside of its \n' +
                                        'normal target market',
                                        'It is a growth strategy where businesses aim to introduce new products into \n' +
                                        'existing markets/modifies an existing product',
                                        'New products may be different/of a higher quality than those of competitors',
                                        'Increases sales and business growth',
                                        'Improves the business brand and image',
                                        'Reduces the risk of relying only on one product for sales/revenue/income',
                                        'More products can be sold to existing customers and additional more new \n' +
                                        'markets can be established',
                                        'Businesses should always assess their strategic management process to be \n' +
                                        'able to respond effectively to new trends in the market',
                                        'The correct application of Porter\'s Five Forces model allows businesses to \n' +
                                        'develop relevant business strategies that may yield fruitful results'
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
                                        Quality management and quality performance play an important role in contributing to
                                        the success of businesses. The application of the PDCA model improves the quality
                                        of products. Poor implementation of total quality management (TQM) has a negative
                                        impact on business operations. Businesses should improve their marketing and
                                        administration functions.
                                    </p>
                                </div>
                                <Question
                                    id="6"
                                    question="Write an essay on quality of performance in which you include the following aspects:
                                -Outline the differences between quality management and quality performance.
                                -Explain how businesses can apply the PDCA model/steps to improve the quality of their products.
                                -Discuss the impact of total quality management (TQM) if poorly implemented by businesses.
                                -Advise businesses on the quality indicators of the following business functions:
                                  - Marketing function
                                  - Administration function"
                                    type="textarea"
                                    correctAnswers={[
                                        'Quality management provides guidelines on how business functions should put quality systems in place in order to achieve business goals/objectives',
                                        'Quality performance assesses the effectiveness of each business function in producing high quality products/services',
                                        'The PDCA model enables business to analyse each step of the model and eliminate duplication of activities',
                                        'Effective implementation of TQM elements may prevent the negative consequences of financial cost caused by poor implementation of TQM',
                                        'The marketing function plays an important role in identifying game changers necessary to develop suitable turn around strategies',
                                        'Techniques/tools used to design/improve the quality of a product',
                                        'Can be used for accountability within each of the business functions',
                                        'Total performance of each department measured against the specified standards',
                                        'Can be obtained if all departments work together towards the same quality standards',
                                        'The business should identify the problem and develop a plan for improvement to processes and systems',
                                        'Answer questions such as \'what to do\' and \'how to do it\'',
                                        'Plan the new method and approach to improve the quality of their products',
                                        'Businesses should implement the change on a small scale',
                                        'Implement the processes and systems as planned',
                                        'During this step, the implementers aim to effectively/accurately execute the change based on the plan/method',
                                        'Use data to analyse the results of change',
                                        'Determine whether it made a difference and what needs to be improved',
                                        'Check whether the processes are working effectively',
                                        'Institutionalise the improvement to meet the needs of the business',
                                        'Devise strategies on how to continually improve',
                                        'If the change was successful, implement it on a wider scale',
                                        'The business should continuously revise the process until they get it right',
                                        'Setting unrealistic deadlines that may not be achieved',
                                        'Fast and reliable data capturing and processing systems',
                                        'Make reliable information available to management on time',
                                        'Make relevant information available for quick decision-making',
                                        'Handle complaints quickly and effectively',
                                        'Use modern technology efficiently',
                                        'Implement effective risk management policies to minimise business losses',
                                        'Quality assurance/Control/Evaluation is recorded accurately',
                                        'Winning customers by satisfying their needs/wants/building positive relationships',
                                        'Adhering to ethical advertising practices when promoting products/services',
                                        'Identifying a competitive advantage to focus/improve on marketing strengths',
                                        'Differentiating products in order to attract more customers',
                                        'Constantly reviewing value issues',
                                        'Co-ordinating distribution with production and advertising strategies',
                                        'High staff turnover because of poor skills development',
                                        'Decline in sales as more goods are returned by unhappy customers',
                                        'Investors might withdraw investment, if there is a decline in profits',
                                        'Setting unrealistic deadlines that may not be achieved',
                                        'Employees may not be adequately trained resulting in poor quality products',
                                        'Quality management requires sound business knowledge and skills necessary to achieve economies of scale in the business',
                                        'Businesses should identify key performance areas that are affected by poor implementation of TQM and find ways to overcome this challenge',
                                        'Effective communication of expected quality indicators of the marketing and administration function may enable employees to achieve set targets/objectives'
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
                        <div className="mt-6 p-4 bg-[var(--bg-secondary)] rounded-lg shadow-[var(--shadow)] text-center">
                            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Your Score: {totalScore} / 150</h3>
                            <p className="text-[var(--text-secondary)]">
                                {totalScore >= 120 ? 'Excellent!' : totalScore >= 90 ? 'Good effort!' : 'Keep practicing!'} (Note: Essays manual graded)
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

BusinessStudiesP1Nov2023.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP1Nov2023;