import React, { useState, useEffect, useCallback } from 'react';
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
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/user';

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
            const token = localStorage.getItem('jwt');
            console.log('JWT token:', token ? 'Present' : 'Missing');
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
                localStorage.removeItem('jwt');
                setMessage({ text: 'Session expired. Please log in again.', type: 'error' });
                navigate('/login');
                return null;
            }
            const data = await response.json();
            console.log(`Fetched from ${fullUrl}:`, data);
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

    const sortedData = () => {
        const data = [...performanceData];
        if (sortConfig.key) {
            data.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];
                if (sortConfig.key === 'score' || sortConfig.key === 'maxScore' || sortConfig.key === 'timeSpent') {
                    aValue = Number(aValue) || 0;
                    bValue = Number(bValue) || 0;
                } else if (sortConfig.key === 'date') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    };

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
            console.log('User prop:', user);
            let userId;
            const token = localStorage.getItem('jwt');
            if (user && user.id && !isNaN(Number(user.id))) {
                userId = Number(user.id);
            } else if (token) {
                const decoded = decodeJwt(token);
                userId = Number(decoded?.id || decoded?.sub || decoded?.userId) || 1;
                console.log('Decoded JWT:', decoded);
            } else {
                userId = 1;
                console.log('No token found, using fallback userId: 1');
            }
            console.log('Using userId:', userId);

            if (!API_BASE_URL) {
                if (isMounted) {
                    setMessage({ text: 'API base URL is not defined.', type: 'error' });
                    setLoading(false);
                }
                return;
            }

            setLoading(true);
            try {
                // Fetch enrolled subjects
                const subjectsData = await fetchData(`${API_BASE_URL}/enrolled-subjects`);
                if (!subjectsData) return;
                console.log('Raw subjects data:', subjectsData);
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
                console.log('Processed subject names:', subjectNames);

                // Fetch activity types
                const allPerformance = await fetchData(`${API_BASE_URL}/performance`, { userId, size: 1000 });
                const types = [
                    ...new Set(
                        allPerformance?.content
                            ?.map((record) => record.activityType)
                            .filter(Boolean)
                            .sort()
                    ),
                ];
                console.log('Activity types:', types);

                if (isMounted) {
                    setEnrolledSubjects(subjectNames);
                    setActivityTypes(types);
                    if (subjectNames.length === 0) {
                        setMessage({ text: 'No enrolled subjects found. Please enroll in subjects.', type: 'warning' });
                    }
                }

                // Fetch performance data with filters
                const performanceParams = {
                    userId,
                    page: currentPage,
                    size: pageSize,
                };
                if (selectedSubject) performanceParams.subjectName = selectedSubject;
                if (selectedActivityType) performanceParams.activityType = selectedActivityType;
                if (dateRange.startDate) performanceParams.startDate = dateRange.startDate;
                if (dateRange.endDate) performanceParams.endDate = dateRange.endDate;

                const performancePage = await fetchData(`${API_BASE_URL}/performance`, performanceParams);
                if (!performancePage) return;
                console.log('Performance page data:', performancePage);

                if (isMounted) {
                    const filteredPerformance = Array.isArray(performancePage.content)
                        ? performancePage.content.map((record) => ({
                            id: record.id,
                            subjectName: record.subjectName,
                            activityType: record.activityType,
                            activityName: record.activityName,
                            date: record.date,
                            score: record.score,
                            maxScore: record.maxScore,
                            timeSpent: record.timeSpent,
                            difficulty: record.difficulty,
                            status: record.status,
                            comments: record.comments,
                        }))
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
        fetchData
    ]);

    const handleLogout = () => {
        localStorage.removeItem('jwt');
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
                <style>
                    {`
            .full {
              width: 100%;
              min-height: 100vh;
              position: relative;
              z-index: 10;
            }
            .bg-[var(--bg-primary)] {
              background-color: var(--bg-primary, ${darkMode ? '#111827' : '#f8fafc'});
            }
            .bg-[var(--bg-secondary)] {
              background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
            }
            .bg-[var(--bg-tertiary)] {
              background-color: var(--bg-tertiary, ${darkMode ? '#374151' : '#e5e7eb'});
            }
            .bg-[var(--accent-primary)] {
              background-color: var(--accent-primary, #2563eb);
            }
            .bg-[var(--accent-secondary)] {
              background-color: var(--accent-secondary, #dc3545);
            }
            .text-[var(--text-primary)] {
              color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
            }
            .text-[var(--text-secondary)] {
              color: var(--text-secondary, ${darkMode ? '#9ca3af' : '#4b5563'});
            }
            .text-error {
              color: var(--text-error, ${darkMode ? '#f87171' : '#dc2626'});
            }
            .text-success {
              color: var(--text-success, ${darkMode ? '#34d399' : '#059669'});
            }
            .message-banner {
              padding: 12px 16px;
              border-radius: 6px;
              margin-bottom: 16px;
              font-size: 0.875rem;
              font-weight: 500;
              text-align: center;
            }
            .message-banner.error {
              background-color: var(--bg-error, ${darkMode ? '#7f1d1d' : '#fee2e2'});
              color: var(--text-error, ${darkMode ? '#f87171' : '#dc2626'});
            }
            .message-banner.success {
              background-color: var(--bg-success, ${darkMode ? '#064e3b' : '#d1fae5'});
              color: var(--text-success, ${darkMode ? '#34d399' : '#059669'});
            }
            .message-banner.warning {
              background-color: var(--bg-warning, ${darkMode ? '#92400e' : '#fef3c7'});
              color: var(--text-warning, ${darkMode ? '#f59e0b' : '#b45309'});
            }
            .flex {
              display: flex;
            }
            .min-h-screen {
              min-height: 100vh;
            }
            .min-w-0 {
              min-width: 0;
            }
            .p-6 {
              padding: 24px;
            }
            .sm\\:p-8 {
              padding: 32px;
            }
            .mb-4 {
              margin-bottom: 16px;
            }
            .mb-6 {
              margin-bottom: 24px;
            }
            .mt-6 {
              margin-top: 24px;
            }
            .rounded-2xl {
              border-radius: 16px;
            }
            .shadow-lg {
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            .sm\\:ml-16 {
              margin-left: 64px;
            }
            .sm\\:ml-64 {
              margin-left: 256px;
            }
            .quiz-section {
              background: ${darkMode
                        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
              background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
              border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              padding: 32px;
              border-radius: 16px;
            }
            .form-label {
              color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
              font-weight: 600;
              margin-bottom: 8px;
              display: block;
            }
            .form-input {
              width: 100%;
              padding: 8px;
              border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
              border-radius: 4px;
              background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
              color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
              font-size: 0.875rem;
            }
            .form-input:focus {
              border-color: var(--accent-primary, #2563eb);
              outline: none;
            }
            .btn-primary {
              background-color: var(--accent-primary, #2563eb);
              color: #ffffff;
              padding: 8px 16px;
              border-radius: 4px;
              border: none;
              cursor: pointer;
            }
            .btn-primary:hover {
              background-color: var(--hover-primary, #1d4ed8);
            }
            .btn-secondary {
              background-color: var(--bg-tertiary, ${darkMode ? '#374151' : '#e5e7eb'});
              color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
              padding: 8px 16px;
              border-radius: 4px;
              border: none;
              cursor: pointer;
            }
            .btn-secondary:hover {
              background-color: var(--hover-secondary, ${darkMode ? '#4b5563' : '#d1d5db'});
            }
            .filter-container {
              display: flex;
              flex-wrap: wrap;
              gap: 16px;
              align-items: flex-end;
            }
            .filter-item {
              flex: 1;
              min-width: 200px;
            }
            @media (min-width: 640px) {
              .sm\\:ml-16 {
                margin-left: 64px;
              }
              .sm\\:ml-64 {
                margin-left: 256px;
              }
              .sm\\:p-8 {
                padding: 32px;
              }
            }
          `}
                </style>
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
                                performanceData={sortedData()}
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