import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // for bar percentages

const PerformanceChart = ({ courses, darkMode }) => {
    // Use darkMode to set text color
    const textColor = useMemo(() => (darkMode ? '#e2e8f0' : '#1A202C'), [darkMode]);

    // Use darkMode to set bar colors
    const barColor = useMemo(() => (darkMode ? '#5EEAD4' : '#2DD4BF'), [darkMode]);

    // Log courses to verify data
    console.log('Courses:', courses);
//sorting per progress
    const sortedCourses = [...courses].sort((a, b) => b.progress - a.progress);

    // Shorten course names for x-axis labels
    const shortLabels = sortedCourses.map((course) => {
        const name = course.name;
        if (name.includes(' ')) {
            // Use first word for multi-word names
            const [firstWord, secondWord] = name.split(' ');
            return `${firstWord}.${secondWord[0]}`;
        }

        return  name;
    });

    const data = {
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
    };

    // Chart configuration
    const options = {
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
                    count: 10, // 10 ticks (0, 11.11, ..., 100)
                    autoSkip: false,
                    callback: (value) => {
                        console.log('Y-axis tick:', value);
                        return `${value}%`;
                    },
                },
                grid: { color: 'var(--border)' },
            },
        },
    };

    // Log options to debug configuration
    console.log('Chart options:', JSON.stringify(options.scales.y, null, 2));

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
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default PerformanceChart;