import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';

const PapersList = ({ papers, selectedSubject, selectedYear, pdfLoading, onViewPdf, onDownloadPdf }) => {
    const filteredPapers = papers.filter(
        (paper) => paper.subject === selectedSubject && (!selectedYear || paper.year === selectedYear)
    );

    return (
        <section className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl">
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] mb-4">Available Papers</h2>
            {filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                    <div
                        key={paper.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-[var(--bg-secondary)] rounded-md shadow-sm hover:bg-[var(--hover-primary)] transition-colors duration-200 mb-3"
                    >
                        <Link
                            to={`/question-papers/${paper.id}`}
                            className="text-[var(--text-primary)] text-sm sm:text-base font-medium hover:underline flex-1 mb-2 sm:mb-0"
                        >
                            {paper.title} ({paper.subject}, {paper.year})
                        </Link>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Tooltip text="Preview in browser">
                                <button
                                    onClick={() => onViewPdf(paper.id)}
                                    disabled={pdfLoading}
                                    className="px-3 py-1 bg-[var(--accent-primary)] text-[var(--text-primary)] text-sm rounded-md hover:bg-[var(--hover-primary)] disabled:bg-[var(--border)] disabled:hover:bg-[var(--border)] transition-colors duration-200"
                                    aria-label={`View ${paper.title}`}
                                >
                                    {pdfLoading ? 'Loading...' : 'View'}
                                </button>
                            </Tooltip>
                            <Tooltip text="Save offline">
                                <button
                                    onClick={() => onDownloadPdf(paper.id, paper.title)}
                                    disabled={pdfLoading}
                                    className="px-3 py-1 bg-[var(--accent-primary)] text-[var(--text-primary)] text-sm rounded-md hover:bg-[var(--hover-primary)] disabled:bg-[var(--border)] disabled:hover:bg-[var(--border)] transition-colors duration-200"
                                    aria-label={`Download ${paper.title}`}
                                >
                                    {pdfLoading ? 'Loading...' : 'Download'}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-[var(--text-secondary)] text-sm sm:text-base">
                    {selectedSubject
                        ? `No papers for ${selectedSubject}${selectedYear ? ` (${selectedYear})` : ''}. Try another filter!`
                        : 'Select a subject to view papers.'}
                </p>
            )}
        </section>
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