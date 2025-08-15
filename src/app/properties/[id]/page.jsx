'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import API from '@/lib/api';
import { toast } from 'react-toastify';
import { Home, Users, Phone, Bed, Sofa, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.id;
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [relatedProperties, setRelatedProperties] = useState([]);

  // Fetch property data
  useEffect(() => {
    if (!propertyId) {
      toast.error('Invalid property ID');
      router.push('/');
      return;
    }

    const fetchProperty = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get(`/properties/${propertyId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setProperty(res.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, router]);

  // Fetch related properties
  useEffect(() => {
    if (!property?.location) return;

    const fetchRelated = async () => {
      try {
        const res = await API.get('/properties/listings');
        const filtered = res.data
          .filter(p => p.location === property.location && p._id !== property._id)
          .slice(0, 4); // max 4 related
        setRelatedProperties(filtered);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load related properties');
      }
    };

    fetchRelated();
  }, [property]);

  if (loading) return <div className="p-8 text-center text-gray-700">Loading property...</div>;
  if (!property) return <div className="p-8 text-center text-gray-700">Property not found</div>;

  const prevImage = () => setSelectedImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  const nextImage = () => setSelectedImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1));

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          {/* Main Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
               onClick={() => setLightboxOpen(true)}>
            <img
              key={selectedImage}
              src={`${process.env.NEXT_PUBLIC_API_BASE}/uploads/${property.images[selectedImage]}`}
              alt={property.type}
              className="w-full h-[450px] object-cover rounded-xl transition-transform duration-500 ease-in-out transform hover:scale-105 animate-fadeIn"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex mt-4 space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {property.images.slice(0, 10).map((img, idx) => (
              <img
                key={idx}
                src={`${process.env.NEXT_PUBLIC_API_BASE}/uploads/${img}`}
                alt={`${property.type} ${idx + 1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-300 ${
                  selectedImage === idx
                    ? 'border-blue-600 scale-105 shadow-lg'
                    : 'border-transparent hover:scale-105 hover:shadow-md'
                }`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>
        </div>

        {/* Property Info */}
        <div className="flex flex-col justify-between space-y-6 animate-fadeUp">
          <div className="bg-white p-6 rounded-xl shadow-lg transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{property.type}</h1>
            <p className="text-2xl text-blue-600 font-semibold mb-2">₹{property.price.toLocaleString()}</p>
            <p className="flex items-center text-gray-600 mb-4">
              <Home className="mr-2 text-blue-600" /> {property.location}
            </p>
            <div className="flex space-x-6 text-gray-700 mb-4">
              <div className="flex items-center">
                <Bed className="mr-2 text-blue-600" /> {property.bedrooms} Bedrooms
              </div>
              {property.furnishing && (
                <div className="flex items-center">
                  <Sofa className="mr-2 text-blue-600" /> {property.furnishing}
                </div>
              )}
            </div>
          </div>

          {/* Owner Info */}
          {property.ownerName && property.contact && (
            <div className="bg-gray-50 p-4 rounded-xl shadow-md transition-transform duration-500 hover:-translate-y-1 hover:shadow-xl animate-fadeUp">
              <h2 className="font-semibold text-gray-800 mb-2 text-lg">Owner Details</h2>
              <p className="flex items-center text-gray-700 mb-1">
                <Users className="mr-2 text-blue-600" /> {property.ownerName}
              </p>
              <p className="flex items-center text-gray-700">
                <Phone className="mr-2 text-blue-600" /> {property.contact}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {property.description && (
        <div className="bg-gray-50 p-6 rounded-xl shadow-md transition-transform duration-500 hover:shadow-xl animate-fadeUp">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Property Description</h2>
          <p className="text-gray-700 leading-relaxed">{property.description}</p>
        </div>
      )}

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 animate-fadeUp">Related Properties</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {relatedProperties.map(p => (
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
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <button
            className="absolute top-6 right-6 text-white text-3xl hover:text-blue-500"
            onClick={() => setLightboxOpen(false)}
          >
            <X />
          </button>
          <button
            className="absolute left-6 text-white text-4xl hover:text-blue-500"
            onClick={prevImage}
          >
            <ChevronLeft />
          </button>
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE}/uploads/${property.images[selectedImage]}`}
            alt={`${property.type} ${selectedImage + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl animate-fadeIn"
          />
          <button
            className="absolute right-6 text-white text-4xl hover:text-blue-500"
            onClick={nextImage}
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
