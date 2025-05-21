import React, { useState, useEffect } from 'react';
import Sidebar from "./Sidebar"; // Adjust path as needed

const Chatroom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch('/api/chatroom', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setMessages(data);
                }
            } catch (error) {
                console.error('Error fetching chat messages:', error);
            }
        };
        fetchMessages();
    }, []);

    const handleSendMessage = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch('/api/chatroom', {
                method: 'POST',
                headers,
                body: JSON.stringify({ message: newMessage }),
            });
            if (response.ok) {
                const newMsg = await response.json();
                setMessages([...messages, newMsg]);
                setNewMessage('');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="ml-64 p-8 w-full">
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