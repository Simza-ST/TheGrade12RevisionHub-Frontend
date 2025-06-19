import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { chartData, chartOptions } from './chartData';
import './PerformanceCSS.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
    return (
        <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default BarChart;