import React from "react";
import { useParams } from "react-router-dom";
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from 'react-router-dom'


const Room=()=>{
    const {roomID}= useParams()
    console.log(roomID)

    const{share, setShare}= ChatState()
    const navigate= useNavigate()

    const meeting = async(element)=>{
        const appID = 160947722
        const serverSecret ="cb7dbba2228293474af155560bea1715"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(),"sidhesh")
        const zp= ZegoUIKitPrebuilt.create(kitToken)

        zp.joinRoom({
            container: element,
            scenario:{
                mode: ZegoUIKitPrebuilt.GroupCall,
            }
        })
    }
    const shared=()=>{
         setShare(false)
         localStorage.setItem('roomId',roomID)
         navigate(`/home/chats`)
     }

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <div ref={meeting} style={{width:"100vw", height:"100vh", marginTop:"30px"}}>
        </div>
        <button style={{ margin:"40px", borderStyle:"solid", borderRadius:"8px", color:"white", backgroundColor:"blue", width:"150px"}} onClick={shared} >Share roomcode</button>
        </div>
    )
}

export default Room