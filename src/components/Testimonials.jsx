'use client';

export default function Testimonials() {
  const reviews = [
    { name: "Amit Sharma", feedback: "Great platform! I found my dream home in just 2 weeks." },
    { name: "Priya Mehta", feedback: "Easy to use and the listings are all verified." },
    { name: "Rahul Verma", feedback: "Saved me a lot of time and hassle." },
  ];

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-12 text-gray-800 animate-fadeIn">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="relative bg-white shadow-md rounded-xl p-8 flex flex-col items-center text-gray-800 transform transition duration-500 hover:scale-105 hover:shadow-xl"
            >
              <p className="text-center text-gray-700 italic mb-4">"{r.feedback}"</p>
              <h3 className="font-semibold text-lg text-blue-600">{r.name}</h3>

              {/* Medium subtle decorative circles */}
              {/* <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-200 rounded-full opacity-40"></div> */}
              {/* <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200 rounded-full opacity-30"></div> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
