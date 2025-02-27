import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceRequestForm from "./ServiceRequestForm";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication token
    navigate("/");

  };

  return (
    <div className="user-dashboard">
      <ServiceRequestForm />
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default UserDashboard;