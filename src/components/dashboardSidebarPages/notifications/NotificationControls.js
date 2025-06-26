import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';

const NotificationControls = ({ filterType, setFilterType, markAllAsRead, deleteAllNotifications, unreadNotifications, totalNotifications }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: 'all', label: 'All Types' },
        { value: 'info', label: 'Info' },
        { value: 'warning', label: 'Warning' },
        { value: 'error', label: 'Error' },
        { value: 'birthday', label: 'Birthday' },
        { value: 'read', label: 'Read' },
        { value: 'unread', label: 'Unread' },
        { value: 'quiz', label: 'Quiz' },
    ];

    const handleOptionClick = (value) => {
        setFilterType(value);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <div className="flex justify-between items-center mb-4 gap-2">
            <style>{`
                .custom-select {
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: right 8px center;
                    background-size: 12px;
                    padding-right: 24px;
                    padding-left: 8px;
                    border: 1px solid var(--border-color, #374151);
                    border-radius: 4px;
                    background-color: var(--bg-secondary, #1f2937);
                    color: var(--text-primary, #ffffff);
                    font-size: 0.875rem;
                    min-height: 40px;
                    cursor: pointer;
                    width: 100px;
                }
                .icon-btn {
                    background-color: var(--bg-secondary, #1f2937);
                    border: 1px solid var(--border-color, #374151);
                    border-radius: 4px;
                    min-height: 36px;
                    width: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--text-primary, #ffffff);
                }
                .dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background-color: var(--bg-secondary, #1f2937);
                    border: 1px solid var(--border-color, #374151);
                    border-radius: 4px;
                    min-width: 100px;
                    z-index: 10;
                    max-height: 200px;
                    overflow-y: auto;
                    scroll-bar: hidden;
                    scrollbar-width: none;
                }
                .dropdown-item {
                    padding: 8px 12px;
                    color: var(--text-primary, #ffffff);
                    font-size: 0.875rem;
                    cursor: pointer;
                }
                .dropdown-item:hover {
                    background-color: var(--hover-primary, #0056b3);
                }
                .custom-btn {
                    background-color: var(--accent-primary, #007bff);
                    color: #ffffff;
                    border-radius: 4px;
                    border: none;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 36px;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.65rem;
                    line-height: 1;
                }
                .custom-btn:hover {
                    background-color: var(--hover-primary, #0056b3);
                }
                .custom-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                .delete-btn {
                    background-color: var(--accent-secondary, #dc3545);
                }
                .delete-btn:hover {
                    background-color: var(--hover-secondary, #b91c1c);
                }
                .truncate {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                @media (max-width: 639px) {
                    .custom-select {
                        display: none;
                    }
                    .icon-btn {
                        display: flex;
                    }
                    h2 {
                        font-size: 1rem !important;
                        line-height: 1.5rem !important;
                    }
                }
                @media (min-width: 640px) {
                    .custom-select {
                        display: block;
                    }
                    .icon-btn {
                        display: none;
                    }
                    .custom-btn {
                        padding: 0.75rem 0.5rem;
                        font-size: 0.75rem;
                        min-height: 40px;
                    }
                    h2 {
                        font-size: 1.25rem !important;
                        line-height: 1.75rem !important;
                    }
                }
                @media (min-width: 768px) {
                    h2 {
                        font-size: 1.5rem !important;
                        line-height: 2rem !important;
                    }
                }
            `}</style>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--text-primary)] flex-1 min-w-0 ">Your Notifications</h2>
            <div className="flex items-center gap-1 flex-shrink-0 relative" ref={dropdownRef}>
                <select
                    className="custom-select text-xs sm:text-sm min-w-[100px] h-[40px]"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    aria-label="Filter notifications"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <button
                    className="icon-btn"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-label="Toggle filter dropdown"
                >
                    <FiChevronDown size={16} />
                </button>
                {isDropdownOpen && (
                    <div className="dropdown">
                        {options.map((option) => (
                            <div
                                key={option.value}
                                className="dropdown-item"
                                onClick={() => handleOptionClick(option.value)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
                <button
                    onClick={markAllAsRead}
                    className="custom-btn min-w-[70px] whitespace-nowrap"
                    disabled={unreadNotifications === 0}
                    aria-label="Mark all as read"
                >
                    Mark All
                </button>
                <button
                    onClick={deleteAllNotifications}
                    className="custom-btn delete-btn min-w-[60px] whitespace-nowrap"
                    disabled={totalNotifications === 0}
                    aria-label="Delete all notifications"
                >
                    Delete All
                </button>
            </div>
        </div>
    );
};

NotificationControls.propTypes = {
    filterType: PropTypes.string.isRequired,
    setFilterType: PropTypes.func.isRequired,
    markAllAsRead: PropTypes.func.isRequired,
    deleteAllNotifications: PropTypes.func.isRequired,
    unreadNotifications: PropTypes.number.isRequired,
    totalNotifications: PropTypes.number.isRequired,
};

export default NotificationControls;