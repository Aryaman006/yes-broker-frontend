'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import PropertyCard from '@/components/PropertyCard';
import { toast } from 'react-toastify';

export default function ListingsPage() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    furnishing: ''
  });

  useEffect(() => {
    API.get('/properties/listings')
      .then((res) => {
        setProperties(res.data || []);
        setFilteredProperties(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load properties');
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...properties];

    if (filters.type) filtered = filtered.filter(p => p.type === filters.type);
    if (filters.bedrooms) filtered = filtered.filter(p => Number(p.bedrooms) === Number(filters.bedrooms));
    if (filters.furnishing) filtered = filtered.filter(p => p.furnishing === filters.furnishing);
    if (filters.minPrice) filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    if (filters.maxPrice) filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));

    setFilteredProperties(filtered);
  }, [filters, properties]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 animate-fadeUp">Available Properties</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 bg-white p-4 rounded-xl shadow-md animate-fadeUp">
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border p-3 rounded-lg w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        >
          <option value="">All Types</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Independent House">Independent House</option>
        </select>

        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={filters.bedrooms}
          onChange={handleFilterChange}
          className="border p-3 rounded-lg w-32 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <select
          name="furnishing"
          value={filters.furnishing}
          onChange={handleFilterChange}
          className="border p-3 rounded-lg w-48 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        >
          <option value="">Furnishing</option>
          <option value="Furnished">Furnished</option>
          <option value="Semi-furnished">Semi-furnished</option>
          <option value="Unfurnished">Unfurnished</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border p-3 rounded-lg w-32 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border p-3 rounded-lg w-32 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>

      {/* Listings Grid */}
      {loading ? (
        <p className="text-center py-12 text-gray-700 text-lg">Loading properties...</p>
      ) : filteredProperties.length === 0 ? (
        <p className="text-center py-12 text-gray-500 text-lg">No properties found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 animate-fadeUp"
            >
              <PropertyCard property={p} apiBase={process.env.NEXT_PUBLIC_API_BASE}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
