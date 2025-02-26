import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddUser.css";

function AddUser() {
  const navigate = useNavigate();

  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");

  const departments = [
    "MSc - Computer Science",
    "MSc - Chemistry",
    "MSc - Mathematics",
    "MBA - Finance",
    "MBA - TTM",
    "M.Com",
    "MA - Economics",
    "MA - English",
  ];

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email,
        password,
        department,
      });

      if (response.status === 201) {
        setMessage("User added successfully!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setDepartment("");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to add user.");
    }
  };

  return (
    <div className="add-user-page">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" disabled>Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add User</button>
      </form>
      <p className="message">{message}</p>
      <button onClick={() => navigate("/admin-dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default AddUser;
