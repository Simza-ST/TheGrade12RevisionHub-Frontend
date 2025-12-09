import React, { useState, useEffect } from "react";
import myPhoto from "./myPhoto.png";
import q23 from "./q23.png";
import q32 from "./q32.png";
import q33 from "./q33.png";
import q42 from "./q42.png";
import q43 from "./q43.png";
import q52 from "./q52.png";

// Example keywords and max marks
const essayKeywords = {
    5: {
        intro: ["business cycle", "contraction", "expansion"],
        body: ["leading", "coincident", "lagging", "composite", "amplitude", "trend", "duration", "extrapolation", "moving averages"],
        additional: ["recession", "government", "households", "businesses", "foreign sector"],
        conclusion: ["summary", "economic growth", "policy"]
    },
    6: {
        intro: ["growth", "development", "policy"],
        body: ["RDP", "GEAR", "BEE", "EPWP", "ASGISA", "NSDS", "JIPSA", "SBDPP", "NGP", "NDP"],
        additional: ["deregulation", "tax", "education", "infrastructure", "subsidies"],
        conclusion: ["summary", "policy", "SA economy"]
    }
};

const maxEssayMarks = {
    intro: 2,
    body: 26,
    additional: 10,
    conclusion: 2
};

function EconomicsP1Nov2022Eng() {
    // States
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [showSolutions, setShowSolutions] = useState(false);
    const [popupId, setPopupId] = useState(null);
    const [percent, setPercent] = useState(null);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [timeLeft, setTimeLeft] = useState(2 * 60 * 60 + 30 * 60); // 2h 30min in seconds

    // Essay states
    const [questionChoice, setQuestionChoice] = useState("5");
    const [q5IntroText, setQ5IntroText] = useState("");
    const [q5BodyText, setQ5BodyText] = useState("");
    const [q5AdditionalText, setQ5AdditionalText] = useState("");
    const [q5ConclusionText, setQ5ConclusionText] = useState("");
    const [q6IntroText, setQ6IntroText] = useState("");
    const [q6BodyText, setQ6BodyText] = useState("");
    const [q6AdditionalText, setQ6AdditionalText] = useState("");
    const [q6ConclusionText, setQ6ConclusionText] = useState("");

    const [resultFeedback, setResultFeedback] = useState("");
    const [totalScore, setTotalScore] = useState(0);

    // Retry Exam: clears all state including answers and timer
    const retryExam = () => {
        setAnswers({});
        setScore(null);
        setPercent(0);
        setMessage("");
        setResultFeedback("");
        setShowResults(false);
        setShowSolutions(false);
        setTimeLeft(2 * 60 * 60 + 30 * 60); // reset timer
        window.scrollTo(0, 0);
    };

    // Exit exam: redirect or any custom logic
    const exitExam = () => {
        window.location.href = "/";
    };

    // Countdown timer logic
    useEffect(() => {
        if (timeLeft <= 0) {
            alert("Time is up! The exam has ended.");
            setShowResults(true); // show results or auto-submit
            exitExam(); // optional: exit automatically
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format time as hh:mm:ss
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2,"0")}:${mins.toString().padStart(2,"0")}:${secs.toString().padStart(2,"0")}`;
    };

    // === Essay checking function ===
    function checkEssay() {
        const q = questionChoice; // "5" or "6"

        // Read from React state
        const introText = (q === "5" ? q5IntroText : q6IntroText)?.toLowerCase() || "";
        const bodyText = (q === "5" ? q5BodyText : q6BodyText)?.toLowerCase() || "";
        const additionalText = (q === "5" ? q5AdditionalText : q6AdditionalText)?.toLowerCase() || "";
        const conclusionText = (q === "5" ? q5ConclusionText : q6ConclusionText)?.toLowerCase() || "";

        // Helper function to mark a section
        function checkKeywords(text, keywordList, maxMark, isBody = false) {
            if (!text.trim() || !keywordList || keywordList.length === 0) return { marks: 0, found: [] };

            const foundKeywords = keywordList.filter(keyword => text.includes(keyword.toLowerCase()));
            let marks = 0;

            if (isBody) {
                const keywordRatio = foundKeywords.length / keywordList.length;
                const wordCount = text.split(/\s+/).length;
                const wordsPerKeyword = foundKeywords.length > 0 ? wordCount / foundKeywords.length : wordCount;
                marks = wordsPerKeyword < 10 && foundKeywords.length > 0
                    ? Math.min(Math.round(keywordRatio * 8), 8)
                    : Math.round(keywordRatio * maxMark);
            } else if (maxMark === 10) {
                const keywordRatio = foundKeywords.length / keywordList.length;
                const wordCount = text.split(/\s+/).length;
                const wordsPerKeyword = foundKeywords.length > 0 ? wordCount / foundKeywords.length : wordCount;
                marks = wordsPerKeyword < 10 && foundKeywords.length > 0
                    ? Math.min(Math.round(keywordRatio * 2), 2)
                    : Math.round(keywordRatio * maxMark);
            } else {
                const keywordRatio = foundKeywords.length / keywordList.length;
                marks = Math.min(Math.round(keywordRatio * maxMark), maxMark);
            }

            return { marks, found: foundKeywords };
        }

        // === Mark each section ===
        const introResult = checkKeywords(introText, essayKeywords[q].intro, maxEssayMarks.intro);
        const bodyResult = checkKeywords(bodyText, essayKeywords[q].body, maxEssayMarks.body, true);
        const additionalResult = checkKeywords(additionalText, essayKeywords[q].additional, maxEssayMarks.additional);
        const conclusionResult = checkKeywords(conclusionText, essayKeywords[q].conclusion, maxEssayMarks.conclusion);

        const essayScore = Math.min(
            introResult.marks + bodyResult.marks + additionalResult.marks + conclusionResult.marks,
            40
        );

        // ===== FEEDBACK =====
        let feedbackHTML = `
            <h3>Essay Mark Breakdown for Question ${q}</h3>
            <p><strong>Introduction:</strong> ${introResult.marks}/2 (Keywords found: ${introResult.found.join(", ") || "None"})</p>
            <p><strong>Body:</strong> ${bodyResult.marks}/26 (Keywords found: ${bodyResult.found.join(", ") || "None"})</p>
            <p><strong>Additional Part:</strong> ${additionalResult.marks}/10 (Keywords found: ${additionalResult.found.join(", ") || "None"})</p>
            <p><strong>Conclusion:</strong> ${conclusionResult.marks}/2 (Keywords found: ${conclusionResult.found.join(", ") || "None"})</p>
            <p><strong>Total Essay Marks:</strong> ${essayScore}/40</p>
            <h4>Essay Analysis Notes:</h4>
        `;

        // Section-specific guidance
        if (q === "5") {
            feedbackHTML += `
                <p>For Question 5: The body should discuss features underpinning business cycle forecasting...</p>
                <p><strong>Missing body keywords:</strong> ${essayKeywords[5].body.filter(k => !bodyText.includes(k.toLowerCase())).join(", ")}</p>
                <p>Additional part should analyze recession challenges...</p>
                <p><strong>Missing additional keywords:</strong> ${essayKeywords[5].additional.filter(k => !additionalText.includes(k.toLowerCase())).join(", ")}</p>
            `;
        } else {
            feedbackHTML += `
                <p>For Question 6: The body should discuss South African growth and development policies...</p>
                <p><strong>Missing body keywords:</strong> ${essayKeywords[6].body.filter(k => !bodyText.includes(k.toLowerCase())).join(", ")}</p>
                <p>Additional part should discuss supply-side measures...</p>
                <p><strong>Missing additional keywords:</strong> ${essayKeywords[6].additional.filter(k => !additionalText.includes(k.toLowerCase())).join(", ")}</p>
            `;
        }

        feedbackHTML += `
            <p><strong>General Feedback:</strong></p>
            <p>- Marks are calculated based on keyword coverage.</p>
            <p>- Ensure all sections include detailed explanations, not just lists.</p>
            <p>- Introduction and conclusion should be concise and relevant.</p>
        `;

        return { score: essayScore, feedback: feedbackHTML };
    }
    // === PAPER 1: Multiple Choice, Matching, Definitions ===
    const correctMCQs = {
        q1: "D",
        q2: "C",
        q3: "A",
        q4: "B",
        q5: "C",
        q6: "D",
        q7: "A",
        q8: "B",
    };

    const matchingAnswers = {
        m1: "E",
        m2: "F",
        m3: "A",
        m4: "I",
        m5: "B",
        m6: "C",
        m7: "D",
        m8: "G",
    };

    const shortAnswers = {
        d1: ["GROSS NATIONAL PRODUCT", "GNP"],
        d2: ["PARETO", "ALLOCATIVE"],
        d3: ["TERMS OF TRADE"],
        d4: ["DUMPING"],
        d5: ["CORRIDOR"],
        d6: ["EMPLOYMENT RATE"],
    };

    // === PAPER 2: Economic Objectives & Related Questions ===
    const acceptedObjectives = [
        "ECONOMIC GROWTH",
        "FULL EMPLOYMENT",
        "PRICE STABILITY",
        "EXCHANGE RATE STABILITY",
        "BALANCE OF PAYMENTS EQUILIBRIUM",
        "ECONOMIC EQUITY",
        "EQUAL DISTRIBUTION OF INCOME",
        "EQUAL DISTRIBUTION OF INCOME AND WEALTH",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAnswers((prev) => ({ ...prev, [name]: value }));
    };

    // Function to open popup
    const showPopup = (id) => {
        setPopupId(id);
    };

    // Function to close popup
    const closePopup = () => {
        setPopupId(null);
    };

    const computePaper1Score = () => {
        let newScore = 0;
        const newFeedback = [];

        // MCQs (each 2)
        Object.keys(correctMCQs).forEach((q) => {
            const given = (answers[q] || "").toString().trim().toUpperCase();
            const correctVal = correctMCQs[q];
            if (given === correctVal) {
                newScore += 2;
                newFeedback.push({ id: q, text: "Correct", correct: true, mark: 2 });
            } else if (given.length > 0) {
                newFeedback.push({
                    id: q,
                    text: `Incorrect. Correct answer: ${correctVal}`,
                    correct: false,
                    mark: 0,
                    correctAnswer: correctVal,
                });
            } else {
                newFeedback.push({ id: q, text: "Not answered", correct: false, mark: 0, correctAnswer: correctVal });
            }
        });

        // Matching (each 1)
        Object.keys(matchingAnswers).forEach((m) => {
            const ans = (answers[m] || "").toString().trim().toUpperCase();
            const correctVal = matchingAnswers[m];
            if (ans === correctVal) {
                newScore += 1;
                newFeedback.push({ id: m, text: "Correct", correct: true, mark: 1 });
            } else if (ans.length > 0) {
                newFeedback.push({ id: m, text: `Incorrect. Correct: ${correctVal}`, correct: false, mark: 0, correctAnswer: correctVal });
            } else {
                newFeedback.push({ id: m, text: `Not answered. Correct: ${correctVal}`, correct: false, mark: 0, correctAnswer: correctVal });
            }
        });

        // Short answers (each 1) - check if any expected keyword appears
        Object.keys(shortAnswers).forEach((d) => {
            const ans = (answers[d] || "").toString().trim().toUpperCase();
            const keywords = shortAnswers[d];
            const isCorrect = keywords.some((kw) => ans.includes(kw));
            if (isCorrect) {
                newScore += 1;
                newFeedback.push({ id: d, text: "Correct", correct: true, mark: 1 });
            } else if (ans.length > 0) {
                newFeedback.push({ id: d, text: `Incorrect. Acceptable: ${keywords.join(" / ")}`, correct: false, mark: 0, correctAnswer: keywords.join(" / ") });
            } else {
                newFeedback.push({ id: d, text: `Not answered. Acceptable: ${keywords.join(" / ")}`, correct: false, mark: 0, correctAnswer: keywords.join(" / ") });
            }
        });

        return { score: newScore, feedback: newFeedback };
    };

    const computePaper2Score = () => {
        let total = 0;
        const newFeedback = [];

        // Q2.1.1 (2 marks)
        const obj1 = (answers.q211a || "").toString().trim().toUpperCase();
        const obj2 = (answers.q211b || "").toString().trim().toUpperCase();
        const correct1 = acceptedObjectives.includes(obj1);
        const correct2 = acceptedObjectives.includes(obj2);
        if (correct1 && correct2 && obj1 !== obj2) {
            total += 2;
            newFeedback.push({ id: "q211", text: "Both objectives correct", correct: true, mark: 2 });
        } else {
            newFeedback.push({ id: "q211", text: "Incorrect or duplicate objectives. Need two distinct valid objectives.", correct: false, mark: 0, correctAnswer: acceptedObjectives.join(", ") });
        }

        // Q2.1.2 (2 marks)
        const txt212 = (answers.q212 || "").toString().toUpperCase();
        const cond1 =
            txt212.includes("REDUCE") ||
            txt212.includes("LOWER") ||
            txt212.includes("PRICE PAID BY CONSUMERS");
        const cond2 =
            txt212.includes("GOVERNMENT") ||
            txt212.includes("NOT PAID BY CONSUMERS") ||
            txt212.includes("EXPENDITURE");
        if (cond1 || cond2) {
            total += 2;
            newFeedback.push({ id: "q212", text: "Explanation acceptable", correct: true, mark: 2 });
        } else if (txt212.length > 0) {
            newFeedback.push({ id: "q212", text: "Explanation not clear. Mention price reduction or government expenditure.", correct: false, mark: 0, correctAnswer: "Mention reduction in consumer price OR that subsidy is government expenditure" });
        } else {
            newFeedback.push({ id: "q212", text: "Not answered", correct: false, mark: 0 });
        }

        // Data response 2.2
        // Q2.2.1
        const q221 = (answers.q221 || "").toString().replace("%", "").trim();
        if (q221 === "26") {
            total += 1;
            newFeedback.push({ id: "q221", text: "✅ Correct", correct: true, mark: 1 });
        } else if (q221.length > 0) {
            newFeedback.push({ id: "q221", text: "❌ Incorrect — Correct Answer: 26%", correct: false, mark: 0, correctAnswer: "26%" });
        } else {
            newFeedback.push({ id: "q221", text: "Not answered", correct: false, mark: 0, correctAnswer: "26%" });
        }

        // Q2.2.2
        const q222 = (answers.q222 || "").toString().toUpperCase();
        if (q222.includes("PROGRESSIVE")) {
            total += 1;
            newFeedback.push({ id: "q222", text: "✅ Correct", correct: true, mark: 1 });
        } else if (q222.length > 0) {
            newFeedback.push({ id: "q222", text: "❌ Incorrect — Correct Answer: Progressive", correct: false, mark: 0, correctAnswer: "Progressive" });
        } else {
            newFeedback.push({ id: "q222", text: "Not answered", correct: false, mark: 0, correctAnswer: "Progressive" });
        }

        // Q2.2.3
        const q223 = (answers.q223 || "").toString().toUpperCase();
        if (q223.includes("TAX") || q223.includes("EXPENDITURE") || q223.includes("GOVERNMENT")) {
            total += 2;
            newFeedback.push({ id: "q223", text: "✅ Correct", correct: true, mark: 2 });
        } else if (q223.length > 0) {
            newFeedback.push({ id: "q223", text: "❌ Incorrect — Correct: Changes in taxation and government expenditure to influence economic activity", correct: false, mark: 0, correctAnswer: "Changes in taxation and government expenditure to influence activity" });
        } else {
            newFeedback.push({ id: "q223", text: "Not answered", correct: false, mark: 0 });
        }

        // Q2.2.4
        const q224 = (answers.q224 || "").toString().toUpperCase();
        if (q224.includes("DISCOURAGED") || q224.includes("EVAD") || q224.includes("DISPOSABLE INCOME") || q224.includes("DECREASE SPENDING")) {
            total += 2;
            newFeedback.push({ id: "q224", text: "✅ Correct", correct: true, mark: 2 });
        } else if (q224.length > 0) {
            newFeedback.push({ id: "q224", text: "❌ Incorrect — Correct: People discouraged, businesses close, tax evasion, disposable income decreases", correct: false, mark: 0, correctAnswer: "People discouraged, businesses close, tax evasion, reduction in disposable income" });
        } else {
            newFeedback.push({ id: "q224", text: "Not answered", correct: false, mark: 0 });
        }

        // Q2.2.5
        const q225 = (answers.q225 || "").toString().replace(/[R,\s]/g, "");
        if (q225 === "115239") {
            total += 4;
            newFeedback.push({ id: "q225", text: "✅ Correct (R115 239)", correct: true, mark: 4 });
        } else if (q225.length > 0) {
            newFeedback.push({ id: "q225", text: "❌ Incorrect — Correct Answer: R115 239", correct: false, mark: 0, correctAnswer: "R115 239" });
        } else {
            newFeedback.push({ id: "q225", text: "Not answered", correct: false, mark: 0, correctAnswer: "R115 239" });
        }

        // Q2.3.1
        if ((answers.q231 || "").toString().toUpperCase().includes("14.60")) {
            total += 1;
            newFeedback.push({ id: "q231", text: "✅ Correct", correct: true, mark: 1 });
        } else {
            newFeedback.push({ id: "q231", text: "Not answered or incorrect", correct: false, mark: 0, correctAnswer: "$1 = R14.60" });
        }

        // Q2.3.2
        if ((answers.q232 || "").toString().toUpperCase().includes("FLOATING") || (answers.q232 || "").toString().toUpperCase().includes("FLEXIBLE")) {
            total += 1;
            newFeedback.push({ id: "q232", text: "✅ Correct", correct: true, mark: 1 });
        } else {
            newFeedback.push({ id: "q232", text: "Not answered or incorrect", correct: false, mark: 0, correctAnswer: "Free floating / Flexible" });
        }

        // Q2.3.3
        if ((answers.q233 || "").toString().toUpperCase().includes("DECREASE") || (answers.q233 || "").toString().toUpperCase().includes("VALUE")) {
            total += 2;
            newFeedback.push({ id: "q233", text: "✅ Correct", correct: true, mark: 2 });
        } else {
            newFeedback.push({ id: "q233", text: "Not answered or incorrect", correct: false, mark: 0, correctAnswer: "Devaluation = deliberate decrease in currency value" });
        }

        // Q2.3.4
        if ((answers.q234 || "").toString().toUpperCase().includes("INCREASE") || (answers.q234 || "").toString().toUpperCase().includes("RESERVES")) {
            total += 2;
            newFeedback.push({ id: "q234", text: "✅ Correct", correct: true, mark: 2 });
        } else {
            newFeedback.push({ id: "q234", text: "Not answered or incorrect", correct: false, mark: 0, correctAnswer: "Surplus improves reserves, reduces borrowing, stimulates production" });
        }

        // Q2.3.5
        if ((answers.q235 || "").toString().toUpperCase().includes("DEMAND") && (answers.q235 || "").toString().toUpperCase().includes("RAND")) {
            total += 4;
            newFeedback.push({ id: "q235", text: "✅ Correct", correct: true, mark: 4 });
        } else {
            newFeedback.push({ id: "q235", text: "Not answered or incomplete", correct: false, mark: 0, correctAnswer: "Increase in demand for USD → rand depreciates" });
        }

        // Q2.4 (8)
        if ((answers.q24 || "").toString().length > 20) {
            total += 8;
            newFeedback.push({ id: "q24", text: "Answer present (awarded 8)", correct: true, mark: 8 });
        } else {
            newFeedback.push({ id: "q24", text: "Short or missing answer", correct: false, mark: 0 });
        }

        // Q2.5 (8)
        if ((answers.q25 || "").toString().length > 20) {
            total += 8;
            newFeedback.push({ id: "q25", text: "Answer present (awarded 8)", correct: true, mark: 8 });
        } else {
            newFeedback.push({ id: "q25", text: "Short or missing answer", correct: false, mark: 0 });
        }

        return { score: total, feedback: newFeedback };
    };

    const computePaper3Score = () => {
        let score3 = 0;
        const newFeedback = [];

        // Q3.1.1 (2)
        const ans311 = (answers.q311 || "").toString().toUpperCase();
        if (ans311.includes("UNION") || ans311.includes("MARKET") || ans311.includes("FREE TRADE") || ans311.includes("CUSTOMS")) {
            score3 += 2;
            newFeedback.push({ id: "q311", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans311.length > 0) {
            newFeedback.push({ id: "q311", text: "❌ Incorrect — Acceptable: Economic union, Common market, Free trade area, Customs union, Monetary union.", correct: false, mark: 0, correctAnswer: "Economic union / Common market / Free trade area / Customs union / Monetary union" });
        } else {
            newFeedback.push({ id: "q311", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.1.2 (2)
        const ans312 = (answers.q312 || "").toString().toUpperCase();
        if (ans312.includes("EMPLOYMENT") || ans312.includes("LIVING") || ans312.includes("SERVICE")) {
            score3 += 2;
            newFeedback.push({ id: "q312", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans312.length > 0) {
            newFeedback.push({ id: "q312", text: "❌ Incorrect — People migrate for better services, higher living standards, employment opportunities.", correct: false, mark: 0, correctAnswer: "Better services / higher standard of living / employment" });
        } else {
            newFeedback.push({ id: "q312", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.1 (1)
        const ans321 = (answers.q321 || "").toString().toUpperCase();
        if (ans321.includes("FREE TRADE")) {
            score3 += 1;
            newFeedback.push({ id: "q321", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans321.length > 0) {
            newFeedback.push({ id: "q321", text: "❌ Incorrect — Correct Answer: Free trade.", correct: false, mark: 0, correctAnswer: "Free trade" });
        } else {
            newFeedback.push({ id: "q321", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.2 (1)
        const ans322 = (answers.q322 || "").toString().toUpperCase();
        if (ans322.includes("WORLD TRADE ORGANISATION") || ans322.includes("WORLD TRADE ORGANIZATION")) {
            score3 += 1;
            newFeedback.push({ id: "q322", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans322.length > 0) {
            newFeedback.push({ id: "q322", text: "❌ Incorrect — Correct: World Trade Organisation.", correct: false, mark: 0, correctAnswer: "World Trade Organisation" });
        } else {
            newFeedback.push({ id: "q322", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.3 (2)
        const ans323 = (answers.q323 || "").toString().toUpperCase();
        if (ans323.includes("LOCALLY") || ans323.includes("REPLACE") || ans323.includes("IMPORTED")) {
            score3 += 2;
            newFeedback.push({ id: "q323", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans323.length > 0) {
            newFeedback.push({ id: "q323", text: "❌ Incorrect — Correct: Locally produced goods replace imports.", correct: false, mark: 0, correctAnswer: "Locally produced goods replace previously imported goods" });
        } else {
            newFeedback.push({ id: "q323", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.4 (2)
        const ans324 = (answers.q324 || "").toString().toUpperCase();
        if (ans324.includes("GROW") || ans324.includes("COMPETITION") || ans324.includes("FOREIGN")) {
            score3 += 2;
            newFeedback.push({ id: "q324", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans324.length > 0) {
            newFeedback.push({ id: "q324", text: "❌ Incorrect — Correct: Allow industries to grow and reduce unfair competition.", correct: false, mark: 0, correctAnswer: "Allow new industries to grow; reduce unfair foreign competition" });
        } else {
            newFeedback.push({ id: "q324", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.5 (4)
        const ans325 = (answers.q325 || "").toString().toUpperCase();
        if (ans325.includes("EXPORT") || ans325.includes("CHOICE") || ans325.includes("COMPETITION") || ans325.includes("SPECIALISATION")) {
            score3 += 4;
            newFeedback.push({ id: "q325", text: "✅ Correct (4)", correct: true, mark: 4 });
        } else if (ans325.length > 0) {
            newFeedback.push({ id: "q325", text: "❌ Incorrect — Correct: Free trade increases exports, choice, efficiency, etc.", correct: false, mark: 0, correctAnswer: "Exports, lower import costs, efficiency, consumer choice" });
        } else {
            newFeedback.push({ id: "q325", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.1 (1)
        const ans331 = (answers.q331 || "").toString().toUpperCase();
        if (ans331.includes("2020") && ans331.includes("Q2")) {
            score3 += 1;
            newFeedback.push({ id: "q331", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans331.length > 0) {
            newFeedback.push({ id: "q331", text: "❌ Incorrect — Correct: 2020-Q2", correct: false, mark: 0, correctAnswer: "2020-Q2" });
        } else {
            newFeedback.push({ id: "q331", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.2 (1)
        const ans332 = (answers.q332 || "").toString().toUpperCase();
        if (ans332.includes("SOUTH") || ans332.includes("STATISTICS") || ans332.includes("DTIC") || ans332.includes("SARB") || ans332.includes("TRADE")) {
            score3 += 1;
            newFeedback.push({ id: "q332", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans332.length > 0) {
            newFeedback.push({ id: "q332", text: "❌ Incorrect — Correct: SARB, Stats SA, or DTIC", correct: false, mark: 0, correctAnswer: "SARB / Stats SA / DTIC" });
        } else {
            newFeedback.push({ id: "q332", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.3 (2)
        const ans333 = (answers.q333 || "").toString().toUpperCase();
        if (ans333.includes("WELL-BEING") || ans333.includes("DATA") || ans333.includes("MONITOR")) {
            score3 += 2;
            newFeedback.push({ id: "q333", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans333.length > 0) {
            newFeedback.push({ id: "q333", text: "❌ Incorrect — Correct: Statistical data used to monitor well-being", correct: false, mark: 0, correctAnswer: "Statistical data to monitor community well-being" });
        } else {
            newFeedback.push({ id: "q333", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.4 (2)
        const ans334 = (answers.q334 || "").toString().toUpperCase();
        if (ans334.includes("OUTPUT") || ans334.includes("COST") || ans334.includes("COMPETITIVE") || ans334.includes("EXPORT")) {
            score3 += 2;
            newFeedback.push({ id: "q334", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans334.length > 0) {
            newFeedback.push({ id: "q334", text: "❌ Incorrect — Correct: More output, lower costs, competitive prices", correct: false, mark: 0, correctAnswer: "More output, lower costs, competitive prices" });
        } else {
            newFeedback.push({ id: "q334", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.5 (4)
        const ans335 = (answers.q335 || "").toString().toUpperCase();
        if (ans335.includes("EDUCATION") || ans335.includes("TRAINING") || ans335.includes("HEALTH") || ans335.includes("TAX") || ans335.includes("TRANSPORT")) {
            score3 += 4;
            newFeedback.push({ id: "q335", text: "✅ Correct (4)", correct: true, mark: 4 });
        } else if (ans335.length > 0) {
            newFeedback.push({ id: "q335", text: "❌ Incorrect — Correct: Education, training, healthcare, incentives, transport", correct: false, mark: 0, correctAnswer: "Education / training / health / incentives / transport" });
        } else {
            newFeedback.push({ id: "q335", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.4 (8)
        const ans34 = (answers.q34 || "").toString().toUpperCase();
        if (ans34.includes("SUBSIDY") || ans34.includes("INCENTIVE") || ans34.includes("EXPORT") || ans34.includes("CASH") || ans34.includes("REBATE") || ans34.includes("TRANSPORT") || ans34.includes("CREDIT")) {
            score3 += 8;
            newFeedback.push({ id: "q34", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans34.length > 0) {
            newFeedback.push({ id: "q34", text: "❌ Incorrect — Correct: Subsidies & incentives details", correct: false, mark: 0, correctAnswer: "Subsidies: cash, rebate; Incentives: training, info, concessions" });
        } else {
            newFeedback.push({ id: "q34", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.5 (8)
        const ans35 = (answers.q35 || "").toString().toUpperCase();
        if (ans35.includes("SEZ") || ans35.includes("SDI") || ans35.includes("COMPETITION") || ans35.includes("TRAINING") || ans35.includes("POVERTY") || ans35.includes("SMME") || ans35.includes("CORRUPTION")) {
            score3 += 8;
            newFeedback.push({ id: "q35", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans35.length > 0) {
            newFeedback.push({ id: "q35", text: "❌ Incorrect — Correct: SEZ, SDI, integration, training, infrastructure issues", correct: false, mark: 0, correctAnswer: "SEZ/SDI/training/infrastructure etc." });
        } else {
            newFeedback.push({ id: "q35", text: "Not answered", correct: false, mark: 0 });
        }

        return { score: score3, feedback: newFeedback };
    };

    const computePaper4Score = () => {
        let s4 = 0;
        const newFeedback = [];

        // Q4.1.1 (2)
        const ans411 = (answers.q411 || "").toString().toUpperCase();
        if (ans411.includes("SPECIALISATION") || ans411.includes("MASS PRODUCTION") || ans411.includes("GLOBALISATION") || ans411.includes("EFFICIENCY") || ans411.includes("DUMPING")) {
            s4 += 2;
            newFeedback.push({ id: "q411", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans411.length > 0) {
            newFeedback.push({ id: "q411", text: "❌ Incorrect — Acceptable: Specialisation, Mass production, Globalisation, Efficiency, Dumping", correct: false, mark: 0, correctAnswer: "Specialisation / mass production / globalisation / efficiency / dumping" });
        } else {
            newFeedback.push({ id: "q411", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.1.2 (2)
        const ans412 = (answers.q412 || "").toString().toUpperCase();
        if (ans412.includes("OWN") || ans412.includes("CONTROL") || ans412.includes("SKILL") || ans412.includes("ENTERPRISE")) {
            s4 += 2;
            newFeedback.push({ id: "q412", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans412.length > 0) {
            newFeedback.push({ id: "q412", text: "❌ Incorrect — Correct: Ownership & control, skills & enterprise development", correct: false, mark: 0, correctAnswer: "Ownership & control, skills development, enterprise development" });
        } else {
            newFeedback.push({ id: "q412", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.1 (1) mps = 0.2
        const ans421 = (answers.q421 || "").toString().trim();
        if (ans421 === "0.2" || ans421 === "0,2") {
            s4 += 1;
            newFeedback.push({ id: "q421", text: "✅ Correct (1) — 0.2", correct: true, mark: 1 });
        } else if (ans421.length > 0) {
            newFeedback.push({ id: "q421", text: "❌ Incorrect — Correct: 0.2", correct: false, mark: 0, correctAnswer: "0.2" });
        } else {
            newFeedback.push({ id: "q421", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.2 (1) leakage foreign sector = imports
        const ans422 = (answers.q422 || "").toString().toUpperCase();
        if (ans422.includes("IMPORT")) {
            s4 += 1;
            newFeedback.push({ id: "q422", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans422.length > 0) {
            newFeedback.push({ id: "q422", text: "❌ Incorrect — Correct: Imports/payments for imports", correct: false, mark: 0, correctAnswer: "Imports" });
        } else {
            newFeedback.push({ id: "q422", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.3 (2) autonomous consumption
        const ans423 = (answers.q423 || "").toString().toUpperCase();
        if (ans423.includes("INDEPENDENT") || ans423.includes("INCOME")) {
            s4 += 2;
            newFeedback.push({ id: "q423", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans423.length > 0) {
            newFeedback.push({ id: "q423", text: "❌ Incorrect — Correct: Spending independent of income", correct: false, mark: 0, correctAnswer: "Spending independent of income" });
        } else {
            newFeedback.push({ id: "q423", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.4 (2) importance of savings
        const ans424 = (answers.q424 || "").toString().toUpperCase();
        if (ans424.includes("INVEST") || ans424.includes("LOAN") || ans424.includes("INFLATION") || ans424.includes("SECURITY")) {
            s4 += 2;
            newFeedback.push({ id: "q424", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans424.length > 0) {
            newFeedback.push({ id: "q424", text: "❌ Incorrect — Correct: loanable funds, controls inflation, financial security", correct: false, mark: 0, correctAnswer: "Provides loanable funds, helps control inflation, provides security" });
        } else {
            newFeedback.push({ id: "q424", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.5 (4) multiplier K=5 if mpc=0.8
        const ans425 = (answers.q425 || "").toString().toUpperCase();
        // Accept if they included 5 and the working 1/(1-0.8)=5
        if (ans425.includes("1/(1-0.8)") || (ans425.includes("5") && ans425.includes("0.8"))) {
            s4 += 4;
            newFeedback.push({ id: "q425", text: "✅ Correct (4) — K = 5", correct: true, mark: 4 });
        } else if (ans425.length > 0) {
            newFeedback.push({ id: "q425", text: "❌ Incorrect — Correct: K = 1/(1-MPC) = 1/(1-0.8) = 5", correct: false, mark: 0, correctAnswer: "K = 5" });
        } else {
            newFeedback.push({ id: "q425", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.1 (1) policy = NIPF
        const ans431 = (answers.q431 || "").toString().toUpperCase();
        if (ans431.includes("NIPF")) {
            s4 += 1;
            newFeedback.push({ id: "q431", text: "✅ Correct (1) — NIPF", correct: true, mark: 1 });
        } else if (ans431.length > 0) {
            newFeedback.push({ id: "q431", text: "❌ Incorrect — Correct: National Industrial Policy Framework (NIPF)", correct: false, mark: 0, correctAnswer: "NIPF" });
        } else {
            newFeedback.push({ id: "q431", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.2 (1) other incentive examples
        const ans432 = (answers.q432 || "").toString().toUpperCase();
        if (ans432.includes("SBSP") || ans432.includes("STP") || ans432.includes("SSP") || ans432.includes("FIG") || ans432.includes("SIP") || ans432.includes("CUSTOM")) {
            s4 += 1;
            newFeedback.push({ id: "q432", text: "✅ Correct (1) — incentive example", correct: true, mark: 1 });
        } else if (ans432.length > 0) {
            newFeedback.push({ id: "q432", text: "❌ Incorrect — Examples: SBSP, STP, SSP, FIG, SIP", correct: false, mark: 0, correctAnswer: "SBSP / STP / SSP / FIG / SIP" });
        } else {
            newFeedback.push({ id: "q432", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.3 (2) SEZs
        const ans433 = (answers.q433 || "").toString().toUpperCase();
        if (ans433.includes("AREA") || ans433.includes("ECONOMIC") || ans433.includes("ACTIVITIES")) {
            s4 += 2;
            newFeedback.push({ id: "q433", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans433.length > 0) {
            newFeedback.push({ id: "q433", text: "❌ Incorrect — Correct: Geographically designated area for targeted economic activities", correct: false, mark: 0, correctAnswer: "Geographically designated area for targeted economic activities" });
        } else {
            newFeedback.push({ id: "q433", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.4 (2) oil prices -> higher costs, lower profits, discourage investment
        const ans434 = (answers.q434 || "").toString().toUpperCase();
        if (ans434.includes("COST") || ans434.includes("PROFIT") || ans434.includes("INVEST") || ans434.includes("CLOSE")) {
            s4 += 2;
            newFeedback.push({ id: "q434", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans434.length > 0) {
            newFeedback.push({ id: "q434", text: "❌ Incorrect — Correct: Higher costs, lower profits, discourage investment", correct: false, mark: 0, correctAnswer: "Higher costs -> lower profits -> discourage investment" });
        } else {
            newFeedback.push({ id: "q434", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.5 (4) infrastructure importance
        const ans435 = (answers.q435 || "").toString().toUpperCase();
        if (ans435.includes("INVEST") || ans435.includes("LIVELIHOOD") || ans435.includes("JOBS") || ans435.includes("LIVING") || ans435.includes("CULTURE") || ans435.includes("URBAN")) {
            s4 += 4;
            newFeedback.push({ id: "q435", text: "✅ Correct (4)", correct: true, mark: 4 });
        } else if (ans435.length > 0) {
            newFeedback.push({ id: "q435", text: "❌ Incorrect — Correct: Attracts investment, jobs, better living standards", correct: false, mark: 0, correctAnswer: "Attracts investment, jobs, better living standards, reduce overcrowding" });
        } else {
            newFeedback.push({ id: "q435", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.4 (8) population growth & life expectancy
        const ans44 = (answers.q44 || "").toString().toUpperCase();
        if (((ans44.includes("POPULATION") || ans44.includes("INCREASE") || ans44.includes("SERVICES") || ans44.includes("TAX")) &&
            (ans44.includes("YEARS") || ans44.includes("INFANT") || ans44.includes("EXPECT") || ans44.includes("INSURANCE") || ans44.includes("SERVICES")))) {
            s4 += 8;
            newFeedback.push({ id: "q44", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans44.length > 0) {
            newFeedback.push({ id: "q44", text: "❌ Incorrect — Correct: Population growth helps planning, tax base; life expectancy helps planning services and insurance", correct: false, mark: 0, correctAnswer: "Population growth & life expectancy: planning, tax base, service needs" });
        } else {
            newFeedback.push({ id: "q44", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.5 (8) reduce imports
        const ans45 = (answers.q45 || "").toString().toUpperCase();
        if (ans45.includes("TARIFF") || ans45.includes("DUTY") || ans45.includes("TAX") || ans45.includes("QUOTA") || ans45.includes("EMBARGO") || ans45.includes("FOREIGN EXCHANGE") || ans45.includes("INTEREST") || ans45.includes("IMPORT SUBSTITUTION") || ans45.includes("SUPPLY") || ans45.includes("DEVALU")) {
            s4 += 8;
            newFeedback.push({ id: "q45", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans45.length > 0) {
            newFeedback.push({ id: "q45", text: "❌ Incorrect — Correct: Tariffs, quotas, forex restriction, encourage local production, devalue", correct: false, mark: 0, correctAnswer: "Tariffs / quotas / forex restriction / local production / devalue" });
        } else {
            newFeedback.push({ id: "q45", text: "Not answered", correct: false, mark: 0 });
        }

        return { score: s4, feedback: newFeedback };
    };

    const checkQuiz = () => {
        const result = computePaper1Score();
        setScore(result.score);        // set only Paper 1 score
        setFeedback(result.feedback);
        setShowSolutions(true);
    };

    const checkAnswers = () => {
        const result = computePaper2Score();
        setScore(result.score);        // set only Paper 2 score
        setFeedback(result.feedback);
        setShowSolutions(true);
    };

// === Master grading function: Q1 + Q2 + Q3 + Q4 => total out of 110 ===
    const gradeAll = () => {
        // === QUIZ MARKING (Your original 4 papers) ===
        const p1 = computePaper1Score();
        const p2 = computePaper2Score();
        const p3 = computePaper3Score();
        const p4 = computePaper4Score();

        const quizScore = p1.score + p2.score + p3.score + p4.score;
        const quizFeedback = [
            ...p1.feedback,
            ...p2.feedback,
            ...p3.feedback,
            ...p4.feedback
        ];

        // === ESSAY MARKING (from your checkEssay) ===
        const essayResult = checkEssay();   // <-- uses essayKeywords, etc.
        const essayScore = essayResult.score;
        const essayFeedback = essayResult.feedback;

        // === TOTAL MARKS ===
        const maxQuizMarks = 110;
        const maxEssayMarks = 40;
        const totalMax = maxQuizMarks + maxEssayMarks;  // 150

        const total = quizScore + essayScore;

        // === 🔥 PUT YOUR FEEDBACK HERE 🔥 ===
        setResultFeedback(`
        <h2>Final Results</h2>
        <p><strong>Quiz Score:</strong> ${quizScore}/${maxQuizMarks}</p>
        <p><strong>Essay Score:</strong> ${essayScore}/${maxEssayMarks}</p>
        <p><strong>Total Score:</strong> ${total}/${totalMax} (${((total / totalMax) * 100).toFixed(2)}%)</p>
        ${essayResult.feedback}
    `);

        const percentValue = (total / totalMax) * 100;
        const calculatedPercent = percentValue.toFixed(2);

        // === UPDATE STATES ===
        setScore(total);
        setFeedback([...quizFeedback, essayFeedback]);   // combine quiz + essay
        setPercent(calculatedPercent);
        setShowSolutions(true);
        setShowResults(true);

        // === Result Message ===
        if (percentValue >= 80) {
            setMessage("Excellent!");
            setMessageColor("green");
        } else if (percentValue >= 50) {
            setMessage("Good work! Keep it up!");
            setMessageColor("orange");
        } else {
            setMessage("Keep practicing! You'll improve!");
            setMessageColor("red");
        }

        return {
            score: total,
            quizScore,
            essayScore,
            feedback: [...quizFeedback, essayFeedback],
            percent: calculatedPercent
        };
    };


    return (
        <div className="container">
            <h2>Economics / P1 - Section A (Compulsory)</h2>

            <div className="header-row">
                <div className="p2">QUESTION 1</div>
                <div className="p1">30 MARKS – 20 MINUTES</div>
            </div>
            {/* Timer Display */}
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                Time Remaining: {formatTime(timeLeft)}
            </h2>
            <form id="examForm" onSubmit={(e) => e.preventDefault()}>

                {/* Question 1.1.1 */}
                <div className="question">
                    <p>
                        1.1.1<span style={{marginLeft: "30px"}}></span>
                        Products that consumers can use repeatedly to satisfy their needs
                        for many years are called … <br/>
                        <span style={{marginLeft: "68px"}}></span>goods.
                    </p>
                    <div className="options" style={{marginLeft: "63px"}}>
                        <label><input type="radio" name="q1" value="A" onChange={handleChange}/> A. semi-durable</label>
                        <label><input type="radio" name="q1" value="B" onChange={handleChange}/> B. non-durable</label>
                        <label><input type="radio" name="q1" value="C" onChange={handleChange}/> C. perishable</label>
                        <label><input type="radio" name="q1" value="D" onChange={handleChange}/> D. durable</label>
                    </div>
                </div>

                {/* Question 1.1.2 */}
                <div className="question">
                    <p>
                        1.1.2<span style={{marginLeft: "30px"}}></span>
                        The buying and selling of government securities to control the
                        money supply is known as …
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q2" value="A" onChange={handleChange}/> A. moral
                            suasion</label>
                        <label><input type="radio" name="q2" value="B" onChange={handleChange}/> B. cash reserve
                            requirements</label>
                        <label><input type="radio" name="q2" value="C" onChange={handleChange}/> C. open-market
                            transactions</label>
                        <label><input type="radio" name="q2" value="D" onChange={handleChange}/> D. interest rate
                            changes</label>
                    </div>
                </div>

                {/* Question 1.1.3 */}
                <div className="question">
                    <p>
                        1.1.3<span style={{marginLeft: "30px"}}></span>
                        Public goods that are non-excludable and non-rival in consumption
                        are called … goods.
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q3" value="A" onChange={handleChange}/> A. community</label>
                        <label><input type="radio" name="q3" value="B" onChange={handleChange}/> B. collective</label>
                        <label><input type="radio" name="q3" value="C" onChange={handleChange}/> C. demerit</label>
                        <label><input type="radio" name="q3" value="D" onChange={handleChange}/> D. merit</label>
                    </div>
                </div>

                {/* Question 1.1.4 */}
                <div className="question">
                    <p>
                        1.1.4<span style={{marginLeft: "30px"}}></span>
                        The balance of payments account that records transactions related
                        to exports and imports of goods <br/>
                        <span style={{marginLeft: "68px"}}></span>and services is known as the …
                        Account.
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q4" value="A" onChange={handleChange}/> A. Financial</label>
                        <label><input type="radio" name="q4" value="B" onChange={handleChange}/> B. Current</label>
                        <label><input type="radio" name="q4" value="C" onChange={handleChange}/> C. Capital
                            Transfer</label>
                        <label><input type="radio" name="q4" value="D" onChange={handleChange}/> D. Reserve</label>
                    </div>
                </div>

                {/* Question 1.1.5 */}
                <div className="question">
                    <p>
                        1.1.5<span style={{marginLeft: "30px"}}></span>
                        A trade protocol meant to improve trade relationships between the
                        United States of America and<br/>
                        <span style={{marginLeft: "66px"}}></span> Africa is called the …
                    </p>
                    <div className="options" style={{marginLeft: "60px"}}>
                        <label><input type="radio" name="q5" value="A" onChange={handleChange}/> A. European
                            Union</label>
                        <label><input type="radio" name="q5" value="B" onChange={handleChange}/> B. Southern African
                            Customs Union</label>
                        <label><input type="radio" name="q5" value="C" onChange={handleChange}/> C. African Growth and
                            Opportunity Act</label>
                        <label><input type="radio" name="q5" value="D" onChange={handleChange}/> D. Multilateral
                            Monetary Area</label>
                    </div>
                </div>

                {/* Question 1.1.6 */}
                <div className="question">
                    <p>
                        1.1.6<span style={{marginLeft: "30px"}}></span>
                        A redress measure that aims to compensate citizens who lost their
                        land due to discriminatory laws <br/>
                        <span style={{marginLeft: "66px"}}></span>of the past is known as …
                    </p>
                    <div className="options" style={{marginLeft: "60px"}}>
                        <label><input type="radio" name="q6" value="A" onChange={handleChange}/> A. land redistribution</label>
                        <label><input type="radio" name="q6" value="B" onChange={handleChange}/> B. property
                            subsidy</label>
                        <label><input type="radio" name="q6" value="C" onChange={handleChange}/> C. land reform</label>
                        <label><input type="radio" name="q6" value="D" onChange={handleChange}/> D. land
                            restitution</label>
                    </div>
                </div>

                {/* Question 1.1.7 */}
                <div className="question">
                    <p>
                        1.1.7<span style={{marginLeft: "30px"}}></span>
                        The Platinum Spatial Development Initiative (SDI) focuses on …
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q7" value="A" onChange={handleChange}/> A. mining and
                            agritourism</label>
                        <label><input type="radio" name="q7" value="B" onChange={handleChange}/> B. forestry and
                            agri-processing</label>
                        <label><input type="radio" name="q7" value="C" onChange={handleChange}/> C. information,
                            technology and telecommunications</label>
                        <label><input type="radio" name="q7" value="D" onChange={handleChange}/> D. transport and
                            tourism</label>
                    </div>
                </div>

                {/* Question 1.1.8 */}
                <div className="question">
                    <p>
                        1.1.8<span style={{marginLeft: "30px"}}></span>
                        An indicator that measures the number of children who die before
                        the age of one year is called …
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q8" value="A" onChange={handleChange}/> A. spending on
                            health</label>
                        <label><input type="radio" name="q8" value="B" onChange={handleChange}/> B. infant mortality
                            rate</label>
                        <label><input type="radio" name="q8" value="C" onChange={handleChange}/> C. under-five mortality
                            rate</label>
                        <label><input type="radio" name="q8" value="D" onChange={handleChange}/> D. access to sanitation</label>
                    </div>
                </div>

                {/* --- Matching 1.2 --- */}
                <div className="question">
                    <p>
                        1.2<span style={{marginLeft: "39px"}}></span> Choose a description from COLUMN B that
                        matches the item in COLUMN A.
                        Write only the letter <br/>
                        <span style={{marginLeft: "65px"}}></span>(A–I) next to the question numbers (1.2.1 to
                        1.2.8) in the ANSWER BOOK, e.g. 1.2.9 J.
                    </p>

                    <table>
                        <thead>
                        <tr>
                            <th>COLUMN A</th>
                            <th>COLUMN B</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1.2.1 Money flow</td>
                            <td>A a document that sets out the government’s expected expenditure and income over a
                                three-year period
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.2 Keynesian approach</td>
                            <td>B production of a wide range of goods and services</td>
                        </tr>
                        <tr>
                            <td>1.2.3 Medium-term Expenditure Framework</td>
                            <td>C refers to the world’s developed countries and developing countries</td>
                        </tr>
                        <tr>
                            <td>1.2.4 Unrecorded transactions</td>
                            <td>D focuses on using science and technology to promote and expand industrialisation
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.5 Diversification</td>
                            <td>E income and expenditure between the participants in the economy</td>
                        </tr>
                        <tr>
                            <td>1.2.6 North-South divide</td>
                            <td>F maintains that markets are inherently unstable and economic fluctuations are
                                caused by internal factors
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.7 National Research and Development Strategy</td>
                            <td>G the price paid by commercial banks for borrowing money from the South African
                                Reserve Bank
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.8 Repo rate</td>
                            <td>H maintains that markets are inherently stable and economic fluctuations are caused
                                by external factors
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>I an item in the balance of payments that caters for any omissions and errors</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="footer-note">(8 × 1) (8)</div>
                    <div className="footer">
                        <div className="footer-left">Copyright reserved</div>
                        <div className="footer-right">Please turn over</div>
                    </div>
                </div>

                <div className="question">
                    <table>
                        <tbody>
                        {Array.from({length: 8}).map((_, idx) => {
                            const name = `m${idx + 1}`;
                            return (
                                <tr key={name}>
                                    <td>{`1.2.${idx + 1}`}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name={name}
                                            maxLength="1"
                                            value={answers[name] || ""}
                                            onChange={handleChange}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                {/* --- Short Answers 1.3 --- */}
                <div className="question">
                    <p>
                        1.3 <span style={{marginLeft: "35px"}}>
            Give ONE term for each of the following descriptions. Write only the term next
        </span>
                        to the question <br/>
                        <span style={{marginLeft: "63px"}}></span>numbers (1.3.1 to 1.3.6) in the ANSWER BOOK.
                        Abbreviations, acronyms and examples will NOT <br/>
                        <span style={{marginLeft: "63px"}}></span>be accepted.
                    </p>

                    {/* Questions array */}
                    {[
                        "The total market value of all final goods and services produced by permanent citizens of a country within a specific period",
                        "When resources are allocated in such a way that no one can be made better off without making someone else worse off",
                        "Compares a country's export prices with its import prices by means of indexes",
                        "Selling goods in a foreign market at prices that are below the cost of production in the country of origin",
                        "A tract of land that forms a passageway which allows access from one area to another to promote regional development",
                        "The number of employed persons expressed as a percentage of the economically active population"
                    ].map((questionText, idx) => {
                        const name = `d${idx + 1}`;
                        return (
                            <p key={name}>
                                <span style={{marginLeft: "60px"}}>{`1.3.${idx + 1}`}</span>
                                <span style={{marginLeft: "10px"}}>{questionText}</span>
                                <br/>
                                <span style={{marginLeft: "140px"}}>
                                <input
                                    type="text"
                                    name={name}
                                    value={answers[name] || ""}
                                    onChange={handleChange}
                                />
                                </span>
                            </p>
                        );
                    })}

                    <div className="footer-note">(6 × 1) (6)</div>
                    <div className="footer">
                        <div className="footer-right">
                            <b>TOTAL SECTION A:<span style={{marginLeft: "39px"}}>30</span></b>
                        </div>
                    </div>
                </div>

                <div className="header-row">
                    <div className="p2">QUESTION 2: MACROECONOMICS</div>
                    <div className="p1">40 MARKS – 30 MINUTES</div>
                </div>

                <div className="question">
                    <p>2.1 Answer the following questions.</p>

                    {/* 2.1.1 */}
                    <p>
                        2.1.1 Name any TWO macroeconomic objectives of the public sector.
                        <span className="mark">(2 × 1) (2)</span>
                    </p>
                    <input
                        type="text"
                        name="q211a"
                        placeholder="Answer 1"
                        value={answers.q211a || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    <br/>
                    <input
                        type="text"
                        name="q211b"
                        placeholder="Answer 2"
                        value={answers.q211b || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup211")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    {/* 2.1.2 */}
                    <p>
                        2.1.2 Why are subsidies on products subtracted when converting GDP at basic prices to GDP at
                        market prices?{" "}
                        <span className="mark">(1 × 2) (2)</span>
                    </p>
                    <textarea
                        name="q212"
                        rows="3"
                        placeholder="Type your answer here..."
                        value={answers.q212 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup212")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    {/* 2.2 */}
                    <p>2.2 Study the table below and answer the questions that follow.</p>
                    <div className="image-container">
                        <img src={myPhoto} alt="Example" className="center-image"/>
                    </div>

                    <p>2.2.1 Identify the marginal tax rate for income between R216 201 and R337 800 per year. (1)</p>
                    <input
                        type="text"
                        name="q221"
                        placeholder="Enter % here"
                        value={answers.q221 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup221")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>2.2.2 Name the income tax system represented by the table above. (1)</p>
                    <input
                        type="text"
                        name="q222"
                        placeholder="Answer here"
                        value={answers.q222 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup222")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>2.2.3 Briefly describe the term fiscal policy. (2)</p>
                    <textarea
                        name="q223"
                        placeholder="Type your explanation here..."
                        value={answers.q223 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 80}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup223")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>2.2.4 Explain the effect of high tax rates on taxpayers in a country(2)</p>
                    <textarea
                        name="q224"
                        placeholder="Type your explanation here..."
                        value={answers.q224 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup224")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>2.2.5 Use the information in the table above to calculate the income tax
                        payable if one receives an annual <br/>
                        <span style={{marginLeft: "40px"}}></span>income of R480 000.(4)</p>
                    <input
                        name="q225"
                        placeholder="Enter amount eg..,R115 239"
                        value={answers.q225 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup225")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                    <p>2.3 Study the graph below and answer the questions that follow.</p>
                    <div className="image-container">
                        <img src={q23} alt="Example" className="center-image"/>
                    </div>
                    <p>2.3.1 Identify the original exchange rate in the graph above(1)</p>
                    <textarea
                        name="q231"
                        placeholder="Type your explanation here..."
                        value={answers.q231 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup231")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                    <p>2.3.2 Name the exchange rate system used in South Africa.(1)</p>
                    <textarea
                        name="q232"
                        placeholder="Type your explanation here..."
                        value={answers.q232 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 40}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup232")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                    <p>2.3.3 Briefly describe the term devaluation(2)</p>
                    <textarea
                        name="q233"
                        placeholder="Type your explanation here..."
                        value={answers.q233 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 60}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup233")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                    <p>2.3.4 What is the benefit of a surplus on the current account of the
                        balance of payments? (2)</p>
                    <textarea
                        name="q234"
                        placeholder="Type your explanation here..."
                        value={answers.q234 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 80}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup234")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                    <p>2.3.5 With reference to the graph above, explain the effect of the
                        increase in the demand for US dollar on the <br/>
                        <span style={{marginLeft: "40px"}}></span>value of the rand.(4)</p>
                    <textarea
                        name="q235"
                        placeholder="Type your explanation here..."
                        value={answers.q235 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 80}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup235")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                    <p>2.4 Explain the interrelationship between households and businesses in the
                        circular-flow model.(4 x 2) (8)</p>
                    <textarea
                        name="q24"
                        placeholder="Type your explanation here..."
                        value={answers.q24 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 120}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup24")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                    <p>2.5 Analyse the problems faced by the South African government in providing
                        public goods and services.(4 x 2 ) (8)</p>
                    <textarea
                        name="q25"
                        placeholder="Type your explanation here..."
                        value={answers.q25 || ""}
                        onChange={handleChange}
                        style={{marginLeft: 100, width: 600, height: 120}}
                    />
                    {showSolutions && (
                        <button onClick={() => showPopup("popup25")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                </div>
                <div className="question">
                    {/* === Footer + Header === */}
                    <div className="footer">
                        <div className="footer-left">Copyright reserved</div>
                        <div className="footer-right">Please turn over</div>
                    </div>
                    <br/><br/>

                    <div className="header-row">
                        <div className="p2">QUESTION 3: ECONOMIC PURSUITS</div>
                        <div className="p1">40 MARKS – 30 MINUTES</div>
                    </div>

                    {/* === 3.1 === */}
                    <div className="question">
                        <p>3.1 <span style={{marginLeft: 35}}></span>Answer the following questions.</p>

                        <p>
                            <span style={{marginLeft: 60}}></span>3.1.1
                            <span style={{marginLeft: 35}}></span>Name any TWO forms of economic integration.
                            <span style={{marginLeft: 155}}></span>(2 x 1)
                            <span style={{marginLeft: 33}}></span>(2)
                        </p>
                        <textarea
                            name="q311"
                            placeholder="Your answer..."
                            value={answers.q311 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 60}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup311")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.1.2
                            <span style={{marginLeft: 35}}></span>Why do people often migrate to cities and urban areas?
                            <span style={{marginLeft: 99}}></span>(1 x 2)
                            <span style={{marginLeft: 33}}></span>(2)
                        </p>
                        <textarea
                            name="q312"
                            placeholder="Your answer..."
                            value={answers.q312 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 60}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup312")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        {/* === 3.2 === */}
                        <br/>
                        <p>3.2 <span style={{marginLeft: 35}}></span>Study the cartoon below and answer the questions
                            that follow.</p>
                        <div className="image-container">
                            <img src={q32} alt="Example" className="center-image"/>
                        </div>

                        <p>
                            <span style={{marginLeft: 60}}></span>3.2.1
                            <span style={{marginLeft: 32}}></span>Identify the international trade policy depicted by
                            the cartoon above.
                            <span style={{marginLeft:110}}></span>(1)
                        </p>
                        <textarea
                            name="q321"
                            placeholder="Your answer..."
                            value={answers.q321 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 40}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup321")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.2.2
                            <span style={{marginLeft: 32}}></span>What does the abbreviation WTO stand for?
                            <span style={{marginLeft: 279}}></span>(1)
                        </p>
                        <textarea
                            name="q322"
                            placeholder="Your answer..."
                            value={answers.q322 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 40}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup322")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.2.3
                            <span style={{marginLeft: 35}}></span>Briefly describe the term import substitution
                            <span style={{marginLeft: 278}}></span>(2)
                        </p>
                        <textarea
                            name="q323"
                            placeholder="Your answer..."
                            value={answers.q323 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 60}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup323")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.2.4
                            <span style={{marginLeft: 35}}></span>Why is it necessary for infant industries to be
                            protected?
                            <span style={{marginLeft: 190}}></span>(2)
                        </p>
                        <textarea
                            name="q324"
                            placeholder="Your answer..."
                            value={answers.q324 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 60}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup324")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.2.5
                            <span style={{marginLeft: 30}}></span>How can South Africa benefit from free trade?
                            <span style={{marginLeft: 199}}></span>(2 x 2)
                            <span style={{marginLeft: 23}}></span>(4)
                        </p>
                        <textarea
                            name="q325"
                            placeholder="Your answer..."
                            value={answers.q325 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 100}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup325")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}
                    </div>

                    {/* === Footer Again === */}
                    <div className="footer">
                        <div className="footer-left">Copyright reserved</div>
                        <div className="footer-right">Please turn over</div>
                    </div>

                    {/* === 3.3 === */}
                    <div className="question">
                        <p>3.3 <span style={{marginLeft: 35}}></span>Study the graph below and answer the questions that
                            follow.</p>
                        <div className="image-container">
                            <img src={q33} alt="Example" className="center-image"/>
                        </div>

                        <p>
                            <span style={{marginLeft: 60}}></span>3.3.1
                            <span style={{marginLeft: 32}}></span>Identify, in the graph above, the period in which
                            South Africa experienced the highest <br/>
                            <span style={{marginLeft: "127px"}}></span>negative growth rate.
                            <span style={{marginLeft: 443}}></span>(1)
                        </p>
                        <textarea
                            name="q331"
                            placeholder="Your answer..."
                            value={answers.q331 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 40}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup331")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.3.2
                            <span style={{marginLeft: 32}}></span>Name any ONE institution that publishes economic
                            indicators in South Africa.
                            <span style={{marginLeft: 46}}></span>(1)
                        </p>
                        <textarea
                            name="q332"
                            placeholder="Your answer..."
                            value={answers.q332 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 40}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup332")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.3.3
                            <span style={{marginLeft: 35}}></span>Briefly describe the term social indicator.
                            <span style={{marginLeft: 300}}></span>(2)
                        </p>
                        <textarea
                            name="q333"
                            placeholder="Your answer..."
                            value={answers.q333 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 60}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup333")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.3.4
                            <span style={{marginLeft: 35}}></span>Explain the impact of an increase in labour
                            productivity on businesses.
                            <span style={{marginLeft: 86}}></span>(2)
                        </p>
                        <textarea
                            name="q334"
                            placeholder="Your answer..."
                            value={answers.q334 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 80}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup334")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            <span style={{marginLeft: 60}}></span>3.3.5
                            <span style={{marginLeft: 30}}></span>How can the government improve the productivity of the
                            South African labour force?
                            <span style={{marginLeft: 1}}></span>(4)
                        </p>
                        <textarea
                            name="q335"
                            placeholder="Your answer..."
                            value={answers.q335 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 100}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup335")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            3.4 <span style={{marginLeft: 35}}></span>Briefly discuss subsidies and incentives as
                            methods of export promotion.
                            <span style={{marginLeft: 74}}></span>(2 x 4)
                            <span style={{marginLeft: 20}}></span>(8)
                        </p>
                        <textarea
                            name="q34"
                            placeholder="Your answer..."
                            value={answers.q34 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 120}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup34")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}

                        <p>
                            3.5 <span style={{marginLeft: 35}}></span>Evaluate South Africa's regional development
                            policies in terms of the international benchmark <br/>
                            <span style={{marginLeft: "62px"}}></span>criteria.
                            <span style={{marginLeft: 523}}></span>(4 x 2)
                            <span style={{marginLeft: 20}}></span>(8)
                            <b style={{marginLeft: 740}}>[40]</b>
                        </p>
                        <textarea
                            name="q35"
                            placeholder="Your answer..."
                            value={answers.q35 || ""}
                            onChange={handleChange}
                            style={{marginLeft: 100, width: 600, height: 120}}
                        ></textarea>
                        {showSolutions && (
                            <button onClick={() => showPopup("popup35")} className="view-solution-btn">
                                View Solution
                            </button>
                        )}
                    </div>

                    {/* === Final Footer === */}
                    <div className="footer">
                        <div className="footer-left">Copyright reserved</div>
                        <div className="footer-right">Please turn over</div>
                    </div>
                </div>
                <div className="header-row">
                    <div className="p2">QUESTION 4: MACROECONOMICS AND ECONOMIC PURSUITS</div>
                    <div className="p1">40 MARKS – 30 MINUTES</div>
                </div>

                <div className="question">
                    <p>4.1 <span style={{marginLeft: "35px"}}></span>Answer the following questions.</p>

                    <p>
                        <span style={{marginLeft: "60px"}}>4.1.1</span>
                        <span style={{marginLeft: "35px"}}>Name any TWO effects of international trade.</span>
                        <span style={{marginLeft: "155px"}}>(2 x 1)</span>
                        <span style={{marginLeft: "53px"}}>(2)</span>
                    </p>
                    <textarea
                        name="q411"
                        placeholder="Write explanation here..."
                        value={answers.q411 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q411_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup411")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.1.2</span>
                        <span style={{marginLeft: "35px"}}>
                    How does Broad-Based Black Economic Empowerment (BBBEE) promote
                    <br/>
                    <span style={{marginLeft: "135px"}}>industrial development?</span>
                </span>
                        <span style={{marginLeft: "305px"}}>(1 x 2)</span>
                        <span style={{marginLeft: "53px"}}>(2)</span>
                    </p>
                    <textarea
                        name="q412"
                        placeholder="Write explanation here..."
                        value={answers.q412 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q412_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup412")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <br/>
                    <p>4.2 <span style={{marginLeft: "35px"}}></span>Study the diagram below and answer the questions
                        that follow.</p>
                    <div className="image-container">
                        <img src={q42} alt="Example" className="center-image"/>
                    </div>

                    <p>
                        <span style={{marginLeft: "60px"}}>4.2.1</span>
                        <span style={{marginLeft: "32px"}}>Identify the value of marginal propensity to save (mps) in the diagram above.</span>
                        <span style={{marginLeft: "62px"}}>(1)</span>
                    </p>
                    <input
                        type="text"
                        name="q421"
                        value={answers.q421 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "200px"}}
                    />
                    <div id="q421_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup421")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.2.2</span>
                        <span style={{marginLeft: "32px"}}>Name the leakage that relates to the foreign sector.</span>
                        <span style={{marginLeft: "242px"}}>(1)</span>
                    </p>
                    <input
                        type="text"
                        name="q422"
                        value={answers.q422 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "200px"}}
                    />
                    <div id="q422_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup422")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.2.3</span>
                        <span style={{marginLeft: "35px"}}>Briefly describe the term autonomous consumption.</span>
                        <span style={{marginLeft: "236px"}}>(2)</span>
                    </p>
                    <textarea
                        name="q423"
                        placeholder="Write explanation here..."
                        value={answers.q423 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q423_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup423")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.2.4</span>
                        <span style={{marginLeft: "35px"}}>Explain the importance of savings in the economy.</span>
                        <span style={{marginLeft: "243px"}}>(2)</span>
                    </p>
                    <textarea
                        name="q424"
                        placeholder="Write explanation here..."
                        value={answers.q424 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q424_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup424")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.2.5</span>
                        <span style={{marginLeft: "30px"}}>
                    Use the marginal propensity to consume (mpc) in the diagram above to determine the <br/>
                        <span style={{marginLeft: "125px"}}></span>value of the multiplier.
                    Show the formula and ALL calculations.
                </span>
                        <span style={{marginLeft: "155px"}}>(4)</span>
                    </p>
                    <textarea
                        name="q425"
                        placeholder="Write your calculation here..."
                        value={answers.q425 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q425_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup425")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}
                </div>

                <div className="footer">
                    <div className="footer-left">Copyright reserved</div>
                    <div className="footer-right">Please turn over</div>
                </div>

                <div className="question">
                    <p>4.3 Study the extract below and answer the questions that follow.</p>
                    <div className="image-container">
                        <img src={q43} alt="Example" className="center-image"/>
                    </div>

                    <p>
                        <span style={{marginLeft: "60px"}}>4.3.1</span>
                        <span style={{marginLeft: "32px"}}>
                    Identify the policy that sets out the government's approach to industrialisation.
                </span>
                        <span style={{marginLeft: "72px"}}>(1)</span>
                    </p>
                    <input
                        type="text"
                        name="q431"
                        value={answers.q431 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "300px"}}
                    />
                    <div id="q431_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup431")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.3.2</span>
                        <span style={{marginLeft: "32px"}}>
                    Name any other incentive provided by the DTIC to promote industrial development in <br/>
                        <span style={{marginLeft: "126px"}}></span>South Africa.
                </span>
                        <span style={{marginLeft: "532px"}}>(1)</span>
                    </p>
                    <textarea
                        name="q432"
                        placeholder="Write explanation here..."
                        value={answers.q432 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q432_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup432")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.3.3</span>
                        <span
                            style={{marginLeft: "35px"}}>Briefly describe the term special economic zones (SEZs).</span>
                        <span style={{marginLeft: "211px"}}>(2)</span>
                    </p>
                    <textarea
                        name="q433"
                        placeholder="Write explanation here..."
                        value={answers.q433 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q433_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup433")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.3.4</span>
                        <span style={{marginLeft: "35px"}}>How can an increase in international oil prices slow down industrial development?</span>
                        <span style={{marginLeft: "38px"}}>(2)</span>
                    </p>
                    <textarea
                        name="q434"
                        placeholder="Write explanation here..."
                        value={answers.q434 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q434_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup434")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        <span style={{marginLeft: "60px"}}>4.3.5</span>
                        <span style={{marginLeft: "30px"}}>
                    Why is infrastructure development in previously neglected areas important?
                </span>
                        <span style={{marginLeft: "83px"}}>(4)</span>
                    </p>
                    <textarea
                        name="q435"
                        placeholder="Write explanation here..."
                        value={answers.q435 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "100px"}}
                    ></textarea>
                    <div id="q435_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup435")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        4.4 <span style={{marginLeft: "35px"}}></span>Briefly discuss population growth and life
                        expectancy as demographic
                        indicators.
                        <span style={{marginLeft: "46px"}}>(2 x 4)</span> <span style={{marginLeft: "20px"}}>(8)</span>
                    </p>
                    <textarea
                        name="q44"
                        placeholder="Write explanation here..."
                        value={answers.q44 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "150px"}}
                    ></textarea>
                    <div id="q44_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup44")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p>
                        4.5 <span style={{marginLeft: "35px"}}></span>
                        How can South Africa reduce imports in order to correct a balance of payments deficit?
                        <span style={{marginLeft: "13px"}}>(8)</span>
                        <br/>
                        <b style={{marginLeft: "740px"}}>[40]</b>
                    </p>
                    <textarea
                        name="q45"
                        placeholder="Write explanation here..."
                        value={answers.q45 || ""}
                        onChange={handleChange}
                        style={{marginLeft: "100px", width: "500px", height: "150px"}}
                    ></textarea>
                    <div id="q45_fb" style={{marginLeft: "100px", marginTop: "6px", fontSize: "14px"}}></div>
                    {showSolutions && (
                        <button onClick={() => showPopup("popup45")} className="view-solution-btn">
                            View Solution
                        </button>
                    )}

                    <p style={{textAlign: "right", marginRight: "50px"}}>
                        <b>TOTAL SECTION B: 80</b>
                    </p>
                </div>

                <div className="footer">
                    <div className="footer-left">Copyright reserved</div>
                    <div className="footer-right">Please turn over</div>
                </div>
                <br/><br/>
                <div className="header-row">
                    <div className="p2">SECTION C</div>
                </div>

                <p>Answer any ONE of the two questions in this section in the ANSWER BOOK.</p>
                <p>Your answer will be assessed as follows:</p>
                <br/>
                <div className="image-container">
                    <img src={q52} alt="Example" className="center-image"/>
                </div>

                {/* === QUESTION 5 === */}
                <div className="header-row">
                    <div className="p2">QUESTION 5: MACROECONOMICS</div>
                    <div className="p1">40 MARKS – 40 MINUTES</div>
                </div>
                <ul>
                    <li>
                        Discuss in detail the features underpinning forecasting of business cycles.
                        <span style={{marginLeft: "140px"}}></span>(26 marks)
                        <div className="section">
                            <label htmlFor="q5BodyText">Body: Main Part</label>
                            <textarea
                                id="q5BodyText"
                                name="q5BodyText"
                                value={q5BodyText} onChange={e => setQ5BodyText(e.target.value)}
                                placeholder="Paste Body content for Question 5 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                    </li>

                    <li>
                        Analyse the challenges that an economic recession poses for the different participants in the
                        economy
                        <span style={{marginLeft: "100px"}}></span>(10 marks)
                        <div className="section">
                            <label htmlFor="q5AdditionalText">Additional Part</label>
                            <textarea
                                id="q5AdditionalText"
                                name="q5AdditionalText"
                                value={q5AdditionalText} onChange={e => setQ5AdditionalText(e.target.value)}
                                placeholder="Paste Additional Part content for Question 5 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                    </li>

                    <li>
                        <div className="section">
                            <label htmlFor="q5IntroText">Introduction</label>
                            <textarea
                                id="q5IntroText"
                                name="q5IntroText"
                                value={q5IntroText} onChange={e => setQ5IntroText(e.target.value)}
                                placeholder="Paste Introduction for Question 5 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                        <div className="section">
                            <label htmlFor="q5ConclusionText">Conclusion</label>
                            <textarea
                                id="q5ConclusionText"
                                name="q5ConclusionText"
                                value={q5ConclusionText} onChange={e => setQ5ConclusionText(e.target.value)}
                                placeholder="Paste Conclusion for Question 5 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                    </li>
                </ul>

                {/* === QUESTION 6 === */}
                <div className="header-row">
                    <div className="p2">QUESTION 6: ECONOMIC PURSUITS</div>
                    <div className="p1">40 MARKS – 40 MINUTES</div>
                </div>
                <ul>
                    <li>
                        Discuss in detail the South African growth and development policies and strategic initiatives
                        since 1994.
                        <span style={{marginLeft: "100px"}}></span>(26 marks)
                        <div className="section">
                            <label htmlFor="q6BodyText">Body: Main Part</label>
                            <textarea
                                id="q6BodyText"
                                name="q6BodyText"
                                value={q6BodyText} onChange={e => setQ6BodyText(e.target.value)}
                                placeholder="Paste Body content for Question 6 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                    </li>

                    <li>
                        How can South Africa use supply-side measures to promote economic growth and development?
                        <span style={{marginLeft: "100px"}}></span>(10 marks)
                        <div className="section">
                            <label htmlFor="q6AdditionalText">Additional Part</label>
                            <textarea
                                id="q6AdditionalText"
                                name="q6AdditionalText"
                                value={q6AdditionalText} onChange={e => setQ6AdditionalText(e.target.value)}
                                placeholder="Paste Additional Part content for Question 6 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                    </li>

                    <li>
                        <div className="section">
                            <label htmlFor="q6IntroText">Introduction</label>
                            <textarea
                                id="q6IntroText"
                                name="q6IntroText"
                                value={q6IntroText} onChange={e => setQ6IntroText(e.target.value)}
                                placeholder="Paste Introduction for Question 6 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                        <div className="section">
                            <label htmlFor="q6ConclusionText">Conclusion</label>
                            <textarea
                                id="q6ConclusionText"
                                name="q6ConclusionText"
                                value={q6ConclusionText} onChange={e => setQ6ConclusionText(e.target.value)}
                                placeholder="Paste Conclusion for Question 6 here"
                                style={{marginLeft: "100px", width: "500px", height: "150px"}}
                            ></textarea>
                        </div>
                    </li>
                </ul>

                <div style={{textAlign: "center", marginTop: "20px"}}>
                    <label htmlFor="questionChoice">Select Question to Mark:</label>
                    <select value={questionChoice} onChange={(e) => setQuestionChoice(e.target.value)}>
                        <option value="5">Question 5</option>
                        <option value="6">Question 6</option>
                    </select>
                </div>

                <div style={{textAlign: "center", marginTop: "20px"}}>
                    <button type="button" onClick={gradeAll}>Submit Your Answers</button>
                </div>

                {showResults && (
                    <div className="results-box">
                        <h2>Your Score: <span>{percent}%</span></h2>

                        <p>
                            (<span>{score}</span> out of 150 total marks)
                        </p>

                        <p style={{color: messageColor}}>
                            {message}
                        </p>
                        {/* NEW — RENDER THE HTML FEEDBACK */}
                        <div
                            className="detailed-feedback"
                            dangerouslySetInnerHTML={{__html: resultFeedback}}
                        ></div>
                        <div className="buttons-center">
                            <button id="retryBtn" className="button" onClick={retryExam}>Retry Exam</button>
                            <button id="exitBtn" className="button" onClick={exitExam}>Exit</button>
                        </div>
                    </div>
                )}

            </form>

            {/* === POPUPS === */}
            {popupId && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={closePopup}>Close</button>
                        {popupId === "popup211" && (
                            <>
                                <h3>Solution 2.1.1</h3>
                                <ul>
                                    <li>Economic growth</li>
                                    <li>Full employment</li>
                                    <li>Price stability</li>
                                    <li>Exchange rate stability</li>
                                    <li>Balance of payments equilibrium</li>
                                    <li>Economic equity / Equal distribution of income and wealth</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup212" && (
                            <>
                                <h3>Solution 2.1.2</h3>
                                <p>
                                    A subsidy on a product is financial assistance that reduces the price paid by consumers;
                                    hence it is subtracted when moving from GDP at basic prices to GDP at market prices.
                                </p>
                            </>
                        )}
                        {popupId === "popup221" && (
                            <>
                                <h3>Solution 2.2.1</h3>
                                <p>26%</p>
                            </>
                        )}
                        {popupId === "popup222" && (
                            <>
                                <h3>Solution 2.2.2</h3>
                                <p>Progressive</p>
                            </>
                        )}
                        {popupId === "popup223" && (
                            <>
                                <h3>Solution 2.2.3</h3>
                                <p>It refers to changes in taxation and government expenditure to influence the level of economic activity.</p>
                            </>
                        )}
                        {popupId === "popup224" && (
                            <>
                                <h3>Solution 2.2.4</h3>
                                <ul>
                                    <li> People will be discouraged to work and they will leave the labour market.</li>
                                    <li> Businesses may be discouraged to do production and shut down.</li>
                                    <li> Businesses and individuals may evade tax.</li>
                                    <li> Taxpayers’ (consumers’) disposable income will decrease resulting in a decrease in spending.</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup225" && (
                            <>
                                <h3>Solution 2.2.5</h3>
                                <p>Tax payable = R110 739 + (36% of taxable income above R467 500)<br/>
                                    = R110 739 + (36% x (R480 000 - R467 500))<br/>
                                    = R110 739 +(36% x 12 500)<br/>
                                    = R110 739 + R4 500<br/>
                                    = R115 239 </p>
                            </>
                        )}
                        {popupId === "popup231" && (
                            <>
                                <h3>Solution 2.3.1</h3>
                                <p>$1 = R14.60</p>
                            </>
                        )}
                        {popupId === "popup232" && (
                            <>
                                <h3>Solution 2.3.2</h3>
                                <p>Free floating/Flexible exchange rate system</p>
                            </>
                        )}
                        {popupId === "popup233" && (
                            <>
                                <h3>Solution 2.3.3</h3>
                                <p>
                                    It is a decrease in the value of a currency in term of another due to
                                    deliberate action by the government. / Deliberate government
                                    intervention to reduce the value of a currency. / It is when the
                                    government (central bank) fixes or pegs the value of currency in
                                    terms of another at lower level than before
                                </p>
                            </>
                        )}
                        {popupId === "popup234" && (
                            <>
                                <h3>Solution 2.3.4</h3>
                                <ul>
                                    <li> The value of the rand will increase due to the net inflow of foreign exchange</li>
                                    <li> Importing production inputs will be cheaper due to improved exchange rate</li>
                                    <li> Production will be stimulated and more employment opportunities will be created</li>
                                    <li> Public debt to cover BOP problems will be reduced/less borrowing</li>
                                    <li> Foreign reserves may increase thereby improving the financial position of the country</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup235" && (
                            <>
                                <h3>Solution 2.3.5</h3>
                                <ul>
                                    <li> An increase in demand for US dollars shifts the demand curve to the right, from DD to D1D1 / market equilibrium will shift from
                                        e to e1</li>
                                    <li> The price of the dollar increases from R14.60 to R15.00, which means that South Africans will need more rands to buy the
                                        same US dollar</li>
                                    <li> The value of the rand decreases or the rand depreciates</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup24" && (
                            <>
                                <h3>Solution 2.4</h3>
                                <ul>
                                    <li> Households supply factors of production such as labour to businesses /
                                        Businesses buy factors of production from households through the factor market</li>
                                    <li> Households receive income when businesses pay for factors of production. /
                                        Businesses pay for the factors of production which becomes income to the
                                        households</li>
                                    <li> Households buy goods and services from businesses to satisfy their needs and
                                        wants / Businesses produce goods and services which they sell to businesses
                                    </li>
                                    <li> Businesses receive income/sales revenue when households pay for goods and
                                        services / Households pay for goods and services which becomes income to
                                        businesses</li>
                                    <li> Household provide money capital for businesses through savings with commercial
                                        banks or buying shares on stock exchange markets / businesses get money capital
                                        from households through savings and issuing of share</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup25" && (
                            <>
                                <h3>Solution 2.5</h3>
                                <ul>
                                    <li> Some local authorities or municipalities do not have adequate financial and
                                        physical resources to provide quality services to their residents.
                                        E.g. old water supply infrastructure</li>
                                    <li> Corruption and nepotism have resulted in several government institutions having
                                        incompetent employees who cannot successfully deliver services</li>
                                    <li> Most government officials are not held accountable for their actions which
                                        results in some public projects not delivered</li>
                                    <li> Several state-owned enterprises make losses that require bail-out from the
                                        government</li>
                                    <li> Lack of knowledge, qualifications, and management skills may result to the
                                        failure of the public sector</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup311" && (
                            <>
                                <h3>Solution 3.1.1</h3>
                                <ul>
                                    <li> Economic union</li>
                                    <li> Common market</li>
                                    <li> Free trade area</li>
                                    <li> Customs union</li>
                                    <li> Monetary union</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup312" && (
                            <>
                                <h3>Solution 3.1.2</h3>
                                <ul>
                                    <li> To have access to higher standard of living due to better service delivery in cities and urban areas</li>
                                    <li> To have access to employment opportunities since towns and cities are more industrialised</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup321" && (
                            <>
                                <h3>Solution 3.2.1</h3>
                                <p>Free trade</p>
                            </>
                        )}
                        {popupId === "popup322" && (
                            <>
                                <h3>Solution 3.2.2</h3>
                                <p>World Trade Organisation</p>
                            </>
                        )}
                        {popupId === "popup323" && (
                            <>
                                <h3>Solution 3.2.3</h3>
                                <p>A trade policy whereby locally produced goods replace goods that had previously been imported</p>
                            </>
                        )}
                        {popupId === "popup324" && (
                            <>
                                <h3>Solution 3.2.4</h3>
                                <ul>
                                    <li> To allow new industries to grow and become well-established so that they can function independently.</li>
                                    <li> To reduce unfair competition from foreign businesses that are well-established</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup325" && (
                            <>
                                <h3>Solution 3.2.5</h3>
                                <ul>
                                    <li> Demand for South African exports will increase due to the removal of international trade barriers</li>
                                    <li> South African consumers will pay less on imported products as it improves accessibility of goods and raises their standard of living</li>
                                    <li> Economic efficiencies will improve as foreign products increase competition on local producers</li>
                                    <li> South African producers may be able to minimise cost of production through specialisation and mass production</li>
                                    <li> South African consumers will have more choice on goods and services</li>
                                    <li> South Africa benefit from improved international relations by removing trade restrictions</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup331" && (
                            <>
                                <h3>Solution 3.3.1</h3>
                                <p>2020-Q2</p>
                            </>
                        )}
                        {popupId === "popup332" && (
                            <>
                                <h3>Solution 3.3.2</h3>
                                <ul>
                                    <li> South African Reserve Bank/SARB</li>
                                    <li> Statistics South Africa (Stats SA)</li>
                                    <li> The Department of Trade, Industry and Competition (DTIC)</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup333" && (
                            <>
                                <h3>Solution 3.3.3</h3>
                                <p>It refers to statistical data used to monitor the well-being of people
                                    in a society / They are used to describe and evaluate community
                                    well-being in terms of social, economic, and psychological
                                    welfare.</p>
                            </>
                        )}
                        {popupId === "popup334" && (
                            <>
                                <h3>Solution 3.3.4</h3>
                                <ul>
                                    <li> Businesses may experience a decrease in cost of production which will improve profits.</li>
                                    <li> Businesses will produce more output with the same inputs (labour).</li>
                                    <li> Businesses will be able to sell their products at more competitive prices thereby gaining more market share.</li>
                                    <li> Better quality products will be produced and compete in the export markets</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup335" && (
                            <>
                                <h3>Solution 3.3.5</h3>
                                <ul>
                                    <li> Provide better quality education and training to improve the skills and knowledge of the labour force</li>
                                    <li> Provide work-related training programmes such as SETAs or EPWP to improve the skills of the current workforce</li>
                                    <li> Improve health care services to ensure physical and mental fitness of workers</li>
                                    <li> Impose fair personal income tax rate and other incentives such as an improved national minimum wage to motivate workers to produce more output</li>
                                    <li> Provide an efficient and reliable public transport system to ensure that workers get to work on time</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup34" && (
                            <>
                                <h3>Solution 3.4</h3>
                                <p><b>Subsidies</b></p>
                                <ul>
                                    <li> Direct subsidies refer to financial support by the government to domestic producers who export goods.</li>
                                    <li> They are provided in the form of cash payments to exporters</li>
                                    <li> Indirect subsidies refer to support by the government but do not hold a pre-determined monetary or involve actual cash outlays</li>
                                    <li> They are provided in the form of refunds on import tariffs and general tax rebates</li>
                                    <li> The purpose of subsidies is to decrease producers’ costs and increase their competitiveness in export markets</li>
                                </ul>
                                <p><b>Incentives</b></p>
                                <ul>
                                    <li> The government supplies producers with the required information on export markets, research on potential export markets</li>
                                    <li> Financial assistance may be in the form of concessions on transport costs, export credit loans and insurance contracts for export transactions</li>
                                    <li> Export incentives increase the producers’ efficiency so that they can compete effectively in international markets</li>
                                    <li> Incentives result in greater volumes of South African goods to be exported thereby increasing economic growth</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup35" && (
                            <>
                                <h3>Solution 3.5</h3>
                                <ul>
                                    <li> Spatial Development Initiatives (SDIs) and Special Economic Zones (SEZs) are managed through transparent, ethical and efficient governance
                                        to decentralize economic activity</li>
                                    <li> Competitive businesses that are not in need of ongoing financial aid from government have been established</li>
                                    <li> Issues at grass roots level such as poverty and inequality, are addressed to ensure that development starts from below</li>
                                    <li> Ignorance towards education and training opportunities has resulted in poor investment in human capita</li>
                                    <li> More emphasis is put on total development covering all human life to achieve inclusive development, e.g. education, health and nutrition</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup411" && (
                            <>
                                <h3>Solution 4.1.1</h3>
                                <ul>
                                    <li> Specialisation</li>
                                    <li> Mass production</li>
                                    <li> Globalisation</li>
                                    <li> Efficiency</li>
                                    <li> Dumping</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup412" && (
                            <>
                                <h3>Solution 4.1.2</h3>
                                <ul>
                                    <li> Increasing the number of black people who own and control businesses promotes the establishment of new industries in the economy</li>
                                    <li> Through skills development black people have an opportunity to acquire skills that they can use to start their own business</li>
                                    <li> Enterprise development promotes large businesses to invest in small businesses such that they can expand and establish themselves</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup421" && (
                            <>
                                <h3>Solution 4.2.1</h3>
                                <p>0.2</p>
                            </>
                        )}
                        {popupId === "popup422" && (
                            <>
                                <h3>Solution 4.2.2</h3>
                                <p>Imports/payments for imports</p>
                            </>
                        )}
                        {popupId === "popup423" && (
                            <>
                                <h3>Solution 4.2.3</h3>
                                <p>The level of spending that is independent of the level of income or changes in income.</p>
                            </>
                        )}
                        {popupId === "popup424" && (
                            <>
                                <h3>Solution 4.2.4</h3>
                                <ul>
                                    <li> Savings ensure the availability of loanable funds in financial institutions for investments (capital formation)</li>
                                    <li> Consumers will have access to loans which will increase spending on durable goods</li>
                                    <li> Savings help to control excess demand in the economy thereby reducing demand-pull inflation</li>
                                    <li> Households will enjoy financial freedom as they will be able to pay for their future needs using their savings</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup425" && (
                            <>
                                <h3>Solution 4.2.5</h3>
                                <p>Multiplier (K) = 1/(1-mpc)<br/>
                                    = 1/(1-0.8)<br/>
                                    = 1/0.2<br/>
                                    = 5
                                </p>
                            </>
                        )}
                        {popupId === "popup431" && (
                            <>
                                <h3>Solution 4.3.1</h3>
                                <p>National Industrial Policy Framework/NIPF</p>
                            </>
                        )}
                        {popupId === "popup432" && (
                            <>
                                <h3>Solution 4.3.2</h3>
                                <ul>
                                    <li> Small Businesses Support Program/SBSP</li>
                                    <li> SEDA Technology Program/STP</li>
                                    <li> Skills Support Program/SSP</li>
                                    <li> Custom-free incentives</li>
                                    <li> Foreign Investment Grant/FIG</li>
                                    <li> Strategic Investment Program/SIP</li>
                                    <li> Services to Business Processes</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup433" && (
                            <>
                                <h3>Solution 4.3.3</h3>
                                <p>It refers to a geographically demarcated area which has been set aside for specific economic activities to be developed. / SEZs are
                                    geographically designated areas set aside for specifically targeted
                                    economic activities
                                </p>
                            </>
                        )}
                        {popupId === "popup434" && (
                            <>
                                <h3>Solution 4.3.4</h3>
                                <ul>
                                    <li> Fuel prices will increase resulting in higher cost of transport for different industries and lower profit prospects</li>
                                    <li> Some businesses may shut-down their operations which will slow-down industrialisation</li>
                                    <li> Potential investors may be discouraged to establish new businesses</li>
                                    <li> The government will have less funds available to offer subsidies for industrial development since it will spend more on fuel procurement</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup435" && (
                            <>
                                <h3>Solution 4.3.5</h3>
                                <ul>
                                    <li> Adequate infrastructure such as transport, communication and energy supply help to attract more investment</li>
                                    <li> Development of infrastructure improves the economic livelihood of previously disadvantaged areas</li>
                                    <li> More job opportunities will be created for the workers which will reduce their transport costs for commuting long distances to work</li>
                                    <li> People in underdeveloped areas will enjoy better standard of living as they will be able to satisfy more needs due to the low cost of living</li>
                                    <li> Workers will not lose ties with their families which will promote cultural values</li>
                                    <li> Social problems associated with overcrowding or over-population in urban areas will be reduced</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup44" && (
                            <>
                                <h3>Solution 4.4</h3>
                                <p><b>Population growth</b></p>
                                <ul>
                                    <li> Population growth refers to the increase in the number of people residing in a country</li>
                                    <li> The South African population increased to approximately 60,6 million in 2022</li>
                                    <li> Measuring population growth is important for delivering social services</li>
                                    <li> When the size population increases, the tax base for the government will increase</li>
                                </ul>
                                <p><b>Life expectancy</b></p>
                                <ul>
                                    <li> Life expectancy expresses the number of years a new-born infant will live if
                                        the prevailing patterns of mortality remained the same throughout his or her
                                        life
                                    </li>
                                    <li> In South Africa the life expectancy at birth has increased over the years</li>
                                    <li> It is important for governments to know what the average life expectancy is,
                                        because working humans require a range of social services and are
                                        simultaneously also a tax base
                                    </li>
                                    <li> Assurance companies in particular are interested in life expectancy because
                                        unexpected reductions in life expectancy reduce the number of
                                        years policy holders can pay premiums
                                    </li>

                                </ul>
                            </>
                        )}
                        {popupId === "popup45" && (
                            <>
                                <h3>Solution 4.5</h3>
                                <p><b>Population growth</b></p>
                                <ul>
                                    <li> increasing interest rates to discourage domestic expenditure including imported goods and services</li>
                                    <li> increasing direct taxes such as personal income tax to reduce households’ disposable income and discourage their expenditure on imports</li>
                                    <li> imposing import tariffs and duties to make imported goods and services more expensive and reduce domestic expenditure on them</li>
                                    <li> imposing quotas to limit the quantity of goods and services that South Africans can import within a specific period</li>
                                    <li> increasing aggregate supply of goods and services to avoid shortages on local markets</li>
                                    <li> reducing the availability of foreign exchange to discourage domestic expenditure on import</li>
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            )}
            <style jsx>
                {`
                    body {
                        font-family: Arial, sans-serif;
                        background: #f8f8f8;
                        margin: 20px;
                        padding: 20px;
                    }
                    .image-container {
                        width: 600px;      /* increase size (you can change px value) */
                        height: auto;      /* keeps correct aspect ratio */
                        margin-left: 90px;
                    }

                    .center-image {
                        width: 500px;      /* increase size (you can change px value) */
                        height: auto;      /* keeps correct aspect ratio */
                        margin-left: 90px;
                    }
                    .container {
                        max-width: 800px;
                        margin: auto;
                        background: #fff;
                        padding: 20px 30px;
                        border-radius: 10px;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                        margin-bottom: 20px;
                    }
                    img {
                        width: 600px;      /* increase size (you can change px value) */
                        height: auto;      /* keeps correct aspect ratio */
                        margin-left: 90px; /* moves image to the right side using px */
                    }
                    h2 {
                        text-align: center;
                        color: #003366;
                    }
                    h3{
                        text-align: center;
                    }
                    h4{
                        text-align: center;
                    }
                    .question {
                        margin: 20px 0;
                        padding: 15px;
                        border-bottom: 1px solid #ddd;
                    }
                    .results-box p{
                        text-align: center;

                    }
                    .results-box{
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        padding: 20px;
                        margin-top: 20px;
                    }
                    .question p {
                        margin-bottom: 10px;
                    }
                    label {
                        display: block;
                        margin-bottom: 5px;
                    }
                    button {
                        background: #003366;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        font-size: 16px;
                        cursor: pointer;
                        border-radius: 5px;
                        margin-top: 15px;
                    }
                    button:hover {
                        background: #0055aa;
                    }
                    .result {
                        margin-top: 20px;
                        padding: 15px;
                        background: #e8f5e9;
                        border-left: 5px solid green;
                        display: none;
                    }
                    table{
                        border-collapse: collapse;
                        width: 100%;
                        font-size: 14px;
                    }
                    th, td{
                        border: 1px solid #000;
                        padding: 8px;
                        vertical-align: top;
                    }
                    th {
                        background-color: #f2f2f2;
                        text-align: center;
                    }
                    .footer {
                        margin-top: 15px;
                        display: flex;
                        justify-content: space-between;
                        font-size: 13px;
                    }
                    .footer-left {
                        flex: 1;
                        text-align: left;
                    }
                    .footer-right {
                        flex: 1;
                        text-align: right;
                    }
                    .footer-note {
                        margin-top: 3px;
                        text-align: right;
                        font-size: 13px;
                    }
                    .header-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 2px;
                    }
                    .p1 {
                        font-weight: bold;
                    }
                    .p2 {
                        font-weight: bold;
                    }
                    .correct { color: green; }
                    .wrong { color: red; }
                    .partial { color: orange; }
                    .popup-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 999;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .popup {
                        background: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        width: 80%;
                        max-width: 600px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                        position: relative;
                    }

                    .close-btn {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: #333;
                        color: white;
                        padding: 5px 10px;
                        border: none;
                        cursor: pointer;
                        border-radius: 5px;
                    }

                    .view-solution-btn {
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        cursor: pointer;
                        border-radius: 5px;
                    }

                    .view-solution-btn:hover {
                        background: #0056b3;
                    }
                    .btn-view {
                        margin-left: 8px;
                        padding: 4px 8px;
                        border-radius: 6px;
                        border: none;
                        background: #007BFF;
                        color: white;
                        cursor: pointer;
                    }
                    .btn-view:hover {
                        background: #0056b3;
                    }
                    .answer-box, .solution-box {
                        margin-top: 5px;
                        padding: 4px 6px;
                        border-radius: 6px;
                        background: #f0f0f0;
                        font-style: italic;
                    }
                    .correct {
                        color: green;
                        font-weight: bold;
                    }
                    .wrong {
                        color: red;
                        font-weight: bold;
                    }
                    .feedback {
                        display: none;
                        text-align: center;
                        padding: 20px;
                        border: 1px solid #ccc;
                        margin-top: 20px;
                        border-radius: 10px;
                    }
                    .button {
                        padding: 10px 20px;
                        margin: 5px;
                        cursor: pointer;
                    }
                    .buttons-center {
                        display: flex;
                        justify-content: center;   /* Centers horizontally */
                        align-items: center;        /* Centers vertically (if needed) */
                        gap: 20px;                  /* Space between buttons */
                        margin-top: 20px;
                    }
                    #retryBtn { background-color: #4CAF50; color: white; }
                    #exitBtn { background-color: #f44336; color: white; }
                    .correct { color: green; }
                    .wrong { color: red; }
                    .mark-feedback { margin-left: 10px; }
                    .answer-box, .solution-box { margin-top: 5px; }
                    .btn-view { margin-left: 10px; padding: 5px 10px; }
                    .correct { color: green; font-weight: bold; }
                    .wrong { color: red; font-weight: bold; }
                `}
            </style>
        </div>
    );
}

export default EconomicsP1Nov2022Eng;
