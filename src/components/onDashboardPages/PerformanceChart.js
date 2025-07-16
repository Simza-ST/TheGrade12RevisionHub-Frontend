import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // for bar percentages

const PerformanceChart = ({ darkMode }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/user';

    // Use darkMode to set text color
    const textColor = useMemo(() => (darkMode ? '#e2e8f0' : '#1A202C'), [darkMode]);

    // Use darkMode to set bar colors
    const barColor = useMemo(() => (darkMode ? '#5EEAD4' : '#2DD4BF'), [darkMode]);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch(`${API_BASE_URL}/performance-overview`, { headers });
                const data = await response.json();
                if (response.ok && data.success) {
                    setCourses(data.data.map(item => ({ name: item.name, progress: item.progress })));
                } else {
                    setError(data.message || 'Failed to fetch performance data');
                }
            } catch (error) {
                setError(`Error fetching performance data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformanceData();
    }, [API_BASE_URL]);

    // Sorting per progress
    const sortedCourses = useMemo(() => [...courses].sort((a, b) => b.progress - a.progress), [courses]);

    // Shorten course names for x-axis labels
    const shortLabels = useMemo(() => sortedCourses.map((course) => {
        const name = course.name;
        if (name.includes(' ')) {
            const [firstWord, secondWord] = name.split(' ');
            return `${firstWord}.${secondWord[0]}`;
        }
        return name;
    }), [sortedCourses]);

    const data = useMemo(() => ({
        labels: shortLabels,
        datasets: [
            {
                label: 'Progress (%)',
                data: sortedCourses.map((course) => course.progress),
                backgroundColor: barColor,
                borderColor: barColor,
                borderWidth: 1,
                barPercentage: 0.7,
                categoryPercentage: 0.7,
            },
        ],
    }), [shortLabels, barColor, sortedCourses]);

    // Chart configuration
    const options = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false, // Allow flexible height
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
            },
            datalabels: {
                anchor: 'end',
                align: 'bottom',
                color: '#000000',
                font: {
                    size: 10,
                    weight: 'bold',
                },
                formatter: (value) => ` ${value}%`,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColor,
                    maxRotation: 45, // Rotate labels 45 degrees
                    minRotation: 45,
                },
                grid: { color: 'var(--border)' },
            },
            y: {
                min: 0,
                max: 100,
                ticks: {
                    color: textColor,
                    stepSize: 10,
                    count: 10, // 10 ticks (0, 10, ..., 100)
                    autoSkip: false,
                    callback: (value) => `${value}%`,
                },
                grid: { color: 'var(--border)' },
            },
        },
    }), [textColor]);

    if (loading) return <div className="text-center py-10 text-[var(--text-normal)]">Loading chart data...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

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
};

export default PerformanceChart;