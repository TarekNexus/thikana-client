import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserAnnouncements = () => {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4000/announcements");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading announcements...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a, index) => (
            <div key={index} className="p-4 border rounded shadow bg-base-100">
              <h3 className="text-lg font-semibold text-primary">{a.title}</h3>
              <p className="text-gray-700 mt-1">{a.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Published: {new Date(a.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAnnouncements;
