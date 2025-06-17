import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import SubjectForm from './SubjectForm';
import SubjectCard from './SubjectCard';
import MessageBanner from '../../MessageBanner';
import Header from "../../common/Header";

const Subjects = ({ user,isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications ,setNotifications}) => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const fetchData = async (url, setData) => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
            console.log('Enrolled subjects data:', data);
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

    const handleAddSubject = async (e) => {
        e.preventDefault();
        if (!selectedSubject) {
            setMessage({ text: 'Please select a subject', type: 'error' });
            return;
        }
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
            } else {
                setMessage({ text: data.message || 'Failed to remove subject', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error removing subject: ${error.message}`, type: 'error' });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="full">
            <style>
                {`
                    /* Prevent transitions and animations globally for performance */
                    * {
                        transition: none !important;
                        animation: none !important;
                        opacity: 1 !important;
                    }
                    /* Full wrapper */
                    .full {
                        width: 100%;
                        min-height: 100vh;
                        position: relative;
                        z-index: 10;
                    }
                    /* Base styles with improved contrast */
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
                    /* Message banner styles */
                    .message-banner {
                        padding: 12px 16px;
                        border-radius: 6px;
                        margin-bottom: 16px;
                        font-size: 14px;
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
                    /* Hover states */
                    .hover\\:bg-[var(--hover-tertiary)]:hover {
                        background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
                    }
                    .hover\\:bg-[var(--hover-primary)]:hover {
                        background-color: var(--hover-primary, #1e40af);
                    }
                    .hover\\:bg-[var(--hover-secondary)]:hover {
                        background-color: var(--hover-secondary, #b91c1c);
                    }
                    /* Layout styles with refined spacing */
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
                    .gap-4 {
                        gap: 16px;
                    }
                    .gap-6 {
                        gap: 24px;
                    }
                    .p-6 {
                        padding: 24px;
                    }
                    .sm\\:p-8 {
                        @media (min-width: 640px) {
                            padding: 32px;
                        }
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
                    /* Typography with professional sizing */
                    .text-3xl {
                        font-size: 28px;
                        line-height: 36px;
                    }
                    .text-xl {
                        font-size: 20px;
                        line-height: 28px;
                    }
                    .text-sm {
                        font-size: 14px;
                        line-height: 20px;
                    }
                    .text-xs {
                        font-size: 12px;
                        line-height: 16px;
                    }
                    .font-bold {
                        font-weight: 700;
                    }
                    .font-semibold {
                        font-weight: 600;
                    }
                    /* Grid layout with consistent gaps */
                    .grid {
                        display: grid;
                    }
                    .grid-cols-1 {
                        grid-template-columns: 1fr;
                    }
                    .sm\\:grid-cols-2 {
                        @media (min-width: 640px) {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    .md\\:grid-cols-3 {
                        @media (min-width: 768px) {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }
                    /* Notification badge */
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
                    /* Sidebar margins */
                    .sm\\:ml-16 {
                        @media (min-width: 640px) {
                            margin-left: 64px;
                        }
                    }
                    .sm\\:ml-64 {
                        @media (min-width: 640px) {
                            margin-left: 256px;
                        }
                    }
                    /* Custom section background with refined gradient */
                    .section-card {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'};
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                        padding: 24px;
                        border-radius: 12px;
                    }
                    /* Form styles */
                    .form-label {
                        display: block;
                        font-size: 14px;
                        font-weight: 500;
                        color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
                        margin-bottom: 8px;
                    }
                    .form-input {
                        width: 100%;
                        padding: 10px 12px;
                        font-size: 14px;
                        border: 1px solid var(--border-color, ${darkMode ? '#4b5563' : '#d1d5db'});
                        border-radius: 6px;
                        background-color: var(--bg-secondary, ${darkMode ? '#374151' : '#ffffff'});
                        color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
                    }
                    .form-input:focus {
                        outline: none;
                        border-color: var(--accent-primary, #2563eb);
                        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
                    }
                    .btn-primary {
                        padding: 10px 16px;
                        font-size: 14px;
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
                `}
            </style>
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
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
                        tabDescription="Your Subjects"
                        userMessage="Manage your subjects"
                    />
                <main
                    className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 mx-auto  ${
                        isCollapsed ? 'sm:ml-16' : 'sm:ml-64'
                    }`}
                >
                    <section className="section-card">
                        <header className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Subjects</h2>
                            <button
                                onClick={() => setIsAdding(!isAdding)}
                                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            >
                                {isAdding ? 'Cancel' : 'Add New Subject'}
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

export default Subjects;