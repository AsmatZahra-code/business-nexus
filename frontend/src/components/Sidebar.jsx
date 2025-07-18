import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col p-4">
      <h2 className="text-lg font-bold mb-6">Business Nexus</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/dashboard/investor" className="hover:underline">Investor Dashboard</Link>
        <Link to="/dashboard/entrepreneur" className="hover:underline">Entrepreneur Dashboard</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
