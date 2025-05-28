import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import Header from '../common/Header';
import FilterSection from './FilterSection';
import PapersList from './PapersList';
import PDFModal from './PDFModal';
import ErrorDialog from './ErrorDialog';
import LoadingSpinner from './LoadingSpinner';
import { useQuestionPapers } from '../../hooks/useQuestionPapers';

/**
 * QuestionPapersList component to display and manage a list of question papers
 * @param {Object} props - Component props
 * @param {boolean} isCollapsed - Sidebar collapse state
 * @param {Function} setIsCollapsed - Function to toggle sidebar collapse
 * @param {boolean} darkMode - Dark mode state
 * @param {Function} setDarkMode - Function to toggle dark mode
 * @param {Object[]} notifications - List of notifications
 */
const QuestionPapersList = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
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
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 items-center justify-center">
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
                className={`flex-1 p-4 sm:p-6 transition-all duration-300 max-w-5xl mx-auto w-full ${
                    isCollapsed ? 'sm:ml-16' : 'sm:ml-64'
                }`}
            >
                <Header
                    user={user}
                    notificationCount={notificationCount}
                    darkMode={darkMode}
                    toggleDarkMode={() => setDarkMode(!darkMode)}
                />
                <section className="bg-teal-900 bg-opacity-80 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">Get Started with Past Papers</h2>
                    <p className="text-gray-200 text-sm sm:text-base mb-4">
                        Select a subject and year to explore past exam papers. Practicing with these papers helps you understand question patterns and boost your confidence for exams!
                    </p>
                    <div className="bg-teal-800 bg-opacity-90 p-3 rounded-md text-sm text-gray-200">
                        <strong>NB:</strong> Regular practice with past papers can improve your exam performance by up to 20%. Start today!
                    </div>
                </section>
                <section className="bg-teal-900 bg-opacity-80 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">Quick Tips</h2>
                    <ul className="list-disc list-inside text-gray-200 text-sm sm:text-base space-y-2">
                        <li>Use the filters to narrow down papers by subject and year.</li>
                        <li>Click <strong>View</strong> to preview a paper in your browser.</li>
                        <li>Click <strong>Download</strong> to save a paper for offline study.</li>
                        <li>Check the paper details page for more information about each paper.</li>
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
    ),
};

export default QuestionPapersList;