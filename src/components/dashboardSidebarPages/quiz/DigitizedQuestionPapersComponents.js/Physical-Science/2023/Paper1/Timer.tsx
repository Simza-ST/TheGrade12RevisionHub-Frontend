
import { useEffect, useState } from "react";

export default function Timer({
                                  duration = 7200,       // 120 minutes
                                  onExpire,
                                  allowPause = false     // admin control: false = pause disabled
                              }) {
    const [time, setTime] = useState(duration);
    const [paused, setPaused] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (paused) return;

        if (time <= 0) {
            onExpire && onExpire(); // AUTO-SUBMIT
            return;
        }

        const interval = setInterval(() => {
            setTime((t) => t - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time, paused]);

    const mins = Math.floor(time / 60);
    const secs = time % 60;

    const isRed = time <= 600;
    const isBlink = time <= 300;

    const progress = (time / duration) * 100;

    // =====================
    // HANDLE PAUSE CLICK
    // =====================
    const handlePauseClick = () => {
        if (!allowPause) return; // admin locked
        if (!paused) {
            setShowConfirm(true);
        } else {
            setPaused(false);
        }
    };

    const confirmPause = () => {
        setPaused(true);
        setShowConfirm(false);
    };

    const cancelPause = () => {
        setShowConfirm(false);
    };

    return (
        <>
            {/* TIMER DISPLAY */}
            <div
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    zIndex: 9999,
                    backgroundColor: "white",
                    border: "2px solid black",
                    padding: "12px 20px",
                    borderRadius: "8px",
                    width: "220px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    fontFamily: "Arial, sans-serif"
                }}
            >
                <div
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: isRed ? "red" : "black",
                        animation: isBlink ? "blink 1s step-start infinite" : "none"
                    }}
                >
                    Time Left: {mins}:{secs < 10 ? "0" : ""}{secs}
                </div>

                {/* PROGRESS BAR */}
                <div style={{
                    marginTop: "10px",
                    height: "8px",
                    width: "100%",
                    backgroundColor: "#ddd",
                    borderRadius: "4px",
                    overflow: "hidden"
                }}>
                    <div
                        style={{
                            height: "100%",
                            width: `${progress}%`,
                            backgroundColor: isRed ? "red" : "#2e86de",
                            transition: "width 1s linear"
                        }}
                    ></div>
                </div>

                {/* PAUSE BUTTON */}
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                    <button
                        onClick={handlePauseClick}
                        disabled={!allowPause}
                        style={{
                            padding: "6px 12px",
                            fontSize: "14px",
                            cursor: allowPause ? "pointer" : "not-allowed",
                            borderRadius: "4px",
                            border: "1px solid black",
                            backgroundColor: paused ? "#2ecc71" : "#e67e22",
                            color: "white",
                            width: "100%",
                            opacity: allowPause ? 1 : 0.5
                        }}
                    >
                        {paused ? "Resume" : "Pause"}
                    </button>
                </div>

                <style>
                    {`
                        @keyframes blink {
                            50% { opacity: 0; }
                        }
                    `}
                </style>
            </div>

            {/* CONFIRM PAUSE MODAL */}
            {showConfirm && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 99999
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "350px",
                            textAlign: "center",
                            border: "2px solid black"
                        }}
                    >
                        <h3>Pause Confirmation</h3>
                        <p>Are you sure you want to pause the exam?</p>

                        <button
                            onClick={confirmPause}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#e74c3c",
                                color: "white",
                                border: "none",
                                marginRight: "10px",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Yes, Pause
                        </button>

                        <button
                            onClick={cancelPause}
                            style={{
                                padding: "8px 16px",
                                backgroundColor: "#2ecc71",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}









