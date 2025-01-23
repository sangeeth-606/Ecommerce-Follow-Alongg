/* eslint-disable react/prop-types */
// import React from 'react';
import { useNavigate } from "react-router-dom";
import ProductCardList from "./ProductCardList";

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b shadow-sm">
        <div className="flex items-center space-x-4">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-12 h-12 text-blue-600"
          >
            <circle cx="50" cy="50" r="45" fill="currentColor" />
            <text
              x="50"
              y="50"
              textAnchor="middle"
              dy=".3em"
              className="text-2xl font-bold text-white"
            >
              () Logo
            </text>
          </svg> */}
          <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            className="px-6 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </nav>
      <main className="flex flex-col items-center justify-center text-center px-8 py-16">
        <ProductCardList />
      </main>
    </div>
  );
}

export default LandingPage;
