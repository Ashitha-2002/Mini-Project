import React from "react";
import { useNavigate } from "react-router-dom";

function DeleteUser() {
  const navigate = useNavigate();

  return (
    <div className="delete-user-page">
      <h1>Delete User</h1>
      <p>This is the page to delete a user.</p>
      <button onClick={() => navigate("/admin-dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default DeleteUser;