import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role as "user"
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Predefined credentials for Admin
  const adminCredentials = {
    email: "admin@gmail.com", // Admin email
    password: "admin123", // Admin password
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check login credentials based on role
    if (role === "admin") {
      // Check admin credentials
      if (email === adminCredentials.email && password === adminCredentials.password) {
        setMessage("Admin login successful!");
        navigate("/admin-dashboard"); // Redirect to Admin dashboard
      } else {
        setMessage("Invalid admin credentials!");
      }
    } else {
      // Check user credentials (Here, you can integrate your actual user authentication logic)
      if (email && password) {
        setMessage("User login successful!");
        navigate("/user-dashboard"); // Redirect to User dashboard
      } else {
        setMessage("Please fill in both email and password.");
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
