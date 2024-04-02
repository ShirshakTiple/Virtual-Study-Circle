import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forum = () => {
    const [title, setTitle] = useState("");
    const [thread, setThread] = useState("");
    const [file, setFile] = useState(null);
    const [threads, setThreads] = useState([]);
    const [parentImagePreviews, setParentImagePreviews] = useState([]);
    const [childImagePreviews, setChildImagePreviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchThreads();
    }, []);

    useEffect(() => {
        if (threads.length > 0) {
            const parentPreviews = [];
            const childPreviews = [];
            threads.forEach(threadItem => {
                if (threadItem.parent.file && threadItem.parent.file.contentType.startsWith('image/')) {
                    const imageDataArray = threadItem.parent.file.data.data;
                    const contentType = threadItem.parent.file.contentType;
                    const imageUrl = handleImagePreview(imageDataArray, contentType);
                    parentPreviews.push(imageUrl);
                } else {
                    parentPreviews.push(null);
                }
                const childImages = [];
                threadItem.children.forEach(childThread => {
                    if (childThread.file && childThread.file.contentType.startsWith('image/')) {
                        const imageDataArray = childThread.file.data.data;
                        const contentType = childThread.file.contentType;
                        const imageUrl = handleImagePreview(imageDataArray, contentType);
                        childImages.push(imageUrl);
                    } else {
                        childImages.push(null);
                    }
                });
                childPreviews.push(childImages);
            });
            setParentImagePreviews(parentPreviews);
            setChildImagePreviews(childPreviews);
        }
    }, [threads]);

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
        const formData = new FormData();
        formData.append('title', title);
        formData.append('thread', thread);
        formData.append('token', token);
        if (file) {
            formData.append('file', file);
        }
        try {
            const response = await axios.post("http://localhost:3001/forum/createThread", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setTitle('');
                setThread('');
                setFile(null);
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

    const handleImagePreview = (imageDataArray, contentType) => {
        const uint8Array = new Uint8Array(imageDataArray);
        const blob = new Blob([uint8Array], { type: contentType });
        return URL.createObjectURL(blob);
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
                    <input className="file_upload" type="file" name='file' onChange={(e) => setFile(e.target.files[0])} /><br />
                </div>
                <button className='forumBtn' type="submit">CREATE THREAD</button>
            </form>
            <button className='signout' onClick={handleSignOut}>Sign Out</button>

            <div className="threads">
                {threads.map((threadItem, index) => (
                    <div key={index} className="thread">
                        <h3>{threadItem.parent.title}</h3>
                        <p>Created at: {new Date(threadItem.parent.created_at).toLocaleString()}</p>
                        <p>User_id : {threadItem.parent.user_id.name}</p>
                        <p>{threadItem.parent.message}</p>
                        {threadItem.parent.file && (
                            <div>
                                <p>File Name: {threadItem.parent.file.fileName}</p>
                                <p>File Type: {threadItem.parent.file.contentType}</p>
                                {parentImagePreviews[index] && (
                                    <img src={parentImagePreviews[index]} alt="Preview" />
                                )}
                            </div>
                        )}

                        {threadItem.children.length > 0 && (
                            <div className="child-threads">
                                {threadItem.children.map((childThread, childIndex) => (
                                    <div key={childIndex} className="child-thread">
                                        <h4>{childThread.title}</h4>
                                        <p>Created at: {new Date(childThread.created_at).toLocaleString()}</p>
                                        <p>User_id : {childThread.user_id.name}</p>
                                        <p>{childThread.message}</p>
                                        {childThread.file && (
                                            <div>
                                                <p>File Name: {childThread.file.fileName}</p>
                                                <p>File Type: {childThread.file.contentType}</p>
                                                {childImagePreviews[index] && childImagePreviews[index][childIndex] && (
                                                    <img src={childImagePreviews[index][childIndex]} alt="Preview" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <button onClick={() => handleReplyClick(threadItem.parent._id)}>Reply</button>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Forum;
