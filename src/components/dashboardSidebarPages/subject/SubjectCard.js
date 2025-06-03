import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SubjectCard = ({ subject, onRemove }) => {
    console.log('SubjectCard subject:', subject);
    return (
        <article
            className="bg-[var(--bg-secondary)] bg-opacity-95 backdrop-blur-sm p-4 rounded-2xl shadow-[var(--shadow)] hover:shadow-lg transition-shadow duration-300"
        >
            <header className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[var(--text-primary)]">{subject}</h3>
                <button
                    onClick={() => onRemove(subject)}
                    className="p-1 bg-[var(--accent-secondary)] text-white rounded-full hover:bg-[var(--hover-secondary)] transition-colors duration-200"
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
                className="px-3 py-1 bg-[var(--accent-primary)] text-white rounded-md hover:bg-[var(--hover-primary)] text-sm transition-colors duration-200"
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