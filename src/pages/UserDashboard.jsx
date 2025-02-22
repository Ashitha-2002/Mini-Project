import React from "react";
import ServiceRequestForm from "./ServiceRequestForm";
import "./UserDashboard.css"

function UserDashboard() {
  return (
    <div className = "user-dashboard">
      <ServiceRequestForm />
    </div>
  );
}

export default UserDashboard;
