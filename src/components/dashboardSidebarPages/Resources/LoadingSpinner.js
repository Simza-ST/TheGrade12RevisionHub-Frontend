import PropTypes from 'prop-types';

const LoadingSpinner = ({ className = '' }) => (
    <div className={`flex justify-center items-center ${className}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
    </div>
);

LoadingSpinner.propTypes = {
    className: PropTypes.string,
};

export default LoadingSpinner;