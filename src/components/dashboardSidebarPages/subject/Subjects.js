import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import SubjectForm from './SubjectForm';
import SubjectCard from './SubjectCard';
import MessageBanner from '../../MessageBanner';

const Subjects = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });
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
                    /* Prevent transitions and animations globally */
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
                    /* Base styles */
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
                    /* Hover states */
                    .hover\\:bg-[var(--hover-tertiary)]:hover {
                        background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
                    }
                    .hover\\:bg-[var(--hover-primary)]:hover {
                        background-color: var(--hover-primary, #0056b3);
                    }
                    /* Layout styles */
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
                    .p-6 {
                        padding: 24px;
                    }
                    .sm\\:p-8 {
                        @media (min-width: 640px) {
                            padding: 32px;
                            during: 32px;
                        }
                    }
                    .rounded-2xl {
                        border-radius: 16px;
                    }
                    .rounded-lg {
                        border-radius: 8px;
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
                    .shadow-2xl {
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    }
                    /* Typography */
                    .text-3xl {
                        font-size: 24px;
                    }
                    .text-xl {
                        font-size: 18px;
                    }
                    .text-sm {
                        font-size: 12px;
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
                    /* Grid layout */
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
                    /* Custom section background */
                    .section-card {
                        background: ${darkMode
                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                    : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                        padding: 32px;
                        border-radius: 16px;
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
                <main
                    className={`flex-1 p-6 sm:p-8 transition-all duration-300 max-w-5xl mx-auto w-full ${
                        isCollapsed ? 'sm:ml-16' : 'sm:ml-64'
                    }`}
                >
                    <div className="bg-[var(--bg-secondary)] bg-opacity-95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Your Subjects</h1>
                            <p className="text-sm mt-1 text-[var(--text-secondary)]">Manage your courses, {user.name}!</p>
                        </div>
                        <div className="flex gap-4">
                            <Link
                                to="/notifications"
                                className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
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
                                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                            </button>
                        </div>
                    </div>
                    <section className="section-card">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Your Subjects</h2>
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {enrolledSubjects.map((subject, index) => (
                                        <SubjectCard
                                            key={subject + index}
                                            subject={subject}
                                            onRemove={handleRemoveSubject}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-[var(--text-secondary)]">No courses enrolled yet.</p>
                            )}
                    </section>
                </main>
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