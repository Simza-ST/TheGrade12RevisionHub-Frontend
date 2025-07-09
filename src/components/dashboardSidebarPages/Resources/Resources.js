import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from "../../common/Header";

const Resources = ({ user, setNotifications, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
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
    }, [darkMode]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
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
                    tabDescription="Resources"
                    userMessage="Find study materials"
                />
            <div
                className={`
          flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300
          ${isCollapsed ? 'ml-16' : 'ml-64'}
        `}
            >
                <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
                    <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Study Resources</h2>
                    <ul className="space-y-4">
                        {resources.length > 0 ? (
                            resources.map((resource) => (
                                <li key={resource.id} className="p-4 bg-[var(--bg-secondary)] rounded">
                                    <a
                                        href={resource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[var(--accent-primary)] hover:underline font-medium"
                                    >
                                        {resource.title}
                                    </a>
                                    <p className="text-sm text-[var(--text-secondary)]">
                                        {resource.description} (Subject: {resource.subject})
                                    </p>
                                </li>
                            ))
                        ) : (
                            <p className="text-[var(--text-secondary)]">No resources available.</p>
                        )}
                    </ul>
                </div>
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