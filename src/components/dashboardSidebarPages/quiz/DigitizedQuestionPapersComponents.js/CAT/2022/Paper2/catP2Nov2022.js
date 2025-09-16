import React, { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '../../../../../../../utils/api';
import { useNavigate } from 'react-router-dom';

const CatP2Nov2022 = ({paperId}) => {
    const navigate = useNavigate();
    /*const paperId = 'cat-p2-nov-2022';*/
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(null);
    const [correctness, setCorrectness] = useState({});
    const [revealedAnswers, setRevealedAnswers] = useState({});
    const [recording, setRecording] = useState(false);
    const [recordError, setRecordError] = useState(null);

    const correctAnswers = {
        'q1.1': 'C',
        'q1.2': 'A',
        'q1.3': 'D',
        'q1.4': 'C',
        'q1.5': 'A',
        'q1.6': 'B',
        'q1.7': 'A',
        'q1.8': 'D',
        'q1.9': 'D',
        'q1.10': 'B',
        'q2.1': 'E',
        'q2.2': 'O',
        'q2.3': 'A',
        'q2.4': 'G',
        'q2.5': 'C',
        'q2.6': 'P',
        'q2.7': 'M',
        'q2.8': 'S',
        'q2.9': 'K',
        'q2.10': 'D',
        'q3.1': 'True',
        'q3.2': 'False',
        'q3.3': 'False',
        'q3.4': 'True',
        'q3.5': 'False'
    };

    const marksB = {
        'q4.1': 2,
        'q4.2.1': 1,
        'q4.2.2': 1,
        'q4.3.1': 1,
        'q4.3.2': 1,
        'q4.4': 1,
        'q4.5': 2,
        'q4.6': 2,
        'q4.7': 2,
        'q4.8.1': 1,
        'q4.8.2': 1,
        'q4.9': 2,
        'q4.10.1': 1,
        'q4.10.2': 1,
        'q4.10.3': 2,
        'q4.11': 2,
        'q4.12.1': 1,
        'q4.12.2': 1,
        'q5.1': 1,
        'q5.2': 2,
        'q5.3': 2,
        'q5.4': 2,
        'q5.5': 2,
        'q5.6.1': 1,
        'q5.6.2': 1,
        'q5.7': 1,
        'q5.8': 2,
        'q5.9': 1,
        'q6.1': 2,
        'q6.2': 2,
        'q6.3': 2,
        'q6.4': 2,
        'q6.5': 2,
        'q7.1': 2,
        'q7.2': 1,
        'q7.3': 2,
        'q7.4': 1,
        'q7.5': 2,
        'q7.6': 2,
        'q8.1.1': 1,
        'q8.1.2': 1,
        'q8.1.3': 2,
        'q8.1.4': 1,
        'q8.1.5': 1,
        'q8.2.1': 2,
        'q8.2.2': 2,
        'q8.2.3': 1,
        'q8.3.1': 3,
        'q8.3.2': 1
    };

    const marksC = {
        'q9.1.1': 2,
        'q9.1.2': 1,
        'q9.2.1': 2,
        'q9.2.2': 2,
        'q9.2.3': 2,
        'q9.2.4': 1,
        'q9.2.5': 2,
        'q9.3.1': 1,
        'q9.3.2': 1,
        'q9.3.3': 1,
        'q9.3.4': 2,
        'q9.4.1': 2,
        'q9.4.2': 2,
        'q9.5.1': 1,
        'q9.5.2': 1,
        'q9.5.3': 2,
        'q10.1.1': 2,
        'q10.1.2': 1,
        'q10.1.3': 2,
        'q10.1.4': 2,
        'q10.2.1': 2,
        'q10.2.2': 1,
        'q10.3.1': 1,
        'q10.3.2': 2,
        'q10.4.1': 1,
        'q10.4.2': 2,
        'q10.4.3': 2,
        'q10.5.1': 2,
        'q10.5.2': 1,
        'q10.6.1': 2,
        'q10.6.2': 2
    };

    const keywordsB = {
        'q4.1': ['programs', 'applications', 'integrate'],
        'q4.2.1': ['dpi', 'dots', 'pixel', 'megapixel'],
        'q4.2.2': ['poor', 'quality', 'ocr', 'enlarge'],
        'q4.3.1': ['testing', 'alpha', 'beta'],
        'q4.3.2': ['patch', 'service pack'],
        'q4.4': ['task manager'],
        'q4.5': ['modified', 'created', 'size', 'type'],
        'q4.6': ['restart', 'cable', 'driver', 'settings', 'debugging'],
        'q4.7': ['pc', 'file explorer', 'properties', 'disk management'],
        'q4.8.1': ['sip', 'puff', 'braille', 'keyboard', 'trackball'],
        'q4.8.2': ['braille', 'printer', 'vibrating', 'led'],
        'q4.9': ['copyright', 'use', 'share'],
        'q4.10.1': ['less space', 'cables', 'easy install'],
        'q4.10.2': ['data', 'server', 'dedicated', 'small files'],
        'q4.10.3': ['inaccurate', 'gloves', 'dirty', 'cumbersome'],
        'q4.11': ['reduce', 'size', 'storage', 'data', 'security', 'password', 'attachment'],
        'q4.12.1': ['cd', 'dvd', 'blu-ray'],
        'q4.12.2': ['lose', 'stolen', 'expensive', 'cycles'],
        'q5.1': ['wan', 'gan', 'vpn'],
        'q5.2': ['secure', 'profiles', 'access', 'rights', 'management'],
        'q5.3': ['down', 'maintenance', 'removed', 'server offline'],
        'q5.4': ['coverage', 'services', 'speed', 'support', 'reviews', 'pricing'],
        'q5.5': ['courteous', 'attachments', 'capital', 'language', 'spam'],
        'q5.6.1': ['software', 'key words', 'phrases'],
        'q5.6.2': ['program', 'access', 'www', 'view web pages'],
        'q5.7': ['bandwidth', 'slow', 'high resolution'],
        'q5.8': ['monitored', 'controlled', 'sensors', 'reliability', 'integration'],
        'q5.9': ['grid computing'],
        'q6.1': ['multiple', 'one', 'broad'],
        'q6.2': ['force', 'limited', 'understood', 'biased'],
        'q6.3': ['reference', 'source', 'list'],
        'q6.4': ['email', 'retype', 'up date', 'share'],
        'q6.5': ['criteria', 'totals', 'sort', 'show', 'calculated', 'filter'],
        'q7.1': ['software', 'automate', 'infected', 'controlled'],
        'q7.2': ['valid'],
        'q7.3': ['users', 'income', 'reputation'],
        'q7.4': ['use', 'share', 'stalking', 'ownership', 'consequences'],
        'q7.5': ['links', 'pirated', 'download', 'browser', 'media', 'scan'],
        'q7.6': ['apps', 'assistant', 'facial', 'attendance', 'analysis'],
        'q8.1.1': ['merge', 'centre'],
        'q8.1.2': ['dates', 'c4', 'd8'],
        'q8.1.3': ['absolute', 'constant'],
        'q8.1.4': ['wider', 'font'],
        'q8.1.5': ['range', 'text'],
        'q8.2.1': ['surname', 'contact', 'date'],
        'q8.2.2': ['customerid', 'unique'],
        'q8.2.3': ['standard', 'format'],
        'q8.3.1': ['heading', 'list', 'font', 'background', 'images', 'centre', 'table', 'links'],
        'q8.3.2': ['browsers', 'edited', 'small', 'load']
    };

    const keywordsC = {
        'q9.1.1': ['combo', 'drop-down', 'date', 'help', 'validation'],
        'q9.1.2': ['word', 'access', 'excel'],
        'q9.2.1': ['heavy', 'keyboard', 'processing', 'battery', 'damage'],
        'q9.2.2': ['text-to-speech', 'magnify', 'font', 'contrast', 'brightness'],
        'q9.2.3': ['brightness', 'saving', 'flight', 'background', 'sensors'],
        'q9.2.4': ['byod'],
        'q9.2.5': ['bluetooth', 'nfc', 'wi-fi', 'otg'],
        'q9.3.1': ['synonyms', 'thesaurus'],
        'q9.3.2': ['subtotal', 'pivot'],
        'q9.3.3': ['len'],
        'q9.3.4': ['conditional', 'find', 'sort'],
        'q9.4.1': ['opinions', 'comment'],
        'q9.4.2': ['author', 'year', 'publisher', 'city', 'edition', 'page', 'volume', 'access'],
        'q9.5.1': ['database', 'spreadsheet'],
        'q9.5.2': ['mail merge'],
        'q9.5.3': ['paper', 'ink', 'jam', 'malfunction', 'power'],
        'q10.1.1': ['mobility', 'cost', 'easy', 'cover', 'clutter'],
        'q10.1.2': ['wireless nic', 'dongle', 'pci'],
        'q10.1.3': ['viruses', 'security', 'hardware', 'installation'],
        'q10.1.4': ['security', 'physical', 'data', 'office'],
        'q10.2.1': ['free', 'variety', 'customised'],
        'q10.2.2': ['parental', 'settings', 'firewall'],
        'q10.3.1': ['loss'],
        'q10.3.2': ['scalable', 'space', 'lost', 'sync', 'collaboration'],
        'q10.4.1': ['ransomware'],
        'q10.4.2': ['trace', 'secure', 'anywhere'],
        'q10.4.3': ['blocks', 'transactions', 'chained', 'distributed', 'ledger'],
        'q10.5.1': ['links', 'spelling', 'contain'],
        'q10.5.2': ['template'],
        'q10.6.1': ['models', 'blocks', 'toys', 'parts', 'templates'],
        'q10.6.2': ['fumes', 'choking', 'buttons', 'hurt', 'hot']
    };

    const memos = {
        'q1.1': 'C throttling.',
        'q1.2': 'A Archiving',
        'q1.3': 'D detect and configure new devices.',
        'q1.4': 'C phishing.',
        'q1.5': 'A Why has the price of computers gone up?',
        'q1.6': 'B Device Driver',
        'q1.7': 'A Send to storage',
        'q1.8': 'D Form',
        'q1.9': 'D >=#01/01/2003# AND <=#31/12/2013#',
        'q1.10': 'B There are three numeric and three text values.',
        'q2.1': 'E data',
        'q2.2': 'O server',
        'q2.3': 'A VoIP',
        'q2.4': 'G gamer',
        'q2.5': 'C BIOS',
        'q2.6': 'P <a href=\"bird.jpg\">',
        'q2.7': 'M biometrics',
        'q2.8': 'S software version',
        'q2.9': 'K telecommuting',
        'q2.10': 'D #VALUE!',
        'q3.1': 'True',
        'q3.2': 'False, E-waste',
        'q3.3': 'False, Printer',
        'q3.4': 'True',
        'q3.5': 'False, <hr>',
        'q4.1': 'An office suite is a collection of programs (software applications) that link/integrate with each other/with a similar user interface',
        'q4.2.1': 'DPI/dots per inch',
        'q4.2.2': 'Poor resolution causes poor image quality',
        'q4.3.1': 'Internal testing by a dedicated team/Alpha testing',
        'q4.3.2': 'Install a patch',
        'q4.4': 'Task Manager',
        'q4.5': 'Last modified',
        'q4.6': 'Restart the smartphone and restart the computer',
        'q4.7': 'This PC (in File Explorer)',
        'q4.8.1': 'Sip and Puff',
        'q4.8.2': 'Braille printer',
        'q4.9': 'Creative Commons is a copyright agreement that allows anyone to use and share the content under certain conditions (e.g. free) from the copyright holder/owner',
        'q4.10.1': 'Less physical space/Mobility',
        'q4.10.2': 'Data is stored centrally on a server and generally not on POS system',
        'q4.10.3': 'Input can be inaccurate when wearing gloves/user has wet fingers/screen becomes dirty',
        'q4.11': 'Possible decrease in storage space for a file/Reduce file size',
        'q4.12.1': 'CD, DVD or Blu-ray',
        'q4.12.2': 'Easy to lose',
        'q5.1': 'WAN /GAN/VPN',
        'q5.2': 'Necessary for secure profiles/Gain access to folder associated with each profile',
        'q5.3': 'Website is down due to maintenance',
        'q5.4': 'Coverage of the ISP\'s services',
        'q5.5': 'Be kind and courteous',
        'q5.6.1': 'Software/Application that finds/searches for web pages by using key words/phrases',
        'q5.6.2': 'A program that gives access to the www /Software that allows the user to explore and to view web pages',
        'q5.7': 'Insufficient bandwidth/Slow internet connection',
        'q5.8': 'Devices can be monitored via the internet',
        'q5.9': 'Grid computing',
        'q6.1': 'There is more than one question',
        'q6.2': 'Forces the respondent to answer in a certain way/Limited choices',
        'q6.3': 'A single reference to a specific source (in the bibliography)',
        'q6.4': 'Easier to obtain data via e-mail, SMS, portable storage media',
        'q6.5': 'Criteria/Functions in criteria',
        'q7.1': 'A bot is software/application used to automate certain tasks and actions',
        'q7.2': 'The e-mail address appears to be valid',
        'q7.3': 'Legitimate users are not able to use the website/service/internet',
        'q7.4': 'Others can use and share your content as if it belongs to them/identify theft',
        'q7.5': 'Do not click on links/attachments in suspicious e-mails or websites',
        'q7.6': 'Educational apps to personalise learning experience',
        'q8.1.1': 'Merge and centre /Merge',
        'q8.1.2': 'Date purchased/Date sold or specific examples such as C4:D8/Dates',
        'q8.1.3': '$ symbol: Absolute cell referencing',
        'q8.1.4': 'Make column wider',
        'q8.1.5': 'The cell range in the function is incorrect',
        'q8.2.1': 'CustomerSurname',
        'q8.2.2': 'Appropriate field: CustomerID',
        'q8.2.3': 'Input mask forces a standard/consistent format for data entry',
        'q8.3.1': 'Heading sizes/Bold font',
        'q8.3.2': 'Various browsers can be used to open the web pages',
        'q9.1.1': 'Use a combo box/drop-down list for the Grade choices',
        'q9.1.2': 'Word processor, e.g. (Microsoft) Word/Open Office/WordPerfect',
        'q9.2.1': 'Physical size: Heavy/Too big to carry around',
        'q9.2.2': 'Activate the Text-to-Speech/Narrator software',
        'q9.2.3': 'Reduce the screen brightness',
        'q9.2.4': 'BYOD /Bring Your Own Device',
        'q9.2.5': 'Bluetooth',
        'q9.3.1': 'Synonyms /Thesaurus',
        'q9.3.2': 'SUBTOTAL',
        'q9.3.3': 'LEN',
        'q9.3.4': 'Conditional formatting',
        'q9.4.1': 'Blogs are more suitable for personal opinions',
        'q9.4.2': 'Author',
        'q9.5.1': 'Database /Access (Accept Spreadsheet/Excel)',
        'q9.5.2': 'Mail Merge /Mailings',
        'q9.5.3': 'No paper',
        'q10.1.1': 'Ease of mobility',
        'q10.1.2': 'Wireless NIC/Wi-Fi adapter/Wireless dongle',
        'q10.1.3': 'Viruses',
        'q10.1.4': 'Network security issues e.g. other devices such as printers etc., can be accessed',
        'q10.2.1': 'Free to use',
        'q10.2.2': 'Parental guidance software, e.g. Net Nanny, Qustodio, Bark, etc.',
        'q10.3.1': 'Prevent loss of data',
        'q10.3.2': 'Cloud storage is scalable when you need more storage space',
        'q10.4.1': 'Ransomware',
        'q10.4.2': 'Cannot trace who the owner of the account is',
        'q10.4.3': 'Blockchain technology is a sequence of blocks or groups of transactions',
        'q10.5.1': 'A QR code links directly to a website/live stream',
        'q10.5.2': 'Use a template',
        'q10.6.1': 'Print educational models',
        'q10.6.2': 'Gives off strong smells/toxic/harmful fumes'
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
            <h1>Computer Applications Technology P2 - November 2022</h1>
            <h2>Interactive Quiz</h2>
            <p>This interactive quiz allows you to answer the questions and check your answers immediately for Section A. For Sections B and C, you can read the questions and click to reveal the memo answers for self-checking.</p>

            <h2>SECTION A</h2>
            <h3>QUESTION 1: MULTIPLE-CHOICE QUESTIONS</h3>

            <div className="question" id="question-q1.1">
                <p><strong>1.1</strong> The process during which your ISP slows down your internet connection is known as …</p>
                {renderRadioGroup('q1.1', [
                    { value: 'A', label: 'A data cap.' },
                    { value: 'B', label: 'B shaping.' },
                    { value: 'C', label: 'C throttling.' },
                    { value: 'D', label: 'D bandwidth.' }
                ])}
                {renderFeedback('q1.1')}
                {renderAnswerSection('q1.1')}
            </div>

            <div className="question" id="question-q1.2">
                <p><strong>1.2</strong> Which ONE of the following processes would you use to protect your data?</p>
                {renderRadioGroup('q1.2', [
                    { value: 'A', label: 'A Archiving' },
                    { value: 'B', label: 'B Compression' },
                    { value: 'C', label: 'C Error checking' },
                    { value: 'D', label: 'D Firewall' }
                ])}
                {renderFeedback('q1.2')}
                {renderAnswerSection('q1.2')}
            </div>

            <div className="question" id="question-q1.3">
                <p><strong>1.3</strong> Plug-and-play technology is used to …</p>
                {renderRadioGroup('q1.3', [
                    { value: 'A', label: 'A play games on a gaming console.' },
                    { value: 'B', label: 'B access the content of a CD.' },
                    { value: 'C', label: 'C install an operating system.' },
                    { value: 'D', label: 'D detect and configure new devices.' }
                ])}
                {renderFeedback('q1.3')}
                {renderAnswerSection('q1.3')}
            </div>

            <div className="question" id="question-q1.4">
                <p><strong>1.4</strong> A fraudulent process which tries to obtain sensitive information is called …</p>
                {renderRadioGroup('q1.4', [
                    { value: 'A', label: 'A pharming.' },
                    { value: 'B', label: 'B spamming.' },
                    { value: 'C', label: 'C phishing.' },
                    { value: 'D', label: 'D hoaxing.' }
                ])}
                {renderFeedback('q1.4')}
                {renderAnswerSection('q1.4')}
            </div>

            <div className="question" id="question-q1.5">
                <p><strong>1.5</strong> Which ONE of the following is an example of a question that you should NOT include in a questionnaire in a PAT?</p>
                {renderRadioGroup('q1.5', [
                    { value: 'A', label: 'A Why has the price of computers gone up?' },
                    { value: 'B', label: 'B What is your favourite processor brand?' },
                    { value: 'C', label: 'C Which operating system do you use?' },
                    { value: 'D', label: 'D How many years have you been using computers?' }
                ])}
                {renderFeedback('q1.5')}
                {renderAnswerSection('q1.5')}
            </div>

            <div className="question" id="question-q1.6">
                <p><strong>1.6</strong> The … is used by the operating system to communicate with hardware devices.</p>
                {renderRadioGroup('q1.6', [
                    { value: 'A', label: 'A Device Manager' },
                    { value: 'B', label: 'B Device Driver' },
                    { value: 'C', label: 'C Audio Manager' },
                    { value: 'D', label: 'D Disk Defragmenter' }
                ])}
                {renderFeedback('q1.6')}
                {renderAnswerSection('q1.6')}
            </div>

            <div className="question" id="question-q1.7">
                <p><strong>1.7</strong> Which ONE of the following is NOT a task generally performed during the processing phase of the information processing cycle?</p>
                {renderRadioGroup('q1.7', [
                    { value: 'A', label: 'A Send to storage' },
                    { value: 'B', label: 'B Search and sort' },
                    { value: 'C', label: 'C Compare and decide' },
                    { value: 'D', label: 'D Perform calculations' }
                ])}
                {renderFeedback('q1.7')}
                {renderAnswerSection('q1.7')}
            </div>

            <div className="question" id="question-q1.8">
                <p><strong>1.8</strong> Which ONE of the following database objects is a user-friendly interface for capturing data?</p>
                {renderRadioGroup('q1.8', [
                    { value: 'A', label: 'A Table' },
                    { value: 'B', label: 'B Query' },
                    { value: 'C', label: 'C Report' },
                    { value: 'D', label: 'D Form' }
                ])}
                {renderFeedback('q1.8')}
                {renderAnswerSection('q1.8')}
            </div>

            <div className="question" id="question-q1.9">
                <p><strong>1.9</strong> Which validation rule for a DateOfBirth field will allow ONLY dates of people born in the years 2003 to 2013?</p>
                {renderRadioGroup('q1.9', [
                    { value: 'A', label: 'A >=2003 OR >=2013' },
                    { value: 'B', label: 'B >=#01/01/2003# OR <=#31/12/2013#' },
                    { value: 'C', label: 'C >=2003 AND >=2013' },
                    { value: 'D', label: 'D >=#01/01/2003# AND <=#31/12/2013#' }
                ])}
                {renderFeedback('q1.9')}
                {renderAnswerSection('q1.9')}
            </div>

            <div className="question" id="question-q1.10">
                <p><strong>1.10</strong> The following TWO spreadsheet functions are used on the same cell range A1:A8: =COUNTA(A1:A8) which returns a value of 6 =COUNT(A1:A8) which returns a value of 3 Which ONE of the following options is TRUE, based on the results above in the cell range A1:A8?</p>
                {renderRadioGroup('q1.10', [
                    { value: 'A', label: 'A There is only one empty or blank cell.' },
                    { value: 'B', label: 'B There are three numeric and three text values.' },
                    { value: 'C', label: 'C There are six cells with numeric values.' },
                    { value: 'D', label: 'D There are eight cells that contain any values.' }
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
                <tr><td>2.1 Raw numbers or facts that are unorganised</td>
                    <td>  A VoIP B information C BIOS D #NAME? E data F ISP G gamer H password I operating system J ROM K telecommuting
                        L &lt;img src="bird.jpg"&gt; M biometrics N data capturer O server P &lt;a href="bird.jpg"&gt;
                        Q SOHO R hub S software version T #VALUE!</td></tr>
                <tr><td>2.2 A device used on a network to manage and share resources</td><td></td></tr>
                <tr><td>2.3 An internet technology that enables people from various countries to communicate in real time</td><td></td></tr>
                <tr><td>2.4 This user generally requires a good quality graphics card</td><td></td></tr>
                <tr><td>2.5 Firmware containing instructions for the start-up of a computer</td><td></td></tr>
                <tr><td>2.6 An example of HTML code used to open a picture in a new browser window</td><td></td></tr>
                <tr><td>2.7 A technology that uses a person's unique physical characteristics to control access</td><td></td></tr>
                <tr><td>2.8 A reason why certain documents display unreadable content when you open it on your computer, even though you have an appropriate application</td><td></td></tr>
                <tr><td>2.9 An arrangement for employees to work from home using ICTs</td><td></td></tr>
                <tr><td>2.10 A spreadsheet error message that will appear if you enter the following function: =AVG(B1:B20)</td><td></td></tr>
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
                <p><strong>3.1</strong> An ATM is an example of a dedicated device.</p>
                {renderRadioGroup('q3.1', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.1')}
                {renderAnswerSection('q3.1')}
            </div>

            <div className="question" id="question-q3.2">
                <p><strong>3.2</strong> Green computing refers to old computing devices that people throw away and that end up in landfill sites.</p>
                {renderRadioGroup('q3.2', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.2')}
                {renderAnswerSection('q3.2')}
            </div>

            <div className="question" id="question-q3.3">
                <p><strong>3.3</strong> A monitor converts electronic data into a hard copy.</p>
                {renderRadioGroup('q3.3', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.3')}
                {renderAnswerSection('q3.3')}
            </div>

            <div className="question" id="question-q3.4">
                <p><strong>3.4</strong> The function of a router is to transmit data between computer networks.</p>
                {renderRadioGroup('q3.4', [
                    { value: 'True', label: 'True' },
                    { value: 'False', label: 'False' }
                ])}
                {renderFeedback('q3.4')}
                {renderAnswerSection('q3.4')}
            </div>

            <div className="question" id="question-q3.5">
                <p><strong>3.5</strong> <br/> is used in HTML to create a horizontal line.</p>
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
                <p><strong>4.1</strong> Explain what an office suite is.</p>
                {renderTextarea('q4.1')}
                {renderAnswerSection('q4.1')}
            </div>

            <div className="question">
                <p><strong>4.2</strong> You should consider the resolution when buying input devices such as scanners or cameras.</p>
                <p><strong>4.2.1</strong> What unit of measurement is used to describe resolution?</p>
                {renderTextarea('q4.2.1')}
                {renderAnswerSection('q4.2.1')}
            </div>

            <div className="question">
                <p><strong>4.2.2</strong> Give ONE disadvantage of capturing an image with poor resolution.</p>
                {renderTextarea('q4.2.2')}
                {renderAnswerSection('q4.2.2')}
            </div>

            <div className="question">
                <p><strong>4.3</strong> Software bugs are unintended errors in software.</p>
                <p><strong>4.3.1</strong> Explain ONE method software developers use to avoid software bugs in their software, before distributing the final version of the software.</p>
                {renderTextarea('q4.3.1')}
                {renderAnswerSection('q4.3.1')}
            </div>

            <div className="question">
                <p><strong>4.3.2</strong> Recommend ONE way in which a user can get rid of a software bug, other than keeping software updated.</p>
                {renderTextarea('q4.3.2')}
                {renderAnswerSection('q4.3.2')}
            </div>

            <div className="question">
                <p><strong>4.4</strong> Name the utility program that you can use to close an unresponsive application.</p>
                {renderTextarea('q4.4')}
                {renderAnswerSection('q4.4')}
            </div>

            <div className="question">
                <p><strong>4.5</strong> Give TWO examples of metadata that you can use as criteria when you search for a file, other than using the file name.</p>
                {renderTextarea('q4.5')}
                {renderAnswerSection('q4.5')}
            </div>

            <div className="question">
                <p><strong>4.6</strong> You use a USB cable to connect a smartphone to your computer. Although the cable is connected properly, the devices do not communicate with each other. Suggest TWO ways to solve this problem.</p>
                {renderTextarea('q4.6')}
                {renderAnswerSection('q4.6')}
            </div>

            <div className="question">
                <p><strong>4.7</strong> Explain TWO ways to check the actual size of a hard drive on a Windows PC, using the graphical user interface.</p>
                {renderTextarea('q4.7')}
                {renderAnswerSection('q4.7')}
            </div>

            <div className="question">
                <p><strong>4.8</strong> Disabled people may need special hardware devices to enable them to use ICTs.</p>
                <p><strong>4.8.1</strong> Name ONE input device specifically designed for disabled users.</p>
                {renderTextarea('q4.8.1')}
                {renderAnswerSection('q4.8.1')}
            </div>

            <div className="question">
                <p><strong>4.8.2</strong> Name ONE output device specifically designed for disabled users.</p>
                {renderTextarea('q4.8.2')}
                {renderAnswerSection('q4.8.2')}
            </div>

            <div className="question">
                <p><strong>4.9</strong> You downloaded a video licensed under the Creative Commons (CC) agreement. Explain what a Creative Commons (CC) licence generally is.</p>
                {renderTextarea('q4.9')}
                {renderAnswerSection('q4.9')}
            </div>

            <div className="question">
                <p><strong>4.10</strong> The owner of a restaurant saw the advertisement below for a point of sale (POS) device.</p>
                <img src="placeholder-pos-image" alt="POS device advertisement" />
                <p><strong>4.10.1</strong> Why would it be advisable for a restaurant owner to buy an All-in-1 POS device?</p>
                {renderTextarea('q4.10.1')}
                {renderAnswerSection('q4.10.1')}
            </div>

            <div className="question">
                <p><strong>4.10.2</strong> Why would the 64 GB SSD have a suitable capacity for a restaurant POS device?</p>
                {renderTextarea('q4.10.2')}
                {renderAnswerSection('q4.10.2')}
            </div>

            <div className="question">
                <p><strong>4.10.3</strong> Give TWO disadvantages of using touch screens.</p>
                {renderTextarea('q4.10.3')}
                {renderAnswerSection('q4.10.3')}
            </div>

            <div className="question">
                <p><strong>4.11</strong> Give TWO reasons why you would zip/compress a file.</p>
                {renderTextarea('q4.11')}
                {renderAnswerSection('q4.11')}
            </div>

            <div className="question">
                <p><strong>4.12</strong> You wish to store files, but do not have enough storage space on your device.</p>
                <p><strong>4.12.1</strong> Which optical media would you recommend to store some files?</p>
                {renderTextarea('q4.12.1')}
                {renderAnswerSection('q4.12.1')}
            </div>

            <div className="question">
                <p><strong>4.12.2</strong> Discuss ONE disadvantage of using a flash drive to store some files.</p>
                {renderTextarea('q4.12.2')}
                {renderAnswerSection('q4.12.2')}
            </div>

            <h3>QUESTION 5: INTERNET AND NETWORK TECHNOLOGIES</h3>
            <div className="question">
                <p><strong>5.1</strong> What type of network can a company use to connect their offices across the country?</p>
                {renderTextarea('q5.1')}
                {renderAnswerSection('q5.1')}
            </div>

            <div className="question">
                <p><strong>5.2</strong> Give TWO reasons why a teacher would require learners to log in on the computer centre's network.</p>
                {renderTextarea('q5.2')}
                {renderAnswerSection('q5.2')}
            </div>

            <div className="question">
                <p><strong>5.3</strong> Explain TWO reasons why you could get a 'Page not found' error when you try to open a bookmarked website.</p>
                {renderTextarea('q5.3')}
                {renderAnswerSection('q5.3')}
            </div>

            <div className="question">
                <p><strong>5.4</strong> Suggest TWO criteria you should consider when choosing an ISP.</p>
                {renderTextarea('q5.4')}
                {renderAnswerSection('q5.4')}
            </div>

            <div className="question">
                <p><strong>5.5</strong> Recommend TWO netiquette rules for a WhatsApp study group chat.</p>
                {renderTextarea('q5.5')}
                {renderAnswerSection('q5.5')}
            </div>

            <div className="question">
                <p><strong>5.6</strong> Explain EACH of the following concepts:</p>
                <p><strong>5.6.1</strong> Search engine</p>
                {renderTextarea('q5.6.1')}
                {renderAnswerSection('q5.6.1')}
            </div>

            <div className="question">
                <p><strong>5.6.2</strong> Web browser</p>
                {renderTextarea('q5.6.2')}
                {renderAnswerSection('q5.6.2')}
            </div>

            <div className="question">
                <p><strong>5.7</strong> Give a reason why users experience buffering when streaming videos.</p>
                {renderTextarea('q5.7')}
                {renderAnswerSection('q5.7')}
            </div>

            <div className="question">
                <p><strong>5.8</strong> Give TWO uses of IoT in a home environment.</p>
                {renderTextarea('q5.8')}
                {renderAnswerSection('q5.8')}
            </div>

            <div className="question">
                <p><strong>5.9</strong> Name the system that a research company can use to address the need for more computer processing power, without having to buy new hardware.</p>
                {renderTextarea('q5.9')}
                {renderAnswerSection('q5.9')}
            </div>

            <h3>QUESTION 6: INFORMATION MANAGEMENT</h3>
            <div className="question">
                <p><strong>6.1</strong> Discuss TWO reasons why the following focus question is poorly formulated: How has cybersecurity affected your life and how did you resolve it?</p>
                {renderTextarea('q6.1')}
                {renderAnswerSection('q6.1')}
            </div>

            <div className="question">
                <p><strong>6.2</strong> Explain TWO disadvantages of using closed questions in a questionnaire.</p>
                {renderTextarea('q6.2')}
                {renderAnswerSection('q6.2')}
            </div>

            <div className="question">
                <p><strong>6.3</strong> Define EACH of the following word processing features without referring to their position in a document:  Citation  Bibliography</p>
                {renderTextarea('q6.3')}
                {renderAnswerSection('q6.3')}
            </div>

            <div className="question">
                <p><strong>6.4</strong> Explain TWO advantages of using electronic data rather than using data in a hard copy format.</p>
                {renderTextarea('q6.4')}
                {renderAnswerSection('q6.4')}
            </div>

            <div className="question">
                <p><strong>6.5</strong> Give TWO database options/features in a query that you can use to analyse data.</p>
                {renderTextarea('q6.5')}
                {renderAnswerSection('q6.5')}
            </div>

            <h3>QUESTION 7: SOCIAL IMPLICATIONS</h3>
            <div className="question">
                <p><strong>7.1</strong> What is the difference between a bot and a zombie?</p>
                {renderTextarea('q7.1')}
                {renderAnswerSection('q7.1')}
            </div>

            <div className="question">
                <p><strong>7.2</strong> Explain why users may not realise when they are victims of a spoofing attack.</p>
                {renderTextarea('q7.2')}
                {renderAnswerSection('q7.2')}
            </div>

            <div className="question">
                <p><strong>7.3</strong> Give TWO reasons why DDoS attacks are harmful.</p>
                {renderTextarea('q7.3')}
                {renderAnswerSection('q7.3')}
            </div>

            <div className="question">
                <p><strong>7.4</strong> Discuss the risk of posting videos that you made on social media platforms (such as TikTok or Instagram).</p>
                {renderTextarea('q7.4')}
                {renderAnswerSection('q7.4')}
            </div>

            <div className="question">
                <p><strong>7.5</strong> Give TWO ways to reduce the risk of your computer getting infected by a virus, other than installing an antivirus program or keeping software up to date.</p>
                {renderTextarea('q7.5')}
                {renderAnswerSection('q7.5')}
            </div>

            <div className="question">
                <p><strong>7.6</strong> Give TWO examples of how artificial intelligence (AI) can be useful in a school environment.</p>
                {renderTextarea('q7.6')}
                {renderAnswerSection('q7.6')}
            </div>

            <h3>QUESTION 8: SOLUTION DEVELOPMENT</h3>
            <div className="question">
                <p><strong>8.1</strong> The screenshot of the spreadsheet below shows the earnings by Sam, a sales representative.</p>
                <img src="placeholder-spreadsheet-image" alt="Spreadsheet screenshot" />
                <p><strong>8.1.1</strong> What kind of formatting has been used in row 1, other than font changes?</p>
                {renderTextarea('q8.1.1')}
                {renderAnswerSection('q8.1.1')}
            </div>

            <div className="question">
                <p><strong>8.1.2</strong> Which data in the spreadsheet does not have consistent formatting?</p>
                {renderTextarea('q8.1.2')}
                {renderAnswerSection('q8.1.2')}
            </div>

            <div className="question">
                <p><strong>8.1.3</strong> The formula used to determine the bonus commission in cell G4 is: =F4*$G$2. What does the $ symbol indicate AND what is its purpose?</p>
                {renderTextarea('q8.1.3')}
                {renderAnswerSection('q8.1.3')}
            </div>

            <div className="question">
                <p><strong>8.1.4</strong> How can you correct the error displayed in cell F9?</p>
                {renderTextarea('q8.1.4')}
                {renderAnswerSection('q8.1.4')}
            </div>

            <div className="question">
                <p><strong>8.1.5</strong> The SUM function used in cell E9 returns an incorrect result. Give ONE reason why this result is incorrect.</p>
                {renderTextarea('q8.1.5')}
                {renderAnswerSection('q8.1.5')}
            </div>

            <div className="question">
                <p><strong>8.2</strong> A company created a database to keep a record of their customers. The screenshot below shows the fields in their database table.</p>
                <img src="placeholder-database-image" alt="Database screenshot" />
                <p><strong>8.2.1</strong> Identify TWO fields where unsuitable data types were used.</p>
                {renderTextarea('q8.2.1')}
                {renderAnswerSection('q8.2.1')}
            </div>

            <div className="question">
                <p><strong>8.2.2</strong> Which field would be more appropriate for a primary key? Motivate your answer.</p>
                {renderTextarea('q8.2.2')}
                {renderAnswerSection('q8.2.2')}
            </div>

            <div className="question">
                <p><strong>8.2.3</strong> Why would you recommend an input mask for the ContactNumber field?</p>
                {renderTextarea('q8.2.3')}
                {renderAnswerSection('q8.2.3')}
            </div>

            <div className="question">
                <p><strong>8.3</strong> The following menu displays in a web browser:</p>
                <img src="placeholder-menu-image" alt="Menu screenshot" />
                <p><strong>8.3.1</strong> State THREE changes which you could make to the HTML code to improve the design and layout of the menu in the web page.</p>
                {renderTextarea('q8.3.1')}
                {renderAnswerSection('q8.3.1')}
            </div>

            <div className="question">
                <p><strong>8.3.2</strong> Give ONE advantage of web pages being based on text files.</p>
                {renderTextarea('q8.3.2')}
                {renderAnswerSection('q8.3.2')}
            </div>

            <h2>SECTION C</h2>
            <h3>QUESTION 9: INTEGRATED SCENARIO</h3>
            <div className="question">
                <p><strong>9.1</strong> The chairperson of the book club keeps a record of the members and the books read by each member.</p>
                <p><strong>9.1.1</strong> Recommend TWO changes you can make to the electronic form below to ensure that data capturing is more accurate.</p>
                <img src="placeholder-form-image" alt="Form screenshot" />
                {renderTextarea('q9.1.1')}
                {renderAnswerSection('q9.1.1')}
            </div>

            <div className="question">
                <p><strong>9.1.2</strong> Which application can you use offline to create an electronic form?</p>
                {renderTextarea('q9.1.2')}
                {renderAnswerSection('q9.1.2')}
            </div>

            <div className="question">
                <p><strong>9.2</strong> The Ubuntu project distributes free books in PDF and other digital formats. One of the aims of the school book club is to encourage learners to read these books on their computing devices.</p>
                <p><strong>9.2.1</strong> Give TWO reasons why a laptop is NOT a suitable device to use only for reading books in digital format.</p>
                {renderTextarea('q9.2.1')}
                {renderAnswerSection('q9.2.1')}
            </div>

            <div className="question">
                <p><strong>9.2.2</strong> Which TWO software settings on a device can be used to make books in PDF format accessible to visually impaired users?</p>
                {renderTextarea('q9.2.2')}
                {renderAnswerSection('q9.2.2')}
            </div>

            <div className="question">
                <p><strong>9.2.3</strong> Suggest TWO ways to extend the battery life of a device used for reading.</p>
                {renderTextarea('q9.2.3')}
                {renderAnswerSection('q9.2.3')}
            </div>

            <div className="question">
                <p><strong>9.2.4</strong> Name the concept used when learners use their own devices, instead of the school's devices, to download these PDF books.</p>
                {renderTextarea('q9.2.4')}
                {renderAnswerSection('q9.2.4')}
            </div>

            <div className="question">
                <p><strong>9.2.5</strong> Name TWO technologies that learners can use to share these PDF books in electronic format without using the internet or the school's network.</p>
                {renderTextarea('q9.2.5')}
                {renderAnswerSection('q9.2.5')}
            </div>

            <div className="question">
                <p><strong>9.3</strong> The club created a spreadsheet to capture lesser known words that learners came across during their reading.</p>
                <img src="placeholder-vocabulary-image" alt="Vocabulary spreadsheet" />
                <p><strong>9.3.1</strong> Which word processing feature can be used on a particular word to display more words with the same meaning?</p>
                {renderTextarea('q9.3.1')}
                {renderAnswerSection('q9.3.1')}
            </div>

            <div className="question">
                <p><strong>9.3.2</strong> The chairperson would like to know how many words appear for each specific book. Suggest ONE spreadsheet feature that can be used to display this information.</p>
                {renderTextarea('q9.3.2')}
                {renderAnswerSection('q9.3.2')}
            </div>

            <div className="question">
                <p><strong>9.3.3</strong> Some of these words will be used to create a crossword puzzle. Name the function that was used in cells D90:D95 to determine the number of characters in each word.</p>
                {renderTextarea('q9.3.3')}
                {renderAnswerSection('q9.3.3')}
            </div>

            <div className="question">
                <p><strong>9.3.4</strong> Give TWO ways to determine if words appear more than once in the spreadsheet.</p>
                {renderTextarea('q9.3.4')}
                {renderAnswerSection('q9.3.4')}
            </div>

            <div className="question">
                <p><strong>9.4</strong> Learners are encouraged to maintain a blog where they can write reviews on the books they have read.</p>
                <p><strong>9.4.1</strong> Give TWO advantages of using a blog rather than a website to share a book review.</p>
                {renderTextarea('q9.4.1')}
                {renderAnswerSection('q9.4.1')}
            </div>

            <div className="question">
                <p><strong>9.4.2</strong> Learners are required to reference the book they are reviewing in their blog. Other than the title, give TWO fields that should be included in the source to reference the book.</p>
                {renderTextarea('q9.4.2')}
                {renderAnswerSection('q9.4.2')}
            </div>

            <div className="question">
                <p><strong>9.5</strong> The chairperson of the book club keeps track of the frequency of the attendance and the number of books read by each member.</p>
                <p><strong>9.5.1</strong> Suggest the most suitable application to store the details of the members' attendance and reading progress.</p>
                {renderTextarea('q9.5.1')}
                {renderAnswerSection('q9.5.1')}
            </div>

            <div className="question">
                <p><strong>9.5.2</strong> A certificate will be issued for each member who attends more than 80% of the meetings. Name the word processing feature that can be used to generate multiple certificates using one data source.</p>
                {renderTextarea('q9.5.2')}
                {renderAnswerSection('q9.5.2')}
            </div>

            <div className="question">
                <p><strong>9.5.3</strong> Give TWO possible reasons why the printer stopped working halfway through printing the certificates.</p>
                {renderTextarea('q9.5.3')}
                {renderAnswerSection('q9.5.3')}
            </div>

            <h3>QUESTION 10: INTEGRATED SCENARIO</h3>
            <div className="question">
                <p><strong>10.1</strong> Mrs Khumalo has five computers in the administration area.</p>
                <p><strong>10.1.1</strong> Give TWO reasons why you would recommend a wireless network for this day-care centre.</p>
                {renderTextarea('q10.1.1')}
                {renderAnswerSection('q10.1.1')}
            </div>

            <div className="question">
                <p><strong>10.1.2</strong> What hardware does the day-care centre need to be able to connect a desktop computer to an existing wireless network?</p>
                {renderTextarea('q10.1.2')}
                {renderAnswerSection('q10.1.2')}
            </div>

            <div className="question">
                <p><strong>10.1.3</strong> Give TWO disadvantages of using a network.</p>
                {renderTextarea('q10.1.3')}
                {renderAnswerSection('q10.1.3')}
            </div>

            <div className="question">
                <p><strong>10.1.4</strong> Give TWO reasons why you would advise Mrs Khumalo NOT to set up a public hotspot at the day-care centre.</p>
                {renderTextarea('q10.1.4')}
                {renderAnswerSection('q10.1.4')}
            </div>

            <div className="question">
                <p><strong>10.2</strong> Some parents donated old computers which the day-care centre can use to teach the children computer literacy and to access online educational software.</p>
                <p><strong>10.2.1</strong> Suggest TWO reasons why you would recommend that the day-care centre uses open-source software (OSS) to teach computer literacy.</p>
                {renderTextarea('q10.2.1')}
                {renderAnswerSection('q10.2.1')}
            </div>

            <div className="question">
                <p><strong>10.2.2</strong> Which measure can teachers take to prevent children from being exposed to sensitive content on the internet?</p>
                {renderTextarea('q10.2.2')}
                {renderAnswerSection('q10.2.2')}
            </div>

            <div className="question">
                <p><strong>10.3</strong> You advise Mrs Khumalo to make regular backups either locally or in the cloud.</p>
                <p><strong>10.3.1</strong> Give ONE reason why it is important to make regular backups.</p>
                {renderTextarea('q10.3.1')}
                {renderAnswerSection('q10.3.1')}
            </div>

            <div className="question">
                <p><strong>10.3.2</strong> Explain TWO benefits of using cloud-based storage instead of using the device on which you are working to backup data.</p>
                {renderTextarea('q10.3.2')}
                {renderAnswerSection('q10.3.2')}
            </div>

            <div className="question">
                <p><strong>10.4</strong> Mrs Khumalo received the following message on her computer:</p>
                <img src="placeholder-malware-image" alt="Malware message" />
                <p><strong>10.4.1</strong> Name the type of malware found in the example above.</p>
                {renderTextarea('q10.4.1')}
                {renderAnswerSection('q10.4.1')}
            </div>

            <div className="question">
                <p><strong>10.4.2</strong> Give TWO reasons why the person who sent this message prefers payment in cryptocurrency.</p>
                {renderTextarea('q10.4.2')}
                {renderAnswerSection('q10.4.2')}
            </div>

            <div className="question">
                <p><strong>10.4.3</strong> Cryptocurrencies use blockchain technology. Explain what blockchain technology is.</p>
                {renderTextarea('q10.4.3')}
                {renderAnswerSection('q10.4.3')}
            </div>

            <div className="question">
                <p><strong>10.5</strong> You advised Mrs Khumalo to include a QR code on her business card.</p>
                <p><strong>10.5.1</strong> Give TWO reasons why QR codes can be used to promote her business.</p>
                {renderTextarea('q10.5.1')}
                {renderAnswerSection('q10.5.1')}
            </div>

            <div className="question">
                <p><strong>10.5.2</strong> How can she ensure that the QR code will always automatically appear in the newly created word processing documents?</p>
                {renderTextarea('q10.5.2')}
                {renderAnswerSection('q10.5.2')}
            </div>

            <div className="question">
                <p><strong>10.6</strong> A parent donated a 3D printer to the day-care centre.</p>
                <p><strong>10.6.1</strong> State TWO ways in which Mrs Khumalo can use the 3D printer at the day-care centre to promote the education of young children.</p>
                {renderTextarea('q10.6.1')}
                {renderAnswerSection('q10.6.1')}
            </div>

            <div className="question">
                <p><strong>10.6.2</strong> Discuss TWO reasons why Mrs Khumalo should NOT use the 3D printer in the presence of children.</p>
                {renderTextarea('q10.6.2')}
                {renderAnswerSection('q10.6.2')}
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
                    border: 1px solid #ddd;
                    padding: 10px;
                }

                .correct {
                    border-color: green;
                }

                .incorrect {
                    border-color: red;
                }

                .status {
                    font-weight: bold;
                }

                .solution-button {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    cursor: pointer;
                }

                .revealed-answer {
                    background-color: #e9f7ef;
                    padding: 10px;
                    margin-top: 10px;
                }

                .submit-button {
                    background-color: #2196F3;
                    color: white;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .score-display {
                    margin-top: 20px;
                    text-align: center;
                }

                .pass {
                    color: green;
                }

                .fail {
                    color: red;
                }


                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 20px;
                }
                /*.retry-button, .exit-button {
                    padding: 10px;
                    margin: 10px;
                    cursor: pointer;
                }*/
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
            `}</style>
        </div>
);
};

export default CatP2Nov2022;