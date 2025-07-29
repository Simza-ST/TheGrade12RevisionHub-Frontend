import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PerformanceChart = ({ darkMode, API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262' }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const textColor = useMemo(() => (darkMode ? '#e2e8f0' : '#1A202C'), [darkMode]);
    const barColor = useMemo(() => (darkMode ? '#5EEAD4' : '#2DD4BF'), [darkMode]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            setLoading(true);
            try {
                const jwt = sessionStorage.getItem('jwt');
                if (!jwt) {
                    console.error('No JWT token found in sessionStorage');
                    setCourses([]);
                    return;
                }
                const headers = {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json',
                };
                console.log('Fetching from:', `${API_BASE_URL}/api/user/subject-mastery`);
                const response = await fetch(`${API_BASE_URL}/api/user/subject-mastery`, { headers });
                console.log('Response status:', response.status);
                const text = await response.text();
                console.log('Raw response:', text);
                try {
                    const data = JSON.parse(text);
                    console.log('Parsed response:', data);
                    if (response.ok && data.success) {
                        setCourses(data.data.map(item => ({
                            subjectName: item.subjectName,
                            progress: Math.round(item.progress)
                        })));
                    } else {
                        console.error(data.message || 'No mastery data available');
                        setCourses([]);
                    }
                } catch (jsonError) {
                    console.error(`JSON parse error: ${jsonError.message}, Raw response: ${text}`);
                    setCourses([]);
                }
            } catch (error) {
                console.error(`Error fetching subject mastery data: ${error.message}`);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformanceData();
    }, [API_BASE_URL]);

    const sortedCourses = useMemo(() => [...courses].sort((a, b) => b.progress - a.progress), [courses]);

    const shortLabels = useMemo(() => sortedCourses.map((course) => {
        const name = course.subjectName;
        if (name.includes(' ')) {
            const [firstWord, secondWord] = name.split(' ');
            return `${firstWord}.${secondWord[0]}`;
        }
        return name;
    }), [sortedCourses]);

    const data = useMemo(() => ({
        labels: sortedCourses.length > 0 ? shortLabels : [],
        datasets: [
            {
                label: 'Progress (%)',
                data: sortedCourses.length > 0 ? sortedCourses.map((course) => course.progress) : [],
                backgroundColor: barColor,
                borderColor: barColor,
                borderWidth: 1,
                barPercentage: 0.7,
                categoryPercentage: 0.7,
            },
        ],
    }), [shortLabels, barColor, sortedCourses]);

    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: textColor,
                    usePointStyle: false,
                },
            },
            title: {
                display: true,
                text: 'Course Performance',
                color: textColor,
                font: { size: 18 },
            },
            tooltip: {
                titleColor: textColor,
                bodyColor: textColor,
                enabled: sortedCourses.length > 0,
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${Math.round(context.raw)}%`,
                },
            },
            datalabels: {
                anchor: 'end',
                align: 'bottom',
                color: '#000000',
                font: {
                    size: 10,
                    weight: 'bold',
                },
                formatter: (value) => sortedCourses.length > 0 ? `${Math.round(value)}%` : '',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColor,
                    maxRotation: 45,
                    minRotation: 45,
                    padding: 10,
                },
                grid: { color: 'var(--border)' },
                display: true,
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    color: textColor,
                    stepSize: 10,
                    count: 10,
                    autoSkip: false,
                    callback: (value) => `${Math.round(value)}%`,
                },
                grid: { color: 'var(--border)' },
            },
        },
    }), [textColor, sortedCourses]);

    if (loading) return <div className="text-center py-10 text-[var(--text-normal)]">Loading chart data...</div>;

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl h-[500px] flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-normal)]">Performance Overview</h2>
            <div className="flex-1">
                <Bar key={darkMode ? 'dark' : 'light'} data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
        </div>
    );
};

PerformanceChart.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    API_BASE_URL: PropTypes.string,
};

PerformanceChart.defaultProps = {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:6262',
};

export default PerformanceChart;