import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Subjects = () => {
    const [subjects, setSubjects] = useState([]); // Available subjects from /user/subjects
    const [enrolledSubjects, setEnrolledSubjects] = useState([]); // Enrolled subjects from /user/enrolled-subjects
    const [selectedSubject, setSelectedSubject] = useState(''); // Selected subject in dropdown
    const [isAdding, setIsAdding] = useState(false); // Toggle dropdown visibility
    const [message, setMessage] = useState({ text: '', type: '' }); // Message for success/error

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    // Color palette for cards
    const cardColors = [
        'bg-blue-200',
        'bg-green-200',
        'bg-yellow-200',
        'bg-pink-200',
        'bg-purple-200',
        'bg-teal-200',
    ];

    // Fetch available subjects and enrolled subjects
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
                setMessage({ text: 'Error fetching data: ' + error.message, type: 'error' });
            }
        };
        fetchSubjects();
    }, []);

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
                // Refetch enrolled subjects
                const enrolledResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
                const enrolledData = await enrolledResponse.json();
                if (enrolledResponse.ok && enrolledData.success) {
                    setEnrolledSubjects(enrolledData.data || []);
                } else {
                    setMessage({ text: enrolledData.message || 'Failed to fetch enrolled subjects', type: 'error' });
                }
                setMessage({ text: data.message, type: 'success' }); // Backend success message
                setSelectedSubject(''); // Clear selection
                setIsAdding(false); // Hide dropdown
            } else {
                setMessage({ text: data.message || 'Failed to add subject', type: 'error' }); // Backend error message
            }
        } catch (error) {
            setMessage({ text: 'Error adding subject: ' + error.message, type: 'error' });
        }

        // Clear message after 5 seconds
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
                // Refetch enrolled subjects
                const enrolledResponse = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, { headers });
                const enrolledData = await enrolledResponse.json();
                if (enrolledResponse.ok && enrolledData.success) {
                    setEnrolledSubjects(enrolledData.data || []);
                } else {
                    setMessage({ text: enrolledData.message || 'Failed to fetch enrolled subjects', type: 'error' });
                }
                setMessage({ text: data.message, type: 'success' }); // Backend success message
            } else {
                setMessage({ text: data.message || 'Failed to remove subject', type: 'error' }); // Backend error message
            }
        } catch (error) {
            setMessage({ text: 'Error removing subject: ' + error.message, type: 'error' });
        }

        // Clear message after 5 seconds
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    // Handle dropdown selection
    const handleSubjectSelect = (e) => {
        setSelectedSubject(e.target.value);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Subjects</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Your Subjects</h2>
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {isAdding ? 'Cancel' : 'Add new subject'}
                        </button>
                    </div>

                    {/* Success/Error message */}
                    {message.text && (
                        <div
                            className={`p-4 mb-4 rounded-lg ${
                                message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {message.text}
                        </div>
                    )}

                    {/* Dropdown for selecting subjects */}
                    {isAdding && (
                        <form onSubmit={handleAddSubject} className="mb-6">
                            <div className="mb-4">
                                <label htmlFor="subject-select" className="block text-gray-700 mb-2 font-medium">
                                    Select a Subject
                                </label>
                                <select
                                    id="subject-select"
                                    value={selectedSubject}
                                    onChange={handleSubjectSelect}
                                    className="p-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Add Subject
                            </button>
                        </form>
                    )}

                    {/* Courses section for enrolled subjects */}
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Courses</h2>
                        {enrolledSubjects.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {enrolledSubjects.map((subject, index) => (
                                    <div
                                        key={index}
                                        className={`${cardColors[index % cardColors.length]} p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow relative flex items-center justify-between`}
                                    >
                                        <span className="text-lg font-medium text-gray-800">{subject}</span>
                                        <button
                                            onClick={() => handleRemoveSubject(subject)}
                                            className="p-1 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800 rounded-full transition-colors"
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
                            <p className="text-gray-600">No courses enrolled yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subjects;