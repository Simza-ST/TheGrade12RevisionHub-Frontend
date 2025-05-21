import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const Subjects = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([]);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockSubjects = [
            { id: 1, name: 'Mathematics' },
            { id: 2, name: 'Physical Sciences' },
            { id: 3, name: 'History' },
        ];

        setTimeout(() => {
            try {
                setSubjects(mockSubjects);
            } catch (error) {
                console.error('Error setting mock subjects:', error);
            }
        }, 1000); // Simulate API delay
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="p-8 w-full transition-all duration-300 ml-64 sm:ml-64 lg:ml-64 xl:ml-64">
                <h1 className="text-3xl font-bold mb-6">Subjects</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Your Subjects</h2>
                    <ul className="space-y-2">
                        {subjects.length > 0 ? (
                            subjects.map((subject) => (
                                <li key={subject.id} className="p-2 bg-gray-100 rounded">
                                    {subject.name}
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No subjects available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Subjects;