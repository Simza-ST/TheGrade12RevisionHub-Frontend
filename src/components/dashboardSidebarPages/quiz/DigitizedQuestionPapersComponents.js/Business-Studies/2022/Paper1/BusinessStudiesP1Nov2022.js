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
const BusinessStudiesP1Nov2022 = ({ darkMode = false, setDarkMode = b => {}, notifications = [] }) => {
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
                    <h2>Business Studies P1 November 2022</h2>
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
                        {/* 1.1 Multiple Choice */}
                        <div className="space-y-6">
                            <div>
                                <p className="font-medium text-[var(--text-primary)]">1.1 Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.5) in the ANSWER BOOK.</p>
                                <Question
                                    id="1.1.1"
                                    question="This Act creates a framework for acceptable employment practices and safety regulations in the workplace:"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)' },
                                        { value: 'B', text: 'B. Compensation for Occupational Injuries and Diseases Amendment Act (COIDA), 1997 (Act 61 of 1997)' },
                                        { value: 'C', text: 'C. Consumer Protection Act (CPA), 2008 (Act 68 of 2008)' },
                                        { value: 'D', text: 'D. Broad-Based Black Economic Empowerment Act (BBBEE), 2003 (Act 53 of 2003)' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.2"
                                    question="Bavaro Limited used … as a BBBEE pillar when they requested their black employees to participate in the decision-making process."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. ownership' },
                                        { value: 'B', text: 'B. enterprise and supplier development' },
                                        { value: 'C', text: 'C. skills development' },
                                        { value: 'D', text: 'D. management control' }
                                    ]}
                                    correctAnswers="D"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.3"
                                    question="Dyna Auto Motors operate in the … sector as they manufacture luxury cars."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. economic' },
                                        { value: 'B', text: 'B. secondary' },
                                        { value: 'C', text: 'C. primary' },
                                        { value: 'D', text: 'D. tertiary' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.4"
                                    question="The process of matching an employee's skills and abilities with the requirements of a job:"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. Recruitment' },
                                        { value: 'B', text: 'B. Selection' },
                                        { value: 'C', text: 'C. Placement' },
                                        { value: 'D', text: 'D. Induction' }
                                    ]}
                                    correctAnswers="C"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.5"
                                    question="The … function is responsible for keeping documents orderly and in a safe place."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. administration' },
                                        { value: 'B', text: 'B. purchasing' },
                                        { value: 'C', text: 'C. general management' },
                                        { value: 'D', text: 'D. public relations' }
                                    ]}
                                    correctAnswers="A"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                            {/* 1.2 Completion */}
                            <p className="font-medium text-[var(--text-primary)]">1.2 Complete the following statements by using the word(s) provided in the list below. Write only the word(s) next to the question numbers (1.2.1 to 1.2.5) in the ANSWER BOOK.</p>
                            <p className="scenario">
                                fair and honest dealings;    description;    performance;    SWOT;
                                forward vertical;    PESTLE;    specification;    choose;
                                management;    backward vertical
                            </p>
                            <Question
                                id="1.2.1"
                                question="Ann exercised her right to …, as stipulated in the Consumer Protection Act (CPA), 2008 (Act 68 of 2008), when she requested a written quotation from Tido Trading."
                                type="text"
                                correctAnswers="choose"
                                marks={2}
                                onAnswerChange={handleAnswerChange}
                                answerStatus={answerStatus}
                            />
                            <Question
                                id="1.2.2"
                                question="ZZ Butchery bought Mike Cattle Farm to have greater control over the supply of meat products. This is known as the … integration strategy."
                                type="text"
                                correctAnswers="backward vertical"
                                marks={2}
                                onAnswerChange={handleAnswerChange}
                                answerStatus={answerStatus}
                            />
                            <Question
                                id="1.2.3"
                                question="Vally Trading compiled a … analysis to identify good practices and challenges within the business."
                                type="text"
                                correctAnswers="SWOT"
                                marks={2}
                                onAnswerChange={handleAnswerChange}
                                answerStatus={answerStatus}
                            />
                            <Question
                                id="1.2.4"
                                question="The job … outlines the minimum acceptable qualifications and skills needed for the job."
                                type="text"
                                correctAnswers="specification"
                                marks={2}
                                onAnswerChange={handleAnswerChange}
                                answerStatus={answerStatus}
                            />
                            <Question
                                id="1.2.5"
                                question="Quality … can be obtained if all departments work together for the same quality standard."
                                type="text"
                                correctAnswers="performance"
                                marks={2}
                                onAnswerChange={handleAnswerChange}
                                answerStatus={answerStatus}
                            />
                            {/* 1.3 Matching - Use select for each */}
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
                                        <td>1.3.1 Black Economic Empowerment </td>
                                        <td>
                                            <Question
                                                id="1.3.1"
                                                question="Black Economic Empowerment"
                                                type="select"
                                                options={[
                                                    { value: 'A', text: 'employees are paid for the number of items produced in a month' },
                                                    { value: 'B', text: 'provides regular and positive press releases' },
                                                    { value: 'C', text: 'candidates who applied for a vacancy are all invited to attend the interview' },
                                                    { value: 'D', text: 'benefited only a few previously disadvantaged people' },
                                                    { value: 'E', text: 'developing an action plan that includes tasks to be done' },
                                                    { value: 'F', text: 'employees are paid for the number of hours worked' },
                                                    { value: 'G', text: 'candidates who meet the minimum requirements are separated from others' },
                                                    { value: 'H', text: 'benefited a broader base of previously disadvantaged people' },
                                                    { value: 'I', text: 'developing an action plan to share with competitors' },
                                                    { value: 'J', text: 'uses pricing techniques to ensure a competitive advantage' }
                                                ]}
                                                correctAnswers="D"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Strategic management process</td>
                                        <td>
                                            <Question
                                                id="1.3.2"
                                                question="Strategic management process"
                                                type="select"
                                                options={[
                                                    { value: 'A', text: 'employees are paid for the number of items produced in a month' },
                                                    { value: 'B', text: 'provides regular and positive press releases' },
                                                    { value: 'C', text: 'candidates who applied for a vacancy are all invited to attend the interview' },
                                                    { value: 'D', text: 'benefited only a few previously disadvantaged people' },
                                                    { value: 'E', text: 'developing an action plan that includes tasks to be done' },
                                                    { value: 'F', text: 'employees are paid for the number of hours worked' },
                                                    { value: 'G', text: 'candidates who meet the minimum requirements are separated from others' },
                                                    { value: 'H', text: 'benefited a broader base of previously disadvantaged people' },
                                                    { value: 'I', text: 'developing an action plan to share with competitors' },
                                                    { value: 'J', text: 'uses pricing techniques to ensure a competitive advantage' }
                                                ]}
                                                correctAnswers="E"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Time-related</td>
                                        <td>
                                            <Question
                                                id="1.3.3"
                                                question="Time-related"
                                                type="select"
                                                options={[
                                                    { value: 'A', text: 'employees are paid for the number of items produced in a month' },
                                                    { value: 'B', text: 'provides regular and positive press releases' },
                                                    { value: 'C', text: 'candidates who applied for a vacancy are all invited to attend the interview' },
                                                    { value: 'D', text: 'benefited only a few previously disadvantaged people' },
                                                    { value: 'E', text: 'developing an action plan that includes tasks to be done' },
                                                    { value: 'F', text: 'employees are paid for the number of hours worked' },
                                                    { value: 'G', text: 'candidates who meet the minimum requirements are separated from others' },
                                                    { value: 'H', text: 'benefited a broader base of previously disadvantaged people' },
                                                    { value: 'I', text: 'developing an action plan to share with competitors' },
                                                    { value: 'J', text: 'uses pricing techniques to ensure a competitive advantage' }
                                                ]}
                                                correctAnswers="F"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <Question
                                                id="1.3.4"
                                                question="Screening"
                                                type="select"
                                                options={[
                                                    { value: 'A', text: 'employees are paid for the number of items produced in a month' },
                                                    { value: 'B', text: 'provides regular and positive press releases' },
                                                    { value: 'C', text: 'candidates who applied for a vacancy are all invited to attend the interview' },
                                                    { value: 'D', text: 'benefited only a few previously disadvantaged people' },
                                                    { value: 'E', text: 'developing an action plan that includes tasks to be done' },
                                                    { value: 'F', text: 'employees are paid for the number of hours worked' },
                                                    { value: 'G', text: 'candidates who meet the minimum requirements are separated from others' },
                                                    { value: 'H', text: 'benefited a broader base of previously disadvantaged people' },
                                                    { value: 'I', text: 'developing an action plan to share with competitors' },
                                                    { value: 'J', text: 'uses pricing techniques to ensure a competitive advantage' }
                                                ]}
                                                correctAnswers="G"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Public relations function</td>
                                        <td>
                                            <Question
                                                id="1.3.5"
                                                question="Public relations function"
                                                type="select"
                                                options={[
                                                    { value: 'A', text: 'employees are paid for the number of items produced in a month' },
                                                    { value: 'B', text: 'provides regular and positive press releases' },
                                                    { value: 'C', text: 'candidates who applied for a vacancy are all invited to attend the interview' },
                                                    { value: 'D', text: 'benefited only a few previously disadvantaged people' },
                                                    { value: 'E', text: 'developing an action plan that includes tasks to be done' },
                                                    { value: 'F', text: 'employees are paid for the number of hours worked' },
                                                    { value: 'G', text: 'candidates who meet the minimum requirements are separated from others' },
                                                    { value: 'H', text: 'benefited a broader base of previously disadvantaged people' },
                                                    { value: 'I', text: 'developing an action plan to share with competitors' },
                                                    { value: 'J', text: 'uses pricing techniques to ensure a competitive advantage' }
                                                ]}
                                                correctAnswers="B"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            F. employees are paid for the number of hours worked
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            G. candidates who meet the minimum requirements are separated from others
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            H. benefited a broader base of previously disadvantaged people
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            I. developing an action plan to share with competitors
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            J. uses pricing techniques to ensure a competitive advantage
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
                                    if (newSel.length > 2) return; // Limit to 2
                                    setSelectedSectionB(newSel);
                                }} /> Question 2: Business Environments
                            </label>
                            <label>
                                <input type="checkbox" value="Q3" onChange={(e) => {
                                    const newSel = e.target.checked ? [...selectedSectionB, 'Q3'] : selectedSectionB.filter(s => s !== 'Q3');
                                    if (newSel.length > 2) return;
                                    setSelectedSectionB(newSel);
                                }} /> Question 3: Business Operations
                            </label>
                            <label>
                                <input type="checkbox" value="Q4" onChange={(e) => {
                                    const newSel = e.target.checked ? [...selectedSectionB, 'Q4'] : selectedSectionB.filter(s => s !== 'Q4');
                                    if (newSel.length > 2) return;
                                    setSelectedSectionB(newSel);
                                }} /> Question 4: Miscellaneous Topics
                            </label>
                        </div>

                        {selectedSectionB.includes('Q2') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 2: BUSINESS ENVIRONMENTS (40 marks)</h3>
                                <ListQuestion
                                    id="2.1"
                                    question="Name any TWO types of defensive strategies."
                                    numItems={2}
                                    correctAnswers={['divestiture', 'retrenchment', 'liquidation']}
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.2"
                                    question="Outline the advantages of diversification strategies."
                                    type="textarea"
                                    correctAnswers={[
                                        'increase sales and business growth',
                                        'improves the business brand and image',
                                        'reduces the risk of relying only on one product',
                                        'more products can be sold to existing customers and additional new markets can be established',
                                        'businesses gain more technological capabilities through product modification',
                                        'diversification into several industries or product lines can help create a balance during economic fluctuations',
                                        'businesses produce more output using less inputs as one factory may be used to manufacture more products'
                                    ]}
                                    marks={6}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.3.1"
                                    question="Many customers cannot afford their products due to low income levels, resulting in a decline in sales."
                                    type="text"
                                    correctAnswers="Social"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.3.2"
                                    question="They do not have internet facilities to cater for customers who prefer to make online purchases."
                                    type="text"
                                    correctAnswers="Technological"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.3.3"
                                    question="Simmy Traders can no longer afford to deliver goods due to the increase in the fuel price."
                                    type="text"
                                    correctAnswers="Economical"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.4"
                                    question="Explain the steps in strategy evaluation."
                                    type="textarea"
                                    correctAnswers={[
                                        'examine the underlying basis of a business strategy',
                                        'look forward and backwards into the implementation process',
                                        'compare the expected performance with the actual performance',
                                        'determine the reasons for deviations and analyse these reasons',
                                        'take corrective action so that deviations may be corrected',
                                        'set specific dates for control and follow up', 'draw up a table of the advantages and disadvantages of a strategy',
                                        'decide on the desired outcome as envisaged when strategies were implemented',
                                        'consider the impact of the strategic implementation in the internal and external environments of the business'
                                    ]}
                                    marks={6}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <div>
                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        2.5 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">EXCEL BANK (EB)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Excel Bank offers various financial products to prospective clients. The bank
                                            conducts an affordability assessment before credit is granted. EB ensures that
                                            their clients receive information in an understandable language. They also
                                            allow clients to access and challenge their credit records.
                                        </p>
                                    </div>
                                </div>
                                <Question
                                    id="2.5.1"
                                    question="Quote TWO consumer rights in terms of the National Credit Act (NCA), 2005 (Act 34 of 2005) from the scenario above."
                                    type="text"
                                    correctAnswers={[
                                        'EB ensures that their clients receive information in an understandable language',
                                        'They also allow clients to access and challenge their credit records'
                                    ]}
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.5.2"
                                    question="Discuss the impact of the National Credit Act on businesses."
                                    type="textarea"
                                    correctAnswers={[
                                        'The whole credit process is transparent as both businesses and customers know their responsibilities',
                                        'Lower bad debts resulting in better cash flow',
                                        'Protects businesses against non-paying consumers',
                                        'Authorised credit providers may attract more customers',
                                        'Increases cash sales because businesses only grant credit to qualifying customers',
                                        'Businesses do thorough credit checks and receive up-to-date documentation from the consumer',
                                        'Leads to more customers through credit sales as they are now protected from abuse',
                                        'Prevents reckless lending and businesses from bankruptcy',
                                        'Credit bureau information is made available to businesses to check the credit worthiness of consumers before granting credit',
                                        'Businesses can no longer carry out credit marketing',
                                        'Businesses struggle to get credit such as bank loans/overdrafts',
                                        'Businesses that do not comply with the NCA may face legal action',
                                        'Debt collection procedures are more complex and expensive',
                                        'Fewer customers buy on credit as it is more difficult to obtain credit',
                                        'Increases the administration burden/paperwork which is costly/time consuming',
                                        'Businesses need to appoint additional staff to deal with the extra administration',
                                        'Leads to loss of sales as many consumers may no longer qualify to buy on credit',
                                        'Should the credit agreement be declared reckless businesses can forfeit the outstanding debt and the goods',
                                        'Businesses that are official credit providers must submit a compliance report every year',
                                        'Businesses must make sure that all attempts have been made to recover the debt before blacklisting the customer'
                                    ]}
                                    marks={6}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.6"
                                    question="Explain overtime as one of the provisions of the Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997)."
                                    type="textarea"
                                    correctAnswers={[
                                        'Workers must agree to work overtime',
                                        'Workers cannot work more than three hours overtime per day/Workers cannot work more than 10 hours overtime per week',
                                        'Workers must be compensated at least one and half times the normal rate of pay for overtime worked on weekdays/Saturdays',
                                        'Workers must be compensated double the normal rate of pay for overtime worked on Sundays/public holidays',
                                        'Overtime must be paid either at the specified rate or an employee may agree to receive paid time off',
                                        'The Minister of Labour may prescribe the maximum permitted working hours, including overtime, for health and safety reasons for a certain category of work'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.7.1"
                                    question="Power of buyers"
                                    type="textarea"
                                    correctAnswers={[
                                        'Assess how easy it is for buyers/customers to drive prices down',
                                        'Determine the number of buyers/the importance of each buyer to the business and the cost of switching to other products',
                                        'A few powerful buyers are often able to dictate their terms to the business',
                                        'Buyers buying in bulk can bargain for prices in their favour',
                                        'If buyers can do without the business\'s products, then they have more power to determine the prices and terms of sale',
                                        'Conduct market research to gather more information about buyers/customers'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="2.7.2"
                                    question="Threat/Barriers to new entrants to the market"
                                    type="textarea"
                                    correctAnswers={[
                                        'If the barriers to enter the market are low, then it is easy for new businesses to enter the market/industry',
                                        'If the business is highly profitable, it will attract potential competitors that want to benefit from high profits',
                                        'New competitors can quickly/easily enter the market, if it takes little time/money to enter the market',
                                        'If there are a few suppliers of a product/service but many buyers, it may be easy to enter the market'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                        )}

                        {selectedSectionB.includes('Q3') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 3: BUSINESS OPERATIONS (40 marks)</h3>
                                <ListQuestion
                                    id="3.1"
                                    question="Name any THREE examples of fringe benefits."
                                    numItems={3}
                                    correctAnswers={[
                                        'medical aid fund/health insurance fund',
                                        'pension fund', 'provident fund', 'funeral benefits',
                                        'allowances/car/travel/housing/cell phone/clothing',
                                        'performance based incentives', 'issuing of bonus shares',
                                        'staff discount/free or low-cost meal/canteen facilities'
                                    ]}
                                    marks={3}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="3.2"
                                    question="Outline the role of the interviewer before the interview."
                                    type="textarea"
                                    correctAnswers={[
                                        'Book and prepare the venue for the interview',
                                        'Inform all shortlisted candidates about the date and place of the interview',
                                        'Set the interview date and ensure that all interviews take place on the same date, if possible',
                                        'Notify all panel members conducting the interview about the date and place of the interview',
                                        'Develop a core set of questions based on the skills/knowledge/ability required',
                                        'Check/read the application/verify the CV of every candidate for anything that may need to be explained',
                                        'Plan the programme for the interview and determine the time that should be allocated to each candidate',
                                        'Allocate the same amount of time to interview each candidate on the programme'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            3.3 Read the scenario below and answer the questions that follow.
                                        </p>
                                        <div className="scenario">
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MAPS COMPUTERS (MC)</h3>
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Maps Computers specialise in the manufacturing of computers. MC advertised
                                                a vacancy for a project manager on their business noticeboard.
                                            </p>
                                        </div>
                                    </div>
                                    <Question
                                        id="3.3.1"
                                        question="Identify the method of recruitment used by MC. Motivate your answer by quoting from the scenario above."
                                        type="text"
                                        correctAnswers="internal recruitment"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.3.1_motiv"
                                        question="Motivation"
                                        type="text"
                                        correctAnswers="MC advertised a vacancy for a project manager on their business noticeboard"
                                        marks={1}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.3.2"
                                        question="Explain the advantages of the method of recruitment identified in QUESTION 3.3.1 for a business."
                                        type="textarea"
                                        correctAnswers={[
                                            'Cheaper/Quicker to fill the post',
                                            'Placement is easy, as management knows the employees\' skills/personality/experience/strengths',
                                            'Provides opportunities for career paths within the business',
                                            'The employee already understands how the business operates, induction/training is not always necessary', '' +
                                            'Reduces the chances of losing employees, as future career prospects are available',
                                            'Detailed, reliable information can be obtained from the supervisors/employee records'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <Question
                                    id="3.4"
                                    question="Discuss the reasons for the termination of an employment contract."
                                    type="textarea"
                                    correctAnswers={[
                                        'The employer may dismiss an employee for valid reason(s) such as unsatisfactory job performance and misconduct',
                                        'Employer may no longer have work for redundant employees/cannot fulfil the contract/is restructuring',
                                        'The employer may retrench some employees due to insolvency/may not be able to pay the employees',
                                        'Employees decided to leave/resign voluntarily for better job opportunities',
                                        'An employee may have reached the pre-determined age for retirement',
                                        'Incapacity to work due to illness/injuries',
                                        'The duration of the employment contract expires/comes to an end',
                                        'By mutual agreement between the employer and employee'
                                    ]}
                                    marks={6}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="3.5"
                                    question="Outline the quality indicators of the financial function."
                                    type="textarea"
                                    correctAnswers={[
                                        'Obtain capital from the most suitable/available/reliable sources',
                                        'Negotiate better interest rates in order to keep financial cost down',
                                        'Draw up budgets to ensure sufficient application of monetary resources',
                                        'Keep financial records up to date to ensure timely/accurate tax payments',
                                        'Analyse strategies to increase profitability',
                                        'Invest surplus funds to create sources of passive income',
                                        'Implement financial control measures/systems to prevent fraud',
                                        'Implement credit granting/debt collecting policies to monitor cash flow',
                                        'Draw up accurate financial statements timeously/regularly',
                                        'Accurately analyse and interpret financial information',
                                        'Invest in strategies that will assist the business to remain profitable',
                                        'Avoid over/under-capitalisation so that financial resources will be utilised effectively'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            3.6 Read the scenario below and answer the questions that follow.
                                        </p>
                                        <div className="scenario">
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">RASHID MANUFACTURERS (RM)</h3>
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Rashid Manufacturers implement total quality management (TQM) to reduce
                                                the cost of quality. The employees of RM attend regular training sessions to
                                                understand their role in quality management. RM share good practices with
                                                business partners. They also work closely with suppliers to improve the quality
                                                of their raw materials.
                                            </p>
                                        </div>
                                    </div>
                                    <Question
                                        id="3.6.1"
                                        question="Quote TWO ways in which TQM reduces the cost of quality from the scenario above."
                                        type="text"
                                        correctAnswers={[
                                            'The employees of RM attend regular training sessions to understand their role in quality management',
                                            'They also work closely with suppliers to improve the quality of their raw materials'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.6.2"
                                        question="Explain other ways in which TQM can reduce the cost of quality."
                                        type="textarea"
                                        correctAnswers={[
                                            'Introduce quality circles/small teams of five to ten employees, who meets regularly to discuss ways of improving the quality of their work',
                                            'Schedule activities to eliminate duplication of tasks/activities',
                                            'Share responsibility for quality output between management and workers',
                                            'Develop work systems that empower employees to find new ways of improving quality',
                                            'Improve communication about the quality challenges/deviations, so that everyone can learn from past experiences',
                                            'Reduce investment on expensive, but ineffective inspection procedures in the production process',
                                            'Implement pro-active maintenance programmes for equipment/machinery to reduce/eliminate breakdowns'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <Question
                                    id="3.7"
                                    question="Discuss the impact of total quality management (TQM) if poorly implemented by businesses."
                                    type="textarea"
                                    correctAnswers={[
                                        'Setting unrealistic deadlines that may not be achieved',
                                        'Employees may not be adequately trained resulting in poor quality products',
                                        'Decline in productivity, because of stoppages',
                                        'Businesses may not be able to make necessary changes to products/services to satisfy the needs of customers',
                                        'Businesses\' reputation/image may suffer because of poor quality/defective goods',
                                        'Customers will have many alternatives to choose from and the impact could be devastating to businesses',
                                        'Investors might withdraw investment, if there is a decline in profits',
                                        'Decline in sales as more goods are returned by unhappy customers',
                                        'High staff turnover, because of poor skills development',
                                        'Undocumented/Uncontrolled quality control processes/systems could result in errors/deviations from pre-set quality standards'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="3.8"
                                    question="Advise large businesses on the advantages of adequate financing and capacity as a total quality management (TQM) element."
                                    type="textarea"
                                    correctAnswers={[
                                        'Large businesses have sufficient financing to test everything before implementing',
                                        'They can afford to have systems in place to prevent errors in processes/defects in raw materials/products',
                                        'Able to afford product research/market researchers to gather information about products/customers',
                                        'Large businesses can fund programmes aimed at improving quality processes',
                                        'Large businesses can afford to purchase quality raw materials and equipment'
                                    ]}
                                    marks={6}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                        )}

                        {selectedSectionB.includes('Q4') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 4: MISCELLANEOUS TOPICS (40 marks)</h3>
                                <div>
                                    <p className="font-medium text-[var(--text-primary)]">4.1 Name any TWO types of business environments and state the extent of control businesses have over EACH business environment.</p>
                                    <table className="pdf-table">
                                        <thead>
                                        <tr><th>BUSINESS ENVIRONMENTS</th><th>EXTENT OF CONTROL</th></tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>
                                                <ListQuestion
                                                    id=""
                                                    question=""
                                                    numItems={2}
                                                    correctAnswers={[
                                                        'Micro environment',
                                                        'Market environment',
                                                        'Macro environment'
                                                    ]}
                                                    marks={2}
                                                    onAnswerChange={handleAnswerChange}
                                                    answerStatus={answerStatus}
                                                />
                                            </td>
                                            <td>
                                                <Question
                                                    id="4.1.1_control"
                                                    question=""
                                                    type="text"
                                                    correctAnswers={[
                                                        'full control',
                                                        'Partial/Some/Limited/Less/Little control',
                                                        'No control'
                                                    ]}
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
                                    id="4.2"
                                    question="Outline the role of SETAs in supporting the Skills Development Act (SDA), 1998 (Act 97 of 1998)."
                                    type="textarea"
                                    correctAnswers={[
                                        'Develop sector skills plans in line with the National Skills Development Strategy',
                                        'Draw up skills development plans for their specific economic sectors',
                                        'Approve workplace skills plans and annual training reports',
                                        'Allocate grants to employers, education and training providers',
                                        'Pay out grants to companies that are complying with the requirements of the Skills Development Act',
                                        'Monitor/Evaluate the actual training by service providers',
                                        'Promote and establish learnerships',
                                        'Register learnership agreements/learning programmes',
                                        'Provide training material/programmes for skills development facilitators',
                                        'Provide accreditation for skills development facilitators',
                                        'Oversee training in different sectors of the South African economy',
                                        'Identify suitable workplaces for practical work experience',
                                        'Collect levies and pay out grants as required',
                                        'Report to the Director General'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            4.3 Read the scenario below and answer the questions that follow.
                                        </p>
                                        <div className="scenario">
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">TOM TRADING ENTERPRISE (TTE)</h3>
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Tom Trading Enterprise wanted to increase the sale of their products. TTE
                                                employed additional sales representatives to distribute their products to other
                                                provinces.
                                            </p>
                                        </div>
                                    </div>
                                    <Question
                                        id="4.3.1"
                                        question="Identify the type of intensive strategy used by TTE in the scenario above."
                                        type="text"
                                        correctAnswers="market development"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.3.2"
                                        question="Explain TWO other types of intensive strategies."
                                        type="textarea"
                                        correctAnswers={[
                                            'Market penetration: New products penetrate an existing market at a low price, until it is well known to the customers and then the prices increases/Businesses focus on selling existing products into existing market to increase their market share',
                                            'Product development: It is a growth strategy where businesses aim to introduce new products into existing markets/modifies an existing product/Businesses generate new ideas/develop new products/services/Businesses conduct test marketing/market research to establish whether new products will be accepted by existing customers/New products may be different/of a higher quality than those of competitors'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <Question
                                    id="4.4"
                                    question="Suggest ways in which businesses could comply with the Employment Equity Act (EEA), 1998 (Act 55 of 1998)."
                                    type="textarea"
                                    correctAnswers={[
                                        'Businesses should guard against discriminatory appointments',
                                        'Assess the racial composition of all employees, including senior management',
                                        'Ensure that there is equal representation of all racial groups in every level of employment',
                                        'Clearly define the appointment process, so that all parties are well informed',
                                        'Ensure that diversity/inclusivity in the workplace is achieved',
                                        'Prepare an employment equity plan in consultation with employees',
                                        'Compile employment equity plans that indicate how they will implement affirmative action',
                                        'Ensure that affirmative action measures promote diversity in the workplace',
                                        'Implement the employment equity plan',
                                        'Implement affirmative action measures to redress disadvantages experienced by designated groups/Accommodate people from different designated groups',
                                        'Submit the employment equity plan to the Department of Labour',
                                        'Assign one or more senior managers to ensure implementation and monitoring of the employment equity plan',
                                        'Eliminate barriers that have an adverse impact on designated groups',
                                        'Regularly report to the Department of Labour on progress in implementing the plan',
                                        'Display a summary of the Act where employees can clearly see/have access to the document',
                                        'Conduct medical/psychological tests fairly to employees/when deemed necessary/Use certified psychometric tests to assess applicants/employees to ensure that suitable candidates are appointed',
                                        'Ensure that the workplace represents the demographics of the country at all levels',
                                        'Restructure/Analyse current employment policies/practices/procedures to accommodate designated groups',
                                        'Retrain/Develop/Train designated groups through skills development programmes',
                                        'Employees must be paid equal for work of equal value'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <ListQuestion
                                    id="4.5"
                                    question="State FOUR aspects that should be included in an employment contract."
                                    numItems={4}
                                    correctAnswers={[
                                        'personal details of the employee',
                                        'details of the business/employer such as the name and address',
                                        'job title/Position',
                                        'job description such as duties and working conditions',
                                        'job specification such as formal qualifications and willingness to travel',
                                        'date of employment/Commencement of employment',
                                        'place where employee will spend most of his/her working time',
                                        'hours of work such as normal time and overtime',
                                        'remuneration such as weekly or monthly pay',
                                        'benefits/Fringe benefits/Perks/Allowances',
                                        'leave such as sick/maternity/annual/adoption leave',
                                        'employee deductions such as compulsory/non-compulsory',
                                        'duration/Period of employment contract/Details of termination/Expiry date of employment contract',
                                        'probation period', 'signatures of both the employer and employee',
                                        'list of documents that form part of the contract, such as appointment letter/code of conduct/ethics',
                                        'disciplinary policies such as rules/procedures for unacceptable behaviour'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <div>
                                    <div>
                                        <p className="font-medium text-[var(--text-primary)] mb-2">
                                            4.6 Read the scenario below and answer the questions that follow.
                                        </p>
                                        <div className="scenario">
                                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">TUMISHO CONSULTANTS (TC)</h3>
                                            <p className="text-[var(--text-primary)] leading-relaxed">
                                                Tumisho Consultants recently employed Mandy as a senior cashier. The
                                                management of TC agreed that Mandy will be offered in-service training to
                                                improve her skills. TC drew up a progamme to ensure a smooth induction
                                                process. Mandy will be given the opportunity to experience different
                                                departments.
                                            </p>
                                        </div>
                                    </div>
                                    <Question
                                        id="4.6.1"
                                        question="Quote TWO purposes of induction from the scenario above."
                                        type="text"
                                        correctAnswers={[
                                            'The management of TC agreed that Mandy will be offered in-service training to improve her skills',
                                            'Mandy will be given the opportunity to experience different departments'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.6.2"
                                        question="Describe the benefits of induction for businesses."
                                        type="textarea"
                                        correctAnswers={[
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
                                            'New employees will know the layout of the building/factory/offices/where everything is, which saves production time',
                                            'Learn more about the business so that new employees understand their roles/responsibilities in order to be more efficient',
                                            'Company policies regarding conduct/procedures/safety and security/employment contract/conditions of employment/working hours/leave, are communicated',
                                            'Realistic expectations for new employees as well as the business are created',
                                            'New employees may feel part of the team resulting in positive morale/motivation',
                                            'Employees may have a better understanding of business policies regarding ethical/professional conduct/procedures/CSR',
                                            'Reduces staff turnover as new employees have been inducted properly'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <Question
                                    id="4.7"
                                    question="Explain how businesses can apply any TWO steps of the PDCA model to improve the quality of their products."
                                    type="textarea"
                                    correctAnswers={[
                                        'Plan: Businesses should identify the problem/Develop a plan for improvement to processes and systems/Answer questions such as \'what to do\' and \'how to do it\'/Plan the method and approach',
                                        'Do: Businesses should implement the change on a small scale/Implement the processes and systems',
                                        'Check/Analyse: Use data to analyse the results of change/Determine whether it made a difference/Check whether the processes are working effectively/Assess/Establish if it is working/if things are going according to plan',
                                        'Act as needed: Institutionalise the improvement/Devise strategies on how to continually improve/If the change was successful, implement it on a wider scale/Continuously revise the process'
                                    ]}
                                    marks={6}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="4.8"
                                    question="Advise businesses on the quality indicators of the purchasing function."
                                    type="textarea"
                                    correctAnswers={[
                                        'Businesses should buy raw materials/products in bulk at lower/discounted prices',
                                        'Select reliable suppliers that render the best quality raw materials/capital goods at reasonable prices',
                                        'Place orders timeously and do regular follow-ups to ensure that goods are delivered on time',
                                        'Effective co-ordination between the purchasing and production departments so that purchasing staff understand the production process/requirements',
                                        'Required quantities should be delivered at the right time and place',
                                        'Implement/Maintain stock control systems to ensure the security of stock',
                                        'Maintain optimum stock levels to avoid overstocking/reduce out-dated stock',
                                        'Monitor and report on minimum stock levels to avoid stock-outs',
                                        'Effective use of storage space and maintain product quality while in storage',
                                        'Involve suppliers in strategic planning/product design/material selection/quality control processes',
                                        'Ensure that there is no break in production due to stock shortages',
                                        'Establish relationships with suppliers so that they are in alignment with the business\'s vision/mission/values',
                                        'Have a thorough understanding of supply chain management to apply the correct procurement procedures/processes'
                                    ]}
                                    marks={4}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                        )}
                    </div>

                    {/* Section C: Choose 1 */}
                    <div className="pdf-section page-break">
                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">SECTION C: Answer ANY ONE (40 marks)</h2>
                        <p className="mb-4 text-[var(--text-secondary)]">Select one essay question:</p>
                        <div className="space-y-2">
                            <label>
                                <input type="radio" name="sectionC" value="Q5" onChange={(e) => setSelectedSectionC(e.target.value)} /> Question 5: Business Environments (Legislation)
                            </label>
                            <label>
                                <input type="radio" name="sectionC" value="Q6" onChange={(e) => setSelectedSectionC(e.target.value)} /> Question 6: Business Operations (Quality of Performance)
                            </label>
                        </div>
                        {selectedSectionC === 'Q5' && (
                            <div>
                                <div>
                                    <div className="scenario">
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            The Labour Relations Act (LRA), 1995 (Act 66 of 1995) makes provision for the rights
                                            of employees in the workplace. Businesses are expected to have a sound knowledge
                                            of this Act for effective implementation. Many businesses implement legal advice to
                                            avoid penalties for non-compliance with the LRA.
                                        </p>
                                    </div>
                                </div>
                                <Question
                                    id="5"
                                    question="Write an essay on the Labour Relations Act in which you include the following aspects: Outline the rights of employees in terms of the Labour Relations Act. Explain the purpose of the Labour Relations Act. Discuss the impact of the Labour Relations Act on businesses. Advise businesses on penalties they may face for non-compliance with this Act."
                                    type="textarea"
                                    correctAnswers={[
                                        'The Labour Relations Act enables employees to apply their rights in the workplace',
                                        'LRA provides sound legal structures that promote labour peace in the workplace',
                                        'Employees may join a trade union of their choice',
                                        'May embark on legal strikes as a remedy for grievances',
                                        'Refer unresolved workplace disputes to the CCMA',
                                        'Refer unresolved CCMA disputes to the Labour Court on appeal',
                                        'Request trade union representatives to assist/represent employees in the \n' +
                                        'grievance/disciplinary hearing',
                                        'Promotes/Facilitates collective bargaining at the workplace/at sectorial level',
                                        'Promotes workplace forums√ to accommodate employees in decision making',
                                        'Promotes fair labour practice between the employers and employees',
                                        'Promotes simple procedures for the registration of trade unions/employer \n' +
                                        'organisations',
                                        'Establishes Labour Courts and Labour Appeal Courts',
                                        'Promotes a healthy relationship between the employer and employees',
                                        'Protects the rights of businesses in labour relations issues',
                                        'Labour disputes are settled quicker and are less expensive',
                                        'Workplace forums can add value to businesses if it functions properly',
                                        'Protects employers who embark on lawful lock-outs when negotiations \n' +
                                        'between parties fail',
                                        'LRA provides for the principles of collective bargaining and puts structures in \n' +
                                        'place with which disputes in the workplace can be settled',
                                        'Provides specific guidelines for employers on correct and fair disciplinary \n' +
                                        'procedures',
                                        'Reduced global competitiveness due to lower productivity',
                                        'Productivity may decrease if employees are allowed to participate in the \n' +
                                        'activities of trade unions during work time',
                                        'Costs of labour increases because of legal strikes',
                                        'Employers may not get a court interdict to stop a strike',
                                        'Employers may have to disclose information about workplace issues to union \n' +
                                        'representatives that could be the core of their competitive advantage',
                                        'The employer may be forced to enter into a dispute resolution process',
                                        'Businesses will be fined if they fail to comply with the agreements reached \n' +
                                        'during the dispute resolution process',
                                        'Businesses can be ordered to pay compensation and damages to the  \n' +
                                        'employee',
                                        'The rights of the employees provide a legal framework for acceptable labour \n' +
                                        'practices in the workplace',
                                        'The collective bargaining process enable employer organisations and trade \n' +
                                        'unions to agree on labour issues resulting in reduced labour disputes',
                                        'Fair labour practices promote peace and harmony in the workplace',
                                    ]}
                                    marks={40}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                            </div>
                        )}
                        {selectedSectionC === 'Q6' && (
                            <div>
                                <div>
                                    <div className="scenario">
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Businesses implement quality control and quality assurance processes to produce high
                                            quality products. They also enjoy the benefits of a high quality management system.
                                            Continuous skills development and total client satisfaction contribute towards the
                                            effective implementation of total quality management (TQM). Other businesses prefer
                                            to use the services of quality circles to achieve the desired outcome.
                                        </p>
                                    </div>
                                </div>
                                <Question
                                    id="6"
                                    question="Write an essay on quality of performance in which you include the following aspects: Outline the differences between quality control and quality assurance. Explain the benefits of a good quality management system. Discuss the impact of the following TQM elements on large businesses: Continuous skills development/Education and training; Total client/customer satisfaction. Advise businesses on the role of quality circles as part of continuous improvement to processes and systems."
                                    type="textarea"
                                    correctAnswers={[
                                        'Quality control plays an important role in the entire production process as it \n' +
                                        'determines the results of the end product',
                                        'Quality assurance enables businesses to identify and correct product defects \n' +
                                        'during the initial stage of production',
                                        'A good quality management system may allow businesses to continuously \n' +
                                        'review their quality processes that are aimed at producing quality products',
                                        'System that ensures the desired quality is met by inspecting the final product',
                                        'Ensure that finished products meet the required standards',
                                        'Process of ensuring that products are consistently manufactured to high standards',
                                        'Includes setting targets/measuring performance and taking corrective measures',
                                        'Checks carried out during and after the production process',
                                        'Ensure that required standards have been met at every stage of the process',
                                        'Processes put in place to ensure that the quality of products/services/ systems adhere to pre-set standards with minimal defects/delays/shortcomings',
                                        'Effective customer services are rendered, resulting in increased customer satisfaction',
                                        'Time and resources are used efficiently',
                                        'Productivity increases through proper time management/using high quality resources',
                                        'Vision/Mission/Business goals may be achieved',
                                        'A business has a competitive advantage over its competitors',
                                        'Regular training will continuously improve the quality of employees\' skills/knowledge',
                                        'Large businesses have a human resources department dedicated to skills training and development',
                                        'Human resources experts ensure that training programmes are relevant to \n' +
                                        'increase customer satisfaction',
                                        'Ability to afford specialised/skilled employees',
                                        'Large businesses conduct skills audits to establish the competency/education \n' +
                                        'levels of staff which may positively affect the quality of products',
                                        'Poor communication systems in large businesses may prevent effective \n' +
                                        'training from taking place',
                                        'Trained employees may leave for better jobs after they gained more skills',
                                        'De-motivates employees, if they do not receive recognition for training',
                                        'Employees who specialise in narrowly defined jobs may become frustrated/demotivated',
                                        'Large businesses use market research/customer surveys to measure/monitor \n' +
                                        'customer satisfaction/analyse customers\' needs',
                                        'Continuously promote a positive company image',
                                        'May achieve a state of total client/customer satisfaction, if businesses follow \n' +
                                        'sound business practices that incorporate all stakeholders',
                                        'May lead to increased competitiveness/profitability',
                                        'Employees who seldom meet customers often do not have a clear idea of \n' +
                                        'what will satisfy their needs',
                                        'Monopolistic companies have an increased bargaining power so they do not \n' +
                                        'necessarily have to please customers',
                                        'Solve problems related to quality and implement improvements',
                                        'Investigate problems and suggest solutions to management',
                                        'Ensure that there is no duplication of activities/tasks in the workplace',
                                        'Make suggestions for improving processes and systems in the workplace',
                                        'Improve the quality of products/services/productivity through regular reviews of quality processes',
                                        'Monitor/Reinforce strategies to improve the smooth running of business operations',
                                        'Increase employees\' morale and motivation',
                                        'Discuss ways of improving the quality of work/workmanship',
                                        'Quality control enables businesses to avoid fruitless expenditure due to low \n' +
                                        'sales resulting from poor products',
                                        'Quality assurance minimises the number of products that customers will return \n' +
                                        'for a replacement item or to get a refund',
                                        'Businesses should always review the implementation of quality control and quality assurance to continuously enjoy the benefits of a good quality management system'
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
                {/* Section A: Compulsory */}
            </div>
        </div>
    );
};

BusinessStudiesP1Nov2022.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP1Nov2022;