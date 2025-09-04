import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">{title}</h3>
                <p className="text-[var(--text-secondary)] mb-6">{message}</p>
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-gray-100)]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-[var(--accent-red)] ext-[var(--text-primary)] rounded-lg hover:bg-red-600"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default ConfirmationModal;