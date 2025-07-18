import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Tooltip from '../../dashboardSidebarPages/question-papers/Tooltip';

const ResourcesList = ({ resources, selectedSubject, selectedYear, pdfLoading, onViewPdf, onDownloadPdf }) => {
    const filteredResources = resources.filter((resource) => {
        const matchesSubject = selectedSubject ? resource.subject?.subjectName === selectedSubject : true;
        const matchesYear = selectedYear ? resource.year === selectedYear : true;
        return matchesSubject && matchesYear;
    });

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredResources.length > 0 ? (
                filteredResources.map((resource) => (
                    <div
                        key={resource.id}
                        className="service-card"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-[var(--text-primary)]">
                                {resource.title}
                            </h3>
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                            Subject: {resource.subject?.subjectName || 'Unknown'}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)] mb-2">
                            Year: {resource.year || 'N/A'}
                        </p>
                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                            File: {resource.fileName}
                        </p>
                        <div className="flex gap-2">
                            <Tooltip text="Preview in browser">
                                <button
                                    onClick={() => onViewPdf(resource)}
                                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                    disabled={pdfLoading}
                                >
                                    View
                                </button>
                            </Tooltip>
                            <Tooltip text="Download resource">
                                <button
                                    onClick={() => onDownloadPdf(resource)}
                                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                    disabled={pdfLoading}
                                >
                                    Download
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                ))
            ) : (
                <p className="col-span-full text-[var(--text-secondary)] text-center">
                    No resources available for the selected filters.
                </p>
            )}
        </div>
    );
};

ResourcesList.propTypes = {
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            subject: PropTypes.shape({
                subjectName: PropTypes.string,
            }),
            year: PropTypes.string,
            fileName: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedSubject: PropTypes.string,
    selectedYear: PropTypes.string,
    pdfLoading: PropTypes.bool.isRequired,
    onViewPdf: PropTypes.func.isRequired,
    onDownloadPdf: PropTypes.func.isRequired,
};

export default ResourcesList;