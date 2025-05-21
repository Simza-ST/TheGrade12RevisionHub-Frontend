// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Updated import

const UserProfile = ({ user }) => {
    return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
            <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="w-16 h-16 rounded-full"
            />
            <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.title}</p>
            </div>
        </div>
    );
};

const StatsCard = ({ title, value, icon }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <div className="text-3xl">{icon}</div>
            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-2xl text-indigo-600">{value}</p>
            </div>
        </div>
    );
};

const CourseMastery = ({ courses }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Course Mastery</h2>
            <div className="space-y-4">
                {courses.map((course) => (
                    <div key={course.name} className="flex items-center space-x-4">
                        <div className="w-1/3">{course.name}</div>
                        <div className="w-2/3">
                            <div className="bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-indigo-600 h-4 rounded-full"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Schedule = ({ schedule }) => {
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const [selectedDay, setSelectedDay] = useState('T'); // Default to Tuesday

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
            <div className="flex space-x-2 mb-4">
                {days.map((day) => (
                    <button
                        key={day}
                        className={`px-3 py-1 rounded ${
                            selectedDay === day ? 'bg-indigo-600 text-white' : 'bg-gray-200'
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
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [user, setUser] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });
    const [stats, setStats] = useState({
        performance: '90%',
        attendance: '97.2%',
        achievements: '18',
    });
    const [courses, setCourses] = useState([
        { name: 'Advance Calculus', progress: 86 },
        { name: 'Physical Sciences', progress: 80 },
        { name: 'Mathematics', progress: 85 },
        { name: 'Information Technology', progress: 81 },
    ]);
    const [schedule, setSchedule] = useState([
        { day: 'T', course: 'Mathematics', time: '11:00-12:30' },
        { day: 'T', course: 'Geography', time: '08:00-09:30' },
        { day: 'T', course: 'Physical Sciences', time: '10:00-11:00' },
    ]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                // Fetch user data
                const userResponse = await fetch('/api/dashboard/user', { headers });
                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setUser(userData);
                }

                // Fetch stats
                const statsResponse = await fetch('/api/dashboard/stats', { headers });
                if (statsResponse.ok) {
                    const statsData = await statsResponse.json();
                    setStats(statsData);
                }

                // Fetch courses
                const coursesResponse = await fetch('/api/dashboard/courses', { headers });
                if (coursesResponse.ok) {
                    const coursesData = await coursesResponse.json();
                    setCourses(coursesData);
                }

                // Fetch schedule
                const scheduleResponse = await fetch('/api/dashboard/schedule', { headers });
                if (scheduleResponse.ok) {
                    const scheduleData = await scheduleResponse.json();
                    setSchedule(scheduleData);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar /> {/* Updated to use Sidebar */}
            <div className="ml-64 p-8 w-full">
                <h1 className="text-3xl font-bold mb-6">Welcome {user.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-1">
                        <UserProfile user={user} />
                    </div>
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <StatsCard title="Performance" value={stats.performance} icon="📊" />
                        <StatsCard title="Attendance" value={stats.attendance} icon="✅" />
                        <StatsCard title="Achievements" value={stats.achievements} icon="🏆" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CourseMastery courses={courses} />
                    <Schedule schedule={schedule} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;