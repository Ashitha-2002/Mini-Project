import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "./Login.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const departments = [
    "Select Department",
    "MSc - Computer Science",
    "MSc - Chemistry",
    "Msc. - Mathematics",
    "MBA - Finance",
    "MBA - TTM",
    "M.com",
    "MA - Economics",
    "MA - English",
  ];

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || department === "Select Department") {
      setMessage("Please fill in all fields.");
      return;
    }

    const serviceID = "service_czeghym";  // Your correct service ID
    const templateID = "template_0cjw2ze"; // Your correct template ID
    const userID = "c08HrxMJhln5GA7l2";    // Your correct user ID

    const templateParams = {
      to_email: "ashithashettyk@gmail.com",
      to_name: "Authorized Person",
      email: email,
      department: department,
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        if (response.status === 200) {
          setMessage("Signup request sent. Awaiting approval.");
        } else {
          console.error("Unexpected response:", response);
          setMessage("Error sending request.");
        }
      })
      .catch((err) => {
        console.error("Email sending failed", err);
        console.error("Full error details:", err);
        setMessage("Error sending request.");
      });
  };

  return (
    <div className="login-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Department</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <button type="submit">Request Signup</button>
      </form>
      <p className="message">{message}</p>
      <p className="toggle-text">
        Already have an account?{" "}
        <span className="toggle-button" onClick={() => navigate("/")}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
