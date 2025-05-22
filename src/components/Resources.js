import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const Resources = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        const mockResources = [
            {
                id: 1,
                title: 'Khan Academy Calculus',
                url: 'https://khanacademy.org',
                description: 'Interactive calculus lessons',
                subject: 'Mathematics',
            },
            {
                id: 2,
                title: 'Crash Course Chemistry',
                url: 'https://youtube.com',
                description: 'Video series on chemistry concepts',
                subject: 'Chemistry',
            },
            {
                id: 3,
                title: 'History.com',
                url: 'https://history.com',
                description: 'Articles on historical events',
                subject: 'History',
            },
        ];

        setTimeout(() => {
            try {
                setResources(mockResources);
                setLoading(false);
            } catch (error) {
                console.error('Error setting mock resources:', error);
            }
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
                darkMode={darkMode}
            />
            <div
                className={`
                    flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
                    ${isCollapsed ? 'ml-16' : 'ml-64'}
                `}
            >
                <div className="bg-gradient-to-r from-teal-600 to-red-600 text-white p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">Resources</h1>
                        <p className="text-sm mt-1 text-gray-300">Find study materials, {user.name}!</p>
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
                <div className={`bg-teal-${darkMode ? '900' : '800'} bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl`}>
                    <h2 className="text-xl font-semibold mb-4 text-white">Study Resources</h2>
                    <ul className="space-y-4">
                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <li key={resource.id} className="p-4 bg-teal-700 rounded">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-teal-400 hover:underline font-medium"
                                    >
                                        {resource.title}
                                    </a>
                                    <p className="text-sm text-gray-300">
                                        {resource.description} (Subject: {resource.subject})
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p className="text-gray-300">No resources available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

Resources.propTypes = {
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

export default Resources;