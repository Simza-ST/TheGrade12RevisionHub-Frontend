
import { useState, useEffect } from 'react'

export default function Economics2024P2({ onBack }) {
    const [answers, setAnswers] = useState({})
    const [score, setScore] = useState(null)
    const [timeLeft, setTimeLeft] = useState(120 * 60)
    const [showMemo, setShowMemo] = useState(false)

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [timeLeft])

    const formatTime = () => {
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0')
        const s = (timeLeft % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    const sections = [
        {
            name: "SECTION A (COMPULSORY) – 30 MARKS",
            questions: [
                // 1.1 MCQ – FROM 2024 P2
                { id: "1.1.1", type: "mcq", q: "A business that has no influence over the market price is known as a price ...", opts: ["maker", "searcher", "taker", "setter"], ans: "taker" },
                { id: "1.1.2", type: "mcq", q: "A monopoly created due to high development costs is classified as ...", opts: ["local", "natural", "artificial", "geographical"], ans: "artificial" },
                { id: "1.1.3", type: "mcq", q: "The shut-down point in perfect competition occurs when AR equals ... cost.", opts: ["average variable", "total variable", "average", "average fixed"], ans: "average variable" },
                { id: "1.1.4", type: "mcq", q: "Government uses ... to reduce market failure through regulations and laws.", opts: ["indirect control", "taxation", "deregulation", "direct control"], ans: "direct control" },
                { id: "1.1.5", type: "mcq", q: "The South African Reserve Bank targets inflation between ...", opts: ["3%–6%", "1%–3%", "4%–6%", "2%–6%"], ans: "3%–6%" },
                { id: "1.1.6", type: "mcq", q: "A tourist must stay for a minimum of ... night to be counted in official statistics.", opts: ["three", "seven", "five", "one"], ans: "one" },

                // 1.2 MATCHING - FULL DESCRIPTIONS + DROPDOWN TABLE
                {
                    id: "1.2",
                    type: 'match-table',
                    questions: [
                        "A period where at least one factor of production cannot be changed",
                        "A market structure dominated by only two large firms",
                        "Trade in goods or services that is prohibited by law",
                        "Goods provided by government for societal benefit with no exclusion",
                        "The price of goods as they leave the factory before distribution",
                        "The relative importance of an item in the CPI inflation basket",
                        "A site recognised by UNESCO for its cultural or natural significance",
                        "The large-scale removal of trees leading to environmental degradation"
                    ],
                    options: [
                        "A. Smuggling / illegal trade",
                        "B. UNESCO World Heritage Site",
                        "C. Public goods / merit goods",
                        "D. Deforestation",
                        "E. Short run production",
                        "F. Producer Price Index (PPI)",
                        "G. Duopoly market",
                        "H. CPI basket weight",
                        "I. Social welfare goods"
                    ],
                    answers: ['E', 'G', 'A', 'C', 'F', 'H', 'B', 'D']
                },

                // 1.3 Give ONE word/term
                ...[
                    { q: "Market with only one seller and high barriers to entry", keys: ["monopoly"] },
                    { q: "Profit earned above the normal return on capital", keys: ["economic profit", "supernormal profit", "abnormal profit"] },
                    { q: "A government-imposed maximum price below equilibrium", keys: ["price ceiling"] },
                    { q: "Inflation rate exceeding 50% per month", keys: ["hyperinflation"] },
                    { q: "Indigenous practices and innovations protected by law", keys: ["traditional knowledge"] },
                    { q: "A permit allowing a firm to emit a certain level of pollution", keys: ["pollution permit", "carbon credit"] }
                ].map((item, i) => ({
                    id: `1.3.${i+1}`,
                    type: 'short',
                    q: `Give ONE word/term for: ${item.q}`,
                    keys: item.keys
                })),
            ]
        },
        {
            name: "SECTION B – ANSWER ANY TWO",
            questions: [
                {
                    id: "2",
                    type: 'essay',
                    q: "Explain the characteristics and long-run equilibrium of perfect competition. (26)",
                    keys: ["many sellers", "identical products", "price taker", "free entry", "normal profit", "efficiency"],
                    min: 200
                },
                {
                    id: "3",
                    type: 'essay',
                    q: "Why do firms in oligopolies often collude? Discuss with examples. (26)",
                    keys: ["avoid price war", "cartel", "max profit", "OPEC", "game theory", "tacit collusion"],
                    min: 200
                },
                {
                    id: "4",
                    type: 'essay',
                    q: "Discuss causes of market failure and government interventions to correct them. (26)",
                    keys: ["externalities", "public goods", "taxes", "subsidies", "regulation", "property rights"],
                    min: 200
                },
            ]
        },
        {
            name: "SECTION C – ANSWER ONE",
            questions: [
                {
                    id: "5",
                    type: 'essay',
                    q: "Analyse the inflation targeting policy of the SARB. (26)",
                    keys: ["SARB", "repo rate", "3-6%", "transparency", "credibility", "independence"],
                    min: 200
                },
                {
                    id: "5eval",
                    type: 'essay',
                    q: "Evaluate the economic impact of tourism on South Africa. (10)",
                    keys: ["jobs", "forex", "leakage", "multiplier", "infrastructure"],
                    min: 100
                },
                {
                    id: "6",
                    type: 'essay',
                    q: "Discuss South Africa’s environmental sustainability policies. (26)",
                    keys: ["carbon tax", "subsidies", "permits", "renewable energy", "NEMA"],
                    min: 200
                },
            ]
        }
    ]

    const save = (id, val) => {
        setAnswers(prev => ({ ...prev, [id]: val }))
    }

    const mark = () => {
        let total = 0
        sections.forEach(sec => {
            sec.questions.forEach(q => {
                const a = (answers[q.id] || '').toString().toLowerCase().trim()

                if (q.type === 'mcq' && a === q.ans.toLowerCase()) total += 2

                if (q.type === 'match-table') {
                    q.answers.forEach((correct, i) => {
                        const userAns = answers[`${q.id}-${i}`]
                        if (userAns === correct) total += 1
                    })
                }

                if (q.type === 'short') {
                    const hits = q.keys.filter(k => a.includes(k.toLowerCase())).length
                    total += hits > 0 ? 1 : 0
                }

                if (q.type === 'essay') {
                    const words = a.split(/\s+/).filter(w => w).length
                    const hits = q.keys.filter(k => a.includes(k.toLowerCase())).length
                    const isEval = q.id.includes('eval')
                    const full = isEval ? 10 : 26
                    const mid = isEval ? 7 : 18
                    const low = isEval ? 4 : 10

                    total += words >= q.min && hits >= 3 ? full :
                        words >= q.min/2 && hits >= 2 ? mid :
                            hits >= 1 ? low : 0
                }
            })
        })
        setScore(total)
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'white',
            fontFamily: 'Arial, sans-serif',
            color: 'black',
            margin: 0,
            padding: 0
        }}>
            {/* === OFFICIAL DBE HEADER === */}
            <div style={{
                border: '4px solid black',
                background: 'white',
                padding: '25px',
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <img
                    src="/images/coatOfArm.png"
                    alt="SA Coat of Arms"
                    style={{position: 'relative', top: '1px', left: '460px'}}
                />

                <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '10px 0' }}>
                    basic education
                </h1>
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '5px 0' }}>
                    Department: Basic Education<br/>
                    REPUBLIC OF SOUTH AFRICA
                </p>

                <div style={{
                    background: 'navy',
                    color: 'white',
                    padding: '12px 60px',
                    borderRadius: '30px',
                    display: 'inline-block',
                    margin: '20px 0',
                    fontWeight: 'bold'
                }}>
                    NATIONAL SENIR CERTIFICATE
                </div>

                <div style={{
                    background: '#a8dadc',
                    color: 'black',
                    padding: '10px 40px',
                    borderRadius: '30px',
                    display: 'inline-block',
                    border: '2px solid black',
                    fontWeight: 'bold',
                    marginBottom: '25px'
                }}>
                    GRADE 12
                </div>

                <div style={{
                    background: '#fff9a6',
                    border: '4px dotted #003087',
                    padding: '20px 70px',
                    borderRadius: '15px',
                    display: 'inline-block',
                    marginBottom: '25px'
                }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0' }}>
                        ECONOMICS P2
                    </h2>
                    <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '8px 0' }}>
                        NOVEMBER 2024
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>
                    <div style={{ textAlign: 'left' }}>
                        <p>MARKS: 150</p>
                        <p>TIME: 2 hours</p>
                    </div>
                    <div style={{ textAlign: 'right', fontStyle: 'italic' }}>
                        This question paper consists of 12 pages.
                    </div>
                </div>

                <div style={{
                    borderTop: '2px solid black',
                    paddingTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    fontStyle: 'italic'
                }}>
                    <span>Copyright reserved</span>
                    <span>Please turn over</span>
                </div>
            </div>

            {/* === EXAM BODY === */}
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 30px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '2px solid black',
                    paddingBottom: '10px',
                    marginBottom: '25px'
                }}>
                    <button onClick={onBack} style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        textDecoration: 'underline',
                        cursor: 'pointer'
                    }}>Back</button>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        Timer: {formatTime()}
                    </div>
                </div>

                {/* Memo Toggle */}
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <button onClick={() => setShowMemo(!showMemo)} style={{
                        padding: '12px 30px',
                        background: '#003087',
                        color: 'white',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}>
                        {showMemo ? 'Hide' : 'Show'} MARKING GUIDELINES
                    </button>
                </div>

                {showMemo && (
                    <div style={{
                        background: '#fff9a6',
                        padding: '25px',
                        border: '4px dotted #003087',
                        margin: '30px 0',
                        borderRadius: '15px',
                        fontSize: '15px'
                    }}>
                        <h3 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '15px' }}>
                            DBE MARKING GUIDELINES
                        </h3>
                        {sections.flatMap(s => s.questions).map(q => (
                            <div key={q.id} style={{ margin: '10px 0', padding: '8px', borderBottom: '1px dashed #ccc' }}>
                                <strong>{q.id}:</strong>{' '}
                                {q.type === 'mcq' ? q.ans :
                                    q.type === 'match-table' ? q.answers.map((a, i) => `${String.fromCharCode(65+i)} → ${a}`).join(', ') :
                                        q.type === 'short' ? q.keys[0] :
                                            q.type === 'essay' ? `(${q.id.includes('eval') ? '10' : '26'} marks) Keywords: ${q.keys.slice(0,4).join(', ')}...` : ''}
                            </div>
                        ))}
                    </div>
                )}

                {/* Questions */}
                {sections.map((sec, i) => (
                    <div key={i} style={{ marginBottom: '50px' }}>
                        <h2 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            borderBottom: '2px solid black',
                            paddingBottom: '8px',
                            textTransform: 'uppercase'
                        }}>
                            {sec.name}
                        </h2>

                        {sec.questions.map(q => (
                            <div key={q.id} style={{ marginBottom: '35px' }}>

                                {/* MCQ */}
                                {q.type === 'mcq' && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                                            {q.id} {q.q}
                                        </p>
                                        <div style={{ marginLeft: '25px' }}>
                                            {q.opts.map((opt, idx) => (
                                                <label key={idx} style={{
                                                    display: 'block',
                                                    marginBottom: '10px',
                                                    fontSize: '16px'
                                                }}>
                                                    <input
                                                        type="radio"
                                                        name={q.id}
                                                        onChange={() => save(q.id, opt)}
                                                        style={{ marginRight: '12px' }}
                                                    />
                                                    <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {/* MATCHING TABLE */}
                                {q.type === 'match-table' && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                                            {q.id} Match COLUMN A with COLUMN B.
                                        </p>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontSize: '16px',
                                            marginBottom: '20px'
                                        }}>
                                            <thead>
                                            <tr>
                                                <th style={{
                                                    border: '2px solid black',
                                                    padding: '12px',
                                                    textAlign: 'left',
                                                    backgroundColor: '#f0f0f0'
                                                }}>
                                                    COLUMN A
                                                </th>
                                                <th style={{
                                                    border: '2px solid black',
                                                    padding: '12px',
                                                    textAlign: 'center',
                                                    backgroundColor: '#f0f0f0'
                                                }}>
                                                    COLUMN B
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {q.questions.map((question, idx) => (
                                                <tr key={idx}>
                                                    <td style={{
                                                        border: '2px solid black',
                                                        padding: '14px',
                                                        verticalAlign: 'top',
                                                        fontSize: '15px'
                                                    }}>
                                                        {String.fromCharCode(65 + idx)}. {question}
                                                    </td>
                                                    <td style={{
                                                        border: '2px solid black',
                                                        padding: '8px',
                                                        textAlign: 'center'
                                                    }}>
                                                        <select
                                                            style={{
                                                                width: '100%',
                                                                padding: '10px',
                                                                fontSize: '15px',
                                                                border: '1px solid #000',
                                                                background: 'white'
                                                            }}
                                                            onChange={e => save(`${q.id}-${idx}`, e.target.value)}
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled>-- Select --</option>
                                                            {q.options.map((opt) => (
                                                                <option key={opt} value={opt[0]}>
                                                                    {opt}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </>
                                )}

                                {/* Short Answer */}
                                {q.type === 'short' && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                            fancysize: {q.id} {q.q}
                                        </p>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                padding: '15px',
                                                border: '2px solid black',
                                                fontSize: '16px',
                                                fontFamily: 'inherit',
                                                resize: 'none',
                                                boxSizing: 'border-box'
                                            }}
                                            rows={4}
                                            placeholder="Your answer..."
                                            onChange={e => save(q.id, e.target.value)}
                                        />
                                    </>
                                )}

                                {/* Essay */}
                                {q.type === 'essay' && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                                            {q.id} {q.q}
                                        </p>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                padding: '16px',
                                                border: '2px solid black',
                                                fontSize: '16px',
                                                fontFamily: 'inherit',
                                                lineHeight: '1.6',
                                                boxSizing: 'border-box'
                                            }}
                                            rows={q.id.includes('eval') ? 8 : 12}
                                            placeholder="Write your full answer here..."
                                            onChange={e => save(q.id, e.target.value)}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}

                {/* SUBMIT BUTTON */}
                <button
                    onClick={mark}
                    style={{
                        width: '100%',
                        padding: '18px',
                        background: score !== null ? '#28a745' : 'black',
                        color: 'white',
                        fontSize: '22px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer',
                        margin: '30px 0',
                        borderRadius: '8px'
                    }}
                >
                    {score !== null ? 'RESUBMIT EXAM' : 'SUBMIT EXAM'}
                </button>

                {/* SCORE DISPLAY */}
                {score !== null && (
                    <div style={{
                        margin: '40px 0',
                        padding: '30px',
                        border: '5px solid #28a745',
                        background: '#d4edda',
                        textAlign: 'center',
                        borderRadius: '12px'
                    }}>
                        <h2 style={{ fontSize: '52px', fontWeight: 'bold', color: '#155724', margin: 0 }}>
                            SCORE: {score}/150
                        </h2>
                        <p style={{ fontSize: '28px', margin: '15px 0 0', fontWeight: 'bold' }}>
                            {score >= 120 ? "LEVEL 7!" :
                                score >= 105 ? "LEVEL 6!" :
                                    score >= 75 ? "LEVEL 5" : "REVIEW & RETRY"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}