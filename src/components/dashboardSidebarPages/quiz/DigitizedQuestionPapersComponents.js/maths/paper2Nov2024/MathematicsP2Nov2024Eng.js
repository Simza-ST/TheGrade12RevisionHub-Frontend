import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import q1 from './q1.png';
import q2 from './q2.png';
import q3 from './q3.png';
import q4 from './q4.png';
import q5 from './q5.png';
import q7 from './q7.png';
import q8 from './q8.png';
import q9 from './q9.png';
import q10_1 from './q10-1.png';
import q10_2 from './q10-2.png';
import q11 from './q11.png';

const MathematicsP2Nov2024Eng = ({ paperId }) => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [revealedAnswers, setRevealedAnswers] = useState({});
    const [solutionModal, setSolutionModal] = useState({
        open: false,
        questionId: null,
        content: ""
    });

    // Answer key for the November 2024 exam
    const answerKey = {
        // Question 1
        'q1-1': ["y = -0.67x + 38.67", "y = -0.67x + 38.67"],
        'q1-2': ["-0.85", "-0.85"],
        'q1-3': ["19", "19"],
        'q1-4': ["18.8", "18.8"],
        'q1-5': ["No change", "Remains the same"],
        'q1-6': ["5", "5"],

        // Question 2
        'q2-1': ["45", "45"],
        'q2-2': ["30", "30"],
        'q2-3': ["45", "45"],
        'q2-5': ["25%", "25%"],
        'q2-6': ["30", "30"],

        // Question 3
        'q3-1': ["-1.5", "-1.5"],
        'q3-2': ["y = -1.5x - 4.5", "y = -1.5x - 4.5"],
        'q3-4': ["15", "15"],
        'q3-5': ["2:3", "2:3"],
        'q3-6': ["1:4", "1:4"],
        'q3-7': ["(-6, 15)", "(-6, 15)"],

        // Question 4
        'q4-1': ["(1, -3)", "(1, -3)"],
        'q4-2': ["y = -0.5x + 10.5", "y = -0.5x + 10.5"],
        'q4-4': ["7", "7"],
        'q4-5': ["53.13°", "53.13°"],

        // Question 5
        'q5-1-1': ["-0.6", "-0.6"],
        'q5-1-2': ["-0.28", "-0.28"],
        'q5-1-3': ["0.8", "0.8"],
        'q5-2': ["(p - 1)/2", "(p - 1)/2"],

        // Question 6
        'q6-1-1': ["cos(x+y) = cosxcosy - sinxsiny", "cos(x+y) = cosxcosy - sinxsiny"],
        'q6-2': ["30°, 150°", "30°, 150°"],
        'q6-3-1': ["4/3", "4/3"],
        'q6-3-2': ["45°", "45°"],

        // Question 7
        'q7-1': ["x = 90°", "x = 90°"],
        'q7-2': ["-180° ≤ x ≤ -90°, -90° ≤ x ≤ 0°", "-180° ≤ x ≤ -90°, -90° ≤ x ≤ 0°"],
        'q7-3-1': ["180°", "180°"],
        'q7-4': ["x = 45° + n·90°", "x = 45° + n·90°"],

        // Question 8
        'q8-1': ["15.2 m", "15.2 m"],
        'q8-2': ["4.5 m", "4.5 m"],

        // Question 9
        'q9-1': ["23°", "23°"],

        // Question 10
        'q10-2-2': ["20 units", "20 units"],

        // Question 11
        'q11-1': ["∠ACD = x, ∠ADC = x, ∠DCF = x, ∠FCE = x", "∠ACD = x, ∠ADC = x, ∠DCF = x, ∠FCE = x"]
    };

    // Solutions for each question
    const solutions = {
        'q1-1': "Using the least squares regression formula: y = ax + b, where a = Σ((x-x̄)(y-ȳ))/Σ((x-x̄)²) and b = ȳ - ax̄",
        'q1-2': "Correlation coefficient r = Σ((x-x̄)(y-ȳ))/√(Σ((x-x̄)²)Σ((y-ȳ)²)) ≈ -0.85",
        'q1-3': "Substitute x = 29 into the regression equation: y = -0.67(29) + 38.67 ≈ 19",
        'q1-4': "Mean = Σy/n = (26+21+6+20+16+26+23+7+18+14+17+8+28+25+20)/15 ≈ 18.8",
        'q1-5': "Adding a constant to all values does not change the standard deviation",
        'q1-6': "The maximum increase needed is the vertical distance from any point below the regression line to the line",

        'q2-1': "Median is the 30th value on the cumulative frequency graph, which occurs at 45 minutes",
        'q2-2': "Lower quartile is the 15th value on the cumulative frequency graph, which occurs at 30 minutes",
        'q2-3': "IQR = Q3 - Q1 = 75 - 30 = 45 minutes (Q3 is the 45th value at 75 minutes)",
        'q2-5': "Percentage = (number with travel time ≥ 60 minutes)/60 × 100% = 15/60 × 100% = 25%",
        'q2-6': "Time above 60 minutes = 110 - 60 = 50 minutes. Number of 20-minute intervals = 50/20 = 2.5 → 3 intervals. Time allowed = 3 × 15 minutes = 45 minutes",

        'q3-1': "Gradient of DC = (y₂ - y₁)/(x₂ - x₁) = (-9 - 0)/(3 - (-9)) = -9/12 = -0.75",
        'q3-2': "Using point-slope form: y - y₁ = m(x - x₁) → y - 0 = -0.75(x + 9) → y = -0.75x - 6.75",
        'q3-3': "Substitute B(-1, k) into the equation: k = -0.75(-1) - 6.75 = 0.75 - 6.75 = -6",
        'q3-4': "Distance DC = √((3 - (-9))² + (-9 - 0)²) = √(12² + (-9)²) = √(144 + 81) = √225 = 15",
        'q3-5': "DB:BC = distance from D to B : distance from B to C = √((3 - (-1))² + (-9 - (-6))²) : √((-1 - (-9))² + (-6 - 0)²) = √(16 + 9):√(64 + 36) = √25:√100 = 5:10 = 1:2",
        'q3-6': "Since AC ∥ MB, triangles ACD and MBD are similar. The ratio of areas is the square of the ratio of corresponding sides",
        'q3-7': "Using the distance formula and gradient information to solve for coordinates of A",

        // Additional solutions would be added here for all questions
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
    };

    // Reset the exam for another attempt
    const handleRetry = () => {
        setAnswers({});
        setScore(null);
        setShowResults(false);
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

            <h1>MATHEMATICS P2 - NOVEMBER 2024</h1>

            {/* QUESTION 1 */}
            <div className="question-section">
                <h2>QUESTION 1</h2>
                <p>At the beginning of a season, the coach of a junior boys' rugby team recorded the weight (in kg) of the 15 players in his team and the number of push-ups that each player was able to do in one minute.</p>
                <img src={q1} alt="Question 1 data and scatter plot" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>1.1 Determine the equation of the least squares regression line for the data. (3)</p>
                        {renderInput('q1-1', 'y = -0.67x + 38.67', true)}
                    </div>

                    <div className="sub-question">
                        <p>1.2 Write down the correlation coefficient. (1)</p>
                        {renderInput('q1-2', '-0.85')}
                    </div>

                    <div className="sub-question">
                        <p>1.3 Predict the number of push-ups that a member of the team, who weighs 29 kg, should do to meet the target. (2)</p>
                        {renderInput('q1-3', '19')}
                    </div>

                    <div className="sub-question">
                        <p>1.4 Write down the mean number of push-ups for the given data. (1)</p>
                        {renderInput('q1-4', '18.8')}
                    </div>

                    <div className="sub-question">
                        <p>1.5 How does the increase in the number of push-ups influence the standard deviation of the data? (1)</p>
                        {renderInput('q1-5', 'No change')}
                    </div>

                    <div className="sub-question">
                        <p>1.6 Determine the maximum possible increase in the number of push-ups that a team member must obtain to reach the minimum target. (2)</p>
                        {renderInput('q1-6', '5')}
                    </div>
                </div>
            </div>

            {/* QUESTION 2 */}
            <div className="question-section">
                <h2>QUESTION 2</h2>
                <p>The cumulative frequency graph (ogive) shows the time taken (in minutes) for 60 employees to travel to work each morning.</p>
                <img src={q2} alt="Question 2 cumulative frequency graph" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>2.1 Estimate the median travel time. (1)</p>
                        {renderInput('q2-1', '45 minutes')}
                    </div>

                    <div className="sub-question">
                        <p>2.2 Estimate the lower quartile. (1)</p>
                        {renderInput('q2-2', '30 minutes')}
                    </div>

                    <div className="sub-question">
                        <p>2.3 Estimate the interquartile range. (2)</p>
                        {renderInput('q2-3', '45 minutes')}
                    </div>

                    <div className="sub-question">
                        <p>2.4 The minimum and maximum times taken for an employee to travel to work are 5 and 120 minutes respectively. On the scaled line in the ANSWER BOOK, draw a box and whisker diagram to indicate the distribution of the data as represented in the ogive above. (2)</p>
                        <p className="note">[Diagram to be drawn in answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>2.5 What percentage of the employees will be allowed to work from home for part of the day? (2)</p>
                        {renderInput('q2-5', '25%')}
                    </div>

                    <div className="sub-question">
                        <p>2.6 On a certain day, an employee takes 110 minutes to travel to work. Calculate the number of minutes that this employee will be allowed to work from home on this day. (2)</p>
                        {renderInput('q2-6', '45 minutes')}
                    </div>
                </div>
            </div>

            {/* QUESTION 3 */}
            <div className="question-section">
                <h2>QUESTION 3</h2>
                <p>In the diagram below, ΔACD has vertices A, D(3 ; -9) and C(-9 ; 0), where A is a point in the second quadrant. B(-1 ; k) lies on side DC.</p>
                <img src={q3} alt="Question 3 diagram" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>3.1 Calculate the gradient of DC. (2)</p>
                        {renderInput('q3-1', '-0.75')}
                    </div>

                    <div className="sub-question">
                        <p>3.2 Determine the equation of DC in the form y = mx + c. (2)</p>
                        {renderInput('q3-2', 'y = -0.75x - 6.75', true)}
                    </div>

                    <div className="sub-question">
                        <p>3.3 Show that k = -6. (1)</p>
                        <p className="note">[Show your working in the answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>3.4 Calculate the length of DC. (2)</p>
                        {renderInput('q3-4', '15 units')}
                    </div>

                    <div className="sub-question">
                        <p>3.5 Calculate the ratio of DB:DC. (2)</p>
                        {renderInput('q3-5', '1:3')}
                    </div>

                    <div className="sub-question">
                        <p>3.6 If M is a point on AD such that AC ∥ MB, calculate the ratio of Area(ΔMBD):Area(ΔACD). (4)</p>
                        {renderInput('q3-6', '1:4')}
                    </div>

                    <div className="sub-question">
                        <p>3.7 If it is further given that the gradient of AD is -4 and the length of AD is √612 units, calculate the coordinates of A. (6)</p>
                        {renderInput('q3-7', '(-6, 15)')}
                    </div>
                </div>
            </div>

            {/* QUESTION 4 */}
            <div className="question-section">
                <h2>QUESTION 4</h2>
                <p>In the diagram, M(1 ; 3) is the centre of the circle. The circle cuts the x-axis at N. ST is a tangent to the circle at P(3 ; 9). R(d; 1), with d > 0, and L lie on the circle. O and V are the x-intercepts of PL and RL respectively.</p>
                <img src={q4} alt="Question 4 diagram" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>4.1 Write down the coordinates of L. (2)</p>
                        {renderInput('q4-1', '(1, -3)')}
                    </div>

                    <div className="sub-question">
                        <p>4.2 Determine the equation of tangent ST to the circle at P. (4)</p>
                        {renderInput('q4-2', 'y = -0.5x + 10.5', true)}
                    </div>

                    <div className="sub-question">
                        <p>4.3 Show that the equation of the circle with centre M is x² + y² - 2x - 6y - 30 = 0. (4)</p>
                        <p className="note">[Show your working in the answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>4.4 Show that d = 7. (2)</p>
                        {renderInput('q4-4', 'Substitute R(d,1) into circle equation')}
                    </div>

                    <div className="sub-question">
                        <p>4.5 Calculate the size of ∠L. (5)</p>
                        {renderInput('q4-5', '53.13°')}
                    </div>

                    <div className="sub-question">
                        <p>4.6 TR is a tangent to the circle at R. Prove that PT ⟂ RT. (3)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>
                </div>
            </div>

            {/* QUESTION 5 */}
            <div className="question-section">
                <h2>QUESTION 5</h2>
                <p>5.1 In the diagram, line OP is given with P(-3 ; -4). ∠KOP = A.</p>
                <img src={q5} alt="Question 5 diagram" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>5.1.1 Determine, without using a calculator, the value of cos A. (2)</p>
                        {renderInput('q5-1-1', '-0.6')}
                    </div>

                    <div className="sub-question">
                        <p>5.1.2 Determine, without using a calculator, the value of cos 2A. (2)</p>
                        {renderInput('q5-1-2', '-0.28')}
                    </div>

                    <div className="sub-question">
                        <p>5.1.3 Determine, without using a calculator, the value of sin(A - B), if it is further given that sin B = 4/5 and 90° . (4)</p>
                        {renderInput('q5-1-3', '0.8')}
                    </div>

                    <div className="sub-question">
                        <p>5.2 If cos α = p, express the following expression in terms of p: cos(α/2 - 45°) sin(α/2 - 45°). (3)</p>
                        {renderInput('q5-2', '(p - 1)/2')}
                    </div>
                </div>
            </div>

            {/* QUESTION 6 */}
            <div className="question-section">
                <h2>QUESTION 6</h2>

                <div className="question">
                    <div className="sub-question">
                        <p>6.1 Given the identity: cos(x - y) = cos x cos y + sin x sin y</p>
                        <p>6.1.1 Use the compound angle identity given above to derive a formula for cos(x + y). (2)</p>
                        {renderInput('q6-1-1', 'cos(x+y) = cosxcosy - sinxsiny', true)}
                    </div>

                    <div className="sub-question">
                        <p>6.1.2 Hence, or otherwise, show that:
                            [cos(90° - x) cos y + sin(-y) cos(180° + x)] / [cos x cos(360° + y) + sin(360° - x) sin y] = tan(x + y) (6)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>6.2 Given: f(x) = √(6 sin² x - 11 cos(90° + x) + 7). Solve for x in the interval x ∈ (0°; 360°) if f(x) = 2. (6)</p>
                        {renderInput('q6-2', '30°, 150°')}
                    </div>

                    <div className="sub-question">
                        <p>6.3 Consider the function: g(x) = (4 - 8 sin² x)/3</p>
                        <p>6.3.1 Calculate the maximum value of g. (3)</p>
                        {renderInput('q6-3-1', '4/3')}
                    </div>

                    <div className="sub-question">
                        <p>6.3.2 Write down the smallest possible value of x for which g will have a maximum value in the interval x ∈ (0°; 360°]. (1)</p>
                        {renderInput('q6-3-2', '45°')}
                    </div>
                </div>
            </div>

            {/* QUESTION 7 */}
            <div className="question-section">
                <h2>QUESTION 7</h2>
                <p>In the diagram below, the graph of f(x) = tan x is drawn for the interval x ∈ [-180°; 180°].</p>
                <img src={q7} alt="Question 7 graph" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>7.1 Write down the equation of the asymptote of f in the interval x ∈ [0°; 180°]. (1)</p>
                        {renderInput('q7-1', 'x = 90°')}
                    </div>

                    <div className="sub-question">
                        <p>7.2 Write down the values of x in the interval x ∈ [-180°; 0°] for which f(x) ≤ 0. (2)</p>
                        {renderInput('q7-2', '-180° ≤ x ≤ -90°, -90° ≤ x ≤ 0°', true)}
                    </div>

                    <div className="sub-question">
                        <p>7.3 Given: g(x) = cos 2x + 1</p>
                        <p>7.3.1 Write down the period of g. (1)</p>
                        {renderInput('q7-3-1', '180°')}
                    </div>

                    <div className="sub-question">
                        <p>7.3.2 On the grid given in the ANSWER BOOK, draw the graph of g(x) = cos 2x + 1 for the interval x ∈ [-180°; 180°]. Clearly show the intercepts with the axes as well as the coordinates of the turning points. (3)</p>
                        <p className="note">[Graph to be drawn in answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>7.4 Use the graphs to determine the general solution of 2 cos³ x - sin x = 0. (4)</p>
                        {renderInput('q7-4', 'x = 45° + n·90°', true)}
                    </div>
                </div>
            </div>

            {/* QUESTION 8 */}
            <div className="question-section">
                <h2>QUESTION 8</h2>
                <p>In the diagram, C is the foot of a vertical building and D is the top of the same building. The height of the building, CD, is 16 m. Two observers are standing 19 m apart at points A and B, where A, B and C lie in the same horizontal plane. A painter is working at point E on the building. The angle of elevation of D from A is 46.85°. ∠DEB = 122° and ∠BCA = 105.61°.</p>
                <img src={q8} alt="Question 8 diagram" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>8.1 Calculate the length of AC, the distance between the observer at A and the foot of the building. (2)</p>
                        {renderInput('q8-1', '15.2 m')}
                    </div>

                    <div className="sub-question">
                        <p>8.2 Calculate how far the painter at E is from the top of the building. (7)</p>
                        {renderInput('q8-2', '4.5 m')}
                    </div>
                </div>
            </div>

            {/* QUESTION 9 */}
            <div className="question-section">
                <h2>QUESTION 9</h2>
                <p>In the diagram, ABCD is a cyclic quadrilateral. BC is produced to E. AC is drawn. ∠A₁ = ½∠B, ∠A₂ = 46° and ∠C₁ = 86°.</p>
                <img src={q9} alt="Question 9 diagram" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>9.1 Calculate, with a reason, the value of ∠A₁. (2)</p>
                        {renderInput('q9-1', '23°')}
                    </div>

                    <div className="sub-question">
                        <p>9.2 Hence, prove that AD = DC. (4)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>
                </div>
            </div>

            {/* QUESTION 10 */}
            <div className="question-section">
                <h2>QUESTION 10</h2>

                <div className="question">
                    <div className="sub-question">
                        <p>10.1 In the diagram, ΔRST is drawn. Line AB intersects RS and RT at A and B respectively such that AB ∥ ST.</p>
                        <img src={q10_1} alt="Question 10.1 diagram" className="question-image" />
                        <p>Prove the theorem which states that a line drawn parallel to one side of a triangle divides the other two sides proportionally, i.e. RA/AS = RB/BT. (6)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>10.2 In the diagram, O is the centre of the circle. ΔPWS is drawn with P, W and S on the circle. OR ⟂ PS. PRS is produced to T. SW and OT intersect at V. OV:OT = 1:4</p>
                        <img src={q10_2} alt="Question 10.2 diagram" className="question-image" />
                        <p>10.2.1 Prove, with reasons, that OR:WS = 1:2. (5)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>10.2.2 Calculate the length of PT if ST = 15 units. (4)</p>
                        {renderInput('q10-2-2', '20 units')}
                    </div>
                </div>
            </div>

            {/* QUESTION 11 */}
            <div className="question-section">
                <h2>QUESTION 11</h2>
                <p>In the diagram, A, B, G and F lie on the larger circle. A smaller circle is drawn to touch the larger circle internally at A. EA is a common tangent to both circles. EBCF is a tangent to the smaller circle at C. AC is produced to G. AF cuts the smaller circle at D. AB, CD and GF are drawn.</p>
                <img src={q11} alt="Question 11 diagram" className="question-image" />

                <div className="question">
                    <div className="sub-question">
                        <p>11.1 If ∠EAG = x, determine with reasons, FOUR other angles that are equal to x. (6)</p>
                        {renderInput('q11-1', '∠ACD = x, ∠ADC = x, ∠DCF = x, ∠FCE = x', true)}
                    </div>

                    <div className="sub-question">
                        <p>11.2 Prove that AG·AD = AC·AF. (4)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>11.3 Prove that ΔAGF ∥ ΔABC. (4)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>

                    <div className="sub-question">
                        <p>11.4 Prove that GF² = (BC·FC·AF)/AD. (6)</p>
                        <p className="note">[Proof to be shown in answer book]</p>
                    </div>
                </div>
            </div>

            <div className="submission-section">
                <button
                    className="submit-button"
                    onClick={submitAnswers}
                    disabled={showResults}
                >
                    Submit Answers
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

                        {/* Add Retry and Exit buttons */}
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

            <style jsx>{`
                .math-exam {
                    font-family: 'Arial', sans-serif;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0,0,0,0.1);
                }

                h1 {
                    font-size: 24px;
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 20px;
                }

                h2 {
                    font-size: 20px;
                    color: #2c3e50;
                    margin-bottom: 15px;
                }
                
                .question-section {
                    margin-bottom: 20px;
                    padding: 15px;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }

                .question {
                    padding: 10px;
                }

                .sub-question {
                    margin: 10px 0;
                }

                .equation {
                    font-family: 'Times New Roman', serif;
                    font-style: italic;
                }

                .question-image {
                    max-width: 100%;
                    height: auto;
                    margin: 10px 0;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                }

                .note {
                    font-style: italic;
                    color: #666;
                    margin: 5px 0;
                }

                .input-container {
                    margin-bottom: 10px;
                }

                .input {
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 14px;
                    width: 200px;
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
                    align-items: center;
                    gap: 10px;
                    margin: 10px 0;
                }

                .paired-inputs {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .or-divider {
                    font-size: 14px;
                    color: #555;
                }

                .solution-buttons {
                    display: flex;
                    gap: 10px;
                    margin-top: 5px;
                }

                .solution-button {
                    padding: 5px 10px;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                }

                .solution-button:hover {
                    background-color: #2980b9;
                }

                .revealed-answer {
                    margin-top: 5px;
                    padding: 8px;
                    background-color: #e9f7ef;
                    border-left: 4px solid #28a745;
                    border-radius: 4px;
                    font-size: 14px;
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
                }

                .modal-content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .modal-content h3 {
                    margin-top: 0;
                    color: #2c3e50;
                }

                .modal-close {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 10px;
                }

                .modal-close:hover {
                    background-color: #2980b9;
                }

                .submit-button {
                    background-color: #2196F3;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                    cursor: pointer;
                    margin: 20px auto;
                    display: block;
                }

                .submit-button:hover {
                    background-color: #0b7dda;
                }

                .submit-button:disabled {
                    background-color: #bbbbbb;
                    cursor: not-allowed;
                }

                .score-display {
                    margin-top: 20px;
                    padding: 15px;
                    border-radius: 8px;
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    text-align: center;
                }

                .score-display h3 {
                    margin: 0 0 10px;
                }

                .pass {
                    color: #4CAF50;
                    font-weight: bold;
                }

                .fail {
                    color: #f44336;
                    font-weight: bold;
                }

                .action-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 15px;
                }

                .retry-button, .exit-button {
                    padding: 8px 16px;
                    border: none;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
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
            `}</style>
        </div>
    );
};

export default MathematicsP2Nov2024Eng;