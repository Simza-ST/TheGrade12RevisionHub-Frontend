import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from './utils/api';

const DigitizedQuestionPaperView = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/question-papers/${id}`, {
                    headers: getAuthHeaders(),
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    throw new Error(data.message || 'Failed to fetch paper');
                }
                setPaper(data.data);
                setLoading(false);
            } catch (err) {
                if (err.message.includes('Unauthorized') || err.message.includes('401')) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                } else {
                    setError(`Error: ${err.message}`);
                    setLoading(false);
                }
            }
        };
        fetchPaper();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                <div className="p-4 rounded-lg bg-[var(--accent-secondary)] text-white">
                    {error}
                    <button
                        onClick={() => navigate('/digitized-question-papers')}
                        className="ml-4 px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                    >
                        Back to Papers
                    </button>
                </div>
            </div>
        );
    }

    if (!paper) {
        return (
            <div className="flex min-h-screen bg-[var(--bg-primary)] justify-center items-center">
                <div className="p-4 rounded-lg bg-[var(--accent-secondary)] text-white">
                    Paper not found
                    <button
                        onClick={() => navigate('/digitized-question-papers')}
                        className="ml-4 px-4 py-2 bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-lg hover:bg-[var(--hover-tertiary)]"
                    >
                        Back to Papers
                    </button>
                </div>
            </div>
        );
    }

    // Example rendering (customize based on paper data)
    return (
        <div className="flex min-h-screen bg-[var(--bg-primary)] p-6">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-[var(--shadow)] w-full">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                    {paper.fileName || 'Untitled Paper'}
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                    Subject: {paper.subject?.subjectName || paper.subjectName || 'Unknown'}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                    Type: {paper.isInteractive ? 'Interactive' : 'PDF'}
                </p>
                {paper.isInteractive ? (
                    <div className="mt-4">
                        {/* Render interactive content, e.g., EnglishFALP12020 for id === '1' */}
                        {id === '1' && <EnglishFALP12020 />}
                    </div>
                ) : (
                    <div className="mt-4">
                        {/* Render PDF viewer or link */}
                        <a
                            href={paper.fileUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--hover-primary)]"
                        >
                            View PDF
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DigitizedQuestionPaperView;