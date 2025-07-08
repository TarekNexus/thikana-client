import React from 'react';
import useMyAgreement from '../../../Hooks/useMyAgreement';
import useAuth from '../../../Hooks/useAuth';



const UserProfile = () => {
  const { user } = useAuth();
  const { agreement, loading } = useMyAgreement();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h3 className="text-xl font-semibold">{user?.displayName}</h3>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <div>
        <p><strong>Agreement Accepted Date:</strong> {agreement?.createdAt ? new Date(agreement.createdAt).toLocaleDateString() : "none"}</p>
        <p><strong>Floor:</strong> {agreement?.floorNo || "none"}</p>
        <p><strong>Block:</strong> {agreement?.blockName || "none"}</p>
        <p><strong>Room:</strong> {agreement?.apartmentNo || "none"}</p>
        <p><strong>Rent:</strong> {agreement?.rent ? `৳${agreement.rent}` : "none"}</p>
      </div>
    </div>
  );
};

export default UserProfile;
