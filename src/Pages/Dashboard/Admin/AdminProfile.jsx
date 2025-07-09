import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaDoorOpen, FaDoorClosed, FaUserShield, FaUserFriends, FaBuilding } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const primaryColor = "#00aeff";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const{user}=useAuth()
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/admin/profile",{
  headers: {
    Authorization: `Bearer ${user.accessToken}`,
  },
});
        setAdmin(res.data.admin);
        setStats(res.data.stats);
      } catch (err) {
        console.error("Failed to load admin profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <p className="text-center mt-20 text-gray-500 text-lg">Loading admin profile...</p>;
  }

  if (!admin || !stats) {
    return <p className="text-center mt-20 text-red-500 text-lg">Failed to load admin data.</p>;
  }

  return (
    <div className=" mx-auto px-6 py-10 bg-white rounded-3xl  border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 mb-10">
        <img
          src={admin.image}
          alt="Admin Avatar"
          className="w-28 h-28 rounded-full border-4 shadow-lg"
          style={{ borderColor: primaryColor }}
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800" style={{ color: primaryColor }}>
            {admin.name}
          </h1>
          <p className="text-gray-600 text-base">{admin.email}</p>
          <p className="text-sm text-gray-400 mt-1">System Administrator</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Rooms" value={stats.totalRooms} icon={<FaBuilding />} color={primaryColor} />
        <StatCard title="Available Rooms" value={`${stats.availableRoomsPercent}%`} icon={<FaDoorOpen />} color="green" />
        <StatCard title="Unavailable Rooms" value={`${stats.unavailableRoomsPercent}%`} icon={<FaDoorClosed />} color="red" />
        <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="#6366f1" />
        <StatCard title="Total Members" value={stats.totalMembers} icon={<FaUserFriends />} color="#f97316" />
        <StatCard title="Admin Role" value="1 Active" icon={<FaUserShield />} color="#0ea5e9" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
    <div className="text-3xl mb-3" style={{ color }}>{icon}</div>
    <p className="text-md font-medium text-gray-500 mb-1">{title}</p>
    <p className="text-3xl font-bold" style={{ color }}>{value}</p>
  </div>
);

export default AdminProfile;
