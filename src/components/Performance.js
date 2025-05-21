import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const Performance = () => {
    const navigate = useNavigate();
    const [performance, setPerformance] = useState({});
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockPerformance = {
            score: '90%',
            rank: 'Top 10%',
            progress: '85%',
        };

        setTimeout(() => {
            try {
                setPerformance(mockPerformance);
            } catch (error) {
                console.error('Error setting mock performance:', error);
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
                <h1 className="text-3xl font-bold mb-6">Performance</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Your Performance</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-4 bg-gray-100 rounded">
                            <h3 className="font-semibold">Overall Score</h3>
                            <p className="text-2xl text-indigo-600">
                                {performance.score || 'N/A'}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded">
                            <h3 className="font-semibold">Rank</h3>
                            <p className="text-2xl text-indigo-600">
                                {performance.rank || 'N/A'}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded">
                            <h3 className="font-semibold">Progress</h3>
                            <p className="text-2xl text-indigo-600">
                                {performance.progress || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Performance;