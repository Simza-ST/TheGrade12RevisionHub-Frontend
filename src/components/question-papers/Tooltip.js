import PropTypes from 'prop-types';

/**
 * Tooltip component for hover-based instructional text
 * @param {Object} props - Component props
 * @param {string} text - Tooltip text
 * @param {React.ReactNode} children - Child elements (e.g., button)
 */
const Tooltip = ({ text, children }) => (
    <div className="relative group">
        {children}
        <div className="absolute hidden group-hover:block bg-teal-800 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10 max-w-xs whitespace-nowrap">
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-teal-800"></div>
        </div>
    </div>
);

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Tooltip;