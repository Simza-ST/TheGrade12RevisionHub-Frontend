import "../../BusinessStudiesP1Nov2021.css";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";

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
const BusinessStudiesP2Nov2021 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
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
        let score = 0;
        for (const key in answers) {
            score += answers[key].awardedMarks;
        }
        setTotalScore(score);
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
                    .pdf-header .header-text { 
                   flex-1;
                    text-align: center; 
                    margin-left: 120px; 
                }
                    .pdf-header h2 { background-color: yellow; display: inline-block; padding: 20px; border: 2px solid black; }
                    .pdf-header { border: 2px solid black; padding: 20px; margin-bottom: 20px; text-align: center; position: relative; background: white; align-items: center; justify-content: center;}
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
                    .coat-of-arms { width: 100px; height: auto; }
                    .score-breakdown { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 1rem; }
                    .score-item { text-align: center; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
                `}
                </style>
                {/*style={{ position: 'absolute', top: '10px', left: '10px', fontSize: '10pt' }}*/}
                <div className="flex-1 min-w-0 p-6 sm:p-8">
                    <div className="pdf-header">
                        <img
                            src="/images/coatOfArm.png"
                            alt="Coat of Arms of South Africa"
                            className="coat-of-arms absolute top-4 left-4"
                            style={{position: 'relative', top: '1px', left: '465px'}}
                        />
                        <div className="header-text">
                            <strong>basic education</strong>
                            <br/>Department:<br/>
                            Basic Education<br/>
                            <strong>Republic of South Africa</strong>
                        </div>
                        <h1>NATIONAL SENIOR CERTIFICATE</h1>
                        <h2>Business Studies P2 November 2021</h2>
                        <p><strong>MARKS: 150</strong><br/><strong>TIME: 2 hours</strong></p>
                        <p>This question paper consists of 10 pages.</p>
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
                                        question="Greg is always willing to learn and grow in his career. This is an example of … in successful leadership."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A entrepreneurial qualities' },
                                            { value: 'B', text: 'B personal attitude' },
                                            { value: 'C', text: 'C characteristics of leaders' },
                                            { value: 'D', text: 'D personal behaviour' }
                                        ]}
                                        correctAnswers="B"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.2"
                                        question="Partners must draw up a written partnership agreement. This refers to … as a criterion that contributes to the success of the business."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A capital' },
                                            { value: 'B', text: 'B management' },
                                            { value: 'C', text: 'C legislation' },
                                            { value: 'D', text: 'D division of profits' }
                                        ]}
                                        correctAnswers="C"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.3"
                                        question="Bulelwa Enterprises invested R4 000 at 8% simple interest per year. They will receive an amount of … as interest at the end of 18 months."
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A R480' },
                                            { value: 'B', text: 'B R320' },
                                            { value: 'C', text: 'C R380' },
                                            { value: 'D', text: 'D R480' } // Note: Duplicate in PDF, correct is D per memo (calculation 4000*0.08*1.5=480)
                                        ]}
                                        correctAnswers="D"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.4"
                                        question="Marie Stores considered the advantages and disadvantages of each proposed solution. This problem-solving step is known as …"
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A defining the problem.' },
                                            { value: 'B', text: 'B evaluating alternative solutions.' },
                                            { value: 'C', text: 'C implementing the best solution.' },
                                            { value: 'D', text: 'D identifying alternative solutions.' }
                                        ]}
                                        correctAnswers="B"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.1.5"
                                        question="Team dynamic theories enable businesses to allocate tasks according to …"
                                        type="radio"
                                        options={[
                                            { value: 'A', text: 'A team members\' roles.' },
                                            { value: 'B', text: 'B similar personality traits.' },
                                            { value: 'C', text: 'C the nature of the problem.' },
                                            { value: 'D', text: 'D the team member\'s morale.' }
                                        ]}
                                        correctAnswers="A"
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
                                        question="The insurer requested Sue Stores to first pay an amount of R3 000 as … payment when claiming for damages to their vehicle."
                                        type="text"
                                        correctAnswers="excess"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.2"
                                        question="Teko Limited issued … to raise borrowed capital from the public."
                                        type="text"
                                        correctAnswers="debentures"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.3"
                                        question="The employees of GH Trading applied the … problem-solving technique when they shared ideas aloud on how to solve a business problem."
                                        type="text"
                                        correctAnswers="brainstorming"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.4"
                                        question="John, an unhappy employee, followed the … procedure when he verbally reported a work-related issue to his supervisor."
                                        type="text"
                                        correctAnswers="grievance"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="1.2.5"
                                        question="Businesses deal with … as a socio-economic issue by offering bursaries to the community to improve the level of education."
                                        type="text"
                                        correctAnswers="unemployment"
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
                                                    question="Leaders"
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
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">F: communicate by means of interaction with employees</p>}
                                            </td>

                                        </tr>
                                        <tr>
                                            <td >
                                                <Question
                                                    id="1.3.2"
                                                    question="Hand-outs"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="I"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td >
                                                B. employees use business resources for personal gain
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">I: printed information provided to the audience at the end of a presentation</p>}
                                            </td>
                                        </tr>
                                        {/* Add 1.3.3 to 1.3.5 similarly */}
                                        <tr>
                                            <td>
                                                <Question
                                                    id="1.3.3"
                                                    question="Limited liability"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="G"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                C. communicate with employees through line functions
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">G: shareholders only lose capital invested to pay for the debts of the business</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Question
                                                    id="1.3.4"
                                                    question="Abuse of work time"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="H"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                D. remove potential dangers by providing personal protective clothing
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">H: employees make personal calls during office hours</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >
                                                <Question
                                                    id="1.3.5"
                                                    question="Health and safety representatives"
                                                    type="select"
                                                    options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                    correctAnswers="J"
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                E. electronic information that can be viewed on the screen during a presentation
                                                {answerStatus && <p className="text-[var(--text-secondary)] text-sm">J: identify potential dangers in the workplace</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td ></td>
                                            <td >
                                                F. communicate by means of interaction with employees
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                G. shareholders only lose capital invested to pay for the debts of the business
                                            </td>
                                        </tr>
                                        <tr>
                                            <td ></td>
                                            <td >
                                                H. employees make personal calls during office hours
                                            </td>
                                        </tr>
                                        <tr>
                                            <td ></td>
                                            <td >
                                                I. printed information provided to the audience at the end of a presentation
                                            </td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>
                                                J. identify potential dangers in the workplace

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
                                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 2: BUSINESS VENTURES (40 marks)</h3>
                                    <ListQuestion
                                        id="2.1"
                                        question="Name any THREE types of benefits paid out by the Unemployment Insurance Fund (UIF)."
                                        numItems={3}
                                        correctAnswers={['Unemployment benefits', 'Illnesses/Sickness/Disability benefits', 'Maternity benefits', 'Paternity benefits', 'Adoption benefits', 'Dependants\' benefits', 'Parental benefits', 'Covid-19 temporary employer-employee-relief-scheme/TERS']} // Partial, memo first three
                                        marks={3}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="2.2"
                                        question="Outline factors that should be considered by the presenter while presenting."
                                        type="textarea"
                                        correctAnswers="Establish credibility by introducing yourself as the presenter at the start. Show the most important information first. Make the purpose/main points of the presentation clear at the start of the presentation. Use suitable section titles/headings/sub-headings/bullets. Stand in a good position/upright, where the audience can clearly see the presenter/presentation. Avoid hiding behind equipment. Do not ramble on at the start, to avoid losing the audience/their interest. Capture listeners' attention/Involve the audience with a variety of methods such as short video clips/sound effects/humour. Maintain eye contact with the audience. Be audible/loud and clear to all listeners/audience. Vary the tone of voice/tempo within certain sections to prevent monotony. Make the presentation interesting with visual aids/anecdotes/examples/use visual aids effectively. Use appropriate gestures/body language to emphasize certain points. Speak with energy and enthusiasm. Pace yourself/Do not rush or talk too slowly. Keep the presentation short and simple. Summarise the main points of the presentation to conclude the presentation. Conclude/End with a strong/striking ending that will be remembered. Ensure that the audience will leave with/take away specific information/benefits. Manage time effectively to allow time for questions." // From memo, partial match
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    {/* Add other subquestions for Q2 similarly, using textarea for explain/outline/discuss/suggest, with memo as correctAnswers for partial */}
                                    {/* Example for 2.3 */}
                                    <div>

                                        <div className="mb-4">
                                            <p className="font-medium text-[var(--text-primary)] mb-2">
                                                2.3 Read the scenario below and answer the questions that follow.
                                            </p>
                                            <div className="scenario">
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">REDDY LIMITED (RL)</h3>
                                                <p className="text-[var(--text-primary)] leading-relaxed">
                                                    Reddy Limited offers different types of preference shares to shareholders.
                                                    Some shareholders bought shares that will not allow them to receive past
                                                    dividends. Others chose shares that allowed them to share in the surplus
                                                    profit of the business.
                                                </p>
                                            </div>
                                        </div>
                                        <table className="pdf-table">
                                            <thead>
                                            <tr>
                                                <th>TYPES OF PREFERENCE SHARES</th>
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
                                                        correctAnswers={['Non-cumulative preference shares', 'Participating preference shares']} // Partial, memo first three
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
                                                        correctAnswers={['Some shareholders bought shares that will not allow them to receive past dividends.', 'Others chose shares that allowed them to share in the surplus profit of the business.']} // Partial, memo first three
                                                        marks={2}
                                                        onAnswerChange={handleAnswerChange}
                                                        answerStatus={answerStatus}
                                                    />
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        {/* Similar for type 2 */}
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">2.4 Difference between the democratic and autocratic leadership styles</p>
                                        <table className="pdf-table">
                                            <thead>
                                            <tr>
                                                <th>DEMOCRATIC LEADERSHIP STYLE</th>
                                                <th>AUTOCRATIC LEADERSHIP STYLE</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td>
                                                    <ListQuestion
                                                        id=""
                                                        question=""
                                                        numItems={2}
                                                        correctAnswers={['The leader involves employees in the decision making process.', 'Clear/Two way communication ensures group commitment to final decision(s).']}
                                                        marks={2}
                                                        onAnswerChange={handleAnswerChange}
                                                        answerStatus={answerStatus}
                                                    />
                                                </td>
                                                <td>
                                                    <ListQuestion
                                                        id=""
                                                        question=""
                                                        numItems={2}
                                                        correctAnswers={['A leader takes all decisions alone without involving employees.', 'Line of command/Communication is clear as it is top-down/followers know exactly what to do.']}
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
                                        <div className="mb-4">
                                            <p className="font-medium text-[var(--text-primary)] mb-2">
                                                2.5 Read the scenario below and answer the questions that follow.
                                            </p>
                                            <div className="scenario">
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">CARDIA COMMUNICATIONS (CC)</h3>
                                                <p className="text-[var(--text-primary)] leading-relaxed">
                                                    Samantha, the financial consultant at Cardia Communications, presented the
                                                    financial report to the stakeholders of the business. She decided to use slides
                                                    that were projected on a screen during her presentation.
                                                </p>
                                            </div>
                                        </div>
                                        <Question
                                            id="2.5.1"
                                            question="Identify the visual aid that Samantha used in her presentation. Motivate your answer by quoting from the scenario above. "
                                            type="textarea"
                                            correctAnswers={['PowerPoint/Data projector', 'She decided to use slides that were projected on a screen during her presentation.']}
                                            marks={3}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="2.5.2"
                                            question="Explain the advantages of the visual aid identified in QUESTION 2.5.1."
                                            type="textarea"
                                            correctAnswers={['Graphic programmes have the capacity to convey ideas and support what the presenter says.', 'Easy to combine with sound/video clips.', 'Simple/Less cluttered slides may capture the interest of the audience.']}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">
                                            Discuss how the following criteria could contribute to the success and/or
                                            failure of a sole trader:
                                        </p>
                                        <Question
                                            id="2.6.1"
                                            question="Taxation"
                                            type="textarea"
                                            correctAnswers={['Owner is only taxed on profits in his/her personal capacity.', 'The owner\'s income is taxed at a lower rate than the company tax rate.', 'Failure by the owner to comply with personal income tax regulations could lead to penalties imposed by SARS.']}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="2.6.2"
                                            question="Division of profits "
                                            type="textarea"
                                            correctAnswers={['Owner receives all profits of the business which can lead to capital growth.', 'The owner may use the profit√ to expand the business.', 'Owner needs to budget carefully to cover business debts.']}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="2.7"
                                            question="Suggest situations in which the transactional leadership style can be applied in the workplace."
                                            type="textarea"
                                            correctAnswers={['The business wants to maximise employee performance.', 'Deadlines have to be met on short notice/under pressure.', 'Workers have a low morale.', 'The strategies/business structures are clear and do not have to change.', 'Productivity levels are very low/not according to targets.','Any other relevant answer related to situations in which the transactional leadership style can be applied in the workplace.']}
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
                                        question="Name FIVE stages of team development."
                                        numItems={5}
                                        correctAnswers={['Forming', 'Storming', 'Norming', 'Performing', 'Adjourning','Mourning']} // From memo
                                        marks={5}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <ListQuestion
                                        id="3.2"
                                        question="Outline any TWO causes of conflict in the workplace."
                                        numItems={2}
                                        correctAnswers={[
                                            'Lack of proper communication between management and workers.',
                                            'Management and/or workers may have different personalities/backgrounds.',
                                            'Ignoring rules/procedures may result in disagreements and conflict.',
                                            'Different values/levels of knowledge/skills/experience of managers/workers.',
                                            'Little/no co-operation between internal and/or external parties/stakeholders.']} // From memo
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
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MAZARS SHOE MANUFACTURER (MSM)</h3>
                                                <p className="text-[var(--text-primary)] leading-relaxed">
                                                    Mazars Shoe Manufacturer is well known for manufacturing high-quality
                                                    products. The management of MSM decided to invest their surplus funds in
                                                    the community, rural development and employees.
                                                </p>
                                            </div>
                                        </div>
                                        <ListQuestion
                                            id="3.3.1"
                                            question="Name THREE corporate social investment (CSI) focus areas in the scenario above."
                                            numItems={3}
                                            correctAnswers={['Community', 'Rural development√', 'Employees']} // From memo
                                            marks={3}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="3.3.2"
                                            question="Discuss the impact of corporate social investment (CSI) on MSM as a business."
                                            type="textarea"
                                            correctAnswers={[
                                                'MSM may attract experienced employees/increase the pool of skilled labour which could increase productivity.',
                                                'Positive/Improved image as the business looks after employees/conducts itself in a responsible way.',
                                                'A business may have a competitive advantage, resulting in good publicity/an improved reputation.',
                                                'Promotes customer loyalty √ resulting in more sales.',
                                                'CSI projects may be used as a marketing strategy to promote their products.',
                                                'MSM may enjoy the goodwill/support of communities.',
                                                'CSI projects promote teamwork within businesses.',
                                                'CSI helps to attract investors because of increased profits/income.'
                                            ]}
                                            marks={6}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="3.4"
                                            question="Explain the advantages of creative thinking in the workplace."
                                            type="textarea"
                                            correctAnswers={[
                                                'Better/Unique/Unconventional ideas/solutions are generated.',
                                                'May give the business a competitive advantage if unusual/unique solutions/ideas/strategies are implemented.',
                                                'Complex business problems may be solved.',
                                                'Productivity increases as management/employees may quickly generate multiple ideas which utilises time and money more effectively.',
                                                'Managers/Employees have more confidence as they can live up to their full potential.',
                                                'Managers will be better leaders as they will be able to handle/manage change(s) positively and creatively.'
                                            ]}
                                            marks={6}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-4">
                                            <p className="font-medium text-[var(--text-primary)] mb-2">
                                                3.5 Read the scenario below and answer the questions that follow.
                                            </p>
                                            <div className="scenario">
                                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MOUNTAIN TRADERS (MT)</h3>
                                                <p className="text-[var(--text-primary)] leading-relaxed">
                                                    Mountain Traders sell camping equipment at different outlets. The employees
                                                    of MT are given the same opportunities regardless of race and gender. They
                                                    allow open communication channels between management and employees.
                                                </p>
                                            </div>
                                        </div>
                                        <table className="pdf-table">
                                            <thead>
                                            <tr>
                                                <th>HUMAN RIGHTS</th>
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
                                                        correctAnswers={['Equity', 'Freedom of speech and expression']} // From memo
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
                                                        correctAnswers={['The employees of MT are given the same opportunities regardless of race and gender.', 'They allow open communication channels between management and employees.']} // From memo
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
                                            question="Discuss the advantages of force-field analysis in solving complex business problems."
                                            type="textarea"
                                            correctAnswers={[
                                                'Employees feel included and understood.',
                                                'Employees develop and grow with the business.',
                                                'Provides a visual summary of all the various factors supporting and opposing a particular idea.',
                                                'Informed decisions can be made√ as forces for and against are critically evaluated.',
                                                'Enables businesses to strengthen the driving forces and weaken the restraining forces.'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <div>
                                        <Question
                                            id="3.7"
                                            question="Recommend ways in which businesses could promote cultural rights in the workplace."
                                            type="textarea"
                                            correctAnswers={[
                                                'Employees should be trained on cultural tolerance.',
                                                'Employ people from various cultural backgrounds.',
                                                'Encourage employees to participate in cultural activities such as religious gatherings.',
                                                'Make provision for different cultures, such as food served in the canteen/entertainment at staff functions.',
                                                'Regular cultural information sessions will help employees to respect each other\'s culture in the workplace.',
                                                'Provide the environment in which employees are free to use their own language when interacting with others during their free time.',
                                                'Allow employees to provide solutions to challenges from their own cultural perspective.'
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
                                    <p className="font-medium text-[var(--text-primary)]">BUSINESS VENTURES </p>
                                    {/* Subsections for Business Ventures and Roles */}
                                    <Question
                                        id="4.1"
                                        question="Outline any THREE functions of the Johannesburg Securities Exchange (JSE)."
                                        type="textarea"
                                        correctAnswers={['' +
                                        'Gives opportunities to financial institutions, e.g. insurance companies invest their surplus funds in shares.',
                                            'Serves as a barometer/indicator of economic conditions in South Africa.',
                                            'Keeps investors informed by publishing share prices daily.',
                                            'Acts as a link between investors and public companies.',
                                            'Shares are valued and assessed by experts.',
                                            'Small investors are invited to take part in the economy of the country through the buying/selling of shares.',
                                            'Venture capital market is made possible on the open market.',
                                            'Strict investment rules ensure a disciplined/orderly market for securities.',
                                            'Raises primary capital by encouraging new investments in listed companies.',
                                            'Mobilises the funds of insurance companies and other institutions.',
                                            'Regulates the market for trading in shares.',
                                            'Plans, researches and advises on investment possibilities.',
                                            'Ensures that the market operates in a transparent manner.',
                                            'Provides protection for investors through strict rules/legislation.',
                                            'Encourages short-term investment.',
                                            'Facilitates electronic trading of shares/STRATE.'
                                        ]} // From memo
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)]">Identify the leadership theory applied by Lethabo to manage his employees in EACH statement below: </p>
                                        <Question
                                            id="4.2.1"
                                            question="Lethabo uses different leadership styles in different circumstances."
                                            type="textarea"
                                            correctAnswers="Situational leadership theory" // From memo
                                            marks={2}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                        <Question
                                            id="4.2.2"
                                            question="He encourages his employees to be creative and explore new ways of doing things."
                                            type="textarea"
                                            correctAnswers={[
                                                'Transformational',
                                                'Transitional leadership theory'
                                            ]}
                                            marks={4}
                                            onAnswerChange={handleAnswerChange}
                                            answerStatus={answerStatus}
                                        />
                                    </div>
                                    <Question
                                        id="4.3"
                                        question="Explain the advantages of a state-owned company."
                                        type="textarea"
                                        correctAnswers={[
                                            'Profits may be used to finance other state departments.',
                                            'Offer essential services which may not be offered by the private sector.',
                                            'Prices are kept reasonable/Create sound competition to make services affordable to more citizens.',
                                            'Wasteful duplication of services is eliminated.',
                                            'Planning can be coordinated through central control.',
                                            'Generates income to finance social programmes.',
                                            'Jobs are created for all skills levels.'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.4"
                                        question="Evaluate the impact of unit trusts as a form of investment."
                                        type="textarea"
                                        correctAnswers={[
                                            'Managed by a fund manager who buys shares on the stock exchange/JSE.',
                                            'Easy to cash in when an investor needs money.',
                                            'A small amount can be invested per month.',
                                            'Generally, beats inflation on the medium/long term.',
                                            'Safe investment, as it is managed according to rules and regulations.',
                                            'The investor has a variety to choose from/a wider range of shares from lower to higher degrees of risk.',
                                            'Easy to invest in, as investors simply complete a few relevant forms or invest online.',
                                            'Fluctuations in unit trust rates of return are often not so severe because of diversity of the investment fund.'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <p className="font-medium text-[var(--text-primary)]">BUSINESS ROLES</p>
                                    <Question
                                        id="4.5"
                                        question="Elaborate on the meaning of corporate social responsibility (CSR)."
                                        type="textarea"
                                        correctAnswers={[
                                            'Corporate social responsibility is the way a business conducts its operations ethically/morally regarding the use of human/physical/financial resources.',
                                            'The way businesses manage their processes to affect their stakeholders in a positive way.',
                                            'The continuing commitment by business to contribute to economic development while improving the quality of life of the local community/society.',
                                            'A business voluntarily takes steps to improve the quality of life of employees and their families/communities.',
                                            'It is an obligation required by law that benefits the business/society.',
                                            'Any other relevant answer related to the meaning of corporate social responsibility/CSR.'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.6"
                                        question="Distinguish between problem-solving and decision-making."
                                        type="textarea"
                                        correctAnswers="" // From memo
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <div className="mb-4">
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            4.7 Read the scenario below and answer the questions that follow.
                                        </p>
                                        <div className="scenario">
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">ZULU INCORPORATED (ZI)</h3>
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Zulu Incorporated has a workforce that consists of some difficult employees.
                                                The management of ZI have spoken to these employees privately in order not
                                                to distract other employees. They have also provided guidelines on how
                                                employees can improve their behaviour.
                                            </p>
                                        </div>
                                    </div>
                                    <ListQuestion
                                        id="4.7.1"
                                        question="Quote TWO ways from the scenario above in which ZI deals with difficult employees."
                                        numItems={2}
                                        correctAnswers={[
                                            'The management of ZI have spoken to these employees privately in order not to distract other employees.',
                                            'They have also provided guidelines on how employees can improve their behaviour.',
                                        ]} // From memo
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.7.2"
                                        question="Explain other ways in which ZI can deal with difficult employees in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Get perspective from others who have experienced the same kind of situation to be able to understand difficult employees.',
                                            'Act pro-actively if possible, as a staff/personnel problem is part of a manager\'s responsibilities.',
                                            'Regular meetings with supervisors/departmental heads should help to identify difficult/problem behaviour.',
                                            'Make intentions and reasons for action known, so that difficult person/people feel at ease.',
                                            'Employees should be told what specific behaviours are acceptable by giving details about what is wrong/unacceptable/ an opportunity to explain their behaviour.'
                                        ]} // From memo
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.8"
                                        question="Advise businesses on the benefits of diversity in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Workforce diversity improves the ability of businesses to solve problems/innovate/cultivate diverse markets.',
                                            'Employee’s value each other\'s diversity and learn to connect/communicate across lines of difference.',
                                            'Diversity in the workforce improves morale/motivation.',
                                            'Employees demonstrate greater loyalty to businesses because they feel respected/accepted/understood.'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    {/* ... Continue for 4.2 to 4.8 */}
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
                                        question="Write an essay on insurance including: Outline the differences between overinsurance and under-insurance. Explain any THREE principles of insurance. Discuss the advantages of insurance for businesses. Advise businesses on the Compensation Fund in terms of the COIDA as a type of compulsory insurance."
                                        type="textarea"
                                        correctAnswers={[
                                            'Insurance enables businesses to function smoothly as they are compensated for \n' +
                                            'any possible loss that they may suffer',
                                            'Businesses must determine the market value before entering into an insurance \n' +
                                            'contract to avoid over insuring/under insuring their assets',
                                            'The principles of insurance can be regarded as legal and binding to both the \n' +
                                            'insured and the insurer',
                                            'Insurance policies are regulated/governed by basic principles that should be \n' +
                                            'applied by both the insurer and the insured',
                                            'COIDA relieves businesses\' financial burden by compensating their employees \n' +
                                            'for occupational injuries and diseases',
                                            'Property/Assets are insured for more than their actual/market value',
                                            'The insurer can choose to reinstate the insured instead of making a payment',
                                            'Property/Assets are not insured for their full market value',
                                            'The insurer will apply the average clause to determine the amount that will be paid',
                                            'Usually applies to short-term insurance, as the insured is compensated for \n' +
                                            'specified/proven harm/loss',
                                            'Insurer agrees to compensate the insured for damages/losses specified in the \n' +
                                            'insurance contract, in return for premiums paid by the insured to the insurer',
                                            'Protects the insured against a specified event√ that may occur',
                                            'Pay-outs from the insurer will only be made, if the insured can prove the \n' +
                                            'amount of the loss/damage/if there is proof that the specified event took place',
                                            'The amount of compensation is limited to the amount of provable loss/damage, \n' +
                                            'even if the amount in the policy/insurance contract is higher',
                                            'Applies to long-term insurance√ where the insurer undertakes to pay out an \n' +
                                            'agreed upon amount in the event of loss of life',
                                            'A predetermined amount will be paid out√ when the insured reaches a pre\n' +
                                            'determined age/or gets injured due to a predetermined event',
                                            'Aims to provide financial security√ to the insured at retirement/dependents of the \n' +
                                            'deceased',
                                            'Insured has to be honest in supplying details√ when entering into an insurance \n' +
                                            'contract',
                                            'Both parties/insurer and insured must disclose√ all relevant facts',
                                            'Transfers the risk from the business/insured√ to an insurance company/insurer',
                                            'Transfer of risk is subject to the terms and conditions of the insurance \n' +
                                            'contract',
                                            'Businesses will be compensated for insurable losses, such as the destruction \n' +
                                            'of property through fire',
                                            'Business\' assets such as vehicles/equipment/buildings need to be insured√ \n' +
                                            'against damage and/or theft',
                                            'The fund covers occupational diseases and workplace injuries',
                                            'Compensates employees for injuries and diseases incurred at work',
                                            'Compensation paid is determined by the degree of disablement',
                                            'The contribution payable is reviewed every few years according to the risk \n' +
                                            'associated with that type of work',
                                            'Employees do not have to contribute towards this fund',
                                            'Businesses should avoid overinsurance and under-insuring their property/assets \n' +
                                            'as they may suffer financial loss upon the occurrence of a specified event stated \n' +
                                            'in the contract',
                                            'Businesses should review their insurance contract on a regular basis to avoid \n' +
                                            'being overinsured or under-insured',
                                            'Employers and employees should ensure they follow precautionary measures to \n' +
                                            'avoid workplace injuries',
                                            'The fund covers employers for any legal claim that workers may bring against \n' +
                                            'them',
                                            'Protects businesses against dishonest employees'
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
                                        question="Write an essay on ethics and professionalism including: Elaborate on the meaning of professional behaviour. Explain how the THREE types of unethical business practices pose challenges to businesses. Discuss ways in which businesses could deal with these types of unethical business practices in the workplace. Suggest ways in which professional, responsible, ethical and effective business practice should be conducted."
                                        type="textarea"
                                        correctAnswers={[
                                            'Employees are expected to project a professional image by applying the principles of professionalism',
                                            'Unethical business practices can result in a negative business image and hamper business growth',
                                            'Businesses need to develop suitable and progressive ways to deal with \n' +
                                            'challenges posed by each type of unethical business practice',
                                            'Professional, responsible, ethical and effective business practice ensures good \n' +
                                            'corporate governance and attract investors',
                                            'Professional behaviour is a certain standard of behaviour/specific level of \n' +
                                            'competence that adheres to an ethical code of conduct',
                                            'Includes guidelines on employee’s appearance/communication/responsibility',
                                            'Ability/Skills expected of a person who is employed to the job/Suitable for a \n' +
                                            'job/profession√ done for payment',
                                            'Focuses on upholding the reputation of a business/profession',
                                            'Refer to what is right/wrong and acceptable behaviour in the business',
                                            'Unfair advertisements could be harmful to consumers',
                                            'Deceptive advertising can violate the trust of consumers and destroy business relationships',
                                            'The use of false or misleading statements in advertising can lead to the \n' +
                                            'misrepresentation of the concerned product√, which may negatively affect \n' +
                                            'consumers',
                                            'Businesses can make unwise advertising choices√ when they are under \n' +
                                            'pressure to increase their profits',
                                            'Some businesses in the rural areas exploit their customers√ by adding much \n' +
                                            'more than necessary to their prices',
                                            'Businesses may experience decline in sales√ due to high cost added into the \n' +
                                            'price of the final product',
                                            'Businesses may pay heavy fines for evading tax',
                                            'The accountant may charge high fees for falsifying financial statements',
                                            'Tax evasion may negatively impact on the business image',
                                            'Businesses must know and understand the Code of Advertising as \n' +
                                            'determined by the Advertising Standard Authority (ASA) and apply its regulations',
                                            'Business must report unfair advertisements by competitors to ASA',
                                            'Businesses should be encouraged to keep their advertising fair and in line \n' +
                                            'with the constitution',
                                            'Advertisements should be honest/legal and not abuse consumer\'s trust/lack of knowledge',
                                            'Work together with suppliers to share delivery costs√ to remote rural areas',
                                            'Businesses should develop a simple and clear code of conduct that will easily \n' +
                                            'be implemented in the workplace',
                                            'Awareness of the types of unethical business practices may enable businesses \n' +
                                            'to take precautionary measures and prevent negative publicity',
                                            'Dealing with each type of unethical business practice may increase market \n' +
                                            'share resulting in business sustainability and profitability',
                                            'Businesses should be accountable /responsible for their decisions and actions/ \n' +
                                            'patent rights',
                                            'Hire honest/trustworthy accountants/financial officers with good credentials',
                                            'All workers should have access to equal opportunities/positions/resources',
                                            'Mission statement should include the values of equality/respect',
                                            'Businesses should develop equity programmes/promote strategies to ensure \n' +
                                            'that all employees are treated equally regardless of status/rank/power',
                                            'Plan properly and put preventative measures in place',
                                            'Value Added Tax/VAT needs to be charged on VAT-able items',
                                            'Submit the correct tax returns to SARS on time',
                                            'All products should be correctly invoiced and recorded',
                                            'Work together with suppliers to share delivery costs to remote rural areas',
                                            'Businesses can buy in bulk to get a discount to avoid charging high prices',
                                            'Charge fair/market related prices for goods and services'
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

BusinessStudiesP2Nov2021.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP2Nov2021;