'use client';

import { Instagram, Twitter, Facebook, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import Logo from '../../public/logo.png'; // make sure logo.png is in public folder

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 relative py-16 px-4">
      {/* Decorative shapes */}
      <div className="absolute -top-10 -left-10 w-36 h-36 bg-blue-200 opacity-20 rounded-full"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="mb-3">
            <Image src={Logo} alt="DreamHomes Logo" width={140} height={40} className="object-contain" />
          </div>
          <p className="text-gray-600">
            Helping you find your perfect home or list your property effortlessly.
            Trusted by thousands of users nationwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-600 transition">Home</a></li>
            <li><a href="/listings" className="hover:text-blue-600 transition">Listings</a></li>
            <li><a href="/submit-property" className="hover:text-blue-600 transition">List Property</a></li>
            <li><a href="/contact" className="hover:text-blue-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600 transition">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">FAQs</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-600 transition">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Get in Touch</h4>
          <div className="flex items-center space-x-2 text-gray-600 mb-4">
            <Mail size={18} />
            <span>support@dreamhomes.com</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition"><Facebook /></a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition"><Instagram /></a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition"><Twitter /></a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition"><Linkedin /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-12 border-t border-gray-300 pt-6 text-sm">
        &copy; {new Date().getFullYear()} DreamHomes. All rights reserved.
      </div>
    </footer>
  );
}
