
import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Business Nexus</h1>
        <div className="flex space-x-4">
          <Link to="/profile">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              My Profile
            </button>
          </Link>
          <Link to="/">
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
              Logout
            </button>
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
