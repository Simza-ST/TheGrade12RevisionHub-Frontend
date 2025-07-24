import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const useResources = () => {
    const navigate = useNavigate();
    const [resources, setResources] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [resourceUrl, setResourceUrl] = useState(null);
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [resourceLoading, setResourceLoading] = useState(false);
    const [currentResource, setCurrentResource] = useState(null);
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:6262/api';

    const fetchData = async (url, setData, errorMessage) => {
        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }
            const headers = {
                Authorization: `Bearer ${token}`,
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
            if (err.message.includes('Please log in')) {
                navigate('/login');
            }
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
                const token = sessionStorage.getItem('jwt');
                if (!token) {
                    throw new Error('No authentication token found. Please log in.');
                }
                const headers = {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };
                const query = new URLSearchParams();
                if (selectedSubject) query.append('subject', selectedSubject);
                if (selectedYear) query.append('year', selectedYear);
                const url = `${API_BASE_URL}/user/resources${query.toString() ? `?${query}` : ''}`;
                const response = await fetch(url, { headers });
                const data = await response.json();
                if (response.ok && data.success) {
                    setResources(data.data || []);
                } else {
                    throw new Error(data.message || 'Failed to fetch resources');
                }
            } catch (err) {
                setError(err.message);
                if (err.message.includes('Please log in')) {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, [selectedSubject, selectedYear, navigate]);

    const getFileNameFromUrl = (url) => {
        if (!url) return null;
        return url.split('/').pop();
    };

    const viewResource = async (resource) => {
        if (resource.resourceType !== 'file') {
            setError('Only file resources can be viewed.');
            return;
        }

        const fileExtension = resource.fileName?.split('.').pop()?.toLowerCase();
        const fileType = resource.fileType;
        const fileName = getFileNameFromUrl(resource.url);
        console.log('Viewing resource:', { id: resource.id, fileName: resource.fileName, fileType, url: resource.url, serverFileName: fileName });
        if (!['pdf', 'png', 'jpg', 'jpeg', 'mp4', 'webm'].includes(fileExtension) ||
            (fileType && !['application/pdf', 'image/png', 'image/jpeg', 'video/mp4', 'video/webm'].includes(fileType))) {
            setError('Only PDF, image (PNG, JPEG), and video (MP4, WebM) resources are supported for viewing.');
            return;
        }

        setResourceLoading(true);
        setCurrentResource(resource);

        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }
            const response = await fetch(`${API_BASE_URL}/user/Uploads/view/${encodeURIComponent(fileName)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to view ${resource.fileName}: HTTP ${response.status}`);
            }
            const contentType = response.headers.get('Content-Type');
            const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'video/mp4', 'video/webm'];
            if (!validTypes.includes(contentType)) {
                throw new Error(`Expected PDF, image, or video, got ${contentType}`);
            }
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            setResourceUrl(blobUrl);
            if (['mp4', 'webm'].includes(fileExtension) || contentType.includes('video/')) {
                setShowVideoModal(true);
            } else {
                setShowResourceModal(true);
            }
        } catch (err) {
            setError(`Failed to view resource: ${err.message}`);
            if (err.message.includes('Please log in')) {
                navigate('/login');
            }
        } finally {
            setResourceLoading(false);
        }
    };

    const downloadResource = async (resource) => {
        if (resource.resourceType !== 'file') {
            setError('Only file resources can be downloaded.');
            return;
        }
        const fileExtension = resource.fileName?.split('.').pop()?.toLowerCase();
        const fileType = resource.fileType;
        const fileName = getFileNameFromUrl(resource.url);
        console.log('Downloading resource:', { id: resource.id, fileName: resource.fileName, fileType, url: resource.url, serverFileName: fileName });
        if (!['pdf', 'png', 'jpg', 'jpeg', 'docx'].includes(fileExtension) ||
            (fileType && !['application/pdf', 'image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(fileType))) {
            setError('Only PDF, image (PNG, JPEG), and DOCX resources can be downloaded.');
            return;
        }

        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No authentication token found. Please log in.');
            }
            const response = await fetch(`${API_BASE_URL}/user/Uploads/download/${encodeURIComponent(fileName)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to download ${resource.fileName}: HTTP ${response.status}`);
            }
            const contentType = response.headers.get('Content-Type');
            const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(contentType)) {
                throw new Error(`Expected PDF, image, or DOCX, got ${contentType}`);
            }
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
            if (err.message.includes('Please log in')) {
                navigate('/login');
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
        showResourceModal,
        setShowResourceModal,
        showVideoModal,
        setShowVideoModal,
        resourceLoading,
        currentResource,
        viewResource,
        downloadResource,
    };
};

export default useResources;