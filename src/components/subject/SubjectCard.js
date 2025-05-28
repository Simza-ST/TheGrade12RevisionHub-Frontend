import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SubjectCard = ({ subject, onRemove }) => {
    console.log('SubjectCard subject:', subject);
    return (
        <article
            className="bg-teal-800/80 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
            <header className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-white">{subject}</h3>
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
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </header>
            <Link
                to={`/question-papers?subject=${encodeURIComponent(subject)}`}
                className="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-400 text-sm transition-colors"
                aria-label={`View past papers for ${subject}`}
            >
                Past Papers
            </Link>
        </article>
    );
};

SubjectCard.propTypes = {
    subject: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default SubjectCard;