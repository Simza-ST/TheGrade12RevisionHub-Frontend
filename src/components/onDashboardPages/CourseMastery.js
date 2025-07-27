import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const CourseMastery = ({ enrolledSubjects, darkMode, API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262' }) => {
    const [masteryData, setMasteryData] = useState([]);
    const [sortBy, setSortBy] = useState('score');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMasteryData = async () => {
            try {
                const jwt = sessionStorage.getItem('jwt');
                if (!jwt) {
                    console.error('No JWT token found in sessionStorage');
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
                        const filteredData = data.data.filter(item =>
                            enrolledSubjects.includes(item.subjectName)
                        );
                        console.log('Filtered mastery data:', filteredData);
                        setMasteryData(filteredData);
                    } else {
                        console.error('Server error:', data.message || 'Failed to fetch subject mastery data');
                    }
                } catch (jsonError) {
                    console.error('JSON parse error:', jsonError.message, 'Raw response:', text);
                }
            } catch (error) {
                console.error(`Error fetching subject mastery data: ${error.message}`);
            }
        };
        fetchMasteryData();
    }, [API_BASE_URL, enrolledSubjects]);

    const sortedCourses = useMemo(() => {
        let result = [...masteryData];
        if (searchTerm) {
            result = result.filter((course) =>
                course.subjectName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        result.sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            return sortBy === 'score'
                ? (a.progress - b.progress) * order
                : a.subjectName.localeCompare(b.subjectName) * order;
        });
        return result;
    }, [masteryData, sortBy, sortOrder, searchTerm]);

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl h-[500px] flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)] text-center">Subject Mastery</h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] w-full sm:w-1/2"
                    aria-label="Search subject"
                />
                <div className="flex items-center gap-2">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-3 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                        aria-label="Sort by"
                    >
                        <option value="score">Score</option>
                        <option value="name">Name</option>
                    </select>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-4 py-3 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] whitespace-nowrap"
                        aria-label={`Sort order: ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
                    >
                        {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
                    </button>
                </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto">
                {sortedCourses.map((course) => (
                    <div key={course.subjectName} className="flex items-center space-x-4">
                        <div className="w-1/3 text-[var(--text-primary)]">{course.subjectName}</div>
                        <div className="w-2/3">
                            <div className="bg-[var(--border)] rounded-full h-4">
                                <div
                                    className="bg-[var(--accent-primary)] h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.round(course.progress)}%` }}
                                ></div>
                            </div>
                            <span className="text-sm text-[var(--text-secondary)]">
                                {Math.round(course.progress)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

CourseMastery.propTypes = {
    enrolledSubjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    darkMode: PropTypes.bool.isRequired,
    API_BASE_URL: PropTypes.string,
};

CourseMastery.defaultProps = {
    API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:6262',
};

export default CourseMastery;