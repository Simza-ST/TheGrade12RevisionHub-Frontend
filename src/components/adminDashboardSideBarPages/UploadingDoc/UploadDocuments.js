import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from "../../common/AdminSidebar";
import AdminHeader from "../../common/AdminHeader";
import './UploadDocuments.css';

// Mock data for fallback
const defaultSubjects = [
    { subjectName: 'Mathematics' },
    { subjectName: 'Physics' },
    { subjectName: 'Chemistry' },
];

const UploadDocuments = ({ user, notifications, onLogout, subjects = defaultSubjects, onUpload }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('theme') === 'dark');
    const [subjectName, setSubjectName] = useState('');
    const [file, setFile] = useState(null);
    const selectRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

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
            if (onUpload) {
                await onUpload(formData);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert('Question paper uploaded successfully!');
            }
            setSubjectName('');
            setFile(null);
            if (selectRef.current) selectRef.current.value = '';
        } catch (err) {
            alert('Error uploading file. Please try again.');
            console.error('Error:', err);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
                    tabDescription="Upload Documents"
                    userMessage="Upload documents that students need to access"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <div className="bg-[var(--bg-primary)] rounded-lg shadow-lg p-8 max-w-md mx-auto">
                        <h3 className="text-2xl font-bold mb-5 text-center text-[var(--text-primary)]">Upload Question Paper</h3>
                        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col items-center">
                            <select
                                id="subject"
                                className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                value={subjectName}
                                onChange={(e) => setSubjectName(e.target.value)}
                                required
                                ref={selectRef}
                            >
                                <option value="">Select Subject</option>
                                {subjects.map((subject, index) => (
                                    <option key={index} value={subject.subjectName}>
                                        {subject.subjectName}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="file"
                                name="file"
                                id="fileUpload"
                                accept=".pdf,.docx,.jpg,.png"
                                onChange={handleFileChange}
                                required
                                className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)]"
                            />
                            <button
                                type="submit"
                                className="w-full p-3 bg-green-500 text-[var(--text-primary)] rounded-md text-lg hover:bg-green-600 transition-all"
                            >
                                Upload
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

UploadDocuments.propTypes = {
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
    subjects: PropTypes.arrayOf(
        PropTypes.shape({
            subjectName: PropTypes.string.isRequired,
        })
    ),
    onUpload: PropTypes.func,
};

export default UploadDocuments;