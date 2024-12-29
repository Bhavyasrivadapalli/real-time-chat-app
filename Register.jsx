import React, { useState } from "react";
import image from '../image/image.png';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import { Link,useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();



const handleSubmit = async (e) => {
  e.preventDefault();
  const displayName = e.target[0].value;
  const email = e.target[1].value;
  const password = e.target[2].value;
  const file = e.target[3].files[0];
  
  try {
    setLoading(true);
    
    // Create user with email and password
    const res = await createUserWithEmailAndPassword(auth, email, password);

    let uploadedImageURL = null;
    
    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "drygx0fij");

      // Upload the image to Cloudinary
      const res1 = await fetch("https://api.cloudinary.com/v1_1/drygx0fij/image/upload", {
        method: "POST",
        body: data,
      });

      const fileData = await res1.json();
      uploadedImageURL = fileData.url;
    }

    // Update the user's Firebase Auth profile with displayName and photoURL
    await updateProfile(res.user, {
      displayName,
      photoURL: uploadedImageURL || null, // Set the photoURL if available
    });

    // Store the user in Firestore
    await setDoc(doc(db, 'users', res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
      photoURL: uploadedImageURL || null
    });

    // Initialize an empty document for userChats in Firestore
    await setDoc(doc(db, 'userChats', res.user.uid), {});

    // Navigate to the home page or dashboard after successful registration
    navigate('/');
    
  } catch (err) {
    setErr(true);
    console.log(err.message);  // Log the error for debugging
  } finally {
    setLoading(false);
  }
};



  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">VIBE TALK</span>
          <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Display Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <img src={image} alt="Add Avatar" />
              <span>Add an Avatar</span>
            </label>
            <button type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
            {err && <span>Something went wrong...</span>}
          </form>
          <p>You do have an account?<Link to={"/register"}>Login</Link> </p>
        </div>
      </div>
    </>
  );
};

export default Register;
