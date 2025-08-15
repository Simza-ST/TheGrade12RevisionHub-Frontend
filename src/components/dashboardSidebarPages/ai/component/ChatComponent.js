import React, { useState, useRef, useEffect } from 'react';
import { askDeepSeek } from '../services/deepSeekService';
import './ChatComponent.css';

const ChatComponent = () => {
    const [input, setInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [conversation]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = input.trim();
        if (!message || isLoading) return;

        setInput('');
        setError('');
        setIsLoading(true);

        // Add user message
        setConversation(prev => [
            ...prev,
            { role: 'user', content: message },
            { role: 'ai', content: '', isLoading: true }
        ]);

        try {
            const aiReply = await askDeepSeek(message);

            // Update with AI response
            setConversation(prev => prev.map((item, index) =>
                index === prev.length - 1
                    ? { ...item, content: aiReply, isLoading: false }
                    : item
            ));
        } catch (err) {
            setError(err.message);
            // Remove loading indicator
            setConversation(prev => prev.slice(0, -1));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>AI Assistant</h2>
                <div className="ai-label">Powered by DeepSeek-R1</div>
            </div>

            <div className="conversation">
                {conversation.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <div className="message-header">
                            {msg.role === 'user' ? 'You' : 'AI Assistant'}
                        </div>
                        <div className="message-content">
                            {msg.isLoading ? (
                                <div className="loading-dots">
                                    <div></div><div></div><div></div>
                                </div>
                            ) : (
                                msg.content
                            )}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything about your revisions..."
                    disabled={isLoading}
                    autoFocus
                />
                <button type="submit" disabled={isLoading || !input.trim()}>
                    {isLoading ? (
                        <span className="spinner"></span>
                    ) : (
                        'Send'
                    )}
                </button>
            </form>
        </div>
    );
};

export default ChatComponent;