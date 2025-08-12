import React, { useState, useEffect, useCallback, useRef } from 'react';
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
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target) && !e.target.closest('.hamburger')) {
                setShowSidebar(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSidebar]);

    useEffect(() => {
        if (window.innerWidth <= 639) {
            setIsCollapsed(!showSidebar);
        }
    }, [showSidebar, setIsCollapsed]);

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
                sessionStorage.removeItem('jwt');
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
            const token = sessionStorage.getItem('jwt');
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
            <div className="flex min-h-screen bg-[var(--bg-primary)] relative">
                <style>
                    {`
            :not(.sidebar-wrapper, .hamburger, .dashboard-content, .header, .header h1) {
              transition: none !important;
              animation: none !important;
              opacity: 1 !important;
            }
            .sidebar-wrapper,
            .hamburger,
            .dashboard-content,
            .header,
            .header h1 {
              transition: transform 0.3s ease-in-out, left 0.3s ease-in-out, margin-left 0.3s ease-in-out, padding-left 0.3s ease-in-out;
            }
            .full {
              width: 100%;
              min-height: 100vh;
              position: relative;
              z-index: 10;
            }
            .bg-[var(--bg-primary)] {
              background-color: var(--bg-primary, ${darkMode ? '#111827' : '#f4f4f4'});
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
            .text-white {
              color: #ffffff;
            }
            .text-error {
              color: var(--text-error, ${darkMode ? '#f87171' : '#dc2626'});
            }
            .text-success {
              color: var(--text-success, ${darkMode ? '#34d399' : '#059669'});
            }
            .hover\\:bg-[var(--hover-tertiary)]:hover {
              background-color: var(--hover-tertiary, ${darkMode ? '#4b5563' : '#d1d5db'});
            }
            .hover\\:bg-[var(--hover-primary)]:hover {
              background-color: var(--hover-primary, #1e40af);
            }
            .hover\\:text-[var(--hover-secondary)]:hover {
              color: var(--hover-secondary, ${darkMode ? '#f87171' : '#b91c1c'});
            }
            .message-banner {
              padding: clamp(8px, 2vw, 12px) clamp(12px, 3vw, 16px);
              border-radius: clamp(4px, 1vw, 6px);
              margin-bottom: clamp(12px, 3vw, 16px);
              font-size: clamp(0.75rem, 2vw, 0.875rem);
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
            .justify-center {
              justify-content: center;
            }
            .justify-between {
              justify-content: space-between;
            }
            .items-center {
              align-items: center;
            }
            .flex-1 {
              flex: 1;
            }
            .flex-wrap {
              flex-wrap: wrap;
            }
            .align-items-flex-end {
              align-items: flex-end;
            }
            .gap-4 {
              gap: clamp(8px, 2vw, 12px);
            }
            .gap-6 {
              gap: clamp(12px, 3vw, 16px);
            }
            .p-4 {
              padding: clamp(8px, 2vw, 12px);
            }
            .p-6 {
              padding: clamp(12px, 3vw, 16px);
            }
            .sm\\:p-6 {
              padding: clamp(12px, 3vw, 16px);
            }
            .sm\\:p-8 {
              padding: clamp(16px, 4vw, 20px);
            }
            .rounded-2xl {
              border-radius: clamp(8px, 2vw, 12px);
            }
            .rounded-lg {
              border-radius: clamp(4px, 1vw, 8px);
            }
            .rounded-md {
              border-radius: clamp(3px, 0.8vw, 6px);
            }
            .mb-4 {
              margin-bottom: clamp(12px, 3vw, 16px);
            }
            .mb-6 {
              margin-bottom: clamp(16px, 4vw, 24px);
            }
            .mt-1 {
              margin-top: clamp(3px, 0.8vw, 4px);
            }
            .mt-4 {
              margin-top: clamp(12px, 3vw, 16px);
            }
            .mt-6 {
              margin-top: clamp(16px, 4vw, 24px);
            }
            .shadow-[var(--shadow)] {
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .shadow-2xl {
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }
            .shadow-lg {
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            .hover\\:shadow-lg:hover {
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
            }
            .text-3xl {
              font-size: clamp(1.5rem, 4.5vw, 1.875rem);
            }
            .text-xl {
              font-size: clamp(1.125rem, 3.5vw, 1.25rem);
            }
            .text-lg {
              font-size: clamp(1rem, 3vw, 1.125rem);
            }
            .text-sm {
              font-size: clamp(0.75rem, 2vw, 0.875rem);
            }
            .text-xs {
              font-size: clamp(0.625rem, 1.8vw, 0.75rem);
            }
            .font-bold {
              font-weight: 700;
            }
            .font-semibold {
              font-weight: 600;
            }
            .font-medium {
              font-weight: 500;
            }
            .form-label {
              color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
              font-weight: 600;
              margin-bottom: clamp(6px, 1.5vw, 8px);
              display: block;
            }
            .form-input {
              width: 100%;
              padding: clamp(6px, 1.5vw, 8px);
              border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
              border-radius: clamp(3px, 0.8vw, 4px);
              background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
              color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
              font-size: clamp(0.75rem, 2vw, 0.875rem);
            }
            .form-input:focus {
              border-color: var(--accent-primary, #2563eb);
              outline: none;
            }
            .btn-primary {
              background-color: var(--accent-primary, #2563eb);
              color: #ffffff;
              padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px);
              border-radius: clamp(4px, 1vw, 6px);
              border: none;
              cursor: pointer;
              font-size: clamp(0.75rem, 2vw, 0.875rem);
              min-height: 44px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            .btn-primary:hover {
              background-color: var(--hover-primary, #1e40af);
            }
            .btn-secondary {
              background-color: var(--bg-tertiary, ${darkMode ? '#374151' : '#e5e7eb'});
              color: var(--text-primary, ${darkMode ? '#e5e7eb' : '#1f2937'});
              padding: clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px);
              border-radius: clamp(4px, 1vw, 6px);
              border: none;
              cursor: pointer;
              font-size: clamp(0.75rem, 2vw, 0.875rem);
              min-height: 44px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }
            .btn-secondary:hover {
              background-color: var(--hover-secondary, ${darkMode ? '#4b5563' : '#d1d5db'});
            }
            .disabled\\:cursor-not-allowed:disabled {
              cursor: not-allowed;
            }
            .disabled\\:opacity-50:disabled {
              opacity: 0.5;
            }
            .filter-container {
              display: flex;
              flex-wrap: wrap;
              gap: clamp(8px, 2vw, 12px);
              align-items: flex-end;
            }
            .filter-item {
              flex: 1;
              min-width: clamp(150px, 40vw, 200px);
            }
            .grid {
              display: grid;
              gap: clamp(8px, 2vw, 12px);
            }
            .sm\\:grid-cols-2 {
              grid-template-columns: repeat(2, 1fr);
            }
            .md\\:grid-cols-3 {
              grid-template-columns: repeat(3, 1fr);
            }
            .col-span-full {
              grid-column: 1 / -1;
            }
            .h-5 {
              height: clamp(16px, 4vw, 20px);
            }
            .w-5 {
              width: clamp(16px, 4vw, 20px);
            }
            .h-12 {
              height: clamp(40px, 10vw, 48px);
            }
            .w-12 {
              width: clamp(40px, 10vw, 48px);
            }
            .quiz-section {
              background: ${darkMode
                        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)'};
              background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
              border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
              padding: clamp(16px, 4vw, 24px);
              border-radius: clamp(8px, 2vw, 12px);
            }
            .service-card {
              background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
              padding: clamp(12px, 3vw, 16px);
              border-radius: clamp(4px, 1vw, 8px);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .animate-spin {
              animation: spin 1s linear infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            .hamburger {
              display: none;
              cursor: pointer;
              background: none;
              border: none;
              padding: clamp(6px, 1.5vw, 8px);
              position: fixed;
              top: clamp(12px, 3vw, 16px);
              left: clamp(12px, 3vw, 16px);
              z-index: 50;
              transition: left 0.3s ease-in-out;
            }
            .sidebar-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              height: 100vh;
              z-index: 40;
              transition: transform 0.3s ease-in-out;
            }
            .sidebar-hidden {
              transform: translateX(-100%);
            }
            .dashboard-content {
              max-height: 80vh;
              overflow-y: auto;
              padding-right: clamp(6px, 1.5vw, 8px);
            }
            .dashboard-content::-webkit-scrollbar {
              width: 6px;
            }
            .dashboard-content::-webkit-scrollbar-thumb {
              background-color: var(--border-color, ${darkMode ? '#4b5563' : '#e5e7eb'});
              border-radius: 3px;
            }
            .dashboard-content::-webkit-scrollbar-track {
              background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
            }
            .underline {
              text-decoration: underline;
            }
            .list-disc {
              list-style-type: disc;
            }
            .list-inside {
              list-style-position: inside;
            }
            .space-y-1 > * + * {
              margin-top: clamp(3px, 0.8vw, 4px);
            }
            .performance-dashboard {
              color: var(--text-primary, #e5e7eb);
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              background: var(--bg-secondary, #1f2937);
              border: 1px solid var(--border-color, #374151);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              padding: clamp(16px, 4vw, 24px);
              border-radius: clamp(8px, 2vw, 12px);
            }
            .performance-dashboard h1,
            .performance-dashboard h2 {
              color: var(--text-primary, #e5e7eb);
              margin-bottom: clamp(12px, 3vw, 16px);
            }
            .table-container {
              overflow-x: auto;
              margin-bottom: clamp(16px, 4vw, 24px);
            }
            .performance-table,
            .summary-table {
              width: 100%;
              border-collapse: collapse;
              background-color: var(--bg-tertiary, #374151);
              font-size: clamp(0.75rem, 2vw, 0.875rem);
            }
            .performance-table th,
            .performance-table td,
            .summary-table th,
            .summary-table td {
              padding: clamp(8px, 2vw, 12px);
              border: 1px solid var(--border-color, #374151);
              text-align: left;
            }
            .performance-table th,
            .summary-table th {
              background-color: var(--accent-primary, #2563eb);
              color: #ffffff;
              position: sticky;
              top: 0;
              z-index: 1;
            }
            .performance-table tr:nth-child(even),
            .summary-table tr:nth-child(even) {
              background-color: var(--bg-tertiary, #374151);
            }
            .performance-table tr:nth-child(odd),
            .summary-table tr:nth-child(odd) {
              background-color: var(--bg-secondary, #1f2937);
            }
            .chart-container {
              background-color: var(--bg-tertiary, #374151);
              padding: clamp(12px, 3vw, 16px);
              border-radius: clamp(6px, 1.5vw, 8px);
              max-width: 100%;
              margin-top: clamp(16px, 4vw, 24px);
            }
            .summary-table {
              width: clamp(50%, 50vw, 400px);
              max-width: 400px;
              margin-top: clamp(16px, 4vw, 24px);
            }
            .text-center {
              text-align: center;
            }
            @media (max-width: 639px) {
              .header h1 {
                padding-left: clamp(48px, 12vw, 56px);
              }
              .sidebar-open .header h1 {
                padding-left: clamp(208px, 50vw, 216px);
              }
              .sidebar-open .dashboard-content {
                margin-left: clamp(192px, 48vw, 198px);
              }
              .hamburger {
                display: block;
              }
              .sidebar-wrapper {
                display: ${showSidebar ? 'block' : 'none'};
              }
              .hamburger {
                left: ${showSidebar ? 'clamp(192px, 48vw, 198px)' : 'clamp(12px, 3vw, 16px)'};
              }
              .ml-16, .ml-64 {
                margin-left: 0;
              }
              .p-6, .sm\\:p-6, .sm\\:p-8 {
                padding: clamp(8px, 2vw, 10px);
              }
              .text-3xl {
                font-size: clamp(1.25rem, 4vw, 1.5rem);
              }
              .text-xl {
                font-size: clamp(0.875rem, 2.5vw, 1rem);
              }
              .text-lg {
                font-size: clamp(0.75rem, 2vw, 0.875rem);
              }
              .text-sm {
                font-size: clamp(0.625rem, 1.8vw, 0.75rem);
              }
              .btn-primary {
                font-size: clamp(0.7rem, 1.8vw, 0.8rem);
                min-height: 40px;
              }
              .grid {
                grid-template-columns: 1fr;
              }
              .sm\\:grid-cols-2 {
                grid-template-columns: 1fr;
              }
              .md\\:grid-cols-3 {
                grid-template-columns: 1fr;
              }
              .performance-table,
              .summary-table {
                font-size: clamp(0.625rem, 1.8vw, 0.75rem);
              }
              .performance-table th,
              .performance-table td,
              .summary-table th,
              .summary-table td {
                padding: clamp(6px, 1.5vw, 8px);
              }
              .summary-table {
                width: 100%;
              }
            }
            @media (min-width: 640px) and (max-width: 767px) {
              .grid {
                grid-template-columns: repeat(2, 1fr);
              }
              .sm\\:grid-cols-2 {
                grid-template-columns: repeat(2, 1fr);
              }
              .md\\:grid-cols-3 {
                grid-template-columns: repeat(2, 1fr);
              }
              .hamburger {
                display: none;
              }
              .sidebar-wrapper {
                display: block;
              }
              .p-6, .sm\\:p-6 {
                padding: clamp(12px, 3vw, 16px);
              }
              .sm\\:p-8 {
                padding: clamp(16px, 4vw, 20px);
              }
              .performance-table,
              .summary-table {
                font-size: clamp(0.75rem, 2vw, 0.875rem);
              }
              .performance-table th,
              .performance-table td,
              .summary-table th,
              .summary-table td {
                padding: clamp(8px, 2vw, 12px);
              }
              .summary-table {
                width: 100%;
              }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
              .grid {
                grid-template-columns: repeat(2, 1fr);
              }
              .sm\\:grid-cols-2 {
                grid-template-columns: repeat(2, 1fr);
              }
              .md\\:grid-cols-3 {
                grid-template-columns: repeat(3, 1fr);
              }
              .p-6, .sm\\:p-6 {
                padding: clamp(12px, 3vw, 16px);
              }
              .sm\\:p-8 {
                padding: clamp(16px, 4vw, 20px);
              }
              .summary-table {
                width: clamp(50%, 50vw, 400px);
              }
            }
            @media (min-width: 1024px) and (max-width: 1279px) {
              .grid {
                grid-template-columns: repeat(3, 1fr);
              }
              .sm\\:grid-cols-2 {
                grid-template-columns: repeat(2, 1fr);
              }
              .md\\:grid-cols-3 {
                grid-template-columns: repeat(3, 1fr);
              }
            }
            @media (min-width: 1280px) {
              .grid {
                grid-template-columns: repeat(4, 1fr);
              }
              .sm\\:grid-cols-2 {
                grid-template-columns: repeat(2, 1fr);
              }
              .md\\:grid-cols-3 {
                grid-template-columns: repeat(3, 1fr);
              }
              .p-6, .sm\\:p-6 {
                padding: clamp(16px, 3.5vw, 20px);
              }
              .sm\\:p-8 {
                padding: clamp(20px, 4vw, 24px);
              }
            }
          `}
                </style>
                <button
                    className="hamburger"
                    onClick={() => {
                        setShowSidebar(!showSidebar);
                        if (!showSidebar) setIsCollapsed(false);
                    }}
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div ref={sidebarRef} className={`sidebar-wrapper ${!showSidebar ? 'sidebar-hidden' : ''}`}>
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        darkMode={darkMode}
                        disableHamburger={showSidebar && window.innerWidth <= 639}
                    />
                </div>
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
                        className="header"
                    />
                    <main
                        className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} dashboard-content ${showSidebar ? 'sidebar-open' : ''}`}
                    >
                        <div className="quiz-section">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Performance Dashboard</h2>
                            </div>
                            <div className="mb-6">
                                <p className="text-sm text-[var(--text-secondary)] mb-4">
                                    Filter and sort your performance data to analyze your progress.
                                </p>
                                <p className="bg-[var(--bg-tertiary)] p-3 rounded-md text-sm text-[var(--text-secondary)] mb-4">
                                    <strong>NB:</strong> Performance records help you identify strengths and areas for improvement.
                                </p>
                                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Quick Tips</h3>
                                <ul className="list-disc list-inside text-sm text-[var(--text-secondary)] space-y-1">
                                    <li>Filter by subject, activity type and dates to view relevant performance records.</li>
                                    <li>Clear filters using the <strong>Clear Filters</strong> button.</li>
                                    <li>Export external performance data to CSV with the <strong>Export to CSV</strong> button.</li>
                                    <li>Check resource details for more information.</li>
                                </ul>
                            </div>
                            <MessageBanner message={message.text} type={message.type} />
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
                                            className="btn-secondary"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                            <div className="mb-6">
                                <button onClick={exportToCSV}
                                        className="btn-secondary"
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