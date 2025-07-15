import React, { useState, useEffect } from "react";
import "../../index.css"; // Ensure Poppins is imported in Tailwind config

const importAll = (r) => r.keys().map(r);
const cutwormImages = importAll(require.context('../../assets/pest/cutworms', false, /\.(png|jpe?g|svg)$/));
const chlorpyrifosImages = importAll(require.context('../../assets/fungicide/cutworm', false, /pyri-(1|2|3|4)\.(png|jpe?g|svg)$/));
const lambdaImages = importAll(require.context('../../assets/fungicide/cutworm', false, /kara-(1|2|3|4)\.(png|jpe?g|svg)$/));

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

const Cutworm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImg, setPopupImg] = useState(null);

  // Always show only 3 dots, but images can be any number
  const dotCount = 3;
  const groupSize = Math.ceil(cutwormImages.length / dotCount);

  const handleDotClick = (dotIdx) => {
    setCurrentIndex(dotIdx * groupSize);
  };

  const getDotIndex = (idx) => Math.floor(idx / groupSize);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cutwormImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 border border-green-200">
        <div className="relative">
          <img
            src={cutwormImages[currentIndex]}
            alt={`Cutworm ${currentIndex}`}
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
          <h2 className="text-2xl font-bold mb-2 text-green-800 font-[Poppins] text-center">🐛 Cutworm</h2>
          <div className="relative h-24 overflow-hidden">
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center italic">
              Scientific names: Agrotis ipsilon, Agrotis spp., Peridroma saucia, Chorizagrotis auxiliaris
            </p>
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center">
              Cutworms are caterpillars that attack young maize plants by cutting their stems at the base. They hide in soil during the day and feed aggressively at night, making them hard to detect.
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
              Cutworm
            </h3>
            <div className="space-y-7 text-gray-800" style={{ fontSize: 14, lineHeight: 1.5 }}>
              {/* 1. What is a Cutworm? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">1. What is a Cutworm?</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Cutworms are destructive caterpillars that live in the soil and attack young maize plants. They feed at night and hide during the day, which makes them difficult to detect early. There are different types of cutworms, and they are all part of the moth family. The most common species include <i>Agrotis ipsilon</i>, <i>Agrotis spp.</i>, <i>Peridroma saucia</i>, and <i>Chorizagrotis auxiliaris</i>.
                </p>
              </section>
              {/* 2. How Do They Damage Maize? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">2. How Do They Damage Maize?</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Cutworms damage maize by chewing through the stems of seedlings at or just below the soil surface. This causes the plants to collapse or die. Older cutworms may bore into the stems or feed on leaves, leaving ragged edges. They can destroy entire patches of young maize plants in a single night, especially when conditions favor their growth.
                </p>
              </section>
              {/* 3. Signs of Infestation */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">3. Signs of Infestation</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Farmers should look for these signs in their maize fields:
                  <ul className="list-disc ml-5">
                    <li>Seedlings cut and fallen on the ground</li>
                    <li>Gaps in planting rows due to dead plants</li>
                    <li>Holes near the base of stems</li>
                    <li>Presence of frass (insect waste) near feeding areas</li>
                    <li>Brownish-black caterpillars curled up in the soil</li>
                    <li>White eggs laid near the base of young plants or in the soil</li>
                    <li>Plants that are wilting or suddenly collapsing</li>
                  </ul>
                </p>
              </section>
              {/* 4. Conditions That Encourage Cutworms */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">4. Conditions That Encourage Cutworms</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Cutworms thrive in areas where weeds are present before or after planting. Crop rotation with host crops like soybeans, rye, and other grasses also increases the risk of cutworm outbreaks. They prefer moist, loose soil and are most active during warm weather and in the early growth stages of maize.
                </p>
              </section>
              {/* 5. Where Are They Found? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">5. Where Are They Found?</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Cutworms are found in both tropical and temperate regions worldwide, including many maize-growing zones in Tanzania. They are especially common in areas with heavy organic matter, poor weeding, and late planting.
                </p>
              </section>
              {/* 6. Impact on Maize Production */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">6. Impact on Maize Production</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Cutworms can cause serious losses by wiping out seedlings and reducing plant population. This leads to fewer cobs per acre and lower overall yields. In severe infestations, farmers may have to replant entire sections of their field, leading to delays and increased production costs.
                </p>
              </section>
              {/* 7. Prevention Techniques */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">7. Prevention Techniques</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Farmers can reduce the risk of cutworm damage by:
                  <ul className="list-disc ml-5">
                    <li>Practicing early and thorough weeding before planting</li>
                    <li>Using clean, tilled soil to expose and destroy larvae</li>
                    <li>Avoiding continuous cropping of maize in the same field</li>
                    <li>Encouraging natural enemies like birds and predatory beetles</li>
                    <li>Planting early to reduce the overlap between young maize and peak cutworm activity</li>
                    <li>Removing plant residues that provide hiding places for larvae</li>
                  </ul>
                </p>
              </section>
              {/* 8. Treatment and Control */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">8. Treatment and Control</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  If cutworms are detected, these treatments can be used:
                  <ul className="list-disc ml-5">
                    <li><b>Biological Control:</b> Use beneficial insects such as parasitic wasps and nematodes that naturally attack cutworm larvae.</li>
                    <li><b>Chemical Control (Pesticides):</b>
                      <ul className="list-disc ml-5">
                        <li>Cypermethrin (e.g., Cymbush)</li>
                        <li>Chlorpyrifos (e.g., Dursban)</li>
                        <li>Lambda-cyhalothrin (e.g., Karate)</li>
                      </ul>
                    </li>
                    <li>Apply pesticides in the evening or early morning when cutworms are active.</li>
                    <li>Focus the spray around the base of the plants where larvae hide and feed.</li>
                    <li>Always follow the safety instructions on pesticide labels.</li>
                  </ul>
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center">
                  <FungicideBlock
                    images={chlorpyrifosImages}
                    label="chlorpyrifos"
                    figure={1}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                  <FungicideBlock
                    images={lambdaImages}
                    label="lambda-cyhalothrin"
                    figure={2}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                </div>
              </section>
              {/* 9. Final Takeaway */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">9. Final Takeaway</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Cutworms are sneaky, soil-dwelling pests that can silently destroy young maize plants. Good field hygiene, early weeding, and monitoring are the best ways to stop them. If action is taken quickly, especially with the help of safe pesticides and natural predators, farmers can avoid big losses.
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

export default Cutworm;