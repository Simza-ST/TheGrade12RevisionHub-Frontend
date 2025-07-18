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

        // Fetch enrolled subjects
        fetchData(
            `${API_BASE_URL}/user/enrolled-subjects`,
            (data) => setSubjects(Array.isArray(data) ? data.map((s) => s.subjectName || s) : []),
            'Failed to fetch subjects'
        );

        // Fetch resources
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

    const viewPdf = (resource) => {
        setPdfLoading(true);
        setCurrentResource(resource);
        setPdfUrl(`${API_BASE_URL}${resource.url}`);
        setShowModal(true);
        setTimeout(() => setPdfLoading(false), 1000); // Simulate loading
    };

    const downloadPdf = (resource) => {
        const link = document.createElement('a');
        link.href = `${API_BASE_URL}${resource.url}`;
        link.download = resource.fileName;
        link.click();
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