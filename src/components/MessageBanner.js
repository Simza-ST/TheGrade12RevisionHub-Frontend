import Sidebar from "./Sidebar";
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MessageBanner = ({ message, type }) => (
    message && (
        <div
            className={`p-4 mb-4 rounded-lg ${
                type === 'success' ? 'bg-teal-700 text-white' : 'bg-red-700 text-white'
            }`}
        >
            {message}
        </div>
    )
);

MessageBanner.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
};
export default MessageBanner;