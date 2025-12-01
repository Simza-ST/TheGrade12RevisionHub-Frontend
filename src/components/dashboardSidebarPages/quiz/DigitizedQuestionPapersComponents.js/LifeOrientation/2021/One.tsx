import React, { useState, useEffect } from 'react';
import '../QP3.css';
import img1 from './sep2021One.png';
import img2 from './sep2021Two.png';
import img3 from './sep2021Three.png';
import img4 from './sep2021Four.png';
import img5 from './sep2021Five.png';
import img6 from './sep2021Six.png';

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
    title: 'Life Orientation Grade 12 - September 2021 (English)',
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
                            q: 'A function of the National Benchmark Test (NBT) could be to …',
                            options: [
                                'A: determine a potential candidate\'s abilities, strengths and weaknesses to follow a specific field of study.',
                                'B: advise students on what type of financial aid they can access, based on the test results.',
                                'C: assess whether potential students qualify for regular entry or extended programmes in a specific course.',
                                'D: enable tertiary institutions to place students in any other field of study that may be available at the time.'
                            ],
                            correct: 'C',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.2',
                            q: 'Embezzlement is an illegal act of …',
                            options: [
                                'A: obtaining money, goods or property by deceiving other people.',
                                'B: getting something, especially money, by force or threats.',
                                'C: giving or receiving a free reward to influence someone\'s actions.',
                                'D: secretly taking money that belongs to the company you work for.'
                            ],
                            correct: 'D',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.3',
                            q: 'Examples of health-related components of fitness:',
                            options: [
                                'A: Body composition, muscular endurance and reaction time',
                                'B: Muscular endurance, cardiovascular fitness and flexibility',
                                'C: Coordination, cardiovascular fitness and muscular strength',
                                'D: Cardiovascular fitness, flexibility and body composition'
                            ],
                            correct: 'B',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.4',
                            q: 'An evaluation of an impact study is done to …',
                            options: [
                                'A: secure all the resources needed to complete the intervention.',
                                'B: identify the steps needed to conduct that specific intervention.',
                                'C: decide who will be in charge of carrying out the intervention.',
                                'D: determine the changes as a result of a particular intervention.'
                            ],
                            correct: 'D',
                            maxMarks: 1
                        },
                        {
                            id: '1.1.5',
                            q: 'The Employment Equity Act (EEA), 1998 (Act 55 of 1998) intends to regulate …',
                            options: [
                                'A: psychological testing and assessment of potential employees.',
                                'B: the right of workers not to be locked out from the workplace while striking.',
                                'C: employee participation in decision-making through workplace forums.',
                                'D: employment of young children under the minimum school-leaving age.'
                            ],
                            correct: 'A',
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
                            q: 'A condition that can be avoided by drinking water regularly during physical education activities',
                            keywords: ['dehydration'],
                            maxMarks: 1
                        },
                        {
                            id: '1.2.2',
                            q: 'The term describing a person who shows exceptional ability, knowledge and common sense about using modern technology',
                            keywords: ['cyber savvy', 'tech savvy'],
                            maxMarks: 1
                        },
                        {
                            id: '1.2.3',
                            q: 'The ability to maintain a controlled body position during a dance movement',
                            keywords: ['balance'],
                            maxMarks: 1
                        }
                    ]
                },
                {
                    id: '1.3',
                    type: 'short',
                    question: '1.3 Answer the following questions by writing the answer next to the question numbers (1.3.1 to 1.3.4) in the ANSWER BOOK. Write your answers in full sentences.',
                    subquestions: [
                        {
                            id: '1.3.1',
                            q: 'Give TWO examples of possible gender inequality practices in the work place.',
                            keywords: ['unequal pay', 'objectifying', 'stereotyping', 'discrimination', 'barriers'],
                            maxMarks: 2
                        },
                        {
                            id: '1.3.2',
                            q: 'Explain why smoking of cigarettes may have a negative effect on your physical appearance.',
                            keywords: ['discoloration', 'wrinkles', 'hair loss', 'weight loss', 'stains'],
                            maxMarks: 2
                        },
                        {
                            id: '1.3.3',
                            q: 'Why do you think municipalities should amend by-laws regularly?',
                            keywords: ['changes', 'relevant', 'safety', 'effective', 'protection'],
                            maxMarks: 2
                        },
                        {
                            id: '1.3.4',
                            q: 'Discuss the importance of setting achievable health and fitness goals.',
                            keywords: ['motivated', 'realistic', 'progress', 'accountable', 'focus'],
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
                            q: 'Explain why entrepreneurs should be risk-takers.',
                            keywords: ['success', 'opportunities', 'innovative', 'confidence', 'growth'],
                            maxMarks: 2
                        },
                        {
                            id: '1.4.2',
                            q: 'Recommend ONE way in which a potential entrepreneur could determine if a business opportunity will be financially viable. Motivate your answer.',
                            keywords: ['demand', 'location', 'competition', 'costs', 'marketable'],
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
                    image: img2,
                    subquestions: [
                        {
                            id: '2.1',
                            q: 'Give a definition for the term personality.',
                            keywords: ['characteristics', 'unique', 'thoughts', 'feelings', 'behaviours'],
                            maxMarks: 2
                        },
                        {
                            id: '2.2',
                            q: 'State TWO factors that may have contributed to a young person developing positive personality traits during childhood.',
                            keywords: ['discipline', 'support', 'nurtured', 'beliefs', 'emotional'],
                            maxMarks: 2
                        },
                        {
                            id: '2.3',
                            q: 'Explain how a negative attitude towards life could affect your communication with others.',
                            keywords: ['judgmental', 'abrupt', 'complain', 'dismiss', 'miscommunication'],
                            maxMarks: 2
                        },
                        {
                            id: '2.4',
                            q: 'Discuss why avoiding conflict is not healthy for any relationship.',
                            keywords: ['worsen', 'withdrawn', 'stress', 'breakdown', 'frustration'],
                            maxMarks: 4
                        },
                        {
                            id: '2.5',
                            q: 'Why do you think compromising may not always be considered to be the most ideal method to resolve disagreements?',
                            keywords: ['unsatisfied', 'manipulate', 'resentment', 'bitterness', 'weakness'],
                            maxMarks: 4
                        },
                        {
                            id: '2.6',
                            q: 'How would you improve your way of coping with changes in any relationship? In EACH answer, also indicate how improving these coping skills could help you to accept the changes in your relationships.',
                            keywords: ['control', 'accept', 'self-care', 'mindful', 'envision', 'remind', 'opportunity', 'positive'],
                            maxMarks: 6
                        }
                    ]
                },
                {
                    id: '3',
                    type: 'short',
                    question: 'QUESTION 3 Read the extract below and answer the questions that follow.',
                    image: img3,
                    subquestions: [
                        {
                            id: '3.1',
                            q: 'Give a definition of the term study skills.',
                            keywords: ['concentrate', 'retain', 'apply', 'strategies', 'techniques'],
                            maxMarks: 2
                        },
                        {
                            id: '3.2',
                            q: 'Differentiate between the following action words as used in an examination question paper:  Illustrate  Identify',
                            keywords: ['example', 'show', 'name', 'pinpoint', 'describe'],
                            maxMarks: 2
                        },
                        {
                            id: '3.3',
                            q: 'Explain ONE benefit of planning your responses when sitting for an examination.',
                            keywords: ['focus', 'precise', 'organise', 'confident', 'logical'],
                            maxMarks: 2
                        },
                        {
                            id: '3.4',
                            q: 'Discuss TWO ways in which you could deal effectively with anxiety during an examination session.',
                            keywords: ['breathing', 'assure', 'focus', 'remind', 'acknowledge', 'familiarise'],
                            maxMarks: 4
                        },
                        {
                            id: '3.5',
                            q: 'Assess how time management skills could assist you to perform effectively in your Grade 12 assessments.',
                            keywords: ['prioritise', 'schedule', 'monitor', 'goals', 'distribute'],
                            maxMarks: 4
                        },
                        {
                            id: '3.6',
                            q: 'How would you adapt your reading skills to respond effectively to examination questions? In EACH answer, also indicate how that could improve your ability to gain maximum marks for a question.',
                            keywords: ['reflective', 'speed', 'active', 'titles', 'key aspects', 'relevance'],
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
                    question: 'QUESTION 4 Read the extract below and answer the questions that follow. Write paragraphs on crises and disasters.',
                    image: img4,
                    subquestions: [
                        {
                            id: '4.1',
                            q: 'State FOUR benefits for a person who detects a disease early enough.',
                            keywords: ['recovery', 'prevent death', 'effective treatment', 'quality life', 'cost', 'managed', 'lifestyle', 'protected'],
                            maxMarks: 4
                        },
                        {
                            id: '4.2',
                            q: 'Analyse the negative effect of people\'s personal views about infectious diseases on the health and safety of people.',
                            keywords: ['fake news', 'complacent', 'deny', 'disclose', 'conspiracy', 'faith'],
                            maxMarks: 8
                        },
                        {
                            id: '4.3',
                            q: 'Evaluate the impact of a crisis, such as the global Covid-19 pandemic, on the current trends in the job market.',
                            keywords: ['downturn', 'entrepreneurs', 'virtual', 'skills', 'restrategies', 'recruitment', 'remote', 'retrenched'],
                            maxMarks: 8
                        }
                    ]
                },
                {
                    id: '5',
                    type: 'essay',
                    question: 'QUESTION 5 Read the extract below and answer the questions that follow. Write paragraphs on limitations and accessibility of information.',
                    image: img5,
                    subquestions: [
                        {
                            id: '5.1',
                            q: 'State FOUR ways in which the media could ensure access of information to all communities.',
                            keywords: ['affordable', 'languages', 'infrastructure', 'stations', 'local', 'billboards', 'messaging', 'tabloids'],
                            maxMarks: 4
                        },
                        {
                            id: '5.2',
                            q: 'Analyse how limitations to the right to freedom of expression of the media may assist in promoting public safety.',
                            keywords: ['criminal', 'truthful', 'identity', 'upsetting', 'protests', 'security'],
                            maxMarks: 8
                        },
                        {
                            id: '5.3',
                            q: 'Critically discuss the impact of the increasing digital divide on different groups in society, specifically the poorer communities.',
                            keywords: ['behind', 'unemployment', 'education', 'isolated', 'powerless', 'poverty', 'illiterate', 'rights'],
                            maxMarks: 8
                        }
                    ]
                },
                {
                    id: '6',
                    type: 'essay',
                    question: 'QUESTION 6 Read the extract below and answer the questions that follow. Write paragraphs on the value of work and work ethics.',
                    image: img6,
                    subquestions: [
                        {
                            id: '6.1',
                            q: 'State FOUR ways in which work could give you a sense of purpose in life.',
                            keywords: ['goals', 'role', 'skills', 'companionship', 'growth', 'contribute', 'self-worth', 'love'],
                            maxMarks: 4
                        },
                        {
                            id: '6.2',
                            q: 'Analyse why it is necessary for all workers to follow the required ethical behaviour in the workplace.',
                            keywords: ['diligence', 'efficient', 'pride', 'responsibilities', 'professional', 'respect', 'integrity'],
                            maxMarks: 8
                        },
                        {
                            id: '6.3',
                            q: 'Critically discuss the importance of understanding your core values to ensure that you find meaning in your work.',
                            keywords: ['goals', 'prioritize', 'decisions', 'compass', 'clarity', 'adapt', 'realistic'],
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
const One: React.FC = () => {
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

export default One;