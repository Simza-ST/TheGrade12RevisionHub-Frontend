import React from "react";

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
            <style jsx>
                {`
                    .modal-overlay {
                        position: fixed;
                        inset: 0;
                        background: rgba(16, 24, 40, 0.6);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 2000;
                    }
                    .modal {
                        background: white;
                        max-width: 900px;
                        width: 94%;
                        max-height: 86vh;
                        overflow: auto;
                        border-radius: 10px;
                        padding: 18px;
                        position: relative;
                    }
                    .modal-close {
                        position: absolute;
                        right: 10px;
                        top: 6px;
                        background: transparent;
                        border: none;
                        font-size: 26px;
                        cursor: pointer;
                    }
                    .modal h2 { margin: 0 0 8px; }
                    .modal-sub { color: #444; margin-bottom:12px; }

                    .modal-questions { display:flex; flex-direction:column; gap:12px; }
                    .modal-q { border-top: 1px dashed #ececec; padding-top:10px; }
                    .modal-q-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
                    .modal-q-image img { max-width:100%; height:auto; border-radius:6px; border:1px solid #eee; margin: 8px 0; }
                    .modal-your-text, .modal-model-text { margin-top:6px; }
                    .modal-award { margin-top:8px; font-weight:700; }

                    .modal-actions { margin-top: 12px; display:flex; justify-content:flex-end; gap:8px; }
                    .modal-close-btn { padding:8px 12px; border-radius:6px; border:none; background:#2b7be4; color:white; cursor:pointer; }

                    /* ensure question images visible & not hidden */
                    .q-image img, .modal img { max-width: 100%; height: auto; display:block; }

                    /* keep MCQ option styling */
                    .mcq-options { display:flex; flex-direction:column; gap:8px; }

                    /* ensure question card width fits inside paper */
                    .centered-paper { max-width: 980px; margin: 0 auto; } /* centers horizontally */

                    .modal-multi-images {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        margin-bottom: 15px;
                    }

                    .solution-img {
                        width: 100%;
                        max-height: 300px;
                        object-fit: contain;
                        border-radius: 8px;
                    }
                    
                `}
            </style>
        </div>
    );
}
