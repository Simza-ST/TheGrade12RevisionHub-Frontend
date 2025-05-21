import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed

const Resources = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Mock data for UI development
        const mockResources = [
            { id: 1, title: 'React Documentation', url: 'https://reactjs.org', description: 'Official React documentation' },
            { id: 2, title: 'Tailwind CSS', url: 'https://tailwindcss.com', description: 'Utility-first CSS framework' },
            { id: 3, title: 'MDN Web Docs', url: 'https://developer.mozilla.org', description: 'Web development resources' },
        ];

        // Simulate API delay
        setTimeout(() => {
            try {
                setResources(mockResources);
                setError(null);
            } catch (error) {
                console.error('Error setting mock resources:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }, 1000); // 1-second delay to mimic API call
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="p-8 w-full transition-all duration-300 ml-64 sm:ml-64 lg:ml-64 xl:ml-64">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Resources</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Available Resources</h2>
                    {loading ? (
                        <p className="text-gray-500">Loading resources...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : resources.length > 0 ? (
                        <ul className="space-y-4">
                            {resources.map((resource) => (
                                <li
                                    key={resource.id}
                                    className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition"
                                >
                                    <a
                                        href={resource.url}
                                        className="text-blue-600 hover:underline font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {resource.title}
                                    </a>
                                    <p className="text-gray-600 mt-1">{resource.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No resources available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Resources;