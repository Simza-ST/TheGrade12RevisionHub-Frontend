import React from "react";

function Result({ paper, userAnswers, goBack }) {
    let totalScore = 0;
    let maxScore = 0;

    paper.sections.forEach((section) => {
        section.questions.forEach((q) => {
            maxScore += q.marks;
            // Only add to totalScore if user answered correctly AND q.answer exists
            if (q.answer && userAnswers[q.id] === q.answer) {
                totalScore += q.marks;
            }
        });
    });

    return (
        <div style={styles.fullScreen}>
            <h1 style={styles.title}>
                Results for {paper.subject} P{paper.paper}
            </h1>
            <p style={styles.totalScore}>
                Total Score: {totalScore} / {maxScore}
            </p>

            <div style={styles.resultsContainer}>
                {paper.sections.map((section, sIdx) => (
                    <div key={sIdx} style={styles.section}>
                        <h2 style={styles.sectionTitle}>{section.section}</h2>
                        {section.questions.map((q) => {
                            const userAnswer = userAnswers[q.id];
                            const isCorrect = q.answer ? userAnswer === q.answer : null;

                            return (
                                <div key={q.id} style={styles.question}>
                                    <p style={styles.qText}>
                                        {q.id}. {q.question} ({q.marks} marks)
                                    </p>

                                    <p>
                                        Your answer: {userAnswer || "Not answered"}{" "}
                                        {isCorrect !== null ? (isCorrect ? "(✔)" : "(✖)") : ""}
                                    </p>

                                    {/* Only show correct answer if it exists */}
                                    {q.answer && <p>Correct answer: {q.answer}</p>}

                                    {/* Optional memo/explanation */}
                                    {q.memo && (
                                        <p style={{ color: "green" }}>
                                            Memo / Explanation: {q.memo}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div style={styles.buttonContainer}>
                <button style={styles.backBtn} onClick={goBack}>
                    Back to Paper
                </button>
            </div>
        </div>
    );
}

const styles = {
    fullScreen: {
        width: "100vw",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "16px",
        lineHeight: 1.6,
        color: "#000",
        backgroundColor: "#fff",
        overflowY: "auto",
    },
    resultsContainer: {
        width: "95%",
        margin: "0 auto",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        fontWeight: "bold",
        fontSize: "28px",
    },
    totalScore: {
        textAlign: "center",
        fontSize: "22px",
        fontWeight: "bold",
        marginBottom: "30px",
    },
    section: { marginBottom: "40px" },
    sectionTitle: {
        fontWeight: "bold",
        textDecoration: "underline",
        marginBottom: "15px",
        fontSize: "20px",
    },
    question: {
        marginBottom: "25px",
        padding: "10px",
        borderBottom: "1px solid #000",
    },
    qText: { marginBottom: "5px" },
    buttonContainer: { textAlign: "center", marginTop: "30px" },
    backBtn: {
        padding: "10px 30px",
        fontSize: "16px",
        cursor: "pointer",
        border: "1px solid #000",
        background: "#fff",
        fontWeight: "bold",
    },
};

export default Result;
