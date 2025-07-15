import React from "react";

const AboutExtra = () => {
  return (
    <section className="bg-white py-10 px-4 font-poppins">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Mission Card */}
        <div className="bg-[#e6fffa] shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-[#00df9a] mb-2">Our Mission</h3>
          <p className="text-gray-700 text-sm">
            To revolutionize maize farming by providing smart, accessible, and affordable tools for disease detection and crop management.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-[#e6fffa] shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-[#00df9a] mb-2">Our Vision</h3>
          <p className="text-gray-700 text-sm">
            A future where AI ensures food security and economic growth by empowering farmers with reliable agricultural technology.
          </p>
        </div>

        {/* How It Works Card */}
        <div className="bg-[#e6fffa] shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-[#00df9a] mb-2">How It Works</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Upload images of maize leaves</li>
            <li>AI detects and classifies diseases</li>
            <li>Get instant recommendations</li>
          </ul>
        </div>

        {/* Who It's For Card */}
        <div className="bg-[#e6fffa] shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-bold text-[#00df9a] mb-2">Who It's For</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Farmers</li>
            <li>Extension Officers</li>
            <li>Researchers</li>
            <li>Agribusiness Professionals</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutExtra;
