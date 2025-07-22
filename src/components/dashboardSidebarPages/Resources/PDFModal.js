import PropTypes from 'prop-types';
import { useEffect, useCallback, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const PDFModal = ({ showModal, onClose, pdfUrl, currentResource, pdfLoading, onDownloadPdf }) => {
    const [pdfError, setPdfError] = useState(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const closeModal = useCallback(() => {
        onClose();
        if (pdfUrl && pdfUrl.startsWith('blob:')) {
            window.URL.revokeObjectURL(pdfUrl);
        }
        setPdfError(null);
        setIframeLoaded(false);
    }, [onClose, pdfUrl]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape' && showModal) closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showModal, closeModal]);

    useEffect(() => {
        if (pdfUrl && showModal) {
            // Verify the PDF URL is accessible
            fetch(pdfUrl, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    setPdfError(null);
                })
                .catch((error) => {
                    console.error('Failed to fetch pdfUrl:', error);
                    setPdfError(`Failed to load ${currentResource?.title || 'resource'}: ${error.message}`);
                });
        }
    }, [pdfUrl, showModal, currentResource]);

    if (!showModal) return null;

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
                {pdfLoading && !iframeLoaded ? (
                    <LoadingSpinner className="h-[60vh]" />
                ) : pdfError ? (
                    <div className="text-center text-sm text-[var(--accent-secondary)] p-4 bg-[rgba(220,53,69,0.1)] rounded">
                        {pdfError}
                    </div>
                ) : pdfUrl ? (
                    <>
                        <iframe
                            src={pdfUrl}
                            className="w-full h-[60vh] rounded"
                            title={currentResource?.title || 'Resource Viewer'}
                            onLoad={() => setIframeLoaded(true)}
                            onError={(e) => {
                                console.error('Iframe error:', e);
                                setPdfError('Failed to display document. Please try downloading instead.');
                            }}
                            style={{ border: 'none', display: iframeLoaded ? 'block' : 'none' }}
                            sandbox="allow-same-origin allow-scripts"
                        />
                        {!iframeLoaded && !pdfLoading && (
                            <div className="h-[60vh] flex items-center justify-center">
                                <p className="text-[var(--text-secondary)]">Loading document...</p>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center text-sm text-[var(--text-secondary)]">
                        No document URL provided
                    </div>
                )}
                {currentResource && iframeLoaded && (
                    <button
                        onClick={() => onDownloadPdf(currentResource)}
                        className="mt-3 text-[var(--accent-primary)] hover:underline px-2 py-1"
                        aria-label={`Download ${currentResource?.title || 'resource'}`}
                    >
                        Download PDF
                    </button>
                )}
            </div>
        </div>
    );
};

PDFModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    pdfUrl: PropTypes.string,
    currentResource: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    }),
    pdfLoading: PropTypes.bool.isRequired,
    onDownloadPdf: PropTypes.func.isRequired,
};

export default PDFModal;