import { Box } from "@chakra-ui/react";
import SideDrawer from "./SideDrawer";
import MyChats from "./MyChat"
import ChatBox from "./ChatBox"
import axios from 'axios';
import "./chat.css"
import { useState } from "react";
const ChatPage = () => {

  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div className="chat" style={{ width: "100%"}}>
      <SideDrawer/>
      <Box display='flex' justifyContent='space-between' w='100%' h='91.5vh' p='10px'>
        <MyChats fetchAgain={fetchAgain} />
        {console.log(fetchAgain)}
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        
      </Box>
    </div>
  );
};

export default ChatPage;