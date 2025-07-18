import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from '../../common/AdminSidebar';
import AdminHeader from '../../common/AdminHeader';

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

const QuizViewer = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [quizToDelete, setQuizToDelete] = useState(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/allQuizzes`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
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

    const handleDeleteQuiz = async () => {
        if (!quizToDelete) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/quizzes/${quizToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || `Failed to delete quiz: ${response.statusText}`);
            }
            setQuizzes(quizzes.filter((quiz) => quiz.id !== quizToDelete.id));
            setMessage({ text: 'Quiz deleted successfully', type: 'success' });
            setShowDeleteModal(false);
            setQuizToDelete(null);
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setMessage({ text: `Error deleting quiz: ${err.message}`, type: 'error' });
            setShowDeleteModal(false);
            setQuizToDelete(null);
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const openDeleteModal = (quiz) => {
        setQuizToDelete(quiz);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setQuizToDelete(null);
    };

    return (
        <div className="flex min-h-screen">
            <style>
                {`
                    .animate-spin {
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .modal-content {
                        background: var(--bg-primary, ${isDarkMode ? '#1e293b' : '#ffffff'});
                        padding: 24px;
                        border-radius: 8px;
                        max-width: 400px;
                        width: 100%;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    .modal-header {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: var(--text-primary, ${isDarkMode ? '#e2e8f0' : '#1f2937'});
                        margin-bottom: 16px;
                    }
                    .modal-body {
                        font-size: 1rem;
                        color: var(--text-normal, ${isDarkMode ? '#e2e8f0' : '#1f2937'});
                        margin-bottom: 24px;
                    }
                    .modal-footer {
                        display: flex;
                        justify-content: flex-end;
                        gap: 8px;
                    }
                    .modal-button {
                        padding: 8px 16px;
                        border-radius: 6px;
                        font-size: 0.875rem;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    }
                    .modal-button-cancel {
                        background: var(--border, ${isDarkMode ? '#475569' : '#e5e7eb'});
                        color: var(--text-normal, ${isDarkMode ? '#e2e8f0' : '#1f2937'});
                    }
                    .modal-button-cancel:hover {
                        background: ${isDarkMode ? '#64748b' : '#d1d5db'};
                    }
                    .modal-button-delete {
                        background: #dc2626;
                        color: white;
                    }
                    .modal-button-delete:hover {
                        background: #b91c1c;
                    }
                `}
            </style>
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
                    {message && (
                        <div
                            className={`p-4 mb-4 rounded text-center ${
                                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div
                                className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--accent-primary)]"
                                role="status"
                                aria-label="Loading quizzes..."
                            ></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-xl font-semibold text-red-500">Error: {error}</div>
                    ) : (
                        <div className="container mx-auto">
                            <h1 className="text-3xl font-bold text-center mb-8 text-[var(--accent-primary)]">Quiz Viewer</h1>
                            {quizzes.length === 0 ? (
                                <p className="text-center text-[var(--text-secondary)]">No quizzes available.</p>
                            ) : (
                                quizzes.map((quiz, quizIndex) => (
                                    <div key={quiz.id || quizIndex} className="mb-8 bg-[var(--bg-primary)] rounded-lg shadow-md p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
                                                {quiz.title} (Subject: {quiz.subjectId || quiz.subject || 'Unknown'})
                                            </h2>
                                            <button
                                                onClick={() => openDeleteModal(quiz)}
                                                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={!quiz.id}
                                                aria-label={`Delete quiz: ${quiz.title}`}
                                            >
                                                Delete Quiz
                                            </button>
                                        </div>
                                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                                            Description: {quiz.description || 'Unknown'}
                                        </p>
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
                    {showDeleteModal && (
                        <div className="modal-overlay" onClick={closeDeleteModal}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <h2 className="modal-header">Confirm Delete</h2>
                                <p className="modal-body">
                                    Are you sure you want to delete the quiz "{quizToDelete?.title}"? This action cannot be undone.
                                </p>
                                <div className="modal-footer">
                                    <button
                                        className="modal-button modal-button-cancel"
                                        onClick={closeDeleteModal}
                                        aria-label="Cancel deletion"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="modal-button modal-button-delete"
                                        onClick={handleDeleteQuiz}
                                        aria-label={`Delete quiz: ${quizToDelete?.title}`}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
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