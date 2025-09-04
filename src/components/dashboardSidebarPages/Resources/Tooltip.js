import React from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ text, children }) => {
    return (
        <div className="tooltip">
            <style>
                {`
                    .tooltip {
                        position: relative;
                        display: inline-block;
                    }
                    .tooltip:hover .tooltip-text {
                        visibility: visible;
                        opacity: 1;
                    }
                    .tooltip-text {
                        visibility: hidden;
                        opacity: 0;
                        background-color: var(--bg-tertiary, #e5e7eb);
                        color: var(--text-primary, #333333);
                        text-align: center;
                        border-radius: 4px;
                        padding: 4px 8px;
                        position: absolute;
                        z-index: 10;
                        bottom: 100%;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 0.75rem;
                        white-space: nowrap;
                        transition: opacity 0.2s ease;
                    }
                `}
            </style>
            {children}
            <span className="tooltip-text">{text}</span>
        </div>
    );
};

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Tooltip;