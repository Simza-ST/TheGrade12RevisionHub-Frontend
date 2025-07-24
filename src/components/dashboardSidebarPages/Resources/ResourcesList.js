import PropTypes from 'prop-types';
import Tooltip from './Tooltip';
import LoadingSpinner from './LoadingSpinner';

const ResourcesList = ({ resources, selectedSubject, selectedYear, resourceLoading, onViewResource, onDownloadResource }) => {
    const filteredResources = resources.filter((resource) => {
        const matchesSubject = !selectedSubject || resource.subject?.subjectName === selectedSubject;
        const matchesYear = !selectedYear || resource.year === selectedYear;
        return matchesSubject && matchesYear;
    });

    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredResources.length === 0 ? (
                <p className="col-span-full text-center text-[var(--text-secondary)]">
                    No resources found{selectedSubject ? ` for ${selectedSubject}` : ''}{selectedYear ? ` in ${selectedYear}` : ''}.
                </p>
            ) : (
                filteredResources.map((resource) => {
                    const fileExtension = resource.fileName?.split('.').pop()?.toLowerCase();
                    const isVideo = resource.resourceType === 'file' &&
                        (['mp4', 'webm'].includes(fileExtension) || resource.fileType?.includes('video/'));
                    const isLink = resource.resourceType === 'link';

                    return (
                        <div
                            key={resource.id}
                            className="service-card shadow-[var(--shadow)] rounded-lg p-4 hover:shadow-lg transition-shadow bg-[var(--bg-secondary)] relative"
                        >
                            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                                {resource.title}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] mb-2">
                                {resource.description || 'No description available'}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] mb-2">
                                Subject: {resource.subject?.subjectName || 'N/A'}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] mb-2">
                                Type: {resource.resourceType || 'N/A'}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] mb-2">
                                {isLink ? 'Link' : 'File'}: {isLink ? resource.url : resource.fileName || 'N/A'}
                            </p>
                            <p className="text-xs text-[var(--text-secondary)] mb-2">
                                Tags: {resource.tags?.join(', ') || 'None'}
                            </p>
                            <div className="mt-4 flex gap-2">
                                {isLink ? (
                                    <Tooltip text="Open link in new tab">
                                        <a
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                            aria-label={`View ${resource.title} link`}
                                        >
                                            View Link
                                        </a>
                                    </Tooltip>
                                ) : (
                                    <>
                                        <Tooltip text="View resource">
                                            <button
                                                onClick={() => onViewResource(resource)}
                                                disabled={resourceLoading}
                                                className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                                aria-label={`View ${resource.title}`}
                                            >
                                                View
                                            </button>
                                        </Tooltip>
                                        {!isVideo && (
                                            <Tooltip text="Download resource">
                                                <button
                                                    onClick={() => onDownloadResource(resource)}
                                                    disabled={resourceLoading}
                                                    className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                                                    aria-label={`Download ${resource.title}`}
                                                >
                                                    Download
                                                </button>
                                            </Tooltip>
                                        )}
                                    </>
                                )}
                            </div>
                            {resourceLoading && !isLink && (
                                <LoadingSpinner className="absolute -top-2 -right-2 h-5 w-5" />
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

ResourcesList.propTypes = {
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
            subject: PropTypes.shape({
                subjectName: PropTypes.string,
            }),
            year: PropTypes.string,
            resourceType: PropTypes.string,
            fileName: PropTypes.string,
            fileType: PropTypes.string,
            url: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
        })
    ).isRequired,
    selectedSubject: PropTypes.string,
    selectedYear: PropTypes.string,
    resourceLoading: PropTypes.bool.isRequired,
    onViewResource: PropTypes.func.isRequired,
    onDownloadResource: PropTypes.func.isRequired,
};

export default ResourcesList;