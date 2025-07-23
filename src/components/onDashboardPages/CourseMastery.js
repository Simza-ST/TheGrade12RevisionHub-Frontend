import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const CourseMastery = ({ enrolledSubjects, darkMode }) => {
    const [masteryData, setMasteryData] = useState([]);
    const [sortBy, setSortBy] = useState('score');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';

    useEffect(() => {
        const fetchMasteryData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                };
                const response = await fetch(`${API_BASE_URL}/subject-mastery`, { headers });
                const data = await response.json();
                console.log('Fetch response:', data); // Debug log
                if (response.ok && data.success) {
                    const filteredData = data.data.filter(item =>
                        enrolledSubjects.includes(item.subjectName)
                    );
                    console.log('Filtered mastery data:', filteredData); // Debug log
                    setMasteryData(filteredData);
                } else {
                    console.error(data.message || 'Failed to fetch subject mastery data');
                }
            } catch (error) {
                console.error(`Error fetching subject mastery data: ${error.message}`);
            }
        };
        fetchMasteryData();
    }, [API_BASE_URL, enrolledSubjects]); // Ensure re-fetch on enrolledSubjects change

const calculateScore = (quizMarks, examMarks) => {
    return quizMarks !== null && examMarks !== null
        ? Math.round((quizMarks + examMarks) / 2)
        : 0;
};

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
            ? (calculateScore(a.quizMarks, a.examMarks) - calculateScore(b.quizMarks, b.examMarks)) * order
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
                                style={{ width: `${calculateScore(course.quizMarks, course.examMarks)}%` }}
                            ></div>
                        </div>
                        <span className="text-sm text-[var(--text-secondary)]">
                                {calculateScore(course.quizMarks, course.examMarks)}%
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
};

export default CourseMastery;