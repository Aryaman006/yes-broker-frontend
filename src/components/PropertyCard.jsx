'use client';
import { Home, Bed, Sofa } from 'lucide-react';
import Link from 'next/link';

export default function PropertyCard({ property, hasPaid, apiBase }) {
  if (!property) return null; // <-- Guard against undefined

  const imageUrl = property.images?.[0]
    ? `${apiBase}/uploads/${property.images[0]}`
    : '/placeholder.jpg'; // fallback image

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105">
      {/* Property Image */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={property.type || 'Property'}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Property Info */}
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{property.type || 'Property'}</h3>
          <p className="text-blue-600 font-semibold text-lg mb-2">
            ₹{property.price?.toLocaleString() || 'N/A'}
          </p>
          <p className="flex items-center text-gray-600 mb-3">
            <Home className="mr-2 text-blue-600" /> {property.location || 'N/A'}
          </p>

          <div className="flex space-x-4 text-gray-700 mb-3">
            {property.bedrooms && (
              <div className="flex items-center">
                <Bed className="mr-1 text-blue-600" size={16} /> {property.bedrooms} Beds
              </div>
            )}
            {property.furnishing && (
              <div className="flex items-center">
                <Sofa className="mr-1 text-blue-600" size={16} /> {property.furnishing}
              </div>
            )}
          </div>
        </div>

        {hasPaid && property.ownerName && property.contact && (
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-sm">
            <p><span className="font-semibold">Owner:</span> {property.ownerName}</p>
            <p><span className="font-semibold">Contact:</span> {property.contact}</p>
          </div>
        )}

        <Link
          href={`/properties/${property._id}`}
          className="mt-4 inline-block text-center bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
