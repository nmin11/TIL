import React from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">PixiJS Demo</h1>
      <div className="flex space-x-4">
        <Link to="/" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Home</Link>
        <Link to="/getting-started" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Getting Started</Link>
        <Link to="/fish-pond" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Fish Pond</Link>
        <Link to="/choo-choo-train" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Choo Choo Train</Link>
        <Link to="/spine-boy-adventure" className="px-3 py-2 hover:bg-gray-700 rounded transition duration-200">Spine Boy Adventure</Link>
      </div>
    </nav>
  );
};

export default NavBar;
