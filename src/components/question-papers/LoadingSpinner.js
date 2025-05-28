import PropTypes from 'prop-types';

/**
 * LoadingSpinner component to display a spinning loader
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 */
const LoadingSpinner = ({ className = '' }) => (
    <div className={`flex justify-center items-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400"></div>
    </div>
);

LoadingSpinner.propTypes = {
    className: PropTypes.string,
};

export default LoadingSpinner;