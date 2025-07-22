import { useState, useEffect } from 'react';

const useResources = () => {
    const [resources, setResources] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [currentResource, setCurrentResource] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262';
    console.log('API_BASE_URL:', API_BASE_URL);

    const fetchData = async (url, setData, errorMessage) => {
        try {
            const headers = {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(url, { headers });
            const data = await response.json();
            if (response.ok && data.success) {
                setData(data.data || []);
            } else {
                throw new Error(data.message || errorMessage);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchData(
            `${API_BASE_URL}/user/enrolled-subjects`,
            (data) => setSubjects(Array.isArray(data) ? data.map((s) => s.subjectName || s) : []),
            'Failed to fetch subjects'
        );

        const fetchResources = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                };
                const query = new URLSearchParams();
                if (selectedSubject) query.append('subject', selectedSubject);
                if (selectedYear) query.append('year', selectedYear);
                const url = `${API_BASE_URL}/api/resources${query.toString() ? `?${query}` : ''}`;
                const response = await fetch(url, { headers });
                const data = await response.json();
                if (response.ok && data.success) {
                    setResources(data.data || []);
                } else {
                    throw new Error(data.message || 'Failed to fetch resources');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [selectedSubject, selectedYear]);

    const viewPdf = async (resource) => {
        if (resource.resourceType !== 'file') return;

        setPdfLoading(true);
        setCurrentResource(resource);

        try {
            const response = await fetch(`${API_BASE_URL}${resource.url}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                },
            });

            if (!response.ok) throw new Error('Failed to fetch PDF');

            // Create object URL from response
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            setPdfUrl(blobUrl);
            setShowModal(true);
        } catch (err) {
            setError(`Failed to load PDF: ${err.message}`);
        } finally {
            setPdfLoading(false);
        }
    };

    const downloadPdf = async (resource) => {
        if (resource.resourceType === 'file') {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                };
                const response = await fetch(`${API_BASE_URL}${resource.url}?download=true`, { headers });

                if (!response.ok) throw new Error(`Failed to download ${resource.fileName}`);

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = resource.fileName || 'resource.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (err) {
                setError(`Failed to download: ${err.message}`);
            }
        }
    };

    const resetError = () => setError(null);

    return {
        resources,
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
        currentResource,
        viewPdf,
        downloadPdf,
    };
};

export default useResources;