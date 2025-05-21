import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const QuestionPapers = () => {
    const navigate = useNavigate();
    const [papers, setPapers] = useState([]);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockPapers = [
            { id: 1, title: 'Mathematics Final', url: 'https://example.com/math.pdf', year: 2024 },
            { id: 2, title: 'Physics Midterm', url: 'https://example.com/physics.pdf', year: 2023 },
            { id: 3, title: 'History Exam', url: 'https://example.com/history.pdf', year: 2022 },
        ];

        setTimeout(() => {
            try {
                setPapers(mockPapers);
            } catch (error) {
                console.error('Error setting mock papers:', error);
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
                <h1 className="text-3xl font-bold mb-6">Question Papers</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Past Question Papers</h2>
                    <ul className="space-y-2">
                        {papers.length > 0 ? (
                            papers.map((paper) => (
                                <li key={paper.id} className="p-2 bg-gray-100 rounded">
                                    <a
                                        href={paper.url}
                                        className="text-indigo-600 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {paper.title} ({paper.year})
                                    </a>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-600">No question papers available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default QuestionPapers;