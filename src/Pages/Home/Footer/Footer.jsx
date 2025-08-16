import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#e6f7ff] text-black pt-12 pb-6 px-4">
      <div className="w-11/12 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/">
              <img className="w-40 mb-4" src={logo} alt="Thikana Logo" />
            </Link>
            <p className="text-black text-opacity-90 text-center md:text-left mb-4">
              Thikana is your trusted building management system offering
              seamless apartment living with comfort, care, and community.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/tarekdeveloper59"
                className="text-black hover:text-[#00aeff] transition-transform duration-300 hover:scale-110"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="https://x.com/tarekdeveloper"
                className="text-black hover:text-[#00aeff] transition-transform duration-300 hover:scale-110"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/muh.ammadtarek"
                className="text-black hover:text-[#00aeff] transition-transform duration-300 hover:scale-110"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#00aeff] border-b border-[#00aeff] pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-center md:text-left">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#00aeff] font-bold"
                      : "hover:text-[#00aeff]"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Apartments"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#00aeff] font-bold"
                      : "hover:text-[#00aeff]"
                  }
                >
                  Apartments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#00aeff] font-bold"
                      : "hover:text-[#00aeff]"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center  md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#00aeff] border-b border-[#00aeff] pb-2">
              Contact Us
            </h3>
            <div className="space-y-3 text-black text-opacity-90 text-center md:text-left ">
              <div className="flex items-center justify-center md:justify-start ">
                <FaEnvelope className="mr-2 text-[#00aeff]" />
                <a
                  href="mailto:support@thikana.com"
                  className="hover:text-[#00aeff] hover:underline transition duration-300"
                >
                  support@thikana.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <FaPhone className="mr-2 text-[#00aeff]" />
                <a
                  href="tel:+8801778188448"
                  className="hover:text-[#00aeff] hover:underline transition duration-300"
                >
                  +8801778188448
                </a>
              </div>
              <p>Thikana Building, West Dhanmondi</p>
              <p>Dhaka, BD 1207</p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4 text-[#00aeff] border-b border-[#00aeff] pb-2">
              Stay Informed
            </h3>
            <p className="text-black text-opacity-90 text-center md:text-left mb-4">
              Subscribe to get updates on new apartments, service alerts, and
              community news.
            </p>
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg bg-white text-black border border-[#00aeff] focus:outline-none w-full"
              />
              <button className="bg-[#00aeff] hover:bg-[#008fd1] text-white font-medium px-4 py-2 rounded-r-lg transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#00aeff] pt-6 text-center text-black text-opacity-80">
          <p>&copy; {new Date().getFullYear()} Thikana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
