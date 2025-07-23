import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import html2pdf from 'html2pdf.js';
import AdminSidebar from "../../common/AdminSidebar";
import AdminHeader from "../../common/AdminHeader";

const CertificateGenerator = ({ user, notifications, onLogout }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(sessionStorage.getItem('theme') === 'dark');
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        reason: '',
        score: '',
    });
    const [grade, setGrade] = useState('');
    const [showCertificate, setShowCertificate] = useState(false);
    const certificateRef = useRef();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        sessionStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateGrade = (score) => {
        const num = parseFloat(score);
        if (num >= 90) return 'A';
        if (num >= 80) return 'B';
        if (num >= 70) return 'C';
        if (num >= 60) return 'D';
        if (num >= 50) return 'E';
        return 'F';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const gradeResult = calculateGrade(formData.score);
        setGrade(gradeResult);
        setShowCertificate(true);
    };

    const handleDownloadPDF = () => {
        const element = certificateRef.current;
        html2pdf()
            .from(element)
            .set({
                margin: 0.5,
                filename: `${formData.name}_${formData.surname}_certificate.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            })
            .save();
    };

    const today = new Date().toLocaleDateString();

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
                    tabDescription="Certificate Creator"
                    userMessage="Award the achievement to the student"
                />
                <div className={`flex-1 min-w-0 p-6 sm:p-8 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-[var(--bg-primary)] rounded-xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-6 text-center text-[var(--text-primary)]">🎓 Generate Certificate</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[var(--text-normal)] font-medium mb-1">Student Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="w-full border border-[var(--border)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-primary)] text-[var(--text-normal)]"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[var(--text-normal)] font-medium mb-1">Student Surname</label>
                                    <input
                                        type="text"
                                        name="surname"
                                        className="w-full border border-[var(--border)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-primary)] text-[var(--text-normal)]"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[var(--text-normal)] font-medium mb-1">Reason for Certificate</label>
                                    <input
                                        type="text"
                                        name="reason"
                                        className="w-full border border-[var(--border)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-primary)] text-[var(--text-normal)]"
                                        value={formData.reason}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-[var(--text-normal)] font-medium mb-1">Score (%)</label>
                                    <input
                                        type="number"
                                        name="score"
                                        min="0"
                                        max="100"
                                        className="w-full border border-[var(--border)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] bg-[var(--bg-primary)] text-[var(--text-normal)]"
                                        value={formData.score}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-[var(--accent-primary)] text-[var(--text-primary)] px-6 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Generate Certificate
                                </button>
                            </form>
                        </div>
                        {showCertificate && (
                            <div className="mt-10">
                                <div
                                    ref={certificateRef}
                                    className="bg-[var(--bg-primary)] border-4 border-[var(--accent-primary)] p-10 rounded-xl text-center shadow-xl"
                                >
                                    <h3 className="text-2xl font-bold mb-4 text-[var(--accent-primary)] uppercase">Certificate of Achievement</h3>
                                    <p className="text-lg mb-2 text-[var(--text-normal)]">This is proudly awarded to:</p>
                                    <p className="text-3xl font-bold mb-4 text-[var(--text-primary)]">{formData.name} {formData.surname}</p>
                                    <p className="italic mb-2 text-[var(--text-normal)]">For: {formData.reason}</p>
                                    <p className="text-xl mb-2 text-[var(--text-normal)]">Score: <strong>{formData.score}%</strong></p>
                                    <p className="text-xl font-semibold text-[var(--text-primary)]">Grade Achieved: <span className="text-[var(--accent-primary)]">{grade}</span></p>
                                    <p className="mt-6 text-sm text-[var(--text-secondary)]">Issued on: {today}</p>
                                </div>
                                <div className="text-center mt-4">
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="bg-green-500 text-[var(--text-primary)] px-6 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

CertificateGenerator.propTypes = {
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

export default CertificateGenerator;