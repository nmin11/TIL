import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">PixiJS Demo</h1>
      <div className="flex space-x-4">
        <Link to="/" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Home</Link>
        <Link to="/basic" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Basic</Link>
        <Link to="/sprite" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Sprite</Link>
        <Link to="/animation" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Animation</Link>
      </div>
    </nav>
  );
};

export default NavBar;
