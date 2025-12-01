import React, { useState, useEffect } from 'react';
import '../QP3.css';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import image5 from './image5.png';
import image6 from './image6.png';

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
    title: 'Life Orientation Grade 12 - September 2024 (English)',
    sections: [
        // SECTION A
        {
            name: 'SECTION A (COMPULSORY)',
            questions: [
                {
                    id: '1.1',
                    type: 'mcq',
                    question: '1.1 Various options are provided as possible answers to the following questions. Choose the answer and write only the letter (A–D) next to the question numbers (1.1.1 to 1.1.5) in the ANSWER BOOK, e.g. 1.1.6 D.',
                    subquestions: [
                        {
                            id: '1.1.1',
                            q: 'In a job contract, a probation period could refer to a cycle where …',
                            options: [
                                'A: new workers reserve the right to receive salary increases.',
                                'B: employers reserve the right to adjust the role of workers.',
                                'C: new workers are permitted to receive full work benefits.',
                                'D: employers finalise the skills training of new workers.'
                            ],
                            correct: 'B',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.2',
                            q: 'A health-related intervention programme refers to a …',
                            options: [
                                'A: set of guidelines assessing healthy living.',
                                'B: research process to study health risk factors.',
                                'C: strategy to monitor people\'s health risks.',
                                'D: set of activities targeting health risk factors.'
                            ],
                            correct: 'D',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.3',
                            q: 'Public participation in a democracy is the process where ...',
                            options: [
                                'A: decisions are made based on the views of local councillors to influence government actions.',
                                'B: citizens provide feedback on decision-making to influence government policies.',
                                'C: citizens share views with others on social media platforms regarding government policies.',
                                'D: powerful individuals hold meetings to discuss personal opinions on government issues.'
                            ],
                            correct: 'B',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.4',
                            q: 'Writing a reflection on a project should mainly focus on:',
                            options: [
                                'A: A detailed description of the objectives of the topic',
                                'B: The advantages of the various peer reviews of the task',
                                'C: How the task enhanced your knowledge of the topic',
                                'D: A detailed description of your understanding of the task'
                            ],
                            correct: 'C',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.5',
                            q: 'When a question instructs you to \'illustrate your answer with a case study\', you are then expected to …',
                            options: [
                                'A: refer to specific examples supporting your point.',
                                'B: provide a detailed analysis of theoretical concepts.',
                                'C: make judgements based on your personal opinion.',
                                'D: summarise your findings based on your responses.'
                            ],
                            correct: 'A',
                            maxMarks: 1
                        }
                    ]
                },
                {
                    id: '1.2',
                    type: 'term',
                    question: '1.2 Give ONE word/term for each of the following descriptions. Write only the word/term next to the question numbers (1.2.1 to 1.2.3) in the ANSWER BOOK.',
                    subquestions: [
                        {
                            id: '1.2.1',
                            q: 'The purposeful spreading of misleading information to advance a certain political cause or philosophy',
                            keywords: ['propaganda'],
                            maxMarks: 1
                        },
                        {
                            id: '1.2.2',
                            q: 'A formal organisation of workers that participates in collective bargaining on behalf of its members in the workplace',
                            keywords: ['trade union', 'union'],
                            maxMarks: 1
                        },
                        {
                            id: '1.2.3',
                            q: 'A form of favouritism whereby close friends or associates are given positions of power, regardless of their qualifications',
                            keywords: ['nepotism', 'favoritism'],
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
                            q: 'State TWO possible financial challenges for an upcoming social entrepreneur.',
                            keywords: ['funding', 'capital', 'loans', 'investors'],
                            maxMarks: 2
                        },
                        {
                            id: '1.3.2',
                            q: 'Explain the term redress in the workplace.',
                            keywords: ['correct', 'injustices', 'equity', 'affirmative'],
                            maxMarks: 2
                        },
                        {
                            id: '1.3.3',
                            q: 'Discuss the benefit of taking a gap year, when deciding on a final career choice.',
                            keywords: ['explore', 'experience', 'clarity', 'maturity'],
                            maxMarks: 2
                        }
                    ]
                },
                {
                    id: '1.4',
                    type: 'short',
                    question: '1.4 Read the source below and answer the questions that follow. Write your answers in full sentences.',
                    image: image1,
                    subquestions: [
                        {
                            id: '1.4.1',
                            q: 'Describe ONE social benefit of including recreational activities in a personal lifestyle plan.',
                            keywords: ['social', 'connections', 'community', 'friendships'],
                            maxMarks: 2
                        },
                        {
                            id: '1.4.2',
                            q: 'Explain how following a consistent exercise routine could contribute to your mental well-being.',
                            keywords: ['stress', 'mood', 'endorphins', 'anxiety'],
                            maxMarks: 2
                        },
                        {
                            id: '1.4.3',
                            q: 'Discuss ONE possible advantage of following a balanced nutritional plan on a person\'s long-term physical health.',
                            keywords: ['prevent', 'diseases', 'energy', 'strong'],
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
                    question: 'QUESTION 2 Read the extract below and answer the questions that follow.',
                    image: image2,
                    subquestions: [
                        {
                            id: '2.1',
                            q: 'Define the term lifestyle diseases.',
                            keywords: ['non-communicable', 'chronic', 'diabetes', 'heart'],
                            maxMarks: 2
                        },
                        {
                            id: '2.2',
                            q: 'Describe ONE way in which being part of a fitness group may motivate you to stay committed to participating in physical activities.',
                            keywords: ['accountability', 'encouragement', 'support'],
                            maxMarks: 2
                        },
                        {
                            id: '2.3',
                            q: 'Explain ONE environmental factor that may discourage you from engaging in physical activities.',
                            keywords: ['facilities', 'safety', 'pollution', 'weather'],
                            maxMarks: 2
                        },
                        {
                            id: '2.4',
                            q: 'Discuss how long-term participation in physical activity could increase your energy levels.',
                            keywords: ['circulation', 'endurance', 'stamina', 'hormones'],
                            maxMarks: 4
                        },
                        {
                            id: '2.5',
                            q: 'How could being physically active prevent you from turning to harmful substances when you experience difficulties in life?',
                            keywords: ['coping', 'distraction', 'endorphins', 'resilience'],
                            maxMarks: 4
                        },
                        {
                            id: '2.6',
                            q: 'Assess the importance of proper planning when committing to an action plan to improve your health. In EACH answer, also indicate how it may increase the likelihood of succeeding in your plan.',
                            keywords: ['goals', 'realistic', 'monitor', 'adjust', 'motivate'],
                            maxMarks: 6
                        }
                    ]
                },
                {
                    id: '3',
                    type: 'short',
                    question: 'QUESTION 3 Read the extract below and answer the questions that follow.',
                    image: image3,
                    subquestions: [
                        {
                            id: '3.1',
                            q: 'Define the term recruitment trends.',
                            keywords: ['methods', 'selection', 'technology', 'hiring'],
                            maxMarks: 2
                        },
                        {
                            id: '3.2',
                            q: 'Describe ONE way in which young job seekers may risk their chances of being considered for an interview.',
                            keywords: ['errors', 'incomplete', 'generic', 'documents'],
                            maxMarks: 2
                        },
                        {
                            id: '3.3',
                            q: 'Why is it important for young workers to continually upskill themselves in a job?',
                            keywords: ['competitive', 'advancement', 'adapt', 'technology'],
                            maxMarks: 2
                        },
                        {
                            id: '3.4',
                            q: 'Discuss TWO ways in which you, as a young job seeker, could ensure that you keep up with the latest recruitment trends.',
                            keywords: ['research', 'network', 'platforms', 'update'],
                            maxMarks: 4
                        },
                        {
                            id: '3.5',
                            q: 'How could having a personal brand enhance your chances of finding a job?',
                            keywords: ['professional', 'unique', 'network', 'impression'],
                            maxMarks: 4
                        },
                        {
                            id: '3.6',
                            q: 'Assess TWO advantages of the latest trends in technology used for recruitment processes. In EACH answer, also indicate the benefit for you as a job seeker.',
                            keywords: ['efficiency', 'access', 'global', 'speed'],
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
                    question: 'QUESTION 4 Read the extract below and answer the questions that follow. Write paragraphs on human factors causing ill health: social factors.',
                    image: image4,
                    subquestions: [
                        {
                            id: '4.1',
                            q: 'Briefly state FOUR possible social factors that may lead to stereotyping.',
                            keywords: ['race', 'gender', 'age', 'class'],
                            maxMarks: 4
                        },
                        {
                            id: '4.2',
                            q: 'Analyse TWO negative effects of a social factor, such as stereotyping, on the mental health of victims of stereotyping.',
                            keywords: ['anxiety', 'depression', 'low esteem', 'isolation'],
                            maxMarks: 8
                        },
                        {
                            id: '4.3',
                            q: 'Critically discuss how a person could determine whether he/she may be unintentionally stereotyping others.',
                            keywords: ['reflect', 'awareness', 'bias', 'question'],
                            maxMarks: 8
                        }
                    ]
                },
                {
                    id: '5',
                    type: 'essay',
                    question: 'QUESTION 5 Read the extract below and answer the questions that follow. Write paragraphs on entrepreneurship.',
                    image: image5,
                    subquestions: [
                        {
                            id: '5.1',
                            q: 'Briefly state FOUR reasons why entrepreneurs should be innovative.',
                            keywords: ['competitive', 'growth', 'problems', 'adapt'],
                            maxMarks: 4
                        },
                        {
                            id: '5.2',
                            q: 'Analyse TWO ways in which you could acquire the mindset of an entrepreneur.',
                            keywords: ['risk', 'resilient', 'creative', 'network'],
                            maxMarks: 8
                        },
                        {
                            id: '5.3',
                            q: 'Critically discuss how a young entrepreneur\'s passion could influence other young people in his/her community to become entrepreneurs.',
                            keywords: ['inspire', 'role model', 'motivate', 'success'],
                            maxMarks: 8
                        }
                    ]
                },
                {
                    id: '6',
                    type: 'essay',
                    question: 'QUESTION 6 Read the extract below and answer the questions that follow. Write paragraphs on the responsibility of communities in ensuring safe and healthy living environments.',
                    image: image6,
                    subquestions: [
                        {
                            id: '6.1',
                            q: 'Briefly state FOUR advantages of online petitioning to local governments for urgent action in terms of the water crisis in communities.',
                            keywords: ['quick', 'wide reach', 'cost effective', 'awareness'],
                            maxMarks: 4
                        },
                        {
                            id: '6.2',
                            q: 'Analyse TWO ways in which communities could work together with local government to help protect water resources.',
                            keywords: ['education', 'monitoring', 'reporting', 'campaigns'],
                            maxMarks: 8
                        },
                        {
                            id: '6.3',
                            q: 'Critically discuss TWO ways in which to ensure the sustainability of intervention programmes that intend to promote safe and healthy living.',
                            keywords: ['community', 'funding', 'monitoring', 'education'],
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
const Orenti: React.FC = () => {
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
export default Orenti;