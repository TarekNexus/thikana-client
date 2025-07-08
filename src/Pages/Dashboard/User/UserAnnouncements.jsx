import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Megaphone } from "lucide-react";

const UserAnnouncements = () => {
  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:4000/announcements");
      return res.data;
    },
  });

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Megaphone size={40} className="text-[#00aeff]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#00aeff] mb-2">
            Latest Announcements
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Stay updated with all the important building news and notices.
          </p>
        </div>

        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {announcements.map((a, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-[#00aeff]/10 hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-xl font-bold text-[#00aeff] mb-2">{a.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{a.description}</p>
                <p className="text-sm text-gray-500">
                  Published on{" "}
                  <span className="font-medium text-gray-600">
                    {new Date(a.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnnouncements;
