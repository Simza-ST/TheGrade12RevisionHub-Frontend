import { useState } from "react";
import { memo as memoData } from "./memo"; // ensure path is correct

export default function Question({
                                     item,
                                     userAnswer,
                                     setAnswer,
                                     submitted // boolean from App indicating form submitted
                                 }) {
    const [showWorking, setShowWorking] = useState(false);

    // Find memo entry for this item number by scanning memoData blocks
    const findMemoForItem = (itemNumber) => {
        if (!itemNumber) return null;
        for (const blockKey of Object.keys(memoData || {})) {
            const block = memoData[blockKey];
            if (!block) continue;
            if (Object.prototype.hasOwnProperty.call(block, itemNumber)) {
                return block[itemNumber];
            }
        }
        return null;
    };

    const memoEntry = findMemoForItem(item?.number);

    // Handlers
    const handleTextChange = (e) => {
        setAnswer(item.number, e.target.value);
    };

    const handleMCQClick = (letter) => {
        if (submitted) return;
        setAnswer(item.number, letter);
    };

    // Render memo content (works for strings, keyphrases, calculation objects)
    const renderMemo = (entry) => {
        if (!entry) return <em>No solution available in memo.</em>;

        // Plain string
        if (typeof entry === "string") {
            return <pre style={{ whiteSpace: "pre-line", margin: 0 }}>{entry}</pre>;
        }

        // keyphrases
        if (entry.type === "keyphrases" && Array.isArray(entry.phrases)) {
            return (
                <div>
                    <strong>Expected key phrase(s):</strong>
                    <ul style={{ marginTop: 6 }}>
                        {entry.phrases.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                    {entry.working && (
                        <>
                            <strong>Note / Example:</strong>
                            <pre style={{ whiteSpace: "pre-line", marginTop: 6 }}>{entry.working}</pre>
                        </>
                    )}
                </div>
            );
        }

        // calculation object like { answer, working, tolerance }
        if (entry.answer !== undefined || entry.working) {
            return (
                <div>
                    {entry.working && (
                        <>
                            <strong>Worked solution:</strong>
                            <pre style={{ whiteSpace: "pre-line", margin: "6px 0" }}>{entry.working}</pre>
                        </>
                    )}
                    {entry.answer !== undefined && (
                        <div style={{ marginTop: 8 }}>
                            <strong>Canonical answer:</strong>{" "}
                            <span>{String(entry.answer)}</span>
                            {entry.tolerance !== undefined && <span> (± {entry.tolerance})</span>}
                        </div>
                    )}
                </div>
            );
        }

        // fallback - pretty print object
        return <pre style={{ whiteSpace: "pre-line" }}>{JSON.stringify(entry, null, 2)}</pre>;
    };

    return (
        <div
            style={{
                padding: 15,
                border: "1px solid #ccc",
                borderRadius: 8,
                marginBottom: 20,
                background: "#fff"
            }}
        >
            {/* Header */}
            <p style={{ fontWeight: "bold", marginBottom: 8 }}>
                {item.number ? `${item.number}. ` : ""}{item.question}
            </p>

            {/* Optional diagram */}
            {item.diagram && (
                <img
                    src={item.diagram}
                    alt="diagram"
                    style={{ maxWidth: "100%", border: "1px solid #ccc", margin: "10px 0" }}
                />
            )}

            {/* Info text */}
            {item.type === "info" && (
                <div style={{ marginTop: 8, padding: 8, background: "#fafafa", borderRadius: 6 }}>
                    <em>{item.text}</em>
                </div>
            )}

            {/* Diagram placeholder + textarea */}
            {item.type === "diagram-label" && (
                <>
                    <div
                        style={{
                            border: "2px dashed #aaa",
                            height: 180,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 6,
                            marginTop: 10
                        }}
                    >
                        (Diagram placeholder)
                    </div>

                    <textarea
                        disabled={submitted}
                        value={userAnswer || ""}
                        onChange={handleTextChange}
                        placeholder="Label the diagram here..."
                        style={{ width: "100%", minHeight: 90, marginTop: 10, padding: 8, fontFamily: "inherit" }}
                    />
                </>
            )}

            {/* SHORT (single-line text) */}
            {item.type === "short" && (
                <input
                    type="text"
                    disabled={submitted}
                    value={userAnswer || ""}
                    onChange={handleTextChange}
                    placeholder="Enter your answer..."
                    style={{ width: "100%", marginTop: 10, padding: 8 }}
                />
            )}

            {/* NUMERIC (single-line numeric input) */}
            {item.type === "numeric" && (
                <input
                    type="text"
                    inputMode="decimal"
                    disabled={submitted}
                    value={userAnswer || ""}
                    onChange={(e) => setAnswer(item.number, e.target.value)}
                    placeholder="Enter numeric answer (units optional)"
                    style={{ width: "100%", marginTop: 10, padding: 8 }}
                />
            )}

            {/* CALCULATION (alias for numeric / final answer) */}
            {item.type === "calculation" && (
                <input
                    type="text"
                    inputMode="decimal"
                    disabled={submitted}
                    value={userAnswer || ""}
                    onChange={(e) => setAnswer(item.number, e.target.value)}
                    placeholder="Enter final numeric answer (units optional)"
                    style={{ width: "100%", marginTop: 10, padding: 8 }}
                />
            )}

            {/* WRITTEN (long answer) */}
            {item.type === "written" && (
                <textarea
                    disabled={submitted}
                    value={userAnswer || ""}
                    onChange={handleTextChange}
                    placeholder="Write your answer..."
                    style={{ width: "100%", minHeight: 120, marginTop: 10, padding: 8, fontFamily: "inherit" }}
                />
            )}

            {/* MCQ */}
            {item.type === "mcq" && (
                <div style={{ marginTop: 10 }}>
                    {item.options.map((opt, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isSelected = userAnswer === letter;
                        return (
                            <div
                                key={idx}
                                onClick={() => handleMCQClick(letter)}
                                role="button"
                                tabIndex={0}
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "flex-start",
                                    padding: 10,
                                    marginBottom: 8,
                                    border: "1px solid #eee",
                                    borderRadius: 6,
                                    cursor: submitted ? "not-allowed" : "pointer",
                                    background: isSelected ? "#e8f0fe" : "white"
                                }}
                            >
                                <strong style={{ width: 22 }}>{letter}</strong>
                                <div style={{ flex: 1 }}>{opt}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* TABLE type */}
            {item.type === "table" && (
                <div style={{ marginTop: 10 }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                        <tr>
                            {item.tableHeader.map((h, i) => (
                                <th key={i} style={{ border: "1px solid #ccc", padding: 8, background: "#f1f1f1", textAlign: "center" }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {item.tableRows.map((row, i) => {
                            const isSelected = userAnswer === row.letter;
                            return (
                                <tr
                                    key={i}
                                    onClick={() => !submitted && setAnswer(item.number, row.letter)}
                                    style={{ cursor: submitted ? "not-allowed" : "pointer", background: isSelected ? "#e8f0fe" : "white" }}
                                >
                                    <td style={{ border: "1px solid #ccc", padding: 8, textAlign: "center" }}>{row.letter}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{row.col1}</td>
                                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{row.col2}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* SHOW WORKING - visible below each question after submit */}
            {item.number && submitted && (
                <div style={{ marginTop: 12 }}>
                    <button
                        onClick={() => setShowWorking(s => !s)}
                        style={{
                            padding: "8px 12px",
                            background: "#222",
                            color: "white",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer"
                        }}
                        type="button"
                    >
                        {showWorking ? "Hide working" : "Show working"}
                    </button>

                    {showWorking && (
                        <div
                            style={{
                                marginTop: 10,
                                padding: 12,
                                background: "#f6f9ff",
                                border: "1px solid #e1e8ff",
                                borderRadius: 8
                            }}
                        >
                            <strong>Memo / Working for {item.number}:</strong>
                            <div style={{ marginTop: 8 }}>
                                {renderMemo(memoEntry)}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}


