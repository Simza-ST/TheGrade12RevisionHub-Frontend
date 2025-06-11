import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../utils/api';

export const useQuestionPapers = () => {
    const navigate = useNavigate();
    const { subject } = useParams();
    const [questionPapers, setQuestionPapers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [currentPaper, setCurrentPaper] = useState(null);

    // Fetch enrolled subjects on mount
    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            const token = localStorage.getItem('jwt');
            if (!token) {
                setError('Please log in to access question papers.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/enrolled-subjects`, {
                    headers: getAuthHeaders(),
                });
                if (response.status === 401) {
                    setError('Session expired. Please log in again.');
                    setLoading(false);
                    navigate('/login');
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch subjects: HTTP ${response.status}`);
                }
                const data = await response.json();
                if (data && Array.isArray(data.data)) {
                    const sortedSubjects = data.data.sort();
                    setSubjects(sortedSubjects);
                    const decodedSubject = subject ? decodeURIComponent(subject) : '';
                    if (decodedSubject && sortedSubjects.includes(decodedSubject)) {
                        setSelectedSubject(decodedSubject);
                    } else if (decodedSubject) {
                        setError(`Invalid subject: ${decodedSubject}`);
                    }
                } else {
                    throw new Error('Invalid subjects response format');
                }
            } catch (err) {
                setError(`Error fetching subjects: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, [navigate, subject]);

    // Fetch question papers when selectedSubject changes
    useEffect(() => {
        const fetchQuestionPapers = async () => {
            if (!selectedSubject) {
                setQuestionPapers([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(
                    `${API_BASE_URL}/question-papers?subjectName=${encodeURIComponent(selectedSubject)}`,
                    { headers: getAuthHeaders() }
                );
                if (response.status === 401) {
                    setError('Session expired. Please log in again.');
                    setLoading(false);
                    navigate('/login');
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch papers: HTTP ${response.status}`);
                }
                const data = await response.json();
                let papers = [];
                if (Array.isArray(data)) {
                    papers = data;
                } else if (data && Array.isArray(data.data)) {
                    papers = data.data;
                } else if (data && Array.isArray(data.papers)) {
                    papers = data.papers;
                } else {
                    throw new Error('Invalid papers response format');
                }
                setQuestionPapers(
                    papers.map((paper) => ({
                        id: paper.id,
                        title: paper.fileName,
                        subject: paper.subject?.subjectName || selectedSubject,
                        year: paper.year || paper.fileName.match(/\d{4}/)?.[0] || 'Unknown',
                    }))
                );
            } catch (err) {
                setError(`Error fetching papers: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestionPapers();
    }, [selectedSubject, navigate]);

    // View PDF
    const viewPdf = async (paperId) => {
        setPdfLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/question-papers/${paperId}/view`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            });
            if (response.status === 401) {
                setError('Session expired. Please log in again.');
                navigate('/login');
                return;
            }
            if (!response.ok) {
                throw new Error(`Failed to view PDF: HTTP ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            setPdfUrl(url);
            setShowModal(true);
            setCurrentPaper(questionPapers.find((p) => p.id === paperId));
        } catch (err) {
            setError(`Error viewing PDF: ${err.message}`);
        } finally {
            setPdfLoading(false);
        }
    };

    // Download PDF
    const downloadPdf = async (paperId, fileName) => {
        setPdfLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/question-papers/${paperId}/download`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            });
            if (response.status === 401) {
                setError('Session expired. Please log in again.');
                navigate('/login');
                return;
            }
            if (!response.ok) {
                throw new Error(`Failed to download PDF: HTTP ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(`Error downloading PDF: ${err.message}`);
        } finally {
            setPdfLoading(false);
        }
    };

    // Reset error and optionally log out
    const resetError = () => {
        if (error && (error.includes('Session expired') || error.includes('Please log in'))) {
            localStorage.removeItem('jwt');
            navigate('/login');
            return;
        }
        setError(null);
        setLoading(true);
        fetch(`${API_BASE_URL}/enrolled-subjects`, { headers: getAuthHeaders() })
            .then((res) => {
                if (res.status === 401) {
                    setError('Session expired. Please log in again.');
                    navigate('/login');
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setSubjects(data.data.sort());
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(`Error retrying: ${err.message}`);
                setLoading(false);
            });
    };

    return {
        questionPapers,
        subjects,
        selectedSubject,
        setSelectedSubject,
        selectedYear,
        setSelectedYear,
        loading,
        error,
        resetError,
        pdfUrl,
        showModal,
        setShowModal,
        pdfLoading,
        currentPaper,
        viewPdf,
        downloadPdf,
    };
};