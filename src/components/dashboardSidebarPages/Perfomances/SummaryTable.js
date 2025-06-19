import React from 'react';
import { summaryData } from './summaryData';
import './PerformanceCSS.css';

const SummaryTable = () => {
    return (
        <table className="summary-table">
            <thead>
            <tr>
                <th>Subject</th>
                <th>Number of Learners</th>
            </tr>
            </thead>
            <tbody>
            {summaryData.map((data, index) => (
                <tr key={index}>
                    <td>{data.subject}</td>
                    <td>{data.learners}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default SummaryTable;