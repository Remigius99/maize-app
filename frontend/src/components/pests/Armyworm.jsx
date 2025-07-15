import React, { useState, useEffect } from "react";
import "../../index.css";

const importAll = (r) => r.keys().map(r);
const armywormImages = importAll(require.context('../../assets/pest/armyworm', false, /\.(png|jpe?g|svg)$/));
const emamectinImages = importAll(require.context('../../assets/fungicide/armyworm', false, /em-(1|2|3|4)\.(png|jpe?g|svg)$/));
const spinetoramImages = importAll(require.context('../../assets/fungicide/armyworm', false, /spine-(1|2|3|4)\.(png|jpe?g|svg)$/));
const lambdaImages = importAll(require.context('../../assets/fungicide/armyworm', false, /kara-(1|2|3|4)\.(png|jpe?g|svg)$/));
const chloraImages = importAll(require.context('../../assets/fungicide/armyworm', false, /chlora-(1|2|3|4)\.(png|jpe?g|svg)$/));

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

const Armyworm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImg, setPopupImg] = useState(null);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % armywormImages.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + armywormImages.length) % armywormImages.length);

  useEffect(() => {
    const timer = setInterval(goToNext, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 border border-green-200">
        <div className="relative">
          <img
            src={armywormImages[currentIndex]}
            alt={`Fall Armyworm ${currentIndex}`}
            className="w-full h-56 object-cover"
            style={{ borderBottomLeftRadius: "1rem", borderBottomRightRadius: "1rem" }}
          />
          <button onClick={goToPrev} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-2xl">‹</button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full text-2xl">›</button>
        </div>

        <div className="p-5 relative">
          <h2 className="text-2xl font-bold mb-2 text-green-800 font-[Poppins] text-center">Fall Armyworm</h2>
          <div className="relative h-24 overflow-hidden">
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center italic">
              Scientific name: <i>Spodoptera frugiperda</i>
            </p>
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center">
              The Fall Armyworm is a highly destructive pest that primarily targets maize, damaging leaves, stems, and ears. Its rapid spread and feeding behavior can devastate fields within days.
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
              Fall Armyworm (<i>Spodoptera frugiperda</i>)
            </h3>
            <div className="space-y-7 text-gray-800" style={{ fontSize: 14, lineHeight: 1.5 }}>
              {/* 1. What is the Fall Armyworm? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">1. What is the Fall Armyworm?</h4>
                <p>
                  The Fall Armyworm is a serious insect pest that mostly affects maize (corn) crops but can also attack over 80 other plant types. It is the larva (caterpillar) stage of a moth. The name "armyworm" comes from the pest’s behavior: it moves across fields in large numbers like an invading army, eating nearly everything in its path.
                  <br /><br />
                  This pest has become a major threat to maize farmers in Africa, including Tanzania. It can cause complete crop destruction in a matter of days if left unmanaged.
                </p>
              </section>
              {/* 2. How Does It Damage the Maize Plant? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">2. How Does It Damage the Maize Plant?</h4>
                <ul className="list-disc ml-5">
                  <li>Young larvae feed on the leaf surface, creating “window-pane” damage, where only the upper layer of the leaf is scraped off.</li>
                  <li>As they grow, they chew large holes in the leaves, giving the plant a ragged appearance.</li>
                  <li>The caterpillars may burrow into the whorl (center part of the maize plant), damaging inner leaves.</li>
                  <li>They often attack the cob (ear) by boring through the husk, which reduces grain quality.</li>
                  <li>In young maize plants, they may cut the stems at the base, killing the plant completely.</li>
                </ul>
              </section>
              {/* 3. Signs That the Pest is Present */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">3. Signs That the Pest is Present</h4>
                <ul className="list-disc ml-5">
                  <li>Leaves with ragged holes and uneven edges</li>
                  <li>Window-pane damage on young leaves</li>
                  <li>Frass (insect poop), which looks like yellow-brown powder inside the whorl or around the base</li>
                  <li>Holes on the maize cob</li>
                  <li>Plants cut at the base</li>
                  <li>Visible caterpillars on the leaves (green-brown, with dark head and stripes)</li>
                  <li>Groups of larvae crawling to nearby plants or fields</li>
                </ul>
              </section>
              {/* 4. What Favors Its Development? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">4. What Favors Its Development?</h4>
                <ul className="list-disc ml-5">
                  <li>Fields with no natural predators, such as birds, ants, or beneficial insects</li>
                  <li>Cool and wet weather, which reduces predator activity</li>
                  <li>Late planting seasons, giving pests time to reproduce</li>
                  <li>Continuous maize cropping without rotation</li>
                </ul>
              </section>
              {/* 5. Regions Affected */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">5. Regions Affected</h4>
                <p>
                  The Fall Armyworm was first reported in Africa in 2016. Since then, it has spread to nearly all maize-growing regions, including:
                  <br />
                  Tanzania (especially in the southern and central zones)
                  <br />
                  Sub-Saharan Africa
                  <br />
                  Tropical and subtropical climates worldwide
                  <br />
                  It can survive all year in warm climates and continues to spread rapidly.
                </p>
              </section>
              {/* 6. Why It Matters to Farmers */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">6. Why It Matters to Farmers</h4>
                <ul className="list-disc ml-5">
                  <li>Fall Armyworm can reduce maize yield by 30–100% if not managed.</li>
                  <li>Damages both the leaves and the cob, which are essential for photosynthesis and grain production</li>
                  <li>Can wipe out a young field in days</li>
                  <li>Spreads fast, especially when farmers don’t recognize it early</li>
                  <li>Feeds mainly at night, making early detection harder</li>
                  <li>Is resistant to some common pesticides, so prevention and proper management are very important</li>
                </ul>
              </section>
              {/* 7. Management and Control Measures */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">7. Management and Control Measures</h4>
                <ul className="list-disc ml-5">
                  <li>
                    <b>A. Cultural Control (Non-Chemical):</b> Early planting, crop rotation, field hygiene, weed control, and hand-picking caterpillars.
                  </li>
                  <li>
                    <b>B. Biological Control:</b> Encourage natural predators like parasitic wasps, ladybugs, and ants.
                  </li>
                  <li>
                    <b>C. Chemical Control:</b> Use chemical pesticides only when infestation is severe, and always follow safety guidelines. Recommended options include:
                  </li>
                </ul>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 justify-center">
                  <TreatmentBlock
                    images={emamectinImages}
                    label="Emamectin benzoate"
                    figure={1}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                  <TreatmentBlock
                    images={spinetoramImages}
                    label="Spinetoram/Spinosad"
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
                  <TreatmentBlock
                    images={chloraImages}
                    label="Chlorantraniliprole"
                    figure={4}
                    popupImg={popupImg}
                    setPopupImg={setPopupImg}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <b>Apply early</b> when you see young larvae and signs of feeding. Spray during early morning or late afternoon when caterpillars are active.<br />
                  <b>Always use protective clothing, follow label instructions, and avoid spraying during flowering (to protect pollinators like bees).</b>
                </div>
              </section>
              {/* 8. Final Tip for Farmers */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">8. Final Tip for Farmers</h4>
                <p>
                  The most important action is early detection.<br />
                  Walk through your field regularly, especially within the first 3–6 weeks of planting.<br />
                  Look closely at the whorl and underside of leaves for early signs of damage or frass.<br />
                  Combine cultural, biological, and chemical methods for best results.<br />
                  Fall Armyworm is manageable if identified early and acted on quickly.
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

export default Armyworm;