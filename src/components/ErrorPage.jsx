import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";



const ErrorPage = ({ code = 404, message = "Oops! The page you’re looking for doesn’t exist." }) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="text-red-500 mb-6"
        animate={{ rotate: [0, 15, -15, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <FaExclamationTriangle size={120} />
      </motion.div>

      <motion.h1
        className="text-7xl font-extrabold text-gray-800 mb-4 select-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {code}
      </motion.h1>

      <motion.p
        className="text-xl text-gray-600 max-w-xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {message} <br />Maybe try checking the URL or head back home .
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-[#00aeff] hover:bg-[#0099e6] text-white font-semibold rounded-lg shadow-lg"
        >
          Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ErrorPage;
