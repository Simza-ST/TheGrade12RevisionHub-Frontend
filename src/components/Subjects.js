import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

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

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    // Color palette for cards
    //const cardColors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-pink-200', 'bg-purple-200', 'bg-teal-200'];

    // Fetch available and enrolled subjects
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                // Fetch available subjects
                const subjectsResponse = await fetch(`${API_BASE_URL}/user/subjects`, { headers });
                const subjectsData = await subjectsResponse.json();
                if (subjectsResponse.ok && subjectsData.success) {
                    setSubjects(subjectsData.data || []);
                } else {
                    setMessage({ text: subjectsData.message || 'Failed to fetch subjects', type: 'error' });
                }

                // Fetch enrolled subjects
                const enrolledResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
                const enrolledData = await enrolledResponse.json();
                if (enrolledResponse.ok && enrolledData.success) {
                    setEnrolledSubjects(enrolledData.data || []);
                } else {
                    setMessage({ text: enrolledData.message || 'Failed to fetch enrolled subjects', type: 'error' });
                }
            } catch (error) {
                setMessage({ text: `Error fetching data: ${error.message}`, type: 'error' });
            }
        };
        fetchSubjects();
    }, [API_BASE_URL]);

    // Handle adding a subject
    const handleAddSubject = async (e) => {
        e.preventDefault();
        if (!selectedSubject) {
            setMessage({ text: 'Please select a subject', type: 'error' });
            return;
        }

        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${API_BASE_URL}/user/add-subject`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ subjectName: selectedSubject }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                const enrolledResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
                const enrolledData = await enrolledResponse.json();
                if (enrolledResponse.ok && enrolledData.success) {
                    setEnrolledSubjects(enrolledData.data || []);
                } else {
                    setMessage({ text: enrolledData.message || 'Failed to fetch enrolled subjects', type: 'error' });
                }
                setMessage({ text: data.message, type: 'success' });
                setSelectedSubject('');
                setIsAdding(false);
            } else {
                setMessage({ text: data.message || 'Failed to add subject', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error adding subject: ${error.message}`, type: 'error' });
        }

        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    // Handle removing a subject
    const handleRemoveSubject = async (subjectName) => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${API_BASE_URL}/user/remove-subject?subjectName=${encodeURIComponent(subjectName)}`, {
                method: 'DELETE',
                headers,
            });

            const data = await response.json();
            if (response.ok && data.success) {
                const enrolledResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
                const enrolledData = await enrolledResponse.json();
                if (enrolledResponse.ok && enrolledData.success) {
                    setEnrolledSubjects(enrolledData.data || []);
                } else {
                    setMessage({ text: enrolledData.message || 'Failed to fetch enrolled subjects', type: 'error' });
                }
                setMessage({ text: data.message, type: 'success' });
            } else {
                setMessage({ text: data.message || 'Failed to remove subject', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: `Error removing subject: ${error.message}`, type: 'error' });
        }

        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    // Handle dropdown selection
    const handleSubjectSelect = (e) => {
        setSelectedSubject(e.target.value);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={darkMode}
            />
            <div
                className={`
                    flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
                    ${isCollapsed ? 'ml-16' : 'ml-64'}
                `}
            >
                <div className="bg-gradient-to-r from-teal-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Subjects</h1>
                        <p className="text-sm mt-1 text-gray-300">Manage your courses, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label={`View notifications (${notificationCount} unread)`}
                        >
                            🔔
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className={`bg-teal-${darkMode ? '900' : '800'} bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl`}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Your Subjects</h2>
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                        >
                            {isAdding ? 'Cancel' : 'Add new subject'}
                        </button>
                    </div>

                    {message.text && (
                        <div
                            className={`p-4 mb-4 rounded-lg ${
                                message.type === 'success' ? 'bg-teal-700 text-white' : 'bg-red-700 text-white'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {isAdding && (
                        <form onSubmit={handleAddSubject} className="mb-6">
                            <div className="mb-4">
                                <label htmlFor="subject-select" className="block text-white mb-2 font-medium">
                                    Select a Subject
                                </label>
                                <select
                                    id="subject-select"
                                    value={selectedSubject}
                                    onChange={handleSubjectSelect}
                                    className="p-3 border border-gray-600 rounded-lg w-full focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
                                >
                                    <option value="" disabled>
                                        Choose a subject
                                    </option>
                                    {subjects.length > 0 ? (
                                        subjects.map((subject, index) => (
                                            <option key={index} value={subject}>
                                                {subject}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No subjects available
                                        </option>
                                    )}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                            >
                                Add Subject
                            </button>
                        </form>
                    )}

                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4 text-white">Courses</h2>
                        {enrolledSubjects.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {enrolledSubjects.map((subject, index) => (
                                    <div
                                        key={index}
                                        className="bg-teal-800 bg-opacity-90 p-4 rounded-2xl shadow-2xl hover:shadow-lg transition-shadow relative flex items-center justify-between"
                                    >
                                        <span className="text-lg font-medium text-white">{subject}</span>
                                        <button
                                            onClick={() => handleRemoveSubject(subject)}
                                            className="p-1 bg-red-700 text-white hover:bg-red-600 rounded-full transition-colors"
                                            title="Remove subject"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-300">No courses enrolled yet.</p>
                        )}
                    </div>
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
    setNotifications: PropTypes.func.isRequired,
};

export default Subjects;