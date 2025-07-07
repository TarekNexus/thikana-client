import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTag } from "react-icons/fa";

// Sample coupon data
const coupons = [
  {
    id: 1,
    title: "THIKANA100",
    description: "Get ৳1000 OFF on your first apartment rent with Thikana!",
    code: "THIKANA100",
  },
  {
    id: 2,
    title: "STAY3SAVE",
    description: "Save ৳3000 when you book for 3 months in advance.",
    code: "STAY3SAVE",
  },
  {
    id: 3,
    title: "FAMILY10",
    description: "Enjoy 10% OFF on family apartment plans.",
    code: "FAMILY10",
  },
];

// Parent container animation variant
const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Card animation variant
const cardVariant = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

const Coupon = () => {
  return (
    <motion.section
      className="py-16 "
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Section Header */}
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
      </motion.div>

      {/* Coupon Cards */}
      <motion.div
        variants={containerVariant}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 mx-auto"
      >
        {coupons.map((coupon) => (
          <motion.div
            key={coupon.id}
            variants={cardVariant}
            className="bg-white p-6 border-l-4 border-[#00aeff] rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
          >
            <div className="flex items-center gap-3 mb-4 text-[#00aeff]">
              <FaTag className="text-2xl" />
              <h3 className="text-xl font-semibold">{coupon.title}</h3>
            </div>
            <p className="text-gray-700 mb-4">{coupon.description}</p>
            <div className="bg-[#00aeff] text-white px-4 py-2 rounded-lg font-semibold tracking-wider w-fit mx-auto">
              Code: {coupon.code}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Coupon;
