import PropTypes from 'prop-types';

/**
 * FilterSection component for subject and year selection
 * @param {Object} props - Component props
 * @param {string[]} subjects - List of available subjects
 * @param {string} selectedSubject - Currently selected subject
 * @param {Function} onSubjectChange - Handler for subject change
 * @param {string[]} years - List of available years
 * @param {string} selectedYear - Currently selected year
 * @param {Function} onYearChange - Handler for year change
 * @param {boolean} darkMode - Dark mode state
 */
const FilterSection = ({
                           subjects,
                           selectedSubject,
                           onSubjectChange,
                           years,
                           selectedYear,
                           onYearChange,
                           darkMode,
                       }) => (
    <section className="mb-4">
        <div className="bg-teal-900 bg-opacity-90 p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center">
            <label htmlFor="subject-select" className="text-white font-semibold text-lg">
                Filter by Subject
            </label>
            <select
                id="subject-select"
                value={selectedSubject}
                onChange={onSubjectChange}
                className={`w-full sm:w-auto p-2 rounded bg-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 ${darkMode ? 'dark:bg-teal-800' : ''}`}
                aria-label="Select a subject"
            >
                <option value="" disabled>
                    Select a subject
                </option>
                {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                        <option key={index} value={subject} className="text-white">
                            {subject}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        No subjects available
                    </option>
                )}
            </select>
            <label htmlFor="year-select" className="text-white font-semibold text-lg">
                Filter by Year
            </label>
            <select
                id="year-select"
                value={selectedYear}
                onChange={onYearChange}
                className={`w-full sm:w-auto p-2 rounded bg-teal-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 ${darkMode ? 'dark:bg-teal-800' : ''}`}
                aria-label="Select a year"
            >
                <option value="">All Years</option>
                {years.map((year, index) => (
                    <option key={index} value={year} className="text-white">
                        {year}
                    </option>
                ))}
            </select>
        </div>
    </section>
);

FilterSection.propTypes = {
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSubject: PropTypes.string.isRequired,
    onSubjectChange: PropTypes.func.isRequired,
    years: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedYear: PropTypes.string.isRequired,
    onYearChange: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default FilterSection;