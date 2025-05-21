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

// UserProfile component for sidebar
const UserProfile = ({ user, onLogout }) => {
    if (!user) {
        return null; // Don't render if user is undefined
    }

    return (
        <div className="flex items-center space-x-4 p-4 bg-indigo-900 rounded-lg">
            <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
                <h2 className="text-sm font-semibold text-white">{user.name || 'Unknown User'}</h2>
                <p className="text-xs text-gray-300">{user.title || 'No Title'}</p>
            </div>
        </div>
    );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
};

// Sidebar component with collapsible design and navigation tabs
const Sidebar = ({ user, onLogout, isSidebarVisible, setIsSidebarVisible }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'Subjects', path: '/subjects', icon: '📚' },
        { name: 'Quizzes', path: '/quizzes', icon: '❓' },
        { name: 'Question Papers', path: '/questionpapers', icon: '📝' },
        { name: 'Resources', path: '/resources', icon: '🔗' },
        { name: 'Schedule', path: '/schedule', icon: '📅' },
        { name: 'Performance', path: '/performance', icon: '📊' },
        { name: 'Notifications', path: '/notifications', icon: '🔔' },
        { name: 'Chatroom', path: '/chatroom', icon: '💬' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
        { name: 'Logout', path: '/', icon: '🚪', onClick: onLogout },
    ];

    return (
        <nav
            className={`h-screen bg-indigo-800 text-white flex flex-col p-4 fixed top-0 left-0 transition-all duration-300 ${
                isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 ${isCollapsed ? 'w-16' : 'w-64'} z-50`}
        >
            <div className="flex items-center justify-between mb-8">
                {!isCollapsed && (
                    <div className="text-2xl font-bold">RevisionHub</div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded hover:bg-indigo-600"
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {isCollapsed ? '➡️' : '⬅️'}
                </button>
            </div>
            <ul className="space-y-2 flex-1">
                {navItems.map((item) => (
                    <li key={item.name} className="flex items-center">
                        <Link
                            to={item.path}
                            onClick={item.onClick || (() => setIsSidebarVisible(false))} // Close sidebar on mobile
                            className={`flex items-center w-full py-2 px-4 rounded hover:bg-indigo-600 ${
                                isCollapsed ? 'justify-center' : ''
                            }`}
                            title={isCollapsed ? item.name : ''}
                            aria-label={`Navigate to ${item.name}`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {!isCollapsed && (
                                <span className="ml-3">{item.name}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
            {!isCollapsed && (
                <div className="mt-auto">
                    <UserProfile user={user} onLogout={onLogout} />
                </div>
            )}
        </nav>
    );
};

Sidebar.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    onLogout: PropTypes.func.isRequired,
    isSidebarVisible: PropTypes.bool.isRequired,
    setIsSidebarVisible: PropTypes.func.isRequired,
};

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatsCard = ({ title, value, icon, color = 'text-indigo-600' }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
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
            return (a[sortBy] - b[sortBy]) * order;
        });
        return result;
    }, [courses, sortBy, sortOrder, searchTerm]);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Course Mastery</h2>
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    aria-label="Search courses"
                />
                <div className="flex gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-1 border rounded-lg dark:bg-gray-700 dark:text-white"
                        aria-label="Sort by"
                    >
                        <option value="progress">Progress</option>
                        <option value="name">Name</option>
                    </select>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        aria-label={`Sort order: ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                    >
                        {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {sortedCourses.map((course) => (
                    <div key={course.name} className="flex items-center space-x-4">
                        <div className="w-1/3 text-gray-700 dark:text-gray-200">{course.name}</div>
                        <div className="w-2/3">
                            <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                                <div
                                    className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${course.progress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{course.progress}%</span>
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Schedule</h2>
                <button
                    onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                    className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
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
                                    key={item.course}
                                    className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    title={`Location: ${item.location}`}
                                >
                                    <span className="font-medium text-gray-700 dark:text-gray-200">{item.course}</span>
                                    <span className="text-gray-600 dark:text-gray-300">{item.time}</span>
                                </div>
                            ))}
                        {schedule.filter((item) => item.day === selectedDay).length === 0 && (
                            <p className="text-gray-600 dark:text-gray-300">No schedule for this day.</p>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-gray-600 dark:text-gray-300">Calendar view coming soon!</div>
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Activity</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
            {activities.length > 0 ? (
                activities.map((activity) => (
                    <li
                        key={activity.id}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
                        onClick={() => console.log(`View details for: ${activity.description}`)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && console.log(`View details for: ${activity.description}`)}
                    >
                        <span className="font-medium text-gray-700 dark:text-gray-200">{activity.description}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
              {new Date(activity.date).toLocaleString()}
            </span>
                    </li>
                ))
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No recent activity.</p>
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Upcoming Deadlines</h2>
            <input
                type="text"
                placeholder="Search deadlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                aria-label="Search deadlines"
            />
            <ul className="space-y-2 max-h-80 overflow-y-auto">
                {filteredDeadlines.length > 0 ? (
                    filteredDeadlines.map((deadline) => (
                        <li
                            key={deadline.id}
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded flex justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                            <span className="font-medium text-gray-700 dark:text-gray-200">{deadline.title}</span>
                            <span className="text-sm text-red-500">{deadline.dueDate}</span>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">No upcoming deadlines.</p>
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h2>
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
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-center transition"
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Goal Tracker</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Add a new goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                    aria-label="Add a new goal"
                />
                <button
                    onClick={handleAddGoal}
                    className="bg-indigo-600 text-white px-4 rounded-r-lg hover:bg-indigo-700"
                    aria-label="Add goal"
                >
                    Add
                </button>
            </div>
            <div className="space-y-4">
                {goals.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-4">
                        <div className="w-2/3 text-gray-700 dark:text-gray-200">{goal.description}</div>
                        <div className="w-1/3">
                            <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                                <div
                                    className="bg-green-600 h-4 rounded-full"
                                    style={{ width: `${goal.progress}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{goal.progress}%</span>
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recommended Resources</h2>
            <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                aria-label="Search resources"
            />
            <ul className="space-y-2 max-h-80 overflow-y-auto">
                {filteredResources.length > 0 ? (
                    filteredResources.map((resource) => (
                        <li
                            key={resource.id}
                            className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                        >
                            <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:underline font-medium"
                            >
                                {resource.title}
                            </a>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{resource.description}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-300">No resources available.</p>
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
                backgroundColor: 'rgba(99, 102, 241, 0.6)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Course Performance' },
        },
        scales: {
            y: { beginAtZero: true, max: 100 },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Performance Overview</h2>
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Notifications</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
            {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                    <li
                        key={notification.id}
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    >
                        <span className="text-gray-700 dark:text-gray-200">{notification.message}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">{notification.date}</span>
                    </li>
                ))
            ) : (
                <p className="text-gray-600 dark:text-gray-300">No notifications.</p>
            )}
        </ul>
        <Link
            to="/notifications"
            className="block text-center mt-4 text-indigo-600 hover:underline"
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Study Timer</h2>
            <div className="text-4xl font-mono text-indigo-600 mb-4">{formatTime()}</div>
            <div className="flex gap-2">
                <button
                    onClick={() => setIsActive(!isActive)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    aria-label={isActive ? 'Pause timer' : 'Start timer'}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={() => {
                        setTime(25 * 60);
                        setIsActive(false);
                    }}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    aria-label="Reset timer"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

const MotivationalQuote = ({ quote }) => (
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-6 rounded-lg shadow-md text-center">
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Progress Overview</h2>
            <div className="flex items-center space-x-4">
                <div className="w-1/2">
                    <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-6">
                        <div
                            className="bg-indigo-600 h-6 rounded-full"
                            style={{ width: `${averageProgress}%` }}
                        ></div>
                    </div>
                </div>
                <div className="w-1/2 text-center">
                    <p className="text-2xl font-semibold text-indigo-600">{averageProgress.toFixed(1)}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Overall Progress</p>
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

const Dashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
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
    const [notifications, setNotifications] = useState([]);
    const [quote, setQuote] = useState({ text: '', author: '' });

    useEffect(() => {
        // Simulate API fetch
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
            setNotifications([
                { id: 1, message: 'New quiz available in Mathematics', date: '2025-05-20' },
                { id: 2, message: 'Assignment due in Physics', date: '2025-05-21' },
                { id: 3, message: 'Study group meeting scheduled', date: '2025-05-19' },
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
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
            <Sidebar
                user={user}
                onLogout={handleLogout}
                isSidebarVisible={isSidebarVisible}
                setIsSidebarVisible={setIsSidebarVisible}
            />
            <div
                className={`p-8 w-full transition-all duration-300 ${
                    isSidebarVisible ? 'md:ml-64 md:ml-16' : 'ml-0 md:ml-16'
                } ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}
            >
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                            className="md:hidden px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
                            aria-label={isSidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
                        >
                            ☰
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
                            <p className="text-sm mt-1">Ready to conquer your studies today?</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
                            aria-label={`View notifications (${notifications.length} new)`}
                        >
                            🔔
                            {notifications.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                        <Link
                            to="/subjects"
                            className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-100"
                        >
                            Start Studying
                        </Link>
                    </div>
                </div>

                {/* Stats and Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-4 gap-6">
                        <StatsCard title="Performance" value={stats.performance} icon="📊" />
                        <StatsCard title="Attendance" value={stats.attendance} icon="✅" />
                        <StatsCard title="Achievements" value={stats.achievements} icon="🏆" />
                        <StatsCard title="Tasks Completed" value={stats.completedTasks} icon="✔️" color="text-green-600" />
                    </div>
                    <div className="md:col-span-4">
                        <ProgressOverview courses={courses} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <CourseMastery courses={courses} />
                    <Schedule schedule={schedule} />
                    <PerformanceChart courses={courses} />
                </div>

                {/* Secondary Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <RecentActivity activities={activities} />
                    <UpcomingDeadlines deadlines={deadlines} />
                </div>

                {/* Additional Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <GoalTracker goals={goals} setGoals={setGoals} />
                    <RecommendedResources resources={resources} />
                    <NotificationsWidget notifications={notifications} />
                </div>

                {/* Study Tools and Motivation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <StudyTimer />
                    <MotivationalQuote quote={quote} />
                </div>

                {/* Quick Links */}
                <div className="mt-6">
                    <QuickLinks />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;