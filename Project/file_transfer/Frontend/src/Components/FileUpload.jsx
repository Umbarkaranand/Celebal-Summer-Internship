import React, { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

const FileUpload = ({ token }) => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];
            socket.emit('upload', {
                filename: file.name,
                fileData: base64data,
                recipient: 'some-recipient-id', // Replace with actual recipient ID
            });

            socket.on('uploadStatus', (data) => {
                setStatus(data.message);
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <div>{status}</div>
        </div>
    );
};

export default FileUpload;
