'use client';
import PropertyCard from '@/components/PropertyCard';

export default function FeaturedListings({ properties, loading, apiBase }) {
  return (
    <section className="max-w-7xl mx-auto py-16 px-4 relative">
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-gray-800 animate-fadeIn">
        Featured Listings
      </h2>

      {/* Decorative background shapes */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-200 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-blue-300 rounded-full opacity-20 animate-pulse-slow"></div>

      {loading ? (
        <p className="text-center text-gray-600 py-6 animate-fadeIn">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-center text-gray-500 py-6 animate-fadeIn">No featured properties available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((p) => (
            <div
              key={p._id}
              className="transition-transform duration-500 hover:scale-105 hover:shadow-2xl animate-fadeUp"
            >
              <PropertyCard property={p} hasPaid={false} apiBase={apiBase} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
