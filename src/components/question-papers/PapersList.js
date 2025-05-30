import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from './Tooltip';

const PapersList = ({ papers, selectedSubject, selectedYear, pdfLoading, onViewPdf, onDownloadPdf }) => {
    const filteredPapers = papers.filter(
        (paper) => paper.subject === selectedSubject && (!selectedYear || paper.year === selectedYear)
    );

    return (
        <section className="bg-teal-800/80 p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">Available Papers</h2>
            {filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                    <div
                        key={paper.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-teal-700/90 rounded-md shadow-sm hover:bg-teal-600/90 transition-colors duration-200 mb-3"
                    >
                        <Link
                            to={`/question-papers/${paper.id}`}
                            className="text-white text-sm sm:text-base font-medium hover:underline flex-1 mb-2 sm:mb-0"
                        >
                            {paper.title} ({paper.subject}, {paper.year})
                        </Link>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <Tooltip text="Preview in browser">
                                <button
                                    onClick={() => onViewPdf(paper.id)}
                                    disabled={pdfLoading}
                                    className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-400 disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-colors duration-200"
                                    aria-label={`View ${paper.title}`}
                                >
                                    {pdfLoading ? 'Loading...' : 'View'}
                                </button>
                            </Tooltip>
                            <Tooltip text="Save offline">
                                <button
                                    onClick={() => onDownloadPdf(paper.id, paper.title)}
                                    disabled={pdfLoading}
                                    className="px-3 py-1 bg-teal-500 text-white text-sm rounded-md hover:bg-teal-400 disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-colors duration-200"
                                    aria-label={`Download ${paper.title}`}
                                >
                                    {pdfLoading ? 'Loading...' : 'Download'}
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-200 text-sm sm:text-base">
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