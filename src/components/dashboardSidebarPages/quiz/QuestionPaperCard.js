import PropTypes from 'prop-types';
import React from 'react';

const QuestionPaperCard = ({ paper, onView, darkMode }) => (
    <div>
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {paper.fileName || 'Untitled Paper'}
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
            Subject: {paper.subject?.subjectName || paper.subjectName || 'Unknown'}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
            Type: {paper.isInteractive ? 'Interactive' : 'PDF'}
        </p>
        <div className="mt-4">
            <button
                onClick={() => onView(paper, paper.fileName || 'Untitled Paper', paper.isInteractive || false)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                aria-label={`View digitized question paper: ${paper.fileName || 'Untitled Paper'}`}
            >
                View Paper
            </button>
        </div>
    </div>
);

QuestionPaperCard.propTypes = {
    paper: PropTypes.shape({
        id: PropTypes.number,
        fileName: PropTypes.string,
        subject: PropTypes.oneOfType([
            PropTypes.shape({
                subjectName: PropTypes.string,
            }),
            PropTypes.string,
        ]),
        isInteractive: PropTypes.bool,
    }).isRequired,
    onView: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

export default QuestionPaperCard;