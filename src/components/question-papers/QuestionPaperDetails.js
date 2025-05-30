import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import LoadingSpinner from './LoadingSpinner';
import ErrorDialog from './ErrorDialog';
import Tooltip from './Tooltip';
import { API_BASE_URL, getAuthHeaders } from '../../utils/api';

const QuestionPaperDetails = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questionPaper, setQuestionPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = { name: 'Student', title: 'CS Student', profilePicture: null };

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
                        description: data.data.description || 'This paper covers key topics for exam prep.',
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
                throw new Error(`Failed to download paper: HTTP ${response.status}`);
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
            setError(`Error downloading paper: ${err.message}`);
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
                        description: data.data.description || 'This paper covers key topics for exam prep.',
                        difficulty: data.data.difficulty || 'Not specified',
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(`Error retrying: ${err.message}`);
                setLoading(false);
            });
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-700 via-gray-800 to-red-700 items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <ErrorDialog error={error} onRetry={resetError} />;
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-teal-700 via-gray-800 to-red-700">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={darkMode}
            />
            <main
                className={`flex-1 p-4 sm:p-6 transition-all duration-300 max-w-4xl mx-auto w-full ${
                    isCollapsed ? 'sm:ml-16' : 'sm:ml-64'
                }`}
            >
                <header className="bg-teal-800/80 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
                    <h1 className="text-lg sm:text-xl font-semibold text-white mb-2">{questionPaper.title}</h1>
                    <p className="text-sm sm:text-base text-gray-200">{questionPaper.subject} - {questionPaper.year}</p>
                </header>
                <section className="bg-teal-800/80 p-4 sm:p-6 rounded-lg shadow-lg">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Paper Details</h2>
                    <p className="text-sm sm:text-base text-gray-200 mb-4">
                        Practice this paper to master concepts and boost exam confidence!
                    </p>
                    <p className="bg-teal-700/90 p-3 rounded-md text-sm text-gray-200 mb-4">
                        <strong>NB:</strong> Past papers highlight key question types.
                    </p>
                    <ul className="text-gray-200 text-sm sm:text-base mb-6 space-y-2">
                        <li><strong>Description:</strong> {questionPaper.description}</li>
                        <li><strong>Subject:</strong> {questionPaper.subject}</li>
                        <li><strong>Year:</strong> {questionPaper.year}</li>
                        <li><strong>Difficulty:</strong> {questionPaper.difficulty}</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Tooltip text="Preview in browser">
                            <button
                                onClick={viewPaper}
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-400 disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-colors duration-200"
                            >
                                Preview Paper
                            </button>
                        </Tooltip>
                        <Tooltip text="Save offline">
                            <button
                                onClick={downloadPaper}
                                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-400 disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-colors duration-200"
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