import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import LoadingSpinner from './LoadingSpinner';
import ErrorDialog from './ErrorDialog';
import Tooltip from './Tooltip';
import { API_BASE_URL, getAuthHeaders } from '../../utils/api';

/**
 * QuestionPaperDetails component to display details of a specific question paper with instructional content
 * @param {Object} props - Component props
 * @param {boolean} isCollapsed - Sidebar collapse state
 * @param {Function} setIsCollapsed - Function to toggle sidebar collapse
 * @param {boolean} darkMode - Dark mode state
 * @param {Function} setDarkMode - Function to toggle dark mode
 */
const QuestionPaperDetails = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questionPaper, setQuestionPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = {
        name: 'Student',
        title: 'CS Student',
        profilePicture: null,
    };

    useEffect(() => {
        const fetchPaper = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/question-papers/${id}`, {
                    headers: getAuthHeaders(),
                });
                console.log('Paper Details API status:', response.status);
                if (response.status === 401) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch paper: HTTP ${response.status}`);
                }
                const data = await response.json();
                console.log('Paper Details API data:', data);
                if (data && data.data) {
                    setQuestionPaper({
                        id: data.data.id,
                        title: data.data.fileName,
                        subject: data.data.subject?.subjectName || 'Unknown',
                        year: data.data.year || data.data.fileName.match(/\d{4}/)?.[0] || 'Unknown',
                        description: data.data.description || 'This paper covers key topics to help you prepare effectively for your exam.',
                        difficulty: data.data.difficulty || 'Not specified',
                    });
                } else {
                    throw new Error('Invalid paper response format');
                }
            } catch (err) {
                setError(`Error fetching paper details: ${err.message}`);
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPaper();
    }, [id, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const viewPaper = () => {
        navigate(`/question-papers/list?paperId=${id}`);
    };

    const downloadPaper = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/question-papers/${id}/download`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            });
            if (response.status === 401) {
                localStorage.removeItem('jwt');
                navigate('/login');
                return;
            }
            if (!response.ok) {
                throw new Error(`Failed to download PDF: HTTP ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = questionPaper.title;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(`Error downloading PDF: ${err.message}`);
        }
    };

    const resetError = () => {
        setError(null);
        setLoading(true);
        fetch(`${API_BASE_URL}/question-papers/${id}`, { headers: getAuthHeaders() })
            .then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (data && data.data) {
                    setQuestionPaper({
                        id: data.data.id,
                        title: data.data.fileName,
                        subject: data.data.subject?.subjectName || 'Unknown',
                        year: data.data.year || data.data.fileName.match(/\d{4}/)?.[0] || 'Unknown',
                        description: data.data.description || 'This paper covers key topics to help you prepare effectively for your exam.',
                        difficulty: data.data.difficulty || 'Not specified',
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(`Error fetching: ${err.message}`);
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <ErrorDialog error={error} onRetry={resetError} />;
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
                <header className="bg-gradient-to-r from-teal-600 to-red-600 p-4 rounded-lg shadow-md mb-4">
                    <h1 className="text-2xl font-bold text-white">{questionPaper.title}</h1>
                    <p className="text-sm text-gray-300 mt-1">
                        {questionPaper.subject} - {questionPaper.year}
                    </p>
                </header>
                <section className="bg-teal-900 bg-opacity-90 p-6 rounded-lg shadow-md mb-4">
                    <h2 className="text-xl font-semibold text-white mb-4">Why Use This Paper?</h2>
                    <p className="text-gray-300 text-sm mb-4">
                        Practicing with this past paper will help you master key concepts, improve time management, and build confidence for your upcoming exam. Dive in to get a head start!
                    </p>
                    <div className="bg-teal-800 bg-opacity-80 p-3 rounded text-sm text-gray-200 mb-4">
                        <strong>NB:</strong> Reviewing past papers like this one can reveal common question types and help you focus your study efforts.
                    </div>
                </section>
                <section className="bg-teal-900 bg-opacity-90 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-white mb-4">Paper Details</h2>
                    <div className="text-gray-300 space-y-4">
                        <p>
                            <strong>Description:</strong> {questionPaper.description}
                        </p>
                        <p>
                            <strong>Subject:</strong> {questionPaper.subject}
                        </p>
                        <p>
                            <strong>Year:</strong> {questionPaper.year}
                        </p>
                        <p>
                            <strong>Difficulty:</strong> {questionPaper.difficulty}
                        </p>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <Tooltip text="Preview this paper in your browser">
                            <button
                                onClick={viewPaper}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                            >
                                View Paper
                            </button>
                        </Tooltip>
                        <Tooltip text="Download this paper for offline study">
                            <button
                                onClick={downloadPaper}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
                            >
                                Download Paper
                            </button>
                        </Tooltip>
                    </div>
                </section>
            </main>
        </div>
    );
};

QuestionPaperDetails.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
};

export default QuestionPaperDetails;