import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

// === Topbar Component ===
const Topbar = () => {
    const menuItems = [
        { text: 'Home🏡', href: '/admin-Dashboard' },
        { text: 'List Of Students👨‍🎓', href: '/Students' },
        { text: 'Upload Documents📚', href: '/upload-documents' },
        { text: 'Create Quiz📑', href: '/quiz-creation' },
        { text: 'Send Email📩', href: '/chat' },
        {text: 'View Quizzes📓', href: '/quiz-viewer'},
        { text: 'Logout', href: '/login' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-gray-900 flex items-center justify-between px-6 text-white text-xl font-semibold shadow-md z-50">
            <div className="text-2xl">🎓 Certificate Creator</div>
            <ul className="flex gap-5 list-none">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <a
                            href={item.href}
                            className="text-white hover:bg-indigo-600 px-4 py-2 rounded transition-colors"
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </header>
    );
};

// === Main Component ===
const CertificateGenerator = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        reason: "",
        score: "",
    });

    const [grade, setGrade] = useState("");
    const [showCertificate, setShowCertificate] = useState(false);
    const certificateRef = useRef();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateGrade = (score) => {
        const num = parseFloat(score);
        if (num >= 90) return "A";
        if (num >= 80) return "B";
        if (num >= 70) return "C";
        if (num >= 60) return "D";
        if (num >= 50) return "E";
        return "F";
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
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            })
            .save();
    };

    const today = new Date().toLocaleDateString();

    return (
        <>
            <Topbar />
            <div className="pt-24 px-6 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🎓 Generate Certificate</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Student Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Student Surname</label>
                            <input
                                type="text"
                                name="surname"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Reason for Certificate</label>
                            <input
                                type="text"
                                name="reason"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.reason}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Score (%)</label>
                            <input
                                type="number"
                                name="score"
                                min="0"
                                max="100"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={formData.score}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                        >
                            Generate Certificate
                        </button>
                    </form>
                </div>

                {showCertificate && (
                    <div className="mt-10">
                        <div
                            ref={certificateRef}
                            className="bg-white border-4 border-indigo-500 p-10 rounded-xl text-center shadow-xl"
                        >
                            <h3 className="text-2xl font-bold mb-4 text-indigo-700 uppercase">Certificate of Achievement</h3>
                            <p className="text-lg mb-2">This is proudly awarded to:</p>
                            <p className="text-3xl font-bold mb-4">{formData.name} {formData.surname}</p>
                            <p className="italic mb-2">For: {formData.reason}</p>
                            <p className="text-xl mb-2">Score: <strong>{formData.score}%</strong></p>
                            <p className="text-xl font-semibold">Grade Achieved: <span className="text-indigo-700">{grade}</span></p>
                            <p className="mt-6 text-sm text-gray-500">Issued on: {today}</p>
                        </div>

                        <div className="text-center mt-4">
                            <button
                                onClick={handleDownloadPDF}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                            >
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CertificateGenerator;
