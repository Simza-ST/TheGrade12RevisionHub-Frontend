import React from "react";

const Question = ({ question, selected, onSelect }) => (
    <div
        style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
        }}
    >
        <p>
            {question.id}. {question.question} ({question.marks} marks)
        </p>

        {question.diagram && (
            <img
                src={question.diagram}
                alt=""
                style={{ maxWidth: "300px" }}
            />
        )}

        {/* Only render options if they exist */}
        {question.options &&
            question.options.map((opt) => (
                <label key={opt} style={{ display: "block", margin: "0.5rem 0" }}>
                    <input
                        type="radio"
                        name={`q${question.id}`}
                        value={opt}
                        checked={selected === opt}
                        onChange={() => onSelect(question.id, opt)}
                    />{" "}
                    {opt}
                </label>
            ))}

        {/* For long questions (no options) show a text area */}
        {!question.options && (
            <textarea
                style={{ width: "100%", height: "100px", marginTop: "1rem" }}
                placeholder="Write your answer here..."
                onChange={(e) => onSelect(question.id, e.target.value)}
                value={selected || ""}
            />
        )}
    </div>
);

export default Question;
