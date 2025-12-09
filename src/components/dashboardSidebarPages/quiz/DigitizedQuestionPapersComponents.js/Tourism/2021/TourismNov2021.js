
import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import Header from './Header';
import Instructions from './Instructions';
import SectionA from './SectionA';
import SectionB from './SectionB';
import SectionC from './SectionC';
import SectionD from './SectionD';
import SectionE from './SectionE';
import Results from './Results';

// Complete answer key for 200 marks
const correctAnswers = {
    // Section A (40 marks)
    "q1.1.1": "C", "q1.1.2": "A", "q1.1.3": "B", "q1.1.4": "D", "q1.1.5": "A",
    "q1.1.6": "D", "q1.1.7": "A", "q1.1.8": "D", "q1.1.9": "B", "q1.1.10": "B",
    "q1.1.11": "D", "q1.1.12": "A", "q1.1.13": "C", "q1.1.14": "D", "q1.1.15": "D",
    "q1.1.16": "C", "q1.1.17": "B", "q1.1.18": "A", "q1.1.19": "D", "q1.1.20": "D",
    "q1.2.1": "transit visa", "q1.2.2": "health certificate", "q1.2.3": "passport",
    "q1.2.4": "Covid-19 test", "q1.2.5": "Schengen Visa",
    "q1.3.1": "environmental", "q1.3.2": "CSI", "q1.3.3": "FTT", "q1.3.4": "Environmentally", "q1.3.5": "economic growth",
    "q1.4.1": "remuneration", "q1.4.2": "uniform allowances", "q1.4.3": "termination of service", "q1.4.4": "working hours", "q1.4.5": "core duties",
    "q1.5.1": "Do research on the countries to be visited", "q1.5.2": "Decide on the travel period", "q1.5.3": "Buy a flight ticket/Book accommodation", "q1.5.4": "Apply for a visa", "q1.5.5": "Buy foreign currency",

    // Section B (50 marks)
    "q2.1.1": "The WHO is working to contain the spread of the virus", "q2.1.2": "Google and Facebook", "q2.1.3": "TikTok has a huge, growing audience and is a popular app used by many",
    "q2.2.1": "B, C, D, F", "q2.2.2": "B - no more than 50 ml perfume, C - no more than 200 cigarettes", "q2.2.3": "Green channel",
    "q2.2.4a": "Refers to goods that travellers are not allowed, by law, to bring into a country", "q2.2.4b": "A",
    "q2.3.1": "16:00", "q2.3.2": "06:00", "q2.3.3": "15:00",
    "q2.4.1": "Jet Lag", "q2.4.2": "Getting adequate sleep and rest",
    "q3.1.1": "1185.54", "q3.1.2": "3249.90", "q3.2": "Unemployment leading to a rise in poverty",

    // Section C (50 marks)
    "q4.1.1a": "A – Niagara Falls, B – Venice, C – Sydney Opera House", "q4.1.1b": "A - North America, B - Europe, C - Australia",
    "q4.1.2": "Domestic tourists", "q4.1.3": "Icon B has visitor numbers for a whole city and icon C is for one attraction",
    "q4.2.1a": "Egypt", "q4.2.1b": "Africa", "q4.2.2": "The pyramids were built as tombs for the pharaohs", "q4.2.3": "lion",
    "q4.2.4a": "Vehicles that might damage the site are left at the visitor centre", "q4.2.4b": "Workers and vendors operating their businesses will be trained",
    "q4.2.5a": "There are ticket windows for Egyptian citizens and foreigners", "q4.2.5b": "Craftsmen and traders from the local community have stalls at the site",
    "q5.1": "KwaZulu Natal", "q5.2": "natural", "q5.3.1": "UNESCO", "q5.3.2": "The status of iSimangaliso Wetland Park as a World Heritage Site could be threatened", "q5.3.3": "More special interest tourists like anglers will come to fish", "q5.4": "Maloti-Drakensberg Park",
    "q6.1": "South African Tourism", "q6.2": "Partnerships with industry role-players unify the advertising efforts", "q6.3": "South Africa's brand logo", "q6.4": "TBCSA pays money collected from levy contributors quarterly to SATourism",

    // Section D (30 marks)
    "q7.1.1": "The way the business wants to be perceived by its customers", "q7.1.2": "Netiquette", "q7.1.3": "The customers will lose confidence and loyalty and take their business elsewhere",
    "q7.2.1": "He tarnished the image of the business with his adverse comments on social media", "q7.2.2": "YES - As an employee, I am co-responsible to protect the image of the business",
    "q8.1.1": "Social", "q8.1.2": "RAIN uses a portion of its profit to better the lives of people in communities",
    "q8.2.1": "Provide clean drinking water - Many schools in South Africa do not have running water", "q8.2.2": "Building hand washing stations is a more sustainable initiative",

    // Section E (30 marks)
    "q9.1.1": "diseases", "q9.1.2": "TBCSA had to ensure adherence to government's policies", "q9.1.3": "A health and safety officer must be appointed", "q9.1.4": "Compulsory screening for all guests would have been time consuming and costly",
    "q9.2": "This would ensure that people are neither the carriers nor the source of the spread of the virus",
    "q9.3.1": "Decline in all inbound tourists to South Africa", "q9.3.2": "A partnership between government and the tourism industry to address all aspects of the Recovery plan",
    "q10.1": "Eat Safe Certification Programme and Screening App", "q10.2": "Use of the screening app will reassure tourists that the places on the app will be safe"
};

const questionWeights = {
    // Section A (40 marks)
    "q1.1.1": 1, "q1.1.2": 1, "q1.1.3": 1, "q1.1.4": 1, "q1.1.5": 1,
    "q1.1.6": 1, "q1.1.7": 1, "q1.1.8": 1, "q1.1.9": 1, "q1.1.10": 1,
    "q1.1.11": 1, "q1.1.12": 1, "q1.1.13": 1, "q1.1.14": 1, "q1.1.15": 1,
    "q1.1.16": 1, "q1.1.17": 1, "q1.1.18": 1, "q1.1.19": 1, "q1.1.20": 1,
    "q1.2.1": 1, "q1.2.2": 1, "q1.2.3": 1, "q1.2.4": 1, "q1.2.5": 1,
    "q1.3.1": 1, "q1.3.2": 1, "q1.3.3": 1, "q1.3.4": 1, "q1.3.5": 1,
    "q1.4.1": 1, "q1.4.2": 1, "q1.4.3": 1, "q1.4.4": 1, "q1.4.5": 1,
    "q1.5.1": 1, "q1.5.2": 1, "q1.5.3": 1, "q1.5.4": 1, "q1.5.5": 1,

    // Section B (50 marks)
    "q2.1.1": 2, "q2.1.2": 4, "q2.1.3": 4,
    "q2.2.1": 4, "q2.2.2": 4, "q2.2.3": 2, "q2.2.4a": 2, "q2.2.4b": 2,
    "q2.3.1": 3, "q2.3.2": 4, "q2.3.3": 5,
    "q2.4.1": 2, "q2.4.2": 2,
    "q3.1.1": 3, "q3.1.2": 5,
    "q3.2": 2,

    // Section C (50 marks)
    "q4.1.1a": 3, "q4.1.1b": 3, "q4.1.2": 2, "q4.1.3": 2,
    "q4.2.1a": 1, "q4.2.1b": 1, "q4.2.2": 2, "q4.2.3": 2,
    "q4.2.4a": 4, "q4.2.4b": 4, "q4.2.5a": 2, "q4.2.5b": 2,
    "q5.1": 1, "q5.2": 1, "q5.3.1": 2, "q5.3.2": 2, "q5.3.3": 4, "q5.4": 2,
    "q6.1": 2, "q6.2": 4, "q6.3": 2, "q6.4": 2,

    // Section D (30 marks)
    "q7.1.1": 2, "q7.1.2": 2, "q7.1.3": 2,
    "q7.2.1": 2, "q7.2.2": 4,
    "q8.1.1": 2, "q8.1.2": 2,
    "q8.2.1": 6, "q8.2.2": 2,

    // Section E (30 marks)
    "q9.1.1": 2, "q9.1.2": 2, "q9.1.3": 4, "q9.1.4": 4,
    "q9.2": 4,
    "q9.3.1": 2, "q9.3.2": 8,
    "q10.1": 2, "q10.2": 2
};

function TourismNov2021() {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState({ achieved: 0, total: 0, percentage: 0 });
    const [progress, setProgress] = useState(0);

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const calculateProgress = () => {
        const totalQuestions = Object.keys(questionWeights).length;
        const answeredQuestions = Object.keys(answers).filter(key => answers[key] !== '').length;
        setProgress((answeredQuestions / totalQuestions) * 100);
    };

    const submitExam = () => {
        let totalMarks = 0;
        let achievedMarks = 0;

        Object.keys(questionWeights).forEach(question => {
            totalMarks += questionWeights[question];
            const userAnswer = answers[question] || '';

            if (userAnswer !== '') {
                let isCorrect = false;

                if (typeof correctAnswers[question] === 'number') {
                    isCorrect = parseFloat(userAnswer) === correctAnswers[question];
                } else {
                    isCorrect = userAnswer.toLowerCase().includes(correctAnswers[question].toLowerCase());
                }

                if (isCorrect) {
                    achievedMarks += questionWeights[question];
                }
            }
        });

        const percentage = totalMarks > 0 ? (achievedMarks / totalMarks) * 100 : 0;
        setScore({
            achieved: achievedMarks,
            total: totalMarks,
            percentage: percentage.toFixed(2)
        });
        setShowResults(true);
    };

    useEffect(() => {
        calculateProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [answers]);

    return (
        <div className="App">
            <Timer />
            <div className="container">
                <Header />
                <Instructions />

                {!showResults ? (
                    <>
                        <form id="exam-form">
                            <SectionA answers={answers} onAnswerChange={handleAnswerChange} />
                            <SectionB answers={answers} onAnswerChange={handleAnswerChange} />
                            <SectionC answers={answers} onAnswerChange={handleAnswerChange} />
                            <SectionD answers={answers} onAnswerChange={handleAnswerChange} />
                            <SectionE answers={answers} onAnswerChange={handleAnswerChange} />
                        </form>

                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${progress}%` }}></div>
                        </div>

                        <button type="button" className="submit-btn" onClick={submitExam}>
                            Submit Answers
                        </button>
                    </>
                ) : (
                    <Results score={score} answers={answers} correctAnswers={correctAnswers} questionWeights={questionWeights} />
                )}
            </div>
            <style jsx>
                {`
                    * {
                        box-sizing: border-box;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    body {
                        margin: 0;
                        padding: 20px;
                        background-color: #f0f4f8;
                        color: #333;
                        line-height: 1.6;
                    }
                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        background-color: white;
                        padding: 30px;
                        box-shadow: 0 0 20px rgba(0,0,0,0.1);
                        border-radius: 8px;
                        position: relative;
                    }
                    header {
                        text-align: center;
                        margin-bottom: 25px;
                        border-bottom: 3px solid #1a5276;
                        padding-bottom: 15px;
                    }
                    h1 {
                        color: #1a5276;
                        margin-bottom: 5px;
                        font-size: 28px;
                    }
                    h2 {
                        color: #2874a6;
                        border-bottom: 2px solid #aed6f1;
                        padding-bottom: 8px;
                    }
                    h3 {
                        color: #2e86c1;
                    }
                    .exam-info {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                        flex-wrap: wrap;
                        background-color: #eaf2f8;
                        padding: 15px;
                        border-radius: 5px;
                    }
                    .section {
                        margin-bottom: 40px;
                        padding-bottom: 25px;
                        border-bottom: 1px solid #d6eaf8;
                    }
                    .section-title {
                        background-color: #2874a6;
                        color: white;
                        padding: 12px 15px;
                        margin-bottom: 20px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                    }
                    .question {
                        margin-bottom: 25px;
                        padding: 18px;
                        background-color: #f8f9f9;
                        border-left: 5px solid #3498db;
                        border-radius: 0 5px 5px 0;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    .question-number {
                        font-weight: bold;
                        margin-bottom: 12px;
                        color: #2c3e50;
                        font-size: 18px;
                    }
                    .options {
                        margin-left: 20px;
                    }
                    .option {
                        margin-bottom: 8px;
                        padding: 5px;
                    }
                    input[type="text"], input[type="number"] {
                        padding: 8px 10px;
                        width: 250px;
                        margin: 5px 0;
                        border: 1px solid #bdc3c7;
                        border-radius: 4px;
                        font-size: 15px;
                    }
                    input[type="radio"] {
                        margin-right: 8px;
                    }
                    .submit-btn {
                        background-color: #2980b9;
                        color: white;
                        border: none;
                        padding: 12px 25px;
                        font-size: 18px;
                        cursor: pointer;
                        margin-top: 30px;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        border-radius: 5px;
                        transition: background-color 0.3s;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    }
                    .submit-btn:hover {
                        background-color: #2471a3;
                    }
                    .results {
                        margin-top: 40px;
                        padding: 25px;
                        background-color: #e8f6f3;
                        border-radius: 8px;
                        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                        border-left: 5px solid #27ae60;
                    }
                    .score {
                        font-size: 26px;
                        font-weight: bold;
                        text-align: center;
                        margin-bottom: 25px;
                        color: #2e86c1;
                    }
                    .correct {
                        color: #27ae60;
                        padding: 5px;
                        background-color: #eafaf1;
                        border-radius: 3px;
                        margin: 5px 0;
                    }
                    .incorrect {
                        color: #e74c3c;
                        padding: 5px;
                        background-color: #fdedec;
                        border-radius: 3px;
                        margin: 5px 0;
                    }
                    .feedback {
                        margin-top: 10px;
                        font-style: italic;
                        color: #7f8c8d;
                    }
                    .answer-input {
                        margin: 8px 0;
                    }
                    textarea {
                        width: 100%;
                        padding: 10px;
                        margin-top: 8px;
                        border: 1px solid #bdc3c7;
                        border-radius: 4px;
                        font-size: 15px;
                        min-height: 80px;
                    }
                    .instructions {
                        background-color: #fff9e6;
                        padding: 20px;
                        margin-bottom: 25px;
                        border-left: 5px solid #f39c12;
                        border-radius: 5px;
                    }
                    .time-guide {
                        margin-top: 20px;
                        border-collapse: collapse;
                        width: 100%;
                        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                    }
                    .time-guide th, .time-guide td {
                        border: 1px solid #ddd;
                        padding: 10px;
                        text-align: left;
                    }
                    .time-guide th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }
                    .image-container {
                        text-align: center;
                        margin: 20px 0;
                        padding: 15px;
                        background-color: #f8f9fa;
                        border-radius: 8px;
                        border: 1px solid #e9ecef;
                    }
                    .image-placeholder {
                        display: none;
                    }
                    .progress-bar {
                        height: 10px;
                        background-color: #ecf0f1;
                        border-radius: 5px;
                        margin: 20px 0;
                        overflow: hidden;
                    }
                    .progress {
                        height: 100%;
                        background-color: #2ecc71;
                        width: 0%;
                        transition: width 0.5s ease-in-out;
                    }
                    .mark-allocation {
                        font-size: 14px;
                        color: #7f8c8d;
                        font-style: italic;
                        margin-top: 5px;
                    }
                    .question-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .marks {
                        background-color: #3498db;
                        color: white;
                        padding: 3px 8px;
                        border-radius: 3px;
                        font-size: 14px;
                    }

                    /* Timer Styles */
                    .timer-container {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background-color: #1a5276;
                        color: white;
                        padding: 15px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                        z-index: 1000;
                        text-align: center;
                        min-width: 150px;
                        font-family: 'Courier New', monospace;
                    }
                    .timer-display {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .timer-label {
                        font-size: 14px;
                        opacity: 0.9;
                    }
                    .timer-warning {
                        background-color: #f39c12;
                    }
                    .timer-critical {
                        background-color: #e74c3c;
                        animation: pulse 1s infinite;
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }

                    @media (max-width: 768px) {
                        .container {
                            padding: 15px;
                        }
                        input[type="text"], input[type="number"] {
                            width: 100%;
                        }
                        .exam-info {
                            flex-direction: column;
                        }
                        .timer-container {
                            position: relative;
                            top: auto;
                            right: auto;
                            margin: 0 auto 20px auto;
                            width: 90%;
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default TourismNov2021;

