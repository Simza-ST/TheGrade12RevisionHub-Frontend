export default function CoverPage({ onStart }) {
    return (
        <div style={{ padding: 30, maxWidth: 700, margin: "auto", textAlign: "center" }}>
            <h1 style={{ fontSize: 32, marginBottom: 10 }}>
                NATIONAL SENIOR CERTIFICATE
            </h1>

            <h2 style={{ marginBottom: 20 }}>
                PHYSICAL SCIENCES P1<br />
                NOVEMBER 2023
            </h2>

            <div style={{
                border: "2px solid black",
                padding: 20,
                marginBottom: 30,
                fontSize: 18
            }}>
                <p><strong>TIME:</strong> 3 hours</p>
                <p><strong>MARKS:</strong> 150</p>
            </div>

            <h3 style={{ textAlign: "left" }}>INSTRUCTIONS AND INFORMATION</h3>

            <ul style={{ textAlign: "left", lineHeight: "1.6" }}>
                <li>Read ALL the questions carefully.</li>
                <li>Number your answers correctly according to the numbering system used in this question paper.</li>
                <li>Show ALL calculations where applicable.</li>
                <li>Start EACH question on a new page.</li>
                <li>Use the data sheet provided.</li>
            </ul>

            <button
                onClick={onStart}
                style={{
                    padding: "12px 20px",
                    marginTop: 30,
                    fontSize: 18,
                    background: "black",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer"
                }}
            >
                START EXAM
            </button>
        </div>
    );
}
