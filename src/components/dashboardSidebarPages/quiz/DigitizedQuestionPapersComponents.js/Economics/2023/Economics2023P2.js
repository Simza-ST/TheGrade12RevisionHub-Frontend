
import React, { useState, useEffect } from 'react'

export default function Economics2023P2({ onBack }) {
    const [answers, setAnswers] = useState({})
    const [score, setScore] = useState(null)
    const [timeLeft, setTimeLeft] = useState(120 * 60)

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

    // === FULL NSC P2 2024 QUESTIONS ===
    const sections = [
        {
            name: "SECTION A (COMPULSORY) – 30 MARKS – 20 MINUTES",
            questions: [
                // 1.1 MCQ
                ...[
                    { q: "Short-term savings and loans are traded on the ... market.", opts: ["capital", "foreign exchange", "factor", "money"], ans: "money" },
                    { q: "Job advertising space is an example of a ... indicator.", opts: ["lagging", "coincident", "leading", "composite"], ans: "leading" },
                    { q: "The deficit rule states that shortages on the budget should not exceed ... of GDP.", opts: ["50%", "3%", "30%", "6%"], ans: "3%" },
                    { q: "The ratio of a country's export price index to its import price index is known as the ...", opts: ["trade balance", "exchange rate", "terms of trade", "interest rate"], ans: "terms of trade" },
                    { q: "A trade policy that restricts certain imports to prevent unfair foreign competition is called ...", opts: ["protectionism", "export promotion", "import substitution", "free trade"], ans: "protectionism" },
                    { q: "The level of a country's standard of living is measured by ...", opts: ["real GDP", "nominal GDP per year", "national income", "per capita GDP"], ans: "per capita GDP" },
                    { q: "An international benchmark criterion for regional development that requires democratic decision-making and transparency is called ...", opts: ["good governance", "integration", "partnership", "free-market orientation"], ans: "good governance" },
                    { q: "The probable number of years that a person will live after birth is known as ...", opts: ["child mortality", "life expectancy", "under-five mortality", "population growth"], ans: "life expectancy" },
                ].map((q, i) => ({ id: `1.1.${i+1}`, type: 'mcq', ...q })),

                // 1.2 MATCHING - FULL QUESTIONS + DROPDOWN TABLE
                {
                    id: "1.2",
                    type: 'match-table',
                    questions: [
                        "The total value of goods and services produced at current prices",
                        "A statistical method used to smooth out short-term fluctuations in data",
                        "A three-year rolling budget framework used in South Africa",
                        "IMF reserve asset allocated to member countries",
                        "Refusal to trade with a country to force political or economic change",
                        "Global goals adopted in 2015 to end poverty and protect the planet",
                        "Government programmes to develop underdeveloped regions",
                        "The movement of people from rural to urban areas"
                    ],
                    options: [
                        "A. Medium-term Expenditure Framework (MTEF)",
                        "B. Special Drawing Rights (SDRs)",
                        "C. Sustainable Development Goals (SDGs)",
                        "D. Nominal GDP at factor cost",
                        "E. Spatial Development Initiatives (SDIs)",
                        "F. Moving average trend line",
                        "G. Economic boycotts / sanctions",
                        "H. Urbanisation process",
                        "I. Factor cost valuation"
                    ],
                    answers: ['D', 'F', 'A', 'B', 'G', 'C', 'E', 'H'] // Correct: D,F,A,B,G,C,E,H
                },

                // 1.3 Give ONE word/term
                ...[
                    { q: "The physical movement of goods and services between economic agents", keys: ["real flow"] },
                    { q: "Shows the trade-off between inflation and unemployment", keys: ["phillips curve"] },
                    { q: "Government takes ownership of private companies or assets", keys: ["nationalisation"] },
                    { q: "Direct financial payments from government to producers or consumers", keys: ["direct subsidies", "subsidies"] },
                    { q: "Production methods that use more workers than machines", keys: ["labour-intensive"] },
                    { q: "Measures changes in the price of a basket of consumer goods", keys: ["consumer price index", "cpi"] }
                ].map((item, i) => ({
                    id: `1.3.${i+1}`,
                    type: 'short',
                    q: `Give ONE word/term for: ${item.q}`,
                    keys: item.keys,
                    exact: false
                })),
            ]
        },
        {
            name: "SECTION B – ANSWER ANY TWO QUESTIONS – 80 MARKS – 80 MINUTES",
            questions: [
                {
                    id: "2",
                    type: 'essay',
                    q: "Discuss the role of markets in the circular flow model. (26)",
                    keys: ["households", "firms", "product market", "factor market", "leakages", "injections", "equilibrium"],
                    min: 200
                },
                {
                    id: "3",
                    type: 'essay',
                    q: "Analyse the functioning of the foreign exchange market in South Africa. (26)",
                    keys: ["rand", "supply", "demand", "SARB", "appreciation", "depreciation", "intervention"],
                    min: 200
                },
                {
                    id: "4",
                    type: 'essay',
                    q: "Evaluate the effectiveness of South Africa’s New Economic Paradigm in promoting inclusive growth. (26)",
                    keys: ["inclusive growth", "jobs", "infrastructure", "SMMEs", "inequality", "NDP"],
                    min: 200
                },
            ]
        },
        {
            name: "SECTION C – ANSWER ONE QUESTION – 40 MARKS – 40 MINUTES",
            questions: [
                {
                    id: "5",
                    type: 'essay',
                    q: "Discuss the North-South divide in international trade patterns. (26)",
                    keys: ["developed", "developing", "primary goods", "manufactured goods", "terms of trade", "dependency"],
                    min: 200
                },
                {
                    id: "5eval",
                    type: 'essay',
                    q: "Evaluate the benefits and limitations of free trade for developing countries. (14)",
                    keys: ["specialisation", "efficiency", "growth", "competition", "job losses", "infant industry"],
                    min: 100
                },
                {
                    id: "6",
                    type: 'essay',
                    q: "Examine South Africa’s industrial development policies under the IPAP and SEZs. (26)",
                    keys: ["IPAP", "SEZs", "incentives", "localisation", "manufacturing", "export"],
                    min: 200
                },
                {
                    id: "6eval",
                    type: 'essay',
                    q: "Assess the impact of infrastructure investment on economic growth and job creation. (14)",
                    keys: ["growth", "jobs", "multiplier", "productivity", "investment", "SIP"],
                    min: 100
                },
            ]
        }
    ]

    const save = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }))

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
                    if (q.id.includes('eval')) {
                        total += words >= q.min && hits >= 2 ? 14 :
                            words >= q.min/2 && hits >= 1 ? 10 : 0
                    } else {
                        total += words >= q.min && hits >= 3 ? 26 :
                            words >= q.min/2 && hits >= 2 ? 18 :
                                hits >= 1 ? 10 : 0
                    }
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
            {/* === DBE HEADER === */}
            <div style={{
                border: '4px solid black',
                background: 'white',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '30px'
            }}>
                <div style={{ marginBottom: '15px' }}>
                    <div style={{
                        width: '90px',
                        height: '90px',
                        border: '4px solid #FFD700',
                        borderRadius: '50%',
                        margin: '0 auto',
                        background: '#FFD700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        fontWeight: 'bold'
                    }}>!</div>
                    <p style={{ fontSize: '10px', margin: '5px 0', fontWeight: 'bold' }}>
                        KE E: /XARRA //KE
                    </p>
                </div>

                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '10px 0' }}>
                    basic education
                </h1>
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '5px 0' }}>
                    Department: Basic Education<br/>
                    REPUBLIC OF SOUTH AFRICA
                </p>

                <div style={{
                    background: 'navy',
                    color: 'white',
                    padding: '10px 40px',
                    borderRadius: '30px',
                    display: 'inline-block',
                    margin: '15px 0',
                    fontWeight: 'bold'
                }}>
                    NATIONAL SENIOR CERTIFICATE
                </div>

                <div style={{
                    background: '#a8dadc',
                    color: 'black',
                    padding: '8px 30px',
                    borderRadius: '30px',
                    display: 'inline-block',
                    border: '2px solid black',
                    fontWeight: 'bold',
                    marginBottom: '20px'
                }}>
                    GRADE 12
                </div>

                <div style={{
                    background: '#fff9a6',
                    border: '4px dotted #003087',
                    padding: '15px 50px',
                    borderRadius: '15px',
                    display: 'inline-block',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ fontSize: '26px', fontWeight: 'bold', margin: '0' }}>
                        ECONOMICS P2
                    </h2>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '5px 0' }}>
                        NOVEMBER 2024
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    fontWeight: 'bold',
                    marginBottom: '15px'
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
                    marginBottom: '20px'
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

                {sections.map((sec, i) => (
                    <div key={i} style={{ marginBottom: '50px' }}>
                        <h2 style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            borderBottom: '2px solid black',
                            paddingBottom: '5px',
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
                                        <div style={{ marginLeft: '20px' }}>
                                            {q.opts.map((opt, idx) => (
                                                <label key={idx} style={{
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                    fontSize: '16px'
                                                }}>
                                                    <input
                                                        type="radio"
                                                        name={q.id}
                                                        onChange={() => save(q.id, opt)}
                                                        style={{ marginRight: '10px' }}
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
                                            {q.id} Match COLUMN A with COLUMN B. Write only the letter (A–I).
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
                                            {q.id} {q.q}
                                        </p>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '2px solid black',
                                                fontSize: '16px',
                                                fontFamily: 'inherit',
                                                resize: 'none'
                                            }}
                                            rows={3}
                                            placeholder="Your answer..."
                                            onChange={e => save(q.id, e.target.value)}
                                        />
                                    </>
                                )}

                                {/* Essay */}
                                {q.type === 'essay' && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                            {q.id} {q.q}
                                        </p>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                padding: '14px',
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

                <button onClick={mark} style={{
                    width: '100%',
                    padding: '18px',
                    background: 'black',
                    color: 'white',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer',
                    margin: '30px 0'
                }}>
                    SUBMIT EXAM
                </button>

                {score !== null && (
                    <div style={{
                        margin: '40px 0',
                        padding: '25px',
                        border: '5px solid black',
                        textAlign: 'center',
                        background: '#f9f9f9',
                        borderRadius: '10px'
                    }}>
                        <h2 style={{ fontSize: '52px', fontWeight: 'bold', margin: '0' }}>
                            FINAL SCORE: {score}/150
                        </h2>
                        <p style={{ fontSize: '26px', margin: '15px 0 0', fontWeight: 'bold' }}>
                            {score >= 120 ? "DISTINCTION!" :
                                score >= 105 ? "MERIT!" :
                                    score >= 75 ? "PASS" : "REVIEW & RETRY"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}