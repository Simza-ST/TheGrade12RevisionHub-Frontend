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

const BusinessStudiesP2Nov2024 = ({ darkMode = false, setDarkMode = () => {}, notifications = [] }) => {
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
                    <h2>Business Studies P2 November 2024</h2>
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
                                    question="The leadership style in which subordinates are experts and take full responsibility for their actions:"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. Transactional' },
                                        { value: 'B', text: 'B. Democratic' },
                                        { value: 'C', text: 'C. Laissez-faire' },
                                        { value: 'D', text: 'D. Charismatic' }
                                    ]}
                                    correctAnswers="C"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.2"
                                    question="The main objective of a … is to create mutual benefit for its members."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. partnership' },
                                        { value: 'B', text: 'B. cooperative' },
                                        { value: 'C', text: 'C. state-owned company' },
                                        { value: 'D', text: 'D. private company' }
                                    ]}
                                    correctAnswers="B"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.3"
                                    question="Chidere Enterprise uses fine print to hide misleading information when promoting their products. This is known as …, a type of unethical business practice."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. taxation' },
                                        { value: 'B', text: 'B. pricing of goods in rural areas' },
                                        { value: 'C', text: 'C. fair advertising' },
                                        { value: 'D', text: 'D. unfair advertising' }
                                    ]}
                                    correctAnswers="D"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.4"
                                    question="The role of health and safety representatives is to …"
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. ensure that protective clothing is available.' },
                                        { value: 'B', text: 'B. provide safety clothes to employees.' },
                                        { value: 'C', text: 'C. use prescribed safety equipment.' },
                                        { value: 'D', text: 'D. maintain equipment regularly.' }
                                    ]}
                                    correctAnswers="A"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.1.5"
                                    question="Amajuba team members implement … as a criterion for successful team performance by agreeing on methods to get the job done,without wasting time on conflict resolution."
                                    type="radio"
                                    options={[
                                        { value: 'A', text: 'A. shared values' },
                                        { value: 'B', text: 'B. communication' },
                                        { value: 'C', text: 'C. collaboration' },
                                        { value: 'D', text: 'D. interpersonal attitudes and behaviour' }
                                    ]}
                                    correctAnswers="C"
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
                                <p className="scenario">bonus; limited; conflict; cultural; posters; grievance; social; hand-outs; unlimited; founders</p>
                                <Question
                                    id="1.2.1"
                                    question="Visco Limited issued … shares to the promoters of the company."
                                    type="text"
                                    correctAnswers="founders"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.2"
                                    question="Ben distributed … at the start of the presentation to attract the attention of the audience."
                                    type="text"
                                    correctAnswers="hand-outs"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.3"
                                    question="The shareholders at Blake Ltd have … liability and can only lose the amount that they invested in the company."
                                    type="text"
                                    correctAnswers="limited"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.4"
                                    question="A disagreement between two or more parties in the workplace is known as a …"
                                    type="text"
                                    correctAnswers="conflict"
                                    marks={2}
                                    onAnswerChange={handleAnswerChange}
                                    answerStatus={answerStatus}
                                />
                                <Question
                                    id="1.2.5"
                                    question="Employees at Mawethu Traders are allowed to use their own language during their lunch breaks; this promotes their … right in the workplace."
                                    type="text"
                                    correctAnswers="cultural"
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
                                                question="Security"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="G"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            A. allows employees to silently generate many ideas on their own
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">G: based on the principle of certainty</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.2"
                                                question="Redeemable preference shares"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="E"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            B. managers must know their facts when dealing with this type of personality
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">E: can be bought back at the option of the issuing company</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.3"
                                                question="Nominal group technique"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="A"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            C. business decisions must be clear to all stakeholders
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">A: allows employees to silently generate many ideas on their own</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.4"
                                                question="Accountability"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="I"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            D. based on the principle of indemnity
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">I: business should take responsibility for their decisions</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Question
                                                id="1.3.5"
                                                question="Expert"
                                                type="select"
                                                options={[{ value: 'A', text: 'A' }, { value: 'B', text: 'B' }, { value: 'C', text: 'C' }, { value: 'D', text: 'D' }, { value: 'E', text: 'E' }, { value: 'F', text: 'F' }, { value: 'G', text: 'G' }, { value: 'H', text: 'H' }, { value: 'I', text: 'I' }, { value: 'J', text: 'J' }]}
                                                correctAnswers="B"
                                                marks={2}
                                                onAnswerChange={handleAnswerChange}
                                                answerStatus={answerStatus}
                                            />
                                        </td>
                                        <td>
                                            E. can be bought back at the option of the issuing company
                                            {answerStatus && <p className="text-[var(--text-secondary)] text-sm">B: managers must know their facts when dealing with this type of personality</p>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            F. managers must restrict the time of the discussion when dealing with this type of personality
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            G. based on the principle of certainty
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            H. allows employees to randomly generate suggestions aloud
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            I. business should take responsibility for their decisions
                                        </td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>
                                            J. can only be bought back when the company closes down
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
                                }} /> Question 2: Business Ventures
                            </label>
                            <label>
                                <input type="checkbox" value="Q3" onChange={(e) => {
                                    const newSel = e.target.checked ? [...selectedSectionB, 'Q3'] : selectedSectionB.filter(s => s !== 'Q3');
                                    if (newSel.length > 2) return;
                                    setSelectedSectionB(newSel);
                                }} /> Question 3: Business Roles
                            </label>
                            <label>
                                <input type="checkbox" value="Q4" onChange={(e) => {
                                    const newSel = e.target.checked ? [...selectedSectionB, 'Q4'] : selectedSectionB.filter(s => s !== 'Q4');
                                    if (newSel.length > 2) return;
                                    setSelectedSectionB(newSel);
                                }} /> Question 4: MISCELLANEOUS TOPICS
                            </label>
                        </div>

                        {selectedSectionB.includes('Q2') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 2: BUSINESS ENVIRONMENTS (40 marks)</h3>
                                <div>
                                    <ListQuestion
                                        id="2.1"
                                        question="List any FOUR types of investment opportunities."
                                        numItems={4}
                                        correctAnswers={[
                                            'Mutual funds',
                                            'Stokvel',
                                            'Managed portfolio',
                                            'Venture capital',
                                            '32-day notice account',
                                            'Debentures',
                                            'Endowment',
                                            'Retirement annuities'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="2.2"
                                        question="Outline the advantages of a state-owned company."
                                        numItems={6}
                                        correctAnswers={[
                                            'Profits may be used to finance other state departments',
                                            'Offer essential services which may not be offered by the private sector',
                                            'Prices are kept reasonable/Create sound competition to make services affordable to more citizens',
                                            'Wasteful duplication of services is eliminated',
                                            'Planning can be coordinated through central control',
                                            'Generates income/Receive government funds to finance social programmes',
                                            'Jobs are created for all skills levels'
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
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">AKHONA TRADERS (AT)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Akhona Traders bought stock to the value of R400 000 but only insured it for
                                            R200 000. A fire broke out in the warehouse and destroyed stock to the value
                                            of R80 000
                                        </p>
                                    </div>
                                    <Question
                                        id="2.3.1"
                                        question="Name the insurance clause that is applicable to AT in the scenario above."
                                        type="text"
                                        correctAnswers="Average clause"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="2.3.2"
                                        question="Calculate the amount that AT will receive as compensation from the insurer. Show ALL the calculations."
                                        type="textarea"
                                        correctAnswers="R40 000"
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="2.4"
                                        question="Explain aspects that should be considered when designing a multimedia presentation"
                                        type="textarea"
                                        correctAnswers={[
                                            'Start with the heading/text which forms the basis of the presentation.',
                                            'Select the background to complement/enhance the text',
                                            'Choose images √ that may help to communicate the message',
                                            'Include/Create graphics to assist the information which is conveyed.',
                                            'Add special effects/sound/pictures/animation to make it interesting for the audience',
                                            'Create hyperlinks to allow quick access to other files/documents/video clips',
                                            'Use legible font and font size so that it is easy to see/read',
                                            'Keep slides/images/graphs/font simple by not mixing different styles/colours',
                                            'Make sure there are no language and spelling errors',
                                            'Use bright colours to increase visibility',
                                            'Structure information in a logical sequence so that the audience can easily follow the content of the presentation',
                                            'Limit the information on each slide by using key words and not full sentences'
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
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">EXCLUSIVE ARCHITECTS (EA)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Exclusive Architects operate in a competitive environment and had to improve
                                            the designs of their housing plans. The management of EA provide emotional
                                            support for employees through coaching so that they can share their ideas
                                            more freely.
                                        </p>
                                    </div>
                                    <Question
                                        id="2.5.1"
                                        question="Identify the leadership theory used by EA. Motivate your answer by quoting from the scenario above."
                                        type="textarea"
                                        correctAnswers={['Transformational','Transitional theory','The management of EA provide emotional support for employees through coaching so that they can share their ideas more freely']}
                                        marks={3}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="2.5.2"
                                        question="Explain ONE other leadership theory."
                                        type="textarea"
                                        correctAnswers={[
                                            'Teams achieve great results/set out organisational goals when there is a sense of understanding between the leader and the team of followers/employees',
                                            'Followers listen to what is expected of them/follow the instructions of the leader and are willing to work as a team towards the organisation goals',
                                            'Followers easily accept/take responsibility when something doesn\'t work out/targets are not achieved.',
                                            'Leaders lead by example and reward/provide incentives for positive behaviour',
                                            'Leaders motivate employees to devise alternative strategies/to be creative and innovative/to find more efficient ways to use available resources/increase productivity',
                                            'Creates capacity within the broader economic landscape at all levels through the implementation of the BBBEE pillars'
                                        ]}
                                        marks={3}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.6"
                                        question="Discuss the impact of the autocratic leadership style on businesses."
                                        type="textarea"
                                        correctAnswers={[
                                            'Quick decisions can be taken without consulting/considering followers/employees',
                                            'Work gets done in time/on schedule as targets are clearly specified',
                                            'Line of command/communication is clear as it is top-down/followers know exactly what to do',
                                            'Provides strong leadership which makes new employees feel confident/safe',
                                            'Works well in large companies where consultation with every employee is impractical',
                                            'Leaders and followers may become divided as tension arise and may not agree on ways to solve problems',
                                            'Workers can become demotivated if their opinions/ideas are not considered',
                                            'De-motivated workers impact negatively on productivity'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="2.7"
                                        question="Recommend ways in which presenters can handle feedback in a non-aggressive and professional manner"
                                        type="textarea"
                                        correctAnswers={[
                                            'The presenter should stand throughout the feedback session',
                                            'Be polite/confident/courteous/calm when responding to questions',
                                            'Ensure that each question/comment is clearly understood before responding/rephrase questions if uncertain',
                                            'The presenter should first listen and then respond',
                                            'Provide feedback as soon as possible after the question was asked or after the session',
                                            'Be direct/honest/sincere when responding to questions',
                                            'Use simple language to support the examples used in the presentation',
                                            'Keep answers short and to the point',
                                            'Apologise/Acknowledge errors/mistakes if pointed out by the audience',
                                            'Encourage questions from the audience.'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                            </div>
                        )}
                        {/* Similar for Q3 (ownership forms) and Q4 (ethics, with scenario on unethical practices) */}
                        {selectedSectionB.includes('Q3') && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">QUESTION 3: BUSINESS ROLES</h3>
                                {/* Subquestions on sole prop, partnership, company */}
                                <div>
                                    <ListQuestion
                                        id="3.1"
                                        question="Name any TWO corporate social investment (CSI) focus areas."
                                        numItems={2}
                                        correctAnswers={[
                                            'Community',
                                            'Rural development',
                                            'Employees',
                                            'Environment'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="3.2"
                                        question="Outline the responsibilities of workers in promoting human health and safety in the workplace."
                                        numItems={6}
                                        correctAnswers={[
                                            'Use prescribed safety equipment',
                                            'Report accidents to the employer by the end of the shift',
                                            'Report unsafe/unhealthy working conditions to the relevant authorities/management',
                                            'Inform the employer of any illness that may affect the ability to work',
                                            'Take care of their own health and safety in the workplace',
                                            'Co-operate and comply with the rules and procedures, such as wear prescribed safety clothing'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">3.3 Read the scenario below and answer the questions that follow.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">TORNADO FURNITURE (TF)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Tornado Furniture specialises in the manufacturing of lounge suites. They
                                            monitor their employees on an hourly basis to ensure that tasks are
                                            completed on time. The management allows only certain employees access
                                            to the business funds. TF also strengthens the team spirit among the
                                            employees so that they feel responsible for what needs to be achieved.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="3.3.1"
                                        question="Quote TWO ways in which TF is dealing with the abuse of work time as a type of unprofessional business practice from the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'They monitor their employees on an hourly basis to ensure that tasks are completed on time',
                                            'TF also strengthens the team spirit among the employees so that they feel responsible for what needs to be achieved'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.3.2"
                                        question="Explain other ways in which TF can deal with abuse of work time as a type of unprofessional business practice in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Speak directly to those employees who abuse work time',
                                            'Make employees aware that profit will decrease resulting in less incentives/bonus pay-outs.',
                                            'The code of conduct/ethics should contain clear rules √ about abuse of work time',
                                            'TF/A business should conduct training on the contents of the code of conduct/ethics',
                                            'The code of conduct/ethics should be signed by all employees so that they are aware of its contents',
                                            'Structure working hours √ in such a way that employees have free/flexible time for personal matters'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.4"
                                        question="Recommend ways in which businesses can create an environment that promotes creative thinking in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Emphasise the importance of creative thinking to ensure that all staff know that management wants to hear their ideas',
                                            'Make time for brainstorming sessions to generate new ideas such as regular workshops/build on one another\'s ideas',
                                            'Place suggestion boxes around the workplace and keep communication channels open for new ideas',
                                            'Train staff in innovative techniques/creative problem-solving skills/mind-mapping/lateral thinking',
                                            'Encourage job swops within the organisation/Study how other businesses are doing things',
                                            'Encourage employees to develop/come up with new/unique ideas/alternative ways of working/doing things',
                                            'Reward creativity by offering reward schemes to employees/Introduce incentives for staff members who came up with useful creative ideas',
                                            'Respond enthusiastically to all ideas and never let anyone feel less important',
                                            'Make the working environment conducive to creativity/free from distraction/high noise levels',
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">3.5 Read the scenario below and answer the questions that follow.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">MEDAL DESIGNERS (MD)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Medal Designers gave Pumla the responsibility to manage a team of
                                            experienced and highly competent members. Team members are able to
                                            handle the decision-making process without Pumla supervising them. They
                                            are also aware of the importance of team dynamic theories in improving team
                                            performance.
                                        </p>
                                    </div>
                                    <Question
                                        id="3.5.1"
                                        question="Name the stage of team development applicable in the scenario above."
                                        type="text"
                                        correctAnswers="Performing"
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="3.5.2"
                                        question="Discuss the importance of team dynamic theories in improving team performance."
                                        type="textarea"
                                        correctAnswers={[
                                            'Team dynamic theories explain how effective teams work/operate',
                                            'Businesses are able to allocate tasks according to the roles of team members',
                                            'Team members can optimise/maximise performance as tasks are allocated according to their abilities/skills/attributes/personalities',
                                            'Team members with similar strengths may compete for team tasks/responsibilities that best suit their abilities/competencies',
                                            'Theories assist team leaders to understand the personality types of team members so that tasks are assigned more effectively',
                                            'Conflict may be minimised when team members perform different roles'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>

                                    <Question
                                        id="3.6"
                                        question="Explain how businesses should handle conflict in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Acknowledge that there is conflict between employers/employees/parties in the workplace',
                                            'Identify the cause of the conflict to get clarity on its nature',
                                            'Arrange time and place for negotiations where all employees involved are present',
                                            'Arrange a meeting between conflicting employers and employees',
                                            'Make the intentions/purpose for intervention/meeting clear so that parties involved may feel at ease',
                                            'Arrange a pre-negotiation meeting where workers/complainants will be allowed to state their case/views separately',
                                            'Each party has the opportunity to express his/her own opinions/feelings',
                                            'Conflicting parties may recognise that their views are different during the meeting',
                                            'Analyse the cause(s) of conflict by breaking it down into different parts',
                                            'Evaluate the views expressed and make an objective decision',
                                            'Blame shifting should be avoided and a joint effort should be made',
                                            'Direct conflicting parties towards finding/focusing on solutions',
                                            'Devise/Brainstorm possible ways of resolving the conflict',
                                            'Conflicting parties agree on criteria to evaluate the alternatives'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="3.7"
                                        question="Suggest ways in which businesses could deal with gender as a diversity issue in the workplace."
                                        type="textarea"
                                        correctAnswers={[
                                            'Males and females should be offered equal employment opportunities',
                                            'Business directors should promote both men and women in managerial positions',
                                            'Women should be employed to comply with the EEA',
                                            'Targets may be set for gender equity in the business',
                                            'New appointments should be based on skills and ability',
                                            'Introduce affirmative action by ensuring that male and female employees are remunerated fairly/equally'
                                        ]}
                                        marks={6}
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
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">BUSINESS VENTURES</h3>
                                <div>
                                    <ListQuestion
                                        id="4.1"
                                        question="Name any TWO types of compulsory insurance."
                                        numItems={2}
                                        correctAnswers={[
                                            'Compensation for Occupational Injuries and Diseases Fund/COIDA',
                                            'Unemployment Insurance Fund/UIF',
                                            'Road Accident Fund/RAF/Road Accident Benefit Scheme/RABS'
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <ListQuestion
                                        id="4.2"
                                        question="Outline the advantages of insurance for businesses."
                                        numItems={6}
                                        correctAnswers={[
                                            'Transfers the risk from businesses/insured to insurance companies/an insurer',
                                            'Transfer of risk is subject to the terms and conditions of the insurance contract',
                                            'Protects businesses against theft/loss of stock and/or damages caused by natural disasters such as floods/storm damage',
                                            'Businesses will be compensated for insurable losses, such as the destruction of property through fire',
                                            'Business\' assets such as vehicles/equipment/buildings need to be insured against damage and/or theft',
                                            'Businesses are protected against the loss of earnings, such as strikes by employees which may result in losses worth millions',
                                            'Protects businesses against dishonest employees',
                                            'Life insurance can be taken on the life of partners in a partnership to prevent unexpected loss of capital',
                                            'Should the services of key personnel be lost due to accidents/death, the proceeds of an insurance policy can be paid out to the business/beneficiaries',
                                            'Replacement costs for damaged machinery/equipment are very high therefore insurance can reduce/cover such costs',
                                            'Protects businesses against losses due to death of a debtor'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>

                                    <p className="font-medium text-[var(--text-primary)] mb-2">
                                        4.3 Read the scenario below and answer the questions that follow.
                                    </p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">ELANGE LIMITED (EL)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            The management of Elange Limited presented their future plans for expansion
                                            to the shareholders. They used PowerPoint, smart pens and flip charts to
                                            make their presentation interesting. Management also considered comments
                                            from the shareholders in order to improve their next presentation.
                                        </p>
                                    </div>
                                    <ListQuestion
                                        id="4.3.1"
                                        question="Name TWO visual aids used by EL in the scenario above."
                                        numItems={2}
                                        correctAnswers={[
                                            'PowerPoint',
                                            'Flip charts',
                                        ]}
                                        marks={2}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                    <Question
                                        id="4.3.2"
                                        question="Suggest the areas of improvement that the management should consider for their next presentation."
                                        type="textarea"
                                        correctAnswers={[
                                            'The presenter should revise objectives that were not achieved',
                                            'Use humour appropriately',
                                            'Always be prepared to update/keep the information relevant',
                                            'Reflect on any problem/criticism and avoid it in future presentations',
                                            'Reflect on the time/length of the presentation to add/remove content',
                                            'Reflect on the logical flow of the format/slides/application of visual aids',
                                            'Increase/Decrease the use of visual aids/replace or remove aids that do not work well',
                                            'Information that the presenter receives as feedback from a presentation should be analysed and where relevant incorporated/used to update/amend his/her presentation'
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <Question
                                        id="4.4"
                                        question="Explain how capital as a criterion can contribute to the success and/or failure of a private company."
                                        type="textarea"
                                        correctAnswers={[
                                            'Large amount of capital can be raised since there is no limit on the number of shareholders',
                                            'The company can access long term capital and therefore has good long term growth opportunities',
                                            'Even though shares are not freely transferable, large private companies can raise a considerable amount of capital',
                                            'It cannot grow into a very large business since it cannot invite the public to buy shares',
                                            'Restrictions on transferability of shares may not attract financially strong investors',
                                            'Large amount of capital cannot be obtained as capital contribution is only limited to private shareholders'
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
                                        question="State any FOUR problem-solving steps."
                                        numItems={4}
                                        correctAnswers={[
                                            'Identify the problem',
                                            'Define the problem',
                                            'Identify possible solutions/alternatives to the problem',
                                            'Evaluate alternative solutions',
                                            'Choose/Select the most appropriate alternative/solution.',
                                            'Develop an action plan',
                                            'Implement the suggested solution/action plan',
                                            'Monitor the implementation of the solution/action plan',
                                        ]}
                                        marks={4}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>
                                <div>
                                    <Question
                                        id="4.6"
                                        question="Explain ways in which businesses can contribute time and effort to improve the well-being of employees."
                                        type="textarea"
                                        correctAnswers={[
                                            'Pay fair wages/salaries to the workers based on the nature of their work/the prevailing economic conditions in the market',
                                            'Provide transport for employees who work unusually long hours',
                                            'Pay fair bonuses based on business earnings, as acknowledgement for hard work and commitment',
                                            'Provide employees with recreational facilities to socialise and strengthen work relations',
                                            'Offer annual physical/medical assessments to workers to promote health awareness',
                                            'Encourage employees to stay fit and healthy by getting them involved in health activities to minimize stress/substance abuse/obesity',
                                            'Offer financial assistance in the case of any hardship caused by unexpected medical costs',
                                            'Allow flexible working hours to enhance productivity',
                                            'Offer support programmes for employees infected and affected by HIV/Aids',
                                            'Make childcare facilities available on the premises for working mothers in the business',
                                            'Start a nutritional programme so that employees can enjoy one meal per day to keep them in a healthy condition',
                                            'Give time to the staff to get involved in projects they choose√ /Allow staff to use some of the working hours to participate in the projects of their choice',
                                            'Establish coaching and mentoring programmes for junior employees',
                                            'Conduct team-building sessions √ to improve employees\' morale'
                                        ]}
                                        marks={6}
                                        onAnswerChange={handleAnswerChange}
                                        answerStatus={answerStatus}
                                    />
                                </div>

                                <div>
                                    <p className="mb-4 text-[var(--text-secondary)]">4.7 Read the scenario below and answer the question that follows.</p>
                                    <div className="scenario">
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3 text-center">BARROWS TRADERS (BT)</h3>
                                        <p className="text-[var(--text-primary)] leading-relaxed">
                                            Barrows Traders sell bicycles to different outlets. They treat all employees
                                            with respect regardless of their socio-economic status. The management of
                                            BT encourages open communication channels between them and employees.
                                        </p>
                                    </div>
                                    <p className="mb-4 text-[var(--text-secondary)]">Identify TWO human rights that are promoted by BT. Motivate your answer by quoting from the scenario above.</p>
                                    <p className="mb-4 text-[var(--text-secondary)]">Use the table below as a GUIDE to answer QUESTION 4.7.</p>
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
                                                    correctAnswers={[
                                                        'Dignity',
                                                        'Freedom of speech and expression'
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
                                                        'They treat all employees with respect regardless of their socio-economic status',
                                                        'The management of BT encourages open communication channels between them and employees'
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
                                        id="4.8"
                                        question="Recommend ways in which professional, responsible, ethical and effective business practice should be conducted by businesses."
                                        type="textarea"
                                        correctAnswers={[
                                            'Mission statement should include the values of equality/respect',
                                            'Businesses should develop equity programmes/promotes strategies to ensure that all employees are treated equally regardless of status/rank/power',
                                            'Treat workers with respect/dignity by recognising work well done/the value of human capital',
                                            'Plan properly and put preventative measures in place',
                                            'Pay fair wages/salaries which are in line with the minimum requirements of the BCEA/Remunerate employees for working overtime/during public holidays',
                                            'Engage in environmental awareness programmes/Refrain from polluting the environment such as legally disposing of toxic waste',
                                            'Refrain from starting a venture using other businesses\' ideas that are protected by law',
                                            'Business decisions and actions must be clear/transparent to all stakeholders',
                                            'Businesses should be accountable/responsible for their decisions and actions/patent rights',
                                            'Hire honest/trustworthy accountants/financial officers with good credentials',
                                            'Regular/Timeous payment of taxes',
                                            'All workers should have access to equal opportunities/ positions/ resources',
                                            'Ensure that employees work in a work environment that is conducive to safety/fairness/free of embarrassment',
                                            'Employers and employees need to comply with legislation with regard to equal opportunities/human rights in the workplace',
                                            'Training/Information/Business policies should include issues such as diversity/discrimination/harassment'
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
                                        Investors can acquire shares of companies that are listed on the Johannesburg
                                        Securities Exchange (JSE). They consider various factors when making investment
                                        decisions to choose the best option. Businesses prefer investing in unit trusts and they
                                        also compare simple and compound interest offered by financial institutions.
                                    </p>
                                </div>
                                <Question
                                    id="5"
                                    question="Write an essay on investment securities in which you include the following aspects:
                                    -Outline the functions of the Johannesburg Securities Exchange (JSE).
                                    -Explain any FOUR factors that should be considered when making investment decisions.
                                    -Discuss the impact of unit trusts as a form of investment.
                                    -Advise businesses on the differences between simple interest and compound interest."
                                    type="textarea"
                                    correctAnswers={[
                                        'The JSE serves as a financial market that regulates the activities of trading of securities in an orderly manner',
                                        'Sound knowledge of the factors to be considered when making investment decisions enables the investors to receive better returns on investment',
                                        'Unit trusts are a popular form of investment as investors from lower income groups can afford the minimum contributions needed',
                                        'Investors need to do research on the returns on investment by comparing the differences between the simple interest and compound interest',
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
                                        'Refers to income from the investment, namely interest/dividends/increased capital growth on the original amount invested',
                                        'High/Low risk investments yield higher/lower returns',
                                        'The return should be expressed as net after-tax gains on the investment',
                                        'Generally, there will be a direct link between the risk and the return',
                                        'Returns can be in the form of capital gains where the asset appreciates in value over time',
                                        'Refers to the chance that the invested amount may be reduced in value/lost in total over a period of time, due to unforeseen circumstances',
                                        'Different risks are linked to different investment opportunities',
                                        'The higher/lower the potential return, the higher/lower the risk of a potential loss',
                                        'Investing in shares has a higher risk than investing in a fixed deposit',
                                        'Shares have low/medium risk over a longer investment period',
                                        'Shares with higher risks have a greater potential for higher returns',
                                        'Ordinary shares have the highest risk as the investor may lose the full/part of the investment when the company is dissolved/bankrupt/liquidated',
                                        'Preference shareholders\' risk is lower, as they have preferential claims on the assets of the liquidated company/may receive some compensation before ordinary shareholders',
                                        'Share prices are linked to factors which investors cannot always control, such as economic conditions/operational success of the company',
                                        'This refers to the duration of the investment which may influence the return on investment',
                                        'The investment period can be short/medium/long term depending on the nature of an investment option',
                                        'The investment period will depend on an investor\'s personal needs/goals',
                                        'The longer the investment period the higher the returns',
                                        'Refers to a general increase in the price of goods/services over a period of time, resulting in a decrease in the value of money',
                                        'Investors/People are affected by a high inflation rate, because their money/purchasing power decreases',
                                        'The return on investment should be higher than the inflation rate',
                                        'Inflation has a positive effect on some investments such as property/shares where the income will increase as inflation increases',
                                        'Interest earned on the original amount and not on the interest accrued',
                                        'The principal amount remains the same over the entire period of investment',
                                        'Yields less return on investment',
                                        'The interest is kept separate unless it is reinvested',
                                        'Interest earned on the original amount invested, as well as interest earned in previous period(s)',
                                        'The principal amount grows with the addition of interest to it',
                                        'Interest is calculated on the higher principal amount and again added to it',
                                        'Yields high return on investment',
                                        'JSE creates opportunities for the general public to participate in the economy of the country',
                                        'Choosing an investment opportunity should be informed by research findings gathered on various decision factors made',
                                        'Investing in unit trusts encourages small investors to invest in this form of investment due to its liquidity'
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
                                        Corporate social responsibility and corporate social investment allow businesses to be
                                        actively involved in the projects that are positively benefiting the community.
                                        Successful businesses strive to maintain the relationship between social responsibility
                                        and triple bottom line and to find ways to deal with unemployment as a socio-economic
                                        issue.
                                    </p>
                                </div>
                                <Question
                                    id="6"
                                    question="Write an essay on social responsibility and corporate social responsibility in which you include the following aspects:
                                - Outline the purpose of corporate social investment (CSI).
                                - Discuss the impact of corporate social responsibility (CSR) on communities.
                                - Explain the relationship between social responsibility and triple bottom line.
                                - Suggest ways in which businesses can deal with unemployment as a socio-economic issue"
                                    type="textarea"
                                    correctAnswers={[
                                        'CSI is when a business commits money, resources and time to a specific project that will improve the lives of people',
                                        'It is the responsibility of the business to ensure that the desired aims of corporate social responsibility (CSR) is filtered to the correct members of the community',
                                        'Triple bottom line expects businesses to commit to measuring their social and environmental impact in addition to financial performance',
                                        'CSI aims at contributing towards sustainable growth/development of its immediate communities/new non-profit organisations/charities',
                                        'CSI is enforceable by law and government requires business to make CSI contributions',
                                        'CSI projects play a positive role in the development of communities',
                                        'CSI reveals a business\'s attitude towards the community in which it operates',
                                        'CSI projects are long-term investment',
                                        'Community skills can be improved through the provision of bursaries',
                                        'Better educational facilities are established in poor communities',
                                        'The standard of living of the community is uplifted.  /Quality of life of communities is improved',
                                        'Investing in the medical infrastructure, will improve the health of communities',
                                        'Socio-economic issues are attended to/addressed which will improve the welfare of the community. Assists in solving socio-economic issues like poverty/unemployment',
                                        'Businesses are not always equipped to address social problems',
                                        'Communities tend to be dependent on CSR programmes and struggle to take their own initiatives',
                                        'Communities may not sustain infrastructure provided through CSR projects due to a lack of financial resources',
                                        'Distribution of scarce resources to selected beneficiaries in the community may cause problems such as discrimination',
                                        'Some businesses only participate in CSR initiatives to raise profit and do not really care for the community in which they operate',
                                        'Businesses cannot meet the longer-term needs of the society./Businesses cannot deliver sustainable CSR programmes',
                                        'The benefits of the programmes may not filter to the intended persons within the community',
                                        'Triple Bottom line means that businesses should not only focus on profit/charge high prices, but should also invest in CSI projects',
                                        'Businesses should not make a profit at the expense of its community',
                                        'Business operations should not exploit people/employees/customers which may have a negative impact/harm on the community',
                                        'Businesses should engage/invest in sustainable community programmes/projects that will benefit/uplift communities',
                                        'Improve the lifestyle/quality of life of their human resources/employees',
                                        'Businesses should not exhaust resources/harm the environment for production/profit purposes',
                                        'They may support energy-efficient/eco-friendly products/production methods',
                                        'Recycle/Re-use waste, such as packaging from recycled material',
                                        'Provide skills development programmes through learnerships.',
                                        'Offer bursaries to the community to improve the level of education',
                                        'Create jobs for members of the community',
                                        'Provide entrepreneurial programmes that can promote self-employment',
                                        'Support existing small businesses to create more employment opportunities',
                                        'Corporate social investment projects have a strong developmental approach and utilise company resources to benefit and uplift communities',
                                        'Businesses must also take the challenges and problems of CSR into consideration, before deciding how to be involved in the community',
                                        'Businesses that maintain a sound relationship between social responsibility and triple bottom line remain sustainable in the long run',
                                        'Businesses that are able to deal with unemployment become profitable as the communities can afford to pay for goods and services'
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

BusinessStudiesP2Nov2024.propTypes = {
    darkMode: PropTypes.bool,
    setDarkMode: PropTypes.func,
    notifications: PropTypes.array,
};

export default BusinessStudiesP2Nov2024;