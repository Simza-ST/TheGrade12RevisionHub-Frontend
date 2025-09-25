import React, { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '../../../../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const CatP2Nov2021 = ({paperId}) => {
    const navigate = useNavigate();
    /*const paperId = 'cat-p2-nov-2021';*/
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(null);
    const [correctness, setCorrectness] = useState({});
    const [revealedAnswers, setRevealedAnswers] = useState({});
    const [recording, setRecording] = useState(false);
    const [recordError, setRecordError] = useState(null);

    const correctAnswers = {
        'q1.1': 'B',
        'q1.2': 'A',
        'q1.3': 'C',
        'q1.4': 'D',
        'q1.5': 'B',
        'q1.6': 'A',
        'q1.7': 'B',
        'q1.8': 'B',
        'q1.9': 'A',
        'q1.10': 'D',
        'q2.1': 'J',
        'q2.2': 'K',
        'q2.3': 'N',
        'q2.4': 'A',
        'q2.5': 'G',
        'q2.6': 'B',
        'q2.7': 'T',
        'q2.8': 'H',
        'q2.9': 'C',
        'q2.10': 'D',
        'q3.1': 'False',
        'q3.2': 'True',
        'q3.3': 'False',
        'q3.4': 'False',
        'q3.5': 'True'
    };

    const marksB = {
        'q4.1': 1,
        'q4.2': 2,
        'q4.3.1': 3,
        'q4.3.2': 2,
        'q4.4': 2,
        'q4.5': 2,
        'q4.6': 2,
        'q4.7': 2,
        'q4.8': 1,
        'q4.9': 2,
        'q4.10': 2,
        'q4.11': 2,
        'q4.12': 2,
        'q5.1': 2,
        'q5.2': 2,
        'q5.3': 1,
        'q5.4': 2,
        'q5.5': 2,
        'q5.6': 2,
        'q5.7': 2,
        'q5.8': 2,
        'q6.1': 1,
        'q6.2': 2,
        'q6.3': 1,
        'q6.4': 2,
        'q6.5.1': 2,
        'q6.5.2': 2,
        'q7.1': 2,
        'q7.2': 2,
        'q7.3': 2,
        'q7.4': 2,
        'q7.5': 2,
        'q8.1': 3,
        'q8.2': 2,
        'q8.3': 2,
        'q8.4': 1,
        'q8.5': 2,
        'q8.6': 3,
        'q8.7': 1,
        'q8.8': 1
    };

    const marksC = {
        'q9.1.1': 1,
        'q9.1.2': 1,
        'q9.1.3': 2,
        'q9.1.4': 2,
        'q9.2.1': 2,
        'q9.2.2': 1,
        'q9.2.3': 2,
        'q9.3.1': 2,
        'q9.3.2': 1,
        'q9.4': 2,
        'q9.5.1': 2,
        'q9.5.2': 2,
        'q9.6.1': 1,
        'q9.6.2': 2,
        'q9.6.3': 1,
        'q9.6.4': 1,
        'q10.1.1': 3,
        'q10.1.2': 2,
        'q10.2.1': 1,
        'q10.2.2': 2,
        'q10.2.3': 1,
        'q10.3': 1,
        'q10.4.1': 2,
        'q10.4.2': 2,
        'q10.4.3': 1,
        'q10.5.1': 2,
        'q10.5.2': 1,
        'q10.6': 1,
        'q10.7.1': 1,
        'q10.7.2': 1,
        'q10.7.3': 2,
        'q10.8': 2
    };

    const keywordsB = {
        'q4.1': ['touch', 'screen'],
        'q4.2': ['user', 'computer'],
        'q4.3.1': ['raw', 'facts', 'name'],
        'q4.3.2': ['process', 'analysis'],
        'q4.4': ['slow', 'pop-up'],
        'q4.5': ['print', 'queue', 'buffer'],
        'q4.6': ['time', 'wear'],
        'q4.7': ['interaction', 'mouse'],
        'q4.8': ['display', 'settings'],
        'q4.9': ['cost', 'security'],
        'q4.10': ['distributed', 'cost-effective'],
        'q4.11': ['not secure', 'false positive'],
        'q4.12': ['ssd', 'cloud'],
        'q5.1': ['mobility', 'no cable'],
        'q5.2': ['mute', 'stable'],
        'q5.3': ['network', 'connection'],
        'q5.4': ['ai', 'iot'],
        'q5.5': ['access', 'backup'],
        'q5.6': ['coverage', 'interference'],
        'q5.7': ['short', 'low speed'],
        'q5.8': ['throttling', 'shaping'],
        'q6.1': ['summarize'],
        'q6.2': ['scope', 'relevance'],
        'q6.3': ['trend', 'line'],
        'q6.4': ['clear', 'anonymous'],
        'q6.5.1': ['verify', 'accuracy'],
        'q6.5.2': ['authority', 'currency'],
        'q7.1': ['connectivity'],
        'q7.2': ['phishing', 'ddos'],
        'q7.3': ['security', 'encryption'],
        'q7.4': ['monitor', 'updates'],
        'q7.5': ['ups', 'backup'],
        'q8.1': ['navigation', 'page number'],
        'q8.2': ['text', 'range'],
        'q8.3': ['input mask', 'default'],
        'q8.4': ['column', 'break'],
        'q8.5': ['less', 'greater'],
        'q8.6': ['an'],
        'q8.7': ['proportional'],
        'q8.8': ['totals']
    };

    const keywordsC = {
        'q9.1.1': ['power'],
        'q9.1.2': ['diagonal'],
        'q9.1.3': ['disk', 'compression'],
        'q9.1.4': ['speaker', 'webcam'],
        'q9.2.1': ['cat5', 'cheap'],
        'q9.2.2': ['peer'],
        'q9.2.3': ['speed', 'cost'],
        'q9.3.1': ['lock', 'alarm'],
        'q9.3.2': ['rfid'],
        'q9.4': ['biometric', 'cost'],
        'q9.5.1': ['simulated'],
        'q9.5.2': ['expensive', 'motion'],
        'q9.6.1': ['ergonomic'],
        'q9.6.2': ['social', 'email'],
        'q9.6.3': ['access'],
        'q9.6.4': ['mail merge'],
        'q10.1.1': ['dropdown', 'checkbox'],
        'q10.1.2': ['yes no'],
        'q10.2.1': ['google form'],
        'q10.2.2': ['easy', 'automatic'],
        'q10.2.3': ['conditional'],
        'q10.3': ['print part'],
        'q10.4.1': ['real time'],
        'q10.4.2': ['wireless', 'sd'],
        'q10.4.3': ['fiber'],
        'q10.5.1': ['download', 'upload'],
        'q10.5.2': ['mbps'],
        'q10.6': ['template'],
        'q10.7.1': ['caption'],
        'q10.7.2': ['rotate'],
        'q10.7.3': ['credit', 'byline'],
        'q10.8': ['date', 'camera']
    };

    const memos = {
        'q1.1': 'B Processing',
        'q1.2': 'A e-Filing',
        'q1.3': 'C zombie',
        'q1.4': 'D Link',
        'q1.5': 'B Provides cloud storage',
        'q1.6': 'A Adding more memory (RAM)',
        'q1.7': 'B Plagiarism',
        'q1.8': 'B A database report',
        'q1.9': 'A The cellphone number of a client',
        'q1.10': 'D cursor',
        'q2.1': 'J',
        'q2.2': 'K',
        'q2.3': 'N',
        'q2.4': 'A',
        'q2.5': 'G',
        'q2.6': 'B',
        'q2.7': 'T',
        'q2.8': 'H',
        'q2.9': 'C',
        'q2.10': 'D',
        'q3.1': 'False, HTTPS',
        'q3.2': 'True',
        'q3.3': 'False, shaping',
        'q3.4': 'False, minimise',
        'q3.5': 'True',
        'q4.1': 'Touchscreen',
        'q4.2': 'User - Computer',
        'q4.3.1': 'Raw facts, e.g. name',
        'q4.3.2': 'Processing, Analysis',
        'q4.4': 'Slow performance, pop-ups',
        'q4.5': 'Print queue, buffer',
        'q4.6': 'Time consuming, wear on drive',
        'q4.7': 'Interaction, mouse',
        'q4.8': 'Display settings',
        'q4.9': 'Cost, security',
        'q4.10': 'Distributed processing, cost-effective',
        'q4.11': 'Not 100% secure, false positives',
        'q4.12': 'SSD, cloud storage',
        'q5.1': 'Mobility, no cables',
        'q5.2': 'Mute when not speaking, stable connection',
        'q5.3': 'Network connection',
        'q5.4': 'AI, IoT',
        'q5.5': 'Accessibility, backup',
        'q5.6': 'Coverage, interference',
        'q5.7': 'Short range, low speed',
        'q5.8': 'Throttling, bandwidth limiting',
        'q6.1': 'Summarize findings',
        'q6.2': 'Scope, relevance',
        'q6.3': 'Trend line',
        'q6.4': 'Clear questions, anonymous',
        'q6.5.1': 'Verify accuracy',
        'q6.5.2': 'Authority, currency',
        'q7.1': 'Connectivity',
        'q7.2': 'Phishing, DDoS',
        'q7.3': 'Security, encryption',
        'q7.4': 'Monitor, updates',
        'q7.5': 'UPS, backup',
        'q8.1': 'Navigation, page number',
        'q8.2': 'Numbers as text, wrong range',
        'q8.3': 'Input mask, default value',
        'q8.4': 'Column break',
        'q8.5': 'Less than 0 or greater equal 5',
        'q8.6': 'Usernames like **an*',
        'q8.7': 'Proportional scaling',
        'q8.8': 'Calculate totals',
        'q9.1.1': 'Power user',
        'q9.1.2': 'Diagonal',
        'q9.1.3': 'Disk cleanup, compression',
        'q9.1.4': 'Speakers, webcam',
        'q9.2.1': 'CAT5e, cheap',
        'q9.2.2': 'Peer to peer',
        'q9.2.3': 'Speed, cost',
        'q9.3.1': 'Locks, alarms',
        'q9.3.2': 'RFID',
        'q9.4': 'Biometric, cost',
        'q9.5.1': 'Simulated environment',
        'q9.5.2': 'Expensive, motion sickness',
        'q9.6.1': 'Ergonomic',
        'q9.6.2': 'Social media, email',
        'q9.6.3': 'Access',
        'q9.6.4': 'Mail merge',
        'q10.1.1': 'Dropdowns, checkboxes',
        'q10.1.2': '4, yes/no',
        'q10.2.1': 'Google Forms',
        'q10.2.2': 'Easy, automatic',
        'q10.2.3': 'Conditional formatting',
        'q10.3': 'Print parts',
        'q10.4.1': 'Real time transmission',
        'q10.4.2': 'Wireless, SD card',
        'q10.4.3': 'Fiber',
        'q10.5.1': 'Download/upload',
        'q10.5.2': 'Mbps',
        'q10.6': 'Template',
        'q10.7.1': 'Caption',
        'q10.7.2': 'Rotate',
        'q10.7.3': 'Credit, byline',
        'q10.8': 'Date, camera type'
    };

    const handleChange = (id, value) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const recordPerformance = async (scoreData) => {
        setRecording(true);
        setRecordError(null);

        try {
            const authHeaders = getAuthHeaders();
            if (!authHeaders.Authorization) {
                throw new Error('No authentication token found');
            }

            console.log('Sending score data:', scoreData);
            console.log('Auth Headers:', authHeaders);

            const response = await fetch(`${API_BASE_URL}/user/record`, {
                method: 'POST',
                headers: {
                    ...authHeaders,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paperId: paperId,
                    score: scoreData.total,
                    maxScore: 150
                })
            });

            let errorMessage = 'Failed to record performance';

            if (!response.ok) {
                console.log('Response Status:', response.status);
                const errorText = await response.text();
                console.log('Response Text:', errorText);
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.message || errorMessage;
                } catch {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
            }

            const text = await response.text();
            let result = null;
            if (text) {
                try {
                    result = JSON.parse(text);
                } catch {
                    console.log('Response is not JSON:', text);
                }
            }
            console.log('Performance recorded:', result || 'success');

        } catch (err) {
            setRecordError(err.message);
            console.error('Recording error:', err);
        } finally {
            setRecording(false);
        }
    };

    const submitAnswers = () => {
        let scoreA = 0;
        let correctnessTemp = {};

        for (let key in correctAnswers) {
            const userAnswer = answers[key];
            if (userAnswer === correctAnswers[key]) {
                scoreA++;
            }
            correctnessTemp[key] = userAnswer === correctAnswers[key];
        }

        let scoreB = 0;
        for (let id in keywordsB) {
            const userAnswer = (answers[id] || '').trim().toLowerCase();
            let matched = 0;
            keywordsB[id].forEach(kw => {
                if (userAnswer.includes(kw.toLowerCase())) matched++;
            });
            scoreB += Math.min(matched, marksB[id]);
            correctnessTemp[id] = matched > 0;
        }

        let scoreC = 0;
        for (let id in keywordsC) {
            const userAnswer = (answers[id] || '').trim().toLowerCase();
            let matched = 0;
            keywordsC[id].forEach(kw => {
                if (userAnswer.includes(kw.toLowerCase())) matched++;
            });
            scoreC += Math.min(matched, marksC[id]);
            correctnessTemp[id] = matched > 0;
        }

        const total = scoreA + scoreB + scoreC;
        const percentage = Math.round((total / 150) * 100);

        setScore({ a: scoreA, b: scoreB, c: scoreC, total, percentage });
        setCorrectness(correctnessTemp);
        setShowResults(true);

        // Record performance
        const scoreData = { total, maxScore: 150 };
        recordPerformance(scoreData);
    };

    const handleRetry = () => {
        setAnswers({});
        setShowResults(false);
        setScore(null);
        setCorrectness({});
        setRevealedAnswers({});
        setRecordError(null);
    };

    const handleExit = () => {
        navigate('/digitized-question-papers');
    };

    const showAnswer = (questionId) => {
        setRevealedAnswers(prev => ({
            ...prev,
            [questionId]: memos[questionId] || "No memo available"
        }));
    };

    const renderRadioGroup = (questionId, options) => (
        <div className="options">
            {options.map(({ value, label }) => (
                <p key={value}>
                    <input
                        type="radio"
                        value={value}
                        checked={answers[questionId] === value}
                        onChange={() => handleChange(questionId, value)}
                        disabled={showResults}
                    /> {label}
                </p>
            ))}
        </div>
    );

    const renderSelect = (questionId, options) => (
        <select
            value={answers[questionId] || ''}
            onChange={(e) => handleChange(questionId, e.target.value)}
            disabled={showResults}
        >
            <option value="">Select</option>
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
    );

    const renderTextarea = (questionId, isWide = true) => {
        const value = answers[questionId] || '';
        const isCorrect = showResults && correctness[questionId];
        const isIncorrect = showResults && value && !correctness[questionId];

        return (
            <div className="input-container">
                <textarea
                    className={`${isWide ? 'wide-input' : ''} 
                        ${isCorrect ? 'correct' : ''} 
                        ${isIncorrect ? 'incorrect' : ''}`}
                    value={value}
                    onChange={(e) => handleChange(questionId, e.target.value)}
                    disabled={showResults}
                />
                {showResults && <span className="status">{correctness[questionId] ? 'Correct' : 'Incorrect'}</span>}
            </div>
        );
    };

    const renderFeedback = (questionId) => {
        if (!showResults) return null;

        return (
            <div>
                <p style={{ color: correctness[questionId] ? 'green' : 'red' }}>
                    Your answer: {answers[questionId] || 'None'} - {correctness[questionId] ? 'Correct' : 'Incorrect'}
                </p>
            </div>
        );
    };

    const renderAnswerSection = (questionId) => {
        if (!showResults) return null;

        const revealed = revealedAnswers[questionId];

        return (
            <div>
                <div className="solution-buttons">
                    <button
                        className="solution-button"
                        onClick={() => showAnswer(questionId)}
                    >
                        View Answer
                    </button>
                </div>
                {revealed && (
                    <div className="revealed-answer">
                        <strong>Correct Answer:</strong> <pre>{revealed}</pre>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="cat-exam">
            <h1>Computer Applications Technology P2 - November 2021</h1>
            <h2>Interactive Quiz</h2>
            <p>This interactive quiz allows you to answer the questions and check your answers immediately for Section A. For Sections B and C, you can read the questions and click to reveal the memo answers for self-checking.</p>

            <h2>SECTION A</h2>
            <h3>QUESTION 1: MULTIPLE-CHOICE QUESTIONS</h3>

            <div className="question" id="question-q1.1">
                <p><strong>1.1</strong> Which ONE of the following options allows for data to become useful information?</p>
                {renderRadioGroup('q1.1', [
                    { value: 'A', label: 'A Backup' },
                    { value: 'B', label: 'B Processing' },
                    { value: 'C', label: 'C Communication' },
                    { value: 'D', label: 'D Storage' }
                ])}
                {renderFeedback('q1.1')}
                {renderAnswerSection('q1.1')}
            </div>

            <div className="question" id="question-q1.2">
                <p><strong>1.2</strong> … is an online income tax return service provided by the South African government to its citizens.</p>
                {renderRadioGroup('q1.2', [
                    { value: 'A', label: 'A e-Filing' },
                    { value: 'B', label: 'B e-Learning' },
                    { value: 'C', label: 'C e-Portal' },
                    { value: 'D', label: 'D e-Government' }
                ])}
                {renderFeedback('q1.2')}
                {renderAnswerSection('q1.2')}
            </div>

            <div className="question" id="question-q1.3">
                <p><strong>1.3</strong> A computer connected to the internet that has been compromised by a hacker is known as a …</p>
                {renderRadioGroup('q1.3', [
                    { value: 'A', label: 'A server.' },
                    { value: 'B', label: 'B work station.' },
                    { value: 'C', label: 'C zombie.' },
                    { value: 'D', label: 'D firewall.' }
                ])}
                {renderFeedback('q1.3')}
                {renderAnswerSection('q1.3')}
            </div>

            <div className="question" id="question-q1.4">
                <p><strong>1.4</strong> Which ONE of the following words would return a result of 4 when used with the LEN function in a spreadsheet?</p>
                {renderRadioGroup('q1.4', [
                    { value: 'A', label: 'A Array' },
                    { value: 'B', label: 'B Text string' },
                    { value: 'C', label: 'C Number' },
                    { value: 'D', label: 'D Link' }
                ])}
                {renderFeedback('q1.4')}
                {renderAnswerSection('q1.4')}
            </div>

            <div className="question" id="question-q1.5">
                <p><strong>1.5</strong> Which ONE of the following options is NOT a function of the operating system?</p>
                {renderRadioGroup('q1.5', [
                    { value: 'A', label: 'A Manages computer hardware' },
                    { value: 'B', label: 'B Provides cloud storage' },
                    { value: 'C', label: 'C Provides the user interface' },
                    { value: 'D', label: 'D Manages the programs' }
                ])}
                {renderFeedback('q1.5')}
                {renderAnswerSection('q1.5')}
            </div>

            <div className="question" id="question-q1.6">
                <p><strong>1.6</strong> Which upgrade will most likely improve the performance of a PC?</p>
                {renderRadioGroup('q1.6', [
                    { value: 'A', label: 'A Adding more memory (RAM)' },
                    { value: 'B', label: 'B Increasing the refresh rate of the monitor' },
                    { value: 'C', label: 'C Adding a second hard drive' },
                    { value: 'D', label: 'D Installing a video capture card' }
                ])}
                {renderFeedback('q1.6')}
                {renderAnswerSection('q1.6')}
            </div>

            <div className="question" id="question-q1.7">
                <p><strong>1.7</strong> … refers to the use of resource material without acknowledgement.</p>
                {renderRadioGroup('q1.7', [
                    { value: 'A', label: 'A Data theft' },
                    { value: 'B', label: 'B Plagiarism' },
                    { value: 'C', label: 'C Identity theft' },
                    { value: 'D', label: 'D Data cloning' }
                ])}
                {renderFeedback('q1.7')}
                {renderAnswerSection('q1.7')}
            </div>

            <div className="question" id="question-q1.8">
                <p><strong>1.8</strong> Which ONE of the following should NOT be used as a data source?</p>
                {renderRadioGroup('q1.8', [
                    { value: 'A', label: 'A A spreadsheet worksheet' },
                    { value: 'B', label: 'B A database report' },
                    { value: 'C', label: 'C A word processing document' },
                    { value: 'D', label: 'D A Notepad++ text file' }
                ])}
                {renderFeedback('q1.8')}
                {renderAnswerSection('q1.8')}
            </div>

            <div className="question" id="question-q1.9">
                <p><strong>1.9</strong> For which ONE of the following fields in a database will you most likely use an input mask?</p>
                {renderRadioGroup('q1.9', [
                    { value: 'A', label: 'A The cellphone number of a client' },
                    { value: 'B', label: 'B The surname of a client' },
                    { value: 'C', label: 'C The number of items ordered by the client' },
                    { value: 'D', label: 'D The web address of a clients company' }
                ])}
                {renderFeedback('q1.9')}
                {renderAnswerSection('q1.9')}
                    </div>

                    <div className="question" id="question-q1.10">
                    <p><strong>1.10</strong> A blinking vertical bar that shows the position of the text being typed in a text editor is called a …</p>
                {renderRadioGroup('q1.10', [
                { value: 'A', label: 'A highlight.' },
                { value: 'B', label: 'B border.' },
                { value: 'C', label: 'C symbol.' },
                { value: 'D', label: 'D cursor.' }
                    ])}
                {renderFeedback('q1.10')}
                {renderAnswerSection('q1.10')}
            </div>

            <h3>QUESTION 2: MATCHING ITEMS</h3>
            <p>Choose a term/concept from COLUMN B that matches a description in COLUMN A. Write only the letter (A–T) next to the question numbers (2.1 to 2.10) in the ANSWER BOOK, e.g. 2.11 U.</p>
            <table border="1">
                <tr>
                    <th>COLUMN A</th>
                    <th>COLUMN B</th>
                </tr>
                <tr><td>2.1 Integration of two or more technologies into a single device</td>
                    <td>A switch B web page C broadband D fraud E AI F firewall G VPN H software I bandwidth J patch K cell spacing L blockchain M AR N copyright O digital footprint P website Q Bluetooth R service pack S cell padding T hub</td></tr>
                <tr><td>2.2 A collection of instructions that enables a computer to perform specific tasks</td><td></td></tr>
                <tr><td>2.3 Used to connect multiple devices within a LAN</td><td></td></tr>
                <tr><td>2.4 A preventative action to protect your work from piracy</td><td></td></tr>
                <tr><td>2.5 Used to encrypt and secure your internet traffic</td><td></td></tr>
                <tr><td>2.6 Machines that can perform tasks (autonomously) that would normally require human action</td><td></td></tr>
                <tr><td>2.7 Setting the space between the content of a cell and its border in an HTML table</td><td></td></tr>
                <tr><td>2.8 Used to fix a specific programming problem in software</td><td></td></tr>
                <tr><td>2.9 The electronic record of a person's online activity</td><td></td></tr>
                <tr><td>2.10 A single HTML file on the internet</td><td></td></tr>
            </table>

            <div className="question" id="question-q2.1">
                <p><strong>2.1</strong></p>
                {renderSelect('q2.1', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.1')}
                {renderAnswerSection('q2.1')}
            </div>

            <div className="question" id="question-q2.2">
                <p><strong>2.2</strong></p>
                {renderSelect('q2.2', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.2')}
                {renderAnswerSection('q2.2')}
            </div>

            <div className="question" id="question-q2.3">
                <p><strong>2.3</strong></p>
                {renderSelect('q2.3', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.3')}
                {renderAnswerSection('q2.3')}
            </div>

            <div className="question" id="question-q2.4">
                <p><strong>2.4</strong></p>
                {renderSelect('q2.4', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.4')}
                {renderAnswerSection('q2.4')}
            </div>

            <div className="question" id="question-q2.5">
                <p><strong>2.5</strong></p>
                {renderSelect('q2.5', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.5')}
                {renderAnswerSection('q2.5')}
            </div>

            <div className="question" id="question-q2.6">
                <p><strong>2.6</strong></p>
                {renderSelect('q2.6', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.6')}
                {renderAnswerSection('q2.6')}
            </div>

            <div className="question" id="question-q2.7">
                <p><strong>2.7</strong></p>
                {renderSelect('q2.7', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.7')}
                {renderAnswerSection('q2.7')}
            </div>

            <div className="question" id="question-q2.8">
                <p><strong>2.8</strong></p>
                {renderSelect('q2.8', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.8')}
                {renderAnswerSection('q2.8')}
            </div>

            <div className="question" id="question-q2.9">
                <p><strong>2.9</strong></p>
                {renderSelect('q2.9', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.9')}
                {renderAnswerSection('q2.9')}
            </div>

            <div className="question" id="question-q2.10">
                <p><strong>2.10</strong></p>
                {renderSelect('q2.10', ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'])}
                {renderFeedback('q2.10')}
                {renderAnswerSection('q2.10')}
            </div>

            <h3>QUESTION 3: TRUE/FALSE ITEMS</h3>

            <div className="question" id="question-q3.1">
                <p><strong>3.1</strong> HTTP is a secure protocol used for online banking.</p>
                {renderRadioGroup('q3.1', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.1')}
                {renderAnswerSection('q3.1')}
            </div>

            <div className="question" id="question-q3.2">
                <p><strong>3.2</strong> Blogs are used to have online discussions with a group of people.</p>
                {renderRadioGroup('q3.2', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.2')}
                {renderAnswerSection('q3.2')}
            </div>

            <div className="question" id="question-q3.3">
                <p><strong>3.3</strong> Throttling is the process of reducing the speed of certain types of internet traffic by the ISP.</p>
                {renderRadioGroup('q3.3', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.3')}
                {renderAnswerSection('q3.3')}
            </div>

            <div className="question" id="question-q3.4">
                <p><strong>3.4</strong> The maximise button is used to reduce the size of a window.</p>
                {renderRadioGroup('q3.4', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.4')}
                {renderAnswerSection('q3.4')}
            </div>

            <div className="question" id="question-q3.5">
                <p><strong>3.5</strong> A spreadsheet is a program used to perform calculations and create charts.</p>
                {renderRadioGroup('q3.5', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.5')}
                {renderAnswerSection('q3.5')}
            </div>

            <h2>SECTION B</h2>
            <h3>QUESTION 4: SYSTEMS TECHNOLOGIES</h3>
            <div className="question">
                <p><strong>4.1</strong> Give ONE example of a device that can be classified as both an input and output device.</p>
                {renderTextarea('q4.1')}
                {renderAnswerSection('q4.1')}
            </div>

            <div className="question">
                <p><strong>4.2</strong> Describe TWO ways in which communication in an information cycle takes place.</p>
                {renderTextarea('q4.2')}
                {renderAnswerSection('q4.2')}
            </div>

            <div className="question">
                <p><strong>4.3</strong> Data and information are crucial elements in an ICT system.</p>
                <p><strong>4.3.1</strong> Describe what is meant by data and give an example.</p>
                {renderTextarea('q4.3.1')}
                {renderAnswerSection('q4.3.1')}
            </div>

            <div className="question">
                <p><strong>4.3.2</strong> Describe TWO processes that will transform data into information.</p>
                {renderTextarea('q4.3.2')}
                {renderAnswerSection('q4.3.2')}
            </div>

            <div className="question">
                <p><strong>4.4</strong> Describe TWO ways how you could determine if your computer has been infected by malware.</p>
                {renderTextarea('q4.4')}
                {renderAnswerSection('q4.4')}
            </div>

            <div className="question">
                <p><strong>4.5</strong> State TWO ways in which spooling can be utilised in a network printer.</p>
                {renderTextarea('q4.5')}
                {renderAnswerSection('q4.5')}
            </div>

            <div className="question">
                <p><strong>4.6</strong> Give TWO disadvantages of frequently defragmenting a hard drive.</p>
                {renderTextarea('q4.6')}
                {renderAnswerSection('q4.6')}
            </div>

            <div className="question">
                <p><strong>4.7</strong> Briefly explain the purpose of a user interface (UI) and give an example of an input device commonly used with a user interface.</p>
                {renderTextarea('q4.7')}
                {renderAnswerSection('q4.7')}
            </div>

            <div className="question">
                <p><strong>4.8</strong> The new monitor you connected to your computing device displays a resolution error message. Where would you change the resolution to resolve/fix this error message?</p>
                {renderTextarea('q4.8')}
                {renderAnswerSection('q4.8')}
            </div>

            <div className="question">
                <p><strong>4.9</strong> Give TWO disadvantages of convergence.</p>
                {renderTextarea('q4.9')}
                {renderAnswerSection('q4.9')}
            </div>

            <div className="question">
                <p><strong>4.10</strong> Give TWO reasons why a company would choose to use grid computing.</p>
                {renderTextarea('q4.10')}
                {renderAnswerSection('q4.10')}
            </div>

            <div className="question">
                <p><strong>4.11</strong> State TWO limitations of firewalls.</p>
                {renderTextarea('q4.11')}
                {renderAnswerSection('q4.11')}
            </div>

            <div className="question">
                <p><strong>4.12</strong> Give TWO possible solutions to resolve restrictions (bottlenecks) in data flow that appear in local storage areas.</p>
                {renderTextarea('q4.12')}
                {renderAnswerSection('q4.12')}
            </div>

            <h3>QUESTION 5: INTERNET AND NETWORK TECHNOLOGIES</h3>
            <div className="question">
                <p><strong>5.1</strong> Give TWO reasons why you would choose a wireless network for a home or a small business.</p>
                {renderTextarea('q5.1')}
                {renderAnswerSection('q5.1')}
            </div>

            <div className="question">
                <p><strong>5.2</strong> State TWO good guidelines/hints for users using video conferencing.</p>
                {renderTextarea('q5.2')}
                {renderAnswerSection('q5.2')}
            </div>

            <div className="question">
                <p><strong>5.3</strong> What is the function of an NIC?</p>
                {renderTextarea('q5.3')}
                {renderAnswerSection('q5.3')}
            </div>

            <div className="question">
                <p><strong>5.4</strong> Name any TWO technologies that form part of the Fourth Industrial Revolution (4IR).</p>
                {renderTextarea('q5.4')}
                {renderAnswerSection('q5.4')}
            </div>

            <div className="question">
                <p><strong>5.5</strong> Give TWO advantages of cloud computing in terms of storage.</p>
                {renderTextarea('q5.5')}
                {renderAnswerSection('q5.5')}
            </div>

            <div className="question">
                <p><strong>5.6</strong> State TWO factors to consider when installing wireless access points in a network.</p>
                {renderTextarea('q5.6')}
                {renderAnswerSection('q5.6')}
            </div>

            <div className="question">
                <p><strong>5.7</strong> Give TWO disadvantages of using a PAN.</p>
                {renderTextarea('q5.7')}
                {renderAnswerSection('q5.7')}
            </div>

            <div className="question">
                <p><strong>5.8</strong> Analyse the picture below and give the term and description for the process.</p>
                {renderTextarea('q5.8')}
                {renderAnswerSection('q5.8')}
            </div>

            <h3>QUESTION 6: INFORMATION MANAGEMENT</h3>
            <div className="question">
                <p><strong>6.1</strong> What is the importance of report writing in the PAT?</p>
                {renderTextarea('q6.1')}
                {renderAnswerSection('q6.1')}
            </div>

            <div className="question">
                <p><strong>6.2</strong> Give TWO considerations when formulating a task definition.</p>
                {renderTextarea('q6.2')}
                {renderAnswerSection('q6.2')}
            </div>

            <div className="question">
                <p><strong>6.3</strong> A learner wants to show how the number of e-book readers have increased/ decreased over a period of time using a chart. What spreadsheet feature can be used to show this on the chart?</p>
                {renderTextarea('q6.3')}
                {renderAnswerSection('q6.3')}
            </div>

            <div className="question">
                <p><strong>6.4</strong> State TWO aspects to consider when planning a questionnaire.</p>
                {renderTextarea('q6.4')}
                {renderAnswerSection('q6.4')}
            </div>

            <div className="question">
                <p><strong>6.5</strong> Evaluation of the contents of a website is essential in research.</p>
                <p><strong>6.5.1</strong> Briefly explain why evaluation is essential.</p>
                {renderTextarea('q6.5.1')}
                {renderAnswerSection('q6.5.1')}
            </div>

            <div className="question">
                <p><strong>6.5.2</strong> State TWO criteria used for evaluating websites.</p>
                {renderTextarea('q6.5.2')}
                {renderAnswerSection('q6.5.2')}
            </div>

            <h3>QUESTION 7: SOCIAL IMPLICATIONS</h3>
            <div className="question">
                <p><strong>7.1</strong> Briefly describe the positive impact of ICT on the global community.</p>
                {renderTextarea('q7.1')}
                {renderAnswerSection('q7.1')}
            </div>

            <div className="question">
                <p><strong>7.2</strong> Name TWO common internet attacks, other than malware.</p>
                {renderTextarea('q7.2')}
                {renderAnswerSection('q7.2')}
            </div>

            <div className="question">
                <p><strong>7.3</strong> Briefly describe what data protection is AND give ONE method to protect data/information, excluding any physical methods.</p>
                {renderTextarea('q7.3')}
                {renderAnswerSection('q7.3')}
            </div>

            <div className="question">
                <p><strong>7.4</strong> What are the responsibilities of a network administrator to ensure network security?</p>
                {renderTextarea('q7.4')}
                {renderAnswerSection('q7.4')}
            </div>

            <div className="question">
                <p><strong>7.5</strong> State TWO ways how a company can prevent data loss when unscheduled power failures occur.</p>
                {renderTextarea('q7.5')}
                {renderAnswerSection('q7.5')}
            </div>

            <h3>QUESTION 8: SOLUTION DEVELOPMENT</h3>
            <div className="question">
                <p><strong>8.1</strong> Discuss TWO reasons why you would use page headers and page footers in a document AND give an example of the type of information that can be included in a header or a footer.</p>
                {renderTextarea('q8.1')}
                {renderAnswerSection('q8.1')}
            </div>

            <div className="question">
                <p><strong>8.2</strong> Your friend generated a spreadsheet for stationery items sold to a customer. However, the total for all the stationery items displays zero as an answer. Study the screenshot below and give TWO reasons why the function returns a zero.</p>
                {renderTextarea('q8.2')}
                {renderAnswerSection('q8.2')}
            </div>

            <div className="question">
                <p><strong>8.3</strong> Microsoft Access provides field property settings such as validation rules to improve the accuracy of data capturing. Name TWO other additional field properties that can be used.</p>
                {renderTextarea('q8.3')}
                {renderAnswerSection('q8.3')}
            </div>

            <div className="question">
                <p><strong>8.4</strong> Name a word processing feature which will force certain text to move to the beginning of the next column.</p>
                {renderTextarea('q8.4')}
                {renderAnswerSection('q8.4')}
            </div>

            <div className="question">
                <p><strong>8.5</strong> Briefly explain the criteria of the following validation rule: &lt;0 or &gt;=5 </p>
                {renderTextarea('q8.5')}
                {renderAnswerSection('q8.5')}
            </div>

            <div className="question">
                <p><strong>8.6</strong> The following criteria appears for the Username field in a database query: Like "??an*" Explain the output of this query.</p>
                {renderTextarea('q8.6')}
                {renderAnswerSection('q8.6')}
            </div>

            <div className="question">
                <p><strong>8.7</strong> Examine the piece of HTML code below, which is used to insert the image on the web page: {/*<img src = "School.jpg" width = "120" alt = "image of school">*/} What effect will the missing height attribute have on the image? </p>
                {renderTextarea('q8.7')}
                {renderAnswerSection('q8.7')}
            </div>

            <div className="question">
                <p><strong>8.8</strong> Give ONE reason why you would use the button in the image below in an Access database table.</p>
                {renderTextarea('q8.8')}
                {renderAnswerSection('q8.8')}
            </div>

            <h2>SECTION C</h2>
            <h3>QUESTION 9: INTEGRATED SCENARIO</h3>
            <div className="question">
                <p><strong>9.1</strong> The management needs to purchase PCs for the gaming room and are considering PCs with the specifications below.</p>
                <p><strong>9.1.1</strong> What kind of computer user will most likely use a computer with these specifications?</p>
                {renderTextarea('q9.1.1')}
                {renderAnswerSection('q9.1.1')}
            </div>

            <div className="question">
                <p><strong>9.1.2</strong> How is the size of monitors normally measured?</p>
                {renderTextarea('q9.1.2')}
                {renderAnswerSection('q9.1.2')}
            </div>

            <div className="question">
                <p><strong>9.1.3</strong> Name TWO types of utility software that can be used on this computer.</p>
                {renderTextarea('q9.1.3')}
                {renderAnswerSection('q9.1.3')}
            </div>

            <div className="question">
                <p><strong>9.1.4</strong> Suggest TWO additional hardware devices that can be bought for this computer.</p>
                {renderTextarea('q9.1.4')}
                {renderAnswerSection('q9.1.4')}
            </div>

            <div className="question">
                <p><strong>9.2</strong> A small network needs to be created with ten computers in the gaming room.</p>
                <p><strong>9.2.1</strong> What type of cabled media will most likely be used to connect the computers? Motivate your answer.</p>
                {renderTextarea('q9.2.1')}
                {renderAnswerSection('q9.2.1')}
            </div>

            <div className="question">
                <p><strong>9.2.2</strong> Give ONE reason why this network would NOT require a server.</p>
                {renderTextarea('q9.2.2')}
                {renderAnswerSection('q9.2.2')}
            </div>

            <div className="question">
                <p><strong>9.2.3</strong> A printer will be added for administration purposes. State TWO factors that should be considered when buying a printer.</p>
                {renderTextarea('q9.2.3')}
                {renderAnswerSection('q9.2.3')}
            </div>

            <div className="question">
                <p><strong>9.3</strong> The new computers must be secured and protected.</p>
                <p><strong>9.3.1</strong> Name TWO physical safeguards to protect the computers.</p>
                {renderTextarea('q9.3.1')}
                {renderAnswerSection('q9.3.1')}
            </div>

            <div className="question">
                <p><strong>9.3.2</strong> What technology can the management add to all devices/ equipment to ensure easy tracking/monitoring of devices/ equipment?</p>
                {renderTextarea('q9.3.2')}
                {renderAnswerSection('q9.3.2')}
            </div>

            <div className="question">
                <p><strong>9.4</strong> The secure storage area is protected by a lock which opens by scanning a fingerprint. Briefly explain what this type of security is called and give ONE disadvantage.</p>
                {renderTextarea('q9.4')}
                {renderAnswerSection('q9.4')}
            </div>

            <div className="question">
                <p><strong>9.5</strong> Virtual reality games are very popular among the community members.</p>
                <p><strong>9.5.1</strong> Briefly explain what virtual reality is.</p>
                {renderTextarea('q9.5.1')}
                {renderAnswerSection('q9.5.1')}
            </div>

            <div className="question">
                <p><strong>9.5.2</strong> Give TWO disadvantages or limitations of virtual reality.</p>
                {renderTextarea('q9.5.2')}
                {renderAnswerSection('q9.5.2')}
            </div>

            <div className="question">
                <p><strong>9.6</strong> The management of the community hall decided to host a gaming tournament.</p>
                <p><strong>9.6.1</strong> Special gaming chairs were bought for the tournament. Give ONE feature that a gaming chair should have.</p>
                {renderTextarea('q9.6.1')}
                {renderAnswerSection('q9.6.1')}
            </div>

            <div className="question">
                <p><strong>9.6.2</strong> Give TWO examples of how ICT can be used to advertise the tournament.</p>
                {renderTextarea('q9.6.2')}
                {renderAnswerSection('q9.6.2')}
            </div>

            <div className="question">
                <p><strong>9.6.3</strong> What Microsoft Office application is best suited to capture and store the individual entries for the tournament?</p>
                {renderTextarea('q9.6.3')}
                {renderAnswerSection('q9.6.3')}
            </div>

            <div className="question">
                <p><strong>9.6.4</strong> The management wants to send a standard letter to all tournament participants to thank them. What word processing feature can be used to quickly generate a personalised, standard thank-you letter for each participant?</p>
                {renderTextarea('q9.6.4')}
                {renderAnswerSection('q9.6.4')}
            </div>

            <h3>QUESTION 10: INTEGRATED SCENARIO</h3>
            <div className="question">
                <p><strong>10.1</strong> Study the entry form for registration below and answer the questions that follow:</p>
                <p>1. Team name _________________________ </p>
                <p>2. Car weight____________________________________ </p>
                <p>3. Number of drivers ______________________________ </p>
                <p>4. Do you have a disabled team member? Yes/No </p>
                <p>5. Grade  8 9 10 11 12 </p>
                <p><strong>10.1.1</strong> Suggest THREE ways in which the layout of this form can be improved for electronic use.</p>
                {renderTextarea('q10.1.1')}
                {renderAnswerSection('q10.1.1')}
            </div>

            <div className="question">
                <p><strong>10.1.2</strong> Write down ONE question in the form that can be improved by changing it to a closed-ended question. Describe how you would improve it.</p>
                {renderTextarea('q10.1.2')}
                {renderAnswerSection('q10.1.2')}
            </div>

            <div className="question">
                <p><strong>10.2</strong> Information from the electronic forms is sent to a spreadsheet.</p>
                <p><strong>10.2.1</strong> Name ONE online application that can be used to capture the entry form data.</p>
                {renderTextarea('q10.2.1')}
                {renderAnswerSection('q10.2.1')}
            </div>

            <div className="question">
                <p><strong>10.2.2</strong> Give TWO advantages of using online forms.</p>
                {renderTextarea('q10.2.2')}
                {renderAnswerSection('q10.2.2')}
            </div>

            <div className="question">
                <p><strong>10.2.3</strong> Name a spreadsheet feature that will allow you to highlight all racing cars that meet a certain criterion.</p>
                {renderTextarea('q10.2.3')}
                {renderAnswerSection('q10.2.3')}
            </div>

            <div className="question">
                <p><strong>10.3</strong> How can a 3D printer be used to create a distinguishing feature for each car?</p>
                {renderTextarea('q10.3')}
                {renderAnswerSection('q10.3')}
            </div>

            <div className="question">
                <p><strong>10.4</strong> During the event, the races will be streamed.</p>
                <p><strong>10.4.1</strong> Briefly explain what streaming is.</p>
                {renderTextarea('q10.4.1')}
                {renderAnswerSection('q10.4.1')}
            </div>

            <div className="question">
                <p><strong>10.4.2</strong> A camera fixed onto a drone will record the races. State TWO ways how data can be transferred from the drone camera to the computer for streaming.</p>
                {renderTextarea('q10.4.2')}
                {renderAnswerSection('q10.4.2')}
            </div>

            <div className="question">
                <p><strong>10.4.3</strong> The broadcasting computer must have a high-speed connection. Give an example of a high-speed connection.</p>
                {renderTextarea('q10.4.3')}
                {renderAnswerSection('q10.4.3')}
            </div>

            <div className="question">
                <p><strong>10.5</strong> Internet speed is usually indicated in the following format: 30/5 Mbps</p>
                <p><strong>10.5.1</strong> What does the numbers usually represent?</p>
                {renderTextarea('q10.5.1')}
                {renderAnswerSection('q10.5.1')}
            </div>

            <div className="question">
                <p><strong>10.5.2</strong> What unit of measurement is used for internet speed?</p>
                {renderTextarea('q10.5.2')}
                {renderAnswerSection('q10.5.2')}
            </div>

            <div className="question">
                <p><strong>10.6</strong> Certificates are created in a word processor using a standardised document. What is this standardised document called?</p>
                {renderTextarea('q10.6')}
                {renderAnswerSection('q10.6')}
            </div>

            <div className="question">
                <p><strong>10.7</strong> The racing car competition will be covered by the school newspaper.</p>
                <p><strong>10.7.1</strong> The school newspaper will be publishing photos of the event. What word processing feature will they use to include a visible description above/below the photos?</p>
                {renderTextarea('q10.7.1')}
                {renderAnswerSection('q10.7.1')}
            </div>

            <div className="question">
                <p><strong>10.7.2</strong> When pasting the table containing the results of the races, it does not fit across the width of the page of the word processing document. Suggest an appropriate action to resolve this problem.</p>
                {renderTextarea('q10.7.2')}
                {renderAnswerSection('q10.7.2')}
            </div>

            <div className="question">
                <p><strong>10.7.3</strong> Suggest TWO ways how the school newspaper can give recognition to community members who contributed photos and articles about the races.</p>
                {renderTextarea('q10.7.3')}
                {renderAnswerSection('q10.7.3')}
            </div>

            <div className="question">
                <p><strong>10.8</strong> According to the POPI Act, geographic information is regarded as private. Other than geographic metadata, give TWO examples of metadata that can be added to photos.</p>
                {renderTextarea('q10.8')}
                {renderAnswerSection('q10.8')}
            </div>

            <div className="submission-section">
                <button
                    className="submit-button"
                    onClick={submitAnswers}
                    disabled={showResults || recording}
                >
                    {recording ? 'Submitting...' : 'Submit Answers'}
                </button>

                {score && (
                    <div className="score-display">
                        <h3>Your Scores:</h3>
                        <p>Section A: {score.a} out of 25</p>
                        <p>Section B: {score.b} out of 75</p>
                        <p>Section C: {score.c} out of 50</p>
                        <p><strong>Total Score: {score.total} out of 150 ({score.percentage}%)</strong></p>
                        {score.percentage >= 50 ? (
                            <p className="pass">Excellent work! You've passed!</p>
                        ) : (
                            <p className="fail">Keep practicing! You'll improve!</p>
                        )}
                        {recordError && <p className="error">Error: {recordError}</p>}
                        <div className="action-buttons">
                            <button
                                className="retry-button"
                                onClick={handleRetry}
                            >
                                Retry Exam
                            </button>
                            <button
                                className="exit-button"
                                onClick={handleExit}
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .cat-exam {
                    font-family: 'Arial', sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }

                h1, h2, h3 {
                    color: #333;
                }

                .question {
                    margin-bottom: 20px;
                }

                .options {
                    margin-left: 20px;
                }

                textarea {
                    width: 100%;
                    height: 100px;
                    margin-bottom: 10px;
                    border-radius: 5px;
                    border: 2px solid #f5d792;
                    transition: border-color 0.3s;
                }

                .correct {
                    border-color: green;
                }

                .incorrect {
                    border-color: red;
                }

                .status {
                    display: block;
                    font-weight: bold;
                    margin-bottom: 20px;
                }

                .correct + .status {
                    color: green;
                }

                .incorrect + .status {
                    color: red;
                }

                .wide-input {
                    width: 100%;
                    max-width: 400px;
                }

                .solution-buttons {
                    display: flex;
                    gap: 10px;
                    margin-top: 8px;
                }

                .solution-button {
                    padding: 6px 12px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .solution-button:hover {
                    background-color: #2980b9;
                }

                .revealed-answer {
                    margin-top: 8px;
                    padding: 10px;
                    background-color: #e9f7ef;
                    border-left: 4px solid #28a745;
                    border-radius: 4px;
                    font-size: 14px;
                    white-space: pre-wrap;
                }

                .submit-button {
                    background-color: #2196F3;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin: 20px 0;
                    display: block;
                    width: 200px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .submit-button:hover:not(:disabled) {
                    background-color: #0b7dda;
                }

                .submit-button:disabled {
                    background-color: #bbbbbb;
                    cursor: not-allowed;
                }

                .score-display {
                    margin-top: 20px;
                    padding: 20px;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    text-align: center;
                }

                .score-display h3 {
                    margin: 0 0 10px 0;
                    font-size: 24px;
                    color: #333;
                }

                .pass {
                    color: #4CAF50;
                    font-weight: bold;
                    margin-top: 10px;
                }

                .fail {
                    color: #f44336;
                    font-weight: bold;
                    margin-top: 10px;
                }

                .error {
                    color: #f44336;
                    margin-top: 10px;
                    font-weight: bold;
                }

                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                }

                .retry-button, .exit-button {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: bold;
                }

                .retry-button {
                    background-color: #4CAF50;
                    color: white;
                }

                .retry-button:hover {
                    background-color: #3e8e41;
                }

                .exit-button {
                    background-color: #f44336;
                    color: white;
                }

                .exit-button:hover {
                    background-color: #d32f2f;
                }

                table {
                    border-collapse: collapse;
                    width: 100%;
                    margin-bottom: 20px;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }

                th {
                    background-color: #f2f2f2;
                }
            `}</style>
        </div>
);
};

export default CatP2Nov2021;