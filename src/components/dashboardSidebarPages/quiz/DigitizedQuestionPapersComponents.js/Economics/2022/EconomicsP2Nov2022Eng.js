import React, { useState, useEffect } from "react";
import myPhoto from "./yyyy.png";
import q23 from "./rrrr.png";
import pic from "./zzzz.png";
import q32 from "./aaaa.png";
import q33 from "./bbbb.png";
import q42 from "./cccc.png";
import q43 from "./dddd.png";
import q52 from "./ssss.png";

// Example keywords and max marks
const essayKeywords = {
    5: {
        intro: ["perfect competitor", "market structure", "buyers and sellers"],
        body: [
            "economic profit", "normal profit", "economic loss", "average revenue", "average cost",
            "marginal revenue", "marginal cost", "MR=MC", "quantity", "price", "total revenue",
            "total cost", "cost curves", "revenue curves", "break-even point", "profit area", "loss area",
            "position cost curves", "position revenue curves", "label axes", "indicate profit", "indicate loss"
        ],
        additional: [
            "allocative efficiency", "no barriers to entry", "competition", "lower prices",
            "large quantities", "advertising costs", "price takers", "lowest point", "average cost curve"
        ],
        conclusion: ["normal profits", "long-run", "businesses entering"]
    },
    6: {
        intro: ["environmental sustainability", "economic activity", "future generations"],
        body: [
            "property rights", "conservationist effect", "overexploitation", "fauna and flora",
            "clean air", "waste charges", "rubbish collection", "sewage disposal", "emission charges",
            "environmental taxes", "carbon tax", "external cost", "environmental subsidies",
            "LED light bulbs", "solar geysers", "reusable shopping bags", "rechargeable batteries",
            "marketable permits", "maximum level of pollution", "pollution quota", "Department of Mineral Resources",
            "Department of Environmental Affairs", "command and control", "quantity standards",
            "quality standards", "social impact standards", "voluntary agreements", "education",
            "environmental awareness", "community wildlife reserves"
        ],
        additional: [
            "UNFCCC", "greenhouse gas emissions", "Kyoto Protocol", "binding targets",
            "developed countries", "Paris Agreement", "global warming", "subsidies",
            "financial support", "technical support", "capacity building", "emission targets",
            "coal reliance", "law enforcement", "penalties", "major polluters", "global temperatures"
        ],
        conclusion: ["damage the environment", "future generations"]
    }
};

const maxEssayMarks = {
    intro: 2,
    body: 26,
    additional: 10,
    conclusion: 2
};

function EconomicsP2Nov2022Eng() {
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
            <h3>Essay Mark Breakdown for Question ${questionChoice}</h3>
            <p><strong>Introduction:</strong> ${introResult.marks}/2 (Keywords found: ${checkKeywords(introText, essayKeywords[questionChoice].intro, maxEssayMarks.intro)}/${essayKeywords[questionChoice].intro.length})</p>
           <p><strong>Body:</strong> ${bodyResult.marks}/26 (Keywords found: ${bodyResult.found.join(", ") || "None"})</p>
            <p><strong>Additional Part:</strong> ${additionalResult.marks}/10 (Keywords found: ${checkKeywords(additionalText, essayKeywords[questionChoice].additional, maxEssayMarks.additional)}/${essayKeywords[questionChoice].additional.length})</p>
            <p><strong>Conclusion:</strong> ${conclusionResult.marks}/2 (Keywords found: ${checkKeywords(conclusionText, essayKeywords[questionChoice].conclusion, maxEssayMarks.conclusion)}/${essayKeywords[questionChoice].conclusion.length})</p>
            <p><strong>Total Essay Marks:</strong> ${essayScore}/40</p>
            <h4>Essay Analysis Notes:</h4>
        `;

        // Section-specific guidance
        if (q === "5") {
            feedbackHTML += `
                <p>For Question 5: The body should discuss economic profit, economic loss, and normal profit, including concepts like MR=MC, AR vs. AC, and total revenue vs. total cost.</p>
                <p><strong>Keyword Feedback:</strong> Missing body keywords: ${essayKeywords[5].body.filter(keyword => !bodyText.includes(keyword.toLowerCase())).join(", ")}</p>
                <p>Include graphs for economic profit, loss, and normal profit (max 12 marks: 4 per graph for correct positioning and labeling of cost/revenue curves, axes, and profit/loss areas).</p>
                <p>Marks capped at 8 for body if only listing facts/examples without detailed explanation.</p>
                <p>Additional part should discuss benefits like allocative efficiency, no barriers to entry, and lower prices for consumers.</p>
                <p><strong>Keyword Feedback:</strong> Missing additional part keywords: ${essayKeywords[5].additional.filter(keyword => !additionalText.includes(keyword.toLowerCase())).join(", ")}</p>
            `;
        } else {
            feedbackHTML += `
                <p>For Question 6: The body should discuss measures like property rights, environmental taxes, subsidies, marketable permits, command and control, voluntary agreements, and education.</p>
                <p><strong>Keyword Feedback:</strong> Missing body keywords: ${essayKeywords[6].body.filter(keyword => !bodyText.includes(keyword.toLowerCase())).join(", ")}</p>
                <p>Marks capped at 8 for body if only listing facts/examples without detailed explanation.</p>
                <p>Additional part should evaluate international agreements (UNFCCC, Kyoto Protocol, Paris Agreement) and their success in reducing climate change.</p>
                <p><strong>Keyword Feedback:</strong> Missing additional part keywords: ${essayKeywords[6].additional.filter(keyword => !additionalText.includes(keyword.toLowerCase())).join(", ")}</p>
            `;
        }

        feedbackHTML += `
            <p><strong>General Feedback:</strong></p>
            <p>- Marks are calculated based on keyword coverage and detailed explanations. Higher keyword presence indicates better content coverage.</p>
            <p>- Ensure all sections include detailed explanations, not just lists, to maximize marks (max 8 for body listing).</p>
            <p>- Introduction and conclusion should be concise and relevant to the question.</p>
            <p>- For Question 5, include graphs with proper labeling (cost/revenue curves, axes, profit/loss areas) to earn up to 12 marks.</p>
        `;

        return { score: essayScore, feedback: feedbackHTML };
    }
    // === PAPER 1: Multiple Choice, Matching, Definitions ===
    const correctMCQs = {
        q1: "D",
        q2: "D",
        q3: "B",
        q4: "A",
        q5: "B",
        q6: "C",
        q7: "A",
        q8: "C"
    };

    const matchingAnswers = {
        m1: "F",
        m2: "C",
        m3: "E",
        m4: "D",
        m5: "B",
        m6: "I",
        m7: "A",
        m8: "H"
    };

    const shortAnswers = {
        d1: ["DISECONOMIES OF SCALE"],
        d2: ["MARGINAL REVENUE"],
        d3: ["COST BENEFIT ANALYSIS", "COST-BENEFIT ANALYSIS", "COST BENEFITS ANALYSIS"],
        d4: ["DEMAND PULL INFLATION", "DEMAND-PULL INFLATION"],
        d5: ["TRANSIT TOURISTS"],
        d6: ["CONSERVATION", "ENVIRONMENTAL SUSTAINABILITY"]
    };

    // === PAPER 2: Economic Objectives & Related Questions ===
    const acceptedObjectives = [
        "OVERT",
        "EXPLICIT",
        "FORMAL",
        "TACIT",
        "IMPLICIT",
        "INFORMAL",
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
            txt212.includes("COST") ||
            txt212.includes("PRODUCERS");
        const cond2 =
            txt212.includes("ENCOURAGE") ||
            txt212.includes("PRODUCTION OF CERTAIN GOODS") ||
            txt212.includes("EXPENDITURE");
        if (cond1 || cond2) {
            total += 2;
            newFeedback.push({ id: "q212", text: "Explanation acceptable", correct: true, mark: 2 });
        } else if (txt212.length > 0) {
            newFeedback.push({ id: "q212", text: "Explanation not clear.  Mention subsidies reduce the cost of production OR producers increase production", correct: false, mark: 0, correctAnswer: "Mention reduction in consumer price OR that subsidy is government expenditure" });
        } else {
            newFeedback.push({ id: "q212", text: "Not answered", correct: false, mark: 0 });
        }

        // Data response 2.2
        // Q2.2.1
        const q221 = (answers.q221 || "").toString().toUpperCase();
        if (q221.includes("DOOR")|| q221.includes("ONLINE") || q221.includes("PACKAGING") || q221.includes("BRANDING") || q221.includes("ADVERTISING")) {
            total += 1;
            newFeedback.push({ id: "q221", text: "✅ Correct", correct: true, mark: 1 });
        } else if (q221.length > 0) {
            newFeedback.push({ id: "q221", text: "❌ Incorrect — Correct Answer: Door-to-door delivery/...", correct: false, mark: 0, correctAnswer: "26%" });
        } else {
            newFeedback.push({ id: "q221", text: "Not answered", correct: false, mark: 0, correctAnswer: "Door-to-door delivery/..." });
        }

        // Q2.2.2
        const q222 = (answers.q222 || "").toString().toUpperCase();
        if (q222.includes("PROGRESSIVE")|| q222.includes("MEDICAL") || q222.includes("CLOTHING") || q222.includes("LAWYERS") || q222.includes("RESTAURANTS") || q222.includes("RETAIL")) {
            total += 1;
            newFeedback.push({ id: "q222", text: "✅ Correct", correct: true, mark: 1 });
        } else if (q222.length > 0) {
            newFeedback.push({ id: "q222", text: "❌ Incorrect — Correct Answer: Fast Food Outlets/...", correct: false, mark: 0, correctAnswer: "Progressive" });
        } else {
            newFeedback.push({ id: "q222", text: "Not answered", correct: false, mark: 0, correctAnswer: "Fast Food Outlets/..." });
        }

        // Q2.2.3
        const q223 = (answers.q223 || "").toString().toUpperCase();
        if (q223.includes("EXCLUSIVE") || q223.includes("PRODUCT") || q223.includes("PROPERTY")) {
            total += 2;
            newFeedback.push({ id: "q223", text: "✅ Correct", correct: true, mark: 2 });
        } else if (q223.length > 0) {
            newFeedback.push({ id: "q223", text: "❌ Incorrect — Correct:  exclusively produce/manufacture a product for a certain period", correct: false, mark: 0, correctAnswer: "Changes in taxation and government expenditure to influence activity" });
        } else {
            newFeedback.push({ id: "q223", text: "Not answered", correct: false, mark: 0 });
        }

        // Q2.2.4
        const q224 = (answers.q224 || "").toString().toUpperCase();
        if (q224.includes("MONOPOLY") || q224.includes("SUBSTITUTES") || q224.includes("MARKET HAS") || q224.includes("DECREASE SPENDING")) {
            total += 2;
            newFeedback.push({ id: "q224", text: "✅ Correct", correct: true, mark: 2 });
        } else if (q224.length > 0) {
            newFeedback.push({ id: "q224", text: "❌ Incorrect — Correct:Monopolistically competitive OR Monopoly market has higher prices OR Monopoly sells a unique product.", correct: false, mark: 0, correctAnswer: "People discouraged, businesses close, tax evasion, reduction in disposable income" });
        } else {
            newFeedback.push({ id: "q224", text: "Not answered", correct: false, mark: 0 });
        }

        // Q2.2.5
        const q225 = (answers.q225 || "").toString().replace(/[R,\s]/g, "");
        if (q224.includes("BENEFIT")|| q225.includes("PRODUCERS") || q225.includes("PRODUCT") || q225.includes("PROFIT")) {
            total += 4;
            newFeedback.push({ id: "q225", text: "✅ Correct (R115 239)", correct: true, mark: 4 });
        } else if (q225.length > 0) {
            newFeedback.push({ id: "q225", text: "❌ Incorrect — Correct Answer: Producers will benefit Or Producers easily penetrate.", correct: false, mark: 0, correctAnswer: "R115 239" });
        } else {
            newFeedback.push({ id: "q225", text: "Not answered", correct: false, mark: 0, correctAnswer: "R115 239" });
        }

        // Q2.3.1
        if ((answers.q231 || "").toString().toUpperCase().includes("18.00")) {
            total += 1;
            newFeedback.push({ id: "q231", text: "✅ Correct", correct: true, mark: 1 });
        } else {
            newFeedback.push({ id: "q231", text: "Not answered or incorrect", correct: false, mark: 0, correctAnswer: "$1 = R14.60" });
        }

        // Q2.3.2
        if ((answers.q232 || "").toString().toUpperCase().includes("BREAD") || (answers.q232 || "").toString().toUpperCase().includes("MILK")) {
            total += 1;
            newFeedback.push({ id: "q232", text: "✅ Correct", correct: true, mark: 1 });
        } else {
            newFeedback.push({ id: "q232", text: "Bread/Milk/Eggs/....", correct: false, mark: 0, correctAnswer: "Bread/Milk/Eggs/...." });
        }

        // Q2.3.3
        if ((answers.q233 || "").toString().toUpperCase().includes("LOWEST") || (answers.q233 || "").toString().toUpperCase().includes("GOVERNMENT")) {
            total += 2;
            newFeedback.push({ id: "q233", text: "✅ Correct", correct: true, mark: 2 });
        } else {
            newFeedback.push({ id: "q233", text: "Lowest price set by government above the market price", correct: false, mark: 0, correctAnswer: "Lowest price set by government above the market price" });
        }

        // Q2.3.4
        if ((answers.q234 || "").toString().toUpperCase().includes("DISCOURAGE") || (answers.q234 || "").toString().toUpperCase().includes("TAX")) {
            total += 2;
            newFeedback.push({ id: "q234", text: "✅ Correct", correct: true, mark: 2 });
        } else {
            newFeedback.push({ id: "q234", text: "Discourage the production,Taxes,households,demit goods", correct: false, mark: 0, correctAnswer: "Discourage the production,Taxes,households,demit goods" });
        }

        // Q2.3.5
        if ((answers.q235 || "").toString().toUpperCase().includes("DEMAND") && (answers.q235 || "").toString().toUpperCase().includes("DOLLAR")) {
            total += 4;
            newFeedback.push({ id: "q235", text: "✅ Correct", correct: true, mark: 4 });
        } else {
            newFeedback.push({ id: "q235", text: "Correct Answer:Demand for goods OR Maximum prices OR Decline.", correct: false, mark: 0, correctAnswer: "Demand for goods OR Maximum prices OR Decline." });
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
        if (ans311.includes("ADMINISTERED") || ans311.includes("HEADLINE") || ans311.includes("CORE") || ans311.includes("CPI")) {
            score3 += 2;
            newFeedback.push({ id: "q311", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans311.length > 0) {
            newFeedback.push({ id: "q311", text: "❌ Incorrect — Correct Answer:Headline(CPI),Core,Administered price.", correct: false, mark: 0, correctAnswer: "Headline(CPI),Core,Administered price" });
        } else {
            newFeedback.push({ id: "q311", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.1.2 (2)
        const ans312 = (answers.q312 || "").toString().toUpperCase();
        if (ans312.includes("HOUSEHOLDS") || ans312.includes("TOURISM") || ans312.includes("IMPROVED")) {
            score3 += 2;
            newFeedback.push({ id: "q312", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans312.length > 0) {
            newFeedback.push({ id: "q312", text: "❌ Incorrect — Correct Answer:Members of households earn income,households indirectly involved in tourism", correct: false, mark: 0, correctAnswer: "Members of households earn income,households indirectly involved in tourism" });
        } else {
            newFeedback.push({ id: "q312", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.1 (1)
        const ans321 = (answers.q321 || "").toString().toUpperCase();
        if (ans321.includes("2018")) {
            score3 += 1;
            newFeedback.push({ id: "q321", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans321.length > 0) {
            newFeedback.push({ id: "q321", text: "❌ Incorrect — Correct Answer: 2018.", correct: false, mark: 0, correctAnswer: "2018" });
        } else {
            newFeedback.push({ id: "q321", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.2 (1)
        const ans322 = (answers.q322 || "").toString().toUpperCase();
        if (ans322.includes("SOUTH AFRICAN RESERVE BANK") || ans322.includes("SARB")) {
            score3 += 1;
            newFeedback.push({ id: "q322", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans322.length > 0) {
            newFeedback.push({ id: "q322", text: "❌ Incorrect — Correct: SOUTH AFRICAN RESERVE BANK/SARB.", correct: false, mark: 0, correctAnswer: "SOUTH AFRICAN RESERVE BANK/SARB" });
        } else {
            newFeedback.push({ id: "q322", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.3 (2)
        const ans323 = (answers.q323 || "").toString().toUpperCase();
        if (ans323.includes("INFLATION") || ans323.includes("PEOPLE") || ans323.includes("MONEY")) {
            score3 += 2;
            newFeedback.push({ id: "q323", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans323.length > 0) {
            newFeedback.push({ id: "q323", text: "❌ Incorrect — Correct: It is a type of inflation whereby prices rise so rapidly that people lose confidence in the value of money", correct: false, mark: 0, correctAnswer: "It is a type of inflation whereby prices rise so rapidly that people lose confidence in the value of money" });
        } else {
            newFeedback.push({ id: "q323", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.4 (2)
        const ans324 = (answers.q324 || "").toString().toUpperCase();
        if (ans324.includes("INFLATION") || ans324.includes("MONETARY") || ans324.includes("MEASURE")) {
            score3 += 2;
            newFeedback.push({ id: "q324", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans324.length > 0) {
            newFeedback.push({ id: "q324", text: "❌ Incorrect — Correct: To determine whether the inflation rate and helps policy makers to make informed decisions..", correct: false, mark: 0, correctAnswer: "To determine whether the inflation rate and helps policy makers to make informed decisions.." });
        } else {
            newFeedback.push({ id: "q324", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.2.5 (4)
        const ans325 = (answers.q325 || "").toString().toUpperCase();
        if (ans325.includes("2,3") || ans325.includes("2") || ans325.includes("2,3%") || ans325.includes("3")) {
            score3 += 4;
            newFeedback.push({ id: "q325", text: "✅ Correct (4)", correct: true, mark: 4 });
        } else if (ans325.length > 0) {
            newFeedback.push({ id: "q325", text: "❌ Incorrect — Correct:  2.3% OR 2%.", correct: false, mark: 0, correctAnswer: " 2.3% OR 2%" });
        } else {
            newFeedback.push({ id: "q325", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.1 (1)
        const ans331 = (answers.q331 || "").toString().toUpperCase();
        if (ans331.includes("CULTURAL") && ans331.includes("Q2")) {
            score3 += 1;
            newFeedback.push({ id: "q331", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans331.length > 0) {
            newFeedback.push({ id: "q331", text: "❌ Incorrect — Correct:  Cultural.", correct: false, mark: 0, correctAnswer: "Cultural" });
        } else {
            newFeedback.push({ id: "q331", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.2 (1)
        const ans332 = (answers.q332 || "").toString().toUpperCase();
        if (ans332.includes("MAPUNGUBWE") || ans332.includes("ISIMANGALISO") || ans332.includes("ROBBEN") || ans332.includes("CRANDLE") || ans332.includes("BARBERTON")) {
            score3 += 1;
            newFeedback.push({ id: "q332", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans332.length > 0) {
            newFeedback.push({ id: "q332", text: "❌ Incorrect — Correct: Mapungubwe,Vredefort Dome,......", correct: false, mark: 0, correctAnswer: "Mapungubwe,Vredefort Dome,......" });
        } else {
            newFeedback.push({ id: "q332", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.3 (2)
        const ans333 = (answers.q333 || "").toString().toUpperCase();
        if (ans333.includes("BUSINESS") || ans333.includes("TRAVELLING") || ans333.includes("ENVIRONMENT")) {
            score3 += 2;
            newFeedback.push({ id: "q333", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans333.length > 0) {
            newFeedback.push({ id: "q333", text: "❌ Incorrect — Correct:The activity of people travelling to and staying in places outside their usual environment", correct: false, mark: 0, correctAnswer: "The activity of people travelling to and staying in places outside their usual environment" });
        } else {
            newFeedback.push({ id: "q333", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.4 (2)
        const ans334 = (answers.q334 || "").toString().toUpperCase();
        if (ans334.includes("TOURISM") || ans334.includes("TAX") || ans334.includes("SMME") || ans334.includes("EXCHANGE")) {
            score3 += 2;
            newFeedback.push({ id: "q334", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans334.length > 0) {
            newFeedback.push({ id: "q334", text: "❌ Incorrect — Correct:Tax base for the government,Tourism helps the government & Enables government to achieve", correct: false, mark: 0, correctAnswer: "Tax base for the government,Tourism helps the government & Enables government to achieve" });
        } else {
            newFeedback.push({ id: "q334", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.3.5 (4)
        const ans335 = (answers.q335 || "").toString().toUpperCase();
        if (ans335.includes("CRIME") || ans335.includes("TOURISM") || ans335.includes("DECREASE") || ans335.includes("DESTINATION") || ans335.includes("VISITS")) {
            score3 += 4;
            newFeedback.push({ id: "q335", text: "✅ Correct (4)", correct: true, mark: 4 });
        } else if (ans335.length > 0) {
            newFeedback.push({ id: "q335", text: "❌ Incorrect — Correct: High crime,Tourism industry will shed jobs", correct: false, mark: 0, correctAnswer: " High crime,Tourism industry will shed jobs" });
        } else {
            newFeedback.push({ id: "q335", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.4 (8)
        const ans34 = (answers.q34 || "").toString().toUpperCase();
        if (ans34.includes("INCREASED") || ans34.includes("LESS") || ans34.includes("IMPROVED") || ans34.includes("SOUTH") || ans34.includes("VISAS") || ans34.includes("HOSTING") || ans34.includes("DEPRECIATION")) {
            score3 += 8;
            newFeedback.push({ id: "q34", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans34.length > 0) {
            newFeedback.push({ id: "q34", text: "❌ Incorrect — Increased disposable income, Less working hours allow South Africans more time, Improved transport, communication and accommodation, Travelling for business purposes has increased", correct: false, mark: 0, correctAnswer: "Increased disposable income, Less working hours allow South Africans more time, Improved transport, communication and accommodation, Travelling for business purposes has increased" });
        } else {
            newFeedback.push({ id: "q34", text: "Not answered", correct: false, mark: 0 });
        }

        // Q3.5 (8)
        const ans35 = (answers.q35 || "").toString().toUpperCase();
        if (ans35.includes("PRODUCTION") || ans35.includes("INCREASED") || ans35.includes("INVESTORS") || ans35.includes("IMPORT") || ans35.includes("EXPORTS") || ans35.includes("COSTS") || ans35.includes("BUSINESSES")) {
            score3 += 8;
            newFeedback.push({ id: "q35", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans35.length > 0) {
            newFeedback.push({ id: "q35", text: "❌ Incorrect — Production of goods and services, Unemployment will increase as businesses, Producers increase the prices of their goods, High costs of crude oil will lead to an increase", correct: false, mark: 0, correctAnswer: "Production of goods and services, Unemployment will increase as businesses, Producers increase the prices of their goods, High costs of crude oil will lead to an increase" });
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
        if (ans411.includes("EDUCATION") || ans411.includes("HEALTH CARE") || ans411.includes("SAFETY") || ans411.includes("DISASTER MANAGEMENT") || ans411.includes("DUMPING")) {
            s4 += 2;
            newFeedback.push({ id: "q411", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans411.length > 0) {
            newFeedback.push({ id: "q411", text: "❌ Incorrect — Acceptable: Education,Health Care,Safety,Disaster Management", correct: false, mark: 0, correctAnswer: "Education,Health Care,Safety,Disaster Management" });
        } else {
            newFeedback.push({ id: "q411", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.1.2 (2)
        const ans412 = (answers.q412 || "").toString().toUpperCase();
        if (ans412.includes("DECREASE") || ans412.includes("RATE") || ans412.includes("LOWER") || ans412.includes("PRODUCTION")) {
            s4 += 2;
            newFeedback.push({ id: "q412", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans412.length > 0) {
            newFeedback.push({ id: "q412", text: "❌ Incorrect — Correct:  Decrease interest rate & Lower interest rate may reduce cost of production", correct: false, mark: 0, correctAnswer: "Decrease interest rate & Lower interest rate may reduce cost of production" });
        } else {
            newFeedback.push({ id: "q412", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.1 (1) mps = 0.2
        const ans421 = (answers.q421 || "").toString().trim();
        if (ans421 === "C") {
            s4 += 1;
            newFeedback.push({ id: "q421", text: "✅ Correct (1) C", correct: true, mark: 1 });
        } else if (ans421.length > 0) {
            newFeedback.push({ id: "q421", text: "❌ Incorrect — Correct: C", correct: false, mark: 0, correctAnswer: "C" });
        } else {
            newFeedback.push({ id: "q421", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.2 (1) leakage foreign sector = imports
        const ans422 = (answers.q422 || "").toString().toUpperCase();
        if (ans422.includes("UNIQUE")|| ans422.includes("SUBSTITUTES")) {
            s4 += 1;
            newFeedback.push({ id: "q422", text: "✅ Correct (1)", correct: true, mark: 1 });
        } else if (ans422.length > 0) {
            newFeedback.push({ id: "q422", text: "❌ Incorrect — Correct: Unique/has no close substitutes", correct: false, mark: 0, correctAnswer: "Unique/has no close substitutes" });
        } else {
            newFeedback.push({ id: "q422", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.3 (2) autonomous consumption
        const ans423 = (answers.q423 || "").toString().toUpperCase();
        if (ans423.includes("MONOPOLY") || ans423.includes("POWERFUL")|| ans423.includes("EXCLUSIVE") || ans423.includes("FIXED")) {
            s4 += 2;
            newFeedback.push({ id: "q423", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans423.length > 0) {
            newFeedback.push({ id: "q423", text: "❌ Incorrect — Correct:  Monopoly that exists/Powerful economies of scale/exclusive access natural resources/high fixed cost", correct: false, mark: 0, correctAnswer: "Monopoly that exists/Powerful economies of scale/exclusive access natural resources/high fixed cost" });
        } else {
            newFeedback.push({ id: "q423", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.4 (2) importance of savings
        const ans424 = (answers.q424 || "").toString().toUpperCase();
        if (ans424.includes("MONOPOLY") || ans424.includes("ECONOMIC") || ans424.includes("PATENTS") || ans424.includes("MARKET")) {
            s4 += 2;
            newFeedback.push({ id: "q424", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans424.length > 0) {
            newFeedback.push({ id: "q424", text: "❌ Incorrect — Correct: Monopoly is price setter Or monopoly market has barriers to entry", correct: false, mark: 0, correctAnswer: "Monopoly is price setter Or monopoly market has barriers to entry" });
        } else {
            newFeedback.push({ id: "q424", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.2.5 (4) multiplier K=5 if mpc=0.8
        const ans425 = (answers.q425 || "").value.trim().replace("R", "").replace(",", "").replace(" ", "");
        // Accept if they included 5 and the working 1/(1-0.8)=5
        if (ans425 === "-5000") {
            s4 += 4;
            newFeedback.push({ id: "q425", text: "✅ Correct (4) Economic loss = -R 5 000", correct: true, mark: 4 });
        } else if (ans425.length > 0) {
            newFeedback.push({ id: "q425", text: "❌ Incorrect — Correct:: Economic loss = -R 5 000", correct: false, mark: 0, correctAnswer: "Economic loss = -R 5 000" });
        } else {
            newFeedback.push({ id: "q425", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.1 (1) policy = NIPF
        const ans431 = (answers.q431 || "").toString().toUpperCase();
        if (ans431.includes("WAGES")) {
            s4 += 1;
            newFeedback.push({ id: "q431", text: "✅ Correct (1) — WAGES", correct: true, mark: 1 });
        } else if (ans431.length > 0) {
            newFeedback.push({ id: "q431", text: "❌ Incorrect — Correct:WAGES", correct: false, mark: 0, correctAnswer: "WAGES" });
        } else {
            newFeedback.push({ id: "q431", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.2 (1) other incentive examples
        const ans432 = (answers.q432 || "").toString().toUpperCase();
        if (ans432.includes("CPI") || ans432.includes("WEIGHTING") || ans432.includes("INFLATION") || ans432.includes("IMPLICIT") || ans432.includes("PPI")) {
            s4 += 1;
            newFeedback.push({ id: "q432", text: "✅ Correct (1) — incentive example", correct: true, mark: 1 });
        } else if (ans432.length > 0) {
            newFeedback.push({ id: "q432", text: "❌ Incorrect — Correct Answer: Indexes(CPI and PPI),Weighting,Inflation rate and Implicit GDP deflator", correct: false, mark: 0, correctAnswer: "Indexes(CPI and PPI),Weighting,Inflation rate and Implicit GDP deflator" });
        } else {
            newFeedback.push({ id: "q432", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.3 (2) SEZs
        const ans433 = (answers.q433 || "").toString().toUpperCase();
        if (ans433.includes("INFLATION") || ans433.includes("SIGNIFICANT") || ans433.includes("TIME")) {
            s4 += 2;
            newFeedback.push({ id: "q433", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans433.length > 0) {
            newFeedback.push({ id: "q433", text: "❌ Incorrect — Correct: Inflation is a sustained and Significant increase in general price", correct: false, mark: 0, correctAnswer: "Inflation is a sustained and Significant increase in general price" });
        } else {
            newFeedback.push({ id: "q433", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.4 (2) oil prices -> higher costs, lower profits, discourage investment
        const ans434 = (answers.q434 || "").toString().toUpperCase();
        if (ans434.includes("PRODUCERS") || ans434.includes("PROFIT") || ans434.includes("BUSINESSES") || ans434.includes("PRODUCTION")) {
            s4 += 2;
            newFeedback.push({ id: "q434", text: "✅ Correct (2)", correct: true, mark: 2 });
        } else if (ans434.length > 0) {
            newFeedback.push({ id: "q434", text: "❌ Incorrect — Correct: Producers will earn less revenue,and may leave market", correct: false, mark: 0, correctAnswer: "Producers will earn less revenue,and may leave market" });
        } else {
            newFeedback.push({ id: "q434", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.3.5 (4) infrastructure importance
        const ans435 = (answers.q435 || "").toString().toUpperCase();
        if (ans435.includes("INVEST") || ans435.includes("LIVELIHOOD") || ans435.includes("JOBS") || ans435.includes("LIVING") || ans435.includes("CULTURE") || ans435.includes("URBAN")) {
            s4 += 4;
            newFeedback.push({ id: "q435", text: "✅ Correct (4)", correct: true, mark: 4 });
        } else if (ans435.length > 0) {
            newFeedback.push({ id: "q435", text: "❌ Incorrect — Correct: Attracts investment, jobs, better living standards", correct: false, mark: 0, correctAnswer: "Attracts investment, jobs, better living standards" });
        } else {
            newFeedback.push({ id: "q435", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.4 (8) population growth & life expectancy
        const ans44 = (answers.q44 || "").toString().toUpperCase();
        if (((ans44.includes("DECREASE") || ans44.includes("IMPORTED") || ans44.includes("SPENDING") || ans44.includes("FINANCE")) &&
            (ans44.includes("TAXATION") || ans44.includes("DISPOSAL") || ans44.includes("EXPECT") || ans44.includes("INSURANCE") || ans44.includes("SERVICES")))) {
            s4 += 8;
            newFeedback.push({ id: "q44", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans44.length > 0) {
            newFeedback.push({ id: "q44", text: "❌ Incorrect — Correct: Increasing the level of taxation,Implementing or increasing.", correct: false, mark: 0, correctAnswer: "Increasing the level of taxation,Implementing or increasing" });
        } else {
            newFeedback.push({ id: "q44", text: "Not answered", correct: false, mark: 0 });
        }

        // Q4.5 (8) reduce imports
        const ans45 = (answers.q45 || "").toString().toUpperCase();
        if (ans45.includes("LACK") || ans45.includes("CONSUMERS") || ans45.includes("SERVICES") || ans45.includes("PRODUCTIVITY") || ans45.includes("PRODUCTIONS") || ans45.includes("OCCUPATIONS") || ans45.includes("EDUCATED") || ans45.includes("REALLOCATED") || ans45.includes("TECHNOLOGY") || ans45.includes("DEVALU")) {
            s4 += 8;
            newFeedback.push({ id: "q45", text: "✅ Correct (8)", correct: true, mark: 8 });
        } else if (ans45.length > 0) {
            newFeedback.push({ id: "q45", text: "❌ Incorrect — Correct: Lack of Information,Consumers do not have perfect information and Labour takes time to move", correct: false, mark: 0, correctAnswer: "Lack of Information,Consumers do not have perfect information and Labour takes time to move" });
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
            <h2>Economics / P2 - Section A (Compulsory)</h2>

            <div className="header-row">
                <div className="p2">QUESTION 1</div>
                <div className="p1">30 MARKS – 20 MINUTES</div>
            </div>
            {/* Timer Display */}
            <h2 style={{textAlign: "center", marginBottom: "20px"}}>
                Time Remaining: {formatTime(timeLeft)}
            </h2>
            <form id="examForm" onSubmit={(e) => e.preventDefault()}>

                {/* Question 1.1.1 */}
                <div className="question">
                    <p>
                        1.1.1<span style={{marginLeft: "30px"}}></span>
                        A firm will shut down if it cannot cover the … costs.
                    </p>
                    <div className="options" style={{marginLeft: "63px"}}>
                        <label><input type="radio" name="q1" value="A" onChange={handleChange}/> A. explicit</label>
                        <label><input type="radio" name="q1" value="B" onChange={handleChange}/> B. marginal</label>
                        <label><input type="radio" name="q1" value="C" onChange={handleChange}/> C. fixed</label>
                        <label><input type="radio" name="q1" value="D" onChange={handleChange}/> D. variable</label>
                    </div>
                </div>

                {/* Question 1.1.2 */}
                <div className="question">
                    <p>
                        1.1.2<span style={{marginLeft: "30px"}}></span>
                        The demand curve that is relatively elastic relates to a … market.
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q2" value="A" onChange={handleChange}/> A. monopoly
                        </label>
                        <label><input type="radio" name="q2" value="B" onChange={handleChange}/> B. perfect
                        </label>
                        <label><input type="radio" name="q2" value="C" onChange={handleChange}/> C. oligopoly
                        </label>
                        <label><input type="radio" name="q2" value="D" onChange={handleChange}/> D. monopolistic
                        </label>
                    </div>
                </div>

                {/* Question 1.1.3 */}
                <div className="question">
                    <p>
                        1.1.3<span style={{marginLeft: "30px"}}></span>
                        In the oligopoly market, the firm will make a/an … in the long run.
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q3" value="A" onChange={handleChange}/> A. normal
                            profit</label>
                        <label><input type="radio" name="q3" value="B" onChange={handleChange}/> B. economic
                            profit</label>
                        <label><input type="radio" name="q3" value="C" onChange={handleChange}/> C. economic
                            loss</label>
                        <label><input type="radio" name="q3" value="D" onChange={handleChange}/> D. zero profit</label>
                    </div>
                </div>

                {/* Question 1.1.4 */}
                <div className="question">
                    <p>
                        1.1.4<span style={{marginLeft: "30px"}}></span>
                        When a business fails to produce the optimum output at the lowest
                        possible cost, it is known as … inefficiency.

                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q4" value="A" onChange={handleChange}/> A. productive</label>
                        <label><input type="radio" name="q4" value="B" onChange={handleChange}/> B. allocative</label>
                        <label><input type="radio" name="q4" value="C" onChange={handleChange}/> C. consumer
                        </label>
                        <label><input type="radio" name="q4" value="D" onChange={handleChange}/> D. Pareto</label>
                    </div>
                </div>

                {/* Question 1.1.5 */}
                <div className="question">
                    <p>
                        1.1.5<span style={{marginLeft: "30px"}}></span>
                        When the economy is experiencing a low growth, high
                        unemployment and high inflation, it is called …

                    </p>
                    <div className="options" style={{marginLeft: "60px"}}>
                        <label><input type="radio" name="q5" value="A" onChange={handleChange}/> A. administered price
                        </label>
                        <label><input type="radio" name="q5" value="B" onChange={handleChange}/> B. stagflation
                        </label>
                        <label><input type="radio" name="q5" value="C" onChange={handleChange}/> C. hyperinflation
                        </label>
                        <label><input type="radio" name="q5" value="D" onChange={handleChange}/> D. producer price index
                        </label>
                    </div>
                </div>

                {/* Question 1.1.6 */}
                <div className="question">
                    <p>
                        1.1.6<span style={{marginLeft: "30px"}}></span>
                        Tourists who engage in activities in the natural environment of the
                        place that they visit, is called … tourism.</p>
                    <div className="options" style={{marginLeft: "60px"}}>
                        <label><input type="radio" name="q6" value="A" onChange={handleChange}/> A. foreign</label>
                        <label><input type="radio" name="q6" value="B" onChange={handleChange}/> B. outbound
                        </label>
                        <label><input type="radio" name="q6" value="C" onChange={handleChange}/> C. eco-</label>
                        <label><input type="radio" name="q6" value="D" onChange={handleChange}/> D. domestic
                        </label>
                    </div>
                </div>

                {/* Question 1.1.7 */}
                <div className="question">
                    <p>
                        1.1.7<span style={{marginLeft: "30px"}}></span>
                        Measures taken to ensure that non-renewable resources are not
                        threatened by extinction are known as …

                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q7" value="A" onChange={handleChange}/> A. preservation
                        </label>
                        <label><input type="radio" name="q7" value="B" onChange={handleChange}/> B. intervention
                        </label>
                        <label><input type="radio" name="q7" value="C" onChange={handleChange}/> C. accumulation
                        </label>
                        <label><input type="radio" name="q7" value="D" onChange={handleChange}/> D. conservation
                        </label>
                    </div>
                </div>

                {/* Question 1.1.8 */}
                <div className="question">
                    <p>
                        1.1.8<span style={{marginLeft: "30px"}}></span>
                        The international agreement that manages the disposal of chemical
                        waste is called the …
                    </p>
                    <div className="options" style={{marginLeft: "65px"}}>
                        <label><input type="radio" name="q8" value="A" onChange={handleChange}/> A. Basel Convention
                        </label>
                        <label><input type="radio" name="q8" value="B" onChange={handleChange}/> B. Kyoto Protocol.
                        </label>
                        <label><input type="radio" name="q8" value="C" onChange={handleChange}/> C. Stockholm Protocol
                        </label>
                        <label><input type="radio" name="q8" value="D" onChange={handleChange}/> D. Convention of
                            International Trade in Endangered Species</label>
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
                            <td>1.2.1 Implicit costs</td>
                            <td>the introduction of harmful substances into the environment
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.2 Long run</td>
                            <td>B forms part of monetary policy used to control the supply of money
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.3 Oligopoly</td>
                            <td>C a period of production in which all the factors of production can be varied
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.4 Missing markets</td>
                            <td>D when the private sector fails to provide certain goods and services
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.5 Open-market transaction</td>
                            <td>E a market structure where few large sellers operate</td>
                        </tr>
                        <tr>
                            <td>1.2.6 Domestic tourism</td>
                            <td>F the value of inputs owned by the entrepreneur and used in the production
                                process, such as opportunity cost
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.7 Pollution</td>
                            <td>G an amount that a firm earns for every unit sold
                            </td>
                        </tr>
                        <tr>
                            <td>1.2.8 Global warming</td>
                            <td>H the gradual overall increase in the temperature of the Earth's atmosphere
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>I South African citizens travelling within the borders of the country</td>
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
                        "A situation where average cost rises as production increases",
                        "The additional revenue earned when sales increase by one more unit",
                        "A technique used by the government to determine whether a \n" +
                        "project is beneficial to the society or not",
                        " General increase in prices that occurs when the aggregate demand \n" +
                        "for goods and services exceeds the aggregate supply",
                        "Tourists travelling through South Africa using air, road, rail and sea \n" +
                        "transport to get to another destination\n",
                        "Taking care of the environment to ensure that the needs of the \n" +
                        "present and future generations are met "
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
                        2.1.1 Name TWO types of collusion.
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
                        2.1.2 Why does the government provide subsidies to producers?{" "}
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

                    <p>2.2.1 Identify a non-price strategy shown by the above information (1)</p>
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

                    <p>2.2.2 Name ONE example of a monopolistic competitive industry. (1)</p>
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

                    <p>2.2.3 Briefly describe the term patent. (2)</p>
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

                    <p>2.2.4 Why are prices in a monopolistically competitive market lower than
                        the prices of a monopoly?(2)</p>
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

                    <p>2.2.5 Explain the benefits of product differentiation to producers of goods
                        and services.</p>
                    <input
                        name="q225"
                        placeholder="Enter your asnwer"
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
                    <p>2.3.1 Identify the market price in the graph above. (1)</p>
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
                    <p>2.3.2 Name any ONE product on which the government can impose a
                        maximum price.(1)</p>
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
                    <p>2.3.3 Briefly describe the term minimum price.(2)</p>
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
                    <p>2.3.4 Why would the government intervene in the market by levying
                        taxes on demerit goods? (2)</p>
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
                    <p>2.3.5 How would maximum prices influence the economy?</p>
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
                    <p>2.4 Use the graph below to explain the effect of negative externality on the
                        market. (8)</p>
                    <div className="image-container">
                        <img src={pic} alt="Example" className="center-image"/>
                    </div>
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
                    <p>2.5How does mutual dependence influence the behaviour/actions of firms in the
                        oligopoly market? (8)</p>
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
                            <span style={{marginLeft: 35}}></span>Name any TWO types of consumer inflation.
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
                            <span style={{marginLeft: 35}}></span>How do households benefit from tourism?
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
                            <span style={{marginLeft: 32}}></span>Identify the base year in the table above.
                            the cartoon above.
                            <span style={{marginLeft: 110}}></span>(1)
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
                            <span style={{marginLeft: 32}}></span>Name the institution that is responsible for
                            controlling inflation in
                            South Africa.
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
                            <span style={{marginLeft: 35}}></span>Briefly describe the term hyperinflation.
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
                            <span style={{marginLeft: 35}}></span>Explain the importance of measuring inflation in the
                            economy?
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
                            <span style={{marginLeft: 30}}></span>Use the information in the table above to calculate
                            the inflation rate
                            from 2020 to 2021.
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
                            <span style={{marginLeft: 32}}></span>Identify a type of tourism that gives an opportunity
                            to experience
                            traditions in a community.
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
                            <span style={{marginLeft: 32}}></span>Name any ONE World Heritage Site in South Africa.
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
                            <span style={{marginLeft: 35}}></span>Briefly describe the term tourism.
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
                            <span style={{marginLeft: 35}}></span>Why is tourism growth important to the government?
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
                            <span style={{marginLeft: 30}}></span>How can crime as a socio-economic issue negatively
                            influence the
                            tourism sector?
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
                            3.4 <span style={{marginLeft: 35}}></span>Discuss the reasons for the growth of the tourism
                            industry in South Africa.
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
                            3.5 <span style={{marginLeft: 35}}></span>How would an increase in the prices of imported
                            key inputs, such as oil, affect
                            the domestic economy?
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
                        <span style={{marginLeft: "35px"}}>Name any TWO examples of merit goods.</span>
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
                        Explain the effect of a decrease in the interest rate on inflation.
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
                        <span style={{marginLeft: "32px"}}>Identify the loss minimising (equilibrium) point in the graph above.</span>
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
                        <span style={{marginLeft: "32px"}}>What is the nature of the product sold in a monopoly? </span>
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
                        <span style={{marginLeft: "35px"}}>Briefly describe the term natural monopoly</span>
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
                        <span style={{marginLeft: "35px"}}>Why does a monopoly usually make an economic profit in the long run?</span>
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
                    Use the information in the graph above to calculate the economic  <br/>
                        <span style={{marginLeft: "125px"}}></span>loss made by the firm. Show ALL calculations.
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
                    <p>4.3 Study the cartoon below and answer the questions that follow.</p>
                    <div className="image-container">
                        <img src={q43} alt="Example" className="center-image"/>
                    </div>

                    <p>
                        <span style={{marginLeft: "60px"}}>4.3.1</span>
                        <span style={{marginLeft: "32px"}}>
                  Identify the cause of cost-push inflation in the cartoon above.
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
           Name ONE way that is used to measure inflation.<br/>
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
                            style={{marginLeft: "35px"}}>Briefly describe the term inflation. </span>
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
                        <span style={{marginLeft: "35px"}}>Explain the effect of a decrease in the general price level on produces. </span>
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
                  How can the government use the fiscal policy to combat demand-pull inflation?
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
                        4.4 <span style={{marginLeft: "35px"}}></span> Briefly discuss lack of information and
                        immobility of factors of production as
                        causes of market failure.
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
                        How would an increase in tourism activities negatively impact on the environment?
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
                        With the aid of three separate graphs, discuss the short-run equilibrium positions
                        (economic profit, economic loss and normal profit) in a perfect market.
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
                        Analyse the advantages of perfect competition as a market structure.
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
                        Discuss in detail the measures taken by the government to ensure environmental
                        sustainability.
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
                        Evaluate the success of international agreements in reducing climate change
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
                                    <li> Overt/explicit/formal</li>
                                    <li> Tacit/implicit/informal</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup212" && (
                            <>
                                <h3>Solution 2.1.2</h3>
                                <p>Subsidies reduce the cost of production which will encourage
                                    producers to increase production of certain goods.</p>
                            </>
                        )}
                        {popupId === "popup221" && (
                            <>
                                <h3>Solution 2.2.1</h3>
                                <p>Door-to-door delivery / online orders / packaging / branding / advertising</p>
                            </>
                        )}
                        {popupId === "popup222" && (
                            <>
                                <h3>Solution 2.2.2</h3>
                                <ul>
                                    <li> Fast Food outlets</li>
                                    <li> Medical Doctors</li>
                                    <li> Clothing shops</li>
                                    <li> Lawyers</li>
                                    <li> Restaurants</li>
                                    <li> Retail outlets</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup223" && (
                            <>
                                <h3>Solution 2.2.3</h3>
                                <p>A legal right that allows the holder to exclusively produce/manufacture
                                    a product for a certain period. / An exclusive right granted to an
                                    inventor that protect intellectual property.</p>
                            </>
                        )}
                        {popupId === "popup224" && (
                            <>
                                <h3>Solution 2.2.4</h3>
                                <ul>
                                    <ul>
                                        <li> Monopolistically competitive market has greater competition because there
                                            are many businesses.
                                        </li>
                                        <li> Monopoly market has higher prices because it is a single supplier of a
                                            product or service.
                                        </li>
                                        <li> Monopoly sells a unique product with no close substitutes.</li>
                                    </ul>
                                </ul>
                            </>
                        )}
                        {popupId === "popup225" && (
                            <>
                                <h3>Solution 2.2.5</h3>
                                <ul>
                                    <li> Producers will benefit because their products will be easily recognisable from
                                        similar products of other businesses
                                    </li>
                                    <li> When consumers are able to identify with the product, brand loyalty is
                                        developed which will benefit the producer.
                                    </li>
                                    <li> Producers will earn more revenue/profit from goods that show a relatively
                                        inelastic demand..
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup231" && (
                            <>
                                <h3>Solution 2.3.1</h3>
                                <p>= R18</p>
                            </>
                        )}
                        {popupId === "popup232" && (
                            <>
                                <h3>Solution 2.3.2</h3>
                                <ul>
                                    <li> Bread</li>
                                    <li> Milk</li>
                                    <li> Eggs</li>
                                    <li> Mealie meal</li>
                                    <li> Paraffin</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup233" && (
                            <>
                                <h3>Solution 2.3.3</h3>
                                <p>
                                    A lowest price set by the government above the market price to allow
                                    producers to make a fair profit.
                                </p>
                            </>
                        )}
                        {popupId === "popup234" && (
                            <>
                                <h3>Solution 2.3.4</h3>
                                <ul>
                                    <li> To discourage the production and/or consumption of demerit goods.</li>
                                    <li> Taxes help increase the prices of the goods thereby making them expensive for
                                        households to buy
                                    </li>
                                    <li> To discourage the importation of demerit goods</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup235" && (
                            <>
                                <h3>Solution 2.3.5</h3>
                                <ul>
                                    <li> Consumers demand more goods (1200) due to low prices and producers supply less
                                        (500)
                                    </li>
                                    <li> Excess demand for goods will result in a shortage of goods which
                                        means that consumers may fail to access the product in the
                                        market (1200 – 500 = 700)
                                    </li>
                                    <li> Maximum prices can result in black markets where producers will supply goods at
                                        high prices.
                                    </li>
                                    <li> Decline in tax revenue because sellers in the black market do not pay tax</li>
                                    <li> Decrease in production of the product may result in loss of jobs and slow down
                                        economic growth
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup24" && (
                            <>
                                <h3>Solution 2.4</h3>
                                <ul>
                                    <li> When the market is left to its own devices, a quantity Q will be produced at
                                        price P.
                                    </li>
                                    <li> Market equilibrium point ‘e’ represents social inefficiency because MPC is
                                        equal to MPB.
                                    </li>
                                    <li> When the external cost (negative externality) is taken into account the cost of
                                        production will increase and the supply curve will shift from SS (MPC) to
                                        S1S1 (MSC).
                                    </li>
                                    <li> A higher price P1 will be charged for goods with negative externality and lower
                                        quantity Q1 will be produced.
                                    </li>
                                    <li> At equilibrium point e1 the quantity produced represents social efficiency
                                        because MSC is equal to the price.
                                    </li>
                                    <li> The shaded area represents the negative externality (welfare loss) to the
                                        society.
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup25" && (
                            <>
                                <h3>Solution 2.5</h3>
                                <ul>
                                    <li> Mutual dependence results in businesses monitoring other firms because the
                                        actions of one influence others.
                                    </li>
                                    <li> When one firm launches a sales promotion initiative other firms will do the
                                        same to retain their customers
                                    </li>
                                    <li> Price wars may occur if one firm reacts to a price reduction of another firm.
                                    </li>
                                    <li> Continuous reaction to price decreases will drive prices down towards a cost of
                                        production which may force firms out of the market.
                                    </li>
                                    <li> To avoid price wars oligopolists will charge a price at the kink of the demand
                                        curve.
                                    </li>
                                    <li> To improve profits or reduce uncertainties in their behaviour, oligopolists
                                        tend to collude with others.
                                    </li>
                                    <li> When one firm decides to increase the price, other businesses may keep their
                                        prices constant resulting in the loss of market share as well total
                                        revenue.
                                    </li>
                                    <li> Oligopolistic firms will use non-price strategy such as advertising to increase
                                        market share.
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup311" && (
                            <>
                                <h3>Solution 3.1.1</h3>
                                <ul>
                                    <li> Headline (CPI)</li>
                                    <li> Core</li>
                                    <li> Administered price</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup312" && (
                            <>
                                <h3>Solution 3.1.2</h3>
                                <ul>
                                    <li> Members of households earn income directly from the tourism sector as tour
                                        operators, travel agents.
                                    </li>
                                    <li> Many households are indirectly involved in tourism as employees.</li>
                                    <li> Entrepreneurs from households that operate as curio producers or musicians can
                                        earn income from tourism
                                    </li>
                                    <li> A large number of households acquire skills in the tourism industry</li>
                                    <li> Tourism encourages rural development because many tourist attractions are
                                        located in rural areas
                                    </li>
                                    <li> Local people benefit from improved infrastructure that was meant for tourists
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup321" && (
                            <>
                                <h3>Solution 3.2.1</h3>
                                <p>2018</p>
                            </>
                        )}
                        {popupId === "popup322" && (
                            <>
                                <h3>Solution 3.2.2</h3>
                                <p>The South African Reserve Bank (SARB)</p>
                            </>
                        )}
                        {popupId === "popup323" && (
                            <>
                                <h3>Solution 3.2.3</h3>
                                <p>It is a type of inflation whereby prices rise so rapidly that people
                                    lose confidence in the value of money. / Occurs when the inflation
                                    rate is so high that it can be described as out of control </p>
                            </>
                        )}
                        {popupId === "popup324" && (
                            <>
                                <h3>Solution 3.2.4</h3>
                                <ul>
                                    <li> To determine whether the inflation rate is still within the target range</li>
                                    <li> It helps policy makers to make informed decisions relating to monetary
                                        policy.
                                    </li>
                                    <li> To measure the cost of living which is used for collective bargaining.</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup325" && (
                            <>
                                <h3>Solution 3.2.5</h3>
                                <ul>
                                    <p>(109,5 – 107/107) x (100/1)<br/>
                                        = 2,3% / 2% </p>
                                </ul>
                            </>
                        )}
                        {popupId === "popup331" && (
                            <>
                                <h3>Solution 3.3.1</h3>
                                <p>Cultural</p>
                            </>
                        )}
                        {popupId === "popup332" && (
                            <>
                                <h3>Solution 3.3.2</h3>
                                <ul>
                                    <li> Mapungubwe</li>
                                    <li> Vredefort Dome</li>
                                    <li> Sterkfontein caves / Cradle of human-kind</li>
                                    <li> Robben Island</li>
                                    <li> iSimingaliso / Greater St Lucia wetland park</li>
                                    <li> uKhahlamba-Drakensburg Park</li>
                                    <li> Khomani Cultural Landscape</li>
                                    <li> Cape Fynbos region / Table Mountain</li>
                                    <li> Richtersveld Cultural and Botanical Landscape</li>
                                    <li> Barberton Makhonjwa Mountains</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup333" && (
                            <>
                                <h3>Solution 3.3.3</h3>
                                <p>The activity of people travelling to and staying in places outside
                                    their usual environment for no more than one year for leisure,
                                    business or other purpose</p>
                            </>
                        )}
                        {popupId === "popup334" && (
                            <>
                                <h3>Solution 3.3.4</h3>
                                <ul>
                                    <li> The tax base for the government will expand which will increase the tax
                                        revenue. For example, through increased airport
                                        departures taxes, air ticket taxes and taxes on hotel rooms.
                                    </li>
                                    <li> Tourism helps the government to reduce poverty and unemployment at no or little
                                        cost.
                                    </li>
                                    <li> Tourism may help to create a positive image or international relations and
                                        attract foreign investments.
                                    </li>
                                    <li> Enables government to achieve its socio-economic objectives of informal sector
                                        growth, black economic empowerment and
                                        SMME development
                                    </li>
                                    <li> Helps to generate foreign exchange in the country</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup335" && (
                            <>
                                <h3>Solution 3.3.5</h3>
                                <ul>
                                    <li> High crime levels give a negative perception of the country as a tourism
                                        destination hence discouraging tourists.
                                    </li>
                                    <li> The profits in the tourism industry will fall due to a decrease in the number
                                        of visits
                                    </li>
                                    <li> The tourism industry will shed jobs as a result of a decrease in tourism
                                        activities
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup34" && (
                            <>
                                <h3>Solution 3.4</h3>
                                <ul>
                                    <li> Increased disposable income leaves people with money to spend on tourism
                                        activities
                                    </li>
                                    <li> Less working hours allow South Africans more time to travel as many people
                                        travel during public holidays or long weekends.
                                    </li>
                                    <li> More people have become aware of the importance for leisure and recreation</li>
                                    <li> Improved transport, communication and accommodation facilities make it easier
                                        for tourists to travel to various places
                                    </li>
                                    <li> Increased advertising and promotion make people aware of tourist
                                        destinations.
                                    </li>
                                    <li> South Africa has a wide range of tourist attractions such as Wildlife parks,
                                        heritage sites, museums, botanical gardens for local people to visit
                                    </li>
                                    <li> Improvement in economic growth and increase in disposable income especially
                                        among black people has enabled more South Africans to afford
                                        holidays.
                                    </li>
                                    <li> Socio-economic factors such as migrant workers in urban areas visiting
                                        relatives in rural areas have increased the number of people travelling.
                                    </li>
                                    <li> Ease of obtaining VISAS and foreign exchange have increased the influx of
                                        foreign tourists in SA
                                    </li>
                                    <li> The depreciation of the rand made it cheaper for foreign tourists to spend
                                        money in SA.
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup35" && (
                            <>
                                <h3>Solution 3.5</h3>
                                <ul>
                                    <li> When the prices of key inputs that are imported increase, the domestic cost
                                        of production increases especially in the manufacturing sector
                                    </li>
                                    <li> Production of goods and services will decrease resulting in low economic
                                        growth.
                                    </li>
                                    <li> Unemployment will increase as businesses retrench some of their workers.</li>
                                    <li> Producers increase the prices of their goods to compensate for the loss of
                                        profits, which will stimulate cost-push inflation
                                    </li>
                                    <li> High costs of crude oil will lead to an increase in the prices of fuel
                                        resulting in high transport costs.
                                    </li>
                                    <li> Investors may be discouraged to invest due to increased cost of doing
                                        business
                                    </li>
                                    <li> The country's exports may decrease due to an increase in domestic prices of
                                        goods and services
                                    </li>
                                    <li> The trade balance of the current account may therefore be reduced as a result
                                        of a decrease in exports.
                                    </li>
                                    <li> The country will earn less foreign exchange/currency and making it more
                                        difficult to pay for imports
                                    </li>
                                    <li> Increase in oil prices may result in higher fuel prices which may increase cost
                                        of production for different industries.
                                    </li>
                                    <li> Increase in prices of agricultural inputs such as fertilisers and other
                                        chemicals may result in higher food prices in the economy
                                    </li>
                                    <li> Increased cost of importing machinery and equipment may lead to low production
                                        of goods and services
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup411" && (
                            <>
                                <h3>Solution 4.1.1</h3>
                                <ul>
                                    <li> Education</li>
                                    <li> Health care</li>
                                    <li> Safety</li>
                                    <li> Disaster management</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup412" && (
                            <>
                                <h3>Solution 4.1.2</h3>
                                <p>A decrease in interest rate will encourage people to borrow more money and thereby
                                    increasing aggregate demand which leads to
                                    an increase in demand-pull inflation. / Lower interest rate may
                                    reduce cost of production which may reduce cost-push inflation.
                                </p>
                            </>
                        )}
                        {popupId === "popup421" && (
                            <>
                                <h3>Solution 4.2.1</h3>
                                <p>C</p>
                            </>
                        )}
                        {popupId === "popup422" && (
                            <>
                                <h3>Solution 4.2.2</h3>
                                <p>Unique / has no close substitutes</p>
                            </>
                        )}
                        {popupId === "popup423" && (
                            <>
                                <h3>Solution 4.2.3</h3>
                                <p>A monopoly that exists due to barriers to entry that are economic in nature such as
                                    high development costs / powerful economies of
                                    scale / exclusive access to natural resources / high fixed cost</p>
                            </>
                        )}
                        {popupId === "popup424" && (
                            <>
                                <h3>Solution 4.2.4</h3>
                                <ul>
                                    <li> A monopoly is a price setter, it can easily manipulate its prices to make
                                        economic profit.
                                    </li>
                                    <li> A monopoly market has barriers to entry, such as patents, which restrict new
                                        firms from entering the market
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup425" && (
                            <>
                                <h3>Solution 4.2.5</h3>
                                <p>Economic loss = TR - TC <br/>
                                    = (R40 x 500) – (R50 x 500) <br/>
                                    = R20 000 - R25 000<br/>
                                    = - R5 000
                                </p>
                                <p>Economic loss = AR – AC) x Q<br/>
                                    = (R40 – R50) x 500<br/>
                                    = - R10 x 500<br/>
                                    = - R5 000
                                </p>
                            </>
                        )}
                        {popupId === "popup431" && (
                            <>
                                <h3>Solution 4.3.1</h3>
                                <p>Wages</p>
                            </>
                        )}
                        {popupId === "popup432" && (
                            <>
                                <h3>Solution 4.3.2</h3>
                                <ul>
                                    <li> Indexes (CPI and PPI)</li>
                                    <li> Weighting</li>
                                    <li> Inflation rate</li>
                                    <li> Implicit GDP deflator</li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup433" && (
                            <>
                                <h3>Solution 4.3.3</h3>
                                <p>Inflation is a sustained and significant increase in the general price
                                    level over a period of time.
                                </p>
                            </>
                        )}
                        {popupId === "popup434" && (
                            <>
                                <h3>Solution 4.3.4</h3>
                                <ul>
                                    <li> Producers will earn less revenue resulting in lower profits</li>
                                    <li> Producers may leave the market for other profitable business ventures.</li>
                                    <li> Low prices will result in businesses reducing their production levels and
                                        employ less workers
                                    </li>
                                    <li> Producers may access some of their inputs at a lower cost which will reduce
                                        cost of production.
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup435" && (
                            <>
                                <h3>Solution 4.3.5</h3>
                                <ul>
                                    <li> increasing the level of taxation to decrease disposal income and curb excess
                                        demand and spending
                                    </li>
                                    <li> implementing or increasing surcharge on imported goods to curb the buying of
                                        imported goods
                                    </li>
                                    <li> cutting back on spending such as cancelling infrastructure development project,
                                        e.g. building of dams and public
                                        buildings.
                                    </li>
                                    <li> borrowing less to finance expenses thereby not contributing to an increase of
                                        money in circulation
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup44" && (
                            <>
                                <h3>Solution 4.4</h3>
                                <p><b>Lack of information</b></p>
                                <ul>
                                    <li> Lack of information results in resources not being allocated efficiently</li>
                                    <li> Consumers do not have perfect information to make rational decisions when
                                        buying goods and services although technology does offer some
                                        information
                                    </li>
                                    <li> Workers are often unaware of job opportunities outside their current
                                        employment
                                    </li>
                                    <li> Entrepreneurs lack of information on costs, availability and productivity of
                                        factors of production reduces their effectiveness
                                    </li>
                                </ul>
                                <p><b>Immobility of factors of production</b></p>
                                <ul>
                                    <li> The immobility of factors of production results in most markets failing to
                                        adjust rapidly to changes in supply and demand.
                                    </li>
                                    <li> Labour takes time to move into new occupations and areas to meet changes in
                                        consumer demand.
                                    </li>
                                    <li> The supply of skilled labour cannot be increased because of the time it takes
                                        to be trained or educated
                                    </li>
                                    <li> Physical capital, like factory buildings or infrastructure such as telephone
                                        lines cannot be reallocated easily
                                    </li>
                                    <li> When technology changes, firms take time to update the skills of their
                                        workers
                                    </li>
                                </ul>
                            </>
                        )}
                        {popupId === "popup45" && (
                            <>
                                <h3>Solution 4.5</h3>
                                <p><b>Tourism can create environmental damage through</b></p>
                                <ul>
                                    <li> permanent restructuring of the landscape such as construction work on
                                        highways
                                    </li>
                                    <li> additional waste products, both biological and non-biological waste such as
                                        sewage, carbon emissions and littering
                                    </li>
                                    <li> direct environmental stress such as loss of wildlife species due to safari
                                        hunting
                                    </li>
                                    <li> negative effect on the population dynamics such as migration and changes in
                                        population density in response to the needs of tourist
                                        sites
                                    </li>
                                    <li> noise pollution in wildlife parks which may result in relocation of animals
                                    </li>
                                    <li> destruction of vegetation as a result of activities of tourists in undisturbed
                                        nature such as river mouth eco-system and botanical gardens
                                    </li>
                                    <li> increase in demand for goods and services which may put pressure on the supply
                                        of natural resources
                                    </li>
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

export default EconomicsP2Nov2022Eng;
