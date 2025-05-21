import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"; // Adjust path as needed

const Schedule = () => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const [selectedDay, setSelectedDay] = useState('T');
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/schedule', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setSchedule(data);
                }
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        fetchSchedule();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Schedule</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
                    <div className="flex space-x-2 mb-4">
                        {days.map((day) => (
                            <button
                                key={day}
                                className={`px-3 py-1 rounded ${
                                    selectedDay === day
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200'
                                }`}
                                onClick={() => setSelectedDay(day)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                    <div className="space-y-2">
                        {schedule
                            .filter((item) => item.day === selectedDay)
                            .map((item) => (
                                <div
                                    key={item.course}
                                    className="flex items-center justify-between p-2 bg-gray-100 rounded"
                                >
                                    <span>{item.course}</span>
                                    <span>{item.time}</span>
                                </div>
                            ))}
                        {schedule.filter((item) => item.day === selectedDay).length === 0 && (
                            <p className="text-gray-600">No schedule for this day.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Schedule;