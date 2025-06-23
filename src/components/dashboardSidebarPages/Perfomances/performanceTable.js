import React from 'react';
import PropTypes from 'prop-types';
import './PerformanceCSS.css';

const PerformanceTable = ({ performanceData, onSort, sortConfig }) => {
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  return (
    <div className="table-container">
      <table className="performance-table">
        <thead>
          <tr>
            <th onClick={() => onSort('subjectName')} className="cursor-pointer">
              Subject {getSortIndicator('subjectName')}
            </th>
            <th onClick={() => onSort('activityType')} className="cursor-pointer">
              Activity Type {getSortIndicator('activityType')}
            </th>
            <th onClick={() => onSort('activityName')} className="cursor-pointer">
              Activity Name {getSortIndicator('activityName')}
            </th>
            <th onClick={() => onSort('date')} className="cursor-pointer">
              Date {getSortIndicator('date')}
            </th>
            <th onClick={() => onSort('score')} className="cursor-pointer">
              Score (%) {getSortIndicator('score')}
            </th>
            <th onClick={() => onSort('maxScore')} className="cursor-pointer">
              Max Score {getSortIndicator('maxScore')}
            </th>
            <th onClick={() => onSort('timeSpent')} className="cursor-pointer">
              Time Spent (min) {getSortIndicator('timeSpent')}
            </th>
            <th onClick={() => onSort('difficulty')} className="cursor-pointer">
              Difficulty Level {getSortIndicator('difficulty')}
            </th>
            <th onClick={() => onSort('status')} className="cursor-pointer">
              Status {getSortIndicator('status')}
            </th>
            <th onClick={() => onSort('comments')} className="cursor-pointer">
              Comments {getSortIndicator('comments')}
            </th>
          </tr>
        </thead>
        <tbody>
          {performanceData && performanceData.length > 0 ? (
            performanceData.map((data, index) => (
              <tr key={data.id || index}>
                <td>{data.subjectName || 'N/A'}</td>
                <td>{data.activityType || 'N/A'}</td>
                <td>{data.activityName || 'N/A'}</td>
                <td>
                  {data.date ? new Date(data.date).toLocaleDateString('en-CA') : 'N/A'}
                </td>
                <td>{data.score != null ? data.score : 'N/A'}</td>
                <td>{data.maxScore != null ? data.maxScore : 'N/A'}</td>
                <td>{data.timeSpent != null ? data.timeSpent : 'N/A'}</td>
                <td>{data.difficulty || 'N/A'}</td>
                <td>{data.status || 'N/A'}</td>
                <td>{data.comments || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center text-[var(--text-secondary)]">
                No performance data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

PerformanceTable.propTypes = {
  performanceData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      subjectName: PropTypes.string,
      activityType: PropTypes.string,
      activityName: PropTypes.string,
      date: PropTypes.string,
      score: PropTypes.number,
      maxScore: PropTypes.number,
      timeSpent: PropTypes.number,
      difficulty: PropTypes.string,
      status: PropTypes.string,
      comments: PropTypes.string,
    })
  ).isRequired,
  onSort: PropTypes.func.isRequired,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }).isRequired,
};

export default PerformanceTable;