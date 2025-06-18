import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from "../../common/Header";

const Quizzes = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    const [sortBy, setSortBy] = useState('dueDate');


    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No authentication token found');
                }
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const subjectsResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
                const subjectsData = await subjectsResponse.json();
                if (!subjectsResponse.ok || !subjectsData.success) {
                    throw new Error(subjectsData.message || 'Failed to fetch enrolled subjects');
                }
                const enrolledSubjects = (subjectsData.data || []).map(s => s.subjectName || s).sort();
                setSubjects(enrolledSubjects);

                const quizzesResponse = await fetch(`${API_BASE_URL}/user/quizzes`, { headers });
                const quizzesData = await quizzesResponse.json();
                if (!quizzesResponse.ok || !quizzesData.success) {
                    throw new Error(quizzesData.message || 'Failed to fetch quizzes');
                }
                const normalizedQuizzes = (quizzesData.data || []).map(quiz => ({
                    ...quiz,
                    subject: quiz.subject?.subjectName || quiz.subject || 'Unknown',
                }));
                setQuizzes(normalizedQuizzes);

                if (enrolledSubjects.length === 0) {
                    setError('No enrolled subjects found. Please enroll in subjects first.');
                }

                setLoading(false);
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
                setLoading(false);
            }
        };
        fetchData();
    }, [API_BASE_URL]);

    const handleStartQuiz = (quizId, quizTitle) => {
        setNotifications([
            ...notifications,
            {
                id: notifications.length + 1,
                message: `Started quiz: ${quizTitle}`,
                date: new Date().toISOString().split('T')[0],
                read: false,
            },
        ]);
        navigate(`/quiz/${quizId}`);
    };

    const handleViewQuestionPapers = () => {
        setError('');
        navigate('/digitized-question-papers');
    };

    const filteredQuizzes = filterSubject
        ? quizzes.filter(quiz => quiz.subject === filterSubject)
        : quizzes;

    const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
        if (sortBy === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
        if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
        }
        return 0;
    });

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
                <style>
                    {`
                        
                        /* Full wrapper */
                        .full {
                            width: 100%;
                            min-height: 100vh;
                            position: relative;
                            z-index: 10;
                        }
                        /* Base styles */
                        .bg-[var(--bg-primary)] {
                            background-color: var(--bg-primary, ${darkMode ? '#111827' : '#f4f4f4'});
                        }
                        .bg-[var(--bg-secondary)] {
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        }
                        .bg-[var(--bg-tertiary)] {
                            background-color: var(--bg-tertiary, ${darkMode ? '#374151' : '#e5e7eb'});
                        }
                        .bg-[var(--accent-primary)] {
                            background-color: var(--accent-primary, #007bff);
                        }
                        .bg-[var(--accent-secondary)] {
                            background-color: var(--accent-secondary, #dc3545);
                        }
                        .text-[var(--text-primary)] {
                            color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        }
                        .text-[var(--text-secondary)] {
                            color: var(--text-secondary, ${darkMode ? '#d1d5db' : '#666666'});
                        }
                        .text-white {
                            color: #ffffff;
                        }
                        /* Hover states */
                        .hover\\:bg-[var(--hover-tertiary)]:hover {
                            background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
                        }
                        .hover\\:bg-[var(--hover-primary)]:hover {
                            background-color: var(--hover-primary, #0056b3);
                        }
                        .hover\\:text-[var(--hover-secondary)]:hover {
                            color: var(--hover-secondary, ${darkMode ? '#f87171' : '#b91c1c'});
                        }
                        /* Layout styles */
                        .flex {
                            display: flex;
                        }
                        .min-h-screen {
                            min-height: 100vh;
                        }
                        .min-w-0 {
                            min-width: 0;
                        }
                        .justify-center {
                            justify-content: center;
                        }
                        .justify-between {
                            justify-content: space-between;
                        }
                        .items-center {
                            align-items: center;
                        }
                        .flex-1 {
                            flex: 1;
                        }
                        .gap-4 {
                            gap: 16px;
                        }
                        .p-6 {
                            padding: 24px;
                        }
                        .sm\\:p-8 {
                            padding: 32px;
                        }
                        .rounded-2xl {
                            border-radius: 16px;
                        }
                        .rounded-lg {
                            border-radius: 8px;
                        }
                        .rounded-md {
                            border-radius: 6px;
                        }
                        .mb-4 {
                            margin-bottom: 16px;
                        }
                        .mb-6 {
                            margin-bottom: 24px;
                        }
                        .mt-1 {
                            margin-top: 4px;
                        }
                        .mt-4 {
                            margin-top: 16px;
                        }
                        .shadow-[var(--shadow)] {
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        
                        /* Form elements */
                        .form-label {
                            color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                            font-weight: 600;
                            margin-bottom: 8px;
                            display: block;
                        }
                        .form-input {
                            width: 100%;
                            padding: 8px;
                            border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                            border-radius: 4px;
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                            color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                            font-size: 14px;
                        }
                        .form-input:focus {
                            border-color: var(--accent-primary, #007bff);
                            outline: none;
                        }
                        /* Button styles */
                        .btn-primary {
                            background-color: var(--accent-primary, #007bff);
                            color: #ffffff;
                            padding: 8px 16px;
                            border-radius: 4px;
                            border: none;
                            cursor: pointer;
                        }
                        .btn-primary:hover {
                            background-color: var(--hover-primary, #0056b3);
                        }
                        /* Grid layout */
                        .grid {
                            display: grid;
                            grid-template-columns: 1fr;
                            gap: 16px;
                        }
                        .sm\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .md\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .col-span-full {
                            grid-column: 1 / -1;
                        }
                        /* Notification badge */
                        .-top-2 {
                            top: -8px;
                        }
                        .-right-2 {
                            right: -8px;
                        }
                        .h-5 {
                            height: 20px;
                        }
                        .w-5 {
                            width: 20px;
                        }
                        /* Custom section background */
                        .quiz-section {
                            background: ${darkMode
                        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                            border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                            padding: 32px;
                            border-radius: 16px;
                        }
                        /* Service card */
                        .service-card {
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                            padding: 16px;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .hover\\:shadow-lg:hover {
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
                        }
                        /* Loader */
                        .animate-spin {
                            animation: spin 1s linear infinite !important;
                        }
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                        /* Sidebar margins */
                        .ml-16 {
                            margin-left: 64px;
                        }
                        .ml-64 {
                            margin-left: 256px;
                        }
                        /* Responsive adjustments */
                        @media (min-width: 640px) {
                            .sm\\:grid-cols-2 {
                                grid-template-columns: repeat(2, 1fr);
                            }
                            .sm\\:p-8 {
                                padding: 32px;
                            }
                        }
                        @media (min-width: 768px) {
                            .md\\:grid-cols-3 {
                                grid-template-columns: repeat(3, 1fr);
                            }
                        }
                        /* Underline */
                        .underline {
                            text-decoration: underline;
                        }
                    `}
                </style>
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    darkMode={darkMode}
                />
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Quizzes"
                        userMessage="Test your knowledge"
                    />
                <div
                    className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 mx-auto
                     ${isCollapsed ? 'ml-16' : 'ml-64'}`}
                >
                    <div className="quiz-section">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Available Quizzes</h2>
                        </div>
                        {error && (
                            <div className="p-4 mb-4 rounded-lg bg-[var(--accent-secondary)] text-white flex justify-between items-center">
                                {error}
                                {error.includes('No enrolled subjects') && (
                                    <Link
                                        to="/subjects"
                                        className="ml-2 text-white underline hover:text-[var(--hover-secondary)]"
                                    >
                                        Enroll in subjects
                                    </Link>
                                )}
                            </div>
                        )}
                        <div className="mb-6">
                            <button
                                onClick={handleViewQuestionPapers}
                                className="px-4 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                aria-label="View question papers"
                            >
                                View Digitized Question Papers
                            </button>
                        </div>
                        <div className="mb-6 flex gap-4">
                            <div>
                                <label htmlFor="filterSubject" className="form-label">
                                    Filter by Subject
                                </label>
                                <select
                                    id="filterSubject"
                                    value={filterSubject}
                                    onChange={(e) => setFilterSubject(e.target.value)}
                                    className="form-input"
                                    disabled={subjects.length === 0}
                                >
                                    <option value="">All Subjects</option>
                                    {subjects.map((subject, index) => (
                                        <option key={subject || index} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                                {subjects.length === 0 && (
                                    <p className="text-sm text-[var(--text-secondary)] mt-1">No enrolled subjects available.</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="sortBy" className="form-label">
                                    Sort By
                                </label>
                                <select
                                    id="sortBy"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="form-input"
                                >
                                    <option value="dueDate">Due Date</option>
                                    <option value="title">Title</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {sortedQuizzes.length > 0 ? (
                                sortedQuizzes.map((quiz, index) => (
                                    <div
                                        key={quiz.id || `quiz-${quiz.title}-${index}`}
                                        className="service-card hover:shadow-lg"
                                    >
                                        <h3 className="text-lg font-medium text-[var(--text-primary)]">{quiz.title}</h3>
                                        <p className="text-sm text-[var(--text-secondary)]">Subject: {quiz.subject}</p>
                                        <p className="text-sm text-[var(--accent-primary)]">Due: {quiz.dueDate}</p>
                                        <div className="mt-4">
                                            <button
                                                onClick={() => handleStartQuiz(quiz.id, quiz.title)}
                                                className="btn-primary"
                                            >
                                                Start Quiz
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[var(--text-secondary)] col-span-full">
                                    No quizzes available{filterSubject ? ` for ${filterSubject}` : ''}.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

Quizzes.propTypes = {
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
        }),
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default Quizzes;