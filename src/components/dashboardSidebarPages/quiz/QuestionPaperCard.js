import PropTypes from 'prop-types';
import React from 'react';

const QuestionPaperCard = ({ paper, onView }) => (
    <article
        className="bg-[#fafafa] bg-opacity-95 backdrop-blur-sm p-4 rounded-2xl shadow-[var(--shadow)] hover:shadow-lg transition-shadow duration-300 dark:bg-[#374151]"
    >
        <header className="mb-3">
            <h3 className="text-lg font-medium text-[var(--text-primary)]">{paper.fileName}</h3>
            <p className="text-sm text-[var(--text-secondary)]">Subject: {paper.subject?.subjectName || paper.subjectName || 'Unknown'}</p>
            <p className="text-sm text-[var(--text-secondary)]">Type: {paper.isInteractive ? 'Interactive' : 'PDF'}</p>
        </header>
        <button
            onClick={() => onView(paper, paper.fileName, paper.isInteractive)}
            className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-md hover:bg-[var(--hover-tertiary)] text-sm transition-colors duration-200"
            aria-label={`View digitized question paper: ${paper.fileName}`}
        >
            View Digitized Question Paper
        </button>
    </article>
);

QuestionPaperCard.propTypes = {
    paper: PropTypes.shape({
        id: PropTypes.number.isRequired,
        fileName: PropTypes.string.isRequired,
        subject: PropTypes.oneOfType([
            PropTypes.shape({
                subjectName: PropTypes.string,
            }),
            PropTypes.string,
        ]),
        isInteractive: PropTypes.bool,
    }).isRequired,
    onView: PropTypes.func.isRequired,
};

export default QuestionPaperCard;