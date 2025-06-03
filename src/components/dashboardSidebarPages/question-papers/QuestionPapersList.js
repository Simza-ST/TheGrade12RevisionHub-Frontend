import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import FilterSection from './FilterSection';
import PapersList from './PapersList';
import PDFModal from './PDFModal';
import ErrorDialog from './ErrorDialog';
import LoadingSpinner from './LoadingSpinner';
import { useQuestionPapers } from '../../../hooks/useQuestionPapers';

const QuestionPapersList = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
    console.log('QuestionPapersList props:', { isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications });

    const navigate = useNavigate();
    const location = useLocation();
    const {
        questionPapers,
        subjects,
        selectedSubject,
        setSelectedSubject,
        selectedYear,
        setSelectedYear,
        loading,
        error,
        resetError,
        pdfUrl,
        showModal,
        setShowModal,
        pdfLoading,
        currentPaper,
        viewPdf,
        downloadPdf,
    } = useQuestionPapers();

    console.log('QuestionPapersList state:', { questionPapers, subjects, selectedSubject, selectedYear, loading, error }); // Add debug log

    const user = { name: 'Student', title: 'CS Student', profilePicture: null };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subject = params.get('subject');
        console.log('Query subject:', subject, 'Available subjects:', subjects);
        if (subject && subjects.includes(decodeURIComponent(subject))) {
            setSelectedSubject(decodeURIComponent(subject));
        } else if (subject) {
            console.log(`Subject "${decodeURIComponent(subject)}" not found in subjects:`, subjects);
            setSelectedSubject('');
            navigate('/question-papers', { replace: true });
        }
    }, [location.search, subjects, setSelectedSubject, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        const newSubject = e.target.value;
        console.log('handleSubjectChange:', { newSubject }); // Add debug log
        setSelectedSubject(newSubject);
        setSelectedYear('');
        navigate('/question-papers', { replace: true });
    };

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        console.log('handleYearChange:', { newYear }); // Add debug log
        setSelectedYear(newYear);
    };

    const years = [...new Set(questionPapers.map((paper) => paper.year))].sort();
    const notificationCount = notifications.filter((n) => !n.read).length;

    if (loading) {
        console.log('Rendering LoadingSpinner'); // Add debug log
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        console.log('Rendering ErrorDialog:', { error }); // Add debug log
        return <ErrorDialog error={error} onRetry={resetError} />;
    }

    console.log('Rendering main content'); // Add debug log
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
                className={`flex-1 p-4 sm:p-6 transition-all duration-300 max-w-5xl mx-auto w-full ${
                    isCollapsed ? 'sm:ml-16' : 'sm:ml-64'
                }`}
            >
                <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Question Papers</h1>
                        <p className="text-sm mt-1 text-[var(--text-secondary)]">Explore past papers, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            aria-label={`View notifications (${notificationCount} unread)`}
                        >
                            🔔
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--accent-secondary)] text-[var(--text-primary)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => typeof setDarkMode === 'function' ? setDarkMode(!darkMode) : console.warn('setDarkMode is not a function')}
                            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <section className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-3">Explore Past Papers</h2>
                    <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-3">
                        Filter by subject and year to find exam papers and boost your prep!
                    </p>
                    <p className="bg-[var(--bg-secondary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-3">
                        <strong>NB:</strong> Past papers can improve your score by up to 20%.
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2">Quick Tips</h3>
                    <ul className="list-disc list-inside text-[var(--text-secondary)] text-sm sm:text-base space-y-1">
                        <li>Filter by subject/year.</li>
                        <li>Preview with <strong>View</strong>.</li>
                        <li>Save offline with <strong>Download</strong>.</li>
                        <li>Check details for more info.</li>
                    </ul>
                </section>
                <FilterSection
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    onSubjectChange={handleSubjectChange}
                    years={years}
                    selectedYear={selectedYear}
                    onYearChange={handleYearChange}
                    darkMode={darkMode}
                />
                <PapersList
                    papers={questionPapers}
                    selectedSubject={selectedSubject}
                    selectedYear={selectedYear}
                    pdfLoading={pdfLoading}
                    onViewPdf={viewPdf}
                    onDownloadPdf={downloadPdf}
                />
                <PDFModal
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    pdfUrl={pdfUrl}
                    currentPaper={currentPaper}
                    pdfLoading={pdfLoading}
                    onDownloadPdf={downloadPdf}
                />
            </main>
        </div>
    );
};

QuestionPapersList.propTypes = {
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
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default QuestionPapersList;