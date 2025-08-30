'use client';
import API from '@/lib/api';
import { getAuth } from '@/lib/auth';
import { Home, Bed, Sofa } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PropertyCard({ property, apiBase }) {
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    setHasPaid(auth.hasPaid); // get hasPaid from localStorage
  }, []);

  if (!property) return null;

  const imageUrl = property.images?.[0]
    ? `${apiBase}/uploads/${property.images[0]}`
    : '/placeholder.jpg';

  const handlePay = async () => {
    try {
      const res = await API.post('/payment/create-payment', { propertyId: property._id });
      const data = res.data;

      if (!data || !data.instrumentResponse?.redirectInfo?.url) {
        alert('Payment initialization failed');
        return;
      }

      // Redirect user to PhonePe payment page
      window.location.href = data.instrumentResponse.redirectInfo.url;

      // After payment is successful (callback in backend), you should update hasPaid
      // Here we simulate immediate update for demo (replace with real verification)
      setHasPaid(true);
      setUserAuth({ token: getAuth().token, hasPaid: true });

    } catch (err) {
      console.error(err);
      alert('Payment failed. Try again.');
    }
  };

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

        {/* Owner Info */}
        {hasPaid && property.ownerName && property.contact && (
          <div className="bg-gray-50 p-3 rounded-lg text-gray-700 text-sm">
            <p><span className="font-semibold">Owner:</span> {property.ownerName}</p>
            <p><span className="font-semibold">Contact:</span> {property.contact}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4">
          {hasPaid ? (
            <Link
              href={`/properties/${property._id}`}
              className="w-full inline-block text-center bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          ) : (
            <button
              onClick={handlePay}
              className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Pay to View
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
