import React, { useState } from "react";
import { API_BASE_URL, getAuthHeaders } from '../../../../../../utils/api';
import { useNavigate } from 'react-router-dom';
import img4_1 from './mathsP1_Question_4.1.png';
import img4_2 from './mathsP1_Question_4.2.png';
import img5 from './mathsP1_Question_5.png';
import img8 from './mathsP1_Question_8.png';
import img10 from './mathsP1_Question_10.png';

const MathematicsP1November2020Eng = ({ paperId }) => {
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
        'q1-1-1a': ["x=0", "0"],
        'q1-1-1b': ["x=6", "6"],
        'q1-1-2a': ["x=-0.88", "-0.88"],
        'q1-1-2b': ["x=-9.12", "-9.12"],
        'q1-1-3': ["-2<x<1", "-2 < x < 1", "-2<x<1"],
        'q1-1-4': ["x=7", "7"],
        'q1-2a-x': ["x=4.5", "4.5"],
        'q1-2a-y': ["y=-1.5", "-1.5"],
        'q1-2b-x': ["x=2", "2"],
        'q1-2b-y': ["y=1", "1"],
        'q1-3': ["n=6", "6"],

        // Question 2
        'q2-1-x': ["x=1", "1"],
        'q2-1-y': ["y=-5", "-5"],
        'q2-2-1': ["Tₙ=6n²-9n", "6n²-9n"],
        'q2-2-2': ["T₅₀=14550", "14550"],
        'q2-2-3': ["Sₙ=6n²+3n", "6n²+3n"],
        'q2-2-4': ["n=59", "59"],

        // Question 3
        'q3-1': ["18", "18"],
        'q3-2': ["p=5", "5"],

        // Question 4
        'q4-1-1a': ["x=1", "1"],
        'q4-1-1b': ["y=2", "2"],
        'q4-1-2': ["y=-x+3", "-x+3"],
        'q4-1-3': ["Upload graph", "Graph"],
        'q4-2-1a': ["x=-5", "-5"],
        'q4-2-1b': ["y=-8", "-8"],
        'q4-2-2': ["y≥-8", "y >= -8"],
        'q4-2-3a': ["m=-5", "-5"],
        'q4-2-3b': ["n=2", "2"],
        'q4-2-4': ["65/4", "16.25"],
        'q4-2-5': ["y=2x-9", "2x-9"],
        'q4-2-6a': ["x=-3", "-3"],
        'q4-2-6b': ["y=-6", "-6"],

        // Question 5
        'q5-1-1a': ["x=0", "0"],
        'q5-1-1b': ["y=1", "1"],
        'q5-1-2a': ["x=-2", "-2"],
        'q5-1-2b': ["y=9", "9"],
        'q5-1-3': ["x>0", "x > 0"],
        'q5-1-4': ["3 units right", "right 3"],
        'q5-1-5': ["x>3", "x > 3"],
        'q5-1-6': ["Upload graph", "Graph"],

        // Question 6
        'q6-1-1': ["232224.00", "232224"],
        'q6-1-2': ["250274.76", "250274.76"],
        'q6-2': ["4", "4"],
        'q6-3-1': ["78229.95", "78229.95"],
        'q6-3-2': ["28746.76", "28746.76"],

        // Question 7
        'q7-1': ["4x", "4x"],
        'q7-2-1': ["1+3x²", "1+3x^2"],
        'q7-2-2': ["1", "1"],

        // Question 8
        'q8-1-1': ["-1<x<2", "-1 < x < 2"],
        'q8-1-2': ["x=1/2", "0.5"],
        'q8-1-3': ["x>1/2", "x > 0.5"],
        'q8-1-4': ["-2x³+3x²+12x", "-2x^3+3x^2+12x"],
        'q8-1-5': ["y=(27/2)x-1/4", "y=13.5x-0.25"],
        'q8-1-6': ["Upload graph", "Graph"],

        // Question 9
        'q9-1': ["90w²+48wh", "90w^2+48wh"],
        'q9-2': ["(4/9)^(1/3)", "cube root of 4/9"],

        // Question 10
        'q10-1': ["10000000000", "10^10"],
        'q10-2-1': ["115200000", "115200000"],
        'q10-2-2': ["0.01152", "0.01152"],

        // Question 11
        'q11-1': ["0.25", "0.25"],
        'q11-2': ["0.5", "0.5"]
    };

    // Solutions for each question
    const solutions = {
        'q1-1-1a': "Given: x² - 6x = 0\nFactorize: x(x - 6) = 0\nSet each factor to zero:\n- x = 0\n- x - 6 = 0 → x = 6\nTherefore, the solutions are x = 0 or x = 6.",
        'q1-1-1b': "Given: x² - 6x = 0\nFactorize: x(x - 6) = 0\nSet each factor to zero:\n- x = 0\n- x - 6 = 0 → x = 6\nTherefore, the solutions are x = 0 or x = 6.",
        'q1-1-2a': "Given: x² + 10x + 8 = 0\nUse the quadratic formula: x = [-b ± √(b² - 4ac)] / (2a)\n- a = 1, b = 10, c = 8\n- Discriminant: b² - 4ac = 10² - 4·1·8 = 100 - 32 = 68\n- √68 ≈ 8.2462\n- x₁ = (-10 + 8.2462) / 2 ≈ -0.88\n- x₂ = (-10 - 8.2462) / 2 ≈ -9.12\nTherefore, the solutions are x ≈ -0.88 or x ≈ -9.12.",
        'q1-1-2b': "Given: x² + 10x + 8 = 0\nUse the quadratic formula: x = [-b ± √(b² - 4ac)] / (2a)\n- a = 1, b = 10, c = 8\n- Discriminant: b² - 4ac = 10² - 4·1·8 = 100 - 32 = 68\n- √68 ≈ 8.2462\n- x₁ = (-10 + 8.2462) / 2 ≈ -0.88\n- x₂ = (-10 - 8.2462) / 2 ≈ -9.12\nTherefore, the solutions are x ≈ -0.88 or x ≈ -9.12.",
        'q1-1-3': "Given: (1 - x)(x + 2) < 0\nCritical points:\n- 1 - x = 0 → x = 1\n- x + 2 = 0 → x = -2\nTest intervals: (-∞, -2), (-2, 1), (1, ∞)\n- At x = -3: (1 - (-3))(-3 + 2) = 4·(-1) = -4 < 0\n- At x = 0: (1 - 0)(0 + 2) = 1·2 = 2 > 0\n- At x = 2: (1 - 2)(2 + 2) = (-1)·4 = -4 < 0\nSolution: -2 < x < 1\nTherefore, the solution is -2 < x < 1.",
        'q1-1-4': "Given: √(x + 18) = x - 2\nSquare both sides: x + 18 = (x - 2)²\n- x + 18 = x² - 4x + 4\n- 0 = x² - 5x - 14\nSolve: (x - 7)(x + 2) = 0\n- x = 7 or x = -2\nCheck:\n- x = 7: √(7 + 18) = √25 = 5, 7 - 2 = 5 (valid)\n- x = -2: √(-2 + 18) = √16 = 4, -2 - 2 = -4 (invalid)\nDomain: x + 18 ≥ 0 → x ≥ -18; x - 2 ≥ 0 → x ≥ 2\nTherefore, the solution is x = 7.",
        'q1-2a-x': "Given:\n- x + y = 3 ... (1)\n- 2x² + 4xy - y = 15 ... (2)\nFrom (1): y = 3 - x\nSubstitute into (2): 2x² + 4x(3 - x) - (3 - x) = 15\n- 2x² + 12x - 4x² - 3 + x = 15\n- -2x² + 13x - 18 = 0\n- 2x² - 13x + 18 = 0\nSolve: Δ = (-13)² - 4·2·18 = 169 - 144 = 25\n- x = (13 ± √25) / (2·2) = (13 ± 5) / 4\n- x₁ = 18/4 = 4.5, x₂ = 8/4 = 2\n- y₁ = 3 - 4.5 = -1.5, y₂ = 3 - 2 = 1\nVerify:\n- (4.5, -1.5): x + y = 4.5 - 1.5 = 3; 2(4.5)² + 4(4.5)(-1.5) - (-1.5) = 40.5 - 27 + 1.5 = 15\n- (2, 1): x + y = 2 + 1 = 3; 2(2)² + 4(2)(1) - 1 = 8 + 8 - 1 = 15\nTherefore, the solutions are (x, y) = (4.5, -1.5) or (x, y) = (2, 1).",
        'q1-2a-y': "Given:\n- x + y = 3 ... (1)\n- 2x² + 4xy - y = 15 ... (2)\nFrom (1): y = 3 - x\nSubstitute into (2): 2x² + 4x(3 - x) - (3 - x) = 15\n- 2x² + 12x - 4x² - 3 + x = 15\n- -2x² + 13x - 18 = 0\n- 2x² - 13x + 18 = 0\nSolve: Δ = (-13)² - 4·2·18 = 169 - 144 = 25\n- x = (13 ± √25) / (2·2) = (13 ± 5) / 4\n- x₁ = 18/4 = 4.5, x₂ = 8/4 = 2\n- y₁ = 3 - 4.5 = -1.5, y₂ = 3 - 2 = 1\nVerify:\n- (4.5, -1.5): x + y = 4.5 - 1.5 = 3; 2(4.5)² + 4(4.5)(-1.5) - (-1.5) = 40.5 - 27 + 1.5 = 15\n- (2, 1): x + y = 2 + 1 = 3; 2(2)² + 4(2)(1) - 1 = 8 + 8 - 1 = 15\nTherefore, the solutions are (x, y) = (4.5, -1.5) or (x, y) = (2, 1).",
        'q1-2b-x': "Given:\n- x + y = 3 ... (1)\n- 2x² + 4xy - y = 15 ... (2)\nFrom (1): y = 3 - x\nSubstitute into (2): 2x² + 4x(3 - x) - (3 - x) = 15\n- 2x² + 12x - 4x² - 3 + x = 15\n- -2x² + 13x - 18 = 0\n- 2x² - 13x + 18 = 0\nSolve: Δ = (-13)² - 4·2·18 = 169 - 144 = 25\n- x = (13 ± √25) / (2·2) = (13 ± 5) / 4\n- x₁ = 18/4 = 4.5, x₂ = 8/4 = 2\n- y₁ = 3 - 4.5 = -1.5, y₂ = 3 - 2 = 1\nVerify:\n- (4.5, -1.5): x + y = 4.5 - 1.5 = 3; 2(4.5)² + 4(4.5)(-1.5) - (-1.5) = 40.5 - 27 + 1.5 = 15\n- (2, 1): x + y = 2 + 1 = 3; 2(2)² + 4(2)(1) - 1 = 8 + 8 - 1 = 15\nTherefore, the solutions are (x, y) = (4.5, -1.5) or (x, y) = (2, 1).",
        'q1-2b-y': "Given:\n- x + y = 3 ... (1)\n- 2x² + 4xy - y = 15 ... (2)\nFrom (1): y = 3 - x\nSubstitute into (2): 2x² + 4x(3 - x) - (3 - x) = 15\n- 2x² + 12x - 4x² - 3 + x = 15\n- -2x² + 13x - 18 = 0\n- 2x² - 13x + 18 = 0\nSolve: Δ = (-13)² - 4·2·18 = 169 - 144 = 25\n- x = (13 ± √25) / (2·2) = (13 ± 5) / 4\n- x₁ = 18/4 = 4.5, x₂ = 8/4 = 2\n- y₁ = 3 - 4.5 = -1.5, y₂ = 3 - 2 = 1\nVerify:\n- (4.5, -1.5): x + y = 4.5 - 1.5 = 3; 2(4.5)² + 4(4.5)(-1.5) - (-1.5) = 40.5 - 27 + 1.5 = 15\n- (2, 1): x + y = 2 + 1 = 3; 2(2)² + 4(2)(1) - 1 = 8 + 8 - 1 = 15\nTherefore, the solutions are (x, y) = (4.5, -1.5) or (x, y) = (2, 1).",
        'q1-3': "Given: n²⁵⁰ < 5³⁰⁰\nTake natural log:\n- 250 ln n < 300 ln 5\n- ln n < (300/250) ln 5 = 1.2 ln 5\n- ln 5 ≈ 1.6094, 1.2 · 1.6094 ≈ 1.9313\n- n < e¹·⁹³¹³ ≈ 6.894\nLargest integer n = 6\nVerify:\n- 6²⁵⁰ < 5³⁰⁰, 7²⁵⁰ > 5³⁰⁰\nTherefore, n = 6.",

        // Question 2 Solutions
        'q2-1-x': "Given: 7, x, y, -11 (arithmetic sequence)\nCommon difference d:\n- T₄ = T₁ + 3d\n- -11 = 7 + 3d\n- 3d = -18 → d = -6\nCalculate terms:\n- T₂ = 7 + (-6) = 1 → x = 1\n- T₃ = 1 + (-6) = -5 → y = -5\nTherefore, x = 1 and y = -5.",
        'q2-1-y': "Given: 7, x, y, -11 (arithmetic sequence)\nCommon difference d:\n- T₄ = T₁ + 3d\n- -11 = 7 + 3d\n- 3d = -18 → d = -6\nCalculate terms:\n- T₂ = 7 + (-6) = 1 → x = 1\n- T₃ = 1 + (-6) = -5 → y = -5\nTherefore, x = 1 and y = -5.",
        'q2-2-1': "Given: -3, 6, 27, 60\nFirst differences: 9, 21, 33\nSecond differences: 12, 12 (constant, quadratic)\nSet up equations:\n- T₁ = a + b + c = -3\n- T₂ = 4a + 2b + c = 6\n- T₃ = 9a + 3b + c = 27\nSolve:\n- a = 6, b = -9, c = 0\nTherefore, Tₙ = 6n² - 9n.",
        'q2-2-2': "Tₙ = 6n² - 9n\nT₅₀ = 6(50)² - 9(50)\n- = 6·2500 - 450\n- = 15000 - 450 = 14550\nTherefore, the 50th term is 14550.",
        'q2-2-3': "First differences: 9, 21, 33, …\nk-th difference: 12k - 3\nSum: Sₙ = Σ (12k - 3)\n- = 12 Σ k - 3n\n- = 12·[n(n+1)/2] - 3n\n- = 6n² + 6n - 3n = 6n² + 3n\nTherefore, Sₙ = 6n² + 3n.",
        'q2-2-4': "Tₙ₊₁ = -3 + Sₙ\n- Sₙ = 6n² + 3n\n- 6n² + 3n - 3 = 21060\n- 2n² + n - 7021 = 0\nSolve: Δ = 1 + 4·2·7021 = 56169\n- n = (-1 + √56169) / (2·2) = 236/4 = 59\nVerify: S₅₉ = 6(59)² + 3(59) = 21063\n- T₆₀ = -3 + 21063 = 21060\nTherefore, n = 59.",

        // Question 3 Solutions
        'q3-1': "Rewrite: 4·3^(2-k) = 4·3²·3^(-k) = 12·(1/3)^(k-1)\nGeometric series:\n- First term: a = 12\n- Common ratio: r = 1/3\nCheck convergence: |r| = 1/3 < 1, so it converges\nInfinite sum: S∞ = a / (1 - r)\n- = 12 / (1 - 1/3)\n- = 12 / (2/3) = 18\nTherefore, the series converges to 18.",
        'q3-2': "Sum from k = p: S = 12·(1/3)^(p-1) / (1 - 1/3)\n- = 12·(1/3)^(p-1) / (2/3)\n- = 18·(1/3)^(p-1)\nGiven: 18·(1/3)^(p-1) = 2/9\n- (1/3)^(p-1) = (2/9) / 18 = 1/81 = (1/3)⁴\n- p - 1 = 4 → p = 5\nTherefore, p = 5.",

        // Question 4 Solutions
        'q4-1-1a': "Given: h(x) = -3/(x - 1) + 2\nVertical asymptote:\n- Denominator = 0: x - 1 = 0 → x = 1\nTherefore, the vertical asymptote is x = 1.",
        'q4-1-1b': "Given: h(x) = -3/(x - 1) + 2\nHorizontal asymptote:\n- As x → ±∞, h(x) → 2 → y = 2\nTherefore, the horizontal asymptote is y = 2.",
        'q4-1-2': "Center at (1, 2) (intersection of asymptotes)\nAxis with negative gradient: m = -1\n- y - 2 = -1(x - 1)\n- y = -x + 3\nTherefore, the axis of symmetry is y = -x + 3.",
        'q4-1-3': "Asymptotes:\n- x = 1, y = 2\nIntercepts:\n- x-intercept: -3/(x - 1) + 2 = 0 → x = 5/2 → (5/2, 0)\n- y-intercept: h(0) = -3/(-1) + 2 = 5 → (0, 5)\nShape: Hyperbola centered at (1, 2)",
        'q4-2-1a': "f(x) = (1/2)(x + 5)² - 8\nVertex form: f(x) = (1/2)(x - (-5))² - 8\nTurning point: (-5, -8)\nTherefore, the coordinates of A are (-5, -8).",
        'q4-2-1b': "f(x) = (1/2)(x + 5)² - 8\nVertex form: f(x) = (1/2)(x - (-5))² - 8\nTurning point: (-5, -8)\nTherefore, the coordinates of A are (-5, -8).",
        'q4-2-2': "f(x) = (1/2)(x + 5)² - 8\nParabola opens upward, minimum at y = -8\nRange: y ≥ -8\nTherefore, the range is y ≥ -8.",
        'q4-2-3a': "Axis of symmetry of f: x = -5\ng(x) = (1/2)x + 9/2\ng(-5) = (1/2)(-5) + 9/2\n- = -5/2 + 9/2 = 2\nTherefore, D(-5, 2) → m = -5, n = 2.",
        'q4-2-3b': "Axis of symmetry of f: x = -5\ng(x) = (1/2)x + 9/2\ng(-5) = (1/2)(-5) + 9/2\n- = -5/2 + 9/2 = 2\nTherefore, D(-5, 2) → m = -5, n = 2.",
        'q4-2-4': "Points:\n- O(0, 0), C(0, 9/2), D(-5, 2), E(-5, 0)\nUse shoelace formula: Area = (1/2) | Σ (xᵢyᵢ₊₁ - yᵢxᵢ₊₁) |\n- = (1/2) | (0·(9/2) - 0·0) + (0·2 - (9/2)(-5)) + ((-5)·0 - 2(-5)) + ((-5)·0 - 0(-5)) |\n- = (1/2) | 0 + (0 + 45/2) + (-0 + 10) + (0 - 0) |\n- = (1/2) | 65/2 | = 65/4\nTherefore, the area is 65/4.",
        'q4-2-5': "g(x) = (1/2)x + 9/2\nSwap x and y: x = (1/2)y + 9/2\nSolve for y:\n- (1/2)y = x - 9/2\n- y = 2x - 9\nTherefore, g⁻¹(x) = 2x - 9.",
        'q4-2-6a': "g⁻¹(x) = 2x - 9\nh(x) = 2x - 9 + k\nh'(x) = 2\nf(x) = (1/2)(x + 5)² - 8\nf'(x) = x + 5\nFor tangency: f'(x) = h'(x)\n- x + 5 = 2 → x = -3\nf(-3) = (1/2)(-3 + 5)² - 8\n- = (1/2)·4 - 8 = -6\nh(-3) = 2(-3) - 9 + k = -15 + k\n- -15 + k = -6 → k = 9\nPoint: (-3, -6)\nTherefore, the point of contact is (-3, -6).",
        'q4-2-6b': "g⁻¹(x) = 2x - 9\nh(x) = 2x - 9 + k\nh'(x) = 2\nf(x) = (1/2)(x + 5)² - 8\nf'(x) = x + 5\nFor tangency: f'(x) = h'(x)\n- x + 5 = 2 → x = -3\nf(-3) = (1/2)(-3 + 5)² - 8\n- = (1/2)·4 - 8 = -6\nh(-3) = 2(-3) - 9 + k = -15 + k\n- -15 + k = -6 → k = 9\nPoint: (-3, -6)\nTherefore, the point of contact is (-3, -6).",

        // Question 5 Solutions
        'q5-1-1a': "f(x) = 3^(-x)\ny-intercept: x = 0\n- f(0) = 3^0 = 1\nTherefore, A is (0, 1).",
        'q5-1-1b': "f(x) = 3^(-x)\ny-intercept: x = 0\n- f(0) = 3^0 = 1\nTherefore, A is (0, 1).",
        'q5-1-2a': "f(x) = 3^(-x) = 9\n- 3^(-x) = 3²\n- -x = 2 → x = -2\n- y = 9\nTherefore, B is (-2, 9).",
        'q5-1-2b': "f(x) = 3^(-x) = 9\n- 3^(-x) = 3²\n- -x = 2 → x = -2\n- y = 9\nTherefore, B is (-2, 9).",
        'q5-1-3': "f(x) = 3^(-x)\nRange of f: y > 0 (since 3^(-x) > 0)\nDomain of f⁻¹: x > 0\nTherefore, the domain is x > 0.",
        'q5-1-4': "h(x) = 27 / 3^x\n- = 3³ / 3^x\n- = 3^(3-x)\n- = f(x - 3)\nThis is a horizontal translation of f(x) by 3 units to the right.\nTherefore, the translation is 3 units right.",
        'q5-1-5': "h(x) = 3^(3-x)\n3^(3-x) < 1\n- 3^(3-x) < 3^0\n- 3 - x < 0\n- x > 3\nTherefore, x > 3.",
        'q5-1-6': "f(x) = 3^(-x) (exponential decay)\nKey points:\n- y-intercept: A(0, 1)\n- Point B: (-2, 9)\n- Asymptote: y = 0 as x → ∞\nShape: Decreasing, concave up, approaching y = 0 from above.",

        // Question 6 Solutions
        'q6-1-1': "Given:\n- x = 1000, n = 12·12 = 144, i = 0.075/12 = 0.00625\nFuture value of annuity: F = x [(1 + i)^n - 1] / i\n- F = 1000 [(1.00625)^144 - 1] / 0.00625\n- ≈ 232224\nTherefore, the value is R232224.00.",
        'q6-1-2': "Initial amount: 232224\nAdditional 1 year (12 months):\n- A = 232224 · (1.00625)^12\n- ≈ 250274.76\nTherefore, the value is R250274.76.",
        'q6-2': "Given: A = 92537.64, P = 250000, i = 0.22\nReducing balance: A = P (1 - i)^n\n- 92537.64 = 250000 · (0.78)^n\n- 0.78^n = 92537.64 / 250000 ≈ 0.37015056\n- n ln 0.78 ≈ ln 0.37015056\n- n ≈ 4\nTherefore, n = 4 years.",
        'q6-3-1': "Given: x = 1500, i = 0.113/12 ≈ 0.0094167, n = 6·12 = 72\nPresent value: P = x [1 - (1 + i)^(-n)] / i\n- P = 1500 [1 - (1.0094167)^(-72)] / 0.0094167\n- ≈ 78229.95\nTherefore, the loan value is R78229.95.",
        'q6-3-2': "Total paid in 5 years: 60 · 1500 = 90000\nBalance after 5 years:\n- P = 1500 [1 - (1.0094167)^(-12)] / 0.0094167\n- ≈ 16976.71\nInterest = Total paid - (Loan - Balance)\n- = 90000 - (78229.95 - 16976.71)\n- ≈ 28746.76\nTherefore, the total interest is R28746.76.",

        // Question 7 Solutions
        'q7-1': "f(x) = 2x² - 1\nFirst principles: f'(x) = lim(h→0) [f(x + h) - f(x)] / h\n- f(x + h) = 2(x + h)² - 1 = 2(x² + 2xh + h²) - 1\n- f(x + h) - f(x) = (2x² + 4xh + 2h² - 1) - (2x² - 1)\n- = 4xh + 2h²\n- [f(x + h) - f(x)] / h = 4x + 2h\n- lim(h→0) (4x + 2h) = 4x\nTherefore, f'(x) = 4x.",
        'q7-2-1': "For x > 0, √(x²) = x\ny = x + x³\ndy/dx = d/dx (x) + d/dx (x³)\n- = 1 + 3x²\nTherefore, dy/dx = 1 + 3x².",
        'q7-2-2': "f(x) = (4x² - 9) / (4x + 6)\nQuotient rule: f'(x) = [(u'v - uv') / v²]\n- u = 4x² - 9, v = 4x + 6\n- u' = 8x, v' = 4\nf'(x) = [(8x)(4x + 6) - (4x² - 9)(4)] / (4x + 6)²\n- = [32x² + 48x - (16x² - 36)] / (4x + 6)²\n- = (16x² + 48x + 36) / (4x + 6)²\n- = 4(4x² + 12x + 9) / 4(4x + 6)²\n- = (2x + 3)² / (2x + 3)² = 1\nTherefore, f'(x) = 1.",

        // Question 8 Solutions
        'q8-1-1': "g'(x) = -6x² + 6x + 12 > 0\n- -6(x² - x - 2) > 0\n- x² - x - 2 < 0\n- (x - 2)(x + 1) < 0\nTest intervals: -1 < x < 2\nTherefore, g is increasing for -1 < x < 2.",
        'q8-1-2': "g''(x) = -12x + 6\nSet g''(x) = 0:\n- -12x + 6 = 0\n- x = 1/2\nTherefore, the x-coordinate is x = 1/2.",
        'q8-1-3': "g''(x) = -12x + 6\nConcave down: g''(x) < 0\n- -12x + 6 < 0\n- x > 1/2\nTherefore, g is concave down for x > 1/2.",
        'q8-1-4': "g'(x) = -6x² + 6x + 12\nIntegrate: g(x) = ∫ (-6x² + 6x + 12) dx\n- = -2x³ + 3x² + 12x + C\nGiven g(0) = 0 (y-intercept):\n- C = 0\nTherefore, g(x) = -2x³ + 3x² + 12x.",
        'q8-1-5': "g'(x) = -6x² + 6x + 12\nMaximum gradient: g''(x) = -12x + 6 = 0\n- x = 1/2\nGradient: g'(1/2) = -6(1/4) + 6(1/2) + 12\n- = -3/2 + 3 + 12 = 27/2\ng(1/2) = -2(1/8) + 3(1/4) + 12(1/2)\n- = -1/4 + 3/4 + 6 = 13/2\nTangent: y - 13/2 = (27/2)(x - 1/2)\n- y = (27/2)x - 27/4 + 13/2\n- y = (27/2)x - 1/4\nTherefore, the tangent is y = (27/2)x - 1/4.",
        'q8-1-6': "g(x) = -2x³ + 3x² + 12x\nKey points:\n- y-intercept: g(0) = 0 → (0, 0)\n- Turning points: g'(x) = -6x² + 6x + 12 = 0\n- x = -1, x = 2\n- g(-1) = -2(-1)³ + 3(-1)² + 12(-1) = 2 + 3 - 12 = -7 → (-1, -7)\n- g(2) = -2(2)³ + 3(2)² + 12(2) = -16 + 12 + 24 = 20 → (2, 20)\nShape: Cubic, increasing for -1 < x < 2, concave down for x > 1/2.",

        // Question 9 Solutions
        'q9-1': "Given:\n- l = 3w\n- Volume: l·w·h = 3w·w·h = 3w²h = 5\n- h = 5/(3w²)\nCost calculation:\n- Top/bottom: 2·(3w·w)·15 = 90w²\n- Sides: 2·(3w·h + w·h)·6 = 12wh·6 = 48wh\nTotal cost = 90w² + 48wh\nTherefore, the cost is 90w² + 48wh.",
        'q9-2': "Cost: C(w) = 90w² + 48w·(5/(3w²))\n- = 90w² + 80/w\nDerivative: C'(w) = 180w - 80/w²\nSet C'(w) = 0:\n- 180w = 80/w²\n- w³ = 80/180 = 4/9\n- w = (4/9)^(1/3)\nTherefore, the width is (4/9)^(1/3).",

        // Question 10 Solutions
        'q10-1': "A 10-digit telephone number has 10 positions.\nEach position allows digits 0–9 (10 options).\nTotal possibilities:\n- 10¹⁰ = 10000000000\nTherefore, the total is 10000000000.",
        'q10-2-1': "Area code:\n- First digit: 2–9 (8 options)\n- Second, third digits: 0–9 (10 options each)\n- Possibilities: 8·10·10 = 800\nExchange code:\n- First digit: 2–9 (8 options)\n- Second digit: 2–9 (8 options)\n- Third digit: 0–9 (10 options)\n- Possibilities: 8·8·10 = 640\nNumber:\n- First digit: 0 or 1 (2 options)\n- Second, third, fourth digits: 0–9 (10 options each)\n- Possibilities: 2·10·10·10 = 2000\nTotal valid numbers:\n- 800·640·2000 = 1024000000\nTherefore, the number is 1024000000.",
        'q10-2-2': "Probability = (Number of valid numbers) / (Total numbers)\n- Valid numbers (from 10.2.1): 1024000000\n- Total numbers (from 10.1): 10000000000\n- Probability = 1024000000 / 10000000000\n- = 0.1024\nTherefore, the probability is 0.1024.",

        // Question 11 Solutions
        'q11-1': "P(hit) = 0.5\nP(first and second hit) = P(hit) · P(hit)\n- = 0.5 · 0.5\n- = 0.25\nTherefore, the probability is 0.25.",
        'q11-2': "P(X ≥ 2) = P(X = 2) + P(X = 3)\nBinomial: P(X = k) = C(n, k) · p^k · (1 - p)^(n - k)\nGiven: n = 3, p = 0.5, 1 - p = 0.5\n- P(X = 2) = C(3, 2) · (0.5)² · (0.5)¹\n- = 3 · 0.25 · 0.5\n- = 3 · 0.125 = 0.375\n- P(X = 3) = C(3, 3) · (0.5)³ · (0.5)⁰\n- = 1 · 0.125 · 1\n- = 0.125\nP(X ≥ 2) = 0.375 + 0.125 = 0.5\nTherefore, the probability is 0.5."
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
            const response = await fetch(`${API_BASE_URL}/user/record`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paperId: paperId,
                    score: scoreData.percentage,
                    maxScore: scoreData.total
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to record performance');
            }

            const result = await response.json();
            console.log('Performance recorded:', result);
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

        const percentage = Math.round((correct / total) * 100);
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
    const renderInput = (questionId, placeholder, isWide = false, isFile = false) => {
        const value = answers[questionId] || '';
        const revealedAnswer = revealedAnswers[questionId];

        if (isFile) {
            return (
                <input
                    type="file"
                    accept="image/*,application/pdf"
                    disabled={showResults}
                    className="file-input"
                />
            );
        }

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

    // Render coordinate inputs
    const renderCoordinateInputs = (xId, yId, placeholderX, placeholderY) => (
        <div className="input-group">
            {renderInput(xId, placeholderX)}
            <span>,</span>
            {renderInput(yId, placeholderY)}
        </div>
    );

    // Render paired inputs (e.g., "or" inputs)
    const renderPairedInputs = (id1, id2, placeholder1, placeholder2) => (
        <div className="input-group paired-inputs">
            {renderInput(id1, placeholder1)}
            <span className="or-divider">or</span>
            {renderInput(id2, placeholder2)}
        </div>
    );

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

            <h1>MATHEMATICS P1 - NOVEMBER 2020</h1>

            {/* QUESTION 1 */}
            <div className="question-section">
                <h2>QUESTION 1</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>1.1 Solve for <i>x</i>:</p>

                        <div className="sub-question">
                            <p>1.1.1 <span className="equation">x² - 6x = 0</span></p>
                            {renderPairedInputs(
                                'q1-1-1a',
                                'q1-1-1b',
                                'x (e.g., x = 0)',
                                'x (e.g., x = 6)'
                            )}
                        </div>

                        <div className="sub-question">
                            <p>1.1.2 <span className="equation">x² + 10x + 8 = 0</span> (correct to TWO decimal places)</p>
                            {renderPairedInputs(
                                'q1-1-2a',
                                'q1-1-2b',
                                'x (e.g., x = -0.88)',
                                'x (e.g., x = -9.12)'
                            )}
                        </div>

                        <div className="sub-question">
                            <p>1.1.3 <span className="equation">(1 - x)(x + 2) &lt; 0</span></p>
                            {renderInput('q1-1-3', 'Region (e.g., -2 < x < 1)', true)}
                        </div>

                        <div className="sub-question">
                            <p>1.1.4 <span className="equation">√(x + 18) = x - 2</span></p>
                            {renderInput('q1-1-4', 'x (e.g., x = 7)', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>1.2 Solve simultaneously for <i>x</i> and <i>y</i>:</p>
                        <p><span className="equation">x + y = 3</span></p>
                        <p><span className="equation">2x² + 4xy - y = 15</span></p>
                        <label>First Solution:</label>
                        {renderCoordinateInputs(
                            'q1-2a-x',
                            'q1-2a-y',
                            'x (e.g., 4.5)',
                            'y (e.g., -1.5)'
                        )}
                        <label>Second Solution:</label>
                        {renderCoordinateInputs(
                            'q1-2b-x',
                            'q1-2b-y',
                            'x (e.g., 2)',
                            'y (e.g., 1)'
                        )}
                    </div>

                    <div className="sub-question">
                        <p>1.3 If <i>n</i> is the largest integer for which <span className="equation">n²⁵⁰ &lt; 5³⁰⁰</span>, determine the value of <i>n</i>.</p>
                        {renderInput('q1-3', 'n (e.g., 6)', true)}
                    </div>
                </div>
            </div>

            {/* QUESTION 2 */}
            <div className="question-section">
                <h2>QUESTION 2</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>2.1 7; <i>x</i>; <i>y</i>; -11; … is an arithmetic sequence. Determine the values of <i>x</i> and <i>y</i>.</p>
                        {renderCoordinateInputs(
                            'q2-1-x',
                            'q2-1-y',
                            'x (e.g., 1)',
                            'y (e.g., -5)'
                        )}
                    </div>

                    <div className="sub-question">
                        <p>2.2 Given the quadratic number pattern: -3; 6; 27; 60; ….</p>

                        <div className="sub-question">
                            <p>2.2.1 Determine the general term of the pattern in the form <span className="equation">Tₙ = an² + bn + c</span>.</p>
                            {renderInput('q2-2-1', 'Tₙ (e.g., 6n² - 9n)', true)}
                        </div>

                        <div className="sub-question">
                            <p>2.2.2 Calculate the value of the 50<sup>th</sup> term of the pattern.</p>
                            {renderInput('q2-2-2', 'T₅₀ (e.g., 14550)', true)}
                        </div>

                        <div className="sub-question">
                            <p>2.2.3 Show that the sum of the first <i>n</i> first-differences of this pattern can be given by <span className="equation">Sₙ = 6n² + 3n</span>.</p>
                            {renderInput('q2-2-3', 'Sₙ (e.g., 6n² + 3n)', true)}
                        </div>

                        <div className="sub-question">
                            <p>2.2.4 How many consecutive first-differences were added to the first term of the quadratic number pattern to obtain a term in the quadratic number pattern that has a value of 21060?</p>
                            {renderInput('q2-2-4', 'n (e.g., 59)', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 3 */}
            <div className="question-section">
                <h2>QUESTION 3</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>3.1 Prove that <span className="equation">Σₖ₌₁^∞ 4·3^(2-k)</span> is a convergent geometric series. Show ALL your calculations.</p>
                        {renderInput('q3-1', 'Sum (e.g., 18)', true)}
                    </div>

                    <div className="sub-question">
                        <p>3.2 If <span className="equation">Σₖ₌ₚ^∞ 4·3^(2-k) = 2/9</span>, determine the value of <i>p</i>.</p>
                        {renderInput('q3-2', 'p (e.g., 5)', true)}
                    </div>
                </div>
            </div>

            {/* QUESTION 4 */}
            <div className="question-section">
                <h2>QUESTION 4</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>4.1 Given: <span className="equation">h(x) = -3/(x - 1) + 2</span></p>
                        <img src={img4_1} alt="Graph of h(x) for Section 4.1" className="image-placeholder" />

                        <div className="sub-question">
                            <p>4.1.1 Write down the equations of the asymptotes of <i>h</i>.</p>
                            {renderCoordinateInputs(
                                'q4-1-1a',
                                'q4-1-1b',
                                'Vertical (e.g., x = 1)',
                                'Horizontal (e.g., y = 2)'
                            )}
                        </div>

                        <div className="sub-question">
                            <p>4.1.2 Determine the equation of the axis of symmetry of <i>h</i> that has a negative gradient.</p>
                            {renderInput('q4-1-2', 'Equation (e.g., y = -x + 3)', true)}
                        </div>

                        <div className="sub-question">
                            <p>4.1.3 Sketch the graph of <i>h</i>, showing the asymptotes and the intercepts with the axes.</p>
                            {renderInput('q4-1-3', '', false, true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>4.2 The graphs of <span className="equation">f(x) = (1/2)(x + 5)² - 8</span> and <span className="equation">g(x) = (1/2)x + 9/2</span> are sketched below.</p>
                        <img src={img4_2} alt="Graph of f(x) and g(x) for Section 4.2" className="image-placeholder" />

                        <div className="sub-question">
                            <p>4.2.1 Write down the coordinates of A.</p>
                            {renderCoordinateInputs(
                                'q4-2-1a',
                                'q4-2-1b',
                                'x (e.g., -5)',
                                'y (e.g., -8)'
                            )}
                        </div>

                        <div className="sub-question">
                            <p>4.2.2 Write down the range of <i>f</i>.</p>
                            {renderInput('q4-2-2', 'Range (e.g., y ≥ -8)', true)}
                        </div>

                        <div className="sub-question">
                            <p>4.2.3 Calculate the values of <i>m</i> and <i>n</i>.</p>
                            {renderCoordinateInputs(
                                'q4-2-3a',
                                'q4-2-3b',
                                'm (e.g., -5)',
                                'n (e.g., 2)'
                            )}
                        </div>

                        <div className="sub-question">
                            <p>4.2.4 Calculate the area of OCDE.</p>
                            {renderInput('q4-2-4', 'Area (e.g., 65/4)', true)}
                        </div>

                        <div className="sub-question">
                            <p>4.2.5 Determine the equation of <i>g⁻¹</i>, the inverse of <i>g</i>, in the form <i>y</i> = ….</p>
                            {renderInput('q4-2-5', 'g⁻¹(x) (e.g., y = 2x - 9)', true)}
                        </div>

                        <div className="sub-question">
                            <p>4.2.6 If <i>h(x) = g⁻¹(x) + k</i> is a tangent to <i>f</i>, determine the coordinates of the point of contact between <i>h</i> and <i>f</i>.</p>
                            {renderCoordinateInputs(
                                'q4-2-6a',
                                'q4-2-6b',
                                'x (e.g., -3)',
                                'y (e.g., -6)'
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 5 */}
            <div className="question-section">
                <h2>QUESTION 5</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>5.1 The graph of <span className="equation">f(x) = 3^(-x)</span> is sketched below. A is the y-intercept of <i>f</i>. B is the point of intersection of <i>f</i> and the line <i>y = 9</i>.</p>
                        <img src={img5} alt="Graph of f(x) for Section 5.1" className="image-placeholder" />

                        <div className="sub-question">
                            <p>5.1.1 Write down the coordinates of A.</p>
                            {renderCoordinateInputs(
                                'q5-1-1a',
                                'q5-1-1b',
                                'x (e.g., 0)',
                                'y (e.g., 1)'
                            )}
                        </div>

                        <div className="sub-question">
                            <p>5.1.2 Determine the coordinates of B.</p>
                            {renderCoordinateInputs(
                                'q5-1-2a',
                                'q5-1-2b',
                                'x (e.g., -2)',
                                'y (e.g., 9)'
                            )}
                        </div>

                        <div className="sub-question">
                            <p>5.1.3 Write down the domain of <i>f⁻¹</i>.</p>
                            {renderInput('q5-1-3', 'Domain (e.g., x > 0)', true)}
                        </div>

                        <div className="sub-question">
                            <p>5.1.4 Describe the translation from <i>f</i> to <span className="equation">h(x) = 27 / 3^x</span>.</p>
                            {renderInput('q5-1-4', 'Translation (e.g., 3 units right)', true)}
                        </div>

                        <div className="sub-question">
                            <p>5.1.5 Determine the values of <i>x</i> for which <span className="equation">h(x) &lt; 1</span>.</p>
                            {renderInput('q5-1-5', 'Region (e.g., x > 3)', true)}
                        </div>

                        <div className="sub-question">
                            <p>5.1.6 Sketch the graph of <i>f(x)</i>, showing points A and B.</p>
                            {renderInput('q5-1-6', '', false, true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 6 */}
            <div className="question-section">
                <h2>QUESTION 6</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>6.1 On 31 January 2020, Tshepo made the first of his monthly deposits of R1 000 into a savings account. He continues to make monthly deposits of R1 000 at the end of each month up until 31 January 2032. The interest rate was fixed at 7,5% p.a., compounded monthly.</p>

                        <div className="sub-question">
                            <p>6.1.1 What will the investment be worth immediately after the last deposit?</p>
                            {renderInput('q6-1-1', 'Amount (e.g., 232224.00)', true)}
                        </div>

                        <div className="sub-question">
                            <p>6.1.2 If he makes no further payments but leaves the money in the account, how much money will be in the account on 31 January 2033?</p>
                            {renderInput('q6-1-2', 'Amount (e.g., 250274.76)', true)}
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>6.2 Jim bought a new car for R250 000. The value of the car depreciated at a rate of 22% p.a. annually according to the reducing-balance method. After how many years will its book value be R92 537,64?</p>
                        {renderInput('q6-2', 'Years (e.g., 4)', true)}
                    </div>

                    <div className="sub-question">
                        <p>6.3 Mpho is granted a loan under the following conditions:</p>
                        <ul>
                            <li>The interest rate is 11,3% p.a., compounded monthly.</li>
                            <li>The period of the loan is 6 years.</li>
                            <li>The monthly repayment on the loan is R1 500.</li>
                            <li>Her first repayment is made one month after the loan is granted.</li>
                        </ul>

                        <div className="sub-question">
                            <p>6.3.1 Calculate the value of the loan.</p>
                            {renderInput('q6-3-1', 'Amount (e.g., 78229.95)', true)}
                        </div>

                        <div className="sub-question">
                            <p>6.3.2 How much interest will Mpho pay in total over the first 5 years?</p>
                            {renderInput('q6-3-2', 'Interest (e.g., 28746.76)', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 7 */}
            <div className="question-section">
                <h2>QUESTION 7</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>7.1 Determine <span className="equation">f'(x)</span> from first principles if <span className="equation">f(x) = 2x² - 1</span>.</p>
                        {renderInput('q7-1', "f'(x) (e.g., 4x)", true)}
                    </div>

                    <div className="sub-question">
                        <p>7.2 Determine:</p>

                        <div className="sub-question">
                            <p>7.2.1 <span className="equation">d/dx (√(x²) + x³)</span></p>
                            {renderInput('q7-2-1', "dy/dx (e.g., 1 + 3x²)", true)}
                        </div>

                        <div className="sub-question">
                            <p>7.2.2 <span className="equation">f'(x)</span> if <span className="equation">f(x) = (4x² - 9)/(4x + 6)</span>; <i>x ≠ -3/2</i></p>
                            {renderInput('q7-2-2', "f'(x) (e.g., 1)", true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 8 */}
            <div className="question-section">
                <h2>QUESTION 8</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>8.1 The graph of <span className="equation">g(x) = ax³ + bx² + cx</span>, a cubic function having a y-intercept of 0, is drawn below. The x-coordinates of the turning points of <i>g</i> are -1 and 2.</p>
                        <img src={img8} alt="Graph of g(x) for Section 8.1" className="image-placeholder" />

                        <div className="sub-question">
                            <p>8.1.1 For which values of <i>x</i> will <i>g</i> increase?</p>
                            {renderInput('q8-1-1', 'Region (e.g., -1 < x < 2)', true)}
                        </div>

                        <div className="sub-question">
                            <p>8.1.2 Write down the x-coordinate of the point of inflection of <i>g</i>.</p>
                            {renderInput('q8-1-2', 'x (e.g., 1/2)', true)}
                        </div>

                        <div className="sub-question">
                            <p>8.1.3 For which values of <i>x</i> will <i>g</i> be concave down?</p>
                            {renderInput('q8-1-3', 'Region (e.g., x > 1/2)', true)}
                        </div>

                        <div className="sub-question">
                            <p>8.1.4 If <span className="equation">g'(x) = -6x² + 6x + 12</span>, determine the equation of <i>g</i>.</p>
                            {renderInput('q8-1-4', 'g(x) (e.g., -2x³ + 3x² + 12x)', true)}
                        </div>

                        <div className="sub-question">
                            <p>8.1.5 Determine the equation of the tangent to <i>g</i> that has the maximum gradient. Write your answer in the form <i>y = mx + c</i>.</p>
                            {renderInput('q8-1-5', 'Tangent (e.g., y = (27/2)x - 1/4)', true)}
                        </div>

                        <div className="sub-question">
                            <p>8.1.6 Sketch the graph of <i>g(x)</i>, showing the y-intercept and turning points.</p>
                            {renderInput('q8-1-6', '', false, true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 9 */}
            <div className="question-section">
                <h2>QUESTION 9</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>9.1 A closed rectangular box has to be constructed as follows:</p>
                        <ul>
                            <li>Dimensions: length (<i>l</i>), width (<i>w</i>) and height (<i>h</i>).</li>
                            <li>The length (<i>l</i>) of the base has to be 3 times its width (<i>w</i>).</li>
                            <li>The volume has to be 5 m³.</li>
                        </ul>
                        <p>The material for the top and the bottom parts costs R15 per square metre and the material for the sides costs R6 per square metre.</p>
                        <p>Show that the cost to construct the box can be calculated by: <span className="equation">Cost = 90w² + 48wh</span>.</p>
                        {renderInput('q9-1', 'Cost (e.g., 90w² + 48wh)', true)}
                    </div>

                    <div className="sub-question">
                        <p>9.2 Determine the width of the box such that the cost to build the box is a minimum.</p>
                        {renderInput('q9-2', 'Width (e.g., (4/9)^(1/3))', true)}
                    </div>
                </div>
            </div>

            {/* QUESTION 10 */}
            <div className="question-section">
                <h2>QUESTION 10</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>10.1 In a certain country, 10-digit telephone numbers with the following format were introduced:</p>
                        <table border="1" style={{margin: '10px 0', borderCollapse: 'collapse', width: '100%'}}>
                            <tr><th>Format</th><th>Area Code</th><th>Exchange Code</th><th>Number</th></tr>
                            <tr><td>Number of digits</td><td>3 digits</td><td>3 digits</td><td>4 digits</td></tr>
                            <tr><td>Example</td><td>901</td><td>544</td><td>1230</td></tr>
                        </table>
                        <p>Digits may be repeated.</p>
                        <p>How many possible 10-digit telephone numbers could be formed?</p>
                        {renderInput('q10-1', 'Total numbers (e.g., 10000000000)', true)}
                    </div>

                    <div className="sub-question">
                        <p>10.2 Certain restrictions were placed on the groups of digits:</p>
                        <ul>
                            <li>Area code: must be 3 digits and the first digit can NOT be 0 or 1</li>
                            <li>Exchange code: must be 3 digits and the first and second digits can NOT be 0 or 1</li>
                            <li>Number: must be 4 digits and the first digit MUST be a 0 or 1</li>
                        </ul>

                        <div className="sub-question">
                            <p>10.2.1 How many valid 10-digit telephone numbers could be formed by applying the given restrictions?</p>
                            {renderInput('q10-2-1', 'Valid numbers (e.g., 115200000)', true)}
                        </div>

                        <div className="sub-question">
                            <p>10.2.2 Determine the probability that any randomly chosen 10-digit telephone number would be a valid phone number.</p>
                            {renderInput('q10-2-2', 'Probability (e.g., 0.01152)', true)}
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 11 */}
            <div className="question-section">
                <h2>QUESTION 11</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>11.1 Harry shoots arrows at a target board. He has a 50% chance of hitting the bull's eye on each shot.</p>
                        <p>Calculate the probability that Harry will hit the bull's eye in his first shot and his second shot.</p>
                        {renderInput('q11-1', 'Probability (e.g., 0.25)', true)}
                    </div>

                    <div className="sub-question">
                        <p>11.2 Calculate the probability that Harry will hit the bull's eye at least twice in his first three shots.</p>
                        {renderInput('q11-2', 'Probability (e.g., 0.5)', true)}
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

                .file-input {
                    width: 100%;
                    padding: clamp(0.5rem, 1.5vw, 0.75rem);
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

                .paired-inputs {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .or-divider {
                    font-size: clamp(0.8rem, 2vw, 0.9rem);
                    color: #555;
                }

                .triple-inputs {
                    flex-wrap: wrap;
                    justify-content: flex-start;
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

                .image-placeholder {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: clamp(0.5rem, 1.5vw, 0.75rem) auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    object-fit: contain;
                }

                /* Media Queries for Responsiveness */
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

                @media (min-width: 641px) and (max-width: 1024px) {
                    .math-exam {
                        padding: clamp(0.75rem, 2.5vw, 1rem);
                    }

                    h1 {
                        font-size: clamp(1.5rem, 3.5vw, 1.75rem);
                    }

                    h2 {
                        font-size: clamp(1.1rem, 2.5vw, 1.3rem);
                    }

                    .input-group {
                        flex-wrap: wrap;
                    }

                    .input {
                        max-width: 200px;
                    }

                    .wide-input {
                        max-width: 100%;
                    }

                    .submit-button {
                        width: clamp(180px, 40vw, 220px);
                    }
                }

                @media (min-width: 1025px) {
                    .input {
                        max-width: 250px;
                    }

                    .wide-input {
                        max-width: 400px;
                    }
                }

                /* Scrollbar Styling */
                .question-section, .modal-content {
                    scrollbar-width: thin;
                    scrollbar-color: #888 #f1f1f1;
                }

                .question-section::-webkit-scrollbar, .modal-content::-webkit-scrollbar {
                    width: 6px;
                }

                .question-section::-webkit-scrollbar-thumb, .modal-content::-webkit-scrollbar-thumb {
                    background-color: #888;
                    border-radius: 3px;
                }

                .question-section::-webkit-scrollbar-track, .modal-content::-webkit-scrollbar-track {
                    background-color: #f1f1f1;
                }
            `}</style>
        </div>
    );
};

export default MathematicsP1November2020Eng;