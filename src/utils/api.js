// Defining the base URL for API requests
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/user';

// Retrieving authentication headers with JWT token
export const getAuthHeaders = () => {
    const token = localStorage.getItem('jwt');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};