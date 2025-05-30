import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../Sidebar';
import Header from '../common/Header';
import FilterSection from './FilterSection';
import PapersList from './QuestionPapersList';
import PDFModal from './PDFModal';
import ErrorDialog from './ErrorDialog';
import LoadingSpinner from './LoadingSpinner';
import { useQuestionPapers } from '../../hooks/useQuestionPapers';

/**
 * QuestionPapers component to display and manage question papers
 * @param {Object} props - Component props
 * @param {boolean} isCollapsed - Sidebar collapse state
 * @param {Function} setIsCollapsed - Function to toggle sidebar collapse
 * @param {boolean} darkMode - Dark mode state
 * @param {Function} setDarkMode - Function to toggle dark mode
 * @param {Object[]} notifications - List of notifications
 */
const QuestionPapers = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
    const navigate = useNavigate(); // Define navigate
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
        navigate('/login'); // Now navigate is defined
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
                <Header
                    user={user}
                    notificationCount={notificationCount}
                    darkMode={darkMode}
                    toggleDarkMode={() => setDarkMode(!darkMode)}
                />
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