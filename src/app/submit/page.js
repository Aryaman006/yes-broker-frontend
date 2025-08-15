'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/lib/api';
import { toast } from 'react-toastify';
import { Home, Image, Tag } from 'lucide-react';

export default function SubmitProperty() {
  const router = useRouter();
  const [form, setForm] = useState({
    ownerName: '',
    contact: '',
    type: '',
    location: '',
    bedrooms: '',
    furnishing: '',
    price: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + form.images.length > 7) {
      toast.error('You can upload a maximum of 7 images.');
      return;
    }

    setForm({ ...form, images: [...form.images, ...files] });

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);
    setForm({ ...form, images: updatedImages });

    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.ownerName ||
      !form.contact ||
      !form.type ||
      !form.location ||
      !form.bedrooms ||
      !form.furnishing ||
      !form.price ||
      form.images.length === 0
    ) {
      toast.error('Please fill all fields and add at least one image');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'images') {
          value.forEach((file) => formData.append('images', file));
        } else {
          formData.append(key, value);
        }
      });

      await API.post('/properties/submit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Property submitted for approval');
      router.push('/listings');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Submit Your Property
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Fill in the details below and your property will be listed after approval.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Owner Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Owner Name</label>
            <input
              name="ownerName"
              value={form.ownerName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="+91 9876543210"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Property Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Independent House">Independent House</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City, Area or Landmark"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Bedrooms</label>
            <input
              name="bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={handleChange}
              placeholder="3"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Furnishing</label>
            <select
              name="furnishing"
              value={form.furnishing}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select Furnishing</option>
              <option value="Furnished">Furnished</option>
              <option value="Semi-furnished">Semi-furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Price (₹)</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="5000000"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Property Images (Max 7)</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {imagePreviews.map((src, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                  <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Property
        </button>
      </form>
    </div>
  );
}
