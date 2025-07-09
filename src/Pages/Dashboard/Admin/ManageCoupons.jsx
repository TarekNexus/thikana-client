import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCoupons = async () => {
    try {
      const res = await axios.get("http://localhost:4000/coupons");
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch coupons");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.code || !formData.discount) {
      setError("Coupon code and discount are required");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/coupons", {
        code: formData.code.trim(),
        discount: Number(formData.discount),
        description: formData.description.trim(),
      });
      setModalOpen(false);
      setFormData({ code: "", discount: "", description: "" });
      fetchCoupons();
    } catch (err) {
      console.log(err);
      setError("Failed to add coupon");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Coupons</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#00aeff] hover:bg-[#0099e6] text-white font-semibold px-4 py-2 rounded"
        >
          Add Coupon
        </button>
      </div>

      {error && <p className="mb-2 text-red-600">{error}</p>}

      <table className="min-w-full bg-white border border-gray-300 rounded shadow">
        <thead>
          <tr className="bg-[#00aeff] text-white">
            <th className="py-2 px-4 border">Coupon Code</th>
            <th className="py-2 px-4 border">Discount (%)</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Created At</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No coupons found.
              </td>
            </tr>
          ) : (
            coupons.map(({ _id, code, discount, description, createdAt }) => (
              <tr key={_id} className="even:bg-gray-50">
                <td className="border py-2 px-4">{code}</td>
                <td className="border py-2 px-4">{discount}</td>
                <td className="border py-2 px-4">{description || "-"}</td>
                <td className="border py-2 px-4">
                  {new Date(createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-40 backdrop-blur-sm z-50">
          <div className="bg-white rounded shadow-lg w-96 p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Add New Coupon</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Coupon Code *</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aeff]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Discount Percentage *
                </label>
                <input
                  type="number"
                  name="discount"
                  min="1"
                  max="100"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aeff]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00aeff]"
                  rows={3}
                ></textarea>
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00aeff] text-white px-4 py-2 rounded hover:bg-[#0099e6] disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCoupons;
