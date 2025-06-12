import PropTypes from 'prop-types';

const FilterSection = ({
                           subjects = [],
                           selectedSubject = '',
                           onSubjectChange,
                           years = [],
                           selectedYear = '',
                           onYearChange,
                       }) => (
        <div className="mb-6 flex gap-4">
            <label
                htmlFor="subjects-select"
                className="text-[var(--text-primary)] font-semibold text-lg"
            >
                Filter by Subject
            </label>
            <select
                id="subjects-select"
                value={selectedSubject}
                onChange={onSubjectChange}
                className="w-full sm:w-auto p-2 rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                aria-label="Select a subject"
            >
                <option value="" disabled>
                    Select a subject
                </option>
                {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                        <option
                            key={`${subject}-${index}`}
                            value={subject}
                            className="text-[var(--text-primary)]"
                        >
                            {subject}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        No subjects available
                    </option>
                )}
            </select>

            <label
                htmlFor="year-select"
                className="text-[var(--text-primary)] font-semibold text-lg"
            >
                Filter by Year
            </label>
            <select
                id="year-select"
                value={selectedYear}
                onChange={onYearChange}
                className="w-full sm:w-auto p-2 rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                aria-label="Select a year"
            >
                <option value="">All Years</option>
                {years.length > 0 ? (
                    years.map((year, index) => (
                        <option
                            key={`${year}-${index}`}
                            value={year}
                            className="text-[var(--text-primary)]"
                        >
                            {year}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        No years available
                    </option>
                )}
            </select>
        </div>
);

FilterSection.propTypes = {
    subjects: PropTypes.arrayOf(PropTypes.string),
    selectedSubject: PropTypes.string,
    onSubjectChange: PropTypes.func.isRequired,
    years: PropTypes.arrayOf(PropTypes.string),
    selectedYear: PropTypes.string,
    onYearChange: PropTypes.func.isRequired,
};

FilterSection.defaultProps = {
    subjects: [],
    selectedSubject: '',
    years: [],
    selectedYear: '',
};

export default FilterSection;