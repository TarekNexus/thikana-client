import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
   useEffect(() => {
    document.title = "Announcement | Thikana";
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/announcements", formData);

      Swal.fire({
        icon: "success",
        title: "Announcement Published!",
        text: "Your announcement has been created successfully.",
        confirmButtonColor: "#00aeff",
      });

      setFormData({ title: "", description: "" });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create announcement!",
        confirmButtonColor: "#00aeff",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-14 px-6 py-8 bg-white shadow-xl rounded-2xl border border-blue-100">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#00aeff]">
        📣 Create Announcement
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00aeff] transition"
            placeholder="Enter announcement title"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#00aeff] transition"
            placeholder="Write your announcement details here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#00aeff] hover:bg-[#0096e6] text-white font-semibold rounded-md transition duration-200 shadow-md"
        >
          📢 Publish Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
