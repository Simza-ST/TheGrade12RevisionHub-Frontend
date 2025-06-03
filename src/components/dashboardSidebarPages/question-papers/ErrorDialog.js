import PropTypes from 'prop-types';

const ErrorDialog = ({ error, onRetry }) => (
    <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center text-center">
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <p className="text-[var(--accent-secondary)] mb-4">{error}</p>
            <button
                onClick={onRetry}
                className="text-[var(--accent-primary)] hover:underline px-4 py-2"
            >
                Retry
            </button>
        </div>
    </div>
);

ErrorDialog.propTypes = {
    error: PropTypes.string.isRequired,
    onRetry: PropTypes.func.isRequired,
};

export default ErrorDialog;