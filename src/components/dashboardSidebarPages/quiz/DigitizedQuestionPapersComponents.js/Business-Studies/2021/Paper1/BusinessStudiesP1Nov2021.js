import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
//import "../../BusinessStudiesP1Nov2021.css";
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
        // Partial marking for lists
        const userList = userAnswer.split(/[,;\n]/).map(s => normalizeAnswer(s)).filter(Boolean);
        awardedMarks = userList.reduce((sum, u) => sum + (correctAnswers.some(ans => normalizeAnswer(ans) === u) ? 1 : 0), 0);
        isCorrect = awardedMarks > 0;
        awardedMarks = Math.min(awardedMarks, marks); // Cap at max marks
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
const BusinessStudiesP1Nov2021 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
    const [totalScore, setTotalScore] = useState(0);
    const [sectionScores, setSectionScores] = useState({ A: 0, B: 0, C: 0 });
    const [answers, setAnswers] = useState({});
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

    return (
        <>
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
                {/* Global styles from example */}
                {/*} <style>{`
                * { transition: none !important; animation: none !important; opacity: 1 !important; }
                body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.4; }
                .pdf-header { border: 2px solid black; padding: 20px; margin-bottom: 20px; text-align: center; position: relative; background: white; }
                .pdf-header h1 { font-size: 18pt; font-weight: bold; margin: 10px 0; }
                .pdf-header h2 { background-color: yellow; display: inline-block; padding: 5px; border: 1px solid black; }
                .pdf-section { border: 1px solid black; padding: 15px; margin-bottom: 20px; page-break-inside: avoid; }
                .pdf-table { width: 100%; border-collapse: collapse; border: 1px solid black; }
                .pdf-table th, .pdf-table td { border: 1px solid black; padding: 8px; text-align: left; vertical-align: top; }
                .form-input { width: 100%; padding: 8px; border: 1px solid black; border-radius: 0; font-size: 12pt; font-family: 'Times New Roman', serif; }
                .form-input.correct { border-color: green; background-color: rgba(0,255,0,0.1); }
                .form-input.incorrect { border-color: red; background-color: rgba(255,0,0,0.1); }
                label.correct { color: green; }
                label.incorrect { color: red; }
                .btn-primary { background-color: #007bff; color: white; padding: 10px 20px; border: 1px solid black; cursor: pointer; font-family: 'Times New Roman', serif; }
                .btn-primary:disabled { background-color: #6c757d; cursor: not-allowed; }
                .text-primary { color: #000; }
                .text-secondary { color: #666; }
                .mb-4 { margin-bottom: 1rem; }
                .space-y-4 > * + * { margin-top: 1rem; }
                .page-break { page-break-before: always; }
                .please-turn-over { text-align: right; font-style: italic; margin-top: 20px; font-size: 10pt; }
                .timer { position: fixed; top: 10px; right: 10px; background: white; padding: 10px; border: 1px solid black; z-index: 1000; }
                .accent-primary { accent-color: #007bff; }
                .scenario { border: 1px solid black; padding: 10px; margin: 10px 0; background: #f9f9f9; }
            `}</style>*/}
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
                            style={{ position: 'relative', top: '100px', left: '-115px' }}
                        />
                        <div className="header-text">
                            <strong>basic education</strong>
                            <br/>Department:<br />
                            Basic Education<br />
                            <strong>Republic of South Africa</strong>
                        </div>
                        <h1>NATIONAL SENIOR CERTIFICATE</h1>
                        <h2>Business Studies P1 November 2021</h2>
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
                    <div className="pdf-section page-break">
                        {/* Section A */}
                        <div className="service-card mb-10">
                            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION A: Compulsory (30 marks)</h2>
                            <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 1</h3>
                            <div className="space-y-6">
                                {/* 1.1 MCQ */}
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">1.1 Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.5) in the ANSWER BOOK.</p>
                                    <Question
                                        id="1.1.1"
                                        question="Cosmetics Ltd complied with the … by providing the same work opportunities for people who are physically challenged."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)' },
                                            { value: 'B', text: 'B Employment Equity Act (EEA), 1998 (Act 55 of 1998)' },
                                            { value: 'C', text: 'C Labour Relations Act (LRA), 1995 (Act 66 of 1995)' },
                                            { value: 'D', text: 'D Compensation for Occupational Injuries and Diseases Amendment Act (COIDA), 1997 (Act 61 of 1997)' }
                                        ]}
                                        correctAnswers="B"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.2"
                                        question="Workers are entitled to a meal break of … minutes after five continuous hours of work."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A 90' },
                                            { value: 'B', text: 'B 45' },
                                            { value: 'C', text: 'C 60' },
                                            { value: 'D', text: 'D 15' }
                                        ]}
                                        correctAnswers="C"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.3"
                                        question="Businesses add unrelated products to their existing products which may appeal to new customers. This is an example of a … diversification strategy."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A conglomerate' },
                                            { value: 'B', text: 'B horizontal' },
                                            { value: 'C', text: 'C concentric' },
                                            { value: 'D', text: 'D diagonal' } // Note: Duplicate in PDF, correct is D per memo (calculation 4000*0.08*1.5=480)
                                        ]}
                                        correctAnswers="A"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.4"
                                        question="Mano and Sons used the … recruitment method when they advertised a vacancy on their business noticeboard."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A agencies' },
                                            { value: 'B', text: 'B online' },
                                            { value: 'C', text: 'C internal' },
                                            { value: 'D', text: 'D external' }
                                        ]}
                                        correctAnswers="C"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.5"
                                        question="The implementation of change on a wider scale by Themba Constructions is the … step of the PDCA model."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A plan' },
                                            { value: 'B', text: 'B do' },
                                            { value: 'C', text: 'C check' },
                                            { value: 'D', text: 'D act' }
                                        ]}
                                        correctAnswers="D"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                {/* 1.2 Fill in */}
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">1.2 Complete the following statements by using the word(s) provided in the list below. Write only the word(s) next to the question numbers (1.2.1 to 1.2.5) in the ANSWER BOOK.</p>
                                    <p className="scenario">excess; shares; brainstorming; grievance; HIV/Aids; debentures; unemployment; nominal group; premium; conflict</p>
                                    <Question
                                        id="1.2.1"
                                        question="The owner of Luke Bed & Breakfast identified a/an … when Mandy Bed & Breakfast closed down."
                                        type="text"
                                        correctAnswers="opportunity"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.2"
                                        question="Businesses have … over the market environment."
                                        type="text"
                                        correctAnswers="some control"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.3"
                                        question="A/An … agreement includes practical work experience that can lead to a recognised occupational qualification."
                                        type="text"
                                        correctAnswers="learnership"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.4"
                                        question="A well-experienced auditor from Zaks Consultants received an employment offer from Zizi's Consultants. This is known as …"
                                        type="text"
                                        correctAnswers="headhunting"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.5"
                                        question="Adrian Manufacturers applied quality … when they measured the total output of each department against specified standards."
                                        type="text"
                                        correctAnswers="performance"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                {/* 1.3 Matching */}
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">1.3 Choose a description from COLUMN B that matches a term in COLUMN A. Write only the letter (A–J) next to the question numbers (1.3.1 to 1.3.5) in the ANSWER BOOK.</p>
                                    <table className="pdf-table">
                                        <thead>
                                        <tr>
                                            <th>COLUMN A</th>
                                            <th>COLUMN B</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td >
                                                <Question
                                                    id="1.3.1"
                                                    question="Overtime"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="F"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />

                                            </td>

                                            <td >
                                                A. termination of an employment contract due to restructuring
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">F: workers are allowed to work three hours per day outside their normal working hours</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >

                                                <Question
                                                    id="1.3.2"
                                                    question="Skills development levy"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="H"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td >
                                                B. number of goods and services that satisfy the needs of customers
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">H: employers contribute 1% of their payroll to SARS to train employees</p>}
                                            </td>
                                        </tr>
                                        {/* Add 1.3.3 to 1.3.5 similarly */}
                                        <tr>
                                            <td>
                                                <Question
                                                    id="1.3.3"
                                                    question="Screening"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="I"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                C. workers are allowed to work 11 hours per week outside their normal working hours
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">I: candidates' application forms are checked against the requirements of the job</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Question
                                                    id="1.3.4"
                                                    question="Quality"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="G"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                D. employers and employees contribute 1% of their payroll to SARS to train employees
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">G: ability of goods to meet the specific needs of customers</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <Question
                                                    id="1.3.5"
                                                    question="Dismissal"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="J"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                E. candidates' skills and abilities are matched with the requirements of the job
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">J: termination of an employment contract due to misconduct</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td ></td>
                                            <td >
                                                F. workers are allowed to work three hours per day outside their normal working hours
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                G. ability of goods to meet the specific needs of customers
                                            </td>
                                        </tr>
                                        <tr>
                                            <td ></td>
                                            <td >
                                                H. employers contribute 1% of their payroll to SARS to train employees
                                            </td>
                                        </tr>
                                        <tr>
                                            <td ></td>
                                            <td >
                                                I. candidates' application forms are checked against the requirements of the job
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                J. termination of an employment contract due to misconduct

                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Section B - Choose any two */}
                        <div className="pdf-section page-break">
                            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION B: Answer ANY TWO (80 marks)</h2>
                            <p className="mb-4 text-[var(--text-secondary)]">Select which two questions to answer:</p>
                            <div className="space-y-2">
                                <label>
                                    <input type="checkbox" value="Q2" onChange={(e) => {
                                        let newSelected = [...selectedSectionB];
                                        if (e.target.checked) {
                                            if (newSelected.length < 2) newSelected.push(e.target.value);
                                        } else {
                                            newSelected = newSelected.filter(q => q !== e.target.value);
                                        }
                                        setSelectedSectionB(newSelected);
                                    }} /> Question 2: Business Ventures
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Q3"
                                        onChange={(e) => {
                                            let newSelected = [...selectedSectionB];
                                            if (e.target.checked) {
                                                if (newSelected.length < 2) newSelected.push(e.target.value);
                                            } else {
                                                newSelected = newSelected.filter(q => q !== e.target.value);
                                            }
                                            setSelectedSectionB(newSelected);
                                        }}
                                    /> Question 3: Business Roles
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Q4"
                                        onChange={(e) => {
                                            let newSelected = [...selectedSectionB];
                                            if (e.target.checked) {
                                                if (newSelected.length < 2) newSelected.push(e.target.value);
                                            } else {
                                                newSelected = newSelected.filter(q => q !== e.target.value);
                                            }
                                            setSelectedSectionB(newSelected);
                                        }}
                                    /> Question 4: Miscellaneous Topics
                                </label>

                            </div>
                            {selectedSectionB.includes('Q2') && (
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 2: BUSINESS ENVIRONMENTS (40 marks)</h3>
                                    <div>
                                        <ListQuestion
                                            id="2.1"
                                            question="Name any TWO provisions of leave as stipulated in the Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)."
                                            numItems={3}
                                            correctAnswers={[
                                                'Annual leave',
                                                'Sick leave',
                                                'Maternity leave',
                                                'Parental leave',
                                                'Family responsibility leave',
                                            ]}
                                            marks={2}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="2.2"
                                            question="Outline the rights of employees in terms of the Labour Relations Act (LRA), 1995 (Act 66 of 1995)."
                                            type="textarea"
                                            correctAnswers={[
                                                'Employees may join a trade union of their choice',
                                                'Embark on legal strikes as a remedy for grievances',
                                                'Refer unresolved workplace disputes to the CCMA',
                                                'Refer unresolved CCMA disputes to the Labour Court on appeal',
                                                'Request trade union representatives to assist/represent employees in the grievance/disciplinary hearing',
                                                'Trade union representatives may take reasonable time off work with pay, to attend to trade union duties'
                                            ]}
                                            marks={6}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            2.3 Identify the PESTLE elements that pose a challenge to Berry Farm in EACH
                                            of the following statements:
                                        </p>
                                        <Question
                                            id="2.3.1"
                                            question="Employees are unable to operate the modern machinery that has been purchased recently."
                                            type="text"
                                            correctAnswers="Technological"
                                            marks={3}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="2.3.2"
                                            question="Management received a fine for dumping their waste material in the river."
                                            type="text"
                                            correctAnswers="Environmental"
                                            marks={3}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="2.3.3"
                                            question="Berry Farm can no longer export their products due to the unfavourable exchange rate."
                                            type="text"
                                            correctAnswers="Economic"
                                            marks={3}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="2.4"
                                            question="Explain the purpose of the Compensation for Occupational Injuries and Diseases Amendment Act (COIDA), 1997 (Act 61 of 1997)."
                                            type="textarea"
                                            correctAnswers={[
                                                'Provides comprehensive protection to employees who get injured/contract diseases in the course of performing their duties',
                                                'COIDA applies to all casual/full-time workers who become ill/injured/ \n' +
                                                'disabled/die√ due to a workplace accident/disease',
                                                'It excludes workers who are guilty of wilful misconduct/workers working outside \n' +
                                                'South Africa for at least twelve months/members of the SA Defence \n' +
                                                'Force/Police services',
                                                'It provides for the establishment of a Compensation Board whose function is to \n' +
                                                'advise the Minister of Labour on the application/provisions of COIDA',
                                                'Medical expenses/Other types of compensation are paid to employees and/or \n' +
                                                'their families depending on the type/severity of the injuries',
                                                'Employers have to pay a monthly amount to the Compensation Fund \n' +
                                                'depending on the number of employees/the level of risk they are exposed to.'
                                            ]}
                                            marks={3}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>

                                    <div>
                                        <div>
                                            <p className="font-medium text-[var(--text-primary)] mb-2">
                                                2.5 Read the scenario below and answer the questions that follow.
                                            </p>
                                            <div className="scenario">
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MONEY BANK (MB)</h3>
                                                <p className="text-[var(--text-primary)] leading-relaxed">
                                                    Money Bank charges the same interest rates regardless of the client's level of
                                                    income. The National Credit Regulator (NCR) imposed a fine on Money Bank
                                                    for reckless granting of credit. MB was instructed to bear all the costs related
                                                    to the removal of the names of blacklisted clients from the credit bureau.
                                                </p>
                                            </div>
                                        </div>
                                        <ListQuestion
                                            id="2.5.1"
                                            question="Quote TWO penalties imposed on MB for non-compliance with the National Credit Act (NCA), 2005 (Act 34 of 2005) from the scenario above."
                                            numItems={2}
                                            correctAnswers={[
                                                'The National Credit Regulator (NCR) imposed a fine on Money Bank for \n' +
                                                'reckless granting of credit',
                                                'MB was instructed to bear all the costs related to the removal of the names of \n' +
                                                'blacklisted clients from the credit bureau']} // From memo
                                            marks={2}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="2.5.2"
                                            question="Describe the positive impact of the National Credit Act on businesses."
                                            type="textarea"
                                            correctAnswers={[
                                                'The whole credit process is transparent√ e.g. both businesses and customers \n' +
                                                'know their responsibilities',
                                                'Lower bad debts√ resulting in better cash flow',
                                                'Protects businesses against non-paying consumers',
                                                'Increases cash sales√ because businesses only grant credit to qualifying \n' +
                                                'customers/more customers are buying in cash',
                                                'Stamps out reckless lending√ and prevents businesses from bankruptcy',
                                                'Credit bureau information is made available to businesses√ to check the credit \n' +
                                                'worthiness of consumers before granting credit',
                                                'Businesses do thorough credit checks√ and receive up-to-date documentation  \n' +
                                                'from the consumer as proof that they can afford the repayment'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="2.6"
                                            question="Discuss any TWO types of defensive strategies."
                                            type="textarea"
                                            correctAnswers={[
                                                'Divestiture',
                                                'Divestment',
                                                'Disposing/Selling some assets/divisions/departments that are no longer \n' +
                                                'profitable/productive',
                                                'Selling off divisions/product lines with slow growth potential',
                                                'Decreasing the number of shareholders by selling ownership',
                                                'Paying off debts by selling unproductive assets',
                                                'Liquidation',
                                                'Selling all assets to pay creditors due to a lack of capital',
                                                'Selling the entire business in order to pay shareholders a fair price for their \n' +
                                                'shares',
                                                'Allowing creditors to apply for forced liquidation in order to have their claims \n' +
                                                'settled',
                                                'Businesses in financial difficulty may apply for business rescue to avoid \n' +
                                                'liquidation',
                                                'Retrenchment',
                                                'Terminating the employment contracts of employees for operational reasons',
                                                'Decreasing the number of product lines/Closing certain departments may result \n' +
                                                'in some workers becoming redundant'
                                            ]}
                                            marks={3}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="2.7"
                                            question="Suggest ways in which businesses could comply with the Consumer Protection Act (CPA), 2008 (Act 68 of 2008)."
                                            type="textarea"
                                            correctAnswers={[
                                                'Disclose prices of all products on sale',
                                                'Provide adequate training to staff on the CPA',
                                                'All agreements must provide for a five-day cooling off period',
                                                'Ensure that goods/services offered are standardised/of the same quality',
                                                'Comply with the requirements regarding promotional competitions',
                                                'Comply with requirements regarding the display of information on labels/ \n' +
                                                'packaging',
                                                'Display the name of the business on all business documents, e.g. \n' +
                                                'invoices/contracts',
                                                'Bundling of goods/services should benefit consumers, e.g. offering a cell phone \n' +
                                                'and a tablet at a special price',
                                                'Implement measures that will facilitate complaints, e.g. suggestion boxes'
                                            ]}
                                            marks={6}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    {/* ... Continue for 2.4 to 2.7 */}
                                </div>
                            )}
                            {/* Similar blocks for Q3 and Q4, shown if selected */}
                            {selectedSectionB.includes('Q3') && (
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 3: BUSINESS OPERATIONS (40 marks)</h3>

                                    <ListQuestion
                                        id="3.1"
                                        question="State FOUR aspects that should be included in an employment contract."
                                        numItems={5}
                                        correctAnswers={[
                                            'Personal details of the employee',
                                            'Details of the business/employer e.g. name/address, etc',
                                            'Job title/Position',
                                            'Job description e.g. duties/ working conditions',
                                            'Job specification e.g. formal qualifications/willingness to travel',
                                            'Date of employment/Commencement of employment',
                                            'Place where employee will spend most of his/her working time',
                                            'Hours of work, e.g. normal time/overtime',
                                            'Remuneration, e.g. weekly or monthly pay',
                                            'Benefits/Fringe benefits/Perks/Allowance',
                                            'Leave, e.g. sick/maternity/annual/adoption leave',
                                            'Employee deductions (compulsory/non-compulsory)',
                                            'Period of the contract/Details of termination',
                                            'Probation period',
                                            'Signatures of both the employer and employee',
                                            'List of documents that form part of the contract, e.g. appointment letter/code of \n' +
                                            'conduct/ethics'
                                        ]} // From memo
                                        marks={5}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <ListQuestion
                                        id="3.2"
                                        question="Outline the benefits of induction for businesses."
                                        numItems={2}
                                        correctAnswers={[
                                            'Allows new employees to settle in quickly and work effectively',
                                            'Ensures that new employees understand rules and restrictions in the \n' +
                                            'business',
                                            'New employees may establish relationships with fellow employees at different \n' +
                                            'levels',
                                            'Make new employees feel at ease in the workplace, which reduces anxiety/ \n' +
                                            'insecurity/fear',
                                            'The results obtained during the induction process provide a base for focussed \n' +
                                            'training',
                                            'Increases quality of performance/productivity',
                                            'Minimises the need for on-going training and development',
                                            'Employees will be familiar with organisational structures, e.g. who are their \n' +
                                            'supervisors/low level managers',
                                            'Opportunities are created for new employees to experience/explore different \n' +
                                            'departments'
                                        ]} // From memo
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <div>
                                        <div className="mb-4">
                                            <p className="font-medium text-[var(--text-primary)] mb-2">
                                                3.3 Read the scenario below and answer the questions that follow.
                                            </p>
                                            <div className="scenario">
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">SIPHO STATIONERS (SS)</h3>
                                                <p className="text-[var(--text-primary)] leading-relaxed">
                                                    Sipho Stationers advertised a vacancy for a bookkeeper in a local
                                                    newspaper. The advertisement stated that the prospective candidate should
                                                    have a relevant formal qualification. The bookkeeper must be able to draw up
                                                    financial statements.
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            3.3.1 Identify TWO components of a job analysis highlighted by Sipho
                                            Stationers. Motivate your answer by quoting from the scenario above.
                                        </p>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            Use the table below as a GUIDE to answer QUESTION 3.3.1.
                                        </p>
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
                                                            'Job specification', 'Job description']} // From memo
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
                                                        correctAnswers={['The advertisement stated that the \n' +
                                                        'prospective candidate should have a \n' +
                                                        'relevant formal qualification',
                                                            'The bookkeeper must be able to draw up \n' +
                                                            'financial statements']} // From memo
                                                        marks={2}
                                                        onAnswerChange={handleAnswerChange}
                                                        answerStatus={answerStatus}
                                                    />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <Question
                                            id="3.3.2"
                                            question="Explain the advantages of external recruitment for businesses."
                                            type="textarea"
                                            correctAnswers={[
                                                'New candidates bring√ new talents/ideas/experiences/skills into the business',
                                                'It may help the business to meet affirmative action√ and BBBEE targets',
                                                'There is a larger pool of candidates√ to choose from',
                                                'There is a better chance of getting a suitable candidate with the required \n' +
                                                'skills/qualifications/competencies√ who do not need much training/development \n' +
                                                'which reduce costs',
                                                'Minimises unhappiness/conflict amongst current employees√ who may have \n' +
                                                'applied for the post'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="3.4"
                                            question="Elaborate on the meaning of quality management."
                                            type="textarea"
                                            correctAnswers={[
                                                'The process of managing all activities needed to ensure a business produces \n' +
                                                'goods and services of consistently high standard',
                                                'Refers to techniques/tools used to design/ improve the quality of a product',
                                                'Can be used for accountability within each of the business functions',
                                                'Aims to ensure that the quality of goods/services is consistent/Focuses on the \n' +
                                                'means to achieve consistency'
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
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">IKHAYA BRICKS MANUFACTURER (IBM)</h3>
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                The employees of Ikhaya Bricks Manufacturer are not adequately trained,
                                                resulting in the production of poor quality products. IBM is experiencing a
                                                decline in sales as more goods are returned by unhappy customers. The
                                                management of IBM maintains that the business has a good image
                                                regardless of these challenges.
                                            </p>
                                        </div>
                                        <ListQuestion
                                            id="3.5.1"
                                            question="Quote TWO results of poor implementation of TQM by IBM from the scenario above."
                                            numItems={2}
                                            correctAnswers={[
                                                'The employees of Ikhaya Bricks Manufacturer are not adequately trained, resulting in the production of poor quality products',
                                                'IBM is experiencing a decline in sales as more goods are returned by unhappy customers']} // From memo
                                            marks={2}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="3.5.2"
                                            question="Advise the management of IBM on the impact of TQM if poorly implemented, except for those quoted in QUESTION 3.5.1."
                                            type="textarea"
                                            correctAnswers={[
                                                'Setting unrealistic deadlines that may not be achieved',
                                                'Decline in productivity, because of stoppages',
                                                'IBM may not be able to make necessary changes to satisfy the needs of customers',
                                                'The reputation of the business may suffer because of faulty/poor quality goods',
                                                'Customers will have many alternatives to choose from and the impact could be \n' +
                                                'devastating to businesses',
                                                'Investors might withdraw their investment, if there is a decline in profits',
                                                'Bad publicity due to poor quality products supplied',
                                                'High staff turnover because of poor skills development',
                                                'Undocumented quality control systems/processes could result in error or \n' +
                                                'deviations from pre-set quality standards'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="3.6"
                                            question="Explain how the quality of performance of the administration function can contribute to the success of the business."
                                            type="textarea"
                                            correctAnswers={[
                                                'Fast and reliable data capturing and processing systems',
                                                'Make reliable information available to management on time',
                                                'Make relevant information available for quick decision-making',
                                                'Handle complaints quickly and effectively',
                                                'Use modern technology√ efficiently',
                                                'Implement effective risk management policies to minimise business losses',
                                                'Quality assurance/Control/Evaluation is recorded accurately',
                                                'All documentation is kept neatly and orderly in a safe place',
                                                'Easy to recall and find information/documentation'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="3.7"
                                            question="Evaluate the impact of adequate financing and capacity as a total quality management (TQM) element on large businesses."
                                            type="textarea"
                                            correctAnswers={[
                                                'Large businesses have sufficient financing√ to test everything before \n' +
                                                'implementing',
                                                'They can afford to have systems in place√ to prevent errors in \n' +
                                                'processes/defects in raw materials/products',
                                                'Able to afford product research/market researchers√ to gather information \n' +
                                                'about products/customers√/Large businesses can fund programmes √ aimed at \n' +
                                                'improving quality processes',
                                                'f the demand for a business product increases/orders begin coming in faster \n' +
                                                'than expected√, the business lacks the capital required to fund the production \n' +
                                                'of the stock to fill the orders',
                                                'These rapidly growing businesses can consume large amounts of capital√ as \n' +
                                                'they try to balance normal operations and expansion'
                                            ]}
                                            marks={6}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>

                                    {/* ... Add other Q3 subquestions */}
                                </div>
                            )}
                            {selectedSectionB.includes('Q4') && (
                                <div className="mt-6">
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 4: MISCELLANEOUS TOPICS (40 marks)</h3>
                                    <p className="font-medium text-[var(--text-primary)]">BUSINESS ENVIRONMENTS </p>
                                    {/* Subsections for Business Ventures and Roles */}
                                    <Question
                                        id="4.1"
                                        question="Outline the role of SETAs."
                                        type="textarea"
                                        correctAnswers={[
                                            'Develop sector skills plans in line with the National Skills Development \n' +
                                            'Strategy',
                                            'Draw up skills development plans for their specific economic sectors',
                                            'Approve workplace skills plans and annual training reports',
                                            'Allocate grants to employers, education and training providers',
                                            'Collect levies as required by the Skills Development Act ',
                                            'Pay out grants to companies that are complying with the requirements of the \n' +
                                            'Skills Development Act',
                                            'Monitor/Evaluate the actual training by service providers',
                                            'Promote and establish learnerships',
                                            'Register learnership agreements/learning programmes',
                                            'Provide training material/programmes for skills development facilitators',
                                            'Provide accreditation for skills development facilitators',
                                            'Oversee training in different sectors of the South African economy',
                                            'Identify suitable workplaces for practical work experience',
                                            'Report to the Director General'
                                        ]} // From memo
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <div>

                                        <div className="mb-4">
                                            <p className="font-medium text-[var(--text-primary)] mb-2">
                                                4.2 Read the scenario below and answer the questions that follow.
                                            </p>
                                            <div className="scenario">
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">CAREL TELEVISIONS (CT)</h3>
                                                <p className="text-[var(--text-primary)] leading-relaxed">
                                                    Carel Televisions specialise in the manufacturing of smart television sets.
                                                    They signed a contract with Thuli Distributors (TD) to deliver their products to
                                                    customers. CT wants to implement intensive strategies for sustainable growth
                                                    in the market.
                                                </p>
                                            </div>
                                            <p className="font-medium text-[var(--text-primary)]">
                                                4.2.1 Identify the type of business sector in which CT and TD operate.
                                                Motivate your answer by quoting from the scenario above.
                                            </p>
                                            <p className="font-medium text-[var(--text-primary)]">
                                                Use the table below as a GUIDE to answer QUESTION 4.2.1.
                                            </p>
                                            <table className="pdf-table">
                                                <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>BUSINESS SECTORS </th>
                                                    <th>MOTIVATIONS</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>Carel Televisions (CT) </td>
                                                    <td>
                                                        <ListQuestion
                                                            id=""
                                                            question=""
                                                            numItems={1}
                                                            correctAnswers={['Secondary']}
                                                            marks={2}
                                                            onAnswerChange={handleAnswerChange}
                                                            answerStatus={answerStatus}
                                                        />
                                                    </td>
                                                    <td>
                                                        <ListQuestion
                                                            id=""
                                                            question=""
                                                            numItems={1}
                                                            correctAnswers={['Carel Televisions specialise in the manufacturing of smart television sets']} // From memo
                                                            marks={1}
                                                            onAnswerChange={handleAnswerChange}
                                                            answerStatus={answerStatus}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Thuli Distributors (TD)</td>
                                                    <td>
                                                        <ListQuestion
                                                            id=""
                                                            question=""
                                                            numItems={1}
                                                            correctAnswers={['Tertiary']}
                                                            marks={2}
                                                            onAnswerChange={handleAnswerChange}
                                                            answerStatus={answerStatus}
                                                        />
                                                    </td>
                                                    <td>
                                                        <ListQuestion
                                                            id=""
                                                            question=""
                                                            numItems={1}
                                                            correctAnswers={['They signed a contract with Thuli Distributors (TD) to deliver their products to customers']} // From memo
                                                            marks={1}
                                                            onAnswerChange={handleAnswerChange}
                                                            answerStatus={answerStatus}
                                                        />
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <Question
                                            id="4.2.2"
                                            question="Explain the advantages of intensive strategies."
                                            type="textarea"
                                            correctAnswers={[
                                                'Increased market share reduces the business\'s vulnerability to actions of competitors',
                                                'Increase in sales/income and profitability',
                                                'Improved service delivery may improve business image',
                                                'Businesses may have more control over the prices of products/services',
                                                'Gain loyal customers through effective promotion campaigns',
                                                'Decrease in prices may influence customers to buy more products',
                                                'Regular sales to existing customers may increase',
                                                'Eliminate competitors and dominate market prices'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <Question
                                        id="4.3"
                                        question="Suggest ways in which businesses could apply enterprise and supplier development (ESD) as a BBBEE pillar in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Businesses must create jobs as ESD promotes local manufacturing',
                                            'Outsource services to suppliers that are BBBEE compliant',
                                            'Businesses are encouraged to invest in/support black owned SMMEs',
                                            'Identify black owned suppliers that are able to supply goods and services',
                                            'Contribution can be monetary, e.g. loans/investments/donations',
                                            'Contribution can be non-monetary, e.g. consulting services/advice/ \n' +
                                            'entrepreneurial programmes',
                                            'Develop the business skills of small/black owned suppliers, e.g. sales \n' +
                                            'techniques, legal advice',
                                            'Support the cash flow of small suppliers by offering them preferential terms of \n' +
                                            'payment',
                                            'SMMEs will be encouraged to use their own business initiatives to make them \n' +
                                            'sustainable',
                                            'Develop and implement a supplier development plan/supply chain'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <p className="font-medium text-[var(--text-primary)]">BUSINESS OPERATIONS</p>
                                    <ListQuestion
                                        id="4.4"
                                        question= "State TWO salary determination methods that businesses could apply to remunerate their employees.Quote TWO ways from the scenario above in which ZI deals with difficult employees."
                                        numItems={2}
                                        correctAnswers={[
                                            'Piecemeal',
                                            'Time-related',
                                        ]} // From memo
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        4.5 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">SUKI CONSULTING (SC)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Suki, the owner of Suki Consulting, will be conducting interviews for a vacant
                                            position. She prepared a set of questions that will be asked during the
                                            interviews. Suki also booked a suitable venue for the interviews.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="4.5.1"
                                        question= "Quote TWO roles of Suki, as the interviewer, before the interview, from the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'She prepared a set of questions that will be asked during the interviews',
                                            'Suki also booked a suitable venue for the interviews',
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.5.2"
                                        question="Explain the purpose of an interview as a human resources activity."
                                        type="textarea"
                                        correctAnswers={[
                                            'Obtains information about the strengths and weaknesses of each candidate',
                                            'Helps the employer in choosing/making an informed decision about the most  \n' +
                                            'suitable candidate',
                                            'Matches information provided by the applicant to the job requirements',
                                            'Creates an opportunity where information about the business and applicant \n' +
                                            'can be exchanged',
                                            'Determines a candidate\'s suitability for the job',
                                            'Evaluates the skills/personal characteristics of the applicant'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />

                                    <Question
                                        id="4.6"
                                        question="Discuss the importance of quality circles as part of continuous improvement to processes and systems."
                                        type="textarea"
                                        correctAnswers={[
                                            'Solve problems related to quality and implement improvements',
                                            'Investigate problems and suggest solutions to management',
                                            'Ensure that there are no duplication of activities/tasks in the workplace',
                                            'Make suggestions for improving systems and processes in the workplace',
                                            'Improve the quality of products/services/productivity through regular reviews of \n' +
                                            'quality processes',
                                            'Monitor/Reinforce strategies to improve the smooth running of business \n' +
                                            'operations',
                                            'Increase employees\' morale and motivation',
                                            'Quality circles discuss ways of improving the quality of work/workmanship',
                                            'Contribute towards the improvement and development of the organisation',
                                            'Reduce costs of redundancy/wasteful efforts in the long run',
                                            'Increase the demand for products/services of the business',
                                            'Create harmony and high performance in the workplace',
                                            'Build a healthy workplace relationship between the employer and employee',
                                            'Improve employees’ loyalty/commitment to the organisational goals',
                                            'Improve employees’ communication at all levels of the business'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.7"
                                        question="Advise businesses on the benefits of a good quality management system."
                                        type="textarea"
                                        correctAnswers={[
                                            'Effective customer services are rendered, resulting in increased customer \n' +
                                            'satisfaction',
                                            'Time and resources are used efficiently',
                                            'Productivity increases through proper time management/using high quality \n' +
                                            'resources',
                                            'Products/Services are constantly improved resulting in increased levels of \n' +
                                            'customer satisfaction',
                                            'Vision/Mission/Business goals may be achieved',
                                            'Business has a competitive advantage over its competitors',
                                            'Regular training will continuously improve the quality of employees\' skills/knowledge'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />

                                </div>
                            )}
                        </div>

                        {/* Section C - Choose one */}
                        <div className="pdf-section page-break">
                            <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION C: Answer ANY ONE (40 marks)</h2>
                            <p className="mb-4 text-[var(--text-secondary)]">Select one essay question:</p>
                            <div className="space-y-2">
                                <label>
                                    <input type="radio" name="sectionC" value="Q5" onChange={(e) => setSelectedSectionC(e.target.value)} /> Question 5: Business Ventures (Insurance)
                                </label>
                                <label>
                                    <input type="radio" name="sectionC" value="Q6" onChange={(e) => setSelectedSectionC(e.target.value)} /> Question 6: Business Roles (Ethics and Professionalism)
                                </label>
                            </div>
                            {selectedSectionC === 'Q5' && (

                                <div>
                                    <div className="mb-4">
                                        <div className="scenario">
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Some businesses are not well conversant with the differences between overinsurance
                                                and under-insurance. Others apply the principles of insurance when entering into an
                                                insurance contract. Many businesses regard the registration of employees with the
                                                Compensation Fund/COIDA, as an administrative burden..
                                            </p>
                                        </div>
                                    </div>
                                    <Question
                                        id="5"
                                        question="Write an essay on business strategies in which you include the following aspects:
                                                 Outline the steps in developing a strategy.
                                                 Discuss THREE types of integration strategies.
                                                 Explain how businesses could apply the following Porter's Five Forces model to
                                                analyse their position in the market environment:
                                                o Power of suppliers
                                                o Power of competitors/Competitive rivalry
                                                o Threat of substitution/Substitutes
                                                 Advise businesses on the steps they should consider when evaluating strategies."
                                        type="textarea"
                                        correctAnswers={[
                                            'Businesses should always develop strategies as they operate in a dynamic environment that poses many challenges',
                                            'Integration strategies enable businesses to establish power relations with their suppliers and distributors',
                                            'Businesses that are able to identify the power of suppliers can devise strategies to deal with their suppliers',
                                            'The Porter’s Five Forces model enables businesses to shift the power of competitors/threat of substitutes in their favour',
                                            'Application of SWOT analysis/PESTLE/Porter\'s Five Forces/environmental scanning of the business environments',
                                            'Formulate strategies to meet objectives/Develop measurable strategic goals/objectives',
                                            'Implement strategies using action plans',
                                            'A business combines with or takes over its distributors',
                                            'Involves expansion of business activities to gain control over the direct distribution of the products',
                                            'Increases profitability as the distributor/intermediary/middleman is excluded',
                                            'A business combines with or takes over its suppliers',
                                            'Aims at decreasing the business’s dependency on the supplier',
                                            'Enables businesses to cut costs and have influence over the prices/quality/quantity of raw materials',
                                            'A business takes control of/incorporates other businesses√ in the same industry/which produce/sell the same goods/services',
                                            'The aim is to reduce the threat of competition /substitute products/services',
                                            'Increases the market share/sales and profits',
                                            'Suitable for businesses that operates in multiple geographical areas√ through joint ventures/licencing/franchising',
                                            'Suppliers that deliver high quality products may have power over the business',
                                            'Assess the power of the suppliers in influencing prices',
                                            'Competitors selling the same/similar products/services may have a greater impact on the market of the business',
                                            'If competitors have a unique product/service, then they will have greater power',
                                            'A business with many competitors in the same market has very little power in their market',
                                            'Establish whether the sellers of substitute products have improved their product/sell lower quality goods at lower prices',
                                            'Examine the underlying basis of a business strategy',
                                            'Look forward and backward into the implementation process',
                                            'Compare the expected performance with the actual performance',
                                            'Take corrective action so that deviations may be corrected',
                                            'Set specific dates for control and follow up',
                                            'Draw up a table of the advantages and disadvantages of a strategy',
                                            'Developing a strategy enables businesses to stay ahead of their competitors and increase sales/profitability',
                                            'Integration strategies enable businesses to offer better products/services and dominate the market',
                                            'The implementation of integration strategies allows businesses to reduce the high costs of raw materials determined by the suppliers',
                                            'The application of the Porter\'s Five Forces model guides businesses on how to analyse the power of each force in the market'
                                        ]}
                                        marks={40}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                            )}
                            {selectedSectionC === 'Q6' && (
                                <div>
                                    <div className="mb-4">
                                        <div className="scenario">
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Professional behaviour forms part of effective business practice that guides
                                                employees' conduct in the workplace. Many businesses agree that unethical business
                                                practices have a negative impact on their operations. Successful businesses develop
                                                strategies to deal with unethical business practices.
                                            </p>
                                        </div>
                                    </div>
                                    <Question
                                        id="6"
                                        question="Write an essay on quality of performance in which you address the following aspects:

                                                     Outline the differences between quality control and quality assurance.
                                                     Explain the quality indicators for the following business functions:
                                                        o Purchasing
                                                        o Marketing
                                                     Evaluate the impact of continuous improvement to processes and systems as a
                                                    TQM element on large businesses.
                                                     Suggest ways in which TQM can reduce the cost of quality."
                                        type="textarea"
                                        correctAnswers={[
                                            'Quality control enables business to reduce defective products and yield a better return on investment or improve their image',
                                            'Quality assurance allows businesses to identify product defects at an early stage',
                                            'The purchasing function must follow the correct procedures when making procurement and handling stock',
                                            'The marketing function should conduct on-going research to identify current needs/trends of customers',
                                            'The aim of total quality management is to satisfy consumers’ needs beyond their expectations',
                                            'Inspection of the final product to ensure that it meets the required standards',
                                            'Includes setting targets/measuring performance and taking corrective measures',
                                            'Checking raw materials/employees/machinery/workmanship/products to ensure that high standards are maintained',
                                            'Inspection carried out during and after the production process',
                                            'Ensures that the required standards have been met at every stage of the process',
                                            'Businesses should buy raw materials/products in bulk at lower prices',
                                            'Select reliable suppliers that render the best quality raw materials/capital goods at reasonable prices',
                                            'Place orders timeously and regular follow-ups to ensure that goods are delivered on time',
                                            'Effective co-ordination between purchasing and production departments so that purchasing staff understand the requirements of the production process',
                                            'Required quantities should be delivered at the right time and place',
                                            'Implement/Maintain stock control systems to ensure the security of stock',
                                            'Maintain optimum stock levels to avoid overstocking/reduce out-dated stock',
                                            'Monitor and report on minimum stock levels to avoid stock shortages',
                                            'Effective use of storage space and maintain product quality while in storage',
                                            'Involve suppliers in strategic planning/product design/material selection/quality control process',
                                            'Winning customers by satisfying their needs/wants and building positive relationships',
                                            'Adhering to ethical advertising practices when promoting products/services',
                                            'Identifying a competitive advantage to focus/improve on marketing strengths',
                                            'Differentiating products in order to attract more customers',
                                            'Constantly reviewing value issues',
                                            'Co-ordinating distribution with production and advertising strategies',
                                            'Using pricing techniques to ensure a competitive advantage',
                                            'Large businesses have more resources to check on quality performance in each unit/department/business function',
                                            'Enough capital resources are available for new equipment required for processes and systems',
                                            'Large businesses have a person dedicated to the improvement of processes and systems',
                                            'Willing to take risk on/try new processes and systems because they are able to absorb the impact of losing money',
                                            'They can afford to use the services of quality circles to stay ahead of their competitors',
                                            'Large scale manufacturing can complicate quality control',
                                            'Processes and systems take time and effort to be implemented in large businesses√ as communication/buy-in/distrust may delay the implementation process',
                                            'Schedule activities to eliminate duplication of tasks',
                                            'Share responsibility for quality output amongst management and workers',
                                            'Train employees at all levels, so that everyone understands their roles in quality management',
                                            'Businesses implement quality control and quality assurance in their quest for zero defects and sustainability',
                                            'The quality of raw materials/products that are purchased may influence the quality of performance of other departments'
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
        </>
    );
};

BusinessStudiesP1Nov2021.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP1Nov2021;