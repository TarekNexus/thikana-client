import React, { useState } from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ManageMembers = () => {
  const queryClient = useQueryClient();
  const [loadingEmail, setLoadingEmail] = useState(null);

  // Fetch agreements where userRoll = member and status = checked
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4000/agreements");
      // Filter to only members with status checked
      return res.data.filter(
        (item) => item.userRoll === "member" && item.status === "checked"
      );
    },
  });

  const handleRemove = async (email) => {
    setLoadingEmail(email);
    try {
      await axios.put(`http://localhost:4000/agreements/remove-member/${email}`);
      // Refetch members after update
      queryClient.invalidateQueries(["members"]);
    } catch (err) {
      console.error("Failed to remove member:", err);
      alert("Failed to remove member. Please try again.");
    } finally {
      setLoadingEmail(null);
    }
  };

  if (isLoading) return <p>Loading members...</p>;
  if (error) return <p>Error loading members.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Members</h2>
      {data.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">User Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">User Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((member) => (
              <tr key={member._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{member.userName}</td>
                <td className="border border-gray-300 px-4 py-2">{member.userEmail}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    disabled={loadingEmail === member.userEmail}
                    onClick={() => handleRemove(member.userEmail)}
                    className="btn btn-sm btn-error text-white"
                  >
                    {loadingEmail === member.userEmail ? "Removing..." : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMembers;
