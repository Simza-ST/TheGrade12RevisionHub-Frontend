import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import PropTypes from 'prop-types';
import './PerformanceCSS.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Average Score (%)', color: 'var(--text-primary)' },
                ticks: { color: 'var(--text-primary)' },
                grid: { color: 'var(--border-color)' },
            },
            x: {
                title: { display: true, text: 'Subject', color: 'var(--text-primary)' },
                ticks: { color: 'var(--text-primary)' },
            },
        },
        plugins: {
            legend: { display: true, position: 'top', labels: { color: 'var(--text-primary)' } },
            title: { display: true, text: 'Average Scores by Subject', color: 'var(--text-primary)' },
        },
    };

    return (
        <div className="chart-container" style={{ height: '400px' }}>
            {chartData.labels.length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p className="text-center text-[var(--text-secondary)]">No performance data available for chart.</p>
            )}
        </div>
    );
};

BarChart.propTypes = {
    chartData: PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        datasets: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                data: PropTypes.arrayOf(PropTypes.number),
                backgroundColor: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default BarChart;