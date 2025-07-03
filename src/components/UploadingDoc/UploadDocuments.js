import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './UploadDocuments.css'; // Import custom CSS

// Mock data for fallback
const defaultSubjects = [
    { subjectName: 'Mathematics' },
    { subjectName: 'Physics' },
    { subjectName: 'Chemistry' },
];

// Topbar Component
const Topbar = () => {
    const menuItems = [
        { text: 'Home🏡', href: '/admin-Dashboard' },
        { text: 'List Of 👨‍🎓', href: '/Students' },
        { icon: 'bx-plus', text: 'Create Quiz📑', href: '/quiz-creation' },
        { icon: 'bx-plus', text: 'Create Certificate📜', href: '/cert-creation' },
        { icon: 'bx-mail-send', text: 'Send Email📩', href: '/chat' },
        {text: 'View Quizzes📓', href: '/quiz-viewer'},
        { text: 'Logout', href: '/login' },
    ];

    return (
        <header className="topbar fixed top-0 left-0 w-full h-16 bg-gray-900 flex items-center justify-between px-5 text-white text-2xl font-semibold shadow-md z-50">
            <div className="dashboard-title">Upload Documents</div>
            <div className="media-icons">
                <ul className="menu flex gap-5 list-none p-0">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href={item.href}
                                className="text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

// UploadDocuments Component
const UploadDocuments = ({ subjects = defaultSubjects, onUpload }) => {
    const [subjectName, setSubjectName] = useState('');
    const [file, setFile] = useState(null);
    const selectRef = useRef(null);

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
                // Use provided callback
                await onUpload(formData);
            } else {
                // Mock fetch
                await new Promise((resolve) => setTimeout(resolve, 500));
                alert('Question paper uploaded successfully!');
            }
            // Reset form
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
        <div
            className="min-h-screen bg-gradient-to-br from-red-600 to-blue-600 flex items-center justify-center"
        >
            <Topbar />
            <div className="form-container bg-white mt-20 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-2xl font-bold mb-5 text-center">Upload Question Paper</h3>
                <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col items-center">
                    <select
                        id="subject"
                        className="subjects w-full p-3 mb-3 border-2 border-gray-300 rounded-md text-base"
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
                        className="w-full p-3 mb-3 border-2 border-gray-300 rounded-md text-base"
                    />
                    <button
                        type="submit"
                        className="w-full p-3 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition-all"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

UploadDocuments.propTypes = {
    subjects: PropTypes.arrayOf(
        PropTypes.shape({
            subjectName: PropTypes.string.isRequired,
        })
    ),
    onUpload: PropTypes.func,
};

export default UploadDocuments;