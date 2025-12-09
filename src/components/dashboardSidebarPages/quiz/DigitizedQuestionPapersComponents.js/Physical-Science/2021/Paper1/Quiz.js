import React, { useState, useEffect } from "react";
import Question from "./Question";
import timer from "./Timer";

function Quiz({ paper, finishQuiz, goBack }) {
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(7200); // 120 minutes in seconds
    const [score, setScore] = useState(null);

    // Timer countdown
    useEffect(() => {
        if (!paper) return;
        if (timeLeft <= 0) {
            finishQuiz(answers); // Auto-submit when timer ends
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, paper, answers, finishQuiz]);

    const handleChange = (e, qId) => {
        setAnswers({ ...answers, [qId]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setScore("Submitted!");
        finishQuiz(answers);
    };

    if (!paper) return <p>Loading exam...</p>;

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, "0");
        const s = (secs % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div style={styles.paper}>
            <h1 style={styles.title}>
                {paper.subject} P{paper.paper} Exam Simulator
            </h1>
            <p style={styles.time}>Time Left: {formatTime(timeLeft)}</p>

            {score && <p style={{ textAlign: "center", color: "green" }}>{score}</p>}

            <form onSubmit={handleSubmit}>
                {paper.sections.map((section, sIdx) => (
                    <div key={sIdx} style={styles.section}>
                        <h2 style={styles.sectionTitle}>{section.section}</h2>

                        {section.questions.map((q, qIdx) => {
                            const mainQuestionNumber = q.id.split(".")[0];
                            return (
                                <div key={q.id} style={styles.question}>
                                    {qIdx === 0 || q.id.endsWith(".1") ? (
                                        <h3 style={styles.mainQuestion}>
                                            Question {mainQuestionNumber}
                                        </h3>
                                    ) : null}

                                    <h4 style={styles.subQuestion}>
                                        {q.id} ({q.marks} marks)
                                    </h4>

                                    <p style={styles.qText}>{q.question}</p>

                                    {q.diagram && (
                                        <div style={styles.diagram}>
                                            {Array.isArray(q.diagram)
                                                ? q.diagram.map((d, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={d}
                                                        alt={`Diagram for ${q.id}`}
                                                        style={{ maxWidth: "100%" }}
                                                    />
                                                ))
                                                : <img
                                                    src={q.diagram}
                                                    alt={`Diagram for ${q.id}`}
                                                    style={{ maxWidth: "100%" }}
                                                />}
                                        </div>
                                    )}

                                    {q.type === "mcq" ? (
                                        <div style={styles.options}>
                                            {q.options.map((opt, idx) => (
                                                <div key={idx} style={styles.optionItem}>
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name={q.id}
                                                            value={opt[0]}
                                                            checked={answers[q.id] === opt[0]}
                                                            onChange={(e) => handleChange(e, q.id)}
                                                        />{" "}
                                                        {opt}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <textarea
                                            name={q.id}
                                            placeholder="Write your answer here..."
                                            value={answers[q.id] || ""}
                                            onChange={(e) => handleChange(e, q.id)}
                                            style={styles.textarea}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}

                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                    <button type="submit" style={styles.submitBtn}>
                        Submit
                    </button>
                    <button type="button" style={styles.submitBtn} onClick={goBack}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    paper: {
        width: "95%",
        margin: "20px auto",
        padding: "30px",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "16px",
        lineHeight: 1.8,
        color: "#000",
        border: "1px solid #000",
        backgroundColor: "#fff",
    },
    title: {
        textAlign: "center",
        marginBottom: "15px",
        fontWeight: "bold",
        fontSize: "28px",
    },
    time: {
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "18px",
    },
    section: {
        marginBottom: "40px",
    },
    sectionTitle: {
        fontWeight: "bold",
        textDecoration: "underline",
        fontSize: "20px",
        marginBottom: "20px",
    },
    mainQuestion: {
        fontWeight: "bold",
        fontSize: "18px",
        marginTop: "15px",
        marginBottom: "10px",
    },
    subQuestion: {
        fontWeight: "bold",
        fontSize: "16px",
        marginBottom: "5px",
    },
    question: {
        marginBottom: "25px",
        padding: "10px",
        borderBottom: "1px solid #000",
    },
    qText: {
        marginBottom: "10px",
    },
    options: {
        marginLeft: "25px",
        marginBottom: "10px",
    },
    optionItem: {
        marginBottom: "5px",
    },
    textarea: {
        width: "100%",
        minHeight: "80px",
        padding: "8px",
        fontSize: "16px",
        fontFamily: "'Times New Roman', Times, serif",
        marginTop: "5px",
    },
    submitBtn: {
        padding: "10px 30px",
        fontSize: "16px",
        cursor: "pointer",
        border: "1px solid #000",
        background: "#fff",
        fontWeight: "bold",
    },
    diagram: {
        textAlign: "center",
        margin: "10px 0",
    },
};

export default Quiz;
