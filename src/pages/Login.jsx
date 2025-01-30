import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";  

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setMessage("Logging in...");
      setTimeout(() => {
        setMessage("Login successful!");
      }, 1000);
    } else {
      setMessage("Please enter both email and password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
      <p className="toggle-text">
        Don't have an account?{" "}
        <span className="toggle-button" onClick={() => navigate("/signup")}>
          Signup
        </span>
      </p>
    </div>
  );
}

export default Login;
