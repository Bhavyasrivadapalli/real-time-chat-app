import React from "react";
import add from '../image/add.jpg'
import cam from '../image/cam.jpg'
import dots from '../image/dots.jpg'
import Message from "./Message";
import Input from "./Input";
import Messages from "./Messages";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
const Chat=()=>{
  const {data}=useContext(ChatContext);
  return <>
  <div className="chat">
    <div className="chatInfo">
      <span>{data.user?.displayName}</span>
      <div className="chatIcons">
        <img src={add} alt="" />
        <img src={cam} alt="" />
        <img src={dots} alt="" />
      </div>
    
    
    </div>
 
    <Messages/>
 
   
    <Input/>
  </div>
  </>
}
export default Chat;