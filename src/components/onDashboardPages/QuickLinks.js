import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks = () => (
    <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Quick Links</h2>
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
                    className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--text-primary)] px-4 py-2 rounded-lg hover:from-[var(--hover-primary)] hover:to-[var(--hover-secondary)] text-center transition"
                >
                    {link.label}
                </Link>
            ))}
        </div>
    </div>
);

export default QuickLinks;