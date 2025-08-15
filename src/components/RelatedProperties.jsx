'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function RelatedProperties({ location, currentId }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!location) return;

    const fetchRelated = async () => {
      try {
        const res = await API.get('/properties/listings');
        const filtered = res.data
          .filter(p => p.location === location && p._id !== currentId)
          .slice(0, 4); // show max 4 related
        setRelated(filtered);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load related properties');
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [location, currentId]);

  if (loading) return <div className="mt-6 text-center text-gray-500">Loading related properties...</div>;
  if (!related.length) return null;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 animate-fadeUp">Related Properties in {location}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {related.map(p => (
          <Link key={p._id} href={`/properties/${p._id}`} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fadeUp">
            {p.images?.[0] && (
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE}/uploads/${p.images[0]}`}
                alt={p.type}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{p.type}</h3>
              <p className="text-gray-600 text-sm mb-2">{p.location}</p>
              <p className="font-bold text-blue-600">₹{p.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
