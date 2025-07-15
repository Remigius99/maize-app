import React from "react";
import maizeClimateImg from "../assets/farmpc2.jpeg";
import maizeFieldImg from "../assets/farmpc9.jpeg";
import landPrepImg1 from "../assets/seed/land-2.jpg"; // Change to your actual image file name
import landPrepImg2 from "../assets/seed/land1.webp"; // Change to your actual image file name

const tips = [
  {
    title: "1. Land Preparation",
    icon: "🌱",
    points: [
      "Importance of early land clearing and plowing: Clearing the land early ensures that weeds and old crop residues are removed before the rainy season begins. Plowing the land improves soil structure, aeration, and water absorption, creating a good environment for seed germination.",
      "Proper tillage methods (manual, oxen, tractor): Depending on resources, farmers can till the land using hand tools, oxen-drawn plows, or tractors. Each method loosens the soil, making it suitable for planting.",
      "Benefits of removing weeds and crop residues: Removing weeds and residues minimizes the risk of pests and diseases and reduces competition for nutrients, giving maize a healthier start.",
    ],
  },
  {
    title: "2. Seed Selection",
    icon: "🌽",
    points: [
      "Choosing certified, disease-resistant maize varieties: Using certified seeds ensures good germination, resistance to common diseases, and higher yields compared to local or recycled seeds.",
      "How to identify quality seeds: Good seeds are clean, uniformly sized, free of cracks, mold, or insect damage. Certified seed bags have labels from trusted seed companies.",
      "Where to buy genuine seeds: Buy seeds from agro-dealers, cooperatives, or government-approved sellers to avoid counterfeit products.",
    ],
  },
  {
    title: "3. Planting Techniques",
    icon: "🌾",
    points: [
      "Recommended planting dates for your region: Plant maize at the start of the rainy season to ensure adequate water during germination and early growth.",
      "Correct spacing between rows and plants: Use spacing of 75 cm between rows and 25 cm between plants to allow proper sunlight and air circulation.",
      "Depth of planting seeds: Plant seeds 2.5 to 5 cm deep for good germination. Shallow planting may lead to poor root development.",
    ],
  },
  {
    title: "4. Soil Fertility Management",
    icon: "🧪",
    points: [
      "Importance of soil testing: Testing the soil helps determine its nutrient levels and pH, guiding appropriate fertilizer application.",
      "How and when to apply organic manure: Apply compost or animal manure before planting and mix it well with the soil to enrich fertility.",
      "Proper use of chemical fertilizers (types, timing, and rates): Use fertilizers like DAP at planting and Urea for top-dressing during the growing stage, following recommended rates.",
      "Avoiding overuse of nitrogen: Too much nitrogen can lead to excessive leaf growth and weak stems. Apply the correct amount based on soil test results.",
    ],
  },
  {
    title: "5. Weed Management",
    icon: "🌿",
    points: [
      "Early and regular weeding: Weed the field within the first 6 weeks to reduce competition for nutrients, water, and light.",
      "Manual vs. chemical weed control: Manual weeding is labor-intensive but safe. Chemical control with herbicides is faster but must be used carefully to avoid crop damage.",
      "Mulching to suppress weeds: Applying organic mulch around plants helps suppress weeds, retain moisture, and improve soil health.",
    ],
  },
  {
    title: "6. Water Management",
    icon: "💧",
    points: [
      "Importance of timely irrigation (especially during dry spells): Maize needs water at key stages like flowering and grain filling. Irrigate during dry spells to maintain yield.",
      "Water conservation techniques (mulching, ridges, zai pits): Techniques like zai pits and mulching help retain soil moisture and reduce evaporation.",
      "Avoiding waterlogging: Ensure proper drainage in the field to avoid standing water, which can damage roots and promote diseases.",
    ],
  },
  {
    title: "7. Pest and Disease Management",
    icon: "🐞",
    points: [
      "Regular field scouting and early detection: Inspect fields regularly to identify pests or disease symptoms early and take timely action.",
      "Integrated Pest Management (IPM) principles: Use a combination of cultural, biological, and chemical methods to manage pests sustainably.",
      "Safe use of pesticides and protective equipment: Wear gloves, masks, and boots when applying pesticides and follow instructions to avoid health risks.",
      "Encouraging natural predators: Promote beneficial insects like ladybugs and birds that feed on harmful pests naturally.",
    ],
  },
  {
    title: "8. Crop Rotation and Intercropping",
    icon: "🔄",
    points: [
      "Benefits of rotating maize with legumes (beans, cowpeas, etc.): Rotating crops helps break pest and disease cycles and improves soil fertility through nitrogen fixation.",
      "Intercropping for soil health and pest reduction: Planting maize with crops like beans improves biodiversity and reduces pest spread.",
    ],
  },
  {
    title: "9. Harvesting and Post-Harvest Handling",
    icon: "🧺",
    points: [
      "Signs of maize maturity: Maize is mature when the husks turn brown and the kernels are hard and glossy.",
      "Proper harvesting methods to reduce losses: Use sharp tools and harvest during dry weather to reduce grain damage.",
      "Safe drying and storage to prevent mold and pests: Dry maize thoroughly before storing in clean, airtight containers or granaries to prevent mold and insect damage.",
    ],
  },
  {
    title: "10. Record Keeping",
    icon: "📒",
    points: [
      "Keeping simple records of planting dates, inputs, yields, and expenses: Maintaining records helps track progress and make better farming decisions.",
      "How records help improve future farming decisions: Reviewing past records allows farmers to evaluate what worked well and plan better for the next season.",
    ],
  },
  {
    title: "11. Climate-Smart Agriculture",
    icon: "🌦️",
    points: [
      "Adapting to changing weather patterns: Use short-season or drought-tolerant varieties to cope with unpredictable rainfall.",
      "Drought-tolerant varieties: These varieties survive dry conditions and still produce acceptable yields.",
      "Conservation agriculture practices: Practices like minimum tillage, mulching, and cover cropping protect the soil and conserve moisture.",
    ],
  },
  {
    title: "12. Safety and Sustainability",
    icon: "🛡️",
    points: [
      "Safe handling and storage of agrochemicals: Store pesticides in labeled, locked areas away from food and children.",
      "Protecting pollinators and beneficial insects: Avoid spraying pesticides during flowering to protect bees and other pollinators.",
      "Environmental conservation (tree planting, soil erosion control): Plant trees, use terraces, and maintain ground cover to prevent soil erosion and conserve biodiversity.",
    ],
  },
];

const CultivationTips = () => (
  <div className="w-full bg-green-50 py-10 px-2">
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 text-center font-[Poppins]">
        Maize Cultivation and Farming Tips Guide
      </h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-2 font-[Poppins]">
          Part 1: Understanding Maize Cultivation
        </h2>
        <p className="text-gray-700 mb-2 font-[Poppins]">
          Maize (corn) is one of the most important staple food crops grown in
          Tanzania and other East African countries. It is widely cultivated due
          to its versatility, high yield potential, and ability to grow in
          different agro-climatic zones. Maize is a warm-season crop and thrives
          in areas with moderate rainfall, good sunlight, and fertile soil. For
          successful maize cultivation, farmers must understand its growth
          requirements and proper farming practices.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-1">
          <img
            src={maizeClimateImg}
            alt="Ideal maize growing conditions"
            className="w-full sm:w-1/2 max-w-md rounded-lg shadow"
          />
          <img
            src={maizeFieldImg}
            alt="Maize field"
            className="w-full sm:w-1/2 max-w-md rounded-lg shadow"
          />
        </div>
        <div className="text-center italic text-gray-600 text-sm mb-3">
          figure 1: maize farm
        </div>
        <ul className="list-disc ml-6 text-gray-700 mb-2 font-[Poppins]">
          <li>
            Temperature: <b>18°C to 27°C</b>
          </li>
          <li>
            Rainfall: <b>500 to 800 mm</b> during the growing season
          </li>
          <li>
            Soil: <b>Well-drained, loamy soil</b> with a pH of 5.5 to 7.0
          </li>
          <li>
            Altitude: Grows well from sea level up to 2,400 meters above sea
            level
          </li>
        </ul>
        <p className="text-gray-700 font-[Poppins]">
          In Tanzania, maize is commonly grown in regions like{" "}
          <b>Iringa, Mbeya, Ruvuma, Rukwa, and the Southern Highlands</b>, where
          rainfall and soil fertility are favorable. Proper planning, good land
          preparation, timely planting, and effective pest and disease control
          are essential for achieving high maize yields.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-green-700 mb-4 font-[Poppins]">
          Part 2: Detailed Farming Tips and Best Practices
        </h2>
        <div className="space-y-7">
          {tips.map((tip, idx) => (
            <div key={idx} className="bg-green-50 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-bold text-green-800 flex items-center gap-2 mb-2 font-[Poppins]">
                <span className="text-2xl">{tip.icon}</span> {tip.title}
              </h3>
              {/* Land Preparation: explanation, images after second point, then rest */}
              {tip.title === "1. Land Preparation" ? (
                <>
                  <ul className="list-disc ml-6 text-gray-700 font-[Poppins] space-y-1 mb-4">
                    {tip.points.map((point, i) => (
                      <React.Fragment key={i}>
                        <li className="text-[15px]">{point}</li>
                        {i === 1 && (
                          <>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-4">
                              <img
                                src={landPrepImg1}
                                alt="Land preparation step 1"
                                className="w-full sm:w-1/2 max-w-md rounded-lg shadow"
                              />
                              <img
                                src={landPrepImg2}
                                alt="Land preparation step 2"
                                className="w-full sm:w-1/2 max-w-md rounded-lg shadow"
                              />
                            </div>
                            <div className="text-center italic text-gray-600 text-sm mb-3">
                              figure 2: land preparation steps
                            </div>
                          </>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </>
              ) : (
                <ul className="list-disc ml-6 text-gray-700 font-[Poppins] space-y-1">
                  {tip.points.map((point, i) => (
                    <li key={i} className="text-[15px]">
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default CultivationTips;
