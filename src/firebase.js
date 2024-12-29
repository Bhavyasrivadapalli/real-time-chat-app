// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9XBeFUCZ2rCBiVxIvNA5xMv5piiFj9QY",
  authDomain: "chat-7f80f.firebaseapp.com",
  projectId: "chat-7f80f",
  storageBucket: "chat-7f80f.firebasestorage.app",
  messagingSenderId: "1069964111529",
  appId: "1:1069964111529:web:85a7d75ef600c1333e03b8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore();