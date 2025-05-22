import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsCard = ({ title, value, icon, color = 'text-teal-400' }) => (
    <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
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

const CourseMastery = ({ courses }) => {
    const [sortBy, setSortBy] = useState('progress');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');

    const sortedCourses = useMemo(() => {
        let result = [...courses];
        if (searchTerm) {
            result = result.filter((course) =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        result.sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            return sortBy === 'progress'
                ? (a.progress - b.progress) * order
                : a.name.localeCompare(b.name) * order;
        });
        return result;
    }, [courses, sortBy, sortOrder, searchTerm]);

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Course Mastery</h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-teal-700 text-white w-full sm:w-1/2"
                    aria-label="Search courses"
                />
                <div className="flex items-center gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
                        aria-label="Sort by"
                    >
                        <option value="progress">Progress</option>
                        <option value="name">Name</option>
                    </select>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-4 py-3 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700 whitespace-nowrap"
                        aria-label={`Sort order: ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                    >
                        {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {sortedCourses.map((course) => (
                    <div key={course.name} className="flex items-center space-x-4">
                        <div className="w-1/3 text-white">{course.name}</div>
                        <div className="w-2/3">
                            <div className="bg-gray-600 rounded-full h-4">
                                <div
                                    className="bg-teal-600 h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-300">{course.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

CourseMastery.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
};

const Schedule = ({ schedule }) => {
    const days = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
    const [selectedDay, setSelectedDay] = useState('T');
    const [viewMode, setViewMode] = useState('list');

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Schedule</h2>
                <button
                    onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                    className="px-4 py-3 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                    aria-label={`Switch to ${viewMode === 'list' ? 'calendar' : 'list'} view`}
                >
                    {viewMode === 'list' ? 'Calendar View' : 'List View'}
                </button>
            </div>
            {viewMode === 'list' ? (
                <>
                    <div className="flex space-x-2 mb-4">
                        {days.map((day) => (
                            <button
                                key={day}
                                className={`px-3 py-1 rounded ${
                                    selectedDay === day
                                        ? 'bg-gradient-to-r from-teal-600 to-red-600 text-white'
                                        : 'bg-gray-600 hover:bg-gray-500'
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
                                    key={item.course}
                                    className="flex items-center justify-between p-2 bg-teal-700 rounded hover:bg-teal-600 transition"
                                    title={`Location: ${item.location}`}
                                >
                                    <span className="font-medium text-white">{item.course}</span>
                                    <span className="text-gray-300">{item.time}</span>
                                </div>
                            ))}
                        {schedule.filter((item) => item.day === selectedDay).length === 0 && (
                            <p className="text-gray-300">No schedule for this day.</p>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-gray-300">Calendar view coming soon!</div>
            )}
        </div>
    );
};

Schedule.propTypes = {
    schedule: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            course: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            location: PropTypes.string.isRequired,
        })
    ).isRequired,
};

const RecentActivity = ({ activities }) => (
    <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Activity</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
            {activities.length > 0 ? (
                activities.map((activity) => (
                    <li
                        key={activity.id}
                        className="p-2 bg-teal-700 rounded hover:bg-teal-600 transition cursor-pointer"
                        onClick={() => console.log(`View details for: ${activity.description}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && console.log(`View details for: ${activity.description}`)}
                    >
                        <span className="font-medium text-white">{activity.description}</span>
                        <span className="text-sm text-gray-300 ml-2">
                            {new Date(activity.date).toLocaleString()}
                        </span>
                    </li>
                ))
            ) : (
                <p className="text-gray-300">No recent activity.</p>
            )}
        </ul>
    </div>
);

RecentActivity.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

const UpcomingDeadlines = ({ deadlines }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDeadlines = deadlines.filter((deadline) =>
        deadline.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Upcoming Deadlines</h2>
            <input
                type="text"
                placeholder="Search deadlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
                aria-label="Search deadlines"
            />
            <ul className="space-y-2 max-h-80 overflow-y-auto mt-4">
                {filteredDeadlines.length > 0 ? (
                    filteredDeadlines.map((deadline) => (
                        <li
                            key={deadline.id}
                            className="p-2 bg-teal-700 rounded flex justify-between hover:bg-teal-600 transition"
                        >
                            <span className="font-medium text-white">{deadline.title}</span>
                            <span className="text-sm text-red-400">{deadline.dueDate}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-300">No upcoming deadlines.</p>
                )}
            </ul>
        </div>
    );
};

UpcomingDeadlines.propTypes = {
    deadlines: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            dueDate: PropTypes.string.isRequired,
        })
    ).isRequired,
};

const QuickLinks = () => (
    <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
        <div className="grid grid-cols-2 gap-4">
            {[
                { to: '/subjects', label: 'View Subjects' },
                { to: '/quizzes', label: 'Take a Quiz' },
                { to: '/questionpapers', label: 'Question Papers' },
                { to: '/chatroom', label: 'Join Chatroom' },
                { to: '/resources', label: 'Resources' },
                { to: '/performance', label: 'Performance' },
            ].map((link) => (
                <Link
                    key={link.to}
                    to={link.to}
                    className="bg-gradient-to-r from-teal-600 to-red-600 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-red-700 text-center transition"
                >
                    {link.label}
                </Link>
            ))}
        </div>
    </div>
);

const GoalTracker = ({ goals, setGoals }) => {
    const [newGoal, setNewGoal] = useState('');

    const handleAddGoal = () => {
        if (newGoal.trim()) {
            setGoals([
                ...goals,
                {
                    id: goals.length + 1,
                    description: newGoal,
                    progress: 0,
                },
            ]);
            setNewGoal('');
        }
    };

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Goal Tracker</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Add a new goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="flex-1 p-3 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
                    aria-label="Add a new goal"
                />
                <button
                    onClick={handleAddGoal}
                    className="bg-gradient-to-r from-teal-600 to-red-600 text-white px-4 rounded-r-lg hover:from-teal-700 hover:to-red-700"
                    aria-label="Add goal"
                >
                    Add
                </button>
            </div>
            <div className="space-y-4">
                {goals.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-4">
                        <div className="w-2/3 text-white">{goal.description}</div>
                        <div className="w-1/3">
                            <div className="bg-gray-600 rounded-full h-4">
                                <div
                                    className="bg-teal-600 h-4 rounded-full"
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-300">{goal.progress}%</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

GoalTracker.propTypes = {
    goals: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
    setGoals: PropTypes.func.isRequired,
};

const RecommendedResources = ({ resources }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredResources = resources.filter((resource) =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Recommended Resources</h2>
            <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
                aria-label="Search resources"
            />
            <ul className="space-y-2 max-h-80 overflow-y-auto mt-4">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <li
                            key={resource.id}
                            className="p-2 bg-teal-700 rounded hover:bg-teal-600 transition"
                        >
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-teal-400 hover:underline font-medium"
                            >
                                {resource.title}
                            </a>
                            <p className="text-sm text-gray-300">{resource.description}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-300">No resources available.</p>
                )}
            </ul>
        </div>
    );
};

RecommendedResources.propTypes = {
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
};

const PerformanceChart = ({ courses }) => {
    const data = {
        labels: courses.map((course) => course.name),
        datasets: [
            {
                label: 'Progress (%)',
                data: courses.map((course) => course.progress),
                backgroundColor: 'rgba(45, 212, 191, 0.6)', // teal-600 with opacity
                borderColor: 'rgba(45, 212, 191, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'white' } },
            title: { display: true, text: 'Course Performance', color: 'white' },
        },
        scales: {
            x: { ticks: { color: 'white' } },
            y: { beginAtZero: true, max: 100, ticks: { color: 'white' } },
        },
    };

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Performance Overview</h2>
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

const NotificationsWidget = ({ notifications }) => (
    <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-white">Notifications</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                    <li
                        key={notification.id}
                        className="p-2 bg-teal-700 rounded hover:bg-teal-600 transition"
                    >
                        <span className="text-white">{notification.message}</span>
                        <span className="text-sm text-gray-300 ml-2">{notification.date}</span>
                    </li>
                ))
            ) : (
                <p className="text-gray-300">No notifications.</p>
            )}
        </ul>
        <Link
            to="/notifications"
            className="block text-center mt-4 text-teal-400 hover:underline"
        >
            View All Notifications
        </Link>
    </div>
);

NotificationsWidget.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

const StudyTimer = () => {
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval;
        if (isActive && time > 0) {
            interval = setInterval(() => setTime((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Study Timer</h2>
            <div className="text-4xl font-mono text-teal-400 mb-4">{formatTime()}</div>
            <div className="flex gap-2">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
                    aria-label={isActive ? 'Pause timer' : 'Start timer'}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={() => {
                        setTime(25 * 60);
                        setIsActive(false);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
                    aria-label="Reset timer"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

const MotivationalQuote = ({ quote }) => (
    <div className="bg-gradient-to-r from-teal-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl text-center">
        <p className="text-lg font-semibold">"{quote.text}"</p>
        <p className="text-sm mt-2">— {quote.author}</p>
    </div>
);

MotivationalQuote.propTypes = {
    quote: PropTypes.shape({
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
    }).isRequired,
};

const ProgressOverview = ({ courses }) => {
    const averageProgress =
        courses.reduce((sum, course) => sum + course.progress, 0) / courses.length || 0;

    return (
        <div className="bg-teal-800 bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-white">Progress Overview</h2>
            <div className="flex items-center space-x-4">
                <div className="w-1/2">
                    <div className="bg-gray-600 rounded-full h-6">
                        <div
                            className="bg-teal-600 h-6 rounded-full"
                            style={{ width: `${averageProgress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="w-1/2 text-center">
                    <p className="text-2xl font-semibold text-teal-400">{averageProgress.toFixed(1)}%</p>
                    <p className="text-sm text-gray-300">Overall Progress</p>
                </div>
            </div>
        </div>
    );
};

ProgressOverview.propTypes = {
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
};

const Dashboard = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });
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
    const [goals, setGoals] = useState([]);
    const [resources, setResources] = useState([]);
    const [quote, setQuote] = useState({ text: '', author: '' });

    useEffect(() => {
        setTimeout(() => {
            setCourses([
                { name: 'Advance Calculus', progress: 86 },
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
                { id: 1, description: 'Completed Quiz 1 in Mathematics', date: '2025-05-20T10:00:00Z' },
                { id: 2, description: 'Submitted Assignment for Physical Sciences', date: '2025-05-19T15:30:00Z' },
                { id: 3, description: 'Joined study group for Chemistry', date: '2025-05-18T12:00:00Z' },
                { id: 4, description: 'Reviewed History notes', date: '2025-05-17T09:00:00Z' },
            ]);
            setDeadlines([
                { id: 1, title: 'Mathematics Quiz 2', dueDate: '2025-05-23' },
                { id: 2, title: 'Physics Assignment', dueDate: '2025-05-25' },
                { id: 3, title: 'History Essay', dueDate: '2025-05-27' },
            ]);
            setGoals([
                { id: 1, description: 'Complete 5 quizzes this week', progress: 60 },
                { id: 2, description: 'Read 2 chapters of Chemistry', progress: 30 },
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
        }, 1000);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900">
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
                `}
            >
                <div className="bg-gradient-to-r from-teal-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-sm mt-1 text-gray-300">Welcome, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
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
                            className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-4 gap-6">
                        <StatsCard title="Performance" value={stats.performance} icon="📊" />
                        <StatsCard title="Attendance" value={stats.attendance} icon="✅" />
                        <StatsCard title="Achievements" value={stats.achievements} icon="🏆" />
                        <StatsCard title="Tasks Completed" value={stats.completedTasks} icon="✔️" color="text-teal-400" />
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <GoalTracker goals={goals} setGoals={setGoals} />
                    <RecommendedResources resources={resources} />
                    <NotificationsWidget notifications={notifications} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <StudyTimer />
                    <MotivationalQuote quote={quote} />
                </div>

                <div className="mt-6">
                    <QuickLinks />
                </div>
            </div>
        </div>
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