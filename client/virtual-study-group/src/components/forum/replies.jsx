import axios from "axios";
import React, { useState } from "react";
import { useParams , useNavigate } from 'react-router-dom';

const Replies = () => {
    const { threadId } = useParams();
    const [reply, setReply] = useState("");
    const navigate = useNavigate();

    const handleSubmitReply = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(reply)
        axios
            .post("http://localhost:3001/forum/threadReply", { reply , threadId , token})
            .then(response => {
                if (response.status === 200) {
                    alert('Reply added successfully');
                    setReply('');
                    navigate('/forum')
                }
                else {
                    console.error('Error adding reply:', response.data.error);
                }
            })
            .catch(error => {
                console.error('Error adding reply:', error);
            })
    };

    return (
        <main className='replies'>
            <form className='modal__content' onSubmit={handleSubmitReply}>
                <label htmlFor='reply'>Reply to the thread</label>
                <textarea
                    rows={5}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    type='text'
                    name='reply'
                    className='modalInput'
                />

                <button className='modalBtn'>SEND</button>
            </form>
        </main>
    );
};

export default Replies;