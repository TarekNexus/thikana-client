// src/pages/Dashboard/Admin/AgreementRequests.jsx

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";

const AgreementRequests = () => {
   useEffect(() => {
    document.title = "Agreement Requests | Thikana";
  }, []);
  const {user}=useAuth()
  const [loadingEmail, setLoadingEmail] = useState(null);

  const {
    data: agreements = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["agreementRequests"],
    queryFn: async () => {
      const res = await axios.get("https://thikana-server.vercel.app/agreements",{
  headers: {
    Authorization: `Bearer ${user.accessToken}`,
  },
});
      return res.data.filter((item) => item.status === "pending");
    },
  });

  const handleAccept = async (email) => {
    setLoadingEmail(email);
    try {
      await axios.put(`https://thikana-server.vercel.app/agreements/accept/${email}`);
      await refetch();
    } catch (err) {
      console.error("Accept failed", err);
    } finally {
      setLoadingEmail(null);
    }
  };

  const handleReject = async (email) => {
    setLoadingEmail(email);
    try {
      await axios.put(`https://thikana-server.vercel.app/agreements/reject/${email}`);
      await refetch();
    } catch (err) {
      console.error("Reject failed", err);
    } finally {
      setLoadingEmail(null);
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Agreement Requests</h2>

      {agreements.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Email</th>
                <th>Floor</th>
                <th>Block</th>
                <th>Room</th>
                <th>Rent</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {agreements.map((item, idx) => (
                <tr key={item._id}>
                  <td>{idx + 1}</td>
                  <td>{item.userName}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.floorNo}</td>
                  <td>{item.blockName}</td>
                  <td>{item.apartmentNo}</td>
                  <td>{item.rent} ৳</td>
                  <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => handleAccept(item.userEmail)}
                      className="btn btn-sm btn-success"
                      disabled={loadingEmail === item.userEmail}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(item.userEmail)}
                      className="btn btn-sm btn-error"
                      disabled={loadingEmail === item.userEmail}
                    >
                      Reject
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

export default AgreementRequests;
