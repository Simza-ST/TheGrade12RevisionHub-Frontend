import React, { useState, useEffect } from 'react';
import Header from './Header';
import Instructions from './Instructions';
import SectionTitle from './SectionTitle';
import Question1 from './Question1';
import Question2 from './Question2';
import Question3 from './Question3';
import Question4 from './Question4';
import Question5 from './Question5';
import Question6 from './Question6';

function HistoryP2Nov2021() {
    const [isExamSubmitted, setIsExamSubmitted] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [examResults, setExamResults] = useState({
        score: 0,
        percentage: 0,
        timeSpent: '00:00:00',
        answeredQuestions: 0
    });
    const [finalTimeSpent, setFinalTimeSpent] = useState('00:00:00');
    const [showSolutions, setShowSolutions] = useState(false);
    const [currentTime, setCurrentTime] = useState('00:00:00');

    // Question marking states
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [questionMarks, setQuestionMarks] = useState({});
    const [totalMarks, setTotalMarks] = useState(0);
    const [canSubmit, setCanSubmit] = useState(false);
    const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);

    // Updated keyword-based correct answers for the new question paper
    const correctAnswers = {
        // Question 1 keywords - UDF and Apartheid Reforms
        '1.1.1': ['mixed marriages', 'sex across colour line'],
        '1.1.2': ['reformulation', 'restructuring', 'cosmetic changes', 'white minority control'],
        '1.1.3': ['three-chamber parliament', 'white coloured indian', 'africans excluded'],
        '1.1.4': ['bantustans', 'municipal councils', 'white minority', 'protect privileges'],
        '1.1.5': ['remove members', 'appoint others', 'dismiss council', 'appoint new'],
        '1.2.1': ['historic moment', 'coalition groups', 'unity', 'freedom-loving'],
        '1.2.2': ['organisations deeply rooted', 'struggle for justice'],
        '1.2.3': ['homelands policy', '80% exclusion', 'divide and rule'],
        '1.2.4': ['allan boesak', '20 august 1983', 'udf launch', 'reliable source'],
        '1.3.1': ["don't vote", 'boycott elections', 'apartheid elections'],
        '1.3.2': ['forward to freedom', 'protest actions', 'mobilise unity'],
        '1.4': ['unity resistance', 'coalition groups', 'oppose apartheid'],
        '1.5.1': ['20% indian', '30% coloured'],
        '1.5.2': ['boycott', 'stay away', 'not vote'],
        '1.5.3': ['white voters', 'two-thirds', 'maintain power', 'privileges'],
        '1.5.4': ['us state department', 'step right direction', 'reforms'],
        '1.6': ['udf formed', 'oppose tricameral', 'boycott campaign', 'poor turnout', 'massive rejection'],

        // Question 2 keywords - TRC and Griffiths Mxenge
        '2.1.1': ['victim of violence', 'perpetrators give testimony'],
        '2.1.2': ['amnesty', 'official pardon', 'political crimes', 'truth disclosure'],
        '2.1.3': ['international news', 'restorative justice', 'human rights violations'],
        '2.1.4': ['bear witness', 'record', 'grant amnesty', 'reparation rehabilitation'],
        '2.1.5': ['1960 1994', 'sharpeville', 'liberation struggle', 'democratic south africa'],
        '2.1.6': ['politically motivated', 'whole truth'],
        '2.2.1': ['come forward', 'tell stories', 'human rights abuses'],
        '2.2.2': ['mother tortured', 'father murdered', 'not silent', 'speak out'],
        '2.2.3': ['reconciliation', 'peace harmony', 'forgive perpetrators'],
        '2.3.1': ['joe mamasela', 'almond nofomela', 'david tshikalanga'],
        '2.3.2': ['shift blame', 'bad reputation anc', 'conceal operations'],
        '2.3.3': ['first-hand information', 'dirk coetzee testimony', 'vlakaplaas commander'],
        '2.4': ['speak out', 'full disclosure', 'reconciliation amnesty'],
        '2.5.1': ['dirk coetzee', 'david tshikilanga', 'almond nofomela'],
        '2.5.2': ['advice command order', 'did not know mxenge', 'duty policemen'],
        '2.5.3': ['retributive justice', 'restorative justice', 'perpetrator friendly', 'family not consulted'],
        '2.6': ['trc investigation', 'amnesty application', 'whole truth', 'political motive', 'mxenge family opposition'],

        // Question 3 keywords - Covid-19 and Globalization
        '3.1.1a': ['world closely connected'],
        '3.1.1b': ['easily interact without barriers'],
        '3.1.2a': ['stimulated socio-economic development'],
        '3.1.2b': ['channel spread diseases'],
        '3.1.3': ['globalisation', 'world integrated', 'borders intertwined', 'technology'],
        '3.1.4': ['airplanes', 'ships', 'rail travel', 'traded goods', 'media spread'],
        '3.2.1': ['world health organisation', 'who'],
        '3.2.2': ['pandemic', 'global disease', 'all continents'],
        '3.2.3': ['prevent infection', 'reduce deaths', 'slow transmission', 'protect economy'],
        '3.2.4': ['italy', 'iran', 'south korea', 'spain', 'germany', 'united states', 'united kingdom', 'china'],
        '3.3.1': ['poverty', 'inequality'],
        '3.3.2': ['informal workers', 'unemployed', 'lockdown restrictions', 'street vendors'],
        '3.3.3': ['basic necessities', 'send children school', 'stay healthy', 'access healthcare'],
        '3.3.4': ['underdeveloped', 'overly populated', 'poor sanitation', 'lack running water', 'poor healthcare'],
        '3.3.5': ['one-sided views', 'impression lockdown wrong', 'only poor affected'],
        '3.4.1': ['rock hard place', 'covid poverty', 'two enemies', 'starvation infection'],
        '3.4.2': ['poverty hunger death', 'scared covid', 'threat livelihood'],
        '3.5': ['poverty heightened', 'hard lockdown', 'unemployment basic necessities', 'afraid worried'],
        '3.6': ['globalisation interconnected', 'travel bans lockdowns', 'job losses unemployment', 'poverty inequality', 'townships hotspots', 'apartheid legacy', 'rock hard place dilemma'],

        // Essay keywords
        'essay-biko': [
            'steve biko',
            'black consciousness',
            'saso',
            'sasm',
            'black peoples convention',
            'bpc',
            'psychological liberation',
            'black pride',
            'self-reliance',
            'nusas breakaway',
            'student mobilization',
            'soweto uprising',
            'hector petersen',
            'afrikaans medium',
            'bantu education',
            'community programmes',
            'zanempilo clinic',
            'black allied workers union',
            'bawu',
            'frelimo rallies',
            'banning orders',
            'police custody death'
        ],
        'essay-negotiations': [
            'nelson mandela release',
            'unbanning anc pac',
            'groote schuur minute',
            'pretoria minute',
            'national peace accord',
            'codesa 1',
            'codesa 2',
            'declaration of intent',
            'whites referendum',
            'boipatong massacre',
            'bisho massacre',
            'record of understanding',
            'sunset clause',
            'joe slovo',
            'meyer ramaphosa',
            'government national unity',
            'awb storming',
            'chris hani assassination',
            'shell house massacre',
            '1994 elections',
            'anc np ifp',
            'mandela president',
            'compromise commitment',
            'political violence',
            'third force',
            'democratic transition'
        ],
        'essay-cold-war': [
            'mikhail gorbachev',
            'perestroika',
            'glasnost',
            'soviet union collapse',
            'end cold war',
            'communism threat',
            'berlin wall',
            'western pressure',
            'sanctions',
            'cuito cuanavale',
            'sadf defeat',
            'namibia independence',
            'swapo',
            'anc np cooperation',
            'fw de klerk',
            'unbanning organisations',
            'soviet support ended',
            'armed struggle',
            'financial military aid',
            'cold war dynamics',
            'anti-communist stance',
            'negotiations transition'
        ]
    };

    // Check if user has written answers for at least 3 questions from the entire paper
    const checkAnsweredQuestions = () => {
        const answeredQuestionsSet = new Set();

        console.log("=== Checking Answered Questions ===");

        // Check all questions
        for (let i = 1; i <= 6; i++) {
            const questionElement = document.getElementById(`question-${i}`);
            if (!questionElement) {
                console.log(`Question ${i} not found`);
                continue;
            }

            let questionAnswered = false;

            // Check for answer spaces (source questions)
            const answerSpaces = questionElement.querySelectorAll('.answer-space');
            answerSpaces.forEach((space) => {
                const content = (space.textContent || '').trim();
                if (content &&
                    content !== 'Write your answer here...' &&
                    content !== 'Write your paragraph here (about 80 words)...' &&
                    content.length > 5) {
                    questionAnswered = true;
                }
            });

            // Check for essay spaces (essay questions)
            const essaySpaces = questionElement.querySelectorAll('.essay-space');
            essaySpaces.forEach((space) => {
                const content = (space.textContent || '').trim();
                if (content &&
                    content !== 'Write your essay here...' &&
                    content !== 'Write your essay here... (Approximately 400-600 words)' &&
                    content.length > 10) {
                    questionAnswered = true;
                }
            });

            if (questionAnswered) {
                answeredQuestionsSet.add(i);
                console.log(`✅ Question ${i} marked as answered`);
            }
        }

        const answeredArray = Array.from(answeredQuestionsSet).sort((a, b) => a - b);
        console.log("Final answered questions:", answeredArray);

        setAnsweredQuestions(answeredArray);
        setAnsweredQuestionsCount(answeredArray.length);
        setCanSubmit(answeredArray.length >= 3);

        return answeredArray.length;
    };

    // Calculate marks based on keyword matching and content quality
    const calculateQuestionMarks = () => {
        const newQuestionMarks = {};

        answeredQuestions.forEach(questionNum => {
            let totalScore = 0;
            let maxPossibleScore = 0;

            const questionElement = document.getElementById(`question-${questionNum}`);
            if (!questionElement) return;

            // Get all answer spaces for this question
            const answerSpaces = questionElement.querySelectorAll('.answer-space, .essay-space');

            answerSpaces.forEach((answerSpace) => {
                const userAnswer = (answerSpace.textContent || '').trim();

                // Skip if no answer provided
                if (!userAnswer ||
                    userAnswer === 'Write your answer here...' ||
                    userAnswer === 'Write your essay here...' ||
                    userAnswer === 'Write your paragraph here (about 80 words)...' ||
                    userAnswer === 'Write your essay here... (Approximately 400-600 words)') {
                    return;
                }

                // Calculate score based on content quality
                const wordCount = userAnswer.split(/\s+/).filter(word => word.length > 0).length;
                const hasKeywords = checkForKeywords(questionNum, userAnswer);

                // Different scoring for essays vs source-based questions
                if (answerSpace.classList.contains('essay-space')) {
                    // Essay scoring (more weight on content length and structure)
                    let essayScore = Math.min(50, Math.floor(wordCount / 8)); // Base score from length
                    if (hasKeywords) essayScore += 15; // Bonus for relevant keywords
                    if (wordCount > 300) essayScore += 10; // Bonus for comprehensive answers
                    if (wordCount > 500) essayScore += 10; // Extra bonus for very comprehensive answers

                    totalScore += Math.min(essayScore, 50);
                    maxPossibleScore += 50;
                } else {
                    // Source-based question scoring
                    let sourceScore = Math.min(10, Math.floor(wordCount / 5)); // Base score from length
                    if (hasKeywords) sourceScore += 5; // Bonus for relevant keywords

                    totalScore += Math.min(sourceScore, 10);
                    maxPossibleScore += 10;
                }
            });

            // Calculate final mark for the question (out of 50)
            if (maxPossibleScore > 0) {
                const percentage = (totalScore / maxPossibleScore) * 100;
                // Convert to out of 50 scale
                newQuestionMarks[questionNum] = Math.round((percentage / 100) * 50);
            } else {
                newQuestionMarks[questionNum] = 0;
            }
        });

        setQuestionMarks(newQuestionMarks);
        return newQuestionMarks;
    };

    // Check for relevant keywords in answers
    const checkForKeywords = (questionNum, userAnswer) => {
        const userAnswerLower = userAnswer.toLowerCase();
        let foundKeywords = 0;
        let totalKeywords = 0;

        // Get relevant keywords for this question
        const questionKeywords = [];
        for (const [key, keywords] of Object.entries(correctAnswers)) {
            if (key.startsWith(`${questionNum}.`) ||
                (questionNum >= 4 && key.startsWith('essay'))) {
                questionKeywords.push(...keywords);
            }
        }

        totalKeywords = questionKeywords.length;
        if (totalKeywords === 0) return false;

        questionKeywords.forEach(keyword => {
            if (userAnswerLower.includes(keyword)) {
                foundKeywords++;
            }
        });

        return foundKeywords >= Math.ceil(totalKeywords * 0.3); // At least 30% of relevant keywords
    };

    // Calculate total marks
    const calculateTotalMarks = () => {
        const marks = calculateQuestionMarks();
        const total = answeredQuestions.reduce((sum, questionNum) => {
            return sum + (marks[questionNum] || 0);
        }, 0);
        setTotalMarks(total);
        return total;
    };

    // Enhanced monitoring with multiple detection methods
    useEffect(() => {
        let intervalId;

        // Initial check after components mount
        const initialCheck = setTimeout(() => {
            checkAnsweredQuestions();
        }, 2000);

        // Set up periodic checking
        intervalId = setInterval(() => {
            checkAnsweredQuestions();
        }, 3000);

        // Mutation observer for content changes
        const observer = new MutationObserver((mutations) => {
            let shouldCheck = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'characterData' || mutation.type === 'childList') {
                    shouldCheck = true;
                }
            });
            if (shouldCheck) {
                setTimeout(checkAnsweredQuestions, 100);
            }
        });

        // Observe all contenteditable elements
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach((element) => {
            observer.observe(element, {
                characterData: true,
                childList: true,
                subtree: true
            });
        });

        // Event listeners for user interaction
        const handleInput = () => {
            setTimeout(checkAnsweredQuestions, 500);
        };

        const handleKeyUp = () => {
            setTimeout(checkAnsweredQuestions, 300);
        };

        document.addEventListener('input', handleInput);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            clearTimeout(initialCheck);
            clearInterval(intervalId);
            observer.disconnect();
            document.removeEventListener('input', handleInput);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Handle time update from Header component
    const handleTimeUpdate = (timeSpent) => {
        setCurrentTime(timeSpent);
    };

    // Handle time up from Header component
    const handleTimeUp = (timeSpent) => {
        setFinalTimeSpent(timeSpent);
        setIsExamSubmitted(true);
    };

    // Auto-submit when time is up
    useEffect(() => {
        if (isExamSubmitted && !showResults) {
            handleSubmit();
        }
    }, [isExamSubmitted, showResults]);

    // Show solution buttons after submission
    const showSolutionButtons = () => {
        const solutionButtons = document.querySelectorAll('.btn-view-solution');
        solutionButtons.forEach(button => {
            button.classList.add('show-solution');
        });
        setShowSolutions(true);
    };

    // Hide solution buttons initially
    const hideSolutionButtons = () => {
        const solutionButtons = document.querySelectorAll('.btn-view-solution');
        solutionButtons.forEach(button => {
            button.classList.remove('show-solution');
        });
    };

    // Initialize essay placeholders
    const initializeEssayPlaceholders = () => {
        document.querySelectorAll('.essay-space').forEach(space => {
            if (!space.getAttribute('data-placeholder')) {
                space.setAttribute('data-placeholder', 'Write your essay here...');
            }
            if (space.textContent.trim() === '') {
                space.innerHTML = '';
            }
        });
    };

    // Initialize - hide solution buttons and setup placeholders
    useEffect(() => {
        hideSolutionButtons();
        initializeEssayPlaceholders();
    }, []);

    // South African themed motivational messages
    const getMotivationalMessage = (percentage) => {
        if (percentage >= 90) {
            return "🇿🇦 Ubuntu in Excellence! Your understanding of our nation's journey reflects deep insight and empathy. Like the leaders who shaped our democracy, you demonstrate wisdom and comprehensive understanding of our shared history.";
        } else if (percentage >= 80) {
            return "🌟 Proudly South African Scholar! Your analysis shows remarkable understanding of our complex history. You're developing the critical thinking needed to contribute to our nation's ongoing story.";
        } else if (percentage >= 70) {
            return "💪 Building Our Future Through Understanding Our Past! Your strong performance demonstrates good grasp of South Africa's historical journey. Continue to explore different perspectives to deepen your understanding.";
        } else if (percentage >= 60) {
            return "🌍 Understanding Our Place in History! You're developing the skills to analyze our nation's past with increasing sophistication. Remember that understanding history helps us build a better future.";
        } else if (percentage >= 50) {
            return "📚 Laying Foundations for Historical Understanding! You have the basic knowledge of our nation's journey. As you continue learning, you'll see how understanding our past informs our present and future.";
        } else if (percentage >= 40) {
            return "🔍 Beginning to Unpack Our History! The study of South Africa's past requires courage and openness. Each step in understanding helps us appreciate the complexity of our nation's story.";
        } else {
            return "🌱 Planting Seeds of Historical Awareness! Our nation's history is rich with lessons. This beginning marks your entry into understanding the forces that have shaped modern South Africa.";
        }
    };

    // Reset functionality
    const resetExam = () => {
        if (window.confirm('Are you sure you want to reset the exam? This will clear all your answers and restart the timer.')) {
            document.querySelectorAll('.answer-space').forEach(space => {
                space.innerHTML = '';
            });

            document.querySelectorAll('.essay-space').forEach(space => {
                space.innerHTML = '';
            });

            document.querySelectorAll('.solution-space').forEach(space => {
                space.style.display = 'none';
            });

            document.querySelectorAll('.answer-feedback').forEach(feedback => {
                feedback.remove();
            });

            // Reset question states
            setAnsweredQuestions([]);
            setQuestionMarks({});
            setTotalMarks(0);
            setCanSubmit(false);
            setAnsweredQuestionsCount(0);

            setShowResults(false);
            setIsExamSubmitted(false);
            setShowSolutions(false);
            setFinalTimeSpent('00:00:00');
            setCurrentTime('00:00:00');
            setExamResults({
                score: 0,
                percentage: 0,
                timeSpent: '00:00:00',
                answeredQuestions: 0
            });

            hideSolutionButtons();
            initializeEssayPlaceholders();

            // Reload to reset timer completely
            window.location.reload();
        }
    };

    // Dashboard functionality
    const showDashboard = () => {
        const currentResults = {
            marks: {
                total: examResults.score,
                percentage: examResults.percentage + '%',
                timeSpent: examResults.timeSpent
            },
            motivation: getMotivationalMessage(examResults.percentage),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem('currentExamResults', JSON.stringify(currentResults));
        alert('Dashboard feature would open here! Current results saved to localStorage.');
    };

    // Save submission data
    const saveSubmissionData = (totalMarks, percentage, timeSpent) => {
        const submissionData = {
            answers: {},
            marks: {
                total: totalMarks,
                percentage: percentage,
                timeSpent: timeSpent
            },
            timestamp: new Date().toISOString(),
            questionMarks: questionMarks,
            answeredQuestions: answeredQuestions,
            totalMarks: totalMarks
        };

        document.querySelectorAll('.answer-space, .essay-space').forEach((space, index) => {
            submissionData.answers[`answer_${index}`] = space.innerHTML;
        });

        localStorage.setItem('historyExamSubmission', JSON.stringify(submissionData));
    };

    const handleSubmit = () => {
        // Check if user has written at least 3 questions from the entire paper
        const answeredCount = checkAnsweredQuestions();
        if (answeredCount < 3) {
            alert(`You need to answer at least 3 questions from the entire question paper before submitting. Currently you have answered ${answeredCount} questions.`);
            return;
        }

        // Calculate total marks automatically
        const calculatedTotal = calculateTotalMarks();
        const percentage = Math.round((calculatedTotal / 150) * 100);

        // Use finalTimeSpent if available (from timeout), otherwise use currentTime (from manual submit)
        const timeSpent = finalTimeSpent !== '00:00:00' ? finalTimeSpent : currentTime;

        setExamResults({
            score: calculatedTotal,
            percentage: percentage,
            timeSpent: timeSpent,
            answeredQuestions: answeredCount
        });

        setShowResults(true);
        setIsExamSubmitted(true);
        showSolutionButtons();

        // Save to localStorage
        saveSubmissionData(calculatedTotal, percentage, timeSpent);

        console.log('Final marks calculation:', {
            totalMarks: calculatedTotal,
            percentage: percentage + '%',
            timeSpent: timeSpent,
            answeredQuestions: answeredQuestions,
            questionMarks: questionMarks
        });
    };

    return (
        <div className="app">
            {/* 1. Header with the titles and timer */}
            <Header
                onTimeUp={handleTimeUp}
                onTimeUpdate={handleTimeUpdate}
                isExamSubmitted={isExamSubmitted}
            />

            {/* 2. List of Instructions and Information */}
            <Instructions />

            {/* 3. Section Title for Source-Based Questions */}
            <SectionTitle
                title="SECTION A: SOURCE-BASED QUESTIONS"
                description="Answer at least ONE question from this section. Source material is integrated below."
            />

            {/* 4. Question 1 Component */}
            <Question1
                isAnswered={answeredQuestions.includes(1)}
            />

            {/* 5. Question 2 Component */}
            <Question2
                isAnswered={answeredQuestions.includes(2)}
            />

            {/* 6. Question 3 Component */}
            <Question3
                isAnswered={answeredQuestions.includes(3)}
            />

            {/* 7. Section Title for Essay Questions */}
            <SectionTitle
                title="SECTION B: ESSAY QUESTIONS"
                description="Answer at least ONE question from this section."
            />

            {/* 8. Question 4 Component - Steve Biko and Black Consciousness */}
            <Question4
                isAnswered={answeredQuestions.includes(4)}
            />

            {/* 9. Question 5 Component - Negotiations and Democracy */}
            <Question5
                isAnswered={answeredQuestions.includes(5)}
            />

            {/* 10. Question 6 Component - Cold War and New World Order */}
            <Question6
                isAnswered={answeredQuestions.includes(6)}
            />

            {/* Progress Section */}
            <div className="progress-section full-width">
                <h3>📊 Exam Progress</h3>

                <div className="progress-info">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${Math.min((answeredQuestionsCount / 3) * 100, 100)}%` }}
                        ></div>
                    </div>

                    <p className="progress-text">
                        <strong>Questions Answered: {answeredQuestionsCount}/3</strong>
                    </p>

                    {answeredQuestions.length > 0 && (
                        <p className="answered-questions">
                            Answered Questions: {answeredQuestions.join(', ')}
                        </p>
                    )}

                    <div className={`submission-validation ${canSubmit ? 'valid' : 'invalid'}`}>
                        <p className="validation-message">
                            {canSubmit
                                ? `✅ Ready to submit! You have answered ${answeredQuestionsCount} questions.`
                                : `⚠️ You need to answer at least 3 questions from the entire question paper to submit. Currently: ${answeredQuestionsCount}/3`
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* Submit Button - Only show if exam not submitted */}
            {!isExamSubmitted && (
                <div className="submit-section full-width">
                    <button
                        className={`btn btn-submit ${!canSubmit ? 'btn-disabled' : ''}`}
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                    >
                        {canSubmit ? 'Submit Exam' : `Complete 3 Questions to Submit (${answeredQuestionsCount}/3)`}
                    </button>
                </div>
            )}

            {/* Time's Up Warning */}
            {isExamSubmitted && !showResults && (
                <div className="time-up-warning full-width">
                    <h3>⏰ Time's Up! Submitting your exam...</h3>
                </div>
            )}

            {/* Submission Results - Now appears below the answer sheet */}
            {showResults && (
                <div className="submission-results full-width">
                    <div className="results-header">
                        <h2>
                            {finalTimeSpent && finalTimeSpent !== '00:00:00' ?
                                '⏰ Time\'s Up! Exam Auto-Submitted' : '📝 Exam Submitted Successfully!'}
                        </h2>
                        <p>✅ View Solution buttons are now available for each question. Scroll up to review your answers and see model solutions.</p>
                    </div>

                    <div className="result-summary">
                        <div className="result-item">
                            <span className="result-label">Total Marks:</span>
                            <span className="result-value">{examResults.score}</span>/150
                        </div>
                        <div className="result-item">
                            <span className="result-label">Percentage:</span>
                            <span className="result-value">{examResults.percentage}%</span>
                        </div>
                        <div className="result-item">
                            <span className="result-label">Time Spent:</span>
                            <span className="result-value">{examResults.timeSpent}</span>
                        </div>
                        <div className="result-item">
                            <span className="result-label">Questions Answered:</span>
                            <span className="result-value">{examResults.answeredQuestions}</span>
                        </div>
                    </div>

                    {/* Marking Breakdown - Only show after submission */}
                    {answeredQuestions.length > 0 && (
                        <div className="marking-breakdown">
                            <h3>📝 Marking Breakdown (Each question out of 50)</h3>
                            <div className="marks-grid">
                                {answeredQuestions.map(questionNum => (
                                    <div key={questionNum} className="mark-breakdown-item">
                                        <span className="question-number">Question {questionNum}</span>
                                        <span className="question-marks">{questionMarks[questionNum] || 0}/50</span>
                                        <div className="marks-bar">
                                            <div
                                                className="marks-fill"
                                                style={{ width: `${((questionMarks[questionNum] || 0) / 50) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="total-marks-display">
                                <div className="total-marks">
                                    <strong>Total Marks: {totalMarks}/150</strong>
                                    <span className="percentage">({((totalMarks / 150) * 100).toFixed(1)}%)</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="motivation-message">
                        {getMotivationalMessage(examResults.percentage)}
                    </div>

                    <div className="results-buttons">
                        <button className="btn btn-reset" onClick={resetExam}>
                            🔄 Reset Exam
                        </button>
                        <button className="btn btn-dashboard" onClick={showDashboard}>
                            📊 View Dashboard
                        </button>
                    </div>
                </div>
            )}
            <style jsx>
                {`

                    /* Reset and base styles */
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }

                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f5f5f5;
                        min-height: 100vh;
                    }

                    .app {
                        width: 100%;
                        margin: 0 auto;
                        padding: 20px;
                        background: white;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                        min-height: 100vh;
                    }

                    .full-width {
                        width: 100%;
                    }

                    /* Header Styles */
                    .exam-header {
                        background: linear-gradient(135deg, #2c3e50, #34495e);
                        color: white;
                        padding: 30px;
                        border-radius: 10px;
                        margin-bottom: 30px;
                        text-align: center;
                        width: 100%;
                    }

                    .exam-title {
                        font-size: 2.5em;
                        margin-bottom: 10px;
                        font-weight: 700;
                    }

                    .exam-subtitle {
                        font-size: 1.3em;
                        margin-bottom: 20px;
                        opacity: 0.9;
                    }

                    .timer-section {
                        background: rgba(255,255,255,0.1);
                        padding: 15px;
                        border-radius: 8px;
                        margin-top: 20px;
                        width: 100%;
                    }

                    .timer {
                        font-size: 2em;
                        font-weight: bold;
                        font-family: 'Courier New', monospace;
                    }

                    .timer-warning {
                        color: #e74c3c;
                        animation: pulse 1s infinite;
                    }

                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }

                    /* Instructions Styles */
                    .instructions {
                        background: #e8f4f8;
                        border-left: 5px solid #3498db;
                        padding: 25px;
                        margin-bottom: 30px;
                        border-radius: 8px;
                        width: 100%;
                    }

                    .instructions h2 {
                        color: #2c3e50;
                        margin-bottom: 15px;
                    }

                    .instructions-list {
                        list-style: none;
                        padding-left: 0;
                        width: 100%;
                    }

                    .instructions-list li {
                        padding: 8px 0;
                        border-bottom: 1px solid #bdc3c7;
                        width: 100%;
                    }

                    .instructions-list li:last-child {
                        border-bottom: none;
                    }

                    .instructions-list strong {
                        color: #e74c3c;
                    }

                    /* Section Title Styles */
                    .section-title {
                        background: #34495e;
                        color: white;
                        padding: 20px;
                        margin: 40px 0 20px 0;
                        border-radius: 8px;
                        text-align: center;
                        width: 100%;
                    }

                    .section-title h2 {
                        font-size: 1.8em;
                        margin-bottom: 10px;
                    }

                    .section-description {
                        font-size: 1.1em;
                        opacity: 0.9;
                    }

                    /* Question Styles */
                    .question {
                        background: white;
                        border: 2px solid #bdc3c7;
                        border-radius: 10px;
                        padding: 25px;
                        margin-bottom: 30px;
                        transition: all 0.3s ease;
                        width: 100%;
                    }

                    .question:hover {
                        border-color: #3498db;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    }

                    .essay-question {
                        border-color: #27ae60;
                        background: #f8fef8;
                        width: 100%;
                    }

                    .essay-question:hover {
                        border-color: #219653;
                        box-shadow: 0 5px 15px rgba(39, 174, 96, 0.2);
                    }

                    .question-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        margin-bottom: 20px;
                        width: 100%;
                    }

                    .question-text {
                        flex: 1;
                        font-size: 1.2em;
                        font-weight: 600;
                        color: #2c3e50;
                        line-height: 1.4;
                    }

                    .marks {
                        background: #e74c3c;
                        color: white;
                        padding: 5px 15px;
                        border-radius: 20px;
                        font-weight: bold;
                        margin-left: 15px;
                        white-space: nowrap;
                    }

                    .source-material {
                        background: #f8f9fa;
                        border: 1px solid #dee2e6;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                        font-style: italic;
                        color: #555;
                        line-height: 1.6;
                        width: 100%;
                    }

                    .source-reference {
                        text-align: right;
                        font-size: 0.9em;
                        color: #7f8c8d;
                        margin-top: 10px;
                        font-style: normal;
                    }

                    .source-title {
                        font-weight: bold;
                        color: #2c3e50;
                        margin-bottom: 10px;
                        font-size: 1.1em;
                        font-style: normal;
                    }

                    .subquestion {
                        margin: 25px 0;
                        padding: 20px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border-left: 4px solid #3498db;
                        width: 100%;
                    }

                    .subquestion-text {
                        font-weight: 600;
                        margin-bottom: 15px;
                        color: #2c3e50;
                        line-height: 1.5;
                    }

                    /* Answer Space Styles */
                    .answer-space {
                        min-height: 80px;
                        border: 2px dashed #bdc3c7;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 15px 0;
                        background: #fafafa;
                        transition: all 0.3s ease;
                        cursor: text;
                        outline: none;
                        line-height: 1.5;
                        width: 100%;
                    }

                    .answer-space:focus {
                        border-color: #3498db;
                        background: white;
                        box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
                    }

                    .answer-space[data-placeholder]:empty:before {
                        content: attr(data-placeholder);
                        color: #95a5a6;
                        font-style: italic;
                    }

                    .answer-space.large {
                        min-height: 120px;
                    }

                    .essay-space {
                        min-height: 300px;
                        border: 2px dashed #27ae60;
                        background: #f0f8f0;
                        padding: 20px;
                        margin: 15px 0;
                        border-radius: 8px;
                        transition: all 0.3s ease;
                        cursor: text;
                        outline: none;
                        line-height: 1.6;
                        font-family: inherit;
                        width: 100%;
                    }

                    .essay-space:focus {
                        border-color: #219653;
                        background: white;
                        box-shadow: 0 0 10px rgba(39, 174, 96, 0.3);
                    }

                    .essay-space[data-placeholder]:empty:before {
                        content: attr(data-placeholder);
                        color: #95a5a6;
                        font-style: italic;
                    }

                    .essay-space.large {
                        min-height: 400px;
                    }

                    /* Cartoon/Image Placeholder */
                    .cartoon-placeholder {
                        text-align: center;
                        margin: 20px 0;
                        padding: 20px;
                        background: #f8f9fa;
                        border: 2px dashed #bdc3c7;
                        border-radius: 8px;
                        font-style: italic;
                        color: #7f8c8d;
                        width: 100%;
                    }

                    .cartoon-placeholder img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 5px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }

                    /* Question Marking Section */
                    .question-marking-section {
                        background-color: #e8f5e8;
                        padding: 15px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                        border: 2px solid #28a745;
                        width: 100%;
                    }

                    .question-marking-section .mark-input {
                        margin-bottom: 10px;
                    }

                    .question-marking-section label {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-weight: bold;
                        font-size: 16px;
                    }

                    .question-marking-section input {
                        padding: 8px 12px;
                        width: 80px;
                        border: 2px solid #007bff;
                        border-radius: 4px;
                        font-size: 16px;
                        font-weight: bold;
                    }

                    .marks-display {
                        margin-top: 10px;
                        padding: 10px;
                        background-color: #d4edda;
                        border-radius: 4px;
                        border: 1px solid #c3e6cb;
                        font-weight: bold;
                        color: #155724;
                    }

                    /* Progress Section Styles */
                    .progress-section {
                        background-color: #e3f2fd;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 20px 0;
                        border: 2px solid #2196F3;
                        width: 100%;
                    }

                    .progress-bar {
                        width: 100%;
                        height: 20px;
                        background-color: #e0e0e0;
                        border-radius: 10px;
                        overflow: hidden;
                        margin: 10px 0;
                    }

                    .progress-fill {
                        height: 100%;
                        background-color: #4CAF50;
                        transition: width 0.3s ease;
                    }

                    .progress-text {
                        font-size: 16px;
                        margin: 10px 0;
                        font-weight: bold;
                    }

                    .answered-questions {
                        color: #666;
                        font-style: italic;
                        margin: 5px 0;
                    }

                    /* Marking Section Styles */
                    .marking-section {
                        margin-top: 20px;
                        padding: 20px;
                        background: #f8f9fa;
                        border-radius: 8px;
                        border: 2px solid #28a745;
                        width: 100%;
                    }

                    .marking-section h4 {
                        color: #2c3e50;
                        margin-bottom: 15px;
                        font-size: 1.2em;
                    }

                    .mark-input-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 0;
                        border-bottom: 1px solid #dee2e6;
                        width: 100%;
                    }

                    .mark-input-item:last-child {
                        border-bottom: none;
                    }

                    .mark-input-item label {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-weight: bold;
                        color: #2c3e50;
                    }

                    .mark-input-item input {
                        padding: 8px 12px;
                        width: 80px;
                        border: 2px solid #007bff;
                        border-radius: 4px;
                        font-size: 16px;
                        font-weight: bold;
                        text-align: center;
                    }

                    .mark-input-item input:focus {
                        border-color: #0056b3;
                        box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
                        outline: none;
                    }

                    .mark-display {
                        background: #d4edda;
                        padding: 6px 12px;
                        border-radius: 4px;
                        color: #155724;
                        font-weight: bold;
                        font-size: 0.9em;
                    }

                    .total-section {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 2px solid #007bff;
                        text-align: center;
                        width: 100%;
                    }

                    .total-marks {
                        margin-top: 15px;
                        padding: 20px;
                        background: #007bff;
                        color: white;
                        border-radius: 8px;
                        font-size: 1.3em;
                        font-weight: bold;
                        width: 100%;
                    }

                    .total-marks span {
                        display: block;
                        font-size: 0.8em;
                        opacity: 0.9;
                        margin-top: 5px;
                    }

                    /* Submission Validation */
                    .submission-validation {
                        margin: 20px 0;
                        padding: 15px;
                        border-radius: 8px;
                        font-weight: bold;
                        width: 100%;
                    }

                    .submission-validation.valid {
                        background-color: #d4edda;
                        border: 2px solid #c3e6cb;
                    }

                    .submission-validation.invalid {
                        background-color: #f8d7da;
                        border: 2px solid #f5c6cb;
                    }

                    .validation-message {
                        margin: 0;
                        font-size: 1.1em;
                    }

                    .validation-message.valid {
                        color: #155724;
                    }

                    .validation-message.invalid {
                        color: #721c24;
                    }

                    /* Debug Button */
                    .btn-debug {
                        padding: 8px 16px;
                        margin: 10px 0;
                        font-size: 12px;
                        background-color: #6c757d;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background-color 0.3s ease;
                    }

                    .btn-debug:hover {
                        background-color: #5a6268;
                    }

                    /* Solution Styles */
                    .solution-space {
                        display: none;
                        background: #e8f6f3;
                        border: 2px solid #27ae60;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 15px 0;
                        line-height: 1.6;
                        width: 100%;
                    }

                    .solution-space.show {
                        display: block;
                        animation: slideDown 0.5s ease;
                    }

                    @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    .solution-header {
                        color: #27ae60;
                        font-weight: bold;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        font-size: 1.1em;
                    }

                    .solution-space p {
                        margin-bottom: 10px;
                    }

                    .solution-space strong {
                        color: #2c3e50;
                    }

                    /* Button Styles */
                    .btn {
                        padding: 12px 25px;
                        border: none;
                        border-radius: 6px;
                        font-size: 1em;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        margin: 5px;
                        font-family: inherit;
                    }

                    .btn-view-solution {
                        background: #27ae60;
                        color: white;
                        display: none;
                    }

                    .btn-view-solution.show-solution {
                        display: inline-block;
                    }

                    .btn-view-solution:hover {
                        background: #219653;
                        transform: translateY(-2px);
                    }

                    .btn-submit {
                        background: #e74c3c;
                        color: white;
                        font-size: 1.2em;
                        padding: 15px 40px;
                    }

                    .btn-submit:hover {
                        background: #c0392b;
                        transform: translateY(-2px);
                    }

                    .btn-submit:disabled,
                    .btn-disabled {
                        background: #6c757d !important;
                        cursor: not-allowed !important;
                        opacity: 0.6;
                        transform: none !important;
                    }

                    .btn-submit:disabled:hover,
                    .btn-disabled:hover {
                        background: #6c757d !important;
                        transform: none !important;
                    }

                    .btn-reset {
                        background: #95a5a6;
                        color: white;
                    }

                    .btn-reset:hover {
                        background: #7f8c8d;
                    }

                    .btn-dashboard {
                        background: #3498db;
                        color: white;
                    }

                    .btn-dashboard:hover {
                        background: #2980b9;
                    }

                    .btn-calculate {
                        background: #2196F3;
                        color: white;
                        padding: 10px 20px;
                        font-size: 1em;
                    }

                    .btn-calculate:hover {
                        background: #1976D2;
                        transform: translateY(-2px);
                    }

                    .submit-section {
                        text-align: center;
                        margin: 40px 0;
                        padding: 30px;
                        background: #f8f9fa;
                        border-radius: 10px;
                        width: 100%;
                    }

                    /* Results Styles */
                    .submission-results {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        padding: 40px;
                        border-radius: 15px;
                        margin: 40px 0;
                        text-align: center;
                        width: 100%;
                    }

                    .results-header h2 {
                        font-size: 2.2em;
                        margin-bottom: 15px;
                    }

                    .result-summary {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                        margin: 30px 0;
                        width: 100%;
                    }

                    .result-item {
                        background: rgba(255,255,255,0.1);
                        padding: 20px;
                        border-radius: 10px;
                        backdrop-filter: blur(10px);
                    }

                    .result-label {
                        display: block;
                        font-size: 0.9em;
                        opacity: 0.8;
                        margin-bottom: 5px;
                    }

                    .result-value {
                        font-size: 2em;
                        font-weight: bold;
                    }

                    /* Question Marks Breakdown */
                    .marking-breakdown {
                        background: rgba(255,255,255,0.1);
                        padding: 25px;
                        border-radius: 10px;
                        margin: 25px 0;
                        backdrop-filter: blur(10px);
                        width: 100%;
                    }

                    .marking-breakdown h3 {
                        font-size: 1.3em;
                        margin-bottom: 15px;
                        color: white;
                    }

                    .marks-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                        gap: 12px;
                        margin-top: 15px;
                        width: 100%;
                    }

                    .mark-breakdown-item {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 12px 15px;
                        background: rgba(255,255,255,0.2);
                        border-radius: 6px;
                        font-weight: 500;
                    }

                    .marks-bar {
                        width: 80px;
                        height: 8px;
                        background: rgba(255,255,255,0.3);
                        border-radius: 4px;
                        overflow: hidden;
                        margin-left: 10px;
                    }

                    .marks-fill {
                        height: 100%;
                        background: #4CAF50;
                        transition: width 0.5s ease;
                    }

                    .total-marks-display {
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid rgba(255,255,255,0.3);
                        width: 100%;
                    }

                    .total-marks {
                        font-size: 1.5em;
                        font-weight: bold;
                    }

                    .percentage {
                        font-size: 0.8em;
                        opacity: 0.8;
                        margin-left: 10px;
                    }

                    .motivation-message {
                        font-size: 1.2em;
                        line-height: 1.8;
                        margin: 30px 0;
                        padding: 20px;
                        background: rgba(255,255,255,0.1);
                        border-radius: 10px;
                        border-left: 5px solid #f39c12;
                        width: 100%;
                    }

                    .results-buttons {
                        display: flex;
                        gap: 15px;
                        justify-content: center;
                        flex-wrap: wrap;
                        width: 100%;
                    }

                    .time-up-warning {
                        background: #e74c3c;
                        color: white;
                        padding: 20px;
                        border-radius: 10px;
                        text-align: center;
                        margin: 20px 0;
                        animation: pulse 2s infinite;
                        width: 100%;
                    }

                    /* Answer Feedback */
                    .answer-feedback {
                        padding: 10px 15px;
                        border-radius: 6px;
                        margin: 10px 0;
                        font-weight: bold;
                        width: 100%;
                    }

                    .excellent-score {
                        background: #d5f4e6;
                        color: #27ae60;
                        border-left: 4px solid #27ae60;
                    }

                    .good-score {
                        background: #d6eaf8;
                        color: #3498db;
                        border-left: 4px solid #3498db;
                    }

                    .average-score {
                        background: #fcf3cf;
                        color: #f39c12;
                        border-left: 4px solid #f39c12;
                    }

                    .poor-score {
                        background: #fadbd8;
                        color: #e74c3c;
                        border-left: 4px solid #e74c3c;
                    }

                    .score-display {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        flex-wrap: wrap;
                    }

                    .score {
                        font-size: 1.1em;
                    }

                    .score-percentage {
                        font-size: 0.9em;
                        opacity: 0.8;
                    }

                    .keyword-info {
                        font-size: 0.8em;
                        opacity: 0.7;
                        font-weight: normal;
                    }

                    /* Responsive Design */
                    @media (max-width: 1200px) {
                        .app {
                            padding: 15px;
                        }
                    }

                    @media (max-width: 768px) {
                        .app {
                            padding: 10px;
                        }

                        .exam-title {
                            font-size: 2em;
                        }

                        .question-header {
                            flex-direction: column;
                            align-items: flex-start;
                        }

                        .marks {
                            align-self: flex-start;
                            margin: 10px 0 0 0;
                        }

                        .result-summary {
                            grid-template-columns: 1fr;
                        }

                        .results-buttons {
                            flex-direction: column;
                        }

                        .btn {
                            width: 100%;
                            margin: 5px 0;
                        }

                        .mark-input-item {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 8px;
                        }

                        .mark-input-item label {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 5px;
                        }

                        .mark-input-item input {
                            width: 100%;
                            max-width: 120px;
                        }

                        .progress-section,
                        .marking-section {
                            padding: 15px;
                        }

                        .marks-grid {
                            grid-template-columns: 1fr;
                        }

                        .mark-breakdown-item {
                            flex-direction: column;
                            gap: 5px;
                            text-align: center;
                        }

                        .question-marking-section label {
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 5px;
                        }

                        .question-marking-section input {
                            width: 100%;
                            max-width: 120px;
                        }

                        .submission-results {
                            padding: 20px;
                        }
                    }

                    @media (max-width: 480px) {
                        .app {
                            padding: 5px;
                        }

                        .exam-header {
                            padding: 20px;
                        }

                        .exam-title {
                            font-size: 1.8em;
                        }

                        .question {
                            padding: 15px;
                        }

                        .submission-results {
                            padding: 15px;
                        }

                        .result-item {
                            padding: 15px;
                        }

                        .solution-space {
                            padding: 15px;
                        }

                        .essay-space {
                            min-height: 250px;
                            padding: 15px;
                        }

                        .instructions {
                            padding: 15px;
                        }

                        .section-title {
                            padding: 15px;
                        }
                    }

                    /* Print Styles */
                    @media print {
                        .btn {
                            display: none !important;
                        }

                        .submit-section,
                        .progress-section,
                        .marking-section,
                        .question-marking-section {
                            display: none !important;
                        }

                        .answer-space,
                        .essay-space {
                            border: 1px solid #000 !important;
                            background: white !important;
                            min-height: auto !important;
                        }

                        .submission-results {
                            background: white !important;
                            color: black !important;
                            border: 2px solid #000;
                        }

                        .result-item {
                            background: #f8f9fa !important;
                            color: black !important;
                        }

                        .solution-space {
                            display: block !important;
                            border: 1px solid #000 !important;
                            background: white !important;
                        }
                    }

                    /* Accessibility Improvements */
                    @media (prefers-reduced-motion: reduce) {
                        * {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                    }

                    /* Focus styles for better accessibility */
                    .btn:focus,
                    .answer-space:focus,
                    .essay-space:focus {
                        outline: 2px solid #3498db;
                        outline-offset: 2px;
                    }

                    /* High contrast mode support */
                    @media (prefers-contrast: more) {
                        .answer-space {
                            border: 2px solid #000;
                        }

                        .essay-space {
                            border: 2px solid #006400;
                        }

                        .solution-space {
                            border: 2px solid #006400;
                        }
                    }

                `}
            </style>
        </div>
    );
}

export default HistoryP2Nov2021;