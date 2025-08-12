import React, { useState } from 'react';
import { askDeepSeek } from '../services/deepSeekService';

function ChatComponent() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const aiResponse = await askDeepSeek(input);
            setResponse(aiResponse);
        } catch (error) {
            setResponse('Failed to get AI response. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask DeepSeek..."
                />
                <button type="submit">Ask</button>
            </form>
            {response && <div className="response">{response}</div>}
        </div>
    );
}

export default ChatComponent;