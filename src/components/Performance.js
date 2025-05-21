import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"; // Adjust path as needed

const Performance = () => {
    const [performance, setPerformance] = useState({});

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/performance', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setPerformance(data);
                }
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };
        fetchPerformance();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
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