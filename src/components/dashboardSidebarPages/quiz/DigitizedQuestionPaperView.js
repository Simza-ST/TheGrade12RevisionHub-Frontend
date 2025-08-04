import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../../../utils/api';
import { getPaperComponent } from '../../../utils/paperMapper';

const DigitizedQuestionPaperView = ({ darkMode }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [PaperComponent, setPaperComponent] = useState(null);

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                setLoading(true);

                const response = await fetch(`${API_BASE_URL}/user/digitized/${id}`, {
                    headers: getAuthHeaders(),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || `HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.success || !data.data) {
                    throw new Error(data.message || 'Failed to fetch paper data');
                }

                const paperData = data.data;
                setPaper(paperData);

                // Check if filename exists
                if (!paperData.fileName) {
                    throw new Error("Filename is missing in API response");
                }

                // Get component based on filename
                const component = getPaperComponent(paperData.fileName);

                if (!component) {
                    throw new Error('No interactive viewer available for this paper');
                }

                setPaperComponent(() => component);
                setLoading(false);
            } catch (err) {
                console.error('Paper fetch error:', err);
                setError(`Error: ${err.message}`);
                setLoading(false);
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

    return (
        <div className="flex min-h-screen bg-[var(--bg-primary)] p-6">
            <div className="bg-[var(--bg-secondary)] p-6 rounded-2xl shadow-[var(--shadow)] w-full">
                <h1 className="text-3xl font-bold text-[var(--text-primary)]">
                    {paper.fileName || `Paper ${paper.id}`}
                </h1>
                <p className="text-sm text-[var(--text-secondary)]">
                    Subject: {paper.subject?.subjectName || paper.subjectName || 'Unknown'}
                </p>
                <p className="text-sm text-[var(--text-secondary)]">
                    Type: Interactive
                </p>
                <div className="mt-4">
                    {PaperComponent && (
                        <PaperComponent
                            darkMode={darkMode}
                            paperId={paper.id} // Ensure this is passed
                        />
                    )}
                </div>
            </div>
        </div>

    );
};

export default DigitizedQuestionPaperView;