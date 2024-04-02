import axios from "axios";
import React, { useState } from "react";
import { useParams , useNavigate } from 'react-router-dom';

const Replies = () => {
    const { threadId } = useParams();
    const [reply, setReply] = useState("");
    const [file, setFile] = useState(null); // Changed initial state to null
    const navigate = useNavigate();

    const handleSubmitReply = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('reply', reply);
        formData.append('threadId', threadId);
        formData.append('token', token);
        if (file) { // Check if file is selected
            formData.append('file', file);
        }

        axios
            .post("http://localhost:3001/forum/threadReply", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                if (response.status === 200) {
                    alert('Reply added successfully');
                    setReply('');
                    setFile(null); // Reset file state
                    navigate('/forum');
                } else {
                    console.error('Error adding reply:', response.data.error);
                }
            })
            .catch(error => {
                console.error('Error adding reply:', error);
            });
    };

    return (
        <main className='replies'>
            <form className='modal__content' onSubmit={handleSubmitReply}>
                <label htmlFor='reply'>Reply to the thread</label>
                <textarea rows={5} value={reply} onChange={(e) => setReply(e.target.value)} type='text' name='reply' className='modalInput' /><br />
                <input className="file_upload" type="file" name='file' onChange={(e) => setFile(e.target.files[0])} /><br />
                <button className='modalBtn'>SEND</button>
            </form>
        </main>
    );
};

export default Replies;
