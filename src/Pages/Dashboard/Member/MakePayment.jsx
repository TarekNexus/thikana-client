import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useMyAgreement from "../../../Hooks/useMyAgreement";
import useAuth from "../../../Hooks/useAuth";

const primaryColor = "#00aeff";

const MakePayment = () => {
     useEffect(() => {
    document.title = "Make Payment | Thikana";
  }, []);
  const { user } = useAuth();
  const { agreement, loading } = useMyAgreement();
  const navigate = useNavigate();

  if (loading || !agreement)
    return (
      <p className="text-center mt-20 text-gray-500 font-semibold">Loading...</p>
    );

  return (
    <div className="py-20 px-4 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full p-6 sm:p-8">
        <h2
          className="text-2xl font-semibold mb-6 text-center truncate"
          style={{ color: primaryColor }}
        >
          Rent Summary
        </h2>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium">Email</span>
            <span className="truncate max-w-[140px] sm:max-w-xs">{user.email}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium">Floor No</span>
            <span>{agreement.floorNo}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium">Block Name</span>
            <span>{agreement.blockName}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium">Apartment No</span>
            <span>{agreement.apartmentNo}</span>
          </div>

          <div className="flex justify-between pb-2">
            <span className="font-medium">Rent</span>
            <span className="text-[#00aeff] font-semibold">{agreement.rent} BDT</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/pay-now")}
          className="mt-8 w-full py-3 rounded-md text-white font-semibold shadow-md transition-colors duration-200"
          style={{ backgroundColor: primaryColor }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0096e6")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = primaryColor)}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default MakePayment;
