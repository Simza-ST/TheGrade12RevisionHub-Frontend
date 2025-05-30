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

    // Fetch quizzes and subjects
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

                // Fetch quizzes
                const quizzesResponse = await fetch(`${API_BASE_URL}/user/quizzes`, { headers });
                const quizzesData = await quizzesResponse.json();
                if (!quizzesResponse.ok || !quizzesData.success) {
                    throw new Error(quizzesData.message || 'Failed to fetch quizzes');
                }

                // Fetch subjects for filtering
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

    // Handle starting a quiz
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

    // Filter and sort quizzes
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

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900">
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
                <div className="bg-gradient-to-r from-teal-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Quizzes</h1>
                        <p className="text-sm mt-1 text-gray-300">Test your knowledge, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label={`View notifications (${notificationCount} unread)`}
                        >
                            🔔
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className={`bg-teal-${darkMode ? '900' : '800'} bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Available Quizzes</h2>
                    </div>

                    {error && (
                        <div className="p-4 mb-4 rounded-lg bg-red-700 text-white">
                            {error}
                        </div>
                    )}

                    <div className="mb-6 flex gap-4">
                        <div>
                            <label htmlFor="filterSubject" className="block text-white mb-2 font-medium">
                                Filter by Subject
                            </label>
                            <select
                                id="filterSubject"
                                value={filterSubject}
                                onChange={(e) => setFilterSubject(e.target.value)}
                                className="p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
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
                            <label htmlFor="sortBy" className="block text-white mb-2 font-medium">
                                Sort By
                            </label>
                            <select
                                id="sortBy"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
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
                                    className="bg-teal-800 bg-opacity-90 p-4 rounded-2xl shadow-2xl hover:shadow-lg transition-shadow"
                                >
                                    <h3 className="text-lg font-medium text-white">{quiz.title}</h3>
                                    <p className="text-sm text-gray-300">Subject: {quiz.subject}</p>
                                    <p className="text-sm text-teal-400">Due: {quiz.dueDate}</p>
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleStartQuiz(quiz.id, quiz.title)}
                                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                                        >
                                            Start Quiz
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300 col-span-full">No quizzes available.</p>
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