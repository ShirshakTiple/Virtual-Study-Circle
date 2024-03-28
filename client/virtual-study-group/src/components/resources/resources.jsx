import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './resources.css';

function Resource() {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [filesList, setFilesList] = useState([]);

    useEffect(() => {
        fetchFilesList();
    }, []); // Run once when component mounts

    const fetchFilesList = async () => {
        try {
            const response = await axios.get("http://localhost:3001/files");
            setFilesList(response.data);
        } catch (error) {
            console.error('Error fetching files list:', error);
            // You may want to handle the error here, e.g., display an error message to the user
        }
    }

    const submitFile = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);

            await axios.post("http://localhost:3001/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTitle('');
            setFile('');
            alert('File uploaded successfully');
            // Refresh files list after upload
            fetchFilesList();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    if (error.response.data.error === 'No file') {
                        alert('No file selected');
                    }
                    else if (error.response.data.error === 'Same title') {
                        alert('File with same title already exists');
                    }
                    else if (error.response.data.error === 'Same file') {
                        alert('Same file already exists with different title');
                    }
                }
                else if (error.response.status === 500) {
                    alert('Error uploading file');
                }
            }
            else {
                alert('Error uploading file');
            }
        }
    }

    const handleViewFile = (fileTitle) => {
        // Implement file view functionality, e.g., open in a new tab or download
        axios.get(`http://localhost:3001/files/${encodeURIComponent(fileTitle)}`, {
            responseType: 'blob' // Set response type to blob
        })
            .then(response => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const url = URL.createObjectURL(blob);
                window.open(url, '_blank');
            })
            .catch(error => {
                console.error('Error fetching file:', error);
                // Handle error, e.g., display an error message to the user
            });
    }

    const handleDeleteFile = async (title) => {
        try {
            // Make a DELETE request to your backend endpoint to delete the file
            await axios.delete(`http://localhost:3001/files/${title}`);

            // Update the files list after deletion
            fetchFilesList();

            // Optionally, you can display a success message to the user
            alert('File deleted successfully');
        } catch (error) {
            // Handle errors
            console.error('Error deleting file:', error);
            alert('Error deleting file');
        }
    }

    return (
        <section className="outside-wrapper">
            <h1 className='heading_res'>Resource Sharing</h1>
            <div className="container-outer">

                <form onSubmit={submitFile}>
                    <h4 className='upload'>Upload</h4>
                    <input className="title_section" type="text" placeholder='' value={title} required onChange={(e) => setTitle(e.target.value)} /><br />
                    <input className="file_upload" type="file" name='file' accept='application/pdf' required onChange={(e) => setFile(e.target.files[0])} /><br />
                    <button className="submit-btn" type='submit'>
                        Submit
                    </button>
                </form>

                <h4 className='list_files'>List of Files</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Filename</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filesList.map((file) => (
                            <tr key={file._id}>
                                <td>{file.title}</td>
                                <td>{file.filename}</td>
                                <td>
                                    <button onClick={() => handleViewFile(file.title)}>View</button>
                                    <button onClick={() => handleDeleteFile(file.title)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Resource;
