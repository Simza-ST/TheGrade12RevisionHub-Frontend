import React, { useState } from 'react';
import { loadFileData } from '../utils/loadFileData';

const FileUploader = () => {
    const [csvOutput, setCsvOutput] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const csv = await loadFileData(file);
            setCsvOutput(csv);
            setError('');
        } catch (err) {
            setError('Failed to process file.');
            setCsvOutput('');
        }
    };

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white">Upload XLSX File</h2>
            <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="my-4 text-white"
            />
            {error && <p className="text-red-400">{error}</p>}
            {csvOutput && (
                <pre className="bg-gray-800 text-white p-4 rounded max-h-96 overflow-auto">{csvOutput}</pre>
            )}
        </div>
    );
};

export default FileUploader;