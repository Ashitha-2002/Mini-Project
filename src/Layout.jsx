import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <Outlet /> {/* This renders the nested routes */}
    </div>
  );
}

export default Layout;