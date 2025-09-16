import React, { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '../../../../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const CatP2Nov2024 = ({paperId}) => {
    const navigate = useNavigate();
   /* const paperId = 'cat-p2-nov-2024';*/
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(null);
    const [correctness, setCorrectness] = useState({});
    const [revealedAnswers, setRevealedAnswers] = useState({});
    const [recording, setRecording] = useState(false);
    const [recordError, setRecordError] = useState(null);

    const correctAnswers = {
        'q1.1': 'C',
        'q1.2': 'C',
        'q1.3': 'D',
        'q1.4': 'A',
        'q1.5': 'B',
        'q1.6': 'C',
        'q1.7': 'A',
        'q1.8': 'D',
        'q1.9': 'D',
        'q1.10': 'D',
        'q2.1': 'R',
        'q2.2': 'E',
        'q2.3': 'P',
        'q2.4': 'C',
        'q2.5': 'K',
        'q2.6': 'T',
        'q2.7': 'N',
        'q2.8': 'H',
        'q2.9': 'A',
        'q2.10': 'O',
        'q3.1': 'True',
        'q3.2': 'False',
        'q3.3': 'False',
        'q3.4': 'True',
        'q3.5': 'True'
    };

    const marksB = {
        'q4.1.1': 2,
        'q4.2': 2,
        'q4.3': 2,
        'q4.4': 3,
        'q4.5': 2,
        'q4.6': 2,
        'q4.7.1': 2,
        'q4.7.2': 1,
        'q4.8': 2,
        'q4.9.1': 1,
        'q4.9.2': 2,
        'q4.10': 2,
        'q4.11': 2,
        'q5.1': 1,
        'q5.2': 2,
        'q5.3': 1,
        'q5.4': 2,
        'q5.5': 2,
        'q5.6': 2,
        'q5.7': 2,
        'q5.8.1': 1,
        'q5.8.2': 2,
        'q6.1': 2,
        'q6.2': 1,
        'q6.3': 2,
        'q6.4': 1,
        'q6.5.1': 1,
        'q6.5.2': 1,
        'q6.6': 2,
        'q7.1.1': 1,
        'q7.1.2': 2,
        'q7.2': 1,
        'q7.3.1': 1,
        'q7.3.2': 1,
        'q7.4.1': 1,
        'q7.4.2': 2,
        'q8.1': 1,
        'q8.2.1': 2,
        'q8.2.2': 1,
        'q8.3.1': 1,
        'q8.3.2': 2,
        'q8.4': 2,
        'q8.5.1': 1,
        'q8.5.2': 2,
        'q8.6': 3
    };

    const marksC = {
        'q9.1': 2,
        'q9.2.1': 1,
        'q9.2.2': 2,
        'q9.2.3': 2,
        'q9.3.1': 2,
        'q9.3.2': 1,
        'q9.3.3': 2,
        'q9.4.1': 1,
        'q9.4.2': 1,
        'q9.4.3': 2,
        'q9.5': 2,
        'q9.6.1': 2,
        'q9.6.2': 1,
        'q9.6.3': 1,
        'q9.7.1': 2,
        'q9.7.2': 2,
        'q10.1.1': 1,
        'q10.1.2': 2,
        'q10.2.1': 1,
        'q10.2.2': 1,
        'q10.3.1': 1,
        'q10.3.2': 1,
        'q10.4.1': 2,
        'q10.4.2': 2,
        'q10.5.1': 1,
        'q10.5.2': 2,
        'q10.5.3': 1,
        'q10.6': 1,
        'q10.7.1': 1,
        'q10.7.2': 2,
        'q10.8.1': 1,
        'q10.8.2': 2,
        'q10.8.3': 1
    };

    const keywordsB = {
        'q4.1.1': ['wireless', 'battery', 'interference'],
        'q4.2': ['biometric', 'fingerprint', 'iris', 'retina', 'face'],
        'q4.3': ['power', 'supply', 'backup', 'continuous'],
        'q4.4': ['cpu', 'ram', 'storage', 'ssd', 'hdd'],
        'q4.5': ['cable', 'connection', 'faulty', 'port'],
        'q4.6': ['subtitles', 'caption', 'visual', 'notification'],
        'q4.7.1': ['single-user', 'multi-user', 'multiple'],
        'q4.7.2': ['server', 'network', 'gaming'],
        'q4.8': ['wallpaper', 'theme', 'font', 'icon'],
        'q4.9.1': ['patch', 'update'],
        'q4.9.2': ['vulnerability', 'crash', 'data', 'loss'],
        'q4.10': ['hidden', 'visibility', 'read-only', 'modification'],
        'q4.11': ['defragment', 'optimize', 'reorganize', 'performance'],
        'q5.1': ['fibre', 'optic'],
        'q5.2': ['device', 'connect', 'network'],
        'q5.3': ['encryption', 'firewall'],
        'q5.4': ['small', 'cost', 'infection'],
        'q5.5': ['integration', 'ai', 'iot', 'biological'],
        'q5.6': ['tab', 'multiple', 'navigation'],
        'q5.7': ['congestion', 'signal'],
        'q5.8.1': ['vague', 'topic'],
        'q5.8.2': ['priority', 'urgent', 'flag', 'follow-up'],
        'q6.1': ['graph', 'report', 'presentation'],
        'q6.2': ['historical', 'fact'],
        'q6.3': ['closed', 'short'],
        'q6.4': ['query', 'relationship'],
        'q6.5.1': ['caption'],
        'q6.5.2': ['author', 'source'],
        'q6.6': ['average', 'participants'],
        'q7.1.1': ['malicious', 'software'],
        'q7.1.2': ['slow', 'corrupt'],
        'q7.2': ['confidential', 'trusting'],
        'q7.3.1': ['environment', 'impact'],
        'q7.3.2': ['power-saving', 'unplug'],
        'q7.4.1': ['phishing', 'click-jacking'],
        'q7.4.2': ['verify', 'antivirus'],
        'q8.1': ['styles'],
        'q8.2.1': ['ruler', 'dialog'],
        'q8.2.2': ['align', 'readability'],
        'q8.3.1': ['numbering', 'list'],
        'q8.3.2': ['indent', 'enter'],
        'q8.4': ['th', 'td'],
        'q8.5.1': ['ole', 'object'],
        'q8.5.2': ['text', 'memo'],
        'q8.6': ['left', 'find', 'len']
    };

    const keywordsC = {
        'q9.1': ['cost', 'distribution'],
        'q9.2.1': ['aup'],
        'q9.2.2': ['hardware', 'connect', 'network'],
        'q9.2.3': ['bandwidth', 'usage'],
        'q9.3.1': ['technical', 'interaction'],
        'q9.3.2': ['test', 'equipment'],
        'q9.3.3': ['detail', 'follow-up'],
        'q9.4.1': ['megapixel'],
        'q9.4.2': ['editable', 'text'],
        'q9.4.3': ['damage', 'fragile'],
        'q9.5': ['access', 'backup'],
        'q9.6.1': ['desktop', 'publishing', 'image', 'editing'],
        'q9.6.2': ['wrap', 'text'],
        'q9.6.3': ['a', 'href'],
        'q9.7.1': ['tap', 'contactless'],
        'q9.7.2': ['credit', 'banking'],
        'q10.1.1': ['processed', 'data'],
        'q10.1.2': ['fast', 'storage'],
        'q10.2.1': ['social', 'media'],
        'q10.2.2': ['link', 'website'],
        'q10.3.1': ['crowdfunding'],
        'q10.3.2': ['gofundme'],
        'q10.4.1': ['sensor', 'lens'],
        'q10.4.2': ['fast', 'battery'],
        'q10.5.1': ['wlan'],
        'q10.5.2': ['track', 'time'],
        'q10.5.3': ['radio', 'wave'],
        'q10.6': ['autonomous', 'vehicle'],
        'q10.7.1': ['design', 'comfort'],
        'q10.7.2': ['break', 'posture'],
        'q10.8.1': ['highlight', 'conditional'],
        'q10.8.2': ['concatenate', 'randbetween'],
        'q10.8.3': ['export']
    };

    const memos = {
        'q1.1': 'C Touchpad',
        'q1.2': 'C increasing access to ICT devices for all people.',
        'q1.3': 'D Power user',
        'q1.4': 'A Bookmarks',
        'q1.5': 'B Compression',
        'q1.6': 'C acknowledge the original author.',
        'q1.7': 'A To enable resource sharing',
        'q1.8': 'D Web browser',
        'q1.9': 'D Drop Cap',
        'q1.10': 'D Inkjet printers',
        'q2.1': 'R convergence',
        'q2.2': 'E watermark',
        'q2.3': 'P default value',
        'q2.4': 'C objectivity',
        'q2.5': 'K GB',
        'q2.6': 'T geotagging',
        'q2.7': 'N plug-and-play',
        'q2.8': 'H digital footprint',
        'q2.9': 'A #Value!',
        'q2.10': 'O drivers',
        'q3.1': 'True',
        'q3.2': 'False, Braille',
        'q3.3': 'False, Secondary',
        'q3.4': 'True',
        'q3.5': 'True',
        'q4.1.1': 'Can easily be lost/stolen',
        'q4.1.2': 'Batteries should be replaced often',
        'q4.2': 'Biometric security is using unique biological features to access devices/systems',
        'q4.3': 'A UPS provides temporary power during outages, unlike a permanent power supply which is continuous.',
        'q4.4': 'Processor (CPU)',
        'q4.5': '1. Cable/signal not connected properly; 2. Faulty cable/port',
        'q4.6': '1. Captions/subtitles for spoken dialog; 2. Visual (flashing) notifications for sounds',
        'q4.7.1': 'A single-user system is limited to only one active user, multi-user system allows more than one user at the same time',
        'q4.7.2': 'Online gaming',
        'q4.8': '1. Adjust screen resolution; 2. Change background',
        'q4.9.1': 'Install a patch',
        'q4.9.2': '1. Security vulnerabilities; 2. Data loss or corruption',
        'q4.10': 'Hidden: The user cannot see the file; Read-only: The user can see the file, but cannot change the file',
        'q4.11': 'To reorganise fragmented/scattered data on a computer’s hard disk to improve performance and efficiency',
        'q5.1': 'Fibre optic cable',
        'q5.2': 'A device that allows wireless devices to connect to a network',
        'q5.3': 'Firewalls',
        'q5.4': '1. Company too small to justify cost of Intranet; 2. Staff can bring in unauthorised devices and infect the intranet with malware',
        'q5.5': 'Integration of technologies in the physical, digital, biological world',
        'q5.6': '1. Efficient use of screen space; 2. Faster navigation',
        'q5.7': '1. File size/Multiple files open; 2. Bandwidth size',
        'q5.8.1': 'The subject line does not indicate the topic of the e-mail',
        'q5.8.2': 'High priority: These emails are marked as important by the sender; Flagging: Flagging is a way for you to organise/categorise',
        'q6.1': '1. Write a report; 2. Create a presentation',
        'q6.2': 'Factual information that won’t change',
        'q6.3': '1. Use mostly closed questions; 2. Keep questions short',
        'q6.4': 'Perform (complex) queries',
        'q6.5.1': 'Bibliography',
        'q6.5.2': 'Include the image creator/author/photographer name',
        'q6.6': '1. The average age for participants of the bike race is 32; 2. More runners than bikers',
        'q7.1.1': 'Malicious software that replicates and harms systems.',
        'q7.1.2': '1. Slows down processing. 2. Corrupts files.',
        'q7.2': 'Social engineering',
        'q7.3.1': 'Practices to reduce environmental impact of computing.',
        'q7.3.2': 'Power-saving mode',
        'q7.4.1': 'Phishing',
        'q7.4.2': '1. Verify website legitimacy. 2. Use antivirus software.',
        'q8.1': 'Styles',
        'q8.2.1': '1. Ruler; 2. Tab dialog box',
        'q8.2.2': 'To guide the eye across gaps in text.',
        'q8.3.1': 'Bullets and numbering',
        'q8.3.2': 'It’s not indented; use the numbering feature to include it.',
        'q8.4': '<th> for headers; <td> for data.',
        'q8.5.1': 'To store multimedia files like images.',
        'q8.5.2': '1. Text. 2. Memo.',
        'q8.6': '1. LEFT; 2. LEN; 3. FIND',
        'q9.1': '1. Cost-effective. 2. Easier distribution.',
        'q9.2.1': 'Acceptable use policy',
        'q9.2.2': 'Hardware that connects a device to a network.',
        'q9.2.3': 'High bandwidth usage by multiple users.',
        'q9.3.1': '1. Technical issues. 2. Lack of personal interaction.',
        'q9.3.2': 'Test equipment beforehand.',
        'q9.3.3': 'Allows for detailed responses and follow-up questions.',
        'q9.4.1': 'Megapixels',
        'q9.4.2': 'To convert scanned text into editable format.',
        'q9.4.3': 'Risk of damage due to fragility.',
        'q9.5': '1. Accessibility from anywhere. 2. Backup protection.',
        'q9.6.1': '1. Desktop publishing. 2. Image editing.',
        'q9.6.2': 'Text wrapping',
        'q9.6.3': '<a> tag with href attribute',
        'q9.7.1': 'Using a device to tap an NFC reader for contactless payment.',
        'q9.7.2': '1. Credit card. 2. Online banking.',
        'q10.1.1': 'Processed data that provides meaning.',
        'q10.1.2': '1. Faster data collection. 2. Easier storage.',
        'q10.2.1': 'Social media',
        'q10.2.2': 'Redirects to a website with event details.',
        'q10.3.1': 'Crowdfunding',
        'q10.3.2': 'GoFundMe',
        'q10.4.1': '1. Sensor size. 2. Lens quality.',
        'q10.4.2': '1. Faster transfer. 2. No battery drain on camera.',
        'q10.5.1': 'Wireless network',
        'q10.5.2': '1. Track participant progress. 2. Accurate timing.',
        'q10.5.3': 'Radio waves',
        'q10.6': 'A vehicle that operates without human intervention.',
        'q10.7.1': 'Designing equipment for user comfort and efficiency.',
        'q10.7.2': '1. Take regular breaks. 2. Adjust monitor height.',
        'q10.8.1': 'Highlight participants over a certain age.',
        'q10.8.2': '1. CONCATENATE 2. RAND',
        'q10.8.3': 'Export'
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
            const mark = marksB[id] || 0; // Prevent NaN by defaulting to 0 if undefined
            scoreB += Math.min(matched, mark);
            correctnessTemp[id] = matched > 0;
        }

        let scoreC = 0;
        for (let id in keywordsC) {
            const userAnswer = (answers[id] || '').trim().toLowerCase();
            let matched = 0;
            keywordsC[id].forEach(kw => {
                if (userAnswer.includes(kw.toLowerCase())) matched++;
            });
            const mark = marksC[id] || 0; // Prevent NaN by defaulting to 0 if undefined
            scoreC += Math.min(matched, mark);
            correctnessTemp[id] = matched > 0;
        }

        let total = scoreA + scoreB + scoreC;
        if (isNaN(total)) {
            total = 0;
        }
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
            <h1>Computer Applications Technology P2 - November 2024</h1>
            <h2>Interactive Quiz</h2>
            <p>This interactive quiz allows you to answer the questions and check your answers immediately for Section A. For Sections B and C, you can read the questions and click to reveal the memo answers for self-checking.</p>

            <h2>SECTION A</h2>
            <h3>QUESTION 1: MULTIPLE-CHOICE QUESTIONS</h3>

            <div className="question" id="question-q1.1">
                <p><strong>1.1</strong> A pointing device that allows for gestures like pinch-to-zoom and two-finger scrolling:</p>
                {renderRadioGroup('q1.1', [
                    { value: 'A', label: 'A Trackball' },
                    { value: 'B', label: 'B Stylus' },
                    { value: 'C', label: 'C Touchpad' },
                    { value: 'D', label: 'D Mouse' }
                ])}
                {renderFeedback('q1.1')}
                {renderAnswerSection('q1.1')}
            </div>

            <div className="question" id="question-q1.2">
                <p><strong>1.2</strong> The digital divide can be reduced by ...</p>
                {renderRadioGroup('q1.2', [
                    { value: 'A', label: 'A limiting the amount of information on the internet.' },
                    { value: 'B', label: 'B using environmentally friendly computing devices.' },
                    { value: 'C', label: 'C increasing access to ICT devices for all people.' },
                    { value: 'D', label: 'D increasing the use of online and offline resources.' }
                ])}
                {renderFeedback('q1.2')}
                {renderAnswerSection('q1.2')}
            </div>

            <div className="question" id="question-q1.3">
                <p><strong>1.3</strong> A user who typically uses specialised software that requires high resolution graphics:</p>
                {renderRadioGroup('q1.3', [
                    { value: 'A', label: 'A Home user' },
                    { value: 'B', label: 'B SOHO user' },
                    { value: 'C', label: 'C Mobile user' },
                    { value: 'D', label: 'D Power user' }
                ])}
                {renderFeedback('q1.3')}
                {renderAnswerSection('q1.3')}
            </div>

            <div className="question" id="question-q1.4">
                <p><strong>1.4</strong> Which web browser feature is used for storing frequently visited websites?</p>
                {renderRadioGroup('q1.4', [
                    { value: 'A', label: 'A Bookmarks' },
                    { value: 'B', label: 'B Favourites' },
                    { value: 'C', label: 'C Caching' },
                    { value: 'D', label: 'D Add-on/Plug-in' }
                ])}
                {renderFeedback('q1.4')}
                {renderAnswerSection('q1.4')}
            </div>

            <div className="question" id="question-q1.5">
                <p><strong>1.5</strong> ... reduces the size of data files by encoding information more efficiently.</p>
                {renderRadioGroup('q1.5', [
                    { value: 'A', label: 'A Decryption' },
                    { value: 'B', label: 'B Compression' },
                    { value: 'C', label: 'C Optimisation' },
                    { value: 'D', label: 'D Extraction' }
                ])}
                {renderFeedback('q1.5')}
                {renderAnswerSection('q1.5')}
            </div>

            <div className="question" id="question-q1.6">
                <p><strong>1.6</strong> Citing of sources in academic work is used to ...</p>
                {renderRadioGroup('q1.6', [
                    { value: 'A', label: 'A show the author’s knowledge.' },
                    { value: 'B', label: 'B identify the website address.' },
                    { value: 'C', label: 'C acknowledge the original author.' },
                    { value: 'D', label: 'D indicate new sources of information.' }
                ])}
                {renderFeedback('q1.6')}
                {renderAnswerSection('q1.6')}
            </div>

            <div className="question" id="question-q1.7">
                <p><strong>1.7</strong> Company X installed a network to specifically save costs. What will be their primary motivation for using the network?</p>
                {renderRadioGroup('q1.7', [
                    { value: 'A', label: 'A To enable resource sharing' },
                    { value: 'B', label: 'B To organise storage capacity' },
                    { value: 'C', label: 'C To manage data security' },
                    { value: 'D', label: 'D To simplify hardware setup' }
                ])}
                {renderFeedback('q1.7')}
                {renderAnswerSection('q1.7')}
            </div>

            <div className="question" id="question-q1.8">
                <p><strong>1.8</strong> Software used to view the results of HTML pages:</p>
                {renderRadioGroup('q1.8', [
                    { value: 'A', label: 'A E-mail software' },
                    { value: 'B', label: 'B Word processing' },
                    { value: 'C', label: 'C Text file editor' },
                    { value: 'D', label: 'D Web browser' }
                ])}
                {renderFeedback('q1.8')}
                {renderAnswerSection('q1.8')}
            </div>

            <div className="question" id="question-q1.9">
                <p><strong>1.9</strong> ... is a decorative letter that often takes up two or more lines of text, usually in a first paragraph or section of a document.</p>
                {renderRadioGroup('q1.9', [
                    { value: 'A', label: 'A Font size' },
                    { value: 'B', label: 'B WordArt' },
                    { value: 'C', label: 'C Styles' },
                    { value: 'D', label: 'D Drop Cap' }
                ])}
                {renderFeedback('q1.9')}
                {renderAnswerSection('q1.9')}
            </div>

            <div className="question" id="question-q1.10">
                <p><strong>1.10</strong> ... uses tiny droplets of ink onto paper to create images or text.</p>
                {renderRadioGroup('q1.10', [
                    { value: 'A', label: 'A Laser printers' },
                    { value: 'B', label: 'B 3D printers' },
                    { value: 'C', label: 'C Braille printers' },
                    { value: 'D', label: 'D Inkjet printers' }
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
                    <td>A #Value!<br/>B utility<br/>C objectivity<br/>D required field<br/>E watermark<br/>F GHz<br/>G location sharing<br/>H  digital footprint<br/>I configuration<br/>J multipurpose<br/>K GB<br/>L #Name!<br/>M WordArt<br/>N plug-and-play<br/>O drivers<br/>P default value<br/>Q accuracy<br/>R convergence<br/>S history<br/>T geotagging</td></tr>
                <tr><td>2.2 A feature that creates a transparent image or text in the background of a document</td><td></td></tr>
                <tr><td>2.3 A property in a database that automatically displays a value in a field when a new record is entered</td><td></td></tr>
                <tr><td>2.4 The ability to present information and ideas in an unbiased manner</td><td></td></tr>
                <tr><td>2.5 The unit of measurement used for storage capacity</td><td></td></tr>
                <tr><td>2.6 Coordinates inserted based on the location of a device</td><td></td></tr>
                <tr><td>2.7 The setup of devices without the need for user intervention</td><td></td></tr>
                <tr><td>2.8 A trail of data that a user leaves behind while using the internet</td><td></td></tr>
                <tr><td>2.9 Displays when a function refers to a cell with data that cannot be used in that function</td><td></td></tr>
                <tr><td>2.10 Software that allows the operating system to communicate with hardware</td><td></td></tr>
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
                <p><strong>3.1</strong> The CPU is responsible for processing instructions.</p>
                {renderRadioGroup('q3.1', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.1')}
                {renderAnswerSection('q3.1')}
            </div>

            <div className="question" id="question-q3.2">
                <p><strong>3.2</strong> The Large-key keyboard is a device that would help blind users to enter data.</p>
                {renderRadioGroup('q3.2', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.2')}
                {renderAnswerSection('q3.2')}
            </div>

            <div className="question" id="question-q3.3">
                <p><strong>3.3</strong> Primary memory is used for storing all programs and data permanently.</p>
                {renderRadioGroup('q3.3', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.3')}
                {renderAnswerSection('q3.3')}
            </div>

            <div className="question" id="question-q3.4">
                <p><strong>3.4</strong> Virtual reality (VR) refers to the technology where a person interacts with a simulation of a 3D environment in a seemingly real or physical way.</p>
                {renderRadioGroup('q3.4', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.4')}
                {renderAnswerSection('q3.4')}
            </div>

            <div className="question" id="question-q3.5">
                <p><strong>3.5</strong> The research question should be a question that is brief and to the point to cover aspects of a broad research topic.</p>
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
                <p><strong>4.1</strong> State TWO disadvantages of using a wireless mouse.</p>
                {renderTextarea('q4.1.1')}
                {renderAnswerSection('q4.1.1')}
            </div>

            <div className="question">
                <p><strong>4.2</strong> Explain what biometric security is AND give ONE example of a biometric device.</p>
                {renderTextarea('q4.2')}
                {renderAnswerSection('q4.2')}
            </div>

            <div className="question">
                <p><strong>4.3</strong> Describe the purpose of a UPS compared to a permanent power supply.</p>
                {renderTextarea('q4.3')}
                {renderAnswerSection('q4.3')}
            </div>

            <div className="question">
                <p><strong>4.4</strong> Recommend THREE basic hardware components to consider when buying an end-user computer.</p>
                {renderTextarea('q4.4')}
                {renderAnswerSection('q4.4')}
            </div>

            <div className="question">
                <p><strong>4.5</strong> A data projector has been set up and displays a 'No Signal' error. Identify TWO possible reasons why this error occurs.</p>
                {renderTextarea('q4.5')}
                {renderAnswerSection('q4.5')}
            </div>

            <div className="question">
                <p><strong>4.6</strong> Describe TWO accessibility features that a deaf person can use.</p>
                {renderTextarea('q4.6')}
                {renderAnswerSection('q4.6')}
            </div>

            <div className="question">
                <p><strong>4.7</strong> One of the functions of an operating system is to manage programs and users.</p>
                <p><strong>4.7.1</strong> Explain the difference between a single-user system and a multi-user system.</p>
                {renderTextarea('q4.7.1')}
                {renderAnswerSection('q4.7.1')}
            </div>

            <div className="question">
                <p><strong>4.7.2</strong> Give ONE example of where a multi-user system can be used.</p>
                {renderTextarea('q4.7.2')}
                {renderAnswerSection('q4.7.2')}
            </div>

            <div className="question">
                <p><strong>4.8</strong> Suggest TWO ways how a user can customise the graphical user interface (GUI) to suit their preferences.</p>
                {renderTextarea('q4.8')}
                {renderAnswerSection('q4.8')}
            </div>

            <div className="question">
                <p><strong>4.9</strong> Users are often at risk of using flawed (faulty) software.</p>
                <p><strong>4.9.1</strong> Recommend ONE way to fix a software bug.</p>
                {renderTextarea('q4.9.1')}
                {renderAnswerSection('q4.9.1')}
            </div>

            <div className="question">
                <p><strong>4.9.2</strong> State TWO risks of using flawed software.</p>
                {renderTextarea('q4.9.2')}
                {renderAnswerSection('q4.9.2')}
            </div>

            <div className="question">
                <p><strong>4.10</strong> Motivate why using the hidden attribute will be better for protecting the data in a file compared to the read-only attribute.</p>
                {renderTextarea('q4.10')}
                {renderAnswerSection('q4.10')}
            </div>

            <div className="question">
                <p><strong>4.11</strong> The utility feature shown below is used on a computer hard drive.</p>
                <p>Optimize and defragment drive</p>
                <p>Explain why a user will use the feature above.</p>
                {renderTextarea('q4.11')}
                {renderAnswerSection('q4.11')}
            </div>

            <h3>QUESTION 5: INTERNET AND NETWORK TECHNOLOGIES</h3>
            <div className="question">
                <p><strong>5.1</strong> Which communication medium is used for a high-speed internet connection?</p>
                {renderTextarea('q5.1')}
                {renderAnswerSection('q5.1')}
            </div>

            <div className="question">
                <p><strong>5.2</strong> Explain what is meant by a wireless access point.</p>
                {renderTextarea('q5.2')}
                {renderAnswerSection('q5.2')}
            </div>

            <div className="question">
                <p><strong>5.3</strong> A network can be used to provide better security. Indicate ONE method that can be used to secure a network.</p>
                {renderTextarea('q5.3')}
                {renderAnswerSection('q5.3')}
            </div>

            <div className="question">
                <p><strong>5.4</strong> Give TWO reasons why a company may choose NOT to use an intranet.</p>
                {renderTextarea('q5.4')}
                {renderAnswerSection('q5.4')}
            </div>

            <div className="question">
                <p><strong>5.5</strong> Explain what the Fourth Industrial Revolution (4IR) is.</p>
                {renderTextarea('q5.5')}
                {renderAnswerSection('q5.5')}
            </div>

            <div className="question">
                <p><strong>5.6</strong> State TWO advantages of using tabbed web browsing.</p>
                {renderTextarea('q5.6')}
                {renderAnswerSection('q5.6')}
            </div>

            <div className="question">
                <p><strong>5.7</strong> Discuss TWO factors that may decrease upload and download speeds in an internet connection.</p>
                {renderTextarea('q5.7')}
                {renderAnswerSection('q5.7')}
            </div>

            <div className="question">
                <p><strong>5.8</strong> John received an e-mail marked as high priority and decided to flag it.</p>
                <p><strong>5.8.1</strong> Motivate why the 'Subject' line is inappropriate.</p>
                {renderTextarea('q5.8.1')}
                {renderAnswerSection('q5.8.1')}
            </div>

            <div className="question">
                <p><strong>5.8.2</strong> Differentiate between high priority and flagging.</p>
                {renderTextarea('q5.8.2')}
                {renderAnswerSection('q5.8.2')}
            </div>

            <h3>QUESTION 6: INFORMATION MANAGEMENT</h3>
            <div className="question">
                <p><strong>6.1</strong> State TWO ways to present research information to a target audience.</p>
                {renderTextarea('q6.1')}
                {renderAnswerSection('q6.1')}
            </div>

            <div className="question">
                <p><strong>6.2</strong> Give ONE reason why you would choose to use information from older sources.</p>
                {renderTextarea('q6.2')}
                {renderAnswerSection('q6.2')}
            </div>

            <div className="question">
                <p><strong>6.3</strong> Give TWO guidelines to follow when setting questions for a questionnaire.</p>
                {renderTextarea('q6.3')}
                {renderAnswerSection('q6.3')}
            </div>

            <div className="question">
                <p><strong>6.4</strong> Explain ONE reason why a database instead of a spreadsheet would be used to process data collected during research.</p>
                {renderTextarea('q6.4')}
                {renderAnswerSection('q6.4')}
            </div>

            <div className="question">
                <p><strong>6.5</strong> You need to add an image to a document.</p>
                <p><strong>6.5.1</strong> Name ONE word processing feature that may be used to acknowledge a source for an image, excluding citations.</p>
                {renderTextarea('q6.5.1')}
                {renderAnswerSection('q6.5.1')}
            </div>

            <div className="question">
                <p><strong>6.5.2</strong> Give ONE example of the type of data you could add to acknowledge the source.</p>
                {renderTextarea('q6.5.2')}
                {renderAnswerSection('q6.5.2')}
            </div>

            <div className="question">
                <p><strong>6.6</strong> Study the extract from the database report below.</p>
                <table border="1">
                    <tr><th>Event</th><th>Participant name</th><th>Participant Code</th><th>Age</th></tr>
                    <tr><td>Bike</td><td>Agnus</td><td>AgnusB20</td><td>34</td></tr>
                    <tr><td>Run</td><td>Clifford</td><td>Clifford35</td><td>25</td></tr>
                    <tr><td>Bike</td><td>Grant</td><td>Grant140</td><td>31</td></tr>
                    <tr><td>Run</td><td>Hemlata</td><td>Hemlata4</td><td>30</td></tr>
                    <tr><td>Bike</td><td>John</td><td>John435</td><td>39</td></tr>
                    <tr><td colspan="3">Average Age:</td><td>31.8</td></tr>
                    <tr><td>Run</td><td>Fatima</td><td></td><td>32</td></tr>
                    <tr><td>Bike</td><td>Kabelo</td><td></td><td>35</td></tr>
                    <tr><td>Run</td><td>Kholofelo</td><td></td><td>28</td></tr>
                    <tr><td>Bike</td><td>Louis</td><td></td><td>22</td></tr>
                    <tr><td>Run</td><td>Madeline</td><td></td><td>23</td></tr>
                    <tr><td>Bike</td><td>Mochack</td><td></td><td>25</td></tr>
                    <tr><td>Run</td><td>Mohamed</td><td></td><td>48</td></tr>
                </table>
                <p>Give TWO findings of this report.</p>
                {renderTextarea('q6.6')}
                {renderAnswerSection('q6.6')}
            </div>

            <h3>QUESTION 7: SOCIAL IMPLICATIONS</h3>
            <div className="question">
                <p><strong>7.1</strong> There are various types of viruses that affect a computer.</p>
                <p><strong>7.1.1</strong> What is a computer virus?</p>
                {renderTextarea('q7.1.1')}
                {renderAnswerSection('q7.1.1')}
            </div>

            <div className="question">
                <p><strong>7.1.2</strong> Explain TWO ways in which a virus can affect the performance of a computer.</p>
                {renderTextarea('q7.1.2')}
                {renderAnswerSection('q7.1.2')}
            </div>

            <div className="question">
                <p><strong>7.2</strong> Which term describes all the ways in which confidential information is obtained by abusing the trusting nature of people?</p>
                {renderTextarea('q7.2')}
                {renderAnswerSection('q7.2')}
            </div>

            <div className="question">
                <p><strong>7.3</strong> Green computing should be considered by all computer users.</p>
                <p><strong>7.3.1</strong> Explain the term green computing.</p>
                {renderTextarea('q7.3.1')}
                {renderAnswerSection('q7.3.1')}
            </div>

            <div className="question">
                <p><strong>7.3.2</strong> Name ONE energy-saving method that contributes to green computing.</p>
                {renderTextarea('q7.3.2')}
                {renderAnswerSection('q7.3.2')}
            </div>

            <div className="question">
                <p><strong>7.4</strong> Your friend wanted to download a song from the internet and clicked the download button, but was redirected to a malicious page.</p>
                <p><strong>7.4.1</strong> Give the term for the threat described above.</p>
                {renderTextarea('q7.4.1')}
                {renderAnswerSection('q7.4.1')}
            </div>

            <div className="question">
                <p><strong>7.4.2</strong> Recommend TWO actions that your friend can take to prevent this from happening again.</p>
                {renderTextarea('q7.4.2')}
                {renderAnswerSection('q7.4.2')}
            </div>

            <h3>QUESTION 8: SOLUTION DEVELOPMENT</h3>
            <div className="question">
                <p><strong>8.1</strong> Give a word processing feature that will allow a user to format all the headings in a document at the same time.</p>
                {renderTextarea('q8.1')}
                {renderAnswerSection('q8.1')}
            </div>

            <div className="question">
                <p><strong>8.2</strong> Tab stops can be set in a word processing document.</p>
                <p><strong>8.2.1</strong> Name TWO features that can be used to set tab stops in a word processing document.</p>
                {renderTextarea('q8.2.1')}
                {renderAnswerSection('q8.2.1')}
            </div>

            <div className="question">
                <p><strong>8.2.2</strong> Give ONE reason why a leader line can be added with tab stops.</p>
                {renderTextarea('q8.2.2')}
                {renderAnswerSection('q8.2.2')}
            </div>

            <div className="question">
                <p><strong>8.3</strong> Study the screenshot below.</p>
                <p>Agenda<br/>1. Welcome<br/>2. Attendance<br/>3. Minutes-of-previous-meeting<br/>15 July 2024<br/>4. Planning<br/>a. Term-1<br/>b. Term-2<br/>i. June-exam<br/>ii. Holiday-classes<br/>c. Term-3<br/>d. Term-4</p>
                <p><strong>8.3.1</strong> Which word processing feature has been used to create the list?</p>
                {renderTextarea('q8.3.1')}
                {renderAnswerSection('q8.3.1')}
            </div>

            <div className="question">
                <p><strong>8.3.2</strong> Explain why the date '15 July 2024' is not one of the list items AND how the date can be displayed as a list item.</p>
                {renderTextarea('q8.3.2')}
                {renderAnswerSection('q8.3.2')}
            </div>

            <div className="question">
                <p><strong>8.4</strong> Explain the difference between the &lt;th&gt; and the &lt;td&gt; tags.</p>
                {renderTextarea('q8.4')}
                {renderAnswerSection('q8.4')}
            </div>

            <div className="question">
                <p><strong>8.5</strong> Fields in a database table can consist of various data types.</p>
                <p><strong>8.5.1</strong> Explain when an OLE object data type will be used.</p>
                {renderTextarea('q8.5.1')}
                {renderAnswerSection('q8.5.1')}
            </div>

            <div className="question">
                <p><strong>8.5.2</strong> Name TWO data types that can be used for text in a database table.</p>
                {renderTextarea('q8.5.2')}
                {renderAnswerSection('q8.5.2')}
            </div>

            <div className="question">
                <p><strong>8.6</strong> Which THREE functions were combined to extract the username from the e-mail address in the screenshot below?</p>
                <table border="1">
                    <tr><th>E-mail address</th><th>Username</th></tr>
                    <tr><td>cateducator@school.co.za</td><td>cateducator</td></tr>
                    <tr><td>maths1234@school.co.za</td><td>maths1234</td></tr>
                    <tr><td>engpoems@school.co.za</td><td>engpoems</td></tr>
                    <tr><td>lifechange@school.co.za</td><td>lifechange</td></tr>
                </table>
                {renderTextarea('q8.6')}
                {renderAnswerSection('q8.6')}
            </div>

            <h2>SECTION C</h2>
            <h3>QUESTION 9: INTEGRATED SCENARIO</h3>
            <div className="question">
                <p><strong>9.1</strong> State TWO advantages for the committee to design an e-magazine instead of a hard-copy version.</p>
                {renderTextarea('q9.1')}
                {renderAnswerSection('q9.1')}
            </div>

            <div className="question">
                <p><strong>9.2</strong> The committee needs to work on the same network system. The school has provided the committee with a wireless connection.</p>
                <p><strong>9.2.1</strong> What network policy should the school and committee have in place?</p>
                {renderTextarea('q9.2.1')}
                {renderAnswerSection('q9.2.1')}
            </div>

            <div className="question">
                <p><strong>9.2.2</strong> Explain what a network adapter is.</p>
                {renderTextarea('q9.2.2')}
                {renderAnswerSection('q9.2.2')}
            </div>

            <div className="question">
                <p><strong>9.2.3</strong> Explain why the network might be slow while the committee is working on the e-magazine.</p>
                {renderTextarea('q9.2.3')}
                {renderAnswerSection('q9.2.3')}
            </div>

            <div className="question">
                <p><strong>9.3</strong> The committee will conduct interviews with previous learners, teachers and staff for the e-magazine. The interviews will be conducted using video conferencing.</p>
                <p><strong>9.3.1</strong> State TWO disadvantages of using video conferencing.</p>
                {renderTextarea('q9.3.1')}
                {renderAnswerSection('q9.3.1')}
            </div>

            <div className="question">
                <p><strong>9.3.2</strong> Name ONE good practice the committee should consider when conducting the interviews online.</p>
                {renderTextarea('q9.3.2')}
                {renderAnswerSection('q9.3.2')}
            </div>

            <div className="question">
                <p><strong>9.3.3</strong> Explain why interviews would be a better option to collect the information rather than using questionnaires.</p>
                {renderTextarea('q9.3.3')}
                {renderAnswerSection('q9.3.3')}
            </div>

            <div className="question">
                <p><strong>9.4</strong> The committee will use a scanner to scan images and text for the e-magazine.</p>
                <p><strong>9.4.1</strong> What does MP stand for in camera resolution?</p>
                {renderTextarea('q9.4.1')}
                {renderAnswerSection('q9.4.1')}
            </div>

            <div className="question">
                <p><strong>9.4.2</strong> Why would the committee make use of OCR software?</p>
                {renderTextarea('q9.4.2')}
                {renderAnswerSection('q9.4.2')}
            </div>

            <div className="question">
                <p><strong>9.4.3</strong> The school wants to scan photos of the opening day taken 50 years ago. Why would you not recommend scanning old photos?</p>
                {renderTextarea('q9.4.3')}
                {renderAnswerSection('q9.4.3')}
            </div>

            <div className="question">
                <p><strong>9.5</strong> Photos that will be displayed in the e-magazine must be uploaded to cloud storage. State TWO advantages of storing photos on the cloud compared to local storage.</p>
                {renderTextarea('q9.5')}
                {renderAnswerSection('q9.5')}
            </div>

            <div className="question">
                <p><strong>9.6</strong> The committee will be using various software applications to design and organise the e-magazine.</p>
                <p><strong>9.6.1</strong> Name TWO types of application software the committee can use to design the e-magazine.</p>
                {renderTextarea('q9.6.1')}
                {renderAnswerSection('q9.6.1')}
            </div>

            <div className="question">
                <p><strong>9.6.2</strong> Which word processing feature can be used to move an image next to a paragraph?</p>
                {renderTextarea('q9.6.2')}
                {renderAnswerSection('q9.6.2')}
            </div>

            <div className="question">
                <p><strong>9.6.3</strong> An order form for the e-magazine is placed on the school's website. Which HTML tag AND attribute will be used to create a link to the order form?</p>
                {renderTextarea('q9.6.3')}
                {renderAnswerSection('q9.6.3')}
            </div>

            <div className="question">
                <p><strong>9.7</strong> The e-magazine will be sold to learners and parents.</p>
                <p><strong>9.7.1</strong> Learners will use NFC payments to purchase the e-magazine. Explain how NFC payments are made.</p>
                {renderTextarea('q9.7.1')}
                {renderAnswerSection('q9.7.1')}
            </div>

            <div className="question">
                <p><strong>9.7.2</strong> Name TWO methods used to make online payments from home.</p>
                {renderTextarea('q9.7.2')}
                {renderAnswerSection('q9.7.2')}
            </div>

            <h3>QUESTION 10: INTEGRATED SCENARIO</h3>
            <div className="question">
                <p><strong>10.1</strong> The organisers from the school need to register participants.</p>
                <p><strong>10.1.1</strong> Briefly explain what information is.</p>
                {renderTextarea('q10.1.1')}
                {renderAnswerSection('q10.1.1')}
            </div>

            <div className="question">
                <p><strong>10.1.2</strong> Suggest TWO reasons why the organisers should use electronic forms to register participants.</p>
                {renderTextarea('q10.1.2')}
                {renderAnswerSection('q10.1.2')}
            </div>

            <div className="question">
                <p><strong>10.2</strong> Posters about the event will be put up at various shopping centres to advertise the competition.</p>
                <p><strong>10.2.1</strong> Name ONE other method of advertising this event.</p>
                {renderTextarea('q10.2.1')}
                {renderAnswerSection('q10.2.1')}
            </div>

            <div className="question">
                <p><strong>10.2.2</strong> The posters contain a QR code. What happens when the QR code is scanned?</p>
                {renderTextarea('q10.2.2')}
                {renderAnswerSection('q10.2.2')}
            </div>

            <div className="question">
                <p><strong>10.3</strong> The competition will raise money for a local charity as part of the school's social responsibility.</p>
                <p><strong>10.3.1</strong> Name an online method used to raise small amounts of money from a large number of people.</p>
                {renderTextarea('q10.3.1')}
                {renderAnswerSection('q10.3.1')}
            </div>

            <div className="question">
                <p><strong>10.3.2</strong> Give ONE example of a popular online platform to raise money.</p>
                {renderTextarea('q10.3.2')}
                {renderAnswerSection('q10.3.2')}
            </div>

            <div className="question">
                <p><strong>10.4</strong> Specialised cameras will be used to capture the competition.</p>
                <p><strong>10.4.1</strong> Except for resolution, name TWO other camera specifications that impact the quality of the images.</p>
                {renderTextarea('q10.4.1')}
                {renderAnswerSection('q10.4.1')}
            </div>

            <div className="question">
                <p><strong>10.4.2</strong> Images will be transferred to a laptop via a card reader. State TWO advantages of a card reader.</p>
                {renderTextarea('q10.4.2')}
                {renderAnswerSection('q10.4.2')}
            </div>

            <div className="question">
                <p><strong>10.5</strong> The track layout below will be used for the competition. Participants will be issued with a device that is embedded with an RFID tag.</p>
                <p><strong>10.5.1</strong> What type of network is displayed?</p>
                {renderTextarea('q10.5.1')}
                {renderAnswerSection('q10.5.1')}
            </div>

            <div className="question">
                <p><strong>10.5.2</strong> Give TWO reasons why the school will be using RFID tags for the participants.</p>
                {renderTextarea('q10.5.2')}
                {renderAnswerSection('q10.5.2')}
            </div>

            <div className="question">
                <p><strong>10.5.3</strong> What technology does RFID use to transmit data?</p>
                {renderTextarea('q10.5.3')}
                {renderAnswerSection('q10.5.3')}
            </div>

            <div className="question">
                <p><strong>10.6</strong> An autonomous car will capture the leading participants' progress. Define the concept autonomous car.</p>
                {renderTextarea('q10.6')}
                {renderAnswerSection('q10.6')}
            </div>

            <div className="question">
                <p><strong>10.7</strong> The school organisers will be on duty for many hours during the competition. They will be tracking all aspects of the event at their computer stations.</p>
                <p><strong>10.7.1</strong> Explain what ergonomic design is.</p>
                {renderTextarea('q10.7.1')}
                {renderAnswerSection('q10.7.1')}
            </div>

            <div className="question">
                <p><strong>10.7.2</strong> Apart from ergonomically designed equipment, recommend TWO other ways for the organisers to prevent strain on their bodies.</p>
                {renderTextarea('q10.7.2')}
                {renderAnswerSection('q10.7.2')}
            </div>

            <div className="question">
                <p><strong>10.8</strong> After the competition, data was captured in a spreadsheet.</p>
                <table border="1">
                    <tr><th>Participant Code</th><th>Participant Name</th><th>Age</th><th>Event</th><th>Swim (Min)</th><th>Bike (Min)</th><th>Run (Min)</th><th>Total (Hrs)</th></tr>
                    <tr><td>Joseph441</td><td>Joseph</td><td>42</td><td>Swim</td><td>15</td><td>45</td><td>46</td><td>8.45</td></tr>
                    <tr><td>Mary445</td><td>Mary</td><td>55</td><td>Swim</td><td>26</td><td>53</td><td>45</td><td>8.20</td></tr>
                    <tr><td>Fatima316</td><td>Fatima</td><td>35</td><td>Bike</td><td>14</td><td>45</td><td>51</td><td>7.78</td></tr>
                    <tr><td>Pieter42</td><td>Pieter</td><td>21</td><td>Swim</td><td>11</td><td>57</td><td>51</td><td>1.98</td></tr>
                    <tr><td>Susan248</td><td>Susan</td><td>55</td><td>Run</td><td>21</td><td>58</td><td>56</td><td>7.82</td></tr>
                    <tr><td>Nthabiseng259</td><td>Nthabiseng</td><td>24</td><td>Bike</td><td>32</td><td>53</td><td>62</td><td>7.95</td></tr>
                </table>
                <p><strong>10.8.1</strong> How can conditional formatting be used to analyse the data above?</p>
                {renderTextarea('q10.8.1')}
                {renderAnswerSection('q10.8.1')}
            </div>

            <div className="question">
                <p><strong>10.8.2</strong> The organisers created a participant code as follows: The participant's name, followed by Random integer numbers. Which spreadsheet functions were used to generate the participant code?</p>
                {renderTextarea('q10.8.2')}
                {renderAnswerSection('q10.8.2')}
            </div>

            <div className="question">
                <p><strong>10.8.3</strong> The organisers want to move the information from the spreadsheet to a database without opening the database. Name the spreadsheet feature that can be used.</p>
                {renderTextarea('q10.8.3')}
                {renderAnswerSection('q10.8.3')}
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

export default CatP2Nov2024;