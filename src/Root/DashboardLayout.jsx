import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/logo.png";
import useUserRole from "../Hooks/useUserRole";

// Custom hook to get role

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) return <span>Loading...</span>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost"
              aria-label="open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-bold">Dashboard</div>
        </div>

        {/* Main content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4  w-80 min-h-full bg-base-200 text-base-content  space-y-2">
          {/* Logo */}
          <Link to="/" className="mb-4">
            <img src={logo} alt="Logo" className="w-40 " />
          </Link>

          {role === "user" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/profile"
                >
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/announcements"
                >
                  Announcements
                </NavLink>
              </li>
            </>
          )}

          {role === "member" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/memberProfile"
                >
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/make-payment"
                >
                  Make Payment
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/payment-history"
                >
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/MemberAnnouncements"
                >
                  Announcements
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/admin-profile"
                >
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/manage-members"
                >
                  Manage Members
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/make-announcement"
                >
                  Make Announcement
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/agreement-requests"
                >
                  Agreement Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-[#00aeff] " : ""
                  }
                  to="/dashboard/manage-coupons"
                >
                  Manage Coupons
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
