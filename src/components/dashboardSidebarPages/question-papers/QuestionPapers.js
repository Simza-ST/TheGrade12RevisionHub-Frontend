import PropTypes from 'prop-types';
import { useNavigate, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import FilterSection from './FilterSection';
import PapersList from './PapersList';
import PDFModal from './PDFModal';
import ErrorDialog from './ErrorDialog';
import LoadingSpinner from './LoadingSpinner';
import { useQuestionPapers } from '../../../hooks/useQuestionPapers';

const QuestionPapers = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
    const navigate = useNavigate();
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

    const user = {
        name: 'Student',
        title: 'CS Student',
        profilePicture: null,
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setSelectedYear('');
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const years = [...new Set(questionPapers.map((paper) => paper.year))].sort();
    const notificationCount = notifications.filter((n) => !n.read).length;

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return <ErrorDialog error={error} onRetry={resetError} />;
    }

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
                className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}
            >
                <div className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-primary)] p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Question Papers</h1>
                        <p className="text-sm mt-1 text-[var(--text-secondary)]">Explore past papers, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-primary)]"
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
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-primary)]"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
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