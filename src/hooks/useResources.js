import { useState, useEffect } from 'react';

const useResources = () => {
    const [resources, setResources] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resourceUrl, setResourceUrl] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [resourceLoading, setResourceLoading] = useState(false);
    const [currentResource, setCurrentResource] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api/user';
    console.log('API_BASE_URL:', API_BASE_URL);

    const fetchData = async (url, setData, errorMessage) => {
        try {
            const headers = {
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
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
            `${API_BASE_URL}/enrolled-subjects`,
            (data) => setSubjects(Array.isArray(data) ? data.map((s) => s.subjectName || s) : []),
            'Failed to fetch subjects'
        );

        const fetchResources = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json',
                };
                const query = new URLSearchParams();
                if (selectedSubject) query.append('subject', selectedSubject);
                if (selectedYear) query.append('year', selectedYear);
                const url = `${API_BASE_URL}/resources${query.toString() ? `?${query}` : ''}`;
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

    const viewResource = async (resource) => {
        if (resource.resourceType !== 'file') return;

        setResourceLoading(true);
        setCurrentResource(resource);

        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }
            const response = await fetch(`${API_BASE_URL}${resource.url}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response headers:', response.headers);
            if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            const contentType = response.headers.get('Content-Type');
            const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
            if (!validTypes.includes(contentType)) {
                throw new Error(`Expected PDF or image, got ${contentType}`);
            }
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            setResourceUrl(blobUrl);
            setShowModal(true);
        } catch (err) {
            setError(`Failed to load resource: ${err.message}`);
        } finally {
            setResourceLoading(false);
        }
    };

    const downloadResource = async (resource) => {
        if (resource.resourceType === 'file') {
            try {
                const headers = {
                    Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
                };
                const response = await fetch(`${API_BASE_URL}${resource.url}?download=true`, { headers });

                if (!response.ok) throw new Error(`Failed to download ${resource.fileName}`);

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = resource.fileName || 'resource';
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
        resourceUrl,
        showModal,
        setShowModal,
        resourceLoading,
        currentResource,
        viewResource,
        downloadResource,
    };
};

export default useResources;