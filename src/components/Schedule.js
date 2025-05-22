import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const Schedule = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });
    const days = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
    const [selectedDay, setSelectedDay] = useState('T');

    useEffect(() => {
        const mockSchedule = [
            { day: 'M', course: 'Mathematics', time: '09:00-10:30', location: 'Room 101' },
            { day: 'T', course: 'Physical Sciences', time: '10:00-11:00', location: 'Lab A' },
            { day: 'T', course: 'Geography', time: '08:00-09:30', location: 'Room 202' },
            { day: 'W', course: 'History', time: '09:00-10:30', location: 'Room 303' },
            { day: 'Th', course: 'Chemistry', time: '11:00-12:30', location: 'Lab B' },
        ];

        setTimeout(() => {
            try {
                setSchedule(mockSchedule);
                setLoading(false);
            } catch (error) {
                console.error('Error setting mock schedule:', error);
            }
        }, 1000);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <div
                className={`
                    flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
                    ${isCollapsed ? 'ml-16' : 'ml-64'}
                    ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}
                `}
            >
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Schedule</h1>
                        <p className="text-sm mt-1">Plan your week, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            aria-label={`View notifications (${notificationCount} unread)`}
                        >
                            🔔
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Weekly Schedule</h2>
                    <div className="flex space-x-2 mb-4">
                        {days.map((day) => (
                            <button
                                key={day}
                                className={`px-3 py-1 rounded ${
                                    selectedDay === day
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'
                                }`}
                                onClick={() => setSelectedDay(day)}
                                aria-label={`Select ${day}`}
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
                                    key={`${item.course}-${item.time}`}
                                    className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                >
                                    <span className="font-medium text-gray-700 dark:text-gray-200">
                                        {item.course} ({item.location})
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-300">{item.time}</span>
                                </div>
                            ))}
                        {schedule.filter((item) => item.day === selectedDay).length === 0 && (
                            <p className="text-gray-600 dark:text-gray-300">No schedule for this day.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

Schedule.propTypes = {
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default Schedule;