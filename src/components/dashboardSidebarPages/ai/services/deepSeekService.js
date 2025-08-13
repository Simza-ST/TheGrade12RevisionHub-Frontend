import axios from 'axios';
import {API_BASE_URL} from "../../../../utils/api";

//const API_BASE_URL = 'http://localhost:6262/api'; // Your Spring Boot endpoint

// Get the JWT token (adjust based on your auth setup)
const getAuthToken = () => {
    return sessionStorage.getItem('jwt'); // Or from context/Redux
};

// Call DeepSeek AI via your backend
export const askDeepSeek = async (message) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/ai/chat`,
            { message }, // Request body
            {
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`, // Attach JWT
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.reply; // Extract AI response
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch AI response');
    }
};