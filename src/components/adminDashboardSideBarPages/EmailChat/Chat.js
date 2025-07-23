import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from "../../common/AdminSidebar";
import AdminHeader from "../../common/AdminHeader";

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

const Chat = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(sessionStorage.getItem('theme') === 'dark');
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState({ students: false, subjects: false, submit: false });
    const [error, setError] = useState({ students: '', subjects: '', submit: '' });
    const [success, setSuccess] = useState('');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading((prev) => ({ ...prev, students: true }));
                const response = await fetch(`${API_BASE_URL}/students`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'Unknown error'}`);
                }
                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError((prev) => ({ ...prev, students: `Failed to fetch students: ${err.message}` }));
                console.error('Fetch students error:', err);
            } finally {
                setLoading((prev) => ({ ...prev, students: false }));
            }
        };

        const fetchSubjects = async () => {
            try {
                setLoading((prev) => ({ ...prev, subjects: true }));
                const response = await fetch(`${API_BASE_URL}/subjects`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'Unknown error'}`);
                }
                const data = await response.json();
                setSubjects(data);
            } catch (err) {
                setError((prev) => ({ ...prev, subjects: `Failed to fetch subjects: ${err.message}` }));
                console.error('Fetch subjects error:', err);
            } finally {
                setLoading((prev) => ({ ...prev, subjects: false }));
            }
        };

        fetchStudents();
        fetchSubjects();
    }, []);

    const validateForm = () => {
        if (!to.trim()) return 'Recipient email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) return 'Invalid email format';
        if (!subject.trim()) return 'Subject is required';
        if (!body.trim()) return 'Body is required';
        return '';
    };

    const handleSubjectSelect = (selectedSubject) => {
        setSubject(selectedSubject);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError((prev) => ({ ...prev, submit: '' }));
        setSuccess('');

        const validationError = validateForm();
        if (validationError) {
            setError((prev) => ({ ...prev, submit: validationError }));
            return;
        }

        const emailRequest = { to, subject, body };

        try {
            setLoading((prev) => ({ ...prev, submit: true }));
            const response = await fetch(`${API_BASE_URL}/email/send`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailRequest),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'Unknown error'}`);
            }

            const resultText = await response.text();
            setSuccess(resultText);
            setTo('');
            setSubject('');
            setBody('');
        } catch (err) {
            setError((prev) => ({ ...prev, submit: `Failed to send email: ${err.message}` }));
            console.error('Submit error:', err);
        } finally {
            setLoading((prev) => ({ ...prev, submit: false }));
        }
    };

    return (
        <div className="flex min-h-screen">
            <AdminSidebar
                user={user}
                onLogout={onLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={isDarkMode}
            />
            <div className="flex-1">
                <AdminHeader
                    user={user}
                    notifications={notifications}
                    isCollapsed={isCollapsed}
                    darkMode={isDarkMode}
                    setDarkMode={setIsDarkMode}
                    tabDescription="Send Email"
                    userMessage="Send email to a student or anyone"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <div className="w-11/12 max-w-5xl mx-auto bg-[var(--bg-primary)] rounded-lg shadow-lg p-5">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-5 text-center">Send Email to Student</h2>
                        {error.submit && <p className="text-red-500 mb-4 text-center">{error.submit}</p>}
                        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[var(--text-primary)] mb-2" htmlFor="to">
                                    Recipient Email
                                </label>
                                {loading.students ? (
                                    <p className="text-[var(--text-normal)]">Loading students...</p>
                                ) : error.students ? (
                                    <p className="text-red-500">{error.students}</p>
                                ) : (
                                    <select
                                        id="to"
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="w-full p-3 text-base border-2 border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                        required
                                    >
                                        <option value="">Select a student email</option>
                                        {students.map((student) => (
                                            <option key={student.email} value={student.email}>
                                                {student.email}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className="block text-[var(--text-primary)] mb-2" htmlFor="subject-select">
                                    Select Subject
                                </label>
                                {loading.subjects ? (
                                    <p className="text-[var(--text-normal)]">Loading subjects...</p>
                                ) : error.subjects ? (
                                    <p className="text-red-500">{error.subjects}</p>
                                ) : (
                                    <select
                                        id="subject-select"
                                        onChange={(e) => handleSubjectSelect(e.target.value)}
                                        className="w-full p-3 text-base border-2 border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                    >
                                        <option value="">Select Subject</option>
                                        {subjects.map((subject, index) => (
                                            <option key={index} value={subject.subjectName}>
                                                {subject.subjectName}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className="block text-[var(--text-primary)] mb-2" htmlFor="subject">
                                    Email Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full p-3 text-base border-2 border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                    placeholder="Enter email subject"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[var(--text-primary)] mb-2" htmlFor="body">
                                    Body
                                </label>
                                <textarea
                                    id="body"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full p-3 text-base border-2 border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                    placeholder="Enter email body"
                                    rows="6"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading.submit}
                                className={`w-full p-3 text-[var(--text-primary)] rounded-lg transition-all ${
                                    loading.submit ? 'bg-[var(--hover-tertiary)] cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                                }`}
                            >
                                {loading.submit ? 'Sending Email...' : 'Send Email'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chat.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default Chat;