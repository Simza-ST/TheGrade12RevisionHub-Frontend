import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './common/Sidebar';
import CourseMastery from './onDashboardPages/CourseMastery';
import Schedule from './onDashboardPages/Schedule';
import RecentActivity from './onDashboardPages/RecentActivity';
import UpcomingDeadlines from './onDashboardPages/UpcomingDeadlines';
import RecommendedResources from './onDashboardPages/RecommendedResources';
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
    const [courses, setCourses] = useState([]); // Reintroduced to fix undefined error
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/user';

    const [stats] = useState({
        performance: '90%',
        attendance: '97.2%',
        achievements: '18',
        completedTasks: '45',
    });
    const [schedule, setSchedule] = useState([]);
    const [activities, setActivities] = useState([]);
    const [deadlines, setDeadlines] = useState([]);
    const [resources, setResources] = useState([]);
    const [quote, setQuote] = useState({ text: '', author: '' });

    useEffect(() => {
        // Initialize theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        setDarkMode(savedTheme === 'dark');
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                };
                // Fetch enrolled subjects
                const enrolledResponse = await fetch(`${API_BASE_URL}/enrolled-subjects`, { headers });
const enrolledData = await enrolledResponse.json();
if (enrolledResponse.ok && enrolledData.success) {
    const subjectNames = Array.isArray(enrolledData.data) ? enrolledData.data.map(s => s.subjectName || s) : [];
    setEnrolledSubjects(subjectNames);
} else {
    console.error(enrolledData.message || 'Failed to fetch enrolled subjects');
}

// Reintroduce mock courses data to support ProgressOverview and PerformanceChart
setTimeout(() => {
    setCourses([
        { name: 'Advanced Calculus', progress: 100 },
        { name: 'Physical Sciences', progress: 80 },
        { name: 'Mathematics', progress: 85 },
        { name: 'Information Technology', progress: 50 },
        { name: 'History', progress: 100 },
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
        { id: 1, title: 'Khan Academy Calculus', url: 'https://khanacademy.org', description: 'Interactive calculus lessons' },
        { id: 2, title: 'Crash Course Chemistry', url: 'https://youtube.com', description: 'Video series on chemistry concepts' },
        { id: 3, title: 'History.com', url: 'https://history.com', description: 'Articles on historical events' },
    ]);
    setQuote({
        text: 'Education is the most powerful weapon you can use to change the world.',
        author: 'Nelson Mandela',
    });
    setLoading(false);
}, 25);
} catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
}
};
fetchData();
}, []);

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
                        <CourseMastery enrolledSubjects={enrolledSubjects} darkMode={darkMode} />
                        <Schedule schedule={schedule} />
                        <PerformanceChart courses={courses} darkMode={darkMode} />
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
