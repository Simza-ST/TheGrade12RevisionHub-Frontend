import React from 'react';
import PropTypes from 'prop-types';

const SubjectForm = ({ subjects, selectedSubject, onSubjectSelect, onSubmit, darkMode }) => (
    <form onSubmit={onSubmit} className="mb-6 bg-[var(--bg-secondary)] p-6 rounded-lg shadow-[var(--shadow)]">
        <div className="mb-4">
            <label htmlFor="subject-select" className="form-label">
                Select a Subject
            </label>
            <select
                id="subject-select"
                value={selectedSubject}
                onChange={onSubjectSelect}
                className="form-input"
                aria-label="Select a subject"
            >
                <option value="" disabled>
                    Choose a subject
                </option>
                {subjects.length > 0 ? (
                    subjects.map((subject, index) => (
                        <option key={`${subject}-${index}`} value={subject}>
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
            className="btn-primary"
        >
            Add Subject
        </button>
    </form>
);

SubjectForm.propTypes = {
    subjects: PropTypes.arrayOf(PropTypes.string),
    selectedSubject: PropTypes.string,
    onSubjectSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    darkMode: PropTypes.bool.isRequired,
};

SubjectForm.defaultProps = {
    subjects: [],
    selectedSubject: '',
    onSubmit: null,
};

export default SubjectForm;