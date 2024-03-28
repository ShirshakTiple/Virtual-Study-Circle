import React from "react";
import { useParams } from "react-router-dom";

const Room=()=>{
    const {roomID}= useParams()
    console.log(roomID)
    return(
        <div>
            Room
        </div>
    )
}

export default Room