import React from 'react';
import { performanceData } from './performanceData';
import './PerformanceCSS.css';

const PerformanceTable = () => {
    return (
        <div className="table-container">
            <table className="performance-table">
                <thead>
                <tr>
                    <th>Learner ID</th>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Activity Type</th>
                    <th>Activity Name</th>
                    <th>Date</th>
                    <th>Score (%)</th>
                    <th>Max Score</th>
                    <th>Time Spent (min)</th>
                    <th>Difficulty Level</th>
                    <th>Status</th>
                    <th>Comments</th>
                </tr>
                </thead>
                <tbody>
                {performanceData.map((data, index) => (
                    <tr key={index}>
                        <td>{data.learnerId}</td>
                        <td>{data.name}</td>
                        <td>{data.subject}</td>
                        <td>{data.activityType}</td>
                        <td>{data.activityName}</td>
                        <td>{data.date}</td>
                        <td>{data.score}</td>
                        <td>{data.maxScore}</td>
                        <td>{data.timeSpent}</td>
                        <td>{data.difficulty}</td>
                        <td>{data.status}</td>
                        <td>{data.comments}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PerformanceTable;