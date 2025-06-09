import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
import FilterSection from './FilterSection';
import PapersList from './PapersList';
import PDFModal from './PDFModal';
import ErrorDialog from './ErrorDialog';
import LoadingSpinner from './LoadingSpinner';
import { useQuestionPapers } from '../../../hooks/useQuestionPapers';

const QuestionPaperList = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
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

    const user = { name: 'Student', title: 'CS Student', profilePicture: null };
    const notificationCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        const newSubject = e.target.value;
        setSelectedSubject(newSubject);
        setSelectedYear('');
    };

    const handleYearChange = (e) => {
        const newYear = e.target.value;
        setSelectedYear(newYear);
    };

    const years = [...new Set(questionPapers.map((paper) => paper.year))].sort();

    if (loading) {
        return (
            <div className="full">
                <div className={`flex min-h-screen bg-[var(--bg-secondary)] justify-center items-center ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

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
                        .justify-center {
                            justify-content: center;
                        }
                        .gap-4 {
                            gap: 16px;
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
                        .mb-3 {
                            margin-bottom: 12px;
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
                        .list-disc {
                            list-style-type: disc;
                        }
                        .list-inside {
                            list-style-position: inside;
                        }
                        .space-y-1 {
                            margin-bottom: 4px;
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
                    <section className="quiz-section">
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
                            <li>Preview with.</li>
                            <li>Save offline with.</li>
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
                    {error && <ErrorDialog error={error} onRetry={resetError} />}
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
                </div>
            </div>
        </div>
    );
};

QuestionPaperList.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.bool.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        }),
    ),
};

export default QuestionPaperList;