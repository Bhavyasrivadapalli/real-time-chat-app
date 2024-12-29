import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import image from '../image/image.png';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const email = e.target[0].value;
    const password = e.target[1].value;

    // Reset error state and set loading to true before attempting sign-in
    setErr(false);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");  // Redirect to homepage on successful login
    } catch (err) {
      setErr(true);  // Set error state if login fails
      console.log(err.message);  // Log the error for debugging
    } finally {
      setLoading(false);  // Stop loading regardless of success or failure
    }
  };

  return (
    <>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">VIBE TALK</span>
          <span className="title">Login</span>  {/* Changed "Register" to "Login" */}
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button disabled={loading}>
              {loading ? "Logging in..." : "Sign in"} {/* Button text changes based on loading */}
            </button>
            {err && <span>Something went wrong, please try again.</span>}
          </form>
          <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
