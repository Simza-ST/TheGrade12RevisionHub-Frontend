// src/components/Subjects.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Updated import

const Subjects = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/subjects', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setSubjects(data);
                }
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        fetchSubjects();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar /> {/* Updated to use Sidebar */}
            <div className="ml-64 p-8 w-full">
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