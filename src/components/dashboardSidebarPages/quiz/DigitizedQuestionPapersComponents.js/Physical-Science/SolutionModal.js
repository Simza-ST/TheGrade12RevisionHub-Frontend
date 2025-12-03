
import React from "react";
import "./SolutionModal.css";

export default function SolutionModal({ isOpen, onClose, question }) {
    if (!isOpen) return null;

    // support multiple solution images as `solutionImages` (array) or fallback to single `solutionImage` or `image`
    const solutionImages = Array.isArray(question.solutionImages)
        ? question.solutionImages
        : question.solutionImage
            ? [question.solutionImage]
            : question.images && Array.isArray(question.images) && question.images.length > 0
                ? question.images // if no explicit solution images, show question images as fallback
                : question.image
                    ? [question.image]
                    : [];

    const model = question.correctAnswerText;

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal">
                <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>

                <h3>{question.id} — Solution</h3>

                {solutionImages.length > 0 && (
                    <div className="modal-multi-images">
                        {solutionImages.map((img, i) => (
                            <img key={i} className="solution-img" src={img} alt={`solution-${question.id}-${i}`} />
                        ))}
                    </div>
                )}

                <div className="modal-model">
                    <strong>Model answer:</strong>
                    {Array.isArray(model) ? (
                        <ul className="model-answer-list">
                            {model.map((line, i) => <li key={i}>{line}</li>)}
                        </ul>
                    ) : (
                        <div style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{String(model || "(no model answer provided)")}</div>
                    )}
                </div>

                <div className="modal-marks" style={{ marginTop: 10 }}>
                    <strong>Marks:</strong> {question.marks || 0}
                </div>

                <div style={{ marginTop: 12, textAlign: "right" }}>
                    <button className="modal-close-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
