'use client';
import { useState } from 'react';
import API from '@/lib/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BgImage from '../../../public/login.jpg'; // register background image

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/users/register', form);
      toast.success('Registered! Please login.');
      router.push('/login');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 w-full h-1/3 md:h-1/2 lg:h-1/2">
        <Image src={BgImage} alt="Background" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-400 opacity-30 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-20 right-10 w-24 h-24 bg-pink-400 opacity-20 rounded-full animate-spin-slow"></div>
      </div>

      {/* Form Card */}
      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 animate-fadeIn z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create an Account</h2>
        <p className="text-gray-500 text-center mb-6">Join DreamHomes to list or find properties quickly and securely.</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Full Name</label>
            <input
              name="name"
              placeholder="John Doe"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              name="email"
              placeholder="example@mail.com"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              onChange={change}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Login
          </span>
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 8s infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
          opacity: 0;
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
