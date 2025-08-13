import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';
import QuizCard from './QuizCard';

const Quizzes = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications, onActivity, activities, setActivities }) => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterSubject, setFilterSubject] = useState('');
    const [sortBy, setSortBy] = useState('dueDate');
    const [showSidebar, setShowSidebar] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const token = sessionStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No authentication token found');
                }
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                const subjectsResponse = await fetch(`${API_BASE_URL}/enrolled-subjects`, { headers });
                const subjectsData = await subjectsResponse.json();
                if (!subjectsResponse.ok || !subjectsData.success) {
                    throw new Error(subjectsData.message || 'Failed to fetch enrolled subjects');
                }
                const enrolledSubjects = (subjectsData.data || []).map(s => s.subjectName || s).sort();
                setSubjects(enrolledSubjects);

                const quizzesResponse = await fetch(`${API_BASE_URL}/quizzes`, { headers });
                const quizzesData = await quizzesResponse.json();
                if (!quizzesResponse.ok || !quizzesData.success) {
                    throw new Error(quizzesData.message || 'Failed to fetch quizzes');
                }
                const normalizedQuizzes = (quizzesData.data || []).map(quiz => ({
                    ...quiz,
                    subject: quiz.subject?.subjectName || quiz.subjectId || quiz.subject || 'Unknown',
                }));
                console.log('Quizzes:', normalizedQuizzes.map(quiz => ({
                    id: quiz.id,
                    title: quiz.title,
                    subject: quiz.subject,
                    questionCount: quiz.questions?.length
                })));
                setQuizzes(normalizedQuizzes);

                if (enrolledSubjects.length === 0) {
                    setError('No enrolled subjects found. Please enroll in subjects first.');
                }

                setLoading(false);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(`Error fetching data: ${err.message}`);
                setLoading(false);
            }
        };
        fetchData();
    }, [API_BASE_URL]);

    const handleStartQuiz = (quizId, quizTitle) => {
        console.log('Navigating to quiz ID:', quizId);
        onActivity(`Started quiz: ${quizTitle}`);
        navigate(`/quizzes/${quizId}`);
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
            return new Date(a.dueDate || '9999-12-31') - new Date(b.dueDate || '9999-12-31');
        }
        if (sortBy === 'title') {
            return (a.title || '').localeCompare(b.title || '');
        }
        return 0;
    });

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
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
            <div className="flex min-h-screen bg-[var(--bg-primary)] relative">
                <style>{`
                    :not(.sidebar-wrapper, .hamburger, .dashboard-content, .header, .header-title) {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                    }
                    .sidebar-wrapper,
                    .hamburger,
                    .dashboard-content,
                    .header,
                    .header-title {
                        transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, margin-left 0.3s ease-in-out, padding-left 0.3s ease-in-out;
                    }
                    .full {
                        width: 100%;
                        min-height: 100vh;
                        position: relative;
                        z-index: 10;
                    }
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
                    .hover\\:bg-[var(--hover-tertiary)]:hover {
                        background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
                    }
                    .hover\\:bg-[var(--hover-primary)]:hover {
                        background-color: var(--hover-primary, #0056b3);
                    }
                    .hover\\:text-[var(--hover-secondary)]:hover {
                        color: var(--hover-secondary, ${darkMode ? '#f87171' : '#b91c1c'});
                    }
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
                        gap: clamp(8px, 2vw, 12px);
                    }
                    .gap-6 {
                        gap: clamp(12px, 3vw, 16px);
                    }
                    .p-4 {
                        padding: clamp(8px, 2vw, 12px);
                    }
                    .p-6 {
                        padding: clamp(12px, 3vw, 16px);
                    }
                    .sm\\:p-8 {
                        padding: clamp(16px, 4vw, 20px);
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
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                        line-height: 1.25rem;
                    }
                    .form-input:focus {
                        border-color: var(--accent-primary, #007bff);
                        outline: none;
                    }
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
                    .grid {
                        display: grid;
                        gap: clamp(8px, 2vw, 12px);
                    }
                    .hamburger {
                        display: none;
                        cursor: pointer;
                        background: none;
                        border: none;
                        padding: 8px;
                        position: fixed;
                        top: 16px;
                        left: 5px;
                        z-index: 50;
                        transition: left 0.3s ease-in-out;
                    }
                    .sidebar-wrapper {
                        position: fixed;
                        top: 0;
                        left: 0;
                        height: 100vh;
                        z-index: 40;
                        transition: transform 0.3s ease-in-out;
                    }
                    .sidebar-hidden {
                        transform: translateX(-100%);
                    }
                    .dashboard-content {
                        max-height: 80vh;
                        overflow-y: auto;
                        padding-right: 8px;
                    }
                    .dashboard-content::-webkit-scrollbar {
                        width: 6px;
                    }
                    .dashboard-content::-webkit-scrollbar-thumb {
                        background-color: var(--border-color, ${darkMode ? '#4b5563' : '#e5e7eb'});
                        border-radius: 3px;
                    }
                    .dashboard-content::-webkit-scrollbar-track {
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                    }
                    .quiz-section {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        padding: clamp(16px, 4vw, 24px);
                        border-radius: 16px;
                    }
                    .underline {
                        text-decoration: underline;
                    }
                    .text-3xl {
                        font-size: clamp(1.5rem, 4.5vw, 1.875rem);
                    }
                    .text-xl {
                        font-size: clamp(1.125rem, 3.5vw, 1.25rem);
                    }
                    .text-lg {
                        font-size: clamp(1rem, 3vw, 1.125rem);
                    }
                    .text-sm {
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                    }
                    .text-xs {
                        font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                    }
                    .font-bold {
                        font-weight: 700;
                    }
                    .font-semibold {
                        font-weight: 600;
                    }
                    .font-medium {
                        font-weight: 500;
                    }
                    @media (max-width: 639px) {
                        .ml-16, .ml-64, .sm\\:ml-16, .sm\\:ml-64 {
                            margin-left: 0;
                        }
                        .hamburger {
                            display: block;
                            left: ${showSidebar ? '198px' : '5px'};
                        }
                        .sidebar-wrapper {
                            display: ${showSidebar ? 'block' : 'none'};
                        }
                        .dashboard-content {
                            margin-left: ${showSidebar ? '198px' : '0'};
                        }
                    }
                    @media (max-width: 480px) {
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(8px, 2vw, 10px);
                        }
                        .quiz-section {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .text-3xl {
                            font-size: clamp(1.25rem, 4vw, 1.5rem);
                        }
                        .text-xl {
                            font-size: clamp(1rem, 3vw, 1.125rem);
                        }
                        .text-lg {
                            font-size: clamp(0.875rem, 2.5vw, 1rem);
                        }
                    }
                    @media (min-width: 481px) and (max-width: 639px) {
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(10px, 2.5vw, 12px);
                        }
                        .quiz-section {
                            padding: clamp(14px, 3.5vw, 18px);
                        }
                    }
                    @media (min-width: 640px) and (max-width: 767px) {
                        .grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .sm\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .md\\:grid-cols-3 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .hamburger {
                            display: none;
                        }
                        .sidebar-wrapper {
                            display: block;
                        }
                    }
                    @media (min-width: 768px) and (max-width: 1023px) {
                        .grid {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .sm\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .md\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .quiz-section {
                            padding: clamp(16px, 4vw, 20px);
                        }
                    }
                    @media (min-width: 1024px) {
                        .grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .sm\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .md\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(16px, 4vw, 20px);
                        }
                        .quiz-section {
                            padding: clamp(20px, 5vw, 24px);
                        }
                    }
                `}</style>
                <button
                    className="hamburger"
                    onClick={() => {
                        setShowSidebar(!showSidebar);
                        if (!showSidebar) setIsCollapsed(false);
                    }}
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className={`sidebar-wrapper ${!showSidebar ? 'sidebar-hidden' : ''}`}>
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        darkMode={darkMode}
                        onActivity={onActivity}
                        disableHamburger={showSidebar && window.innerWidth <= 639}
                    />
                </div>
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
                        className="header"
                    />
                    <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content`}>
                        <div className="quiz-section">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Explore Quizzes</h2>
                                <button
                                    onClick={handleViewQuestionPapers}
                                    className="px-4 py-2 bg-[var(--accent-primary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                    aria-label="View digitized question papers"
                                >
                                    View Digitized Question Papers
                                </button>
                            </div>
                            <div className="mb-6">
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    Filter by subject, due date and title to find quizzes and test your knowledge!
                                </p>
                                <p className="bg-[var(--bg-tertiary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-4">
                                    <strong>NB:</strong> Quizzes help reinforce concepts and prepare for exams.
                                </p>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Quick Tips</h3>
                                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                                    <li>Filter by subject and year to find relevant quizzes.</li>
                                    <li>Access online quizzes with the <strong>Start Quiz</strong> button.</li>
                                    <li>Check quiz details for more information.</li>
                                </ul>
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
                                            <option key={subject || `subject-${index}`} value={subject}>
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
                                    sortedQuizzes.map((quiz) => (
                                        <QuizCard
                                            key={quiz.id || `quiz-${quiz.title}-${quiz.subject}`}
                                            quiz={quiz}
                                            onStartQuiz={handleStartQuiz}
                                            darkMode={darkMode}
                                        />
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
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
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

export default Quizzes;