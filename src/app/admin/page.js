"use client";

import { useEffect, useState } from "react";
import AdminAPI from "@/lib/adminApi";

export default function AdminDashboard() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const url = process.env.NEXT_PUBLIC_BASE_URL
  console.log(url);
  

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    if (t) {
      setToken(t);
      fetchProperties();
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await AdminAPI.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      setToken(res.data.token);
      fetchProperties();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const fetchProperties = async () => {
    try {
      setLoading(true);
       const token = localStorage.getItem("adminToken");
    console.log("Sending adminToken:", token);
      const res = await AdminAPI.get("/admin/all");
      console.log(res.data);
      
      setProperties(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      await AdminAPI.put(`/properties/${action}/${id}`);
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setProperties([]);
  };

  // Filter properties
  const filteredProperties = properties.filter((p) =>
    filter === "all" ? true : p.status === filter
  );

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === f
                ? f === "pending"
                  ? "bg-yellow-500 text-white"
                  : f === "approved"
                  ? "bg-green-600 text-white"
                  : f === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-blue-600 text-white"
                : "bg-white shadow"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Properties */}
      {loading ? (
        <p className="text-center">Loading properties...</p>
      ) : filteredProperties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredProperties.map((p) => (
  <div
    key={p._id}
    className="bg-white shadow rounded-2xl p-4 flex flex-col"
  >
    {/* Main image */}
    <img
      src={p.images?.[0] ? `${url}/uploads/${p.images[0]}` : "/placeholder.jpg"}
      alt={p.type}
      className="h-48 w-full object-cover rounded-lg mb-4"
    />

    {/* Property details */}
    <h2 className="text-xl font-semibold mb-2">{p.type}</h2>
    <p className="text-gray-600 mb-1"><strong>Owner:</strong> {p.ownerName}</p>
    <p className="text-gray-600 mb-1"><strong>Contact:</strong> {p.contact}</p>
    <p className="text-gray-600 mb-1"><strong>Location:</strong> {p.location}</p>
    <p className="text-gray-600 mb-1"><strong>Bedrooms:</strong> {p.bedrooms}</p>
    <p className="text-gray-600 mb-1"><strong>Furnishing:</strong> {p.furnishing}</p>
    <p className="text-gray-600 mb-1"><strong>Price:</strong> ${p.price}</p>
    <p className="text-sm text-gray-500 mb-2">
      Status:{" "}
      <span className={`${
        p.status === "approved"
          ? "text-green-600"
          : p.status === "rejected"
          ? "text-red-600"
          : "text-yellow-600"
      }`}>
        {p.status}
      </span>
    </p>

    {/* Action buttons */}
    {p.status === "pending" && (
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleAction(p._id, "approve")}
          className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Approve
        </button>
        <button
          onClick={() => handleAction(p._id, "reject")}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    )}

    {/* Additional images if any */}
    {p.images?.length > 1 && (
      <div className="mt-3 flex gap-2 overflow-x-auto">
        {p.images.slice(1).map((img, idx) => (
          <img
            key={idx}
            src={`${url}/uploads/${img}`}
            alt={`Property Image ${idx + 2}`}
            className="h-20 w-20 object-cover rounded-lg"
          />
        ))}
      </div>
    )}
  </div>
))}

        </div>
      )}
    </div>
  );
}
