import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Sidebar from '../../common/Sidebar';
import Header from "../../common/Header";
import PerformanceTable from './performanceTable';
import SummaryTable from './SummaryTable';
import BarChart from './BarChart';
import Notes from './Notes';
import './PerformanceCSS.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Performance = ({ user, setNotifications, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        const mockCourses = [
            { name: 'Advance Calculus', progress: 86, grade: 'A' },
            { name: 'Physical Sciences', progress: 80, grade: 'B+' },
            { name: 'Mathematics', progress: 85, grade: 'A-' },
            { name: 'History', progress: 78, grade: 'B' },
            { name: 'Chemistry', progress: 92, grade: 'A+' },
        ];

        setTimeout(() => {
            try {
                setCourses(mockCourses);
                setLoading(false);
            } catch (error) {
                console.error('Error setting mock courses:', error);
            }
        }, 1000);
    }, [darkMode]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const chartData = {
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

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top', labels: { color: 'var(--text-primary)' } },
            title: { display: true, text: 'Course Performance', color: 'var(--text-primary)' },
        },
        scales: {
            x: { ticks: { color: 'var(--text-primary)' } },
            y: { beginAtZero: true, max: 100, ticks: { color: 'var(--text-primary)' } },
        },
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
                    tabDescription="Performance"
                    userMessage="Track your progress"
                />
                <div
                    className={`
            flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
            ${isCollapsed ? 'ml-16' : 'ml-64'}
          `}
                >
                    <div className="performance-dashboard bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
                        <h1 className="text-2xl font-bold mb-4">Performance Dashboard</h1>
                        <p className="mb-6 text-[var(--text-secondary)]">
                            This dashboard tracks learner performance across multiple subjects and activities, including time spent and
                            difficulty level, for comparison.
                        </p>

                        <h2 className="text-xl font-semibold mb-4">Performance Data</h2>
                        <PerformanceTable />

                        <h2 className="text-xl font-semibold mb-4 mt-6">Summary of Learners per Subject</h2>
                        <SummaryTable />

                        <h2 className="text-xl font-semibold mb-4 mt-6">Average Scores by Learner and Subject</h2>
                        <BarChart />

                        <Notes />
                    </div>
                </div>
            </div>
        </div>
    );
};

Performance.propTypes = {
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

export default Performance;