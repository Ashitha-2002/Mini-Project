import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ViewUsers.css"; // Import the CSS file for styling

function ViewUsers() {
  const navigate = useNavigate();
  // State to hold the list of users and any error messages
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        console.log("Users fetched:", response.data); // Log the fetched data
        setUsers(response.data); // Update the state with the list of users
      } catch (error) {
        console.error("Error fetching users:", error);
        setMessage("Failed to fetch users. Please try again later.");
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="view-users-page">
      <h1>View Users</h1>
      {message && <p className="error-message">{message}</p>}
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <div className="user-list">
          <table>
            <thead>
              <tr>
                <th>UserID</th>
                <th>Email</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.UserID}>
                  <td>{user.UserID}</td>
                  <td>{user.Email}</td>
                  <td>{user.Department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button onClick={() => navigate("/admin-dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default ViewUsers;
