import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'; // Check the actual API URL
const API_KEY = 'your-api-key'; // Replace with your DeepSeek API key

export const askDeepSeek = async (userMessage) => {
    try {
        const response = await axios.post(
            DEEPSEEK_API_URL,
            {
                model: 'deepseek-chat', // Verify the correct model name
                messages: [{ role: 'user', content: userMessage }],
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content; // Adjust based on API response
    } catch (error) {
        console.error('DeepSeek API error:', error);
        throw error; // Re-throw for handling in components
    }
};