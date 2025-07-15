import React, { useState, useEffect } from "react";
import "../../index.css";

// Import images for treatments
const importAll = (r) => r.keys().map(r);
const aphidImages = importAll(require.context('../../assets/pest/aphids', false, /\.(png|jpe?g|svg)$/));
const imidaclopridImages = importAll(require.context('../../assets/fungicide/alphids', false, /imi-(1|2|3|4)\.(png|jpe?g|svg)$/));
const dimethoateImages = importAll(require.context('../../assets/fungicide/alphids', false, /dime-(1|2|3|4)\.(png|jpe?g|svg)$/));
const lambdaImages = importAll(require.context('../../assets/fungicide/alphids', false, /lam-(1|2|3|4)\.(png|jpe?g|svg)$/));

const TreatmentBlock = ({ images, label, figure, popupImg, setPopupImg }) => {
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

const Aphids = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImg, setPopupImg] = useState(null);

  // Always show only 3 dots, but images can be any number
  const dotCount = 3;
  const groupSize = Math.ceil(aphidImages.length / dotCount);

  const handleDotClick = (dotIdx) => {
    setCurrentIndex(dotIdx * groupSize);
  };

  const getDotIndex = (idx) => Math.floor(idx / groupSize);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aphidImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 border border-green-200">
        <div className="relative">
          <img
            src={aphidImages[currentIndex]}
            alt={`Corn Leaf Aphid ${currentIndex}`}
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
          <h2 className="text-2xl font-bold mb-2 text-green-800 font-[Poppins] text-center">Corn Leaf Aphid</h2>
          <div className="relative h-24 overflow-hidden">
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center italic">
              Scientific name: <i>Rhopalosiphum maidis</i>
            </p>
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center">
              The Corn Leaf Aphid is a tiny, soft-bodied insect that feeds on maize sap, causing stunted growth, yellowing, and sometimes viral disease in maize crops.
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
             Corn Leaf Aphid (<i>Rhopalosiphum maidis</i>)
            </h3>
            <div className="space-y-7 text-gray-800" style={{ fontSize: 14, lineHeight: 1.5 }}>
              {/* 1. What is a Corn Leaf Aphid? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">1. What is a Corn Leaf Aphid?</h4>
                <p>
                  The Corn Leaf Aphid is a small, soft-bodied insect, usually green or bluish-green in color. These pests feed by sucking sap from the leaves, stems, and whorl (the central growing part) of maize plants. They are tiny, about 1–2 mm long, and often appear in large colonies. You’ll commonly find them clustered under leaves and near the top of the maize plant.
                  <br /><br />
                  They also produce a sticky substance called honeydew, which promotes the growth of sooty mold—a black fungus that can cover plant surfaces and block sunlight.
                </p>
              </section>
              {/* 2. How Do Aphids Damage Maize? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">2. How Do Aphids Damage Maize?</h4>
                <ul className="list-disc ml-5">
                  <li>Suck plant sap – This weakens the plant, reduces its energy, and slows growth.</li>
                  <li>Affects photosynthesis – Sooty mold growing on honeydew prevents sunlight from reaching the leaf surface.</li>
                  <li>Stunts plant development – Young plants attacked by aphids may grow poorly or not form ears (cobs).</li>
                  <li>Transmit viruses – Aphids are known to spread diseases like Maize Dwarf Mosaic Virus (MDMV), which further reduces yield.</li>
                  <li>Causes leaf curling and yellowing – Especially under heavy infestations.</li>
                </ul>
              </section>
              {/* 3. Signs That Aphids Are Present */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">3. Signs That Aphids Are Present</h4>
                <ul className="list-disc ml-5">
                  <li>Groups of tiny green or bluish aphids clustered on the underside of leaves</li>
                  <li>Sticky, shiny patches (honeydew) on the plant</li>
                  <li>Black sooty mold growing on leaves</li>
                  <li>Curling or yellowing of leaves</li>
                  <li>Weak and stunted plants</li>
                  <li>Poor cob development</li>
                </ul>
              </section>
              {/* 4. What Conditions Favor Aphid Infestation? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">4. What Conditions Favor Aphid Infestation?</h4>
                <ul className="list-disc ml-5">
                  <li>Warm and dry weather – These pests prefer low humidity.</li>
                  <li>Dense plant populations – Little air movement makes plants easier to infest.</li>
                  <li>Excess nitrogen fertilizers – This encourages soft, succulent growth that aphids love.</li>
                  <li>Lack of natural predators – Aphids multiply faster when no beneficial insects are around.</li>
                </ul>
              </section>
              {/* 5. Regions Affected */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">5. Regions Affected</h4>
                <p>
                  Corn leaf aphids are found in many maize-growing regions in Africa, including Tanzania. They are common in both lowland and highland areas, especially where the climate is warm and dry.
                </p>
              </section>
              {/* 6. Why Aphids Matter to Farmers */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">6. Why Aphids Matter to Farmers</h4>
                <ul className="list-disc ml-5">
                  <li>Aphids are silent destroyers. Their presence often goes unnoticed until plants begin to yellow, curl, or grow poorly.</li>
                  <li>They can spread viral diseases that cannot be treated.</li>
                  <li>If not managed early, they can cause serious losses in maize yield—especially in young crops.</li>
                </ul>
              </section>
              {/* 7. Prevention and Control Measures */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">7. Prevention and Control Measures</h4>
                <ul className="list-disc ml-5">
                  <li>
                    <b>Natural Methods (Recommended First):</b> Introduce beneficial insects like ladybugs, lacewings, and hoverflies. Reduce nitrogen overuse and control weeds.
                  </li>
                  <li>
                    <b>Light Infestation Treatments:</b> Insecticidal soap or Neem oil. Spray directly on aphid clusters under the leaves and in the whorl.
                  </li>
                  <li>
                    <b>Chemical Control (For Severe Cases):</b> Use these pesticides only if absolutely necessary and follow label instructions carefully:
                    <ul className="list-disc ml-5">
                      <li>Imidacloprid – Systemic insecticide absorbed by the plant</li>
                      <li>Dimethoate – Kills aphids on contact and through feeding</li>
                      <li>Lambda-cyhalothrin – Effective on multiple insect pests</li>
                    </ul>
                  </li>
                  <li><b>NOTE:</b><br />Always wear protective clothing when spraying, and avoid spraying during pollination (when tassels release pollen).</li>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 justify-center">
                  <TreatmentBlock
                    images={imidaclopridImages}
                    label="Imidacloprid"
                    figure={1}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                  <TreatmentBlock
                    images={dimethoateImages}
                    label="Dimethoate"
                    figure={2}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                  <TreatmentBlock
                    images={lambdaImages}
                    label="Lambda-cyhalothrin"
                    figure={3}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                </div>
              </section>
              {/* 8. Final Advice */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">8. Final Advice</h4>
                <p>
                  Regular field monitoring is key! Check your maize early—especially the whorl and underside of leaves—for clusters of aphids. Act fast using natural solutions. Only use chemicals as a last resort, and always protect beneficial insects.
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
          {/* Treatment image popup */}
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

export default Aphids;