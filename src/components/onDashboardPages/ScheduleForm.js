import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';

const ScheduleForm = ({ onSubmit, initialData, onCancel, darkMode }) => {
    const [formData, setFormData] = useState(
        initialData || {
            scheduleId: null,
            subject: '',
            dayOfWeek: 'M',
            startTime: '08:00',
            endTime: '09:00',
        }
    );
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [subjectsLoading, setSubjectsLoading] = useState(true);
    const [subjectsError, setSubjectsError] = useState('');

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                setSubjectsLoading(true);
                setSubjectsError('');
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No JWT token found');
                }
                const response = await fetch(`${API_BASE_URL}/user/enrolled-subjects`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                if (!result.success || !Array.isArray(result.data)) {
                    throw new Error('Invalid response format');
                }
                setSubjects(result.data);
                setSubjectsLoading(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setSubjectsError('Failed to load subjects. Please try again.');
                setSubjectsLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate subject
        if (!formData.subject) {
            setError('Please select a subject');
            setLoading(false);
            return;
        }

        // Validate time presence
        if (!formData.startTime || !formData.endTime) {
            setError('Please select start and end times');
            setLoading(false);
            return;
        }

        // Validate time format (HH:mm or HH:mm:ss)
        const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
        if (!timeRegex.test(formData.startTime) || !timeRegex.test(formData.endTime)) {
            console.error('Invalid time format:', {startTime: formData.startTime, endTime: formData.endTime});
            setError('Invalid time format (use HH:mm or HH:mm:ss)');
            setLoading(false);
            return;
        }

        // Validate startTime < endTime (normalize to seconds for comparison)
        const toSeconds = (time) => {
            const [h, m, s = '00'] = time.split(':');
            return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
        };
        if (toSeconds(formData.startTime) >= toSeconds(formData.endTime)) {
            setError('Start time must be before end time');
            setLoading(false);
            return;
        }

        // Convert to HH:mm:ss for backend
        const formatTime = (time) => time.includes(':') && !time.includes(':', 5) ? `${time}:00` : time;

        console.log('Submitting formData:', formData);
        onSubmit({
            ...formData,
            startTime: formatTime(formData.startTime),
            endTime: formatTime(formData.endTime),
        });
        setFormData({
            scheduleId: null,
            subject: '',
            dayOfWeek: 'M',
            startTime: '08:00',
            endTime: '09:00',
        });
        setError('');
        setLoading(false);
    };

    if (subjectsLoading) {
        return (
            <div
                className="
      bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-4 sm:p-6
      rounded-2xl shadow-2xl mb-6
    "
            >
                <div className="animate-pulse text-[var(--text-secondary)]">
                    Loading subjects...
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[var(--bg-secondary)] bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-2xl"
            aria-label={formData.scheduleId ? 'Update schedule form' : 'Create schedule form'}
        >
            <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
                {formData.scheduleId ? 'Update Schedule' : 'Create Schedule'}
            </h3>

            {(error || subjectsError) && (
                <p className="text-[var(--accent-secondary)] mb-4" role="alert">
                    {error || subjectsError}
                </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Subject */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-primary)]">
                        Subject
                    </label>
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="
            mt-1 block w-full border border-[var(--bg-tertiary)] rounded-lg px-3 py-2
            bg-[var(--bg-primary)] text-[var(--text-primary)]
            focus:ring-2 focus:ring-[var(--accent-primary)]
          "
                        required
                        aria-label="Select subject"
                        disabled={subjects.length === 0}
                    >
                        <option value="" disabled>
                            Select a subject
                        </option>
                        {subjects.map((subject) => (
                            <option key={subject} value={subject}>
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Day of Week */}
                <div>
                    <label htmlFor="dayOfWeek" className="block text-sm font-medium text-[var(--text-primary)]">
                        Day of Week
                    </label>
                    <select
                        id="dayOfWeek"
                        name="dayOfWeek"
                        value={formData.dayOfWeek}
                        onChange={handleChange}
                        className="
            mt-1 block w-full border border-[var(--bg-tertiary)] rounded-lg px-3 py-2
            bg-[var(--bg-primary)] text-[var(--text-primary)]
            focus:ring-2 focus:ring-[var(--accent-primary)]
          "
                        aria-label="Day of Week"
                    >
                        {['M', 'T', 'W', 'Th', 'F', 'S', 'Su'].map((day) => (
                            <option key={day} value={day}>
                                {{
                                    M: 'Monday',
                                    T: 'Tuesday',
                                    W: 'Wednesday',
                                    Th: 'Thursday',
                                    F: 'Friday',
                                    S: 'Saturday',
                                    Su: 'Sunday',
                                }[day]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Start Time */}
                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-[var(--text-primary)]">
                        Start Time
                    </label>
                    <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={
                            formData.startTime.includes(':')
                                ? formData.startTime.split(':').slice(0, 2).join(':')
                                : formData.startTime
                        }
                        onChange={handleChange}
                        className="
            mt-1 block w-full border border-[var(--bg-tertiary)] rounded-lg px-3 py-2
            bg-[var(--bg-primary)] text-[var(--text-primary)]
            focus:ring-2 focus:ring-[var(--accent-primary)]
          "
                        required
                        aria-label="Start Time"
                        step="60"
                    />
                </div>

                {/* End Time */}
                <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-[var(--text-primary)]">
                        End Time
                    </label>
                    <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={
                            formData.endTime.includes(':')
                                ? formData.endTime.split(':').slice(0, 2).join(':')
                                : formData.endTime
                        }
                        onChange={handleChange}
                        className="
            mt-1 block w-full border border-[var(--bg-tertiary)] rounded-lg px-3 py-2
            bg-[var(--bg-primary)] text-[var(--text-primary)]
            focus:ring-2 focus:ring-[var(--accent-primary)]
          "
                        required
                        aria-label="End Time"
                        step="60"
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex space-x-2">
                <button
                    type="submit"
                    disabled={loading || subjects.length === 0}
                    className={`
          px-4 py-2 rounded-lg text-[var(--text-primary)]
          bg-[var(--accent-primary)] hover:bg-[var(--hover-primary)]
          ${loading || subjects.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
        `}
                    aria-label={formData.scheduleId ? 'Update schedule' : 'Create schedule'}
                >
                    {loading ? 'Saving...' : formData.scheduleId ? 'Update' : 'Create'}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="
          px-4 py-2 rounded-lg text-[var(--text-primary)]
          bg-[var(--accent-secondary)] hover:bg-[var(--hover-secondary)]
        "
                    aria-label="Cancel"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

    ScheduleForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        scheduleId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
        subject: PropTypes.string,
        dayOfWeek: PropTypes.string,
        startTime: PropTypes.string,
        endTime: PropTypes.string,
    }),
    onCancel: PropTypes.func.isRequired,
    darkMode: PropTypes.bool.isRequired,
};

ScheduleForm.defaultProps = {
    initialData: null,
};

export default ScheduleForm;