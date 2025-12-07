import { useState } from "react";
import CoverPage from "./CoverPage";
import Timer from "./Timer";
import Question from "./Question";
import Results from "./Results";
import DataSheet from "./DataSheet";
import { questions } from "./questions";
import { memo } from "./memo";

export default function PhysicalScienceP1Nov2023() {
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [dataOpen, setDataOpen] = useState(false);

    if (!started) {
        return <CoverPage onStart={() => setStarted(true)} />;
    }

    const setAnswer = (number, value) => {
        setAnswers(prev => ({ ...prev, [number]: value }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <div style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
            {!submitted && (
                // ✅ FIXED: Timer now counts 120 minutes
                <Timer duration={120 * 60} onExpire={handleSubmit} />
            )}

            <h1 style={{ marginBottom: 20 }}>Physical Sciences P1 – Digital Exam</h1>

            {questions.map(qBlock => (
                <div key={qBlock.id} style={{ marginBottom: 40 }}>
                    <h2>QUESTION {qBlock.id}</h2>

                    {qBlock.instructions && (
                        <p style={{ marginBottom: 15, whiteSpace: "pre-line" }}>
                            {qBlock.instructions}
                        </p>
                    )}

                    {qBlock.diagram && (
                        <img
                            src={qBlock.diagram}
                            alt="diagram"
                            style={{
                                maxWidth: "100%",
                                border: "1px solid #ccc",
                                marginBottom: 15
                            }}
                        />
                    )}

                    {qBlock.items.map(item => (
                        <Question
                            key={item.number || `${qBlock.id}-${Math.random()}`}
                            item={item}
                            userAnswer={answers[item.number]}
                            setAnswer={setAnswer}
                            submitted={submitted}
                        />
                    ))}
                </div>
            ))}

            <div style={{ display: "flex", gap: 16, alignItems: "center", marginTop: 10 }}>
                {!submitted ? (
                    <>
                        <button
                            onClick={handleSubmit}
                            style={{
                                padding: "12px 20px",
                                fontSize: 18,
                                background: "black",
                                color: "white",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer"
                            }}
                        >
                            Submit
                        </button>

                        <button
                            onClick={() => setDataOpen(true)}
                            style={{
                                padding: "10px 14px",
                                fontSize: 15,
                                background: "#0077cc",
                                color: "white",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                                marginLeft: 12
                            }}
                            title="Open data sheet"
                        >
                            DATA FOR PHYSICAL SCIENCES GRADE 12
                        </button>
                    </>
                ) : (
                    <>
                        <h1 style={{ marginTop: 40 }}>FINAL RESULTS</h1>

                        <Results
                            questions={questions}
                            memo={memo}
                            answers={answers}
                        />

                        <button
                            onClick={() => setDataOpen(true)}
                            style={{
                                padding: "10px 14px",
                                fontSize: 15,
                                background: "#0077cc",
                                color: "white",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                                marginLeft: 12
                            }}
                            title="Open data sheet"
                        >
                            DATA FOR PHYSICAL SCIENCES GRADE 12
                        </button>
                    </>
                )}
            </div>

            {/* Data sheet drawer */}
            <DataSheet open={dataOpen} onClose={() => setDataOpen(false)} />
        </div>
    );
}