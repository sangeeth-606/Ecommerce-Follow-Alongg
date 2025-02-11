import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold mb-4 md:mb-0">
          E-Commerce
        </Link>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link
            to="/"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors"
          >
            Home
          </Link>

          <Link
            to="/"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors"
          >
            My Products
          </Link>

          <Link
            to="/add-product"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors"
          >
            Add Product
          </Link>

          <Link
            to="/"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors"
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
