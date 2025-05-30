import Sidebar from "../Sidebar";
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubjectForm = ({ subjects, selectedSubject, onSubjectSelect, onSubmit, darkMode }) => (
    <form onSubmit={onSubmit} className="mb-6">
        <div className="mb-4">
            <label htmlFor="subject-select" className="block text-white mb-2 font-medium">
                Select a Subject
            </label>
            <select
                id="subject-select"
                value={selectedSubject}
                onChange={onSubjectSelect}
                className="p-3 border border-gray-600 rounded-lg w-full focus:ring-2 focus:ring-teal-400 bg-teal-700 text-white"
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
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg hover:from-teal-700 hover:to-red-700"
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