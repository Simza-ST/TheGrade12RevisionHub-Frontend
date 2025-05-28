import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../common/Header';
import FilterSection from './FilterSection';
import PapersList from './PapersList';
import PDFModal from './PDFModal';
import ErrorDialog from './ErrorDialog';
import LoadingSpinner from './LoadingSpinner';
import { useQuestionPapers } from '../../hooks/useQuestionPapers';

const QuestionPapersList = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
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

    const user = { name: 'Student', title: 'CS Student', profilePicture: null };

    // Handle subject query parameter
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const subject = params.get('subject');
        console.log('Query subject:', subject, 'Available subjects:', subjects);
        if (subject && subjects.includes(decodeURIComponent(subject))) {
            setSelectedSubject(decodeURIComponent(subject));
        } else if (subject) {
            console.log(`Subject "${decodeURIComponent(subject)}" not found in subjects:`, subjects);
            setSelectedSubject(''); // Clear invalid subject
            navigate('/question-papers', { replace: true }); // Clear query param
        }
    }, [location.search, subjects, setSelectedSubject, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setSelectedYear('');
        navigate('/question-papers', { replace: true }); // Clear query params
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const years = [...new Set(questionPapers.map((paper) => paper.year))].sort();
    const notificationCount = notifications.filter((n) => !n.read).length;

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
                <section className="bg-teal-800/80 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-3">Explore Past Papers</h2>
                    <p className="text-gray-200 text-sm sm:text-base mb-3">
                        Filter by subject and year to find exam papers and boost your prep!
                    </p>
                    <p className="bg-teal-700/90 p-3 rounded-md text-sm text-gray-200 mb-3">
                        <strong>NB:</strong> Past papers can improve your score by up to 20%.
                    </p>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Quick Tips</h3>
                    <ul className="list-disc list-inside text-gray-200 text-sm sm:text-base space-y-1">
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
    ),
};

export default QuestionPapersList;