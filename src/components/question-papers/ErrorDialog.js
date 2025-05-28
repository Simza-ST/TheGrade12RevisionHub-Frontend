import PropTypes from 'prop-types';

/**
 * ErrorDialog component to display error messages with a retry option
 * @param {Object} props - Component props
 * @param {string} error - Error message to display
 * @param {Function} onRetry - Function to call on retry
 */
const ErrorDialog = ({ error, onRetry }) => (
    <div className="flex min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-red-900 justify-center items-center text-center">
        <div className="bg-teal-900 bg-opacity-90 p-6 rounded-lg shadow-lg">
            <p className="text-red-400 mb-4">{error}</p>
            <button
                onClick={onRetry}
                className="text-teal-400 hover:underline px-4 py-2"
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