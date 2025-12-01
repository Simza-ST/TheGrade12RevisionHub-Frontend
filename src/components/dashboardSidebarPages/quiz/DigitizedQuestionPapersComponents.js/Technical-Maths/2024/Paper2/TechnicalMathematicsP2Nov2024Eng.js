
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const TechnicalMathematicsP2Nov2024Eng = ({ paperId }) => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [recording, setRecording] = useState(false);
    const [recordError, setRecordError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [revealedAnswers, setRevealedAnswers] = useState({});
    const [solutionModal, setSolutionModal] = useState({
        open: false,
        questionId: null,
        content: ""
    });

    // Complete answer key for all questions
    const answerKey = {
        // Question 1
        'q1-1': ["-2/3", "-0.67"],
        'q1-2': ["33.69°", "33.69", "33.7°"],
        'q1-3': ["√13", "3.61"],
        'q1-4': ["(1,2)", "1,2"],
        'q1-5': ["y=1.5x+0.5", "y=3/2x+1/2"],

        // Question 2
        'q2-1-1': ["x²+y²=25"],
        'q2-1-2': ["(-5,0)", "-5,0"],
        'q2-1-3': ["y=0.75x+3.75", "y=3/4x+15/4"],
        'q2-1-4': ["3.75", "15/4"],
        'q2-2-1': ["x²/9 + y²/16 = 1"],
        'q2-2-2': ["ellipse with x-intercepts ±3, y-intercepts ±4"],

        // Question 3
        'q3-1-1': ["45°", "45"],
        'q3-1-2': ["0.71", "√2/2"],
        'q3-1-3': ["0.87", "√3/2"],
        'q3-2-1': ["-4/5", "-0.8"],
        'q3-2-2': ["-7/25", "-0.28"],
        'q3-3': ["135°,315°", "135,315", "135° and 315°"],

        // Question 4
        'q4-1-1': ["1/sinθ"],
        'q4-1-2': ["cosθ"],
        'q4-1-3': ["-tanθ"],
        'q4-2-1': ["sin²θ+cos²θ=1"],
        'q4-2-2': ["proof completed"],

        // Question 5
        'q5-1': ["graphs sketched"],
        'q5-2-1': ["180°", "180", "π radians"],
        'q5-2-2': ["45°,225°", "45,225"],
        'q5-2-3': ["2"],
        'q5-2-4': ["y=2sin(2x)", "y=2sin2x"],

        // Question 6
        'q6-1': ["90°", "90"],
        'q6-2': ["12m", "12"],
        'q6-3': ["8m", "8"],
        'q6-4': ["30°", "30"],

        // Question 7
        'q7-1': ["radius perpendicular to chord"],
        'q7-2': ["opposite angles supplementary"],
        'q7-3': ["∠D=60°,∠O=120°,DN=8cm"],
        'q7-4': ["∠A=∠C=60°"],
        'q7-5': ["opposite angles not supplementary"],

        // Question 8
        'q8-1-1': ["40°", "40"],
        'q8-1-2': ["80°", "80"],
        'q8-2-1': ["50°", "50"],
        'q8-2-2': ["∠P=∠R=70°"],

        // Question 9
        'q9-1': ["6cm", "6"],
        'q9-2': ["12cm", "12"],
        'q9-3': ["8cm", "8"],
        'q9-4': ["AA similarity"],
        'q9-5': ["10cm", "10"],

        // Question 10
        'q10-1-1': ["0.8 rev/s"],
        'q10-1-2': ["0.4m"],
        'q10-1-3': ["0.8m"],
        'q10-1-4': ["1.21 m/s"],
        'q10-1-5': ["48cm", "0.48m"],
        'q10-2-1': ["1.05 rad", "π/3"],
        'q10-2-2': ["33.51 cm²"],
        'q10-2-3': ["16cm"],
        'q10-2-4': ["8.38cm"],

        // Question 11
        'q11-1-1': ["300cm", "3m"],
        'q11-1-2': ["75cm", "0.75m"],
        'q11-1-3': ["2.81 m²"],
        'q11-1-4': ["yes", "sufficient"],
        'q11-2-1': ["7200 cm²"],
        'q11-2-2': ["40cm"],
        'q11-2-3': ["48000 cm³"]
    };

    // Solutions for each question
    const solutions = {
        'q1-1': "Gradient = (y2-y1)/(x2-x1) = (0-2)/(4-1) = -2/3",
        'q1-2': "Angle = arctan(|gradient|) = arctan(2/3) ≈ 33.69°",
        'q1-3': "Distance = √[(x2-x1)²+(y2-y1)²] = √[(4-2)²+(0-3)²] = √[4+9] = √13",
        'q1-4': "Midpoint = ((x1+x2)/2, (y1+y2)/2) = ((1+1)/2, (4+0)/2) = (1,2)",
        'q1-5': "Perpendicular gradient = 3/2, equation: y-2 = 1.5(x-1) → y=1.5x+0.5",

        'q2-1-1': "Center (0,0), radius = 5 → x²+y²=25",
        'q2-1-2': "x-intercept when y=0: x²=25 → x=±5 → S(-5,0)",
        'q2-1-3': "Tangent at (3,4): gradient = -3/4, equation: y-4=-3/4(x-3) → y=-0.75x+6.25",
        'q2-1-4': "y-intercept when x=0: y=3.75",
        'q2-2-1': "Standard form: x²/9 + y²/16 = 1",
        'q2-2-2': "Ellipse centered at origin with horizontal radius 3, vertical radius 4",

        'q3-1-1': "2.5 rad × 180/π ≈ 143.24°, but question asks for conversion method",
        'q3-1-2': "sin(45°) = √2/2 ≈ 0.71",
        'q3-1-3': "cos(30°) = √3/2 ≈ 0.87",
        'q3-2-1': "sinθ = -4/5 in QIII → cosθ = -3/5, tanθ = 4/3",
        'q3-2-2': "sin2θ = 2sinθcosθ = 2(-4/5)(-3/5) = 24/25",
        'q3-3': "2cos²x-1=0 → cos²x=1/2 → cosx=±√2/2 → x=45°,135°,225°,315° but in range: 135°,315°",

        'q4-1-1': "cosecθ = 1/sinθ",
        'q4-1-2': "cos(2π+θ) = cosθ (period 2π)",
        'q4-1-3': "tan(π+θ) = tanθ (period π)",
        'q4-2-1': "Fundamental identity: sin²θ+cos²θ=1",
        'q4-2-2': "Proof using trigonometric identities and algebraic manipulation",

        'q5-1': "Graph of f(x)=2cosx with amplitude 2, period 360°; graph of g(x)=tanx with asymptotes at 90°,270°",
        'q5-2-1': "Period of tanx is 180°",
        'q5-2-2': "2cosx=√2 → cosx=√2/2 → x=45°,315° but in given range: 45°,225°",
        'q5-2-3': "Amplitude of 2cosx is 2",
        'q5-2-4': "Period halved: coefficient becomes 2, range [-2,2] maintained: y=2sin(2x)",

        'q6-1': "Angle N = 180°-60°-30°=90°",
        'q6-2': "Using sine rule in ΔTRN: TR/sin30°=TN/sin60° → TR=12m",
        'q6-3': "PT = PR×tan(angle of elevation) = 12×tan(33.69°)≈8m",
        'q6-4': "Using trigonometric ratios in right triangle: angle = 30°",

        'q7-1': "Radius perpendicular to chord bisects it",
        'q7-2': "Opposite angles of cyclic quadrilateral sum to 180°",
        'q7-3': "∠D=60° (angles in triangle), ∠O=120° (central angle), DN=8cm (Pythagoras)",
        'q7-4': "Angles in the same segment are equal",
        'q7-5': "Sum of opposite angles ≠ 180°",

        'q8-1-1': "Angle in alternate segment = 40°",
        'q8-1-2': "Angle at center = 2×angle at circumference = 80°",
        'q8-2-1': "Angles in same segment = 50°",
        'q8-2-2': "Alternate segment theorem and angle sum of triangle",

        'q9-1': "VW = WT = 6cm (W is midpoint)",
        'q9-2': "Using similar triangles: RP/PS = RV/VW → RP=12cm",
        'q9-3': "PV ∥ SW → PV = 2×QW = 3cm",
        'q9-4': "AA similarity: ∠RPV=∠RSW, ∠RVP=∠RWS",
        'q9-5': "Using similarity ratio: SW/PV = RW/RV → SW=10cm",

        'q10-1-1': "48 rpm ÷ 60 = 0.8 rev/s",
        'q10-1-2': "40 cm = 0.4 m",
        'q10-1-3': "Diameter = 2×0.4 = 0.8 m",
        'q10-1-4': "v = π×D×n = π×0.8×0.8 ≈ 2.01 m/s",
        'q10-1-5': "Using chord length formula: x=√[4h(d-h)] where d=80cm, h=8cm → x≈48cm",
        'q10-2-1': "60° × π/180 = π/3 ≈ 1.05 rad",
        'q10-2-2': "Area = ½r²θ = ½×8²×(π/3)≈33.51 cm²",
        'q10-2-3': "AC = AB+BC = 10+6 = 16 cm",
        'q10-2-4': "Arc length = rθ = 10×(π/3)≈10.47 cm",

        'q11-1-1': "Length of wall = 3 m = 300 cm",
        'q11-1-2': "Width per part = 300÷4 = 75 cm",
        'q11-1-3': "Area using mid-ordinate rule = width×(average ordinate) = 0.75×3.745≈2.81 m²",
        'q11-1-4': "Total wall area = 3×2=6 m², plastered area=2.81 m², remaining=3.19 m², cost=3.19×300=957 < 1700 → sufficient",
        'q11-2-1': "Surface area = 4×(60×10)+2×(60×60)=7200 cm²",
        'q11-2-2': "Using Pythagoras: x=√(50²-30²)=40 cm",
        'q11-2-3': "Volume = volume of prism + volume of pyramid = (60×60×10)+(1/3×60×60×40)=48000 cm³"
    };

    // Normalize answers for comparison
    const normalizeAnswer = (answer) => {
        return answer
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/[^a-z0-9=.\-<>/]/g, '');
    };

    // Check if answer is correct
    const isAnswerCorrect = (questionId, answer) => {
        if (!answer) return false;

        const normalized = normalizeAnswer(answer);
        const correctAnswers = answerKey[questionId] || [];

        return correctAnswers.some(correct =>
            normalizeAnswer(correct) === normalized
        );
    };

    const handleInputChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const recordPerformance = async (scoreData) => {
        setRecording(true);
        setRecordError(null);

        try {
            // Simulate API call - replace with actual API integration
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Performance recorded:', scoreData);
        } catch (err) {
            setRecordError(err.message);
            console.error('Recording error:', err);
        } finally {
            setRecording(false);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        let total = 0;

        // Count total questions and check answers
        Object.keys(answerKey).forEach(qId => {
            total++;
            if (isAnswerCorrect(qId, answers[qId])) {
                correct++;
            }
        });

        const percentage = ((correct / total) * 100).toFixed(2);
        return { correct, total, percentage };
    };

    const submitAnswers = () => {
        const scoreData = calculateScore();
        setScore(scoreData);
        setShowResults(true);
        recordPerformance(scoreData);
    };

    // Reset the exam for another attempt
    const handleRetry = () => {
        setAnswers({});
        setScore(null);
        setShowResults(false);
        setRecordError(null);
        setRevealedAnswers({});
    };

    // Navigate back to the papers list
    const handleExit = () => {
        navigate('/digitized-question-papers');
    };

    const showSolution = (questionId) => {
        setSolutionModal({
            open: true,
            questionId,
            content: solutions[questionId] || "Solution not available for this question"
        });
    };

    const showAnswer = (questionId) => {
        const correctAnswer = answerKey[questionId]?.[0] || "No answer available";
        setRevealedAnswers(prev => ({
            ...prev,
            [questionId]: correctAnswer
        }));
    };

    // Render input with validation and solution buttons
    const renderInput = (questionId, placeholder, isWide = false) => {
        const value = answers[questionId] || '';
        const revealedAnswer = revealedAnswers[questionId];

        const isCorrect = showResults && isAnswerCorrect(questionId, value);
        const isIncorrect = showResults && value && !isCorrect;

        return (
            <div className="input-container">
                <input
                    type="text"
                    className={`input ${isWide ? 'wide-input' : ''} ${isCorrect ? 'correct-answer' : ''} ${isIncorrect ? 'incorrect-answer' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => handleInputChange(questionId, e.target.value)}
                    disabled={showResults}
                />

                {showResults && (
                    <div className="solution-buttons">
                        <button
                            className="solution-button"
                            onClick={() => showAnswer(questionId)}
                        >
                            View Answer
                        </button>
                        <button
                            className="solution-button"
                            onClick={() => showSolution(questionId)}
                        >
                            View Solution
                        </button>
                    </div>
                )}

                {revealedAnswer && (
                    <div className="revealed-answer">
                        <strong>Correct Answer:</strong> {revealedAnswer}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="math-exam">
            {/* Solution Modal */}
            {solutionModal.open && (
                <div className="solution-modal">
                    <div className="modal-content">
                        <h3>Step-by-Step Solution</h3>
                        <p>{solutionModal.content}</p>
                        <button
                            className="modal-close"
                            onClick={() => setSolutionModal({ open: false, questionId: null, content: "" })}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <h1>TECHNICAL MATHEMATICS P2 - NOVEMBER 2024</h1>

            {/* QUESTION 1 */}
            <div className="question-section">
                <h2>QUESTION 1</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>Triangle ABC with vertices A(1;4), B(4;0), C(2;3)</p>

                        <div className="sub-question">
                            <p>1.1 Determine the gradient of AC</p>
                            {renderInput('q1-1', 'Gradient', true)}
                        </div>

                        <div className="sub-question">
                            <p>1.2 Determine the size of angle α</p>
                            {renderInput('q1-2', 'Angle in degrees', true)}
                        </div>

                        <div className="sub-question">
                            <p>1.3 Determine the length of BC</p>
                            {renderInput('q1-3', 'Length', true)}
                        </div>

                        <div className="sub-question">
                            <p>1.4 Determine the coordinates of M (midpoint of CA)</p>
                            {renderInput('q1-4', 'Coordinates (x,y)', true)}
                        </div>

                        <div className="sub-question">
                            <p>1.5 Determine the equation of the line through M, perpendicular to CA</p>
                            {renderInput('q1-5', 'Equation y=...', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 2 */}
            <div className="question-section">
                <h2>QUESTION 2</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>2.1 Circle with tangent PR at point P(3;4)</p>

                        <div className="sub-question">
                            <p>2.1.1 Determine the equation of the circle</p>
                            {renderInput('q2-1-1', 'Equation', true)}
                        </div>

                        <div className="sub-question">
                            <p>2.1.2 Write down the coordinates of S</p>
                            {renderInput('q2-1-2', 'Coordinates', true)}
                        </div>

                        <div className="sub-question">
                            <p>2.1.3 Determine the equation of the tangent</p>
                            {renderInput('q2-1-3', 'Equation y=...', true)}
                        </div>

                        <div className="sub-question">
                            <p>2.1.4 Write down the y-coordinate of point R</p>
                            {renderInput('q2-1-4', 'y-coordinate', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>2.2 Given: 16x² + 9y² = 144</p>

                        <div className="sub-question">
                            <p>2.2.1 Express in standard form</p>
                            {renderInput('q2-2-1', 'Standard form', true)}
                        </div>

                        <div className="sub-question">
                            <p>2.2.2 Sketch the graph of the ellipse</p>
                            {renderInput('q2-2-2', 'Description', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 3 */}
            <div className="question-section">
                <h2>QUESTION 3</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>3.1 Given: θ = 2.5 rad and β = 45°</p>

                        <div className="sub-question">
                            <p>3.1.1 Convert 2.5 rad to degrees</p>
                            {renderInput('q3-1-1', 'Degrees', true)}
                        </div>

                        <div className="sub-question">
                            <p>3.1.2 sinβ</p>
                            {renderInput('q3-1-2', 'Value', true)}
                        </div>

                        <div className="sub-question">
                            <p>3.1.3 cos(β - 15°)</p>
                            {renderInput('q3-1-3', 'Value', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>3.2 Point P(-3,-4) with angle of inclination θ</p>

                        <div className="sub-question">
                            <p>3.2.1 tanθ</p>
                            {renderInput('q3-2-1', 'Value', true)}
                        </div>

                        <div className="sub-question">
                            <p>3.2.2 sin2θ</p>
                            {renderInput('q3-2-2', 'Value', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>3.3 Solve: 2cos²x - 1 = 0 for x ∈ [0°,360°]</p>
                        {renderInput('q3-3', 'x values', true)}
                    </div>
                </div>
            </div>

            {/* QUESTION 4 */}
            <div className="question-section">
                <h2>QUESTION 4</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>4.1 Simplify:</p>

                        <div className="sub-question">
                            <p>4.1.1 cosecθ</p>
                            {renderInput('q4-1-1', 'Expression', true)}
                        </div>

                        <div className="sub-question">
                            <p>4.1.2 cos(2π + θ)</p>
                            {renderInput('q4-1-2', 'Expression', true)}
                        </div>

                        <div className="sub-question">
                            <p>4.1.3 tan(π + θ)</p>
                            {renderInput('q4-1-3', 'Expression', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>4.2 Trigonometric identities</p>

                        <div className="sub-question">
                            <p>4.2.1 Complete the identity: sin²θ + cos²θ = ...</p>
                            {renderInput('q4-2-1', 'Identity', true)}
                        </div>

                        <div className="sub-question">
                            <p>4.2.2 Prove the given identity</p>
                            {renderInput('q4-2-2', 'Proof steps', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 5 */}
            <div className="question-section">
                <h2>QUESTION 5</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>Functions: f(x) = 2cosx and g(x) = tanx for x ∈ [0°,360°]</p>

                        <div className="sub-question">
                            <p>5.1 Sketch the graphs of f and g</p>
                            {renderInput('q5-1', 'Graph description', true)}
                        </div>

                        <div className="sub-question">
                            <p>5.2 Use graphs to determine:</p>

                            <div className="sub-question">
                                <p>5.2.1 Period of g</p>
                                {renderInput('q5-2-1', 'Period', true)}
                            </div>

                            <div className="sub-question">
                                <p>5.2.2 Two values of x where f(x) = √2</p>
                                {renderInput('q5-2-2', 'x values', true)}
                            </div>

                            <div className="sub-question">
                                <p>5.2.3 Amplitude of f(x)</p>
                                {renderInput('q5-2-3', 'Amplitude', true)}
                            </div>

                            <div className="sub-question">
                                <p>5.2.4 Equation h if period of g is halved and range is [-2,2]</p>
                                {renderInput('q5-2-4', 'Equation', true)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 6 */}
            <div className="question-section">
                <h2>QUESTION 6</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>Points T, R, N in horizontal plane with angles and distances</p>

                        <div className="sub-question">
                            <p>6.1 Write down the size of angle N</p>
                            {renderInput('q6-1', 'Angle in degrees', true)}
                        </div>

                        <div className="sub-question">
                            <p>6.2 Determine the length of TR</p>
                            {renderInput('q6-2', 'Length in meters', true)}
                        </div>

                        <div className="sub-question">
                            <p>6.3 Determine the length of PT</p>
                            {renderInput('q6-3', 'Length in meters', true)}
                        </div>

                        <div className="sub-question">
                            <p>6.4 Determine the angle at point P</p>
                            {renderInput('q6-4', 'Angle in degrees', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 7 */}
            <div className="question-section">
                <h2>QUESTION 7</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>Circle geometry with center O and cyclic quadrilateral</p>

                        <div className="sub-question">
                            <p>7.1 Reason why OM ⟂ DC</p>
                            {renderInput('q7-1', 'Reason', true)}
                        </div>

                        <div className="sub-question">
                            <p>7.2 Reason why DMON is cyclic</p>
                            {renderInput('q7-2', 'Reason', true)}
                        </div>

                        <div className="sub-question">
                            <p>7.3 Complete the table with angles and lengths</p>
                            {renderInput('q7-3', 'Values', true)}
                        </div>

                        <div className="sub-question">
                            <p>7.4 Prove ∠A = ∠C</p>
                            {renderInput('q7-4', 'Proof', true)}
                        </div>

                        <div className="sub-question">
                            <p>7.5 Show AOCB is not cyclic</p>
                            {renderInput('q7-5', 'Explanation', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 8 */}
            <div className="question-section">
                <h2>QUESTION 8</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>8.1 Circle PSTRN with chords and angles</p>

                        <div className="sub-question">
                            <p>8.1.1 Determine ∠T</p>
                            {renderInput('q8-1-1', 'Angle in degrees', true)}
                        </div>

                        <div className="sub-question">
                            <p>8.1.2 Determine ∠N</p>
                            {renderInput('q8-1-2', 'Angle in degrees', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>8.2 Circle with tangent PT and parallel lines</p>

                        <div className="sub-question">
                            <p>8.2.1 Determine ∠R</p>
                            {renderInput('q8-2-1', 'Angle in degrees', true)}
                        </div>

                        <div className="sub-question">
                            <p>8.2.2 Show ∠P = ∠R</p>
                            {renderInput('q8-2-2', 'Proof', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 9 */}
            <div className="question-section">
                <h2>QUESTION 9</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>Triangle RST with parallel lines and midpoints</p>

                        <div className="sub-question">
                            <p>9.1 Write down the length of VW</p>
                            {renderInput('q9-1', 'Length in cm', true)}
                        </div>

                        <div className="sub-question">
                            <p>9.2 Determine the length of RP</p>
                            {renderInput('q9-2', 'Length in cm', true)}
                        </div>

                        <div className="sub-question">
                            <p>9.3 Write down the length of PV</p>
                            {renderInput('q9-3', 'Length in cm', true)}
                        </div>

                        <div className="sub-question">
                            <p>9.4 Prove ΔRPV ∥∥ ΔRSW</p>
                            {renderInput('q9-4', 'Proof', true)}
                        </div>

                        <div className="sub-question">
                            <p>9.5 Determine the length of SW</p>
                            {renderInput('q9-5', 'Length in cm', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 10 */}
            <div className="question-section">
                <h2>QUESTION 10</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>10.1 Bicycle wheel with radius 40 cm rotating at 48 rpm</p>

                        <div className="sub-question">
                            <p>10.1.1 Convert 48 rpm to rev/s</p>
                            {renderInput('q10-1-1', 'Revolutions per second', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.1.2 Radius in meters</p>
                            {renderInput('q10-1-2', 'Radius in m', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.1.3 Diameter in meters</p>
                            {renderInput('q10-1-3', 'Diameter in m', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.1.4 Circumferential velocity</p>
                            {renderInput('q10-1-4', 'Velocity in m/s', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.1.5 Length of chord AB when h=8cm</p>
                            {renderInput('q10-1-5', 'Length in cm', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>10.2 Meshed gears with radii 10cm, 8cm, 6cm</p>

                        <div className="sub-question">
                            <p>10.2.1 Convert 60° to radians</p>
                            {renderInput('q10-2-1', 'Radians', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.2.2 Area of shaded sector GBH</p>
                            {renderInput('q10-2-2', 'Area in cm²', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.2.3 Length of AC</p>
                            {renderInput('q10-2-3', 'Length in cm', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.2.4 Length of arc DF</p>
                            {renderInput('q10-2-4', 'Length in cm', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 11 */}
            <div className="question-section">
                <h2>QUESTION 11</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>11.1 Irregular plastered section on wall</p>

                        <div className="sub-question">
                            <p>11.1.1 Value of x</p>
                            {renderInput('q11-1-1', 'Length in cm', true)}
                        </div>

                        <div className="sub-question">
                            <p>11.1.2 Width of each equal part</p>
                            {renderInput('q11-1-2', 'Width in cm', true)}
                        </div>

                        <div className="sub-question">
                            <p>11.1.3 Area of shaded section</p>
                            {renderInput('q11-1-3', 'Area in m²', true)}
                        </div>

                        <div className="sub-question">
                            <p>11.1.4 Is R1700 sufficient for plastering?</p>
                            {renderInput('q11-1-4', 'Yes/No with reason', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>11.2 Pillar cap with pyramid and rectangular prism</p>

                        <div className="sub-question">
                            <p>11.2.1 Surface area of rectangular prism</p>
                            {renderInput('q11-2-1', 'Area in cm²', true)}
                        </div>

                        <div className="sub-question">
                            <p>11.2.2 Vertical height of pyramid</p>
                            {renderInput('q11-2-2', 'Height in cm', true)}
                        </div>

                        <div className="sub-question">
                            <p>11.2.3 Total volume of pillar cap</p>
                            {renderInput('q11-2-3', 'Volume in cm³', true)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="submission-section">
                <button
                    className="submit-button"
                    onClick={submitAnswers}
                    disabled={recording || showResults}
                >
                    {recording ? 'Submitting...' : 'Submit Answers'}
                </button>

                {score && (
                    <div className="score-display">
                        <h3>Your Score: {score.percentage}%</h3>
                        <p>({score.correct} out of {score.total} correct)</p>
                        {score.percentage >= 50 ? (
                            <p className="pass">Excellent work! You've passed!</p>
                        ) : (
                            <p className="fail">Keep practicing! You'll improve!</p>
                        )}

                        {recordError && (
                            <p className="error">Recording failed: {recordError}</p>
                        )}

                        <div className="action-buttons">
                            <button
                                className="retry-button"
                                onClick={handleRetry}
                            >
                                Retry Exam
                            </button>
                            <button
                                className="exit-button"
                                onClick={handleExit}
                            >
                                Exit
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS Styles - same as P1 component */}
            <style jsx>{`
                .math-exam {
                    font-family: 'Arial', sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: clamp(1rem, 3vw, 1.5rem);
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                    min-height: 100vh;
                }

                h1 {
                    font-size: clamp(1.5rem, 4vw, 2rem);
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: clamp(1rem, 2vw, 1.5rem);
                }

                h2 {
                    font-size: clamp(1.25rem, 3vw, 1.5rem);
                    color: #2c3e50;
                    margin-bottom: clamp(0.75rem, 2vw, 1rem);
                }
                
                .question-section {
                    margin-bottom: clamp(1rem, 3vw, 1.5rem);
                    padding: clamp(0.75rem, 2vw, 1rem);
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                    overflow: hidden;
                }

                .question {
                    padding: clamp(0.5rem, 1.5vw, 0.75rem);
                }

                .sub-question {
                    margin: clamp(0.5rem, 1.5vw, 0.75rem) 0;
                }

                .equation {
                    font-family: 'Times New Roman', serif;
                    font-style: italic;
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                }

                .input-container {
                    margin-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
                    width: 100%;
                }

                .input {
                    padding: clamp(0.5rem, 1.5vw, 0.75rem);
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                    width: 100%;
                    box-sizing: border-box;
                    transition: border-color 0.3s, background-color 0.3s;
                }

                .wide-input {
                    max-width: 100%;
                }

                .correct-answer {
                    border: 2px solid #4CAF50;
                    background-color: #e8f5e9;
                }

                .incorrect-answer {
                    border: 2px solid #f44336;
                    background-color: #ffebee;
                }

                .input-group {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: clamp(0.5rem, 1.5vw, 0.75rem);
                    margin: clamp(0.5rem, 1.5vw, 0.75rem) 0;
                }

                .solution-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: clamp(0.5rem, 1.5vw, 0.75rem);
                    margin-top: clamp(0.3rem, 1vw, 0.5rem);
                }

                .solution-button {
                    padding: clamp(0.4rem, 1vw, 0.5rem) clamp(0.6rem, 1.5vw, 0.75rem);
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: clamp(0.8rem, 2vw, 0.9rem);
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .solution-button:hover {
                    background-color: #2980b9;
                }

                .revealed-answer {
                    margin-top: clamp(0.3rem, 1vw, 0.5rem);
                    padding: clamp(0.5rem, 1.5vw, 0.75rem);
                    background-color: #e9f7ef;
                    border-left: 4px solid #28a745;
                    border-radius: 4px;
                    font-size: clamp(0.8rem, 2vw, 0.9rem);
                }

                .solution-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    padding: clamp(0.5rem, 1.5vw, 0.75rem);
                }

                .modal-content {
                    background-color: white;
                    padding: clamp(1rem, 3vw, 1.5rem);
                    border-radius: 8px;
                    max-width: clamp(300px, 90vw, 600px);
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
                }

                .modal-content h3 {
                    margin-top: 0;
                    color: #2c3e50;
                    font-size: clamp(1.2rem, 3vw, 1.5rem);
                    border-bottom: 2px solid #eee;
                    padding-bottom: clamp(0.5rem, 1.5vw, 0.75rem);
                }

                .modal-content p {
                    line-height: 1.6;
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                    white-space: pre-wrap;
                }

                .modal-close {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.25rem);
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: clamp(0.75rem, 2vw, 1rem);
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                }

                .modal-close:hover {
                    background-color: #2980b9;
                }

                .submit-button {
                    background-color: #2196F3;
                    color: white;
                    padding: clamp(0.6rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.5rem);
                    border: none;
                    border-radius: 4px;
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                    cursor: pointer;
                    transition: background-color 0.3s;
                    margin: clamp(1rem, 2.5vw, 1.25rem) auto;
                    display: block;
                    width: clamp(150px, 40vw, 200px);
                }

                .submit-button:hover:not(:disabled) {
                    background-color: #0b7dda;
                }

                .submit-button:disabled {
                    background-color: #bbbbbb;
                    cursor: not-allowed;
                }

                .score-display {
                    margin-top: clamp(1rem, 2.5vw, 1.25rem);
                    padding: clamp(0.75rem, 2vw, 1rem);
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    text-align: center;
                }

                .score-display h3 {
                    margin: 0 0 clamp(0.5rem, 1.5vw, 0.75rem);
                    font-size: clamp(1.2rem, 3vw, 1.5rem);
                    color: #333;
                }

                .pass {
                    color: #4CAF50;
                    font-weight: bold;
                    margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                }

                .fail {
                    color: #f44336;
                    font-weight: bold;
                    margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                }

                .error {
                    color: #f44336;
                    margin-top: clamp(0.5rem, 1.5vw, 0.75rem);
                    font-weight: bold;
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                }

                .action-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: clamp(0.5rem, 1.5vw, 0.75rem);
                    margin-top: clamp(0.75rem, 2vw, 1rem);
                }

                .retry-button, .exit-button {
                    padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2.5vw, 1.25rem);
                    border: none;
                    border-radius: 4px;
                    font-size: clamp(0.9rem, 2.5vw, 1rem);
                    cursor: pointer;
                    transition: all 0.3s;
                    font-weight: bold;
                    width: clamp(120px, 30vw, 150px);
                }

                .retry-button {
                    background-color: #4CAF50;
                    color: white;
                }

                .retry-button:hover {
                    background-color: #3e8e41;
                }

                .exit-button {
                    background-color: #f44336;
                    color: white;
                }

                .exit-button:hover {
                    background-color: #d32f2f;
                }

                /* Responsive styles */
                @media (max-width: 640px) {
                    .math-exam {
                        padding: clamp(0.5rem, 2vw, 0.75rem);
                    }

                    h1 {
                        font-size: clamp(1.25rem, 3.5vw, 1.5rem);
                    }

                    h2 {
                        font-size: clamp(1rem, 3vw, 1.25rem);
                    }

                    .question-section {
                        padding: clamp(0.5rem, 1.5vw, 0.75rem);
                    }

                    .input-group {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .input {
                        font-size: clamp(0.8rem, 2.2vw, 0.9rem);
                        padding: clamp(0.4rem, 1.2vw, 0.6rem);
                    }

                    .solution-button {
                        font-size: clamp(0.7rem, 1.8vw, 0.8rem);
                        padding: clamp(0.3rem, 0.8vw, 0.4rem) clamp(0.5rem, 1.2vw, 0.6rem);
                    }

                    .submit-button {
                        width: 100%;
                        max-width: 100%;
                    }

                    .retry-button, .exit-button {
                        width: 100%;
                        max-width: 100%;
                    }

                    .modal-content {
                        max-width: 90vw;
                        padding: clamp(0.75rem, 2vw, 1rem);
                    }

                    .modal-content h3 {
                        font-size: clamp(1rem, 2.5vw, 1.25rem);
                    }

                    .modal-content p {
                        font-size: clamp(0.8rem, 2vw, 0.9rem);
                    }
                }
            `}</style>
        </div>
    );
};

export default TechnicalMathematicsP2Nov2024Eng;