import React from 'react';
import PropTypes from 'prop-types';

const FilterSection = ({ subjects, selectedSubject, onSubjectChange, years, selectedYear, onYearChange, darkMode }) => {
    return (
        <div className="filter-section">
            <style>
                {`
                    .filter-section {
                        display: flex;
                        gap: 16px;
                        flex-wrap: wrap;
                    }
                    .form-label {
                        color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        font-weight: 600;
                        margin-bottom: 8px;
                        display: block;
                    }
                    .form-input {
                        width: 100%;
                        max-width: 200px;
                        padding: 8px;
                        border: 1px solid var(--border-color, ${darkMode ? '#374151' : '#e5e7eb'});
                        border-radius: 4px;
                        background-color: var(--bg-secondary, ${darkMode ? '#1f2937' : '#ffffff'});
                        color: var(--text-primary, ${darkMode ? '#ffffff' : '#333333'});
                        font-size: 0.875rem;
                    }
                    .form-input:focus {
                        border-color: var(--accent-primary, #007bff);
                        outline: none;
                    }
                `}
            </style>
            <div>
                <label className="form-label">Subject</label>
                <select
                    value={selectedSubject}
                    onChange={onSubjectChange}
                    className="form-input"
                >
                    <option value="">All Subjects</option>
                    {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="form-label">Year</label>
                <select
                    value={selectedYear}
                    onChange={onYearChange}
                    className="form-input"
                >
                    <option value="">All Years</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

FilterSection.propTypes = {
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSubject: PropTypes.string,
    onSubjectChange: PropTypes.func.isRequired,
    years: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedYear: PropTypes.string,
    onYearChange: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default FilterSection;