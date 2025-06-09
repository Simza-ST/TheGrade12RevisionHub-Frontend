import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Tooltip from './Tooltip';

const QuestionPaperDetails = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questionPaper, setQuestionPaper] = useState(null);
    const user = { name: 'Student', title: 'CS Student', profilePicture: null };
    const notificationCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        // Set mock paper data to simulate API response
        setQuestionPaper({
            id,
            title: `Paper ${id}`,
            subject: 'Mathematics', // Supports filtering list in QuestionPaperList.jsx
            year: '2023',
            description: 'This paper covers key topics for exam preparation.',
            difficulty: 'Moderate',
        });
    }, [id]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const viewPaper = () => {
        // Navigate to QuestionPaperList.jsx with paperId and subject for filtering
        navigate(`/question-papers/list?paperId=${id}&subject=${encodeURIComponent(questionPaper?.subject || '')}`);
    };

    const downloadPaper = () => {
        alert('Download not available in this version.');
    };

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-secondary)]">
                <style>
                    {`
* {
    transition: none !important;
animation: none !important;
opacity: 1 !important;
}
.full {
    width: 100%;
    min-height: 100vh;
    position: relative;
    z-index: 10;
}
.bg-[var(--bg-secondary)] {
    background-color: #ffffff;
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
.flex {
    display: flex;
}
.min-h-screen {
    min-height: 100vh;
}
.flex-1 {
    flex: 1;
}
.min-w-0 {
    min-width: 0;
}
.justify-between {
    justify-content: space-between;
}
.items-center {
    align-items: center;
}
.gap-4 {
    gap: 16px;
}
.gap-2 {
    gap: 8px;
}
.flex-col {
    flex-direction: column;
}
.sm\\:flex-row {
@media (min-width: 640px) {
        flex-direction: row;
    }
}
.p-4 {
    padding: 16px;
}
.p-6 {
    padding: 24px;
}
.sm\\:p-6 {
    padding: 24px;
}
.sm\\:p-8 {
    padding: 32px;
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
.text-3xl {
    font-size: 24px;
}
.text-lg {
    font-size: 16px;
}
.sm\\:text-xl {
    font-size: 20px;
}
.text-sm {
    font-size: 12px;
}
.text-base {
    font-size: 14px;
}
.sm\\:text-base {
    font-size: 14px;
}
.text-xs {
    font-size: 10px;
}
.font-bold {
    font-weight: 700;
}
.font-semibold {
    font-weight: 600;
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
.shadow-[var(--shadow)] {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.shadow-2xl {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
}
.quiz-section {
    background: #ffffff;
    background-color: #ffffff;
    border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 32px;
    border-radius: 16px;
}
.space-y-2 {
    margin-bottom: 8px;
}
.ml-16 {
    margin-left: 64px;
}
.ml-64 {
    margin-left: 256px;
}
.w-full {
    width: 100%;
}
.relative {
    position: relative;
}
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
.rounded-full {
    border-radius: 9999px;
}
.px-4 {
    padding-left: 16px;
    padding-right: 16px;
}
.py-2 {
    padding-top: 8px;
    padding-bottom: 8px;
}
.p-3 {
    padding: 12px;
}
.bg-opacity-95 {
    --tw-bg-opacity: 0.95;
}
.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}
.text-center {
    text-align: center;
}
.disabled\\:cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.disabled\\:opacity-50:disabled {
    opacity: 0.5;
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
                <div className={`flex-1 min-w-0 p-6 sm:p-8 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <div className="bg-[var(--bg-secondary)] bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-[var(--shadow)] mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Paper Details</h1>
                            <p className="text-sm mt-1 text-[var(--text-secondary)]">View paper details, {user.name}!</p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                to="/notifications"
                                className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                aria-label={`View notifications (${notificationCount} unread)`}
                            >
                                🔔
                                {notificationCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[var(--accent-secondary)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                    {questionPaper ? (
                        <section className="quiz-section">
                            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4">
                                {questionPaper.title} ({questionPaper.subject}, {questionPaper.year})
                            </h2>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4">
                                Practice this paper to master concepts and boost exam confidence!
                            </p>
                            <p className="bg-[var(--bg-secondary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-4">
                                <strong>NB:</strong> Past papers highlight key question types.
                            </p>
                            <ul className="text-[var(--text-secondary)] text-sm sm:text-base mb-6 space-y-2">
                                <li><strong>Description:</strong> {questionPaper.description}</li>
                                <li><strong>Subject:</strong> {questionPaper.subject}</li>
                                <li><strong>Year:</strong> {questionPaper.year}</li>
                                <li><strong>Difficulty:</strong> {questionPaper.difficulty}</li>
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Tooltip text="Preview in browser">
                                    <button
                                        onClick={viewPaper}
                                        className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-md hover:bg-[var(--hover-primary)]"
                                    >
                                        Preview Paper
                                    </button>
                                </Tooltip>
                                <Tooltip text="Download not available">
                                    <button
                                        onClick={downloadPaper}
                                        className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-md hover:bg-[var(--hover-primary)] disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    >
                                        Download Paper
                                    </button>
                                </Tooltip>
                            </div>
                        </section>
                    ) : (
                        <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-2xl text-[var(--text-primary)] text-center">
                            Paper not found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

QuestionPaperDetails.propTypes = {
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
    ),
};

export default QuestionPaperDetails;
