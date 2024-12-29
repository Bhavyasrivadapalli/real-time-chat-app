import { onAuthStateChanged } from "firebase/auth";
import { Children, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useReducer } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { data } from "react-router-dom";



export const ChatContext=createContext();

export const ChatContextProvider=({children})=>{
  const {currentUser}=useContext(AuthContext);
  const INITIAL_STATE=
  {
    user:{},
    chatId:"null",
  }
  const chatReducer=(state,action)=>{
    switch(action.type){
      case "CHANGE_USER":
        return {
          user:action.payload,
          chatId:currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,

        }
        default:
          return state;
    }
  };
  const [state,dispatch]=useReducer(chatReducer,INITIAL_STATE);
 return <>
 <ChatContext.Provider value={{data:state,dispatch}}>{children}</ChatContext.Provider></>
}