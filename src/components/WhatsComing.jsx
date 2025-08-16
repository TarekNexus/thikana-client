import React from "react";
import {
  Clock,
  Building2,
  CreditCard,
  Users,
  Megaphone,
  Wrench
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const WhatsComing = () => {
  const features = [
    {
      icon: <Building2 className="w-6 h-6 text-[#00aeff]" />,
      title: "Smart Apartment Search",
      desc: "Quickly filter apartments by rent range, number of rooms, and floor level to find the perfect match."
    },
    {
      icon: <CreditCard className="w-6 h-6 text-[#00aeff]" />,
      title: "Mobile Payments",
      desc: "Integration with bKash, Nagad, and Rocket for faster and more convenient rent payments."
    },
    {
      icon: <Users className="w-6 h-6 text-[#00aeff]" />,
      title: "Community Chat",
      desc: "A secure chat feature for tenants to connect with neighbors and share updates within the building."
    },
    {
      icon: <Megaphone className="w-6 h-6 text-[#00aeff]" />,
      title: "Event & Notice Board",
      desc: "Centralized space for building-wide announcements, upcoming events, and emergency notices."
    },
    {
      icon: <Wrench className="w-6 h-6 text-[#00aeff]" />,
      title: "Maintenance Requests",
      desc: "Submit repair requests, track status updates, and get notified when maintenance is completed."
    },
    {
      icon: <Clock className="w-6 h-6 text-[#00aeff]" />,
      title: "Visitor Management",
      desc: "Pre-register guests, track visitor logs, and get instant notifications when a visitor arrives."
    },
  ];

  return (
    <div className="w-11/12 mx-auto my-16 p-6">
      {/* Animated Heading */}
      <motion.h2
        className="text-3xl font-extrabold text-[#00aeff] text-center mb-2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        🚀 What’s Coming to Thikana
      </motion.h2>

      {/* Animated Subtitle */}
      <motion.p
        className="text-center text-gray-500 mb-10 text-sm md:text-base"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Exciting new features are on the way to make your building experience smoother.
      </motion.p>

      {/* Animated Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="p-5 border border-gray-400 rounded-2xl shadow-sm bg-base-100 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              {item.icon}
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WhatsComing;
