/* src/components/admindashboard/uploadingResources/UploadResources.jsx */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import AdminSidebar from '../../common/AdminSidebar';
import AdminHeader from '../../common/AdminHeader';

const UploadResources = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(sessionStorage.getItem('theme') === 'dark');
    const [subjectName, setSubjectName] = useState('');
    const [resourceType, setResourceType] = useState('file');
    const [file, setFile] = useState(null);
    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
    const [error, setError] = useState(null);
    const selectRef = useRef(null);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        const fetchSubjects = async () => {
            try {
                setIsLoadingSubjects(true);
                setError(null);
                const token = sessionStorage.getItem('jwt');
                if (!token) throw new Error('No authentication token found. Please log in.');
                const response = await fetch('http://localhost:6262/api/user/subjects', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error(`Failed to fetch subjects: ${response.statusText}`);
                const data = await response.json();
                if (!data.success) throw new Error(data.message || 'Failed to fetch subjects');
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
        const allowedTypes = [
            'application/pdf',
            'image/png',
            'image/jpeg',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'video/mp4',
            'video/webm',
            'audio/mpeg',
            'audio/wav',
        ];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
        } else {
            alert('Please select a PDF, PNG, JPEG, DOCX, MP4, WebM, MP3, or WAV file.');
            setFile(null);
        }
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subjectName || (!file && resourceType === 'file' && !link && resourceType === 'link')) {
            alert('Please select a subject and provide a file or link.');
            return;
        }

        const formData = new FormData();
        formData.append('subjectName', subjectName);
        formData.append('resourceType', resourceType);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tags', tags);
        if (resourceType === 'file' && file) formData.append('file', file);
        if (resourceType === 'link' && link) formData.append('link', link);

        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) throw new Error('No authentication token found. Please log in.');
            const response = await fetch('http://localhost:6262/api/admin/upload-resource', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (!response.ok || !data.success) throw new Error(data.message || 'Upload failed');
            alert(data.message);
            setSubjectName('');
            setResourceType('file');
            setFile(null);
            setLink('');
            setTitle('');
            setDescription('');
            setTags('');
            if (selectRef.current) selectRef.current.value = '';
        } catch (err) {
            alert('Error uploading resource: ' + err.message);
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
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        {isLoadingSubjects ? (
                            <p className="text-[var(--text-secondary)] text-center">Loading subjects...</p>
                        ) : (
                            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col items-center">
                                <select
                                    id="subject-select"
                                    value={subjectName}
                                    onChange={(e) => setSubjectName(e.target.value)}
                                    className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                    aria-label="Select a subject"
                                    ref={selectRef}
                                    required
                                >
                                    <option value="" disabled>Choose a subject</option>
                                    {subjects.length > 0 ? (
                                        subjects.map((subject, index) => (
                                            <option key={`${subject}-${index}`} value={subject}>
                                                {subject}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No subjects available</option>
                                    )}
                                </select>
                                <select
                                    id="resource-type-select"
                                    value={resourceType}
                                    onChange={(e) => setResourceType(e.target.value)}
                                    className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)] focus:border-[var(--accent-primary)] focus:shadow-lg outline-none"
                                    aria-label="Select resource type"
                                    required
                                >
                                    <option value="file">File (PDF, Image, Video)</option>
                                    <option value="link">Link (Website, Video URL)</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Resource Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)]"
                                    required
                                />
                                <textarea
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)]"
                                    rows="4"
                                />
                                <input
                                    type="text"
                                    placeholder="Tags (comma-separated)"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)]"
                                />
                                {resourceType === 'file' && (
                                    <input
                                        type="file"
                                        name="file"
                                        id="fileUpload"
                                        accept=".pdf,.png,.jpg,.jpeg,.docx,.mp4,.webm,.wav"
                                        onChange={handleFileChange}
                                        required
                                        className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)]"
                                    />
                                )}
                                {resourceType === 'link' && (
                                    <input
                                        type="url"
                                        placeholder="Enter URL (e.g., https://example.com)"
                                        value={link}
                                        onChange={handleLinkChange}
                                        required
                                        className="w-full p-3 mb-3 border-2 border-[var(--border)] rounded-md text-base text-[var(--text-normal)] bg-[var(--bg-primary)]"
                                    />
                                )}
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