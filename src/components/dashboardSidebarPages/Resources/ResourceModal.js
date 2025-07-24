import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ResourceModal = ({ showModal, onClose, resourceUrl, currentResource, resourceLoading, onDownloadResource }) => {
    const [resourceError, setResourceError] = useState(null);
    const [contentLoaded, setContentLoaded] = useState(false);

    const closeModal = useCallback(() => {
        onClose();
        if (resourceUrl && resourceUrl.startsWith('blob:')) {
            window.URL.revokeObjectURL(resourceUrl);
        }
        setResourceError(null);
        setContentLoaded(false);
    }, [onClose, resourceUrl]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape' && showModal) closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showModal, closeModal]);

    useEffect(() => {
        if (resourceUrl && showModal) {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                setResourceError('No authentication token found. Please log in.');
                return;
            }
            fetch(resourceUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    const contentType = response.headers.get('Content-Type');
                    if (!contentType.includes('application/pdf') && !contentType.includes('image/')) {
                        throw new Error(`Invalid content type received: ${contentType}`);
                    }
                    setResourceError(null);
                    setContentLoaded(true);
                })
                .catch((error) => {
                    console.error('Failed to fetch resourceUrl:', error);
                    setResourceError(`Failed to load ${currentResource?.title || 'resource'}: ${error.message}`);
                });
        }
        }, [resourceUrl, showModal, currentResource]);

    if (!showModal) return null;

    const fileExtension = currentResource?.fileName?.split('.').pop()?.toLowerCase();
    const isImage = ['png', 'jpg', 'jpeg'].includes(fileExtension) ||
        currentResource?.fileType?.includes('image/');

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <h2 id="modal-title" className="text-lg font-semibold text-[var(--text-primary)]">
                        {currentResource ? currentResource.title : 'View Resource'}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-xl"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>
                {resourceLoading && !contentLoaded ? (
                    <LoadingSpinner className="h-[60vh]" />
                ) : resourceError ? (
                    <div className="text-center text-sm text-[var(--accent-secondary)] p-4 bg-[rgba(220,53,69,0.1)] rounded">
                        {resourceError}
                    </div>
                ) : resourceUrl ? (
                    <>
                        {isImage ? (
                            <img
                                src={resourceUrl}
                                alt={currentResource?.title || 'Resource'}
                                className="w-full h-[60vh] object-contain rounded"
                                onLoad={() => setContentLoaded(true)}
                                onError={(e) => {
                                    console.error('Image error:', e);
                                    setResourceError('Failed to display image. Please try downloading instead.');
                                }}
                            />
                        ) : (
                            <object
                                data={resourceUrl}
                                type="application/pdf"
                                className="w-full h-[60vh] rounded"
                                title={currentResource?.title || 'Resource Viewer'}
                            >
                                <p className="text-[var(--text-secondary)]">
                                    Unable to display PDF.{' '}
                                    <a
                                        href={resourceUrl}
                                        download={currentResource?.fileName || 'resource.pdf'}
                                        className="text-[var(--accent-primary)] hover:underline"
                                    >
                                        Download instead
                                    </a>.
                                </p>
                            </object>
                        )}
                        {contentLoaded && (
                            <button
                                onClick={() => onDownloadResource(currentResource)}
                                className="mt-3 text-[var(--accent-primary)] hover:underline px-2 py-1"
                                aria-label={`Download ${currentResource?.title || 'resource'}`}
                            >
                                Download Resource
                            </button>
                        )}
                    </>
                ) : (
                    <div className="text-center text-sm text-[var(--text-secondary)]">
                        No resource URL provided
                    </div>
                )}
            </div>
        </div>
    );
};

ResourceModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    resourceUrl: PropTypes.string,
    currentResource: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        fileName: PropTypes.string,
        fileType: PropTypes.string,
    }),
    resourceLoading: PropTypes.bool.isRequired,
    onDownloadResource: PropTypes.func.isRequired,
};

export default ResourceModal;