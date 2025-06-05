import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

const Chatroom = ({ isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        const mockMessages = [
            { id: 1, user: 'John Doe', text: 'Anyone studying for the Math quiz?', timestamp: '2025-05-20 10:00' },
            { id: 2, user: 'Jane Smith', text: 'Yes, I’m reviewing calculus now!', timestamp: '2025-05-20 10:05' },
        ];

        setTimeout(() => {
            try {
                setMessages(mockMessages);
                setLoading(false);
            } catch (error) {
                console.error('Error setting mock messages:', error);
            }
        }, 1000);
    }, [darkMode]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    user: user.name,
                    text: newMessage,
                    timestamp: new Date().toLocaleString(),
                },
            ]);
            setNewMessage('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex min-h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    const notificationCount = notifications.filter((n) => !n.read).length;

    return (
        <div className="flex min-h-screen">
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
                <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[var(--text-primary)]">Chatroom</h1>
                        <p className="text-sm mt-1 text-[var(--text-secondary)]">Connect with peers, {user.name}!</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/notifications"
                            className="relative px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            aria-label={`View notifications (${notificationCount} unread)`}
                        >
                            🔔
                            {notificationCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[var(--accent-secondary)] text-[var(--text-primary)] text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {notificationCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                        </button>
                    </div>
                </div>
                <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
                    <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Study Group Chat</h2>
                    <div className="max-h-96 overflow-y-auto mb-4">
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <div key={message.id} className="p-2 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                                    <span className="font-medium text-[var(--text-primary)]">{message.user}: </span>
                                    <span className="text-[var(--text-secondary)]">{message.text}</span>
                                    <span className="text-sm text-[var(--text-secondary)] block">{message.timestamp}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-[var(--text-secondary)]">No messages yet.</p>
                        )}
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-3 border border-[var(--border)] rounded-l-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                            aria-label="Type a message"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
                            aria-label="Send message"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Chatroom.propTypes = {
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

export default Chatroom;