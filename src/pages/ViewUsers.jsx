import React from "react";
import { useNavigate } from "react-router-dom";

function ViewUsers() {
  const navigate = useNavigate();

  return (
    <div className="view-users-page">
      <h1>View Users</h1>
      <p>This is the page to view all users.</p>
      <button onClick={() => navigate("/admin-dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default ViewUsers;