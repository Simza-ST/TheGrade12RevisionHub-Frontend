import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

// Topbar Component
const Topbar = () => {
    const menuItems = [
        { icon: 'bx-task', text: 'Home🏡', href: '/admin-Dashboard' },
        { icon: 'bx-task', text: 'List of students👨‍🎓', href: '/Students' },
        { icon: 'bx-file', text: 'Upload Documents📚', href: '/upload-documents' },
        { icon: 'bx-plus', text: 'Create Quiz📑', href: '/quiz-creation' },
        { icon: 'bx-plus', text: 'Create Certificate📜', href: '/cert-creation' },
        { icon: 'bx-mail-send', text: 'Send Email📩', href: '/chat' },
        { icon: 'bx-log-out', text: 'Logout', href: '/login' },

    ];

    return (
        <header className="topbar fixed top-0 left-0 w-full h-16 bg-gray-900 flex items-center justify-between px-5 text-white text-2xl font-semibold shadow-md z-50">
            <div className="dashboard-title">Quiz Pool</div>
            <div className="media-icons">
                <ul className="menu flex gap-5 list-none p-0">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className="text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

const QuizViewer = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/allQuizzes`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch quizzes: ${response.statusText}`);
                }
                const data = await response.json();
                setQuizzes(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold text-gray-600">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl font-semibold text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">

            <Topbar />
            <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Quiz Viewer</h1>
            {quizzes.length === 0 ? (
                <p className="text-center text-gray-500">No quizzes available.</p>
            ) : (
                quizzes.map((quiz, quizIndex) => (
                    <div key={quizIndex} className="mb-8 bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {quiz.title} (Subject: {quiz.subjectId})
                        </h2>
                        {quiz.questions.map((question, qIndex) => (
                            <div key={qIndex} className="mb-4 border-b pb-4">
                                <p className="text-lg font-medium text-gray-700">
                                    {qIndex + 1}. {question.questionText}
                                </p>
                                <ul className="mt-2 ml-4 list-disc">
                                    {question.options.map((option, oIndex) => (
                                        <li key={oIndex} className="text-gray-600">
                                            {option}
                                            {option === question.correctAnswer && (
                                                <span className="text-green-500 font-semibold ml-2">(Correct)</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ))
            )}
        </div>
    );
};

export default QuizViewer;