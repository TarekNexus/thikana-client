import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const MakeAnnouncement = () => {
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
      toast.success("Announcement created!");
      setFormData({ title: "", description: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create announcement");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Create New Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full mt-1"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full mt-1"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Publish
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;