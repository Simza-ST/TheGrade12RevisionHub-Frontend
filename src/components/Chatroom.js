import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const Chatroom = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockMessages = [
            { id: 1, message: 'Hey, anyone studied for the Math quiz?', sender: 'John', date: '2025-05-20T10:00:00Z' },
            { id: 2, message: 'Yes, I have some notes to share!', sender: 'Jane', date: '2025-05-20T10:05:00Z' },
        ];

        setTimeout(() => {
            try {
                setMessages(mockMessages);
            } catch (error) {
                console.error('Error setting mock messages:', error);
            }
        }, 1000); // Simulate API delay
    }, []);

    const handleSendMessage = () => {
        const newMsg = {
            id: messages.length + 1,
            message: newMessage,
            sender: user.name,
            date: new Date().toISOString(),
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="p-8 w-full transition-all duration-300 ml-64 sm:ml-64 lg:ml-64 xl:ml-64">
                <h1 className="text-3xl font-bold mb-6">Chatroom</h1>
                <div className="bg-white p-6 rounded-lg shadow-md h-[calc(100vh-12rem)] flex flex-col">
                    <h2 className="text-xl font-semibold mb-4">Messages</h2>
                    <div className="flex-1 overflow-y-auto space-y-2">
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className="p-2 bg-gray-100 rounded flex justify-between"
                                >
                                    <span>{msg.message}</span>
                                    <span className="text-sm text-gray-500">{msg.sender}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No messages yet.</p>
                        )}
                    </div>
                    <div className="mt-4 flex">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="flex-1 p-2 rounded-l border border-gray-300"
                            placeholder="Type a message..."
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-indigo-600 text-white px-4 rounded-r"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatroom;