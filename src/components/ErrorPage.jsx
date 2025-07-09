import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";



const ErrorPage = ({ code = 404, message = "Page Not Found" }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="text-7xl mb-4 text-red-500">
        <FaExclamationTriangle size={100} />
      </div>
      <h1 className="text-6xl font-bold text-gray-800">{code}</h1>
      <p className="text-2xl text-gray-600 mt-2 mb-6">{message}</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-[#00aeff] hover:bg-[#0099e6] text-white font-semibold rounded-lg shadow transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
