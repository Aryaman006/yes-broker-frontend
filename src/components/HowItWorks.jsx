import { Search, Home, Key } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: <Search size={36} />, title: "Browse Listings", desc: "Find properties that match your needs.", color: "bg-gradient-to-tr from-blue-400 to-indigo-500" },
    { icon: <Home size={36} />, title: "View Details", desc: "Get all the important information before deciding.", color: "bg-gradient-to-tr from-green-400 to-teal-500" },
    { icon: <Key size={36} />, title: "Connect & Close", desc: "Contact owners directly and close the deal.", color: "bg-gradient-to-tr from-pink-400 to-red-500" },
  ];

  return (
    <section className="relative py-20 px-4 bg-gray-50 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-pink-300 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-300 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-yellow-300 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>

      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-gray-900 animate-fadeIn">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg rounded-3xl p-8 flex flex-col items-center text-white transform transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div className="mb-4 bg-white/20 rounded-full p-4">
                {step.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{step.title}</h3>
              <p className="text-center text-white/90">{step.desc}</p>

              {/* Optional decorative circles */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-white/10 rounded-full animate-pulse-slow"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full animate-pulse-slow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
