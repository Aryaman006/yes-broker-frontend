'use client';

export default function CallToAction() {
  return (
    <section className="relative bg-blue-600 text-white py-16 px-4 overflow-hidden">
      {/* Decorative gradient circles */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white opacity-10 rounded-full animate-pulse-slow"></div>

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to List Your Property?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-100">
          Join our platform and reach thousands of buyers instantly.
        </p>
        <a
          href="/submit"
          className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
