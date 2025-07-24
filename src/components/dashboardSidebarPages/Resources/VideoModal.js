import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const VideoModal = ({ showModal, onClose, resourceUrl, currentResource, resourceLoading }) => {
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
                    if (!contentType.includes('video/')) {
                        throw new Error(`Invalid content type received: ${contentType}`);
                    }
                    setResourceError(null);
                    setContentLoaded(true);
                })
                .catch((error) => {
                    console.error('Failed to fetch video URL:', error);
                    setResourceError(`Failed to load video ${currentResource?.title || 'resource'}: ${error.message}`);
                });
        }
    }, [resourceUrl, showModal, currentResource]);

    if (!showModal) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
        >
            <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <h2 id="video-modal-title" className="text-lg font-semibold text-[var(--text-primary)]">
                        {currentResource ? currentResource.title : 'View Video'}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-xl"
                        aria-label="Close video modal"
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
                    <video
                        controls
                        src={resourceUrl}
                        className="w-full h-[60vh] object-contain rounded"
                        onLoadedData={() => setContentLoaded(true)}
                        onError={(e) => {
                            console.error('Video error:', e);
                            setResourceError('Failed to play video. Please try again.');
                        }}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="text-center text-sm text-[var(--text-secondary)]">
                        No video URL provided
                    </div>
                )}
            </div>
        </div>
    );
};

VideoModal.propTypes = {
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
};

export default VideoModal;