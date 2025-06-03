import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';

const Quizzes = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    const [sortBy, setSortBy] = useState('dueDate');
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No authentication token found');
                }
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const quizzesResponse = await fetch(`${API_BASE_URL}/user/quizzes`, { headers });
                const quizzesData = await quizzesResponse.json();
                if (!quizzesResponse.ok || !quizzesData.success) {
                    throw new Error(quizzesData.message || 'Failed to fetch quizzes');
                }

                const subjectsResponse = await fetch(`${API_BASE_URL}/user/subjects`, { headers });
                const subjectsData = await subjectsResponse.json();
                if (!subjectsResponse.ok || !subjectsData.success) {
                    throw new Error(subjectsData.message || 'Failed to fetch subjects');
                }

                setQuizzes(quizzesData.data || []);
                setSubjects(subjectsData.data || []);
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

    const filteredQuizzes = filterSubject
        ? quizzes.filter((quiz) => quiz.subject === filterSubject)
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

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen bg-[var(--bg-primary)]">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={darkMode}
            />
            <div
                className={`
          flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
          ${isCollapsed ? 'ml-16' : 'ml-64'}
        `}
            >
                <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Quizzes</h1>
                        <p className="text-sm mt-1 text-[var(--text-secondary)]">Test your knowledge, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            aria-label={`View notifications (${notificationCount} unread)`}
                        >
                            🔔
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--accent-secondary)] text-[var(--text-primary)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Available Quizzes</h2>
                    </div>

                    {error && (
                        <div className="p-4 mb-4 rounded-lg bg-[var(--accent-secondary)] text-[var(--text-primary)]">
                            {error}
                        </div>
                    )}

                    <div className="mb-6 flex gap-4">
                        <div>
                            <label htmlFor="filterSubject" className="block text-[var(--text-primary)] mb-2 font-medium">
                                Filter by Subject
                            </label>
                            <select
                                id="filterSubject"
                                value={filterSubject}
                                onChange={(e) => setFilterSubject(e.target.value)}
                                className="p-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                            >
                                <option value="">All Subjects</option>
                                {subjects.map((subject, index) => (
                                    <option key={index} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sortBy" className="block text-[var(--text-primary)] mb-2 font-medium">
                                Sort By
                            </label>
                            <select
                                id="sortBy"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="p-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                            >
                                <option value="dueDate">Due Date</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {sortedQuizzes.length > 0 ? (
                            sortedQuizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className="bg-[var(--bg-secondary)] bg-opacity-90 p-4 rounded-2xl shadow-2xl hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-lg font-medium text-[var(--text-primary)]">{quiz.title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)]">Subject: {quiz.subject}</p>
                                    <p className="text-sm text-[var(--accent-primary)]">Due: {quiz.dueDate}</p>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleStartQuiz(quiz.id, quiz.title)}
                                            className="px-4 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-primary)] rounded-lg hover:from-[var(--hover-primary)] hover:to-[var(--hover-secondary)]"
                                        >
                                            Start Quiz
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-[var(--text-secondary)] col-span-full">No quizzes available.</p>
                        )}
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
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default Quizzes;