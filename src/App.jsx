import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddUser from "./pages/AddUser";
import DeleteUser from "./pages/DeleteUser";
import ViewUsers from "./pages/ViewUsers";
import ServiceRequestForm from "./pages/ServiceRequestForm";


function App() {
  return (
    <Router>
      <Routes>
          <Route index element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/delete-user" element={<DeleteUser />} />
          <Route path="/view-users" element={<ViewUsers />} />
          <Route path="/service-request" element={<ServiceRequestForm />} />
      </Routes>
    </Router>
  );
}

export default App;