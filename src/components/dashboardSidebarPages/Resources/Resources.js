import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';
import useResources from '../../../hooks/useResources';
import FilterSection from './FilterSection';
import ResourcesList from './ResourcesList';
import ResourceModal from './ResourceModal';
import VideoModal from './VideoModal';

const Resources = ({ user, setNotifications, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications = [], onActivity }) => {
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

    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target) && !e.target.closest('.hamburger')) {
                setShowSidebar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSidebar]);

    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
        setSelectedYear('');
        onActivity && onActivity('Filtered resources by subject');
    };

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        onActivity && onActivity('Filtered resources by year');
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
            <div className="flex min-h-screen bg-[var(--bg-primary)] relative">
                <style>{`
          :not(.sidebar-wrapper, .hamburger, .dashboard-content, .header, .header h1) {
            transition: none !important;
            animation: none !important;
            opacity: 1 !important;
          }
          .sidebar-wrapper,
          .hamburger,
          .dashboard-content,
          .header,
          .header h1 {
            transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, margin-left 0.3s ease-in-out, padding-left 0.3s ease-in-out;
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
            background-color: var(--accent-primary, #2563eb);
          }
          .bg-[var(--accent-secondary)] {
            background-color: var(--accent-secondary, #dc3545);
          }
          .text-[var(--text-primary)] {
            color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
          }
          .text-[var(--text-secondary)] {
            color: var(--text-secondary, ${darkMode ? '#9ca3af' : '#4b5563'});
          }
          .text-white {
            color: #ffffff;
          }
          .hover\\:bg-[var(--hover-tertiary)]:hover {
            background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
          }
          .hover\\:bg-[var(--hover-primary)]:hover {
            background-color: var(--hover-primary, #1e40af);
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
            gap: clamp(8px, 2vw, 12px);
          }
          .gap-6 {
            gap: clamp(12px, 3vw, 16px);
          }
          .p-4 {
            padding: clamp(8px, 2vw, 12px);
          }
          .p-6 {
            padding: clamp(12px, 3vw, 16px);
          }
          .sm\\:p-6 {
            padding: clamp(12px, 3vw, 16px);
          }
          .sm\\:p-8 {
            padding: clamp(16px, 4vw, 20px);
          }
          .rounded-2xl {
            border-radius: clamp(8px, 2vw, 12px);
          }
          .rounded-lg {
            border-radius: clamp(4px, 1vw, 8px);
          }
          .rounded-md {
            border-radius: clamp(3px, 0.8vw, 6px);
          }
          .mb-4 {
            margin-bottom: clamp(12px, 3vw, 16px);
          }
          .mb-6 {
            margin-bottom: clamp(16px, 4vw, 24px);
          }
          .mt-1 {
            margin-top: clamp(3px, 0.8vw, 4px);
          }
          .mt-4 {
            margin-top: clamp(12px, 3vw, 16px);
          }
          .mt-6 {
            margin-top: clamp(16px, 4vw, 24px);
          }
          .shadow-[var(--shadow)] {
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .shadow-2xl {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .hover\\:shadow-lg:hover {
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
          }
          .text-3xl {
            font-size: clamp(1.5rem, 4.5vw, 1.875rem);
          }
          .text-xl {
            font-size: clamp(1.125rem, 3.5vw, 1.25rem);
          }
          .text-lg {
            font-size: clamp(1rem, 3vw, 1.125rem);
          }
          .text-sm {
            font-size: clamp(0.75rem, 2vw, 0.875rem);
          }
          .text-xs {
            font-size: clamp(0.625rem, 1.8vw, 0.75rem);
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
            color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
            font-weight: 600;
            margin-bottom: clamp(6px, 1.5vw, 8px);
            display: block;
          }
          .form-input {
            width: 100%;
            padding: clamp(6px, 1.5vw, 8px);
            border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
            border-radius: clamp(3px, 0.8vw, 4px);
            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
            color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
            font-size: clamp(0.75rem, 2vw, 0.875rem);
          }
          .form-input:focus {
            border-color: var(--accent-primary, #2563eb);
            outline: none;
          }
          .btn-primary {
            background-color: var(--accent-primary, #2563eb);
            color: #ffffff;
            padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px);
            border-radius: clamp(4px, 1vw, 6px);
            border: none;
            cursor: pointer;
            font-size: clamp(0.75rem, 2vw, 0.875rem);
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .btn-primary:hover {
            background-color: var(--hover-primary, #1e40af);
          }
          .grid {
            display: grid;
            gap: clamp(8px, 2vw, 12px);
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
          .h-5 {
            height: clamp(16px, 4vw, 20px);
          }
          .w-5 {
            width: clamp(16px, 4vw, 20px);
          }
          .h-12 {
            height: clamp(40px, 10vw, 48px);
          }
          .w-12 {
            width: clamp(40px, 10vw, 48px);
          }
          .quiz-section {
            background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
            border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: clamp(16px, 4vw, 24px);
            border-radius: clamp(8px, 2vw, 12px);
          }
          .service-card {
            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
            padding: clamp(12px, 3vw, 16px);
            border-radius: clamp(4px, 1vw, 8px);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .hamburger {
            display: none;
            cursor: pointer;
            background: none;
            border: none;
            padding: clamp(6px, 1.5vw, 8px);
            position: fixed;
            top: clamp(12px, 3vw, 16px);
            left: clamp(12px, 3vw, 16px);
            z-index: 50;
            transition: left 0.3s ease-in-out;
          }
          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 40;
            transition: transform 0.3s ease-in-out;
          }
          .sidebar-hidden {
            transform: translateX(-100%);
          }
          .dashboard-content {
            max-height: 80vh;
            overflow-y: auto;
            padding-right: clamp(6px, 1.5vw, 8px);
          }
          .dashboard-content::-webkit-scrollbar {
            width: 6px;
          }
          .dashboard-content::-webkit-scrollbar-thumb {
            background-color: var(--border-color, ${darkMode ? '#4b5563' : '#e5e7eb'});
            border-radius: 3px;
          }
          .dashboard-content::-webkit-scrollbar-track {
            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
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
            margin-top: clamp(3px, 0.8vw, 4px);
          }
          @media (max-width: 639px) {
            .header h1 {
              padding-left: clamp(48px, 12vw, 56px);
            }
            .sidebar-open .header h1 {
              padding-left: clamp(208px, 50vw, 216px);
            }
            .sidebar-open .dashboard-content {
              margin-left: clamp(192px, 48vw, 198px);
            }
            .hamburger {
              display: block;
            }
            .sidebar-wrapper {
              display: ${showSidebar ? 'block' : 'none'};
            }
            .hamburger {
              left: ${showSidebar ? 'clamp(192px, 48vw, 198px)' : 'clamp(12px, 3vw, 16px)'};
            }
            .ml-16, .ml-64 {
              margin-left: 0;
            }
            .p-6, .sm\\:p-6, .sm\\:p-8 {
              padding: clamp(8px, 2vw, 10px);
            }
            .text-3xl {
              font-size: clamp(1.25rem, 4vw, 1.5rem);
            }
            .text-xl {
              font-size: clamp(0.875rem, 2.5vw, 1rem);
            }
            .text-lg {
              font-size: clamp(0.75rem, 2vw, 0.875rem);
            }
            .text-sm {
              font-size: clamp(0.625rem, 1.8vw, 0.75rem);
            }
            .btn-primary {
              font-size: clamp(0.7rem, 1.8vw, 0.8rem);
              min-height: 40px;
            }
            .grid {
              grid-template-columns: 1fr;
            }
            .sm\\:grid-cols-2 {
              grid-template-columns: 1fr;
            }
            .md\\:grid-cols-3 {
              grid-template-columns: 1fr;
            }
          }
          @media (min-width: 640px) and (max-width: 767px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .sm\\:grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
            }
            .md\\:grid-cols-3 {
              grid-template-columns: repeat(2, 1fr);
            }
            .hamburger {
              display: none;
            }
            .sidebar-wrapper {
              display: block;
            }
            .p-6, .sm\\:p-6 {
              padding: clamp(12px, 3vw, 16px);
            }
            .sm\\:p-8 {
              padding: clamp(16px, 4vw, 20px);
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .sm\\:grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
            }
            .md\\:grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
            }
            .p-6, .sm\\:p-6 {
              padding: clamp(12px, 3vw, 16px);
            }
            .sm\\:p-8 {
              padding: clamp(16px, 4vw, 20px);
            }
          }
          @media (min-width: 1024px) and (max-width: 1279px) {
            .grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .sm\\:grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
            }
            .md\\:grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          @media (min-width: 1280px) {
            .grid {
              grid-template-columns: repeat(4, 1fr);
            }
            .sm\\:grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
            }
            .md\\:grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
            }
            .p-6, .sm\\:p-6 {
              padding: clamp(16px, 3.5vw, 20px);
            }
            .sm\\:p-8 {
              padding: clamp(20px, 4vw, 24px);
            }
          }
        `}</style>
                <button
                    className="hamburger"
                    onClick={() => {
                        setShowSidebar(!showSidebar);
                        if (!showSidebar) setIsCollapsed(false);
                    }}
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div ref={sidebarRef} className={`sidebar-wrapper ${!showSidebar ? 'sidebar-hidden' : ''}`}>
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        darkMode={darkMode}
                        disableHamburger={showSidebar && window.innerWidth <= 639}
                        onActivity={onActivity}
                    />
                </div>
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
                        className="header"
                    />
                    <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content ${showSidebar ? 'sidebar-open' : ''}`}>
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
    onActivity: PropTypes.func,
};

export default Resources;