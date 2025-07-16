import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../../common/Sidebar';
import Header from '../../common/Header';
import PerformanceTable from './performanceTable';
import SummaryTable from './SummaryTable';
import BarChart from './BarChart';
import Notes from './Notes';
import MessageBanner from '../../MessageBanner';
import './PerformanceCSS.css';

const Performance = ({ user, setNotifications, isCollapsed, setIsCollapsed, darkMode, setDarkMode, notifications }) => {
    const navigate = useNavigate();
    const [performanceData, setPerformanceData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [enrolledSubjects, setEnrolledSubjects] = useState([]);
    const [activityTypes, setActivityTypes] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedActivityType, setSelectedActivityType] = useState('');
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 20;
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    useEffect(() => {
        let timeoutId;
        if (message.text) {
            timeoutId = setTimeout(() => setMessage({ text: '', type: '' }), 5000);
        }
        return () => clearTimeout(timeoutId);
    }, [message]);

    const decodeJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('JWT decode error:', error);
            return null;
        }
    };

    const fetchData = useCallback(async (url, params = {}) => {
        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const query = new URLSearchParams(params).toString();
            const fullUrl = query ? `${url}?${query}` : url;
            const response = await fetch(fullUrl, { headers });
            if (response.status === 401) {
                sessionStorage.removeItem('jwt');
                setMessage({ text: 'Session expired. Please log in again.', type: 'error' });
                navigate('/login');
                return null;
            }
            const data = await response.json();
            if (response.ok && data.success) {
                return data.data;
            } else {
                throw new Error(data.message || `Failed to fetch data from ${url}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }, [navigate, setMessage]);

    const fetchPerformanceData = useCallback(async (userId, filters = {}) => {
        const token = sessionStorage.getItem('jwt');
        if (!token) {
            throw new Error('No authentication token found. Please log in.');
        }

        try {
            const params = {
                userId,
                page: filters.page || currentPage,
                size: filters.size || pageSize,
            };
            if (filters.subjectName) params.subjectName = filters.subjectName;
            if (filters.activityType) params.activityType = filters.activityType;
            if (filters.startDate) params.startDate = filters.startDate;
            if (filters.endDate) params.endDate = filters.endDate;

            const API_URL = API_BASE_URL + '/performance';
            const query = new URLSearchParams(params).toString();
            const url = query ? `${API_URL}?${query}` : API_URL;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                sessionStorage.removeItem('jwt');
                setMessage({ text: 'Session expired. Please log in again.', type: 'error' });
                navigate('/login');
                return null;
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch performance data');
            }

            const responseData = await response.json();

            if (!responseData.success) {
                throw new Error(responseData.message || 'Server returned unsuccessful response');
            }

            const transformedData = {
                ...responseData,
                content: (responseData.content || []).map(item => ({
                    id: item.id,
                    subjectName: item.paper?.subject?.name || 'N/A',
                    activityType: 'Exam',
                    activityName: item.paper?.name || 'Untitled Paper',
                    date: item.attemptDate,
                    score: item.score,
                    maxScore: item.maxScore,
                    timeSpent: item.timeSpent || 0,
                    difficulty: item.paper?.difficulty || 'Medium',
                    status: 'Completed',
                    comments: ''
                }))
            };

            return transformedData;
        } catch (error) {
            console.error('Fetch performance error:', error);
            setMessage({ text: `Error: ${error.message}`, type: 'error' });
            throw error;
        }
    }, [API_BASE_URL, currentPage, pageSize, navigate, setMessage]);

    const exportToCSV = () => {
        const headers = [
            'ID',
            'Subject',
            'Activity Type',
            'Activity Name',
            'Date',
            'Score',
            'Max Score',
            'Time Spent (min)',
            'Difficulty',
            'Status',
            'Comments',
        ];
        const rows = performanceData.map((record) => [
            record.id,
            record.subjectName,
            record.activityType,
            record.activityName,
            record.date ? new Date(record.date).toLocaleDateString('en-CA') : 'N/A',
            record.score != null ? record.score : 'N/A',
            record.maxScore != null ? record.maxScore : 'N/A',
            record.timeSpent != null ? record.timeSpent : 'N/A',
            record.difficulty || 'N/A',
            record.status || 'N/A',
            `"${record.comments || ''}"`,
        ]);
        const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `performance_data_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedData = useMemo(() => {
        const data = [...performanceData];
        if (sortConfig.key) {
            data.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (['score', 'maxScore', 'timeSpent'].includes(sortConfig.key)) {
                    aValue = Number(aValue) || 0;
                    bValue = Number(bValue) || 0;
                    return sortConfig.direction === 'asc'
                        ? aValue - bValue
                        : bValue - aValue;
                }

                if (sortConfig.key === 'date') {
                    aValue = new Date(aValue).getTime();
                    bValue = new Date(bValue).getTime();
                    return sortConfig.direction === 'asc'
                        ? aValue - bValue
                        : bValue - aValue;
                }

                aValue = aValue?.toString().toLowerCase() || '';
                bValue = bValue?.toString().toLowerCase() || '';

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [performanceData, sortConfig]);

    const clearFilters = () => {
        setSelectedSubject('');
        setSelectedActivityType('');
        setDateRange({ startDate: '', endDate: '' });
        setCurrentPage(0);
        setPerformanceData([]);
        setSummaryData([]);
        setChartData({ labels: [], datasets: [] });
        setLoading(true);
    };

    useEffect(() => {
        let isMounted = true;

        const loadData = async () => {
            let userId;
            const token = sessionStorage.getItem('jwt');
            if (user && user.id && !isNaN(Number(user.id))) {
                userId = Number(user.id);
            } else if (token) {
                const decoded = decodeJwt(token);
                userId = Number(decoded?.id || decoded?.sub || decoded?.userId) || 1;
            } else {
                userId = 1;
            }

            if (!API_BASE_URL) {
                if (isMounted) {
                    setMessage({ text: 'API base URL is not defined.', type: 'error' });
                    setLoading(false);
                }
                return;
            }

            setLoading(true);
            try {
                const subjectsData = await fetchData(`${API_BASE_URL}/enrolled-subjects`);
                if (!subjectsData) return;
                let subjectNames = [];
                if (Array.isArray(subjectsData)) {
                    subjectNames = subjectsData
                        .map((s) => {
                            if (typeof s === 'string') return s;
                            return s.subjectName || (s.subject && s.subject.subjectName);
                        })
                        .filter(Boolean)
                        .sort();
                }

                const activityTypesData = ['Exam'];
                setActivityTypes(activityTypesData);

                if (isMounted) {
                    setEnrolledSubjects(subjectNames);
                    if (subjectNames.length === 0) {
                        setMessage({ text: 'No enrolled subjects found. Please enroll in subjects.', type: 'warning' });
                    }
                }

                const performanceParams = {
                    userId,
                    subjectName: selectedSubject || undefined,
                    activityType: selectedActivityType || undefined,
                    startDate: dateRange.startDate || undefined,
                    endDate: dateRange.endDate || undefined,
                    page: currentPage,
                    size: pageSize
                };

                const performancePage = await fetchPerformanceData(userId, performanceParams);
                if (!performancePage) return;

                if (isMounted) {
                    const filteredPerformance = Array.isArray(performancePage.content)
                        ? performancePage.content
                        : [];

                    setPerformanceData(filteredPerformance);
                    setTotalPages(Math.max(1, performancePage.totalPages || 1));

                    const summary = subjectNames
                        .filter((subjectName) => !selectedSubject || subjectName === selectedSubject)
                        .map((subjectName) => ({
                            subjectName,
                            activityCount: filteredPerformance.filter(
                                (record) => record.subjectName === subjectName
                            ).length,
                        }));
                    setSummaryData(summary);

                    const subjectScores = subjectNames
                        .filter((subjectName) => !selectedSubject || subjectName === selectedSubject)
                        .map((subjectName) => {
                            const subjectRecords = filteredPerformance.filter(
                                (record) => record.subjectName === subjectName
                            );
                            const avgScore =
                                subjectRecords.length > 0
                                    ? subjectRecords.reduce((sum, record) => sum + (record.score || 0), 0) /
                                    subjectRecords.length
                                    : 0;
                            return { subjectName, avgScore };
                        });

                    setChartData({
                        labels: subjectScores.map((s) => s.subjectName),
                        datasets: [
                            {
                                label: 'Average Score (%)',
                                data: subjectScores.map((s) => s.avgScore),
                                backgroundColor: 'var(--accent-primary, #2563eb)',
                            },
                        ],
                    });

                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setMessage({ text: `Error fetching data: ${error.message}`, type: 'error' });
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            isMounted = false;
        };
    }, [
        API_BASE_URL,
        darkMode,
        navigate,
        user,
        currentPage,
        selectedSubject,
        selectedActivityType,
        dateRange,
        fetchData,
        fetchPerformanceData,
        pageSize
    ]);

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        navigate('/login');
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
            setLoading(true);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === 'subject') setSelectedSubject(value);
        if (name === 'activityType') setSelectedActivityType(value);
        if (name === 'startDate' || name === 'endDate') {
            setDateRange((prev) => ({ ...prev, [name]: value }));
        }
        setCurrentPage(0);
        setPerformanceData([]);
        setSummaryData([]);
        setChartData({ labels: [], datasets: [] });
        setLoading(true);
    };

    if (loading) {
        return (
            <div className="full">
                <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="full">
            <div className="flex min-h-screen bg-[var(--bg-primary)]">
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    isCollapsed={isCollapsed}
                    setIsCollapsed={setIsCollapsed}
                    darkMode={darkMode}
                />
                <div className="flex-1">
                    <Header
                        user={user}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        isCollapsed={isCollapsed}
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                        tabDescription="Performance"
                        userMessage="Track your progress"
                    />
                    <main
                        className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'sm:ml-16' : 'sm:ml-64'}`}
                    >
                        <div className="quiz-section">
                            <header className="mb-4">
                                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Performance Dashboard</h1>
                            </header>
                            <MessageBanner message={message.text} type={message.type} />
                            <p className="mb-6 text-[var(--text-secondary)]">
                                Filter and sort your performance data to analyze your progress.
                            </p>

                            {/* RESTORED HORIZONTAL FILTER LAYOUT */}
                            <div className="filter-container mb-6">
                                <div className="filter-item">
                                    <label className="form-label">Filter by Subject</label>
                                    <select
                                        name="subject"
                                        value={selectedSubject}
                                        onChange={handleFilterChange}
                                        className="form-input"
                                    >
                                        <option value="">All Subjects</option>
                                        {enrolledSubjects.map((subject) => (
                                            <option key={subject} value={subject}>
                                                {subject}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-item">
                                    <label className="form-label">Filter by Activity Type</label>
                                    <select
                                        name="activityType"
                                        value={selectedActivityType}
                                        onChange={handleFilterChange}
                                        className="form-input"
                                    >
                                        <option value="">All Activity Types</option>
                                        {activityTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="filter-item">
                                    <label className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={dateRange.startDate}
                                        onChange={handleFilterChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="filter-item">
                                    <label className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={dateRange.endDate}
                                        onChange={handleFilterChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="filter-item">
                                    <button onClick={clearFilters}
                                            className="px-4 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>

                            <div className="mb-6">
                                <button onClick={exportToCSV}
                                        className="px-4 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                >
                                    Export to CSV
                                </button>
                            </div>

                            <h2 className="text-xl font-semibold text-[var(--text-primary)]">Performance Data</h2>
                            <PerformanceTable
                                performanceData={sortedData}
                                onSort={handleSort}
                                sortConfig={sortConfig}
                            />

                            {totalPages > 1 && (
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 0}
                                        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-[var(--text-secondary)]">
                                        Page {currentPage + 1} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPages - 1}
                                        className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                            <h2 className="text-xl font-semibold mt-6 text-[var(--text-primary)]">Summary of Activities per Subject</h2>
                            <SummaryTable summaryData={summaryData} />

                            <h2 className="text-xl font-semibold mt-6 text-[var(--text-primary)]">Average Scores by Subject</h2>
                            <BarChart chartData={chartData} />

                            <Notes />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

Performance.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        role: PropTypes.string,
        profilePicture: PropTypes.string,
    }),
    isCollapsed: PropTypes.bool.isRequired,
    setIsCollapsed: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
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

export default Performance;