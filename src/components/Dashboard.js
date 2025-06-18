import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './common/Sidebar';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import CourseMastery from './onDashboardPages/CourseMastery';
import Schedule from './onDashboardPages/Schedule';
import RecentActivity from './onDashboardPages/RecentActivity';
import UpcomingDeadlines from './onDashboardPages/UpcomingDeadlines';
import RecommendedResources from './onDashboardPages/RecommendedResources';
import NotificationsWidget from './onDashboardPages/NotificationsWidget';
import StudyTimer from './onDashboardPages/StudyTimer';
import MotivationalQuote from './onDashboardPages/MotivationalQuote';
import ProgressOverview from './onDashboardPages/ProgressOverview';
import Header from "./common/Header";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
};

const PerformanceChart = ({ courses }) => {
    const data = {
        labels: courses.map((course) => course.name),
        datasets: [
            {
                label: 'Progress (%)',
                data: courses.map((course) => course.progress),
                backgroundColor: 'var(--accent-primary)',
                borderColor: 'var(--accent-primary)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-normal)' } },
            title: { display: true, text: 'Course Performance', color: 'var(--text-normal)' },
        },
        scales: {
            x: { ticks: { color: 'var(--text-normal)' } },
            y: { beginAtZero: true, max: 100, ticks: { color: 'var(--text-normal)' } },
        },
    };

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-normal)]">Performance Overview</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

PerformanceChart.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
};

const Dashboard = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false); // State for popup

    const [stats] = useState({
        performance: '90%',
        attendance: '97.2%',
        achievements: '18',
        completedTasks: '45',
    });
    const [courses, setCourses] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [activities, setActivities] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [resources, setResources] = useState([]);
    const [quote, setQuote] = useState({ text: '', author: '' });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        setTimeout(() => {
            setCourses([
                { name: 'Advanced Calculus', progress: 86 },
                { name: 'Physical Sciences', progress: 80 },
                { name: 'Mathematics', progress: 85 },
                { name: 'Information Technology', progress: 81 },
                { name: 'History', progress: 78 },
                { name: 'Chemistry', progress: 92 },
            ]);
            setSchedule([
                { day: 'T', course: 'Mathematics', time: '11:00-12:30', location: 'Room 101' },
                { day: 'T', course: 'Geography', time: '08:00-09:30', location: 'Room 202' },
                { day: 'T', course: 'Physical Sciences', time: '10:00-11:00', location: 'Lab A' },
                { day: 'W', course: 'History', time: '09:00-10:30', location: 'Room 303' },
            ]);
            setActivities([
                { id: 1, description: 'Completed Quiz 1 in Mathematics', date: '2025-05-20T10:18:00Z' },
                { id: 2, description: 'Submitted Assignment for Physical Sciences', date: '2025-05-19T15:30:00Z' },
                { id: 3, description: 'Joined study group for Chemistry', date: '2025-05-18T19:00:00Z' },
                { id: 4, description: 'Reviewed History notes', date: '2025-05-17T09:00:00Z' },
            ]);
            setDeadlines([
                { id: 1, title: 'Mathematics Quiz 2', dueDate: '2025-06-23' },
                { id: 2, title: 'Physics Assignment', dueDate: '2025-06-25' },
                { id: 3, title: 'History Essay', dueDate: '2025-06-27' },
            ]);
            setResources([
                {
                    id: 1,
                    title: 'Khan Academy Calculus',
                    url: 'https://khanacademy.org',
                    description: 'Interactive calculus lessons',
                },
                {
                    id: 2,
                    title: 'Crash Course Chemistry',
                    url: 'https://youtube.com',
                    description: 'Video series on chemistry concepts',
                },
                {
                    id: 3,
                    title: 'History.com',
                    url: 'https://history.com',
                    description: 'Articles on historical events',
                },
            ]);
            setQuote({
                text: 'Education is the most powerful weapon you can use to change the world.',
                author: 'Nelson Mandela',
            });
            setLoading(false);
        }, 25);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleTimerFinish = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    //const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <>
            <div className="flex min-h-screen">
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    darkMode={darkMode}
                />
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Dashboard"
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
                        <CourseMastery courses={courses} />
                        <Schedule schedule={schedule} />
                        <PerformanceChart courses={courses} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <RecentActivity activities={activities} />
                        <UpcomingDeadlines deadlines={deadlines} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <RecommendedResources resources={resources} />
                        <NotificationsWidget notifications={notifications} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <StudyTimer onTimerFinish={handleTimerFinish} />
                        <MotivationalQuote quote={quote} />
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-2xl max-w-sm w-full">
                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Time is up!</h3>
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

Dashboard.propTypes = {
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

export default Dashboard;