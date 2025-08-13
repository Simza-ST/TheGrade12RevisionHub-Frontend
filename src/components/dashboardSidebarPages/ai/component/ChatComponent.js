import React, { useState } from 'react';
import { askDeepSeek } from '../services/deepSeekService';

const ChatComponent = () => {
    const [input, setInput] = useState('');
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        setError('');

        try {
            const aiReply = await askDeepSeek(input);
            setReply(aiReply);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <h2>Chat with DeepSeek AI</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            {reply && (
                <div className="ai-reply">
                    <strong>AI:</strong> {reply}
                </div>
            )}
        </div>
    );
};

export default ChatComponent;