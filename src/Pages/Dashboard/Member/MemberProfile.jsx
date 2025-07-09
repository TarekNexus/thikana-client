import React, { useEffect } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useMyAgreement from '../../../Hooks/useMyAgreement';


const MemberProfile = () => {
     useEffect(() => {
    document.title = "Profile | Thikana";
  }, []);
  const { user } = useAuth();
  const { agreement,  } = useMyAgreement();

  

  return (
    <div className=" py-10 px-4">
      
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-[#00aeff] p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.photoURL}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold">{user?.displayName}</h2>
            <p className="text-sm opacity-90">{user?.email}</p>
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-white text-gray-700">
          <InfoCard title="Agreement Date" value={agreement?.createdAt ? new Date(agreement.createdAt).toLocaleDateString() : "none"} />
          <InfoCard title="Floor No" value={agreement?.floorNo || "none"} />
          <InfoCard title="Block Name" value={agreement?.blockName || "none"} />
          <InfoCard title="Room No" value={agreement?.apartmentNo || "none"} />
          <InfoCard title="Rent" value={agreement?.rent ? `৳${agreement.rent}` : "none"} />
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ title, value }) => (
  <div className="bg-[#f9fafe] p-5 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200">
    <p className="text-sm text-[#00aeff] font-semibold mb-1">{title}</p>
    <p className="text-lg font-medium text-gray-800">{value}</p>
  </div>
);

export default MemberProfile;
