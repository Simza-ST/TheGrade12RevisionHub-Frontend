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
    }, []);

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
                        <h1 className="text-3xl font-bold">Chatroom</h1>
                        <p className="text-sm mt-1 text-gray-300">Connect with peers, {user.name}!</p>
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
                    <h2 className="text-xl font-semibold mb-4 text-white">Study Group Chat</h2>
                    <div className="max-h-96 overflow-y-auto mb-4">
                        {messages.length > 0 ? (
                            messages.map((message) => (
                                <div key={message.id} className="p-2 border-b border-gray-600 bg-teal-700">
                                    <span className="font-medium text-white">{message.user}: </span>
                                    <span className="text-gray-300">{message.text}</span>
                                    <span className="text-sm text-gray-300 block">{message.timestamp}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-300">No messages yet.</p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
                            aria-label="Type a message"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
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