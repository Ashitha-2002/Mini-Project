import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"; // Import Login component
import Signup from "./pages/Signup"; // Import Signup component
import UserDashboard from "./pages/UserDashboard"; // User Dashboard (You can create this page)
import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard (You can create this page)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Default path for login */}
        <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
        <Route path="/user-dashboard" element={<UserDashboard />} /> {/* User Dashboard */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin Dashboard */}
      </Routes>
    </Router>
  );
}

export default App;
