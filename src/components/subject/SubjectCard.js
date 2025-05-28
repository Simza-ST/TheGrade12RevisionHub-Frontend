import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SubjectCard = ({ subject, onRemove, colorClass = 'bg-blue-800' }) => {
    console.log('SubjectCard subject:', subject); // Debug subject prop
    return (
        <div
            className={`${colorClass} bg-opacity-80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-3`}
        >
            <div className="flex items-center justify-between">
                <span className="text-lg font-medium text-white">{subject}</span>
                <button
                    onClick={() => onRemove(subject)}
                    className="p-1 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
                    title="Remove subject"
                    aria-label={`Remove ${subject}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 000 2v10a2 2 0 002 2h8a2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 00011 0 0011 2H9zM7 8a1 1 0 012 0v6a1 0 11-2 0V8zm5-1a1 0 00-1 1v6a1 0 102 0V8a1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            <div className="flex gap-2">
                <Link
                    to={`/courses/${encodeURIComponent(subject)}/past-papers`}
                    onClick={() => console.log('Navigating to:', `/courses/${encodeURIComponent(subject)}/past-papers`)}
                    className="px-3 py-1 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm transition-colors"
                    aria-label={`View past papers for ${subject}`}
                >
                    Past Papers
                </Link>
            </div>
        </div>
    );
};

SubjectCard.propTypes = {
    subject: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    colorClass: PropTypes.string,
};

SubjectCard.defaultProps = {
    colorClass: 'bg-blue-800',
};

export default SubjectCard;