import React, { useState } from "react";
import SolutionModal from "./SolutionModal";
import "./Question.css";

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
        </div>
    );
}
