import React from 'react';
import PropTypes from 'prop-types';
import './PerformanceCSS.css';

const SummaryTable = ({ summaryData }) => {
    return (
        <table className="summary-table">
            <thead>
            <tr>
                <th>Subject</th>
                <th>Number of Activities</th>
            </tr>
            </thead>
            <tbody>
            {summaryData.length > 0 ? (
                summaryData.map((data, index) => (
                    <tr key={index}>
                        <td>{data.subjectName}</td>
                        <td>{data.activityCount}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="2" className="text-center text-[var(--text-secondary)]">
                        No enrolled subjects.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

SummaryTable.propTypes = {
    summaryData: PropTypes.arrayOf(
        PropTypes.shape({
            subjectName: PropTypes.string,
            activityCount: PropTypes.number,
        })
    ).isRequired,
};

export default SummaryTable;