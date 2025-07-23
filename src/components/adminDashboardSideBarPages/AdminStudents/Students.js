import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from "../../common/AdminSidebar";
import AdminHeader from "../../common/AdminHeader";

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

const StudentsList = ({ user, notifications, onLogout }) => {
    const [studentList, setStudentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(sessionStorage.getItem('theme') === 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const fetchStudents = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/students`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
            });
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

    const handleDelete = async (studentId, studentEmail) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${studentEmail}?`);
        if (!confirmDelete) return;

        try {
            const encodedEmail = encodeURIComponent(studentEmail);
            const response = await fetch(`${API_BASE_URL}/api/students/${encodedEmail}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to delete student');

            setStudentList((prevList) => prevList.filter((s) => s.id !== studentId));
            alert(`Student ${studentEmail} deleted successfully.`);
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete student. Please try again.');
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
                    tabDescription="Students Pool"
                    userMessage="Check list of the students enrolled"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    {loading ? (
                        <p className="text-center text-xl text-[var(--text-normal)]">Loading students...</p>
                    ) : (
                        <table className="w-4/5 max-w-4xl mx-auto bg-[var(--bg-primary)] rounded-lg shadow-lg overflow-hidden">
                            <thead>
                            <tr>
                                <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">No.</th>
                                <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">ID</th>
                                <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Name</th>
                                <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Surname</th>
                                <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Email</th>
                                <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Phone Number</th>
                                <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentList.map((student, index) => (
                                <tr key={student.id} className="hover:bg-[var(--hover-tertiary)] transition-colors">
                                    <td className="p-3 border-b text-[var(--text-normal)]">{index + 1}</td>
                                    <td className="p-3 border-b text-[var(--text-normal)]">{student.idNumber}</td>
                                    <td className="p-3 border-b text-[var(--text-normal)]">{student.firstName}</td>
                                    <td className="p-3 border-b text-[var(--text-normal)]">{student.lastName}</td>
                                    <td className="p-3 border-b text-[var(--text-normal)]">{student.email}</td>
                                    <td className="p-3 border-b text-[var(--text-normal)]">{student.phoneNumber}</td>
                                    <td className="p-3 border-b">
                                        <button
                                            className="bg-[var(--accent-secondary)] text-[var(--text-primary)] px-3 py-2 rounded-md hover:bg-red-600 transition-colors"
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
        </div>
    );
};

StudentsList.propTypes = {
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

export default StudentsList;