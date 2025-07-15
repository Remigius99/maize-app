import React, { useState, useEffect } from "react";
import "../../index.css"; // Ensure Poppins is imported in Tailwind config

// Import blight images for the carousel
const importAll = (r) => r.keys().map(r);
const blightImages = importAll(require.context('../../assets/blight', false, /\.(png|jpe?g|svg)$/));

// Import fungicide images for the treatment section
const mancozebImages = importAll(require.context('../../assets/fungicide/blight', false, /man75-(1|2|3|4)\.(png|jpe?g|svg)$/));
const propiconazoleImages = importAll(require.context('../../assets/fungicide/blight', false, /pros-(1|2|3|4)\.(png|jpe?g|svg)$/));

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

const Blight = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImg, setPopupImg] = useState(null);

  // Always show only 3 dots, but images can be any number
  const dotCount = 3;
  const groupSize = Math.ceil(blightImages.length / dotCount);

  const handleDotClick = (dotIdx) => {
    setCurrentIndex(dotIdx * groupSize);
  };

  const getDotIndex = (idx) => Math.floor(idx / groupSize);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blightImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 border border-green-200">
        <div className="relative">
          <img
            src={blightImages[currentIndex]}
            alt={`Blight ${currentIndex}`}
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
          <h2 className="text-2xl font-bold mb-2 text-green-800 font-[Poppins] text-center">Blight</h2>
          <div className="relative h-24 overflow-hidden">
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center">
              Blight is a serious maize leaf disease caused by <i>Exserohilum turcicum</i>, leading to large, cigar-shaped tan lesions. It reduces photosynthesis, weakens plants, and lowers yield if not managed early.
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
              Maize Disease: Blight (Northern Corn Leaf Blight)
            </h3>
            <div className="space-y-7 text-gray-800" style={{ fontSize: 14, lineHeight: 1.5 }}>
              {/* 1. What is Blight? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">1. What is Blight?</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Blight, also known as Northern Corn Leaf Blight (NCLB), is a serious fungal disease that affects the leaves of maize plants. It is caused by the fungus <i><b>Exserohilum turcicum</b></i>. The disease typically starts with small lesions on the leaves, which then grow into large, elongated, cigar-shaped spots. These lesions prevent the plant from effectively performing photosynthesis, which is crucial for healthy growth.
                </p>
              </section>
              {/* 2. Causes of the Disease */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">2. Causes of the Disease</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Blight is primarily caused by fungal spores that are present in infected crop debris left in the field from the previous season. These spores are carried by wind or rain and infect new maize crops, especially under warm temperatures (18–27°C) and high humidity. Prolonged leaf wetness, frequent rainfall, and poor crop rotation practices also contribute to the spread of this disease.
                </p>
              </section>
              {/* 3. Symptoms */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">3. Symptoms</h4>
                <ul className="list-disc ml-5" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  <li>🌿 The symptoms of blight begin with small, gray-green lesions that appear on the lower leaves of the maize plant.</li>
                  <li>🌱 These lesions eventually expand into long, elliptical, tan-colored spots.</li>
                  <li>🍂 As the disease progresses, the lesions turn brown and dry out, causing the leaves to wither and die prematurely.</li>
                  <li>In severe cases, the disease can cause complete leaf death, leaving the plant weak and unproductive.</li>
                </ul>
              </section>
              {/* 4. Effects on Maize Production */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">4. Effects on Maize Production</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Blight significantly reduces the leaf surface area available for photosynthesis, which limits the plant’s energy production. This leads to stunted growth, poor kernel development, and reduced crop yield. If not treated in time, blight can result in yield losses of up to 50%, posing a serious threat to farmers’ income and food security.
                </p>
              </section>
              {/* 5. Common Regions Affected */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">5. Common Regions Affected</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Blight thrives in warm and humid environments. In Tanzania, the disease is commonly found in regions with consistent rainfall and cool to moderate temperatures, including <b>Mbeya</b>, <b>Njombe</b>, <b>Morogoro</b>, and <b>Kilimanjaro</b>. These areas provide ideal conditions for fungal growth and disease spread.
                </p>
              </section>
              {/* 6. Treatment Options */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">6. Treatment Options</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  To control blight, farmers are advised to use fungicides such as <b>Mancozeb 75 WP</b> or <b>Propiconazole</b>. These fungicides should be applied at the early stage of infection and repeated every 10 to 14 days depending on weather conditions. Application should be done in the early morning or late evening to avoid evaporation. Safety precautions, such as wearing gloves and masks, should be followed.
                </p>
                {/* Fungicide Carousels */}
                <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center">
                  <FungicideBlock
                    images={propiconazoleImages}
                    label="propiconazole"
                    figure={1}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                  <FungicideBlock
                    images={mancozebImages}
                    label="mancozeb 75 WP"
                    figure={2}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                </div>
              </section>
              {/* 7. Prevention Techniques */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">7. Prevention Techniques</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Effective prevention starts with using resistant maize varieties and practicing crop rotation to break the disease cycle. Avoid planting maize in the same field every season. Clear the field of old maize debris and maintain good spacing between plants to improve air circulation. Monitoring the field regularly and applying fungicide early can prevent major outbreaks.
                </p>
              </section>
              {/* 8. Final Takeaway */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">Final Takeaway</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Blight is a destructive disease that can be managed effectively through proper field hygiene, resistant seeds, and timely fungicide application. Farmers must remain vigilant during warm and rainy periods and take quick action when symptoms appear to protect their maize crops and ensure a good harvest.
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

export default Blight;