// Defining the base URL for API requests
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

// Retrieving authentication headers with JWT token
export const getAuthHeaders = () => {
    const token = sessionStorage.getItem('jwt');
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};