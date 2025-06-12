import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
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
        setQuestionPaper({
            id,
            title: `Paper ${id}`,
            subject: 'Mathematics',
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
        navigate(`/question-papers/list?paperId=${id}&subject=${encodeURIComponent(questionPaper?.subject || '')}`);
    };

    const downloadPaper = () => {
        alert('Download not available in this version.');
    };

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
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
                        .text-3xl {
                            font-size: 24px;
                        }
                        .text-xl {
                            font-size: 18px;
                        }
                        .text-lg {
                            font-size: 16px;
                        }
                        .text-sm {
                            font-size: 12px;
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
                        .font-medium {
                            font-weight: 500;
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
                            font-size: 14px;
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
                        .service-card {
                            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                            padding: 16px;
                            border-radius: 8px;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .hover\\:shadow-lg:hover {
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
                        }
                        .animate-spin {
                            animation: spin 1s linear infinite !important;
                        }
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                        .ml-16 {
                            margin-left: 64px;
                        }
                        .ml-64 {
                            margin-left: 256px;
                        }
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
                        .underline {
                            text-decoration: underline;
                        }
                        .list-disc {
                            list-style-type: disc;
                        }
                        .list-inside {
                            list-style-position: inside;
                        }
                        .space-y-2 > * + * {
                            margin-top: 8px;
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
                        <div className="quiz-section">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                                    {questionPaper.title} ({questionPaper.subject}, {questionPaper.year})
                                </h2>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] mb-4">
                                Practice this paper to master concepts and boost exam confidence!
                            </p>
                            <p className="bg-[var(--bg-tertiary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-4">
                                <strong>NB:</strong> Past papers highlight key question types.
                            </p>
                            <ul className="text-sm text-[var(--text-secondary)] mb-6 space-y-2">
                                <li><strong>Description:</strong> {questionPaper.description}</li>
                                <li><strong>Subject:</strong> {questionPaper.subject}</li>
                                <li><strong>Year:</strong> {questionPaper.year}</li>
                                <li><strong>Difficulty:</strong> {questionPaper.difficulty}</li>
                            </ul>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <Tooltip text="Preview in browser">
                                    <button
                                        onClick={viewPaper}
                                        className="btn-primary"
                                    >
                                        Preview Paper
                                    </button>
                                </Tooltip>
                                <Tooltip text="Download not available">
                                    <button
                                        onClick={downloadPaper}
                                        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled
                                    >
                                        Download Paper
                                    </button>
                                </Tooltip>
                            </div>
                        </div>
                    ) : (
                        <div className="quiz-section text-[var(--text-primary)] text-center">
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