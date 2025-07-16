// src/hooks/usePerformanceData.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const usePerformanceData = (user) => {
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';
    const pageSize = 20;

    const [state, setState] = useState({
        performanceData: [],
        summaryData: [],
        chartData: { labels: [], datasets: [] },
        enrolledSubjects: [],
        activityTypes: [],
        selectedSubject: '',
        selectedActivityType: '',
        dateRange: { startDate: '', endDate: '' },
        sortConfig: { key: 'date', direction: 'desc' },
        loading: true,
        message: { text: '', type: '' },
        currentPage: 0,
        totalPages: 1,
        isUnauthorized: false
    });

    const decodeJwt = useCallback((token) => {
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
    }, []);

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
                setState(prev => ({
                    ...prev,
                    message: { text: 'Session expired. Please log in again.', type: 'error' },
                    isUnauthorized: true
                }));
                return null;
            }

            const data = await response.json();
            if (response.ok && data.success) {
                return data.data;
            } else {
                throw new Error(data.message || `Failed to fetch data from ${url}`);
            }
        } catch (error) {
            setState(prev => ({
                ...prev,
                message: { text: `Error: ${error.message}`, type: 'error' }
            }));
            throw error;
        }
    }, []);

    const loadData = useCallback(async () => {
        let isMounted = true;
        setState(prev => ({ ...prev, loading: true }));

        try {
            let userId;
            const token = sessionStorage.getItem('jwt');

            if (user?.id && !isNaN(Number(user.id))) {
                userId = Number(user.id);
            } else if (token) {
                const decoded = decodeJwt(token);
                userId = Number(decoded?.id || decoded?.sub || decoded?.userId) || 1;
            } else {
                userId = 1;
            }

            // Fetch enrolled subjects
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

            // Fetch activity types
            const allPerformance = await fetchData(`${API_BASE_URL}/performance`, { userId, size: 1000 });
            const types = [
                ...new Set(
                    allPerformance?.content
                        ?.map((record) => record.activityType)
                        .filter(Boolean)
                ),
            ].sort();

            // Fetch performance data with filters
            const performanceParams = {
                userId,
                page: state.currentPage,
                size: pageSize,
            };

            if (state.selectedSubject) performanceParams.subjectName = state.selectedSubject;
            if (state.selectedActivityType) performanceParams.activityType = state.selectedActivityType;
            if (state.dateRange.startDate) performanceParams.startDate = state.dateRange.startDate;
            if (state.dateRange.endDate) performanceParams.endDate = state.dateRange.endDate;

            const performancePage = await fetchData(`${API_BASE_URL}/performance`, performanceParams);
            if (!performancePage) return;

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

            const summary = subjectNames
                .filter((subjectName) => !state.selectedSubject || subjectName === state.selectedSubject)
                .map((subjectName) => ({
                    subjectName,
                    activityCount: filteredPerformance.filter(
                        (record) => record.subjectName === subjectName
                    ).length,
                }));

            const subjectScores = subjectNames
                .filter((subjectName) => !state.selectedSubject || subjectName === state.selectedSubject)
                .map((subjectName) => {
                    const subjectRecords = filteredPerformance.filter(
                        (record) => record.subjectName === subjectName
                    );
                    const avgScore = subjectRecords.length > 0
                        ? subjectRecords.reduce((sum, record) => sum + (record.score || 0), 0) / subjectRecords.length
                        : 0;
                    return { subjectName, avgScore };
                });

            if (isMounted) {
                setState(prev => ({
                    ...prev,
                    performanceData: filteredPerformance,
                    summaryData: summary,
                    chartData: {
                        labels: subjectScores.map((s) => s.subjectName),
                        datasets: [{
                            label: 'Average Score (%)',
                            data: subjectScores.map((s) => s.avgScore),
                            backgroundColor: 'var(--accent-primary, #2563eb)',
                        }],
                    },
                    enrolledSubjects: subjectNames,
                    activityTypes: types,
                    totalPages: Math.max(1, performancePage.totalPages || 1),
                    loading: false,
                    message: subjectNames.length === 0
                        ? { text: 'No enrolled subjects found. Please enroll in subjects.', type: 'warning' }
                        : prev.message
                }));
            }
        } catch (error) {
            if (isMounted) {
                setState(prev => ({
                    ...prev,
                    loading: false,
                    message: { text: `Error fetching data: ${error.message}`, type: 'error' }
                }));
            }
        }

        return () => { isMounted = false; };
    }, [state.currentPage, state.selectedSubject, state.selectedActivityType, state.dateRange, fetchData, user, decodeJwt, API_BASE_URL]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        if (state.isUnauthorized) {
            const timer = setTimeout(() => navigate('/login'), 2000);
            return () => clearTimeout(timer);
        }
    }, [state.isUnauthorized, navigate]);

    const sortedData = useMemo(() => {
        const data = [...state.performanceData];
        if (state.sortConfig.key) {
            data.sort((a, b) => {
                let aValue = a[state.sortConfig.key];
                let bValue = b[state.sortConfig.key];

                if (['score', 'maxScore', 'timeSpent'].includes(state.sortConfig.key)) {
                    aValue = Number(aValue) || 0;
                    bValue = Number(bValue) || 0;
                } else if (state.sortConfig.key === 'date') {
                    aValue = new Date(aValue);
                    bValue = new Date(bValue);
                }

                if (aValue < bValue) return state.sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return state.sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    }, [state.performanceData, state.sortConfig]);

    const handleSort = useCallback((key) => {
        setState(prev => ({
            ...prev,
            sortConfig: {
                key,
                direction: prev.sortConfig.key === key && prev.sortConfig.direction === 'asc' ? 'desc' : 'asc',
            }
        }));
    }, []);

    const handleFilterChange = useCallback((e) => {
        const { name, value } = e.target;

        setState(prev => {
            if (name === 'subject' || name === 'activityType') {
                return {
                    ...prev,
                    [name]: value,
                    currentPage: 0,
                    performanceData: [],
                    summaryData: [],
                    chartData: { labels: [], datasets: [] },
                    loading: true
                };
            }

            if (name === 'startDate' || name === 'endDate') {
                return {
                    ...prev,
                    dateRange: { ...prev.dateRange, [name]: value },
                    currentPage: 0,
                    performanceData: [],
                    summaryData: [],
                    chartData: { labels: [], datasets: [] },
                    loading: true
                };
            }

            return prev;
        });
    }, []);

    const clearFilters = useCallback(() => {
        setState(prev => ({
            ...prev,
            selectedSubject: '',
            selectedActivityType: '',
            dateRange: { startDate: '', endDate: '' },
            currentPage: 0,
            performanceData: [],
            summaryData: [],
            chartData: { labels: [], datasets: [] },
            loading: true
        }));
    }, []);

    const handlePageChange = useCallback((newPage) => {
        setState(prev => {
            if (newPage >= 0 && newPage < prev.totalPages) {
                return { ...prev, currentPage: newPage, loading: true };
            }
            return prev;
        });
    }, []);

    const exportToCSV = useCallback(() => {
        const headers = [
            'ID', 'Subject', 'Activity Type', 'Activity Name', 'Date',
            'Score', 'Max Score', 'Time Spent (min)', 'Difficulty', 'Status', 'Comments'
        ];

        const rows = state.performanceData.map((record) => [
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
    }, [state.performanceData]);

    return {
        ...state,
        sortedData,
        handleSort,
        handleFilterChange,
        handlePageChange,
        clearFilters,
        exportToCSV,
        setMessage: (message) => setState(prev => ({ ...prev, message }))
    };
};

export default usePerformanceData;