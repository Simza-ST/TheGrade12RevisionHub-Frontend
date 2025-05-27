import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt-token');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

const QuestionPapers = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
    const navigate = useNavigate();
    const { subject } = useParams();
    const [questionPapers, setQuestionPapers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [currentPaper, setCurrentPaper] = useState(null);
    const [user] = useState({
        name: 'Student',
        title: 'CS Student',
        profilePicture: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('jwt-token');
        console.log('JWT Token:', token);
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/courses`, {
                    headers: getAuthHeaders(),
                });
                console.log('Subjects API status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Subjects API data:', data);
                if (data && Array.isArray(data.data)) {
                    setSubjects(data.data);
                    const decodedSubject = subject ? decodeURIComponent(subject) : '';
                    console.log('URL Subject:', decodedSubject);
                    if (decodedSubject && data.data.includes(decodedSubject)) {
                        setSelectedSubject(decodedSubject);
                    } else if (decodedSubject) {
                        setError(`Invalid subject: ${decodedSubject}`);
                    }
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                setError(`Error fetching subjects: ${err.message}`);
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, [navigate, subject]);

    useEffect(() => {
        const fetchQuestionPapers = async () => {
            if (!selectedSubject) {
                setQuestionPapers([]);
                return;
            }
            try {
                const response = await fetch(
                    `${API_BASE_URL}/past-papers?subjectName=${encodeURIComponent(selectedSubject)}`,
                    { headers: getAuthHeaders() }
                );
                console.log('Papers API status:', response.status);
                const data = await response.json();
                console.log('Papers API data:', data);
                if (data && Array.isArray(data.data)) {
                    setQuestionPapers(
                        data.data.map((paper) => ({
                            id: paper.id,
                            title: paper.fileName,
                            subject: paper.subject.subjectName,
                            year: paper.year || paper.fileName.match(/\d{4}/)?.[0] || 'Unknown',
                        }))
                    );
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                setError(`Error fetching papers: ${err.message}`);
                console.error('Error:', err);
            }
        };
        fetchQuestionPapers();
    }, [selectedSubject]);

    const viewPdf = async (paperId) => {
        setPdfLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/past-papers/${paperId}/view`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
            setShowModal(true);
            setCurrentPaper(questionPapers.find((p) => p.id === paperId));
        } catch (err) {
            setError(`Error viewing PDF: ${err.message}`);
        } finally {
            setPdfLoading(false);
        }
    };

    const downloadPdf = async (paperId, fileName) => {
        setPdfLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/past-papers/${paperId}/download`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` },
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
        } finally {
            setPdfLoading(false);
        }
    };

    const closeModal = useCallback(() => {
        setShowModal(false);
        setPdfUrl(null);
        setCurrentPaper(null);
        if (pdfUrl) {
            window.URL.revokeObjectURL(pdfUrl);
        }
    }, [pdfUrl]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape' && showModal) closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showModal, closeModal]);

    useEffect(() => {
        return () => {
            if (pdfUrl) {
                window.URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    const handleLogout = () => {
        localStorage.removeItem('jwt-token');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setSelectedYear('');
        setError(null);
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setError(null);
    };

    const years = [...new Set(questionPapers.map((paper) => paper.year))].sort();
    const filteredPapers = questionPapers.filter(
        (paper) => paper.subject === selectedSubject && (!selectedYear || paper.year === selectedYear)
    );
    const notificationCount = notifications.filter((n) => !n.read).length;

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center text-center">
                <div className="bg-teal-900 bg-opacity-90 p-6 rounded-lg shadow-lg">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={() => {
                            setError(null);
                            setLoading(true);
                            fetch(`${API_BASE_URL}/courses`, { headers: getAuthHeaders() })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (data && Array.isArray(data.data)) {
                                        setSubjects(data.data);
                                    }
                                    setLoading(false);
                                })
                                .catch((err) => {
                                    setError(`Error retrying: ${err.message}`);
                                    setLoading(false);
                                });
                        }}
                        className="text-teal-400 hover:underline px-4 py-2"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={darkMode}
            />
            <main
                className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
                    isCollapsed ? 'ml-16' : 'ml-64'
                }`}
            >
                <header className="bg-gradient-to-r from-teal-600 to-red-600 p-4 rounded-lg shadow-md mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">Past Papers</h1>
                        <p className="text-sm text-gray-300 mt-1">Access past papers, {user.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            to="/notifications"
                            className="relative px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
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
                            className="px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light' : '🌙 Dark'}
                        </button>
                    </div>
                </header>
                <section className="mb-4">
                    <div className="bg-teal-900 bg-opacity-90 p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center">
                        <label htmlFor="subject-select" className="text-white font-semibold text-lg">
                            Filter by Subject
                        </label>
                        <select
                            id="subject-select"
                            value={selectedSubject}
                            onChange={handleSubjectChange}
                            className={`w-full sm:w-auto p-2 rounded bg-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                                darkMode ? 'dark:bg-teal-800' : ''
                            }`}
                            aria-label="Select a subject"
                        >
                            <option value="" disabled>
                                Select a subject
                            </option>
                            {subjects.length > 0 ? (
                                subjects.map((subject, index) => (
                                    <option key={index} value={subject} className="text-white">
                                        {subject}
                                    </option>
                                ))
                            ) : (
                                <option value="" disabled>
                                    No subjects available
                                </option>
                            )}
                        </select>
                        <label htmlFor="year-select" className="text-white font-semibold text-lg">
                            Filter by Year
                        </label>
                        <select
                            id="year-select"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className={`w-full sm:w-auto p-2 rounded bg-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 ${
                                darkMode ? 'dark:bg-teal-800' : ''
                            }`}
                            aria-label="Select a year"
                        >
                            <option value="">All Years</option>
                            {years.map((year, index) => (
                                <option key={index} value={year} className="text-white">
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>
                <section className="bg-teal-900 bg-opacity-90 p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-white mb-3">Available Papers</h2>
                    <div className="space-y-2">
                        {filteredPapers.length > 0 ? (
                            filteredPapers.map((paper) => (
                                <div
                                    key={paper.id}
                                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 bg-teal-600 rounded gap-3"
                                >
                                    <span className="text-white text-sm sm:text-base flex-1">
                                        {paper.title} ({paper.subject}, {paper.year})
                                    </span>
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <button
                                            onClick={() => viewPdf(paper.id)}
                                            disabled={pdfLoading}
                                            className="text-teal-300 hover:underline px-2 py-1 disabled:opacity-50"
                                            aria-label={`View ${paper.title}`}
                                        >
                                            {pdfLoading ? 'Loading...' : 'View'}
                                        </button>
                                        <button
                                            onClick={() => downloadPdf(paper.id, paper.title)}
                                            disabled={pdfLoading}
                                            className="text-teal-300 hover:underline px-2 py-1 disabled:opacity-50"
                                            aria-label={`Download ${paper.title}`}
                                        >
                                            {pdfLoading ? 'Loading...' : 'Download'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300 text-sm">
                                {selectedSubject
                                    ? `No papers available for ${selectedSubject}${selectedYear ? ` in ${selectedYear}` : ''}.`
                                    : 'Please select a subject.'}
                            </p>
                        )}
                    </div>
                </section>
                {showModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div className="bg-teal-900 bg-opacity-90 p-4 rounded-lg shadow-lg w-full max-w-3xl max-h-[85vh] flex flex-col">
                            <div className="flex justify-between items-center mb-3">
                                <h2 id="modal-title" className="text-lg font-semibold text-white">
                                    {currentPaper ? currentPaper.title : 'View PDF'}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:text-teal-300 text-xl"
                                    aria-label="Close modal"
                                >
                                    ✕
                                </button>
                            </div>
                            {pdfLoading ? (
                                <div className="flex justify-center items-center h-[60vh]">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400"></div>
                                </div>
                            ) : (
                                pdfUrl && (
                                    <iframe
                                        src={pdfUrl}
                                        className="w-full h-[60vh] rounded"
                                        title="Past Paper PDF"
                                    />
                                )
                            )}
                            {currentPaper && !pdfLoading && (
                                <button
                                    onClick={() => downloadPdf(currentPaper.id, currentPaper.title)}
                                    className="mt-3 text-teal-300 hover:underline px-2 py-1"
                                    aria-label={`Download ${currentPaper.title}`}
                                >
                                    Download PDF
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </main>
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
            id: PropTypes.number,
            message: PropTypes.string,
            date: PropTypes.string,
            read: PropTypes.bool,
        })
    ),
};

export default QuestionPapers;