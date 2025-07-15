import React, { useState, useEffect } from "react";
import "../../index.css"; // Ensure Poppins is imported in Tailwind config

const importAll = (r) => r.keys().map(r);
const borerImages = importAll(require.context('../../assets/pest/borer', false, /\.(png|jpe?g|svg)$/));
const cypermethrinImages = importAll(require.context('../../assets/fungicide/borer', false, /cyp-(1|2|3|4)\.(png|jpe?g|svg)$/));
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

const Borer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImg, setPopupImg] = useState(null);

  // Always show only 3 dots, but images can be any number
  const dotCount = 3;
  const groupSize = Math.ceil(borerImages.length / dotCount);

  const handleDotClick = (dotIdx) => {
    setCurrentIndex(dotIdx * groupSize);
  };

  const getDotIndex = (idx) => Math.floor(idx / groupSize);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % borerImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 border border-green-200">
        <div className="relative">
          <img
            src={borerImages[currentIndex]}
            alt={`African Maize Stem Borer ${currentIndex}`}
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
          <h2 className="text-2xl font-bold mb-2 text-green-800 font-[Poppins] text-center">Maize Stem Borer</h2>
          <div className="relative h-24 overflow-hidden">
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center italic">
              Scientific name: <i>Busseola fusca</i>
            </p>
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center">
              The African maize stem borer is a caterpillar pest that bores into the stems of maize plants, causing significant damage and yield loss if not managed early.
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
              African Maize Stem Borer
            </h3>
            <div className="space-y-7 text-gray-800" style={{ fontSize: 14, lineHeight: 1.5 }}>
              {/* 1. What is the African Maize Stem Borer? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">1. What is the African Maize Stem Borer?</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The African maize stem borer (scientific name: <i>Busseola fusca</i>) is a serious caterpillar pest of maize and sorghum in sub-Saharan Africa. It starts as the larva of a moth and damages crops by boring into the stem and feeding on the internal parts of the maize plant. This pest causes major yield losses, especially in areas where it is not controlled early. Farmers also refer to it as the African Sorghum Stem Borer.
                </p>
              </section>
              {/* 2. Causes and Conditions That Help It Spread */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">2. Causes and Conditions That Help It Spread</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The pest thrives in warm and humid conditions, especially in maize fields with no tillage or minimal soil disturbance. The female moth lays eggs on young maize plants, and when these eggs hatch, the larvae (caterpillars) begin feeding on the leaves and stems. Fields that are not cleaned well after harvest or where maize is repeatedly grown in the same soil are more likely to experience infestations.
                </p>
              </section>
              {/* 3. Symptoms and Damage */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">3. Symptoms and Damage</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The damage starts in the whorl (center) of young maize plants, where larvae feed on leaves and create small holes and window-pane patches. As the larvae grow, they bore into the stem, making tunnels inside. This results in 'deadheart'—a condition where the central leaf dries up and dies. The plant may also fall over or break due to internal damage, and the cob formation is often reduced or stopped completely.
                </p>
              </section>
              {/* 4. Signs That the Pest is Present */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">4. Signs That the Pest is Present</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Farmers should look out for these signs:
                  <ul className="list-disc ml-5">
                    <li>Holes and window-pane patches in young whorl leaves</li>
                    <li>Central leaf dries and dies (deadheart)</li>
                    <li>Visible tunnels or boreholes in the stem when split open</li>
                    <li>Plants fall over or break easily (lodging)</li>
                    <li>Cob formation is low or missing entirely</li>
                  </ul>
                </p>
              </section>
              {/* 5. Effects on Maize Production */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">5. Effects on Maize Production</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The internal damage caused by the stem borer weakens the plant structure and disrupts nutrient flow. This leads to reduced grain formation or complete failure. The pest hides inside the stem, so damage is often discovered too late. If no action is taken, yield losses can reach up to 40–50%, especially in highly infested areas.
                </p>
              </section>
              {/* 6. Common Regions Affected */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">6. Common Regions Affected</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The African maize stem borer is found across sub-Saharan Africa, including many parts of Tanzania. Regions such as:
                  <ul className="list-disc ml-5">
                    <li>Southern Highlands (e.g., Mbeya, Njombe)</li>
                    <li>Central Zone (e.g., Dodoma, Singida)</li>
                    <li>Coastal Zone (e.g., Morogoro and Tanga)</li>
                  </ul>
                  are particularly affected. The pest is active in both lowland and highland areas (up to 2000 meters altitude).
                </p>
              </section>
              {/* 7. Prevention Techniques */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">7. Prevention Techniques</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  To prevent stem borer infestation, farmers can use the following methods:
                  <ul className="list-disc ml-5">
                    <li><b>Crop rotation:</b> Avoid planting maize or sorghum in the same field every season.</li>
                    <li><b>Field sanitation:</b> Remove and destroy crop residues after harvest to kill any eggs or larvae.</li>
                    <li><b>Early planting:</b> Plant early in the season to avoid peak pest activity.</li>
                    <li><b>Use resistant varieties:</b> Plant maize types that are less attractive to the pest.</li>
                    <li><b>Intercropping:</b> Mix maize with crops like beans or cowpeas to confuse the pest and reduce infestation.</li>
                  </ul>
                </p>
              </section>
              {/* 8. Treatment and Control Methods */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">8. Treatment and Control Methods</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  If the pest is detected, farmers should act quickly to control its spread. Treatment methods include:
                  <ul className="list-disc ml-5">
                    <li><b>Biological control:</b> Introduce natural enemies like parasitic wasps (e.g., Cotesia flavipes) which lay eggs inside the stem borer larvae.</li>
                    <li><b>Chemical pesticides</b> (only if infestation is severe):
                      <ul className="list-disc ml-5">
                        <li>Cypermethrin (e.g., Cymbush)</li>
                        <li>Lambda-Cyhalothrin (e.g., Karate)</li>
                        <li>Chlorpyrifos (e.g., Dursban)</li>
                      </ul>
                    </li>
                    <li>Always follow instructions on the label for safety and effectiveness.</li>
                    <li>Spray directly into the whorl area of the plant where the caterpillars feed.</li>
                  </ul>
                </p>
                <div className="flex flex-col md:flex-row gap-4 mt-4 justify-center">
                  <FungicideBlock
                    images={cypermethrinImages}
                    label="cypermethrin"
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
                  <FungicideBlock
                    images={chlorpyrifosImages}
                    label="chlorpyrifos"
                    figure={3}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                </div>
              </section>
              {/* 9. Final Takeaway */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">9. Final Takeaway</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  The African maize stem borer is a silent but dangerous pest that attacks maize from the inside. By practicing early planting, rotating crops, cleaning the field, and using natural predators or approved pesticides, farmers can manage and reduce its impact. Regular inspection and immediate action are key to saving the maize crop.
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

export default Borer;