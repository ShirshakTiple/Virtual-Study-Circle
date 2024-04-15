import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './video.css'
import { ChatState } from "../Context/ChatProvider";

const VideoCall = () => {
    const [RoomCode, setRoomCode] = useState()

    const navigate = useNavigate()
    const submitCode = (e) => {
        e.preventDefault()
        navigate(`/room/${RoomCode}`)
    }

    return (
        // <div>
        //     <form action="" onSubmit={submitCode} className="form">
        //         <input type="text" required placeholder='Enter Room Code' value={RoomCode} onChange={(e) => setRoomCode(e.target.value)} className="input" />
        //         <button className="enterRoom_btn" type="submit">Enter Room</button>
        //     </form>
        // </div>
        <div id="container">
            <div className="button-container">
                <form action="" onSubmit={submitCode} className="form">
                    <input type="text" required placeholder='Enter Room Code' value={RoomCode} onChange={(e) => setRoomCode(e.target.value)} className="input" />
                    <div className="buttons">
                        <button className="enterRoom_btn" type="submit">Enter Room</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VideoCall