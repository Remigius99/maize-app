import React, { useState, useEffect } from "react";
import "../../index.css"; // Ensure Poppins is imported in Tailwind config

const importAll = (r) => r.keys().map(r);
const grayImages = importAll(require.context('../../assets/gray', false, /\.(png|jpe?g|svg)$/));
const propiconazoleImages = importAll(require.context('../../assets/fungicide/gray', false, /pros-(1|2|3|4)\.(png|jpe?g|svg)$/));
const pyraclostrobinImages = importAll(require.context('../../assets/fungicide/gray', false, /py-(1|2|3|4)\.(png|jpe?g|svg)$/));
const azoxystrobinImages = importAll(require.context('../../assets/fungicide/gray', false, /azo-(1|2|3|4)\.(png|jpe?g|svg)$/));

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

const Gray = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImg, setPopupImg] = useState(null);

  // Always show only 3 dots, but images can be any number
  const dotCount = 3;
  const groupSize = Math.ceil(grayImages.length / dotCount);

  const handleDotClick = (dotIdx) => {
    setCurrentIndex(dotIdx * groupSize);
  };

  const getDotIndex = (idx) => Math.floor(idx / groupSize);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % grayImages.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative transition-transform transform hover:scale-105 border border-green-200">
        <div className="relative">
          <img
            src={grayImages[currentIndex]}
            alt={`Gray Leaf Spot ${currentIndex}`}
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
          <h2 className="text-2xl font-bold mb-2 text-green-800 font-[Poppins] text-center">Gray Leaf Spot</h2>
          <div className="relative h-24 overflow-hidden">
            <p className="text-gray-700 font-[Poppins] z-10 relative text-center">
              Gray Leaf Spot (GLS) is a common and damaging fungal disease of maize caused by fungi such as <i>Cercospora zeae-maydis</i> and <i>Cercospora sorghi var. maydis</i>. It disrupts photosynthesis and can cause severe yield loss if not managed.
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
              Maize Disease: Gray Leaf Spot (GLS)
            </h3>
            <div className="space-y-7 text-gray-800" style={{ fontSize: 14, lineHeight: 1.5 }}>
              {/* 1. What is Gray Leaf Spot? */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">1. What is Gray Leaf Spot?</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Gray Leaf Spot (GLS) is a common and damaging fungal disease of maize caused by fungi such as <i>Cercospora zeae-maydis</i> and <i>Cercospora sorghi var. maydis</i>. The disease primarily attacks the leaves of maize plants, disrupting their ability to perform photosynthesis. It usually appears during the growing season, especially in areas with high humidity and warm temperatures. GLS spreads through fungal spores found in crop debris from previous seasons and is often carried by wind or splashing rainwater.
                </p>
              </section>
              {/* 2. Causes of the Disease */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">2. Causes of the Disease</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Gray Leaf Spot is caused by fungal spores that survive in maize debris left in the field. These spores become active when the weather is humid, and they spread through wind or rain. Factors that encourage the disease include poor air circulation due to overcrowded planting, conservation tillage (which leaves debris on the soil surface), and warm, wet weather. Fields with a history of GLS infections are at higher risk, especially if crop rotation is not practiced.
                </p>
              </section>
              {/* 3. Symptoms */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">3. Symptoms</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Early symptoms of GLS are small, rectangular, gray to brown lesions on the lower leaves of the maize plant. These lesions gradually enlarge and can grow up to 3 cm long. They typically follow the leaf veins, creating a striped appearance. As the disease progresses, the lesions may coalesce, causing large areas of dead tissue. In severe cases, the plant may experience early leaf death, reducing its energy for grain filling and leading to stunted growth.
                </p>
              </section>
              {/* 4. Effects on Maize Production */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">4. Effects on Maize Production</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Gray Leaf Spot can have a serious impact on maize yields. The disease limits the plant’s photosynthetic capacity, which reduces the energy available for growth and kernel development. This can lead to small, underdeveloped cobs. In severe outbreaks, yield losses may reach up to 70%. Additionally, plants weakened by GLS are more prone to lodging, where stalks fall over before harvest, complicating mechanical or manual harvesting and increasing post-harvest losses.
                </p>
              </section>
              {/* 5. Common Regions Affected */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">5. Common Regions Affected</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  GLS is most commonly found in warm and humid maize-growing regions. In Tanzania, the disease is prevalent in areas such as Mbeya, Njombe, Iringa, Morogoro, Ruvuma, Kilimanjaro, and Tanga. These regions experience high rainfall, mist, and frequent dew—conditions that are highly favorable for the development and spread of fungal spores.
                </p>
              </section>
              {/* 6. Treatment Options */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">6. Treatment Options</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  To control GLS, fungicides can be applied when symptoms first appear. Recommended fungicides include <b>Azoxystrobin</b>, <b>Pyraclostrobin</b>, and <b>Propiconazole</b>. Application should follow the manufacturer’s instructions and be timed during early signs of infection. Use protective equipment during spraying, and avoid fungicide overuse to prevent resistance buildup in fungi.
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
                    images={pyraclostrobinImages}
                    label="pyraclostrobin"
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
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">7. Prevention Techniques</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Preventing Gray Leaf Spot involves a combination of cultural and agronomic practices. These include:
                  <ul className="list-disc ml-5">
                    <li>Using resistant maize varieties.</li>
                    <li>Practicing crop rotation (avoid planting maize every season).</li>
                    <li>Removing and burying infected crop debris through deep plowing.</li>
                    <li>Ensuring adequate spacing between maize plants to improve airflow.</li>
                    <li>Monitoring fields during humid periods for early symptoms.</li>
                    <li>Applying certified fungicides if necessary.</li>
                  </ul>
                </p>
              </section>
              {/* 8. Final Takeaway */}
              <section className="bg-green-50 rounded-lg p-4 shadow-sm">
                <h4 className="text-[14px] font-semibold mb-2 text-green-700">Final Takeaway</h4>
                <p className="text-justify" style={{ fontSize: 12, lineHeight: 1.5 }}>
                  Gray Leaf Spot is a dangerous fungal disease that affects many maize fields across Tanzania. It destroys leaves, weakens plants, and can result in significant yield loss. Farmers should stay alert in humid areas and practice good farm hygiene and crop management. By rotating crops, using resistant seeds, and applying fungicides when needed, they can greatly reduce the impact of GLS and secure their harvest.
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

export default Gray;