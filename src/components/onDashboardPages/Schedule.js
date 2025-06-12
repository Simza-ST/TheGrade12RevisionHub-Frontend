import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ScheduleForm from './ScheduleForm';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

const Schedule = ({ schedule: propSchedule, setRecentActivity, isCollapsed, darkMode, recentActivities }) => {
    const days = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];
    const [schedule, setSchedule] = useState([]);
    const [selectedDay, setSelectedDay] = useState(() => {
        const today = new Date();
        // Get day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
        const dayIndex = today.getDay();
        // Map to days array (Monday=0, Sunday=6)
        const mappedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
        return days[mappedIndex];
    });
    const [viewMode, setViewMode] = useState('list');
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [operationLoading, setOperationLoading] = useState(false);
    const [operationError, setOperationError] = useState('');

    const normalizeTime = (time) => {
        if (!time) return '00:00:00';
        const parts = time.split(':');
        return parts.length >= 2 ? `${parts[0]}:${parts[1]}:${parts[2] || '00'}` : '00:00:00';
    };

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                setLoading(true);
                setError('');
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No JWT token found');
                }
                const response = await fetch(`${API_BASE_URL}/api/user/schedule/get-schedules`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log('Fetched schedules:', result);
                if (!result.data || !Array.isArray(result.data)) {
                    throw new Error('Invalid response format');
                }
                setSchedule(
                    result.data.map((item) => ({
                        id: item.id,
                        day: item.dayOfWeek,
                        course: item.subject,
                        time: `${normalizeTime(item.startTime)}-${normalizeTime(item.endTime)}`,
                    }))
                );
                setLoading(false);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                setError('Failed to load schedules. Using fallback data.');
                setSchedule(
                    propSchedule.map((item, index) => ({
                        id: `fallback-${index}`,
                        day: item.day,
                        course: item.course,
                        time: `${normalizeTime(item.time.split('-')[0])}-${normalizeTime(item.time.split('-')[1])}`,
                    }))
                );
                setLoading(false);
            }
        };

        fetchSchedules();
    }, [propSchedule]);

    const handleCreateOrUpdateSchedule = async (formData) => {
        try {
            setOperationLoading(true);
            setOperationError('');
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const url = formData.scheduleId
                ? `${API_BASE_URL}/api/user/schedule/update-schedule`
                : `${API_BASE_URL}/api/user/schedule/create-schedule`;
            const method = formData.scheduleId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers,
                body: JSON.stringify({
                    scheduleId: formData.scheduleId,
                    subject: formData.subject,
                    dayOfWeek: formData.dayOfWeek,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Saved schedule:', result);
            if (!result.data) {
                throw new Error('Invalid response format');
            }
            const newSchedule = {
                id: result.data.id,
                day: result.data.dayOfWeek,
                course: result.data.subject,
                time: `${normalizeTime(result.data.startTime)}-${normalizeTime(result.data.endTime)}`,
            };

            if (formData.scheduleId) {
                setSchedule(
                    schedule.map((item) =>
                        item.id === formData.scheduleId ? newSchedule : item
                    )
                );
            } else {
                setSchedule([...schedule, newSchedule]);
            }

            setRecentActivity((prev) => [
                {
                    id: `${prev.length + 1}`,
                    description: formData.scheduleId
                        ? `Updated schedule for ${formData.subject}`
                        : `Created schedule for ${formData.subject}`,
                    date: new Date().toISOString(),
                },
                ...prev,
            ]);

            setEditingSchedule(null);
            setShowForm(false);
        } catch (error) {
            console.error('Error saving schedule:', error);
            setOperationError('Failed to save schedule. Please try again.');
        } finally {
            setOperationLoading(false);
        }
    };

    const handleEditSchedule = (scheduleItem) => {
        const [startTime, endTime] = scheduleItem.time.split('-');
        setEditingSchedule({
            scheduleId: scheduleItem.id,
            subject: scheduleItem.course,
            dayOfWeek: scheduleItem.day,
            startTime: normalizeTime(startTime),
            endTime: normalizeTime(endTime),
        });
        setShowForm(true);
    };

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            setOperationLoading(true);
            setOperationError('');
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }
            const response = await fetch(`${API_BASE_URL}/api/user/schedule/delete-schedule/${scheduleId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log(`Deleted schedule ID: ${scheduleId}`);
            const deletedSchedule = schedule.find((item) => item.id === scheduleId);
            setSchedule(schedule.filter((item) => item.id !== scheduleId));
            setRecentActivity((prev) => [
                {
                    id: `${prev.length + 1}`,
                    description: `Deleted schedule for ${deletedSchedule.course}`,
                    date: new Date().toISOString(),
                },
                ...prev,
            ]);
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setOperationError('Failed to delete schedule. Please try again.');
        } finally {
            setOperationLoading(false);
        }
    };

    const handleCancel = () => {
        setEditingSchedule(null);
        setShowForm(false);
        setOperationError('');
    };

    const handleRetry = () => {
        setLoading(true);
        setError('');
        const fetchSchedules = async () => {
            try {
                setLoading(true);
                setError('');
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No JWT token found');
                }
                const response = await fetch(`${API_BASE_URL}/api/user/schedule/get-schedules`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                console.log('Fetched schedules:', result);
                if (!result.data || !Array.isArray(result.data)) {
                    throw new Error('Invalid response format');
                }
                setSchedule(
                    result.data.map((item) => ({
                        id: item.id,
                        day: item.dayOfWeek,
                        course: item.subject,
                        time: `${normalizeTime(item.startTime)}-${normalizeTime(item.endTime)}`,
                    }))
                );
                setLoading(false);
            } catch (error) {
                console.error('Error fetching schedules:', error);
                setError('Failed to load schedules. Using fallback data.');
                setSchedule(
                    propSchedule.map((item, index) => ({
                        id: `fallback-${index}`,
                        day: item.day,
                        course: item.course,
                        time: `${normalizeTime(item.time.split('-')[0])}-${normalizeTime(item.time.split('-')[1])}`,
                    }))
                );
                setLoading(false);
            }
        };
        fetchSchedules();
    };

    const handleOperationRetry = () => {
        setOperationError('');
        setOperationLoading(false);
    };

    if (loading) {
        return (
            <div
                className={`
          p-6 rounded-2xl shadow-2xl
          ${darkMode ? 'bg-gray-800' : 'bg-teal-800 bg-opacity-90 backdrop-blur-md'}
        `}
            >
                <div className="animate-pulse text-gray-300">Loading schedules...</div>
            </div>
        );
    }

    return (
        <div
            className={`
        p-4 sm:p-6 rounded-2xl shadow-2xl
        ${darkMode ? 'bg-gray-800' : 'bg-teal-800 bg-opacity-90 backdrop-blur-md'}
      `}
            aria-label="Schedule component"
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Schedule</h2>
                <button
                    onClick={() => setShowForm(true)}
                    disabled={operationLoading}
                    className={`
            px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg
            ${operationLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-teal-700 hover:to-red-700'}
          `}
                    aria-label="Add new schedule"
                >
                    Add Schedule
                </button>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-600 text-white rounded-lg flex justify-between items-center" role="alert">
                    <span>{error}</span>
                    <button
                        onClick={handleRetry}
                        className="px-3 py-1 bg-red-700 hover:bg-red-800 rounded"
                        aria-label="Retry loading schedules"
                    >
                        Retry
                    </button>
                </div>
            )}
            {operationError && (
                <div className="mb-4 p-3 bg-red-600 text-white rounded-lg flex justify-between items-center" role="alert">
                    <span>{operationError}</span>
                    <button
                        onClick={handleOperationRetry}
                        className="px-3 py-1 bg-red-700 hover:bg-red-800 rounded"
                        aria-label="Retry operation"
                    >
                        Retry
                    </button>
                </div>
            )}
            {showForm && (
                <ScheduleForm
                    onSubmit={handleCreateOrUpdateSchedule}
                    initialData={editingSchedule}
                    onCancel={handleCancel}
                    darkMode={darkMode}
                />
            )}
            <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-2">
                <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                        <button
                            key={day}
                            className={`
                px-3 py-1 rounded text-sm
                ${selectedDay === day
                                ? 'bg-gradient-to-r from-teal-600 to-red-600 text-white'
                                : darkMode
                                    ? 'bg-gray-600 hover:bg-gray-500'
                                    : 'bg-teal-700 hover:bg-teal-600'
                            }
              `}
                            onClick={() => setSelectedDay(day)}
                            aria-label={`Select ${day === 'M' ? 'Monday' : day === 'T' ? 'Tuesday' : day === 'W' ? 'Wednesday' : day === 'Th' ? 'Thursday' : day === 'F' ? 'Friday' : day === 'S' ? 'Saturday' : 'Sunday'}`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <button
                    onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
                    className={`
            px-4 py-2 bg-gradient-to-r from-teal-600 to-red-600 text-white rounded-lg
            hover:from-teal-700 hover:to-red-700
          `}
                    aria-label={`Switch to ${viewMode === 'list' ? 'calendar' : 'list'} view`}
                >
                    {viewMode === 'list' ? 'Calendar View' : 'List View'}
                </button>
            </div>
            {viewMode === 'list' ? (
                <div className="space-y-2">
                    {schedule
                        .filter((item) => item.day === selectedDay)
                        .map((item) => (
                            <div
                                key={item.id}
                                className={`
                  flex items-center justify-between p-3 rounded transition
                  ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-teal-700 hover:bg-teal-600'}
                `}
                            >
                                <span className="font-medium text-white">{item.course}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-300 text-sm">{item.time}</span>
                                    <button
                                        onClick={() => handleEditSchedule(item)}
                                        className="text-teal-400 hover:text-teal-300"
                                        aria-label={`Edit ${item.course} schedule`}
                                        disabled={operationLoading}
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSchedule(item.id)}
                                        className="text-red-400 hover:text-red-300"
                                        aria-label={`Delete ${item.course} schedule`}
                                        disabled={operationLoading}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    {schedule.filter((item) => item.day === selectedDay).length === 0 && (
                        <p className="text-gray-300">No schedule for this day.</p>
                    )}
                </div>
            ) : (
                <div className="text-gray-300">Calendar view coming soon!</div>
            )}
        </div>
    );
};

Schedule.propTypes = {
    schedule: PropTypes.arrayOf(
        PropTypes.shape({
            day: PropTypes.string.isRequired,
            course: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })
    ).isRequired,
    setRecentActivity: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    recentActivities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            description: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Schedule;