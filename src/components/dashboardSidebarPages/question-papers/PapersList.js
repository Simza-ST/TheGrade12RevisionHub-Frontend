import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';

const PapersList = ({ papers, selectedSubject, selectedYear, pdfLoading, onViewPdf, onDownloadPdf }) => {
    const filteredPapers = papers.filter(
        (paper) => paper.subject === selectedSubject && (!selectedYear || paper.year === selectedYear)
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                    <div
                        key={paper.id}
                        className="service-card hover:shadow-lg"
                    >
                        <h3 className="text-lg font-medium text-[var(--text-primary)]">
                            <Link
                                to={`/question-papers/${paper.id}`}
                                className="hover:underline"
                            >
                                {paper.title}
                            </Link>
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">Subject: {paper.subject}</p>
                        <p className="text-sm text-[var(--accent-primary)]">Year: {paper.year}</p>
                        <div className="mt-4 flex gap-2">
                            <Tooltip text="Preview in browser">
                                <button
                                    onClick={() => onViewPdf(paper.id)}
                                    disabled={pdfLoading}
                                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                    aria-label={`View ${paper.title}`}
                                >
                                    {pdfLoading ? 'Loading...' : 'View'}
                                </button>
                            </Tooltip>
                            <Tooltip text="Save offline">
                                <button
                                    onClick={() => onDownloadPdf(paper.id, paper.title)}
                                    disabled={pdfLoading}
                                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                    aria-label={`Download ${paper.title}`}
                                >
                                    {pdfLoading ? 'Loading...' : 'Download'}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-[var(--text-secondary)] col-span-full">
                    {selectedSubject
                        ? `No papers for ${selectedSubject}${selectedYear ? ` (${selectedYear})` : ''}. Try another filter!`
                        : 'Select a subject to view papers.'}
                </p>
            )}
            <style>
                {`
                    .grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    .sm\\:grid-cols-2 {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .md\\:grid-cols-3 {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    .col-span-full {
                        grid-column: 1 / -1;
                    }
                    .service-card {
                        background-color: var(--bg-secondary);
                        padding: 16px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    .hover\\:shadow-lg:hover {
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
                    }
                    .text-[var(--text-primary)] {
                        color: var(--text-primary);
                    }
                    .text-[var(--text-secondary)] {
                        color: var(--text-secondary);
                    }
                    .text-[var(--accent-primary)] {
                        color: var(--accent-primary, #007bff);
                    }
                    .text-lg {
                        font-size: 1.125rem;
                        line-height: 1.75rem;
                    }
                    .text-sm {
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                    }
                    .font-medium {
                        font-weight: 500;
                    }
                    .mt-4 {
                        margin-top: 16px;
                    }
                    .flex {
                        display: flex;
                    }
                    .gap-2 {
                        gap: 8px;
                    }
                    .disabled\\:cursor-not-allowed:disabled {
                        cursor: not-allowed;
                    }
                    .disabled\\:opacity-50:disabled {
                        opacity: 0.5;
                    }
                    .hover\\:underline:hover {
                        text-decoration: underline;
                    }
                    @media (min-width: 640px) {
                        .sm\\:grid-cols-2 {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }
                    @media (min-width: 768px) {
                        .md\\:grid-cols-3 {
                            grid-template-columns: repeat(3, 1fr);
                        }
                    }
                `}
            </style>
        </div>
    );
};

PapersList.propTypes = {
    papers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            subject: PropTypes.string.isRequired,
            year: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedSubject: PropTypes.string.isRequired,
    selectedYear: PropTypes.string.isRequired,
    pdfLoading: PropTypes.bool.isRequired,
    onViewPdf: PropTypes.func.isRequired,
    onDownloadPdf: PropTypes.func.isRequired,
};

export default PapersList;