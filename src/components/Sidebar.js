// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Subjects', path: '/subjects' },
        { name: 'Quizzes', path: '/quizzes' },
        { name: 'Question Papers', path: '/questionpapers' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Performance', path: '/performance' },
        { name: 'Notifications', path: '/notifications' },
        { name: 'Chatroom', path: '/chatroom' },
        { name: 'Settings', path: '/settings' },
    ];

    return (
        <nav className="w-64 h-screen bg-indigo-800 text-white flex flex-col p-4 fixed">
            <div className="text-2xl font-bold mb-8">RevisionHub</div>
            <ul className="space-y-2">
                {navItems.map((item) => (
                    <li key={item.name}>
                        <Link
                            to={item.path}
                            className="block py-2 px-4 rounded hover:bg-indigo-600"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;