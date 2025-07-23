import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types';
import AdminSidebar from './common/AdminSidebar';
import AdminHeader from './common/AdminHeader';

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

// Mock data for fallback
const defaultData = {
    studentCount: 200,
    quizCount: 50,
};

// StatsCards Component
const StatsCards = ({ data, loading, error }) => {
    if (loading) return <div className="text-center text-[var(--text-normal)] mt-24">Loading stats...</div>;
    if (error) return <div className="text-center text-red-600 mt-24">{error}</div>;

    return (
        <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {[
                { title: 'Number of Students', value: data.studentCount, icon: '👨‍🎓', color: 'text-[var(--accent-primary)]' },
                { title: 'Number of Quizzes', value: data.quizCount, icon: '📑', color: 'text-[var(--accent-primary)]' },
            ].map((card, index) => (
                <div
                    key={index}
                    className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center space-x-4 hover:shadow-lg transition-shadow"
                >
                    <div className={`text-3xl ${card.color}`}>{card.icon}</div>
                    <div>
                        <h3 className="text-lg font-semibold text-[var(--text-normal)]">{card.title}</h3>
                        <p className={`text-2xl ${card.color}`}>{card.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

StatsCards.propTypes = {
    data: PropTypes.shape({
        studentCount: PropTypes.number,
        quizCount: PropTypes.number,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

// SearchSection Component
const SearchSection = ({ onSearch }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = useCallback(
        (...args) => {
            let timeoutId;
            return () => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(async () => {
                    const [email] = args;
                    setLoading(true);
                    setError('');
                    try {
                        if (onSearch) {
                            const results = await onSearch({ email, role: 'student' });
                            setSearchResults(Array.isArray(results) ? results : results ? [results] : []);
                            if (!results || (Array.isArray(results) && results.length === 0)) {
                                setError('No users found');
                            }
                        } else {
                            const response = await fetch(`${API_BASE_URL}/search?email=${encodeURIComponent(email)}`, {
                                headers: {
                                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                                    'Content-Type': 'application/json',
                                },
                            });
                            if (!response.ok) {
                                const errorText = await response.text();
                                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText || 'Unknown error'}`);
                            }
                            const user = await response.json();
                            setSearchResults(user ? [user] : []);
                            if (!user) {
                                setError('No users found');
                            }
                        }
                    } catch (err) {
                        setError(`Search failed: ${err.message}`);
                        console.error('Search error:', err);
                    } finally {
                        setLoading(false);
                    }
                }, 500);
            };
        },
        [onSearch]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            handleSearch(email)();
        }
    };

    return (
        <div className="search-section bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6">
            <form onSubmit={handleSubmit} className="search-container flex gap-2 items-center">
                <input
                    type="text"
                    name="email"
                    placeholder="Search by email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 p-3 text-base border-2 border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                />
                <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="p-3 text-base border-2 border-[var(--border)] rounded-lg bg-[var(--bg-primary)] text-[var(--text-normal)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                >
                    <option value="student">Student</option>
                </select>
                <button type="submit" className="sub-button bg-[var(--accent-primary)] text-[var(--text-primary)] p-2 rounded-lg hover:bg-[var(--hover-primary)] transition-all">
                    Search
                </button>
            </form>
            {loading && (
                <div className="loading absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--accent-primary)] bg-transparent">Loading...</div>
            )}
            {error && <p className="text-red-600 mt-4">{error}</p>}
            {searchResults.length > 0 && (
                <div className="search-results bg-[var(--bg-primary)] rounded-lg shadow-lg mt-5 overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">No.</th>
                            <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">First Name</th>
                            <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Last Name</th>
                            <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">ID</th>
                            <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Email</th>
                            <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Role</th>
                            <th className="p-3 bg-[var(--accent-primary)] text-[var(--text-primary)] font-bold">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((user, index) => (
                            <tr key={user.id} className="hover:bg-[var(--bg-tertiary)] transition-colors">
                                <td className="p-3 bg-[var(--bg-primary)] text-[var(--text-normal)]">{index + 1}</td>
                                <td className="p-3 bg-[var(--bg-primary)] text-[var(--text-normal)]">{user.firstName || 'N/A'}</td>
                                <td className="p-3 bg-[var(--bg-primary)] text-[var(--text-normal)]">{user.lastName || 'N/A'}</td>
                                <td className="p-3 bg-[var(--bg-primary)] text-[var(--text-normal)]">{user.id}</td>
                                <td className="p-3 bg-[var(--bg-primary)] text-[var(--text-normal)]">{user.email}</td>
                                <td className="p-3 bg-[var(--bg-primary)] text-[var(--text-normal)]">{user.role || 'student'}</td>
                                <td className="p-3 bg-[var(--bg-primary)] text-[var(--text-normal)]">{user.isValid ? 'Approved' : 'Pending'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

SearchSection.propTypes = {
    onSearch: PropTypes.func,
};

// GraphTable Component
const GraphTable = ({ data, loading, error }) => {
    useEffect(() => {
        if (loading || error || !data) return;

        const ctx = document.getElementById('adminStatsChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Students', 'Quizzes'],
                datasets: [
                    {
                        label: 'Admin Statistics',
                        data: [data.studentCount, data.quizCount],
                        backgroundColor: ['var(--accent-primary)', 'var(--accent-secondary)'],
                        borderColor: ['var(--accent-primary)', 'var(--accent-secondary)'],
                        borderWidth: 1,
                        barThickness: 100,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { labels: { color: 'var(--text-normal)' } },
                    title: { display: true, text: 'System Statistics', color: 'var(--text-normal)' },
                },
                scales: {
                    x: { ticks: { color: 'var(--text-normal)' } },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'var(--text-normal)',
                            stepSize: 1,
                            callback: function (value) {
                                return Number.isInteger(value) ? value : null;
                            },
                        },
                    },
                },
            },
        });

        return () => chart.destroy();
    }, [data, loading, error]);

    if (loading) return <div className="text-center text-[var(--text-normal)] mt-5">Loading chart...</div>;
    if (error) return <div className="text-center text-red-600 mt-5">{error}</div>;

    return (
        <div className="graph-table bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl mb-6">
            <h3 className="text-xl font-semibold mb-4 text-[var(--text-normal)]">System Statistics</h3>
            <canvas id="adminStatsChart" width="400" height="200"></canvas>
        </div>
    );
};

GraphTable.propTypes = {
    data: PropTypes.shape({
        studentCount: PropTypes.number,
        quizCount: PropTypes.number,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

// Main AdminDashboard Component
const AdminDashboard = ({ data: propData, onSearch, user, notifications, setNotifications }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(sessionStorage.getItem('theme') === 'dark');
    const [data, setData] = useState(propData || defaultData);
    const [loading, setLoading] = useState({ stats: false });
    const [error, setError] = useState({ stats: '' });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading((prev) => ({ ...prev, stats: true }));
                // Fetch student stats
                const statsResponse = await fetch(`${API_BASE_URL}/stats`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!statsResponse.ok) {
                    const errorText = await statsResponse.text();
                    throw new Error(`Student stats error! status: ${statsResponse.status}, message: ${errorText || 'Unknown error'}`);
                }
                const statsData = await statsResponse.json();
                console.log('Stats response:', statsData);

                // Fetch quiz count
                const quizResponse = await fetch(`${API_BASE_URL}/quizzes/count`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!quizResponse.ok) {
                    const errorText = await quizResponse.text();
                    throw new Error(`Quiz count error! status: ${quizResponse.status}, message: ${errorText || 'Unknown error'}`);
                }
                const quizData = await quizResponse.json();
                console.log('Quiz count response:', quizData);

                setData((prev) => ({
                    ...prev,
                    studentCount: statsData.studentCount || 0,
                    quizCount: quizData.quizCount || 0,
                }));
            } catch (err) {
                setError({ stats: `Failed to fetch stats: ${err.message}` });
                console.error('Fetch error:', err);
            } finally {
                setLoading({ stats: false });
            }
        };

        if (!propData) {
            fetchData();
        }
    }, [propData]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        window.location.href = '/login';
    };

    return (
        <div className="flex min-h-screen">
            <AdminSidebar
                user={user}
                onLogout={handleLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={isDarkMode}
            />
            <div className="flex-1">
                <AdminHeader
                    user={user}
                    notifications={notifications}
                    isCollapsed={isCollapsed}
                    darkMode={isDarkMode}
                    setDarkMode={setIsDarkMode}
                    tabDescription="Admin Dashboard"
                    userMessage="Welcome to Administrator Side"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <StatsCards data={data} loading={loading.stats} error={error.stats} />
                    <SearchSection onSearch={onSearch} />
                    <GraphTable data={data} loading={loading.stats} error={error.stats} />
                </div>
            </div>
        </div>
    );
};

AdminDashboard.propTypes = {
    data: PropTypes.shape({
        studentCount: PropTypes.number,
        quizCount: PropTypes.number,
    }),
    onSearch: PropTypes.func,
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    setNotifications: PropTypes.func.isRequired,
};

export default AdminDashboard;