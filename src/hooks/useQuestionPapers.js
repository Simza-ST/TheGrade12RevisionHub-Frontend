import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../utils/api';

/**
 * Custom hook to manage question papers data and API interactions
 * @returns {Object} State and functions for question papers
 */
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
        const token = localStorage.getItem('jwt');
        console.log('JWT Token:', token);
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/enrolled-subjects`, {
                    headers: getAuthHeaders(),
                });
                console.log('Subjects API status:', response.status);
                if (response.status === 401) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch subjects: HTTP ${response.status}`);
                }
                const data = await response.json();
                console.log('Subjects API data:', data);
                if (data && Array.isArray(data.data)) {
                    setSubjects(data.data);
                    const decodedSubject = subject ? decodeURIComponent(subject) : '';
                    console.log('URL Subject:', decodedSubject);
                    if (decodedSubject && data.data.includes(decodedSubject)) {
                        setSelectedSubject(decodedSubject);
                    } else if (decodedSubject) {
                        setError(`Invalid subject: ${decodedSubject}`);
                    }
                } else {
                    throw new Error('Invalid subjects response format');
                }
            } catch (err) {
                setError(`Error fetching subjects: ${err.message}`);
                console.error('Error:', err);
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
            try {
                const response = await fetch(
                    `${API_BASE_URL}/question-papers?subjectName=${encodeURIComponent(selectedSubject)}`,
                    { headers: getAuthHeaders() }
                );
                console.log('Papers API status:', response.status);
                console.log('Papers API URL:', `${API_BASE_URL}/question-papers?subjectName=${encodeURIComponent(selectedSubject)}`);
                if (response.status === 401) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch papers: HTTP ${response.status}`);
                }
                const data = await response.json();
                console.log('Papers API data:', data);
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
                console.error('Error:', err);
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
            console.log('View PDF API status:', response.status);
            if (response.status === 401) {
                localStorage.removeItem('jwt');
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
            console.log('Download PDF API status:', response.status);
            if (response.status === 401) {
                localStorage.removeItem('jwt');
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

    // Reset error
    const resetError = () => {
        setError(null);
        setLoading(true);
        fetch(`${API_BASE_URL}/enrolled-subjects`, { headers: getAuthHeaders() })
            .then((res) => {
                if (res.status === 401) {
                    localStorage.removeItem('jwt');
                    navigate('/login');
                    return;
                }
                return res.json();
            })
            .then((data) => {
                if (data && Array.isArray(data.data)) {
                    setSubjects(data.data);
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