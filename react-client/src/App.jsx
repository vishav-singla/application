import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [convertedFile, setConvertedFile] = useState(null);
    const [metadata, setMetadata] = useState(null);

    const uploadFile = async () => {
        if (!file) return alert('Please upload a file!');
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/upload', formData);
            setConvertedFile(response.data.filename);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload and convert file.');
        } finally {
            setLoading(false);
        }
    };

    const fetchMetadata = async () => {
        if (!convertedFile) return alert('No file converted yet!');
        try {
            const response = await axios.get(`http://localhost:8080/metadata?filename=${convertedFile}`);
            setMetadata(response.data);
        } catch (error) {
            console.error('Error fetching metadata:', error);
            alert('Failed to fetch metadata.');
        }
    };

    const downloadFile = () => {
        if (!convertedFile) return alert('No file converted yet!');
        window.location.href = `http://localhost:8080/download?filename=${convertedFile}`;
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Docx to PDF Converter</h1>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadFile} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload and Convert'}
            </button>
            <br /><br />
            {convertedFile && (
                <div>
                    <button onClick={fetchMetadata}>View Metadata</button>
                    <button onClick={downloadFile}>Download PDF</button>
                    {metadata && (
                        <pre>{JSON.stringify(metadata, null, 2)}</pre>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
