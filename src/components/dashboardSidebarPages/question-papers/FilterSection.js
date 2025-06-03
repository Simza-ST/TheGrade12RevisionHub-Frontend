import PropTypes from 'prop-types';

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
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-4 items-center">
            <label htmlFor="subject-select" className="text-[var(--text-primary)] font-semibold text-lg">
                Filter by Subject
            </label>
            <select
                id="subject-select"
                value={selectedSubject}
                onChange={onSubjectChange}
                className="w-full sm:w-auto p-2 rounded bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                aria-label="Select a subject"
            >
                <option value="" disabled>
                    Select a subject
                </option>
                {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                        <option key={index} value={subject} className="text-[var(--text-primary)]">
                            {subject}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        No subjects available
                    </option>
                )}
            </select>
            <label htmlFor="year-select" className="text-[var(--text-primary)] font-semibold text-lg">
                Filter by Year
            </label>
            <select
                id="year-select"
                value={selectedYear}
                onChange={onYearChange}
                className="w-full sm:w-auto p-2 rounded bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                aria-label="Select a year"
            >
                <option value="">All Years</option>
                {years.map((year, index) => (
                    <option key={index} value={year} className="text-[var(--text-primary)]">
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