import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import QuestionPaperCard from './QuestionPaperCard';

const DigitizedQuestionPapers = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [questionPapers, setQuestionPapers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filterSubject, setFilterSubject] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found');
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            // Fetch enrolled subjects
            const subjectsResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
            const subjectsData = await subjectsResponse.json();
            console.log('Enrolled subjects response:', subjectsData);
            if (!subjectsResponse.ok || !subjectsData.success) {
                throw new Error(subjectsData.message || 'Failed to fetch enrolled subjects');
            }
            const enrolledSubjects = subjectsData.data.map(s => s.subjectName || s).sort();
            setSubjects(enrolledSubjects);
            console.log('Enrolled subjects set:', enrolledSubjects);

            // Fetch digitized question papers
            const papersUrl = `${API_BASE_URL}/user${filterSubject ? `?subjectName=${encodeURIComponent(filterSubject)}` : ''}`;
            console.log('Fetching papers from:', papersUrl);
            const papersResponse = await fetch(papersUrl, { headers });
            const papersData = await papersResponse.json();
            console.log('Papers response:', papersData);
            if (!papersResponse.ok || !papersData.success) {
                throw new Error(papersData.message || `Failed to fetch digitized question papers: HTTP ${papersResponse.status}`);
            }

            console.log('Raw papers data:', papersData.data);
            const filteredPapers = filterSubject
                ? (papersData.data || []).filter(paper =>
                    (paper.subject?.subjectName || paper.subjectName || '').toLowerCase() === filterSubject.toLowerCase())
                : (papersData.data || []);
            console.log('Filtered papers:', filteredPapers);
            setQuestionPapers(filteredPapers);
            setLoading(false);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(`Error fetching data: ${err.message}`);
            setLoading(false);
        }
    }, [API_BASE_URL, filterSubject]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleViewPaper = (paper, paperTitle, isInteractive) => {
        setNotifications([
            ...notifications,
            {
                id: notifications.length + 1,
                message: `Viewed digitized question paper: ${paperTitle}`,
                date: new Date().toISOString().split('T')[0],
                read: false,
            },
        ]);
        navigate(`/digitized-question-papers/${paper.id}`);
    };

    const handleRetry = () => {
        fetchData();
    };

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
            <main
                className={`flex-1 p-6 sm:p-8 transition-all duration-300 max-w-5xl mx-auto w-full ${
                    isCollapsed ? 'sm:ml-16' : 'sm:ml-64'
                }`}
            >
                <div className="bg-[var(--bg-secondary)] bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-[var(--shadow)] mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Digitized Question Papers</h1>
                        <p className="text-sm mt-1 text-[var(--text-secondary)]">Access digitized past papers, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
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
                            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <section className="p-6 rounded-2xl shadow-2xl" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 1000 }}>
                    <header className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Available Digitized Question Papers</h2>
                    </header>
                    {error && (
                        <div className="p-4 mb-4 rounded-lg bg-[var(--accent-secondary)] text-[var(--text-primary)] flex justify-between items-center">
                            <span>{error}</span>
                            <button
                                onClick={handleRetry}
                                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            >
                                Retry
                            </button>
                        </div>
                    )}
                    {!error && (
                        <>
                            <div className="mb-6">
                                <label htmlFor="filterSubject" className="block text-[var(--text-primary)] mb-2 font-medium">
                                    Filter by Subject
                                </label>
                                <select
                                    id="filterSubject"
                                    value={filterSubject}
                                    onChange={(e) => setFilterSubject(e.target.value)}
                                    className="text-lg p-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] w-full"
                                >
                                    <option value="">All Subjects</option>
                                    {subjects.map((subject, index) => (
                                        <option key={index} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <section className="mt-6">
                                <h3 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Papers</h3>
                                {questionPapers.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {questionPapers.map((paper, index) => (
                                            <QuestionPaperCard
                                                key={paper.id || index}
                                                paper={paper}
                                                onView={handleViewPaper}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-[var(--text-secondary)]">
                                        No digitized question papers available{filterSubject ? ` for ${filterSubject}` : ''}.
                                    </p>
                                )}
                            </section>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
};

export default DigitizedQuestionPapers;