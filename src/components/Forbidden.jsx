import React from "react";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const primaryColor = "#00aeff";

const Forbidden = () => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="text-error mb-6"
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        <FaLock size={90} className="text-[#00aeff]" />
      </motion.div>

      <motion.h1
        className="text-5xl font-extrabold text-[#00aeff] mb-3 select-none"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        403 - Forbidden
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 max-w-lg mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        Sorry, you do not have permission to access this page. <br /> Please contact an administrator if you believe this is a mistake.
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Link to="/">
          <button
            style={{ backgroundColor: primaryColor }}
            className="px-8 py-3 rounded-lg font-semibold text-white shadow-lg hover:bg-[#00aeff] transition"
          >
            Go to Home
          </button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Forbidden;
