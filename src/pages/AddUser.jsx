import React from "react";
import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  return (
    <div className="add-user-page">
      <h1>Add User</h1>
      <p>This is the page to add a new user.</p>
      <button onClick={() => navigate("/admin-dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default AddUser;