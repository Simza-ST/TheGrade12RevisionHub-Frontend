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
import { recordActivity } from '../utils/activityUtil.js';

const StatsCard = ({ title, value, icon, color = 'text-[var(--text-normal)]' }) => (
    <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl flex items-center space-x-3 sm:space-x-4 hover:shadow-lg transition-shadow">
        <div className={`text-xl sm:text-2xl md:text-3xl ${color}`} aria-hidden="true">{icon}</div>
        <div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--text-normal)]">{title}</h3>
            <p className={`text-lg sm:text-xl md:text-2xl ${color}`}>{value}</p>
        </div>
    </div>
);

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
};

const StudentDashboard = ({ user, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications, setNotifications, onActivity, activities, setActivities }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [courses, setCourses] = useState([]);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [numberOfSubjects, setNumberOfSubjects] = useState(0);
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [schedule, setSchedule] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

    const [stats, setStats] = useState({
        numberOfSubjects: 0,
        attendance: '0%',
        achievements: '18',
        completedTasks: 0,
    });

    useEffect(() => {
        const savedTheme = sessionStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);
        setDarkMode(savedTheme === 'dark');
    }, [setDarkMode]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

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
                    setStats(prev => ({ ...prev, numberOfSubjects: subjectNames.length }));
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
                        progress: course.progress,
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
                        date: activity.date,
                    })));
                } else {
                    console.error(activitiesData.message || 'Failed to fetch activities');
                }

                const subjectsResponse = await fetch(`${API_BASE_URL}/api/user/count-subjects`, { headers });
                const subjectsData = await subjectsResponse.json();
                if (subjectsResponse.ok && subjectsData.success) {
                    setStats(prev => ({ ...prev, numberOfSubjects: subjectsData.data }));
                    setNumberOfSubjects(subjectsData.data);
                } else {
                    console.error(subjectsData.message || 'Failed to fetch number of subjects');
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
    }, [API_BASE_URL, setDarkMode, setActivities]);

    const enrollSubject = async (subjectId) => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${API_BASE_URL}/api/user/enroll-subject`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ subjectId }),
            });
            const data = await response.json();
            if (response.ok && data.success) {
                console.log('Subject enrolled:', data.message);
                const subjectsResponse = await fetch(`${API_BASE_URL}/api/user/count-subjects`, { headers });
                const subjectsData = await subjectsResponse.json();
                if (subjectsResponse.ok && subjectsData.success) {
                    setStats(prev => ({ ...prev, numberOfSubjects: subjectsData.data }));
                    setNumberOfSubjects(subjectsData.data);
                }
            } else {
                console.error(data.message || 'Failed to enroll subject');
            }
        } catch (error) {
            console.error('Error enrolling subject:', error);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const handleTimerFinish = () => {
        setShowPopup(true);
        onActivity('Completed study session');
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center bg-[var(--bg-primary)]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)] relative">
                <style>{`
          :not(.sidebar-wrapper, .hamburger, .dashboard-content, .header, .header h1) {
            transition: none !important;
            animation: none !important;
            opacity: 1 !important;
          }
          .sidebar-wrapper,
          .hamburger,
          .dashboard-content,
          .header,
          .header-title {
            transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, margin-left 0.3s ease-in-out, padding-left 0.3s ease-in-out;
          }
          .full {
            width: 100%;
            min-height: 100vh;
            position: relative;
            z-index: 10;
          }
          .bg-[var(--bg-primary)] {
            background-color: var(--bg-primary, ${darkMode ? '#111827' : '#f4f4f4'});
          }
          .bg-[var(--bg-secondary)] {
            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
          }
          .bg-[var(--bg-tertiary)] {
            background-color: var(--bg-tertiary, ${darkMode ? '#374151' : '#e5e7eb'});
          }
          .bg-[var(--accent-primary)] {
            background-color: var(--accent-primary, #007bff);
          }
          .text-[var(--text-primary)] {
            color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
          }
          .text-[var(--text-secondary)] {
            color: var(--text-secondary, ${darkMode ? '#d1d5db' : '#666666'});
          }
          .hover\\:bg-[var(--hover-tertiary)]:hover {
            background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
          }
          .hover\\:bg-[var(--hover-primary)]:hover {
            background-color: var(--hover-primary, #0056b3);
          }
          .flex {
            display: flex;
          }
          .min-h-screen {
            min-height: 100vh;
          }
          .min-w-0 {
            min-width: 0;
          }
          .justify-center {
            justify-content: center;
          }
          .items-center {
            align-items: center;
          }
          .flex-1 {
            flex: 1;
          }
          .gap-4 {
            gap: clamp(8px, 2vw, 12px);
          }
          .gap-6 {
            gap: clamp(12px, 3vw, 16px);
          }
          .p-4 {
            padding: clamp(8px, 2vw, 12px);
          }
          .p-6 {
            padding: clamp(12px, 3vw, 16px);
          }
          .sm\\:p-6 {
            padding: clamp(12px, 3vw, 16px);
          }
          .sm\\:p-8 {
            padding: clamp(16px, 4vw, 20px);
          }
          .rounded-2xl {
            border-radius: 12px;
          }
          .shadow-2xl {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .text-sm {
            font-size: clamp(0.75rem, 2vw, 0.875rem);
          }
          .text-base {
            font-size: clamp(0.875rem, 2.5vw, 1rem);
          }
          .text-lg {
            font-size: clamp(1rem, 3vw, 1.125rem);
          }
          .text-xl {
            font-size: clamp(1.125rem, 3.5vw, 1.25rem);
          }
          .text-2xl {
            font-size: clamp(1.25rem, 4vw, 1.5rem);
          }
          .text-3xl {
            font-size: clamp(1.5rem, 4.5vw, 1.875rem);
          }
          .font-semibold {
            font-weight: 600;
          }
          .btn-primary {
            background-color: var(--accent-primary, #007bff);
            color: #ffffff;
            padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px);
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-size: clamp(0.75rem, 2vw, 0.875rem);
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          .btn-primary:hover {
            background-color: var(--hover-primary, #0056b3);
          }
          .grid {
            display: grid;
            gap: clamp(8px, 2vw, 12px);
          }
          .hamburger {
            display: none;
            cursor: pointer;
            background: none;
            border: none;
            padding: 8px;
            position: fixed;
            top: 16px;
            left: 16px;
            z-index: 50;
            transition: left 0.3s ease-in-out;
          }
          .sidebar-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            z-index: 40;
            transition: transform 0.3s ease-in-out;
          }
          .sidebar-hidden {
            transform: translateX(-100%);
          }
          .dashboard-content {
            max-height: 80vh;
            overflow-y: auto;
            padding-right: 8px;
          }
          .dashboard-content::-webkit-scrollbar {
            width: 6px;
          }
          .dashboard-content::-webkit-scrollbar-thumb {
            background-color: var(--border-color, ${darkMode ? '#4b5563' : '#e5e7eb'});
            border-radius: 3px;
          }
          .dashboard-content::-webkit-scrollbar-track {
            background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
          }
          /*.header h1 {
            padding-left: clamp(40px, 10vw, 48px); /!* Default padding *!/
          }*/
          @media (max-width: 639px) {
            .header h1 {
              padding-left: clamp(48px, 12vw, 56px); /* Extra padding to clear hamburger when sidebar false */
            }
            .sidebar-open .header h1 {
              padding-left: clamp(208px, 50vw, 216px); /* Extra padding when sidebar open (hamburger at 198px) */
            }
            .sidebar-open .dashboard-content {
              margin-left: 198px; /* Shift content right when sidebar open to avoid overlap */
            }
          }
          @media (max-width: 480px) {
            .grid {
              grid-template-columns: 1fr;
            }
            .hamburger {
              display: block;
              
            }
            .sidebar-wrapper {
              display: ${showSidebar ? 'block' : 'none'};
            }
            .hamburger {
              left: ${showSidebar ? '198px' : '5px'};
            }
            .ml-16, .ml-64 {
              margin-left: 0;
            }
            .p-6, .sm\\:p-6, .sm\\:p-8 {
              padding: clamp(8px, 2vw, 10px);
            }
            .text-2xl {
              font-size: clamp(1rem, 3vw, 1.25rem);
            }
            .text-xl {
              font-size: clamp(0.875rem, 2.5vw, 1rem);
            }
            .btn-primary {
              font-size: clamp(0.7rem, 1.8vw, 0.8rem);
              min-height: 40px;
            }
          }
          @media (min-width: 481px) and (max-width: 639px) {
            .grid {
              grid-template-columns: 1fr;
            }
            .hamburger {
              display: block;
            }
            .sidebar-wrapper {
              display: ${showSidebar ? 'block' : 'none'};
            }
            .hamburger {
              left: ${showSidebar ? '198px' : '10px'};
            }
            .ml-16, .ml-64 {
              margin-left: 0;
            }
            .p-6, .sm\\:p-6, .sm\\:p-8 {
              padding: clamp(10px, 2.5vw, 12px);
            }
          }
          @media (min-width: 640px) and (max-width: 767px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .md\\:grid-cols-4 {
              grid-template-columns: repeat(2, 1fr);
            }
            .lg\\:grid-cols-3 {
              grid-template-columns: repeat(2, 1fr);
            }
            .lg\\:grid-cols-2 {
              grid-template-columns: 1fr;
            }
            .hamburger {
              display: none;
            }
            .sidebar-wrapper {
              display: block;
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .grid {
              grid-template-columns: repeat(2, 1fr);
            }
            .md\\:grid-cols-4 {
              grid-template-columns: repeat(3, 1fr);
            }
            .lg\\:grid-cols-3 {
              grid-template-columns: repeat(2, 1fr);
            }
            .lg\\:grid-cols-2 {
              grid-template-columns: 1fr;
            }
            .p-6, .sm\\:p-6 {
              padding: clamp(12px, 3vw, 16px);
            }
            .sm\\:p-8 {
              padding: clamp(16px, 4vw, 20px);
            }
          }
          @media (min-width: 1024px) and (max-width: 1279px) {
            .grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .md\\:grid-cols-4 {
              grid-template-columns: repeat(4, 1fr);
            }
            .lg\\:grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
            }
            .lg\\:grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (min-width: 1280px) {
            .grid {
              grid-template-columns: repeat(4, 1fr);
            }
            .md\\:grid-cols-4 {
              grid-template-columns: repeat(4, 1fr);
            }
            .lg\\:grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
            }
            .lg\\:grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
            }
            .p-6, .sm\\:p-6 {
              padding: clamp(16px, 3.5vw, 20px);
            }
            .sm\\:p-8 {
              padding: clamp(20px, 4vw, 24px);
            }
          }
        `}</style>
                <button
                    className="hamburger"
                    onClick={() => {
                        setShowSidebar(!showSidebar);
                        if (!showSidebar) setIsCollapsed(false);
                    }}
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div className={`sidebar-wrapper ${!showSidebar ? 'sidebar-hidden' : ''}`}>
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        darkMode={darkMode}
                        disableHamburger={showSidebar && window.innerWidth <= 639}
                        onActivity={onActivity}
                    />
                </div>
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Student Dashboard"
                        userMessage="Welcome to dashboard"
                        className="header"
                    />
                    <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content ${showSidebar ? 'sidebar-open' : ''}`}>
                        <div className="grid md:grid-cols-4 gap-6 mb-6">
                            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                                <StatsCard title="Number Of Subjects" value={stats.numberOfSubjects} icon="📊" />
                                <StatsCard title="Attendance" value={stats.attendance} icon="✅" />
                                <StatsCard title="Achievements" value={stats.achievements} icon="🏆" />
                                <StatsCard title="Tasks Completed" value={stats.completedTasks} icon="✔️" />
                            </div>
                            <div className="md:col-span-4">
                                <ProgressOverview courses={courses} />
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6 mb-6">
                            <CourseMastery enrolledSubjects={enrolledSubjects} darkMode={darkMode} courses={courses} />
                            <Schedule schedule={schedule} />
                            <PerformanceChart darkMode={darkMode} API_BASE_URL={API_BASE_URL} />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 mb-6">
                            <RecentActivity activities={activities} setActivities={setActivities} API_BASE_URL={API_BASE_URL} />
                            <MotivationalQuote quote={quote} />
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 mb-6">
                            <StudyTimer onTimerFinish={handleTimerFinish} />
                            <NotificationsWidget notifications={notifications} setNotifications={setNotifications} onActivity={onActivity} />
                        </div>
                    </div>
                </div>
                {showPopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[var(--bg-secondary)] p-4 sm:p-6 rounded-2xl shadow-2xl max-w-sm w-full">
                            <h3 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">Time is up!</h3>
                            <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-4">Your study session has ended.</p>
                            <button
                                onClick={handleClosePopup}
                                className="btn-primary w-full"
                                aria-label="Close popup"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

StudentDashboard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
            type: PropTypes.string,
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    setActivities: PropTypes.func.isRequired,
    onActivity: PropTypes.func.isRequired,
};

export default StudentDashboard;