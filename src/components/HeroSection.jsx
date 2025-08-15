'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HeroSection() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) router.push(`/listings?search=${query}`);
  };

  return (
    <div className="relative bg-gray-50">
      {/* Background Image + Gradient Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg" // Replace with your image path
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-transparent to-blue-600 opacity-40"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-32 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 animate-fadeIn">
          Find Your Dream Property
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-12 animate-fadeIn delay-200">
          Browse verified listings or list your property today
        </p>

        <form
          onSubmit={handleSearch}
          className="flex items-center max-w-3xl mx-auto bg-white rounded-full shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
        >
          <div className="flex-1 flex items-center px-4 py-2">
            <Search className="text-gray-400 mr-3 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter city, area, or landmark"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-3 text-gray-800 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full transition"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 font-semibold rounded-full hover:bg-blue-700 transition transform hover:-translate-y-0.5"
          >
            Search
          </button>
        </form>

        {/* Optional: Highlighted quick links or popular cities */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-gray-600 animate-fadeIn delay-400">
          <span className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            Mumbai
          </span>
          <span className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            Delhi
          </span>
          <span className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            Bangalore
          </span>
          <span className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md cursor-pointer transition">
            Pune
          </span>
        </div>
      </div>
    </div>
  );
}
