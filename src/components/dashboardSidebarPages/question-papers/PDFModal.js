import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import LoadingSpinner from './LoadingSpinner';

const PDFModal = ({ showModal, onClose, pdfUrl, currentPaper, pdfLoading, onDownloadPdf }) => {
    const closeModal = useCallback(() => {
        onClose();
        if (pdfUrl) {
            window.URL.revokeObjectURL(pdfUrl);
        }
    }, [onClose, pdfUrl]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape' && showModal) closeModal();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [showModal, closeModal]);

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
                        {currentPaper ? currentPaper.title : 'View PDF'}
                    </h2>
                    <button
                        onClick={closeModal}
                        className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] text-xl"
                        aria-label="Close modal"
                    >
                        ✕
                    </button>
                </div>
                {pdfLoading ? (
                    <LoadingSpinner className="h-[60vh]" />
                ) : (
                    pdfUrl && (
                        <iframe
                            src={pdfUrl}
                            className="w-full h-[60vh] rounded"
                            title="Past Paper PDF"
                        />
                    )
                )}
                {currentPaper && !pdfLoading && (
                    <button
                        onClick={() => onDownloadPdf(currentPaper.id, currentPaper.title)}
                        className="mt-3 text-[var(--accent-primary)] hover:underline px-2 py-1"
                        aria-label={`Download ${currentPaper.title}`}
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
    currentPaper: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
    }),
    pdfLoading: PropTypes.bool.isRequired,
    onDownloadPdf: PropTypes.func.isRequired,
};

export default PDFModal;