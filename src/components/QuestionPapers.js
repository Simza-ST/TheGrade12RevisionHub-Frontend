import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const API_BASE_URL = 'http://localhost:6262/user';

const QuestionPapers = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [questionPapers, setQuestionPapers] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        const fetchEnrolledSubjects = async () => {
            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No JWT token found');
                }

                const response = await fetch(`${API_BASE_URL}/enrolled-subjects`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Enrolled subjects response:', data);

                if (data && data.success && Array.isArray(data.data)) {
                    setEnrolledSubjects(data.data);
                } else {
                    throw new Error(data.message || 'Invalid response format');
                }
            } catch (err) {
                setError('Error fetching enrolled subjects: ' + err.message);
                console.error('Error fetching enrolled subjects:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledSubjects();
    }, []);

    useEffect(() => {
        const fetchQuestionPapers = async () => {
            if (!selectedSubject) {
                setQuestionPapers([]);
                return;
            }

            try {
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No JWT token found');
                }

                console.log('Fetching question papers for subject:', selectedSubject);
                const response = await fetch(`${API_BASE_URL}/question-papers?subjectName=${encodeURIComponent(selectedSubject)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                console.log('Question papers response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Question papers response:', data);

                if (data && data.success && Array.isArray(data.data)) {
                    const mappedPapers = data.data.map((paper) => ({
                        id: paper.id,
                        title: paper.fileName,
                        subject: paper.subject.subjectName,
                        year: paper.fileName.match(/\d{4}/)?.[0] || 'Unknown',
                    }));
                    setQuestionPapers(mappedPapers);
                } else {
                    throw new Error(data.message || 'Invalid response format');
                }
            } catch (err) {
                setError(`Error fetching question papers for ${selectedSubject}: ${err.message}`);
                console.error('Error fetching question papers:', err);
            }
        };

        fetchQuestionPapers();
    }, [selectedSubject]);

    const viewPdf = async (paperId) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }

            const response = await fetch(`${API_BASE_URL}/question-papers/${paperId}/view`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
            setShowModal(true);
        } catch (err) {
            setError(`Error viewing PDF: ${err.message}`);
            console.error('Error viewing PDF:', err);
        }
    };

    const downloadPdf = async (paperId, fileName) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }

            const response = await fetch(`${API_BASE_URL}/question-papers/${paperId}/download`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(`Error downloading PDF: ${err.message}`);
            console.error('Error downloading PDF:', err);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setPdfUrl(null);
        if (pdfUrl) {
            window.URL.revokeObjectURL(pdfUrl);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setError(null);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <p className="text-red-400">{error}</p>
                <button
                    onClick={() => {
                        setError(null);
                        setSelectedSubject('');
                    }}
                    className="ml-4 text-teal-400 hover:underline"
                >
                    Retry
                </button>
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
                        <h1 className="text-3xl font-bold">Question Papers</h1>
                        <p className="text-sm mt-1 text-gray-300">Access past papers, {user.name}!</p>
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
                <div className={`bg-teal-${darkMode ? '900' : '800'} bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6`}>
                    <h2 className="text-xl font-semibold mb-4 text-white">Your Enrolled Subjects</h2>
                    <select
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        className={`w-full p-2 rounded bg-teal-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                            darkMode ? 'bg-teal-900' : 'bg-teal-700'
                        }`}
                        aria-label="Select a subject"
                    >
                        <option value="" disabled>
                            Select a subject
                        </option>
                        {enrolledSubjects.length > 0 ? (
                            enrolledSubjects.map((subject, index) => (
                                <option key={index} value={subject} className="text-white">
                                    {subject}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>
                                No enrolled subjects available
                            </option>
                        )}
                    </select>
                </div>
                <div className={`bg-teal-${darkMode ? '900' : '800'} bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl`}>
                    <h2 className="text-xl font-semibold mb-4 text-white">Available Question Papers</h2>
                    <ul className="space-y-2">
                        {questionPapers.length > 0 ? (
                            questionPapers.map((paper) => (
                                <li key={paper.id} className="p-2 bg-teal-700 rounded flex justify-between items-center">
                                    <span className="text-white">
                                        {paper.title} ({paper.subject}, {paper.year})
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            className="text-teal-400 hover:underline"
                                            onClick={() => viewPdf(paper.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="text-teal-400 hover:underline"
                                            onClick={() => downloadPdf(paper.id, paper.title)}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-300">
                                {selectedSubject
                                    ? `No question papers available for ${selectedSubject}.`
                                    : 'Please select a subject to view question papers.'}
                            </p>
                        )}
                    </ul>
                </div>
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className={`bg-teal-${darkMode ? '900' : '800'} p-6 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh]`}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white">View PDF</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-teal-400"
                                    aria-label="Close modal"
                                >
                                    ✕
                                </button>
                            </div>
                            {pdfUrl && (
                                <iframe
                                    src={pdfUrl}
                                    className="w-full h-[70vh] rounded"
                                    title="Question Paper PDF"
                                />
                            )}
                        </div>
                    </div>
                )}
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
    setNotifications: PropTypes.func.isRequired,
};

export default QuestionPapers;
