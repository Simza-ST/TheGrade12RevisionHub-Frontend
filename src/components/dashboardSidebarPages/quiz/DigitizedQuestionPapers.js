import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../common/Sidebar';
import DigitizedQuestionPaperCard from './DigitizedQuestionPaperCard';
import Header from '../../common/Header';
import { getPaperComponent } from '../../../utils/paperMapper';

const DigitizedQuestionPapers = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [questionPapers, setQuestionPapers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [filterSubject, setFilterSubject] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                navigate('/login');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            const subjectsResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
            if (subjectsResponse.status === 401) {
                sessionStorage.removeItem('jwt');
                navigate('/login');
                return;
            }
            const subjectsData = await subjectsResponse.json();
            if (!subjectsResponse.ok || !subjectsData.success) {
                throw new Error(subjectsData.message || 'Failed to fetch enrolled subjects');
            }
            const enrolledSubjects = subjectsData.data.map(s => s.subjectName || s).sort();
            setSubjects(enrolledSubjects);

            const papersUrl = `${API_BASE_URL}/user/digitized${filterSubject ? `?subjectName=${encodeURIComponent(filterSubject)}` : ''}`;
            const papersResponse = await fetch(papersUrl, { headers });
            if (papersResponse.status === 401) {
                sessionStorage.removeItem('jwt');
                navigate('/login');
                return;
            }
            const papersData = await papersResponse.json();
            if (!papersResponse.ok || !papersData.success) {
                console.log(papersData.data);
                throw new Error(papersData.message || `Failed to fetch digitized question papers: HTTP ${papersResponse.status}`);
            }

            const filteredPapers = filterSubject
                ? (papersData.data || []).filter(paper =>
                    (paper.subject?.subjectName || paper.subjectName || '').toLowerCase() === filterSubject.toLowerCase())
                : (papersData.data || []);
            setQuestionPapers(filteredPapers);
            setLoading(false);
        } catch (err) {
            setError(`Error fetching data: ${err.message}`);
            setLoading(false);
        }
    }, [API_BASE_URL, filterSubject, navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleViewPaper = (paper) => {
        const component = getPaperComponent(paper.fileName);
        if (!component) {
            setError('No interactive viewer available for this paper');
            return;
        }

        setNotifications([
            ...notifications,
            {
                id: notifications.length + 1,
                message: `Viewed digitized question paper`,
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
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)] relative">
                <style>{`
                    :not(.sidebar-wrapper, .hamburger, .dashboard-content, .header, .header-title) {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                    }
                    .sidebar-wrapper,
                    .hamburger,
                    .dashboard-content,
                    .header,
                    .header-title {
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
                    .sm\\:p-8 {
                        padding: clamp(16px, 4vw, 20px);
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
                        margin-bottom: clamp(12px, 3vw, 16px);
                    }
                    .mb-6 {
                        margin-bottom: clamp(16px, 4vw, 24px);
                    }
                    .mt-1 {
                        margin-top: clamp(4px, 1vw, 6px);
                    }
                    .mt-4 {
                        margin-top: clamp(12px, 3vw, 16px);
                    }
                    .shadow-[var(--shadow)] {
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .form-label {
                        color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        font-weight: 600;
                        margin-bottom: clamp(6px, 1.5vw, 8px);
                        display: block;
                    }
                    .form-input {
                        width: 100%;
                        padding: clamp(6px, 1.5vw, 8px);
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        border-radius: 4px;
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        font-size: clamp(0.75rem, 2vw, 0.875rem);
                        line-height: 1.25rem;
                    }
                    .form-input:focus {
                        border-color: var(--accent-primary, #007bff);
                        outline: none;
                        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
                    }
                    .btn-primary {
                        background-color: var(--accent-primary, #007bff);
                        color: #ffffff;
                        padding: clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px);
                        border-radius: 4px;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-primary:hover {
                        background-color: var(--hover-primary, #0056b3);
                    }
                    .grid {
                        display: grid;
                        gap: clamp(8px, 2vw, 12px);
                    }
                    .hamburger {
                        display: none;
                        cursor: pointer;
                        background: none;
                        border: none;
                        padding: clamp(6px, 1.5vw, 8px);
                        position: fixed;
                        top: 16px;
                        left: 5px;
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
                    .paper-section {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        padding: clamp(16px, 4vw, 24px);
                        border-radius: 16px;
                    }
                    .service-card {
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        padding: clamp(12px, 3vw, 16px);
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .hover\\:shadow-lg:hover {
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
                    }
                    .animate-spin {
                        animation: spin 1s linear infinite !important;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
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
                    .font-semibold {
                        font-weight: 600;
                    }
                    @media (max-width: 639px) {
                        .ml-16, .ml-64, .sm\\:ml-16, .sm\\:ml-64 {
                            margin-left: 0;
                        }
                        .hamburger {
                            display: block;
                            left: ${showSidebar ? '198px' : '5px'};
                        }
                        .sidebar-wrapper {
                            display: ${showSidebar ? 'block' : 'none'};
                        }
                        .dashboard-content {
                            margin-left: ${showSidebar ? '198px' : '0'};
                        }
                    }
                    @media (max-width: 480px) {
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(8px, 2vw, 10px);
                        }
                        .paper-section {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .service-card {
                            padding: clamp(8px, 2vw, 12px);
                        }
                        .text-xl {
                            font-size: clamp(1rem, 3vw, 1.125rem);
                        }
                        .text-lg {
                            font-size: clamp(0.875rem, 2.5vw, 1rem);
                        }
                        .text-sm {
                            font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                        }
                        .form-input {
                            padding: clamp(4px, 1vw, 6px);
                            font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                        }
                        .btn-primary {
                            padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
                            font-size: clamp(0.625rem, 1.8vw, 0.75rem);
                        }
                    }
                    @media (min-width: 481px) and (max-width: 639px) {
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(10px, 2.5vw, 12px);
                        }
                        .paper-section {
                            padding: clamp(14px, 3.5vw, 18px);
                        }
                        .service-card {
                            padding: clamp(10px, 2.5vw, 14px);
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
                        .p-6, .sm\\:p-8 {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .paper-section {
                            padding: clamp(16px, 4vw, 20px);
                        }
                        .service-card {
                            padding: clamp(12px, 3vw, 16px);
                        }
                    }
                    @media (min-width: 1024px) {
                        .grid {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .sm\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                        .md\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(16px, 4vw, 20px);
                        }
                        .paper-section {
                            padding: clamp(20px, 5vw, 24px);
                        }
                        .service-card {
                            padding: clamp(16px, 4vw, 20px);
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
                <div className={`sidebar-wrapper ${!showSidebar ? 'sidebar-hidden' : ''}`}>
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        darkMode={darkMode}
                        disableHamburger={showSidebar && window.innerWidth <= 639}
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
                        tabDescription="Digitized Question Papers"
                        userMessage="Access digitized past papers"
                        className="header"
                    />
                    <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content`}>
                        <div className="paper-section">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Explore Digitized Question Papers</h2>
                            </div>
                            <div className="mb-6">
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    Filter by subject to access digitized question papers for exam practice!
                                </p>
                                <p className="bg-[var(--bg-tertiary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-4">
                                    <strong>NB:</strong> Past question papers are essential for effective exam preparation.
                                </p>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Quick Tips</h3>
                                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                                    <li>Filter by subject and year to find relevant question papers.</li>
                                    <li>Preview papers using the <strong>View Paper</strong> button.</li>
                                    <li>Check resource details for more information.</li>
                                </ul>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Available Digitized Question Papers</h2>
                            </div>
                            {error && (
                                <div className="p-4 mb-4 rounded-lg bg-[var(--accent-secondary)] text-white flex justify-between items-center">
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
                                        <label htmlFor="filterSubject" className="form-label">
                                            Filter by Subject
                                        </label>
                                        <select
                                            id="filterSubject"
                                            value={filterSubject}
                                            onChange={(e) => setFilterSubject(e.target.value)}
                                            className="form-input"
                                        >
                                            <option value="">All Subjects</option>
                                            {subjects.map((subject, index) => (
                                                <option key={subject || index} value={subject}>
                                                    {subject}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {questionPapers.length > 0 ? (
                                            questionPapers.map((paper, index) => (
                                                <div
                                                    key={paper.id || `paper-${index}`}
                                                    className="service-card hover:shadow-lg"
                                                >
                                                    <DigitizedQuestionPaperCard
                                                        paper={paper}
                                                        onView={handleViewPaper}
                                                        darkMode={darkMode}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-[var(--text-secondary)] col-span-full">
                                                No digitized question papers available{filterSubject ? ` for ${filterSubject}` : ''}.
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitizedQuestionPapers;