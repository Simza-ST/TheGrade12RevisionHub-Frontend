import React, { useEffect, useState } from 'react';
import './StudentsList.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

// Topbar Component
const Topbar = () => {
    const menuItems = [
        { text: 'Home🏡', href: '/admin-Dashboard' },
        { text: 'Upload Documents📚', href: '/upload-documents' },
        { text: 'Create Quiz📑', href: '/quiz-creation' },
        { text: 'Create Certificate📜', href: '/cert-creation' },
        { text: 'Send Email📩', href: '/chat' },
        {text: 'View Quizzes📓', href: '/quiz-viewer'},
        { text: 'Logout', href: '/login' },
    ];

    return (
        <header className="topbar fixed top-0 left-0 w-full h-16 bg-gray-900 flex items-center justify-between px-5 text-white text-2xl font-semibold shadow-md z-50">
            <div className="dashboard-title">Students Pool</div>
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

const StudentsList = () => {
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch students
    const fetchStudents = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/students`);
            if (!response.ok) throw new Error('Failed to fetch students');
            const data = await response.json();
            setStudentList(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Delete student
    const handleDelete = async (studentId, studentEmail) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${studentEmail}?`);
        if (!confirmDelete) return;

        try {
            const encodedEmail = encodeURIComponent(studentEmail);
            const response = await fetch(`${API_BASE_URL}/students/${encodedEmail}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete student');

            // Update UI
            setStudentList((prevList) => prevList.filter((s) => s.id !== studentId));
            alert(`Student ${studentEmail} deleted successfully.`);
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete student. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-600 to-blue-600 text-center">
            <Topbar />
            <div className="mt-24">
                {loading ? (
                    <p className="text-white text-xl">Loading students...</p>
                ) : (
                    <table className="w-4/5 max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <thead>
                        <tr>
                            <th className="p-3 bg-blue-600 text-white font-bold">No.</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">ID</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Name</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Surname</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Email</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Phone Number</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {studentList.map((student, index) => (
                            <tr key={student.id} className="hover:bg-gray-100 transition-colors">
                                <td className="p-3 border-b">{index + 1}</td>
                                <td className="p-3 border-b">{student.idNumber}</td>
                                <td className="p-3 border-b">{student.firstName}</td>
                                <td className="p-3 border-b">{student.lastName}</td>
                                <td className="p-3 border-b">{student.email}</td>
                                <td className="p-3 border-b">{student.phoneNumber}</td>
                                <td className="p-3 border-b">
                                    <button
                                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
                                        onClick={() => handleDelete(student.id, student.email)}
                                    >
                                        DELETE
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default StudentsList;
