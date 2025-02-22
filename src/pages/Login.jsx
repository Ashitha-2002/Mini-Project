import React, { useState, useEffect } from "react"; // Import useEffect
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123";

  // Clear input fields when role changes
  useEffect(() => {
    setEmail(""); // Clear email field
    setPassword(""); // Clear password field
    setMessage(""); // Clear any messages
  }, [role]); // Trigger this effect when `role` changes

  const handleLogin = async (e) => {
    e.preventDefault();

    if (role === "admin") {
      if (email === adminEmail && password === adminPassword) {
        setMessage("Admin login successful!");
        navigate("/admin-dashboard");
      } else {
        setMessage("Invalid admin credentials");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
          role,
        });

        if (response.status === 200) {
          setMessage("User login successful!");
          navigate("/user-dashboard");
        }
      } catch (error) {
        setMessage(error.response?.data?.message || "Login failed");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{role === "admin" ? "Admin Login" : "User Login"}</h2>
      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {role === "admin" ? "Login as Admin" : "Login as User"}
        </button>
      </form>
      <p className="message">{message}</p>

      {/* Toggle between Admin and User login */}
      <p className="toggle-text">
        {role === "admin" ? (
          <>
            Not an admin?{" "}
            <span className="toggle-button" onClick={() => setRole("user")}>
              Login as User
            </span>
          </>
        ) : (
          <>
            Admin?{" "}
            <span className="toggle-button" onClick={() => setRole("admin")}>
              Login as Admin
            </span>
          </>
        )}
      </p>

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