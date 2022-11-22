import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../assets/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const vibrate = (email, password) => {
    console.log('ça va viiibreeeer')
    logInWithEmailAndPassword(email, password).then( () => { navigator.vibrate([125,75,125,275,200,275,125,75,125,275,200,600,200,600]) })
  }

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="login">
      <div className="loginBox">

        <div className="row email">
          <label htmlFor="email">Login</label>
          <input 
            type="text" 
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address" />
        </div>

        <div className="row password">
        <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" />
        </div>

        <div className="row submit">
          <button onClick={() => vibrate(email, password)}>Login</button>
          <button onClick={signInWithGoogle}>Login with Google</button>
        </div>
      </div>

      {/*<div className="login__container">
        <input
          type="text"
          className="login__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="login__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="login__btn"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
  </div>*/}
    </div>
  );
}
export default Login;