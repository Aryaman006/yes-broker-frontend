'use client';
import { useRouter } from 'next/navigation';
import { Home, PlusCircle } from 'lucide-react';

export default function BrowseOrList() {
  const router = useRouter();

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-blue-100 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-blue-300 rounded-full opacity-20 animate-pulse-slow"></div>

      <div className="relative max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 animate-fadeIn">
          Start Your Property Journey
        </h2>
        <p className="mt-4 text-gray-600 text-lg md:text-xl animate-fadeIn delay-200">
          Browse verified listings or list your property in just a few clicks
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Browse Properties */}
        <div
          onClick={() => router.push('/listings')}
          className="flex flex-col items-center justify-center bg-white p-10 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer animate-fadeUp"
        >
          <Home className="text-blue-600 mb-5 w-14 h-14 transition-transform duration-500 hover:scale-110" />
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">Browse Properties</h3>
          <p className="text-gray-500 text-center text-lg">
            Explore thousands of verified properties in your desired location.
          </p>
        </div>

        {/* List Your Property */}
        <div
          onClick={() => router.push('/submit')}
          className="flex flex-col items-center justify-center bg-gradient-to-tr from-blue-600 to-blue-500 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer text-white animate-fadeUp delay-200"
        >
          <PlusCircle className="text-white mb-5 w-14 h-14 transition-transform duration-500 hover:scale-110" />
          <h3 className="text-2xl md:text-3xl font-semibold mb-3">List Your Property</h3>
          <p className="text-blue-100 text-center text-lg">
            Submit your property easily and reach potential buyers instantly.
          </p>
        </div>
      </div>
    </section>
  );
}
