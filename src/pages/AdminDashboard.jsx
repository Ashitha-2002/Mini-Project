import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import the CSS file for styling

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear authentication token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the Admin Dashboard.</p>

      <div className="dashboard-buttons">
        <button
          className="dashboard-button add-user"
          onClick={() => navigate("/add-user")}
        >
          Add User
        </button>
        <button
          className="dashboard-button delete-user"
          onClick={() => navigate("/delete-user")}
        >
          Delete User
        </button>
        <button
          className="dashboard-button view-users"
          onClick={() => navigate("/view-users")}
        >
          View Users
        </button>
      </div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
