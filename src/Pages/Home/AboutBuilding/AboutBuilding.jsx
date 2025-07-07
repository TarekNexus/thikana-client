// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaHome, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import buildingImage from "../../../assets/tt.jpeg"; // use your actual image path

const AboutBuilding = () => {
  return (
    <section className="py-16 w-11/12 sm:px-8 md:px-12 lg:px-10 mx-auto">
      <div class="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#00aeff_100%)]"></div>

      {/* Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#00aeff] mb-3">
          About the Building
        </h2>
        <p className="text-gray-600 text-md md:text-lg leading-relaxed max-w-3xl mx-auto">
          <span className="font-semibold text-[#00aeff]">Thikana</span> is a
          modern, well-managed apartment building designed to offer residents a
          peaceful and secure living environment.
        </p>
      </motion.div>

      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left - Image with animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <img
            src={buildingImage}
            alt="Thikana Building"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </motion.div>

        {/* Right - Features */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <FaHome className="text-[#00aeff] text-2xl mb-2" />
            <h4 className="text-xl font-semibold text-gray-700 mb-1">
              Spacious Apartments
            </h4>
            <p className="text-sm text-gray-600">
              Well-ventilated, sunlit rooms with modern interiors across
              multiple floors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <FaCheckCircle className="text-[#00aeff] text-2xl mb-2" />
            <h4 className="text-xl font-semibold text-gray-700 mb-1">
              Security & Maintenance
            </h4>
            <p className="text-sm text-gray-600">
              24/7 security, CCTV monitoring, and dedicated maintenance staff to
              ensure safety.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-md"
          >
            <FaMapMarkerAlt className="text-[#00aeff] text-2xl mb-2" />
            <h4 className="text-xl font-semibold text-gray-700 mb-1">
              Prime Location
            </h4>
            <p className="text-sm text-gray-600">
              Easily accessible from major roads, surrounded by all essential
              amenities.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutBuilding;
