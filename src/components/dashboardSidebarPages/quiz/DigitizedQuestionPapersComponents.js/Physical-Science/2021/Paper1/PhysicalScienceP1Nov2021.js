import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import Result from "./Result";


function PhysicalScienceP1Nov2021() {
    const [paper, setPaper] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});

    useEffect(() => {
        fetch("/papers.json")
            .then((res) => res.json())
            .then((data) => {
                // Automatically load the FIRST (and only) paper
                setPaper(data[0]);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleFinishQuiz = (answers) => {
        setUserAnswers(answers);
        setShowResults(true);
    };

    const handleBack = () => {
        setShowResults(false);
    };

    if (!paper) return <p>Loading questions...</p>;

    // Show results screen
    if (showResults) {
        return (
            <Result
                paper={paper}
                userAnswers={userAnswers}
                goBack={handleBack}
            />
        );
    }

    // Show quiz screen immediately (skip year selection)
    return (
        <Quiz
            paper={paper}
            finishQuiz={handleFinishQuiz}
            goBack={() => {}}
        />
    );
}

export default PhysicalScienceP1Nov2021;
