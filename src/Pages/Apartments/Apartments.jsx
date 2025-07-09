import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Apartments = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [apartments, setApartments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [disabledButtons, setDisabledButtons] = useState({});

  const limit = 6;
  const totalPages = Math.ceil(totalCount / limit);

  const fetchApartments = async (customPage = page) => {
    try {
      const res = await axios.get("http://localhost:4000/apartments", {
        params: {
          page: customPage,
          minRent: minRent || 0,
          maxRent: maxRent || Number.MAX_SAFE_INTEGER,
        },
      });
      setApartments(res.data.apartments);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch apartments");
    }
  };

  useEffect(() => {
    fetchApartments(); // Initial load
  }, [page]); // Only fetch on page change

  const handleAgreement = async (apartment) => {
    if (!user) {
      toast.error("Please login to apply for agreement");
      navigate("/auth/login");
      return;
    }

    const agreementData = {
      userName: user.displayName || user.email,
      userEmail: user.email,
      floorNo: apartment.floor,
      blockName: apartment.block,
      apartmentNo: apartment.apartmentNo,
      rent: apartment.rent,
      userImage: user.photoURL || "",
    };
    try {
      const res = await axios.post(
        "http://localhost:4000/agreements",
        agreementData
      );

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      setDisabledButtons((prev) => ({ ...prev, [apartment._id]: true }));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to apply for agreement"
      );
    }
  };
 useEffect(() => {
    document.title = "Apartment | Thikana";
  }, []);

  return (
    <div className="w-11/12 mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 text-[#00aeff]">Apartments</h1>

      {/* Rent Filter */}
      <div className="mb-4 flex gap-2 items-center">
        <input
          type="number"
          placeholder="Min Rent"
          className="border p-2 rounded"
          value={minRent}
          onChange={(e) => setMinRent(e.target.value)}
          min={0}
        />
        <input
          type="number"
          placeholder="Max Rent"
          className="border p-2 rounded"
          value={maxRent}
          onChange={(e) => setMaxRent(e.target.value)}
          min={0}
        />
        <button
          onClick={() => {
            setPage(1);
            fetchApartments(1); // Force fetch for page 1
            setMinRent("");
            setMaxRent("");
          }}
          className="bg-[#00aeff] text-white px-4 py-2 rounded hover:bg-[#0090d1] transition"
        >
          Search
        </button>
      </div>

      {/* Apartments Grid */}
      {apartments.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-8">
          No apartments found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apartments.map((apt) => (
            <div
              key={apt._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={apt.image}
                alt={`Apartment ${apt.apartmentNo}`}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-xl font-bold mt-2 text-[#00aeff]">
                Apartment No: {apt.apartmentNo}
              </h2>
              <p>Floor: {apt.floor}</p>
              <p>Block: {apt.block}</p>
              <p>Rent: {apt.rent} Tk</p>
              <button
                onClick={() => handleAgreement(apt)}
                disabled={!!disabledButtons[apt._id]}
                className={`mt-3 py-2 px-4 rounded transition ${
                  disabledButtons[apt._id]
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#00aeff] text-white hover:bg-[#0090d1]"
                }`}
              >
                Apply Agreement
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50 border-[#00aeff] text-[#00aeff] hover:bg-[#0090d1] hover:text-white transition"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`px-3 py-1 border rounded ${
                page === idx + 1 ? "bg-[#00aeff] text-white" : "text-[#00aeff]"
              } hover:bg-[#0090d1] hover:text-white transition`}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-1 border rounded disabled:opacity-50 border-[#00aeff] text-[#00aeff] hover:bg-[#0090d1] hover:text-white transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Apartments;
