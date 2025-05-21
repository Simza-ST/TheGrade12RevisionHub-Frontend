import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const Schedule = () => {
    const navigate = useNavigate();
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const [selectedDay, setSelectedDay] = useState('T');
    const [schedule, setSchedule] = useState([]);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockSchedule = [
            { day: 'T', course: 'Mathematics', time: '11:00-12:30' },
            { day: 'T', course: 'Geography', time: '08:00-09:30' },
            { day: 'T', course: 'Physical Sciences', time: '10:00-11:00' },
        ];

        setTimeout(() => {
            try {
                setSchedule(mockSchedule);
            } catch (error) {
                console.error('Error setting mock schedule:', error);
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