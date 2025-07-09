import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";
import axios from "axios";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://thikana-server.vercel.app/coupons")
      .then((res) => setCoupons(res.data))
      .catch(() => setError("Failed to load coupons"));
  }, []);

  return (
    <motion.section
      className="py-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="w-11/12 mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[#00aeff] mb-3">
          Special Offers for You 🎉
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Apply these exclusive coupon codes and save more on your next
          apartment plan with Thikana.
        </p>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </motion.div>

      <motion.div
        variants={containerVariant}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto"
      >
        {coupons.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No coupons available.
          </p>
        ) : (
          coupons.map(({ _id, code, discount, description }) => (
            <motion.div
              key={_id}
              variants={cardVariant}
              className="bg-white p-6 border-l-4 border-[#00aeff] rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4 text-[#00aeff]">
                <FaTag className="text-2xl" />
                <h3 className="text-xl font-semibold">{code}</h3>
              </div>
              <p className="text-gray-700 mb-2">{description || "-"}</p>
              <p className="font-semibold text-[#00aeff] mb-4">
                Discount: {discount}%
              </p>
              <div className="bg-[#00aeff] text-white px-4 py-2 rounded-lg font-semibold tracking-wider w-fit mx-auto">
                Code: {code}
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.section>
  );
};

export default Coupon;
