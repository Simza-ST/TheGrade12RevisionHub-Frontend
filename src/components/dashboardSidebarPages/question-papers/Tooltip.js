import PropTypes from 'prop-types';

const Tooltip = ({ text, children }) => (
    <div className="relative group">
        {children}
        <div className="absolute hidden group-hover:block bg-[var(--bg-secondary)] text-[var(--text-primary)] text-xs rounded py-1 px-2 bottom-full left-1/2 transform-translate-x-1/2 mb-2 z-10 max-w-xs whitespace-nowrap">
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-[var(--bg-secondary)]"></div>
        </div>
    </div>
);

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Tooltip;