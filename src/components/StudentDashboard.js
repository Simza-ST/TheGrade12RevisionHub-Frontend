import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './common/Sidebar';
import CourseMastery from './onDashboardPages/CourseMastery';
import Schedule from './onDashboardPages/Schedule';
import RecentActivity from './onDashboardPages/RecentActivity';
import NotificationsWidget from './onDashboardPages/NotificationsWidget';
import StudyTimer from './onDashboardPages/StudyTimer';
import MotivationalQuote from './onDashboardPages/MotivationalQuote';
import ProgressOverview from './onDashboardPages/ProgressOverview';
import Header from './common/Header';
import PerformanceChart from './onDashboardPages/PerformanceChart';

const StatsCard = ({ title, value, icon, color = 'text-[var(--text-normal)]' }) => (
    <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-[var(--text-normal)]">{title}</h3>
            <p className={`text-2xl ${color}`}>{value}</p>
        </div>
    </div>
);

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
};

const StudentDashboard = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [completedTasks, setCompletedTasks] = useState(0); // Used to update stats
    const [activities, setActivities] = useState([]);
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [schedule, setSchedule] = useState([]);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    const [stats, setStats] = useState({
        performance: '90%',
        attendance: '0%',
        achievements: '18',
        completedTasks: 0,
    });

    useEffect(() => {
        // Initialize theme from sessionStorage or system preference
        const savedTheme = sessionStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        setDarkMode(savedTheme === 'dark');
    }, [setDarkMode]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const headers = {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                };

                const enrolledResponse = await fetch(`${API_BASE_URL}/api/user/enrolled-subjects`, { headers });
                const enrolledData = await enrolledResponse.json();
                if (enrolledResponse.ok && enrolledData.success) {
                    const subjectNames = Array.isArray(enrolledData.data) ? enrolledData.data.map(s => s.subjectName || s) : [];
                    setEnrolledSubjects(subjectNames);
                } else {
                    console.error(enrolledData.message || 'Failed to fetch enrolled subjects');
                }

                const tasksResponse = await fetch(`${API_BASE_URL}/api/user/completed-tasks`, { headers });
                const tasksData = await tasksResponse.json();
                if (tasksResponse.ok && tasksData.success) {
                    setCompletedTasks(tasksData.data);
                    setStats(prev => ({ ...prev, completedTasks: tasksData.data }));
                } else {
                    console.error(tasksData.message || 'Failed to fetch completed tasks count');
                }

                const coursesResponse = await fetch(`${API_BASE_URL}/api/user/courses`, { headers });
                const coursesData = await coursesResponse.json();
                if (coursesResponse.ok && coursesData.success) {
                    setCourses(coursesData.data.map(course => ({
                        name: course.subjectName,
                        progress: course.progress
                    })));
                } else {
                    console.error(coursesData.message || 'Failed to fetch course progress');
                }

                const attendanceResponse = await fetch(`${API_BASE_URL}/api/user/attendance`, { headers });
                const attendanceData = await attendanceResponse.json();
                if (attendanceResponse.ok && attendanceData.success) {
                    setStats(prev => ({ ...prev, attendance: `${attendanceData.data}%` }));
                } else {
                    console.error(attendanceData.message || 'Failed to fetch attendance percentage');
                }

                const activitiesResponse = await fetch(`${API_BASE_URL}/api/user/activities`, { headers });
                const activitiesData = await activitiesResponse.json();
                if (activitiesResponse.ok && activitiesData.success) {
                    setActivities(activitiesData.data.map(activity => ({
                        id: activity.id,
                        description: activity.description,
                        date: activity.date
                    })));
                } else {
                    console.error(activitiesData.message || 'Failed to fetch activities');
                }

                setSchedule([
                    { day: 'T', course: 'Mathematics', time: '11:00-12:30', location: 'Room 101' },
                    { day: 'T', course: 'Geography', time: '08:00-09:30', location: 'Room 202' },
                    { day: 'T', course: 'Physical Sciences', time: '10:00-11:00', location: 'Lab A' },
                    { day: 'W', course: 'History', time: '09:00-10:30', location: 'Room 303' },
                ]);

                setQuote({
                    text: 'Education is the most powerful weapon you can use to change the world.',
                    author: 'Nelson Mandela',
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [API_BASE_URL, setDarkMode]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleTimerFinish = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleRecordActivity = async (description) => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${API_BASE_URL}/api/user/activities`, {
                method: 'POST',
                headers,
                body: JSON.stringify(description)
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setActivities(prev => [{
                    id: data.data.id,
                    description: data.data.description,
                    date: data.data.date
                }, ...prev.slice(0, 9)]);
            } else {
                console.error(data.message || 'Failed to save activity');
            }
        } catch (error) {
            console.error('Error saving activity:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    darkMode={darkMode}
                    onActivity={handleRecordActivity}
                />
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="StudentDashboard"
                        userMessage="Welcome"
                    />
                    <div
                        className={`
                            flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
                            ${isCollapsed ? 'ml-16' : 'ml-64'}
                        `}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-4 gap-6">
                                <StatsCard title="Performance" value={stats.performance} icon="📊" />
                                <StatsCard title="Attendance" value={stats.attendance} icon="✅" />
                                <StatsCard title="Achievements" value={stats.achievements} icon="🏆" />
                                <StatsCard title="Tasks Completed" value={stats.completedTasks} icon="✔️" />
                            </div>
                            <div className="md:col-span-4">
                                <ProgressOverview courses={courses} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <CourseMastery enrolledSubjects={enrolledSubjects} darkMode={darkMode} courses={courses} />
                            <Schedule schedule={schedule} />
                            <PerformanceChart darkMode={darkMode} API_BASE_URL={API_BASE_URL} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 ">
                            <RecentActivity activities={activities} />
                            <MotivationalQuote quote={quote} />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <StudyTimer onTimerFinish={handleTimerFinish} />
                            <NotificationsWidget notifications={notifications} setNotifications={setNotifications} onActivity={handleRecordActivity} />
                        </div>
                    </div>
                </div>
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-2xl max-w-sm w-full">
                            <h3 className="text-xl font-semibold text-[var(--text-primary)]">Time is up!</h3>
                            <p className="text-[var(--text-secondary)] mb-4">Your study session has ended.</p>
                            <button
                                onClick={handleClosePopup}
                                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] w-full"
                                aria-label="Close popup"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

StudentDashboard.propTypes = {
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

export default StudentDashboard;