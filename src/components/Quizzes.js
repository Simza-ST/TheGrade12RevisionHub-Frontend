import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Adjust path as needed

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/quizzes', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setQuizzes(data);
                }
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Quizzes</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Available Quizzes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {quizzes.length > 0 ? (
                            quizzes.map((quiz) => (
                                <div key={quiz.id} className="p-4 bg-gray-100 rounded">
                                    <h3 className="font-semibold">{quiz.title}</h3>
                                    <p className="text-gray-600">{quiz.subject}</p>
                                    <p className="text-sm text-gray-500">Due: {quiz.dueDate}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No quizzes available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quizzes;