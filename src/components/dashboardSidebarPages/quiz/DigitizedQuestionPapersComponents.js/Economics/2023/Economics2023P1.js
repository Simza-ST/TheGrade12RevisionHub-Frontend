// src/components/Economics2023P1.jsx
import PaperHeader from './PaperHeader'
import React, { useState, useEffect } from 'react'

export default function Economics2023P1({ onBack }) {
    const [answers, setAnswers] = useState({})
    const [score, setScore] = useState(null)
    const [timeLeft, setTimeLeft] = useState(120 * 60) // 2 hours

    // Timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [timeLeft])

    const formatTime = () => {
        const m = Math.floor(timeLeft / 60)
        const s = timeLeft % 60
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    // === ALL QUESTIONS FROM NSC PAPER ===
    const sections = [
        {
            name: "SECTION A (COMPULSORY)",
            questions: [
                // 1.1 MCQ
                ...[
                    { q: "Deliberate action by government to increase the value of its currency?", opts: ["revaluation", "appreciation", "devaluation", "depreciation"], ans: "revaluation" },
                    { q: "Business cycles lasting 7–11 years are known as?", opts: ["Kuznets", "Kondratieff", "Juglar", "Kitchin"], ans: "Juglar" },
                    { q: "The curve showing relationship between tax rate and tax revenue?", opts: ["Phillips", "Laffer", "Lorenz", "Indifference"], ans: "Laffer" },
                    { q: "If MPC = 0.6, then MPS = ?", opts: ["0.4", "0.75", "1.67", "2.5"], ans: "0.4" },
                    { q: "A physical limit on the volume of imports?", opts: ["tariff", "incentive", "levy", "quota"], ans: "quota" },
                    { q: "Policy aimed to halve unemployment by 2014?", opts: ["RDP", "ASGISA", "GEAR", "NSDS"], ans: "ASGISA" },
                    { q: "Broad framework for industrialisation in South Africa?", opts: ["IPAP", "SIPs", "SSP", "NIPF"], ans: "NIPF" },
                    { q: "The increase in the proportion of population living in urban areas?", opts: ["immigration", "migration", "urbanisation", "emigration"], ans: "urbanisation" },
                ].map((q, i) => ({ id: `1.1.${i+1}`, type: 'mcq', ...q })),

                // 1.2 MATCHING - FULL QUESTIONS + DROPDOWN TABLE
                {
                    id: "1.2",
                    type: 'match-table',
                    questions: [
                        "Consumption that does not depend on income level",
                        "Economic policy focusing on controlling money supply to manage inflation",
                        "The responsibility of public officials to justify their actions and decisions",
                        "Cancellation or reduction of a country's foreign debt",
                        "A group of countries with free trade and common external tariffs",
                        "The process of increasing the stock of capital goods in an economy",
                        "National Rural Development Strategy aimed at rural upliftment",
                        "Consumer Price Index used to measure inflation"
                    ],
                    options: [
                        "A. Consumer Price Index (CPI)",
                        "B. Debt forgiveness / cancellation",
                        "C. Economic union (e.g., EU)",
                        "D. National Rural Development Strategy (NRDS)",
                        "E. Accountability in governance",
                        "F. Monetarist approach to inflation control",
                        "G. Capital formation / investment",
                        "H. Autonomous consumption"
                    ],
                    answers: ['H', 'F', 'E', 'B', 'C', 'G', 'D', 'A'] // Correct mapping
                },

                // 1.3 Terms (Short Answers)
                ...[
                    "Money leaving the circular flow of income",
                    "A leading indicator that combines multiple economic variables",
                    "Exchange rate system where market forces are influenced by central bank",
                    "An increase in the economy's ability to produce goods and services",
                    "Sector involved in processing raw materials into finished goods",
                    "The lowest interest rate offered by banks to their most creditworthy clients"
                ].map((q, i) => ({
                    id: `1.3.${i+1}`,
                    type: 'short',
                    q,
                    keys: ["leakages", "composite indicator", "managed floating", "economic growth", "manufacturing", "prime rate"],
                    exact: true
                })),
            ]
        },
        {
            name: "SECTION B – ANSWER ANY TWO",
            questions: [
                { id: "2.1.1", type: 'short', q: "Name any TWO factors of production.", keys: ["labour", "capital", "land", "entrepreneurship"], multi: 2 },
                { id: "2.1.2", type: 'essay', q: "Explain why inflation tends to be high during the prosperity phase of the business cycle.", keys: ["demand high", "supply low", "too much money", "wage pressure", "cost push"], min: 30 },
                { id: "2.2.1", type: 'short', q: "In which year were South Africa's exports the highest? (Refer to graph)", keys: ["2021"] },
                { id: "2.2.2", type: 'short', q: "Which account in the Balance of Payments records portfolio investment?", keys: ["financial"] },
                { id: "2.2.3", type: 'short', q: "Define the term 'trade balance'.", keys: ["exports", "imports", "difference"] },
                { id: "2.2.4", type: 'essay', q: "Discuss the impact of electricity shortages on South Africa’s export performance.", keys: ["production down", "disinvestment", "higher costs", "load shedding", "competitiveness"], min: 40 },
                { id: "2.2.5", type: 'essay', q: "Explain how the South African Reserve Bank (SARB) can reduce a Balance of Payments deficit.", keys: ["repo rate", "capital inflow", "control forex", "interest rates", "exchange control"], min: 50 },
            ]
        },
        {
            name: "SECTION C – ANSWER ONE",
            questions: [
                { id: "5", type: 'essay', q: "Discuss the main objectives of the public sector in South Africa. (26)", keys: ["growth", "employment", "stability", "equity", "redistribution", "service delivery"], min: 200 },
                { id: "5eval", type: 'essay', q: "Evaluate the success of privatisation in improving efficiency in state-owned enterprises. (10)", keys: ["efficiency", "revenue", "service delivery", "job losses", "competition"], min: 100 },
                { id: "6", type: 'essay', q: "Discuss South Africa’s export promotion strategies. (26)", keys: ["incentives", "diversification", "trade agreements", "AGOA", "IPAP"], min: 200 },
                { id: "6eval", type: 'essay', q: "Evaluate the benefits of South Africa’s membership in SADC. (10)", keys: ["market access", "investment", "infrastructure", "regional integration"], min: 100 },
            ]
        }
    ]

    const save = (id, val) => setAnswers(a => ({ ...a, [id]: val }))

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
                    total += q.exact ? (hits > 0 ? 1 : 0) : hits
                    if (q.multi) total = Math.min(total, q.multi)
                }

                if (q.type === 'essay') {
                    const words = a.split(/\s+/).filter(w => w).length
                    const hits = q.keys.filter(k => a.includes(k.toLowerCase())).length
                    total += words >= q.min && hits >= 3 ? 8 :
                        words >= q.min/2 && hits >= 2 ? 6 :
                            hits >= 1 ? 4 : 0
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
            lineHeight: '1.6'
        }}>
            <PaperHeader
                title="ECONOMICS P1"
                date="NOVEMBER 2023"
                pages={13}
            />

            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                {/* Timer + Back */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '2px solid black',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    <button
                        onClick={onBack}
                        style={{
                            fontSize: '16px',
                            textDecoration: 'underline',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        ← Back
                    </button>
                    <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
                        Timer: {formatTime()}
                    </div>
                </div>

                {/* Sections */}
                {sections.map((sec, i) => (
                    <div key={i} style={{ marginBottom: '40px' }}>
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
                            <div key={q.id} style={{ marginBottom: '30px' }}>

                                {/* MCQ */}
                                {q.type === 'mcq' && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                            {q.id} {q.q}
                                        </p>
                                        <div style={{ marginLeft: '20px' }}>
                                            {q.opts.map((opt, idx) => (
                                                <label key={idx} style={{
                                                    display: 'block',
                                                    marginBottom: '8px'
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

                                {/* MATCHING TABLE WITH DROPDOWNS */}
                                {q.type === 'match-table' && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>
                                            {q.id} Match the terms in COLUMN A with the correct explanations in COLUMN B.
                                        </p>
                                        <table style={{
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontSize: '16px'
                                        }}>
                                            <thead>
                                            <tr>
                                                <th style={{
                                                    border: '2px solid black',
                                                    padding: '10px',
                                                    textAlign: 'left',
                                                    backgroundColor: '#f0f0f0'
                                                }}>
                                                    COLUMN A
                                                </th>
                                                <th style={{
                                                    border: '2px solid black',
                                                    padding: '10px',
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
                                                        padding: '12px',
                                                        verticalAlign: 'top'
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
                                                                padding: '8px',
                                                                fontSize: '16px',
                                                                border: '1px solid #000'
                                                            }}
                                                            onChange={e => save(`${q.id}-${idx}`, e.target.value)}
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled>-- Select --</option>
                                                            {q.options.map((opt, optIdx) => (
                                                                <option key={optIdx} value={opt[0]}>
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

                                {/* Short/Essay */}
                                {(q.type === 'short' || q.type === 'essay') && (
                                    <>
                                        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                            {q.id} {q.q}
                                        </p>
                                        <textarea
                                            style={{
                                                width: '100%',
                                                padding: '12px',
                                                border: '2px solid black',
                                                marginTop: '10px',
                                                fontFamily: 'inherit',
                                                fontSize: '16px',
                                                boxSizing: 'border-box'
                                            }}
                                            rows={q.type === 'essay' ? 10 : 4}
                                            placeholder="Write your answer here..."
                                            onChange={e => save(q.id, e.target.value)}
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Submit */}
                <button
                    onClick={mark}
                    style={{
                        width: '100%',
                        padding: '15px',
                        background: 'black',
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    SUBMIT EXAM
                </button>

                {/* Score */}
                {score !== null && (
                    <div style={{
                        marginTop: '30px',
                        padding: '20px',
                        border: '4px solid black',
                        textAlign: 'center',
                        backgroundColor: '#f9f9f9'
                    }}>
                        <h2 style={{ fontSize: '48px', fontWeight: 'bold', margin: 0 }}>
                            SCORE: {score}/150
                        </h2>
                        <p style={{ fontSize: '18px', marginTop: '10px' }}>
                            {score >= 120 ? 'Distinction!' : score >= 105 ? 'Well done!' : score >= 75 ? 'Pass' : 'Review required'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}