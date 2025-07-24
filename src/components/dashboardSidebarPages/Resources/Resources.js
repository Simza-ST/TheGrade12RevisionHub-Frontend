import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';
import useResources from '../../../hooks/useResources';
import FilterSection from "./FilterSection";
import ResourcesList from "./ResourcesList";
import ResourceModal from "./ResourceModal";
import VideoModal from "./VideoModal";

const Resources = ({ user, setNotifications, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [] }) => {
    const navigate = useNavigate();
    const {
        resources,
        subjects,
        selectedSubject,
        setSelectedSubject,
        selectedYear,
        setSelectedYear,
        loading,
        error,
        resetError,
        resourceUrl,
        showResourceModal,
        setShowResourceModal,
        showVideoModal,
        setShowVideoModal,
        resourceLoading,
        currentResource,
        viewResource,
        downloadResource,
    } = useResources();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setSelectedYear('');
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const years = [...new Set(resources.map((resource) => resource.year))].filter(Boolean).sort();

    if (loading) {
        return (
            <div className="full">
                <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
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
.bg-[var(--bg-primary)] {
    background-color: var(--bg-primary, ${darkMode ? '#111827' : '#f4f4f4'});
}
.bg-[var(--bg-secondary)] {
    background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
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
.hover\\:text-[var(--hover-secondary)]:hover {
    color: var(--hover-secondary, ${darkMode ? '#f87171' : '#b91c1c'});
}
.flex {
    display: flex;
}
.min-h-screen {
    min-height: 100vh;
}
.min-w-0 {
    min-width: 0;
}
.justify-center {
    justify-content: center;
}
.justify-between {
    justify-content: space-between;
}
.items-center {
    align-items: center;
}
.flex-1 {
    flex: 1;
}
.gap-4 {
    gap: 16px;
}
.gap-2 {
    gap: 8px;
}
.p-6 {
    padding: 24px;
}
.sm\\:p-8 {
    padding: 32px;
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
.mb-4 {
    margin-bottom: 16px;
}
.mb-6 {
    margin-bottom: 24px;
}
.mt-1 {
    margin-top: 4px;
}
.mt-4 {
    margin-top: 16px;
}
.shadow-[var(--shadow)] {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.shadow-2xl {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
}
.text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
}
.text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
}
.text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.font-bold {
    font-weight: 700;
}
.font-semibold {
    font-weight: 600;
}
.font-medium {
    font-weight: 500;
}
.form-label {
    color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
}
.form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
    border-radius: 4px;
    background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
    color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
    font-size: 0.875rem;
}
.form-input:focus {
    border-color: var(--accent-primary, #007bff);
    outline: none;
}
.btn-primary {
    background-color: var(--accent-primary, #007bff);
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}
.btn-primary:hover {
    background-color: var(--hover-primary, #0056b3);
}
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}
.sm\\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
}
.md\\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
}
.col-span-full {
    grid-column: 1 / -1;
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
.quiz-section {
    background: ${darkMode
                        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
    background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
    border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    padding: 32px;
    border-radius: 16px;
}
.service-card {
    background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.hover\\:shadow-lg:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
}
.animate-spin {
    animation: spin 1s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
.ml-16 {
    margin-left: 64px;
}
.ml-64 {
    margin-left: 256px;
}
.underline {
    text-decoration: underline;
}
.list-disc {
    list-style-type: disc;
}
.list-inside {
    list-style-position: inside;
}
.space-y-1 > * + * {
    margin-top: 4px;
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
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Resources"
                        userMessage="Find study materials"
                    />
                    <div className={`flex-1 min-w-0 p-6 sm:p-8 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                        <div className="quiz-section">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Explore Study Resources</h2>
                            </div>
                            {error && (
                                <div className="p-4 mb-4 rounded-lg bg-[var(--accent-secondary)] text-white flex justify-between items-center">
                                    {error}
                                    <button
                                        onClick={resetError}
                                        className="ml-2 text-white underline hover:text-[var(--hover-secondary)]"
                                    >
                                        Retry
                                    </button>
                                </div>
                            )}
                            <div className="mb-6">
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    Filter by subject and year to find study materials and enhance your learning!
                                </p>
                                <p className="bg-[var(--bg-tertiary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-4">
                                    <strong>NB:</strong> Study resources provide key insights for exam preparation.
                                </p>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Quick Tips</h3>
                                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                                    <li>Filter by subject and year to narrow down resources.</li>
                                    <li>Preview files using the <strong>View</strong> button.</li>
                                    <li>Open external resources with the <strong>View Link</strong> button in a new tab.</li>
                                    <li>Save files offline with the <strong>Download</strong> button (except for videos).</li>
                                    <li>Check resource details for more information.</li>
                                </ul>
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
                            <div className="mt-6">
                                <ResourcesList
                                    resources={resources}
                                    selectedSubject={selectedSubject}
                                    selectedYear={selectedYear}
                                    resourceLoading={resourceLoading}
                                    onViewResource={viewResource}
                                    onDownloadResource={downloadResource}
                                />
                            </div>
                        </div>
                        <ResourceModal
                            showModal={showResourceModal}
                            onClose={() => setShowResourceModal(false)}
                            resourceUrl={resourceUrl}
                            currentResource={currentResource}
                            resourceLoading={resourceLoading}
                            onDownloadResource={downloadResource}
                        />
                        <VideoModal
                            showModal={showVideoModal}
                            onClose={() => setShowVideoModal(false)}
                            resourceUrl={resourceUrl}
                            currentResource={currentResource}
                            resourceLoading={resourceLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Resources.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    setNotifications: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
};

export default Resources;