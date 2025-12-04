import React, { useState } from "react";
import SolutionModal from "./SolutionModal";

export default function Question({ item, value, onChange, submitted }) {
    const [open, setOpen] = useState(false);

    // auto-grow textarea
    const autoGrow = (el) => {
        if (!el) return;
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
    };

    const QUESTION_TYPES = ["mcq", "short", "essay"];

    if (item.type === "section") {
        return <h2 className="section-title">{item.text}</h2>;
    }

    if (item.type === "instruction") {
        return (
            <div className="instruction-text">
                <p style={{ whiteSpace: "pre-wrap" }}>{item.text}</p>
                {/* instruction image(s) */}
                {Array.isArray(item.images) && item.images.length > 0 ? (
                    <div className="q-image">
                        {item.images.map((src, i) => <img key={i} src={src} alt={`instr-${item.id}-${i}`} />)}
                    </div>
                ) : item.image ? (
                    <div className="q-image">
                        <img src={item.image} alt={`instr-${item.id}`} />
                    </div>
                ) : null}
            </div>
        );
    }

    return (
        <div className="question-card">
            <div className="question-top">
                <span className="q-id">{item.id}</span>
                <span className="q-marks">{item.marks || 0} mark{(item.marks || 0) > 1 ? "s" : ""}</span>
            </div>

            <div className="q-text" style={{ whiteSpace: "pre-wrap" }}>{item.text}</div>

            {/* QUESTION IMAGES: support item.images (array) OR single item.image */}
            {Array.isArray(item.images) && item.images.length > 0 ? (
                <div className="q-image">
                    {item.images.map((src, i) => (
                        <img key={i} src={src} alt={`diagram-${item.id}-${i}`} />
                    ))}
                </div>
            ) : item.image ? (
                <div className="q-image">
                    <img src={item.image} alt={`diagram-${item.id}`} />
                </div>
            ) : null}

            {/* MCQ */}
            {item.type === "mcq" && Array.isArray(item.options) && (
                <div className="mcq-options">
                    {item.options.map((opt, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        return (
                            <label key={idx} className="mcq-label">
                                <input
                                    type="radio"
                                    name={item.id}
                                    value={letter}
                                    checked={value === letter}
                                    disabled={submitted}
                                    onChange={(e) => onChange(item.id, e.target.value)}
                                />
                                <span className="opt-text">{opt}</span>
                            </label>
                        );
                    })}
                </div>
            )}

            {/* SHORT */}
            {item.type === "short" && (
                <textarea
                    className="short-answer"
                    value={value || ""}
                    placeholder="Type your answer here..."
                    disabled={submitted}
                    onChange={(e) => {
                        onChange(item.id, e.target.value);
                        autoGrow(e.target);
                    }}
                    onInput={(e) => autoGrow(e.target)}
                />
            )}

            {/* ESSAY */}
            {item.type === "essay" && (
                <textarea
                    className="essay-answer"
                    value={value || ""}
                    placeholder="Write your essay answer here..."
                    disabled={submitted}
                    onChange={(e) => {
                        onChange(item.id, e.target.value);
                        autoGrow(e.target);
                    }}
                    onInput={(e) => autoGrow(e.target)}
                />
            )}

            {/* View solution button (for real questions only) */}
            {QUESTION_TYPES.includes(item.type) && submitted && (
                <div className="view-solution-area">
                    <button className="view-solution-btn" onClick={() => setOpen(true)}>
                        View Solution
                    </button>
                </div>
            )}

            {/* Solution modal */}
            {open && <SolutionModal isOpen={open} onClose={() => setOpen(false)} question={item} />}
            <style jsx>
                {`

                    .question-card {
                        background: #ffffff;
                        padding: 18px;
                        margin: 20px 0;
                        border-radius: 12px;
                        border: 1px solid #e4e4e4;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
                        width: 100%;
                    }
                    .question-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                    }

                    .q-id {
                        font-weight: bold;
                        font-size: 18px;
                    }

                    .q-marks {
                        font-size: 14px;
                        color: #666;
                        margin-left: 10px;
                        white-space: nowrap;
                    }

                    /* QUESTION TEXT */
                    .q-text {
                        margin-bottom: 12px;
                        line-height: 1.5;
                        font-size: 16px;
                    }

                    /* IMAGES */
                    .q-image img {
                        max-width: 100%;
                        height: auto;
                        margin: 10px 0;
                        border-radius: 6px;
                    }

                    /* MCQ OPTIONS */
                    .mcq-options {
                        margin-top: 10px;
                    }

                    .mcq-label {
                        display: flex;
                        align-items: center;
                        margin: 5px 0;
                        font-size: 15px;
                    }

                    .opt-text {
                        margin-left: 6px;
                    }

                    /* SHORT + ESSAY TEXTAREAS */
                    .short-answer,
                    .essay-answer {
                        width: 100%;
                        min-height: 80px;
                        max-height: 400px;
                        resize: none;            /* user cannot manually break the layout */
                        padding: 10px;
                        border-radius: 8px;
                        border: 1px solid #ccc;
                        font-size: 15px;
                        line-height: 1.5;
                        overflow: hidden;         /* needed for auto-grow */
                        box-sizing: border-box;   /* prevents overflow beyond container */
                    }

                    /* VIEW SOLUTION BUTTON */
                    .view-solution-area {
                        margin-top: 15px;
                        text-align: right;
                    }

                    .view-solution-btn {
                        background: #3a6df0;
                        color: white;
                        padding: 8px 15px;
                        border-radius: 8px;
                        border: none;
                        cursor: pointer;
                    }

                    .view-solution-btn:hover {
                        background: #2d55c9;
                    }

                    /* SECTION TITLES */
                    .section-title {
                        margin-top: 30px;
                        margin-bottom: 10px;
                        font-size: 22px;
                        font-weight: bold;
                        text-decoration: underline;
                    }

                    /* INSTRUCTIONS */
                    .instruction-text {
                        margin: 15px 0;
                        padding: 15px;
                        border-left: 4px solid #777;
                        background: #fafafa;
                        border-radius: 8px;
                    }

                `}
            </style>
        </div>
    );
}
