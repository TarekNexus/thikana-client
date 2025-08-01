import React, { useContext } from "react";
import logo from "../../../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthContext";

const Navber = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const Links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#00aeff] font-bold " : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/Apartments"
          className={({ isActive }) =>
            isActive ? "text-[#00aeff] font-bold " : ""
          }
        >
          Apartment
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "text-[#00aeff] font-bold " : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("LogOut successful");
        navigate("/auth/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <nav className="sticky top-0 z-20">
      <div className=" w-full mx-auto  border-b border-gray-200 bg-white/20 backdrop-blur-sm">
        <div className="w-11/12 mx-auto navbar">
          <div className="navbar-start ">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                {Links}
              </ul>
            </div>
            <Link to="/">
              {" "}
              <img className="w-30 md:w-40" src={logo} alt="Logo" />
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Links}</ul>
          </div>

          <div className="navbar-end">
            {loading ? (
              <div className="flex items-center justify-center w-10 h-10">
                <span className="loading loading-ring loading-lg"></span>
              </div>
            ) : user ? (
              <>
                <div className="dropdown dropdown-end mr-2 sm:mr-6">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost w-12  h-12 btn-circle avatar"
                  >
                    <div className="w-12 rounded-full border-2 border-gray-300">
                      <img
                        referrerPolicy="no-referrer"
                        src={user?.photoURL || ""}
                        alt={user?.displayName || "User"}
                        data-tooltip-id="user-tooltip"
                        data-tooltip-content={user?.displayName || "User"}
                        data-tooltip-place="top"
                      />
                      <Tooltip id="user-tooltip" />
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="mt-3 z-[100] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <span className="text-gray-500 font-semibold cursor-default">
                        {user?.displayName || "User"}
                      </span>
                    </li>
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Logout</button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="mr-4 flex gap-4">
                  <Link
                    to="/auth/login"
                    className="text-3xl text-gray-700 hover:text-[#00aeff] transition"
                  >
                    <FaUserCircle size={46} />
                  </Link>

                  <Link to="/auth/login" className="">
                    <button className="btn w-22 h-11 hidden md:block hover:bg-[#0090d1] transition bg-[#00aeff] text-white rounded-3xl">
                      Login
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navber;
