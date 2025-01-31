import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests
import "./DeleteUser.css"; // Import the CSS file for styling

function DeleteUser() {
  const navigate = useNavigate();

  // State for the list of users and selected user
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the list of users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        console.log("Users fetched:", response.data); // Log the fetched data
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error); // Log the error
        if (error.response) {
          setMessage(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          setMessage("No response from the server. Please check your connection.");
        } else {
          setMessage("An unexpected error occurred.");
        }
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async () => {
    if (!selectedUserId) {
      setMessage("Please select a user to delete.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/${selectedUserId}`
      );

      if (response.status === 200) {
        setMessage("User deleted successfully!");
        // Remove the deleted user from the list
        const updatedUsers = users.filter((user) => user.id !== selectedUserId);
        console.log("Updated users:", updatedUsers); // Log the updated state
        setUsers(updatedUsers); // Update the state
        setSelectedUserId(""); // Reset the selected user
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Failed to delete user.");
    }
  };

  console.log("Component re-rendered with users:", users); // Log re-renders

  return (
    <div className="delete-user-page">
      <h1>Delete User</h1>
      <div className="user-list">
        <label>Select a user to delete:</label>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDelete}>Delete User</button>
      <p className="message">{message}</p>
      <button onClick={() => navigate("/admin-dashboard")}>Back to Dashboard</button>
    </div>
  );
}

export default DeleteUser;