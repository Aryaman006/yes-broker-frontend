'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';
import Navbar from '@/components/Navbar';
import { toast } from 'react-toastify';
import { getAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, role } = getAuth();
  const router = useRouter();

  useEffect(() => {
    if (role !== 'admin') {
      toast.error('Access denied');
      router.push('/');
      return;
    }

    API.get('/properties/admin/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setProperties(res.data))
      .catch(() => toast.error('Failed to load properties'))
      .finally(() => setLoading(false));
  }, [role, token, router]);

  const updateStatus = (id, status) => {
    API.put(`/properties/${status}/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success(`Property ${status}d`);
        setProperties(prev =>
          prev.map(p => p._id === id ? { ...p, status } : p)
        );
      })
      .catch(() => toast.error(`Failed to ${status} property`));
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-8 text-center">Loading...</div>
      </>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Admin - Manage Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p._id}>
                  <td className="p-2 border">
                    {p.images?.[0] && (
                      <img
                        src={`/uploads/${p.images[0]}`}
                        alt={p.type}
                        className="h-16 w-20 object-cover"
                      />
                    )}
                  </td>
                  <td className="p-2 border">{p.type}</td>
                  <td className="p-2 border">{p.location}</td>
                  <td className="p-2 border">₹{p.price.toLocaleString()}</td>
                  <td className="p-2 border capitalize">{p.status}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => updateStatus(p._id, 'approve')}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      disabled={p.status === 'approved'}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(p._id, 'reject')}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      disabled={p.status === 'rejected'}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
