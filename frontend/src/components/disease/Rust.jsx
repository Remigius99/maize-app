import React, { useState, useEffect } from "react";
import "../../index.css"; // Ensure Poppins is imported in Tailwind config

const importAll = (r) => r.keys().map(r);
const rustImages = importAll(require.context('../../assets/rust', false, /\.(png|jpe?g|svg)$/));

// Import fungicide images for the treatment section
const propiconazoleImages = importAll(require.context('../../assets/fungicide/rust', false, /pros-(1|2|3|4)\.(png|jpe?g|svg)$/));
const tebuconazoleImages = importAll(require.context('../../assets/fungicide/rust', false, /teb-(1|2|3|4)\.(png|jpe?g|svg)$/));
const azoxystrobinImages = importAll(require.context('../../assets/fungicide/rust', false, /azo-(1|2|3|4)\.(png|jpe?g|svg)$/));

const FungicideBlock = ({ images, label, figure, popupImg, setPopupImg }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, images.length]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % images.length);

  return (
    <div className="flex-1 bg-white rounded-xl shadow-md p-4 border border-green-200 mx-2 flex flex-col items-center">
      <div className="flex items-center justify-center gap-4 mb-2">
        <button
          onClick={handlePrev}
          className="bg-green-100 hover:bg-green-300 text-green-800 rounded-full w-8 h-8 flex items-center justify-center shadow transition"
          aria-label="Previous"
        >
          ‹
        </button>
        <img
          src={images[current]}
          alt={`${label} ${current + 1}`}
          className="w-32 h-32 object-contain rounded-lg border border-green-200 shadow cursor-pointer transition hover:scale-105"
          onClick={() => setPopupImg(images[current])}
        />
        <button
          onClick={handleNext}
          className="bg-green-100 hover:bg-green-300 text-green-800 rounded-full w-8 h-8 flex items-center justify-center shadow transition"
          aria-label="Next"
        >
          ›
        </button>
      </div>
      <div className="mt-2 text-center">
        <span className="italic text-green-700 text-sm">
          {`figure ${figure}: ${label}`}
        </span>
      </div>
    </div>
  );
};

const Rust = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImg, setPopupImg] = useState(null);

  // Always show only 3 dots, but images can be any number
  const dotCount = 3;
  const groupSize = Math.ceil(rustImages.length / dotCount);

  const handleDotClick = (dotIdx) => {
    setCurrentIndex(dotIdx * groupSize);
  };

  const getDotIndex = (idx) => Math.floor(idx / groupSize);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % rustImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 border border-green-200">
        <div className="relative">
          <img
            src={rustImages[currentIndex]}
            alt={`Common Rust ${currentIndex}`}
            className="w-full h-56 object-cover"
            style={{ borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem" }}
          />
          <div className="absolute bottom-2 left-0 w-full flex justify-center gap-2">
            {[...Array(dotCount)].map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => handleDotClick(dotIdx)}
                className={`w-3 h-3 rounded-full transition border-2 border-green-600 ${
                  getDotIndex(currentIndex) === dotIdx ? "bg-green-600" : "bg-green-200"
                }`}
                aria-label={`Go to image group ${dotIdx + 1}`}
                style={{ outline: "none" }}
              />
            ))}
          </div>
        </div>

        <div className="p-5 relative">
          <h2 className="text-2xl font-bold mb-2 text-green-800 font-[Poppins] text-center">Common Rust</h2>
          <div className="relative h-24 overflow-hidden">
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center">
              Common Rust is a fungal disease caused by <i>Puccinia sorghi</i>. It produces reddish-brown pustules on maize leaves and can weaken the plant if severe.
            </p>
            <div className="absolute bottom-0 left-0 w-full flex inset-0 bg-gradient-to-t from-gray-200 via-gray-100 to-transparent pointer-events-none z-20" />
          </div>
          <div className="flex justify-center mt-4 z-30 relative">
            <button
              onClick={() => setShowPopup(true)}
              className="px-8 py-2 bg-gradient-to-r from-green-600 to-green-400 text-white rounded-lg hover:from-green-700 hover:to-green-500 font-[Poppins] shadow-lg transition font-semibold"
            >
              Read More
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-2 py-4">
          <div className="bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[95vh] w-full max-w-3xl p-6 font-[Poppins] text-justify relative border-2 border-green-200">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 bg-red-100 hover:bg-red-300 text-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow transition"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-[22px] font-bold mb-6 text-center text-green-800" style={{ lineHeight: 1.5 }}>
              Maize Disease: Common Rust
            </h3>
            <div className="space-y-7 text-gray-800" style={{ fontSize: 14, lineHeight: 1.5 }}>
              {/* 1. What is Common Rust? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">1. What is Common Rust?</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Common Rust is a fungal disease of maize caused by the fungus <i>Puccinia sorghi</i>. It affects primarily the leaves of the maize plant, where it forms reddish-brown pustules that can reduce photosynthesis and weaken the plant. These pustules later turn black as the disease progresses. While it is not the most devastating maize disease, it can cause significant yield losses if conditions are favorable for its spread and no management measures are taken.
                </p>
              </section>
              {/* 2. Causes of the Disease */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">2. Causes of the Disease</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The disease is caused by wind-borne fungal spores called urediniospores, which travel from infected fields to healthy ones. Common Rust develops rapidly in cool to moderate temperatures ranging from 15–25°C, especially when humidity is high. Extended periods of leaf wetness, caused by dew, fog, or rain, create ideal conditions for the fungus to germinate and infect maize leaves.
                </p>
              </section>
              {/* 3. Symptoms */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">3. Symptoms</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The first symptoms are small, round, reddish-brown pustules (spore-producing structures) that appear on both the upper and lower surfaces of maize leaves. As the disease progresses, leaves may turn yellow, wither, and die prematurely. In the later stages, the pustules turn dark brown to black, indicating the formation of teliospores, which help the fungus survive in tough conditions. Severe infections can lead to major reductions in green leaf area and plant health.
                </p>
              </section>
              {/* 4. Effects on Maize Production */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">4. Effects on Maize Production</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  When the infection is widespread and not managed, Common Rust reduces the photosynthetic area of the plant, thereby limiting energy for growth and grain filling. The resulting plants are often weaker and have lower productivity. Yield losses from Common Rust can range from 20% to 40% in severe outbreaks. This also affects the quality of the maize produced, which is an economic concern for farmers.
                </p>
              </section>
              {/* 5. Common Regions Affected */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">5. Common Regions Affected</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  This disease is found in warm and moist areas of Tanzania, where rainfall and dew are common during the growing season. Regions frequently affected by Common Rust include Tanga, Mbeya, Iringa, Rukwa, and Ruvuma. These regions experience high humidity and rainfall, making them ideal environments for fungal diseases like rust to thrive.
                </p>
              </section>
              {/* 6. Treatment Options */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">6. Treatment Options</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Fungicides can be applied to control Common Rust when symptoms begin to appear. Effective products include those containing <b>Propiconazole</b>, <b>Tebuconazole</b>, or <b>Azoxystrobin</b>. Application should be timely, ideally before severe symptoms develop. Farmers should follow label instructions, wear protective gear, and avoid spraying in windy or rainy conditions to maximize effectiveness and safety.
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center">
                  <FungicideBlock
                    images={propiconazoleImages}
                    label="propiconazole"
                    figure={1}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                  <FungicideBlock
                    images={tebuconazoleImages}
                    label="tebuconazole"
                    figure={2}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                  <FungicideBlock
                    images={azoxystrobinImages}
                    label="azoxystrobin"
                    figure={3}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                </div>
              </section>
              {/* 7. Prevention Techniques */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">Prevention Techniques</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Preventing Common Rust starts with planting resistant maize varieties, which are developed to tolerate fungal infections. Farmers should also plant early in the season to avoid periods of peak fungal spore pressure. Regular field monitoring, especially during rainy periods, helps detect early signs. Avoid dense planting, as this limits airflow and promotes humidity buildup. Fungicides should be applied early if the disease appears.
                </p>
              </section>
              {/* 8. Final Takeaway */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">Final Takeaway</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Common Rust may not be as aggressive as other fungal diseases, but it still poses a risk to maize production. By planting resistant varieties, monitoring fields during humid seasons, and applying fungicides early when needed, farmers can protect their crops and reduce the impact of the disease. Maintaining clean, well-managed fields is essential to long-term control of rust and other fungal threats.
                </p>
              </section>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gradient-to-r from-red-600 to-red-400 text-white px-8 py-2 rounded-lg hover:from-red-700 hover:to-red-500 font-semibold shadow-lg transition"
              >
                Close
              </button>
            </div>
          </div>
          {/* Fungicide image popup */}
          {popupImg && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
              onClick={() => setPopupImg(null)}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-4 relative max-w-md">
                <button
                  onClick={() => setPopupImg(null)}
                  className="absolute top-2 right-2 bg-red-100 hover:bg-red-300 text-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow transition"
                  aria-label="Close"
                >
                  ×
                </button>
                <img
                  src={popupImg}
                  alt="Preview"
                  className="w-full h-80 object-contain rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Rust;