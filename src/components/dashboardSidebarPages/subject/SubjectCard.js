import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ConfirmationModal from "../../common/ConfirmationModal";
import React, {useState} from "react";

const SubjectCard = ({ subject, onRemove }) => {
    console.log('SubjectCard subject:', subject);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleConfirmDelete = () => {
        onRemove(subject);
        setIsDeleteModalOpen(false);
    };

    return (
        <article className="bg-[var(--bg-secondary)] p-4 rounded-lg shadow-[var(--shadow)] hover:shadow-lg">
            <header className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-[var(--text-primary)]">{subject}</h3>
                <button
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="p-1 bg-[var(--accent-secondary)] text-white rounded-full hover:bg-[var(--hover-secondary)] transition-colors duration-200"
                    title="Remove subject"
                    aria-label={`Remove ${subject}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </header>
            <Link
                to={`/question-papers?subject=${encodeURIComponent(subject)}`}
                className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--hover-tertiary)] text-sm transition-colors duration-200"
                aria-label={`View past papers for ${subject}`}
            >
                Past Papers
            </Link>
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Subject Deletion"
                message={`Are you sure you want to delete the ${subject} subject? This action cannot be undone.`}
            />
        </article>
    );
};

SubjectCard.propTypes = {
    subject: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
};

export default SubjectCard;