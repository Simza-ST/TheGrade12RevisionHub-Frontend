import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path as needed
import PropTypes from 'prop-types';

// Mock data for development
const mockQuizzes = [
    {
        id: '1',
        title: 'Algebra Basics',
        subject: 'Mathematics',
        dueDate: '2025-05-25T23:59:00Z',
    },
    {
        id: '2',
        title: 'World War II Quiz',
        subject: 'History',
        dueDate: '2025-05-22T23:59:00Z',
    },
    {
        id: '3',
        title: 'Chemical Reactions',
        subject: 'Chemistry',
        dueDate: '2025-05-20T23:59:00Z',
    },
];

const Quizzes = () => {
    const navigate = useNavigate();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrder, setSortOrder] = useState('asc');
    const [user] = useState({
        name: 'Bianca Doe',
        title: 'CS Honor Student',
        profilePicture: null,
    });

    useEffect(() => {
        // Simulate fetch with mock data
        setTimeout(() => {
            try {
                setQuizzes(mockQuizzes);
                setError(null);
            } catch (error) {
                console.error('Error setting mock quizzes:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }, 1000); // Simulate API delay
    }, []);

    // Filter and sort quizzes
    const filteredQuizzes = useMemo(() => {
        let result = [...quizzes];

        // Search filter
        if (searchTerm) {
            result = result.filter(
                (quiz) =>
                    quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    quiz.subject.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        result.sort((a, b) => {
            const key = sortBy;
            const order = sortOrder === 'asc' ? 1 : -1;
            if (key === 'dueDate') {
                return (new Date(a[key]) - new Date(b[key])) * order;
            }
            return a[key].localeCompare(b[key]) * order;
        });

        return result;
    }, [quizzes, searchTerm, sortBy, sortOrder]);

    // Get quiz status
    const getQuizStatus = (dueDate) => {
        const now = new Date();
        const due = new Date(dueDate);
        const diffHours = (due - now) / (1000 * 60 * 60);
        if (diffHours < 0) return { text: 'Expired', color: 'text-red-500' };
        if (diffHours <= 24) return { text: 'Due Soon', color: 'text-yellow-500' };
        return { text: 'Active', color: 'text-green-500' };
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar user={user} onLogout={handleLogout} />
            <div className="flex-1 p-6 sm:p-8 transition-all duration-300 ml-64 sm:ml-64 lg:ml-64 xl:ml-64">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Quizzes Dashboard</h1>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-gray-700">Available Quizzes</h2>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Search by title or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                            />
                            <div className="flex gap-2">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="title">Sort by Title</option>
                                    <option value="subject">Sort by Subject</option>
                                    <option value="dueDate">Sort by Due Date</option>
                                </select>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                >
                                    {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {loading && (
                        <div className="flex justify-center items-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                            <p>Error: {error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredQuizzes.length > 0 ? (
                                filteredQuizzes.map((quiz) => {
                                    const status = getQuizStatus(quiz.dueDate);
                                    return (
                                        <div
                                            key={quiz.id}
                                            className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition"
                                        >
                                            <h3 className="font-semibold text-lg text-gray-800">{quiz.title}</h3>
                                            <p className="text-gray-600">{quiz.subject}</p>
                                            <p className="text-sm text-gray-500">
                                                Due: {new Date(quiz.dueDate).toLocaleDateString()}
                                            </p>
                                            <p className={`text-sm font-medium ${status.color}`}>
                                                Status: {status.text}
                                            </p>
                                            <button
                                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                                onClick={() => alert(`Starting quiz: ${quiz.title}`)}
                                            >
                                                Start Quiz
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-600 col-span-full">No quizzes match your criteria.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Quizzes.propTypes = {
    quizzes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            subject: PropTypes.string.isRequired,
            dueDate: PropTypes.string.isRequired,
        })
    ),
};

export default Quizzes;