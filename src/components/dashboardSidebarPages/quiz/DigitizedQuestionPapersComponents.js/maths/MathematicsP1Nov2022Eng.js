import { API_BASE_URL, getAuthHeaders } from '../../../../../utils/api';
import {useState} from "react"; // Adjust path as needed

const MathematicsP1Nov2022Eng = ({ paperId }) => {
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [recording, setRecording] = useState(false);
    const [recordError, setRecordError] = useState(null);



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
                    paperId:paperId,
                    score: scoreData.correct,
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


    const checkAnswers = () => {
        // This is a simplified version - in a real app you would have the full answer key
        let correct = 0;
        let total = 0;

        // Count total questions and check answers (simplified logic)
        Object.keys(answers).forEach(qId => {
            total++;
            if (answers[qId].trim().toLowerCase() === "correct") {
                correct++;
            }
        });

        const percentage = Math.round((correct / total) * 100);
        const scoreData = { correct, total, percentage };
        setScore(scoreData);

        // Record performance after setting score
        recordPerformance(scoreData);
    };

    return (
        <div className="math-exam">
            <h1>MATHEMATICS P1 - NOVEMBER 2022</h1>

            {/* QUESTION 1 */}
            <div className="question-section">
                <h2>QUESTION 1</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>1.1 Solve for <i>x</i>:</p>

                        <div className="sub-question">
                            <p>1.1.1 <span className="equation">(3x - 6)(x + 2) = 0</span></p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="(e.g., x = 2)"
                                    value={answers['q1-1-1a'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-1a', e.target.value)}
                                />
                                <span>or</span>
                                <input
                                    type="text"
                                    placeholder="(e.g., x = -2)"
                                    value={answers['q1-1-1b'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-1b', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>1.1.2 <span className="equation">2x² - 6x + 1 = 0</span> (correct to TWO decimal places)</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="(e.g., x = 2.82)"
                                    value={answers['q1-1-2a'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-2a', e.target.value)}
                                />
                                <span>or</span>
                                <input
                                    type="text"
                                    placeholder="(e.g., x = 0.18)"
                                    value={answers['q1-1-2b'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-2b', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>1.1.3 <span className="equation">x² - 90 > x</span></p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="First region (e.g., x < -9)"
                                    value={answers['q1-1-3a'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-3a', e.target.value)}
                                />
                                <span>or</span>
                                <input
                                    type="text"
                                    placeholder="Second region (e.g., x > 10)"
                                    value={answers['q1-1-3b'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-3b', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>1.1.4 <span className="equation">x - 7√x = -12</span></p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="First answer (e.g., x = 9)"
                                    value={answers['q1-1-4a'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-4a', e.target.value)}
                                />
                                <span>or</span>
                                <input
                                    type="text"
                                    placeholder="Second answer (e.g., x = 16)"
                                    value={answers['q1-1-4b'] || ''}
                                    onChange={(e) => handleInputChange('q1-1-4b', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>1.2 Solve for <i>x</i> and <i>y</i> simultaneously:</p>
                        <p><span className="equation">2x - y = 2</span></p>
                        <p><span className="equation">xy = 4</span></p>
                        <label>First Solution:</label>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="x (e.g., x = 2)"
                                value={answers['q1-2a-x'] || ''}
                                onChange={(e) => handleInputChange('q1-2a-x', e.target.value)}
                            />
                            <span>,</span>
                            <input
                                type="text"
                                placeholder="y (e.g., y = 2)"
                                value={answers['q1-2a-y'] || ''}
                                onChange={(e) => handleInputChange('q1-2a-y', e.target.value)}
                            />
                        </div>
                        <label>Second Solution:</label>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="x (e.g., x = -1)"
                                value={answers['q1-2b-x'] || ''}
                                onChange={(e) => handleInputChange('q1-2b-x', e.target.value)}
                            />
                            <span>,</span>
                            <input
                                type="text"
                                placeholder="y (e.g., y = -4)"
                                value={answers['q1-2b-y'] || ''}
                                onChange={(e) => handleInputChange('q1-2b-y', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>1.3 Show that <i>2.5ⁿ - 5ⁿ⁺¹ + 5ⁿ⁺²</i> is even for all positive integer values of <i>n</i>.</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="Enter your proof"
                            value={answers['q1-3'] || ''}
                            onChange={(e) => handleInputChange('q1-3', e.target.value)}
                        />
                    </div>

                    <div className="sub-question">
                        <p>1.4 Determine the values of <i>x</i> and <i>y</i> if: <span className="equation">3ʸ⁺¹ ÷ √(96ˣ) = 1</span></p>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="x (e.g., x = -2)"
                                value={answers['q1-4-x'] || ''}
                                onChange={(e) => handleInputChange('q1-4-x', e.target.value)}
                            />
                            <span>,</span>
                            <input
                                type="text"
                                placeholder="y (e.g., y = -2)"
                                value={answers['q1-4-y'] || ''}
                                onChange={(e) => handleInputChange('q1-4-y', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 2 */}
            <div className="question-section">
                <h2>QUESTION 2</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>2.1 The first term of a geometric series is 14 and the 6th term is 448.</p>

                        <div className="sub-question">
                            <p>2.1.1 Calculate the value of the constant ratio, <i>r</i>.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="r (e.g., r = 2)"
                                value={answers['q2-1-1'] || ''}
                                onChange={(e) => handleInputChange('q2-1-1', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>2.1.2 Determine the number of consecutive terms that must be added to the first 6 terms of the series in order to obtain a sum of 114674.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="(e.g., 7)"
                                value={answers['q2-1-2'] || ''}
                                onChange={(e) => handleInputChange('q2-1-2', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>2.1.3 If the first term of another series is 448 and the 6th term is 14, calculate the sum to infinity of the new series.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="(e.g., 896)"
                                value={answers['q2-1-3'] || ''}
                                onChange={(e) => handleInputChange('q2-1-3', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>2.2 If <span className="equation">∑ₚ₌₀ᵏ (1/3 p + 1/6) = 20 1/6</span>, determine the value of <i>k</i>.</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="k (e.g., k = 10)"
                            value={answers['q2-2'] || ''}
                            onChange={(e) => handleInputChange('q2-2', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* QUESTION 3 */}
            <div className="question-section">
                <h2>QUESTION 3</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>It is given that the general term of a quadratic number pattern is <span className="equation">Tₙ = n² + bn + 9</span> and the first term of the first differences is 7.</p>

                        <div className="sub-question">
                            <p>3.1 Show that <i>b = 4</i>.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="b (e.g., b = 4)"
                                value={answers['q3-1'] || ''}
                                onChange={(e) => handleInputChange('q3-1', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>3.2 Determine the value of the 60th term of this number pattern.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="T₆₀ (e.g., 3849)"
                                value={answers['q3-2'] || ''}
                                onChange={(e) => handleInputChange('q3-2', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>3.3 Determine the general term for the sequence of first differences of the quadratic number pattern. Write your answer in the form <span className="equation">Tₚ = mp + q</span>.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Tₚ (e.g., 2p + 5)"
                                value={answers['q3-3'] || ''}
                                onChange={(e) => handleInputChange('q3-3', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>3.4 Which TWO consecutive terms in the quadratic number pattern have a first difference of 157?</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="First term (e.g., T₇₆)"
                                    value={answers['q3-4a'] || ''}
                                    onChange={(e) => handleInputChange('q3-4a', e.target.value)}
                                />
                                <span>and</span>
                                <input
                                    type="text"
                                    placeholder="Second term (e.g., T₇₇)"
                                    value={answers['q3-4b'] || ''}
                                    onChange={(e) => handleInputChange('q3-4b', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 4 */}
            <div className="question-section">
                <h2>QUESTION 4</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>4.1 Sketched below is the graph of <span className="equation">h(x) = 1/(x + p) + q</span>. The asymptotes of <i>h</i> intersect at (1; 2).</p>
                        <img src="/static/images/mathsP1_Question_4.1.png" alt="Graph for Section 4.1" className="image-placeholder" />

                        <div className="sub-question">
                            <p>4.1.1 Write down the values of <i>p</i> and <i>q</i>.</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="p (e.g., p = -1)"
                                    value={answers['q4-1-1-p'] || ''}
                                    onChange={(e) => handleInputChange('q4-1-1-p', e.target.value)}
                                />
                                <span>,</span>
                                <input
                                    type="text"
                                    placeholder="q (e.g., q = 2)"
                                    value={answers['q4-1-1-q'] || ''}
                                    onChange={(e) => handleInputChange('q4-1-1-q', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>4.1.2 Calculate the coordinates of the <i>x</i>-intercept of <i>h</i>.</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="x (e.g., 1/2)"
                                    value={answers['q4-1-2-x'] || ''}
                                    onChange={(e) => handleInputChange('q4-1-2-x', e.target.value)}
                                />
                                <span>,</span>
                                <input
                                    type="text"
                                    placeholder="y (e.g., 0)"
                                    value={answers['q4-1-2-y'] || ''}
                                    onChange={(e) => handleInputChange('q4-1-2-y', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>4.1.3 Write down the <i>x</i>-coordinate of the <i>x</i>-intercept of <i>g</i> if <span className="equation">g(x) = h(x + 3)</span>.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="x (e.g., -5/2)"
                                value={answers['q4-1-3'] || ''}
                                onChange={(e) => handleInputChange('q4-1-3', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>4.1.4 The equation of an axis of symmetry of <i>h</i> is <span className="equation">y = x + t</span>. Determine the value of <i>t</i>.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="t (e.g., t = 1)"
                                value={answers['q4-1-4'] || ''}
                                onChange={(e) => handleInputChange('q4-1-4', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>4.1.5 Determine the values of <i>x</i> for which <span className="equation">-2 ≤ 1/(x - 1)</span>.</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="First region (e.g., x ≤ 1/2)"
                                    value={answers['q4-1-5a'] || ''}
                                    onChange={(e) => handleInputChange('q4-1-5a', e.target.value)}
                                />
                                <span>or</span>
                                <input
                                    type="text"
                                    placeholder="Second region (e.g., x > 1)"
                                    value={answers['q4-1-5b'] || ''}
                                    onChange={(e) => handleInputChange('q4-1-5b', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>4.2 The graphs of  f(x) = x² - 4x - 5  and  g(x) = a·2ˣ + q  are sketched below.</p>
                        <img src="/static/images/mathsP1_Question_4.2.png" alt="Graph for Section 4.2" className="image-placeholder" />

                        <div className="sub-question">
                            <p>4.2.1 Write down the <i>y</i>-coordinate of C (the <i>y</i>-intercept of <i>f</i>).</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="y (e.g., -5)"
                                value={answers['q4-2-1'] || ''}
                                onChange={(e) => handleInputChange('q4-2-1', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>4.2.2 Determine the coordinates of D (the turning point of <i>f</i>).</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="x (e.g., 2)"
                                    value={answers['q4-2-2-x'] || ''}
                                    onChange={(e) => handleInputChange('q4-2-2-x', e.target.value)}
                                />
                                <span>,</span>
                                <input
                                    type="text"
                                    placeholder="y (e.g., -9)"
                                    value={answers['q4-2-2-y'] || ''}
                                    onChange={(e) => handleInputChange('q4-2-2-y', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>4.2.3 Determine the values of <i>a</i> and <i>q</i>.</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="a (e.g., -1)"
                                    value={answers['q4-2-3-a'] || ''}
                                    onChange={(e) => handleInputChange('q4-2-3-a', e.target.value)}
                                />
                                <span>,</span>
                                <input
                                    type="text"
                                    placeholder="q (e.g., -5)"
                                    value={answers['q4-2-3-q'] || ''}
                                    onChange={(e) => handleInputChange('q4-2-3-q', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>4.2.4 Write down the range of <i>g</i>.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Range (e.g., y < -5)"
                                value={answers['q4-2-4'] || ''}
                                onChange={(e) => handleInputChange('q4-2-4', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>4.2.5 Determine the values of <i>k</i> for which the value of <span className="equation">f(x) - k</span> will always be positive.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="k (e.g., k < -9)"
                                value={answers['q4-2-5'] || ''}
                                onChange={(e) => handleInputChange('q4-2-5', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 5 */}
            <div className="question-section">
                <h2>QUESTION 5</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>The graphs of <span className="equation">g(x) = 2x + 6</span> and <i>g⁻¹</i>, the inverse of <i>g</i>, are shown in the diagram below.</p>
                        <img src="/static/images/mathsP1_Question_5.png" alt="Graph for Section 5" className="image-placeholder" />

                        <div className="sub-question">
                            <p>5.1 Write down the <i>y</i>-coordinate of B (the <i>y</i>-intercept of <i>g</i>).</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="y (e.g., 6)"
                                value={answers['q5-1'] || ''}
                                onChange={(e) => handleInputChange('q5-1', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>5.2 Determine the equation of <i>g⁻¹</i> in the form <span className="equation">g⁻¹(x) = mx + n</span>.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="g⁻¹(x) (e.g., (1/2)x - 3)"
                                value={answers['q5-2'] || ''}
                                onChange={(e) => handleInputChange('q5-2', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>5.3 Determine the coordinates of A (the intersection of <i>g</i> and <i>g⁻¹</i>).</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="x (e.g., -6)"
                                    value={answers['q5-3-x'] || ''}
                                    onChange={(e) => handleInputChange('q5-3-x', e.target.value)}
                                />
                                <span>,</span>
                                <input
                                    type="text"
                                    placeholder="y (e.g., -6)"
                                    value={answers['q5-3-y'] || ''}
                                    onChange={(e) => handleInputChange('q5-3-y', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>5.4 Calculate the length of AB.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Length (e.g., 6√5)"
                                value={answers['q5-4'] || ''}
                                onChange={(e) => handleInputChange('q5-4', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>5.5 Calculate the area of △ABC.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Area (e.g., 54)"
                                value={answers['q5-5'] || ''}
                                onChange={(e) => handleInputChange('q5-5', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 6 */}
            <div className="question-section">
                <h2>QUESTION 6</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>6.1 R12 000 was invested in a fund that paid interest at <i>m</i>% p.a., compounded quarterly. After 24 months, the value of the investment was R13 459. Determine the value of <i>m</i>.</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="m (e.g., 5.78)"
                            value={answers['q6-1'] || ''}
                            onChange={(e) => handleInputChange('q6-1', e.target.value)}
                        />
                    </div>

                    <div className="sub-question">
                        <p>6.2 On 31 January 2022, Tino deposited R1 000 in an account that paid interest at 7.5% p.a., compounded monthly. He continued depositing R1 000 on the last day of every month. He will make the last deposit on 31 December 2022. Will Tino have sufficient funds in the account on 1 January 2023 to buy a computer that costs R13 000?</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="Amount and conclusion (e.g., R12421.22, No)"
                            value={answers['q6-2'] || ''}
                            onChange={(e) => handleInputChange('q6-2', e.target.value)}
                            style={{maxWidth: '380px'}}
                        />
                    </div>

                    <div className="sub-question">
                        <p>6.3 Thabo plans to buy a car that costs R250 000. He will pay a deposit of 15% and take out a loan for the balance. The interest on the loan is 13% p.a., compounded monthly.</p>

                        <div className="sub-question">
                            <p>6.3.1 Calculate the value of the loan.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Loan amount (e.g., R212500)"
                                value={answers['q6-3-1'] || ''}
                                onChange={(e) => handleInputChange('q6-3-1', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>6.3.2 The first repayment will be made 6 months after the loan has been granted. The loan will be repaid over a period of 6 years after it has been granted. Calculate the MONTHLY instalment.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Monthly instalment (e.g., R4724.96)"
                                value={answers['q6-3-2'] || ''}
                                onChange={(e) => handleInputChange('q6-3-2', e.target.value)}
                                style={{maxWidth: '350px'}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 7 */}
            <div className="question-section">
                <h2>QUESTION 7</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>7.1 Determine <span className="equation">f'(x)</span> from first principles if <span className="equation">f(x) = x² + x</span>.</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="f'(x) (e.g., 2x + 1)"
                            value={answers['q7-1'] || ''}
                            onChange={(e) => handleInputChange('q7-1', e.target.value)}
                        />
                    </div>

                    <div className="sub-question">
                        <p>7.2 Determine <span className="equation">f'(x)</span> if <span className="equation">f(x) = 2x³ - 3x⁴ + 8x</span>.</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="f'(x) (e.g., 10x⁴ - 12x³ + 8)"
                            value={answers['q7-2'] || ''}
                            onChange={(e) => handleInputChange('q7-2', e.target.value)}
                        />
                    </div>

                    <div className="sub-question">
                        <p>7.3 The tangent to <span className="equation">g(x) = ax³ + 3x² + bx + c</span> has a minimum gradient at the point (-1; -7). For which values of <i>x</i> will <i>g</i> be concave up?</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="Region (e.g., x > -1)"
                            value={answers['q7-3'] || ''}
                            onChange={(e) => handleInputChange('q7-3', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* QUESTION 8 */}
            <div className="question-section">
                <h2>QUESTION 8</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>The graph of <span className="equation">y = f'(x) = mx² + nx + k</span> passes the points P(-1/3; 0), Q(1; 0), and R(0; 1).</p>
                        <img src="/static/images/mathsP1_Question_8.png" alt="Graph for Section 8" className="image-placeholder" />

                        <div className="sub-question">
                            <p>8.1 Determine the values of <i>m</i>, <i>n</i>, and <i>k</i>.</p>
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="m (e.g., -3)"
                                    value={answers['q8-1-m'] || ''}
                                    onChange={(e) => handleInputChange('q8-1-m', e.target.value)}
                                />
                                <span>,</span>
                                <input
                                    type="text"
                                    placeholder="n (e.g., 2)"
                                    value={answers['q8-1-n'] || ''}
                                    onChange={(e) => handleInputChange('q8-1-n', e.target.value)}
                                />
                                <span>,</span>
                                <input
                                    type="text"
                                    placeholder="k (e.g., 1)"
                                    value={answers['q8-1-k'] || ''}
                                    onChange={(e) => handleInputChange('q8-1-k', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>8.2 If it is further given that <span className="equation">f(x) = -x³ + x² + x + 2</span>:</p>

                            <div className="sub-question">
                                <p>8.2.1 Determine the coordinates of the turning points of <i>f</i>.</p>
                                <label>First Turning Point:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="x (e.g., -1/3)"
                                        value={answers['q8-2-1a-x'] || ''}
                                        onChange={(e) => handleInputChange('q8-2-1a-x', e.target.value)}
                                    />
                                    <span>,</span>
                                    <input
                                        type="text"
                                        placeholder="y (e.g., 49/27)"
                                        value={answers['q8-2-1a-y'] || ''}
                                        onChange={(e) => handleInputChange('q8-2-1a-y', e.target.value)}
                                    />
                                </div>
                                <label>Second Turning Point:</label>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        placeholder="x (e.g., 1)"
                                        value={answers['q8-2-1b-x'] || ''}
                                        onChange={(e) => handleInputChange('q8-2-1b-x', e.target.value)}
                                    />
                                    <span>,</span>
                                    <input
                                        type="text"
                                        placeholder="y (e.g., 3)"
                                        value={answers['q8-2-1b-y'] || ''}
                                        onChange={(e) => handleInputChange('q8-2-1b-y', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="sub-question">
                                <p>8.2.2 Draw the graph of <i>f</i>. Indicate on your graph the coordinates of the turning points and the intercepts with the axes.</p>
                                <div className="input-group">
                                    <input type="file" accept="image/*,application/pdf" />
                                </div>
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>8.3 Points E and W are two variable points on <i>f'</i> and are on the same horizontal line.</p>

                            <div className="sub-question">
                                <p>8.3.1 Write down the value of <i>a</i> (x-coordinate of D, the intersection of tangents at E and W).</p>
                                <input
                                    type="text"
                                    className="wide-input"
                                    placeholder="a (e.g., 1/3)"
                                    value={answers['q8-3-1'] || ''}
                                    onChange={(e) => handleInputChange('q8-3-1', e.target.value)}
                                />
                            </div>

                            <div className="sub-question">
                                <p>8.3.2 Determine the value(s) of <i>b</i> for which <i>h</i> and <i>g</i> will no longer be tangents to <i>f'</i>.</p>
                                <input
                                    type="text"
                                    className="wide-input"
                                    placeholder="b (e.g., b < 4/3)"
                                    value={answers['q8-3-2'] || ''}
                                    onChange={(e) => handleInputChange('q8-3-2', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QUESTION 9 */}
            <div className="question-section">
                <h2>QUESTION 9</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>Given <span className="equation">f(x) = x²</span>. Determine the minimum distance between the point (10; 2) and a point on <i>f</i>.</p>
                        <input
                            type="text"
                            className="wide-input"
                            placeholder="Minimum distance (e.g., 2√17)"
                            value={answers['q9-1'] || ''}
                            onChange={(e) => handleInputChange('q9-1', e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* QUESTION 10 */}
            <div className="question-section">
                <h2>QUESTION 10</h2>
                <div className="question">
                    <div className="sub-question">
                        <p>10.1 A, B, and C are three events. The probabilities of these events (or any combination of them) occurring are given in the Venn diagram below.</p>
                        <img src="/static/images/mathsP1_Question_10.png" alt="Venn diagram for Section 10.1" className="image-placeholder" />

                        <div className="sub-question">
                            <p>10.1.1 If it is given that the probability that at least one of the events will occur is 0.893, calculate the value of:</p>

                            <div className="sub-question">
                                <p>(a) <i>y</i>, the probability that none of the events will occur.</p>
                                <input
                                    type="text"
                                    className="wide-input"
                                    placeholder="y (e.g., 0.107)"
                                    value={answers['q10-1-1a'] || ''}
                                    onChange={(e) => handleInputChange('q10-1-1a', e.target.value)}
                                />
                            </div>

                            <div className="sub-question">
                                <p>(b) <i>x</i>, the probability that all three events will occur.</p>
                                <input
                                    type="text"
                                    className="wide-input"
                                    placeholder="x (e.g., 0.16)"
                                    value={answers['q10-1-1b'] || ''}
                                    onChange={(e) => handleInputChange('q10-1-1b', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sub-question">
                            <p>10.1.2 Determine the probability that at least two of the events will take place.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Probability (e.g., 0.45)"
                                value={answers['q10-1-2'] || ''}
                                onChange={(e) => handleInputChange('q10-1-2', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>10.1.3 Are events B and C independent? Justify your answer.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Conclusion (e.g., Yes, P(B ∩ C) = P(B)P(C))"
                                value={answers['q10-1-3'] || ''}
                                onChange={(e) => handleInputChange('q10-1-3', e.target.value)}
                                style={{maxWidth: '350px'}}
                            />
                        </div>
                    </div>

                    <div className="sub-question">
                        <p>10.2 A four-digit code is required to open a combination lock. The code must be even-numbered and may not contain the digits 0 or 1. Digits may not be repeated.</p>

                        <div className="sub-question">
                            <p>10.2.1 How many possible 4-digit combinations are there to open the lock?</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Number (e.g., 840)"
                                value={answers['q10-2-1'] || ''}
                                onChange={(e) => handleInputChange('q10-2-1', e.target.value)}
                            />
                        </div>

                        <div className="sub-question">
                            <p>10.2.2 Calculate the probability that you will open the lock at the first attempt if it is given that the code is greater than 5000 and the third digit is 2.</p>
                            <input
                                type="text"
                                className="wide-input"
                                placeholder="Probability (e.g., 0.0133)"
                                value={answers['q10-2-2'] || ''}
                                onChange={(e) => handleInputChange('q10-2-2', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button
                className="check-button"
                onClick={checkAnswers}
                disabled={recording}
            >
                {recording ? 'Recording...' : 'Check Answers'}
            </button>

            {score && (
                <div className="score-display">
                    {/* ... existing score display ... */}
                    {recordError && (
                        <p className="error">Recording failed: {recordError}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MathematicsP1Nov2022Eng;