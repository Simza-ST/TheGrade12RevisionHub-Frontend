import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from "../../common/AdminSidebar";
import AdminHeader from "../../common/AdminHeader";

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

const QuizViewer = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/allQuizzes`);
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

    return (
        <div className="flex min-h-screen">
            <AdminSidebar
                user={user}
                onLogout={onLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={isDarkMode}
            />
            <div className="flex-1">
                <AdminHeader
                    user={user}
                    notifications={notifications}
                    isCollapsed={isCollapsed}
                    darkMode={isDarkMode}
                    setDarkMode={setIsDarkMode}
                    tabDescription="Quiz Viewer"
                    userMessage="View quizzes you have created"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    {loading ? (
                        <div className="text-center text-xl font-semibold text-[var(--text-normal)]">Loading...</div>
                    ) : error ? (
                        <div className="text-center text-xl font-semibold text-red-500">Error: {error}</div>
                    ) : (
                        <div className="container mx-auto">
                            <h1 className="text-3xl font-bold text-center mb-8 text-[var(--accent-primary)]">Quiz Viewer</h1>
                            {quizzes.length === 0 ? (
                                <p className="text-center text-[var(--text-secondary)]">No quizzes available.</p>
                            ) : (
                                quizzes.map((quiz, quizIndex) => (
                                    <div key={quizIndex} className="mb-8 bg-[var(--bg-primary)] rounded-lg shadow-md p-6">
                                        <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                                            {quiz.title} (Subject: {quiz.subjectId})
                                        </h2>
                                        {quiz.questions.map((question, qIndex) => (
                                            <div key={qIndex} className="mb-4 border-b pb-4 border-[var(--border)]">
                                                <p className="text-lg font-medium text-[var(--text-normal)]">
                                                    {qIndex + 1}. {question.questionText}
                                                </p>
                                                <ul className="mt-2 ml-4 list-disc">
                                                    {question.options.map((option, oIndex) => (
                                                        <li key={oIndex} className="text-[var(--text-secondary)]">
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
                    )}
                </div>
            </div>
        </div>
    );
};

QuizViewer.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default QuizViewer;