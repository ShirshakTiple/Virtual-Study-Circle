import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { ChatState } from "../Context/ChatProvider";
import { useNavigate } from 'react-router-dom'

import './room.css';


const Room = () => {
    const { roomID } = useParams()
    console.log(roomID)

    const { share, setShare } = ChatState()
    const navigate = useNavigate()

    const meeting = async (element) => {
        const appID = 999384949
        const serverSecret = "551bb6ab8d8a0dc2afa25fa77d027846"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, Date.now().toString(), "sidhesh")
        const zp = ZegoUIKitPrebuilt.create(kitToken)

        zp.joinRoom({
            container: element,
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            }
        })
    }
    const shared = () => {
        setShare(false)
        localStorage.setItem('roomId', roomID)
        navigate(`/groupchat`)
        // navigate(`/videochat`)
    }

    return (
        <div className="vc_outer_box">
            <div className="vc_inner_box" ref={meeting} >
            </div>
            {/* <button id="vc_sharecode_btn" onClick={shared}>Share roomcode</button> */}
        </div>
    )
}

export default Room