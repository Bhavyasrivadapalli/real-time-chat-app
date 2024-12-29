import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (!currentUser?.uid) return; // Make sure currentUser.uid is available

    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Fallback in case no data exists
      });

      return () => {
        unsub(); // Cleanup the listener when component unmounts
      };
    };

    getChats();
  }, [currentUser?.uid]); // Only re-run when currentUser.uid changes

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        .filter(([key, chat]) => chat.userInfo) // Only show chats with valid userInfo
        .sort((a, b) => b[1].date - a[1].date)
        .map(([key, chat]) => (
          <div className="userChat" key={key} onClick={() => handleSelect(chat.userInfo)}>
            <img
              src={chat.userInfo?.photoURL || 'default-avatar.png'} // Use a default image if photoURL is missing
              alt="User Avatar"
            />
            <div className="userChatInfo">
              <span>{chat.userInfo?.displayName || 'Unknown User'}</span> {/* Fallback to 'Unknown User' */}
              <p>{chat.lastMessage?.text || 'No message yet'}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
