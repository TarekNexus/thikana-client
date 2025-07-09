import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";


const PaymentHistory = () => {
     useEffect(() => {
    document.title = "Payment History | Thikana";
  }, []);
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://thikana-server.vercel.app/payments?email=${user.email}`,{
  headers: {
    Authorization: `Bearer ${user.accessToken}`,
  },
})
      .then((res) => setPayments(res.data))
      .catch((err) => console.error("Failed to fetch payments:", err))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center mt-16">
        <p className="text-gray-500 font-medium">Loading payment history...</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex justify-center mt-16">
        <p className="text-gray-500 font-medium">No payment history found.</p>
      </div>
    );
  }

  return (
    <div className=" mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00aeff]">
        My Payment History
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f9fafb] text-gray-700 text-sm">
            <tr>
              <th className="py-3 px-4 text-center font-semibold">#</th>
              <th className="py-3 px-4 text-center font-semibold">Month</th>
              <th className="py-3 px-4 text-center font-semibold">Amount</th>
              <th className="py-3 px-4 text-center font-semibold">Apartment</th>
              <th className="py-3 px-4 text-center font-semibold">Floor No</th>
              <th className="py-3 px-4 text-center font-semibold">Block Name</th>
              <th className="py-3 px-4 text-center font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm bg-white">
            {payments.map((p, index) => (
              <tr key={p._id || index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 text-center">{index + 1}</td>
                <td className="py-3 px-4 text-center">{p.month}</td>
                <td className="py-3 px-4 text-center font-semibold text-[#00aeff]">
                  {p.amount} BDT
                </td>
                <td className="py-3 px-4 text-center">{p.apartmentNo}</td>
                <td className="py-3 px-4 text-center">{p.floorNo}</td>
                <td className="py-3 px-4 text-center">{p.blockName}</td>
                <td className="py-3 px-4 text-center">
                  {new Date(p.createdAt).toLocaleString("en-BD", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
