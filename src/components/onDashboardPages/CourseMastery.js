import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const CourseMastery = ({ enrolledSubjects, darkMode, courses }) => {
    const [sortBy, setSortBy] = useState('score');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');

    const sortedCourses = useMemo(() => {
        let result = [...courses].filter(course => enrolledSubjects.includes(course.name));
        if (searchTerm) {
            result = result.filter((course) =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        result.sort((a, b) => {
            const order = sortOrder === 'asc' ? 1 : -1;
            return sortBy === 'score'
                ? (a.progress - b.progress) * order
                : a.name.localeCompare(b.name) * order;
        });
        return result;
    }, [courses, sortBy, sortOrder, searchTerm, enrolledSubjects]);

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
                    <div key={course.name} className="flex items-center space-x-4">
                        <div className="w-1/3 text-[var(--text-primary)]">{course.name}</div>
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
    courses: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default CourseMastery;