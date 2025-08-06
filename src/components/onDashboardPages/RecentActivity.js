import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmationModal from '../dashboardSidebarPages/chatroom/ConfirmationModal';

const RecentActivity = ({ activities, setActivities, API_BASE_URL }) => {
    const [modalState, setModalState] = useState({ isOpen: false, type: 'confirm', message: '', title: '' });

    const handleDeleteAll = async () => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${API_BASE_URL}/api/user/activities`, {
                method: 'DELETE',
                headers,
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setActivities([]);
                setModalState({
                    isOpen: true,
                    type: 'result',
                    title: 'Success',
                    message: 'All activities deleted successfully',
                });
            } else {
                setModalState({
                    isOpen: true,
                    type: 'result',
                    title: 'Error',
                    message: data.message || 'Failed to delete activities',
                });
            }
        } catch (error) {
            setModalState({
                isOpen: true,
                type: 'result',
                title: 'Error',
                message: 'Failed to delete activities: ' + error.message,
            });
        }
    };

    const handleDownload = () => {
        // Convert activities to CSV format
        const headers = ['ID,Description,Date'];
        const rows = activities.map(activity => [
            activity.id,
            `"${activity.description.replace(/"/g, '""')}"`, // Escape quotes in description
            new Date(activity.date).toLocaleString(),
        ].join(','));
        const csvContent = [headers, ...rows].join('\n');

        // Create a Blob and trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'recent_activities.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, type: '', message: '', title: '' })}
                onConfirm={modalState.type === 'confirm' ? handleDeleteAll : () => setModalState({ isOpen: false, type: '', message: '', title: '' })}
                title={modalState.title}
                message={modalState.message}
            />
            <div className="flex items-center justify-between mb-4">
                {activities.length > 0 && (
                    <button
                        className="text-[var(--text-secondary)] hover:text-blue-500 transition"
                        onClick={handleDownload}
                        aria-label="Download all activities"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                    </button>
                )}
                <h2 className="text-xl font-semibold text-[var(--text-primary)] flex-1 text-center">Recent Activity</h2>
                {activities.length > 0 && (
                    <button
                        className="text-[var(--text-secondary)] hover:text-red-500 transition"
                        onClick={() =>
                            setModalState({
                                isOpen: true,
                                type: 'confirm',
                                title: 'Confirm Delete',
                                message: 'Are you sure you want to delete all activities? This action cannot be undone.',
                            })
                        }
                        aria-label="Delete all activities"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <ul className="space-y-2 max-h-80 overflow-y-auto hide-scrollbar">
                {activities.length > 0 ? (
                    activities.map((activity) => (
                        <li
                            key={activity.id}
                            className="py-2 px-16 bg-[var(--bg-secondary)] rounded hover:bg-[var(--hover-primary)] transition cursor-pointer flex justify-between items-center"
                            onClick={() => console.log(`View details for: ${activity.description}`)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && console.log(`View details for: ${activity.description}`)}
                        >
                            <span className="font-medium text-[var(--text-primary)]">{activity.description}</span>
                            <span className="text-sm text-[var(--text-secondary)]">
                                {new Date(activity.date).toLocaleString()}
                            </span>
                        </li>
                    ))
                ) : (
                    <p className="text-[var(--text-secondary)] text-center">No recent activity.</p>
                )}
            </ul>
        </div>
    );
};

RecentActivity.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
    setActivities: PropTypes.func.isRequired,
    API_BASE_URL: PropTypes.string.isRequired,
};

export default RecentActivity;