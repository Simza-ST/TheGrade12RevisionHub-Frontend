import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"; // Adjust path as needed

const QuestionPapers = () => {
    const [papers, setPapers] = useState([]);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/question-papers', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setPapers(data);
                }
            } catch (error) {
                console.error('Error fetching question papers:', error);
            }
        };
        fetchPapers();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
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