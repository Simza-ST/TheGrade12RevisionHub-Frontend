import React from 'react';

const SectionD = ({ answers, onAnswerChange }) => {
    return (
        <section className="section">
            <h2>SECTION D: TOURISM SECTORS; SUSTAINABLE AND RESPONSIBLE TOURISM (30 marks)</h2>

            {/* QUESTION 7 */}
            <div className="card">
                <div className="qtitle">QUESTION 7: Tourism Employment and Professionalism [14 marks]</div>

                {/* Instagram Post */}
                <div className="question-block">
                    <div className="small qindex">7.1 Study the Instagram post and reaction from the hotel</div>
                    <div className="image-container">
                        <img src="/images/hotel.jpg" alt="Instagram Post about Hotel Room" />
                    </div>
                </div>

                {/* 7.1.1 */}
                <div className="question-block">
                    <div className="small qindex">7.1.1 Identify ONE example of professional behaviour by the staff at Tango Hotels. (2 marks)</div>
                    <textarea
                        value={answers['7.1.1'] || ''}
                        onChange={(e) => onAnswerChange('7.1.1', e.target.value)}
                        placeholder="Your answer"
                        rows="3"
                    />
                </div>

                {/* 7.1.2 */}
                <div className="question-block">
                    <div className="small qindex">7.1.2 Apart from the image of the staff, identify TWO aspects on the Instagram post that indicate professional image of the hotel. (4 marks)</div>
                    <textarea
                        value={answers['7.1.2'] || ''}
                        onChange={(e) => onAnswerChange('7.1.2', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* Fair Labour Practices */}
                <div className="question-block">
                    <div className="small qindex">7.2 Royal Tourism Services - Fair Labour Practices</div>
                    <div className="table-container">
                        <table>
                            <thead>
                            <tr>
                                <th>Fair Labour Practices</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr><td>All employees have legally binding contracts</td></tr>
                            <tr><td>All employees are paid a fair salary/wage</td></tr>
                            <tr><td>Working hours and overtime comply with the law</td></tr>
                            <tr><td>Employees are given meal breaks during working hours</td></tr>
                            <tr><td>Deductions are made according to legal requirements</td></tr>
                            <tr><td>Employees have access to the Basic Conditions of Employment Act</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 7.2.1 */}
                <div className="question-block">
                    <div className="small qindex">7.2.1 Explain TWO conditions of employment relating to the remuneration of staff members. (4 marks)</div>
                    <textarea
                        value={answers['7.2.1'] || ''}
                        onChange={(e) => onAnswerChange('7.2.1', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* 7.2.2 */}
                <div className="question-block">
                    <div className="small qindex">7.2.2 Explain the difference between working hours and overtime. (4 marks)</div>
                    <textarea
                        value={answers['7.2.2'] || ''}
                        onChange={(e) => onAnswerChange('7.2.2', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>
            </div>

            {/* QUESTION 8 */}
            <div className="card">
                <div className="qtitle">QUESTION 8: Sustainable and Responsible Tourism [16 marks]</div>

                <div className="image-container">
                    <img src="/images/trade.jpg" alt="Fair Trade Tourism Criteria" />
                </div>

                {/* 8.1 */}
                <div className="question-block">
                    <div className="small qindex">8.1 Give TWO examples of how Fair Trade Tourism businesses are involved in social development projects. (4 marks)</div>
                    <textarea
                        value={answers['8.1'] || ''}
                        onChange={(e) => onAnswerChange('8.1', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* 8.2 */}
                <div className="question-block">
                    <div className="small qindex">8.2 Apart from the social pillar, identify TWO pillars of sustainable tourism in the Fair Trade Tourism criteria. (4 marks)</div>
                    <textarea
                        value={answers['8.2'] || ''}
                        onChange={(e) => onAnswerChange('8.2', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* 8.3 */}
                <div className="question-block">
                    <div className="small qindex">8.3 Explain TWO ways in which certified Fair Trade Tourism business contributes to the local economy. (4 marks)</div>
                    <textarea
                        value={answers['8.3'] || ''}
                        onChange={(e) => onAnswerChange('8.3', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>

                {/* 8.4 */}
                <div className="question-block">
                    <div className="small qindex">8.4 Give TWO reasons how the phrase 'Stay where your spend really counts' would encourage responsible tourism practices. (4 marks)</div>
                    <textarea
                        value={answers['8.4'] || ''}
                        onChange={(e) => onAnswerChange('8.4', e.target.value)}
                        placeholder="Your answer"
                        rows="4"
                    />
                </div>
            </div>
        </section>
    );
};

export default SectionD;
