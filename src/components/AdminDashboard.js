import React, { useState, useEffect, useCallback } from 'react';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types';

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/admin';

// Mock data for fallback
const defaultData = {
    studentCount: 200,
    quizCount: 50, // Mock quiz count
};

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
        // { icon: 'bx-home', text: 'Home🏡', href: '#' },
        // { icon: 'bx-task', text: 'List of students👨‍🎓', href: '/Students' },
        // { icon: 'bx-file', text: 'Upload Documents📚', href: '/upload-documents' },
        // { icon: 'bx-plus', text: 'Create Quiz📑', href: '/quiz-creation' },
        // { icon: 'bx-plus', text: 'Create Certificate📜', href: '/cert-creation' },
        // { icon: 'bx-mail-send', text: 'Send Email📩', href: '/chat' },
        // { icon: 'bx-log-out', text: 'Logout', href: '/login' },
    ];

    return (
        <nav
            className={`sidebar fixed top-0 left-0 h-full w-64 p-5 pt-20 z-50 bg-gray-800 shadow-lg ${!isOpen ? 'close' : ''}`}
            style={{ left: '-300px' }}
            onMouseEnter={() => toggleSidebar(true)}
            onMouseLeave={() => toggleSidebar(false)}
        >
            <div className="menu_content bg-transparent">
                <ul className="menu_items list-none">
                    {navItems.map((item, index) => (
                        <li key={index} className="item">
                            <a
                                href={item.href}
                                className="nav_link flex items-center p-3 rounded-lg text-gray-300 hover:bg-indigo-600 hover:text-white transition-all"
                            >
                                <span className={`navlink_icon text-2xl w-12 text-center`}>
                                    <i className={`bx ${item.icon}`}></i>
                                </span>
                                <h4 className="navlink">{item.text}</h4>
                            </a>
                        </li>
                    ))}
                </ul>
                {/*<div className="bottom-content fixed bottom-8 left-5 w-56 bg-transparent">*/}
                {/*    <div*/}
                {/*        className={`bottom expand_sidebar flex items-center justify-center p-3 text-gray-400 rounded-md cursor-pointer hover:bg-indigo-600 hover:text-white ${isOpen ? 'hidden' : 'flex'}`}*/}
                {/*        onClick={() => toggleSidebar(true)}*/}
                {/*    >*/}
                {/*        <h4>Expand</h4>*/}
                {/*        <i className="bx bx-log-in ml-2"></i>*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*        className={`bottom collapse_sidebar flex items-center justify-center p-3 text-gray-400 rounded-md cursor-pointer hover:bg-indigo-600 hover:text-white ${isOpen ? 'flex' : 'hidden'}`}*/}
                {/*        onClick={() => toggleSidebar(false)}*/}
                {/*    >*/}
                {/*        <h4>Collapse</h4>*/}
                {/*        <i className="bx bx-log-out ml-2"></i>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </nav>
    );
};

// Topbar Component
const Topbar = () => {
    const menuItems = [

        { icon: 'bx-task', text: 'List of students👨‍🎓', href: '/Students' },
        { icon: 'bx-file', text: 'Upload Documents📚', href: '/upload-documents' },
        { icon: 'bx-plus', text: 'Create Quiz📑', href: '/quiz-creation' },
        { icon: 'bx-plus', text: 'Create Certificate📜', href: '/cert-creation' },
        { icon: 'bx-mail-send', text: 'Send Email📩', href: '/chat' },
        {text: 'View Quizzes📓', href: '/quiz-viewer'},
        { icon: 'bx-log-out', text: 'Logout', href: '/login' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-gray-900 flex items-center justify-between px-6 text-white text-xl font-semibold shadow-md z-50">
            <div className="text-2xl">ADMIN PORTAL</div>
            <ul className="flex gap-5 list-none">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.href}
                            className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition-colors"
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </header>
    );
};
// StatsCards Component
const StatsCards = ({ data, loading, error }) => {
    if (loading) return <div className="text-center text-white mt-24">Loading stats...</div>;
    if (error) return <div className="text-center text-red-600 mt-24">{error}</div>;

    return (
        <div className="stats-cards w-4/5 mx-auto mt-24 flex flex-wrap gap-5 justify-around bg-transparent">
            {[
                { title: 'Number of Students', value: data.studentCount },
                { title: 'Number of Quizzes', value: data.quizCount },
            ].map((card, index) => (
                <div
                    key={index}
                    className="card rounded-xl border-2 border-white shadow-lg p-5 flex-1 max-w-xs text-center text-white bg-transparent"
                >
                    <h3 className="mb-2">{card.title}</h3>
                    <b>
                        <p>{card.value}</p>
                    </b>
                </div>
            ))}
        </div>
    );
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
        <div className="search-section border-2 border-white shadow-lg w-11/12 max-w-5xl mx-auto mt-16 p-5 rounded-lg bg-transparent">
            <form onSubmit={handleSubmit} className="search-container flex gap-2 items-center">
                <input
                    type="text"
                    name="email"
                    placeholder="Search by email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 p-3 text-base border-2 border-gray-300 rounded-lg bg-gradient-to-br from-white to-gray-200 text-gray-900 focus:border-indigo-600 focus:shadow-lg outline-none"
                />
                <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="p-3 text-base border-2 border-gray-300 rounded-lg bg-gradient-to-br from-white to-gray-200 text-gray-900 focus:border-indigo-600 focus:shadow-lg outline-none"
                >
                    <option value="student">Student</option>
                </select>
                <button type="submit" className="sub-button bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-all">
                    Search
                </button>
            </form>
            {loading && (
                <div className="loading absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 bg-transparent">Loading...</div>
            )}
            {error && <p className="text-red-600 mt-4">{error}</p>}
            {searchResults.length > 0 && (
                <div className="search-results bg-white rounded-lg shadow-lg mt-5 overflow-hidden">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="p-3 bg-blue-600 text-white font-bold">No.</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">First Name</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Last Name</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">ID</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Email</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Role</th>
                            <th className="p-3 bg-blue-600 text-white font-bold">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {searchResults.map((user, index) => (
                            <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                                <td className="p-3 bg-gray-50 text-black">{index + 1}</td>
                                <td className="p-3 bg-gray-50 text-black">{user.firstName || 'N/A'}</td>
                                <td className="p-3 bg-gray-50 text-black">{user.lastName || 'N/A'}</td>
                                <td className="p-3 bg-gray-50 text-black">{user.id}</td>
                                <td className="p-3 bg-gray-50 text-black">{user.email}</td>
                                <td className="p-3 bg-gray-50 text-black">{user.role || 'student'}</td>
                                <td className="p-3 bg-gray-50 text-black">{user.isValid ? 'Approved' : 'Pending'}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
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
                        backgroundColor: ['#1E88E5', '#43A047'],
                        borderColor: ['#1565C0', '#2E7D32'],
                        borderWidth: 1,
                        barThickness: 100,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
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

    if (loading) return <div className="text-center text-white mt-5">Loading chart...</div>;
    if (error) return <div className="text-center text-red-600 mt-5">{error}</div>;

    return (
        <div className="graph-Table w-4/5 max-w-6xl mx-auto mt-5 p-5 rounded-lg border-2 border-gray-600 text-center bg-transparent">
            <h3 className="text-2xl font-bold mb-5">System Statistics</h3>
            <canvas id="adminStatsChart" width="400" height="200"></canvas>
        </div>
    );
};

// Main AdminDashboard Component
const AdminDashboard = ({ data: propData, onSearch }) => {
    const [isDarkMode, setIsDarkMode] = useState(sessionStorage.getItem('theme') === 'dark');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [data, setData] = useState(propData || defaultData);
    const [loading, setLoading] = useState({
        stats: false,
    });
    const [error, setError] = useState({
        stats: '',
    });

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading((prev) => ({ ...prev, stats: true }));
                // Fetch student stats
                const statsResponse = await fetch(`${API_BASE_URL}/stats`, {
                    headers: {
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
                setError({
                    stats: `Failed to fetch stats: ${err.message}`,
                });
                console.error('Fetch error:', err);
            } finally {
                setLoading({
                    stats: false,
                });
            }
        };

        if (!propData) {
            fetchData();
        }
    }, [propData]);

    const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
    const toggleSidebar = (open) => setIsSidebarOpen(open);

    return (
        <div className="relative bg-transparent">
            <Topbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <SearchSection onSearch={onSearch} />
            <StatsCards
                data={data}
                loading={loading.stats}
                error={error.stats}
            />
            <GraphTable
                data={data}
                loading={loading.stats}
                error={error.stats}
            />
        </div>
    );
};

AdminDashboard.propTypes = {
    data: PropTypes.shape({
        studentCount: PropTypes.number,
        quizCount: PropTypes.number,
    }),
    onSearch: PropTypes.func,
};

export default AdminDashboard;