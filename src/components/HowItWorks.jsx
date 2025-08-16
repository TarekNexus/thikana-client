import React from "react";
import { User, Search, FileText, CreditCard } from "lucide-react";
   

const steps = [
  {
    icon: <User className="w-8 h-8 text-[#00aeff]" />,
    title: "Sign Up",
    desc: "Create your account in minutes and get access to all building features.",
  },
  {
    icon: <Search className="w-8 h-8 text-[#00aeff]" />,
    title: "Search Apartments",
    desc: "Filter apartments by rent, rooms, and floor level to find your perfect home.",
  },
  {
    icon: <FileText className="w-8 h-8 text-[#00aeff]" />,
    title: "Make Agreements",
    desc: "Submit and manage agreements online securely and quickly.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-[#00aeff]" />,
    title: "Manage Payments",
    desc: "Pay rent safely via bKash, Nagad, or Rocket with instant notifications.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 w-11/12 mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#00aeff] mb-2">How Thikana Works</h2>
        <p className="text-gray-500 text-sm md:text-base">
          Follow these simple steps to get started and manage your building efficiently.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white border border-base-300 rounded-2xl p-6 text-center shadow hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
