import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider=({children})=>{
    const [selectedChat, setSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const [notification, setNotification] = useState([])
    const [newMessage, setNewMessage] = useState("");
    const [share, setShare] = useState(true);
    return <ChatContext.Provider value={{selectedChat, setSelectedChat, chats, setChats,notification, setNotification,newMessage, setNewMessage, share, setShare}}>
        {children}
        </ChatContext.Provider>
}

export const ChatState= ()=>{
    return useContext(ChatContext)
}

export default ChatProvider