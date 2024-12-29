import React, { useState, useContext } from "react";
import attach from '../image/attach.jpg';
import image from '../image/img.jpg';


import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { arrayUnion, Timestamp, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  
  const handleSend = async () => {
    if (!data || !data.chatId) {
      console.error("Chat ID is undefined. Cannot send message.");
      return;
    }
  
    const messageData = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };
  
    // If image is attached, upload it to Cloudinary
    if (img) {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("upload_preset", "chat_app");
      formData.append("cloud_name", "drygx0fij");
  
      try {
        const res1 = await fetch("https://api.cloudinary.com/v1_1/drygx0fij/image/upload", {
          method: "POST",
          body: formData,
        });
  
        const fileData = await res1.json();
        const uploadedImageURL = fileData.url;
  
        messageData.img = uploadedImageURL || null; // Add the image URL to the message
  
        // Update Firestore with the message and the image URL
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion(messageData),
        });
      } catch (error) {
        console.error("Error uploading image or updating Firestore:", error);
      }
    } else {
      try {
        // If no image, just send the text message
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion(messageData),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  
    // Update the last message for both users in the userChats collection
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  
    // Clear the text input and reset the image
    setText("");
    setImg(null);
  };
  
  
  

  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Type Something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="send">
          <img src={attach} alt="Attach" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={image} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Input;
