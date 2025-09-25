import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import SubjectForm from './SubjectForm';
import SubjectCard from './SubjectCard';
import MessageBanner from '../../MessageBanner';
import Header from '../../common/Header';

const Subjects = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications, onActivity, activities, setActivities }) => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [showSidebar, setShowSidebar] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

    const fetchData = async (url, setData) => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(url, { headers });
            const data = await response.json();
            if (response.ok && data.success) {
                setData(data.data || []);
            } else {
                setMessage({ text: data.message || `Failed to fetch data from ${url}`, type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error fetching data: ${error.message}`, type: 'error' });
        }
    };

    useEffect(() => {
        fetchData(`${API_BASE_URL}/subjects`, setSubjects);
        fetchData(`${API_BASE_URL}/enrolled-subjects`, (data) => {
            const subjectNames = Array.isArray(data) ? data.map((s) => s.subjectName || s) : [];
            setEnrolledSubjects(subjectNames);
        });
    }, [API_BASE_URL]);

    useEffect(() => {
        let timeoutId;
        if (message.text) {
            timeoutId = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
        return () => clearTimeout(timeoutId);
    }, [message]);

    const handleRecordActivity = (description) => {
        onActivity(description);
    };

    const handleAddSubject = async (e) => {
        e.preventDefault();
        if (!selectedSubject) {
            setMessage({ text: 'Please select a subject', type: 'error' });
            return;
        }
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${API_BASE_URL}/add-subject`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ subjectName: selectedSubject }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                fetchData(`${API_BASE_URL}/enrolled-subjects`, (data) => {
                    const subjectNames = Array.isArray(data) ? data.map((s) => s.subjectName || s) : [];
                    setEnrolledSubjects(subjectNames);
                });
                setMessage({ text: data.message, type: 'success' });
                handleRecordActivity(`Added subject: ${selectedSubject}`);
                setSelectedSubject('');
                setIsAdding(false);
            } else {
                setMessage({ text: data.message || 'Failed to add subject', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error adding subject: ${error.message}`, type: 'error' });
        }
    };

    const handleRemoveSubject = async (subjectName) => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${API_BASE_URL}/remove-subject?subjectName=${encodeURIComponent(subjectName)}`, {
                method: 'DELETE',
                headers,
            });
            const data = await response.json();
            if (response.ok && data.success) {
                fetchData(`${API_BASE_URL}/enrolled-subjects`, (data) => {
                    const subjectNames = Array.isArray(data) ? data.map((s) => s.subjectName || s) : [];
                    setEnrolledSubjects(subjectNames);
                });
                setMessage({ text: data.message, type: 'success' });
                handleRecordActivity(`Removed subject: ${subjectName}`);
            } else {
                setMessage({ text: data.message || 'Failed to remove subject', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error removing subject: ${error.message}`, type: 'error' });
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

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
                        background-color: var(--bg-primary, ${darkMode ? '#111827' : '#f8fafc'});
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
                        background-color: var(--accent-secondary, #ef4444);
                    }
                    .text-[var(--text-primary)] {
                        color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
                    }
                    .text-[var(--text-secondary)] {
                        color: var(--text-secondary, ${darkMode ? '#9ca3af' : '#4b5563'});
                    }
                    .text-error {
                        color: var(--text-error, ${darkMode ? '#f87171' : '#dc2626'});
                    }
                    .text-success {
                        color: var(--text-success, ${darkMode ? '#34d399' : '#059669'});
                    }
                    .message-banner {
                        padding: 12px 16px;
                        border-radius: 6px;
                        margin-bottom: 16px;
                        font-size: 0.875rem;
                        font-weight: 500;
                        text-align: center;
                    }
                    .message-banner.error {
                        background-color: var(--bg-error, ${darkMode ? '#7f1d1d' : '#fee2e2'});
                        color: var(--text-error, ${darkMode ? '#f87171' : '#dc2626'});
                    }
                    .message-banner.success {
                        background-color: var(--bg-success, ${darkMode ? '#064e3b' : '#d1fae5'});
                        color: var(--text-success, ${darkMode ? '#34d399' : '#059669'});
                    }
                    .hover\\:bg-[var(--hover-tertiary)]:hover {
                        background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
                    }
                    .hover\\:bg-[var(--hover-primary)]:hover {
                        background-color: var(--hover-primary, #1e40af);
                    }
                    .hover\\:bg-[var(--hover-secondary)]:hover {
                        background-color: var(--hover-secondary, #b91c1c);
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
                    .justify-between {
                        justify-content: space-between;
                    }
                    .items-center {
                        align-items: center;
                    }
                    .flex-1 {
                        flex: 1;
                    }
                    .gap-2 {
                        gap: 8px;
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
                    .mb-4 {
                        margin-bottom: 16px;
                    }
                    .mb-6 {
                        margin-bottom: 24px;
                    }
                    .mt-1 {
                        margin-top: 4px;
                    }
                    .mt-6 {
                        margin-top: 24px;
                    }
                    .shadow-md {
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    }
                    .shadow-lg {
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    }
                    .grid {
                        display: grid;
                        gap: clamp(12px, 3vw, 16px);
                    }
                    .grid-cols-1 {
                        grid-template-columns: 1fr;
                    }
                    .sm\\:grid-cols-2 {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .md\\:grid-cols-3 {
                        grid-template-columns: repeat(3, 1fr);
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
                    .text-3xl {
                        font-size: clamp(1.5rem, 4.5vw, 1.875rem);
                    }
                    .text-xl {
                        font-size: clamp(1.125rem, 3.5vw, 1.25rem);
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
                    .font-medium {
                        font-weight: 500;
                    }
                    .section-card {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'};
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        padding: clamp(16px, 4vw, 24px);
                        border-radius: 12px;
                    }
                    .form-label {
                        display: block;
                        font-weight: 500;
                        color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
                        margin-bottom: 8px;
                    }
                    .form-input {
                        width: 100%;
                        padding: 10px 12px;
                        border: 1px solid var(--border-color, ${darkMode ? '#4b5563' : '#d1d5db'});
                        border-radius: 6px;
                        background-color: var(--bg-secondary, ${darkMode ? '#374151' : '#ffffff'});
                        color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                    }
                    .form-input:focus {
                        outline: none;
                        border-color: var(--accent-primary, #2563eb);
                        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
                    }
                    .btn-primary {
                        padding: 10px 16px;
                        font-weight: 600;
                        background-color: var(--accent-primary, #2563eb);
                        color: #ffffff;
                        border: none;
                        border-radius: 6px;
                        cursor: pointer;
                    }
                    .btn-primary:hover {
                        background-color: var(--hover-primary, #1e40af);
                    }
                    .hamburger {
                        display: none;
                        cursor: pointer;
                        background: none;
                        border: none;
                        padding: 8px;
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
                        padding-right: 8px;
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
                    .text-lg {
                            display:block;
                        }
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(8px, 2vw, 10px);
                        }
                        .section-card {
                            padding: clamp(12px, 3vw, 16px);
                        }
                        .text-3xl {
                            font-size: clamp(1.25rem, 4vw, 1.5rem);
                        }
                        .text-xl {
                            font-size: clamp(1rem, 3vw, 1.125rem);
                        }
                        .text-sm {
                            font-size: clamp(0.7rem, 1.8vw, 0.8rem);
                        }
                        .btn-primary {
                            font-size: clamp(0.7rem, 1.8vw, 0.8rem);
                            padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 14px);
                        }
                    }
                    @media (min-width: 481px) and (max-width: 639px) {
                        
                        
                    
                        .grid {
                            grid-template-columns: 1fr;
                        }
                        .p-6, .sm\\:p-8 {
                            padding: clamp(10px, 2.5vw, 12px);
                        }
                        .section-card {
                            padding: clamp(14px, 3.5vw, 18px);
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
                        .section-card {
                            padding: clamp(16px, 4vw, 20px);
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
                        .section-card {
                            padding: clamp(20px, 5vw, 24px);
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
                        onActivity={onActivity}
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
                        tabDescription="Your Subjects"
                        userMessage="Manage your subjects"
                        className="header"
                    />
                    <main className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content`}>
                        <section className="section-card">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Enrolled Subjects</h2>
                            </div>
                            <div className="mb-6">
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    Select subjects to explore study materials for your courses!
                                </p>
                                <p className="bg-[var(--bg-tertiary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-4">
                                    <strong>NB:</strong> Subject resources enhance your understanding and exam readiness.
                                </p>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Quick Tips</h3>
                                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                                    <li>Add subject with the <strong>Add New Subject</strong> button in a new tab.</li>
                                    <li>Access papers for the using the <strong>Past papers</strong> button.</li>
                                    <li>Remove subject with the <strong>X</strong> button.</li>
                                    <li>Check resource details for more information.</li>
                                </ul>
                            </div>
                            <header className="flex justify-between items-center mb-4">
                                <button
                                    onClick={() => setIsAdding(!isAdding)}
                                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
                                >
                                    {isAdding ? 'Cancel' : 'Add new subject'}
                                </button>
                            </header>
                            <MessageBanner message={message.text} type={message.type} />
                            {isAdding && (
                                <SubjectForm
                                    subjects={subjects}
                                    selectedSubject={selectedSubject}
                                    onSubjectSelect={(e) => setSelectedSubject(e.target.value)}
                                    onSubmit={handleAddSubject}
                                    darkMode={darkMode}
                                />
                            )}
                            {enrolledSubjects.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {enrolledSubjects.map((subject, index) => (
                                        <SubjectCard
                                            key={subject + index}
                                            subject={subject}
                                            onRemove={handleRemoveSubject}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-[var(--text-secondary)]">No courses enrolled yet.</p>
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
};

Subjects.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
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
    setNotifications: PropTypes.func.isRequired,
    onActivity: PropTypes.func.isRequired,
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    setActivities: PropTypes.func.isRequired,
};

export default Subjects;