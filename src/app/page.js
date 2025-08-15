'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BrowseOrList from '@/components/BrowseOrList';
import FeaturedListings from '@/components/FeaturedListings';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import API from '@/lib/api';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/properties/listings')
      .then((res) => {
        console.log("Fetched properties:", res.data);
        setProperties(res.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>

      {/* Hero Banner with Search */}
      <HeroSection />

      {/* Browse or List Property */}
      <BrowseOrList />

      {/* Featured Listings */}
      {/* <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Listings</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeaturedListings
              properties={properties} 
              apiBase={process.env.NEXT_PUBLIC_API_BASE}
              />
          </div>
        )}
      </section> */}

      <section className="max-w-7xl mx-auto py-12 px-4">
  <FeaturedListings
    properties={properties}
    loading={loading}
    apiBase={process.env.NEXT_PUBLIC_API_BASE}
  />
</section>


      {/* How it Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* Call to Action */}
      <CallToAction />
    </>
  );
}
