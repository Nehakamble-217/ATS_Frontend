import React, { useState } from 'react';
import axios from 'axios';

const AddResumes = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleUpload = () => {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('files', selectedFiles[i]);
        }

        axios.post('http://192.168.1.38:8082/api/resumes/upload', formData)
            .then(response => {
                console.log(response.data);
                
            })
            .catch(error => {
                console.error('Error uploading files: ', error);
                
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg flex justify-center items-center flex-col">
                <h2 className="text-2xl font-bold text-gray-500 mb-4">Upload Resume</h2>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleUpload}
                    className="bg-[#ffcb9b] text-white p-2 rounded hover:bg-white hover:text-[#ffcb9b] shadow-sm transition"
                >
                    Upload
                </button>
            </div>
        </div>
    );
};

export default AddResumes;
