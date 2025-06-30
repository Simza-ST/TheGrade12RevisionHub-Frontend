import React, { useState, useEffect } from 'react';

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

const Chat = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState({ students: false, subjects: false, submit: false });
    const [error, setError] = useState({ students: '', subjects: '', submit: '' });
    const [success, setSuccess] = useState('');

    const Topbar = () => {
        const menuItems = [
            { text: 'Home🏡', href: '/admin-Dashboard' },
            { text: 'List Of Students👨‍🎓', href: '/Students' },
            { text: 'Upload Documents📚', href: '/upload-documents' },
            { icon: 'bx-plus', text: 'Create Certificate📜', href: '/cert-creation' },
            { text: 'Create Quiz📑', href: '/quiz-creation' },
            {text: 'View Quizzes📓', href: '/quiz-viewer'},
            { text: 'Logout', href: '/login' },
        ];

        return (
            <header className="topbar fixed top-0 left-0 w-full h-16 bg-gray-900 flex items-center justify-between px-5 text-white text-2xl font-semibold shadow-md z-50">
                <div className="dashboard-title">Send Email</div>
                <div className="media-icons">
                    <ul className="menu flex gap-5 list-none p-0">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
        );
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                setLoading((prev) => ({ ...prev, students: true }));
                const response = await fetch(`${API_BASE_URL}/api/students`, {
                    headers: {
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
                const response = await fetch(`${API_BASE_URL}/api/subjects`, {
                    headers: {
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
            const response = await fetch(`${API_BASE_URL}/api/email/send`, {
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
            setSuccess(resultText); // Not JSON — using plain text

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
        <>
            <Topbar />
            <div className="chat w-11/12 max-w-5xl mx-auto pt-20 pb-5 px-5 rounded-lg border-2 border-white shadow-lg bg-transparent">
                <h2 className="text-2xl font-bold text-white mb-5 text-center">Send Email to Student</h2>
                {error.submit && <p className="text-red-600 mb-4 text-center">{error.submit}</p>}
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Recipient Email */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="to">
                            Recipient Email
                        </label>
                        {loading.students ? (
                            <p className="text-white">Loading students...</p>
                        ) : error.students ? (
                            <p className="text-red-600">{error.students}</p>
                        ) : (
                            <select
                                id="to"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full p-3 text-base border-2 border-gray-300 rounded-lg bg-gradient-to-br from-white to-gray-200 text-gray-900 focus:border-indigo-600 focus:shadow-lg outline-none"
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
                    {/* Subject Dropdown */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="subject-select">
                            Select Subject
                        </label>
                        {loading.subjects ? (
                            <p className="text-white">Loading subjects...</p>
                        ) : error.subjects ? (
                            <p className="text-red-600">{error.subjects}</p>
                        ) : (
                            <select
                                id="subject-select"
                                onChange={(e) => handleSubjectSelect(e.target.value)}
                                className="w-full p-3 text-base border-2 border-gray-300 rounded-lg bg-gradient-to-br from-white to-gray-200 text-gray-900 focus:border-indigo-600 focus:shadow-lg outline-none"
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
                    {/* Subject Input */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="subject">
                            Email Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full p-3 text-base border-2 border-gray-300 rounded-lg bg-gradient-to-br from-white to-gray-200 text-gray-900 focus:border-indigo-600 focus:shadow-lg outline-none"
                            placeholder="Enter email subject"
                            required
                        />
                    </div>
                    {/* Body */}
                    <div>
                        <label className="block text-white mb-2" htmlFor="body">
                            Body
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full p-3 text-base border-2 border-gray-300 rounded-lg bg-gradient-to-br from-white to-gray-200 text-gray-900 focus:border-indigo-600 focus:shadow-lg outline-none"
                            placeholder="Enter email body"
                            rows="6"
                            required
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading.submit}
                        className={`w-full p-3 text-white rounded-lg transition-all ${
                            loading.submit ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {loading.submit ? 'Sending Email...' : 'Send Email'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default Chat;
