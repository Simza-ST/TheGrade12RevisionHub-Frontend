import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const QuestionPapers = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [questionPapers, setQuestionPapers] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No JWT token found. Please log in.');
                }

                console.log('Fetching subjects from:', `${process.env.REACT_APP_API_BASE_URL}/user/enrolled-subjects`);
                console.log('Using token:', token.substring(0, 10) + '...'); // Log first 10 chars of token for safety

                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/user/enrolled-subjects`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Subjects response status:', response.status);

                if (!response.ok) {
                    const text = await response.text();
                    console.error('Subjects response body:', text.substring(0, 100)); // Log first 100 chars
                    throw new Error(`Failed to fetch subjects: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Subjects response data:', data);

                if (data.success) {
                    setEnrolledSubjects(data.data || []);
                } else {
                    throw new Error(data.message || 'Failed to fetch subjects');
                }
            } catch (err) {
                console.error('Subjects fetch error:', err.message);
                setError(`Could not load subjects: ${err.message}`);
            } finally {
                // Fetch question papers only if a subject is selected
                if (selectedSubject) {
                    try {
                        const token = localStorage.getItem('jwt');
                        const response = await fetch(
                            `${process.env.REACT_APP_API_BASE_URL}/user/question-papers?subjectName=${encodeURIComponent(selectedSubject)}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        console.log('Papers response status:', response.status);

                        if (!response.ok) {
                            const text = await response.text();
                            console.error('Papers response body:', text.substring(0, 100));
                            throw new Error(`Failed to fetch papers: ${response.status} ${response.statusText}`);
                        }

                        const data = await response.json();
                        if (data.success) {
                            setQuestionPapers(data.data || []);
                        } else {
                            throw new Error(data.message || 'Failed to fetch papers');
                        }
                    } catch (err) {
                        console.error('Papers fetch error:', err.message);
                        setError(`Could not load question papers: ${err.message}`);
                    }
                } else {
                    setQuestionPapers([]);
                }
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [selectedSubject]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleViewPaper = (fileUrl) => {
        window.open(fileUrl, '_blank');
    };

    const handleDownloadPaper = (fileUrl, title) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `${title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 justify-center items-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <div
                className={`
                    flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
                    ${isCollapsed ? 'ml-16' : 'ml-64'}
                    ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}
                `}
            >
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Question Papers</h1>
                        <p className="text-sm mt-1">Access past papers, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
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
                            className="px-4 py-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Available Question Papers</h2>
                    {enrolledSubjects.length > 0 ? (
                        <div>
                            <label htmlFor="subject-select" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                Select a Subject
                            </label>
                            <select
                                id="subject-select"
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                            >
                                <option value="">All Subjects</option>
                                {enrolledSubjects.map((subject) => (
                                    <option key={subject} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-4 space-y-4">
                                {enrolledSubjects
                                    .filter((subject) => !selectedSubject || subject === selectedSubject)
                                    .map((subject) => (
                                        <div key={subject} className="border-b pb-4">
                                            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{subject}</h3>
                                            <ul className="space-y-2 mt-2">
                                                {questionPapers
                                                    .filter((paper) => paper.subject.name === subject)
                                                    .map((paper) => (
                                                        <li
                                                            key={paper.id}
                                                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded flex justify-between items-center"
                                                        >
                                                            <span className="text-gray-700 dark:text-gray-200">
                                                                {paper.title} ({paper.year})
                                                            </span>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    className="text-indigo-600 hover:underline"
                                                                    onClick={() => handleViewPaper(paper.fileUrl)}
                                                                >
                                                                    View
                                                                </button>
                                                                <button
                                                                    className="text-indigo-600 hover:underline"
                                                                    onClick={() => handleDownloadPaper(paper.fileUrl, paper.title)}
                                                                >
                                                                    Download
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                {questionPapers.filter((paper) => paper.subject.name === subject).length === 0 && (
                                                    <p className="text-gray-600 dark:text-gray-300">No question papers available for {subject}.</p>
                                                )}
                                            </ul>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">No enrolled subjects. Please enroll in a subject to view question papers.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

QuestionPapers.propTypes = {
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
};

export default QuestionPapers;