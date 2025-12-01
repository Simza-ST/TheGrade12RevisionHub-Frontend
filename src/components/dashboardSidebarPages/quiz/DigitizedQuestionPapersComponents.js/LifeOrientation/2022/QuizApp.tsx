import React, { useState, useEffect } from 'react';
import '../QP3.css';

import img1 from './sep2022One.png';
import img2 from './sep2022Two.png';
import img3 from './sep2022Three.png';
import img4 from './sep2022Four.png';
import img5 from './sep2022Five.png';
import img6 from './sep2022Six.png';

interface Answer {
    id: string;
    value: string;
}

interface SubQuestion {
    id: string;
    q: string;
    options?: string[];
    correct?: string;
    keywords?: string[];
    maxMarks: number;
}

interface Question {
    id: string;
    type: string;
    question: string;
    image?: string;
    subquestions: SubQuestion[];
}

interface Section {
    name: string;
    questions: Question[];
}

interface QuizData {
    title: string;
    sections: Section[];
}

interface Detail {
    id: string;
    marks: number;
    maxMarks: number;
    answer: string;
    keywords?: string[];
}

interface LeafSub {
    id: string;
    max: number;
    isMcq: boolean;
    keywords?: string[];
    correct?: string;
    selected: boolean;
    sectionIndex: number;
}

interface SectionScore {
    name: string;
    score: number;
    total: number;
    percentage: number;
}

const QUIZ_DATA: QuizData = {
    title: 'Life Orientation Grade 12 - September 2022 (English)',
    sections: [
        // SECTION A
        {
            name: 'SECTION A (COMPULSORY)',
            questions: [
                {
                    id: '1.1',
                    type: 'mcq',
                    question: '1.1 Various options are provided as possible answers to the following questions. Choose the correct answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.5) in the ANSWER BOOK.',
                    subquestions: [
                        {
                            id: '1.1.1',
                            q: 'When choosing a career, the most important aspect would be to …',
                            options: [
                                'A: evaluate the benefits and salary you may receive.',
                                'B: assess whether you will develop your full potential.',
                                'C: consider the geographical location of the workplace.',
                                'D: examine the hours you will have to spend working.'
                            ],
                            correct: 'B',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.2',
                            q: 'An important strategy to maintain an effective study plan could include ONE of the following:',
                            options: [
                                'A: Strictly follow all activities you set out to do',
                                'B: Organise all the required assessment tasks',
                                'C: Consider all relevant activities with time frames',
                                'D: Adapt certain activities to ensure progress'
                            ],
                            correct: 'D',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.3',
                            q: 'ONE of the main functions of the Commission for Conciliation Mediation and Arbitration (CCMA) is to …',
                            options: [
                                'A: facilitate the establishment of workplace forums.',
                                'B: organise legal and financial support for workers.',
                                'C: provide opportunities for promotion and growth.',
                                'D: inspire sincerity and discipline among workers.'
                            ],
                            correct: 'A',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.4',
                            q: 'Assessing an environmental project means to …',
                            options: [
                                'A: reduce your carbon footprint in order to prevent air pollution.',
                                'B: minimise the use of electricity and water in your household.',
                                'C: propose ways to source grey water when and where possible.',
                                'D: consider the effect of recycling waste on your community.'
                            ],
                            correct: 'D',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.5',
                            q: 'The following are examples of fitness exercises to strengthen your core muscles:',
                            options: [
                                'A: Push-ups, sprints and lunges',
                                'B: Skipping, crunches and squats',
                                'C: Crunches, sit-ups and push-ups',
                                'D: Sit-ups, skipping and sprints'
                            ],
                            correct: 'C',
                            maxMarks: 1
                        }
                    ]
                },
                {
                    id: '1.2',
                    type: 'term',
                    question: '1.2 Give ONE word/term for EACH of the following descriptions. Write only the word/term next to the question numbers (1.2.1 to 1.2.3) in the ANSWER BOOK.',
                    subquestions: [
                        {
                            id: '1.2.1',
                            q: 'A learning style allowing you to learn best by doing, moving and touching',
                            keywords: ['kinesthetic', 'tactile', 'hands-on'],
                            maxMarks: 1
                        },
                        {
                            id: '1.2.2',
                            q: 'A way of governance where the people of a country have the right to engage with and decide on legislation',
                            keywords: ['democracy', 'democratic'],
                            maxMarks: 1
                        },
                        {
                            id: '1.2.3',
                            q: 'An evidence-based research method used by the media to expose public matters concealed by people in power',
                            keywords: ['investigative journalism'],
                            maxMarks: 1
                        }
                    ]
                },
                {
                    id: '1.3',
                    type: 'short',
                    question: '1.3 Answer the following questions by writing the answer next to the question numbers (1.3.1 to 1.3.3) in the ANSWER BOOK. Write your answers in full sentences.',
                    subquestions: [
                        {
                            id: '1.3.1',
                            q: 'Differentiate between the responsibilities of national and provincial governments in ensuring safe and healthy living conditions for all citizens.',
                            keywords: ['national', 'provincial', 'responsibilities', 'safe', 'healthy'],
                            maxMarks: 2
                        },
                        {
                            id: '1.3.2',
                            q: 'Explain ONE way in which you could adapt community sports/games to accommodate people with different disabilities.',
                            keywords: ['adapt', 'accommodate', 'disabilities', 'sports', 'games'],
                            maxMarks: 2
                        },
                        {
                            id: '1.3.3',
                            q: 'Discuss ONE benefit of visualising the information that you study.',
                            keywords: ['visualise', 'benefit', 'study', 'information'],
                            maxMarks: 2
                        }
                    ]
                },
                {
                    id: '1.4',
                    type: 'short',
                    question: '1.4 Read the source below and answer the following questions. Write your answers in full sentences.',
                    image: img1,
                    subquestions: [
                        {
                            id: '1.4.1',
                            q: 'State TWO factors which may have shaped your belief system.',
                            keywords: ['family', 'education', 'culture', 'religion', 'experiences', 'peers'],
                            maxMarks: 2
                        },
                        {
                            id: '1.4.2',
                            q: 'Define the term ideologies.',
                            keywords: ['beliefs', 'systems', 'ideas', 'philosophies'],
                            maxMarks: 2
                        },
                        {
                            id: '1.4.3',
                            q: 'Suggest ONE way in which your belief system could influence your personal lifestyle choices. Motivate your answer.',
                            keywords: ['influence', 'lifestyle', 'choices', 'belief', 'motivate'],
                            maxMarks: 2
                        }
                    ]
                }
            ]
        },
        // SECTION B
        {
            name: 'SECTION B (COMPULSORY)',
            questions: [
                {
                    id: '2',
                    type: 'short',
                    question: 'QUESTION 2 - Read the extract below and answer the questions that follow.',
                    image: img2,
                    subquestions: [
                        {
                            id: '2.1',
                            q: 'Define the term job contract.',
                            keywords: ['agreement', 'employer', 'employee', 'terms', 'conditions', 'written'],
                            maxMarks: 2
                        },
                        {
                            id: '2.2',
                            q: 'State TWO ways in which trade unions could assist workers in addressing non-compliance with working conditions.',
                            keywords: ['negotiate', 'advocate', 'legal', 'support', 'strikes', 'representation'],
                            maxMarks: 2
                        },
                        {
                            id: '2.3',
                            q: 'Explain why the Basic Conditions of Employment Act (BCEA), 1997 (Act 75 of 1997) protects under-aged children from working in a formal work environment.',
                            keywords: ['protect', 'children', 'under-aged', 'exploitation', 'education', 'rights'],
                            maxMarks: 2
                        },
                        {
                            id: '2.4',
                            q: 'How could an employer assist a young worker to minimise the consequences of misreading or not reading a job contract?',
                            keywords: ['explain', 'clarify', 'training', 'discussion', 'support'],
                            maxMarks: 4
                        },
                        {
                            id: '2.5',
                            q: 'Assess TWO advantages for an employer who provides workers with a job contract.',
                            keywords: ['clarity', 'legal', 'protection', 'efficiency', 'trust'],
                            maxMarks: 4
                        },
                        {
                            id: '2.6',
                            q: 'Examine why it is important for a worker to review a job contract. In EACH answer, also indicate how reviewing it may benefit the worker.',
                            keywords: ['review', 'understand', 'rights', 'benefits', 'avoid', 'disputes'],
                            maxMarks: 6
                        }
                    ]
                },
                {
                    id: '3',
                    type: 'short',
                    question: 'QUESTION 3 - Read the extract below and answer the questions that follow.',
                    image: img3,
                    subquestions: [
                        {
                            id: '3.1',
                            q: 'Define the term human life cycle.',
                            keywords: ['stages', 'childhood', 'adolescence', 'adulthood', 'development'],
                            maxMarks: 2
                        },
                        {
                            id: '3.2',
                            q: 'Indicate how an adolescent could deal effectively with an identity crisis as part of the life cycle.',
                            keywords: ['identity', 'crisis', 'self-reflection', 'support', 'counseling'],
                            maxMarks: 2
                        },
                        {
                            id: '3.3',
                            q: 'Explain why it is important to have knowledge about the human life cycle.',
                            keywords: ['understanding', 'development', 'changes', 'preparation'],
                            maxMarks: 2
                        },
                        {
                            id: '3.4',
                            q: 'Discuss TWO possible reasons why most people may feel obligated to follow traditional practices.',
                            keywords: ['tradition', 'family', 'culture', 'obligation', 'identity'],
                            maxMarks: 4
                        },
                        {
                            id: '3.5',
                            q: 'Assess the role of the media in promoting tolerance for different traditional practices and/or views.',
                            keywords: ['media', 'promote', 'tolerance', 'diversity', 'awareness'],
                            maxMarks: 4
                        },
                        {
                            id: '3.6',
                            q: 'How could investigating other views and insights regarding life assist with your emotional development? In EACH answer, also indicate how this development could be key to success in all areas of your life.',
                            keywords: ['investigate', 'views', 'emotional', 'development', 'success', 'empathy'],
                            maxMarks: 6
                        }
                    ]
                }
            ]
        },
        // SECTION C
        {
            name: 'SECTION C (Answer any TWO)',
            questions: [
                {
                    id: '4',
                    type: 'essay',
                    question: 'QUESTION 4 - Read the extract below and answer the questions that follow. Write paragraphs on entrepreneurship and e-businesses.',
                    image: img4,
                    subquestions: [
                        {
                            id: '4.1',
                            q: 'State FOUR ways in which a value-based approach could guide an entrepreneur to run a successful e-business.',
                            keywords: ['values', 'ethics', 'integrity', 'customer focus', 'sustainability'],
                            maxMarks: 4
                        },
                        {
                            id: '4.2',
                            q: 'Analyse how entrepreneurs could use culture to stay competitive on current e-business platforms.',
                            keywords: ['culture', 'competitive', 'e-business', 'heritage', 'marketing', 'innovation'],
                            maxMarks: 8
                        },
                        {
                            id: '4.3',
                            q: 'Evaluate TWO factors within a cultural group that may have an impact on one\'s decision to become an entrepreneur.',
                            keywords: ['cultural', 'factors', 'entrepreneur', 'support', 'values', 'networks'],
                            maxMarks: 8
                        }
                    ]
                },
                {
                    id: '5',
                    type: 'essay',
                    question: 'QUESTION 5 - Read the extract below and answer the questions that follow. Write paragraphs on collaboration as a conflict resolution skill.',
                    image: img5,
                    subquestions: [
                        {
                            id: '5.1',
                            q: 'State FOUR reasons why it is important to consider non-verbal communication within a team.',
                            keywords: ['non-verbal', 'communication', 'team', 'understanding', 'emotions', 'trust'],
                            maxMarks: 4
                        },
                        {
                            id: '5.2',
                            q: 'Analyse how working from home in this new digital era may affect how you collaborate on a group project.',
                            keywords: [
                                'working from home',
                                'digital era',
                                'collaboration',
                                'group project',
                                'challenges',
                                'tools',
                                'communication',
                                'productivity',
                            ],
                            maxMarks: 8
                        },
                        {
                            id: '5.3',
                            q: 'Evaluate the importance of delegating as a collaborative skill in teamwork.',
                            keywords: [
                                'delegating',
                                'collaboration',
                                'teamwork',
                                'efficiency',
                                'trust',
                                'responsibility',
                                'leadership',
                            ],
                            maxMarks: 8
                        }
                    ]
                },
                {
                    id: '6',
                    type: 'essay',
                    question: 'QUESTION 6 - Read the extract below and answer the questions that follow. Write paragraphs on social media platforms and social media footprint.',
                    image: img6,
                    subquestions: [
                        {
                            id: '6.1',
                            q: 'State FOUR ways in which young people could manage their social media footprint more effectively.',
                            keywords: ['manage', 'footprint', 'privacy', 'settings', 'content', 'awareness'],
                            maxMarks: 4
                        },
                        {
                            id: '6.2',
                            q: 'Analyse TWO possible negative implications that spending time on social media during working hours may have for a work place.',
                            keywords: [
                                'social media',
                                'working hours',
                                'negative',
                                'implications',
                                'productivity',
                                'distraction',
                                'security',
                            ],
                            maxMarks: 8
                        },
                        {
                            id: '6.3',
                            q: 'Critically discuss why it is important for an employer to enforce limitations on the use of personal electronic devices in order to protect a company.',
                            keywords: [
                                'employer',
                                'limitations',
                                'devices',
                                'protect',
                                'company',
                                'data',
                                'productivity',
                                'policies',
                            ],
                            maxMarks: 8
                        }
                    ]
                }
            ]
        }
    ]
};

// -------------------------- HELPER FUNCTIONS --------------------------

const countKeywords = (answer: string, keywords: string[] | undefined): number => {
    if (!keywords || keywords.length === 0) return 0;
    const lowerAnswer = answer.toLowerCase();
    return keywords.filter(kw => lowerAnswer.includes(kw.toLowerCase())).length;
};

const collectLeafSubs = (items: (Question | SubQuestion)[], isSelected: boolean, allSubs: LeafSub[], sectionIndex: number) => {
    items.forEach(item => {
        if ('subquestions' in item && item.subquestions && item.subquestions.length > 0) {
            collectLeafSubs(item.subquestions, isSelected, allSubs, sectionIndex);
        } else {
            const isMcq = 'options' in item && !!item.options && item.options.length > 0;
            const max = 'maxMarks' in item ? item.maxMarks : 0;
            const keywords = isMcq ? undefined : ('keywords' in item ? item.keywords : undefined);
            const correct = isMcq ? ('correct' in item ? item.correct : undefined) : undefined;
            allSubs.push({ id: item.id, max, isMcq, keywords, correct, selected: isSelected, sectionIndex });
        }
    });
};

const calculateScore = (answers: Answer[], selectedSectionC: string[]): { score: number; total: number; details: Detail[]; sectionScores: SectionScore[] } => {
    const allSubs: LeafSub[] = [];

    // Section A & B always included
    collectLeafSubs(QUIZ_DATA.sections[0].questions, true, allSubs, 0);
    collectLeafSubs(QUIZ_DATA.sections[1].questions, true, allSubs, 1);

    // Section C selected questions only
    QUIZ_DATA.sections[2].questions.forEach(q => {
        const isSelected = selectedSectionC.includes(q.id);
        collectLeafSubs([q], isSelected, allSubs, 2);
    });

    let overallScore = 0;
    let overallTotal = 0;
    const details: Detail[] = [];
    const sectionTotals: { [key: number]: { score: number; total: number } } = { 0: { score: 0, total: 0 }, 1: { score: 0, total: 0 }, 2: { score: 0, total: 0 } };

    allSubs.forEach(sub => {
        if (sub.max > 0) {
            const ans = answers.find(a => a.id === sub.id);
            const userAnswer = ans ? ans.value : '';
            let marks = 0;

            if (userAnswer.trim() && sub.selected) {
                if (sub.isMcq) {
                    marks = userAnswer === sub.correct ? sub.max : 0;
                } else {
                    const matches = countKeywords(userAnswer, sub.keywords);
                    if (sub.keywords && sub.keywords.length > 0) {
                        marks = Math.min(matches, sub.keywords.length) * (sub.max / sub.keywords.length);
                    }
                }
            }

            details.push({ id: sub.id, marks, maxMarks: sub.max, answer: userAnswer, keywords: sub.keywords });

            if (sub.selected) {
                overallScore += marks;
                overallTotal += sub.max;
                sectionTotals[sub.sectionIndex].score += marks;
                sectionTotals[sub.sectionIndex].total += sub.max;
            }
        }
    });

    const sectionScores: SectionScore[] = QUIZ_DATA.sections.map((section, idx) => ({
        name: section.name,
        score: sectionTotals[idx].score,
        total: sectionTotals[idx].total,
        percentage: sectionTotals[idx].total > 0 ? Math.round((sectionTotals[idx].score / sectionTotals[idx].total) * 100) : 0
    }));

    return { score: overallScore, total: overallTotal, details, sectionScores };
};

// -------------------------- MAIN COMPONENT --------------------------

const QuizApp: React.FC = () => {
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedSectionC, setSelectedSectionC] = useState<string[]>(['4', '5']);
    const [timeLeft, setTimeLeft] = useState(9000);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (!showResults && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        alert('Time is up! Submitting quiz...');
                        submitQuiz();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showResults, timeLeft]);

    useEffect(() => {
        if (showResults) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else if (answers.length === 0) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [showResults, answers.length]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const updateAnswer = (id: string, value: string) => {
        setAnswers(prev => {
            const existing = prev.find(a => a.id === id);
            if (existing) return prev.map(a => (a.id === id ? { ...a, value } : a));
            return [...prev, { id, value }];
        });
    };

    const submitQuiz = () => {
        if (selectedSectionC.length !== 2) {
            alert('Please select exactly TWO questions from Section C to proceed.');
            return;
        }
        setShowResults(true);
    };

    const viewAnswers = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetQuiz = () => {
        setAnswers([]);
        setShowResults(false);
        setSelectedSectionC(['4', '5']);
        setTimeLeft(9000);
    };

    const scoreInfo = calculateScore(answers, selectedSectionC);
    const percentage = scoreInfo.total > 0 ? Math.round((scoreInfo.score / scoreInfo.total) * 100) : 0;

    // Always return all questions
    const getQuestionsToRender = (section: Section) => section.questions;

    const isQuestionSelected = (qId: string) => selectedSectionC.includes(qId);

    const renderSubQuestionInput = (sq: SubQuestion, qType: string, isDisabled: boolean = false) => {
        const currentValue = answers.find(a => a.id === sq.id)?.value || '';
        return (
            <div key={sq.id} className={`quiz-subquestion ${isDisabled ? 'disabled' : ''}`}>
                <p><strong>{sq.id}</strong> {sq.q}</p>
                {isDisabled ? (
                    <p className="disabled-note"><em>This question is not selected. Answers will not be scored.</em></p>
                ) : null}
                {qType === 'mcq' ? (
                    <div className="mcq-options">
                        {sq.options?.map((opt, idx) => {
                            const letter = String.fromCharCode(65 + idx);
                            const cleanOpt = opt.replace(/^[A-D]:\s*/, '');
                            return (
                                <label key={idx} className="mcq-label">
                                    <input
                                        type="radio"
                                        name={sq.id}
                                        value={letter}
                                        checked={currentValue === letter}
                                        onChange={e => updateAnswer(sq.id, e.target.value)}
                                        disabled={isDisabled}
                                    />
                                    {letter}: {cleanOpt}
                                </label>
                            );
                        })}
                    </div>
                ) : qType === 'term' || qType === 'short' ? (
                    <input
                        type="text"
                        placeholder={isDisabled ? "Not selected" : "Your answer..."}
                        value={currentValue}
                        onChange={e => updateAnswer(sq.id, e.target.value)}
                        className="text-input"
                        disabled={isDisabled}
                    />
                ) : (
                    <textarea
                        placeholder={isDisabled ? "Not selected" : "Your detailed answer (paragraphs)..."}
                        value={currentValue}
                        onChange={e => updateAnswer(sq.id, e.target.value)}
                        className="long-input"
                        rows={4}
                        disabled={isDisabled}
                    />
                )}
            </div>
        );
    };

    const renderSubQuestionResult = (sq: SubQuestion, qType: string, isUnselected?: boolean) => {
        const userAns = answers.find(a => a.id === sq.id)?.value || '';
        const detail = scoreInfo.details.find(d => d.id === sq.id);
        const marks = detail ? detail.marks : 0;
        const maxM = detail ? detail.maxMarks : 0;
        const isMcq = sq.options && sq.options.length > 0;
        const correctLetter = isMcq ? sq.correct : '';
        const isCorrect = isMcq && userAns && userAns === correctLetter;
        const isFullMarks = marks === maxM;
        let answerDisplay = '';

        if (isMcq) {
            if (userAns) {
                answerDisplay = `${userAns} ${isCorrect ? '(Correct)' : '(Incorrect)'} ${!isCorrect ? `| Correct: ${correctLetter}` : ''}`;
            } else {
                answerDisplay = `Not answered (Incorrect) | Correct: ${correctLetter}`;
            }
        }

        return (
            <div key={sq.id} className="quiz-subquestion">
                <p><strong>{sq.id}</strong> {sq.q}</p>
                {isUnselected ? (
                    <p><em>Not answered</em></p>
                ) : isMcq ? (
                    <div>
                        <p><strong>Your Answer:</strong> {answerDisplay}</p>
                        <div className="mcq-options">
                            {sq.options?.map((opt, oIdx) => {
                                const letter = String.fromCharCode(65 + oIdx);
                                const cleanOpt = opt.replace(/^[A-D]:\s*/, '');
                                const selected = userAns === letter;
                                const isRight = letter === correctLetter;
                                let className = 'mcq-label';
                                if (selected && isRight) className += ' selected correct-option';
                                else if (isRight) className += ' correct-option';
                                else if (selected) className += ' selected incorrect-option';
                                return (
                                    <label key={oIdx} className={className}>
                                        {letter}: {cleanOpt}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div>
                        <p><strong>Your Answer:</strong></p>
                        <textarea
                            value={userAns}
                            readOnly
                            className={`long-input ${!userAns.trim() ? 'empty' : ''} ${isFullMarks ? 'correct-answer' : ''}`}
                            rows={Math.max(userAns.split('\n').length + 1, 4)}
                        />
                    </div>
                )}
                <p><strong>Marks:</strong> {marks} / {maxM} {isFullMarks ? '(Full Marks)' : ''}</p>
                {!isMcq && sq.keywords && sq.keywords.length > 0 && !isUnselected && (
                    <details>
                        <summary>Marking Keywords</summary>
                        <p>Keywords: {sq.keywords.join(', ')}</p>
                        <p>Matched: {countKeywords(userAns, sq.keywords)} out of {sq.keywords.length}</p>
                    </details>
                )}
            </div>
        );
    };

    const renderUnselectedQuestion = (q: Question) => (
        <div className="quiz-question unselected">
            <h3>{q.id} {q.question} (Not Answered - 0 Marks)</h3>
            {q.subquestions.map((sq: SubQuestion) => renderSubQuestionResult(sq, q.type, true))}
        </div>
    );

    const renderQuestion = (q: Question, qIdx: number, sIdx: number) => {
        const isSelected = sIdx === 2 ? isQuestionSelected(q.id) : true;
        if (showResults && sIdx === 2 && !isSelected) {
            return renderUnselectedQuestion(q);
        }
        return (
            <div key={qIdx} className={`quiz-question ${!isSelected && sIdx === 2 && !showResults ? 'disabled-question' : ''}`}>
                <h3>{q.id} {q.question}</h3>

                {/* Render question image if available */}
                {q.image && (
                    <div className="question-image-wrapper">
                        <img src={q.image} alt={`Source for ${q.id}`} className="qp-image" />
                    </div>
                )}

                {q.subquestions.map((sq: SubQuestion) =>
                    showResults
                        ? renderSubQuestionResult(sq, q.type, !isSelected)
                        : renderSubQuestionInput(sq, q.type, !isSelected)
                )}
            </div>
        );
    };

    return (
        <div className="quiz-app">
            <header className="quiz-header">
                <h1>{QUIZ_DATA.title}</h1>
                <p>Marks: 100 | {!showResults ? `Time left: ${formatTime(timeLeft)}` : 'Time: 2½ hours'}</p>
            </header>

            <main className="quiz-main">
                {QUIZ_DATA.sections.map((section, sIdx) => (
                    <section key={sIdx} className="quiz-section">
                        <h2>{section.name} {sIdx === 2 ? `(Answered: ${selectedSectionC.join(', ')})` : ''}</h2>
                        {getQuestionsToRender(section).map((q, qIdx) =>
                            renderQuestion(q, qIdx, sIdx)
                        )}
                        {!showResults && sIdx === 2 && (
                            <div className="section-c-selector">
                                <p>Select any TWO questions:</p>
                                {section.questions.map(q => {
                                    const val = q.id;
                                    const isChecked = selectedSectionC.includes(val);
                                    return (
                                        <label key={val}>
                                            <input
                                                type="checkbox"
                                                value={val}
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    setSelectedSectionC(prev => {
                                                        if (e.target.checked) {
                                                            if (prev.length >= 2 && !prev.includes(val)) return prev;
                                                            return [...new Set([...prev, val])];
                                                        } else {
                                                            return prev.filter(p => p !== val);
                                                        }
                                                    });
                                                }}
                                            />
                                            {q.question}
                                        </label>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                ))}
                {!showResults && <button onClick={submitQuiz} className="submit-btn">Submit Quiz</button>}

                {showResults && (
                    <div className="quiz-results">
                        <h2>Quiz Results</h2>
                        <div className="total-score">
                            <p><strong>Your Total Score:</strong> {Math.round(scoreInfo.score)} / {scoreInfo.total} ({percentage}%)</p>
                            {percentage >= 50 ? <p className="pass">Passed! Well done.</p> : <p className="fail">Keep studying!</p>}
                        </div>

                        <div className="section-scores-summary">
                            <h3>Marks per Section</h3>
                            {scoreInfo.sectionScores.map((secScore, idx) => (
                                <div key={idx} className="section-score-item">
                                    <strong>{secScore.name}:</strong> {Math.round(secScore.score)} / {secScore.total} ({secScore.percentage}%)
                                </div>
                            ))}
                        </div>

                        <div className="results-actions">
                            <button onClick={viewAnswers} className="view-answers-btn">View Answers</button>
                            <button onClick={resetQuiz} className="reset-btn">Retry Quiz</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default QuizApp;