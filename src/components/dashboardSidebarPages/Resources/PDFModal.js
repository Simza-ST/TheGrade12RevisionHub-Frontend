import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFModal = ({ showModal, onClose, pdfUrl, currentPaper, pdfLoading, onDownloadPdf }) => {
    if (!showModal) return null;

    return (
        <div className="modal">
            <style>
                {`
                    .modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .modal-content {
                        background-color: var(--bg-secondary, #ffffff);
                        padding: 24px;
                        border-radius: 8px;
                        max-width: 90%;
                        max-height: 90%;
                        overflow: auto;
                        position: relative;
                    }
                    .btn-primary {
                        background-color: var(--accent-primary, #007bff);
                        color: #ffffff;
                        padding: 8px 16px;
                        border-radius: 4px;
                        border: none;
                        cursor: pointer;
                        margin-right: 8px;
                    }
                    .btn-primary:hover {
                        background-color: var(--hover-primary, #0056b3);
                    }
                    .btn-secondary {
                        background-color: var(--bg-tertiary, #e5e7eb);
                        color: var(--text-primary, #333333);
                        padding: 8px 16px;
                        border-radius: 4px;
                        border: none;
                        cursor: pointer;
                    }
                    .btn-secondary:hover {
                        background-color: var(--hover-tertiary, #d1d5db);
                    }
                    .flex {
                        display: flex;
                    }
                    .justify-end {
                        justify-content: flex-end;
                    }
                    .mt-4 {
                        margin-top: 16px;
                    }
                    .text-center {
                        text-align: center;
                    }
                    .text-sm {
                        font-size: 0.875rem;
                        line-height: 1.25rem;
                    }
                    .text-[var(--text-secondary)] {
                        color: var(--text-secondary, #666666);
                    }
                `}
            </style>
            <div className="modal-content">
                {pdfLoading ? (
                    <div className="text-center text-sm text-[var(--text-secondary)]">Loading PDF...</div>
                ) : pdfUrl ? (
                    <Document
                        file={pdfUrl}
                        onLoadError={(error) => {
                            console.error('PDF Load Error:', error);
                            alert(`Failed to load ${currentPaper?.fileName}: ${error.message}`);
                        }}
                    >
                        <Page pageNumber={1} width={600} />
                    </Document>
                ) : (
                    <div className="text-center text-sm text-[var(--text-secondary)]">Failed to load PDF</div>
                )}
                <div className="flex justify-end mt-4">
                    {currentPaper && (
                        <button
                            onClick={() => onDownloadPdf(currentPaper)}
                            className="btn-primary"
                            disabled={pdfLoading}
                        >
                            Download
                        </button>
                    )}
                    <button onClick={onClose} className="btn-secondary">
                        Close
                    </button>
                </div>
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
        fileName: PropTypes.string,
        url: PropTypes.string,
    }),
    pdfLoading: PropTypes.bool.isRequired,
    onDownloadPdf: PropTypes.func.isRequired,
};

export default PDFModal;