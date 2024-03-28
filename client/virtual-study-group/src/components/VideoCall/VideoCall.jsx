import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './video.css'

const VideoCall = ()=>{
    const [RoomCode, setRoomCode]= useState()
     
    const navigate= useNavigate()
    const submitCode = (e)=>{
        e.preventDefault()
        navigate(`/room/${RoomCode}`) 
    }

    return(
        <div>
            <form action="" onSubmit={submitCode} className="form">
               <label htmlFor='' className='enter'>Enter Room Code</label>
               <input type="text" required placeholder='Enter Room Code' value={RoomCode} onChange={(e) => setRoomCode(e.target.value)} className="input"/>
               <button type="submit">Enter Room Code</button>
            </form>
        </div>
    )
}

export default VideoCall