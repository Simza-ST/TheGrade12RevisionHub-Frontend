import React from 'react';
import PropTypes from 'prop-types';

const SubjectForm = ({ subjects, selectedSubject, onSubjectSelect, onSubmit, darkMode }) => (
    <form onSubmit={onSubmit} className="mb-6">
        <div className="mb-4">
            <label htmlFor="subject-select" className="block text-[var(--text-primary)] mb-2 font-medium">
                Select a Subject
            </label>
            <select
                id="subject-select"
                value={selectedSubject}
                onChange={onSubjectSelect}
                className="p-3 border border-[var(--border)] rounded-lg w-full focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors duration-200"
            >
                <option value="" disabled>
                    Choose a subject
                </option>
                {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                            {subject}
                        </option>
                    ))
                ) : (
                    <option value="" disabled>
                        No subjects available
                    </option>
                )}
            </select>
        </div>
        <button
            type="submit"
            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)] transition-colors duration-200"
        >
            Add Subject
        </button>
    </form>
);

SubjectForm.propTypes = {
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedSubject: PropTypes.string.isRequired,
    onSubjectSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default SubjectForm;