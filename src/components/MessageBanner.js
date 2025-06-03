import PropTypes from 'prop-types';

const MessageBanner = ({ message, type }) => {
    if (!message) return null;

    const bannerStyle = type === 'success'
        ? 'bg-[var(--success-bg)] text-white'
        : 'bg-[var(--error-bg)] text-white';

    return (
        <div className={`p-4 mb-4 rounded-2xl bg-opacity-95 backdrop-blur-sm shadow-[var(--shadow)] ${bannerStyle}`}>
            {message}
        </div>
    );
};

MessageBanner.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']).isRequired,
};

export default MessageBanner;