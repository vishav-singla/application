import React, { useState } from 'react';
import axios from 'axios';
import { FileUp, Download, FileSearch } from 'lucide-react';

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
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Docx to PDF Converter
                </h1>
                
                <div className="mb-4">
                    <label 
                        htmlFor="file-upload" 
                        className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition"
                    >
                        <input 
                            id="file-upload"
                            type="file" 
                            className="hidden" 
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <span className="text-gray-600">
                            {file ? file.name : 'Choose a .docx file'}
                        </span>
                    </label>
                </div>
                
                <button 
                    onClick={uploadFile} 
                    disabled={loading || !file}
                    className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg text-white font-semibold transition ${
                        loading || !file 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                    }`}
                >
                    <FileUp className="mr-2" />
                    {loading ? 'Converting...' : 'Upload and Convert'}
                </button>
                
                {convertedFile && (
                    <div className="mt-6 space-y-4">
                        <div className="flex space-x-4">
                            <button 
                                onClick={fetchMetadata}
                                className="flex-1 flex items-center justify-center space-x-2 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                <FileSearch className="mr-2" />
                                View Metadata
                            </button>
                            
                            <button 
                                onClick={downloadFile}
                                className="flex-1 flex items-center justify-center space-x-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                            >
                                <Download className="mr-2" />
                                Download PDF
                            </button>
                        </div>
                        
                        {metadata && (
                            <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-auto">
                                <pre className="text-xs text-gray-700">
                                    {JSON.stringify(metadata, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;