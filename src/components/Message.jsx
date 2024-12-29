import React from "react";
import { format } from "date-fns"; // Import a library for formatting dates
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useEffect } from "react";
import { useRef } from "react";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Format the timestamp into a readable format (e.g., 'HH:mm')
  const formattedTime = format(message.date.toDate(), "HH:mm");
  const ref=useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behaviour:"smooth"})
  },[message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="User Avatar"
        />
        <span>{formattedTime}</span> {/* Display the formatted time */}
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
