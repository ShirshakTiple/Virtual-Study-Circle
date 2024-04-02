import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forum_02.css';

const Forum = () => {
    const [title, setTitle] = useState("");
    const [thread, setThread] = useState("");
    const [threads, setThreads] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        try {
            const response = await axios.get('http://localhost:3001/forum/getThreads');
            setThreads(response.data);
        } catch (error) {
            console.error('Error fetching threads:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3001/forum/createThread', { title, thread, token });
            if (response.status === 200) {
                setTitle('');
                setThread('');
                alert('Thread created successfully');
                fetchThreads();
            } else {
                console.error('Error creating thread:', response.data.error);
            }
        } catch (error) {
            console.error('Error creating thread:', error);
        }
    };

    const handleReplyClick = (threadId) => {
        navigate(`/replies/${threadId}`);
    };

    const handleSignOut = () => {
        alert('Signed Out');
        localStorage.removeItem('token');
        navigate('/login');
    };


    return (
        <main className='forum'>
            <h2 className='forumTitle'>Create a Thread</h2>
            <form className='forumForm' onSubmit={handleSubmit}>
                <div className='forum__container'>
                    <label>Title</label>
                    <input type='text' name='threadTitle' required value={title} onChange={(e) => setTitle(e.target.value)} />
                    <label>Content</label>
                    <textarea name='threadContent' required value={thread} onChange={(e) => setThread(e.target.value)}></textarea>
                </div>
                <button className='forumBtn' type="submit">CREATE THREAD</button>
            </form>
            <button className='signout' onClick={handleSignOut}>Sign Out</button>

            {/* Display Threads */}
            <div className="threads">
                {threads.map((threadItem, index) => (
                    <div key={index} className="thread">
                        <h3>{threadItem.parent.title}</h3>
                        <p>Created at: {new Date(threadItem.parent.created_at).toLocaleString()}</p>
                        <p>User_id : {threadItem.parent.user_id.name}</p>
                        <p>{threadItem.parent.message}</p>

                        {/* Display child threads */}
                        {threadItem.children.length > 0 && (
                            <div className="child-threads">
                                {threadItem.children.map((childThread, childIndex) => (
                                    <div key={childIndex} className="child-thread">
                                        <h4>{childThread.title}</h4>
                                        <p>Created at: {new Date(childThread.created_at).toLocaleString()}</p>
                                        <p>User_id : {childThread.user_id.name}</p>
                                        <p>{childThread.message}</p>
                                        {/* <button onClick={() => handleReplyClick(childThread._id)}>Reply</button> */}
                                        {/* You can display more information here */}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Button to reply to parent thread */}
                        <button onClick={() => handleReplyClick(threadItem.parent._id)}>Reply</button>
                    </div>
                ))}
            </div>
        </main>

    );
};

export default Forum;
