import React from "react";
import { Building2, Users, FileText, Wrench, Clock, Megaphone } from "lucide-react";

const stats = [
  { icon: <Building2 className="w-8 h-8 text-[#00aeff]" />, number: "1200+", label: "Apartments Managed" },
  { icon: <Users className="w-8 h-8 text-[#00aeff]" />, number: "3500+", label: "Active Tenants" },
  { icon: <FileText className="w-8 h-8 text-[#00aeff]" />, number: "9000+", label: "Agreements Completed" },
  { icon: <Wrench className="w-8 h-8 text-[#00aeff]" />, number: "1500+", label: "Maintenance Requests" },
  { icon: <Megaphone className="w-8 h-8 text-[#00aeff]" />, number: "250+", label: "Events Organized" },
  { icon: <Clock className="w-8 h-8 text-[#00aeff]" />, number: "3200+", label: "Happy Users" },
];

const StatsSection = () => {
  return (
    <section className="py-16 w-11/12 mx-auto  rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#00aeff] mb-2">Our Users Love Thikana</h2>
        <p className="text-gray-500 text-sm md:text-base">
          Here`s a quick look at the impact Thikana has made for tenants and owners.
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 flex flex-col items-center shadow hover:shadow-lg transition"
          >
            <div className="mb-3">{stat.icon}</div>
            <h3 className="text-2xl font-extrabold text-[#00aeff] mb-1">{stat.number}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
