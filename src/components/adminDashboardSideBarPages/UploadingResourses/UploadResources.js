/* src/components/admindashboard/uploadingResources/UploadResources.jsx */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from "../../common/AdminSidebar";
import AdminHeader from "../../common/AdminHeader";
// import './resources.css';

const UploadResources = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [subjectName, setSubjectName] = useState('');
    const [file, setFile] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
    const [error, setError] = useState(null);
    const selectRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Fetch subjects from backend
        const fetchSubjects = async () => {
            try {
                setIsLoadingSubjects(true);
                setError(null);
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }
                const response = await fetch('http://localhost:6262/user/subjects', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch subjects: ${response.status} ${response.statusText} - ${errorText}`);
                }
                const data = await response.json();
                console.log('Subjects response:', data);
                if (!data.success) {
                    throw new Error(data.message || 'Failed to fetch subjects');
                }
                setSubjects(data.data || []);
                setIsLoadingSubjects(false);
            } catch (error) {
                console.error('Error fetching subjects:', error);
                setError(error.message || 'Failed to load subjects. Please try again.');
                setIsLoadingSubjects(false);
            }
        };
        fetchSubjects();
    }, [isDarkMode]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && ['application/pdf', 'image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            alert('Please select a PDF, PNG, JPEG, or DOCX file.');
            setFile(null);
        }
    };

    const handleSubjectSelect = (e) => {
        setSubjectName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subjectName || !file) {
            alert('Please select a subject and upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('subjectName', subjectName);
        formData.append('file', file);

        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }
            const response = await fetch('http://localhost:6262/api/upload-resource', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
            console.log('Upload response:', data); // Debug log
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Upload failed');
            }
            alert(data.message);
            setSubjectName('');
            setFile(null);
            if (selectRef.current) selectRef.current.value = '';
        } catch (err) {
            alert('Error uploading file: ' + err.message);
            console.error('Error:', err);
        }
    };

    return (
        <div className="flex min-h-screen">
            <AdminSidebar
                user={user}
                onLogout={onLogout}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                darkMode={isDarkMode}
            />
            <div className="flex-1">
                <AdminHeader
                    user={user}
                    notifications={notifications}
                    isCollapsed={isCollapsed}
                    darkMode={isDarkMode}
                    setDarkMode={setIsDarkMode}
                    tabDescription="Upload Resources"
                    userMessage="Upload resources that students need to access"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <div className="bg-[var(--bg-primary)] rounded-lg shadow-lg p-8 max-w-md mx-auto">
                        <h3 className="text-2xl font-bold mb-5 text-center text-[var(--text-primary)]">Upload Resource</h3>
                        {error && (
                            <p className="text-red-500 text-center mb-4">{error}</p>
                        )}
                        {isLoadingSubjects ? (
                            <p className="text-[var(--text-secondary)] text-center">Loading subjects...</p>
                        ) : (
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col items-center">
                                <select
                                    id="subject-select"
                                    value={subjectName}
                                    onChange={handleSubjectSelect}
                                    className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                    aria-label="Select a subject"
                                    ref={selectRef}
                                    required
                                >
                                    <option value="" disabled>
                                        Choose a subject
                                    </option>
                                    {subjects.length > 0 ? (
                                        subjects.map((subject, index) => (
                                            <option key={`${subject}-${index}`} value={subject}>
                                                {subject}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No subjects available
                                        </option>
                                    )}
                                </select>
                                <input
                                    type="file"
                                    name="file"
                                    id="fileUpload"
                                    accept=".pdf,.png,.jpg,.jpeg,.docx"
                                    onChange={handleFileChange}
                                    required
                                    className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)]"
                                />
                                <button
                                    type="submit"
                                    className="w-full p-3 bg-green-500 text-[var(--text-primary)] rounded-md text-lg hover:bg-green-600 transition-all"
                                    disabled={isLoadingSubjects}
                                >
                                    Upload
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

UploadResources.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
        title: PropTypes.string,
        profilePicture: PropTypes.string,
    }).isRequired,
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            read: PropTypes.bool.isRequired,
        })
    ).isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default UploadResources;