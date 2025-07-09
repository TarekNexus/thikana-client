import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const ManageMembers = () => {
   useEffect(() => {
    document.title = "Manage Members | Thikana";
  }, []);
  const {user}=useAuth()
  const queryClient = useQueryClient();
  const [loadingEmail, setLoadingEmail] = useState(null);

  const { data = [], isLoading, error } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4000/agreements",{
  headers: {
    Authorization: `Bearer ${user.accessToken}`,
  },
});
      return res.data.filter(
        (item) => item.userRoll === "member" && item.status === "checked"
      );
    },
  });

  const handleRemove = async (email) => {
    setLoadingEmail(email);
    try {
      await axios.put(`http://localhost:4000/agreements/remove-member/${email}`);
      queryClient.invalidateQueries(["members"]);
    } catch (err) {
      console.error("Failed to remove member:", err);
      alert("Failed to remove member. Please try again.");
    } finally {
      setLoadingEmail(null);
    }
  };

  if (isLoading) return <p className="text-center py-6">Loading members...</p>;
  if (error) return <p className="text-center text-red-500 py-6">Error loading members.</p>;

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#00aeff]">Manage Members</h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-600">No members found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table w-full">
            <thead className="bg-[#00aeff] text-white">
              <tr>
                <th className="text-left">User Name</th>
                <th className="text-left">User Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member) => (
                <tr key={member._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{member.userName}</td>
                  <td className="py-3 px-4">{member.userEmail}</td>
                  <td className="text-center py-3 px-4">
                    <button
                      disabled={loadingEmail === member.userEmail}
                      onClick={() => handleRemove(member.userEmail)}
                      className="btn btn-error btn-sm text-white"
                    >
                      {loadingEmail === member.userEmail ? "Removing..." : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
