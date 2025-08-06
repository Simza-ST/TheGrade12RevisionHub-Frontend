import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';

const QuizView = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications, onActivity, activities, setActivities  }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuiz = async () => {
            setLoading(true);
            try {
                const token = sessionStorage.getItem('jwt');
                if (!token) {
                    setError('No authentication token found. Please log in.');
                    setLoading(false);
                    return;
                }

                console.log('Fetching quiz with ID:', id);
                const response = await fetch(`http://localhost:6262/api/user/quizzes/${id}/questions`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        console.error('Unauthorized or forbidden. Clearing JWT.');
                        sessionStorage.removeItem('jwt');
                        navigate('/login');
                        return;
                    }
                    const errorData = await response.json();
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }

                const { success, data, message } = await response.json();
                console.log('Quiz Response:', JSON.stringify({ success, data, message }, null, 2));
                if (!success) {
                    throw new Error(message || 'Failed to retrieve quiz');
                }

                // Validate question IDs
                if (data.questions.some(q => !q.questionId)) {
                    throw new Error('Some questions are missing IDs');
                }
                console.log('Question IDs:', data.questions.map(q => q.questionId));
                setQuiz(data);
                setAnswers({});
                setResult(null);
                setError('');
            } catch (err) {
                console.error('Fetch error:', err);
                setError(`Failed to fetch quiz: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id, navigate]);

    const handleAnswerChange = (questionId, selectedAnswer) => {
        console.log(`Selected answer for questionId=${questionId}: ${selectedAnswer}`);
        setAnswers((prev) => ({
            ...prev,
            [questionId]: String(selectedAnswer).trim(),
        }));
    };

    const handleSubmit = async () => {
        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                setError('No authentication token found. Please log in.');
                return;
            }

            const submission = {
                answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({
                    questionId: Number(questionId),
                    selectedAnswer: String(selectedAnswer).trim(),
                })),
            };
            console.log('Submitting answers:', JSON.stringify(submission, null, 2));

            const response = await fetch(`http://localhost:6262/api/user/quizzes/${id}/submit`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submission),
            });

            if (!response.ok) {
                if (response.status === 401 || response.status === 403) {
                    console.error('Unauthorized or forbidden. Clearing JWT.');
                    sessionStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            const { success, data, message } = await response.json();
            console.log('Submission Response:', JSON.stringify({ success, data, message }, null, 2));
            if (!success) {
                throw new Error(message || 'Failed to submit quiz');
            }

            setResult(data);
            setError('');
            onActivity(`Submitted quiz: ${quiz.title}`);//record activity after successful submission
        } catch (err) {
            console.error('Submission error:', err);
            setError(`Failed to submit quiz: ${err.message}`);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                <div
                    className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"
                    role="status"
                    aria-label="Loading quiz..."
                ></div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
                <style>
                    {`
                        .full {
                            width: 100%;
                            min-height: 100vh;
                            position: relative;
                            z-index: 10;
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        }
                        .bg-[var(--bg-primary)] {
                            background-color: var(--bg-primary, ${darkMode ? '#0f172a' : '#ffffff'});
                        }
                        .bg-[var(--bg-secondary)] {
                            background-color: var(--bg-secondary, ${darkMode ? '#1e293b' : '#ffffff'});
                        }
                        .bg-[var(--accent-primary)] {
                            background-color: var(--accent-primary, #3b82f6);
                        }
                        .text-[var(--text-primary)] {
                            color: var(--text-primary, ${darkMode ? '#e2e8f0' : '#1f2937'});
                        }
                        .text-[var(--text-secondary)] {
                            color: var(--text-secondary, ${darkMode ? '#94a3b8' : '#6b7280'});
                        }
                        .border-[var(--border)] {
                            border-color: var(--border, ${darkMode ? '#475569' : '#e5e7eb'});
                        }
                        .hover\\:bg-[var(--hover-tertiary)]:hover {
                            background-color: var(--hover-gray, ${darkMode ? '#4b5563' : '#f3f4f6'});
                        }
                        .question-card {
                            transition: box-shadow 0.2s ease;
                        }
                        .question-card:hover {
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                        }
                        .option-label {
                            cursor: pointer;
                            padding: 8px;
                            border-radius: 4px;
                            transition: background-color 0.2s ease;
                        }
                        .option-label:hover {
                            background-color: var(--hover-gray, ${darkMode ? '#4b5563' : '#f3f4f6'});
                        }
                        input[type="radio"]:checked + .option-label {
                            background-color: var(--accent-primary, #3b82f6);
                            color: white;
                        }
                    `}
                </style>
                <Sidebar
                    user={user}
                    onLogout={() => {
                        sessionStorage.removeItem('jwt');
                        navigate('/login');
                    }}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    darkMode={darkMode}
                    onActivity={onActivity} //Pass onActivity to sidebar
                />
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Quiz"
                        userMessage={`Taking ${quiz?.title || 'Quiz'}`}
                    />
                    <main className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-sm flex items-center">
                                <span>{error}</span>
                            </div>
                        )}
                        {quiz && !result && (
                            <div>
                                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                                    {quiz.title || 'Untitled Quiz'}
                                </h2>
                                <p className="text-sm text-[var(--text-secondary)] mb-6">
                                    Subject: {quiz.subject || 'Unknown'} | Questions: {quiz.questions?.length || 0}
                                </p>
                                <div className="space-y-6">
                                    {quiz.questions?.map((question, qIndex) => {
                                        if (!question.questionId) {
                                            console.error('Missing question ID:', question);
                                            return null;
                                        }
                                        return (
                                            <div
                                                key={question.questionId}
                                                className="question-card bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border)]"
                                            >
                                                <h3 className="text-lg font-medium text-[var(--text-primary)] mb-4">
                                                    {qIndex + 1}. {question.questionText}
                                                </h3>
                                                <div className="space-y-2">
                                                    {question.options?.map((option, optIndex) => (
                                                        <div key={`q${question.questionId}-o${optIndex}`} className="flex items-center">
                                                            <input
                                                                type="radio"
                                                                id={`q${question.questionId}-o${optIndex}`}
                                                                name={`question-${question.questionId}`}
                                                                value={option}
                                                                checked={answers[question.questionId] === option}
                                                                onChange={() => handleAnswerChange(question.questionId, option)}
                                                                className="mr-2"
                                                            />
                                                            <label
                                                                htmlFor={`q${question.questionId}-o${optIndex}`}
                                                                className="option-label text-[var(--text-primary)] w-full"
                                                            >
                                                                {option}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={handleSubmit}
                                    disabled={Object.keys(answers).length < (quiz.questions?.length || 0)}
                                    className={`mt-6 px-6 py-2 rounded-lg text-white transition-colors ${
                                        Object.keys(answers).length < (quiz.questions?.length || 0)
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-[var(--accent-primary)] hover:bg-blue-700'
                                    }`}
                                    aria-label="Submit quiz"
                                >
                                    Submit Quiz
                                </button>
                            </div>
                        )}
                        {result && (
                            <div className="bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border)]">
                                <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                                    Quiz Results
                                </h2>
                                <p className="text-lg text-[var(--text-primary)] mb-2">
                                    Quiz: {result.quizTitle}
                                </p>
                                <p className="text-lg text-[var(--text-primary)] mb-4">
                                    Score: {result.score} / {result.totalQuestions}
                                </p>
                                <button
                                    onClick={() => navigate('/quizzes')}
                                    className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    aria-label="Back to quizzes"
                                >
                                    Back to Quizzes
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

QuizView.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
    //activity PropTypes
    onActivity: PropTypes.func.isRequired,
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    setActivities: PropTypes.func.isRequired,
};

export default QuizView;