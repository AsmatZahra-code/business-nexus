import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-indigo-700">Dashboard</h1>
      <div>
        {/* You can add logout/user info here */}
        <span className="text-sm text-gray-600">Welcome!</span>
      </div>
    </header>
  );
};

export default Navbar;
